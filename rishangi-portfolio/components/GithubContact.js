"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";

import {
    Mail,
    MessageCircle,
    Phone,
    MapPin,
    ArrowUpRight,
    Send,
    ChevronDown,
    CheckCircle2,
    Code2,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

/* =========================================================
   GITHUB CONTRIBUTION DATA
========================================================= */

const contributionData = Array.from({ length: 120 }, (_, index) => {
    const pattern = [
        0, 1, 2, 3, 2, 1, 0, 3, 4, 2,
        1, 3, 4, 2, 0, 1, 3, 4, 2, 1,
    ];

    return pattern[index % pattern.length];
});

/* =========================================================
   LANGUAGES
========================================================= */

const languages = [
    {
        name: "JavaScript",
        percentage: 90,
        gradient: "from-blue-500 to-cyan-400",
    },
    {
        name: "HTML",
        percentage: 85,
        gradient: "from-purple-500 to-pink-500",
    },
    {
        name: "CSS",
        percentage: 80,
        gradient: "from-purple-500 to-violet-400",
    },
    {
        name: "Java",
        percentage: 60,
        gradient: "from-orange-500 to-orange-300",
    },
];

/* =========================================================
   SOCIAL LINKS
========================================================= */

const socialLinks = [
    {
        name: "GitHub",
        icon: FaGithub,
        href: "https://github.com/Rishangi-01/",
    },
    {
        name: "LinkedIn",
        icon: FaLinkedin,
        href: "https://www.linkedin.com/in/rishangi-yadav-webdeveloper/",
    },
    {
        name: "WhatsApp",
        icon: FaWhatsapp,
        href: "https://wa.me/9115203477",
    },
    {
        name: "Email",
        icon: Mail,
        href: "mailto:rishangiyadav007@gmail.com",
    },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function GithubContact() {
    const [formData, setFormData] = useState({
        name: "",
        telephone: "",
        email: "",
        subject: "",
        message: "",
    });

    const [sent, setSent] = useState(false);
    const [sentMessage, setSentMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    /* =======================================================
       FORM HANDLER
    ======================================================= */

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        if (sent) {
            setSent(false);
        }

        if (error) {
            setError("");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const trimmedName = formData.name.trim();
        const trimmedTelephone = formData.telephone.trim();
        const trimmedEmail = formData.email.trim();
        const trimmedSubject = formData.subject.trim();
        const trimmedMessage = formData.message.trim();

        if (!trimmedName || !trimmedTelephone || !trimmedEmail || !trimmedSubject || !trimmedMessage) {
            setError("Please complete all fields before sending your message.");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(trimmedEmail)) {
            setError("Please enter a valid email address.");
            return;
        }

        setSubmitting(true);
        setError("");
        setSentMessage("");

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contacts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: trimmedName,
                    email: trimmedEmail,
                    telephone: trimmedTelephone,
                    subject: trimmedSubject,
                    message: trimmedMessage,
                }),
            });

            const payload = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(payload.message || "Message could not be sent.");
            }

            setSent(true);
            setSentMessage(payload.message || "Message sent successfully.");
            setFormData({
                name: "",
                telephone: "",
                email: "",
                subject: "",
                message: "",
            });
        } catch (submitError) {
            setError(submitError.message || "Something went wrong while sending the message.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section
            id="contact"
            className="relative overflow-hidden border-t border-[var(--border)] py-16 sm:py-20 lg:py-18"
        >
            {/* =====================================================
          BACKGROUND EFFECTS
      ===================================================== */}

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.07, 0.15, 0.07],
                        x: [0, 40, 0],
                    }}
                    transition={{
                        duration: 9,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-purple-600 blur-[130px]"
                />

                <motion.div
                    animate={{
                        scale: [1.1, 1, 1.1],
                        opacity: [0.05, 0.14, 0.05],
                        x: [0, -40, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-blue-600 blur-[140px]"
                />
            </div>

            {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

            <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10">
                {/* Heading */}

                {/* <div className="mb-8">
                    <p className="text-2xl font-bold tracking-tight sm:text-3xl">
                        GitHub & Achievements
                    </p>

                    <p className="mt-1 text-sm sm:text-base">
                        Code • Build • Learn
                    </p>
                </div> */}
                {/* <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr]">


                    <GithubSection />

                    <LanguagesCard />

                </div> */}
                <ContactSection
                    formData={formData}
                    sent={sent}
                    sentMessage={sentMessage}
                    submitting={submitting}
                    error={error}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            </div>
        </section>
    );
}

/* =========================================================
   GITHUB SECTION
========================================================= */

function GithubSection() {
    return (
        <motion.div
            initial={{
                opacity: 0,
                x: -45,
            }}
            whileInView={{
                opacity: 1,
                x: 0,
            }}
            viewport={{
                once: true,
                amount: 0.15,
            }}
            transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="border-b border-[var(--border)] pb-5 lg:border-b-0 lg:pr-8 xl:pr-10"
        >


            {/* =====================================================
          GITHUB STATS CARD
      ===================================================== */}

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
                    duration: 0.6,
                    delay: 0.15,
                }}
                className="relative overflow-hidden rounded-xl border border-[var(--border)] p-5 backdrop-blur-sm"
            >
                {/* Glow */}

                <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl" />

                {/* Top */}

                <div className="relative mb-6 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full">
                        <FaGithub size={19} />
                    </div>

                    <span className="text-sm font-semibold">
                        GitHub Contributions
                    </span>
                </div>

                {/* Content */}

                <div className="relative grid grid-cols-1 gap-7 xl:grid-cols-[1.25fr_0.75fr]">

                    {/* Contribution graph */}

                    <ContributionGraph />

                    {/* Statistics */}

                    <div className="grid grid-cols-2 border-t border-[var(--border)] pt-5 xl:border-l xl:border-t-0 xl:pl-6 xl:pt-0">
                        <Stat
                            number="15+"
                            label="Repositories"
                        />

                        <Stat
                            number="300+"
                            label="Contributions"
                        />
                    </div>
                </div>
            </motion.div>

            {/* =====================================================
          LANGUAGES
      ===================================================== */}


        </motion.div>
    );
}

/* =========================================================
   CONTRIBUTION GRAPH
========================================================= */

function ContributionGraph() {
    return (
        <div>
            <div className="grid grid-cols-15 gap-[3px] sm:gap-1">
                {contributionData.map((level, index) => (
                    <motion.span
                        key={index}
                        initial={{
                            opacity: 0,
                            scale: 0.5,
                        }}
                        whileInView={{
                            opacity: 1,
                            scale: 1,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            duration: 0.2,
                            delay: index * 0.008,
                        }}
                        whileHover={{
                            scale: 1.35,
                        }}
                        className={`aspect-square rounded-[2px] transition-all duration-200 ${getContributionColor(
                            level
                        )}`}
                    />
                ))}
            </div>

            <p className="mt-3 text-[10px]">
                Consistent coding • Continuous learning
            </p>
        </div>
    );
}

/* =========================================================
   CONTRIBUTION COLORS
========================================================= */

function getContributionColor(level) {
    const colors = {
        0: "bg-slate-700/50",
        1: "bg-green-900/80",
        2: "bg-green-700",
        3: "bg-green-500",
        4: "bg-green-400",
    };

    return colors[level] || colors[0];
}

/* =========================================================
   STAT
========================================================= */

function Stat({ number, label }) {
    return (
        <motion.div
            whileHover={{
                y: -3,
            }}
            className="flex flex-col justify-center px-3"
        >
            <span className="text-2xl font-bold sm:text-3xl">
                {number}
            </span>

            <span className="mt-1 text-xs sm:text-sm">
                {label}
            </span>
        </motion.div>
    );
}

/* =========================================================
   LANGUAGES CARD
========================================================= */

function LanguagesCard() {
    return (
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
                duration: 0.6,
                delay: 0.3,
            }}
            className="rounded-xl border border-[var(--border)] p-4 backdrop-blur-sm sm:p-5"
        >
            <div className="mb-4 flex items-center gap-2">
                <Code2
                    size={17}
                />

                <span className="text-sm font-semibold">
                    Languages
                </span>
            </div>

            <div className="space-y-3">
                {languages.map((language, index) => (
                    <LanguageBar
                        key={language.name}
                        language={language}
                        index={index}
                    />
                ))}
            </div>
        </motion.div>
    );
}

/* =========================================================
   LANGUAGE BAR
========================================================= */

function LanguageBar({ language, index }) {
    return (
        <div>
            <div className="mb-1 flex items-center justify-between">
                <span className="text-xs font-medium">
                    {language.name}
                </span>

                <span className="text-xs">
                    {language.percentage}%
                </span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full">
                <motion.div
                    initial={{
                        width: 0,
                    }}
                    whileInView={{
                        width: `${language.percentage}%`,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.3,
                    }}
                    transition={{
                        duration: 1,
                        delay: 0.35 + index * 0.15,
                        ease: "easeOut",
                    }}
                    className={`h-full rounded-full bg-gradient-to-r ${language.gradient}`}
                />
            </div>
        </div>
    );
}

/* =========================================================
   CONTACT SECTION
========================================================= */

function ContactSection({
    formData,
    sent,
    sentMessage,
    submitting,
    error,
    handleChange,
    handleSubmit,
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                x: 45,
            }}
            whileInView={{
                opacity: 1,
                x: 0,
            }}
            viewport={{
                once: true,
                amount: 0.15,
            }}
            transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="pt-10 lg:pl-8 lg:pt-0 xl:pl-10"
        >
            {/* ===================================================
          TOP CONTACT INFO + FORM
      =================================================== */}

            <div className="mt-10 grid grid-cols-1 gap-8 xl:grid-cols-[0.9fr_1.1fr]">

                {/* =================================================
            CONTACT INFO
        ================================================= */}

                <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] sm:text-sm">
                        Get In Touch
                    </p>

                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Let's Work Together
                    </h2>

                    <p className="mt-2 text-sm leading-6">
                        Have a project in mind? Let's build something amazing.
                    </p>

                    {/* Contact details */}

                    <div className="mt-7 space-y-4">
                        <ContactItem
                            icon={Mail}
                            text="rishangiyadav007@gmail.com"
                            href="mailto:rishangiyadav007@gmail.com"
                        />

                        <ContactItem
                            icon={Phone}
                            text="+91 91152 03477"
                            href="tel:+919115203477"
                        />

                        <ContactItem
                            icon={MapPin}
                            text="Lucknow, India"
                        />
                    </div>

                    {/* Social links */}

                    <div className="mt-7 flex items-center gap-5">
                        {socialLinks.map((social, index) => {
                            const Icon = social.icon;

                            return (
                                <motion.div
                                    key={social.name}
                                    initial={{
                                        opacity: 0,
                                        scale: 0,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        scale: 1,
                                    }}
                                    viewport={{
                                        once: true,
                                    }}
                                    transition={{
                                        delay: 0.5 + index * 0.08,
                                        type: "spring",
                                        stiffness: 250,
                                        damping: 15,
                                    }}
                                >
                                    <Link
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.name}
                                        className="group flex h-7 w-7 items-center justify-center transition-colors duration-300 hover:text-[var(--primary-light)]"
                                    >
                                        <Icon
                                            size={20}
                                            strokeWidth={1.8}
                                            className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110"
                                        />
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* =================================================
            CONTACT FORM
        ================================================= */}

                <ContactForm
                    formData={formData}
                    sent={sent}
                    sentMessage={sentMessage}
                    submitting={submitting}
                    error={error}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            </div>
        </motion.div>
    );
}

/* =========================================================
   CONTACT ITEM
========================================================= */

function ContactItem({
    icon: Icon,
    text,
    href,
}) {
    const content = (
        <>
            <Icon
                size={21}
                strokeWidth={1.8}
                className="shrink-0 text-[var(--primary-light)]"
            />

            <span className="text-sm transition-colors group-hover:text-[var(--primary-light)]">
                {text}
            </span>
        </>
    );

    if (href) {
        return (
            <Link
                href={href}
                className="group flex items-center gap-4"
            >
                {content}
            </Link>
        );
    }

    return (
        <div className="group flex items-center gap-4">
            {content}
        </div>
    );
}

/* =========================================================
   CONTACT FORM
========================================================= */

function ContactForm({
    formData,
    sent,
    sentMessage,
    submitting,
    error,
    handleChange,
    handleSubmit,
}) {
    return (
        <motion.form
            onSubmit={handleSubmit}
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
                amount: 0.15,
            }}
            transition={{
                duration: 0.6,
                delay: 0.15,
            }}
            className="relative overflow-hidden rounded-xl border border-[var(--border)] p-3 backdrop-blur-md sm:p-4"
        >
            {/* Form glow */}

            <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />

            <div className="relative space-y-2">
                {/* Name */}

                <InputField
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                {/* Email */}

                <InputField
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                {/* Phone */}

                <InputField
                    name="telephone"
                    type="tel"
                    placeholder="Phone"
                    value={formData.telephone}
                    onChange={handleChange}
                    required
                />

                {/* Subject */}

                <div className="relative">
                    <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="h-12 w-full appearance-none rounded-lg border border-[var(--border)] px-3 pr-9 text-xs outline-none transition-all duration-300 placeholder:text-[var(--muted)] focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 bg-[var(--foreground)]"
                    >
                        <option value="" disabled>
                            Subject
                        </option>

                        <option value="Web Development Project">
                            Web Development Project
                        </option>

                        <option value="MERN Stack Development">
                            MERN Stack Development
                        </option>

                        <option value="Freelance Project">
                            Freelance Project
                        </option>

                        <option value="Job Opportunity">
                            Job Opportunity
                        </option>

                        <option value="Other">
                            Other
                        </option>
                    </select>

                    <ChevronDown
                        size={15}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                    />
                </div>

                {/* Message */}

                <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full resize-none rounded-lg border border-[var(--border)] px-3 py-2.5 text-xs outline-none transition-all duration-300 placeholder:text-[var(--muted)] focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30"
                />

                {error && (
                    <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                        {error}
                    </div>
                )}

                {sent && sentMessage && (
                    <div className="rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 text-xs text-green-200">
                        {sentMessage}
                    </div>
                )}

                {/* Submit */}

                <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{
                        scale: submitting ? 1 : 1.01,
                    }}
                    whileTap={{
                        scale: submitting ? 1 : 0.98,
                    }}
                    className="group flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-violet-500 text-xs font-semibold text-white shadow-[0_0_25px_rgba(124,58,237,0.2)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(124,58,237,0.4)] disabled:cursor-not-allowed disabled:opacity-75"
                >
                    {sent ? (
                        <>
                            <CheckCircle2 size={15} />
                            Message Sent
                        </>
                    ) : submitting ? (
                        <>
                            Sending...
                        </>
                    ) : (
                        <>
                            Send Message

                            <ArrowUpRight
                                size={16}
                                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                            />
                        </>
                    )}
                </motion.button>
            </div>
        </motion.form>
    );
}

/* =========================================================
   INPUT FIELD
========================================================= */

function InputField({
    name,
    type = "text",
    placeholder,
    value,
    onChange,
    required = false,
}) {
    return (
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            className="h-12 w-full rounded-lg border border-[var(--border)] px-3 text-xs outline-none transition-all duration-300 placeholder:text-[var(--muted)] focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30"
        />
    );
}