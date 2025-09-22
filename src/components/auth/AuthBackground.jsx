export const AuthBackground = ({ src, children }) => {
  return (
    <div className="relative min-h-dvh">
      <img
        src={src}
        alt=""
        aria-hidden
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover z-0 pointer-events-none select-none"
      />
      <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />
      <div className="relative z-20 flex min-h-dvh items-center justify-center p-5 md:p-4">
        {children}
      </div>
    </div>
  );
};
