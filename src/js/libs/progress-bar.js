export class ProgressBar {
	#map = {};
	#currentStep = 0;
	#currentSubStep = 0;
	#rootClassName;
	#meta;

	static itemTemplateId = "progress-bar-item";
	static itemClassName = "progress-bar__item";
	static itemCaptionClassName = "progress-bar__item-caption";
	static itemStateClassName = "progress-bar__item-state";
	static itemHiddenClassName = "progress-bar__item_hidden";

	constructor(rootClassName, stepsMeta) {
		this.#rootClassName = rootClassName;
		this.#meta = stepsMeta;
		const rootNode = document.querySelector(`.${rootClassName}`);

		const templateHtml = document.getElementById(ProgressBar.itemTemplateId).innerHTML;
		
		rootNode.innerHTML = stepsMeta.reduce((acc, stepMeta, idx) => {
			if (stepMeta.alias) this.#map[stepMeta.alias] = stepMeta;
			const itemStateText = stepMeta.subStepsCount > 1 ? `0/${stepMeta.subStepsCount}` : "";
		
			return acc + templateHtml.replace("{{idx}}", idx)
				.replace("{{caption}}", stepMeta.caption)
				.replace("{{state}}", itemStateText);
		}, "");
		const firstItemNode = rootNode.firstElementChild;
		firstItemNode.classList.remove(ProgressBar.itemHiddenClassName); // Show first item
		const lastItemNode = rootNode.lastElementChild;
		lastItemNode.lastElementChild.remove(); // Remove state node
	}
	next() {
		if (this.#currentStep >= this.#meta.length) return false;
		const currentStepMeta = this.#meta[this.#currentStep];
		const rootNode = document.querySelector(`.${this.#rootClassName}`);
		const currentStepItemNode = rootNode.querySelector(`[data-idx='${this.#currentStep}']`);
		if (this.#currentSubStep < (currentStepMeta.subStepsCount - 1)) {
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