import { IFormValues, IOrder } from '../types';
import { Modal } from './Modal';

export class OrderForm {
	private modal: Modal;
	private onSuccess: (data: IFormValues) => void;

	private payment: string | null = null;
	private address: string = '';
	private email: string = '';
	private phone: string = '';

	constructor(modal: Modal, onSuccess: (data: IFormValues) => void) {
		this.modal = modal;
		this.onSuccess = onSuccess;
	}

	render(total: number, items: { id: string }[]) {
		this.total = total;
		this.items = items;
		this.renderDeliveryAndPayment();
	}

	private total: number = 0;
	private items: { id: string }[] = [];

	private renderDeliveryAndPayment() {
		const template = document.getElementById('order') as HTMLTemplateElement;
		const clone = template.content.cloneNode(true) as DocumentFragment;
		const form = clone.firstElementChild as HTMLFormElement;

		const buttons = form.querySelectorAll('button[name]');
		const input = form.querySelector(
			'input[name="address"]'
		) as HTMLInputElement;
		const submitButton = form.querySelector(
			'button[type="submit"]'
		) as HTMLButtonElement;
		const errorSpan = form.querySelector('.form__errors') as HTMLElement;

		const validate = () => {
			const isAddressValid = this.address.trim().length > 0;
			const isPaymentSelected = !!this.payment;

			if (!isAddressValid && !isPaymentSelected) {
				errorSpan.textContent =
					'Необходимо выбрать способ оплаты и указать адрес';
			} else if (!isAddressValid) {
				errorSpan.textContent = 'Необходимо указать адрес';
			} else if (!isPaymentSelected) {
				errorSpan.textContent = 'Необходимо выбрать способ оплаты';
			} else {
				errorSpan.textContent = '';
			}

			submitButton.disabled = !(isAddressValid && isPaymentSelected);
		};

		buttons.forEach((btn) => {
			btn.addEventListener('click', () => {
				buttons.forEach((b) => b.classList.remove('button_alt-active'));
				btn.classList.add('button_alt-active');
				this.payment = btn.getAttribute('name');
				validate();
			});
		});

		input.addEventListener('input', () => {
			this.address = input.value;
			validate();
		});

		validate();
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			if (this.payment && this.address.trim().length > 5) {
				this.renderContactInfo();
			}
		});

		this.modal.render(form);
	}

	private renderContactInfo() {
		const template = document.getElementById('contacts') as HTMLTemplateElement;
		const clone = template.content.cloneNode(true) as DocumentFragment;
		const form = clone.firstElementChild as HTMLFormElement;

		const emailInput = form.querySelector(
			'input[name="email"]'
		) as HTMLInputElement;
		const phoneInput = form.querySelector(
			'input[name="phone"]'
		) as HTMLInputElement;
		const submitButton = form.querySelector(
			'button[type="submit"]'
		) as HTMLButtonElement;
		const errorSpan = form.querySelector('.form__errors') as HTMLElement;

		const validate = () => {
			const email = emailInput.value.trim();
			const phone = phoneInput.value.replace(/\D/g, '');

			const isEmailValid = /\S+@\S+\.\S+/.test(email);
			const isPhoneValid = phone.length === 11;

			errorSpan.textContent = '';

			if (!email && !phone) {
				errorSpan.textContent = 'Введите email и телефон';
			} else if (!email) {
				errorSpan.textContent = 'Введите email';
			} else if (!isEmailValid) {
				errorSpan.textContent = 'Введите корректный email';
			} else if (phone.length === 0) {
				errorSpan.textContent = 'Введите телефон';
			} else if (!isPhoneValid) {
				errorSpan.textContent = 'Телефон должен содержать 10 цифр';
			}

			submitButton.disabled = !(isEmailValid && isPhoneValid);

			this.email = email;
			this.phone = phoneInput.value;
		};

		emailInput.addEventListener('input', validate);
		phoneInput.addEventListener('input', validate);

		validate();

		form.addEventListener('submit', (e) => {
			e.preventDefault();
			if (this.email && this.phone) {
				const orderData: IOrder = {
					payment: this.payment,
					address: this.address,
					email: this.email,
					phone: this.phone,
					total: this.total,
					items: this.items.map((i) => i.id),
				};
				this.onSuccess(orderData);
			}
		});

		this.modal.render(form);
	}
}
