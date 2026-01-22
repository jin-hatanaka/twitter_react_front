import { FaArrowLeft } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import { RiLink } from "react-icons/ri";
import { PiBalloon } from "react-icons/pi";
import { PiCalendarDots } from "react-icons/pi";
import RightSidebar from "../components/layout/RightSidebar";
import Sidebar from "../components/layout/Sidebar";
import ProfileEditButton from "../components/ui/ProfileEditButton";
import { useEffect, useState } from "react";
import ProfileEditModal from "../components/ui/ProfileEditModal";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../apis/apiClient";
import { cdate } from "cdate";
import TweetCard from "../components/tweet/TweetCard";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import FollowButton from "../components/ui/FollowButton";
import MessageButton from "../components/ui/MessageButton";

const tabs = [
  { key: "post", label: "ポスト" },
  { key: "comment", label: "コメント" },
  { key: "media", label: "メディア" },
  { key: "like", label: "いいね" },
];
const active = "border-b-4 border-sky-500 pt-1 font-bold text-white";

const ProfilePage = () => {
  const { currentUser } = useCurrentUser();

  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [tweets, setTweets] = useState([]);
  const [tweetCount, setTweetCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [isOpenProfileEdit, setIsOpenProfileEdit] = useState(false);
  const [activeTab, setActiveTab] = useState("post");

  const fetchComments = async () => {
    try {
      const res = await apiClient.get(`/users/${id}`);
      setComments(res.data.comments);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await apiClient.get(`/users/${id}`);
      setUser(res.data.user);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const res = await apiClient.get(`/users/${id}`);
      setUser(res.data.user);
      setTweets(res.data.tweets);
      setTweetCount(res.data.tweetCount);
      setComments(res.data.comments);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [id]);

  const handleClickFollow = async () => {
    try {
      if (user.isFollowed) {
        await apiClient.delete(`/users/${user.id}/unfollow`);
        fetchUser();
      } else {
        await apiClient.post(`/users/${user.id}/follow`);
        fetchUser();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleClickMessage = async () => {
    try {
      await apiClient.post("/groups", {
        user_id: user.id,
      });
      navigate("/message");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-12 justify-center">
      <div className="col-span-3 pt-3 pl-23">
        <Sidebar user={currentUser} />
      </div>
      <div className="col-span-5 border-s border-e border-gray-700">
        <div className="sticky inset-x-0 top-0 z-20 bg-black/90">
          <nav className="flex h-13.5 items-center gap-10 px-4">
            <FaArrowLeft />
            <div className="flex flex-col justify-center">
              <span className="text-xl font-bold">{user.name}</span>
              <span className="text-sm text-gray-500">
                {tweetCount} 件のポスト
              </span>
            </div>
          </nav>
        </div>
        <div className="relative">
          {user?.headerImage ? (
            <img src={user.headerImage} />
          ) : (
            <div className="h-50"></div>
          )}
          <div className="absolute top-31 left-4 flex h-35 w-35 items-center justify-center rounded-full bg-black">
            <div className="rounded-full">
              {user?.iconImage && (
                <img src={user.iconImage} className="rounded-full" />
              )}
            </div>
          </div>
          <div className="mb-4 flex flex-col px-4 pt-3">
            <div className="mb-7 ml-auto">
              {user.id === currentUser?.id ? (
                <ProfileEditButton onClick={() => setIsOpenProfileEdit(true)} />
              ) : (
                <div className="flex items-center gap-2">
                  <MessageButton onClickMessage={handleClickMessage} />
                  <FollowButton
                    isFollowed={user.isFollowed}
                    onClickFollow={handleClickFollow}
                  />
                </div>
              )}
              <ProfileEditModal
                isOpen={isOpenProfileEdit}
                onClose={() => {
                  setIsOpenProfileEdit(false);
                  fetchUserProfile();
                }}
                user={user}
              />
            </div>
            <div className="mt-1 mb-3 flex flex-col">
              <span className="text-xl font-bold">{user.name}</span>
              <span className="text-gray-500">@x_clone</span>
            </div>
            {user.selfIntroduction && (
              <div className="mb-3 whitespace-pre-line">
                <span>{user.selfIntroduction}</span>
              </div>
            )}
            <div className="mb-3 flex flex-wrap items-center gap-x-2 text-gray-500">
              {user.place && (
                <div className="flex items-center gap-1">
                  <FiMapPin />
                  <span>{user.place}</span>
                </div>
              )}
              {user.website && (
                <div className="flex items-center gap-1">
                  <RiLink />
                  <span>{user.website}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <PiBalloon />
                <span>誕生日: {cdate(user.birthDate).format("M月D日")}</span>
              </div>
              <div className="flex items-center gap-1">
                <PiCalendarDots />
                <span>2025年1月からXを利用しています</span>
              </div>
            </div>
            <div className="flex gap-3 text-sm">
              <div className="flex gap-1">
                <span className="font-bold">{user.followCount}</span>
                <span className="text-gray-500">フォロー中</span>
              </div>
              <div className="flex gap-1">
                <span className="font-bold">{user.followerCount}</span>
                <span className="text-gray-500">フォロワー</span>
              </div>
            </div>
          </div>
          <div>
            <nav className="grid h-13.5 grid-cols-4 border-b border-gray-700">
              {tabs.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className="flex cursor-pointer justify-center transition-colors duration-200 hover:bg-zinc-900"
                >
                  <div
                    className={`flex h-full w-fit items-center text-gray-600 ${activeTab === key ? active : ""}`}
                  >
                    {label}
                  </div>
                </button>
              ))}
            </nav>
          </div>
          {activeTab === "post" && (
            <>
              {tweets.map((tweet) => (
                <TweetCard
                  key={tweet.id}
                  tweet={tweet}
                  isRetweeted={tweet.isRetweeted}
                  retweetCount={tweet.retweetCount}
                  isLiked={tweet.isLiked}
                  likeCount={tweet.likeCount}
                  fetchUserProfile={() => fetchUserProfile()}
                />
              ))}
            </>
          )}
          {activeTab === "comment" && (
            <>
              {comments.map((comment) => (
                <TweetCard
                  key={comment.id}
                  tweet={comment}
                  isComment={true}
                  fetchComments={() => fetchComments()}
                />
              ))}
            </>
          )}
        </div>
      </div>
      <div className="col-span-4 pt-1 pl-7">
        <RightSidebar />
      </div>
    </div>
  );
};

export default ProfilePage;
