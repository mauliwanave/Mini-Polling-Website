const axios = require("axios");

// ⚠️ JSON Server should run on 3001
const JSON_DB_URL = "http://localhost:3001";

// =======================
// GET /polls
// =======================
exports.getAllPolls = async (req, res) => {
  try {
    const response = await axios.get(`${JSON_DB_URL}/polls`);

    // Only active polls
    const activePolls = response.data.filter(poll => poll.isActive);

    return res.status(200).json(activePolls);
  } catch (error) {
    console.error("❌ Error in GET /polls:", error.message);
    return res.status(500).json({ message: "Failed to fetch polls" });
  }
};

// =======================
// GET /polls/:id
// =======================
exports.getPollById = async (req, res) => {
  try {
    const pollId = Number(req.params.id);

    const pollRes = await axios.get(`${JSON_DB_URL}/polls/${pollId}`);
    const optionsRes = await axios.get(
      `${JSON_DB_URL}/options?pollId=${pollId}`
    );

    return res.status(200).json({
      ...pollRes.data,
      options: optionsRes.data
    });
  } catch (error) {
    console.error("❌ Error in GET /polls/:id:", error.message);
    return res.status(404).json({ message: "Poll not found" });
  }
};

// =======================
// POST /polls (Create Poll)
// =======================
exports.createPoll = async (req, res) => {
  try {
    const { question, options } = req.body;

    // Validation
    if (!question || !Array.isArray(options) || options.length < 2) {
      return res.status(400).json({
        message: "Poll question and at least 2 options are required"
      });
    }

    // Create poll
    const pollRes = await axios.post(`${JSON_DB_URL}/polls`, {
      question: question.trim(),
      isActive: true,
      createdAt: new Date().toISOString().split("T")[0]
    });

    const pollId = pollRes.data.id;

    // Create options (sequential = safer with JSON Server)
    for (const text of options) {
      await axios.post(`${JSON_DB_URL}/options`, {
        pollId,
        text: text.trim(),
        votes: 0
      });
    }

    return res.status(201).json({
      message: "Poll created successfully",
      pollId
    });
  } catch (error) {
    console.error("❌ Error creating poll:", error.message);
    return res.status(500).json({ message: "Failed to create poll" });
  }
};

// =======================
// POST /polls/:id/vote
// =======================
exports.votePoll = async (req, res) => {
  try {
    const pollId = Number(req.params.id);
    const { optionId } = req.body;

    if (!optionId) {
      return res.status(400).json({ message: "Option ID is required" });
    }

    const userIp =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    // Prevent multiple votes
    const voteCheck = await axios.get(
      `${JSON_DB_URL}/votes?pollId=${pollId}&userIp=${userIp}`
    );

    if (voteCheck.data.length > 0) {
      return res.status(400).json({ message: "You have already voted" });
    }

    // Fetch option
    const optionRes = await axios.get(
      `${JSON_DB_URL}/options/${optionId}`
    );

    // Increment vote count
    await axios.patch(`${JSON_DB_URL}/options/${optionId}`, {
      votes: optionRes.data.votes + 1
    });

    // Store vote
    await axios.post(`${JSON_DB_URL}/votes`, {
      pollId,
      optionId,
      userIp
    });

    return res.status(200).json({ message: "Vote submitted successfully" });
  } catch (error) {
    console.error("❌ Voting error:", error.message);
    return res.status(500).json({ message: "Failed to submit vote" });
  }
};

// =======================
// GET /polls/:id/results
// =======================
exports.getPollResults = async (req, res) => {
  try {
    const pollId = Number(req.params.id);

    const optionsRes = await axios.get(
      `${JSON_DB_URL}/options?pollId=${pollId}`
    );

    const options = optionsRes.data;

    const totalVotes = options.reduce(
      (sum, option) => sum + option.votes,
      0
    );

    const results = options.map(option => ({
      optionId: option.id,
      text: option.text,
      votes: option.votes,
      percentage:
        totalVotes === 0
          ? 0
          : ((option.votes / totalVotes) * 100).toFixed(2)
    }));

    return res.status(200).json({
      pollId,
      totalVotes,
      results
    });
  } catch (error) {
    console.error("❌ Results error:", error.message);
    return res.status(500).json({ message: "Failed to fetch results" });
  }
};
