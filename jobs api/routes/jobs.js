const express = require("express");

const router = express.Router();
const {
  createJob,
  getAllobs,
  getJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");

router.route("/").post(createJob).get(getAllobs);
router.route("/:id").get(getJob).patch(updateJob).delete(deleteJob);

module.exports = router;
