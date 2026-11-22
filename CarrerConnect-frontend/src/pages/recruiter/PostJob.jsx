import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function PostJob() {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const navigate = useNavigate();

    const { user } = useAuth();


    const submit = async (data) => {

        try {

            // Make sure recruiter is logged in
            if (!user?.id) {
                toast.error("Please login as a recruiter.");
                navigate("/login");
                return;
            }


            // Data that matches our backend Job entity
            const jobData = {

                title: data.title,

                company: data.company,

                location: data.location,

                jobType: data.type,

                salary: data.salary,

                description: data.description,
                
                experience: data.experience,  
                
                skills: data.skills

            };


            console.log("Sending Job:", jobData);


            // JWT is automatically added by api.js
            const response = await api.post(
                `/jobs/recruiter/${user.id}`,
                jobData
            );


            console.log(
                "Job created successfully:",
                response.data
            );


            toast.success("Job published successfully!");


            // Go back to recruiter jobs
            navigate("/recruiter/jobs");


        } catch (error) {

            console.error(
                "Error creating job:",
                error
            );


            if (error.response?.status === 401) {

                toast.error(
                    "Session expired. Please login again."
                );

                navigate("/login");

            } else if (error.response?.status === 403) {

                toast.error(
                    "You are not authorized to post a job."
                );

            } else {

                toast.error(
                    error.response?.data?.message ||
                    "Failed to publish job."
                );
            }

        }

    };


    return (

        <main className="page container section">

            <span className="eyebrow">
                RECRUITMENT
            </span>

            <h1>
                Post a new job
            </h1>


            <div
                className="card"
                style={{
                    padding: 30,
                    marginTop: 25
                }}
            >

                <form
                    onSubmit={handleSubmit(submit)}
                >

                    <div className="grid grid-2">


                        {/* JOB TITLE */}

                        <div className="form-group">

                            <label className="label">
                                Job title
                            </label>

                            <input
                                className="input"
                                {...register("title", {
                                    required:
                                        "Job title is required"
                                })}
                                placeholder="Java Backend Developer"
                            />

                            {errors.title && (
                                <small className="error">
                                    {errors.title.message}
                                </small>
                            )}

                        </div>


                        {/* JOB TYPE */}

                        <div className="form-group">

                            <label className="label">
                                Job type
                            </label>

                            <select
                                className="select"
                                {...register("type")}
                            >

                                <option>
                                    Full Time
                                </option>

                                <option>
                                    Internship
                                </option>

                                <option>
                                    Part Time
                                </option>

                            </select>

                        </div>


                        {/* COMPANY */}

                        <div className="form-group">

                            <label className="label">
                                Company
                            </label>

                            <input
                                className="input"
                                {...register("company", {
                                    required:
                                        "Company is required"
                                })}
                            />

                            {errors.company && (
                                <small className="error">
                                    {errors.company.message}
                                </small>
                            )}

                        </div>


                        {/* LOCATION */}

                        <div className="form-group">

                            <label className="label">
                                Location
                            </label>

                            <input
                                className="input"
                                {...register("location")}
                                placeholder="Remote / Bhopal"
                            />

                        </div>


                        {/* SALARY */}

                        <div className="form-group">

                            <label className="label">
                                Salary
                            </label>

                            <input
                                className="input"
                                {...register("salary")}
                                placeholder="₹6–10 LPA"
                            />

                        </div>


                        {/* EXPERIENCE */}

                        <div className="form-group">

                            <label className="label">
                                Experience
                            </label>

                            <input
                                className="input"
                                {...register("experience")}
                                placeholder="0–2 years"
                            />

                        </div>

                    </div>


                    {/* DESCRIPTION */}

                    <div className="form-group">

                        <label className="label">
                            Description
                        </label>

                        <textarea
                            className="textarea"
                            rows="7"
                            {...register("description", {
                                required:
                                    "Description is required"
                            })}
                        />

                        {errors.description && (
                            <small className="error">
                                {errors.description.message}
                            </small>
                        )}

                    </div>


                    {/* SKILLS */}

                    <div className="form-group">

                        <label className="label">
                            Skills
                        </label>

                        <input
                            className="input"
                            {...register("skills")}
                            placeholder="Java, Spring Boot, MySQL"
                        />

                    </div>


                    {/* SUBMIT */}

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Publish Job
                    </button>

                </form>

            </div>

        </main>
    );
}