import React, { useState, useRef } from 'react';
import { Mic } from 'lucide-react';
import './ChatInput.css';

const ChatInput = () => {
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  const handleMicClick = () => {
    if (!recognitionRef.current && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setListening(true);
      recognition.onend = () => setListening(false);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };

      recognition.onerror = () => setListening(false);

      recognitionRef.current = recognition;
    }

    recognitionRef.current?.start();
  };

  return (
    <div className="page-container">
      <h1 className="chat-heading">🛍️ Smart Shopping Assistant</h1>

      <div className="chat-window">
        <div className="ai-response">Hello! How can I help you today?</div>
        {/* Later we'll make this dynamic */}
      </div>

      <div className="chat-input-wrapper">
  <input
    type="text"
    className="chat-input"
    placeholder="Type or say something..."
    value={input}
    onChange={(e) => setInput(e.target.value)}
  />

  

  <button
    onClick={handleMicClick}
    className={`mic-button ${listening ? 'listening' : ''}`}
    title={listening ? 'Listening...' : 'Click to speak'}
  >
    <Mic size={24} />
  </button>
  <button
  className="send-button"
  onClick={() => {
    console.log('Sending to server:', input);
    setInput('');
  }}
  title="Send"
>
  ➤
</button>
      </div>
    </div>
  );
};

export default ChatInput;
