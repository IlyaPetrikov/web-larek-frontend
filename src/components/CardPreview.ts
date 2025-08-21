import { IProduct } from '../types';

export class CardPreview {
	private template: HTMLTemplateElement;

	constructor(templateId: string) {
		this.template = document.getElementById(templateId) as HTMLTemplateElement;
	}

	render(product: IProduct, inBasket: boolean): HTMLElement {
		const clone = this.template.content.cloneNode(true) as DocumentFragment;
		const element = clone.firstElementChild as HTMLElement;

		const title = element.querySelector('.card__title');
		const category = element.querySelector('.card__category');
		const image = element.querySelector('.card__image') as HTMLImageElement;
		const text = element.querySelector('.card__text');
		const price = element.querySelector('.card__price');
		const button = element.querySelector(
			'.card__row .button'
		) as HTMLButtonElement;

		if (title) title.textContent = product.title;
		if (category) category.textContent = product.category;
		if (image) image.src = product.image;
		if (text) text.textContent = product.description || 'Описание отсутствует';
		if (price) {
			price.textContent =
				product.price !== null ? `${product.price} синапсов` : 'Бесценно';
		}
		if (button) {
			if (product.title === 'Мамка-таймер') {
				button.textContent = 'Не доступно';
				button.disabled = true;
			} else {
				button.disabled = false;
				if (inBasket) {
					button.textContent = 'Удалить из корзины';
				} else {
					button.textContent = 'Купить';
				}
			}

			return element;
		}
	}
}
