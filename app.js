require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const morgan = require("morgan");

const app = express();

switch (app.get("env")) {
  case "development":
    app.use(require("morgan")("dev"));
    break;
  case "production":
    const stream = fs.createWriteStream(__dirname + "/access.log", {
      flag: "a",
    });
    app.use(morgan("combined", { stream }));
    break;
}

const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser("some secret"));

app.use("/user", require("./routes/userRoutes"));

app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
    message: "Something went realy wrong",
  });
});

app.listen(port, () => {
  console.log(`Express running on localhost:${port} | ${app.get("env")} mode`);
});
