import { CiMail } from "react-icons/ci";

const MessageButton = ({ onClickMessage }) => {
  return (
    <button
      onClick={onClickMessage}
      className="cursor-pointer rounded-full border border-gray-700 p-2 transition-colors duration-200 hover:bg-zinc-900"
    >
      <CiMail size={20} />
    </button>
  );
};

export default MessageButton;
