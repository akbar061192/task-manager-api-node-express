const express = require("express");
const morgan = require("morgan");
const connectDB = require("./db/connect");
const tasks = require("./routes/tasks");
require("dotenv").config();
const notFound = require("./middlewares/NotFound");
const errorHandler = require("./middlewares/ErrorHandler");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_CONNECTION_STRING = process.env.MONGO_URI;

app.use(express.static("./public"));
app.use(express.json());
app.use(morgan("tiny"));

// tasks routes
app.use("/api/v1/tasks", tasks);

// middleware for invalid route's
app.use(notFound);
app.use(errorHandler);

// connecting to mongo db then starting the server
const startApp = async () => {
  try {
    console.log(`connecting to db with url => ${MONGO_CONNECTION_STRING}`);
    await connectDB(MONGO_CONNECTION_STRING);
    console.log("connected to db...");
    app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

startApp();
