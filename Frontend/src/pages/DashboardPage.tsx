import { useEffect, useState } from 'react';

import {
  getDashboardStats,
} from '../services/dashboard.service';

import Layout from '../components/Layout';
import '../styles/dashboard.css';

interface DashboardStats {
  totalEmployees: number;
  totalDepartments: number;
  totalLeaves: number;
  pendingLeaves: number;
  approvedLeaves: number;
  rejectedLeaves: number;
}

function DashboardPage() {
  const [stats, setStats] =
    useState<DashboardStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response =
          await getDashboardStats();

        setStats(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return (
      <Layout>
        <h3>Loading...</h3>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-fluid">
        <h2 className="mb-4 fw-bold">
          Dashboard Overview
        </h2>

        <div className="row">

          <div className="col-md-4 mb-4">
            <div
              className="card shadow-sm"
              style={{
                borderTop:
                  '4px solid #0d6efd',
              }}
            >
              <div className="card-body">
                <h6 className="text-muted">
                  Total Employees
                </h6>

                <h2
                  className="fw-bold"
                  style={{
                    fontSize: '2.5rem',
                  }}
                >
                  {stats.totalEmployees}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div
              className="card shadow-sm"
              style={{
                borderTop:
                  '4px solid #6f42c1',
              }}
            >
              <div className="card-body">
                <h6 className="text-muted">
                  Total Departments
                </h6>

                <h2
                  className="fw-bold"
                  style={{
                    fontSize: '2.5rem',
                  }}
                >
                  {stats.totalDepartments}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div
              className="card shadow-sm"
              style={{
                borderTop:
                  '4px solid #fd7e14',
              }}
            >
              <div className="card-body">
                <h6 className="text-muted">
                  Total Leaves
                </h6>

                <h2
                  className="fw-bold"
                  style={{
                    fontSize: '2.5rem',
                  }}
                >
                  {stats.totalLeaves}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div
              className="card shadow-sm"
              style={{
                borderTop:
                  '4px solid #ffc107',
              }}
            >
              <div className="card-body">
                <h6 className="text-muted">
                  Pending Leaves
                </h6>

                <h2
                  className="fw-bold"
                  style={{
                    fontSize: '2.5rem',
                  }}
                >
                  {stats.pendingLeaves}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div
              className="card shadow-sm"
              style={{
                borderTop:
                  '4px solid #198754',
              }}
            >
              <div className="card-body">
                <h6 className="text-muted">
                  Approved Leaves
                </h6>

                <h2
                  className="fw-bold"
                  style={{
                    fontSize: '2.5rem',
                  }}
                >
                  {stats.approvedLeaves}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div
              className="card shadow-sm"
              style={{
                borderTop:
                  '4px solid #dc3545',
              }}
            >
              <div className="card-body">
                <h6 className="text-muted">
                  Rejected Leaves
                </h6>

                <h2
                  className="fw-bold"
                  style={{
                    fontSize: '2.5rem',
                  }}
                >
                  {stats.rejectedLeaves}
                </h2>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default DashboardPage;