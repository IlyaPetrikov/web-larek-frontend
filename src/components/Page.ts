export class Page {
	private gallery: HTMLElement;
	private basketButton: HTMLElement;
	private basketCounter: HTMLElement;

	constructor(private container: HTMLElement) {
		this.gallery = container.querySelector('.gallery') as HTMLElement;
		this.basketButton = container.querySelector(
			'.header__basket'
		) as HTMLElement;
		this.basketCounter = container.querySelector(
			'.header__basket-counter'
		) as HTMLElement;

		if (!this.gallery) throw new Error('Галерея не найдена');
		if (!this.basketButton) throw new Error('Кнопка корзины не найдена');
		if (!this.basketCounter) throw new Error('Счётчик корзины не найден');
	}

	addCard(card: HTMLElement): void {
		this.gallery.appendChild(card);
	}

	clearGallery(): void {
		this.gallery.innerHTML = '';
	}

	setBasketCount(count: number): void {
		this.basketCounter.textContent = count.toString();
	}

	setOnBasketClick(handler: () => void): void {
		this.basketButton.addEventListener('click', handler);
	}
}
