const express = require("express");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const db = require("./models");
const cookieParser = require("cookie-parser");

const routes = require("./routes/routes");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(morgan("combine"));
app.use("/uploads", express.static("uploads"));

app.use("/api", routes);

const port = process.env.REACT_APP_PORT || 8080;

try {
  db.sequelize.sync().then(() => {
    app.listen(port, () => {
      console.log(`Serveur listening on port ${port}`);
    });
  });
} catch (error) {
  console.error("Error occurred while synchronizing Sequelize:", error);
}
