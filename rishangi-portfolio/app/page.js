"use client";

import {
  ArrowUpRight,
  Mail,
  Code2,
  Database,
  Globe,
} from "lucide-react";

import { motion } from "motion/react";

import Navbar from "@/components/Navbar";
import SectionHeading from "@/components/SectionHeading";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import SectionHero from "@/components/SectionHero";
import About from "@/components/About";
import ExperienceProjects from "@/components/ExperienceProjects";
import EducationServices from "@/components/EducationServices";
import GithubContact from "@/components/GithubContact";
import { Demo } from "@/components/Demo";
import ServicesSection from "@/components/ServicesSection";



export default function Home() {
  return (
    <main className="overflow-hidden">

      <Navbar />

      {/* ================= HERO ================= */}

      <SectionHero />

      {/* ================= ABOUT ================= */}

      <About />

      {/* ================= SKILLS ================= */}
      <ExperienceProjects />

      {/* ================= EXPERIENCE ================= */}

      <EducationServices />

      {/* ================= GithubContact ================= */}
      <GithubContact />

      {/* <Demo /> */}

      {/* <ServicesSection /> */}


      <footer className="border-t border-slate-800 px-5 py-8 text-center text-sm text-slate-500">
        © 2026 Rishangi. All rights reserved.
      </footer>

    </main>
  );
}

