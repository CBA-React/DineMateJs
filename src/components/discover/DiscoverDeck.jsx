import { useState, useCallback, useEffect } from "react";
import SwipeableCard from "./SwipableCard";
import { DiscoverCard } from "./DiscoverCard";
import { motion } from "framer-motion";

const TEXT = {
  noMoreSuggestions: "No more suggestions"
}

const DiscoverDeck = ({ people = [], onDecision = () => {}, onEmpty }) => {
  const [index, setIndex] = useState(0);
  const top = people[index];
  const next = people[index + 1];

  const handleSwiped = useCallback((dir) => {
    onDecision({ person: top, dir });   
    setIndex((i) => i + 1);             
  }, [top, onDecision]);

  useEffect(() => {
    if (!top && people.length > 0) onEmpty?.();   
  }, [top, people.length, onEmpty]);

  if(!top)
    return (
        <div className="grid place-items-center h-[60vh]">
          <p className="text-gray-600">{TEXT.noMoreSuggestions}</p>
        </div>
      );

  return (
    <div className="relative w-[min(92vw,460px)]">
      {next && (
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 0.96, y: 16, opacity: 0.0001 }}
          animate={{ scale: 0.96, y: 16, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 24, delay: 0.05 }}
        >
          <DiscoverCard person={next} />
        </motion.div>
      )}

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
    </div>
  );
}

export default DiscoverDeck;