const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

const createJob = async (req, res) => {
  req.body.createdBy = req.user.id;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job: job });
};

const getAllobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.id }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs: jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  const userId = req.user.id;
  const jobId = req.params.id;
  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError("job not found ");
  }
  res.status(StatusCodes.OK).json({ msg: job });
};

const updateJob = async (req, res) => {
  const userId = req.user.id;
  const jobId = req.params.id;
  const { company, position } = req.body;
  if (company === "" || position === "") {
    throw new BadRequestError("Company and Position Cant be empty");
  }
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError("Job not found");
  }
  res.status(StatusCodes.OK).json({ job: job });
};
const deleteJob = async (req, res) => {
  const userId = req.user.id;
  const jobId = req.params.id;
  const job = await Job.findByIdAndDelete({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new BadRequestError("Job not found");
  }
  res.status(StatusCodes.OK).json({ job: job });
};

module.exports = { createJob, getAllobs, getJob, updateJob, deleteJob };
