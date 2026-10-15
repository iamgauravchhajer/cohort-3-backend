import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import Brand from '../components/Brand.jsx';

export const ChatPage = () => {
  const { user, accessToken } = useSelector((state) => state.auth);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!accessToken) return;

    const socket = io('http://localhost:5001', {
      auth: { token: accessToken },
      extraHeaders: { authorization: `Bearer ${accessToken}` },
    });

    socketRef.current = socket;
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));
    socket.on('connect_error', () => setIsConnected(false));

    socket.on('message', (data) => {
      const msg = typeof data === 'string' ? { text: data } : data;
      if (msg.userId === (user?.id || user?._id) || msg.sender === user?.name) return;

      setMessages((prev) => [
        ...prev,
        {
          id: msg.id || Date.now(),
          text: msg.text,
          sender: msg.sender || 'Member',
          time: msg.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMe: false,
        },
      ]);
    });

    return () => socket.disconnect();
  }, [accessToken, user]);

  const handleSend = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || !socketRef.current) return;

    const newMsg = {
      id: Date.now(),
      text: trimmed,
      sender: user?.name || 'You',
      userId: user?.id || user?._id,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };

    socketRef.current.emit('message', newMsg);
    setMessages((prev) => [...prev, newMsg]);
    setText('');
  };

  return (
    <div className="chat-fullscreen-page">
      <header className="account-header chat-nav-header">
        <Brand />
        <Link to="/account" className="secondary-button" style={{ textDecoration: 'none' }}>
          Account <span aria-hidden="true">→</span>
        </Link>
      </header>

      <main className="chat-fullscreen-main">
        <section className="chat-card" aria-label="Chat conversation">
          <div className="chat-card-header">
            <div className="avatar avatar-green">👀</div>
            <div>
              <h2>Chat Window</h2>
              <span className="status-pill">
                <span
                  className="tiny-dot"
                  style={{ background: isConnected ? '#68834e' : '#b46e59' }}
                />
                {isConnected ? 'Connected' : 'Connecting...'}
              </span>
            </div>
          </div>

          <div className="chat-messages">
            {messages.length === 0 ? (
              <div style={{ margin: 'auto', textAlign: 'center', color: '#98a08f' }}>
                <p style={{ margin: '0 0 6px', fontSize: '14px', fontWeight: 500, color: '#7b8671' }}>
                  No messages yet
                </p>
                <span style={{ fontSize: '11px', opacity: 0.85 }}>
                  Say hello to start the conversation!
                </span>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`chat-bubble-row ${msg.isMe ? 'outgoing' : 'incoming'}`}
                >
                  {!msg.isMe && (
                    <span className="avatar avatar-peach">
                      {msg.sender?.[0]?.toUpperCase() || 'M'}
                    </span>
                  )}
                  <div className="chat-bubble">
                    {!msg.isMe && msg.sender && (
                      <strong style={{ display: 'block', fontSize: '11px', marginBottom: '3px', color: '#5d7051' }}>
                        {msg.sender}
                      </strong>
                    )}
                    <p>{msg.text}</p>
                    <span className="chat-time">{msg.time}</span>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-form" onSubmit={handleSend}>
            <input
              type="text"
              placeholder={isConnected ? 'Write a message...' : 'Connecting to chat server...'}
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={!isConnected}
              aria-label="Message"
            />
            <button
              type="submit"
              className="primary-button chat-send-btn"
              disabled={!text.trim() || !isConnected}
            >
              Send
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};
