# Feedrum

**[Сайт](https://feedrum.com)**

## Опис

Платформа для створення статей та постів від програмістів до програмістів, на українській мові  
Аудиторія: Українські IT-спеціалісти

## Схожі сайти

- duo
- dev.to
- medium

## Дизайн

- Сучасний
- Темна тема
- Sans-serif шрифт (скоріше за все це `Fira Sans`)
- Анімації

## Технології

- PostgreSQL _(або будь-яка інша БД яка підтримується в prisma)_
- JWT
- Node.js
- Prisma
- Next.js
- Redux
- TypeScript
- Eslint
- Nodemailer
- Zod
- Formidable
- Styled Components

## Запуск

1. Встановити усі необхідні залежності

   > `npm i` або `yarn install`

2. Сгенерувати prisma таблиці

   > `npm run generate` або `yarn generate`

3. Запушити їх то бази данних

   > `DATABASE_URL="<Ваша БД>" npx prisma db push`

4. Створити та заповнити файл `.env`

   > Приклад дивись у файлі `.env.example`

5. Сбілдити

   > `npm run build` або `yarn build`

6. Запустити
   > `npm run start` або `yarn start`

**Для запуску в режимі розробки (замість або після 5 та 6 пункту)**

> `npm run dev` або `yarn dev`

## TODO

- [] `/user/me/update` - зміна інфи юзера
- `offset` та `page` query для шляхів
  - [ ] `/users/:id/comments`
  - [ ] `/users/:id/posts`
  - [ ] `/users/:id/images`
  - [ ] `/posts/:id/comments`
- [ ] Система апвотів
- [ ] Аунтифікація по auth хедеру
- [ ] Авто-тести
- [ ] Можливо перемістити всі файли у `src`
- [ ] Документація
- Почати фронт-енд
  - [ ] Переписати трішки стилі
  - [x] Прибрати CSS файли і перейти повністю на SASS
  - [x] Дописати Header
  - [x] Дописати posts
  - [x] Фроентендер має вивчити Next/ReactJS і TS.
  - [x] Переписати Aside
  - Зробити **createPost**
  - - [ ] Візуальний редактор
  - - [x] Редактор тексту
