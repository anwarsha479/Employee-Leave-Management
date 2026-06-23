import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface EmployeeFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (employee: any) => void;
  employee?: any;
  departments: any[];
}

function EmployeeForm({
  open,
  onClose,
  onSubmit,
  employee,
  departments,
}: EmployeeFormProps) {
  const [employeeCode, setEmployeeCode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [designation, setDesignation] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [joiningDate, setJoiningDate] = useState("");

  useEffect(() => {
    if (employee) {
      setEmployeeCode(employee.employeeCode || "");
      setName(employee.name || "");
      setEmail(employee.email || "");
      setPhone(employee.phone || "");
      setDesignation(employee.designation || "");
      setDepartmentId(employee.departmentId || "");
      setJoiningDate(employee.joiningDate || "");
    } else {
      setEmployeeCode("");
      setName("");
      setEmail("");
      setPhone("");
      setDesignation("");
      setDepartmentId("");
      setJoiningDate("");
    }
  }, [employee, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      employeeCode,
      name,
      email,
      phone,
      designation,
      departmentId,
      joiningDate,
    });

    setEmployeeCode("");
    setName("");
    setEmail("");
    setPhone("");
    setDesignation("");
    setDepartmentId("");
    setJoiningDate("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ m: 0, p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" component="span" sx={{ fontWeight: 750 }}>
          {employee ? "Edit Employee Details" : "Create New Employee"}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers sx={{ p: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Employee Code"
              value={employeeCode}
              onChange={(e) => setEmployeeCode(e.target.value)}
              required
              fullWidth
              disabled={!!employee}
            />

            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
            />

            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />

            <TextField
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              fullWidth
            />

            <TextField
              label="Designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
              fullWidth
            />

            <TextField
              select
              label="Department"
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
              required
              fullWidth
            >
              <MenuItem value="">
                <em>Select Department</em>
              </MenuItem>
              {departments.map((department) => (
                <MenuItem key={department.id} value={department.id}>
                  {department.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Joining Date"
              type="date"
              value={joiningDate}
              onChange={(e) => setJoiningDate(e.target.value)}
              required
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={onClose} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {employee ? "Update Employee" : "Save Employee"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default EmployeeForm;