'use client';

import { useEffect, useState } from 'react';
import { Edit3, Image as ImageIcon, Plus, RefreshCw, Star, Trash2, X } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { createProject, deleteProject, getProjects, updateProject, uploadProjectImage } from '@/lib/api';

const emptyProject = {
    title: '',
    description: '',
    image: '',
    technologies: '',
    liveUrl: '',
    githubUrl: '',
    featured: false,
};

function projectToForm(project) {
    return {
        title: project.title || '',
        description: project.description || '',
        image: project.image || '',
        technologies: (project.technologies || []).join(', '),
        liveUrl: project.liveUrl || '',
        githubUrl: project.githubUrl || '',
        featured: Boolean(project.featured),
    };
}

function formToProject(form) {
    return {
        title: form.title.trim(),
        description: form.description.trim(),
        image: form.image.trim(),
        technologies: form.technologies.split(',').map((technology) => technology.trim()).filter(Boolean),
        liveUrl: form.liveUrl.trim(),
        githubUrl: form.githubUrl.trim(),
        featured: form.featured,
    };
}

function Field({ label, name, value, onChange, type = 'text', required = false, ...props }) {
    return (
        <label className="block text-sm text-slate-300">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</span>
            {type === 'textarea' ? (
                <textarea name={name} value={value} onChange={onChange} required={required} {...props} />
            ) : (
                <input name={name} type={type} value={value} onChange={onChange} required={required} {...props} />
            )}
        </label>
    );
}

const fieldClass = 'w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-sm text-white outline-none transition focus:border-purple-500';

export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [form, setForm] = useState(emptyProject);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [imageFile, setImageFile] = useState(null);

    const loadProjects = async ({ showLoader = true } = {}) => {
        if (showLoader) setLoading(true);
        setRefreshing(!showLoader);
        setError('');

        try {
            setProjects(await getProjects());
        } catch (loadError) {
            setError(loadError.message || 'Unable to load projects.');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
    };

    const startCreate = () => {
        setEditingId(null);
        setForm(emptyProject);
        setImageFile(null);
        setError('');
    };

    const startEdit = (project) => {
        setEditingId(project._id);
        setForm(projectToForm(project));
        setImageFile(null);
        setError('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError('');

        try {
            const projectData = formToProject(form);
            if (imageFile) {
                projectData.image = await uploadProjectImage(imageFile);
            }
            const savedProject = editingId
                ? await updateProject(editingId, projectData)
                : await createProject(projectData);

            setProjects((current) => editingId
                ? current.map((project) => (project._id === savedProject._id ? savedProject : project))
                : [savedProject, ...current]);
            startCreate();
        } catch (saveError) {
            setError(saveError.message || 'Unable to save project.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (project) => {
        if (!window.confirm(`Delete "${project.title}"? This cannot be undone.`)) return;

        try {
            await deleteProject(project._id);
            setProjects((current) => current.filter((item) => item._id !== project._id));
            if (editingId === project._id) startCreate();
        } catch (deleteError) {
            setError(deleteError.message || 'Unable to delete project.');
        }
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-slate-950 text-slate-100">
                <div className="flex min-h-screen flex-col lg:flex-row">
                    <Sidebar open={sidebarOpen} />
                    <div className="flex-1">
                        <Header title="Projects" onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
                        <main className="p-4 sm:p-6">
                            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.2em] text-purple-400">Portfolio CMS</p>
                                    <h2 className="mt-1 text-2xl font-bold text-white">My Projects Work</h2>
                                    <p className="mt-2 text-sm text-slate-400">Manage the projects shown on your public portfolio.</p>
                                </div>
                                <div className="flex gap-2">
                                    <button type="button" onClick={() => loadProjects({ showLoader: false })} disabled={refreshing} className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 hover:border-purple-500 disabled:opacity-60">
                                        <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} /> Refresh
                                    </button>
                                    <button type="button" onClick={startCreate} className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-3 py-2 text-sm font-semibold text-white hover:bg-purple-500">
                                        <Plus size={16} /> Add project
                                    </button>
                                </div>
                            </div>

                            {error && <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}

                            <form onSubmit={handleSubmit} className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                                <div className="mb-5 flex items-center justify-between gap-3">
                                    <div>
                                        <h3 className="font-semibold text-white">{editingId ? 'Edit project' : 'Add project'}</h3>
                                        <p className="mt-1 text-xs text-slate-500">Upload a JPG, PNG, GIF, or WebP image up to 5 MB.</p>
                                    </div>
                                    {editingId && <button type="button" onClick={startCreate} className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white"><X size={16} /> Cancel</button>}
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <Field label="Title" name="title" value={form.title} onChange={handleChange} className={fieldClass} required placeholder="Portfolio website" />
                                    <label className="block text-sm text-slate-300">
                                        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">Project image</span>
                                        <input
                                            name="imageFile"
                                            type="file"
                                            accept="image/png,image/jpeg,image/gif,image/webp"
                                            onChange={(event) => setImageFile(event.target.files?.[0] || null)}
                                            className={`${fieldClass} file:mr-3 file:rounded-md file:border-0 file:bg-purple-600 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white`}
                                        />
                                        {imageFile && <span className="mt-1 block text-xs text-purple-300">Selected: {imageFile.name}</span>}
                                        {!imageFile && form.image && <span className="mt-1 block truncate text-xs text-slate-500">Current image is kept unless you choose a replacement.</span>}
                                    </label>
                                    <Field label="Technologies" name="technologies" value={form.technologies} onChange={handleChange} className={fieldClass} placeholder="Next.js, MongoDB, Node.js" />
                                    <Field label="Live URL" name="liveUrl" value={form.liveUrl} onChange={handleChange} className={fieldClass} placeholder="https://example.com" />
                                    <Field label="GitHub URL" name="githubUrl" value={form.githubUrl} onChange={handleChange} className={fieldClass} placeholder="https://github.com/..." />
                                    <label className="flex items-center gap-3 self-end rounded-lg border border-slate-700 px-3 py-2.5 text-sm text-slate-200"><input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="h-4 w-4 accent-purple-600" /><Star size={16} className="text-amber-300" /> Featured project</label>
                                    <div className="md:col-span-2"><Field label="Description" name="description" value={form.description} onChange={handleChange} type="textarea" className={`${fieldClass} min-h-24 resize-y`} required placeholder="Describe the project and its purpose." /></div>
                                </div>
                                <button type="submit" disabled={saving} className="mt-5 rounded-lg bg-gradient-to-r from-purple-600 to-violet-500 px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">{saving ? 'Saving...' : editingId ? 'Update project' : 'Create project'}</button>
                            </form>

                            {loading ? (
                                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center text-slate-400">Loading projects...</div>
                            ) : projects.length === 0 ? (
                                <div className="rounded-2xl border border-dashed border-slate-700 p-10 text-center text-slate-400">No projects yet. Add your first project above.</div>
                            ) : (
                                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                    {projects.map((project) => (
                                        <article key={project._id} className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70">
                                            {project.image ? <img src={project.image} alt="" className="h-40 w-full object-cover" /> : <div className="flex h-40 items-center justify-center bg-slate-950 text-slate-600"><ImageIcon size={30} /></div>}
                                            <div className="p-4">
                                                <div className="flex items-start justify-between gap-3"><h3 className="font-semibold text-white">{project.title}</h3>{project.featured && <Star size={16} className="shrink-0 text-amber-300" />}</div>
                                                <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">{project.description}</p>
                                                <div className="mt-3 flex flex-wrap gap-1.5">{(project.technologies || []).map((technology) => <span key={technology} className="rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-300">{technology}</span>)}</div>
                                                <div className="mt-4 flex gap-2 border-t border-slate-800 pt-4"><button type="button" onClick={() => startEdit(project)} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:border-purple-500"><Edit3 size={15} /> Edit</button><button type="button" onClick={() => handleDelete(project)} className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 px-3 py-2 text-sm text-red-300 hover:bg-red-500/10"><Trash2 size={15} /> Delete</button></div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
