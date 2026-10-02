'use client';

import { useEffect, useState } from 'react';
import { Edit3, GraduationCap, MapPin, Plus, RefreshCw, Trash2, X } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { createEducation, deleteEducation, getEducation, updateEducation } from '@/lib/api';

const inputClass = 'w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-sm text-white outline-none transition focus:border-purple-500';

const emptyEducation = {
    degree: '',
    institution: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
};

function educationToForm(education) {
    return {
        degree: education.degree || '',
        institution: education.institution || '',
        location: education.location || '',
        startDate: education.startDate || '',
        endDate: education.endDate || '',
        current: !education.endDate,
        description: education.description || '',
    };
}

function Field({ label, name, value, onChange, type = 'text', required = false, ...props }) {
    return (
        <label className="block text-sm text-slate-300">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</span>
            {type === 'textarea' ? (
                <textarea name={name} value={value} onChange={onChange} required={required} className={inputClass} {...props} />
            ) : (
                <input name={name} type={type} value={value} onChange={onChange} required={required} className={inputClass} {...props} />
            )}
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

export default function EducationPage() {
    const [education, setEducation] = useState([]);
    const [form, setForm] = useState(emptyEducation);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const loadEducation = async ({ showLoader = true } = {}) => {
        if (showLoader) setLoading(true);
        setRefreshing(!showLoader);
        setError('');

        try {
            setEducation(await getEducation());
        } catch (loadError) {
            setError(loadError.message || 'Unable to load education.');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        loadEducation();
    }, []);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
    };

    const startCreate = () => {
        setEditingId(null);
        setForm(emptyEducation);
        setError('');
    };

    const startEdit = (item) => {
        setEditingId(item._id);
        setForm(educationToForm(item));
        setError('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError('');

        try {
            const educationData = {
                degree: form.degree.trim(),
                institution: form.institution.trim(),
                location: form.location.trim(),
                startDate: form.startDate,
                endDate: form.current ? '' : form.endDate,
                description: form.description.trim(),
            };
            const savedEducation = editingId
                ? await updateEducation(editingId, educationData)
                : await createEducation(educationData);

            setEducation((current) => editingId
                ? current.map((item) => (item._id === savedEducation._id ? savedEducation : item))
                : [savedEducation, ...current]);
            startCreate();
        } catch (saveError) {
            setError(saveError.message || 'Unable to save education.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (item) => {
        if (!window.confirm(`Delete ${item.degree} at ${item.institution}? This cannot be undone.`)) return;

        try {
            await deleteEducation(item._id);
            setEducation((current) => current.filter((record) => record._id !== item._id));
            if (editingId === item._id) startCreate();
        } catch (deleteError) {
            setError(deleteError.message || 'Unable to delete education.');
        }
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-slate-950 text-slate-100">
                <div className="flex min-h-screen flex-col lg:flex-row">
                    <Sidebar open={sidebarOpen} />
                    <div className="flex-1">
                        <Header title="Education" onToggleSidebar={() => setSidebarOpen((previous) => !previous)} />
                        <main className="p-4 sm:p-6">
                            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.2em] text-purple-400">Portfolio CMS</p>
                                    <h2 className="mt-1 text-2xl font-bold text-white">My Education</h2>
                                    <p className="mt-2 text-sm text-slate-400">Manage the education timeline shown on your public portfolio.</p>
                                </div>
                                <div className="flex gap-2">
                                    <button type="button" onClick={() => loadEducation({ showLoader: false })} disabled={refreshing} className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 hover:border-purple-500 disabled:opacity-60">
                                        <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} /> Refresh
                                    </button>
                                    <button type="button" onClick={startCreate} className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-3 py-2 text-sm font-semibold text-white hover:bg-purple-500">
                                        <Plus size={16} /> Add education
                                    </button>
                                </div>
                            </div>

                            {error && <div role="alert" className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}

                            <form onSubmit={handleSubmit} className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                                <div className="mb-5 flex items-center justify-between gap-3">
                                    <div>
                                        <h3 className="font-semibold text-white">{editingId ? 'Edit education' : 'Add education'}</h3>
                                        <p className="mt-1 text-xs text-slate-500">Dates use month and year. Leave the end date blank for current studies.</p>
                                    </div>
                                    {editingId && <button type="button" onClick={startCreate} className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white"><X size={16} /> Cancel</button>}
                                </div>
                                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                    <Field label="Degree or qualification" name="degree" value={form.degree} onChange={handleChange} required placeholder="B.Tech in Information Technology" />
                                    <Field label="Institution" name="institution" value={form.institution} onChange={handleChange} required placeholder="University or school" />
                                    <Field label="Location" name="location" value={form.location} onChange={handleChange} placeholder="Lucknow, India" />
                                    <Field label="Start date" name="startDate" type="month" value={form.startDate} onChange={handleChange} required />
                                    <Field label="End date" name="endDate" type="month" value={form.endDate} onChange={handleChange} disabled={form.current} required={!form.current} />
                                    <label className="flex items-center gap-3 self-end rounded-lg border border-slate-700 px-3 py-2.5 text-sm text-slate-200">
                                        <input type="checkbox" name="current" checked={form.current} onChange={handleChange} className="h-4 w-4 accent-purple-600" />
                                        Currently studying
                                    </label>
                                    <div className="md:col-span-2 xl:col-span-3"><Field label="Description" name="description" value={form.description} onChange={handleChange} type="textarea" rows={3} placeholder="Relevant focus, achievements, or coursework." /></div>
                                </div>
                                <button type="submit" disabled={saving} className="mt-5 rounded-lg bg-linear-to-r from-purple-600 to-violet-500 px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">
                                    {saving ? 'Saving...' : editingId ? 'Update education' : 'Create education'}
                                </button>
                            </form>

                            {loading ? (
                                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center text-slate-400">Loading education...</div>
                            ) : education.length === 0 ? (
                                <div className="rounded-2xl border border-dashed border-slate-700 p-10 text-center text-slate-400">No education records yet. Add your first record above.</div>
                            ) : (
                                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                    {education.map((item) => (
                                        <article key={item._id} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                                            <div className="flex items-start gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-300"><GraduationCap size={20} /></div>
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="font-semibold text-white">{item.degree}</h3>
                                                    <p className="mt-1 text-sm text-slate-300">{item.institution}</p>
                                                </div>
                                            </div>
                                            <p className="mt-4 text-sm text-slate-400">
                                                {formatDate(item.startDate)}{item.startDate && ' - '}{item.endDate ? formatDate(item.endDate) : 'Present'}
                                            </p>
                                            {item.location && <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-400"><MapPin size={14} /> {item.location}</p>}
                                            {item.description && <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-400">{item.description}</p>}
                                            <div className="mt-4 flex gap-2 border-t border-slate-800 pt-4">
                                                <button type="button" onClick={() => startEdit(item)} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:border-purple-500"><Edit3 size={15} /> Edit</button>
                                                <button type="button" onClick={() => handleDelete(item)} className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 px-3 py-2 text-sm text-red-300 hover:bg-red-500/10"><Trash2 size={15} /> Delete</button>
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