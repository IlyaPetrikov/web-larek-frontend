export type IProduct = {
	id: string;
	title: string;
	category: string;
	image: string;
	price: number | null;
	description: string;
};

export type CardField = 'title' | 'text' | 'price' | 'image' | 'category';

export interface IProductInBasket {
	id: string;
	title: string;
	price: number;
}

export interface IFormValues {
	email: string;
	phone: string;
	address: string;
	payment: string;
}
export interface IOrder {
	payment: string;
	address: string;
	email: string;
	phone: string;
	total: number;
	items: string[];
}

export interface IContactsData {
	email: string;
	phone: string;
}

export interface IDeliveryData {
	payment: string | null;
	address: string;
}

export interface IValidationResult {
	valid: boolean;
	errors: string[];
}
