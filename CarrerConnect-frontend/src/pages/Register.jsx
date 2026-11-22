import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff, BriefcaseBusiness, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function Register() {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const password = watch("password");

    const submit = async (data) => {

        try {

            setLoading(true);

            const response = await api.post(
                "/auth/register",
                {
                    fullName: data.name,
                    email: data.email,
                    password: data.password,
                    role: data.role
                }
            );

            toast.success("Account created successfully! Please sign in.");

            navigate("/login");

        } catch (error) {

            console.error(error);

            if (error.response?.status === 409) {
                toast.error("Email already registered.");
            } else if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Registration failed. Please try again.");
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">

            <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

                {/* LEFT SIDE */}

                <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-12 text-white">

                    <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10" />
                    <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-white/10" />

                    <div className="relative z-10 flex flex-col justify-between w-full">

                        <Link
                            to="/"
                            className="flex items-center gap-3 text-2xl font-bold"
                        >
                            <span className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                                <BriefcaseBusiness size={21} />
                            </span>
                            CareerConnect
                        </Link>

                        <div className="max-w-lg">

                            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm">
                                Start your career journey
                            </span>

                            <h2 className="text-5xl font-bold leading-tight mt-6">
                                Find opportunities.
                                <br />
                                Build your future.
                            </h2>

                            <p className="text-indigo-100 text-lg leading-8 mt-6">
                                Connect with companies, discover meaningful
                                opportunities and take the next step in your career.
                            </p>

                            <div className="space-y-4 mt-8">

                                <div className="flex items-center gap-3">
                                    <CheckCircle2 size={20} />
                                    Discover relevant job opportunities
                                </div>

                                <div className="flex items-center gap-3">
                                    <CheckCircle2 size={20} />
                                    Track your applications
                                </div>

                                <div className="flex items-center gap-3">
                                    <CheckCircle2 size={20} />
                                    Connect with companies
                                </div>

                            </div>

                        </div>

                        <p className="text-sm text-indigo-200">
                            © 2026 CareerConnect
                        </p>

                    </div>
                </div>

                {/* FORM */}

                <div className="p-6 sm:p-10 lg:p-14">

                    <div className="lg:hidden mb-8">

                        <Link
                            to="/"
                            className="flex items-center gap-2 text-xl font-bold text-slate-900"
                        >
                            <span className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                                <BriefcaseBusiness size={18} />
                            </span>

                            CareerConnect
                        </Link>

                    </div>

                    <div className="max-w-md mx-auto">

                        <div className="mb-8">

                            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
                                Get started
                            </p>

                            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
                                Create your account
                            </h1>

                            <p className="text-slate-500 mt-3">
                                Join CareerConnect and start your next career move.
                            </p>

                        </div>

                        <form
                            onSubmit={handleSubmit(submit)}
                            className="space-y-5"
                        >

                            {/* NAME */}

                            <div>

                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Full name
                                </label>

                                <input
                                    type="text"
                                    placeholder="Sohail Khan"
                                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
                                    {...register("name", {
                                        required: "Full name is required",
                                        minLength: {
                                            value: 2,
                                            message: "Name must contain at least 2 characters"
                                        }
                                    })}
                                />

                                {errors.name && (
                                    <p className="text-sm text-red-500 mt-1.5">
                                        {errors.name.message}
                                    </p>
                                )}

                            </div>

                            {/* EMAIL */}

                            <div>

                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Email address
                                </label>

                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Enter a valid email address"
                                        }
                                    })}
                                />

                                {errors.email && (
                                    <p className="text-sm text-red-500 mt-1.5">
                                        {errors.email.message}
                                    </p>
                                )}

                            </div>

                            {/* PASSWORD */}

                            <div>

                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Password
                                </label>

                                <div className="relative">

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create a password"
                                        className="w-full px-4 py-3.5 pr-12 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 6,
                                                message: "Password must contain at least 6 characters"
                                            }
                                        })}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    >
                                        {showPassword
                                            ? <EyeOff size={19} />
                                            : <Eye size={19} />
                                        }
                                    </button>

                                </div>

                                {errors.password && (
                                    <p className="text-sm text-red-500 mt-1.5">
                                        {errors.password.message}
                                    </p>
                                )}

                            </div>

                            {/* CONFIRM PASSWORD */}

                            <div>

                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Confirm password
                                </label>

                                <div className="relative">

                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Repeat your password"
                                        className="w-full px-4 py-3.5 pr-12 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
                                        {...register("confirmPassword", {
                                            required: "Please confirm your password",
                                            validate: value =>
                                                value === password ||
                                                "Passwords do not match"
                                        })}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(!showConfirmPassword)
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    >
                                        {showConfirmPassword
                                            ? <EyeOff size={19} />
                                            : <Eye size={19} />
                                        }
                                    </button>

                                </div>

                                {errors.confirmPassword && (
                                    <p className="text-sm text-red-500 mt-1.5">
                                        {errors.confirmPassword.message}
                                    </p>
                                )}

                            </div>

                            {/* ROLE */}

                            <div>

                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Account type
                                </label>

                                <select
                                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
                                    {...register("role")}
                                >
                                    <option value="JOB_SEEKER">
                                        Job Seeker
                                    </option>

                                    <option value="RECRUITER">
                                        Recruiter
                                    </option>
                                </select>

                            </div>

                            {/* TERMS */}

                            <div className="flex items-start gap-3">

                                <input
                                    type="checkbox"
                                    className="mt-1 w-4 h-4 accent-indigo-600"
                                    {...register("terms", {
                                        required: "You must accept the terms"
                                    })}
                                />

                                <label className="text-sm text-slate-500 leading-5">
                                    I agree to the{" "}
                                    <span className="text-indigo-600 font-medium">
                                        Terms & Conditions
                                    </span>{" "}
                                    and{" "}
                                    <span className="text-indigo-600 font-medium">
                                        Privacy Policy
                                    </span>
                                </label>

                            </div>

                            {errors.terms && (
                                <p className="text-sm text-red-500">
                                    {errors.terms.message}
                                </p>
                            )}

                            {/* BUTTON */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold shadow-lg shadow-indigo-200 transition"
                            >
                                {loading ? "Creating account..." : "Create Account"}
                            </button>

                        </form>

                        <p className="text-center text-sm text-slate-500 mt-7">

                            Already have an account?{" "}

                            <Link
                                to="/login"
                                className="text-indigo-600 font-semibold hover:text-indigo-700"
                            >
                                Sign in
                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </main>
    );
}
