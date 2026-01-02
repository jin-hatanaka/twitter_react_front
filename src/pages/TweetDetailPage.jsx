import { useParams } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import RightSidebar from "../components/layout/RightSidebar";
import { FaArrowLeft } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { BsChat } from "react-icons/bs";
import { LuRepeat2 } from "react-icons/lu";
import { GoHeart } from "react-icons/go";
import { GoBookmark } from "react-icons/go";
import { FiUpload } from "react-icons/fi";
import { useEffect, useState } from "react";
import apiClient from "../apis/apiClient";
import { cdate } from "cdate";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import TweetCard from "../components/tweet/TweetCard";

const TweetDetailPage = () => {
  const { currentUser } = useCurrentUser();

  const [tweet, setTweet] = useState({});
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  const fetchComments = async () => {
    try {
      const res = await apiClient.get(`/tweets/${id}/comments`);
      setComments(res.data.comments);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const fetchTweet = async () => {
      try {
        const res = await apiClient.get(`/tweets/${id}`);
        setTweet(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchTweet();
  }, [id]);

  useEffect(() => {
    fetchComments();
  }, [id]);

  return (
    <div className="grid min-h-screen grid-cols-12 justify-center">
      <div className="col-span-3 pt-3 pl-23">
        <Sidebar user={currentUser} />
      </div>
      <div className="col-span-5 border-s border-e border-gray-700">
        <div className="sticky inset-x-0 top-0 bg-black/90">
          <nav className="flex h-13.5 items-center gap-10 px-4">
            <FaArrowLeft />
            <span className="text-xl font-bold">ポスト</span>
          </nav>
        </div>
        <div className="px-4">
          <div className="flex items-center gap-2 pt-2">
            <div>
              {tweet?.iconImage && (
                <img src={tweet.iconImage} className="rounded-full" />
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">{tweet.user?.name}</span>
              <span className="text-gray-500">@x_clone</span>
            </div>
            <BsThreeDots className="ms-auto text-gray-500" />
          </div>
          <div className="pt-2">
            <span className="text-lg">{tweet.content}</span>
          </div>
          <div className="flex flex-col items-center">
            {tweet?.images &&
              tweet.images.map((imgUrl) => (
                <img key={imgUrl} src={imgUrl} className="mt-3 rounded-2xl" />
              ))}
          </div>
          <div className="border-b border-gray-700 py-4">
            <span className="text-gray-500">
              {cdate(tweet.createdAt).format("AH:MM・YYYY年M月D日")}
            </span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-700 px-1 py-3 text-gray-500">
            <BsChat size={19} />
            <LuRepeat2 size={23} />
            <GoHeart size={21} />
            <GoBookmark size={23} />
            <FiUpload size={21} />
          </div>
        </div>
        <div className="flex border-b border-gray-700 px-4 pt-2 pb-5">
          <div className="me-2 mt-2">
            {currentUser?.iconImage && (
              <img src={currentUser.iconImage} className="rounded-full" />
            )}
          </div>
          <div className="flex flex-1 items-center justify-between pt-0.5">
            <form>
              <input
                type="text"
                placeholder="返信をポスト"
                className="py-3 text-xl focus:outline-0"
              />
            </form>
            <button className="cursor-pointer rounded-full bg-gray-500 px-4 py-1.5 font-bold text-black">
              返信
            </button>
          </div>
        </div>
        {comments.map((comment) => (
          <TweetCard
            key={comment.id}
            tweet={comment}
            isComment={true}
            fetchComments={() => fetchComments()}
          />
        ))}
      </div>
      <div className="col-span-4 pt-1 pl-7">
        <RightSidebar />
      </div>
    </div>
  );
};

export default TweetDetailPage;
