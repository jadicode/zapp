import React, { useState, useEffect } from 'react'

const Chat = ({socket, username, room}) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

const sendMessage = async () => {
    if (currentMessage !== ""){
        const messageData = {
            room: room,
            author: username,
            message: currentMessage,
            time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
        }

        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData])
    }
}


useEffect(() => {
    socket.on("receive_message", (data) => {
        setMessageList((list) => [...list, data])
    })
}, [socket])

  return (
    <div>
      <div className="chat_header">
          <div className="display_title">
            <i class="fas fa-circle"></i>
            <h2>Zapp Chat</h2>
          </div>
          <div className="meta_chat_header">
            <p>Sala: <span className='room'>{room}</span></p>
          </div>
      </div>
      <div className="chat_body">
        {messageList.map((messageContent) => {
            return (<div className="message" id={username === messageContent.author ? "you" : "other"}>
                <div>
                    <div className="message-content">
                        <p>{messageContent.message}</p>
                    </div>
                    <div className="message-meta">
                        <p>{messageContent.author}</p>
                        <p>{messageContent.time}</p>
                    </div>
                </div>
            </div>)
        })}
      </div>
      <div className="chat_footer">
          <input type="text" placeholder='Mensaje...' onChange={(e) => setCurrentMessage(e.target.value)} onKeyPress={(e) => {e.key === "Enter" && sendMessage()}}/>
          <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  )
}

export default Chat
