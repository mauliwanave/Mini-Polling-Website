import { useEffect, useState } from "react";
import API from "../services/api";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Stack,
  Chip
} from "@mui/material";
import { Link } from "react-router-dom";

const PollList = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const res = await API.get("/polls");

        // Remove duplicate polls (safety)
        const uniquePolls = Array.from(
          new Map(res.data.map(poll => [poll.id, poll])).values()
        );

        setPolls(uniquePolls);
      } catch (error) {
        console.error("Failed to fetch polls", error);
      }
    };

    fetchPolls();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      {polls.length === 0 && (
        <Typography>No polls available</Typography>
      )}

      {polls.map(poll => (
        <Card key={poll.id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              marginBottom={1}
            >
              <Typography variant="h6">
                {poll.question}
              </Typography>

              <Chip
                label={poll.isActive ? "Active" : "Closed"}
                color={poll.isActive ? "success" : "default"}
                size="small"
              />
            </Stack>

            <Stack direction="row" spacing={2}>
              <Button
                component={Link}
                to={`/polls/${poll.id}`}
                variant="contained"
                disabled={!poll.isActive}
              >
                Vote
              </Button>

              <Button
                component={Link}
                to={`/results/${poll.id}`}
                variant="outlined"
                color="secondary"
              >
                View Results
              </Button>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PollList;
