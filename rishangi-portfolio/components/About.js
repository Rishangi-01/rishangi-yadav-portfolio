"use client";

import { FaArrowRight, FaBox, FaDatabase, FaFigma, FaGithub, FaGlobe, FaPalette, FaServer, FaStar, FaTrophy, FaWrench } from "react-icons/fa";
import { IoIosGitBranch, IoIosSend } from "react-icons/io";
import { IoShieldCheckmark } from "react-icons/io5";
import { LuBraces, LuBriefcaseBusiness, LuFileCode2 } from "react-icons/lu";
import { MdOutlineQrCode2 } from "react-icons/md";

const stats = [
  {
    icon: LuBriefcaseBusiness,
    value: "2+",
    label: "Years Experience",
  },
  {
    icon: FaTrophy,
    value: "10+",
    label: "Projects Completed",
  },
  {
    icon: FaStar,
    value: "MERN",
    label: "Stack Developer",
  },
];

const skillGroups = [
  {
    title: "Frontend",
    icon: MdOutlineQrCode2,
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-400",
    skills: [
      { name: "React.js", icon: LuBraces, color: "text-cyan-400" },
      { name: "JavaScript", icon: LuFileCode2, color: "text-yellow-400" },
      { name: "HTML5", icon: FaGlobe, color: "text-orange-500" },
      { name: "CSS3", icon: FaPalette, color: "text-blue-500" },
      { name: "Tailwind CSS", icon: MdOutlineQrCode2, color: "text-cyan-400" },
      { name: "Bootstrap", icon: FaBox, color: "text-purple-500" },
    ],
  },
  {
    title: "Backend",
    icon: FaServer,
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
    skills: [
      { name: "Node.js", icon: FaServer, color: "text-green-500" },
      { name: "Express.js", icon: FaServer, color: "text-gray-300" },
      { name: "REST API", icon: FaGlobe, color: "text-gray-300" },
      { name: "JWT Authentication", icon: IoShieldCheckmark, color: "text-gray-300" },
    ],
  },
  {
    title: "Database",
    icon: FaDatabase,
    iconBg: "bg-indigo-500/15",
    iconColor: "text-indigo-400",
    skills: [
      { name: "MongoDB", icon: FaDatabase, color: "text-green-500" },
      { name: "MySQL", icon: FaDatabase, color: "text-cyan-400" },
    ],
  },
  {
    title: "Tools",
    icon: FaWrench,
    iconBg: "bg-purple-500/15",
    iconColor: "text-purple-400",
    skills: [
      { name: "Git", icon: IoIosGitBranch, color: "text-red-400" },
      { name: "GitHub", icon: FaGithub, color: "text-white" },
      { name: "VS Code", icon: MdOutlineQrCode2, color: "text-blue-400" },
      { name: "Postman", icon: IoIosSend, color: "text-orange-400" },
      { name: "Figma", icon: FaFigma, color: "text-pink-400" },
    ],
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden  px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[var(--primary)]/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[var(--primary-light)]/10 blur-[130px]" />

      <div className="relative mx-auto max-w-8xl lg:px-8">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-11 xl:gap-6">

          <div className="col-span-6 animate-about xl:flex lg:flex flex gap-5">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_180px] lg:grid-cols-[1fr_185px]">

              <div className="order-2 md:order-1">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[var(--primary-light)]">
                  About Me
                </p>

                <h2 className="mb-5 mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                  Who I Am
                </h2>

                <p className="max-w-xl text-[15px] leading-7 text-[var(--muted)]">
                  I&apos;m a passionate MERN Stack developer with 2+ years of experience creating modern, scalable, and user-friendly web applications. I love solving problems, learning new technologies, and creating products that make an impact.
                </p>

                <a
                  href="#experience"
                  className="group mt-7 inline-flex items-center gap-3 rounded-full border border-[var(--primary)] px-6 py-2.5 text-sm font-semibold transition-all duration-300 hover:bg-[var(--primary)] hover:shadow-[0_0_25px_rgba(139,92,246,0.35)]"
                >
                  View My Work
                  <FaArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </div>

              <div className="order-1 flex justify-center md:order-2 md:justify-end">
                <div className="profile-image-wrapper relative">
                  <div className="absolute inset-0 rounded-xl bg-[var(--primary)]/20 blur-2xl" />

                  <div className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-2xl" style={{ height: "100%" }}>
                    <img
                      src="/images/profile.png"
                      alt="Profile"
                      width={185}
                      height={330}
                      className="h-[280px] w-[175px] object-cover transition duration-700 hover:scale-105 sm:h-[320px]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="stat-card group flex min-h-[45px] items-center gap-5 rounded-xl border border-[var(--border-light)] px-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)]/60 hover:shadow-[0_10px_35px_rgba(139,92,246,0.12)]"
                    style={{
                      animationDelay: `${index * 120}ms`,
                    }}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--primary)]/60 bg-[var(--primary)]/5 text-[var(--primary-light)] transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
                      <Icon size={22} />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold sm:text-2xl">
                        {stat.value}
                      </h3>
                      <p className="text-sm text-[var(--muted)]">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="col-span-5 animate-skills">
            <div className="mb-7">
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-[var(--primary-light)]">
                My Skills
              </p>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Tech Stack
              </h2>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {skillGroups.map((group, groupIndex) => {
                const GroupIcon = group.icon;

                return (
                  <div
                    key={group.title}
                    className="skill-card group relative overflow-hidden rounded-xl border border-[var(--border)] py-5 px-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-[var(--primary)]/60 hover:shadow-[0_15px_40px_rgba(139,92,246,0.12)]"
                    style={{
                      animationDelay: `${groupIndex * 100}ms`,
                    }}
                  >
                    <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[var(--primary)]/10 blur-3xl transition-all duration-500 group-hover:bg-[var(--primary)]/20" />

                    <div className="relative mb-3 flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg ${group.iconBg} ${group.iconColor}`}
                      >
                        <GroupIcon size={19} />
                      </div>

                      <h4 className="font-semibold">{group.title}</h4>
                    </div>

                    <div className="relative space-y-2">
                      {group.skills.map((skill) => {
                        const SkillIcon = skill.icon;

                        return (
                          <div
                            key={skill.name}
                            className="flex items-center gap-3 text-sm transition-all duration-300 hover:translate-x-1"
                          >
                            <SkillIcon
                              size={18}
                              className={`shrink-0 ${skill.color}`}
                            />

                            <span>{skill.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}