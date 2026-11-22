import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import JobCard from "../components/JobCard";
import { getJobs } from "../services/jobService";

export default function Jobs() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");
  const [location, setLocation] = useState(params.get("location") || "");
  const [type, setType] = useState(params.get("type") || "");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const { data } = await getJobs({
        q: q || undefined,
        location: location || undefined,
        type: type || undefined
      });
      setJobs(data);
    } catch (e) {
      console.error(e);
      toast.error("Could not load jobs.");
    } finally { setLoading(false); }
  };

  useEffect(() => { loadJobs(); }, []);

  const search = async () => {
    setParams({ ...(q ? { q } : {}), ...(location ? { location } : {}), ...(type ? { type } : {}) });
    await loadJobs();
  };

  return <main className="page container section">
    <span className="eyebrow">OPPORTUNITIES</span>
    <h1>Find your next job</h1>
    <p className="muted">Search live jobs posted by recruiters.</p>
    <div className="card filters" style={{ margin: "25px 0" }}>
      <div className="filters-grid">
        <input className="input" value={q} onChange={e => setQ(e.target.value)} placeholder="Search title, company or skill" />
        <select className="select" value={location} onChange={e => setLocation(e.target.value)}>
          <option value="">All locations</option><option>Remote</option><option>Bhopal</option><option>Bengaluru</option><option>Delhi</option><option>Mumbai</option>
        </select>
        <select className="select" value={type} onChange={e => setType(e.target.value)}>
          <option value="">Any type</option><option>Full Time</option><option>Internship</option><option>Part Time</option>
        </select>
        <button className="btn btn-primary" onClick={search}>Search</button>
      </div>
    </div>
    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:15 }}>
      <span className="muted">{loading ? "Loading..." : `${jobs.length} jobs found`}</span>
    </div>
    {!loading && jobs.length === 0 && <div className="card" style={{padding:30, textAlign:"center"}}>No jobs found.</div>}
    <div className="grid grid-3">{jobs.map(j => <JobCard key={j.id} job={j} />)}</div>
  </main>;
}
