import { GoHeartFill } from "react-icons/go";
import { BsPersonFill } from "react-icons/bs";
import { FaComment } from "react-icons/fa";

const NOTIFICATION_CONFIG = {
  like: {
    Icon: GoHeartFill,
    iconSize: 27,
    iconClass: "text-pink-600",
    message: "さんがあなたのポストをいいねしました",
  },

  follow: {
    Icon: BsPersonFill,
    iconSize: 29,
    iconClass: "text-sky-500",
    message: "さんにフォローされました",
  },

  comment: {
    Icon: FaComment,
    iconSize: 26,
    iconClass: "text-sky-500",
    message: "さんがあなたのポストにコメントしました",
  },
};

const NotificationItem = ({
  action,
  userName,
  iconImage,
  postContent,
  comment,
}) => {
  const config = NOTIFICATION_CONFIG[action];
  const Icon = config.Icon;
  const extraText =
    action === "like" ? postContent : action === "comment" ? comment : null;

  return (
    <div className="flex border-b border-gray-700 px-7 py-3">
      <div className="me-2 mt-0.5">
        <Icon size={config.iconSize} className={config.iconClass} />
      </div>
      <div className="flex-1">
        <div className="mb-2">
          {iconImage && <img src={iconImage} className="rounded-full" />}
        </div>
        <div>
          <span className="font-bold">{userName}</span>
          <span>{config.message}</span>
        </div>
        {extraText && (
          <div className="mt-2">
            <span className="text-gray-500">{extraText}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationItem;
