import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function AnimatedCounter({ value, suffix, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1800, bounce: 0 });
  const rounded = useTransform(spring, (latest) => `${Math.round(latest)}${suffix}`);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  return (
    <div ref={ref} className="text-center">
      <motion.p className="font-display text-3xl font-bold text-ink sm:text-5xl md:text-6xl">{rounded}</motion.p>
      <p className="counter-label mt-2 text-xs font-bold uppercase tracking-[0.12em] text-muted sm:mt-3 sm:text-sm sm:tracking-[0.18em]">{label}</p>
    </div>
  );
}
