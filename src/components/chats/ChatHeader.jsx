import { MoreVertical, Search } from "lucide-react";
import { Button } from "/src/components/ui/Button";
import { ChatMenu } from "./ChatMenu";
import { useState } from "react";
import { useDeleteChat } from "/src/hooks/useDeleteChat";

export const ChatHeader = ({ conversation }) => {
    const [chatMenuOpen, setChatMenuOpen] = useState(false);
    const [notifOn, setNotifOn] = useState(true);
    const { deleteChat: openDeleteChatModal } = useDeleteChat();

    const handleDeleteChat = () => {
        setChatMenuOpen(false);
        openDeleteChatModal(conversation.id);
    }

    if (!conversation) return null;
    return (
      <div className="flex items-center justify-between px-6 py-2.5 border-b border-l border-[#D9DCD0] bg-white">
        <div className="flex items-center gap-3">
          <img src={conversation.avatar} alt="avatar" className="h-10 w-10 rounded-full" />
          <div>
            <div className="font-medium text-rich-black">{conversation.name}</div>
            <div className="text-sm text-navy-grey">
              {conversation.isOnline ? "Online" : "Offline"}
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-5 pl-2">
            <Button className="h-fit p-2 flex items-center justify-center rounded-full hover:bg-neutral-100">
              <Search size={24} className="text-primary-text" />
            </Button>
            <Button onClick={() => setChatMenuOpen((v) => !v)} className="h-fit p-2 flex items-center justify-center rounded-full hover:bg-neutral-100">
              <MoreVertical size={24} className="text-primary-text" />
            </Button>
            <ChatMenu
                open={chatMenuOpen}
                onClose={() => setChatMenuOpen(false)}
                notifOn={notifOn}
                setNotifOn={setNotifOn}
                onViewProfile={() => {}}
                onDelete={handleDeleteChat}
            />
        </div>
      </div>
    );
};