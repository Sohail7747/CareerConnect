import { Link } from "react-router-dom";
import { MapPin, BriefcaseBusiness, IndianRupee } from "lucide-react";

export default function JobCard({ job }) {

    const skills = Array.isArray(job.skills)
        ? job.skills
        : typeof job.skills === "string"
            ? job.skills.split(",").map(skill => skill.trim()).filter(Boolean)
            : [];

    return (
        <article className="card job-card">
            <Link to={`/jobs/${job.id}`}>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "start"
                    }}
                >
                    <div className="company-icon">
                        {job.company?.[0] || "J"}
                    </div>

                    <span className="status status-success">
                        {job.type || job.jobType}
                    </span>
                </div>

                <h3>{job.title}</h3>

                <div className="muted">
                    {job.company}
                </div>

                <div className="job-meta">

                    <span>
                        <MapPin
                            size={14}
                            style={{ verticalAlign: "middle" }}
                        />
                        {" "}
                        {job.location}
                    </span>

                    <span>
                        <IndianRupee
                            size={14}
                            style={{ verticalAlign: "middle" }}
                        />
                        {" "}
                        {job.salary}
                    </span>

                </div>

                <div className="job-tags">
                    {skills.map((skill, index) => (
                        <span
                            className="tag"
                            key={`${skill}-${index}`}
                        >
                            {skill}
                        </span>
                    ))}
                </div>

            </Link>
        </article>
    );
}