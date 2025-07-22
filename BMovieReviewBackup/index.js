//index.js
import app from "./server.js";
import mysql from "mysql2";
import ReviewsDAO from "./dao/reviewsDAO.js";

const port = 8000;

const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "xxxxx",
  password: "xxxxx",
  database: "movie_review",
});

con.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err.stack);
    process.exit(1);
  } else {
    console.log("Connected to MySQL");

    ReviewsDAO.injectDB(con).then(() => {
      app.listen(port, () => {
        console.log(`Listening on port ${port}`);
      });
    });
  }
});


