import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { FiSend } from "react-icons/fi";
import apiClient from "../apis/apiClient";

const MessagePage = () => {
  const { currentUser } = useCurrentUser();

  const [activeTab, setActiveTab] = useState(null);
  const [groups, setGroups] = useState([]);
  const [messages, setMessages] = useState([]);
  const [anotherUser, setAnotherUser] = useState({});
  const [currentGroupId, setCurrentGroupId] = useState(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await apiClient.get("/groups");
        setGroups(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchGroups();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await apiClient.get(`/groups/${currentGroupId}/messages`);
      setMessages(res.data.messages);
    } catch (e) {
      console.error(e);
    }
  };

  const handleClick = async (groupId) => {
    setActiveTab(groupId);
    try {
      const res = await apiClient.get(`/groups/${groupId}/messages`);
      setMessages(res.data.messages);
      setAnotherUser(res.data.anotherUser);
      setCurrentGroupId(res.data.groupId);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiClient.post(`/groups/${currentGroupId}/messages`, {
        content: content,
      });
      setContent("");
      fetchMessages();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-12 justify-center">
      <div className="col-span-3 pt-3 pl-23">
        <Sidebar user={currentUser} />
      </div>
      <div className="sticky top-0 col-span-3 h-screen border-s border-e border-gray-700">
        <div className="flex h-13.5 items-center px-4">
          <span className="text-xl font-bold">メッセージ</span>
        </div>
        <div>
          {groups.map((group) => (
            <button
              key={group.id}
              onClick={() => handleClick(group.groupId)}
              className={`flex w-full cursor-pointer items-center px-4 py-3 hover:bg-zinc-900 ${group.groupId === activeTab ? "bg-zinc-900" : ""}`}
            >
              <div className="me-2">
                {group.iconImage && (
                  <img src={group.iconImage} className="rounded-full" />
                )}
              </div>
              <div>
                <span className="font-bold">{group.userName}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="col-span-5 flex h-full flex-col border-e border-gray-700">
        {currentGroupId !== null &&
          activeTab !== null &&
          currentGroupId === activeTab && (
            <>
              {/* ヘッダー */}
              <div className="sticky inset-x-0 top-0 mb-6 bg-black/90">
                <div className="my-2 flex h-13.5 items-center px-4">
                  <div className="me-2">
                    {anotherUser.iconImage && (
                      <img
                        src={anotherUser.iconImage}
                        className="rounded-full"
                      />
                    )}
                  </div>
                  <span className="text-lg">{anotherUser.name}</span>
                </div>
              </div>

              {/* メッセージ */}
              <div className="flex-1 overflow-y-auto px-4">
                {messages.map((message) =>
                  message.userId === currentUser.id ? (
                    <div key={message.id} className="mb-4 flex justify-end">
                      <div className="max-w-xs rounded-2xl bg-sky-500 px-4 py-2">
                        <span>{message.content}</span>
                      </div>
                    </div>
                  ) : (
                    <div key={message.id} className="mb-4 flex justify-start">
                      <div className="max-w-xs rounded-2xl bg-zinc-800 px-4 py-2">
                        <span>{message.content}</span>
                      </div>
                    </div>
                  ),
                )}
              </div>

              {/* 入力フォーム */}
              <div className="sticky bottom-2 mt-7 px-4">
                <form onSubmit={handleSubmit}>
                  <div className="relative">
                    <textarea
                      placeholder="新しいメッセージを作成"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="field-sizing-content max-h-40 w-full resize-none rounded-3xl bg-zinc-800 py-3 pr-12 pl-4 focus:border-0 focus:outline-0"
                    ></textarea>
                    <button
                      type="submit"
                      className="absolute right-4 bottom-4 cursor-pointer"
                    >
                      <FiSend size={23} />
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
      </div>
      <div className="col-span-1"></div>
    </div>
  );
};

export default MessagePage;
