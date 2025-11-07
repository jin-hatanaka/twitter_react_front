import { IoMdClose } from "react-icons/io";

const ModalCloseButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-2 left-2 flex size-9 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 hover:bg-zinc-900"
    >
      <IoMdClose size={21} />
    </button>
  );
};

export default ModalCloseButton;
