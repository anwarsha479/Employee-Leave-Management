import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";

import Layout from "../components/Layout";
import LeaveForm from "../components/LeaveForm";

import {
  getLeaves,
  createLeave,
  approveLeave,
  rejectLeave,
} from "../services/leave.service";

import { getEmployees } from "../services/employee.service";

function LeavesPage() {
  const [leaves, setLeaves] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [formOpen, setFormOpen] = useState(false);

  const role = localStorage.getItem("role");

  const fetchLeaves = async () => {
    try {
      const response = await getLeaves();
      setLeaves(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLeaves();
    fetchEmployees();
  }, []);

  const handleCreateLeave = async (leave: any) => {
    try {
      await createLeave(leave);
      fetchLeaves();
    } catch (error) {
      console.error(error);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await approveLeave(id);
      fetchLeaves();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectLeave(id);
      fetchLeaves();
    } catch (error) {
      console.error(error);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "employee",
      headerName: "Employee",
      flex: 1.2,
      minWidth: 120,
      sortable: true,
      valueGetter: (value: any, row: any) => {
        const rowData = row ? row : (value && value.row ? value.row : value);
        return rowData?.employee?.name || "";
      },
    },
    { field: "startDate", headerName: "Start Date", flex: 1, minWidth: 100, sortable: true },
    { field: "endDate", headerName: "End Date", flex: 1, minWidth: 100, sortable: true },
    { field: "reason", headerName: "Reason", flex: 1.8, minWidth: 180, sortable: true },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 100,
      sortable: true,
      renderCell: (params: any) => {
        const status = params.value;
        let color: "success" | "error" | "warning" = "warning";
        if (status === "APPROVED") color = "success";
        if (status === "REJECTED") color = "error";

        return (
          <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
            <Chip
              label={status}
              color={color}
              size="small"
              sx={{ fontWeight: 600 }}
            />
          </Box>
        );
      },
    },
  ];

  if (role === "ADMIN") {
    columns.push({
      field: "actions",
      headerName: "Actions",
      flex: 1.2,
      minWidth: 150,
      sortable: false,
      renderCell: (params: any) => {
        const status = params.row.status;
        if (status !== "PENDING") return null;

        return (
          <Box sx={{ display: "flex", gap: 1, alignItems: "center", height: "100%" }}>
            <Button
              variant="outlined"
              color="success"
              size="small"
              onClick={() => handleApprove(params.row.id)}
              sx={{ py: 0.5 }}
            >
              Approve
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => handleReject(params.row.id)}
              sx={{ py: 0.5 }}
            >
              Reject
            </Button>
          </Box>
        );
      },
    });
  }

  return (
    <Layout>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              Leave Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Apply and manage leave requests.
            </Typography>
          </Box>
          {role === "EMPLOYEE" && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setFormOpen(true)}
            >
              Apply Leave
            </Button>
          )}
        </Box>

        {role === "EMPLOYEE" && (
          <LeaveForm
            open={formOpen}
            onClose={() => setFormOpen(false)}
            onSubmit={handleCreateLeave}
            employees={employees}
          />
        )}

        <Card sx={{ maxWidth: "100%", overflow: "hidden" }}>
          <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
            <Box sx={{ width: "100%" }}>
              <DataGrid
                rows={leaves}
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

export default LeavesPage;
