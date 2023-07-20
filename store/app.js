const express = require("express");
require("dotenv").config();
require("express-async-errors");
const dbConnection = require("./db/connect");
const pageNotFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
const productRoutes = require("./routes/products");
//
const app = express();
const port = process.env.PORT || 3000;

//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// home route
app.get("/store", (req, res) => res.send("Store Api"));

//products route
app.use("/api/v1/products", productRoutes);

//
app.use("*", pageNotFound);
app.use(errorHandler);
app.listen(port, console.log(`Server up and Running on port ${port}..`));
