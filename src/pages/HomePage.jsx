import { useEffect, useState } from "react";
import RightSidebar from "../components/layout/RightSidebar";
import Sidebar from "../components/layout/Sidebar";
import TweetForm from "../components/tweet/TweetForm";
import apiClient from "../apis/apiClient";
import TweetCard from "../components/tweet/TweetCard";
import PaginationButtons from "../components/ui/PaginationButtons";

const active = "border-b-4 border-sky-500 pt-1 font-bold text-white";
const LIMIT = 5;

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("recommend");
  const [user, setUser] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [followingTweets, setFollowingTweets] = useState([]);
  const [tweetCount, setTweetCount] = useState(0);
  const [followingTweetCount, setFollowingTweetCount] = useState(0);
  const [recommendedOffset, setRecommendedOffset] = useState(0);
  const [followingOffset, setFollowingOffset] = useState(0);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiClient.get("/users/me");
        setUser(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchRecommendedTweets = async () => {
      try {
        const res = await apiClient.get(
          `/tweets?limit=${LIMIT}&recommended_offset=${recommendedOffset}`,
        );
        setTweets(res.data.tweets.data);
        setTweetCount(res.data.tweets.count);
      } catch (e) {
        console.error(e);
      }
    };
    fetchRecommendedTweets();
  }, [recommendedOffset, reloadKey]);

  useEffect(() => {
    const fetchFollowingTweets = async () => {
      try {
        const res = await apiClient.get(
          `/tweets?limit=${LIMIT}&following_offset=${followingOffset}`,
        );
        setFollowingTweets(res.data.followingTweets.data);
        setFollowingTweetCount(res.data.followingTweets.count);
      } catch (e) {
        console.error(e);
      }
    };
    fetchFollowingTweets();
  }, [followingOffset, reloadKey]);

  const handleRecommendPrev = () => {
    if (recommendedOffset === 0) return;

    setRecommendedOffset((prev) => prev - LIMIT);
  };

  const handleRecommendNext = () => {
    if (recommendedOffset + LIMIT >= tweetCount) return;

    setRecommendedOffset((prev) => prev + LIMIT);
  };

  const handleFollowPrev = () => {
    if (followingOffset === 0) return;

    setFollowingOffset((prev) => prev - LIMIT);
  };

  const handleFollowNext = () => {
    if (followingOffset + LIMIT >= followingTweetCount) return;

    setFollowingOffset((prev) => prev + LIMIT);
  };

  const reloadTweets = () => {
    setRecommendedOffset(0);
    setFollowingOffset(0);
    setReloadKey((prev) => prev + 1); //offset=0 の状態でも必ず一覧をリロードする
  };

  return (
    <div className="grid min-h-screen grid-cols-12 justify-center">
      <div className="col-span-3 pt-3 pl-23">
        <Sidebar user={user} />
      </div>
      <div className="col-span-5 border-s border-e border-gray-700">
        <div className="sticky inset-x-0 top-0 bg-black/90">
          <nav className="grid h-13.5 grid-cols-2 border-b border-gray-700">
            <button
              onClick={() => setActiveTab("recommend")}
              className="flex cursor-pointer justify-center transition-colors duration-200 hover:bg-zinc-900"
            >
              <div
                className={`flex h-full w-fit items-center text-gray-600 ${activeTab === "recommend" ? active : ""}`}
              >
                おすすめ
              </div>
            </button>
            <button
              onClick={() => setActiveTab("follow")}
              className="flex cursor-pointer justify-center transition-colors duration-200 hover:bg-zinc-900"
            >
              <div
                className={`flex h-full w-fit items-center text-gray-600 ${activeTab === "follow" ? active : ""}`}
              >
                フォロー中
              </div>
            </button>
          </nav>
        </div>
        {activeTab === "recommend" && (
          <>
            <TweetForm user={user} reloadTweets={reloadTweets} />
            {tweets.map((tweet) => (
              <TweetCard key={tweet.id} tweet={tweet} />
            ))}
            <PaginationButtons
              onPrev={handleRecommendPrev}
              onNext={handleRecommendNext}
            />
          </>
        )}
        {activeTab === "follow" && (
          <>
            <TweetForm user={user} reloadTweets={reloadTweets} />
            {followingTweets.map((tweet) => (
              <TweetCard key={tweet.id} tweet={tweet} />
            ))}
            <PaginationButtons
              onPrev={handleFollowPrev}
              onNext={handleFollowNext}
            />
          </>
        )}
      </div>
      <div className="col-span-4 pt-1 pl-7">
        <RightSidebar />
      </div>
    </div>
  );
};

export default HomePage;
