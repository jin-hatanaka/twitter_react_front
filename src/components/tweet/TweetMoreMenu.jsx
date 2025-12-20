import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { TbTrash } from "react-icons/tb";

const TweetMoreMenu = ({ isOwner, onDelete }) => {
  const [isOpen, setIsOpen] = useState();

  if (!isOwner) {
    return (
      <BsThreeDots
        onClick={(e) => e.stopPropagation()}
        className="text-gray-500"
      />
    );
  }

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
      >
        <BsThreeDots className="cursor-pointer text-gray-500" />
      </button>
      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute right-0 z-50 w-40 rounded-xl bg-black ring-1 ring-gray-700"
        >
          <button
            onClick={() => {
              onDelete();
              setIsOpen(false);
            }}
            className="flex w-full cursor-pointer items-center gap-2 px-4 py-3 text-left text-red-500"
          >
            <TbTrash size={18} />
            <span>削除</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default TweetMoreMenu;
