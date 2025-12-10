import { FaEarthAmericas } from "react-icons/fa6";
import { CiImageOn } from "react-icons/ci";
import { RiFileGifLine } from "react-icons/ri";
import { RiListRadio } from "react-icons/ri";
import { CiFaceSmile } from "react-icons/ci";
import { TbCalendarTime } from "react-icons/tb";
import { FiMapPin } from "react-icons/fi";
import PostButton from "../ui/PostButton";
import { useState } from "react";
import apiClient from "../../apis/apiClient";

const TweetForm = ({ user, reloadTweets }) => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);

  const submitTweet = async (e) => {
    e.preventDefault();

    try {
      // Tweet を作成
      const res = await apiClient.post("/tweets", {
        content: content,
      });

      const tweetId = res.data.id;

      // 画像があれば紐づける
      if (images.length > 0) {
        const formData = new FormData();
        // 複数画像を FormData に追加
        images.forEach((img) => formData.append("images[]", img));
        // TweetのIDを FormData に追加
        formData.append("tweet_id", tweetId);

        await apiClient.post("/images", formData);
      }

      setContent("");
      setImages([]);
      reloadTweets();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex border-b border-gray-700 px-4 pt-1">
      <div className="me-2 mt-3">
        {user?.iconImage && (
          <img src={user.iconImage} className="rounded-full" />
        )}
      </div>
      <div className="flex-1 pt-1">
        <form onSubmit={submitTweet}>
          <input
            type="text"
            name="content"
            placeholder="いまどうしてる？"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mx-0.5 mt-0.5 w-full py-3 text-xl focus:border-0 focus:outline-0"
          />
          <div className="mt-1 flex items-center border-b border-gray-700 px-2 pb-3 text-sky-500">
            <FaEarthAmericas size={13} />
            <span className="ml-1 text-sm font-bold">全員が返信できます</span>
          </div>
          <div className="flex justify-between py-2">
            <div className="flex items-center gap-4 px-1.5 text-sky-500">
              <label>
                <CiImageOn size={20} className="cursor-pointer" />
                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    const images = Array.from(e.target.files);
                    setImages(images);
                  }}
                  className="hidden"
                />
              </label>
              <RiFileGifLine size={20} />
              <RiListRadio size={20} />
              <CiFaceSmile size={20} />
              <TbCalendarTime size={20} />
              <FiMapPin size={20} />
            </div>
            <PostButton size="small" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TweetForm;
