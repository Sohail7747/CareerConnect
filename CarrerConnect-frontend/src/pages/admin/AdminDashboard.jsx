import { Link } from "react-router-dom";
import { Briefcase, Users, UserPlus, CheckCircle, Plus } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
const data = [
  { m: "Mar", a: 80 },
  { m: "Apr", a: 120 },
  { m: "May", a: 160 },
  { m: "Jun", a: 145 },
  { m: "Jul", a: 210 },
  { m: "Aug", a: 280 },
];
export default function AdminDashboard() {
  return (
    <main className="page container section">
      <div className="admin-title">
        <div>
          <span className="eyebrow">ADMINISTRATION</span>
          <h1>Dashboard</h1>
        </div>
        <Link className="btn btn-primary" to="/admin/post-job">
          <Plus size={17} /> Post Job
        </Link>
      </div>
      <div className="stats">
        {[
          [Briefcase, "Active Jobs", "28"],
          [Users, "Applicants", "1,284"],
          [UserPlus, "New Today", "46"],
          [CheckCircle, "Shortlisted", "94"],
        ].map(([Icon, l, v]) => (
          <div className="card stat" key={l}>
            <Icon size={20} />
            <small>{l}</small>
            <strong>{v}</strong>
          </div>
        ))}
      </div>
      <div className="card chart" style={{ marginTop: 20 }}>
        <h3>Applications overview</h3>
        <ResponsiveContainer width="100%" height="80%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="m" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="a"
              stroke="#635bff"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="card" style={{ padding: 25, marginTop: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Recent job posts</h2>
          <Link
            to="/admin/jobs"
            style={{ color: "var(--primary)", fontWeight: 700 }}
          >
            Manage
          </Link>
        </div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Job</th>
                <th>Applications</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Java Backend Developer</td>
                <td>48</td>
                <td>
                  <span className="status status-success">Active</span>
                </td>
                <td>
                  <Link to="/admin/applications">Applicants</Link>
                </td>
              </tr>
              <tr>
                <td>Frontend Developer</td>
                <td>31</td>
                <td>
                  <span className="status status-success">Active</span>
                </td>
                <td>
                  <Link to="/admin/applications">Applicants</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
