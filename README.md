# **Дипломный проект Movies Explorer**

## Описание

Бэкенд часть SPA приложения Movie Explorer на Express.js. Схемы и модели созданы через Mongoose. Все роуты, кроме /signup и /signin, защищены. Используется валидация Joi и celebrate. При регистрации пользователя пароль хешируется модулем bcrypt с добавлением соли. Реализована централизованная обработка ошибок. Настроено логирование запросов и ошибок.

**адрес и домен сервера:**

api.project-movies-explor.nomoredomains.icu 51.250.73.46

## Стек

- Node.js
- Express.js
- MongoDB
- JavaScript
- API

## Установка

Для запуска на локальной машине необходимо:

1. Установить npm зависимости:</br>

```sh
npm install
```

2. Запустить MongoDB:

```sh
npm run mongod
```

3. Запустить в режиме разработки:</br>

```sh
npm run start  — запускает сервер
npm run dev — запускает сервер с hot-reload
```
