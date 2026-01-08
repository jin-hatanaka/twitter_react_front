import { GoHeart, GoHeartFill } from "react-icons/go";

const LikeButton = ({ isLiked, likeCount, onClickLike }) => {
  const Icon = isLiked ? GoHeartFill : GoHeart;

  return (
    <button
      onClick={onClickLike}
      className={`relative flex cursor-pointer gap-1 ${isLiked ? "text-pink-600" : ""}`}
    >
      <Icon size={18} />
      <span className="text-sm">{likeCount}</span>
    </button>
  );
};

export default LikeButton;
