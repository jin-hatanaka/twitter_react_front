import { useState } from "react";
import RightSidebar from "../components/layout/RightSidebar";
import Sidebar from "../components/layout/Sidebar";
import TweetForm from "../components/tweet/TweetForm";

const HomePage = () => {
  const active = "border-b-4 border-sky-500 pt-1 font-bold text-white";

  const [activeTab, setActiveTab] = useState("recommend");

  return (
    <div className="grid min-h-screen grid-cols-12 justify-center">
      <div className="col-span-3 pt-3 pl-23">
        <Sidebar />
      </div>
      <div className="col-span-5 border-s border-e border-gray-600">
        <div>
          <nav className="grid h-13.5 grid-cols-2 border-b border-gray-600">
            <button
              onClick={() => setActiveTab("recommend")}
              className="flex cursor-pointer justify-center transition-colors duration-200 hover:bg-zinc-900"
            >
              <div
                className={`flex h-full w-fit items-center text-gray-600 ${activeTab === "recommend" ? active : ""}`}
              >
                おすすめ
              </div>
            </button>
            <button
              onClick={() => setActiveTab("follow")}
              className="flex cursor-pointer justify-center transition-colors duration-200 hover:bg-zinc-900"
            >
              <div
                className={`flex h-full w-fit items-center text-gray-600 ${activeTab === "follow" ? active : ""}`}
              >
                フォロー中
              </div>
            </button>
          </nav>
        </div>
        {activeTab === "recommend" && <TweetForm />}
        {activeTab === "follow" && <TweetForm />}
      </div>
      <div className="col-span-4 pt-1 pl-7">
        <RightSidebar />
      </div>
    </div>
  );
};

export default HomePage;
