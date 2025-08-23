import { Card } from './Card';

export class CardPreview extends Card<{
	title: string;
	price: number | null;
	image: string;
	category: string;
	description: string;
}> {
	renderCard(
		item: {
			title: string;
			price: number | null;
			image: string;
			category: string;
			description: string;
		},
		inBasket: boolean
	): HTMLElement {
		const container = this.createContainer();
		this.setTitle(container, item.title);
		this.setPrice(container, item.price);
		this.setImage(container, item.image);
		this.setCategory(container, item.category);
		this.setText(container, item.description);

		const button = container.querySelector('.button');
		if (button) {
			button.textContent = inBasket ? 'Удалить из корзины' : 'Купить';
		}
		return container;
	}
}
