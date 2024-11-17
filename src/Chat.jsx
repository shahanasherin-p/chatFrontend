import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { sendMessage } from './socket';

const Chat = () => {
  const messages = useSelector((state) => state.chat.messages);
  const [input, setInput] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const messagesContainer = document.querySelector('.messages');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const message = {
        content: input,
        timestamp: new Date().toLocaleTimeString(),
        isSelf: true,
        name: name || 'Anonymous'
      };
      sendMessage(message);
      setInput('');
    }
  };

  return (
    <div className="container">
      <div className='containerHead'>
        <h1 className='heading'>ChatApp</h1>
        <input
          className="inputName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name..."
        />
      </div>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`msg ${msg.isSelf ? 'self' : 'other'}`}>
            <p><strong>{msg.name}:</strong> {msg.content}</p>
            <span>{msg.timestamp}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="message-input"
          placeholder="Type a message..."
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
};

export default Chat;
