export type IProduct = {
	id: string;
	title: string;
	category: string;
	image: string;
	price: number | null;
	description: string;
};

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
