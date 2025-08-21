import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { CardCatalog } from './components/CardCatalog';
import { Api } from './components/base/api';
import { IProduct } from './types';
import { IOrder } from './types';
import { Modal } from './components/Modal';
import { CardPreview } from './components/CardPreview';
import { BasketModal } from './components/BasketModal';
import { OrderForm } from './components/OrderForm';

document.addEventListener('DOMContentLoaded', () => {
	const gallery = document.querySelector('.gallery');
	if (!gallery) return console.error('Галерея не найдена');

	const api = new Api(API_URL);
	const modal = new Modal('modal-container');
	const cardPreview = new CardPreview('card-preview');
	const basketCounter = document.querySelector(
		'.header__basket-counter'
	) as HTMLElement;
	let orderForm: OrderForm;
	let basketModal = new BasketModal(modal, basketCounter, () => {
		orderForm = new OrderForm(modal, handleOrderSubmit);
		orderForm.render(basketModal.getTotal(), basketModal.getItems());
	});
	const basketButton = document.querySelector('.header__basket');
	basketButton?.addEventListener('click', () => {
		basketModal.open();
	});

	api
		.get('/product')
		.then((response: { total: number; items: IProduct[] }) => {
			const cardCatalog = new CardCatalog('card-catalog');

			response.items.forEach((product) => {
				product.image = CDN_URL + '/' + product.image;
				const cardElement = cardCatalog.render(product);

				cardElement.addEventListener('click', () => {
					api
						.get(`/product/${product.id}`)
						.then((detailedProduct: IProduct) => {
							detailedProduct.image = CDN_URL + '/' + detailedProduct.image;

							const inBasket = basketModal.hasItem(detailedProduct.id);
							const fullCard = cardPreview.render(detailedProduct, inBasket);
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

									if (basketModal.hasItem(id)) {
										basketModal.removeItem(id);
										newBtn.textContent = 'В корзину';
									} else {
										basketModal.add({
											id,
											title: detailedProduct.title,
											price: detailedProduct.price ?? 0,
										});
										newBtn.textContent = 'Удалить из корзины';
									}
								});
							}
						})
						.catch((err) => {
							console.error('Ошибка:', err);
						});
				});

				gallery.appendChild(cardElement);
			});
		})
		.catch((err) => {
			console.error('Ошибка загрузки товаров:', err);
			gallery.innerHTML = '<p>Не удалось загрузить товары</p>';
		});

	function handleOrderSubmit(data: IOrder) {
		api
			.post('/order', data)
			.then((result: { id: string }) => {
				const template = document.getElementById(
					'success'
				) as HTMLTemplateElement;
				const clone = template.content.cloneNode(true) as DocumentFragment;
				const success = clone.firstElementChild as HTMLElement;
				const priceSpan = success.querySelector('#totalPrice');
				if (priceSpan) {
					priceSpan.textContent = data.total.toString();
				}

				const closeBtn = success.querySelector(
					'.order-success__close'
				) as HTMLButtonElement;
				closeBtn.addEventListener('click', () => {
					modal.close();
					basketModal.clear();
				});

				modal.render(success);
			})
			.catch((err) => {
				console.error('Ошибка оформления заказа:', err);
				alert('Не удалось оформить заказ');
			});
	}
});
