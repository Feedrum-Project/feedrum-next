# Feedrum #
**[Сайт](https://feedrum.com)**

## Опис ##
Платформа для створення статей та постів від програмістів до програмістів, на українській мові  
Аудиторія: Українські IT-спеціалісти 

## Схожі сайти ##
 * habr
 * duo
 * dev.to
 * medium

## Дизайн ##
 * Сучасний
 * Темна тема
 * Sans-serif шрифт (скоріше за все це `Fira Sans`)
 * Анімації

## Технології ##
 * PostgreSQL *(або будь-яка інша БД яка підтримується в prisma)*
 * JWT
 * Node.js
 * Prisma
 * Next.js 
 * TypeScript
 * Eslint
 * Nodemailer
 * Zod
 * Formidable
 * Styled Components

## Запуск ##
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

## TODO ##
 * `/user/me/update` - зміна інфи юзера
 * `offset` та `page` query для шляхів 
   * `/users/:id/comments` 
   * `/users/:id/posts` 
   * `/users/:id/images`
   * `/posts/:id/comments`
 * Система апвотів
 * Аунтифікація по auth хедеру
 * Авто-тести
 * Можливо перемістити всі файли у `src`
 * Документація
 * Почати фронт-енд
   * Переписати трішки стилі
   * ~~Прибрати CSS файли і перейти повністю на SASS~~
   * ~~Дописати Header~~
   * ~~Дописати posts~~
   * ~~Фроентендер має вивчити Next/ReactJS і TS.~~
   * Переписати Aside
   * Зробити **createPost**
   * * Візуальний редактор
   * * Редактор тексту