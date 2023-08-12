import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { cn } from '@/lib/utils';

export default function UserInfo({ session, className }) {
  return (
    <div className={cn('inline-flex gap-2 items-center py-2', className)}>
      <Avatar className="w-4 h-4 lg:h-6 lg:w-6 bg-white">
        <AvatarImage
          src={session?.avatar}
          className="object-cover border rounded-full"
        ></AvatarImage>
        <AvatarFallback>{session?.fullname?.charAt(0)}</AvatarFallback>
      </Avatar>
      <p className="font-medium line-clamp-1">
        {session?.fullname} - <span className="text-slate-400">@{session?.username}</span>
      </p>
    </div>
  );
}
