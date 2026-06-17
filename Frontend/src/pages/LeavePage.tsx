import { useEffect, useState } from "react";

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
  const [leaves, setLeaves] =
    useState<any[]>([]);

  const [employees, setEmployees] =
    useState<any[]>([]);

  const fetchLeaves =
    async () => {
      try {
        const response =
          await getLeaves();

        setLeaves(
          response.data.data,
        );
      } catch (error) {
        console.error(error);
      }
    };

  const fetchEmployees =
    async () => {
      try {
        const response =
          await getEmployees();

        setEmployees(
          response.data.data,
        );
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    fetchLeaves();
    fetchEmployees();
  }, []);

  const handleCreateLeave =
    async (
      leave: any,
    ) => {
      try {
        await createLeave(
          leave,
        );

        fetchLeaves();
      } catch (error) {
        console.error(error);
      }
    };

  const handleApprove =
    async (
      id: string,
    ) => {
      try {
        await approveLeave(
          id,
        );

        fetchLeaves();
      } catch (error) {
        console.error(error);
      }
    };

  const handleReject =
    async (
      id: string,
    ) => {
      try {
        await rejectLeave(
          id,
        );

        fetchLeaves();
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <Layout>
      <div className="container-fluid">
        <h2 className="mb-4">
          Leave Management
        </h2>

        <LeaveForm
          onSubmit={
            handleCreateLeave
          }
          employees={
            employees
          }
        />

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>
                Employee
              </th>

              <th>
                Start Date
              </th>

              <th>
                End Date
              </th>

              <th>Reason</th>

              <th>Status</th>

              <th>
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {leaves.map(
              (leave) => (
                <tr
                  key={
                    leave.id
                  }
                >
                  <td>
                    {
                      leave
                        .employee
                        ?.name
                    }
                  </td>

                  <td>
                    {
                      leave.startDate
                    }
                  </td>

                  <td>
                    {
                      leave.endDate
                    }
                  </td>

                  <td>
                    {
                      leave.reason
                    }
                  </td>

                  <td>
                    {
                      leave.status
                    }
                  </td>

                  <td>
                    {leave.status ===
                      "PENDING" && (
                      <>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() =>
                            handleApprove(
                              leave.id,
                            )
                          }
                        >
                          Approve
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleReject(
                              leave.id,
                            )
                          }
                        >
                          Reject
                        </button>
                      </>
                    )}
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

export default LeavesPage;