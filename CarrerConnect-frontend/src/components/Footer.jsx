import { Link } from "react-router-dom";
import {
    Github,
    Linkedin,
    Twitter,
    Instagram,
    Mail,
    ArrowUpRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Footer() {

    const { user } = useAuth();

    return (
        <footer className="site-footer">

            {/* Main Footer */}

            <div className="footer-container">

                {/* Brand Section */}

                <div className="footer-brand-section">

                    <Link
                        to="/"
                        className="footer-logo"
                    >
                        <span className="footer-logo-dot"></span>
                        CareerConnect
                    </Link>

                    <p className="footer-description">
                        Connecting talented people with meaningful opportunities.
                        Build your career, discover great companies, and find your
                        next opportunity with CareerConnect.
                    </p>


                    {/* Social Icons */}

                    <div className="footer-socials">

                        <a href="#" aria-label="GitHub">
                            <Github size={19} />
                        </a>

                        <a href="#" aria-label="LinkedIn">
                            <Linkedin size={19} />
                        </a>

                        <a href="#" aria-label="Twitter">
                            <Twitter size={19} />
                        </a>

                        <a href="#" aria-label="Instagram">
                            <Instagram size={19} />
                        </a>

                        <a
                            href="mailto:hello@CareerConnect.com"
                            aria-label="Email"
                        >
                            <Mail size={19} />
                        </a>

                    </div>

                </div>


                {/* Explore */}

                <div className="footer-column">

                    <h4>EXPLORE</h4>

                    <Link to="/">
                        Home
                    </Link>

                    <Link to="/jobs">
                        Find Jobs
                    </Link>

                    {!user && (
                        <>
                            <Link to="/register">
                                Create Account
                            </Link>

                            <Link to="/login">
                                Login
                            </Link>
                        </>
                    )}

                </div>


                {/* ========================= */}
                {/* JOB SEEKER FOOTER */}
                {/* ========================= */}

                {user?.role === "JOB_SEEKER" && (

                    <div className="footer-column">

                        <h4>JOB SEEKERS</h4>

                        <Link to="/jobs">
                            Browse Jobs
                        </Link>

                        <Link to="/dashboard">
                            Dashboard
                        </Link>

                        <Link to="/applications">
                            My Applications
                        </Link>

                        <Link to="/profile">
                            My Profile
                        </Link>

                    </div>

                )}


                {/* ========================= */}
                {/* RECRUITER FOOTER */}
                {/* ========================= */}

                {user?.role === "RECRUITER" && (

                    <div className="footer-column">

                        <h4>RECRUITERS</h4>

                        <Link to="/recruiter">
                            Recruiter Dashboard
                        </Link>

                        <Link to="/recruiter/post-job">
                            Post a Job
                        </Link>

                        <Link to="/recruiter/jobs">
                            Manage Jobs
                        </Link>

                        <Link to="/recruiter/applications">
                            Applications
                        </Link>

                        <Link to="/profile">
                            My Profile
                        </Link>

                    </div>

                )}


                {/* ========================= */}
                {/* ADMIN FOOTER */}
                {/* ========================= */}

                {user?.role === "ADMIN" && (

                    <div className="footer-column">

                        <h4>ADMINISTRATION</h4>

                        <Link to="/admin">
                            Admin Dashboard
                        </Link>

                        <Link to="/admin/jobs">
                            Manage Jobs
                        </Link>

                        <Link to="/admin/applications">
                            Applications
                        </Link>

                        <Link to="/profile">
                            My Profile
                        </Link>

                    </div>

                )}


                {/* Company */}

                <div className="footer-column">

                    <h4>COMPANY</h4>

                    <Link to="/about">
                        About CareerConnect
                    </Link>

                    <Link to="/contact">
                        Contact Us
                    </Link>

                    <Link to="#">
                        Privacy Policy
                    </Link>

                </div>

            </div>


            {/* Bottom Footer */}

            <div className="footer-bottom-wrapper">

                <div className="footer-bottom">

                    <span>
                        © 2026 CareerConnect. All rights reserved.
                    </span>

                    <div className="footer-bottom-links">

                        <Link to="#">
                            Privacy Policy
                        </Link>

                        <Link to="#">
                            Terms & Conditions
                        </Link>

                        <Link to="#">
                            Cookie Policy
                        </Link>

                    </div>

                    <Link
                        to="/jobs"
                        className="footer-cta"
                    >
                        Find your next opportunity
                        <ArrowUpRight size={15} />
                    </Link>

                </div>

            </div>

        </footer>
    );
}