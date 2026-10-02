"use client";

import { useEffect, useState } from 'react';
import { Activity, Briefcase, GraduationCap, Inbox, MessageSquareText, NotebookPen, ShieldCheck } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import DashboardCard from '@/components/DashboardCard';
import ProtectedRoute from '@/components/ProtectedRoute';
import { getDashboardStats } from '@/lib/api';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    projects: 0,
    experience: 0,
    education: 0,
    certifications: 0,
    services: 0,
    contacts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await getDashboardStats();
        setStats(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <div className="flex min-h-screen flex-col lg:flex-row">
          <Sidebar open={sidebarOpen} />

          <div className="flex-1">
            <Header title="Dashboard" onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

            <main className="p-4 sm:p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-purple-400">Overview</p>
                  <h2 className="mt-1 text-2xl font-bold">Portfolio Summary</h2>
                </div>
              </div>

              {loading ? (
                <div className="text-slate-300">Loading dashboard data...</div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                  <DashboardCard title="Projects" value={stats.projects} detail="Live items" icon={Briefcase} accent="purple" />
                  <DashboardCard title="Experience" value={stats.experience} detail="Entries" icon={Activity} accent="blue" />
                  <DashboardCard title="Education" value={stats.education} detail="Records" icon={GraduationCap} accent="green" />
                  <DashboardCard title="Certifications" value={stats.certifications} detail="Records" icon={ShieldCheck} accent="purple" />
                  <DashboardCard title="Services" value={stats.services} detail="Offers" icon={NotebookPen} accent="pink" />
                  <DashboardCard title="Messages" value={stats.contacts} detail="Unread" icon={MessageSquareText} accent="blue" />
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
