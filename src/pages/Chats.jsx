import { useMemo, useState } from "react";
import { MOCK_MESSAGES_BY_ID, MOCK_CONVERSATIONS } from "/src/constants";
import { Sidebar } from "/src/components/chats/Sidebar";
import { ChatArea } from "/src/components/chats/ChatArea";
import { DeleteChatModal } from "/src/components/chats/DeleteChatModal";
import { useIsMobile } from "/src/hooks/useIsMobile";
import clsx from "clsx";

const Chats = () => {
    const isMobile = useIsMobile();
    const [activeId, setActiveId] = useState(null);
    const [messages, setMessages] = useState(MOCK_MESSAGES_BY_ID);
  
    const activeConversation = useMemo(
      () => MOCK_CONVERSATIONS.find((c) => c.id === activeId) || null,
      [activeId]
    );

    const handleReturn = () => {
      setActiveId(null);
    }
  
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
        <div className={clsx(
    "relative w-full md:pt-[180px] md:pb-[100px]",
    activeConversation
      ? "pt-[75px] pb-0 px-0"
      : "pt-[112px] pb-[60px] px-5"
  )}
            style={{
                background: 'linear-gradient(270deg, #F2F2F2 0%, #FFEDEE 50%, #FFF0F1 100%)',
              }}
        >
        <div className={`mx-auto max-w-[1200px] rounded-[${activeConversation && isMobile ? "0" : "20px"}] overflow-hidden bg-white`}>
          {isMobile ? (
            activeConversation ? (
              <div className="flex flex-col">
                <ChatArea
                  conversation={activeConversation}
                  messages={activeMessages}
                  onSend={handleSend}
                  onReturn={handleReturn}
                />
              </div>
            ) : (
              <Sidebar
                conversations={MOCK_CONVERSATIONS}
                activeId={activeId}
                onSelect={setActiveId}
                className="max-h-[650px] w-full"
              />
            )
          ) : (
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
          )}
        </div>
      </div>
      <DeleteChatModal />
    </div>
    );
  }

export default Chats;