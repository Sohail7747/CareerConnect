import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    Briefcase,
    Users,
    UserPlus,
    CheckCircle,
    Plus
} from "lucide-react";

import { toast } from "react-toastify";

import api from "../../services/api";
import { getJobApplications } from "../../services/applicationService";
import { useAuth } from "../../context/AuthContext";


export default function RecruiterDashboard() {

    const { user } = useAuth();

    const [jobs, setJobs] = useState([]);

    const [loading, setLoading] = useState(true);
    const [applications, setApplications] = useState([]);


    useEffect(() => {

        const fetchJobs = async () => {

            try {

                if (!user?.id) {
                    return;
                }


                const response = await api.get(
                    `/jobs/recruiter/${user.id}`
                );


                console.log(
                    "Dashboard Jobs:",
                    response.data
                );


                setJobs(response.data);
                const applicationsResponse = await getJobApplications(user.id);
                setApplications(applicationsResponse.data);


            } catch (error) {

                console.error(
                    "Error fetching recruiter jobs:",
                    error
                );


                if (error.response?.status === 401) {

                    toast.error(
                        "Session expired. Please login again."
                    );

                } else if (error.response?.status === 403) {

                    toast.error(
                        "You are not authorized."
                    );

                } else {

                    toast.error(
                        "Failed to load dashboard."
                    );

                }


            } finally {

                setLoading(false);

            }

        };


        fetchJobs();

    }, [user]);


    return (

        <main className="page container section">


            {/* HEADER */}

            <div className="admin-title">

                <div>

                    <span className="eyebrow">
                        RECRUITER
                    </span>

                    <h1>
                        Dashboard
                    </h1>

                </div>


                <Link
                    className="btn btn-primary"
                    to="/recruiter/post-job"
                >

                    <Plus size={17} />

                    Post Job

                </Link>

            </div>


            {/* STATISTICS */}

            <div className="stats">


                {/* ACTIVE JOBS */}

                <div className="card stat">

                    <Briefcase size={20} />

                    <small>
                        My Active Jobs
                    </small>

                    <strong>
                        {loading ? "..." : jobs.length}
                    </strong>

                </div>


                {/* APPLICANTS */}

                <div className="card stat">

                    <Users size={20} />

                    <small>
                        Applicants
                    </small>

                    <strong>
                        {loading ? "..." : applications.length}
                    </strong>

                </div>


                {/* NEW TODAY */}

                <div className="card stat">

                    <UserPlus size={20} />

                    <small>
                        New Today
                    </small>

                    <strong>
                        {loading ? "..." : applications.filter(a => new Date(a.appliedAt).toDateString() === new Date().toDateString()).length}
                    </strong>

                </div>


                {/* SHORTLISTED */}

                <div className="card stat">

                    <CheckCircle size={20} />

                    <small>
                        Shortlisted
                    </small>

                    <strong>
                        {loading ? "..." : applications.filter(a => a.status === "SHORTLISTED").length}
                    </strong>

                </div>

            </div>


            {/* JOB POSTS */}

            <div
                className="card"
                style={{
                    padding: 25,
                    marginTop: 20
                }}
            >


                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >

                    <h2>
                        My Job Posts
                    </h2>


                    <Link
                        to="/recruiter/jobs"
                        style={{
                            color: "var(--primary)",
                            fontWeight: 700
                        }}
                    >

                        Manage

                    </Link>

                </div>


                {/* LOADING */}

                {loading && (

                    <p
                        className="muted"
                        style={{
                            marginTop: 15
                        }}
                    >

                        Loading your jobs...

                    </p>

                )}


                {/* NO JOBS */}

                {!loading && jobs.length === 0 && (

                    <div>

                        <p
                            className="muted"
                            style={{
                                marginTop: 15
                            }}
                        >

                            You haven't posted any jobs yet.

                        </p>


                        <Link
                            className="btn btn-primary"
                            to="/recruiter/post-job"
                            style={{
                                marginTop: 15
                            }}
                        >

                            <Plus size={17} />

                            Post Your First Job

                        </Link>

                    </div>

                )}


                {/* JOB LIST */}

                {!loading && jobs.length > 0 && (

                    <div
                        style={{
                            marginTop: 20
                        }}
                    >

                        {jobs.map((job) => (

                            <div
                                key={job.id}
                                className="card"
                                style={{
                                    padding: 18,
                                    marginBottom: 12,
                                    border: "1px solid #e5e7eb"
                                }}
                            >

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}
                                >

                                    <div>

                                        <h3>
                                            {job.title}
                                        </h3>

                                        <p className="muted">

                                            {job.company}
                                            {" • "}
                                            {job.location || "Location not specified"}

                                        </p>

                                    </div>


                                    <span>
                                        {job.jobType}
                                    </span>

                                </div>


                                <div
                                    style={{
                                        marginTop: 8
                                    }}
                                >

                                    <small className="muted">

                                        Salary:{" "}

                                        {job.salary || "Not specified"}

                                    </small>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>


        </main>
    );
}

