# Fitness Site

Веб-приложение фитнес-клуба, разработанное на базе Next.js, Prisma и PostgreSQL.

Проект предоставляет функционал для:

- регистрации и авторизации пользователей;
- управления пользователями;
- просмотра расписания тренировок;
- работы с абонементами;
- хранения данных в PostgreSQL через Prisma ORM;
- деплоя на Vercel.

## Технологический стек

### Frontend

- Next.js 16
- React 19
- TypeScript
- HeroUI
- Tailwind CSS 4
- Zustand
- Lucide React

### Backend

- Next.js Route Handlers
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcryptjs

### Инструменты разработки

- TypeScript
- Prisma CLI
- ts-node

---

## Возможности

### Пользователи

- Регистрация
- Авторизация
- Хранение хэшированных паролей
- JWT-аутентификация

### Абонементы

- Несколько типов абонементов
- Отслеживание статуса абонемента
- История покупок пользователя

### Расписание

- Расписание по дням недели
- Информация о тренере
- Время проведения занятия
- Длительность тренировки

---

## Структура базы данных

### User

Пользователь системы.

| Поле        | Тип      |
| ----------- | -------- |
| id          | UUID     |
| email       | String   |
| phone       | String   |
| name        | String   |
| surname     | String   |
| dateOfBirth | DateTime |
| password    | String   |

---

### SubscriptionType

Тип абонемента.

| Поле        | Тип                |
| ----------- | ------------------ |
| id          | UUID               |
| name        | String             |
| priceAmount | Int                |
| description | String             |
| rate        | STANDARD / PREMIUM |

---

### Subscription

Активный или завершённый абонемент пользователя.

| Поле               | Тип                          |
| ------------------ | ---------------------------- |
| id                 | UUID                         |
| userId             | UUID                         |
| subscriptionTypeId | UUID                         |
| startDate          | DateTime                     |
| endDate            | DateTime                     |
| pricePaid          | Int                          |
| status             | ACTIVE / CANCELLED / EXPIRED |

---

### ScheduleItem

Элемент расписания тренировок.

| Поле            | Тип    |
| --------------- | ------ |
| id              | UUID   |
| name            | String |
| coach           | String |
| time            | String |
| durationMinutes | Int    |
| type            | String |
| dayOfWeek       | Enum   |

---

## Установка

### 1. Клонирование репозитория

```bash
git clone https://github.com/I9uana0/fitness-site.git
cd fitness-site
```

### 2. Установка зависимостей

```bash
npm install
```

---

## Настройка окружения

Создайте файл:

```bash
.env
```

на основе:

```bash
.env.example
```

Пример:

```env
DATABASE_URL="postgresql://username:password@host:5432/database"

JWT_SECRET=super-secret-key

ALLOWED_DEV_ORIGINS=http://localhost:3000
```

---

## Запуск PostgreSQL через Docker

Проект поддерживает локальную работу через Docker Compose.

Запуск:

```bash
docker compose up -d
```

Проверка контейнеров:

```bash
docker ps
```

Остановка:

```bash
docker compose down
```

---

## Prisma

### Генерация Prisma Client

```bash
npx prisma generate
```

### Создание миграции

```bash
npx prisma migrate dev --name init
```

### Применение миграций в production

```bash
npx prisma migrate deploy
```

### Просмотр данных

```bash
npx prisma studio
```

---

## Заполнение базы тестовыми данными

В проекте используется seed-скрипт:

```bash
npx prisma db seed
```

Конфигурация находится в:

```json
{
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
}
```

---

## Запуск проекта

### Development

```bash
npm run dev
```

Приложение будет доступно по адресу:

```text
http://localhost:3000
```

### Production build

Сборка:

```bash
npm run build
```

Запуск:

```bash
npm start
```

---

## Переменные окружения

| Переменная          | Описание                             |
| ------------------- | ------------------------------------ |
| DATABASE_URL        | URL подключения к PostgreSQL         |
| JWT_SECRET          | Секретный ключ JWT                   |
| ALLOWED_DEV_ORIGINS | Разрешённые источники для разработки |
| POSTGRES_USER       | Пользователь PostgreSQL              |
| POSTGRES_PASSWORD   | Пароль PostgreSQL                    |
| POSTGRES_DB         | Имя базы данных                      |
| POSTGRES_PORT       | Порт PostgreSQL                      |
| POSTGRES_HOST       | Хост PostgreSQL                      |

---

## Деплой

Проект может быть развёрнут на:

- Vercel
- Railway
- Render
- VPS с Docker

Для деплоя необходимо:

1. Создать PostgreSQL базу данных.
2. Указать `DATABASE_URL`.
3. Указать `JWT_SECRET`.
4. Выполнить миграции:

```bash
npx prisma migrate deploy
```

---

## Лицензия

Проект создан в образовательных целях.
