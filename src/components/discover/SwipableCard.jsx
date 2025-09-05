import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef } from "react";

const SwipeableCard = ({
  children,
  onSwiped = () => {}, 
  threshold = 140,     
  radius = 900,        
  className = "",
}) => {
  const x = useMotionValue(0);
  // Arc formula (center below the card): y = -(R - sqrt(R^2 - x^2))
  const y = useTransform(x, (v) => {
    const R = radius;
    const clamped = Math.max(Math.min(v, R - 1), -R + 1);
    const yArc = -(R - Math.sqrt(R * R - clamped * clamped));
    return isNaN(yArc) ? 0 : yArc * 0.6; 
  });
  const rotate = useTransform(x, [-300, 0, 300], [-14, 0, 14]);
  const opacity = useTransform(x, [-400, 0, 400], [0, 1, 0]);
  const cardRef = useRef(null);

  const flyOut = (dir) => {
    const sign = dir === "right" ? 1 : -1;
    const distance = window.innerWidth * 0.9 + 300;
    // Animate along keyframes for a “curvy” feel (+ some arc-based y)
    const xEnd = sign * distance;
    const yEnd = -140; // extra lift
    // Animate x/y/opacity separately so we can compute arc on the way
    const controlsX = animate(x, xEnd, { duration: 0.45, ease: [0.16, 1, 0.3, 1] });
    const controlsY = animate(y, yEnd, { duration: 0.45, ease: [0.16, 1, 0.3, 1] });
    const controlsO = animate(opacity, 0, { duration: 0.35 });

    Promise.all([controlsX.finished, controlsY.finished, controlsO.finished]).then(() => {
      onSwiped(dir);
      x.set(0);
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className={className}
      style={{ x, y, rotate, opacity, touchAction: "pan-y" }}
      drag="x"
      dragElastic={0.2}
      dragMomentum={false}
      onDragEnd={(_, info) => {
        const vx = info.velocity.x;
        const dx = info.offset.x;
        const dir = dx > 0 ? "right" : "left";
        const commit = Math.abs(dx) > threshold || Math.abs(vx) > 600;
        if (commit) flyOut(dir);
        else animate(x, 0, { type: "spring", stiffness: 380, damping: 28 });
      }}
      whileTap={{ cursor: "grabbing" }}
    >
      {children}
    </motion.div>
  );
}

export default SwipeableCard;