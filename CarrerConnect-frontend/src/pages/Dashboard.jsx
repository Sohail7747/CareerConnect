import {Link} from "react-router-dom";
import {Send, Bookmark, CheckCircle, ArrowRight} from "lucide-react";

export default function Dashboard() {
    return <main className="page container section">
        <div className="admin-title">
            <div><span className="eyebrow">MY SPACE</span><h1>Candidate Dashboard</h1></div>
            <Link className="btn btn-primary" to="/jobs">Find Jobs</Link></div>
        <div
            className="stats">{[[Send, "Applications", "12"], [Bookmark, "Saved Jobs", "7"], [CheckCircle, "Interviews", "3"], [ArrowRight, "Profile Views", "48"]].map(([Icon, label, val]) =>
            <div className="card stat" key={label}><Icon size={20}/><small>{label}</small><strong>{val}</strong>
            </div>)}</div>
        <div className="card" style={{padding: 25, marginTop: 20}}>
            <div style={{display: "flex", justifyContent: "space-between"}}><h2>Recent applications</h2><Link
                to="/applications" style={{color: "var(--primary)", fontWeight: 700}}>View all</Link></div>
            <div className="table-wrap">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Job</th>
                        <th>Company</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Java Backend Developer</td>
                        <td>Apex Technologies</td>
                        <td>20 Aug 2026</td>
                        <td><span className="status status-review">Under Review</span></td>
                    </tr>
                    <tr>
                        <td>Software Engineer</td>
                        <td>Nova Labs</td>
                        <td>18 Aug 2026</td>
                        <td><span className="status status-success">Shortlisted</span></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </main>
}