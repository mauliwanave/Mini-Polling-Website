import { useState } from "react";
import API from "../services/api";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreatePoll = () => {
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const addOption = () => {
    setOptions(prev => [...prev, ""]);
  };

  const handleSubmit = async () => {
    // ✅ Clean options (VERY IMPORTANT)
    const cleanedOptions = options
      .map(opt => opt.trim())
      .filter(opt => opt.length > 0);

    if (!question.trim()) {
      alert("Poll question is required");
      return;
    }

    if (cleanedOptions.length < 2) {
      alert("Please add at least 2 options");
      return;
    }

    try {
      await API.post("/polls", {
        question: question.trim(),
        options: cleanedOptions
      });

      alert("Poll created successfully ✅");

      // Redirect to poll list / admin dashboard
      navigate("/");
    } catch (error) {
      console.error("❌ Create poll error:", error.response?.data || error.message);
      alert("Failed to create poll");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
      <Card sx={{ width: "100%", maxWidth: 500 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Create New Poll
          </Typography>

          <TextField
            fullWidth
            label="Poll Question"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            margin="normal"
          />

          {options.map((option, index) => (
            <TextField
              key={index}
              fullWidth
              label={`Option ${index + 1}`}
              value={option}
              onChange={e => handleOptionChange(index, e.target.value)}
              margin="normal"
            />
          ))}

          <Button
            variant="outlined"
            onClick={addOption}
            sx={{ marginTop: 1 }}
          >
            Add Option
          </Button>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ marginTop: 3 }}
          >
            Create Poll
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreatePoll;
