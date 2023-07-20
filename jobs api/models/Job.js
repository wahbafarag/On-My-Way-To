const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is required"],
      maxLenght: 20,
    },
    position: {
      type: String,
      required: [true, "Job Position is required"],
      maxLenght: 50,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Job Owner name is required"],
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", JobSchema);
module.exports = Job;
