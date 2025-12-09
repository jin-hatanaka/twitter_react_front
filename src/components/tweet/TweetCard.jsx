import { BsThreeDots } from "react-icons/bs";
import { BsChat } from "react-icons/bs";
import { LuRepeat2 } from "react-icons/lu";
import { GoHeart } from "react-icons/go";
import { BiBarChart } from "react-icons/bi";
import { GoBookmark } from "react-icons/go";
import { FiUpload } from "react-icons/fi";
import { cdate } from "cdate";
import { Link } from "react-router-dom";

const TweetCard = ({ tweet }) => {
  return (
    <Link to={`/tweets/${tweet.id}`}>
      <div className="flex border-b border-gray-700 px-4 py-3">
        <div className="me-2">
          {tweet?.iconImage && (
            <img src={tweet.iconImage} className="rounded-full" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center">
            <span className="font-semibold">{tweet.user.name}</span>
            <span className="text-gray-500">
              ・{cdate(tweet.createdAt).format("MM月DD日")}
            </span>
            <BsThreeDots className="ms-auto text-gray-500" />
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
              <BsChat size={17} />
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
    </Link>
  );
};

export default TweetCard;
