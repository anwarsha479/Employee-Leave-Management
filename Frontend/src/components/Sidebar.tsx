import { NavLink } from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PeopleIcon from '@mui/icons-material/People';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface SidebarProps {
  collapsed: boolean;
}

function Sidebar({
  collapsed,
}: SidebarProps) {
  return (
    <div
      className="bg-dark text-white d-flex flex-column"
      style={{
        width: collapsed ? '70px' : '220px',
        minHeight: '100vh',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Profile */}
      <div className="border-bottom p-3">
        <div className="d-flex align-items-center">
          <AccountCircleIcon
            sx={{ fontSize: 36 }}
          />

          {!collapsed && (
            <div className="ms-2">
              <div className="fw-semibold">
                Admin
              </div>

              <small
                className="text-light opacity-75"
              >
                admin@gmail.com
              </small>
            </div>
          )}
        </div>
      </div>

      {/* Menu */}
      <div className="p-2 flex-grow-1">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `nav-link d-flex align-items-center mb-2 rounded px-3 py-2 ${
              isActive
                ? 'bg-primary text-white'
                : 'text-white'
            }`
          }
        >
          <DashboardIcon />

          {!collapsed && (
            <span className="ms-2">
              Dashboard
            </span>
          )}
        </NavLink>

        <NavLink
          to="/departments"
          className={({ isActive }) =>
            `nav-link d-flex align-items-center mb-2 rounded px-3 py-2 ${
              isActive
                ? 'bg-primary text-white'
                : 'text-white'
            }`
          }
        >
          <ApartmentIcon />

          {!collapsed && (
            <span className="ms-2">
              Departments
            </span>
          )}
        </NavLink>

        <NavLink
          to="/employees"
          className={({ isActive }) =>
            `nav-link d-flex align-items-center mb-2 rounded px-3 py-2 ${
              isActive
                ? 'bg-primary text-white'
                : 'text-white'
            }`
          }
        >
          <PeopleIcon />

          {!collapsed && (
            <span className="ms-2">
              Employees
            </span>
          )}
        </NavLink>

        <NavLink
          to="/leaves"
          className={({ isActive }) =>
            `nav-link d-flex align-items-center mb-2 rounded px-3 py-2 ${
              isActive
                ? 'bg-primary text-white'
                : 'text-white'
            }`
          }
        >
          <EventNoteIcon />

          {!collapsed && (
            <span className="ms-2">
              Leaves
            </span>
          )}
        </NavLink>

      </div>

      {/* Logout */}
      <div className="border-top p-2">
        <button
          className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center"
        >
          <LogoutIcon />

          {!collapsed && (
            <span className="ms-2">
              Logout
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;