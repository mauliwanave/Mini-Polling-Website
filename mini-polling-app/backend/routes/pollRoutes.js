const express = require("express");
const router = express.Router();

const {
  getAllPolls,
  getPollById,
  createPoll,
  votePoll,
  getPollResults
} = require("../controllers/pollController");

// =======================
// Poll Routes
// =======================

// Get all active polls
router.get("/", getAllPolls);

// Get poll details with options
router.get("/:id", getPollById);

// Create new poll (Admin)
router.post("/", createPoll);

// Vote on a poll
router.post("/:id/vote", votePoll);

// Get poll results
router.get("/:id/results", getPollResults);

module.exports = router;
