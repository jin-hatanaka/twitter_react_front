const baseInputClass =
  "w-full rounded-sm border border-gray-700 px-2 py-3 outline-none focus:border-2 focus:border-blue-400";

const TextInput = ({ type = "text", placeholder = "", ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={baseInputClass}
      {...props}
    />
  );
};

export default TextInput;
