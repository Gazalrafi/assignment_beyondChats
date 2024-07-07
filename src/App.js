import React, { useState } from 'react';
import './App.css';
import ChatList from './ChatList';
import MessageList from './MessageList';

const App = () => {
  const [selectedChatId, setSelectedChatId] = useState(null);

  return (
    <div className="app-container">
      <div className="chat-list">
        <ChatList onSelectChat={setSelectedChatId} />
      </div>
      <div className="message-list">
        {selectedChatId && <MessageList chatId={selectedChatId} />}
      </div>
    </div>
  );
};

export default App;

