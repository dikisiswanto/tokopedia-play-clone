import { LazyLoadImage } from "react-lazy-load-image-component";
import { NavLink } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import "react-lazy-load-image-component/src/effects/blur.css";
import { EyeIcon } from "lucide-react";

export default function VideoCard({ data }) {
  return (
    <NavLink to={`/video/${data._id}`} className="w-full lg:h-96 md:h-80 h-64 overflow-hidden relative rounded-lg bg-slate-700/80 shadow-xl border border-slate-700">
      <LazyLoadImage
        loading="lazy"
        effect="blur"
        width={300}
        height={600}
        src={data.thumbnail}
        alt={data.title}
        className="w-full lg:h-96 md:h-80 h-64 object-cover object-center"
      />
      <span className="bg-slate-700/70 absolute top-0 inline-block px-2 py-1 text-xs ml-3 mt-3 rounded font-medium"><EyeIcon className={"h-4 w-4 mr-0.5 inline-block"} /> {data.views}</span>

      <div className="absolute bottom-0 left-0 pt-12 pb-3 px-3 bg-gradient-to-b from-transparent to-slate-900/90 space-y-1.5 w-full">
        <p className="line-clamp-2 text-sm">{data.title}</p>
        <div className="inline-flex gap-2 items-center">
          <Avatar className="h-5 w-5 bg-white">
            <AvatarImage src={data.channelId?.avatar} className="object-cover border rounded-full"></AvatarImage>
            <AvatarFallback>{data.channelId?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <p className="text-xs line-clamp-1">{data.channelId?.name}</p>
        </div>
      </div>
    </NavLink>
  )
}