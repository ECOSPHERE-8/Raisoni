const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

// Simple in-memory user (demo only)
const USER = { username: "student", password: "1234", points: 0 };

function layout(title, content) {
  return `
  <html>
  <head>
    <title>${title}</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        background: linear-gradient(to bottom right, #e8f5e9, #a5d6a7);
        text-align: center;
      }
      .container {
        padding: 30px;
      }
      h1 {
        color: #1b5e20;
      }
      .box {
        background: white;
        padding: 25px;
        margin: auto;
        width: 80%;
        max-width: 400px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      }
      input, button {
        width: 90%;
        padding: 10px;
        margin: 10px;
        border-radius: 6px;
        border: 1px solid #ccc;
      }
      button {
        background: #2e7d32;
        color: white;
        font-weight: bold;
        cursor: pointer;
      }
      button:hover {
        background: #1b5e20;
      }
      .nav button {
        width: 120px;
      }
      .placeholder {
        border: 2px dashed #2e7d32;
        padding: 40px;
        margin: 20px;
        color: #2e7d32;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="container">
      ${content}
    </div>
  </body>
  </html>
  `;
}

// Login Page
app.get("/", (req, res) => {
  res.send(layout("Login", `
    <div class="box">
      <h1>Ecosphere Login</h1>
      <form method="POST" action="/login">
        <input type="text" name="username" placeholder="Username" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p>Demo Login → student / 1234</p>
    </div>
  `));
});

// Login Auth
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === USER.username && password === USER.password) {
    res.redirect("/dashboard");
  } else {
    res.send(layout("Error", `<h2>Invalid Login</h2><a href="/">Try Again</a>`));
  }
});

// Dashboard
app.get("/dashboard", (req, res) => {
  res.send(layout("Dashboard", `
    <h1>Welcome to Ecosphere 🌍</h1>
    <p><b>User:</b> ${USER.username}</p>
    <p><b>Points Earned:</b> ${USER.points}</p>

    <div class="nav">
      <a href="/learn"><button>Learn</button></a>
      <a href="/practice"><button>Practice</button></a>
      <a href="/about"><button>About Us</button></a>
    </div>
  `));
});

// Learn Page
app.get("/learn", (req, res) => {
  res.send(layout("Learn", `
    <h1>Environmental Learning 🌱</h1>
    <div class="placeholder">PI - Add Environment Awareness Video/Image Here</div>
    <p>Learn about sustainability, recycling, and protecting nature through engaging content.</p>
    <a href="/dashboard"><button>Back</button></a>
  `));
});

// Practice Quiz
app.get("/practice", (req, res) => {
  res.send(layout("Practice", `
    <h1>Practice Case Study 🌿</h1>
    <form method="POST" action="/submit">
      <p><b>Q1:</b> What is Recycling?</p>
      <input name="q1" placeholder="Your Answer" required />

      <p><b>Q2:</b> Name one way to reduce plastic pollution.</p>
      <input name="q2" placeholder="Your Answer" required />

      <button type="submit">Submit Answers</button>
    </form>
    <a href="/dashboard"><button>Back</button></a>
  `));
});

// Submit Quiz
app.post("/submit", (req, res) => {
  USER.points += 10;
  res.send(layout("Result", `
    <h1>Great Job! 🎉</h1>
    <p>You earned 10 points for completing the case study.</p>
    <p>Total Points: ${USER.points}</p>
    <a href="/dashboard"><button>Go to Dashboard</button></a>
  `));
});

// About Page
app.get("/about", (req, res) => {
  res.send(layout("About", `
    <h1>About Ecosphere</h1>
    <div class="placeholder">P2 - Add Environment Images Here</div>
    <p>Ecosphere is an educational platform designed to promote environmental awareness through interactive learning and practice case studies.</p>
    <a href="/dashboard"><button>Back</button></a>
  `));
});

app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});
