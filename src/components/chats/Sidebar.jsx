import { useMemo, useState } from "react";
import { Search, Shield } from "lucide-react";
import { Button } from "/src/components/ui/Button";
import clsx from "clsx";

export const Sidebar = ({ conversations, activeId, onSelect }) => {
    const [query, setQuery] = useState("");
  
    const filtered = useMemo(() => {
      const q = query.trim().toLowerCase();
      if (!q) return conversations;
      return conversations.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          (c.lastMessage || "").toLowerCase().includes(q)
      );
    }, [query, conversations]);
  
    return (
      <aside className="w-[368px] shrink-0">
        <div className="p-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2" size={24} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-full rounded-xl border border-primary-text/15 pl-12 py-3 pr-4 bg-white text-primary-text outline-none focus:ring-1 focus:ring-fade-text"
            />
          </div>
        </div>
  
        <ul className="pb-12 overflow-y-auto h-[calc(100vh-8rem)]">
          {filtered.map((c) => (
            <li key={c.id}>
              <Button
                onClick={() => onSelect(c.id)}
                className={clsx(
                  "w-full flex items-center gap-4 px-6 py-3 transition rounded-none",
                  activeId === c.id
                    ? "bg-[#F5F5F5]"
                    : "hover:bg-[#F5F5F580]"
                )}
              >
                <div className="relative">
                  <img
                    src={c.avatar}
                    alt="avatar"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  {c?.isOnline && <span
                    className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500"
                  />}
                </div>
                <div className="flex-1 text-left min-w-0 flex-col">
                  <div className="flex items-center gap-2 justify-between">
                    <p className="truncate font-medium text-rich-black flex flex-row gap-1 items-center">{c.name}<Shield size={16}/></p> 
                    <div className="pl-2 text-xs text-navy-grey">{c.time}</div>
                  </div>
                  <div className="text-sm text-navy-grey flex flex-row gap-2 justify-between">
                    <p className="truncate">{c.lastMessage}</p>
                    {c?.unread > 0 && (
                      <div className="h-[18px] w-[18px] rounded-full bg-primary flex items-center justify-center text-white text-xs">{c?.unread}</div>
                    )}
                  </div>
                </div>
              </Button>
            </li>
          ))}
        </ul>
      </aside>
    );
  }