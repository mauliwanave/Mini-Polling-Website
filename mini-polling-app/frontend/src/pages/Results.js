import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
  Button
} from "@mui/material";

const Results = () => {
  const { id } = useParams();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await API.get(`/polls/${id}/results`);
        setResults(res.data);
      } catch (error) {
        alert("Failed to load results");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [id]);

  if (loading) return <p>Loading results...</p>;
  if (!results) return <p>No results available</p>;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
      <Card sx={{ width: "100%", maxWidth: 600 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Poll Results
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            Total Votes: {results.totalVotes}
          </Typography>

          {results.results.length === 0 && (
            <Typography>No votes yet</Typography>
          )}

          {results.results.map(option => (
            <Box key={option.optionId} sx={{ marginTop: 2 }}>
              <Typography>
                {option.text} — {option.votes} votes (
                {option.percentage}%)
              </Typography>
              <LinearProgress
                variant="determinate"
                value={Number(option.percentage)}
                sx={{ height: 8, borderRadius: 5 }}
              />
            </Box>
          ))}

          <Button
            component={Link}
            to="/"
            variant="outlined"
            sx={{ marginTop: 3 }}
          >
            Back to Polls
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Results;
