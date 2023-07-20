require("dotenv").config();
const dbConnection = require("./db/connect");
const Product = require("./models/product");
const jsonProducts = require("./products.json");

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    await Product.create(jsonProducts);
    process.exit(0); // means that creating products went well *create and exist *
  } catch (error) {
    console.log(error);
    process.exit(1); // means that creating products went wrong and there is an error
  }
};
seedProducts();
