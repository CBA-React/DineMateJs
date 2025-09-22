import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import { Play, ChevronsDown } from "lucide-react";
import { SubmitButton } from "/src/components/ui/SubmitButton";
import { useIsMobile } from "/src/hooks/useIsMobile";
import { FEATURES } from "/src/constants";
import { useLayoutEffect } from "react";

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
    <div ref={containerRef} id="why-us" className="relative mx-auto pointer-events-none aspect-square w-[clamp(950px,60vw,1400px)]">
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

const MobileChips = ({ active, progress }) => {
  const wrapRef = useRef(null); 
  const contentRef = useRef(null); 
  const [metrics, setMetrics] = useState({ 
    maxShift: 0, 
    startX: 0, 
    endX: 0,
  });
  
  useLayoutEffect(() => { 
    if (!wrapRef.current || !contentRef.current) return; 
    const GUTTER = 80; 
    contentRef.current.style.paddingLeft = `${GUTTER}px`; 
    contentRef.current.style.paddingRight = `${GUTTER}px`; 
    const clamp = (v, min, max) => Math.min(max, Math.max(min, v)); 
    const measure = () => { 
      const wrapW = wrapRef.current.clientWidth; 
      const contentW = contentRef.current.scrollWidth; 
      const maxShift = Math.max(0, contentW - wrapW); 
      const chips = Array.from( contentRef.current.querySelectorAll("[data-chip]") ); 
      const centerOffset = (el) => { 
         const targetCenter = el.offsetLeft + el.offsetWidth / 2; 
         return -(targetCenter - wrapW / 2); 
      }; 
      
      let startX = 0, endX = -maxShift; 
      if (chips.length) { 
        startX = clamp(centerOffset(chips[0]), -maxShift, 0); 
        endX = clamp(centerOffset(chips[chips.length - 1]), -maxShift, 0); 
      } 
      
      setMetrics({ maxShift, startX, endX }); 
    }; 
    
    const ro = new ResizeObserver(measure); 
    ro.observe(wrapRef.current); 
    ro.observe(contentRef.current); 
    measure(); 
    return () => ro.disconnect(); 
  }, []); 
  
  const x = useTransform(progress, [0, 0.95], [metrics.startX, metrics.endX]); 
  const xSpring = useSpring(x, { stiffness: 80, damping: 20, mass: 0.3 });

  return (
    <div ref={wrapRef} className="relative overflow-hidden px-5">
      <motion.div
        ref={contentRef}
        style={{ x: xSpring, willChange: "transform" }}
        className="flex gap-9 py-1.5"
      >
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          const isActive = i === active;
          return (
            <motion.div
              key={f.key}
              data-chip
              animate={{ scale: isActive ? 1 : 0.95, opacity: isActive ? 1 : 0.65 }}
              transition={{ duration: 0.2 }}
              className={[
                "flex items-center gap-3 shrink-0",
              ].join(" ")}
            >
              <span className="grid size-7 place-items-center rounded-md bg-linear-270 from-[#F2F2F2] from-0% via-[#FFEDEE] via-50% to-[#FFF0F1] to-100%">
                <Icon size={16} />
              </span>
              <span className={isActive ? "text-primary-text text-sm" : "text-fade-text text-sm"}>
                {f.title}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export const FeatureOrbitSection = () => {
    const wrapperRef = useRef(null);

    const isMobile = useIsMobile();

    const NAV_H = isMobile ? 72 : 88;

    const { scrollYProgress } = useScroll({
        target: wrapperRef,
        offset: ["start start", "end start"], 
      });
    const smooth = useSpring(scrollYProgress, { stiffness: 10, damping: 10, mass: 1 });
  
    const steps = FEATURES.length;
    const [active, setActive] = useState(0);
    
      const ROW_H = 56; 
      const rangePx = (steps - 1) * ROW_H;
      const indicatorY = useTransform(smooth, [0, 1], [0, steps * ROW_H]);

      useMotionValueEvent(indicatorY, "change", (y) => {
        const i = Math.max(0, Math.min(steps - 1, Math.floor(y / ROW_H)));
        setActive(i);
      });
  
      if (isMobile) {
        return (
          <section className="relative">
            <div
              ref={wrapperRef}
              className="relative"
              style={{ height: `${(FEATURES.length + 1) * 100}vh` }}
            >
              <div className="sticky" style={{ top: 75, height: "calc(100vh - 72px)" }}>
                <div className="relative h-full overflow-hidden">
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 z-20">
                    <ChevronsDown size={18} className="text-fade-text" />
                  </div>
    
                  <div className="absolute top-8 left-0 right-0 z-10">
                    <MobileChips active={active} progress={smooth} />
                  </div>
    
                  <div
                    className="absolute left-1/2 -translate-x-1/2 overflow-hidden"
                    style={{ top: 96, height: 340 }}
                  >
                    <div className="-mt-[20%] scale-[1.3] origin-top">
                      <OrbitRing progress={smooth} />
                    </div>
                  </div>
    
                  <div className="absolute top-[190px] left-0 right-0 px-5 text-center z-10">
                    <h3 className="font-serif text-4xl font-medium bg-gradient-to-b from-primary to-secondary bg-clip-text">
                      <span className="text-transparent">{ORBIT_TEXT.title1}</span>
                      <br />
                      <span className="text-transparent">{ORBIT_TEXT.title2}</span>
                    </h3>
                    <p className="mt-3 text-primary-text max-w-[300px] mx-auto">
                      {ORBIT_TEXT.subtitle}
                    </p>
                  </div>
    
                  <div className="absolute left-1/2 -translate-x-1/2 z-10" style={{ top: 365 }}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={FEATURES[active].key}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="w-[340px] rounded-[10px] bg-feature-card-bg p-5"
                      >
                        <div className="flex items-center gap-4 justify-center mb-3">
                          <span className="grid size-12 place-items-center rounded-md bg-white">
                            {(() => {
                              const I = FEATURES[active].icon;
                              return <I size={22} className="text-gray-700" />;
                            })()}
                          </span>
                          <h4 className="text-primary-text">
                            {FEATURES[active].title}
                          </h4>
                        </div>
                        <hr className="border-primary-text/10" />
                        <p className="mt-3 text-center">
                          {FEATURES[active].desc}
                        </p>
    
                        <SubmitButton
                          text="Discover your dinner date"
                          withIcon
                          className="bg-secondary mt-5 w-full rounded-full text-white"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      }
  
      return (
          <section className="relative">
        <div ref={wrapperRef}
              className="relative lg:mb-[240px] 2xl:mb-[360px]"
              style={{ height: `${(FEATURES.length + 1) * 100}vw` }}
      >
          <div className="sticky" style={{ top: -NAV_H, height: `calc(100vh - ${NAV_H}px)` }}>
            <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 h-full">
              <div className="absolute top-1/2 left-0 lg:left-28 hidden md:block">
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
                          <span className={`grid size-[50px] place-items-center rounded-[5px] transition-all duration-300 bg-gradient-to-r
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
                  <h2 className="font-serif text-4xl lg:text-5xl 2xl:text-7xl leading-tight bg-gradient-to-b from-primary to-secondary bg-clip-text">
                  <span className="text-transparent">{ORBIT_TEXT.title1}</span><br/>
                  <span className="text-transparent">{ORBIT_TEXT.title2}</span>
                  </h2>
                  <p className="mt-3 text-[20px] 2xl:text-4xl text-primary-text max-w-sm 2xl:max-w-2xl">
                      {ORBIT_TEXT.subtitle}
                  </p>
              </div>
  
              <div className="md:absolute bottom-28 2xl:bottom-72 left-1/2 transform -translate-x-1/2">
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