import Modal from "react-modal";
import XLogo from "./XLogo";
import ModalCloseButton from "./ModalCloseButton";
import TextInput from "./TextInput";
import { useState } from "react";
import axios from "axios";

Modal.setAppElement("#root");

const SignUpModal = ({ isOpen, onClose }) => {
  const initialSignUpData = {
    name: "",
    email: "",
    birth_date: "",
    password: "",
    password_confirmation: "",
    confirm_success_url: "http://localhost:5173",
  };

  const [signUpData, setSignUpData] = useState(initialSignUpData);

  const handleChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/users",
        signUpData,
      );
      setSignUpData(initialSignUpData);
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      className="relative mx-auto mt-16 flex h-163 w-150 flex-col items-center rounded-2xl bg-black px-20 pt-2"
      overlayClassName="fixed inset-0 bg-sky-200/20"
    >
      <ModalCloseButton onClick={onClose} />
      <XLogo size={31} />
      <div className="flex h-full w-full flex-col">
        <h1 className="py-7 text-3xl font-semibold">アカウントを作成</h1>
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
          <div className="flex flex-col gap-7">
            <div>
              <TextInput
                name="name"
                placeholder="名前"
                value={signUpData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <TextInput
                type="email"
                name="email"
                placeholder="メールアドレス"
                value={signUpData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <TextInput
                name="birth_date"
                placeholder="生年月日"
                value={signUpData.birth_date}
                onChange={handleChange}
              />
            </div>
            <div>
              <TextInput
                type="password"
                name="password"
                placeholder="パスワード"
                value={signUpData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <TextInput
                type="password"
                name="password_confirmation"
                placeholder="パスワード確認用"
                value={signUpData.password_confirmation}
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="my-6 mt-auto w-full cursor-pointer rounded-full border bg-white py-3.5 font-bold text-black transition-colors duration-200 hover:bg-gray-200"
          >
            登録する
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default SignUpModal;
