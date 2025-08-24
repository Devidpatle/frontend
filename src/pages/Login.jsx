import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/login", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/products"); // redirect after login
    } catch (err) {
      alert(err.response?.data?.message || "Invalid email or password. Please register first.");
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
          <LockOpenIcon color="primary" fontSize="large" />
          <Typography variant="h5" fontWeight="bold" color="primary">
            Login
          </Typography>
        </Stack>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            margin="normal"
            required
            autoFocus
            InputProps={{
              startAdornment: <EmailIcon color="action" sx={{ mr: 1 }} />,
            }}
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
            InputProps={{
              startAdornment: <KeyIcon color="action" sx={{ mr: 1 }} />,
            }}
          />
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
            Sign In
          </Button>
        </form>
        <Box textAlign="center" mt={2}>
          <Typography variant="body2">
            Don't have an account?{" "}
            <Button
              variant="text"
              color="primary"
              sx={{ fontWeight: "bold", textTransform: "none" }}
              onClick={() => navigate("/")}
            >
              Register here
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}