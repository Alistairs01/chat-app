import React, { useState, useRef } from 'react';
import './App.css';
import { signOut } from 'firebase/auth';
import { auth } from './config/firebase';

import { Auth } from './components/Auth';
import Cookies from "universal-cookie";
import { Chat } from './components/Chat.js';

const cookies = new Cookies();


function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [ room, setRoom] = useState(null);
  const roomInputRef = useRef(null);//setting useRef to not change the value of the input field until the button is clicked
// This delays the process of updating the room state until the button is clicked 

  const logUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  }
  if (!isAuth) {

     return (
      <div className="App">
       <h1>Chat-App</h1>
       <Auth setIsAuth={setIsAuth}/>
      </div>
     );
  } 

  return (
    <div className="chat-room">
   {room ? <Chat room={room} setRoom={setRoom} setIsAuth={setIsAuth} /> : <div className='room-display'>
    <label>Enter Room Name:</label>
    <input type='text' placeholder='Room Name...' ref={roomInputRef}></input>
    <button onClick={() => {setRoom(roomInputRef.current.value)}}>Join Room</button>
    </div>}
    <div className="logout">
      <button onClick={logUserOut}>Logout</button>

    </div>
    </div>
  );
}

export default App;
