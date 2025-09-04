import { Verified } from "lucide-react";

export const PhotoCard = ({
    image,
    avatar = "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&auto=format&fit=crop",
    handle = '@mytechceo',
    followers = '254k followers',
  }) => {
    return (
        <article className="break-inside-avoid rounded-3xl overflow-hidden shadow-sm border border-gray-200 mb-6">
        <div className="relative">
          <img src={image} alt="" className="w-full h-[440px] object-cover" />
  
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
  
          <div className="absolute left-4 top-4 flex items-center gap-2 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,.75)]">
            <img
              src={avatar}
              alt=""
              className="h-8 w-8 rounded-full object-cover"
            />
            <div className="leading-tight">
              <div className="flex items-center gap-1">
                <span className="text-[15px] font-medium">{handle}</span>
                <Verified fill="#42A5F5" size={15} className="text-white" />
              </div>
              <div className="text-sm text-white/60">{followers}</div>
            </div>
          </div>
        </div>
      </article>
    );
  }