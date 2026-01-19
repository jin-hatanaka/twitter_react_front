import RightSidebar from "../components/layout/RightSidebar";
import Sidebar from "../components/layout/Sidebar";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import NotificationItem from "../components/ui/NotificationItem";
import { useEffect, useState } from "react";
import apiClient from "../apis/apiClient";

const NotificationPage = () => {
  const { currentUser } = useCurrentUser();

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await apiClient.get("/notifications");
        setNotifications(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="grid min-h-screen grid-cols-12 justify-center">
      <div className="col-span-3 pt-3 pl-23">
        <Sidebar user={currentUser} />
      </div>
      <div className="col-span-5 border-s border-e border-gray-700">
        <div className="sticky inset-x-0 top-0 bg-black/90">
          <nav className="flex h-13.5 items-center border-b border-gray-700 px-4">
            <span className="text-xl font-bold">通知</span>
          </nav>
        </div>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            action={notification.action}
            userName={notification.userName}
            iconImage={notification.iconImage}
            postContent={notification.postContent}
            comment={notification.comment}
          />
        ))}
      </div>
      <div className="col-span-4 pt-1 pl-7">
        <RightSidebar />
      </div>
    </div>
  );
};

export default NotificationPage;
