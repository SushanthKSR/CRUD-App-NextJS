"use client";

import styles from "./page.module.scss";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import useMousePosition from "./utils/useMousePosition";
import CallToAction from "@/components/CallToAction";
import Hero from "@/components/Hero";
import Features from "@/components/Features";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();

  const maskSize = useMemo(() => (isHovered ? 400 : 40), [isHovered]);

  return (
    <main className={styles.main}>
      <Hero />

      <motion.div
        className={styles.mask}
        animate={{
          WebkitMaskPosition: `${x - maskSize / 2}px ${y - maskSize / 2}px`,
          WebkitMaskSize: `${maskSize}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      >
        <p
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          Made by Sushanth Kesamreddy. I’m always excited to build cutting-edge
          applications that blend technological innovation with stunning visual
          appeal.
        </p>
      </motion.div>

      <div className={styles.body}>
        <p>
          <span>“Data control at its finest!"</span> CRUD empowers applications
          to be dynamic, scalable, and user-friendly. With structured
          operations, managing data has never been this seamless.
        </p>
      </div>

      <Features />
      <CallToAction />
    </main>
  );
}
