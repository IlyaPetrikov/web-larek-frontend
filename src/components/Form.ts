export abstract class Form<T> {
	protected container: HTMLFormElement;
	protected submitButton: HTMLButtonElement;
	protected errorSpan: HTMLElement | null;

	protected onSubmit: (data: T) => void;
	private onInputHandler?: () => void;

	constructor(
		container: HTMLFormElement,
		onSubmit: (data: T) => void,
		onInput?: () => void
	) {
		this.container = container;
		this.onSubmit = onSubmit;
		this.onInputHandler = onInput;

		this.submitButton = this.container.querySelector(
			'button[type="submit"]'
		) as HTMLButtonElement;
		this.errorSpan = this.container.querySelector('.form__errors');

		this.container.addEventListener('submit', (e) => {
			e.preventDefault();
			this.onSubmit(this.getData());
		});

		if (this.onInputHandler) {
			this.container.addEventListener('input', this.onInputHandler);
		}
	}

	protected abstract getData(): T;

	setDisabled(state: boolean): void {
		this.submitButton.disabled = state;
	}

	setError(message: string): void {
		if (this.errorSpan) {
			this.errorSpan.textContent = message;
		}
	}

	clearError(): void {
		if (this.errorSpan) {
			this.errorSpan.textContent = '';
		}
	}
}
