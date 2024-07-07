import axios from "axios";
import React, { useEffect, useState } from "react";
import "./MessageList.css";

const MessageList = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const fetchMessageList = async() => {
    try {
      if (chatId) {
        let response = await axios.get(
          `https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chatId}`
        );

        setMessages(response.data);
      }
    } catch (error) {
      console.error("There was an error fetching the messages!", error);
    }
  };

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMsg = {
      id: messages?.data?.length + 1,
      sender: { email: "current_user@example.com" }, 
      message: newMessage,
      created_at: new Date().toISOString(),
    };

    setMessages((prevState) => ({
      data: [...prevState.data, newMsg],
    }));

    setNewMessage("");
  };

  useEffect(() => {
    fetchMessageList();
  }, [chatId]);
  console.log("messages", messages);
  return (
    <div className="message-list-container">
      <ul className="message-list">
        {messages?.data?.map((message) => (
          <li key={message?.id} className="message-item">
            <div className="message-bubble">
              <p className="message-sender">{message?.sender?.email}</p>
              <p className="message-text">{message?.message}</p>
              <p className="message-time">
                {message?.created_at?.slice(0, 10)}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="message-input-container">
        <input
          type="text"
          className="message-input"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button className="send-button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageList;
