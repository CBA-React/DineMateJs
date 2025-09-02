import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { SubmitButton } from "/src/components/ui/SubmitButton";

import { FEATURES } from "/src/constants";

const ACCENT_COLOR = "#E52421";
const ORBIT_TEXT = {
    title1: "It starts with",
    title2: "the perfect match",
    subtitle: "We connect you with people who share your taste and vibe."
}

export const OrbitRing = ({progress}) => {
    const containerRef = useRef(null);

    const SPEED = 1;

    const DASH = 0.2, GAP = 3, period = DASH + GAP;
    const DOT = 0.3;
    const innerDash = 46.8, outerDash = 49.6;
    const innerDot  = 42.3, outerDot  = 42.5;

    const rotate = useTransform(progress, v => `${v * 360 * SPEED}deg`);
    const rotateBackwards = useTransform(progress, v => `${-v * 360 * SPEED}deg`);

    const ACCENT_START = 0;
    const ACCENT_SWEEP = 90;
    const DASH_COLOR = "#A1A1AA"

  return (
    <div ref={containerRef} className="relative mx-auto pointer-events-none aspect-square w-[clamp(950px,60vw,1400px)]">
      <motion.div style={{ rotate }} className="absolute inset-0">
        <div
          className="h-full w-full rounded-full"
          style={{
            background: `
              repeating-conic-gradient(
                ${DASH_COLOR} 0 ${DASH}deg,
                transparent ${DASH}deg ${period}deg
              )
            `,
            WebkitMask: `radial-gradient(circle, transparent 0 ${innerDash}%, ${DASH_COLOR} ${innerDash}% ${outerDash}%, transparent ${outerDash}%)`,
            mask:       `radial-gradient(circle, transparent 0 ${innerDash}%, ${DASH_COLOR} ${innerDash}% ${outerDash}%, transparent ${outerDash}%)`,
          }}
        />
      </motion.div>
      
      <motion.div style={{ rotate }} className="absolute inset-0">
        <div
          className="h-full w-full rounded-full"
          style={{
            WebkitMask: `conic-gradient(from ${ACCENT_START}deg, ${DASH_COLOR} 0 ${ACCENT_SWEEP}deg, transparent ${ACCENT_SWEEP}deg)`,
            mask:       `conic-gradient(from ${ACCENT_START}deg, ${DASH_COLOR} 0 ${ACCENT_SWEEP}deg, transparent ${ACCENT_SWEEP}deg)`,
          }}
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background: `
                repeating-conic-gradient(
                  ${ACCENT_COLOR} 0 ${DASH}deg,
                  transparent ${DASH}deg ${period}deg
                )
              `,
              WebkitMask: `radial-gradient(circle, transparent 0 ${innerDash}%, ${DASH_COLOR} ${innerDash}% ${outerDash}%, transparent ${outerDash}%)`,
              mask:       `radial-gradient(circle, transparent 0 ${innerDash}%, ${DASH_COLOR} ${innerDash}% ${outerDash}%, transparent ${outerDash}%)`,
            }}
          />
        </div>
      </motion.div>
      
      <motion.div style={{ rotate: rotateBackwards }} className="absolute inset-0">
        <div
          className="h-full w-full rounded-full"
          style={{
            background: `
              repeating-conic-gradient(
                ${DASH_COLOR} 0 ${DOT}deg,
                transparent ${DOT}deg ${period}deg
              )
            `,
            WebkitMask: `radial-gradient(circle, transparent 0 ${innerDot}%, ${DASH_COLOR} ${innerDot}% ${outerDot}%, transparent ${outerDot}%)`,
            mask:       `radial-gradient(circle, transparent 0 ${innerDot}%, ${DASH_COLOR} ${innerDot}% ${outerDot}%, transparent ${outerDot}%)`,
          }}
        />
      </motion.div>
    </div>
  );
};

export const FeatureOrbitSection = () => {
    const wrapperRef = useRef(null);

    const NAV_H = 88;

    const { scrollYProgress } = useScroll({
        target: wrapperRef,
        offset: ["start start", "end start"], 
      });
    const smooth = useSpring(scrollYProgress, { stiffness: 10, damping: 10, mass: 1 });
  
    const steps = FEATURES.length;
    const [active, setActive] = useState(0);
    
      const ROW_H = 56; 
      const indicatorY = useTransform(smooth, [0, 1], [0, steps * ROW_H]);

      useMotionValueEvent(indicatorY, "change", (y) => {
        const i = Math.max(0, Math.min(steps - 1, Math.floor(y / ROW_H)));
        setActive(i);
      });
  
    return (
        <section className="relative">
      <div ref={wrapperRef}
            className="relative lg:mb-[240px] 2xl:mb-[360px]"
            style={{ height: `${(FEATURES.length + 1) * 100}vh` }}
    >
        <div className="sticky" style={{ top: -NAV_H, height: `calc(100vh - ${NAV_H}px)` }}>
          <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 h-full">
            <div className="absolute top-1/2 left-0 lg:left-28">
            <motion.div style={{ y: indicatorY }} className="absolute -left-12 top-[10px]">
                <Play fill={ACCENT_COLOR} color={ACCENT_COLOR} size={10}/>
            </motion.div>
    
            <ul className="space-y-2">
                {FEATURES.map((f, i) => {
                const Icon = f.icon;
                const isActive = i === active;
                return (
                    <li key={f.key} className="h-14">
                    <motion.div 
                        className={`flex items-center gap-3 h-14 px-3 rounded-xl transition-all duration-100 ${
                        isActive ? "text-primary-text" : "text-fade-text"
                        }`}
                        animate={{
                            x: isActive ? -48 : 0,
                            opacity: isActive ? 1 : 0.4
                        }}
                        transition={{ duration: 0.1 }}
                    >
                        <span className={`grid size-[50px] place-items-center rounded-[5px] transition-all duration-300 bg-linear-to-r
                             from-gradient-features-from via-gradient-features-middle to-gradient-features-to`}>
                        <Icon />
                        </span>
                        <span className={`font-medium transition-all duration-300 ${isActive ? "opacity-100" : "opacity-60"}`}>{f.title}</span>
                    </motion.div>
                    </li>
                );
                })}
            </ul>
            </div>
    
            <div className="relative flex items-center justify-center">
            <OrbitRing progress={smooth} />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <h2 className="font-serif text-4xl lg:text-5xl 2xl:text-7xl leading-tight bg-linear-to-b from-primary to-secondary bg-clip-text">
                <span className="text-transparent">{ORBIT_TEXT.title1}</span><br/>
                <span className="text-transparent">{ORBIT_TEXT.title2}</span>
                </h2>
                <p className="mt-3 text-[20px] 2xl:text-4xl text-primary-text max-w-sm 2xl:max-w-2xl">
                    {ORBIT_TEXT.subtitle}
                </p>
            </div>

            <div className="absolute bottom-28 2xl:bottom-72 left-1/2 transform -translate-x-1/2">
                <AnimatePresence mode="wait">
                <motion.div
                    key={FEATURES[active].key}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="lg:w-[350px] flex flex-col items-center rounded-[10px] bg-feature-card-bg p-6 pointer-events-auto"
                >
                    <div className="space-y-3">
                        <div className="flex items-center gap-4 justify-center">
                        <span className="grid size-[50px] place-items-center rounded-md text-primary-text bg-white">
                            {(() => { const I = FEATURES[active].icon; return <I size={28} /> })()}
                        </span>
                        <h4 className="text-[22px] font-medium text-gray-900">{FEATURES[active].title}</h4>
                        </div>
                        <hr className="text-primary-text/10"/>
                        <p className="text text-primary-text text-center">{FEATURES[active].desc}</p>
                    </div>
                    <SubmitButton text="Discover your dinner date" withIcon className="bg-secondary mt-5"/>
                </motion.div>
                </AnimatePresence>
            </div>
            </div>
          </div> 
        </div>
      </div>
    </section>
    );
}