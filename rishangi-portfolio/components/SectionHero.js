"use client";

import {
  ArrowDown,
  ArrowUpRight,
  Download,
  Code2,
  Database,
  Smartphone,
  Globe,
} from "lucide-react";

import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";

import { motion } from "motion/react";
import { useState } from "react";

export default function SectionHero() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const socials = [
    {
      icon: FaGithub,
      href: "https://github.com/Rishangi-01/",
      label: "GitHub",
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/rishangi-yadav-webdeveloper/",
      label: "LinkedIn",
    },
    {
      icon: FaEnvelope,
      href: "mailto:rishangiyadav007@gmail.com",
      label: "Email",
    },
    {
      icon: FaWhatsapp,
      href: "https://wa.me/9115203477",
      label: "WhatsApp",
    },
  ];

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    setPointer({ x, y });
  };

  return (
    <section
      id="home"
      onMouseMove={handlePointerMove}
      className="hero-section relative flex min-h-screen items-center overflow-hidden px-5 pt-24 transition-colors duration-500 sm:px-8 lg:px-5"
    >
      {/* Background */}
      {/* <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <motion.div
          animate={{
            x: pointer.x * 26,
            y: pointer.y * 18,
            scale: 1.06,
          }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 18,
            mass: 0.7,
          }}
          className="absolute inset-[-8%]"
        >
          <div className="hero-grid absolute inset-0 opacity-80" />
        </motion.div>

        <motion.div
          animate={{
            x: -pointer.x * 38,
            y: -pointer.y * 26,
            scale: 1.12,
          }}
          transition={{
            type: "spring",
            stiffness: 75,
            damping: 18,
            mass: 0.6,
          }}
          className="absolute inset-[-12%]"
        >
          <div className="hero-grid hero-grid--secondary absolute inset-0 opacity-60" />
        </motion.div>

        <motion.div
          animate={{
            x: pointer.x * 120,
            y: pointer.y * 90,
          }}
          transition={{
            type: "spring",
            stiffness: 90,
            damping: 18,
            mass: 0.6,
          }}
          className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(96,165,250,0.18),_rgba(147,197,253,0.07)_35%,_transparent_70%)] blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -25, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 top-32 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[130px]"
        />

        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-40 bottom-10 h-[550px] w-[550px] rounded-full bg-blue-600/10 blur-[140px]"
        />

        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--hero-bg)] to-transparent" />
      </div> */}

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-4">
        {/* =====================================================
            LEFT CONTENT
        ===================================================== */}

        <div className="relative z-10">
          {/* Small intro */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-4 text-lg font-medium text-[var(--hero-muted)] sm:text-xl"
          >
            Hello, I'm
          </motion.div>

          {/* Name */}

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: "easeOut",
            }}
            className="text-[46px] font-bold leading-[1.05] tracking-[-2px] text-[var(--hero-text)] sm:text-6xl md:text-7xl lg:text-[64px] xl:text-[72px]"
          >
            Rishangi{" "}
            <span className="hero-gradient-text">
              Yadav
            </span>
          </motion.h1>

          {/* Role */}

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.25,
            }}
            className="mt-5 text-[25px] font-semibold text-[var(--hero-text)] sm:text-3xl"
          >
            MERN Stack Developer
          </motion.h2>

          {/* Description */}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.4,
            }}
            className="mt-5 max-w-[540px] text-[16px] leading-7 text-[var(--muted)] sm:text-lg"
          >
            Building digital experiences that are fast,
            <br className="hidden sm:block" />
            scalable & user-focused.
          </motion.p>

          {/* Tech stack */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.55,
            }}
            className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-4"
          >
            <TechItem
              type="react"
              name="React"
            />

            <TechItem
              type="node"
              name="Node.js"
            />

            <TechItem
              type="express"
              name="Express.js"
            />

            <TechItem
              type="mongo"
              name="MongoDB"
            />
          </motion.div>

          {/* Buttons */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.7,
            }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <motion.a
              href="#projects"
              whileHover={{
                scale: 1.04,
                y: -3,
              }}
              whileTap={{ scale: 0.96 }}
              className="hero-primary-button group flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300"
            >
              View My Projects

              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </motion.a>

            <motion.a
              href="/Rishangi-Yadav-Resume.pdf"
              download="Rishangi-Yadav-Resume.pdf"
              whileHover={{
                scale: 1.04,
                y: -3,
              }}
              whileTap={{ scale: 0.96 }}
              className="hero-outline-button group flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300"
            >
              Download CV

              <Download
                size={18}
                className="transition-transform duration-300 group-hover:translate-y-1"
              />
            </motion.a>
          </motion.div>

          {/* Social icons */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.9,
            }}
            className="mt-7 flex items-center gap-5"
          >
            {socials.map(
              ({ icon: Icon, href, label }, index) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={
                    href.startsWith("http")
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 1 + index * 0.08,
                  }}
                  whileHover={{
                    scale: 1.2,
                    y: -5,
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                  className="hero-social flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-300"
                >
                  <Icon size={21} />
                </motion.a>
              )
            )}
          </motion.div>
        </div>

        {/* =====================================================
            RIGHT IMAGE
        ===================================================== */}

        <div className="relative mx-auto flex h-[510px] w-full max-w-[570px] items-center justify-center lg:h-[100%]">
          
          <img
            src="/images/hero.png"
            alt="Rishangi Yadav"
            className="h-full w-full object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
          />

        </div>
      </div>

      {/* Scroll indicator */}

      <motion.a
        href="#about"
        animate={{
          y: [0, 7, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.1,
        }}
        className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center text-xs text-[var(--hero-muted)] transition-colors hover:text-purple-400"
      >
        <span className="mb-1">
          Scroll Down
        </span>

        <ArrowDown size={17} />
      </motion.a>
    </section>
  );
}

function TechItem({ type, name }) {
  const icons = {
    react: (
      <span className="text-[40px] text-cyan-400">
        ⚛
      </span>
    ),

    node: (
      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#79c83d] text-[11px] font-bold text-[#17240e]">
        ⬡
      </span>
    ),

    express: (
      <span className="text-[24px] font-bold text-[var(--hero-text)]">
        EX
      </span>
    ),

    mongo: (
      <span className="text-[40px] text-green-500">
        ♦
      </span>
    ),
  };

  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.04,
      }}
      className="flex cursor-default items-center gap-2 transition-all"
    >
      {icons[type]}

      <span className="text-md font-medium text-[var(--hero-muted)]">
        {name}
      </span>
    </motion.div>
  );
}


function FloatingCard({
  icon,
  text,
  className,
  delay,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -10, 0],
      }}
      transition={{
        opacity: {
          duration: 0.6,
          delay,
        },
        scale: {
          duration: 0.6,
          delay,
        },
        y: {
          duration: 3.5,
          repeat: Infinity,
          delay,
          ease: "easeInOut",
        },
      }}
      whileHover={{
        scale: 1.08,
        y: -6,
      }}
      className={`hero-floating-card absolute z-30 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium shadow-xl backdrop-blur-xl ${className}`}
    >
      <span className="text-purple-400">
        {icon}
      </span>

      <span>{text}</span>
    </motion.div>
  );
}