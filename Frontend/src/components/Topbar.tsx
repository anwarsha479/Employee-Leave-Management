import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface TopbarProps {
  toggleSidebar: () => void;
}

function Topbar({ toggleSidebar }: TopbarProps) {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "background.paper",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        color: "text.primary",
      }}
    >
      <Toolbar sx={{ px: 4, minHeight: 80 }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleSidebar}
          edge="start"
          sx={{
            mr: 2,
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 2,
            p: 1,
            transition: "all 0.2s",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.05)",
            },
          }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h5"
          component="div"
          sx={{
            flexGrow: 1,
            textAlign: "center",
            fontWeight: 700,
            letterSpacing: "0.5px",
            background: "linear-gradient(45deg, #f4f4f5 30%, #a1a1aa 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: { xs: "none", sm: "block" },
          }}
        >
          Employee Leave Management System
        </Typography>

        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            textAlign: "center",
            fontWeight: 700,
            letterSpacing: "0.5px",
            background: "linear-gradient(45deg, #f4f4f5 30%, #a1a1aa 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: { xs: "block", sm: "none" },
          }}
        >
          Leave Management
        </Typography>

        {/* Balance layout centering placeholder */}
        <Box sx={{ width: 48, display: { xs: "none", sm: "block" } }} />
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;