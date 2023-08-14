/* eslint-disable react-hooks/exhaustive-deps */
import { MessagesSquare, ThumbsUpIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import CommentForm from '@/components/section/CommentForm';
import CommentItem from '@/components/section/CommentItem';
import Header from '@/components/section/Header';
import { ItemTransition, PageTransition } from '@/components/section/LayoutTransition';
import ProductCard from '@/components/section/ProductCard';
import UserInfo from '@/components/section/UserInfo';
import VideoDetail from '@/components/section/VideoDetail';
import { Button } from '@/components/ui/Button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/Sheet';
import useSession from '@/hooks/useSession';
import useSocket from '@/hooks/useSocket';
import { toast } from '@/hooks/useToast';
import { isObjectEmpty } from '@/lib/utils';
import { getComments, postComment } from '@/services/commentService';
import {
  getProducts,
  getVideoById,
  updateVideoLikes,
  updateVideoViews,
} from '@/services/videoService';

export default function Detail() {
  const { videoId } = useParams();
  const [video, setVideo] = useState({});
  const [notification, setNotification] = useState({});
  const [products, setProducts] = useState([]);
  const [videoLikesCount, setVideoLikesCount] = useState(0);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [session, setSession] = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { comments, setInitialComments, sendComment, joinRoom } = useSocket();

  const handleErrorResponse = (error, title = 'Oops...', codeThreshold = 500) => {
    const type = error.code >= codeThreshold ? 'destructive' : 'default';
    return {
      title,
      type,
      message: error.response?.data?.error || error.message,
    };
  };

  const getVideo = async () => {
    try {
      const { data } = await getVideoById(videoId);
      setVideo(data);
      setVideoLikesCount(data.likesCount);
    } catch (error) {
      setNotification(handleErrorResponse(error));
    }
  };

  const updateView = async () => {
    try {
      await updateVideoViews(videoId);
    } catch (error) {
      setNotification(handleErrorResponse(error));
    }
  };

  const likeVideo = async () => {
    try {
      await updateVideoLikes(videoId);
      setVideoLikesCount((prev) => prev + 1);
    } catch (error) {
      setNotification(handleErrorResponse(error));
    }
  };

  const getAllProducts = async () => {
    try {
      const { data } = await getProducts(videoId);
      setProducts(data.products);
    } catch (error) {
      setNotification(handleErrorResponse(error));
    }
  };

  const getInitialComments = async () => {
    try {
      const { data } = await getComments(videoId);
      setInitialComments(data.comments);
    } catch (error) {
      setNotification(handleErrorResponse(error));
    }
  };

  const submitComment = async (commentData) => {
    try {
      const { data, message } = await postComment(commentData);
      sendComment(data);
      setSheetOpen(false);
      setNotification({
        title: 'Info',
        type: 'default',
        message,
      });
      const { username, avatar, fullname } = data;
      setSession({ username, avatar, fullname });
    } catch (error) {
      setNotification({
        title: 'Ooops...!',
        type: 'destructive',
        message: error.message,
      });
    }
  };

  const handleComment = async (data) => {
    setIsLoading(true);
    const commentData = { ...data, ...session, videoId };
    await submitComment(commentData);
    setIsLoading(false);
  };

  useEffect(() => {
    getVideo();
    updateView();
    getAllProducts();
    getInitialComments();
  }, [videoId]);

  useEffect(() => {
    if (notification.message) {
      toast({
        title: notification.title,
        description: notification.message,
        variant: notification.type,
      });
    }
  }, [notification]);

  useEffect(() => {
    joinRoom(videoId);
  }, []);

  return (
    <PageTransition>
      <Helmet>
        <title>{video?.title}</title>
      </Helmet>
      <Header>
        {!isObjectEmpty(session) && (
          <UserInfo session={session} className="rounded-full px-3 py-1 bg-slate-900 text-sm" />
        )}
      </Header>
      {!isObjectEmpty(video) && (
        <div className="flex flex-col lg:flex-row lg:justify-between gap-4 flex-1">
          <div className="group lg:w-2/3 relative bg-slate-700 h-0 pb-[56.25%] overflow-hidden">
            <ItemTransition>
              <iframe
                src={`${video.url}?controls=0&autoplay=1&loop=1&rel=0`}
                className="w-full h-full absolute border-0"
              />
              <div className="w-full absolute top-0 z-10 px-1.5 py-1 lg:px-5 lg:py-4 flex justify-between items-center lg:items-start bg-black">
                <p className="line-clamp-1 lg:line-clamp-2">{video.title}</p>
              </div>
              <div className="absolute top-1/2 transform -translate-y-1/2 right-0 overflow-y-auto touch-pan-y snap-y lg:block space-y-2 hide-scrollbar hidden h-[65%] z-20 pr-4">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} className="w-24" />
                ))}
              </div>
            </ItemTransition>
          </div>
          <div className="lg:w-1/3 w-full space-y-2 relative">
            <ItemTransition>
              <VideoDetail video={video}>
                <Button
                  className="inline-flex items-center py-0.5 px-3"
                  variant="greeny"
                  onClick={() => likeVideo()}
                >
                  <ThumbsUpIcon size={16} />
                  <span className="ml-1">{videoLikesCount}</span>
                </Button>
              </VideoDetail>
              <div className="overflow-auto touch-pan-x gap-4 flex-nowrap flex snap-x hide-scrollbar lg:hidden pt-2">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              <h3 className="font-semibold py-3">
                <MessagesSquare size={20} className="inline-block mr-1" /> Comments
              </h3>
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button className="block w-full" variant="primary">
                    Post comment
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="bottom"
                  className="bg-slate-800 text-slate-50 border-t-0 mr-auto"
                >
                  <SheetHeader>
                    <SheetTitle className="text-white font-bold">Post comment</SheetTitle>
                  </SheetHeader>
                  <CommentForm onSubmit={handleComment} isLoading={isLoading} />
                </SheetContent>
              </Sheet>
              <div className="h-56 pb-5 my-3 overflow-auto space-y-1">
                {comments.map((comment) => (
                  <CommentItem key={comment._id} comment={comment} />
                ))}
              </div>
            </ItemTransition>
          </div>
        </div>
      )}
    </PageTransition>
  );
}
