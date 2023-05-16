import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { clearVideos } from "../store/youtube/YoutubeSlice";
import { getSearchPageVideos } from "../store/reducers/getSearchPageVideos";
import Navbar from "../components/Navbar";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../components/Spinner";
import SearchCard from "../components/SearchCard";
import { HomePageVideos } from "../Types";
import Sidebar from "../components/Sidebar";

const Search = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.videos);
  console.log({videos})
  const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);

  useEffect(() => {
    dispatch(clearVideos());
    if (searchTerm === "") navigate("/");
    else {
      dispatch(getSearchPageVideos(false));
    }
  }, [dispatch, navigate, searchTerm]);

  return (
    <div className="max-h-screen overflow-hidden">
      <div style={{ height: "7.5vh" }}>
        <Navbar />
      </div>
      <div className="flex" style={{ height: "92.5vh" }}>
        <Sidebar />
        {videos.length ? (
          <div className="py-8 pl-8 flex flex-col gap-5 w-full">
            <InfiniteScroll
              dataLength={videos.length}
              next={() => dispatch(getSearchPageVideos(true))}
              hasMore={videos.length < 500}
              loader={<Spinner />}
              height={600}
            >
              {videos.map((item: HomePageVideos,index) => {
                return (
                  <div className="my-5">
                    <SearchCard data={item} key={item.videoId.concat(index +'')} />
                  </div>
                );
              })}
            </InfiniteScroll>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  )
}

export default Search