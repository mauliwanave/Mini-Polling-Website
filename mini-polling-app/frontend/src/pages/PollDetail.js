import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import {
  Card,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Box
} from "@mui/material";

const PollDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const res = await API.get(`/polls/${id}`);
        setPoll(res.data);

        // Optional UI-level vote protection (UX only)
        const voted = localStorage.getItem(`voted_poll_${id}`);
        if (voted) {
          setHasVoted(true);
        }
      } catch (error) {
        alert("Failed to load poll");
      } finally {
        setLoading(false);
      }
    };

    fetchPoll();
  }, [id]);

  const handleVote = async () => {
    if (!selectedOption) {
      alert("Please select an option");
      return;
    }

    try {
      await API.post(`/polls/${id}/vote`, {
        optionId: Number(selectedOption)
      });

      // Mark as voted (frontend UX)
      localStorage.setItem(`voted_poll_${id}`, "true");
      navigate(`/results/${id}`);
    } catch (error) {
      alert(error.response?.data?.message || "Voting failed");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!poll) return <p>Poll not found</p>;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
      <Card sx={{ width: "100%", maxWidth: 500 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {poll.question}
          </Typography>

          {/* Poll closed */}
          {!poll.isActive && (
            <Typography color="error" sx={{ marginBottom: 2 }}>
              This poll is closed
            </Typography>
          )}

          <RadioGroup
            value={selectedOption}
            onChange={e => setSelectedOption(e.target.value)}
          >
            {poll.options.map(option => (
              <FormControlLabel
                key={option.id}
                value={option.id.toString()}
                control={<Radio />}
                label={option.text}
                disabled={!poll.isActive || hasVoted}
              />
            ))}
          </RadioGroup>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleVote}
            disabled={!poll.isActive || hasVoted}
            sx={{ marginTop: 2 }}
          >
            {hasVoted ? "Already Voted" : "Submit Vote"}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PollDetail;
