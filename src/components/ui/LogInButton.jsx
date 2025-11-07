const LogInButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex w-2xs cursor-pointer items-center justify-center rounded-full border border-gray-600 bg-black px-4 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-zinc-900"
    >
      ログイン
    </button>
  );
};

export default LogInButton;
