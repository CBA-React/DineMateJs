import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, UserRound, Settings, LogOut } from "lucide-react";

const ProfileMenu = ({
  user = { name: "Peter Parker", age: 27, avatarUrl: "pictures/avatar.jpg" },
  onLogout,
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onDoc = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const onKeyDown = (e) => {
    if (e.key === "Escape") setOpen(false);
    if ((e.key === "Enter" || e.key === " ") && !open) {
      e.preventDefault();
      setOpen(true);
    }
    if (e.key === "ArrowDown" && !open) {
      e.preventDefault();
      setOpen(true);
    }
  };

  return (
    <div ref={rootRef} className={`relative ${className}`}>

      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onKeyDown}
        className="flex items-center gap-3 rounded-full hover:underline underline-offset-2
                   focus:outline-none"
      >
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="hidden sm:block text-left cursor-text">
          <div className="font-medium">{user.name}</div>
          <div className="text-sm">{user.age} y.o</div>
        </div>
        <ChevronDown
          className={`ml-1 transition-transform cursor-pointer ${open ? "rotate-180" : ""}`}
          size={18}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 top-10 mt-4 lg:w-52 rounded-xl bg-white shadow-lg overflow-hidden z-50 py-2"
        >
          <Link
            to="/profile"
            role="menuitem"
            className="flex items-center gap-3 px-5 py-2 hover:bg-accent/10 rounded-[5px]"
            onClick={() => setOpen(false)}
          >
            <UserRound size={20} />
            <span>My profile</span>
          </Link>

          <Link
            to="/settings"
            role="menuitem"
            className="flex items-center gap-3 px-5 py-2 hover:bg-accent/10 rounded-[5px]"
            onClick={() => setOpen(false)}
          >
            <Settings size={20} />
            <span>Settings</span>
          </Link>

          <button
            role="menuitem"
            className="w-full cursor-pointer text-left flex items-center gap-3 px-5 py-2 hover:bg-red-50 text-red-600 rounded-[5px]"
            onClick={() => {
              setOpen(false);
              onLogout ? onLogout() : navigate("/login");
            }}
          >
            <LogOut size={20} />
            <span>Log out</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
