"use client";

import { useRouter } from 'next/navigation';
import { Bell, LogOut, Menu } from 'lucide-react';
import { apiFetch } from '@/lib/api';

export default function Header({ title, onToggleSidebar }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await apiFetch('/api/auth/logout', { method: 'POST' });
      router.replace('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950/70 px-4 py-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="rounded-lg border border-slate-700 p-2 text-slate-300 lg:hidden"
        >
          <Menu size={18} />
        </button>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-purple-400">Admin</p>
          <h1 className="text-xl font-bold text-white">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="rounded-lg border border-slate-700 p-2 text-slate-300">
          <Bell size={18} />
        </button>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-violet-500 px-3 py-2 text-sm font-semibold text-white"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
}
