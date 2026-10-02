"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CometCard } from "@/components/ui/comet-card";

import {
    ExternalLink,
    MapPin,
} from "lucide-react";

import { motion } from "motion/react";
import { FaArrowRight, FaGithub } from "react-icons/fa";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";
import { API_URL } from "@/lib/api";

/* =========================================================
   EXPERIENCE DATA
========================================================= */

const fallbackExperiences = [

    {
        year: "May 2025 – Present",
        role: "MERN Stack Developer",
        company: "Thixpro Technologies Pvt. Ltd.",
        location: "Noida",
        current: true,

        points: [
            "Developed responsive web applications",
            "Built REST APIs using Node.js & Express",
            "Worked with MongoDB",
            "Integrated frontend and backend",
            "Fixed bugs and improved application performance",
        ],
        logo: "/images/thixpro-logo.png",
        href: "https://www.thixpro.com/"
    },

    {
        year: "January 2025 – May 2025",
        role: "Frontend Developer",
        company: "Bhoomi Techzone Pvt. Ltd.",
        location: "Noida",
        current: false,

        points: [
            "Built responsive React.js interfaces",
            "Developed reusable components",
            "Implemented responsive designs",
            "Integrated frontend features based on project requirements",
        ],
        logo: "/images/bhoomi-logo.png",
        href: "https://bhoomitechzone.in/",
    },

    {
        year: "July 2024 – December 2024",
        role: "MERN Stack Development Trainee",
        company: "DigiCoders",
        location: "Lucknow",
        current: false,

        points: [
            "Learned and implemented MERN Stack development practices",
            "Built responsive web applications using React.js",
            "Developed REST APIs using Node.js and Express.js",
            "Worked with MongoDB for database management",
            "Built reusable components and integrated frontend with backend",
        ],
        logo: "/images/digicoders-logo.png",
        href: "https://thedigicoders.com/",
    },
];

function formatExperienceDate(value) {
    if (!value) return "";

    const monthDate = value.match(/^(\d{4})-(\d{2})$/);
    if (!monthDate) return value;

    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    }).format(new Date(`${value}-01T00:00:00.000Z`));
}

function mapExperience(experience) {
    const startDate = formatExperienceDate(experience.startDate);
    const endDate = experience.current ? "Present" : formatExperienceDate(experience.endDate);

    return {
        ...experience,
        year: [startDate, endDate].filter(Boolean).join(" – "),
        logo: experience.logo || "",
        href: experience.companyUrl || "",
        points: Array.isArray(experience.points) ? experience.points : [],
    };
}

/* =========================================================
   PROJECT DATA
========================================================= */

const fallbackProjects = [
    {
        title: "Lane24 Storefront",
        description: "Modern e-commerce experience with product discovery and UX-focused ordering flow.",
        tech: ["React", "Node.js", "Express", "MongoDB"],
        image: "/images/projects/lane24.png",
        live: "https://github.com/Rishangi-01/",
        github: "https://github.com/Rishangi-01/",
    },

    {
        title: "QCI Portal",
        description: "Responsive admin dashboard created for operational workflow visibility and management.",
        tech: ["React", "Node.js", "MySQL"],
        image: "/images/projects/qci-portal.png",
        live: "https://github.com/Rishangi-01/",
        github: "https://github.com/Rishangi-01/",
    },

    {
        title: "Sports Gaming Platform",
        description: "Interactive game portal with community-first UI patterns and streamlined browsing experience.",
        tech: ["React", "Node.js", "MongoDB"],
        image: "/images/projects/sports-gaming-platform.png",
        live: "https://github.com/Rishangi-01/",
        github: "https://github.com/Rishangi-01/",
    },

    {
        title: "BloodKart",
        description: "Service-driven platform designed to simplify donor and campaign discovery in a clean layout.",
        tech: ["React", "Node.js", "MongoDB"],
        image: "/images/projects/bloodkart.png",
        live: "https://github.com/Rishangi-01/",
        github: "https://github.com/Rishangi-01/",
    },

    {
        title: "ThixIndia Business App",
        description: "Scalable commercial interface built to support business operations and product engagement.",
        tech: ["React", "Socket.io", "MongoDB"],
        image: "/images/projects/thixindia.png",
        live: "https://github.com/Rishangi-01/",
        github: "https://github.com/Rishangi-01/",
    },

    {
        title: "Portfolio & Creative Work",
        description: "Personal brand website featuring motion-rich sections and modern developer storytelling.",
        tech: ["Next.js", "Tailwind CSS"],
        image: "/images/projects/auth-system.jpg",
        live: "#contact",
        github: "https://github.com/Rishangi-01/",
    },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function ExperienceProjects() {
    const [experiences, setExperiences] = useState(fallbackExperiences);
    const [projects, setProjects] = useState(fallbackProjects);

    useEffect(() => {
        const loadExperiences = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/api/experience`,
                    { cache: "no-store" }
                );
                const payload = await response.json();

                if (response.ok && Array.isArray(payload.data)) {
                    setExperiences(payload.data.map(mapExperience));
                }
            } catch (error) {
                console.error("Unable to load experience", error);
            }
        };

        const loadProjects = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001"}/api/projects`,
                    { cache: "no-store" }
                );
                const payload = await response.json();

                if (response.ok && Array.isArray(payload.data) && payload.data.length > 0) {
                    setProjects(payload.data.map((project) => ({
                        ...project,
                        tech: project.technologies || [],
                        live: project.liveUrl || "#contact",
                        github: project.githubUrl || "#contact",
                    })));
                }
            } catch (error) {
                console.error("Unable to load projects", error);
            }
        };

        loadExperiences();
        loadProjects();
    }, []);

    return (
        <section
            id="experience"
            className="relative overflow-hidden py-16 sm:py-20 lg:py-8"
        >
            {/* Background glow */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        opacity: [0.15, 0.3, 0.15],
                        scale: [1, 1.12, 1],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-[120px]"
                />

                <motion.div
                    animate={{
                        opacity: [0.1, 0.25, 0.1],
                        scale: [1, 1.15, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2,
                    }}
                    className="absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[130px]"
                />
            </div>

            <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:gap-8 xl:gap-8">

                    {/* =================================================
              EXPERIENCE
          ================================================= */}

                    <ExperienceColumn experiences={experiences} />

                    {/* Vertical separator desktop */}
                    <div className="absolute left-[44%] top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-[var(--border)] to-transparent lg:block" />

                    {/* =================================================
              PROJECTS
          ================================================= */}

                    <ProjectsColumn projects={projects} />
                </div>
            </div>
        </section>
    );
}

/* =========================================================
   EXPERIENCE COLUMN
========================================================= */

function ExperienceColumn({ experiences }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="relative min-w-0"
        >
            {/* Section heading */}
            <div className="mb-8">
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-[var(--primary-light)]">
                    My Journey
                </p>

                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Experience
                </h2>
            </div>

            {/* FIXED HEIGHT EXPERIENCE AREA */}
            <OverlayScrollbarsComponent
                options={{
                    scrollbars: {
                        theme: "os-theme-custom",
                        autoHide: "leave",
                        autoHideDelay: 800,
                    },
                    overflow: {
                        x: "hidden",
                        y: "scroll",
                    },
                }}
                defer
                className="experience-scroll-area h-[590px] pr-5 sm:h-[600px]"
            >
                {/* Timeline */}
                <div className="relative ml-1 pb-8">
                    {/* Timeline line */}
                    <div className="absolute left-[24px] top-3 bottom-3 w-[2px] overflow-hidden">
                        <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: "100%" }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 1.8,
                                ease: "easeOut",
                            }}
                            className="h-full w-full bg-gradient-to-b from-purple-400 via-purple-500 to-purple-700"
                        />
                    </div>

                    {/* Experience Items */}
                    <div className="space-y-12">
                        {experiences.length === 0 ? (
                            <p className="pl-9 text-sm text-[var(--muted)]">Experience details will be added soon.</p>
                        ) : experiences.map((experience, index) => (
                            <ExperienceItem
                                key={`${experience.company}-${experience.year}`}
                                experience={experience}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </OverlayScrollbarsComponent>
        </motion.div>
    );
}

/* =========================================================
   EXPERIENCE ITEM
========================================================= */

function ExperienceItem({ experience, index }) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                x: -30,
            }}
            whileInView={{
                opacity: 1,
                x: 0,
            }}
            viewport={{
                once: true,
                amount: 0.25,
            }}
            transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="relative pl-9"
        >
            {/* Timeline Dot */}
            <motion.div
                initial={{
                    scale: 0,
                    opacity: 0,
                }}
                whileInView={{
                    scale: 1,
                    opacity: 1,
                }}
                viewport={{
                    once: true,
                    amount: 0.3,
                }}
                transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 14,
                    delay: index * 0.08,
                }}
                className="
          absolute
          left-0
          top-1.5
          z-10
          flex
          h-[50px]
          w-[50px]
          items-center
          justify-center
          rounded-full
          border-2
          border-purple-400
          bg-[var(--background)]
          shadow-[0_0_18px_rgba(168,85,247,0.7)]
        "
            >
                {/* <motion.span
                    animate={{
                        scale: [1, 1.35, 1],
                        opacity: [1, 0.7, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3,
                    }}
                    className="h-2 w-2 rounded-full bg-purple-400"
                /> */}
                {experience.logo ? (
                    <img src={experience.logo} alt={`${experience.company} logo`} className="img-fluid" />
                ) : (
                    <span className="text-sm font-bold text-purple-300">{experience.company?.charAt(0) || "E"}</span>
                )}
            </motion.div>

            {/* Year */}
            <div className="pl-[24px]">
                <p className="mb-2 text-base font-semibold text-[var(--primary-light)]">
                    {experience.year}
                </p>

                {/* Role + Company */}
                <div className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="text-lg font-bold">
                        {experience.role}
                    </h3>

                    <span className="hidden text-[var(--muted)] sm:inline">
                        |
                    </span>

                    {experience.href ? (
                        <a href={experience.href} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold hover:text-[var(--primary-light)]">
                            {experience.company}
                        </a>
                    ) : (
                        <span className="text-sm font-semibold">{experience.company}</span>
                    )}
                    {experience.current && <span className="text-sm font-semibold">(Current)</span>}
                </div>

                {/* Location */}
                {experience.location && (
                    <div className="mb-5 flex items-center gap-1.5 text-sm text-[var(--muted)]">
                        <MapPin size={14} />
                        <span>{experience.location}</span>
                    </div>
                )}

                {/* Responsibilities */}
                <ul className="space-y-2.5">
                    {experience.points.map((point, pointIndex) => (
                        <motion.li
                            key={point}
                            initial={{
                                opacity: 0,
                                x: -10,
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0,
                            }}
                            viewport={{
                                once: true,
                                amount: 0.3,
                            }}
                            transition={{
                                duration: 0.4,
                                delay: pointIndex * 0.07,
                            }}
                            className="
              flex
              items-start
              gap-3
              text-sm
              leading-6
              text-[var(--muted)]
              sm:text-[15px]
            "
                        >
                            {/* Bullet */}
                            <motion.span
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 15,
                                }}
                                className="
                mt-[9px]
                h-1.5
                w-1.5
                shrink-0
                rounded-full
                bg-purple-400
                shadow-[0_0_8px_rgba(168,85,247,0.8)]
              "
                            />

                            <span>{point}</span>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
}

/* =========================================================
   PROJECTS COLUMN
========================================================= */

function ProjectsColumn({ projects }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="xl:px-8 lg:px-8"
        >
            {/* Heading */}

            <div className="mb-8 flex items-end justify-between gap-4">
                <div>
                    <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-[var(--primary-light)]">
                        Featured Projects
                    </p>

                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        My Projects Work
                    </h2>
                </div>

                {/* <Link
                    href="/projects"
                    className="group hidden items-center gap-2 text-sm font-semibold text-[var(--primary-light)] transition-colors hover sm:flex"
                >
                    View All

                    <FaArrowRight
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                </Link> */}
            </div>

            {/* Projects */}

            <OverlayScrollbarsComponent
                options={{
                    scrollbars: {
                        theme: "os-theme-custom",
                        autoHide: "leave",
                        autoHideDelay: 800,
                    },
                    overflow: {
                        x: "scroll",
                        y: "scroll",
                    },
                }}
                defer
                className="experience-scroll-area h-[590px] px-2 sm:h-[600px] py-5"
            >

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.title}
                            project={project}
                            index={index}
                        />
                    ))}
                </div>

            </OverlayScrollbarsComponent>

            {/* Mobile view all */}

            <Link
                href="/projects"
                className="mt-7 flex w-fit items-center gap-2 text-sm font-semibold text-[var(--primary-light)] sm:hidden"
            >
                View All
                <FaArrowRight size={17} />
            </Link>
        </motion.div>
    );
}

/* =========================================================
   PROJECT CARD
========================================================= */

function ProjectCard({ project, index }) {
    return (
        <CometCard>
            <motion.article
                initial={{
                    opacity: 0,
                    y: 35,
                }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                }}
                viewport={{
                    once: true,
                    amount: 0.15,
                }}
                transition={{
                    duration: 0.55,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                    y: -7,
                }}
                className="group relative overflow-hidden rounded-2xl border border-[var(--border)] p-2 shadow-[0_8px_35px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-colors duration-300 hover:border-purple-500/50"
            >
                {/* Animated glow */}

                <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-transparent to-blue-500/20 blur-xl" />
                </div>

                {/* Image */}

                <div className="relative z-10 overflow-hidden rounded-xl border border-[var(--border)] bg-black/10">
                    <div className="relative aspect-[1.85/1] overflow-hidden">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            unoptimized
                            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                        />

                        {/* Image overlay */}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-80" />

                        {/* Open icon */}

                        <div className="absolute right-3 top-3 flex h-8 w-8 translate-y-[-5px] items-center justify-center rounded-full border border-white/20 bg-black/40 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                            <ExternalLink size={14} />
                        </div>
                    </div>
                </div>

                {/* Content */}

                <div className="relative z-10 px-2 pb-1 pt-4">
                    <h3 className="text-base font-bold transition-colors duration-300 group-hover:text-[var(--primary-light)]">
                        {project.title}
                    </h3>

                    {/* Technology */}

                    <div className="mt-2 flex min-h-[36px] flex-wrap items-center gap-x-1.5 gap-y-1">
                        {project.tech.map((tech, techIndex) => (
                            <span
                                key={tech}
                                className="text-[11px] font-medium text-[var(--muted)]"
                            >
                                {tech}
                                {techIndex !== project.tech.length - 1 && (
                                    <span className="ml-1.5 text-[var(--border)]">•</span>
                                )}
                            </span>
                        ))}
                    </div>

                    {/* Buttons */}

                    <div className="mt-4 flex gap-2">
                        <ProjectButton
                            href={project.live}
                            icon={<ExternalLink size={14} />}
                            primary
                        >
                            <span className="text-nowrap">Live Demo</span>
                        </ProjectButton>

                        <ProjectButton
                            href={project.github}
                            icon={<FaGithub size={15} />}
                        >
                            GitHub
                        </ProjectButton>
                    </div>
                </div>
            </motion.article>
        </CometCard>
    );
}

/* =========================================================
   PROJECT BUTTON
========================================================= */

function ProjectButton({
    href,
    children,
    icon,
    primary = false,
}) {
    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={[
                "group/button inline-flex h-9 items-center justify-center gap-1 rounded-full px-3 text-xs font-semibold transition-all duration-300",
                primary
                    ? "bg-gradient-to-r from-purple-600 to-violet-500 text-white shadow-[0_0_20px_rgba(124,58,237,0.25)] hover:from-purple-500 hover:to-violet-400 hover:shadow-[0_0_28px_rgba(124,58,237,0.45)]"
                    : "border border-blue-500/60 bg-transparent hover:border-purple-400 hover:bg-purple-500/10",
            ].join(" ")}
        >
            {children}

            <span className="transition-transform duration-300 group-hover/button:translate-x-0.5">
                {icon}
            </span>
        </Link>
    );
}   