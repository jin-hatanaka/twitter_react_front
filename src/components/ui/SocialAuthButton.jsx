const SocialAuthButton = ({ icon, label }) => {
  return (
    <button className="flex w-2xs cursor-pointer items-center justify-center rounded-full bg-white px-4 py-2.5 text-sm text-black transition-colors duration-200 hover:bg-gray-200">
      <span className="mr-1 text-xl">{icon}</span>
      <span>{label}</span>
    </button>
  );
};

export default SocialAuthButton;
