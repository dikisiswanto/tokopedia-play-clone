/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import VideoCard from "@/components/section/VideoCard";
import { tabs } from "@/lib/config";
import { useToast } from "@/hooks/useToast";
import InfiniteScroll from "react-infinite-scroll-component";
import { PlayCircleIcon } from "lucide-react";
import { getVideos } from "@/services/videoService";
import SearchForm from "@/components/section/SearchForm";
import Header from "@/components/section/Header";

export default function Home() {
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const resetState = () => {
    setPage(1);
    setVideos([]);
    setError("");
    setHasMore(true);
    setSearchKeyword("");
    setLoading(false);
  };

  const handleChangeTab = (tabName) => {
    resetState();
    setActiveTab(tabName);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    resetState();
    const keywordVal = event.target.q.value.trim();
    setSearchKeyword(keywordVal);
  };

  const fetchData = useCallback(async () => {
    try {
      const { data } = await getVideos({
        sortField: activeTab,
        page,
        limit: 10,
        query: searchKeyword,
      });

      if (page === 1) {
        setVideos(data.videos);
      } else {
        setVideos((prevData) => [...prevData, ...data.videos]);
      }

      setPage((prevPage) => prevPage + 1);
      setHasMore(data.videos?.length > 0);
      setLoading(false);
    } catch (error) {
      resetState();
      setError(error.response?.data?.error || error.message);
    }
  }, [activeTab, page]);

  useEffect(() => {
    setLoading(true);
    fetchData();
    return () => {
      resetState();
    };
  }, [activeTab, searchKeyword]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Oops...",
        description: error,
        variant: "destructive",
      });
    }
  }, [error]);

  return (
    <>
      <Header>
        <SearchForm onSubmit={handleSubmit} />
      </Header>
      <Tabs className="py-2" value={activeTab} onValueChange={handleChangeTab}>
        <TabsList className="flex gap-1.5 text-sm">
          {tabs.map(({ key, id, name }) => (
            <TabsTrigger key={id} value={key}>
              {name}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={activeTab} className="pt-2 pb-5 flex-1">
          {!error && (
            <InfiniteScroll
              dataLength={videos.length}
              next={fetchData}
              hasMore={hasMore}
              loader={
                <div className="mx-auto col-span-2 md:col-span-3 lg:col-span-5 row-span-1">
                  <PlayCircleIcon
                    className="animate-pulse inline-flex rounded-full bg-green-500 opacity-10"
                    size={48}
                  />
                </div>
              }
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-full overflow-hidden"
            >
              {videos.map((video) => (
                <VideoCard key={video._id} data={video} />
              ))}

              {!loading && !videos.length && <p>Tidak ada video</p>}

              {page === 1 &&
                loading &&
                [...Array(5)].map((_e, i) => (
                  <div
                    key={i}
                    className="w-full lg:h-96 md:h-80 h-64 overflow-hidden relative rounded-lg bg-slate-700/80 shadow-xl animate-pulse"
                  />
                ))}
            </InfiniteScroll>
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}
