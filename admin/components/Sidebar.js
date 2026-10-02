"use client";

import Link from 'next/link';
import { Activity, Award, Briefcase, GraduationCap, LayoutDashboard, MessageSquareText, NotebookPen, Settings, ShieldCheck } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/dashboard/projects', icon: Briefcase },
  { name: 'Experience', href: '/dashboard/experience', icon: Activity },
  { name: 'Education', href: '/dashboard/education', icon: GraduationCap },
  { name: 'Certificates', href: '/dashboard/certifications', icon: Award },
  { name: 'Services', href: '/dashboard/services', icon: NotebookPen },
  { name: 'Messages', href: '/dashboard/messages', icon: MessageSquareText },
];

export default function Sidebar({ open = true }) {
  return (
    <aside
      className={[
        'border-r border-slate-800 bg-slate-950/80 backdrop-blur',
        open ? 'block' : 'hidden lg:block',
        'w-full lg:w-72',
      ].join(' ')}
    >
      <div className="flex items-center gap-3 border-b border-slate-800 px-5 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-violet-500 font-bold text-white">
          R
        </div>
        <div>
          <p className="text-sm font-bold text-white">Rishangi Admin</p>
          <p className="text-xs text-slate-400">Portfolio CMS</p>
        </div>
      </div>

      <nav className="space-y-2 p-4">
        {navItems.map(({ name, href, icon: Icon }) => (
          <Link
            key={name}
            href={href}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            <Icon size={16} />
            {name}
          </Link>
        ))}
      </nav>

      <div className="mt-4 border-t border-slate-800 p-4 text-sm text-slate-400">
        <div className="mb-2 flex items-center gap-2 text-purple-300">
          <ShieldCheck size={15} />
          Protected Admin
        </div>
        <p>Secure backend authentication using HTTP-only cookies.</p>
      </div>
    </aside>
  );
}
