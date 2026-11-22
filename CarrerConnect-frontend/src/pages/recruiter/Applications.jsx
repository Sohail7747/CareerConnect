import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getJobApplications, updateApplicationStatus } from "../../services/applicationService";
import { useAuth } from "../../context/AuthContext";

const label=s=>s==="PENDING"?"Under Review":s==="SHORTLISTED"?"Shortlisted":"Rejected";
const cls=s=>s==="SHORTLISTED"?"status-success":s==="REJECTED"?"status-reject":"status-review";

export default function Applications() {
  const {user}=useAuth(); const [rows,setRows]=useState([]); const [loading,setLoading]=useState(true);
  const load=()=>{ if(!user?.id)return; setLoading(true); getJobApplications(user.id).then(r=>setRows(r.data)).catch(()=>toast.error("Could not load applicants.")).finally(()=>setLoading(false)); };
  useEffect(load,[user]);
  const update=async(id,status)=>{try{const {data}=await updateApplicationStatus(id,user.id,status);setRows(r=>r.map(x=>x.id===id?data:x));toast.success("Application updated.");}catch(e){toast.error(e.response?.data?.message||"Update failed.");}};
  return <main className="page container section"><span className="eyebrow">APPLICATIONS</span><h1>Job Applicants</h1>
    <div className="card" style={{padding:25,marginTop:25}}><div className="table-wrap"><table className="table">
      <thead><tr><th>Candidate</th><th>Email</th><th>Job</th><th>Applied</th><th>Status</th><th>Action</th></tr></thead>
      <tbody>{loading?<tr><td colSpan="6" style={{textAlign:"center",padding:30}}>Loading...</td></tr>:rows.length===0?<tr><td colSpan="6" style={{textAlign:"center",padding:30}} className="muted">No applications yet.</td></tr>:
      rows.map(r=><tr key={r.id}><td>{r.seekerName}</td><td>{r.seekerEmail}</td><td>{r.jobTitle}</td><td>{new Date(r.appliedAt).toLocaleDateString()}</td><td><span className={`status ${cls(r.status)}`}>{label(r.status)}</span></td><td>
        <button className="btn btn-sm btn-light" onClick={()=>update(r.id,"SHORTLISTED")}>Shortlist</button>{" "}
        <button className="btn btn-sm btn-danger" onClick={()=>update(r.id,"REJECTED")}>Reject</button>
      </td></tr>)}</tbody>
    </table></div></div>
  </main>;
}
