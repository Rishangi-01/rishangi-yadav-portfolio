"use client";

import { motion } from 'motion/react';

export default function DashboardCard({ title, value, detail, icon: Icon, accent = 'purple' }) {
  const accentStyles = {
    purple: 'from-purple-500/20 to-violet-500/5 text-purple-300',
    blue: 'from-blue-500/20 to-cyan-500/5 text-blue-300',
    green: 'from-emerald-500/20 to-green-500/5 text-emerald-300',
    pink: 'from-pink-500/20 to-rose-500/5 text-pink-300',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/20"
    >
      <div className={`mb-4 inline-flex rounded-xl bg-gradient-to-br p-3 ${accentStyles[accent]}`}>
        <Icon size={20} />
      </div>
      <p className="text-sm text-slate-400">{title}</p>
      <div className="mt-3 flex items-end justify-between gap-3">
        <h3 className="text-3xl font-bold text-white">{value}</h3>
        <span className="text-xs text-slate-400">{detail}</span>
      </div>
    </motion.div>
  );
}
