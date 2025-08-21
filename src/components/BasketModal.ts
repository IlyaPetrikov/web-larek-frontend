// components/BasketModal.ts
import { Modal } from './Modal';
import { BasketItem } from './BasketItem';
import { IProductInBasket } from '../types';

export class BasketModal {
	private modal: Modal;
	private basketElement: HTMLElement;
	private basketList: HTMLElement;
	private basketPrice: HTMLElement;
	private basketButton: HTMLButtonElement;
	private basketCounter: HTMLElement;

	private items: IProductInBasket[] = [];

	constructor(
		modal: Modal,
		basketCounter: HTMLElement,
		private onSubmit: () => void
	) {
		this.modal = modal;
		this.basketCounter = basketCounter;

		const template = document.getElementById('basket') as HTMLTemplateElement;
		if (!template) {
			throw new Error('Шаблон #basket не найден в DOM');
		}

		const clone = template.content.cloneNode(true) as DocumentFragment;
		this.basketElement = clone.firstElementChild as HTMLElement;

		this.basketList = this.basketElement.querySelector('.basket__list');
		this.basketPrice = this.basketElement.querySelector('.basket__price');
		this.basketButton = this.basketElement.querySelector(
			'.basket__button'
		) as HTMLButtonElement;

		if (!this.basketList || !this.basketPrice || !this.basketButton) {
			throw new Error('Не найдены элементы корзины в шаблоне');
		}

		this.basketButton.addEventListener('click', () => {
			this.onSubmit();
		});
	}

	add(item: IProductInBasket) {
		if (!this.items.some((i) => i.id === item.id)) {
			this.items.push(item);
			this.render();
		}
	}

	remove(id: string) {
		this.items = this.items.filter((item) => item.id !== id);
		this.render();
	}

	getTotal(): number {
		return this.items.reduce((sum, item) => sum + (item.price || 0), 0);
	}

	getItems() {
		return this.items;
	}

	hasItem(id: string): boolean {
		return this.items.some((item) => item.id === id);
	}

	removeItem(id: string): void {
		this.items = this.items.filter((item) => item.id !== id);
		this.render();
	}

	render() {
		this.basketList.innerHTML = '';

		const basketItem = new BasketItem('card-basket');
		this.items.forEach((item, index) => {
			const element = basketItem.render(item, index, () => {
				this.remove(item.id);
			});
			this.basketList.appendChild(element);
		});

		this.basketPrice.textContent = `${this.getTotal()} синапсов`;
		this.basketButton.disabled = this.items.length === 0;

		const emptyMessage = this.basketElement.querySelector(
			'.basket__empty'
		) as HTMLElement;
		if (emptyMessage) {
			if (this.items.length === 0) {
				emptyMessage.classList.add('basket__empty_visible');
			} else {
				emptyMessage.classList.remove('basket__empty_visible');
			}
		}
		this.basketCounter.textContent = this.items.length.toString();
	}

	open() {
		this.modal.render(this.basketElement);
		this.render();
	}

	close() {
		this.modal.close();
	}
	clear() {
		this.items = [];
		this.render();
	}
}
