<div align="center">
<img src="./attachments/logo.png" height="100px">

<h3>My Extra-Ordinary Watchlist</h3>

[▶️ Watch the Demo](./attachments/demo.mkv) | [✏️ MIT License](./LICENSE)

</div>



## 🧠 Motivation

I was just bored and wanted to try out backend video streaming. The core motivation was to **share a video on Google Meet along with the presentation audio**, and also wanted my own setup for this.

---

## ⚙️ Why This Tech Stack?

- **Spring Boot + PostgreSQL**  
  Ideal for brushing up backend and database concepts before joining an upcoming opportunity. Solid, familiar, and production-grade.

- **React (with Vite)**  
  Popular, fast, and easy to get going. Perfect for frontend experimentation with a great dev experience.

---

## 🚀 Features

- ➕ Add movies and TV shows to your personal watchlist
- 🔍 Search for movies using **TMDB API**, see cast and similar suggestions
- 🎥 Save either external URLs or local file paths and **stream them directly** in-browser

---

## 🛠 Setup

### 📋 Prerequisites

Ensure you have the following installed:

- PostgreSQL
- Java
- Spring Boot
- Node.js
- React (via Vite)

---

### 🔐 Environment Variables

Create a `.env` file inside the `meow-frontend` folder with:

```env
VITE_API_KEY=<TMDB_API_KEY>
VITE_BACKEND_URL=<YOUR_SPRINGBOOT_BACKEND_URL>
VITE_PROXY_API_URL=https://api.themoviedb.org/3
```

---

### ⚙️ Backend Configuration

Update application.properties in your Spring Boot project:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/<your_db>
spring.datasource.username=<your_username>
spring.datasource.password=<your_password>
```

---

### 📦 Frontend Setup

```bash
cd meow-frontend
npm install
npm run dev
```

Feel free to explore and expand this project! Contributions, feedback, and pull requests are welcome.
