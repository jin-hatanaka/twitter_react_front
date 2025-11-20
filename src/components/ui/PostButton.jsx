const PostButton = ({ size }) => {
  let sizeClass = "";
  if (size === "small") {
    sizeClass = "w-27 h-9";
  } else if (size === "medium") {
    sizeClass = "w-58 h-13";
  }

  return (
    <button
      type="submit"
      className={`flex cursor-pointer items-center justify-center rounded-full bg-white font-bold text-black transition-colors duration-200 hover:bg-gray-200 ${sizeClass} `}
    >
      ポストする
    </button>
  );
};

export default PostButton;
