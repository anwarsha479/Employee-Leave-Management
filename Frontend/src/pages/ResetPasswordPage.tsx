import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { resetPassword } from "../services/auth.service";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Container,
  Link,
  Avatar,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockResetIcon from "@mui/icons-material/LockReset";

function ResetPasswordPage() {
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await resetPassword(resetToken, newPassword);
      alert("Password reset successfully");
      navigate("/");
    } catch (error) {
      alert("Invalid token");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
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
              bgcolor: "primary.main",
              width: 56,
              height: 56,
              boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)",
            }}
          >
            <LockResetIcon sx={{ fontSize: 32 }} />
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
            Set your new portal password
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
              sx={{ fontWeight: 600, mb: 3 }}
            >
              Reset Password
            </Typography>

            <Box component="div">
              <TextField
                margin="normal"
                required
                fullWidth
                id="resetToken"
                label="Reset Token"
                name="resetToken"
                value={resetToken}
                onChange={(e) => setResetToken(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="newPassword"
                label="New Password"
                type={showPassword ? "text" : "password"}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                sx={{ mb: 3 }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
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
                Reset Password
              </Button>

              <Box sx={{ mt: 3, textAlign: "center" }}>
                <Link
                  component={RouterLink}
                  to="/"
                  variant="body2"
                  color="primary.light"
                  sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                >
                  Back to Login
                </Link>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default ResetPasswordPage;
