import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { CardCatalog } from './components/CardCatalog';
import { Api } from './components/base/api';
import { IProduct } from './types';
import { IOrder } from './types';
import { Modal } from './components/Modal';
import { CardPreview } from './components/CardPreview';
import { BasketModel } from './components/BasketModel';
import { BasketView } from './components/BasketView';
import { OrderController } from './components/OrderController';
import { Page } from './components/Page';

document.addEventListener('DOMContentLoaded', () => {
	const appContainer = document.body;
	const page = new Page(appContainer);

	const api = new Api(API_URL);
	const modal = new Modal('modal-container');
	const cardPreview = new CardPreview('card-preview');

	const basketModel = new BasketModel();
	const basketView = new BasketView(modal, page);

	function updateBasketView() {
		basketView.render(basketModel.getItems());
	}

	page.setOnBasketClick(() => {
		updateBasketView();
		basketView.open();
	});

	api
		.get('/product')
		.then((response: { total: number; items: IProduct[] }) => {
			const cardCatalog = new CardCatalog('card-catalog');

			response.items.forEach((product) => {
				product.image = CDN_URL + '/' + product.image;
				const cardElement = cardCatalog.renderCard(product);

				cardElement.addEventListener('click', () => {
					api
						.get(`/product/${product.id}`)
						.then((detailedProduct: IProduct) => {
							detailedProduct.image = CDN_URL + '/' + detailedProduct.image;

							const inBasket = basketModel.hasItem(detailedProduct.id);
							const fullCard = cardPreview.renderCard(
								detailedProduct,
								inBasket
							);
							modal.render(fullCard);

							const actionButton = modal
								.getContent()
								.querySelector('.button') as HTMLButtonElement;

							if (actionButton && !actionButton.disabled) {
								const newBtn = actionButton.cloneNode(
									true
								) as HTMLButtonElement;
								actionButton.replaceWith(newBtn);

								newBtn.addEventListener('click', (e) => {
									e.stopPropagation();
									const id = detailedProduct.id;

									if (basketModel.hasItem(id)) {
										basketModel.remove(id);
										newBtn.textContent = 'Купить';
									} else {
										basketModel.add({
											id: detailedProduct.id,
											title: detailedProduct.title,
											price: detailedProduct.price ?? 0,
										});
										newBtn.textContent = 'Удалить из корзины';
									}
									updateBasketView();
								});
							}
						})
						.catch((err) => {
							console.error('Ошибка:', err);
						});
				});

				page.addCard(cardElement);
			});
		})
		.catch((err) => {
			console.error('Ошибка загрузки товаров:', err);
			page.clearGallery();
			const p = document.createElement('p');
			p.textContent = 'Не удалось загрузить товары';
			page.addCard(p);
		});

	function handleOrderSubmit(data: IOrder) {
		api
			.post('/order', data)
			.then(() => {
				const template = document.getElementById(
					'success'
				) as HTMLTemplateElement;
				const clone = template.content.cloneNode(true) as DocumentFragment;
				const success = clone.firstElementChild as HTMLElement;
				const priceSpan = success.querySelector('#totalPrice');
				if (priceSpan) priceSpan.textContent = data.total.toString();

				const closeBtn = success.querySelector(
					'.order-success__close'
				) as HTMLButtonElement;
				closeBtn.addEventListener('click', () => {
					modal.close();
					basketModel.clear();
					updateBasketView();
				});

				modal.render(success);
			})
			.catch((err) => {
				console.error('Ошибка оформления заказа:', err);
				alert('Не удалось оформить заказ');
			});
	}

	basketView.onSubmit = () => {
		const orderController = new OrderController(modal);
		orderController.start(
			basketModel.getTotal(),
			basketModel.getItems(),
			handleOrderSubmit
		);
	};

	basketView.onRemove = (id: string) => {
		basketModel.remove(id);
		updateBasketView();
	};
});
