'use client';

import { useEffect, useState } from 'react';
import { Award, Edit3, Image as ImageIcon, Plus, RefreshCw, Trash2, X } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { createCertification, deleteCertification, getCertifications, updateCertification, uploadProjectImage } from '@/lib/api';

const inputClass = 'w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-sm text-white outline-none transition focus:border-purple-500';

const emptyCertification = {
    title: '',
    issuer: '',
    year: '',
    image: '',
    credentialUrl: '',
};

function certificationToForm(certification) {
    return {
        title: certification.title || '',
        issuer: certification.issuer || '',
        year: certification.year || '',
        image: certification.image || '',
        credentialUrl: certification.credentialUrl || '',
    };
}

function Field({ label, name, value, onChange, type = 'text', required = false, ...props }) {
    return (
        <label className="block text-sm text-slate-300">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</span>
            <input name={name} type={type} value={value} onChange={onChange} required={required} className={inputClass} {...props} />
        </label>
    );
}

export default function CertificationsPage() {
    const [certifications, setCertifications] = useState([]);
    const [form, setForm] = useState(emptyCertification);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [imageInputKey, setImageInputKey] = useState(0);

    useEffect(() => () => {
        if (imagePreview.startsWith('blob:')) URL.revokeObjectURL(imagePreview);
    }, [imagePreview]);

    const loadCertifications = async ({ showLoader = true } = {}) => {
        if (showLoader) setLoading(true);
        setRefreshing(!showLoader);
        setError('');

        try {
            setCertifications(await getCertifications());
        } catch (loadError) {
            setError(loadError.message || 'Unable to load certificates.');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        loadCertifications();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const startCreate = () => {
        setEditingId(null);
        setForm(emptyCertification);
        setImageFile(null);
        setImagePreview('');
        setImageInputKey((key) => key + 1);
        setError('');
    };

    const startEdit = (certification) => {
        setEditingId(certification._id);
        setForm(certificationToForm(certification));
        setImageFile(null);
        setImagePreview('');
        setImageInputKey((key) => key + 1);
        setError('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError('');

        try {
            const certificationData = {
                title: form.title.trim(),
                issuer: form.issuer.trim(),
                year: form.year.trim(),
                image: form.image.trim(),
                credentialUrl: form.credentialUrl.trim(),
            };
            if (imageFile) certificationData.image = await uploadProjectImage(imageFile);

            const savedCertification = editingId
                ? await updateCertification(editingId, certificationData)
                : await createCertification(certificationData);

            setCertifications((current) => editingId
                ? current.map((item) => (item._id === savedCertification._id ? savedCertification : item))
                : [savedCertification, ...current]);
            startCreate();
        } catch (saveError) {
            setError(saveError.message || 'Unable to save certificate.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (certification) => {
        if (!window.confirm(`Delete "${certification.title}"? This cannot be undone.`)) return;

        try {
            await deleteCertification(certification._id);
            setCertifications((current) => current.filter((item) => item._id !== certification._id));
            if (editingId === certification._id) startCreate();
        } catch (deleteError) {
            setError(deleteError.message || 'Unable to delete certificate.');
        }
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-slate-950 text-slate-100">
                <div className="flex min-h-screen flex-col lg:flex-row">
                    <Sidebar open={sidebarOpen} />
                    <div className="flex-1">
                        <Header title="Certificates" onToggleSidebar={() => setSidebarOpen((previous) => !previous)} />
                        <main className="p-4 sm:p-6">
                            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.2em] text-purple-400">Portfolio CMS</p>
                                    <h2 className="mt-1 text-2xl font-bold text-white">My Certificates</h2>
                                    <p className="mt-2 text-sm text-slate-400">Manage the certificates shown on your public portfolio.</p>
                                </div>
                                <div className="flex gap-2">
                                    <button type="button" onClick={() => loadCertifications({ showLoader: false })} disabled={refreshing} className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 hover:border-purple-500 disabled:opacity-60">
                                        <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} /> Refresh
                                    </button>
                                    <button type="button" onClick={startCreate} className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-3 py-2 text-sm font-semibold text-white hover:bg-purple-500">
                                        <Plus size={16} /> Add certificate
                                    </button>
                                </div>
                            </div>

                            {error && <div role="alert" className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}

                            <form onSubmit={handleSubmit} className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                                <div className="mb-5 flex items-center justify-between gap-3">
                                    <div>
                                        <h3 className="font-semibold text-white">{editingId ? 'Edit certificate' : 'Add certificate'}</h3>
                                        <p className="mt-1 text-xs text-slate-500">Add the certificate details and optionally upload its image or credential link.</p>
                                    </div>
                                    {editingId && <button type="button" onClick={startCreate} className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white"><X size={16} /> Cancel</button>}
                                </div>
                                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                    <Field label="Certificate title" name="title" value={form.title} onChange={handleChange} required placeholder="MERN Stack Development" />
                                    <Field label="Issuing organization" name="issuer" value={form.issuer} onChange={handleChange} required placeholder="Digi Coders, Lucknow" />
                                    <Field label="Year" name="year" value={form.year} onChange={handleChange} required placeholder="2024" />
                                    <label className="block text-sm text-slate-300">
                                        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">Certificate image</span>
                                        <input
                                            key={imageInputKey}
                                            name="imageFile"
                                            type="file"
                                            accept="image/png,image/jpeg,image/gif,image/webp"
                                            onChange={(event) => {
                                                const file = event.target.files?.[0] || null;
                                                setImageFile(file);
                                                setImagePreview(file ? URL.createObjectURL(file) : '');
                                            }}
                                            className={`${inputClass} file:mr-3 file:rounded-md file:border-0 file:bg-purple-600 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white`}
                                        />
                                        <span className="mt-1 block text-xs text-slate-500">PNG, JPG, GIF, or WebP, up to 5 MB.</span>
                                    </label>
                                    <Field label="Credential URL" name="credentialUrl" type="url" value={form.credentialUrl} onChange={handleChange} placeholder="https://example.com/credential" />
                                    <label className="block text-sm text-slate-300">
                                        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">Image preview</span>
                                        <div className="flex h-28 items-center justify-center overflow-hidden rounded-lg border border-slate-700 bg-slate-950">
                                            {imagePreview || form.image ? <img src={imagePreview || form.image} alt="Certificate preview" className="h-full w-full object-contain" /> : <ImageIcon size={24} className="text-slate-600" />}
                                        </div>
                                        {imageFile && <span className="mt-1 block truncate text-xs text-purple-300">{imageFile.name}</span>}
                                        {!imageFile && form.image && <span className="mt-1 block truncate text-xs text-slate-500">Current image is kept unless you choose a replacement.</span>}
                                    </label>
                                </div>
                                <button type="submit" disabled={saving} className="mt-5 rounded-lg bg-linear-to-r from-purple-600 to-violet-500 px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">
                                    {saving ? 'Saving...' : editingId ? 'Update certificate' : 'Create certificate'}
                                </button>
                            </form>

                            {loading ? (
                                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center text-slate-400">Loading certificates...</div>
                            ) : certifications.length === 0 ? (
                                <div className="rounded-2xl border border-dashed border-slate-700 p-10 text-center text-slate-400">No certificates yet. Add your first certificate above.</div>
                            ) : (
                                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                    {certifications.map((certification) => (
                                        <article key={certification._id} className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70">
                                            {certification.image ? <img src={certification.image} alt="" className="h-44 w-full bg-slate-950 object-contain" /> : <div className="flex h-44 items-center justify-center bg-slate-950 text-slate-600"><Award size={30} /></div>}
                                            <div className="p-5">
                                                <h3 className="font-semibold text-white">{certification.title}</h3>
                                                <p className="mt-1 text-sm text-slate-300">{certification.issuer}</p>
                                                <p className="mt-2 text-sm text-slate-400">{certification.year}</p>
                                                <div className="mt-4 flex gap-2 border-t border-slate-800 pt-4">
                                                    <button type="button" onClick={() => startEdit(certification)} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:border-purple-500"><Edit3 size={15} /> Edit</button>
                                                    <button type="button" onClick={() => handleDelete(certification)} className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 px-3 py-2 text-sm text-red-300 hover:bg-red-500/10"><Trash2 size={15} /> Delete</button>
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