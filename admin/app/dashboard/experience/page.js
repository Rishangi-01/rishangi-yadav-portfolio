'use client';

import { useEffect, useState } from 'react';
import { BriefcaseBusiness, Edit3, Image as ImageIcon, MapPin, Plus, RefreshCw, Trash2, X } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { createExperience, deleteExperience, getExperiences, updateExperience, uploadProjectImage } from '@/lib/api';

const inputClass = 'w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-sm text-white outline-none transition focus:border-purple-500';

const emptyExperience = {
    company: '',
    role: '',
    companyUrl: '',
    logo: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    points: '',
};

function experienceToForm(experience) {
    return {
        company: experience.company || '',
        role: experience.role || '',
        companyUrl: experience.companyUrl || '',
        logo: experience.logo || '',
        location: experience.location || '',
        startDate: experience.startDate || '',
        endDate: experience.endDate || '',
        current: Boolean(experience.current),
        points: (experience.points || []).join('\n'),
    };
}

function formToExperience(form) {
    return {
        company: form.company.trim(),
        role: form.role.trim(),
        companyUrl: form.companyUrl.trim(),
        logo: form.logo.trim(),
        location: form.location.trim(),
        startDate: form.startDate,
        endDate: form.current ? '' : form.endDate,
        current: form.current,
        points: form.points.split('\n').map((point) => point.trim()).filter(Boolean),
    };
}

function Field({ label, name, value, onChange, type = 'text', required = false, ...props }) {
    return (
        <label className="block text-sm text-slate-300">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</span>
            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                className={inputClass}
                {...props}
            />
        </label>
    );
}

function formatDate(value) {
    if (!value) return '';
    const match = value.match(/^(\d{4})-(\d{2})$/);
    if (!match) return value;
    return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })
        .format(new Date(`${value}-01T00:00:00.000Z`));
}

export default function ExperiencePage() {
    const [experiences, setExperiences] = useState([]);
    const [form, setForm] = useState(emptyExperience);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [logoFile, setLogoFile] = useState(null);
    const [logoPreview, setLogoPreview] = useState('');
    const [logoInputKey, setLogoInputKey] = useState(0);

    useEffect(() => () => {
        if (logoPreview.startsWith('blob:')) URL.revokeObjectURL(logoPreview);
    }, [logoPreview]);

    const loadExperiences = async ({ showLoader = true } = {}) => {
        if (showLoader) setLoading(true);
        setRefreshing(!showLoader);
        setError('');

        try {
            setExperiences(await getExperiences());
        } catch (loadError) {
            setError(loadError.message || 'Unable to load experience.');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        loadExperiences();
    }, []);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
    };

    const startCreate = () => {
        setEditingId(null);
        setForm(emptyExperience);
        setLogoFile(null);
        setLogoPreview('');
        setLogoInputKey((key) => key + 1);
        setError('');
    };

    const startEdit = (experience) => {
        setEditingId(experience._id);
        setForm(experienceToForm(experience));
        setLogoFile(null);
        setLogoPreview('');
        setLogoInputKey((key) => key + 1);
        setError('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError('');

        try {
            const experienceData = formToExperience(form);
            if (logoFile) {
                experienceData.logo = await uploadProjectImage(logoFile);
            }
            const savedExperience = editingId
                ? await updateExperience(editingId, experienceData)
                : await createExperience(experienceData);

            setExperiences((current) => editingId
                ? current.map((experience) => (experience._id === savedExperience._id ? savedExperience : experience))
                : [savedExperience, ...current]);
            startCreate();
        } catch (saveError) {
            setError(saveError.message || 'Unable to save experience.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (experience) => {
        if (!window.confirm(`Delete the ${experience.role} role at ${experience.company}? This cannot be undone.`)) return;

        try {
            await deleteExperience(experience._id);
            setExperiences((current) => current.filter((item) => item._id !== experience._id));
            if (editingId === experience._id) startCreate();
        } catch (deleteError) {
            setError(deleteError.message || 'Unable to delete experience.');
        }
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-slate-950 text-slate-100">
                <div className="flex min-h-screen flex-col lg:flex-row">
                    <Sidebar open={sidebarOpen} />
                    <div className="flex-1">
                        <Header title="Experience" onToggleSidebar={() => setSidebarOpen((previous) => !previous)} />
                        <main className="p-4 sm:p-6">
                            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.2em] text-purple-400">Portfolio CMS</p>
                                    <h2 className="mt-1 text-2xl font-bold text-white">My Journey</h2>
                                    <p className="mt-2 text-sm text-slate-400">Manage the experience timeline shown on your portfolio.</p>
                                </div>
                                <div className="flex gap-2">
                                    <button type="button" onClick={() => loadExperiences({ showLoader: false })} disabled={refreshing} className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 hover:border-purple-500 disabled:opacity-60">
                                        <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} /> Refresh
                                    </button>
                                    <button type="button" onClick={startCreate} className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-3 py-2 text-sm font-semibold text-white hover:bg-purple-500">
                                        <Plus size={16} /> Add experience
                                    </button>
                                </div>
                            </div>

                            {error && <div role="alert" className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}

                            <form onSubmit={handleSubmit} className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                                <div className="mb-5 flex items-center justify-between gap-3">
                                    <div>
                                        <h3 className="font-semibold text-white">{editingId ? 'Edit experience' : 'Add experience'}</h3>
                                        <p className="mt-1 text-xs text-slate-500">Dates use month and year. Add responsibilities one per line.</p>
                                    </div>
                                    {editingId && <button type="button" onClick={startCreate} className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white"><X size={16} /> Cancel</button>}
                                </div>

                                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                    <Field label="Company" name="company" value={form.company} onChange={handleChange} required placeholder="Company name" />
                                    <Field label="Role" name="role" value={form.role} onChange={handleChange} required placeholder="Frontend Developer" />
                                    <Field label="Location" name="location" value={form.location} onChange={handleChange} placeholder="Noida, India" />
                                    <Field label="Start date" name="startDate" type="month" value={form.startDate} onChange={handleChange} required />
                                    <Field label="End date" name="endDate" type="month" value={form.endDate} onChange={handleChange} disabled={form.current} required={!form.current} />
                                    <Field label="Company website" name="companyUrl" type="url" value={form.companyUrl} onChange={handleChange} placeholder="https://example.com" />
                                    <div className="xl:col-span-2">
                                        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">Company logo</span>
                                        <input
                                            key={logoInputKey}
                                            name="logoImage"
                                            type="file"
                                            accept="image/png,image/jpeg,image/gif,image/webp"
                                            onChange={(event) => {
                                                const file = event.target.files?.[0] || null;
                                                setLogoFile(file);
                                                setLogoPreview(file ? URL.createObjectURL(file) : '');
                                            }}
                                            className={`${inputClass} file:mr-3 file:rounded-md file:border-0 file:bg-purple-600 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white`}
                                        />
                                        <div className="mt-3 flex items-center gap-3">
                                            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-700 bg-slate-950 text-slate-500">
                                                {logoPreview || form.logo ? (
                                                    <img src={logoPreview || form.logo} alt="Company logo preview" className="h-full w-full object-cover" />
                                                ) : <ImageIcon size={20} />}
                                            </div>
                                            <p className="min-w-0 flex-1 truncate text-xs text-slate-400">
                                                {logoFile?.name || (form.logo ? 'Current logo' : 'No logo selected')}
                                            </p>
                                            {(logoFile || form.logo) && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setLogoFile(null);
                                                        setLogoPreview('');
                                                        setForm((current) => ({ ...current, logo: '' }));
                                                        setLogoInputKey((key) => key + 1);
                                                    }}
                                                    className="text-xs font-semibold text-red-300 hover:text-red-200"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                        <p className="mt-1 text-xs text-slate-500">PNG, JPG, GIF, or WebP, up to 5 MB.</p>
                                    </div>
                                    <label className="flex items-center gap-3 self-end rounded-lg border border-slate-700 px-3 py-2.5 text-sm text-slate-200">
                                        <input type="checkbox" name="current" checked={form.current} onChange={handleChange} className="h-4 w-4 accent-purple-600" />
                                        Current role
                                    </label>
                                    <label className="block text-sm text-slate-300 md:col-span-2 xl:col-span-3">
                                        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">Responsibilities</span>
                                        <textarea name="points" value={form.points} onChange={handleChange} rows={5} placeholder={'Built responsive interfaces\nIntegrated REST APIs'} className="w-full resize-y rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-sm text-white outline-none transition focus:border-purple-500" />
                                    </label>
                                </div>
                                <button type="submit" disabled={saving} className="mt-5 rounded-lg bg-linear-to-r from-purple-600 to-violet-500 px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">{saving ? 'Saving...' : editingId ? 'Update experience' : 'Create experience'}</button>
                            </form>

                            {loading ? (
                                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center text-slate-400">Loading experience...</div>
                            ) : experiences.length === 0 ? (
                                <div className="rounded-2xl border border-dashed border-slate-700 p-10 text-center text-slate-400">No experience entries yet. Add your first role above.</div>
                            ) : (
                                <div className="grid gap-4 xl:grid-cols-2">
                                    {experiences.map((experience) => (
                                        <article key={experience._id} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                                            <div className="flex items-start gap-4">
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-purple-500/40 bg-slate-950 text-purple-300">
                                                    {experience.logo ? <img src={experience.logo} alt="" className="h-full w-full object-cover" /> : <BriefcaseBusiness size={20} />}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex flex-wrap items-start justify-between gap-3">
                                                        <div>
                                                            <h3 className="font-semibold text-white">{experience.role}</h3>
                                                            <p className="mt-1 text-sm text-purple-200">{experience.company}</p>
                                                        </div>
                                                        {experience.current && <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300">Current</span>}
                                                    </div>
                                                    <p className="mt-2 text-sm text-slate-400">{formatDate(experience.startDate)} – {experience.current ? 'Present' : formatDate(experience.endDate)}</p>
                                                    {experience.location && <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-400"><MapPin size={14} /> {experience.location}</p>}
                                                    {experience.points?.length > 0 && <ul className="mt-4 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-400">{experience.points.map((point, index) => <li key={`${experience._id}-${index}`}>{point}</li>)}</ul>}
                                                    <div className="mt-4 flex gap-2 border-t border-slate-800 pt-4">
                                                        <button type="button" onClick={() => startEdit(experience)} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:border-purple-500"><Edit3 size={15} /> Edit</button>
                                                        <button type="button" onClick={() => handleDelete(experience)} className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 px-3 py-2 text-sm text-red-300 hover:bg-red-500/10"><Trash2 size={15} /> Delete</button>
                                                    </div>
                                                </div>
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
