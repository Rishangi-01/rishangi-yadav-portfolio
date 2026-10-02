"use client";

import { motion } from "motion/react";

export default function SectionHeading({
  eyebrow,
  title,
}) {
  return (
    <motion.div
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
        amount: 0.3,
      }}
      transition={{
        duration: 0.7,
      }}
      className="mb-16 text-center"
    >
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-purple-500">
        {eyebrow}
      </p>

      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
    </motion.div>
  );
}