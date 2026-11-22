import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Profile from "./pages/Profile";

import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import RecruiterPostJob from "./pages/recruiter/PostJob";
import RecruiterManageJobs from "./pages/recruiter/ManageJobs";
import RecruiterApplications from "./pages/recruiter/Applications";

import AdminDashboard from "./pages/admin/AdminDashboard";

import About from "./pages/About";
import Contact from "./pages/Contact";


function Layout({ children }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}


export default function App() {

    return (
        <Routes>

            {/* ================= AUTH ================= */}

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />


            {/* ================= PUBLIC ================= */}

            <Route
                path="/"
                element={
                    <Layout>
                        <Home />
                    </Layout>
                }
            />

            <Route
                path="/about"
                element={
                    <Layout>
                        <About />
                    </Layout>
                }
            />

            <Route
                path="/contact"
                element={
                    <Layout>
                        <Contact />
                    </Layout>
                }
            />

            <Route
                path="/jobs"
                element={
                    <Layout>
                        <Jobs />
                    </Layout>
                }
            />

            <Route
                path="/jobs/:id"
                element={
                    <Layout>
                        <JobDetails />
                    </Layout>
                }
            />


            {/* ================= JOB SEEKER ================= */}

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute allowedRoles={["JOB_SEEKER"]}>
                        <Layout>
                            <Dashboard />
                        </Layout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/applications"
                element={
                    <ProtectedRoute allowedRoles={["JOB_SEEKER"]}>
                        <Layout>
                            <Applications />
                        </Layout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute allowedRoles={["JOB_SEEKER", "RECRUITER", "ADMIN"]}>
                        <Layout>
                            <Profile />
                        </Layout>
                    </ProtectedRoute>
                }
            />


            {/* ================= RECRUITER ================= */}

            <Route
                path="/recruiter"
                element={
                    <ProtectedRoute allowedRoles={["RECRUITER"]}>
                        <Layout>
                            <RecruiterDashboard />
                        </Layout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/recruiter/post-job"
                element={
                    <ProtectedRoute allowedRoles={["RECRUITER"]}>
                        <Layout>
                            <RecruiterPostJob />
                        </Layout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/recruiter/jobs"
                element={
                    <ProtectedRoute allowedRoles={["RECRUITER"]}>
                        <Layout>
                            <RecruiterManageJobs />
                        </Layout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/recruiter/applications"
                element={
                    <ProtectedRoute allowedRoles={["RECRUITER"]}>
                        <Layout>
                            <RecruiterApplications />
                        </Layout>
                    </ProtectedRoute>
                }
            />


            {/* ================= ADMIN ================= */}

            <Route
                path="/admin"
                element={
                    <ProtectedRoute allowedRoles={["ADMIN"]}>
                        <Layout>
                            <AdminDashboard />
                        </Layout>
                    </ProtectedRoute>
                }
            />


            {/* ================= 404 ================= */}

            <Route
                path="*"
                element={
                    <div className="min-h-screen flex items-center justify-center">
                        <div className="text-center">

                            <h1 className="text-6xl font-bold">
                                404
                            </h1>

                            <p className="mt-3 text-gray-500">
                                Page not found
                            </p>

                        </div>
                    </div>
                }
            />

        </Routes>
    );
}

