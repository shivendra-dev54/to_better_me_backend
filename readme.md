# To Better Me

**Track your sleep, document what you learn daily, and reflect on your progress. Built for personal growth and self-awareness.**

---

## 📦 Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt

---

## 🚀 Getting Started - Backend

### 🔧 Install dependencies

```bash
npm install
````

### 📂 Set up `.env` file

Create a `.env` file in the root directory:

```env
PORT = 64000
DB_CONNECT_STRING = "your-mongodb-key"
JWT_SECRET = "your-secret-key"
```

### 🚴 Run the server

```bash
npm run dev
```

---

## 📑 API Endpoints

🌐 **Base URL:** [`https://to-better-me-backend.onrender.com`](https://to-better-me-backend.onrender.com)

---

### 🔐 Auth Routes (`/api/auth`)

#### POST `/sign_up`

Create a new user account.

**Full URL:** `https://to-better-me-backend.onrender.com/api/auth/sign_up`

**Body:**

```json
{
  "username": "your_name",
  "email": "your_email",
  "password": "your_password"
}
```

**Response:**

* User object (excluding password)

---

#### POST `/sign_in`

Sign in with email and password.

**Full URL:** `https://to-better-me-backend.onrender.com/api/auth/sign_in`

**Body:**

```json
{
  "email": "your_email",
  "password": "your_password"
}
```

**Response:**

```json
{
  "username": "your_name",
  "email": "your_email",
  "token": "jwt_token"
}
```

---

### 👤 User Routes (`/api/user`)

🔒 All user routes require an `Authorization: Bearer <token>` header.

---

#### GET `/get_current`

**Full URL:** `https://to-better-me-backend.onrender.com/api/user/get_current`

* Deletes all non-special users and their entries.
* Returns info of the currently signed-in user.

---

#### POST `/daily_entry`

**Full URL:** `https://to-better-me-backend.onrender.com/api/user/daily_entry`

Create a new daily log.

**Body:**

```json
{
  "date": "2025-05-25T00:00:00.000Z",
  "summary": "Learned a lot today!",
  "sleepHours": [
    {
      "start": "2025-05-24T22:00:00.000Z",
      "end": "2025-05-25T06:00:00.000Z"
    },
    {
      "start": "2025-05-25T14:00:00.000Z",
      "end": "2025-05-25T15:00:00.000Z"
    }
  ]
}
```

---

#### GET `/get_all_entries`

**Full URL:** `https://to-better-me-backend.onrender.com/api/user/get_all_entries`

Get all daily entries of the signed-in user.

---

#### DELETE `/delete_entry/:id`

**Full URL:** `https://to-better-me-backend.onrender.com/api/user/delete_entry/:id`

Delete a specific daily entry by its ID.

---

## 🧪 Sample Users

| Username | Email                                         | Password |
| -------- | --------------------------------------------- | -------- |
| demo1    | [demo1@example.com](mailto:demo1@example.com) | test123  |
| demo2    | [demo2@example.com](mailto:demo2@example.com) | test123  |

---

## 🧠 Features Roadmap

* [x] JWT-based auth
* [x] Daily entry tracking
* [x] Sleep sessions logging (multiple intervals)
* [x] Account differentiation (`isSpecial`)

---

## 🛡️ License

This project is licensed under the MIT License.

---

## 🙌 Contributing

Open to PRs and suggestions! Please fork, enhance, and help this project grow.