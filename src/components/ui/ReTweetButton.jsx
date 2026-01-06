import { LuRepeat2 } from "react-icons/lu";

const ReTweetButton = ({ isRetweeted, onClickRetweet, retweetCount }) => (
  <button
    onClick={onClickRetweet}
    className={`relative flex cursor-pointer gap-1 ${isRetweeted ? "text-emerald-500" : ""}`}
  >
    <LuRepeat2 size={20} />
    <span className="text-sm">{retweetCount}</span>
  </button>
);

export default ReTweetButton;
