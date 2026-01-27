import { GoBookmark, GoBookmarkFill } from "react-icons/go";

const BookmarkButton = ({ isBookmarked, onClickBookmark }) => {
  const Icon = isBookmarked ? GoBookmarkFill : GoBookmark;

  return (
    <button
      onClick={onClickBookmark}
      className={`relative cursor-pointer ${isBookmarked ? "text-sky-500" : ""}`}
    >
      <Icon size={20} />
    </button>
  );
};

export default BookmarkButton;
