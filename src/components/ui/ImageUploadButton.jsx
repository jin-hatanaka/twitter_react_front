import { RiCameraAiLine } from "react-icons/ri";

const ImageUploadButton = ({ onChange }) => {
  return (
    <label>
      <RiCameraAiLine size={22} className="cursor-pointer" />
      <input type="file" onChange={onChange} className="hidden" />
    </label>
  );
};

export default ImageUploadButton;
