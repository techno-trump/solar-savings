(() => {
    "use strict";
    const modules_flsModules = {};
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let bodyLockStatus = true;
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function functions_FLS(message) {
        setTimeout((() => {
            if (window.FLS) console.log(message);
        }), 0);
    }
    class Popup {
        constructor(options) {
            let config = {
                logging: true,
                init: true,
                attributeOpenButton: "data-popup",
                attributeCloseButton: "data-close",
                fixElementSelector: "[data-lp]",
                youtubeAttribute: "data-popup-youtube",
                youtubePlaceAttribute: "data-popup-youtube-place",
                setAutoplayYoutube: true,
                classes: {
                    popup: "popup",
                    popupContent: "popup__content",
                    popupActive: "popup_show",
                    bodyActive: "popup-show"
                },
                focusCatch: true,
                closeEsc: true,
                bodyLock: true,
                hashSettings: {
                    location: false,
                    goHash: false
                },
                on: {
                    beforeOpen: function() {},
                    afterOpen: function() {},
                    beforeClose: function() {},
                    afterClose: function() {}
                }
            };
            this.youTubeCode;
            this.isOpen = false;
            this.targetOpen = {
                selector: false,
                element: false
            };
            this.previousOpen = {
                selector: false,
                element: false
            };
            this.lastClosed = {
                selector: false,
                element: false
            };
            this._dataValue = false;
            this.hash = false;
            this._reopen = false;
            this._selectorOpen = false;
            this.lastFocusEl = false;
            this._focusEl = [ "a[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "button:not([disabled]):not([aria-hidden])", "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "area[href]", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])' ];
            this.options = {
                ...config,
                ...options,
                classes: {
                    ...config.classes,
                    ...options?.classes
                },
                hashSettings: {
                    ...config.hashSettings,
                    ...options?.hashSettings
                },
                on: {
                    ...config.on,
                    ...options?.on
                }
            };
            this.bodyLock = false;
            this.options.init ? this.initPopups() : null;
        }
        initPopups() {
            this.popupLogging(`Проснулся`);
            this.eventsPopup();
        }
        eventsPopup() {
            document.addEventListener("click", function(e) {
                const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
                if (buttonOpen) {
                    e.preventDefault();
                    this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ? buttonOpen.getAttribute(this.options.attributeOpenButton) : "error";
                    this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute) ? buttonOpen.getAttribute(this.options.youtubeAttribute) : null;
                    if ("error" !== this._dataValue) {
                        if (!this.isOpen) this.lastFocusEl = buttonOpen;
                        this.targetOpen.selector = `${this._dataValue}`;
                        this._selectorOpen = true;
                        this.open();
                        return;
                    } else this.popupLogging(`Ой ой, не заполнен атрибут у ${buttonOpen.classList}`);
                    return;
                }
                const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
                if (buttonClose || !e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen) {
                    e.preventDefault();
                    this.close();
                    return;
                }
            }.bind(this));
            document.addEventListener("keydown", function(e) {
                if (this.options.closeEsc && 27 == e.which && "Escape" === e.code && this.isOpen) {
                    e.preventDefault();
                    this.close();
                    return;
                }
                if (this.options.focusCatch && 9 == e.which && this.isOpen) {
                    this._focusCatch(e);
                    return;
                }
            }.bind(this));
            if (this.options.hashSettings.goHash) {
                window.addEventListener("hashchange", function() {
                    if (window.location.hash) this._openToHash(); else this.close(this.targetOpen.selector);
                }.bind(this));
                window.addEventListener("load", function() {
                    if (window.location.hash) this._openToHash();
                }.bind(this));
            }
        }
        open(selectorValue) {
            if (bodyLockStatus) {
                this.bodyLock = document.documentElement.classList.contains("lock") && !this.isOpen ? true : false;
                if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) {
                    this.targetOpen.selector = selectorValue;
                    this._selectorOpen = true;
                }
                if (this.isOpen) {
                    this._reopen = true;
                    this.close();
                }
                if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
                if (!this._reopen) this.previousActiveElement = document.activeElement;
                this.targetOpen.element = document.querySelector(this.targetOpen.selector);
                if (this.targetOpen.element) {
                    if (this.youTubeCode) {
                        const codeVideo = this.youTubeCode;
                        const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`;
                        const iframe = document.createElement("iframe");
                        iframe.setAttribute("allowfullscreen", "");
                        const autoplay = this.options.setAutoplayYoutube ? "autoplay;" : "";
                        iframe.setAttribute("allow", `${autoplay}; encrypted-media`);
                        iframe.setAttribute("src", urlVideo);
                        if (!this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) {
                            this.targetOpen.element.querySelector(".popup__text").setAttribute(`${this.options.youtubePlaceAttribute}`, "");
                        }
                        this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(iframe);
                    }
                    if (this.options.hashSettings.location) {
                        this._getHash();
                        this._setHash();
                    }
                    this.options.on.beforeOpen(this);
                    document.dispatchEvent(new CustomEvent("beforePopupOpen", {
                        detail: {
                            popup: this
                        }
                    }));
                    this.targetOpen.element.classList.add(this.options.classes.popupActive);
                    document.documentElement.classList.add(this.options.classes.bodyActive);
                    if (!this._reopen) !this.bodyLock ? bodyLock() : null; else this._reopen = false;
                    this.targetOpen.element.setAttribute("aria-hidden", "false");
                    this.previousOpen.selector = this.targetOpen.selector;
                    this.previousOpen.element = this.targetOpen.element;
                    this._selectorOpen = false;
                    this.isOpen = true;
                    setTimeout((() => {
                        this._focusTrap();
                    }), 50);
                    this.options.on.afterOpen(this);
                    document.dispatchEvent(new CustomEvent("afterPopupOpen", {
                        detail: {
                            popup: this
                        }
                    }));
                    this.popupLogging(`Открыл попап`);
                } else this.popupLogging(`Ой ой, такого попапа нет.Проверьте корректность ввода. `);
            }
        }
        close(selectorValue) {
            if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) this.previousOpen.selector = selectorValue;
            if (!this.isOpen || !bodyLockStatus) return;
            this.options.on.beforeClose(this);
            document.dispatchEvent(new CustomEvent("beforePopupClose", {
                detail: {
                    popup: this
                }
            }));
            if (this.youTubeCode) if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = "";
            this.previousOpen.element.classList.remove(this.options.classes.popupActive);
            this.previousOpen.element.setAttribute("aria-hidden", "true");
            if (!this._reopen) {
                document.documentElement.classList.remove(this.options.classes.bodyActive);
                !this.bodyLock ? bodyUnlock() : null;
                this.isOpen = false;
            }
            this._removeHash();
            if (this._selectorOpen) {
                this.lastClosed.selector = this.previousOpen.selector;
                this.lastClosed.element = this.previousOpen.element;
            }
            this.options.on.afterClose(this);
            document.dispatchEvent(new CustomEvent("afterPopupClose", {
                detail: {
                    popup: this
                }
            }));
            setTimeout((() => {
                this._focusTrap();
            }), 50);
            this.popupLogging(`Закрыл попап`);
        }
        _getHash() {
            if (this.options.hashSettings.location) this.hash = this.targetOpen.selector.includes("#") ? this.targetOpen.selector : this.targetOpen.selector.replace(".", "#");
        }
        _openToHash() {
            let classInHash = document.querySelector(`.${window.location.hash.replace("#", "")}`) ? `.${window.location.hash.replace("#", "")}` : document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` : null;
            const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) : document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash.replace(".", "#")}"]`);
            if (buttons && classInHash) this.open(classInHash);
        }
        _setHash() {
            history.pushState("", "", this.hash);
        }
        _removeHash() {
            history.pushState("", "", window.location.href.split("#")[0]);
        }
        _focusCatch(e) {
            const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
            const focusArray = Array.prototype.slice.call(focusable);
            const focusedIndex = focusArray.indexOf(document.activeElement);
            if (e.shiftKey && 0 === focusedIndex) {
                focusArray[focusArray.length - 1].focus();
                e.preventDefault();
            }
            if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
                focusArray[0].focus();
                e.preventDefault();
            }
        }
        _focusTrap() {
            const focusable = this.previousOpen.element.querySelectorAll(this._focusEl);
            if (!this.isOpen && this.lastFocusEl) this.lastFocusEl.focus(); else focusable[0].focus();
        }
        popupLogging(message) {
            this.options.logging ? functions_FLS(`[Попапос]: ${message}`) : null;
        }
    }
    modules_flsModules.popup = new Popup({});
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    class ProgressBar {
        #map={};
        #currentStep=0;
        #currentSubStep=0;
        #rootClassName;
        #meta;
        static itemTemplateId="progress-bar-item";
        static itemClassName="progress-bar__item";
        static itemCaptionClassName="progress-bar__item-caption";
        static itemStateClassName="progress-bar__item-state";
        static itemHiddenClassName="progress-bar__item_hidden";
        constructor(rootClassName, stepsMeta) {
            this.#rootClassName = rootClassName;
            this.#meta = stepsMeta;
            const rootNode = document.querySelector(`.${rootClassName}`);
            const templateHtml = document.getElementById(ProgressBar.itemTemplateId).innerHTML;
            rootNode.innerHTML = stepsMeta.reduce(((acc, stepMeta, idx) => {
                if (stepMeta.alias) this.#map[stepMeta.alias] = stepMeta;
                const itemStateText = stepMeta.subStepsCount > 1 ? `0/${stepMeta.subStepsCount}` : "";
                return acc + templateHtml.replace("{{idx}}", idx).replace("{{caption}}", stepMeta.caption).replace("{{state}}", itemStateText);
            }), "");
            const firstItemNode = rootNode.firstElementChild;
            firstItemNode.classList.remove(ProgressBar.itemHiddenClassName);
            const lastItemNode = rootNode.lastElementChild;
            lastItemNode.lastElementChild.remove();
        }
        next() {
            if (this.#currentStep >= this.#meta.length) return false;
            const currentStepMeta = this.#meta[this.#currentStep];
            const rootNode = document.querySelector(`.${this.#rootClassName}`);
            const currentStepItemNode = rootNode.querySelector(`[data-idx='${this.#currentStep}']`);
            if (this.#currentSubStep < currentStepMeta.subStepsCount - 1) {
                this.#currentSubStep++;
                currentStepItemNode.lastElementChild.textContent = `${this.#currentSubStep}/${currentStepMeta.subStepsCount}`;
            } else {
                this.#currentSubStep = 0;
                this.#currentStep++;
                currentStepItemNode.classList.add("progress-bar__item_fulfilled");
                if (this.#currentStep < this.#meta.length) {
                    currentStepItemNode.lastElementChild.textContent = null;
                    currentStepItemNode.lastElementChild.classList.add("icon-success-arrow");
                    currentStepItemNode.nextElementSibling.classList.remove(ProgressBar.itemHiddenClassName);
                }
            }
            return true;
        }
        prev() {
            if (this.#currentStep <= 0) return false;
            const rootNode = document.querySelector(`.${this.#rootClassName}`);
            let stepItemNode, stepMeta;
            if (this.#currentSubStep > 0) {
                this.#currentSubStep--;
                stepItemNode = rootNode.querySelector(`[data-idx='${this.#currentStep}']`);
                stepMeta = this.#meta[this.#currentStep];
                stepItemNode.lastElementChild.textContent = `${this.#currentSubStep}/${stepMeta.subStepsCount}`;
            } else {
                this.#currentStep--;
                stepItemNode = rootNode.querySelector(`[data-idx='${this.#currentStep}']`);
                stepMeta = this.#meta[this.#currentStep];
                stepItemNode.lastElementChild.classList.remove("icon-success-arrow");
                stepItemNode.classList.remove("progress-bar__item_fulfilled");
                if (stepMeta.subStepsCount > 1) {
                    this.#currentSubStep = stepMeta.subStepsCount - 1;
                    stepItemNode.lastElementChild.textContent = `${this.#currentSubStep}/${stepMeta.subStepsCount}`;
                }
            }
        }
    }
    const debug = false;
    const consoleInfo = (...args) => {
        debug && console.log(...args);
    };
    function isStringFulfilled(string) {
        return "string" === typeof string && string.length > 0;
    }
    let postId;
    let apiUrl;
    const steps = [ {
        alias: "power_bill",
        caption: "POWER BILL",
        subStepsCount: 1
    }, {
        alias: "address",
        caption: "ADDRESS",
        subStepsCount: 1
    }, {
        alias: "credit_score",
        caption: "CREDIT SCORE",
        subStepsCount: 1
    }, {
        alias: "name",
        caption: "NAME",
        subStepsCount: 1
    }, {
        alias: "contact",
        caption: "CONTACT",
        subStepsCount: 2
    }, {
        alias: "thank_you",
        caption: "THANK YOU",
        subStepsCount: 1
    } ];
    const stepsMapping = [ "avaragePowerBill", "address", "creditScore", "contact", "email", "phoneNumber", "booking", "thankYou" ];
    const phoneNumberChecker = value => {
        if ("string" === typeof value && /^\(\d{3}\)\s\d{3}-\d{4}$/.test(value)) return null; else return "Error: phone number is incorrect";
    };
    const phoneNumberFormatter = string => {
        if (!string || "string" !== typeof string) return "";
        const allNumbers = string.replace(/^\+1?/, "").match(/\d/gi);
        if (!allNumbers) return "";
        return allNumbers.reduce(((acc, digit) => {
            switch (acc.length) {
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
        }), []).join("");
    };
    const emailChecker = string => {
        if ("string" === typeof string && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(string)) return null; else return "Error: email is incorrect";
    };
    class DataStore {
        _store;
        _prevStore={};
        _subscriptions=[];
        constructor(initialState = {}) {
            this._store = initialState;
        }
        set(setter) {
            this._prevStore = this._store;
            this._store = setter(this._store);
            this._subscriptions.forEach((callback => callback(this._store, this._prevStore, (setter => {
                this.set(setter);
            }))));
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
        _onChangeListeners=[];
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
            const updateStyle = node => {
                const inputWidth = node.offsetWidth;
                const thumbPercentage = this._thumbWidth / inputWidth;
                const thumbMiddleOffset = thumbPercentage / 2 * 100;
                const borderOffset = thumbMiddleOffset + this._percentage * (1 - thumbPercentage);
                let bgStyle = `linear-gradient(90deg, ${lowerColor} ${thumbMiddleOffset}%, ${lowerColor} ${borderOffset}%`;
                if (this._progress < this._volume) bgStyle += `, ${void 0 !== higherColor ? higherColor : "rgba(255,255,255,0)"} ${borderOffset}%`;
                bgStyle += ")";
                node.style.backgroundImage = bgStyle;
            };
            updateStyle(inputNode);
            inputNode.addEventListener("input", (e => {
                e.preventDefault();
                this._setValue(e.currentTarget.value);
                updateStyle(e.currentTarget);
                if (this._indicator) this._updateIndicator();
                this._onChangeListeners.forEach((callback => callback(this._value, this._percentage)));
            }));
            window.addEventListener("resize", (e => {
                const inputNode = document.querySelector(selector);
                updateStyle(inputNode);
            }));
            observeVisibility();
            function observeVisibility() {
                const options = {
                    rootMargin: "0px",
                    threshold: 0
                };
                const callback = (entries, observer) => {
                    entries.forEach((entry => {
                        if (entry.target instanceof HTMLElement && entry.target.id === inputNode.id) updateStyle(entry.target);
                    }));
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
            this._onChangeListeners = this._onChangeListeners.filter((inStackCallback => inStackCallback !== callback));
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
            rootNode.clientWidth;
            const valueNode = rootNode.firstElementChild;
            if (this._template) if ("function" === typeof this._template) valueNode.textContent = this._template(value); else valueNode.textContent = this._template.replace("{{value}}", value); else valueNode.textContent = value;
            const valueNodeWidth = valueNode.offsetWidth;
            valueNode.style.marginLeft = `calc(${percentage}% - ${valueNodeWidth / 2}px)`;
        }
    }
    class AddressInput {
        static rootClassName=".base-form__address-field";
        _getRootNode=() => document.querySelector(AddressInput.rootClassName);
        constructor(state) {
            this._state = state;
            const rootNode = this._getRootNode();
            const inputNode = rootNode.lastElementChild;
            inputNode.addEventListener("blur", (e => {
                this._onBlur(e);
            }));
            inputNode.addEventListener("input", (e => {
                this._onInput(e);
            }));
            if (state.store.isGoogleApiInit) this._initAutocomplete(rootNode); else state.onChange(((state, prevState) => {
                if (state.isGoogleApiInit !== prevState.isGoogleApiInit && state.isGoogleApiInit) this._initAutocomplete(rootNode);
            }));
        }
        _initAutocomplete(rootNode) {
            const inputNode = (rootNode || this._getRootNode()).lastElementChild;
            const options = {
                fields: [ "formatted_address", "geometry", "name" ],
                strictBounds: false,
                componentRestrictions: {
                    country: "us"
                }
            };
            const autocomplete = new google.maps.places.Autocomplete(inputNode, options);
            autocomplete.addListener("place_changed", (() => {
                const placeResult = autocomplete.getPlace();
                this._state.set((state => ({
                    ...state,
                    address: placeResult.formatted_address,
                    isAddressAutocompleted: true
                })));
            }));
            consoleInfo("address autocomplete initialized");
        }
        _onInput(e) {
            this._state.set((state => ({
                ...state,
                address: e.currentTarget.value,
                isAddressAutocompleted: false
            })));
        }
        _onBlur(e) {
            this._state.set((state => ({
                ...state,
                address: e.currentTarget.value,
                isAddressAutocompleted: false
            })));
        }
    }
    class RadioButtonSelect {
        _formName;
        _name;
        constructor(formName, name, state) {
            this._formName = formName;
            this._name = name;
            const radioNodes = document.querySelectorAll(`form[name='${formName}'] input[name='${name}']`);
            const handler = e => {
                state.set((state => ({
                    ...state,
                    [name]: e.currentTarget.value
                })));
            };
            radioNodes && radioNodes.forEach((node => node.addEventListener("change", handler)));
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
            this._isValidFieldName = `is${name.replace(/^(.)/g, ((match, p1) => p1.toUpperCase()))}Valid`;
            const node = document.forms[this._formName][this._name];
            const changeHandler = e => {
                state.set((state => {
                    const value = e.currentTarget.value;
                    let newState = {
                        ...state,
                        [name]: value
                    };
                    if (validator) if (isStringFulfilled(value)) {
                        const errorMsg = validator(value);
                        consoleInfo(`changeHandler::errorMsg:${errorMsg}::value:${value}`);
                        if (errorMsg) {
                            e.currentTarget.parentElement.classList.add("error");
                            e.currentTarget.parentElement.classList.remove("valid");
                            newState[this._isValidFieldName] = false;
                        } else {
                            e.currentTarget.parentElement.classList.remove("error");
                            e.currentTarget.parentElement.classList.add("valid");
                            newState[this._isValidFieldName] = true;
                        }
                    } else {
                        e.currentTarget.parentElement.classList.remove("error");
                        e.currentTarget.parentElement.classList.remove("valid");
                        newState[this._isValidFieldName] = false;
                    }
                    return newState;
                }));
            };
            const inputHandler = e => {
                let value = e.currentTarget.value;
                let isValid;
                if (validator) isValid = !validator(value); else isValid = isStringFulfilled(value);
                if (isValid) {
                    e.currentTarget.parentElement.classList.remove("error");
                    e.currentTarget.parentElement.classList.add("valid");
                } else {
                    e.currentTarget.parentElement.classList.remove("valid");
                    if (formatter) e.currentTarget.value = formatter(value);
                }
                state.set((state => ({
                    ...state,
                    [this._isValidFieldName]: isValid,
                    [name]: e.currentTarget.value
                })));
            };
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
            if (isRequired && "" === node.value) {
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
            const pullValue = node => {
                state.set((state => ({
                    ...state,
                    [name]: node.checked
                })));
            };
            pullValue(node);
            const handler = e => {
                pullValue(e.currentTarget);
            };
            node.addEventListener("change", handler);
            node.addEventListener("click", (e => {
                e.stopPropagation();
            }));
            rootNode.addEventListener("click", (e => {
                e.preventDefault();
                e.currentTarget.firstElementChild.checked = !e.currentTarget.firstElementChild.checked;
                e.currentTarget.firstElementChild.dispatchEvent(new Event("change"));
            }));
        }
    }
    class GuideButton {
        static rootClassName=".step-page-btn";
        static captionClassName=".step-page-btn__caption";
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
            this._state.onChange(((state, prevState) => {
                stepsMapping[prevState.currentStep];
                const currentStepAlias = stepsMapping[state.currentStep];
                const {isGoogleApiInit, isAddressAutocompleted} = state;
                if (checkStepValues(currentStepAlias)) this.enable(); else this.disable();
                if (isVisible(currentStepAlias)) this.show(); else this.hide();
                function isVisible(stepAlias) {
                    switch (stepAlias) {
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
                    switch (stepAlias) {
                      case "avaragePowerBill":
                        return true;

                      case "address":
                        const {address} = state;
                        return "string" === typeof address && address.length > 3;

                      case "homeType":
                        const {homeType} = state;
                        return void 0 !== homeType;

                      case "roofShade":
                        const {roofShade} = state;
                        return void 0 !== roofShade;

                      case "creditScore":
                        const {creditScore} = state;
                        return void 0 !== creditScore;

                      case "contact":
                        const {firstName, lastName} = state;
                        return isStringFulfilled(firstName) && isStringFulfilled(lastName);

                      case "email":
                        const {isEmailValid} = state;
                        return isEmailValid;

                      default:
                        return false;
                    }
                }
            }));
            this._selectNode().addEventListener("click", (e => {
                e.preventDefault();
                this._state.set((state => ({
                    ...state,
                    currentStep: state.currentStep + 1
                })));
            }));
        }
    }
    class PrevButton extends GuideButton {
        _state;
        constructor(state) {
            super("prev");
            this._state = state;
            const handleVisibility = state => {
                const currentStepAlias = stepsMapping[state.currentStep];
                if ("homeType" === currentStepAlias || "roofShade" === currentStepAlias || "address" === currentStepAlias || "creditScore" === currentStepAlias || "contact" === currentStepAlias || "email" === currentStepAlias || "phoneNumber" === currentStepAlias) this.show(); else this.hide();
            };
            handleVisibility(this._state.store);
            this._state.onChange(((state, prevState) => {
                handleVisibility(state);
            }));
            this._selectNode().addEventListener("click", (e => {
                e.preventDefault();
                this._state.set((state => ({
                    ...state,
                    currentStep: state.currentStep - 1
                })));
            }));
        }
    }
    class SubmitButton extends GuideButton {
        _state;
        constructor(state) {
            super("submit");
            this._state = state;
            this.hide();
            this._state.onChange(((state, prevState) => {
                if (state.isPhoneNumberValid) this.enable(); else this.disable();
                const currentStepAlias = stepsMapping[state.currentStep];
                if ("phoneNumber" === currentStepAlias) this.show(); else this.hide();
            }));
            this._selectNode().addEventListener("click", (e => {
                e.preventDefault();
                this._state.set((state => ({
                    ...state,
                    currentStep: state.currentStep + 1
                })));
            }));
        }
    }
    class ProcessingBar {
        _state;
        constructor(state, lowerColor, higherColor) {
            this._state = state;
            this._state.onChange(((state, prevState, setState) => {
                if (state.processing) if (0 === state.processingProgress || state.processingProgress !== prevState.processingProgress) {
                    const node = document.querySelector(".processing-indicator__bar");
                    let bgStyle = `linear-gradient(90deg, ${lowerColor} 0%, ${lowerColor} ${state.processingProgress}%`;
                    bgStyle += `, ${void 0 !== higherColor ? higherColor : "rgba(255,255,255,0)"} ${state.processingProgress}%`;
                    bgStyle += ")";
                    node.style.backgroundImage = bgStyle;
                    if (state.processingProgress < 80) setTimeout((() => {
                        setState((state => ({
                            ...state,
                            processingProgress: state.processingProgress + Math.random()
                        })));
                    }), 50);
                }
            }));
        }
    }
    class Page {
        static rootClassName=".page";
        _state;
        _selectNode() {
            return document.querySelector(Page.rootClassName);
        }
        constructor(state) {
            this._state = state;
            this._selectNode().setAttribute("data-step", stepsMapping[state.store["currentStep"]]);
            this._state.onChange(((state, prevState) => {
                if (state.processing) this._selectNode().setAttribute("data-step", state.processing); else if (state.currentLocation) this._selectNode().setAttribute("data-step", "article"); else {
                    const currentStepAlias = stepsMapping[state.currentStep];
                    if ("thankYou" === currentStepAlias && state.badSummary) this._selectNode().setAttribute("data-step", "badSummary"); else this._selectNode().setAttribute("data-step", currentStepAlias);
                }
            }));
        }
    }
    function initReferForm(state) {
        const referFirstNameInput = new Input("refer", "referFirstName", state);
        const referLastNameInput = new Input("refer", "referLastName", state);
        const referEmailInput = new Input("refer", "referEmail", state, emailChecker);
        const referPhoneInput = new Input("refer", "referPhone", state, phoneNumberChecker, phoneNumberFormatter);
        let fields = [ referFirstNameInput, referLastNameInput, referEmailInput, referPhoneInput ];
        const submitBtnNode = document.querySelector("#submit-refer-btn");
        submitBtnNode.addEventListener("click", (e => {
            const formIsValid = fields.reduce(((acc, field) => field.validate() && acc), true);
            const store = state.store;
            if (formIsValid) {
                const contactData = {
                    email: store.referEmail,
                    phone: store.referPhone,
                    firstName: store.referFirstName,
                    lastName: store.referLastName,
                    source: "public api",
                    customField: {
                        referred_by: `${store.firstName} ${store.lastName} ${store.phoneNumber}`
                    }
                };
                createContact(contactData, "Refere", state);
            }
        }));
        let sendingProcessInterval, sendingProcessCycle = 0;
        state.onChange(((state, prevState, setState) => {
            if (state.sendingRefere !== prevState.sendingRefere) {
                const submitBtnNode = document.querySelector("#submit-refer-btn");
                const captionNode = submitBtnNode.querySelector(".summary-block-btn__caption");
                submitBtnNode.disabled = state.sendingRefere;
                if (state.sendingRefere) {
                    if (!sendingProcessInterval) {
                        captionNode.textContent = "Sending";
                        sendingProcessInterval = setInterval((() => {
                            captionNode.textContent = captionNode.textContent.replace(/\.*$/, ".".repeat(sendingProcessCycle));
                            if (sendingProcessCycle < 3) sendingProcessCycle++; else sendingProcessCycle = 0;
                        }), 300);
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
                    setTimeout((() => {
                        sendingResultNode.classList.remove("show");
                    }), 3e3);
                    if (sendingProcessInterval) {
                        clearInterval(sendingProcessInterval);
                        sendingProcessInterval = null;
                    }
                    captionNode.textContent = "Submit another referral";
                }
            }
        }));
        function resetFields() {
            fields.forEach((field => {
                field.reset();
            }));
        }
    }
    function initArticleLinks(state) {
        const linkNodes = document.querySelectorAll("a[data-link]");
        linkNodes.forEach((node => {
            const location = node.getAttribute("data-link");
            state.onChange(((state, prevState, setState) => {
                const linkNode = document.querySelector(`a[data-link="${location}"]`);
                if (state.currentLocation === location) linkNode.classList.add("active"); else linkNode.classList.remove("active");
            }));
            node.addEventListener("click", (e => {
                e.preventDefault();
                const location = e.currentTarget.getAttribute("data-link");
                document.querySelector(".page");
                if ("back" === location) state.set((state => ({
                    ...state,
                    currentLocation: null
                }))); else state.set((state => ({
                    ...state,
                    currentLocation: location
                })));
                injectArticleIframe(location);
            }));
        }));
        function injectArticleIframe(location) {
            const mapping = {
                "privacy-policy": "?page_id=5758",
                "terms-and-conditions": "?page_id=5760"
            };
            const articleBodyNode = document.querySelector(".article__body");
            if (articleBodyNode.firstElementChild) articleBodyNode.removeChild(articleBodyNode.firstElementChild);
            articleBodyNode.innerHTML = `<iframe id="article" scrolling="no" style="width: 100%; border:none; overflow: hidden;" src="https://calculatemysolarsavings.com/${mapping[location]}/"></iframe>`;
        }
    }
    function setArticleIframeHeight(height) {
        window.frames.article.style.height = `${height}px`;
    }
    function createContact(data, identifier, state) {
        const setState = callback => {
            if (state.set) state.set(callback); else state(callback);
        };
        setState((state => ({
            ...state,
            [`sending${identifier}`]: true
        })));
        consoleInfo(`createContact:${identifier}:data${JSON.stringify(data)}`);
        return fetch(`${apiUrl}ghl-hooks/v1/contacts/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            referrerPolicy: "no-referrer",
            body: JSON.stringify({
                postId,
                contact: data
            })
        }).then((response => response.json())).then((result => {
            setState((state => ({
                ...state,
                [`sending${identifier}Result`]: result,
                [`sending${identifier}`]: false
            })));
        })).catch((reason => {
            setState((state => ({
                ...state,
                [`sending${identifier}Result`]: reason,
                [`sending${identifier}`]: false
            })));
        }));
    }
    const initialState = {
        isGoogleApiInit: false,
        currentStep: 0
    };
    const state = new DataStore(initialState);
    window.initGoogleApi = () => {
        state.set((state => ({
            ...state,
            isGoogleApiInit: true
        })));
    };
    window.addEventListener("DOMContentLoaded", onLoaded);
    window.addEventListener("message", (function(e) {
        if (e.data instanceof Array) {
            consoleInfo(`window::message::${e.data[0]}::${e.data[2]}`);
            if ("set-sticky-contacts" === e.data[0]) {
                const appointmentId = JSON.parse(e.data[2]).appointment.id;
                state.set((state => ({
                    ...state,
                    appointmentId
                })));
            }
        } else {
            consoleInfo(`window::message::${e.data.action}`);
            switch (e.data.action) {
              case "calendarIsReady":
                state.set((state => ({
                    ...state,
                    calendarIsReady: true
                })));
                break;

              case "formIsAvailable":
                state.set((state => ({
                    ...state,
                    formIsAvailable: true
                })));
                break;

              case "dataTimeIsPicked":
                state.set((state => ({
                    ...state,
                    dataTimeIsPicked: true
                })));
                break;

              case "formIsSent":
                state.set((state => ({
                    ...state,
                    ghlFormIsSent: true,
                    addToCalendarLinks: e.data.payload.calendarLinks,
                    appointmentInfo: e.data.payload.appointmentInfo
                })));
                break;

              case "error":
                state.set((state => ({
                    ...state,
                    ghlFormError: e.data.payload
                })));
                break;

              case "iframeHeightReport":
                setArticleIframeHeight(e.data.payload.height);
                break;
            }
        }
    }));
    function onLoaded(e) {
        initApp();
    }
    function dispatchAction(name, payload) {
        const calendarFrameWindow = document.querySelector(".booking-step iframe").contentWindow;
        calendarFrameWindow.postMessage({
            action: name,
            payload
        }, "*");
    }
    function submitGhlForm(store) {
        const payload = {
            firstName: store.firstName,
            lastName: store.lastName,
            email: store.email,
            phoneNumber: `+1${store.phoneNumber}`
        };
        dispatchAction("setFieldsAndSend", payload);
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
                    if (activeSectionElem) activeSectionElem.classList.remove("accordion__item_opened");
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
    function calculateExpenses(yearlyPowerBill, yearsNumber) {
        const coefficient = 1 + 3.5 / 100;
        return yearlyPowerBill * ((Math.pow(coefficient, yearsNumber + 1) - 1) / (coefficient - 1) - 1);
    }
    function calculateSavings(avaragePowerBill, yearsNumber) {
        const yearlyPowerBill = 12 * avaragePowerBill;
        const expenses = calculateExpenses(yearlyPowerBill, yearsNumber);
        const solarCost = .75 * yearlyPowerBill * yearsNumber;
        return expenses - solarCost;
    }
    function initSavingsInformationUpdates(store) {
        const textNode = document.querySelector(".savings-calculator__text");
        const initialHTML = textNode.innerHTML;
        const splitDigitGroups = value => String(value).split(/\B(?=(?:\d{3})+$)/g).join(",");
        const update = (yearsNumber, avaragePowerBill) => {
            const savings25 = Math.floor(calculateSavings(avaragePowerBill, yearsNumber));
            const savings50 = 2 * savings25;
            const yearsLabel = 1 == yearsNumber ? "year" : "years";
            const updatedHTML = initialHTML.replace("{{avaragePowerBill}}", splitDigitGroups(avaragePowerBill)).replace("{{yearsNumber}}", yearsNumber).replace("{{yearsLabel}}", yearsLabel).replace("{{savings25}}", splitDigitGroups(savings25)).replace("{{savings50}}", splitDigitGroups(savings50));
            textNode.innerHTML = updatedHTML;
        };
        store.onChange(((state, prevState) => {
            if (state.avarageBill !== prevState.avarageBill || state.yearsToCalculate !== prevState.yearsToCalculate) update(Number(state.yearsToCalculate), Number(state.avarageBill));
        }));
    }
    function initApp() {
        const wpApiNode = document.querySelector("[rel='https://api.w.org/']");
        if (wpApiNode) apiUrl = wpApiNode.href; else apiUrl = "https://calculatemysolarsavings.com/index.php?rest_route=/";
        postId = parseInt(document.querySelector("#post_id").textContent);
        new Page(state);
        state.onChange(((state, prevState, setState) => {
            const {currentStep} = state;
            const prevStep = prevState.currentStep;
            const currentStepAlias = stepsMapping[currentStep];
            if (state.address !== prevState.address || state.avarageBill !== prevState.avarageBill) if (state.rebatesAreChecked) setState((state => ({
                ...state,
                rebatesAreChecked: false
            })));
            if (state.processingProgress !== prevState.processingProgress) if (state.processingProgress > 80 && "homeType" === currentStepAlias) setState((state => ({
                ...state,
                processing: null,
                processingProgress: 0
            })));
            if (currentStep !== prevStep) {
                if (currentStep < prevStep) stepProgressBar.prev(); else stepProgressBar.next();
                if ("homeType" === currentStepAlias && !state.rebatesAreChecked) setState((state => ({
                    ...state,
                    rebatesAreChecked: true,
                    processing: "checkingRebates",
                    processingProgress: 0
                }))); else if ("booking" === currentStepAlias) {
                    const sendFormServiceBtnNode = document.querySelector("#send-form-btn");
                    sendFormServiceBtnNode.dispatchEvent(new Event("click"));
                    if (!state.isOwner || "below600" === state.creditScore) {
                        const badSummaryTitleNode = document.querySelector("#bad-summary-title");
                        const badSummaryTitle = badSummaryTitleNode.textContent;
                        badSummaryTitleNode.textContent = badSummaryTitle.replace("{{firstName}}", state.firstName);
                        setState((state => ({
                            ...state,
                            processing: debug ? null : "processingForm",
                            processingProgress: 0,
                            currentStep: stepsMapping.indexOf("thankYou"),
                            badSummary: true
                        })));
                        const contactData = collectContactData(state, [ "disqualified" ]);
                        createContact(contactData, "Customer", setState);
                    } else {
                        const bookingTitleNode = document.querySelector(".booking-step__title");
                        const bookingTitle = bookingTitleNode.textContent;
                        bookingTitleNode.textContent = bookingTitle.replace("{{firstName}}", state.firstName);
                        setState((state => ({
                            ...state,
                            processing: debug ? null : "processingForm",
                            processingProgress: 0
                        })));
                        const contactData = collectContactData(state);
                        createContact(contactData, "Customer", setState);
                    }
                }
            }
            if (state.calendarIsReady !== prevState.calendarIsReady && state.calendarIsReady) setState((state => ({
                ...state,
                processing: false
            })));
            if (state.sendingCustomer !== prevState.sendingCustomer && !state.sendingCustomer) if (state.sendingCustomerResult.contact.id) setState((state => ({
                ...state,
                processing: false
            })));
            if (state.formIsAvailable && state.formIsAvailable != prevState.formIsAvailable) {
                setState((state => ({
                    ...state,
                    processing: debug ? null : "processingBooking",
                    processingProgress: 0
                })));
                const scheduleAppointmentServiceBtnNode = document.querySelector("#schedule-appointment");
                scheduleAppointmentServiceBtnNode.dispatchEvent(new Event("click"));
                submitGhlForm(state);
            }
            if (state.ghlFormIsSent && state.ghlFormIsSent !== prevState.ghlFormIsSent) {
                const summaryTitleNode = document.querySelector(".summary__title");
                const summaryTitle = summaryTitleNode.textContent;
                summaryTitleNode.textContent = summaryTitle.replace("{{firstName}}", state.firstName);
                replaceCalendarBtnHref("google");
                replaceCalendarBtnHref("outlook");
                replaceAppointmentInfo();
                setState((state => ({
                    ...state,
                    currentStep: state.currentStep + 1,
                    processing: null,
                    processingProgress: 0
                })));
            }
            const {roofShade, creditScore, homeType} = state;
            const prevRoofShade = prevState.roofShade;
            const prevCreditScore = prevState.creditScore;
            const prevHomeType = prevState.homeType;
            if (roofShade !== prevRoofShade && isStringFulfilled(roofShade) && "roofShade" === currentStepAlias || creditScore !== prevCreditScore && isStringFulfilled(creditScore) && "creditScore" === currentStepAlias || homeType !== prevHomeType && isStringFulfilled(homeType) && "homeType" === currentStepAlias) setState((state => ({
                ...state,
                currentStep: state.currentStep + 1
            })));
            function replaceCalendarBtnHref(type) {
                const btnNode = document.querySelector(`#add-to-${type}-calendar`);
                btnNode.setAttribute("href", state.addToCalendarLinks[type]);
            }
            function replaceAppointmentInfo() {
                let detailNode = document.querySelector(`#appointment-call-duration`);
                const durationMatch = state.appointmentInfo.duration.match(/^\d+/g);
                if (durationMatch) detailNode.textContent = detailNode.textContent.replace("{{duration}}", durationMatch[0]);
                detailNode = document.querySelector(`#appointment-call-date-time`);
                detailNode.textContent = state.appointmentInfo.dateTime;
                detailNode = document.querySelector(`#appointment-call-timezone`);
                detailNode.textContent = state.appointmentInfo.timezone;
            }
            function collectContactData(state, additionalTags) {
                const tags = [ "online", "english" ];
                return {
                    email: state.email,
                    phone: `+1${state.phoneNumber.match(/\d/g).join("")}`,
                    firstName: state.firstName,
                    lastName: state.lastName,
                    name: `${state.firstName} ${state.lastName}`,
                    address: state.address,
                    tags: additionalTags instanceof Array ? tags.concat(additionalTags) : tags,
                    source: "public api",
                    customField: {
                        average_electric_bill: state.avarageBill,
                        credit_score: state.creditScore,
                        is_property_owner: state.isOwner,
                        email_me_my_report: state.emailMe
                    }
                };
            }
        }));
        const stepProgressBar = new ProgressBar("guide__progress-bar", steps);
        showServiceBtnsIfHashSet();
        initAccordions();
        initArticleLinks(state);
        initReferForm(state);
        new NextButton(state);
        new PrevButton(state);
        new SubmitButton(state);
        const avarageBillSlider = new RangeSlider("#avarage-bill-input", 40, "#00ABA1");
        const rangeValueIndicator = new RangeValueIndicator("#power-bill-indicator", "${{value}}");
        avarageBillSlider.addIndicator(rangeValueIndicator);
        avarageBillSlider.subscribe((value => {
            state.set((state => ({
                ...state,
                avarageBill: value
            })));
        }));
        state.set((state => ({
            ...state,
            avarageBill: avarageBillSlider.getValue()
        })));
        const yearsToCalculateSlider = new RangeSlider("#years-to-calculate-input", 40, "#00ABA1");
        const yearsToCalculateIndicator = new RangeValueIndicator("#years-to-calculate-indicator", (value => {
            if (1 == value) return "1 year"; else return `${value} years`;
        }));
        initSavingsInformationUpdates(state);
        yearsToCalculateSlider.addIndicator(yearsToCalculateIndicator);
        yearsToCalculateSlider.subscribe((value => {
            state.set((state => ({
                ...state,
                yearsToCalculate: value
            })));
        }));
        state.set((state => ({
            ...state,
            avarageBill: avarageBillSlider.getValue()
        })));
        state.set((state => ({
            ...state,
            yearsToCalculate: yearsToCalculateSlider.getValue()
        })));
        new AddressInput(state);
        new RadioButtonSelect("quiz", "homeType", state);
        new RadioButtonSelect("quiz", "roofShade", state);
        new RadioButtonSelect("quiz", "creditScore", state);
        new Input("quiz", "firstName", state);
        new Input("quiz", "lastName", state);
        new Checkbox("quiz", "isOwner", state);
        new Input("quiz", "email", state, emailChecker);
        new Checkbox("quiz", "emailMe", state);
        new Input("quiz", "phoneNumber", state, phoneNumberChecker, phoneNumberFormatter);
        new ProcessingBar(state, "#00ABA1");
        const inputNodes = document.querySelectorAll("input");
        inputNodes.forEach((node => {
            const type = node.getAttribute("type");
            if ("radio" === type) if (!node.checked) return;
            node.dispatchEvent(new Event("change"));
        }));
    }
    window["FLS"] = true;
    isWebp();
})();