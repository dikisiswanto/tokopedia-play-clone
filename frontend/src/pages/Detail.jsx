/* eslint-disable react-hooks/exhaustive-deps */
import Header from "@/components/section/Header";
import ProductCard from "@/components/section/ProductCard";
import { toast } from "@/components/ui/use-toast";
import VideoDetail from "@/components/section/VideoDetail";
import { Button } from "@/components/ui/Button";
import {
  getProducts,
  getVideoById,
  updateVideoLikes,
  updateVideoViews,
} from "@/services/videoService";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ThumbsUpIcon } from "lucide-react";

export default function Detail() {
  const { videoId } = useParams();
  const [video, setVideo] = useState({});
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [videoLikesCount, setVideoLikesCount] = useState(0);

  const getVideo = async () => {
    try {
      const { data } = await getVideoById(videoId);
      setVideo(data);
      setVideoLikesCount(data.likesCount);
    } catch (error) {
      setError(error.message);
    }
  };

  const updateView = async () => {
    try {
      await updateVideoViews(videoId);
    } catch (error) {
      setError(error.message);
    }
  };

  const likeVideo = async () => {
    try {
      await updateVideoLikes(videoId);
      setVideoLikesCount((prev) => prev + 1);
    } catch (error) {
      setError("Anda sudah menyukai video ini");
    }
  };

  const handleLikeVideo = () => {
    setError("");
    likeVideo();
  };

  const getAllProducts = async () => {
    try {
      const { data } = await getProducts(videoId);
      setProducts(data.products);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getVideo();
    updateView();
    getAllProducts();
    if (error) {
      toast({
        title: "Terjadi kesalahan",
        description: error,
        variant: "destructive",
      });
    }
  }, [videoId, error]);

  return (
    <>
      <Header />
      {video && (
        <div className="flex flex-col lg:flex-row items-start lg:justify-between gap-4 flex-1">
          <div className="group lg:w-2/3 relative bg-slate-700 h-0 pb-[56.25%] overflow-hidden">
            <iframe
              src={`${video.url}?controls=0&autoplay=1&loop=1&rel=0`}
              className="w-full h-full absolute border-0"
            />
            <div className="w-full absolute top-0 z-10 px-1.5 py-1 lg:px-5 lg:py-4 flex justify-between items-center lg:items-start bg-black">
              <p className="line-clamp-1 lg:line-clamp-2">{video.title}</p>
            </div>
            <div className="absolute top-1/2 transform -translate-y-1/2 right-0 overflow-auto touch-pan-y gap-2 flex-nowrap lg:flex flex-col snap-x hide-scrollbar hidden h-[60%] z-10">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  className="w-24"
                />
              ))}
            </div>
          </div>
          <div className="lg:w-1/3 w-full space-y-2">
            <VideoDetail video={video}>
              <Button
                className="inline-flex items-center"
                variant="greeny"
                onClick={() => handleLikeVideo()}
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
          </div>
        </div>
      )}
    </>
  );
}
