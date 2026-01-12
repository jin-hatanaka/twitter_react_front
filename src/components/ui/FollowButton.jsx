const FollowButton = ({ isFollowed, onClickFollow }) =>
  isFollowed ? (
    <button
      onClick={onClickFollow}
      className="cursor-pointer rounded-full border border-gray-700 bg-black px-4 py-1.5 font-bold text-white transition-colors duration-200 hover:bg-zinc-900"
    >
      フォロー中
    </button>
  ) : (
    <button
      onClick={onClickFollow}
      className="cursor-pointer rounded-full bg-white px-4 py-1.5 font-bold text-black transition-colors duration-200 hover:bg-gray-200"
    >
      フォロー
    </button>
  );

export default FollowButton;
