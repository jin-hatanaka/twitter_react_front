import Modal from "react-modal";
import ModalCloseButton from "./ModalCloseButton";
import ImageUploadButton from "./ImageUploadButton";
import TextInput from "./TextInput";
import { useEffect, useState } from "react";
import apiClient from "../../apis/apiClient";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const ProfileEditModal = ({ isOpen, onClose, user }) => {
  const { setCurrentUser } = useCurrentUser();

  const [formData, setFormData] = useState({});
  const [headerImage, setHeaderImage] = useState(null);
  const [iconImage, setIconImage] = useState(null);

  useEffect(() => {
    setFormData({
      name: user.name,
      self_introduction: user.selfIntroduction,
      place: user.place,
      website: user.website,
      birth_date: user.birthDate,
    });
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      for (let key in formData) {
        // user[...]で包むことで、Rails には params[:user][:name] の形で届く
        data.append(`user[${key}]`, formData[key]);
      }

      if (headerImage) {
        data.append("user[header_image]", headerImage);
      }

      if (iconImage) {
        data.append("user[icon_image]", iconImage);
      }

      const res = await apiClient.patch(`/users/${user.id}`, data);
      // Context を更新し、サイドバーのアイコン画像を再描写
      setCurrentUser(res.data);
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      className="relative mx-auto mt-16 flex h-163 w-150 flex-col overflow-hidden rounded-2xl bg-black"
      overlayClassName="fixed inset-0 bg-sky-200/20 z-20"
    >
      <form onSubmit={handleSubmit} className="flex h-full flex-col">
        <div className="sticky inset-x-0 top-0 bg-black/90">
          <nav className="flex h-13.5 items-center pr-4 pl-2">
            <ModalCloseButton onClick={onClose} />
            <span className="mx-auto ml-7 text-xl font-bold">
              プロフィールを編集
            </span>
            <button
              type="submit"
              className="cursor-pointer rounded-full bg-white px-4 py-1.5 text-sm font-bold text-black transition-colors duration-200 hover:bg-gray-200"
            >
              保存
            </button>
          </nav>
        </div>
        <div className="relative overflow-y-auto">
          <div className="flex h-49 w-full items-center justify-center">
            <ImageUploadButton
              onChange={(e) => setHeaderImage(e.target.files[0])}
            />
          </div>
          <div className="absolute top-36 left-4 flex size-28 items-center justify-center rounded-full bg-gray-700">
            <ImageUploadButton
              onChange={(e) => setIconImage(e.target.files[0])}
            />
          </div>
          <div className="flex flex-col gap-6 px-4 pt-19 pb-10">
            <div>
              <label className="font-bold">名前</label>
              <TextInput
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="font-bold">自己紹介</label>
              <textarea
                name="self_introduction"
                value={formData.self_introduction}
                onChange={handleChange}
                className="w-full rounded-sm border border-gray-700 p-2 outline-none focus:border-2 focus:border-sky-500"
              />
            </div>
            <div>
              <label className="font-bold">場所</label>
              <TextInput
                name="place"
                value={formData.place}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="font-bold">ウェブサイト</label>
              <TextInput
                name="website"
                value={formData.website}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="font-bold">生年月日</label>
              <TextInput
                name="birth_date"
                value={formData.birth_date}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ProfileEditModal;
