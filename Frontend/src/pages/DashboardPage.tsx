import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
} from "@mui/material";

import { getDashboardStats } from "../services/dashboard.service";
import Layout from "../components/Layout";

interface DashboardStats {
  totalEmployees: number;
  totalDepartments: number;
  totalLeaves: number;
  pendingLeaves: number;
  approvedLeaves: number;
  rejectedLeaves: number;
}

function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getDashboardStats();
        setStats(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return (
      <Layout>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  const statItems = [
    { label: "Total Employees", value: stats.totalEmployees, color: "#6366f1" },
    { label: "Total Departments", value: stats.totalDepartments, color: "#a855f7" },
    { label: "Total Leaves", value: stats.totalLeaves, color: "#3b82f6" },
    { label: "Pending Leaves", value: stats.pendingLeaves, color: "#ff9800" },
    { label: "Approved Leaves", value: stats.approvedLeaves, color: "#10b981" },
    { label: "Rejected Leaves", value: stats.rejectedLeaves, color: "#ef4444" },
  ];

  return (
    <Layout>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Dashboard Overview
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Quick system metrics and summaries.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {statItems.map((item) => (
            <Grid key={item.label} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                sx={{
                  position: "relative",
                  background: "rgba(24, 24, 27, 0.65)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                  borderRadius: 3,
                  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.4)",
                  },
                }}
              >
                {/* Border Accent */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    backgroundColor: item.color,
                    borderTopLeftRadius: "inherit",
                    borderTopRightRadius: "inherit",
                  }}
                />
                <CardContent sx={{ p: 3, pt: 4 }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600, mb: 1 }}>
                    {item.label}
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: "text.primary" }}>
                    {item.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
}

export default DashboardPage;