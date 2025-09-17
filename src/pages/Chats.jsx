import { useMemo, useState } from "react";
import { MOCK_MESSAGES_BY_ID, MOCK_CONVERSATIONS } from "/src/constants";
import { Sidebar } from "/src/components/chats/Sidebar";
import { ChatArea } from "/src/components/chats/ChatArea";
import { DeleteChatModal } from "/src/components/chats/DeleteChatModal";

const Chats = () => {
    const [activeId, setActiveId] = useState(null);
    const [messages, setMessages] = useState(MOCK_MESSAGES_BY_ID);
  
    const activeConversation = useMemo(
      () => MOCK_CONVERSATIONS.find((c) => c.id === activeId) || null,
      [activeId]
    );
  
    const activeMessages = useMemo(
      () => (activeId ? messages[activeId] || [] : []),
      [activeId, messages]
    );

    const handleSend = (text) => {
      if (!activeId) return;
      setMessages((prev) => ({
        ...prev,
        [activeId]: [
          ...(prev[activeId] || []),
          {
            id: Date.now(),
            authorId: "me",
            text,
            ts: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ],
      }));
    };
  
    return (
    <div className="relative w-full">
        <div  className="pt-[180px] pb-[100px] relative"
            style={{
                background: 'linear-gradient(270deg, #F2F2F2 0%, #FFEDEE 50%, #FFF0F1 100%)',
                minHeight: '600px'
              }}
        >
        <div className="mx-auto max-w-[1200px] rounded-[20px] overflow-hidden bg-white">
          <div className="flex h-[78vh]">
            <Sidebar
              conversations={MOCK_CONVERSATIONS}
              activeId={activeId}
              onSelect={setActiveId}
            />
            <div className="flex-1">
              <ChatArea
                conversation={activeConversation}
                messages={activeMessages}
                onSend={handleSend}
              />
            </div>
          </div>
        </div>
        </div>
        <DeleteChatModal />
      </div>
    );
  }

export default Chats;