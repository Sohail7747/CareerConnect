
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff, BriefcaseBusiness, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function Login() {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const { login } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);


    const submit = async (data) => {

        try {

            setLoading(true);
            
            const response = await api.post(
                "/auth/login",
                {
                    email: data.email,
                    password: data.password
                }
            );
            
            console.log("LOGIN RESPONSE:", response.data);
            
            const user = response.data;
            
            login(user);

            toast.success("Welcome back!");

            // Role-based redirect
            if (user.role === "RECRUITER") {

                navigate("/recruiter");

            } else if (user.role === "ADMIN") {

                navigate("/admin");

            } else {

                navigate(
                    location.state?.from || "/dashboard"
                );

            }

        } catch (error) {

            console.error(error);

            if (error.response?.status === 401) {

                toast.error("Invalid email or password.");

            } else if (error.response?.data?.message) {

                toast.error(error.response.data.message);

            } else {

                toast.error("Login failed. Please try again.");

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

                            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm"
                            >
                                Your next opportunity awaits
                            </span>


                            <h2 className="text-5xl font-bold leading-tight mt-6">

                                Your career.
                                <br />

                                Your next move.

                            </h2>


                            <p className="text-indigo-100 text-lg leading-8 mt-6">

                                Sign in to discover new opportunities,
                                manage applications and connect with
                                companies.

                            </p>


                            <div className="space-y-4 mt-8">

                                <div className="flex items-center gap-3">

                                    <CheckCircle2 size={20} />

                                    Explore career opportunities

                                </div>


                                <div className="flex items-center gap-3">

                                    <CheckCircle2 size={20} />

                                    Manage your applications

                                </div>


                                <div className="flex items-center gap-3">

                                    <CheckCircle2 size={20} />

                                    Connect with employers

                                </div>

                            </div>

                        </div>


                        <p className="text-sm text-indigo-200">

                            © 2026 CareerConnect

                        </p>

                    </div>

                </div>


                {/* LOGIN FORM */}

                <div className="p-6 sm:p-10 lg:p-14">


                    {/* MOBILE LOGO */}

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


                        {/* HEADING */}

                        <div className="mb-8">

                            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">

                                Welcome back

                            </p>


                            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">

                                Sign in to CareerConnect

                            </h1>


                            <p className="text-slate-500 mt-3">

                                Continue your career journey.

                            </p>

                        </div>


                        <form
                            onSubmit={handleSubmit(submit)}
                            className="space-y-5"
                        >


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

                                <div className="flex items-center justify-between mb-2">

                                    <label className="text-sm font-semibold text-slate-700">

                                        Password

                                    </label>


                                    <Link
                                        to="#"
                                        className="text-sm text-indigo-600 font-medium hover:underline"
                                    >

                                        Forgot password?

                                    </Link>

                                </div>


                                <div className="relative">

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        className="w-full px-4 py-3.5 pr-12 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
                                        {...register("password", {
                                            required: "Password is required"
                                        })}
                                    />


                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
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


                            {/* REMEMBER */}

                            <div className="flex items-center gap-3">

                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-indigo-600"
                                />

                                <span className="text-sm text-slate-500">

                                    Remember me

                                </span>

                            </div>


                            {/* BUTTON */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold shadow-lg shadow-indigo-200 transition"
                            >

                                {loading
                                    ? "Signing in..."
                                    : "Sign In"
                                }

                            </button>


                        </form>


                        {/* REGISTER */}

                        <p className="text-center text-sm text-slate-500 mt-7">

                            Don't have an account?{" "}

                            <Link
                                to="/register"
                                className="text-indigo-600 font-semibold hover:text-indigo-700"
                            >

                                Create an account

                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </main>
    );
}