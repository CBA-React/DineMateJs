import { MoreVertical, Search } from "lucide-react";
import { ButtonCustom as ButtonCustom } from "/src/components/ui/ButtonCustom";
import { ChatMenu } from "./ChatMenu";
import { useState } from "react";
import { useDeleteChat } from "/src/hooks/useDeleteChat";
import { useIsMobile } from "/src/hooks/useIsMobile";
import { ChevronLeft } from "lucide-react";

export const ChatHeader = ({ conversation, returnToChats }) => {
    const [chatMenuOpen, setChatMenuOpen] = useState(false);
    const [notifOn, setNotifOn] = useState(true);
    const { deleteChat: openDeleteChatModal } = useDeleteChat();

    const isMobile = useIsMobile();

    const handleDeleteChat = () => {
        setChatMenuOpen(false);
        openDeleteChatModal(conversation.id);
    }

    if (!conversation) return null;
    if(isMobile) return (
      <div className="flex items-center justify-between px-5 py-3 border-b border-l border-[#D9DCD0] bg-white">
        <div className="flex items-center justify-between gap-3 w-full">
          <ButtonCustom className="max-w-min" onClick={returnToChats}>
            <ChevronLeft />
          </ButtonCustom>
          <div className="text-center">
            <div className="font-medium text-rich-black">{conversation.name}</div>
            <div className="text-sm text-navy-grey">
              {conversation.isOnline ? "Online" : "Offline"}
            </div>
          </div>
          <ButtonCustom className="max-w-max" onClick={() => setChatMenuOpen((v) => !v)}>
            <img src={conversation.avatar} alt="avatar" className="h-10 w-10 rounded-full" />
          </ButtonCustom>
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
    )

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
            <ButtonCustom className="h-fit p-2 flex items-center justify-center rounded-full hover:bg-neutral-100">
              <Search size={24} className="text-primary-text" />
            </ButtonCustom>
            <ButtonCustom onClick={() => setChatMenuOpen((v) => !v)} className="h-fit p-2 flex items-center justify-center rounded-full hover:bg-neutral-100">
              <MoreVertical size={24} className="text-primary-text" />
            </ButtonCustom>
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