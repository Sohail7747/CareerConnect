import {Code2, Palette, BarChart3, Megaphone, ArrowRight, SearchCheck} from "lucide-react";
import {useNavigate} from "react-router-dom";
import SearchBar from "../components/SearchBar";
import JobCard from "../components/JobCard";
import {mockJobs} from "../data/mockJobs";

export default function Home() {
    const navigate = useNavigate();
    return <main>
        <section className="hero">
            <div className="container hero-inner">
                <div><span className="eyebrow">YOUR NEXT CAREER MOVE</span><h1>Find a job you’ll <span>love.</span></h1>
                    <p>Discover opportunities from growing startups and established companies. Search, apply, and track
                        everything in one place.</p><SearchBar onSearch={({
                                                                              q,
                                                                              location
                                                                          }) => navigate(`/jobs?q=${encodeURIComponent(q)}&location=${encodeURIComponent(location)}`)}/><small
                        className="muted">Popular: Java Developer · Software Engineer · React Developer</small></div>
                <div className="hero-art">
                    <div style={{display: "flex", justifyContent: "space-between"}}><b>Featured opportunity</b><span
                        className="status status-success">New</span></div>
                    <div className="mini-job">
                        <div className="company-icon">A</div>
                        <h3 style={{margin: "15px 0 5px"}}>Java Backend Developer</h3>
                        <div style={{color: "#bbb"}}>Apex Technologies</div>
                        <div className="job-tags" style={{marginTop: 15}}><span className="tag">Java</span><span
                            className="tag">Spring Boot</span><span className="tag">MySQL</span></div>
                        <button className="btn btn-primary" style={{width: "100%", marginTop: 20}}
                                onClick={() => navigate("/jobs/1")}>View Job
                        </button>
                    </div>
                </div>
            </div>
        </section>
        <section className="section">
            <div className="container"><span className="eyebrow">EXPLORE</span><h2>Popular job categories</h2>
                <div className="grid grid-4"
                     style={{marginTop: 20}}>{[[Code2, "Engineering", 1240], [Palette, "Design", 530], [Megaphone, "Marketing", 410], [BarChart3, "Data & Analytics", 620]].map(([Icon, n, c]) =>
                    <div className="card category" key={n}><Icon/><h3 style={{fontSize: 18}}>{n}</h3><small
                        className="muted">{c.toLocaleString()} jobs</small></div>)}</div>
            </div>
        </section>
        <section className="section" style={{paddingTop: 0}}>
            <div className="container">
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "end"}}>
                    <div><span className="eyebrow">LATEST OPENINGS</span><h2>Featured jobs</h2></div>
                    <button className="btn btn-light" onClick={() => navigate("/jobs")}>View all <ArrowRight size={16}/>
                    </button>
                </div>
                <div className="grid grid-3" style={{marginTop: 20}}>{mockJobs.slice(0, 3).map(j => <JobCard key={j.id}
                                                                                                             job={j}/>)}</div>
            </div>
        </section>
    </main>
}