"use client";

import React, { useEffect, useRef, useState } from "react";

import {
  Calculator,
  Palette,
  LayoutDashboard,
  Package,
  NotepadText,
  Bot,
  Zap,
} from "lucide-react";

import { motion } from "motion/react";
import { FaDatabase, FaFigma, FaServer } from "react-icons/fa";

const services = [
  {
    title: "Frontend Development",
    description:
      "Creating fast, responsive interfaces with React and Next.js that feel smooth, polished, and easy to use on every screen size.",
    icon: LayoutDashboard,
    tags: [
      "Responsive UI",
      "Component Design",
      "State Management",
      "Performance Tuning",
    ],
    color: "dark",
    rotate: 0,
  },

  {
    title: "Backend APIs",
    description:
      "Building clean, secure APIs with Node.js and Express for real business workflows, data handling, and scalable product logic.",
    icon: FaServer,
    tags: [
      "REST APIs",
      "Auth Flow",
      "CRUD Logic",
      "Data Validation",
    ],
    color: "pink",
    rotate: -3,
  },

  {
    title: "Database Architecture",
    description:
      "Designing practical database models and queries for MongoDB that support performance, reliability, and future growth.",
    icon: FaDatabase,
    tags: [
      "MongoDB Design",
      "Schema Planning",
      "Indexing",
      "Optimization",
    ],
    color: "dark",
    rotate: 3,
  },

  {
    title: "Web Product Delivery",
    description:
      "Turning product requirements into working experiences by combining UX thinking, code quality, and deployment readiness.",
    icon: Package,
    tags: [
      "UI/UX Collaboration",
      "Bug Fixing",
      "Deployment",
      "Maintenance",
    ],
    color: "pink",
    rotate: -4,
  },
];

const tools = [
  {
    name: "React",
    icon: <span className="font-black text-[18px]">R</span>,
  },
  {
    name: "Next.js",
    icon: <span className="font-black text-[17px]">N</span>,
  },
  {
    name: "Node.js",
    icon: <Zap size={22} />,
  },
  {
    name: "MongoDB",
    icon: <FaDatabase size={23} />,
  },
  {
    name: "GitHub",
    icon: <Bot size={23} />,
  },
  {
    name: "Tailwind",
    icon: <span className="text-[22px]">T</span>,
  },
  {
    name: "Postman",
    icon: <NotepadText size={22} />,
  },
];

export default function ServicesSection() {
  const sectionRef = useRef(null);

  const [activeCard, setActiveCard] = useState(0);

  const animatingRef = useRef(false);

  /*
   * ============================================
   * CARD SCROLL CONTROLLER
   * ============================================
   */

  useEffect(() => {
    const handleWheel = (event) => {
      const section = sectionRef.current;

      if (!section) return;

      const rect = section.getBoundingClientRect();

      /*
       * Section must be at the top of viewport.
       *
       * Small tolerance is intentional because
       * browser/device wheel scrolling can move
       * by a few pixels.
       */
      const sectionIsActive =
        rect.top <= 2 &&
        rect.bottom >= window.innerHeight - 2;

      if (!sectionIsActive) {
        return;
      }

      /*
       * Ignore tiny wheel movement.
       */
      if (Math.abs(event.deltaY) < 8) {
        return;
      }

      /*
       * ============================================
       * SCROLL DOWN
       * ============================================
       */

      if (event.deltaY > 0) {
        /*
         * More cards are available.
         *
         * STOP browser page scrolling.
         */
        if (activeCard < services.length - 1) {
          event.preventDefault();

          if (animatingRef.current) {
            return;
          }

          animatingRef.current = true;

          setActiveCard((current) =>
            Math.min(
              current + 1,
              services.length - 1
            )
          );

          setTimeout(() => {
            animatingRef.current = false;
          }, 700);

          return;
        }

        /*
         * ======================================
         * LAST CARD
         * ======================================
         *
         * We intentionally DO NOT call
         * preventDefault().
         *
         * Browser now continues to next
         * section normally.
         */

        return;
      }

      /*
       * ============================================
       * SCROLL UP
       * ============================================
       */

      if (event.deltaY < 0) {
        /*
         * Previous card available.
         *
         * Stop browser page movement.
         */
        if (activeCard > 0) {
          event.preventDefault();

          if (animatingRef.current) {
            return;
          }

          animatingRef.current = true;

          setActiveCard((current) =>
            Math.max(current - 1, 0)
          );

          setTimeout(() => {
            animatingRef.current = false;
          }, 700);

          return;
        }

        /*
         * First card.
         *
         * Allow normal browser scrolling
         * to previous section.
         */
        return;
      }
    };

    window.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: false,
      }
    );

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel
      );
    };
  }, [activeCard]);

  return (
    /*
     * IMPORTANT:
     *
     * This must be TALL.
     *
     * The sticky viewport stays visible while
     * the section owns the scrolling space.
     */
    <section
      ref={sectionRef}
      id="services"
      className="
        relative
        h-[200vh]
        w-full
      "
    >
      {/*
       * ==========================================
       * STICKY VIEWPORT
       * ==========================================
       *
       * This is what makes the complete UI stay
       * in place while cards change.
       */}

      <div
        className="
          sticky
          top-0
          flex
          h-[200vh]
          w-full
          items-center
          overflow-hidden
        "
      >
        <div
          className="
            mx-auto
            h-full
            w-full
            max-w-[1400px]
            px-5
            sm:px-8
            lg:px-12
          "
        >
          <div
            className="
              grid
              h-full
              grid-cols-1
              items-center
              gap-10

              lg:grid-cols-[0.9fr_1.1fr]
              lg:gap-20
            "
          >
            {/* =================================
                LEFT CONTENT
            ================================= */}

            <div
              className="
                relative
                z-30
                flex
                flex-col
                justify-center
              "
            >
              <motion.h2
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.7,
                }}
                className="
                  max-w-[580px]
                  text-[48px]
                  font-bold
                  leading-[0.98]
                  tracking-[-0.055em]
                  sm:text-[60px]
                  lg:text-[72px]
                "
              >
                What I help
                <br />

                you to{" "}

                <span className="text-[var(--primary)]">
                  Shape...
                </span>
              </motion.h2>

              {/* Tools */}

              <div className="mt-14">
                <p
                  className="
                    mb-5
                    text-[18px]
                    text-[var(--muted)]
                  "
                >
                  Tools that I use
                </p>

                <div
                  className="
                    flex
                    max-w-[600px]
                    flex-wrap
                    gap-2.5
                  "
                >
                  {tools.map(
                    (tool, index) => (
                      <motion.div
                        key={tool.name}
                        initial={{
                          opacity: 0,
                          y: 20,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          delay:
                            index * 0.08,
                          duration: 0.45,
                        }}
                        whileHover={{
                          y: -7,
                          scale: 1.06,
                        }}
                        className="
                          group
                          relative
                          flex
                          h-[76px]
                          w-[76px]
                          cursor-pointer
                          items-center
                          justify-center
                          rounded-[14px]
                          border
                          border-[var(--border)]
                          bg-[var(--card)]
                          shadow-sm
                          transition-all
                          duration-300
                          hover:border-[var(--primary)]
                          hover:shadow-[0_0_25px_rgba(124,58,237,0.2)]
                          text-[var(--muted)]
                        "
                      >
                        {tool.icon}

                        <span
                          className="
                            pointer-events-none
                            absolute
                            -top-11
                            left-1/2
                            -translate-x-1/2
                            whitespace-nowrap
                            rounded-full
                            border
                            px-3
                            py-1.5
                            text-xs
                            font-medium
                            opacity-0
                            shadow-lg
                            transition-all
                            duration-200
                            group-hover:-translate-y-1
                            group-hover:opacity-100
                          "
                        >
                          {tool.name}
                        </span>
                      </motion.div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* =================================
                RIGHT CARD STACK
            ================================= */}

            <div
              className="
                relative
                z-20
                flex
                h-[min(500px,calc(100vh-150px))]
                max-h-[350px]
                w-full
                items-center
                justify-center
              "
            >
              <div
                className="
                  relative
                  h-full
                  w-full
                  max-w-[550px]
                "
              >
                {services.map(
                  (service, index) => {
                    const Icon =
                      service.icon;

                    const isActive =
                      index === activeCard;

                    const isBehind =
                      index < activeCard;

                    const isFuture =
                      index > activeCard;

                    return (
                      <motion.div
                        key={service.title}
                        className="
                          absolute
                          inset-0
                        "
                        style={{
                          zIndex:
                            index + 10,
                        }}
                        initial={false}
                        animate={{
                          /*
                           * Future cards stay
                           * below the viewport.
                           */
                          y: isFuture
                            ? "115%"
                            : "0%",

                          /*
                           * Previous cards remain
                           * underneath.
                           */
                          scale: isBehind
                            ? 0.965
                            : 1,

                          /*
                           * Slight tilt on cards
                           * underneath.
                           */
                          rotate:
                            isActive
                              ? 0
                              : service.rotate,

                          opacity: 1,
                        }}
                        transition={{
                          duration: 0.7,
                          ease: [
                            0.22,
                            1,
                            0.36,
                            1,
                          ],
                        }}
                      >
                        <div
                          className={`
                            relative
                            h-full
                            w-full
                            overflow-hidden
                            rounded-[24px]
                            border
                            p-7
                            shadow-[0_25px_70px_rgba(15,23,42,0.18)]

                            sm:p-8
                            lg:p-9

                            ${
                              service.color ===
                              "pink"
                                ? `
                                  border-[var(--primary)]/60
                                  bg-[linear-gradient(135deg,var(--primary),#ec4899)]
                                  text-white
                                `
                                : `
                                  border-[var(--border)]
                                  bg-[var(--card)]
                                  text-[var(--foreground)]
                                `
                            }
                          `}
                        >
                          {/* Card Header */}

                          <div
                            className="
                              flex
                              items-center
                              gap-4
                            "
                          >
                            <div
                              className={`
                                flex
                                h-11
                                w-11
                                shrink-0
                                items-center
                                justify-center

                                ${
                                  service.color ===
                                  "pink"
                                    ? "text-white"
                                    : "text-[var(--primary)]"
                                }
                              `}
                            >
                              <Icon
                                size={30}
                                strokeWidth={1.8}
                              />
                            </div>

                            <h3
                              className="
                                text-[26px]
                                font-bold
                                tracking-[-0.04em]

                                sm:text-[29px]
                                lg:text-[32px]
                              "
                            >
                              {
                                service.title
                              }
                            </h3>
                          </div>

                          {/* Description */}

                          <p
                            className={`
                              mt-7
                              max-w-[600px]
                              text-[17px]
                              leading-[1.45]

                              sm:text-[18px]
                              lg:text-[20px]

                              ${
                                service.color ===
                                "pink"
                                  ? "text-white/90"
                                  : "text-[var(--muted)]"
                              }
                            `}
                          >
                            {
                              service.description
                            }
                          </p>

                          {/* Tags */}

                          <div
                            className="
                              mt-8
                              flex
                              flex-wrap
                              gap-2.5
                            "
                          >
                            {service.tags.map(
                              (tag) => (
                                <motion.div
                                  key={tag}
                                  whileHover={{
                                    y: -3,
                                    scale: 1.04,
                                  }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 20,
                                  }}
                                  className={`
                                    rounded-full
                                    border
                                    px-4
                                    py-2
                                    text-[14px]
                                    font-medium

                                    ${
                                      service.color ===
                                      "pink"
                                        ? `
                                          border-white/50
                                          text-white
                                        `
                                        : `
                                          border-[var(--border)]
                                          bg-[var(--card)]
                                        `
                                    }
                                  `}
                                >
                                  {tag}
                                </motion.div>
                              )
                            )}
                          </div>

                          {/* Decorative glow */}

                          <div
                            className={`
                              pointer-events-none
                              absolute
                              -bottom-32
                              -right-32
                              h-72
                              w-72
                              rounded-full
                              blur-[100px]

                              ${
                                service.color ===
                                "pink"
                                  ? "bg-white/10"
                                  : "bg-[var(--primary)]/10"
                              }
                            `}
                          />
                        </div>
                      </motion.div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}