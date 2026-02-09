const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "task1db"
});

db.connect((err) => {
  if (err) {
    console.log("DB Connection Failed");
    return;
  }
  console.log("DB Connected Successfully");
});

app.get("/", (req, res) => {
  res.send(`
    <h2>Task 1 – Simple App</h2>
    <form method="POST" action="/add">
      <input name="name" placeholder="Enter name" required />
      <button>Add</button>
    </form>
  `);
});

app.post("/add", (req, res) => {
  db.query(
    "INSERT INTO users (name) VALUES (?)",
    [req.body.name],
    () => {
      res.send("User Added Successfully  <br><a href='/'>Go Back</a>");
    }
  );
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});

