import { IProductInBasket } from '../types';

export class BasketModel {
	private items: IProductInBasket[] = [];

	add(item: IProductInBasket): void {
		if (!this.items.some((i) => i.id === item.id)) {
			this.items.push(item);
		}
	}

	remove(id: string): void {
		this.items = this.items.filter((item) => item.id !== id);
	}

	hasItem(id: string): boolean {
		return this.items.some((item) => item.id === id);
	}

	getItems(): IProductInBasket[] {
		return [...this.items];
	}

	getTotal(): number {
		return this.items.reduce((sum, item) => sum + item.price, 0);
	}

	clear(): void {
		this.items = [];
	}
}
