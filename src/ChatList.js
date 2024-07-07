import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ChatList.css";


const ChatList = ({ onSelectChat }) => {

  const [chats, setChats] = useState([]);
  const [messageInputs, setMessageInputs] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredChats, setFilteredChats] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
 

  const fetchChatDetails = async () => {
    try {
      let response = await axios.get(
        "https://devapi.beyondchats.com/api/get_all_chats?page=1"
      );
      setChats(response?.data);
     
    } catch (error) {
      console.error("There was an error fetching the chat data!", error);
    }
  };

  useEffect(() => {
    fetchChatDetails();
  }, []);

  const handleSearch = () => {
    const filtered = chats?.data?.data?.filter((chat) =>
      chat?.creator?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredChats(filtered);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    setMenuOpen(false);
  };

  console.log("checking", chats);
  return (
    <div className={`chat-list-container ${isDarkMode ? 'dark-mode' : ''}`}>
    <div className="chat-list-container">
      
      <div className="search-container">
      <div className="header">
        <button className="hamburger-menu" onClick={toggleMenu}>
          ☰
        </button>
        <div className={`menu ${menuOpen ? 'open' : ''}`}>
          <div className="menu-item">Saved Messages</div>
          <div className="menu-item">Archived Messages</div>
          <div className="menu-item">Contacts</div>
          <div className="menu-item">Settings</div>
          <div className="menu-item" onClick={toggleDarkMode}>{!isDarkMode ? "Dark Mode":"Light Mode"}</div>
        </div>
      </div>
      <input
        type="text"
        placeholder="Search chats..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        className="search-input"
      />
      </div>
      
      <ul className="chat-list">
      {(filteredChats.length > 0 ? filteredChats : chats?.data?.data)?.map((chat) => (
          <li
            key={chat?.id}
            onClick={() => onSelectChat(chat?.id)}
            className="chat-item"
          >
            <li>
              <img
                src="https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.2113030492.1720310400&semt=ais_user"
                alt="profile"
              />
            </li>
            {chat?.creator?.name}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default ChatList;
