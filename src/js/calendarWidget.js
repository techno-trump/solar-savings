const state = {
	"isGoogleApiInit": true,
	"currentStep": 7,
	"isOwner": false,
	"emailMe": true,
	"address": "509 Coney Island Ave, Brooklyn, NY 11218, USA",
	"isAddressAutocompleted": true,
	"homeType": "mobile",
	"roofShade": "uncertain",
	"creditScore": "below600",
	"firstName": "wer",
	"lastName": "wer",
	"email": "anton@gmail.com",
	"isEmailValid": true,
	"phoneNumber": "(352) 366-9898",
	"isPhoneNumberValid": true
};
sendFirstGhlForm(state)
function dispatchAction(name, payload) {
	const calendarFrameWindow = window.frames["calendar"].contentWindow;
	calendarFrameWindow.postMessage({ action: name,  payload }, "*");
}
function sendFirstGhlForm(state) {
	const payload = Object.assign({}, state);
	payload.phoneNumber = `+1${payload.phoneNumber}`;
	dispatchAction("setFieldsAndSend", payload);
}


window.postMessage({ action: "setFieldsAndSend",  payload }, "*");

<script type="text/javascript">
var dubug = true;
const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

class CalendarState {
	_store;
	_triggers = [];
	constructor(initialState) {
		this._store = initialState;
		// Watch initialization
		const mutationCallback = (mutations, observer) => {
			mutations.forEach(mutation => {
				const target = mutation.target;
				if (target.classList.contains("widgets-time-slot")) {
					if (target.classList.contains("actived") && target.querySelector(".btn")) {
						this.set("timeSelectIsAvailable", true);
					} else {
						this.set("timeSelectIsAvailable", false);
					}
				} else if (target.classList.contains("appointment_widgets--steps")){
					if (target.classList.contains("step-form")) {
						this.set("formIsAvailable", true);
					} else {
						this.set("formIsAvailable", false);
					}
				}
			});
		}
		const observer = new MutationObserver(mutationCallback);
		const options = {
			attributes: true,
			attributeFilter: ["class"],
			subtree: true,
			attributeOldValue: true,
		};
		const rootNode = document.querySelector(".appointment_widgets--booking");
		observer.observe(rootNode, options);

		document.querySelector(".appointment_widgets--inner").addEventListener("DOMNodeRemoved", (e) => {
			var target = e.target;
			if (target.classList) {
				if (target.classList.contains("datepick-info")) {
					this.set("isReady", true);
				} else if (target.classList.contains("widgets-slot-block")) {
					this.set("timePickIsAvailable", false);
				} else if (target.classList.contains("form-builder--wrap")) {
					this.set("formIsAvailable", false);
				} else if (target.classList.contains("btn-schedule")) {
					this.set("continueIsAvailable", false);
				}
			}
		});
		document.querySelector(".appointment_widgets--inner").addEventListener("DOMNodeInserted", (e) => {
			var target = e.target;
			if (target.classList) {
				if (target.classList.contains("datepick-info")) {
					this.set("isReady", false);
				} else if (target.classList.contains("widgets-slot-block")) {
					this.set("timePickIsAvailable", true);
				} else if (target.classList.contains("error")) {
					const errorNodes = document.querySelectorAll(".appointment_widgets--booking .fields-container .error");
					const errors = [];
					errorNodes.forEach((node) => {
						errors.push(node.textContent);
					});
					this.set("formFillingError", errors);
				} else if (target.classList.contains("btn-schedule")) {
					this.set("continueIsAvailable", true);
				} else if (target.classList.contains("appointment_widgets--confirmation")) {
					this.set("formIsSent", true);
				}
			}
		});
		if (document.querySelector(".appointment_widgets--booking .btn-schedule")) {
			this.set("continueIsAvailable", true);
		}
	}
	set(key, value) {
		this._store[key] = value;
		const triggers = this._triggers.slice(0);
		msg(`Calendar state is changed::${key}::${value}`);
		this._triggers = triggers.filter((trigger) => {
			var callback = trigger[0];
			var checker = trigger[1];
			if (checker(this._store)) {
				callback(this._store);
				return false;
			} else {
				return true;
			}
		});
	}
	force(key, value) {
		this._store[key] = value;
	}
	wait(callback, checker) {
		if (checker(this._store)) {
			callback(this._store);
		} else {
			this._triggers.push([callback, checker]);
		}
	}
	check(checker) {
		return checker(this._store);
	}
}
var calendarState = new CalendarState({
	isReady: false,
	timePickIsAvailable: false,
	timeSelectIsAvailable: false,
	continueIsAvailable: false,
	formIsAvailable: false,
});

calendarState.wait(() =>  dispatchAction("calendarIsReady", null), (calendarState) => calendarState.isReady);
calendarState.wait(() =>  dispatchAction("formIsAvailable", null), (calendarState) => calendarState.formIsAvailable);

function dispatchAction(name, payload) {
	msg(`dispatchAction::${name}::${JSON.stringify(payload)}`);
	window.parent && window.parent.postMessage({ action: name, payload }, "*");
}
function skipDateTimePick() {
	return new Promise((resolve, reject) => {
			calendarState.wait(resolve, (calendarState) => calendarState.isReady);
		})
		.then(() => {
			return new Promise((resolve, reject) => {
				const nextMonthBtnNode = document.querySelector(".appointment_widgets--steps .vdpHeader .arrowNext");
				nextMonthBtnNode.dispatchEvent(new Event("click"));

				const calendarNode = document.querySelector(".date-picker-calendar");
				if (!calendarNode) reject("Seems like calendar is not ready, can't find calendar node");
				const currentDateNode = calendarNode.querySelector(".today.vdpCell");
				if (!currentDateNode) reject("Seems like calendar is not ready, can't find current date node");
				currentDateNode.firstElementChild.dispatchEvent(new Event("click"));
				calendarState.force("isReady", false);
				calendarState.wait(resolve, (calendarState) => calendarState.isReady);
			});
		})
		.then(() => {
			return new Promise((resolve, reject) => {
				const calendarNode = document.querySelector(".date-picker-calendar");
				if (!calendarNode) reject("Seems like calendar is not ready, can't find calendar node");
				const currentDateNode = calendarNode.querySelector(".selectable.vdpCell");
				if (!currentDateNode) reject("Seems like calendar is not ready, can't find current date node");
				currentDateNode.firstElementChild.dispatchEvent(new Event("click"));
				calendarState.wait(resolve, (calendarState) => calendarState.timePickIsAvailable);
			});
		})
		.then(() => {
			return new Promise((resolve, reject) => {
				const timeSlotsNode = document.querySelector(".widgets-time-slots");
				if (!timeSlotsNode) reject("Seems like time slots is not ready");
				const timeSlotNode = timeSlotsNode.querySelector(".widgets-time-slot");
				if (!timeSlotNode) reject("Can't find time slot button");
				timeSlotNode.dispatchEvent(new Event("click"));
				calendarState.wait(resolve, (calendarState) => {
					return calendarState.timeSelectIsAvailable || calendarState.continueIsAvailable;
				});
			});
		})
		.then(() => {
			return new Promise((resolve, reject) => {
				if (calendarState.check((state) => state.timeSelectIsAvailable)) {
					const selectedTimeSlotNode = document.querySelector(".widgets-time-slot.actived");
					const selectTimeBtnNode = selectedTimeSlotNode.querySelector(".btn");
					selectTimeBtnNode.dispatchEvent(new Event("click"));
				} else {
					const scheduleBtnNode = document.querySelector(".btn-schedule");
					scheduleBtnNode.dispatchEvent(new Event("click"));
				}
				calendarState.wait(resolve, (calendarState) => calendarState.formIsAvailable);
			});
		})
		.then(() => {
			dispatchAction("formIsAvailable", null);
		})
		.catch((error) => {
			dispatchAction("error", error);
		});
}
function grabAppointmentInfo() {
	const durationNode = document.querySelector(".booking-info--duration .booking-info-value");
	const dateTimeNode = document.querySelector(".booking-info--datetime .booking-info-value");
	const timezoneNode = document.querySelector(".booking-info--timezone .booking-info-value");
	return {
		duration: durationNode.textContent,
		dateTime: dateTimeNode.textContent,
		timezone: timezoneNode.textContent
	};
}
function setFieldsAndSend(fields) {
		msg(fields);
	if (!calendarState.check(state => state.formIsAvailable)) {
		dispatchAction("error", { msg: "Can't fill calendar form. Form is unavailable" });
		return false;
	};
	new Promise((resolve, reject) => {
		var builderFormQuery = "#_builder-form";
		var inputQuery = "input[name]";
		var mapping = {
			//"average_electric_bill": Number(fields.avarageBill),
			//"address": fields.address,
			//"home_type": fields.homeType,
			//"roof_shade": fields.roofShade,
			//"credit_score": fields.creditScore,
			"first_name": fields.firstName,
			"last_name": fields.lastName,
			//"is_property_owner": fields.isOwner,
			"email": fields.email,
			//"email_me_my_report": fields.emailMe,
			"phone": fields.phoneNumber,
			//"full_name": `${fields.firstName} ${fields.lastName}`,
		};
		var formNode = document.querySelector(builderFormQuery);
		var inputNodes = formNode.querySelectorAll(inputQuery);
		inputNodes.forEach(function(inputNode) {
			var name = inputNode.getAttribute("name");
			if (typeof mapping[name] === "boolean") {
				inputNode.checked = mapping[name];
				inputNode.dispatchEvent(new Event("change"));
			} else if (name === "phone") {
				inputNode.value = "";
				mapping[name].split("").forEach(char => {
					inputNode.value += char;
					inputNode.dispatchEvent(new Event("input"));
				})
			} else {
				inputNode.value = mapping[name];
				inputNode.dispatchEvent(new Event("input"));
			}
		});
		const interval = setInterval(() => {
			const btnNode = document.querySelector(".appointment_widgets--booking .btn-schedule");
			if (!btnNode.disabled) btnNode.dispatchEvent(new Event("click"));
		}, 500);
		
		calendarState.wait(() => {
			clearInterval(interval);
			resolve();
		}, (calendarState) => calendarState.formIsSent);
		calendarState.wait((calendarState) => {
			clearInterval(interval);
			reject(calendarState.formFillingError);
		}, (calendarState) => calendarState.formFillingError && calendarState.formFillingError.join("").trim().length);
	})
	.then(() => {
		let calendarLinks = {};
		const calendarButtons = document.querySelectorAll(".appointment_widgets--booking .hl_events-buttons > a");
		calendarButtons.forEach(btnNode => {
			const buttonCaption = btnNode.querySelector(".calendar-button__text").textContent;
			const captionInLowerCase = buttonCaption.toLowerCase();
			if (captionInLowerCase.includes("google")) {
				calendarLinks.google = btnNode.getAttribute("href");
			} else if (captionInLowerCase.includes("outlook")) {
				calendarLinks.outlook = btnNode.getAttribute("href");
			}
		});
		dispatchAction("formIsSent", { calendarLinks, appointmentInfo: grabAppointmentInfo() });
	})
	.catch((error) => {
		dispatchAction("error", typeof error === "string" ? { msg: error } : { msg: error.msg });
	});
}
function msg(arg) {
	if (dubug) console.log(JSON.stringify(arg));
}
window.onmessage = function(e) {
	var data = e.data, action = e.data.action, payload = e.data.payload;
	try {
		msg(data);
		var typeOfData = typeof e.data;
		if (typeOfData === "object"){
			if (data instanceof Array) {
				if (data[0] === "set-sticky-contacts") {
					const appointmentId = JSON.parse(data[1]).appointment.id;
					dispatchAction("bookingCompleteResponse", { appointmentId: appointmentId });
				}
			} else if (action) {
				switch(action) {
					case "reload":
						window.location.reload();
						break;
					case "skipDateTimePick":
						skipDateTimePick();
						break;
					case "setFieldsAndSend":
						setFieldsAndSend(payload);
						break;
				}
			}
		}
	} catch(e) {
		console.log(e);
	}
};
</script>