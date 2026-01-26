import XLogo from "../ui/XLogo";
import { GoHome } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { PiBell } from "react-icons/pi";
import { CiMail } from "react-icons/ci";
import { RiFileListLine } from "react-icons/ri";
import { GoBookmark } from "react-icons/go";
import { BsPeople } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";
import { TbDotsCircleHorizontal } from "react-icons/tb";
import PostButton from "../ui/PostButton";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";

const navItemClass =
  "flex cursor-pointer items-center gap-4 rounded-full px-4 py-2.5 text-xl transition-colors duration-200 hover:bg-zinc-900";

const Sidebar = ({ user }) => {
  return (
    <div className="sticky top-3">
      <div className="px-4">
        <XLogo size={30} />
      </div>
      <div className="mt-4">
        <Link to="/home">
          <button className={navItemClass}>
            <GoHome size={30} />
            <span>ホーム</span>
          </button>
        </Link>
        <button className={navItemClass}>
          <FiSearch size={28} />
          <span>話題を検索</span>
        </button>
        <Link to="/notification">
          <button className={navItemClass}>
            <PiBell size={30} />
            <span>通知</span>
          </button>
        </Link>
        <Link to="/message">
          <button className={navItemClass}>
            <CiMail size={30} />
            <span>メッセージ</span>
          </button>
        </Link>
        <button className={navItemClass}>
          <RiFileListLine size={30} />
          <span>リスト</span>
        </button>
        <Link to="/bookmark">
          <button className={navItemClass}>
            <GoBookmark size={30} />
            <span>ブックマーク</span>
          </button>
        </Link>
        <button className={navItemClass}>
          <BsPeople size={30} />
          <span>コミュニティ</span>
        </button>
        <button className={navItemClass}>
          <XLogo size={28} />
          <span>プレミアム</span>
        </button>
        <Link to={`/users/${user?.id}`}>
          <button className={navItemClass}>
            <BsPerson size={30} />
            <span>プロフィール</span>
          </button>
        </Link>
        <button className={`mb-2 ${navItemClass}`}>
          <TbDotsCircleHorizontal size={30} />
          <span>もっと見る</span>
        </button>
        <PostButton size="medium" />
      </div>
      <button className="mt-10 flex h-16 w-64 cursor-pointer items-center gap-2 rounded-full p-3 transition-colors duration-200 hover:bg-zinc-900">
        <div>
          {user?.iconImage && (
            <img src={user.iconImage} className="rounded-full" />
          )}
        </div>
        <div className="flex flex-col">
          <span className="me-auto font-semibold">{user?.name}</span>
          <span className="text-gray-500">@x_clone</span>
        </div>
        <BsThreeDots className="ms-auto" />
      </button>
    </div>
  );
};

export default Sidebar;
