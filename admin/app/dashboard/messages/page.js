'use client';

import { useEffect, useState } from 'react';
import { Check, Mail, MailOpen, RefreshCw } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { getContacts, markContactAsRead } from '@/lib/api';

function formatDate(value) {
  if (!value) return 'Unknown date';

  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export default function MessagesPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const loadContacts = async ({ showLoader = true } = {}) => {
    if (showLoader) setLoading(true);
    setRefreshing(!showLoader);
    setError('');

    try {
      setContacts(await getContacts());
    } catch (loadError) {
      setError(loadError.message || 'Unable to load contact messages.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleMarkAsRead = async (contactId) => {
    try {
      const updatedContact = await markContactAsRead(contactId);
      setContacts((currentContacts) => currentContacts.map((contact) => (
        contact._id === updatedContact._id ? updatedContact : contact
      )));
    } catch (markError) {
      setError(markError.message || 'Unable to update this message.');
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <div className="flex min-h-screen flex-col lg:flex-row">
          <Sidebar open={sidebarOpen} />

          <div className="flex-1">
            <Header title="Messages" onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

            <main className="p-4 sm:p-6">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-purple-400">Inbox</p>
                  <h2 className="mt-1 text-2xl font-bold text-white">Contact messages</h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Review messages sent through your portfolio contact form.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => loadContacts({ showLoader: false })}
                  disabled={refreshing}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-purple-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
                  Refresh
                </button>
              </div>

              {error && (
                <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}

              {loading ? (
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center text-slate-400">
                  Loading messages...
                </div>
              ) : contacts.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-10 text-center">
                  <Mail className="mx-auto mb-3 text-slate-500" size={28} />
                  <p className="font-semibold text-slate-200">No messages yet</p>
                  <p className="mt-1 text-sm text-slate-500">New contact form submissions will appear here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <article
                      key={contact._id}
                      className={`rounded-2xl border p-5 transition ${contact.read
                        ? 'border-slate-800 bg-slate-900/60'
                        : 'border-purple-500/40 bg-purple-950/20 shadow-lg shadow-purple-950/10'
                      }`}
                    >
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-semibold text-white">{contact.subject}</h3>
                            {!contact.read && (
                              <span className="rounded-full bg-purple-500/15 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-purple-300">
                                New
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-slate-400">{formatDate(contact.createdAt)}</p>
                        </div>

                        {!contact.read && (
                          <button
                            type="button"
                            onClick={() => handleMarkAsRead(contact._id)}
                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-purple-400/40 px-3 py-2 text-sm font-semibold text-purple-200 transition hover:bg-purple-500/15"
                          >
                            <Check size={16} />
                            Mark as read
                          </button>
                        )}
                      </div>

                      <div className="mt-5 grid gap-3 border-y border-slate-800 py-4 text-sm sm:grid-cols-3">
                        <div>
                          <p className="text-xs uppercase tracking-wide text-slate-500">Name</p>
                          <p className="mt-1 text-slate-200">{contact.name}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wide text-slate-500">Email</p>
                          <a className="mt-1 block truncate text-purple-300 hover:text-purple-200" href={`mailto:${contact.email}`}>
                            {contact.email}
                          </a>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wide text-slate-500">Phone</p>
                          <p className="mt-1 text-slate-200">{contact.telephone || 'Not provided'}</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        {contact.read ? <MailOpen className="mt-0.5 shrink-0 text-emerald-400" size={18} /> : <Mail className="mt-0.5 shrink-0 text-purple-300" size={18} />}
                        <p className="whitespace-pre-wrap text-sm leading-6 text-slate-300">{contact.message}</p>
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
