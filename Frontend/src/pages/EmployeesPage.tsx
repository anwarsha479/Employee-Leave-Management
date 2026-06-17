import { useEffect, useState } from "react";

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
  const [employees, setEmployees] =
    useState<any[]>([]);

  const [departments, setDepartments] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  const [editingEmployee, setEditingEmployee] =
    useState<any | null>(null);

  const fetchEmployees =
    async () => {
      try {
        const response =
          await getEmployees(
            search,
          );

        setEmployees(
          response.data.data,
        );
      } catch (error) {
        console.error(error);
      }
    };

  const fetchDepartments =
    async () => {
      try {
        const response =
          await getDepartments("");

        setDepartments(
          response.data.data,
        );
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

  const handleCreateEmployee =
    async (employee: any) => {
      try {
        if (
          editingEmployee
        ) {
          await updateEmployee(
            editingEmployee.id,
            employee,
          );

          setEditingEmployee(
            null,
          );
        } else {
          await createEmployee(
            employee,
          );
        }

        fetchEmployees();
      } catch (error) {
        console.error(error);
      }
    };

  const handleDeleteEmployee =
    async (
      id: string,
    ) => {
      const confirmed =
        window.confirm(
          "Are you sure you want to delete this employee?",
        );

      if (!confirmed)
        return;

      try {
        await deleteEmployee(
          id,
        );

        fetchEmployees();
      } catch (error) {
        console.error(error);
      }
    };

  const handleEditEmployee =
    (
      employee: any,
    ) => {
      setEditingEmployee({
        ...employee,

        departmentId:
          employee.department
            ?.id,
      });
    };

  return (
    <Layout>
      <div className="container-fluid">
        <h2 className="mb-4">
          Employees
        </h2>

        <EmployeeForm
          onSubmit={
            handleCreateEmployee
          }
          employee={
            editingEmployee
          }
          departments={
            departments
          }
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search employee..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value,
            )
          }
        />

        <table className="table table-bordered mt-4">
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Joining Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map(
              (
                employee,
              ) => (
                <tr
                  key={
                    employee.id
                  }
                >
                  <td>
                    {
                      employee.employeeCode
                    }
                  </td>

                  <td>
                    {
                      employee.name
                    }
                  </td>

                  <td>
                    {
                      employee.email
                    }
                  </td>

                  <td>
                    {
                      employee.phone
                    }
                  </td>

                  <td>
                    {
                      employee.designation
                    }
                  </td>

                  <td>
                    {
                      employee
                        .department
                        ?.name
                    }
                  </td>

                  <td>
                    {
                      employee.joiningDate
                    }
                  </td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() =>
                        handleEditEmployee(
                          employee,
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleDeleteEmployee(
                          employee.id,
                        )
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default EmployeesPage;