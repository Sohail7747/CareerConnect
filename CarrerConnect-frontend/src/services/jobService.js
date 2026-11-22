import api from "./api";

export const getJobs = params => api.get("/jobs", { params });
export const getJob = id => api.get(`/jobs/${id}`);
export const getRecruiterJobs = recruiterId => api.get(`/jobs/recruiter/${recruiterId}`);
export const createJob = (recruiterId, data) => api.post(`/jobs/recruiter/${recruiterId}`, data);
export const updateJob = (id, recruiterId, data) => api.put(`/jobs/${id}`, data, { params: { recruiterId } });
export const deleteJob = (id, recruiterId) => api.delete(`/jobs/${id}`, { params: { recruiterId } });
