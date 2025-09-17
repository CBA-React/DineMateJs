import { useEffect, useRef, useMemo } from "react";
import { Message } from "./Message";

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

const formatDayLabel = (date) => {
  const d = new Date(date);
  const now = new Date();
  const yest = new Date(now);
  yest.setDate(now.getDate() - 1);
  if (isSameDay(d, now)) return "Today";
  if (isSameDay(d, yest)) return "Yesterday";
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: now.getFullYear() === d.getFullYear() ? undefined : "numeric" });
}

const groupMessages = (msgs) => {
  const items = [];
  let lastKey = null;
  msgs.forEach((m, idx) => {
    const d = m.createdAt ? new Date(m.createdAt) : new Date();
    const key = d.toDateString();
    if (idx === 0 || key !== lastKey) {
      items.push({ type: "divider", id: `div-${key}-${idx}`, date: d });
      lastKey = key;
    }
    items.push({ type: "message", id: m.id, message: m });
  });
  return items;
}

const DayDivider =({ date }) => {
  return (
    <div className="flex justify-center">
      <span className="px-3 py-1 rounded-full text-white text-sm bg-secondary">{formatDayLabel(date)}</span>
    </div>
  );
}

export const MessagesList = ({ messages }) => {
    const ref = useRef(null);
    useEffect(() => {
      if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
    }, [messages]);

    const items = useMemo(() => groupMessages(messages), [messages]);
  
    return (
      <div ref={ref} className="flex-1 overflow-y-auto px-6 py-4 space-y-1 flex flex-col justify-end">
        <div className="relative flex flex-col gap-4">
          {items.map((it) =>
            it.type === "divider" ? (
              <DayDivider key={it.id} date={it.date} />
            ) : (
              <Message key={it.id} msg={it.message} />
            )
          )}
        </div>
      </div>
    );
  }