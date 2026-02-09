const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "task1db"
});

// DB connect
db.connect((err) => {
  if (err) {
    console.log("DB Connection Failed ❌");
    return;
  }
  console.log("DB Connected Successfully ✅");
});

// ✅ GET route (browser साठी)
app.get("/", (req, res) => {
  res.send(`
    <h2>Task 1 – Simple App</h2>
    <form method="POST" action="/add">
      <input name="name" placeholder="Enter name" required />
      <button>Add</button>
    </form>
  `);
});

// POST route
app.post("/add", (req, res) => {
  db.query(
    "INSERT INTO users (name) VALUES (?)",
    [req.body.name],
    () => {
      res.send("User Added Successfully ✅ <br><a href='/'>Go Back</a>");
    }
  );
});

// ✅ IMPORTANT: listen on 0.0.0.0
app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});

