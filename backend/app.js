const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const indexRouter = require("./routes/index"); // in routes - index
const path = require("path");

// const public = path.join(__dirname, "./dist");
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(indexRouter);

// app.use("/", express.static(public));

app.listen(process.env.PORT || 5050, () => {
  console.log("Server started on: " + process.env.PORT);
});
