import { useDispatch, useSelector } from "react-redux";
import { openDeleteChatModal, closeDeleteChatModal } from "/src/features/chats/chatUiSlice";
import { deleteChat as deleteChatAction } from "/src/features/chats/chatsSlice";

export const useDeleteChat = () => {
  const dispatch = useDispatch();
  const deleteChatOpen = useSelector((s) => s.chatUi.deleteChatOpen);
  const pendingChatId = useSelector((s) => s.chatUi.pendingChatId);

  const deleteChat = (chatId) => dispatch(openDeleteChatModal(chatId)); 
  const closeDeleteChatModalFn = () => dispatch(closeDeleteChatModal());
  const confirmDeleteChat = () => {
    if (pendingChatId) dispatch(deleteChatAction(pendingChatId));
    dispatch(closeDeleteChatModal());
  };

  return {
    deleteChatOpen,
    pendingChatId,
    deleteChat,                
    closeDeleteChatModal: closeDeleteChatModalFn,
    confirmDeleteChat,         
  };
}
