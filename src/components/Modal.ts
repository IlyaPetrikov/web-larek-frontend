export class Modal {
	private container: HTMLElement;
	private content: HTMLElement;
	private closeBtn: HTMLElement;

	constructor(containerId: string) {
		this.container = document.getElementById(containerId) as HTMLElement;
		this.content = this.container.querySelector(
			'.modal__content'
		) as HTMLElement;
		this.closeBtn = this.container.querySelector(
			'.modal__close'
		) as HTMLElement;

		this.closeBtn.addEventListener('click', () => this.close());
		this.container.addEventListener('click', (e) => {
			if (e.target === this.container) this.close();
		});
	}

	open() {
		this.container.classList.add('modal_active');
		document.body.style.overflow = 'hidden';
	}

	close() {
		this.container.classList.remove('modal_active');
		document.body.style.overflow = '';
		this.content.innerHTML = '';
	}

	getContent(): HTMLElement {
		return this.content;
	}

	render(content: HTMLElement) {
		this.content.innerHTML = '';
		this.content.appendChild(content);
		this.open();
	}
}
