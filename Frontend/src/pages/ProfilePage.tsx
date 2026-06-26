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
  Button,
  TextField,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import Layout from "../components/Layout";
import {
  getProfile,
  updateProfile,
} from "../services/profile.service";

function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();

        setProfile(response.data);
        setName(response.data.name);
        setPhone(response.data.phone);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      await updateProfile({
        name,
        phone,
      });

      setProfile({
        ...profile,
        name,
        phone,
      });

      setEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (!profile) {
    return (
      <Layout>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
          }}
        >
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  const roleColor =
    profile.role === "ADMIN"
      ? "primary"
      : "secondary";

  const userInitials = profile.name
    ? profile.name
      .split(" ")
      .map((word: string) => word[0])
      .join("")
      .toUpperCase()
    : "ME";

  return (
    <Layout>
      <Box sx={{ maxWidth: 900, mx: "auto", py: 4 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 800, mb: 4 }}
        >
          My Profile
        </Typography>

        <Card
          sx={{
            background:
              "rgba(24,24,27,0.65)",
            backdropFilter: "blur(16px)",
            border:
              "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.3)",
            borderRadius: 4,
          }}
        >
          <Box
            sx={{
              height: 6,
              background:
                "linear-gradient(90deg,#6366f1 0%,#10b981 100%)",
              borderTopLeftRadius: "inherit",
              borderTopRightRadius: "inherit",
            }}
          />

          <CardContent
            sx={{ p: { xs: 3, md: 5 } }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
                gap: 4,
                mb: 4,
                alignItems: {
                  xs: "center",
                  sm: "flex-start",
                },
              }}
            >
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  fontSize: "2rem",
                  fontWeight: 700,
                  bgcolor:
                    profile.role === "ADMIN"
                      ? "primary.main"
                      : "secondary.main",
                }}
              >
                {userInitials}
              </Avatar>

              <Box
                sx={{
                  flexGrow: 1,
                  textAlign: {
                    xs: "center",
                    sm: "left",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: {
                      xs: "column",
                      sm: "row",
                    },
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  {editing ? (
                    <TextField
                      value={name}
                      onChange={(e) =>
                        setName(
                          e.target.value,
                        )
                      }
                      size="small"
                    />
                  ) : (
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      {profile.name}
                    </Typography>
                  )}

                  <Chip
                    label={profile.role}
                    color={roleColor}
                    size="small"
                  />
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {profile.designation}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <FingerprintIcon />
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      Employee Code
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 600,
                      }}
                    >
                      {profile.employeeCode}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <EmailIcon />
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      Email Address
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 600,
                      }}
                    >
                      {profile.email}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <PhoneIcon />
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      Phone Number
                    </Typography>

                    {editing ? (
                      <TextField
                        value={phone}
                        onChange={(e) =>
                          setPhone(
                            e.target.value,
                          )
                        }
                        size="small"
                      />
                    ) : (
                      <Typography
                        sx={{
                          fontWeight: 600,
                        }}
                      >
                        {profile.phone}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <BusinessIcon />
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      Department
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 600,
                      }}
                    >
                      {profile.department}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <WorkIcon />
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      Designation
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 600,
                      }}
                    >
                      {profile.designation}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <CalendarMonthIcon />
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      Joining Date
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 600,
                      }}
                    >
                      {profile.joiningDate}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Box
              sx={{
                mt: 4,
                display: "flex",
                gap: 2,
              }}
            >
              {editing ? (
                <>
                  <Button
                    variant="contained"
                    onClick={handleSave}
                  >
                    Save
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={() => {
                      setName(
                        profile.name,
                      );
                      setPhone(
                        profile.phone,
                      );
                      setEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  onClick={() =>
                    setEditing(true)
                  }
                >
                  Edit Profile
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
}

export default ProfilePage;