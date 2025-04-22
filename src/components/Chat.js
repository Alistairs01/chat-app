import React, { useState, useEffect } from 'react';
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { auth, db } from '../config/firebase.js';
import { signOut } from 'firebase/auth';
import '../Chat.css'; // make sure your Chat.css is linked
import Cookies from 'universal-cookie'; 
const cookies = new Cookies();

export const Chat = ({ room, setRoom, setIsAuth }) => {
  const [messages, setMessages] = useState('');
  const [allMessages, setAllMessages] = useState([]);

  const messagesRef = collection(db, 'messages');
  const bottomRef = React.createRef(null);

  useEffect(() => {
    const q = query(
      messagesRef,
      where('room', '==', room),
      orderBy('createdAt')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAllMessages(msgs);
    });

    return () => unsubscribe();
  }, [room]);

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    if (messages.trim() === '') return;

    await addDoc(messagesRef, {
      text: messages,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setMessages('');
  };
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [allMessages]);
   const logUserOut = async () => {
      await signOut(auth);
      cookies.remove("auth-token");
      setIsAuth(false);
      setRoom(null);
   }

  return (
    <div className="chat">
      <div>
        <div className="header">
          <h1>Welcome to: {room.toUpperCase()}</h1>
        </div>
        {allMessages.map((message) => {
          const isCurrentUser = message.user === auth.currentUser.displayName;
          return (
            <div
              className={`message ${isCurrentUser ? 'sent' : 'received'}`}
              key={message.id}
            >
              <span className="user">{message.user}:</span>
              {message.text} <br />
              <div className='timestamp'>
                {message.createdAt
                  ? message.createdAt.toDate().toUTCString()
                  : 'Sending...'}
              </div>
              <div ref={bottomRef}></div>
            </div>
          );
        })}
      </div>

      <h1>Chat Box</h1>
      <form className="new-message-form" onSubmit={handleSubmitForm}>
        <input
          className="new-message-input"
          type="text"
          placeholder="Send a message..."
          onChange={(event) => setMessages(event.target.value)}
          value={messages}
        />
        <button className="new-message-button" type="submit">
          Send
        </button>
      </form>
      <div className="logout">
      <button onClick={logUserOut}>Logout</button>

    </div>
    </div>
  );
};
