/* eslint-disable react-hooks/exhaustive-deps */
import { PlayCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import InfiniteScroll from 'react-infinite-scroll-component';

import Header from '@/components/section/Header';
import SearchForm from '@/components/section/SearchForm';
import VideoCard from '@/components/section/VideoCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { useToast } from '@/hooks/useToast';
import { tabs } from '@/lib/config';
import { getVideos } from '@/services/videoService';

export default function Home() {
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const resetState = () => {
    setPage(1);
    setVideos([]);
    setError('');
    setSearchKeyword('');
    setHasMore(true);
    setLoading(false);
  };

  const handleChangeTab = (tabName) => {
    resetState();
    setActiveTab(tabName);
  };

  const handleSubmit = (data) => {
    const { q: keyword } = data;
    handleChangeTab('search_result');
    setSearchKeyword(keyword);
  };

  const fetchData = async () => {
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
      setError(error.code >= 500 ? error.response?.data?.error : error.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [activeTab, searchKeyword]);

  useEffect(() => {
    if (error) {
      toast({
        title: 'Oops...',
        description: error,
        variant: 'destructive',
      });
    }
  }, [error]);

  return (
    <>
      <Helmet>
        <title>Tokopedia Play Clone</title>
      </Helmet>
      <Header>
        <SearchForm onSubmit={handleSubmit} />
      </Header>
      <Tabs className="py-2" value={activeTab} onValueChange={handleChangeTab}>
        <TabsList className="flex gap-1.5 text-sm overflow-auto hide-scrollbar">
          {tabs.map(({ key, id, name }) => (
            <TabsTrigger key={id} value={key}>
              {name}
            </TabsTrigger>
          ))}
          {searchKeyword && <TabsTrigger value="search_result">🔍 Search result</TabsTrigger>}
        </TabsList>
        <TabsContent value={activeTab} className="pt-2 pb-5 flex-1">
          {!error && searchKeyword && (
            <p className="text-sm pb-5 -mt-5">Showing result for {searchKeyword}</p>
          )}
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

              {!loading && !videos.length && (
                <p className="col-span-2 md:col-span-3 lg:col-span-5 row-span-1">
                  Oops... No video found
                </p>
              )}

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
