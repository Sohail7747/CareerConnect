import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getMyApplications } from "../services/applicationService";
import { useAuth } from "../context/AuthContext";

const label = s => s === "PENDING" ? "Under Review" : s === "SHORTLISTED" ? "Shortlisted" : "Rejected";
const cls = s => s === "SHORTLISTED" ? "status-success" : s === "REJECTED" ? "status-reject" : "status-review";

export default function Applications() {
  const { user } = useAuth();
  const [rows,setRows]=useState([]);
  useEffect(()=>{ if(user?.id) getMyApplications(user.id).then(r=>setRows(r.data)).catch(()=>toast.error("Could not load applications.")); },[user]);
  return <main className="page container section"><span className="eyebrow">MY APPLICATIONS</span><h1>Application tracker</h1>
    <div className="card" style={{padding:25,marginTop:25}}><div className="table-wrap"><table className="table">
      <thead><tr><th>Position</th><th>Company</th><th>Applied</th><th>Status</th><th></th></tr></thead>
      <tbody>{rows.length===0?<tr><td colSpan="5" style={{textAlign:"center",padding:30}} className="muted">No applications yet. <Link to="/jobs">Find a job</Link></td></tr>:
      rows.map(r=><tr key={r.id}><td>{r.jobTitle}</td><td>{r.company}</td><td>{new Date(r.appliedAt).toLocaleDateString()}</td><td><span className={`status ${cls(r.status)}`}>{label(r.status)}</span></td><td><Link to={`/jobs/${r.jobId}`}>View</Link></td></tr>)}</tbody>
    </table></div></div>
  </main>;
}
