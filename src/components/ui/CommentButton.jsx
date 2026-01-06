import { BsChat } from "react-icons/bs";

const CommentButton = ({ onClickComment, isComment }) => (
  <button
    onClick={onClickComment}
    className={`z-10 ${isComment ? "cursor-default" : "cursor-pointer"}`}
  >
    <BsChat size={17} />
  </button>
);

export default CommentButton;
