import { Form } from './Form';
import { Validate } from './Validate';
import { IDeliveryData } from '../types';

export class OrderDeliveryForm extends Form<IDeliveryData> {
	private payment: string | null = null;
	private address: string = '';
	private buttons: NodeListOf<HTMLButtonElement>;
	private addressInput: HTMLInputElement;

	constructor(
		container: HTMLFormElement,
		onSubmit: (data: IDeliveryData) => void
	) {
		super(container, onSubmit, () => this.validate());

		this.addressInput = this.container.querySelector(
			'input[name="address"]'
		) as HTMLInputElement;
		this.buttons = this.container.querySelectorAll('[name]');

		this.setupEventListeners();

		this.validate();
	}

	private setupEventListeners(): void {
		this.buttons.forEach((btn) => {
			btn.addEventListener('click', () => {
				this.buttons.forEach((b) => b.classList.remove('button_alt-active'));
				btn.classList.add('button_alt-active');
				this.payment = btn.getAttribute('name');
				this.validate();
			});
		});

		this.addressInput.addEventListener('input', () => {
			this.address = this.addressInput.value;
			this.validate();
		});
	}

	private validate(): void {
		const result = Validate.validateDelivery(this.payment, this.address);

		if (!result.valid) {
			if (result.errors.includes('payment_required')) {
				this.setError('Выберите способ оплаты');
			} else if (result.errors.includes('address_required')) {
				this.setError('Укажите адрес доставки');
			}
		} else {
			this.clearError();
		}

		this.setDisabled(!result.valid);
	}

	protected getData(): IDeliveryData {
		return {
			payment: this.payment,
			address: this.address,
		};
	}
}
