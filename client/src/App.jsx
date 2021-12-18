import { useState } from 'react';
import io from 'socket.io-client';
import Chat from './Chat';

const socket = io.connect("http://localhost:5000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const [showChat, setShowChat] = useState(false);
  
  const joinRoom = () => {
    if (username !== "" && room !== ""){
      socket.emit("join_room", room);
      setShowChat(true);
    }
  }

  return (
    <div className="zapp">
      { ! showChat ? (
        <div className="zapp_join">
          <h1>Zapp</h1>
          <p>Mensajería rápida, concreta y sin rastro.</p>
          <input type="text" placeholder='Nombre...' onChange={(e) => setUsername(e.target.value)}/>
          <input type="text" placeholder='Room ID' onChange={(e) => setRoom(e.target.value)}/>
          <button onClick={joinRoom}>Acceder</button>
        </div>
      ):(
      <Chat socket={socket} username={username} room={room}/>
         )}
    </div>
  );
}

export default App;
