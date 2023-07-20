const Product = require("../models/product");

const getAllStaticProducts = async (req, res) => {
  //   const allProducts = await Product.find({});

  //   const allProducts = await Product.find({
  //     name: { $regex: "ab", $options: "i" },
  //     // use regex to search for a pattern in product name and u can pass the options as well
  //   });

  // const allProducts = await Product.find({
  //   // sort products using json doc
  //   // and if u want to sort them in desceding order u add - to the sorting property like '-name or -price'
  // }).sort("-name price");

  // lets get name and price for all products based on select()
  const allProducts = await Product.find({}).select("name price"); // get only name and price

  res.status(200).json({ nbHits: allProducts.length, static: allProducts });
};
const getAllProducts = async (req, res) => {
  // const allProducts = await Product.find({ featured: true });     // get all featured products
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObj = {};

  if (featured) {
    queryObj.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObj.company = company;
  }

  if (name) {
    queryObj.name = { $regex: name, $options: "i" };
  }

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "<": "$lt",
      "<=": "$lte",
      "=": "$eq",
      ">": "$gt",
      ">": "$gt",
    };
    const regEx = /\b(<|>|>=|=|<=|<)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const numericOptions = ["price", "rating"];
    filters = filters.split(",").forEach((items) => {
      const [field, operator, value] = items.split("-");
      if (numericOptions.includes(field)) {
        queryObj[field] = { [operator]: Number(value) };
      }
    });
  }
  // we used let and removed await and cant perform the sort operation here because after finding all products we dont have the queryObj anymore
  let allProducts = Product.find(queryObj);
  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    allProducts = allProducts.sort(sortList);
  } else {
    allProducts = allProducts.sort("createdAt");
  }
  // select
  if (fields) {
    const selectList = fields.split(",").join(" ");
    allProducts = allProducts.select(selectList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  allProducts.skip(skip).limit(limit);
  const products = await allProducts;

  res.status(200).json({ nbHits: products.length, products: products });
};

module.exports = { getAllProducts, getAllStaticProducts };
