import { UserRound, Trash2 } from "lucide-react";
import { Switch } from "/src/components/ui/Switch";
import { Button } from "/src/components/ui/Button";

export const ChatMenu = ({ open, onViewProfile, onDelete, notifOn, setNotifOn }) => {

    if (!open) return null;

    return (
      <div className="absolute right-6 mt-2 top-16 w-56 rounded-2xl bg-white overflow-hidden z-50 py-4 text-primary-text">
        <div className="flex items-center gap-2.5 py-2 px-5 ">
            <Switch checked={notifOn} onChange={setNotifOn} size="md" className="w-full max-w-min text-left rounded-[5px] hover:bg-accent/10 cursor-pointer flex items-center relative" /> 
            <span>Notifications</span>
        </div>
        <Button className="w-full text-left py-2 px-5 rounded-[5px] hover:bg-accent/10 cursor-pointer flex items-center gap-2.5" onClick={onViewProfile}>
          <UserRound size={18} /> <span>View Profile</span>
        </Button>
        <Button className="w-full text-left py-2 px-5 rounded-[5px] hover:bg-accent/10 cursor-pointer text-primary flex items-center gap-2.5" onClick={onDelete}>
          <Trash2 size={18} /> <span>Delete chat</span>
        </Button>
      </div>
    );
  }