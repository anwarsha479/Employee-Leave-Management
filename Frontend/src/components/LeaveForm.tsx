import { useState } from "react";

interface LeaveFormProps {
  onSubmit: (leave: any) => void;
  employees: any[];
}

function LeaveForm({
  onSubmit,
  employees,
}: LeaveFormProps) {
  const [employeeId, setEmployeeId] =
    useState("");

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const [reason, setReason] =
    useState("");

  const handleSubmit = (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    onSubmit({
      employeeId,
      startDate,
      endDate,
      reason,
    });

    setEmployeeId("");
    setStartDate("");
    setEndDate("");
    setReason("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card p-4 mb-4"
    >
      <h4>Apply Leave</h4>

      <div className="mb-3">
        <label className="form-label">
          Employee
        </label>

        <select
          className="form-control"
          value={employeeId}
          onChange={(e) =>
            setEmployeeId(
              e.target.value,
            )
          }
          required
        >
          <option value="">
            Select Employee
          </option>

          {employees.map(
            (employee) => (
              <option
                key={employee.id}
                value={
                  employee.id
                }
              >
                {
                  employee.name
                }{" "}
                (
                {
                  employee.employeeCode
                }
                )
              </option>
            ),
          )}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">
          Start Date
        </label>

        <input
          type="date"
          className="form-control"
          value={startDate}
          onChange={(e) =>
            setStartDate(
              e.target.value,
            )
          }
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          End Date
        </label>

        <input
          type="date"
          className="form-control"
          value={endDate}
          onChange={(e) =>
            setEndDate(
              e.target.value,
            )
          }
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          Reason
        </label>

        <textarea
          className="form-control"
          value={reason}
          onChange={(e) =>
            setReason(
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
        Submit Leave Request
      </button>
    </form>
  );
}

export default LeaveForm;