import { useEffect, useState } from "react";

import DepartmentForm from "../components/DepartmentForm";
import Layout from "../components/Layout";

import {
  getDepartments,
  createDepartment,
  deleteDepartment, 
  updateDepartment,
} from "../services/department.service";

function DepartmentsPage() {
  const [departments, setDepartments] = useState<any[]>([]);

  const [search, setSearch] = useState("");
const [editingDepartment, setEditingDepartment] =
  useState<any | null>(null);

  const fetchDepartments = async () => {
    try {
      const response = await getDepartments(search);

      setDepartments(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, [search]);

  const handleCreateDepartment =
  async (
    name: string,
    description: string,
  ) => {
    try {
      if (editingDepartment) {
        await updateDepartment(
          editingDepartment.id,
          {
            name,
            description,
          },
        );

        setEditingDepartment(
          null,
        );
      } else {
        await createDepartment({
          name,
          description,
        });
      }

      fetchDepartments();
    } catch (error) {
      console.error(error);
    }
  };
const handleDeleteDepartment = async (
  id: string,
) => {
  const confirmed =
    window.confirm(
      "Are you sure you want to delete this department?",
    );

  if (!confirmed) return;

  try {
    await deleteDepartment(id);

    fetchDepartments();
  } catch (error) {
    console.error(error);
  }
};


  return (
    <Layout>
      <div className="container-fluid">
        <h2 className="mb-4">Departments</h2>

       <DepartmentForm
  onSubmit={handleCreateDepartment}
  department={editingDepartment}
/>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table className="table table-bordered mt-4">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {departments.map((department) => (
              <tr key={department.id}>
                <td>{department.name}</td>

                <td>{department.description}</td>

                <td>
                  <button
  className="btn btn-warning btn-sm me-2"
  onClick={() =>
    setEditingDepartment(
      department,
    )
  }
>
  Edit
</button>

                  <button
  className="btn btn-danger btn-sm"
  onClick={() =>
    handleDeleteDepartment(
      department.id,
    )
  }
>
  Delete
</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default DepartmentsPage;
