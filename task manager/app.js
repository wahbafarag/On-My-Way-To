require("dotenv").config();
require("./db/connect");
const express = require("express");
const notFound = require("./middlewares/notfound");
const errorHandler = require("./middlewares/handleErrors");

const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// routes
const tasksRoutes = require("./routes/tasks");
app.use("/api/v1/tasks", tasksRoutes);

//
app.use("*", notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server up and running at ${port}`);
});
