import MenuIcon from "@mui/icons-material/Menu";

interface TopbarProps {
  toggleSidebar: () => void;
}

function Topbar({ toggleSidebar }: TopbarProps) {
  return (
    <div
      className="border-bottom px-4 py-3 d-flex align-items-center"
      style={{
        backgroundColor: "#1a1f2b",
        color: "white",
      }}
    >
      <button
        className="btn btn-outline-light"
        onClick={toggleSidebar}
        style={{
          transition: "0.3s",
        }}
      >
        <MenuIcon />
      </button>

      <div
        className="flex-grow-1 text-center fw-semibold"
        style={{
          fontSize: "1.8rem",
          color: "white",
        }}
      >
        Employee Leave Management System
      </div>

      <div style={{ width: "48px" }} />
    </div>
  );
}

export default Topbar;