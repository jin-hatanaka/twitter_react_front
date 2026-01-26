import { FaArrowLeft } from "react-icons/fa6";
import RightSidebar from "../components/layout/RightSidebar";
import Sidebar from "../components/layout/Sidebar";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { useEffect, useState } from "react";
import apiClient from "../apis/apiClient";
import TweetCard from "../components/tweet/TweetCard";

const BookmarkPage = () => {
  const { currentUser } = useCurrentUser();

  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await apiClient.get("/bookmarks");
        setTweets(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchBookmarks();
  }, []);

  return (
    <div className="grid min-h-screen grid-cols-12 justify-center">
      <div className="col-span-3 pt-3 pl-23">
        <Sidebar user={currentUser} />
      </div>
      <div className="col-span-5 border-s border-e border-gray-700">
        <div className="sticky inset-x-0 top-0 bg-black/90">
          <nav className="flex h-13.5 items-center gap-10 px-4">
            <FaArrowLeft />
            <span className="text-xl font-bold">ブックマーク</span>
          </nav>
        </div>
        <div>
          {tweets.map((tweet) => (
            <TweetCard
              key={tweet.id}
              tweet={tweet}
              isRetweeted={tweet.isRetweeted}
              retweetCount={tweet.retweetCount}
              isLiked={tweet.isLiked}
              likeCount={tweet.likeCount}
              isBookmarked={tweet.isBookmarked}
            />
          ))}
        </div>
      </div>
      <div className="col-span-4 pt-1 pl-7">
        <RightSidebar />
      </div>
    </div>
  );
};

export default BookmarkPage;
