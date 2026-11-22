import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, LogOut, UserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {

    const [open, setOpen] = useState(false);

    const { user, logout } = useAuth();

    const navigate = useNavigate();

    return (
        <header className="navbar">

            <div className={`container nav-inner ${open ? "open" : ""}`}>

                {/* Logo */}
                <Link to="/" className="logo">
                    <span className="logo-dot" />
                    CareerConnect
                </Link>

                {/* Mobile Menu */}
                <button
                    className="mobile-menu"
                    onClick={() => setOpen(!open)}
                >
                    <Menu />
                </button>

                <nav className="nav-links">

                    {/* Common Links */}

                    <NavLink
                        className="nav-link"
                        to="/"
                    >
                        Home
                    </NavLink>

                    <NavLink
                        className="nav-link"
                        to="/about"
                    >
                        About Us
                    </NavLink>


                    {/* ========================= */}
                    {/* JOB SEEKER */}
                    {/* ========================= */}

                    {user?.role === "JOB_SEEKER" && (
                        <>
                            <NavLink
                                className="nav-link"
                                to="/jobs"
                            >
                                Find Jobs
                            </NavLink>

                            <NavLink
                                className="nav-link"
                                to="/dashboard"
                            >
                                Dashboard
                            </NavLink>

                            <NavLink
                                className="nav-link"
                                to="/applications"
                            >
                                Applications
                            </NavLink>
                        </>
                    )}


                    {/* ========================= */}
                    {/* RECRUITER */}
                    {/* ========================= */}

                    {user?.role === "RECRUITER" && (
                        <>
                            <NavLink
                                className="nav-link"
                                to="/recruiter"
                            >
                                Dashboard
                            </NavLink>

                            <NavLink
                                className="nav-link"
                                to="/recruiter/jobs"
                            >
                                My Jobs
                            </NavLink>

                            <NavLink
                                className="nav-link"
                                to="/recruiter/post-job"
                            >
                                Post Job
                            </NavLink>

                            <NavLink
                                className="nav-link"
                                to="/recruiter/applications"
                            >
                                Applications
                            </NavLink>
                        </>
                    )}


                    {/* ========================= */}
                    {/* ADMIN */}
                    {/* ========================= */}

                    {user?.role === "ADMIN" && (
                        <>
                            <NavLink
                                className="nav-link"
                                to="/admin"
                            >
                                Dashboard
                            </NavLink>

                            <NavLink
                                className="nav-link"
                                to="/admin/jobs"
                            >
                                Jobs
                            </NavLink>

                            <NavLink
                                className="nav-link"
                                to="/admin/applications"
                            >
                                Applications
                            </NavLink>
                        </>
                    )}


                    {/* Profile */}

                    {user && (
                        <NavLink
                            className="nav-link"
                            to="/profile"
                        >
                            <UserRound
                                size={15}
                                style={{
                                    verticalAlign: "middle"
                                }}
                            />
                            {" "}Profile
                        </NavLink>
                    )}


                    {/* Right Side */}

                    <div
                        className="nav-actions"
                        style={{
                            display: "flex",
                            gap: 8,
                            marginLeft: 8
                        }}
                    >

                        {user ? (

                            <button
                                className="btn btn-outline btn-sm"
                                onClick={() => {
                                    logout();
                                    navigate("/");
                                }}
                            >
                                <LogOut size={15} />
                                Logout
                            </button>

                        ) : (

                            <>
                                <Link
                                    className="btn btn-light btn-sm"
                                    to="/login"
                                >
                                    Login
                                </Link>

                                <Link
                                    className="btn btn-primary btn-sm"
                                    to="/register"
                                >
                                    Get Started
                                </Link>
                            </>

                        )}

                    </div>

                </nav>

            </div>

        </header>
    );
}