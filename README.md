# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

## Архитектура приложения

Приложение построено по принципам:

- Изолированности — каждый класс решает одну задачу и может использоваться независимо.
- Единственной ответственности.
- Масштабируемости — легко добавить новые экраны, типы карточек, модальные окна.

Основные части системы:

- Модель данных (`Model`) — хранение и логика.
- Отображение (`View`) — рендер и взаимодействие с DOM.
- Контроллеры — логика переходов между экранами.

## Описание классов

`Page`

Назначение: Управление основными элементами страницы: галерея, кнопка корзины, счётчик.

Конструктор

`new Page(container: HTMLElement)`

- `container` — корневой элемент страницы (например, `document.body`).

Свойства
|Свойство|Тип|Описание|
|-|--------|---|
|`gallery`|HTMLElement|Контейнер для товаров|
|`basketButton`|HTMLElement|Кнопка открытия корзины|
|`basketCounter`|HTMLElement|Элемент с количеством товаров в корзине|

Методы
|Метод|Параметры|Возвращает|Описание|
|-|-|-|-|
|`addCard(card)`|`card: HTMLElement`|`void`|Добавляет карточку товара в галерею|
|`clearGallery()`|—|`void`|Очищает галерею|
|`setBasketCount(count)`|`count: number`|`void`|Обновляет счётчик корзины|
|`setOnBasketClick(handler)`|`handler: () => void`|`void`|Назначает обработчик клика по кнопке корзины|

`Modal`

Назначение: Универсальный компонент модальных окон.

Конструктор
`new Modal(containerId: string)`

- containerId — id контейнера модального окна в DOM (например, 'modal-container').

Методы

| Метод             | Параметры              | Возвращает    | Описание                                             |
| ----------------- | ---------------------- | ------------- | ---------------------------------------------------- |
| `open()`          | —                      | `void`        | Открывает модальное окно                             |
| `close()`         | —                      | `void`        | Закрывает модальное окно                             |
| `render(content)` | `content: HTMLElement` | `void`        | Вставляет контент в модальное окно и открывает её    |
| `getContent()`    | —                      | `HTMLElement` | Возвращает контейнер контента (для работы с формами) |

`Card`

Назначение: Базовый класс для всех карточек. Обеспечивает общую логику: заполнение полей, рендер.

Конструктор
`new Card(templateId: string)`

- templateId — id HTML-шаблона (например, 'card-catalog').

Методы

| Метод                          | Параметры                                      | Возвращает    | Описание                             |
| ------------------------------ | ---------------------------------------------- | ------------- | ------------------------------------ |
| `setTitle(container, text)`    | `container: HTMLElement`, `text: string`       | `void`        | Устанавливает заголовок              |
| `setPrice(container, price)`   | `container: HTMLElement`, `price: number\null` | `void`        | Устанавливает цену (с "синапсов")    |
| `setImage(container, src)`     | `container: HTMLElement`, `src: string`        | `void`        | Устанавливает изображение и `alt`    |
| `setCategory(container, text)` | `container: HTMLElement`, `text: string`       | `void`        | Устанавливает категорию              |
| `setText(container, text)`     | `container: HTMLElement`, `text: string`       | `void`        | Устанавливает описание               |
| `createContainer()`            | —                                              | `HTMLElement` | Создаёт новый DOM-элемент из шаблона |

`CardCatalog`

Назначение: Отображение карточки товара в галерее.

Конструктор
`new CardCatalog(templateId: string)`

- `templateId` — 'card-catalog' (id шаблона).

Методы

| Метод              | Параметры                                 | Возвращает    | Описание                    |
| ------------------ | ----------------------------------------- | ------------- | --------------------------- |
| `renderCard(item)` | `item: { title, price, image, category }` | `HTMLElement` | Возвращает готовую карточку |

`CardPreview`

Назначение: Отображение детальной информации о товаре в модалке.

Конструктор
`new CardPreview(templateId: string)`

- `templateId` — 'card-preview'.

Методы

| Метод                        | Параметры                             | Возвращает    | Описание                                                        |
| ---------------------------- | ------------------------------------- | ------------- | --------------------------------------------------------------- |
| `renderCard(item, inBasket)` | `item: IProduct`, `inBasket: boolean` | `HTMLElement` | Возвращает карточку с кнопкой "Купить" или "Удалить из корзины" |

`BasketModel`

Назначение: Модель данных корзины. Хранит список товаров, сумму, управляет добавлением/удалением.

Конструктор
`new BasketModel()`

Методы

| Метод         | Параметры                | Возвращает           | Описание                           |
| ------------- | ------------------------ | -------------------- | ---------------------------------- |
| `add(item)`   | `item: IProductInBasket` | `void`               | Добавляет товар, если его ещё нет  |
| `remove(id)`  | `id: string`             | `void`               | Удаляет товар по ID                |
| `hasItem(id)` | `id: string`             | `boolean`            | Проверяет, есть ли товар в корзине |
| `getItems()`  | —                        | `IProductInBasket[]` | Возвращает копию списка товаров    |
| `getTotal()`  | —                        | `number`             | Возвращает общую стоимость         |
| `clear()`     | —                        | `void`               | Очищает корзину                    |

`BasketView`

Назначение: Отображение корзины. Рендерит список, сумму, кнопку "Оформить".

Конструктор

`new BasketView(modal: Modal, page: Page)`

- modal — экземпляр Modal для открытия корзины.
- page — экземпляр Page для обновления счётчика.

Методы

| Метод           | Параметры                        | Возвращает | Описание                                    |
| --------------- | -------------------------------- | ---------- | ------------------------------------------- |
| `render(items)` | `items: IProductInBasket[]`      | `void`     | Обновляет интерфейс корзины                 |
| `open()`        | —                                | `void`     | Открывает модальное окно корзины            |
| `close()`       | —                                | `void`     | Закрывает модальное окно корзины            |
| `onSubmit`      | `callback: () => void`           | —          | Устанавливает обработчик нажатия "Оформить" |
| `onRemove`      | `callback: (id: string) => void` | —          | Устанавливает обработчик удаления товара    |

`OrderController`

Назначение: Управление процессом оформления заказа. Переходит от шага к шагу.

Конструктор
`new OrderController(modal: Modal)`

- `modal` — экземпляр `Modal` для отображения форм.

Методы

| Метод                            | Параметры                                                                 | Возвращает | Описание                            |
| -------------------------------- | ------------------------------------------------------------------------- | ---------- | ----------------------------------- |
| `start(total, items, onSuccess)` | `total: number`, `items: { id: string }[]`, `onSuccess: (IOrder) => void` | `void`     | Запускает процесс оформления заказа |

`Form<T>`

Назначение: Базовый класс для форм. Управляет кнопкой, ошибками, отправкой.

Конструктор
`new Form(container: HTMLFormElement, onSubmit: (T) => void, onInput?: () => void)`

- `container` — DOM-элемент формы,
- `onSubmit` — колбэк при отправке,
- `onInput` — колбэк при вводе (опционально).

Методы

| Метод                | Параметры         | Возвращает | Описание                       |
| -------------------- | ----------------- | ---------- | ------------------------------ |
| `setDisabled(state)` | `state: boolean`  | `void`     | Блокирует/разблокирует кнопку  |
| `setError(message)`  | `message: string` | `void`     | Показывает сообщение об ошибке |
| `clearError()`       | —                 | `void`     | Скрывает ошибку                |

`OrderDeliveryForm`, `OrderContactsForm`

Назначение: Конкретные формы для шагов заказа.

Конструктор
`new OrderDeliveryForm(container, onSubmit)`
`new OrderContactsForm(container, onSubmit)`

- `container` — форма из шаблона.
- `onSubmit` — колбэк с данными формы.

Особенности

- Автоматически валидируют поля.
- Показывают ошибки.
- Управляют состоянием кнопки.

`Validate`

Назначение: Сервис валидации данных формы.

Методы

| Метод                                | Параметры              | Возвращает          | Описание                  |
| ------------------------------------ | ---------------------- | ------------------- | ------------------------- |
| `validateEmail(email)`               | `email: string`        | `IValidationResult` | Проверяет email           |
| `validatePhone(phone)`               | `phone: string`        | `IValidationResult` | Проверяет телефон         |
| `validateAddress(address)`           | `address: string`      | `IValidationResult` | Проверяет адрес           |
| `validatePayment(payment)`           | `payment: string\null` | `IValidationResult` | Проверяет способ оплаты   |
| `validateContactInfo(email, phone)`  | `email`,`phone`        | `IValidationResult` | Комбинированная валидация |
| `validateDelivery(payment, address)` | `payment`,`address`    | `IValidationResult` | Комбинированная валидация |

## Типы данных

```
export type IProduct = {
	id: string;
	title: string;
	category: string;
	image: string;
	price: number | null;
	description: string;
};
```

```
export type CardField = 'title' | 'text' | 'price' | 'image' | 'category';
```

```
export interface IProductInBasket {
	id: string;
	title: string;
	price: number;
}
```

```
export interface IFormValues {
	email: string;
	phone: string;
	address: string;
	payment: string;
}
```

```
export interface IOrder {
	payment: string;
	address: string;
	email: string;
	phone: string;
	total: number;
	items: string[];
}
```

```
export interface IContactsData {
	email: string;
	phone: string;
}
```

```
export interface IDeliveryData {
	payment: string | null;
	address: string;
}
```

```
export interface IValidationResult {
	valid: boolean;
	errors: string[];
}
```

## Процессы и приложения

- События реализованы через колбэки и прямые вызовы.
- Трансформация данных:
  - `IProduct` → `IProductInBasket` (при добавлении в корзину),
  - `IFormValues` + `BasketModal.getTotal()` → `IOrder` (при оформлении).
- Валидация — на каждом шаге формы.

Архитектура соответствует MVP, легко масштабируется и готова к дальнейшему развитию.
