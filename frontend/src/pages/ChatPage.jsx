import axios from "axios";
import { useEffect, useState } from "react";

export default function ChatPage() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    const { data } = await axios.get("/chats");
    setChats(data);
  };
  return (
    <div className="mt-20">
      {chats.map((chat) => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}
    </div>
  );
}
