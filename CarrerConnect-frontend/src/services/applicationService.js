import api from "./api";

export const applyForJob = (jobId, seekerId) =>
  api.post("/applications/apply", null, { params: { jobId, seekerId } });

export const getMyApplications = seekerId =>
  api.get("/applications/my", { params: { seekerId } });

export const getJobApplications = recruiterId =>
  api.get(`/applications/recruiter/${recruiterId}`);

export const updateApplicationStatus = (id, recruiterId, status) =>
  api.put(`/applications/${id}/status`, { status }, { params: { recruiterId } });
