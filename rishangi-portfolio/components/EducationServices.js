"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { CometCard } from "@/components/ui/comet-card";

import {
  GraduationCap,
  School,
  Code2,
  Server,
  Database,
  MonitorSmartphone,
  LockKeyhole,
  Cloud,
  ArrowUpRight,
  ExternalLink,
  Award,
} from "lucide-react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { FaLaptop, FaShoppingCart, FaUsers } from "react-icons/fa";
import { IoLayers } from "react-icons/io5";
import { fetchPortfolioData } from "@/lib/api";

const serviceIcons = {
  Code2,
  Server,
  Database,
  MonitorSmartphone,
  LockKeyhole,
  Cloud,
  Laptop: FaLaptop,
  ShoppingCart: FaShoppingCart,
  Users: FaUsers,
  Layers: IoLayers,
};

const serviceColors = ["purple", "pink", "green", "cyan", "teal"];


export default function EducationServices() {
  const [education, setEducation] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    let active = true;

    fetchPortfolioData("/api/education").then((records) => {
      if (active) setEducation(Array.isArray(records) ? records : []);
    }).catch(() => {
      if (active) setEducation([]);
    });

    fetchPortfolioData("/api/certifications").then((records) => {
      if (active) setCertifications(Array.isArray(records) ? records : []);
    }).catch(() => {
      if (active) setCertifications([]);
    });

    fetchPortfolioData("/api/services").then((records) => {
      if (active) setServices(Array.isArray(records) ? records : []);
    }).catch(() => {
      if (active) setServices([]);
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section
      id="education"
      className="relative overflow-hidden border-y border-[var(--border)] py-16 sm:py-20 lg:py-24"
    >

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -20, 0],
            opacity: [0.08, 0.18, 0.08],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-purple-600 blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 25, 0],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-blue-600 blur-[130px]"
        />
      </div>


      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.45fr_0.9fr]">


          <EducationColumn education={education} />


          <ServicesColumn services={services} />


          <CertificationColumn certifications={certifications} />

        </div>
      </div>
    </section>
  );
}


function EducationColumn({ education }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="border-b border-[var(--border)] pb-12 lg:border-b-0 lg:border-r lg:pr-8 lg:pb-0 xl:pr-10"
    >

      <SectionHeading
        eyebrow="Education"
        title="My Education"
      />


      <div className="relative mt-8 ml-1">

        <div className="absolute left-[23px] top-7 bottom-7 w-[2px] overflow-hidden">
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{
              duration: 1.4,
              ease: "easeOut",
            }}
            className="w-full bg-gradient-to-b from-purple-500 via-blue-500 to-purple-500"
          />
        </div>

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
          className="experience-scroll-area h-[390px] pr-5 sm:h-[400px]"
        >
          <div className="space-y-12">
            {education.map((item, index) => (
              <EducationItem
                key={item._id}
                item={item}
                index={index}
              />
            ))}
          </div>
        </OverlayScrollbarsComponent>

      </div>
    </motion.div>
  );
}


function EducationItem({ item, index }) {
  const Icon = /secondary|school|high school/i.test(item.degree) ? School : GraduationCap;
  const dateRange = [formatEducationDate(item.startDate), item.endDate ? formatEducationDate(item.endDate) : "Present"]
    .filter(Boolean)
    .join(" – ");

  return (
    <motion.div
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
        amount: 0.3,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
      }}
      className="relative flex gap-5"
    >

      <motion.div
        whileHover={{
          scale: 1.08,
          rotate: 3,
        }}
        className="relative z-10 flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border border-blue-500/60 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
      >
        <Icon
          size={25}
          strokeWidth={1.7}
          className="text-blue-400"
        />
      </motion.div>


      <div className="pt-1">
        <h3 className="text-[15px] font-bold leading-6 sm:text-base">
          {item.degree}
        </h3>

        <p className="mt-1 text-sm font-medium">
          {item.institution}
        </p>

        {item.location && <p className="mt-1 text-sm">{item.location}</p>}

        {dateRange && <p className="mt-1.5 text-sm">{dateRange}</p>}

        {item.description && <p className="mt-2 text-sm leading-6">{item.description}</p>}
      </div>
    </motion.div>
  );
}


function ServicesColumn({ services }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="border-b border-[var(--border)] py-12 lg:border-b-0 lg:border-r lg:px-7 xl:px-8"
    >
      <SectionHeading
        eyebrow="Services"
        title="What I Can Do"
      />


      {services.length === 0 ? (
        <p className="mt-7 text-sm text-(--muted)">No services published yet.</p>
      ) : (
        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service._id}
              service={service}
              index={index}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}


function ServiceCard({ service, index }) {
  const Icon = serviceIcons[service.icon] || Code2;
  const color = serviceColors[index % serviceColors.length];

  return (
    <CometCard>
      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.45,
          delay: index * 0.08,
        }}
        whileHover={{
          y: -5,
        }}
        className="group relative overflow-hidden rounded-xl border border-[var(--border)] p-4 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_12px_35px_rgba(124,58,237,0.12)]"
      >

        <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-purple-500/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />


        <motion.div
          whileHover={{
            scale: 1.08,
            rotate: -4,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
          }}
          className={`
          relative mb-3 flex h-9 w-9 items-center justify-center
          rounded-lg shadow-lg
          ${getIconColor(color)}
        `}
        >
          <Icon
            size={19}
            strokeWidth={1.8}
            className="text-white"
          />
        </motion.div>


        <h3 className="relative text-sm font-bold">
          {service.title}
        </h3>


        <p className="relative mt-1.5 text-[11px] leading-[1.45] sm:text-xs">
          {service.description}
        </p>

        {service.features?.length > 0 && (
          <ul className="relative mt-2 space-y-1 text-[11px] leading-[1.45] text-(--muted)">
            {service.features.map((feature, featureIndex) => (
              <li key={`${service._id}-${featureIndex}`}>{feature}</li>
            ))}
          </ul>
        )}


        <motion.div
          initial={{ width: 0 }}
          whileHover={{ width: "45%" }}
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-purple-500 to-blue-500"
        />
      </motion.div>
    </CometCard>
  );
}


function CertificationColumn({ certifications }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="pt-12 lg:pl-7 lg:pt-0 xl:pl-8"
    >
      <SectionHeading
        eyebrow="Certifications"
        title="My Certificates"
      />

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
        className="experience-scroll-area h-[390px] pr-5 sm:h-[400px]"
      >

        <div className="space-y-4">
          {certifications.length === 0 ? (
            <p className="mt-7 text-sm text-[var(--muted)]">No certificates published yet.</p>
          ) : certifications.map((certification, index) => (
            <CometCard key={certification._id}>
              <motion.article
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-xl border border-[var(--border)] p-5 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/40 hover:shadow-[0_15px_40px_rgba(59,130,246,0.12)]"
              >
                <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex flex-col gap-5 sm:flex-row lg:flex-col xl:flex-row">
                  <motion.div
                    whileHover={{ scale: 1.025 }}
                    className="relative mx-auto flex h-[145px] w-[110px] shrink-0 items-center justify-center overflow-hidden border border-[var(--border)] bg-white shadow-lg sm:mx-0 lg:mx-auto xl:mx-0"
                  >
                    {certification.image ? (
                      <img src={certification.image} alt={`${certification.title} certificate`} className="h-full w-full object-cover" />
                    ) : <Award size={32} className="text-slate-400" />}
                  </motion.div>
                  <div className="relative flex flex-1 flex-col justify-center">
                    <h3 className="text-sm font-bold leading-6">{certification.title}</h3>
                    <p className="mt-1 text-sm">{certification.issuer}</p>
                    <p className="mt-1 text-sm">{certification.year}</p>
                    {certification.credentialUrl && (
                      <a
                        href={certification.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="group/button mt-4 flex w-fit items-center gap-2 rounded-full border border-blue-500/70 px-4 py-2 text-[11px] font-semibold transition-all duration-300 hover:border-purple-400 hover:bg-purple-500/10"
                      >
                        View Certificate
                        <ArrowUpRight size={14} className="transition-transform duration-300 group-hover/button:translate-x-1 group-hover/button:-translate-y-0.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            </CometCard>
          ))}
        </div>

      </OverlayScrollbarsComponent>

    </motion.div>

  );
}


function SectionHeading({ eyebrow, title }) {
  return (
    <div>
      <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--primary-light)] sm:text-sm">
        {eyebrow}
      </p>

      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}


function getIconColor(color) {
  const colors = {
    purple:
      "bg-gradient-to-br from-purple-500 to-violet-600 shadow-purple-500/30",

    pink:
      "bg-gradient-to-br from-orange-400 via-pink-500 to-fuchsia-600 shadow-pink-500/30",

    green:
      "bg-gradient-to-br from-emerald-400 to-teal-500 shadow-emerald-500/30",

    cyan:
      "bg-gradient-to-br from-cyan-400 to-sky-500 shadow-cyan-500/30",

    teal:
      "bg-gradient-to-br from-teal-400 to-cyan-500 shadow-teal-500/30",
  };

  return colors[color] || colors.purple;
}

function formatEducationDate(value) {
  if (!value) return "";
  const match = value.match(/^(\d{4})-(\d{2})$/);
  if (!match) return value;
  return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" })
    .format(new Date(`${value}-01T00:00:00.000Z`));
}