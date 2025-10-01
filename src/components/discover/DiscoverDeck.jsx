import { useState, useCallback, useEffect, useRef } from "react";
import SwipeableCard from "./SwipableCard";
import { DiscoverCard } from "./DiscoverCard";
import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";

const DiscoverDeck = ({
  people = [],
  onDecision = () => {},
  onEmpty,   
  onEnd,
  hasMore,
  loading,
}) => {
  const [index, setIndex] = useState(0);
  const top = people[index];
  const next = people[index + 1];

  const requestedRef = useRef(false);

  const handleSwiped = useCallback(
    (dir) => {
      if (!top) return;
      onDecision({ person: top, dir });
      setIndex((i) => i + 1);
    },
    [top, onDecision]
  );

  useEffect(() => {
    if (people.length === 0) return;

    if (!top && !loading) {
      if (hasMore && !requestedRef.current) {
        requestedRef.current = true;
        onEmpty?.();
      } else if (!hasMore) {
        onEnd?.();
      }
    }

    if (top) requestedRef.current = false;
  }, [top, loading, hasMore, onEmpty, onEnd, people.length]);

  if (!top && loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <LoaderCircle size={64} className="text-primary-text/20" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative w-[min(92vw,460px)]">
      {next && (
        <motion.div
          key={`next-${next.id}`}
          className="absolute inset-0 z-0"
          initial={{ scale: 0.96, y: 16, opacity: 0.0001 }}
          animate={{ scale: 0.96, y: 16, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 24, delay: 0.05 }}
        >
          <DiscoverCard person={next} />
        </motion.div>
      )}

      {top && (
        <SwipeableCard
          className="relative z-10"
          onSwiped={handleSwiped}
          radius={900}
          threshold={140}
        >
          <motion.div
            initial={{ scale: 1, y: 0, opacity: 1 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <DiscoverCard
              person={top}
              onLike={() => handleSwiped("right")}
              onPass={() => handleSwiped("left")}
            />
          </motion.div>
        </SwipeableCard>
      )}
    </div>
  );
};

export default DiscoverDeck;
