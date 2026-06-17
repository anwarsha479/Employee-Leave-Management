import { useEffect, useState } from "react";

interface EmployeeFormProps {
  onSubmit: (employee: any) => void;
  employee?: any;
  departments: any[];
}

function EmployeeForm({
  onSubmit,
  employee,
  departments,
}: EmployeeFormProps) {
  const [employeeCode, setEmployeeCode] =
    useState("");

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [designation, setDesignation] =
    useState("");

  const [departmentId, setDepartmentId] =
    useState("");

  const [joiningDate, setJoiningDate] =
    useState("");

  useEffect(() => {
    if (employee) {
      setEmployeeCode(
        employee.employeeCode,
      );

      setName(employee.name);

      setEmail(employee.email);

      setPhone(employee.phone);

      setDesignation(
        employee.designation,
      );

      setDepartmentId(
        employee.departmentId,
      );

      setJoiningDate(
        employee.joiningDate,
      );
    }
  }, [employee]);

  const handleSubmit = (
    e: React.FormEvent,
  ) => {
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
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card p-4 mb-4"
    >
      <h4>
        {employee
          ? "Edit Employee"
          : "Create Employee"}
      </h4>

      <div className="mb-3">
        <label className="form-label">
          Employee Code
        </label>

        <input
          type="text"
          className="form-control"
          value={employeeCode}
          onChange={(e) =>
            setEmployeeCode(
              e.target.value,
            )
          }
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          Name
        </label>

        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          Email
        </label>

        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          Phone
        </label>

        <input
          type="text"
          className="form-control"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          Designation
        </label>

        <input
          type="text"
          className="form-control"
          value={designation}
          onChange={(e) =>
            setDesignation(
              e.target.value,
            )
          }
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          Department
        </label>

        <select
          className="form-control"
          value={departmentId}
          onChange={(e) =>
            setDepartmentId(
              e.target.value,
            )
          }
          required
        >
          <option value="">
            Select Department
          </option>

          {departments.map(
            (department) => (
              <option
                key={department.id}
                value={
                  department.id
                }
              >
                {department.name}
              </option>
            ),
          )}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">
          Joining Date
        </label>

        <input
          type="date"
          className="form-control"
          value={joiningDate}
          onChange={(e) =>
            setJoiningDate(
              e.target.value,
            )
          }
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
      >
        {employee
          ? "Update Employee"
          : "Save Employee"}
      </button>
    </form>
  );
}

export default EmployeeForm;