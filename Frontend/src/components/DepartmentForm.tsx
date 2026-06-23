import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface DepartmentFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string, description: string) => void;
  department?: any;
}

function DepartmentForm({
  open,
  onClose,
  onSubmit,
  department,
}: DepartmentFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (department) {
      setName(department.name || "");
      setDescription(department.description || "");
    } else {
      setName("");
      setDescription("");
    }
  }, [department, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(name, description);

    setName("");
    setDescription("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ m: 0, p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" component="span" sx={{ fontWeight: 750 }}>
          {department ? "Edit Department Details" : "Create New Department"}
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
              label="Department Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
            />

            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              fullWidth
              multiline
              rows={4}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={onClose} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {department ? "Update Department" : "Save Department"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default DepartmentForm;