const ProfileEditButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex cursor-pointer items-center justify-center rounded-full border border-gray-700 bg-black px-4 py-1.5 font-bold text-white transition-colors duration-200 hover:bg-zinc-900"
    >
      プロフィールを編集
    </button>
  );
};

export default ProfileEditButton;
