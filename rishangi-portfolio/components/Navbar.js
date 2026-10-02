"use client";

import { useState } from "react";
import {
  Code2,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";

import { motion, AnimatePresence } from "motion/react";

import ThemeToggle from "./ThemeToggle";

const navItems = [
  "Home",
  "About",
  "Skills",
  "Experience",
  "Projects",
  "Education",
  "Services",
  "Contact",
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToSection = (item) => {
    const id = item.toLowerCase();

    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });

    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}
        className="fixed left-0 top-0 z-50 w-full border-b border-slate-800/60 bg-[#050816]/80 backdrop-blur-xl dark:bg-[#050816]/80"
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">

          {/* Logo */}

          <motion.button
            onClick={() => scrollToSection("Home")}
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-3"
          >
            <motion.div
              animate={{
                rotate: [0, -5, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatDelay: 3,
              }}
              className="text-purple-500"
            >
              <Code2 size={34} strokeWidth={2.5} />
            </motion.div>

            <span className="text-xl font-semibold tracking-wide text-white">
              Rishangi
            </span>
          </motion.button>

          {/* Desktop Navigation */}

          <nav className="hidden items-center gap-7 lg:flex">

            {navItems.map((item, index) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item)}
                initial={{
                  opacity: 0,
                  y: -15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.07,
                  duration: 0.4,
                }}
                whileHover={{
                  y: -2,
                }}
                className="group relative text-[14px] font-medium text-slate-300 transition-colors duration-300 hover:text-white"
              >
                {item}

                <span className="absolute -bottom-2 left-0 h-[2px] w-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full" />
              </motion.button>
            ))}

          </nav>

          {/* Right side */}

          <div className="hidden items-center gap-3 lg:flex">

            <motion.a
              href="#contact"
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 0 30px rgba(139,92,246,0.45)",
              }}
              whileTap={{
                scale: 0.96,
              }}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Hire Me
              <ArrowUpRight size={16} />
            </motion.a>

            <ThemeToggle />

          </div>

          {/* Mobile buttons */}

          <div className="flex items-center gap-2 lg:hidden">

            <ThemeToggle />

            <button
              onClick={() =>
                setMobileOpen(!mobileOpen)
              }
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-white"
            >
              {mobileOpen ? (
                <X size={21} />
              ) : (
                <Menu size={21} />
              )}
            </button>

          </div>

        </div>

        {/* Mobile menu */}

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              className="overflow-hidden border-t border-slate-800/60 bg-[#050816]"
            >
              <nav className="flex flex-col px-6 py-5">

                {navItems.map((item, index) => (
                  <motion.button
                    key={item}
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: index * 0.05,
                    }}
                    onClick={() =>
                      scrollToSection(item)
                    }
                    className="border-b border-slate-800/60 py-4 text-left text-sm font-medium text-slate-300 hover:text-purple-400"
                  >
                    {item}
                  </motion.button>
                ))}

              </nav>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.header>
    </>
  );
}