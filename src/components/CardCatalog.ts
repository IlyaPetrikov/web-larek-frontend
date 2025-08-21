export class CardCatalog {
	private template: HTMLTemplateElement;

	constructor(templateId: string) {
		const template = document.getElementById(templateId);
		if (!template || !(template instanceof HTMLTemplateElement)) {
			throw new Error(
				`Шаблон с id="${templateId}" не найден или не является <template>`
			);
		}
		this.template = template;
	}

	render(data: {
		title: string;
		image: string;
		category: string;
		price: number | null;
	}): HTMLElement {
		const clone = this.template.content.cloneNode(true) as DocumentFragment;
		const element = clone.firstElementChild as HTMLElement;

		const titleEl = element.querySelector('.card__title');
		const imageEl = element.querySelector('.card__image') as HTMLImageElement;
		const categoryEl = element.querySelector('.card__category');
		const priceEl = element.querySelector('.card__price');

		if (titleEl) titleEl.textContent = data.title;
		if (imageEl) imageEl.src = data.image;
		if (categoryEl) categoryEl.textContent = data.category;
		if (priceEl) {
			priceEl.textContent =
				data.price !== null ? `${data.price} синапсов` : 'Бесценно';
		}

		return element;
	}
}
