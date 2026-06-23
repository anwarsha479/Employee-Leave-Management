import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Avatar,
  Chip,
  Divider,
  Grid,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import FingerprintIcon from "@mui/icons-material/Fingerprint";

import Layout from "../components/Layout";
import { getProfile } from "../services/profile.service";

function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <Layout>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  const roleColor = profile.role === "ADMIN" ? "primary" : "secondary";
  const userInitials = profile.email ? profile.email.substring(0, 2).toUpperCase() : "ME";

  return (
    <Layout>
      <Box sx={{ maxWidth: 800, mx: "auto", py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
          My Profile
        </Typography>

        <Card
          sx={{
            background: "rgba(24, 24, 27, 0.65)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
            borderRadius: 4,
            overflow: "visible",
            position: "relative",
          }}
        >
          {/* Accent Header Line */}
          <Box
            sx={{
              height: 6,
              background: "linear-gradient(90deg, #6366f1 0%, #10b981 100%)",
              borderTopLeftRadius: "inherit",
              borderTopRightRadius: "inherit",
            }}
          />

          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "center", sm: "flex-start" },
                gap: 4,
                mb: 4,
              }}
            >
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  fontSize: "2rem",
                  fontWeight: 700,
                  bgcolor: profile.role === "ADMIN" ? "primary.main" : "secondary.main",
                  boxShadow:
                    profile.role === "ADMIN"
                      ? "0 0 25px rgba(99, 102, 241, 0.45)"
                      : "0 0 25px rgba(16, 185, 129, 0.45)",
                }}
              >
                {userInitials}
              </Avatar>

              <Box sx={{ flexGrow: 1, textAlign: { xs: "center", sm: "left" } }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "center",
                    gap: 1.5,
                    mb: 1.5,
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {profile.email?.split("@")[0] || "User Name"}
                  </Typography>
                  <Chip
                    label={profile.role}
                    color={roleColor}
                    size="small"
                    sx={{ fontWeight: 700, textTransform: "uppercase" }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Employee Management Portal User
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <FingerprintIcon color="action" />
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                      User ID
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {profile.userId}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <EmailIcon color="action" />
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                      Email Address
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {profile.email}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <BadgeIcon color="action" />
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                      Role Access
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {profile.role === "ADMIN" ? "Administrator Access" : "Employee Portal Access"}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
}

export default ProfilePage;