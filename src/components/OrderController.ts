import { Modal } from './Modal';
import { OrderDeliveryForm } from './OrderDeliveryForm';
import { OrderContactsForm } from './OrderContactsForm';
import { IOrder } from '../types';

export class OrderController {
	private modal: Modal;

	constructor(modal: Modal) {
		this.modal = modal;
	}

	start(
		total: number,
		items: { id: string }[],
		onSuccess: (data: IOrder) => void
	) {
		this.renderDeliveryStep(total, items, onSuccess);
	}

	private renderDeliveryStep(
		total: number,
		items: { id: string }[],
		onSuccess: (data: IOrder) => void
	) {
		const template = document.getElementById('order') as HTMLTemplateElement;
		const clone = template.content.cloneNode(true) as DocumentFragment;
		const formElement = clone.firstElementChild as HTMLFormElement;

		const deliveryForm = new OrderDeliveryForm(formElement, (deliveryData) => {
			this.renderContactsStep(total, items, deliveryData, onSuccess);
		});

		this.modal.render(formElement);
	}

	private renderContactsStep(
		total: number,
		items: { id: string }[],
		deliveryData: { payment: string | null; address: string },
		onSuccess: (data: IOrder) => void
	) {
		const template = document.getElementById('contacts') as HTMLTemplateElement;
		const clone = template.content.cloneNode(true) as DocumentFragment;
		const formElement = clone.firstElementChild as HTMLFormElement;

		const contactsForm = new OrderContactsForm(formElement, (contactsData) => {
			const orderData = {
				...deliveryData,
				...contactsData,
				total,
				items: items.map((i) => i.id),
			};
			onSuccess(orderData);
		});

		this.modal.render(formElement);
	}
}
