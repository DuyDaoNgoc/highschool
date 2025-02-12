const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 5000;

// Dữ liệu giả thay cho cơ sở dữ liệu thực tế
let users = [];

// Middleware
app.use(cors());
app.use(express.json());

// Route Đăng ký
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // Kiểm tra username đã tồn tại chưa
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "Username already exists!" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user." });
  }
});

// Route Đăng nhập
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }

  try {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
