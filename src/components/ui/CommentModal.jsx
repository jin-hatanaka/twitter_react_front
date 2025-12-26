import Modal from "react-modal";
import ModalCloseButton from "./ModalCloseButton";
import { CiFaceSmile, CiImageOn } from "react-icons/ci";
import { RiFileGifLine, RiListRadio } from "react-icons/ri";
import { TbCalendarTime } from "react-icons/tb";
import { FiMapPin } from "react-icons/fi";
import { useState } from "react";
import apiClient from "../../apis/apiClient";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const CommentModal = ({ isOpen, onClose, tweetId }) => {
  const { currentUser } = useCurrentUser();

  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiClient.post("/comments", {
        tweet_id: tweetId,
        content: content,
      });
      setContent("");
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      className="relative mx-auto mt-16 flex w-150 flex-col overflow-hidden rounded-2xl bg-black"
      overlayClassName="fixed inset-0 bg-sky-200/20 z-20"
    >
      <div className="sticky inset-x-0 top-0 bg-black/90">
        <nav className="flex h-13.5 items-center pr-4 pl-2">
          <ModalCloseButton onClick={onClose} />
          <div className="ml-auto px-4">
            <span className="text-sm font-bold text-sky-500">下書き</span>
          </div>
        </nav>
      </div>
      <div className="px-4 pt-1">
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <div className="me-2 mt-3">
              {currentUser?.iconImage && (
                <img src={currentUser.iconImage} className="rounded-full" />
              )}
            </div>
            <div className="flex-1 pt-1">
              <textarea
                placeholder="返信をポスト"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-0.5 field-sizing-content min-h-30 w-full py-3 text-xl focus:border-0 focus:outline-0"
              />
            </div>
          </div>
          <div className="flex justify-between py-2">
            <div className="flex items-center gap-4 px-1.5 text-sky-500">
              <CiImageOn size={20} />
              <RiFileGifLine size={20} />
              <RiListRadio size={20} />
              <CiFaceSmile size={20} />
              <TbCalendarTime size={20} />
              <FiMapPin size={20} />
            </div>
            <button
              type="submit"
              className="cursor-pointer rounded-full bg-white px-4 py-1.5 font-bold text-black transition-colors duration-200 hover:bg-gray-200"
            >
              返信
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CommentModal;
