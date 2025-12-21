import { useEffect, useState } from "react";
import RightSidebar from "../components/layout/RightSidebar";
import Sidebar from "../components/layout/Sidebar";
import TweetForm from "../components/tweet/TweetForm";
import apiClient from "../apis/apiClient";
import TweetCard from "../components/tweet/TweetCard";
import PaginationButtons from "../components/ui/PaginationButtons";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const active = "border-b-4 border-sky-500 pt-1 font-bold text-white";
const LIMIT = 5;

const HomePage = () => {
  const { currentUser } = useCurrentUser();

  const [activeTab, setActiveTab] = useState("recommend");
  const [tweets, setTweets] = useState([]);
  const [tweetCount, setTweetCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const res = await apiClient.get(
          `/tweets?limit=${LIMIT}&offset=${offset}`,
        );
        setTweets(res.data.tweets);
        setTweetCount(res.data.count);
      } catch (e) {
        console.error(e);
      }
    };
    fetchTweets();
  }, [offset, reloadKey]);

  const handlePrev = () => {
    if (offset === 0) return;
    setOffset((prev) => prev - LIMIT);
  };

  const handleNext = () => {
    if (offset + LIMIT >= tweetCount) return;
    setOffset((prev) => prev + LIMIT);
  };

  const reloadTweets = () => {
    setOffset(0);
    setReloadKey((prev) => prev + 1); //offset=0 の状態でも必ず一覧をリロードする
  };

  return (
    <div className="grid min-h-screen grid-cols-12 justify-center">
      <div className="col-span-3 pt-3 pl-23">
        <Sidebar user={currentUser} />
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
            <TweetForm user={currentUser} reloadTweets={reloadTweets} />
            {tweets.map((tweet) => (
              <TweetCard
                key={tweet.id}
                tweet={tweet}
                reloadTweets={reloadTweets}
              />
            ))}
            <PaginationButtons onPrev={handlePrev} onNext={handleNext} />
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
