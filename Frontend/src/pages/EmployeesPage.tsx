import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";

import Layout from "../components/Layout";
import EmployeeForm from "../components/EmployeeForm";

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employee.service";

import { getDepartments } from "../services/department.service";

function EmployeesPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [editingEmployee, setEditingEmployee] = useState<any | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees(search);
      setEmployees(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await getDepartments("");
      setDepartments(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [search]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleCreateEmployee = async (employee: any) => {
    try {
      if (editingEmployee) {
        await updateEmployee(editingEmployee.id, employee);
        setEditingEmployee(null);
      } else {
        await createEmployee(employee);
      }
      fetchEmployees();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteEmployee = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this employee?");
    if (!confirmed) return;

    try {
      await deleteEmployee(id);
      fetchEmployees();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditEmployee = (employee: any) => {
    setEditingEmployee({
      ...employee,
      departmentId: employee.department?.id,
    });
    setFormOpen(true);
  };

  const columns: GridColDef[] = [
    { field: "employeeCode", headerName: "Code", flex: 0.8, minWidth: 80, sortable: true },
    { field: "name", headerName: "Name", flex: 1.2, minWidth: 120, sortable: true },
    { field: "email", headerName: "Email", flex: 1.5, minWidth: 150, sortable: true },
    { field: "phone", headerName: "Phone", flex: 1, minWidth: 100, sortable: false },
    { field: "designation", headerName: "Designation", flex: 1.2, minWidth: 120, sortable: true },
    {
      field: "department",
      headerName: "Department",
      flex: 1.2,
      minWidth: 120,
      sortable: true,
      valueGetter: (value: any, row: any) => {
        const rowData = row ? row : (value && value.row ? value.row : value);
        return rowData?.department?.name || "";
      },
    },
    { field: "joiningDate", headerName: "Joining Date", flex: 1, minWidth: 100, sortable: true },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1.2,
      minWidth: 150,
      sortable: false,
      renderCell: (params: any) => (
        <Box sx={{ display: "flex", gap: 1, alignItems: "center", height: "100%" }}>
          <Button
            variant="outlined"
            color="warning"
            size="small"
            onClick={() => handleEditEmployee(params.row)}
            sx={{ py: 0.5 }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDeleteEmployee(params.row.id)}
            sx={{ py: 0.5 }}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Layout>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              Employees
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage and view employee directory logs.
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => {
              setEditingEmployee(null);
              setFormOpen(true);
            }}
          >
            Add Employee
          </Button>
        </Box>

        <EmployeeForm
          open={formOpen}
          onClose={() => {
            setFormOpen(false);
            setEditingEmployee(null);
          }}
          onSubmit={handleCreateEmployee}
          employee={editingEmployee}
          departments={departments}
        />

        <Card sx={{ maxWidth: "100%", overflow: "hidden" }}>
          <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
            <Box sx={{ p: 3, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
              <TextField
                placeholder="Search employees..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                size="small"
                sx={{ maxWidth: 320 }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            <Box sx={{ width: "100%" }}>
              <DataGrid
                rows={employees}
                columns={columns}
                autoHeight
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 10 },
                  },
                }}
                pageSizeOptions={[5, 10, 20]}
                disableRowSelectionOnClick
                sx={{
                  border: "none",
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                  },
                  "& .MuiDataGrid-cell": {
                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
}

export default EmployeesPage;