import { CardField } from '../types';

export class Card<T> {
	protected template: HTMLTemplateElement;

	constructor(protected templateId: string) {
		this.template = document.getElementById(templateId) as HTMLTemplateElement;
		if (!this.template) throw new Error(`Шаблон #${templateId} не найден`);
	}

	protected createContainer(): HTMLElement {
		const clone = this.template.content.cloneNode(true) as DocumentFragment;
		return clone.firstElementChild as HTMLElement;
	}

	protected fillField(
		container: HTMLElement,
		field: CardField,
		value: string | number | null
	): void {
		const selector = this.getFieldSelector(field);
		const element = container.querySelector(selector);
		if (element) {
			if (field === 'image' && typeof value === 'string') {
				const img = element as HTMLImageElement;
				img.src = value;
				img.alt = container.querySelector('.card__title')?.textContent || '';
			} else if (value !== null) {
				element.textContent = String(value);
			}
		} else if (value !== null) {
			console.warn(
				`Элемент для поля "${field}" не найден в шаблоне #${this.templateId}`
			);
		}
	}

	private getFieldSelector(field: CardField): string {
		const selectors: Record<CardField, string> = {
			title: '.card__title',
			text: '.card__text',
			price: '.card__price',
			image: '.card__image',
			category: '.card__category',
		};
		return selectors[field];
	}

	protected setTitle(container: HTMLElement, title: string): void {
		this.fillField(container, 'title', title);
	}

	protected setPrice(container: HTMLElement, price: number | null): void {
		this.fillField(
			container,
			'price',
			price === null ? 'Бесценно' : `${price} синапсов`
		);
	}

	protected setImage(container: HTMLElement, image: string): void {
		this.fillField(container, 'image', image);
	}

	protected setCategory(container: HTMLElement, category: string): void {
		this.fillField(container, 'category', category);
	}

	protected setText(container: HTMLElement, text: string): void {
		this.fillField(container, 'text', text);
	}
}
