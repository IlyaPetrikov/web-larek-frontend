import { Card } from './Card';
import { IProductInBasket } from '../types';

export class BasketItem extends Card<IProductInBasket> {
	constructor(templateId: string) {
		super(templateId);
	}

	renderItem(
		item: IProductInBasket,
		index: number,
		onDelete: () => void
	): HTMLElement {
		const element = this.createContainer();

		this.setTitle(element, item.title);
		this.setPrice(element, item.price);

		const indexEl = element.querySelector('.basket__item-index');
		if (indexEl) {
			indexEl.textContent = (index + 1).toString();
		}

		const deleteBtn = element.querySelector('.basket__item-delete');
		deleteBtn?.addEventListener('click', onDelete);

		return element;
	}
}
