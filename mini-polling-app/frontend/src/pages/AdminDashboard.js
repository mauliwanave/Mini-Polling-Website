import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box
} from "@mui/material";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000";

const AdminDashboard = () => {
  const [polls, setPolls] = useState([]);

  // Fetch all polls
  const fetchPolls = async () => {
    try {
      const res = await axios.get(`${API_URL}/polls`);
      setPolls(res.data);
    } catch (error) {
      alert("Failed to fetch polls");
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  // Delete poll
  const handleDelete = async (pollId) => {
    const confirm = window.confirm("Are you sure you want to delete this poll?");
    if (!confirm) return;

    try {
      await axios.delete(`${API_URL}/db/polls/${pollId}`);
      alert("Poll deleted successfully");
      fetchPolls(); // refresh list
    } catch (error) {
      alert("Failed to delete poll");
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/create"
        sx={{ marginBottom: 3 }}
      >
        Create New Poll
      </Button>

      {polls.length === 0 && (
        <Typography>No polls available</Typography>
      )}

      {polls.map((poll) => (
        <Card key={poll.id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">
              {poll.question}
            </Typography>

            <Box sx={{ marginTop: 1 }}>
              <Button
                variant="outlined"
                component={Link}
                to={`/results/${poll.id}`}
                sx={{ marginRight: 1 }}
              >
                View Results
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(poll.id)}
              >
                Delete
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default AdminDashboard;
