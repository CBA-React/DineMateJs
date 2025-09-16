const TEXT = {
    placeholderText: "Choose someone to start chatting with",
}

export const ChatPlaceholder = () => {
    return (
      <div className="flex-1 grid place-items-center z-10">
        <div className="bg-white/60 rounded-full px-3 py-1 text-primary-text border border-white">
            {TEXT.placeholderText}
        </div>
      </div>
    );
}