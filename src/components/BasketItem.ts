export class BasketItem {
	private template: HTMLTemplateElement;

	constructor(templateId: string) {
		this.template = document.getElementById(templateId) as HTMLTemplateElement;
	}

	render(
		product: { id: string; title: string; price: number },
		index: number,
		onDelete: () => void
	): HTMLElement {
		const clone = this.template.content.cloneNode(true) as DocumentFragment;
		const element = clone.firstElementChild as HTMLElement;

		const indexEl = element.querySelector('.basket__item-index');
		const titleEl = element.querySelector('.card__title');
		const priceEl = element.querySelector('.card__price');
		const deleteBtn = element.querySelector(
			'.basket__item-delete'
		) as HTMLElement;

		if (indexEl) indexEl.textContent = (index + 1).toString();
		if (titleEl) titleEl.textContent = product.title;
		if (priceEl) priceEl.textContent = `${product.price} синапсов`;
		if (deleteBtn) deleteBtn.addEventListener('click', onDelete);

		element.dataset.id = product.id;

		return element;
	}
}
