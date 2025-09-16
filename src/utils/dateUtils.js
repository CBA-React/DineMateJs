export function toISO(d) {
    if (!d) return "";
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  
  export function parseISO(s) {
    if (!s) return null;
    const [y, m, d] = s.split("-").map(Number);
    const date = new Date(y, (m || 1) - 1, d || 1);
    return Number.isNaN(date.getTime()) ? null : date;
  }

export function formatDateTime(dateISO, timeHHMM, locale = "en-US", opts = {}) {
  const dt = new Date(`${dateISO}T${timeHHMM || "19:00"}`);

  const dateOptions = {
    month: "long",
    day: opts.day || "numeric",
    year: "numeric",
    ...(opts.weekday ? { weekday: opts.weekday } : {}),
  };

  const dateStr = new Intl.DateTimeFormat(locale, dateOptions).format(dt);
  
  const timeStr = new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "2-digit",
  }).format(dt);
  return { dateStr, timeStr };
}