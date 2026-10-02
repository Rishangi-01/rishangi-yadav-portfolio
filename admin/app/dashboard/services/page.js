'use client';

import { useEffect, useState } from 'react';
import { Code2, Edit3, Plus, RefreshCw, Trash2, X } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { createService, deleteService, getServices, updateService } from '@/lib/api';

const inputClass = 'w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-sm text-white outline-none transition focus:border-purple-500';
const iconOptions = ['Code2', 'Server', 'Database', 'MonitorSmartphone', 'LockKeyhole', 'Cloud', 'Laptop', 'ShoppingCart', 'Users', 'Layers'];

const emptyService = {
    title: '',
    description: '',
    icon: 'Code2',
    features: '',
};

function serviceToForm(service) {
    return {
        title: service.title || '',
        description: service.description || '',
        icon: iconOptions.includes(service.icon) ? service.icon : 'Code2',
        features: (service.features || []).join('\n'),
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

export default function ServicesPage() {
    const [services, setServices] = useState([]);
    const [form, setForm] = useState(emptyService);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const loadServices = async ({ showLoader = true } = {}) => {
        if (showLoader) setLoading(true);
        setRefreshing(!showLoader);
        setError('');

        try {
            setServices(await getServices());
        } catch (loadError) {
            setError(loadError.message || 'Unable to load services.');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        loadServices();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const startCreate = () => {
        setEditingId(null);
        setForm(emptyService);
        setError('');
    };

    const startEdit = (service) => {
        setEditingId(service._id);
        setForm(serviceToForm(service));
        setError('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError('');

        try {
            const serviceData = {
                title: form.title.trim(),
                description: form.description.trim(),
                icon: form.icon,
                features: form.features.split('\n').map((feature) => feature.trim()).filter(Boolean),
            };
            const savedService = editingId
                ? await updateService(editingId, serviceData)
                : await createService(serviceData);

            setServices((current) => editingId
                ? current.map((service) => (service._id === savedService._id ? savedService : service))
                : [savedService, ...current]);
            startCreate();
        } catch (saveError) {
            setError(saveError.message || 'Unable to save service.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (service) => {
        if (!window.confirm(`Delete "${service.title}"? This cannot be undone.`)) return;

        try {
            await deleteService(service._id);
            setServices((current) => current.filter((item) => item._id !== service._id));
            if (editingId === service._id) startCreate();
        } catch (deleteError) {
            setError(deleteError.message || 'Unable to delete service.');
        }
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-slate-950 text-slate-100">
                <div className="flex min-h-screen flex-col lg:flex-row">
                    <Sidebar open={sidebarOpen} />
                    <div className="flex-1">
                        <Header title="Services" onToggleSidebar={() => setSidebarOpen((previous) => !previous)} />
                        <main className="p-4 sm:p-6">
                            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.2em] text-purple-400">Portfolio CMS</p>
                                    <h2 className="mt-1 text-2xl font-bold text-white">What I Can Do</h2>
                                    <p className="mt-2 text-sm text-slate-400">Manage the services shown on your public portfolio.</p>
                                </div>
                                <div className="flex gap-2">
                                    <button type="button" onClick={() => loadServices({ showLoader: false })} disabled={refreshing} className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 hover:border-purple-500 disabled:opacity-60">
                                        <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} /> Refresh
                                    </button>
                                    <button type="button" onClick={startCreate} className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-3 py-2 text-sm font-semibold text-white hover:bg-purple-500">
                                        <Plus size={16} /> Add service
                                    </button>
                                </div>
                            </div>

                            {error && <div role="alert" className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}

                            <form onSubmit={handleSubmit} className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                                <div className="mb-5 flex items-center justify-between gap-3">
                                    <div>
                                        <h3 className="font-semibold text-white">{editingId ? 'Edit service' : 'Add service'}</h3>
                                        <p className="mt-1 text-xs text-slate-500">List one feature per line. Choose an icon for the public service card.</p>
                                    </div>
                                    {editingId && <button type="button" onClick={startCreate} className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white"><X size={16} /> Cancel</button>}
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <Field label="Service title" name="title" value={form.title} onChange={handleChange} required placeholder="Web Development" />
                                    <label className="block text-sm text-slate-300">
                                        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">Icon</span>
                                        <select name="icon" value={form.icon} onChange={handleChange} className={inputClass}>
                                            {iconOptions.map((icon) => <option key={icon} value={icon}>{icon}</option>)}
                                        </select>
                                    </label>
                                    <div className="md:col-span-2"><Field label="Description" name="description" value={form.description} onChange={handleChange} type="textarea" rows={3} required placeholder="Modern, responsive and scalable web applications." /></div>
                                    <label className="block text-sm text-slate-300 md:col-span-2">
                                        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">Features</span>
                                        <textarea name="features" value={form.features} onChange={handleChange} rows={4} placeholder={'Responsive interfaces\nAPI integration'} className={`${inputClass} resize-y`} />
                                    </label>
                                </div>
                                <button type="submit" disabled={saving} className="mt-5 rounded-lg bg-linear-to-r from-purple-600 to-violet-500 px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">
                                    {saving ? 'Saving...' : editingId ? 'Update service' : 'Create service'}
                                </button>
                            </form>

                            {loading ? (
                                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center text-slate-400">Loading services...</div>
                            ) : services.length === 0 ? (
                                <div className="rounded-2xl border border-dashed border-slate-700 p-10 text-center text-slate-400">No services yet. Add your first service above.</div>
                            ) : (
                                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                    {services.map((service) => (
                                        <article key={service._id} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                                            <div className="flex items-start gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-purple-500/30 bg-purple-500/10 text-purple-300"><Code2 size={20} /></div>
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="font-semibold text-white">{service.title}</h3>
                                                    <p className="mt-2 text-sm leading-6 text-slate-400">{service.description}</p>
                                                </div>
                                            </div>
                                            {service.features?.length > 0 && <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-400">{service.features.map((feature, index) => <li key={`${service._id}-${index}`}>{feature}</li>)}</ul>}
                                            <div className="mt-4 flex gap-2 border-t border-slate-800 pt-4">
                                                <button type="button" onClick={() => startEdit(service)} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:border-purple-500"><Edit3 size={15} /> Edit</button>
                                                <button type="button" onClick={() => handleDelete(service)} className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 px-3 py-2 text-sm text-red-300 hover:bg-red-500/10"><Trash2 size={15} /> Delete</button>
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