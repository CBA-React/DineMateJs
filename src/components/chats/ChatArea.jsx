import { ChatPlaceholder } from "./ChatPlaceholder";
import { ChatHeader } from "./ChatHeader";
import { MessageInput } from "./MessageInput";
import { MessagesList } from "./MessagesList";

export const ChatArea = ({ conversation, messages, onSend, onReturn }) => {
    return (
        <div className="relative w-full h-full flex border-l-1 border-[#D9DCE0]">
            <img
                src="/pictures/chat-bg-pattern-light.png"
                alt="bg-pattern"
                aria-hidden
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover z-0 pointer-events-none select-none"
            />
            <img
                src="/pictures/chat-bg-gradient.svg"
                alt="bg-gradient"
                aria-hidden
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover z-0 pointer-events-none select-none"
            />
            {
                conversation ? (
                    <div className="flex flex-col min-w-0 h-[600px] md:h-auto z-0 w-full">
                        <ChatHeader returnToChats={onReturn} conversation={conversation} />
                        <MessagesList messages={messages} />
                        <MessageInput onSend={onSend} />
                    </div>
                ) : (
                    <ChatPlaceholder />
                )
            }
        </div>
    )
  }