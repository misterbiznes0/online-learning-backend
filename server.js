const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let users = [];
let courses = [];
let currentId = 1;

// Регистрация
app.post("/auth/register", (req, res) => {
  const { email, password } = req.body;
  if (users.find(u => u.email === email)) {
    return res.json({ message: "Пользователь уже существует" });
  }
  users.push({ email, password });
  res.json({ message: "Регистрация успешна!" });
});

// Вход
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.json({ message: "Неверные данные!" });

  res.json({ token: "FAKE_TOKEN_123" });
});

// Получить курсы
app.get("/courses", (req, res) => {
  res.json(courses);
});

// Добавить курс
app.post("/courses", (req, res) => {
  courses.push({ id: currentId++, title: req.body.title });
  res.json({ message: "Курс добавлен!" });
});

// Старт сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
