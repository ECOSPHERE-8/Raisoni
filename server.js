const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

// In-memory user store (temporary for demo)
let users = {};
let currentUser = null;

// ===== LOGIN PAGE =====
app.get("/", (req, res) => {
  res.send(`
  <html>
  <head>
    <title>Eco-Sphere Login</title>
    <style>
      body {
        font-family: Arial;
        background: linear-gradient(to right, #d4fc79, #96e6a1);
        text-align: center;
        padding: 50px;
      }
      .box {
        background: white;
        padding: 30px;
        border-radius: 15px;
        width: 300px;
        margin: auto;
        box-shadow: 0 0 10px gray;
      }
      input, button {
        margin: 10px;
        padding: 10px;
        width: 90%;
        border-radius: 8px;
        border: 1px solid #ccc;
      }
      button {
        background: green;
        color: white;
        border: none;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <h2>🌱 ECO-SPHERE</h2>
      <form method="POST" action="/login">
        <input type="text" name="username" placeholder="Username" required/><br/>
        <input type="password" name="password" placeholder="Password" required/><br/>
        <button type="submit">Login / Register</button>
      </form>
    </div>
  </body>
  </html>
  `);
});

// ===== LOGIN LOGIC =====
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!users[username]) {
    users[username] = { password, points: 0 };
  }

  if (users[username].password === password) {
    currentUser = username;
    res.redirect("/dashboard");
  } else {
    res.send("Incorrect password");
  }
});

// ===== DASHBOARD =====
app.get("/dashboard", (req, res) => {
  if (!currentUser) return res.redirect("/");

  res.send(`
  <html>
  <head>
    <title>Dashboard</title>
    <style>
      body {
        font-family: Arial;
        background: #e8f5e9;
        text-align: center;
        padding: 40px;
      }
      .card {
        background: white;
        padding: 20px;
        border-radius: 15px;
        width: 400px;
        margin: auto;
        box-shadow: 0 0 10px gray;
      }
      button {
        margin: 10px;
        padding: 12px;
        width: 150px;
        border: none;
        border-radius: 8px;
        background: green;
        color: white;
        font-weight: bold;
      }
      img {
        width: 100%;
        border-radius: 10px;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <h2>Welcome, ${currentUser} 🌿</h2>
      <p>Points: ${users[currentUser].points}</p>
      <img src="https://i.imgur.com/8Km9tLL.jpg" alt="Environment Image"/>
      <br/>
      <a href="/learn"><button>Learn</button></a>
      <a href="/practice"><button>Practice</button></a>
      <a href="/about"><button>About Us</button></a>
    </div>
  </body>
  </html>
  `);
});

// ===== LEARN PAGE =====
app.get("/learn", (req, res) => {
  res.send(`
  <html>
  <head>
    <title>Learn</title>
    <style>
      body { font-family: Arial; background: #c8e6c9; text-align:center; padding:40px; }
      .box { background:white; padding:20px; border-radius:15px; width:600px; margin:auto; }
      iframe { border-radius:10px; }
    </style>
  </head>
  <body>
    <div class="box">
      <h2>🌍 Environmental Awareness</h2>
      <iframe width="560" height="315"
      src="https://www.youtube.com/embed/QQYgCxu988s"
      allowfullscreen></iframe>
      <br/><br/>
      <a href="/dashboard">⬅ Back</a>
    </div>
  </body>
  </html>
  `);
});

// ===== PRACTICE QUIZ =====
app.get("/practice", (req, res) => {
  res.send(`
  <html>
  <head>
    <title>Practice</title>
    <style>
      body { font-family: Arial; background:#a5d6a7; text-align:center; padding:40px; }
      .quiz { background:white; padding:20px; border-radius:15px; width:500px; margin:auto; }
      button { padding:10px; margin:10px; background:green; color:white; border:none; border-radius:8px; }
    </style>
  </head>
  <body>
    <div class="quiz">
      <h2>♻️ Practice Quiz</h2>
      <form method="POST" action="/practice">
        <p>1. What is Recycling?</p>
        <input type="radio" name="q1" value="a" required/> Reusing waste materials<br/>
        <input type="radio" name="q1" value="b"/> Burning garbage<br/><br/>
        <button type="submit">Submit</button>
      </form>
      <br/>
      <a href="/dashboard">⬅ Back</a>
    </div>
  </body>
  </html>
  `);
});

app.post("/practice", (req, res) => {
  if (req.body.q1 === "a") {
    users[currentUser].points += 10;
  }
  res.redirect("/dashboard");
});

// ===== ABOUT PAGE =====
app.get("/about", (req, res) => {
  res.send(`
  <html>
  <head>
    <title>About</title>
    <style>
      body { font-family: Arial; background:#dcedc8; text-align:center; padding:40px; }
      .box { background:white; padding:20px; border-radius:15px; width:600px; margin:auto; }
    </style>
  </head>
  <body>
    <div class="box">
      <h2>About Eco-Sphere 🌱</h2>
      <p>
      Eco-Sphere is an environmental education platform that uses interactive
      learning, quizzes, and gamification to create awareness about sustainability,
      recycling, and climate responsibility among students.
      </p>
      <a href="/dashboard">⬅ Back</a>
    </div>
  </body>
  </html>
  `);
});

// ===== SERVER PORT FOR RENDER =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Eco-Sphere running on port " + PORT);
});
