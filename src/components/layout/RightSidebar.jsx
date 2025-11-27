import { FiSearch } from "react-icons/fi";

const RightSidebar = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <FiSearch
          size={15}
          color="#71767B"
          className="absolute top-4 left-3.5"
        />
        <input
          className="w-87 rounded-full border border-gray-600 px-8 py-3 text-sm focus:border-transparent focus:outline-2 focus:outline-sky-500"
          placeholder="検索"
        />
      </div>
      <div className="h-60 w-87 rounded-2xl border border-gray-600">
        <div className="px-4 py-3">
          <span className="text-xl font-bold">「いま」を見つけよう</span>
        </div>
      </div>
      <div className="h-60 w-87 rounded-2xl border border-gray-600">
        <div className="px-4 py-3">
          <span className="text-xl font-bold">おすすめユーザー</span>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
