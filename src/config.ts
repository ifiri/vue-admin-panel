// Application config.
// I'd decide go away from json-based configs due to
// impossibility of writing comments here. So don't touch format of this file.
const config = {

  // System config. Stores itself all fundamental settings,
  // like base url for remote host, common configs for core components, etc.
  'system': {
    // Base URL for all relative api requests.
    'base': 'https://www.mocky.io/v2/',

    // Routing configuration.
    'routing': {
      // Routes and view components with it's titles.
      'routes': [
        {
          path: '/',
          name: 'Продукты',
          component: 'ProductsView',
        },
        {
          path: '/categories',
          name: 'Категории',
          component: 'CategoriesView',
        },
        {
          path: '/categories/:category',
          name: 'Редактирование категории',
          component: 'CategoryView',
        },
        {
          path: '/users',
          name: 'Пользователи',
          component: 'UsersView',
        },
        {
          path: '/users/:user',
          name: 'Редактирование пользователя',
          component: 'UserView',
        },
        {
          path: '/orders',
          name: 'Заказы',
          component: 'OrdersView',
        },
      ],

      'mode': 'history',
    },
  },

  // Endpoints describes API for every entity.
  'endpoints': {
    'products': {
      'get': '/5d88de043300003008d7dc3f?mocky-delay=2000ms',
      'update': '/5d88de043300003008d7dc3f',

      'categories': {
        'get': '/5d9657f733000009cd2f907c?mocky-delay=150ms',
        'update': '/5d9657f733000009cd2f907c',
      },
    },

    'users': {
      'get': '/5d9f4cee3000004e00524726?mocky-delay=2000ms',
      'update': '/5d9f4cee3000004e00524726',

      'emails': {
        'get': '5da091e13000001000f89fa4',
      },
    },

    'orders': {
      'get': '5da2c7782f00006700f419b9',
    },
  },

  // Section for all entities and it's views
  'entities': {
    'products': {
      'columns': [
        {
          'name': 'ID',
          'alias': 'id',
          'sortable': true,
          'type': 'string',
          'width': 50,
        },
        {
          'name': 'Наименование',
          'alias': 'name',
          'sortable': true,
          'type': 'string',
        },
        {
          'name': 'Категория',
          'alias': 'category',
          'sortable': true,
          'type': 'category',
          'width': 100,
        },
        {
          'name': 'Активность',
          'alias': 'activity',
          'sortable': true,
          'type': 'number',
          'width': 250,
        },
        {
          'name': 'Год',
          'alias': 'year',
          'sortable': true,
          'type': 'string',
          'width': 100,
        },
        {
          'name': 'Цвет',
          'alias': 'color',
          'sortable': true,
          'type': 'color',
          'width': 100,
        },
        {
          'name': 'Цена',
          'alias': 'price',
          'sortable': true,
          'type': 'number',
          'width': 100,
        },
      ],
    },
    'categories': {
      'columns': [
        {
          'name': 'ID',
          'alias': 'id',
          'sortable': true,
          'type': 'string',
          'width': 75,
        },
        {
          'name': 'Алиас',
          'alias': 'alias',
          'sortable': true,
          'type': 'string',
          'width': 150,
        },
        {
          'name': 'Название',
          'alias': 'title',
          'sortable': true,
          'type': 'string',
        },
        {
          'name': 'Родительская категория',
          'alias': 'parent',
          'sortable': true,
          'type': 'category',
          'width': 250,
        },
      ],
    },
    'users': {
      'columns': [
        {
          'name': 'ID',
          'alias': 'id',
          'sortable': true,
          'type': 'string',
          'width': 75,
        },
        {
          'name': 'Email',
          'alias': 'email',
          'sortable': true,
          'type': 'string',
          'width': 150,
        },
        {
          'name': 'Имя пользователя',
          'alias': 'name',
          'sortable': true,
          'type': 'string',
        },
        {
          'name': 'Тип',
          'alias': 'type',
          'sortable': true,
          'type': 'string',
          'width': 150,
        },
      ],
    },
    'user-emails': {
      'columns': [
        {
          'name': 'ID',
          'alias': 'id',
          'sortable': true,
          'type': 'string',
          'width': 75,
        },
        {
          'name': 'Тип',
          'alias': 'type',
          'sortable': true,
          'type': 'string',
        },
        {
          'name': 'Дата отправки',
          'alias': 'date',
          'sortable': true,
          'type': 'datetime',
          'width': 200,
        },
      ],
    },

    'orders': {
      'columns': [
        {
          'name': 'ID',
          'alias': 'id',
          'sortable': true,
          'type': 'string',
          'width': 75,
        },
        {
          'name': 'Пользователь',
          'alias': 'client',
          'sortable': true,
          'type': 'user',
        },
        {
          'name': 'Статус заказа',
          'alias': 'status',
          'sortable': true,
          'type': 'string',
          'width': 150,
        },
        {
          'name': 'Дата заказа',
          'alias': 'order_date',
          'sortable': true,
          'type': 'datetime',
          'width': 200,
        },
        {
          'name': 'Дата отправки',
          'alias': 'shipment_date',
          'sortable': true,
          'type': 'datetime',
          'width': 200,
        },
      ],
    },
  },
};

// Prevent any change of this config in runtime.
Object.freeze(config);

export default config;
