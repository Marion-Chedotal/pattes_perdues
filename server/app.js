require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./models");
const cookieParser = require("cookie-parser");
const routes = require("./routes/routes");

const app = express();
const helmet = require("helmet");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// dev
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "http://localhost:3000"],
        fontSrc: ["'self'", "https:", "data:"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
        
      },
    },
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginOpenerPolicy: "same-origin",
  })
);
app.use(
  helmet.frameguard({
    action: "deny",
  })
 );
 app.use(helmet.xssFilter());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(morgan("combine"));
app.use("/api/uploads", express.static("uploads"));

app.use("/api", routes);

const port = process.env.PORT || 8080;

db.sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Serveur listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error occurred while synchronizing Sequelize:", error);
  });
