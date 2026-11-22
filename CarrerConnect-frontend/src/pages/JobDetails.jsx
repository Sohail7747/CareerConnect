import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { MapPin, Clock3, IndianRupee, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import { getJob } from "../services/jobService";
import { applyForJob } from "../services/applicationService";
import { useAuth } from "../context/AuthContext";

export default function JobDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    getJob(id).then(r => setJob(r.data)).catch(() => toast.error("Job not found.")).finally(() => setLoading(false));
  }, [id]);

  const apply = async () => {
    if (!user) { toast.info("Please login before applying."); navigate("/login"); return; }
    if (user.role !== "JOB_SEEKER") { toast.info("Only job seekers can apply."); return; }
    try {
      setApplying(true);
      await applyForJob(id, user.id);
      toast.success("Application submitted!");
    } catch (e) {
      toast.error(e.response?.data?.message || "Could not apply.");
    } finally { setApplying(false); }
  };

  if (loading) return <main className="page container section"><p>Loading job...</p></main>;
  if (!job) return <main className="page container section"><p>Job not found.</p></main>;

  const skills = job.skills ? job.skills.split(",").map(s=>s.trim()).filter(Boolean) : [];
  return <main className="page container section">
    <Link className="back" to="/jobs"><ArrowLeft size={16}/> Back to jobs</Link>
    <div className="card detail-header">
      <div style={{display:"flex",justifyContent:"space-between",gap:25,alignItems:"center",flexWrap:"wrap"}}>
        <div>
          <div className="company-icon">{job.company?.[0] || "J"}</div>
          <h1 style={{margin:"18px 0 5px"}}>{job.title}</h1>
          <div className="muted" style={{fontSize:18}}>{job.company}</div>
          <div className="job-meta">
            <span><MapPin size={15}/> {job.location || "Not specified"}</span>
            <span><Clock3 size={15}/> {job.jobType}</span>
            <span><IndianRupee size={15}/> {job.salary || "Not specified"}</span>
          </div>
        </div>
        <button className="btn btn-primary" disabled={applying} onClick={apply}>{applying ? "Applying..." : "Apply Now"}</button>
      </div>
    </div>
    <div className="detail-layout">
      <section className="card detail-content">
        <h2>About the role</h2><p className="prose">{job.description}</p>
        <h2 style={{marginTop:35}}>Required skills</h2>
        <div className="job-tags">{skills.map(s=><span className="tag" key={s}>{s}</span>)}</div>
      </section>
      <aside className="card summary"><h3>Job summary</h3><hr/>
        <p><b>Company</b><br/><span className="muted">{job.company}</span></p>
        <p><b>Location</b><br/><span className="muted">{job.location || "Not specified"}</span></p>
        <p><b>Experience</b><br/><span className="muted">{job.experience || "Not specified"}</span></p>
        <p><b>Salary</b><br/><span className="muted">{job.salary || "Not specified"}</span></p>
        {job.recruiter && <p><b>Recruiter</b><br/><span className="muted">{job.recruiter.fullName}</span></p>}
      </aside>
    </div>
  </main>;
}
