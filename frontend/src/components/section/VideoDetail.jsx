import { CalendarIcon, EyeIcon } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { formatDate, simplifyNumber } from '@/lib/utils';

export default function VideoDetail({ video, children }) {
  return (
    <>
      <h2 className="text-lg font-bold">{video.title}</h2>
      <div className="flex py-1 justify-between">
        <div className="inline-flex gap-2 items-center">
          <Avatar className="w-4 h-4 lg:h-6 lg:w-6 bg-white">
            <AvatarImage
              src={video.channelId?.avatar}
              className="object-cover border rounded-full"
            ></AvatarImage>
            <AvatarFallback>{video.channelId?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <p className="text-sm font-medium line-clamp-1">{video.channelId?.name}</p>
        </div>
        {children}
      </div>
      <ul className="flex flex-col gap-2 text-xs bg-slate-700 px-3 py-3 rounded-md">
        <li className="inline-flex items-center">
          <CalendarIcon className="inline-block mr-2" size={14} />
          {formatDate(video.createdAt)}
        </li>
        <li className="inline-flex items-center">
          <EyeIcon className="inline-block mr-2" size={14} />
          {simplifyNumber(video.views)} views
        </li>
      </ul>
    </>
  );
}
