// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";
import { ProgressBar } from "../libs/progress-bar.js";

const debug = true;
const bearer = "ad25c3dd-fa91-42e2-beff-18b6668804de";
const consoleInfo = (...args) => {
	debug && console.log(...args);
}
function isStringFulfilled(string) {
	return typeof string === "string" && string.length > 0;
}

const steps = [
	{ alias: "power_bill", caption: "POWER BILL", subStepsCount: 1 },
	{ alias: "address", caption: "ADDRESS", subStepsCount: 1 },
	{ alias: "home_type", caption: "HOME TYPE", subStepsCount: 2 },
	//{ alias: "roof_shade", caption: "ROOF SHADE", subStepsCount: 1 },
	{ alias: "credit_score", caption: "CREDIT SCORE", subStepsCount: 1 },
	{ alias: "contact", caption: "CONTACT", subStepsCount: 3 },
	{ alias: "thank_you", caption: "THANK YOU", subStepsCount: 1 },
];
const stepsMapping = [
	"avaragePowerBill",
	"address",
	//"processing",
	"homeType",
	"roofShade",
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
	constructor(rootClassName, thumbWidth, lowerColor, higherColor) {
		const inputNode = document.querySelector(`.${rootClassName}`);
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
			const inputNode = document.querySelector(`.${rootClassName}`);
			updateStyle(inputNode);
		});
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
	_rootId;
	_template;
	constructor(rootId, template) {
		this._rootId = rootId;
		this._template = template;
	}
	set(value, percentage) {
		const rootNode = document.querySelector(`#${this._rootId}`);
		const wrapperWidth = rootNode.clientWidth;
		const valueNode = rootNode.firstElementChild;
		valueNode.textContent = this._template ? this._template.replace("{{value}}", value) : value;
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
		const radioNodes = document.forms[this._formName][this._name];
		const handler = (e) => {
			state.set((state) => {
				return {
					...state,
					[name]: e.currentTarget.value,
				};
			});
		};
		radioNodes.forEach(node => node.addEventListener("change", handler));
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
			if (currentStepAlias === "phoneNumber") {
				this.setCaption("View savings report");
			} else {
				this.setCaption("Next");
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
					case "phoneNumber":
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
					case "phoneNumber":
						const { isPhoneNumberValid } = state;
						return isPhoneNumberValid;
					default:
						return false;
				}
			}
		});
		this._selectNode().addEventListener("click", (e) => {
			e.preventDefault();
			const setNextStep = () => {
				this._state.set((state) => {
					return { ...state, "currentStep": state.currentStep + 1 }
				});
			}
			const { currentStep } = this._state.store;
			switch (currentStep) {
				default:
					setNextStep();
			}
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
				this._selectNode().setAttribute("data-step", currentStepAlias);
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
			const data = {
				"email": store.referEmail,
				"phone": store.referPhone,
				"firstName": store.referFirstName,
				"lastName": store.referLastName,
				"source": "public api",
				"customField": {
					"referred_by": `${store.firstName} ${store.lastName} ${store.phoneNumber}`
				}
			};
			createReferal(data, bearer, state);
		}
	});

	let sendingProcessInterval, sendingProcessCycle = 0;
	state.onChange((state, prevState, setState) => {
		if (state.sendingReferal !== prevState.sendingReferal) {
			const submitBtnNode = document.querySelector("#submit-refer-btn");
			const captionNode = submitBtnNode.querySelector(".summary-block-btn__caption");
			submitBtnNode.disabled = state.sendingReferal;
			
			if (state.sendingReferal) {
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
				if (state.createReferalResult && state.createReferalResult.contact && state.createReferalResult.contact.id) {
					sendingResultNode.textContent = "Your referral is submitted!";
					sendingResultNode.classList.remove("refer-form__processing-result_error");
					resetFields();
				} else {
					sendingResultNode.textContent = `Error: ${JSON.stringify(state.createReferalResult)}`;
					sendingResultNode.classList.add("refer-form__processing-result_error");
				}
				setTimeout(() => {
					sendingResultNode.classList.remove("show");
				}, 3000);

				if (sendingProcessInterval) {
					clearInterval(sendingProcessInterval);
					sendingProcessInterval = null;
				}
				captionNode.textContent = "Submit Your Referral";
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
		const mapping = {
			"privacy-policy": "privacy-policy-2",
			"terms-and-conditions": "terms-and-conditions",
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
function deleteAppointment(appointmentId, bearer, state) {
	const setState = (callback) => {
		if (state.set) {
			state.set(callback)
		} else {
			state(callback);
		}
	}
	
	return fetch(`https://rest.gohighlevel.com/v1/appointments/${appointmentId}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${bearer}`
		},
		referrerPolicy: 'no-referrer'
	})
	.then((response) => response.text())
	.then(result => {
		if (result === "OK") {
			setState((state) => {
				return {
					...state,
					extraAppointmentIsRemoved: true,
				}
			});
		} else {
			setState((state) => {
				return {
					...state,
					extraAppointmentRemovingError: result,
				}
			});
		}
	})
	.catch(reason => {
		setState((state) => {
			return {
				...state,
				extraAppointmentRemovingError: reason,
			}
		});
	});

}
function createReferal(data, bearer, state) {
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
			sendingReferal: true,
		}
	});
	consoleInfo(`createReferal::data${JSON.stringify(data)}`);
	return fetch("https://rest.gohighlevel.com/v1/contacts/", {
		method: 'POST',
		headers: {
			'Authorization':  `Bearer ${bearer}`,
			'Content-Type': 'application/json',
		},
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(data),
	})
	.then((response) => response.json())
	.then(result => {
		setState((state) => {
			return {
				...state,
				createReferalResult: result,
				sendingReferal: false,
			}
		});
	})
	.catch(reason => {
		setState((state) => {
			return {
				...state,
				createReferalResult: reason,
				sendingReferal: false,
			}
		});
	});
}
function createContact(data, bearer, state) {
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
			sendingContact: true,
		}
	});
		consoleInfo(`createContact::data${JSON.stringify(data)}`);
	return fetch("https://rest.gohighlevel.com/v1/contacts/", {
		method: 'POST',
		headers: {
			'Authorization':  `Bearer ${bearer}`,
			'Content-Type': 'application/json',
		},
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(data),
	})
	.then((response) => response.json())
	.then(result => {
		setState((state) => {
			return {
				...state,
				creatingContactResult: result,
				creatingContact: false,
			}
		});
	})
	.catch(reason => {
		setState((state) => {
			return {
				...state,
				creatingContactResult: reason,
				creatingContact: false,
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
		consoleInfo(`window::message::${e.data[0]}`);
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
	const calendarFrameWindow = window.frames["calendar"].contentWindow;
	calendarFrameWindow.postMessage({ action: name,  payload }, "*");
}
function prepareGhlCalendar(state) {
	dispatchAction("skipDateTimePick");
}
function sendFirstGhlForm(state) {
	const payload = Object.assign({}, state);
	payload.phoneNumber = `+1${payload.phoneNumber}`;
	dispatchAction("setFieldsAndSend", payload);
}
function sendSecondGhlForm(state) {
	sendFirstGhlForm(state);
}
function reloadGhlForm(state) {
	dispatchAction("reload");
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
function initApp() {
	const page = new Page(state);
	const stepProgressBar = new ProgressBar("guide__progress-bar", steps);
	
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
				sendFirstGhlForm(state);
			}
		}
		// Calendar form is ready
		if (state.calendarIsReady !== prevState.calendarIsReady && state.calendarIsReady) {
			if (!state.firstGhlFormIsSent) { // Skip date and time select for calendar form in background
				prepareGhlCalendar();
			} else {
				setState((state) => {
					return {
						...state,
						processing: false,
					};
				});
			}
		}
		// User got to form filling step
		if (state.formIsAvailable && state.formIsAvailable != prevState.formIsAvailable && state.firstGhlFormIsSent) {
			setState((state) => {
				return {
					...state,
					processing: debug ? null : "processingForm",
					processingProgress: 0,
				};
			});
			sendSecondGhlForm(state);
		}
		// ghlForm just sent
		if (state.ghlFormIsSent && state.ghlFormIsSent !== prevState.ghlFormIsSent) {
			// first form was sent
			if (!state.firstGhlFormIsSent) {
				setState((state) => {
					return {
						...state,
						firstGhlFormIsSent: true,
						ghlFormIsSent: false,
						calendarIsReady: false,
						formIsAvailable: false,
						dataTimeIsPicked: false,
					};
				});
				deleteAppointment(state.appointmentId, bearer, setState);
				reloadGhlForm();
			} else { // second form was sent
				
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
		}

		// Automaticaly go to next step
		const { roofShade, creditScore, homeType } = state;
		const prevRoofShade = prevState.roofShade;
		const prevCreditScore = prevState.creditScore;
		const prevHomeType = prevState.homeType;
		if (roofShade !== prevRoofShade || creditScore !== prevCreditScore || homeType !== prevHomeType) {
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
	});
	
	initAccordions();
	initArticleLinks(state);
	initReferForm(state);
	const nextButton = new NextButton(state);
	const prevButton = new PrevButton(state);
	
	const avarageBillSlider = new RangeSlider("range__input", 40, "#00ABA1");
	const rangeValueIndicator = new RangeValueIndicator("power-bill-indicator", "${{value}}");
	avarageBillSlider.addIndicator(rangeValueIndicator);
	avarageBillSlider.subscribe((value) => {
		state.set((state) => {
			return { ...state, "avarageBill": value };
		});
	});
	state.set((state) => {
		return { ...state, "avarageBill": avarageBillSlider.getValue() };
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
}