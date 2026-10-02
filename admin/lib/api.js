const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export async function apiFetch(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers,
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || 'Request failed');
  }

  return payload;
}

export async function getDashboardStats() {
  const [projects, experiences, education, certifications, services, contacts] = await Promise.all([
    apiFetch('/api/projects'),
    apiFetch('/api/experience'),
    apiFetch('/api/education'),
    apiFetch('/api/certifications'),
    apiFetch('/api/services'),
    apiFetch('/api/contacts'),
  ]);

  return {
    projects: projects.data?.length || 0,
    experience: experiences.data?.length || 0,
    education: education.data?.length || 0,
    certifications: certifications.data?.length || 0,
    services: services.data?.length || 0,
    contacts: contacts.data?.length || 0,
  };
}

export async function getContacts() {
  const payload = await apiFetch('/api/contacts');
  return payload.data || [];
}

export async function markContactAsRead(contactId) {
  const payload = await apiFetch(`/api/contacts/${contactId}/read`, { method: 'PATCH' });
  return payload.data;
}

export async function getProjects() {
  const payload = await apiFetch('/api/projects');
  return payload.data || [];
}

export async function createProject(project) {
  const payload = await apiFetch('/api/projects', {
    method: 'POST',
    body: JSON.stringify(project),
  });
  return payload.data;
}

export async function updateProject(projectId, project) {
  const payload = await apiFetch(`/api/projects/${projectId}`, {
    method: 'PUT',
    body: JSON.stringify(project),
  });
  return payload.data;
}

export async function deleteProject(projectId) {
  await apiFetch(`/api/projects/${projectId}`, { method: 'DELETE' });
}

export async function getExperiences() {
  const payload = await apiFetch('/api/experience');
  return payload.data || [];
}

export async function createExperience(experience) {
  const payload = await apiFetch('/api/experience', {
    method: 'POST',
    body: JSON.stringify(experience),
  });
  return payload.data;
}

export async function updateExperience(experienceId, experience) {
  const payload = await apiFetch(`/api/experience/${experienceId}`, {
    method: 'PUT',
    body: JSON.stringify(experience),
  });
  return payload.data;
}

export async function deleteExperience(experienceId) {
  await apiFetch(`/api/experience/${experienceId}`, { method: 'DELETE' });
}

export async function getEducation() {
  const payload = await apiFetch('/api/education');
  return payload.data || [];
}

export async function createEducation(education) {
  const payload = await apiFetch('/api/education', {
    method: 'POST',
    body: JSON.stringify(education),
  });
  return payload.data;
}

export async function updateEducation(educationId, education) {
  const payload = await apiFetch(`/api/education/${educationId}`, {
    method: 'PUT',
    body: JSON.stringify(education),
  });
  return payload.data;
}

export async function deleteEducation(educationId) {
  await apiFetch(`/api/education/${educationId}`, { method: 'DELETE' });
}

export async function getCertifications() {
  const payload = await apiFetch('/api/certifications');
  return payload.data || [];
}

export async function createCertification(certification) {
  const payload = await apiFetch('/api/certifications', {
    method: 'POST',
    body: JSON.stringify(certification),
  });
  return payload.data;
}

export async function updateCertification(certificationId, certification) {
  const payload = await apiFetch(`/api/certifications/${certificationId}`, {
    method: 'PUT',
    body: JSON.stringify(certification),
  });
  return payload.data;
}

export async function deleteCertification(certificationId) {
  await apiFetch(`/api/certifications/${certificationId}`, { method: 'DELETE' });
}

export async function getServices() {
  const payload = await apiFetch('/api/services');
  return payload.data || [];
}

export async function createService(service) {
  const payload = await apiFetch('/api/services', {
    method: 'POST',
    body: JSON.stringify(service),
  });
  return payload.data;
}

export async function updateService(serviceId, service) {
  const payload = await apiFetch(`/api/services/${serviceId}`, {
    method: 'PUT',
    body: JSON.stringify(service),
  });
  return payload.data;
}

export async function deleteService(serviceId) {
  await apiFetch(`/api/services/${serviceId}`, { method: 'DELETE' });
}

export async function uploadProjectImage(file) {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`${API_URL}/api/uploads/project-image`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || 'Image upload failed');
  }

  return payload.data.imageUrl;
}

export default API_URL;
