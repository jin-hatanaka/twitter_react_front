import Modal from "react-modal";
import XLogo from "./XLogo";
import ModalCloseButton from "./ModalCloseButton";
import TextInput from "./TextInput";

const LogInModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      className="relative mx-auto mt-16 flex h-163 w-150 flex-col items-center rounded-2xl bg-black px-20 pt-2"
      overlayClassName="fixed inset-0 bg-sky-200/20"
    >
      <ModalCloseButton onClick={onClose} />
      <XLogo size={31} />
      <div className="flex h-full w-full flex-col">
        <h1 className="py-7 text-3xl font-semibold">Xにログイン</h1>
        <form action="" className="flex flex-1 flex-col">
          <div className="flex flex-col gap-7">
            <div>
              <TextInput type="email" placeholder="メールアドレス" />
            </div>
            <div>
              <TextInput type="password" placeholder="パスワード" />
            </div>
          </div>
          <button
            type="submit"
            className="my-6 mt-auto w-full cursor-pointer rounded-full border bg-white py-3.5 font-bold text-black transition-colors duration-200 hover:bg-gray-200"
          >
            ログイン
          </button>
          <div className="mb-6 text-gray-500">
            アカウントをお持ちでない場合は
            <span className="text-blue-400">登録</span>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default LogInModal;
