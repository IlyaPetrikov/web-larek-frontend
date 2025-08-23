import { Card } from './Card';

export class CardCatalog extends Card<{
	title: string;
	price: number | null;
	image: string;
	category: string;
}> {
	renderCard(item: {
		title: string;
		price: number | null;
		image: string;
		category: string;
	}): HTMLElement {
		const container = this.createContainer();
		this.setTitle(container, item.title);
		this.setPrice(container, item.price);
		this.setImage(container, item.image);
		this.setCategory(container, item.category);
		return container;
	}
}
