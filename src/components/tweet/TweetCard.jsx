import { BsChat } from "react-icons/bs";
import { LuRepeat2 } from "react-icons/lu";
import { GoHeart } from "react-icons/go";
import { BiBarChart } from "react-icons/bi";
import { GoBookmark } from "react-icons/go";
import { FiUpload } from "react-icons/fi";
import { cdate } from "cdate";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import apiClient from "../../apis/apiClient";
import TweetMoreMenu from "./TweetMoreMenu";
import TweetCardWrapper from "./TweetCardWrapper";

const TweetCard = ({
  tweet,
  reloadTweets,
  fetchUserProfile,
  onClickComment,
  isComment,
  fetchComments,
}) => {
  const { currentUser } = useCurrentUser();

  const deleteTweet = async () => {
    try {
      if (isComment) {
        await apiClient.delete(`/comments/${tweet.id}`);
        // コメント一覧再レンダリング
        fetchComments();
      } else {
        await apiClient.delete(`/tweets/${tweet.id}`);
        // ホーム画面再レンダリング
        reloadTweets?.();
        // プロフィール画面再レンダリング
        fetchUserProfile?.();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <TweetCardWrapper isComment={isComment} tweet={tweet}>
      <div className="flex items-start border-b border-gray-700 px-4 py-3">
        <Link
          to={`/users/${tweet.user.id}`}
          // 親のクリックを止める
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 me-2"
        >
          {tweet?.iconImage && (
            <img src={tweet.iconImage} className="rounded-full" />
          )}
        </Link>
        <div className="flex-1">
          <div className="flex items-center">
            <span className="font-semibold">{tweet.user.name}</span>
            <span className="text-gray-500">
              ・{cdate(tweet.createdAt).format("MM月DD日")}
            </span>
            <div className="relative ms-auto">
              <TweetMoreMenu
                isOwner={currentUser.id === tweet.user.id}
                onDelete={deleteTweet}
              />
            </div>
          </div>
          <div>
            <span>{tweet.content}</span>
          </div>
          <div>
            {tweet?.images &&
              tweet.images.map((imgUrl) => (
                <img key={imgUrl} src={imgUrl} className="mt-3 rounded-2xl" />
              ))}
          </div>
          <div className="flex justify-between pt-3 text-gray-500">
            <div className="flex items-center gap-25">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClickComment?.();
                }}
                className={`z-10 ${isComment ? "cursor-default" : "cursor-pointer"}`}
              >
                <BsChat size={17} />
              </button>
              <LuRepeat2 size={20} />
              <GoHeart size={18} />
              <BiBarChart size={20} />
            </div>
            <div className="flex items-center gap-3">
              <GoBookmark size={20} />
              <FiUpload size={18} />
            </div>
          </div>
        </div>
      </div>
    </TweetCardWrapper>
  );
};

export default TweetCard;
