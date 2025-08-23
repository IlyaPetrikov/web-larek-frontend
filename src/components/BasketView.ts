import { Modal } from './Modal';
import { BasketItem } from './BasketItem';
import { IProductInBasket } from '../types';
import { Page } from './Page';

export class BasketView {
	private modal: Modal;
	private basketElement: HTMLElement;
	private basketList: HTMLElement;
	private basketPrice: HTMLElement;
	private basketButton: HTMLButtonElement;
	private basketCounter: HTMLElement;

	private basketItemFactory: BasketItem;
	private onSubmitCallback: () => void;
	private onRemoveCallback: (id: string) => void;

	constructor(modal: Modal, private page: Page) {
		this.modal = modal;

		const template = document.getElementById('basket') as HTMLTemplateElement;
		if (!template) throw new Error('Шаблон #basket не найден');

		const clone = template.content.cloneNode(true) as DocumentFragment;
		this.basketElement = clone.firstElementChild as HTMLElement;

		this.basketList = this.basketElement.querySelector('.basket__list');
		this.basketPrice = this.basketElement.querySelector('.basket__price');
		this.basketButton = this.basketElement.querySelector(
			'.basket__button'
		) as HTMLButtonElement;

		if (!this.basketList || !this.basketPrice || !this.basketButton) {
			throw new Error('Не найдены элементы корзины');
		}

		this.basketItemFactory = new BasketItem('card-basket');

		this.basketButton.addEventListener('click', () => {
			this.onSubmitCallback?.();
		});
	}

	set onSubmit(callback: () => void) {
		this.onSubmitCallback = callback;
	}

	set onRemove(callback: (id: string) => void) {
		this.onRemoveCallback = callback;
	}

	render(items: IProductInBasket[]) {
		this.basketList.innerHTML = '';

		const emptyMessage = this.basketElement.querySelector(
			'.basket__empty'
		) as HTMLElement;
		if (items.length === 0) {
			emptyMessage?.classList.add('basket__empty_visible');
		} else {
			emptyMessage?.classList.remove('basket__empty_visible');
		}

		items.forEach((item, index) => {
			const element = this.basketItemFactory.renderItem(item, index, () => {
				this.onRemoveCallback?.(item.id);
			});
			this.basketList.appendChild(element);
		});

		this.basketPrice.textContent = `${items.reduce(
			(sum, item) => sum + item.price,
			0
		)} синапсов`;
		this.basketButton.disabled = items.length === 0;
		this.page.setBasketCount(items.length);
	}
	open() {
		this.modal.render(this.basketElement);
	}

	close() {
		this.modal.close();
	}
}
