import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

const SocialAuthButton = ({ service, label }) => {
  let icon;

  if (service === "google") {
    icon = <FcGoogle />;
  } else if (service === "apple") {
    icon = <FaApple />;
  }

  return (
    <button className="flex w-2xs cursor-pointer items-center justify-center rounded-full bg-white px-4 py-2.5 text-sm text-black transition-colors duration-200 hover:bg-gray-200">
      <span className="mr-1 text-xl">{icon}</span>
      <span>{label}</span>
    </button>
  );
};

export default SocialAuthButton;
