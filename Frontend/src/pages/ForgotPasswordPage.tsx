import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { forgotPassword } from "../services/auth.service";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Container,
  Link,
  Avatar,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await forgotPassword(email);
      alert(`Reset Token: ${response.data.resetToken}`);
      navigate("/reset-password");
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at 50% 50%, #1e1b4b 0%, #09090b 100%)",
        py: 4,
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: "secondary.main",
              width: 56,
              height: 56,
              boxShadow: "0 0 20px rgba(16, 185, 129, 0.5)",
            }}
          >
            <HelpIcon sx={{ fontSize: 32 }} />
          </Avatar>
          <Typography
            component="h1"
            variant="h4"
            sx={{
              fontWeight: 800,
              mt: 2,
              textAlign: "center",
              background: "linear-gradient(45deg, #818cf8 30%, #34d399 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Leave Management System
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Recover your account password
          </Typography>
        </Box>

        <Card
          sx={{
            background: "rgba(24, 24, 27, 0.65)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.4)",
            borderRadius: 4,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              component="h2"
              variant="h5"
              sx={{ fontWeight: 600, mb: 2 }}
            >
              Forgot Password
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Enter your email address and we will provide a reset token.
            </Typography>

            <Box component="div">
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                onClick={handleSubmit}
                sx={{
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 600,
                  bgcolor: "primary.main",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                }}
              >
                Send Reset Link
              </Button>

              <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
                <Link
                  component={RouterLink}
                  to="/"
                  variant="body2"
                  color="primary.light"
                  sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                >
                  Back to Login
                </Link>
                <Link
                  component={RouterLink}
                  to="/reset-password"
                  variant="body2"
                  color="secondary.light"
                  sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                >
                  Have a token? Reset
                </Link>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default ForgotPasswordPage;
