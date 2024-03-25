// imports
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const db = require("./models");
const cookieParser = require("cookie-parser");
// Routers
const userRouter = require("./routes/UserRoute.js");

// instanciation du serveur
const app = express();

// configuration du body-parser
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("combine"));

app.use("/auth", userRouter);

// Lancement du serveur
const port = process.env.PORT || 8080;

try {
  db.sequelize.sync().then(() => {
    app.listen(port, () => {
      console.log(`Serveur listening on port ${port}`);
    });
  });
} catch (error) {
  console.error("Error occurred while synchronizing Sequelize:", error);
}
