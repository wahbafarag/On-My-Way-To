const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getAllStaticProducts,
} = require("../controllers/products");

router.get("/", getAllProducts);
router.get("/static", getAllStaticProducts);

module.exports = router;
