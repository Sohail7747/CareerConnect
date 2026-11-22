import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function ManageJobs() {

    const { user } = useAuth();

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);


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
                    "Recruiter Jobs:",
                    response.data
                );

                setJobs(response.data);

            } catch (error) {

                console.error(
                    "Error fetching jobs:",
                    error
                );

                if (error.response?.status === 401) {

                    toast.error(
                        "Session expired. Please login again."
                    );

                } else if (error.response?.status === 403) {

                    toast.error(
                        "You are not authorized to view these jobs."
                    );

                } else {

                    toast.error(
                        "Failed to load jobs."
                    );

                }

            } finally {

                setLoading(false);

            }

        };


        fetchJobs();

    }, [user]);


    const deleteJob = async (id) => {
        if (!window.confirm("Delete this job?")) return;
        try {
            await api.delete(`/jobs/${id}`, { params: { recruiterId: user.id } });
            setJobs(current => current.filter(job => job.id !== id));
            toast.success("Job deleted.");
        } catch (error) {
            toast.error(error.response?.data?.message || "Could not delete job.");
        }
    };

    return (

        <main className="page container section">


            {/* HEADER */}

            <div className="admin-title">

                <div>

                    <span className="eyebrow">
                        RECRUITMENT
                    </span>

                    <h1>
                        My Jobs
                    </h1>

                </div>


                <Link
                    className="btn btn-primary"
                    to="/recruiter/post-job"
                >

                    <Plus size={17}/>

                    Post Job

                </Link>

            </div>


            {/* JOB TABLE */}

            <div
                className="card"
                style={{ padding: 25 }}
            >

                <div className="table-wrap">

                    <table className="table">

                        <thead>

                        <tr>

                            <th>
                                Position
                            </th>

                            <th>
                                Company
                            </th>

                            <th>
                                Location
                            </th>

                            <th>
                                Type
                            </th>

                            <th>
                                Salary
                            </th>
                            <th>Action</th>

                        </tr>

                        </thead>


                        <tbody>


                        {/* LOADING */}

                        {loading && (

                            <tr>

                                <td
                                    colSpan="6"
                                    style={{
                                        textAlign: "center",
                                        padding: 30
                                    }}
                                >

                                    <p className="muted">
                                        Loading jobs...
                                    </p>

                                </td>

                            </tr>

                        )}


                        {/* NO JOBS */}

                        {!loading && jobs.length === 0 && (

                            <tr>

                                <td
                                    colSpan="6"
                                >

                                    <div
                                        style={{
                                            textAlign: "center",
                                            padding: 30
                                        }}
                                    >

                                        <p className="muted">
                                            You haven't posted any jobs yet.
                                        </p>


                                        <Link
                                            className="btn btn-primary"
                                            to="/recruiter/post-job"
                                            style={{
                                                marginTop: 15
                                            }}
                                        >

                                            <Plus size={17}/>

                                            Post a Job

                                        </Link>

                                    </div>

                                </td>

                            </tr>

                        )}


                        {/* JOBS */}

                        {!loading &&
                            jobs.map((job) => (

                                <tr key={job.id}>

                                    <td>

                                        <strong>
                                            {job.title}
                                        </strong>

                                    </td>


                                    <td>
                                        {job.company}
                                    </td>


                                    <td>
                                        {job.location || "Not specified"}
                                    </td>


                                    <td>
                                        {job.jobType || "Not specified"}
                                    </td>


                                    <td>
                                        {job.salary || "Not specified"}
                                    </td>
                                    <td>
                                        <button className="btn btn-sm btn-danger" onClick={() => deleteJob(job.id)}>Delete</button>
                                    </td>

                                </tr>

                            ))
                        }


                        </tbody>

                    </table>

                </div>

            </div>

        </main>
    );
}

