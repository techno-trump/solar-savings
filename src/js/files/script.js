// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";
import { ProgressBar } from "../libs/progress-bar.js";

const debug = false;
const consoleInfo = (...args) => {
	debug && console.log(...args);
}
function isStringFulfilled(string) {
	return typeof string === "string" && string.length > 0;
}

let postId;
let apiUrl; 
const steps = [
	{ alias: "power_bill", caption: "POWER BILL", subStepsCount: 1 },
	{ alias: "address", caption: "ADDRESS", subStepsCount: 1 },
	{ alias: "credit_score", caption: "CREDIT SCORE", subStepsCount: 1 },
	{ alias: "name", caption: "NAME", subStepsCount: 1 },
	{ alias: "contact", caption: "CONTACT", subStepsCount: 2 },
	{ alias: "thank_you", caption: "THANK YOU", subStepsCount: 1 },
];
const stepsMapping = [
	"avaragePowerBill",
	"address",
	"creditScore",
	"contact",
	"email",
	"phoneNumber",
	"booking",
	"thankYou",
];
const phoneNumberChecker = (value) => {
	if (typeof value === "string" && /^\(\d{3}\)\s\d{3}-\d{4}$/.test(value)) {
		return null;
	} else {
		return "Error: phone number is incorrect";
	};
};
const phoneNumberFormatter = (string) => {
	if (!string || typeof string !== "string") return "";
	const allNumbers = string.replace(/^\+1?/, "").match(/\d/ig);
	//(559) 302-6716
	if (!allNumbers) return "";
	return allNumbers.reduce((acc, digit) => {
		switch(acc.length) {
			case 0:
				acc.push("(");
				break;
			case 4:
				acc.push(")", " ");
				break;
			case 9:
				acc.push("-");
				break;
		}
		acc.push(digit);
		return acc;
	}, []).join("");
};
const emailChecker = (string) => {
	if (typeof string === "string" && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(string)) {
		return null;
	} else {
		return "Error: email is incorrect";
	}
}
class DataStore {
	_store;
	_prevStore = {};
	_subscriptions = [];
	constructor(initialState = {}) {
		this._store = initialState;
	}
  set(setter) {
		this._prevStore = this._store;
		this._store = setter(this._store);

		this._subscriptions.forEach(callback => callback(this._store, this._prevStore, (setter) => {
			this.set(setter);
		}));

		consoleInfo(`_store: ${JSON.stringify(this._store)}, prevStore: ${JSON.stringify(this._prevStore)}`);
	}
	get store() {
		return this._store;
	}
	onChange(callback) {
		this._subscriptions.push(callback);
	}
}
class RangeSlider {
	_onChangeListeners = [];
	_min;
	_max;
	_volume;
	_indicator;
	_value;
	_progress;
	_percentage;
	_thumbWidth;
	constructor(selector, thumbWidth, lowerColor, higherColor) {
		const inputNode = document.querySelector(selector);
		this._min = inputNode.getAttribute("min");
		this._max = inputNode.getAttribute("max");
		this._volume = this._max - this._min;
		this._setValue(inputNode.value);
		this._thumbWidth = thumbWidth || 40;
		
		const updateStyle = (node) => {
			const inputWidth = node.offsetWidth;
			const thumbPercentage = this._thumbWidth / inputWidth;
			const thumbMiddleOffset = thumbPercentage / 2 * 100;
			const borderOffset = thumbMiddleOffset + this._percentage * (1 - thumbPercentage);
			
			let bgStyle = `linear-gradient(90deg, ${lowerColor} ${thumbMiddleOffset}%, ${lowerColor} ${borderOffset}%`;
			if (this._progress < this._volume) {
				bgStyle += `, ${higherColor !== undefined ? higherColor : "rgba(255,255,255,0)"} ${borderOffset}%`;
			}
			bgStyle += ")";
			node.style.backgroundImage = bgStyle;
		}

		updateStyle(inputNode);

		inputNode.addEventListener("input", (e) => {
			e.preventDefault();
			this._setValue(e.currentTarget.value);
			updateStyle(e.currentTarget);
			if (this._indicator) this._updateIndicator();
			this._onChangeListeners.forEach(callback => callback(this._value, this._percentage));
		});
		window.addEventListener("resize", (e) => {
			const inputNode = document.querySelector(selector);
			updateStyle(inputNode);
		});
		observeVisibility();

		function observeVisibility() {
			const options = {
				rootMargin: "0px",
				threshold: 0,
			}
			const callback = (entries, observer) => {
				entries.forEach(entry => {
					if (entry.target instanceof HTMLElement && entry.target.id === inputNode.id) {
						updateStyle(entry.target);
					}
				});
			};
			const observer = new IntersectionObserver(callback, options);
			observer.observe(inputNode);
		}
	}
	_setValue(value) {
		this._value = value;
		this._progress = this._value - this._min;
		this._percentage = this._progress / this._volume * 100;
	}
	_updateIndicator() {
		this._indicator.set(this._value, this._percentage);
	}
	getValue() {
		return this._value;
	}
	addIndicator(indicator) {
		this._indicator = indicator;
		this._updateIndicator();
	}
	subscribe(callback) {
		this._onChangeListeners.push(callback);
	}
	unsubscribe(callback) {
		this._onChangeListeners = this._onChangeListeners.filter(inStackCallback => inStackCallback !== callback);
	}
}
class RangeValueIndicator {
	_selector;
	_template;
	constructor(selector, template) {
		this._selector = selector;
		this._template = template;
	}
	set(value, percentage) {
		const rootNode = document.querySelector(this._selector);
		const wrapperWidth = rootNode.clientWidth;
		const valueNode = rootNode.firstElementChild;
		if (this._template) {
			if (typeof this._template === "function") {
				valueNode.textContent = this._template(value);
			} else {
				valueNode.textContent = this._template.replace("{{value}}", value);
			}
		} else {
			valueNode.textContent = value;
		}
		
		const valueNodeWidth = valueNode.offsetWidth;
		const offset = (wrapperWidth - valueNodeWidth) / 100 * percentage;
		valueNode.style.marginLeft = `calc(${percentage}% - ${valueNodeWidth / 2}px)`;
	}
}
class AddressInput {
	static rootClassName = ".base-form__address-field";
	_getRootNode = () => document.querySelector(AddressInput.rootClassName);
	constructor(state) {
		this._state = state;
		const rootNode = this._getRootNode();
		const inputNode = rootNode.lastElementChild;
		inputNode.addEventListener("blur", (e) => {
			this._onBlur(e);
		});
		inputNode.addEventListener("input", (e) => {
			this._onInput(e);
		});
		if (state.store.isGoogleApiInit) {
			this._initAutocomplete(rootNode);
		} else {
			state.onChange((state, prevState) => {
				if (state.isGoogleApiInit !== prevState.isGoogleApiInit && state.isGoogleApiInit) {
					this._initAutocomplete(rootNode);
				}
			});
		}
	}
	_initAutocomplete(rootNode) {
		const inputNode = (rootNode || this._getRootNode()).lastElementChild;
		const options = {
			fields: ["formatted_address", "geometry", "name"],
			strictBounds: false,
			componentRestrictions: { country: "us" },
		};
		const autocomplete = new google.maps.places.Autocomplete(inputNode, options);
		autocomplete.addListener("place_changed", () => {
			const placeResult = autocomplete.getPlace();
			// Here the resulting place will be always correct
			this._state.set((state) => {
				return {
					...state,
					address: placeResult.formatted_address,
					isAddressAutocompleted: true,
				};
			});
		});
		consoleInfo("address autocomplete initialized");
	}
	_onInput(e) {
		this._state.set(state => {
			return {
				...state,
				address: e.currentTarget.value,
				isAddressAutocompleted: false,
			};
		});
	}
	_onBlur(e) {
		this._state.set(state => {
			return {
				...state,
				address: e.currentTarget.value,
				isAddressAutocompleted: false,
			};
		});
	}
}
class RadioButtonSelect {
	_formName;
	_name;
	constructor(formName, name, state) {
		this._formName = formName;
		this._name = name;
		const radioNodes = document.querySelectorAll(`form[name='${formName}'] input[name='${name}']`);
		const handler = (e) => {
			state.set((state) => {
				return {
					...state,
					[name]: e.currentTarget.value,
				};
			});
		};
		radioNodes && radioNodes.forEach(node => node.addEventListener("change", handler));
	}
}
class Input {
	_formName;
	_name;
	_state;
	constructor(formName, name, state, validator, formatter) {
		this._state = state;
		this._formName = formName;
		this._name = name;
		this._validator = validator;
		this._formatter = formatter;
		this._isValidFieldName = `is${name.replace(/^(.)/g, (match, p1) => p1.toUpperCase())}Valid`;
		const node = document.forms[this._formName][this._name];
		const changeHandler = (e) => {
			state.set((state) => {
				const value = e.currentTarget.value;
				let newState = {
					...state,
					[name]: value,
				};
				if (validator) {
					if (isStringFulfilled(value)) {
						const errorMsg = validator(value);
							consoleInfo(`changeHandler::errorMsg:${errorMsg}::value:${value}`);
						if (errorMsg) {
							e.currentTarget.parentElement.classList.add("error");
							e.currentTarget.parentElement.classList.remove("valid");
							newState[this._isValidFieldName] =  false;
						} else {
							e.currentTarget.parentElement.classList.remove("error");
							e.currentTarget.parentElement.classList.add("valid");
							newState[this._isValidFieldName] =  true;
						}
						
					} else {
						e.currentTarget.parentElement.classList.remove("error");
						e.currentTarget.parentElement.classList.remove("valid");
						newState[this._isValidFieldName] =  false;
					}
				}
				return newState;
			});
		};
		const inputHandler = (e) => {
			let value = e.currentTarget.value;
			let isValid;
			if (validator) {
				isValid = !validator(value);
			} else {
				isValid = isStringFulfilled(value);
			}
			
			if (isValid) {
				e.currentTarget.parentElement.classList.remove("error");
				e.currentTarget.parentElement.classList.add("valid");
			} else {
				e.currentTarget.parentElement.classList.remove("valid");
				if (formatter) {
					e.currentTarget.value = formatter(value);
				}
			}
			state.set((state) => {
				return {
					...state,
					[this._isValidFieldName]: isValid,
					[name]: e.currentTarget.value,
				};
			});
		}
		node.addEventListener("change", changeHandler);
		node.addEventListener("input", inputHandler);
	}
	setErrorMsg(msg) {
		const node = document.forms[this._formName][this._name];
		node.previousElementSibling.textContent = msg;
	}
	validate() {
		const node = document.forms[this._formName][this._name];
		const isRequired = node.required;
		if (isRequired && node.value === "") {
			node.parentElement.classList.add("error");
			this.setErrorMsg("This field is required");
			return false;
		} else if (this._validator && isStringFulfilled(node.value)) {
			const errorMsg = this._validator(node.value);
			if (errorMsg) { 
				node.parentElement.classList.add("error");
				this.setErrorMsg(errorMsg);
				return false;
			}
		}
		return true;
	}
	reset() {
		const node = document.forms[this._formName][this._name];
		node.value = null;
		node.dispatchEvent(new Event("input"));
		node.dispatchEvent(new Event("change"));
	}
}

class Checkbox {
	_formName;
	_name;
	constructor(formName, name, state) {
		this._formName = formName;
		this._name = name;
	
		const node = document.forms[this._formName][this._name];
		const rootNode = node.parentElement;
		const pullValue = (node) => {
			state.set((state) => {
				return {
					...state,
					[name]: node.checked,
				};
			});
		}
		pullValue(node);
		const handler = (e) => {
			pullValue(e.currentTarget);
		};
		node.addEventListener("change", handler);
		node.addEventListener("click", (e) => {
			e.stopPropagation();
		});
		rootNode.addEventListener("click", (e) => {
			e.preventDefault();
			e.currentTarget.firstElementChild.checked = !e.currentTarget.firstElementChild.checked;
			e.currentTarget.firstElementChild.dispatchEvent(new Event("change"));
		});
	}
}
class GuideButton {
	static rootClassName = ".step-page-btn";
	static captionClassName = ".step-page-btn__caption";
	_type;
	_selectNode() {
		return document.querySelector(`${GuideButton.rootClassName}[data-type="${this._type}"]`);
	}
	constructor(type) {
		this._type = type;
	}
	hide() {
		this._selectNode().classList.add("hidden");
	}
	show() {
		this._selectNode().classList.remove("hidden");
	}
	disable() {
		this._selectNode().disabled = true;
	}
	enable() {
		this._selectNode().disabled = false;
	}
	setCaption(caption) {
		const captionNode = this._selectNode().querySelector(GuideButton.captionClassName);
		captionNode.textContent = caption;
	}
}
class NextButton extends GuideButton {
	_state;
	constructor(state) {
		super("next");
		this._state = state;
		this._state.onChange((state, prevState) => {
			const prevStepAlias = stepsMapping[prevState.currentStep];
			const currentStepAlias = stepsMapping[state.currentStep];
			const { isGoogleApiInit, isAddressAutocompleted } = state;
			if (checkStepValues(currentStepAlias)) {
				this.enable();
			} else {
				this.disable();
			}
			if (isVisible(currentStepAlias)) {
				this.show();
			} else {
				this.hide();
			}

			function isVisible(stepAlias) {
				switch(stepAlias) {
					case "avaragePowerBill":
					case "address":
					case "homeType":
					case "roofShade":
					case "creditScore":
					case "contact":
					case "email":
						return true;
					default:
						return false;
				}
			}
			function checkStepValues(stepAlias) {
				switch(stepAlias) {
					case "avaragePowerBill":
						return true;
					case "address":
						const { address } = state;
						return typeof address === "string" && address.length > 3;
					case "homeType":
						const { homeType } = state;
						return homeType !== undefined;
					case "roofShade":
						const { roofShade } = state;
						return roofShade !== undefined;
					case "creditScore":
						const { creditScore } = state;
						return creditScore !== undefined;
					case "contact":
						const { firstName, lastName } = state;
						return isStringFulfilled(firstName) && isStringFulfilled(lastName);
					case "email":
						const { isEmailValid } = state;
						return isEmailValid;
					default:
						return false;
				}
			}
		});
		this._selectNode().addEventListener("click", (e) => {
			e.preventDefault();
			this._state.set((state) => {
				return { ...state, "currentStep": state.currentStep + 1 };
			});
		});
	}
}
class PrevButton extends GuideButton {
	_state;
	constructor(state) {
		super("prev");
		this._state = state;
		const handleVisibility = (state) => {
			const currentStepAlias = stepsMapping[state.currentStep];
			if (currentStepAlias === "homeType" ||
					currentStepAlias === "roofShade" ||
					currentStepAlias === "address" ||
					currentStepAlias === "creditScore" ||
					currentStepAlias === "contact" ||
					currentStepAlias === "email" ||
					currentStepAlias === "phoneNumber") {
						this.show();
			} else {
				this.hide();
			}
		}
		handleVisibility(this._state.store);

		this._state.onChange((state, prevState) => {
			handleVisibility(state);
		});

		this._selectNode().addEventListener("click", (e) => {
			e.preventDefault();
			this._state.set((state) => {
				return { ...state, "currentStep": state.currentStep - 1 }
			});
		});
	}
}
class SubmitButton extends GuideButton {
_state;
	constructor(state) {
		super("submit");
		this._state = state;
		this.hide();
		this._state.onChange((state, prevState) => {
			if (state.isPhoneNumberValid) {
				this.enable();
			} else {
				this.disable();
			}
			const currentStepAlias = stepsMapping[state.currentStep];
			if (currentStepAlias === "phoneNumber") {
				this.show();
			} else {
				this.hide();
			}
		});

		this._selectNode().addEventListener("click", (e) => {
			e.preventDefault();
			this._state.set((state) => {
				return { ...state, "currentStep": state.currentStep + 1 }
			});
		});
	}	
}
class ProcessingBar {
	_state;
	constructor(state, lowerColor, higherColor) {
		this._state = state;

		this._state.onChange((state, prevState, setState) => {
			if (state.processing) {
				if (state.processingProgress === 0 || state.processingProgress !== prevState.processingProgress) {
					const node = document.querySelector(".processing-indicator__bar");
					let bgStyle = `linear-gradient(90deg, ${lowerColor} 0%, ${lowerColor} ${state.processingProgress}%`;
					bgStyle += `, ${higherColor !== undefined ? higherColor : "rgba(255,255,255,0)"} ${state.processingProgress}%`;
					bgStyle += ")";
					node.style.backgroundImage = bgStyle;
					if (state.processingProgress < 80) {
						setTimeout(() => {
							setState((state) => {
								return {
									...state,
									processingProgress: state.processingProgress + Math.random()
								};
							});
						}, 50);
					}
				}
			}
		});
	}
}
class Page {
	static rootClassName = ".page";
	_state;
	_selectNode() {
		return document.querySelector(Page.rootClassName);
	}
	constructor(state) {
		this._state = state;
		this._selectNode().setAttribute("data-step", stepsMapping[state.store["currentStep"]]);
		this._state.onChange((state, prevState) => {
			if (state.processing) {
				this._selectNode().setAttribute("data-step", state.processing);
			} else if (state.currentLocation) {
				this._selectNode().setAttribute("data-step", "article");
			} else {
				const currentStepAlias = stepsMapping[state.currentStep];
				if (currentStepAlias === "thankYou" && state.badSummary) {
					this._selectNode().setAttribute("data-step", "badSummary");
				} else {
					this._selectNode().setAttribute("data-step", currentStepAlias);
				}
			}
		});
	}
}
function initReferForm(state) {
	const referFirstNameInput = new Input("refer", "referFirstName", state);
	const referLastNameInput = new Input("refer", "referLastName", state);
	const referEmailInput = new Input("refer", "referEmail", state, emailChecker);
	const referPhoneInput = new Input("refer", "referPhone", state, phoneNumberChecker, phoneNumberFormatter);
	let fields = [referFirstNameInput, referLastNameInput, referEmailInput, referPhoneInput];
	
	const submitBtnNode = document.querySelector("#submit-refer-btn");
	submitBtnNode.addEventListener("click", (e) => {
		const formIsValid = fields.reduce((acc, field) => field.validate() && acc, true);
		const store = state.store;
		if (formIsValid) {
			const contactData = {
				"email": store.referEmail,
				"phone": store.referPhone,
				"firstName": store.referFirstName,
				"lastName": store.referLastName,
				"source": "public api",
				"customField": {
					"referred_by": `${store.firstName} ${store.lastName} ${store.phoneNumber}`
				}
			};
			createContact(contactData, "Refere", state);
		}
	});

	let sendingProcessInterval, sendingProcessCycle = 0;
	state.onChange((state, prevState, setState) => {
		if (state.sendingRefere !== prevState.sendingRefere) {
			const submitBtnNode = document.querySelector("#submit-refer-btn");
			const captionNode = submitBtnNode.querySelector(".summary-block-btn__caption");
			submitBtnNode.disabled = state.sendingRefere;
			
			if (state.sendingRefere) {
				if (!sendingProcessInterval) {
					captionNode.textContent = "Sending";
					sendingProcessInterval = setInterval(() => {
						captionNode.textContent = captionNode.textContent.replace(/\.*$/, ".".repeat(sendingProcessCycle));
						if (sendingProcessCycle < 3) {
							sendingProcessCycle++;
						} else {
							sendingProcessCycle = 0;
						}
						
					}, 300);
				}
			} else {
				const sendingResultNode = document.querySelector("#referFormProcessingResult");
				sendingResultNode.classList.add("show");
				if (state.sendingRefereResult && state.sendingRefereResult.contact && state.sendingRefereResult.contact.id) {
					sendingResultNode.textContent = "Thank you for the referral! We will notify when we get in contact with them.";
					sendingResultNode.classList.remove("refer-form__processing-result_error");
					resetFields();
				} else {
					sendingResultNode.textContent = `Error: ${JSON.stringify(state.sendingRefereResult)}`;
					sendingResultNode.classList.add("refer-form__processing-result_error");
				}
				setTimeout(() => {
					sendingResultNode.classList.remove("show");
				}, 3000);

				if (sendingProcessInterval) {
					clearInterval(sendingProcessInterval);
					sendingProcessInterval = null;
				}
				captionNode.textContent = "Submit another referral";
			}
		}
	});
	function resetFields() {
		fields.forEach(field => {
			field.reset();
		})
	}
}
function initArticleLinks(state) {
	let previousLocation;
	let currentLocation;
	const linkNodes = document.querySelectorAll("a[data-link]");

	linkNodes.forEach((node) => {
		const location = node.getAttribute("data-link");

		state.onChange((state, prevState, setState) => {
			const linkNode = document.querySelector(`a[data-link="${location}"]`);
			if (state.currentLocation === location) {
				linkNode.classList.add("active");
			} else {
				linkNode.classList.remove("active");
			}
		});

		node.addEventListener("click", (e) => {
			e.preventDefault();
			const location = e.currentTarget.getAttribute("data-link");
			const pageNode = document.querySelector(".page");
			if (location === "back") {
				state.set((state) => {
					return {
						...state,
						currentLocation: null,
					};
				});
			} else {
				state.set((state) => {
					return {
						...state,
						currentLocation: location,
					};
				});
			}
			injectArticleIframe(location);
		});
	});
	function injectArticleIframe(location) {
		// const mapping = {
		// 	"privacy-policy": "privacy-policy-2",
		// 	"terms-and-conditions": "terms-and-conditions",
		// };
		const mapping = {
			"privacy-policy": "?page_id=5758",
			"terms-and-conditions": "?page_id=5760",
		};
		const articleBodyNode = document.querySelector(".article__body");
		if (articleBodyNode.firstElementChild) {
			articleBodyNode.removeChild(articleBodyNode.firstElementChild);
		}
		articleBodyNode.innerHTML = `<iframe id="article" scrolling="no" style="width: 100%; border:none; overflow: hidden;" src="https://calculatemysolarsavings.com/${mapping[location]}/"></iframe>`;
	}
}
function setArticleIframeHeight(height) {
	window.frames.article.style.height = `${height}px`;
}
function createContact(data, identifier, state) {
	const setState = (callback) => {
		if (state.set) {
			state.set(callback)
		} else {
			state(callback);
		}
	}
	setState((state) => {
		return {
			...state,
			[`sending${identifier}`]: true,
		}
	});
		consoleInfo(`createContact:${identifier}:data${JSON.stringify(data)}`);
	return fetch(`${apiUrl}ghl-hooks/v1/contacts/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		referrerPolicy: 'no-referrer',
		body: JSON.stringify({ postId: postId, contact: data }),
	})
	.then((response) => response.json())
	.then(result => {
		setState((state) => {
			return {
				...state,
				[`sending${identifier}Result`]: result,
				[`sending${identifier}`]: false,
			}
		});
	})
	.catch(reason => {
		setState((state) => {
			return {
				...state,
				[`sending${identifier}Result`]: reason,
				[`sending${identifier}`]: false,
			}
		});
	});
}
///////// 
const initialState = {
	isGoogleApiInit: false,
	currentStep: 0,
}
const state = new DataStore(initialState);
window.initGoogleApi = () => {
	state.set((state) => {
		return { ...state, "isGoogleApiInit": true };
	});
};
// Init app
window.addEventListener("DOMContentLoaded", onLoaded);
// Messages from iframe (Calendar)
window.addEventListener('message', function (e) {
		
	if (e.data instanceof Array) {
		consoleInfo(`window::message::${e.data[0]}::${e.data[2]}`);
		if (e.data[0] === "set-sticky-contacts") {
			const appointmentId = JSON.parse(e.data[2]).appointment.id;

			state.set((state) => {
				return {
					...state,
					"appointmentId": appointmentId,
				};
			});
		}
	} else {
		consoleInfo(`window::message::${e.data.action}`);
		switch(e.data.action) {
			case "calendarIsReady":
				state.set((state) => {
					return {
						...state,
						"calendarIsReady": true
					};
				});
				break;
			case "formIsAvailable":
				state.set((state) => {
					return {
						...state,
						"formIsAvailable": true
					};
				});
				break;
			case "dataTimeIsPicked":
				state.set((state) => {
					return {
						...state,
						"dataTimeIsPicked": true
					};
				});
				break;
			case "formIsSent":
				state.set((state) => {
					return {
						...state,
						"ghlFormIsSent": true,
						"addToCalendarLinks": e.data.payload.calendarLinks,
						"appointmentInfo": e.data.payload.appointmentInfo,
					};
				});
				break;
			case "error":
				state.set((state) => {
					return {
						...state,
						"ghlFormError": e.data.payload,
					};
				});
				break;;
			case "iframeHeightReport":
				setArticleIframeHeight(e.data.payload.height);
				break;
				
		}
	}
});

function onLoaded(e) {
	initApp();
}
function dispatchAction(name, payload) {
	const calendarFrameWindow = document.querySelector(".booking-step iframe").contentWindow;
	calendarFrameWindow.postMessage({ action: name,  payload }, "*");
}
function submitGhlForm(store) {
	const payload = {
		firstName: store.firstName,
		lastName: store.lastName,
		email: store.email,
		phoneNumber: `+1${store.phoneNumber}`,
	}
	dispatchAction("setFieldsAndSend", payload);
}
function setCaretPosition(elem, caretPos) {
	if(elem.createTextRange) {
		var range = elem.createTextRange();
		range.move('character', caretPos);
		range.select();
	}
	else {
		if(elem.selectionStart) {
				elem.focus();
				elem.setSelectionRange(caretPos, caretPos);
		}
		else
				elem.focus();
	}
}
function initAccordions() {
	var rootElems = document.querySelectorAll(".accordion");
	rootElems.forEach(init);

	function init(rootElem) {
		var itemElems = rootElem.querySelectorAll(".accordion__item");
		var activeSectionElem = rootElem.querySelector(".accordion__item.accordion__item_opened");
		itemElems.forEach(addHandler);
		function addHandler(itemElem) {
			itemElem.addEventListener("click", clickHandler);
		}
		function clickHandler(e) {
			if (e.currentTarget.classList.contains("accordion__item_opened")) {
				e.currentTarget.classList.remove("accordion__item_opened");
				activeSectionElem = null;
			} else {
				e.currentTarget.classList.add("accordion__item_opened");
				if (activeSectionElem) {
					activeSectionElem.classList.remove("accordion__item_opened");
				}
				activeSectionElem = e.currentTarget;
			}
		}
	}
}
function showServiceBtnsIfHashSet() {
	if (location.hash.toLowerCase().includes("show-service-btns")) {
		const node = document.querySelector("#service-btns-for-pixel");
		node.style.display = "flex";
	}
}
function calculateExpenses (yearlyPowerBill, yearsNumber) {
	const coefficient = 1 + 3.5 / 100;
	return yearlyPowerBill * ((Math.pow(coefficient, yearsNumber + 1) - 1) / (coefficient - 1) - 1);
}
function calculateSavings(avaragePowerBill, yearsNumber) {
	const yearlyPowerBill = avaragePowerBill * 12;
	const expenses = calculateExpenses(yearlyPowerBill, yearsNumber);
	const solarCost = yearlyPowerBill * 0.75 * yearsNumber;
	return expenses - solarCost;
}
function initSavingsInformationUpdates(store) {
	const textNode = document.querySelector(".savings-calculator__text");
	const initialHTML = textNode.innerHTML;
	const splitDigitGroups = (value) => {
		return String(value).split(/\B(?=(?:\d{3})+$)/g).join(",");
	};
	const update = (yearsNumber, avaragePowerBill) => {
		const savings25 = Math.floor(calculateSavings(avaragePowerBill, yearsNumber));
		const savings50 = savings25 * 2;
		const yearsLabel = yearsNumber == 1 ? "year" : "years";
		const updatedHTML = initialHTML.replace("{{avaragePowerBill}}", splitDigitGroups(avaragePowerBill))
			.replace("{{yearsNumber}}", yearsNumber)
			.replace("{{yearsLabel}}", yearsLabel)
			.replace("{{savings25}}", splitDigitGroups(savings25))
			.replace("{{savings50}}", splitDigitGroups(savings50));
		textNode.innerHTML = updatedHTML;
	};

	store.onChange((state, prevState) => {
		if (state.avarageBill !== prevState.avarageBill || state.yearsToCalculate !== prevState.yearsToCalculate) {
			update(Number(state.yearsToCalculate), Number(state.avarageBill));
		}
	});
}
function initApp() {
	const wpApiNode = document.querySelector("[rel='https://api.w.org/']");
	if (wpApiNode) {
		apiUrl = wpApiNode.href;
	} else {
		apiUrl = 'https://calculatemysolarsavings.com/index.php?rest_route=/';
	}
	
	postId = parseInt(document.querySelector("#post_id").textContent);
	const page = new Page(state);
	
	state.onChange((state, prevState, setState) => {
		const { currentStep } = state;
		const prevStep = prevState.currentStep;
		const currentStepAlias = stepsMapping[currentStep];

		if (state.address !== prevState.address || state.avarageBill !== prevState.avarageBill) {
			if (state.rebatesAreChecked) {
				setState((state) => {
					return {
						...state,
						rebatesAreChecked: false,
					};
				});
			}
		}
		if (state.processingProgress !== prevState.processingProgress) {
			if (state.processingProgress > 80 && currentStepAlias === "homeType") {
				setState((state) => {
					return {
						...state,
						processing: null,
						processingProgress: 0,
					};
				});
			}
		}
		if (currentStep !== prevStep) {
			if (currentStep < prevStep) {
				stepProgressBar.prev();
			} else {
				stepProgressBar.next();
			}
			
			if (currentStepAlias === "homeType" && !state.rebatesAreChecked) {
				setState((state) => {
					return {
						...state,
						rebatesAreChecked: true,
						processing: "checkingRebates",
						processingProgress: 0,
					};
				});
			} else if (currentStepAlias === "booking") {
				// Set step title
				const sendFormServiceBtnNode = document.querySelector("#send-form-btn");
				sendFormServiceBtnNode.dispatchEvent(new Event("click"));
				// Bad summary
				if (!state.isOwner || state.creditScore === 'below600') {
					const badSummaryTitleNode = document.querySelector("#bad-summary-title");
					const badSummaryTitle = badSummaryTitleNode.textContent;
					badSummaryTitleNode.textContent = badSummaryTitle.replace("{{firstName}}", state.firstName);

					setState((state) => {
						return {
							...state,
							processing: debug ? null : "processingForm",
							processingProgress: 0,
							currentStep: stepsMapping.indexOf("thankYou"),
							badSummary: true,
						};
					});

					const contactData = collectContactData(state, ["disqualified"]);
					createContact(contactData, "Customer", setState);
				} else {
					const bookingTitleNode = document.querySelector(".booking-step__title");
					const bookingTitle = bookingTitleNode.textContent;
					bookingTitleNode.textContent = bookingTitle.replace("{{firstName}}", state.firstName);

					setState((state) => {
						return {
							...state,
							processing: debug ? null : "processingForm",
							processingProgress: 0,
						};
					});

					const contactData = collectContactData(state);
					createContact(contactData, "Customer", setState);
				}
			}
		}
		// Calendar form is ready
		if (state.calendarIsReady !== prevState.calendarIsReady && state.calendarIsReady) {
			setState((state) => {
				return {
					...state,
					processing: false,
				};
			});
		}
		if (state.sendingCustomer !== prevState.sendingCustomer && !state.sendingCustomer) {
			if (state.sendingCustomerResult.contact.id) {
				setState((state) => {
					return {
						...state,
						processing: false,
					};
				});
			} else {
				// Error creating customer contact
			}
		}
		// User got to calendar form filling step
		if (state.formIsAvailable && state.formIsAvailable != prevState.formIsAvailable) {
			setState((state) => {
				return {
					...state,
					processing: debug ? null : "processingBooking",
					processingProgress: 0,
				};
			});

			const scheduleAppointmentServiceBtnNode = document.querySelector("#schedule-appointment");
			scheduleAppointmentServiceBtnNode.dispatchEvent(new Event("click"));

			submitGhlForm(state);
		}
		// ghlForm just sent
		if (state.ghlFormIsSent && state.ghlFormIsSent !== prevState.ghlFormIsSent) {
			const summaryTitleNode = document.querySelector(".summary__title");
			const summaryTitle = summaryTitleNode.textContent;
			summaryTitleNode.textContent = summaryTitle.replace("{{firstName}}", state.firstName);
			replaceCalendarBtnHref("google");
			replaceCalendarBtnHref("outlook");
			replaceAppointmentInfo();
			setState((state) => {
				return {
					...state,
					currentStep: state.currentStep + 1,
					processing: null,
					processingProgress: 0,
				};
			});
		}

		// Automaticaly go to next step
		const { roofShade, creditScore, homeType } = state;
		const prevRoofShade = prevState.roofShade;
		const prevCreditScore = prevState.creditScore;
		const prevHomeType = prevState.homeType;
		if (roofShade !== prevRoofShade && isStringFulfilled(roofShade) && currentStepAlias === 'roofShade' ||
				creditScore !== prevCreditScore && isStringFulfilled(creditScore) && currentStepAlias === 'creditScore' ||
				homeType !== prevHomeType && isStringFulfilled(homeType) && currentStepAlias === 'homeType') {
			setState((state) => {
				return {
					...state,
					currentStep: state.currentStep + 1,
				};
			})
		}

		function replaceCalendarBtnHref(type) {
			const btnNode = document.querySelector(`#add-to-${type}-calendar`);
			btnNode.setAttribute("href", state.addToCalendarLinks[type]);
		}
		function replaceAppointmentInfo() {
			let detailNode = document.querySelector(`#appointment-call-duration`);
			const durationMatch = state.appointmentInfo.duration.match(/^\d+/g);
			if (durationMatch) {
				detailNode.textContent = detailNode.textContent.replace("{{duration}}", durationMatch[0]);
			}
			detailNode = document.querySelector(`#appointment-call-date-time`);
			detailNode.textContent = state.appointmentInfo.dateTime;
			detailNode = document.querySelector(`#appointment-call-timezone`);
			detailNode.textContent = state.appointmentInfo.timezone;
		}
		function collectContactData(state, additionalTags) {
			const tags = [
				"online",
				"english",
			];
			return {
				"email": state.email,
				"phone": `+1${state.phoneNumber.match(/\d/g).join("")}`,
				"firstName": state.firstName,
				"lastName": state.lastName,
				"name": `${state.firstName} ${state.lastName}`,
				"address": state.address,
				"tags": additionalTags instanceof Array ? tags.concat(additionalTags) : tags,
				"source": "public api",
				"customField": {
					"average_electric_bill": state.avarageBill,
					"credit_score": state.creditScore,
					"is_property_owner": state.isOwner,
					"email_me_my_report": state.emailMe,
				}
			};
		}
	});
	const stepProgressBar = new ProgressBar("guide__progress-bar", steps);

	showServiceBtnsIfHashSet();
	initAccordions();
	initArticleLinks(state);
	initReferForm(state);

	const nextButton = new NextButton(state);
	const prevButton = new PrevButton(state);
	const submitButton = new SubmitButton(state);
	
	const avarageBillSlider = new RangeSlider("#avarage-bill-input", 40, "#00ABA1");
	const rangeValueIndicator = new RangeValueIndicator("#power-bill-indicator", "${{value}}");
	avarageBillSlider.addIndicator(rangeValueIndicator);
	avarageBillSlider.subscribe((value) => {
		state.set((state) => {
			return { ...state, "avarageBill": value };
		});
	});
	state.set((state) => {
		return { ...state, "avarageBill": avarageBillSlider.getValue() };
	});

	const yearsToCalculateSlider = new RangeSlider("#years-to-calculate-input", 40, "#00ABA1");
	const yearsToCalculateIndicator = new RangeValueIndicator("#years-to-calculate-indicator", (value) => {
		if (value == 1) {
			return "1 year";
		} else {
			return `${value} years`;
		}
	});

	initSavingsInformationUpdates(state);
	yearsToCalculateSlider.addIndicator(yearsToCalculateIndicator);
	yearsToCalculateSlider.subscribe((value) => {
		state.set((state) => {
			return { ...state, "yearsToCalculate": value };
		});
	});

	state.set((state) => {
		return { ...state, "avarageBill": avarageBillSlider.getValue() };
	});
	state.set((state) => {
		return { ...state, "yearsToCalculate": yearsToCalculateSlider.getValue() };
	});

	const addressInput = new AddressInput(state);

	const homeTypeRadio = new RadioButtonSelect("quiz", "homeType", state);
	const roofShadeRadio = new RadioButtonSelect("quiz", "roofShade", state);
	const creditScore = new RadioButtonSelect("quiz", "creditScore", state);
	const firstName = new Input("quiz", "firstName", state);
	const lastName = new Input("quiz", "lastName", state);
	const isOwner = new Checkbox("quiz", "isOwner", state);
	const email = new Input("quiz", "email", state, emailChecker);
	const emailMe = new Checkbox("quiz", "emailMe", state);
	
	const phoneNumber = new Input("quiz", "phoneNumber", state, phoneNumberChecker, phoneNumberFormatter);
	const processingBar = new ProcessingBar(state, "#00ABA1");

	const inputNodes = document.querySelectorAll("input");
	inputNodes.forEach(node => {
		const type = node.getAttribute("type");

		if (type === "radio") {
			if (!node.checked) return;
		}
		node.dispatchEvent(new Event("change"));
	});
}