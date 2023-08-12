import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { convertToLocalTime } from '@/lib/utils';

export default function CommentItem({ comment }) {
  return (
    <div className="flex gap-2 pr-2">
      <Avatar className="w-3 h-3 lg:h-5 lg:w-5 bg-white flex-shrink-0">
        <AvatarImage
          src={comment?.avatar}
          className="object-cover border rounded-full"
        ></AvatarImage>
        <AvatarFallback>{comment?.fullname?.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="rounded-tr-xl rounded-b-xl bg-slate-700/60 w-full py-1.5 px-2">
        <span className="font-semibold text-slate-100 text-xs block">{comment.fullname}</span>
        <span className="text-slate-200 text-[0.65rem] block">
          {convertToLocalTime(comment.createdAt)}
        </span>
        <p className="text-sm pt-1">{comment.comment}</p>
      </div>
    </div>
  );
}
