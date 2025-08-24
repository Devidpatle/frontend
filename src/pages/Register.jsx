import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  MenuItem,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import StorefrontIcon from "@mui/icons-material/Storefront";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/", form);
      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        background: "linear-gradient(135deg, #e3f0ff 0%, #f9fafb 100%)",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: { xs: 2, sm: 4 },
          maxWidth: 400,
          width: "100%",
          borderRadius: 4,
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          background: "rgba(255,255,255,0.98)",
        }}
      >
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <PersonAddAltIcon color="primary" fontSize="large" />
          <Typography variant="h5" fontWeight="bold" color="primary">
            Register
          </Typography>
        </Stack>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            margin="normal"
            required
            InputProps={{
              startAdornment: <EmojiPeopleIcon color="action" sx={{ mr: 1 }} />,
            }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            select
            fullWidth
            label="Role"
            name="role"
            value={form.role}
            onChange={handleChange}
            margin="normal"
            InputProps={{
              startAdornment: form.role === "merchant"
                ? <StorefrontIcon color="action" sx={{ mr: 1 }} />
                : <EmojiPeopleIcon color="action" sx={{ mr: 1 }} />,
            }}
          >
            <MenuItem value="user">
              <EmojiPeopleIcon sx={{ mr: 1 }} /> User
            </MenuItem>
            <MenuItem value="merchant">
              <StorefrontIcon sx={{ mr: 1 }} /> Merchant
            </MenuItem>
          </TextField>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              mt: 3,
              borderRadius: 2,
              fontWeight: "bold",
              boxShadow: "0 2px 8px rgba(25, 118, 210, 0.10)",
              textTransform: "none",
              py: 1.2,
            }}
          >
            Register
          </Button>
        </form>

        <Box textAlign="center" mt={2}>
          <Typography variant="body2">
            Already have an account?{" "}
            <Button
              variant="text"
              color="primary"
              sx={{ fontWeight: "bold", textTransform: "none" }}
              onClick={() => navigate("/login")}
            >
              Login here
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}