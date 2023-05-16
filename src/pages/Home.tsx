
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import { HomePageVideos } from "../Types"
import Card from "../components/Card"
import Spinner from "../components/Spinner"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { clearVideos } from "../store/youtube/YoutubeSlice";
import { getHomePageVideos } from "../store/reducers/getHomePageVideos";

const Home = () => {

    const dispatch = useAppDispatch();
    const videos = useAppSelector((state) => state.youtubeApp.videos);

    useEffect(() => {
        return () => {
            dispatch(clearVideos());
        };
    }, [dispatch]);

    useEffect(() => {
        dispatch(getHomePageVideos(false));
    }, [dispatch]);

    return (
        <div className="max-h-screen overflow-hidden">
            <div style={{ height: '7.5vh' }}>
                {/* navar here  */}
                <Navbar />
            </div>
            <div className="flex" style={{ height: "95.5vh" }}>
                {/* sibebar here  */}
                <Sidebar></Sidebar>
                {
                    videos.length ? (
                        <InfiniteScroll
                            dataLength={videos.length}
                            next={() => dispatch(getHomePageVideos(true))}
                            hasMore={videos.length < 500}
                            loader={<Spinner />}
                            height={750}>
                            <div className="grid gap-y-14 gap-x-8 grid-cols-4 p-8">
                                {videos.map((item: HomePageVideos,index) => {
                                    return <Card data={item} key={item.videoId.concat(index +'')} />;
                                })}
                            </div>
                        </InfiniteScroll>
                    ) : (
                        <Spinner />
                    )
                }
            </div>
        </div>
    )
}

export default Home
