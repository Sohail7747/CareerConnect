import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, login } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    const loadProfile = async () => {
      try {
        setLoading(true);

        const response = await api.get(`/users/${user.id}`);

        // Backend should return:
        // id, fullName, email, role, about,
        // headline, location, phone, skill

        reset({
          fullName: response.data.fullName || "",
          email: response.data.email || "",
          role: response.data.role || "",
          about: response.data.about || "",
          headline: response.data.headline || "",
          location: response.data.location || "",
          phone: response.data.phone || "",
          skill: response.data.skill || "",
        });
      } catch (error) {
        console.error(error);
        toast.error("Could not load profile.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user?.id, reset]);

  const submit = async (data) => {
    try {
      setSaving(true);

      const profileData = {
        id: user.id,
        fullName: data.fullName,
        email: user.email,
        role: user.role,
        about: data.about,
        headline: data.headline,
        location: data.location,
        phone: data.phone,
        skill: data.skill,
      };

      const response = await api.put(
        `/users/${user.id}`,
        profileData
      );

      const updated = response.data;

      login({
        ...user,
        ...updated,
        token: localStorage.getItem("CareerConnectToken"),
      });

      reset({
        fullName: updated.fullName || "",
        email: updated.email || user.email || "",
        role: updated.role || user.role || "",
        about: updated.about || "",
        headline: updated.headline || "",
        location: updated.location || "",
        phone: updated.phone || "",
        skill: updated.skill || "",
      });

      toast.success("Profile updated successfully.");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Could not update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="page container section">
        <p>Loading profile...</p>
      </main>
    );
  }

  return (
    <main className="page container section">
      <span className="eyebrow">ACCOUNT</span>

      <h1>My Profile</h1>

      <p style={{ marginTop: 8, color: "#64748b" }}>
        Manage your CareerConnect profile information.
      </p>

      <div
        className="card"
        style={{
          padding: 30,
          marginTop: 25,
        }}
      >
        <form onSubmit={handleSubmit(submit)}>

          {/* BASIC INFORMATION */}

          <h2 style={{ marginBottom: 20 }}>
            Basic Information
          </h2>

          <div className="grid grid-2">

            {/* FULL NAME */}

            <div className="form-group">
              <label className="label">
                Full name
              </label>

              <input
                className="input"
                placeholder="Enter your full name"
                {...register("fullName", {
                  required: "Full name is required",
                })}
              />
            </div>

            {/* EMAIL */}

            <div className="form-group">
              <label className="label">
                Email
              </label>

              <input
                className="input"
                {...register("email")}
                disabled
              />
            </div>

            {/* ROLE */}

            <div className="form-group">
              <label className="label">
                Account Type
              </label>

              <input
                className="input"
                {...register("role")}
                disabled
              />
            </div>

            {/* PHONE */}

            <div className="form-group">
              <label className="label">
                Phone
              </label>

              <input
                className="input"
                placeholder="Enter your phone number"
                {...register("phone")}
              />
            </div>

            {/* LOCATION */}

            <div className="form-group">
              <label className="label">
                Location
              </label>

              <input
                className="input"
                placeholder="Indore, Madhya Pradesh"
                {...register("location")}
              />
            </div>

          </div>

          {/* PROFESSIONAL HEADLINE */}

          <div className="form-group">
            <label className="label">
              Professional headline
            </label>

            <input
              className="input"
              placeholder="Java Backend Developer"
              {...register("headline")}
            />
          </div>

          {/* SKILL */}

          <div className="form-group">
            <label className="label">
              Skills
            </label>

            <input
              className="input"
              placeholder="Java, Spring Boot, MySQL, REST API"
              {...register("skill")}
            />

            <small style={{ color: "#64748b" }}>
              Separate multiple skills with commas.
            </small>
          </div>

          {/* ABOUT */}

          <div className="form-group">
            <label className="label">
              About
            </label>

            <textarea
              className="textarea"
              rows="6"
              placeholder="Tell employers about yourself..."
              {...register("about")}
            />
          </div>

          {/* SAVE */}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>

        </form>
      </div>
    </main>
  );
}