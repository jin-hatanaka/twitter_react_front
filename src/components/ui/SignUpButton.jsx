const SignUpButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex w-2xs cursor-pointer items-center justify-center rounded-full bg-white px-4 py-2.5 text-sm font-bold text-black transition-colors duration-200 hover:bg-gray-200"
    >
      アカウントを作成
    </button>
  );
};

export default SignUpButton;
