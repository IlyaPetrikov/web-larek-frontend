import { Form } from './Form';
import { IContactsData } from '../types';
import { Validate } from './Validate';

export class OrderContactsForm extends Form<IContactsData> {
	private email: string = '';
	private phone: string = '';
	private emailInput: HTMLInputElement;
	private phoneInput: HTMLInputElement;

	constructor(
		container: HTMLFormElement,
		onSubmit: (data: IContactsData) => void
	) {
		super(container, onSubmit, () => this.validate());

		this.emailInput = this.container.querySelector(
			'input[name="email"]'
		) as HTMLInputElement;
		this.phoneInput = this.container.querySelector(
			'input[name="phone"]'
		) as HTMLInputElement;

		if (!this.emailInput || !this.phoneInput) {
			console.error('Не найдены поля формы');
			return;
		}

		this.validate();
	}

	private validate(): void {
		const email = this.emailInput.value.trim();
		const phone = this.phoneInput.value;

		const result = Validate.validateContactInfo(email, phone);

		if (result.errors.includes('email_required')) {
			this.setError('Введите email');
		} else if (result.errors.includes('email_invalid')) {
			this.setError('Введите корректный email');
		} else if (result.errors.includes('phone_required')) {
			this.setError('Введите телефон');
		} else if (result.errors.includes('phone_invalid')) {
			this.setError('Телефон должен содержать 10 цифр');
		} else {
			this.clearError();
		}

		this.setDisabled(!result.valid);
		this.email = email;
		this.phone = phone;
	}

	protected getData(): IContactsData {
		return {
			email: this.email,
			phone: this.phone,
		};
	}
}
