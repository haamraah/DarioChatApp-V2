import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import ScrollToBottom from 'react-scroll-to-bottom'
import io from 'socket.io-client'
const socket = io('http://localhost:5000', {});

function Connect({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [message, setMessage] = useState('')
  const [messageList, setMessageList] = useState([])
  const [contactList, setContactList] = useState([])
  const [room, setRoom] = useState('GLOBAL')
  const chatContainerRef = useRef(null); // Create a ref for the chat container

  useEffect(() => {
    // join global room
    const userConnection = {
      room: room,
      user: sessionUser,
      joinTime: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
    }
    socket.emit('join_room', userConnection);
    // Cleanup function to disconnect the socket when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {

    // Scroll to bottom when new messages are received
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messageList]);
  useEffect(() => {
    socket.on('recive_message', (data) => {
      setMessageList((list) => [...list, data])

    })
 
    socket.on('new_user_loggin', (onlineUsers) => {
      setContactList(onlineUsers);
      console.log(contactList,onlineUsers)
    })
  }, [socket])

  const handleSendMessage = async () => {
    if (message !== '') {
      const messageBody = {
        room: room,
        authorName: sessionUser.username,
        authorID: sessionUser.id,
        message: message,
        time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
      }
      await socket.emit('send_message', messageBody)
      setMessageList((list) => [...list, messageBody])

      setMessage('')
    }
  };

  return (
    <div className='connect'>
      <div className='leftP'>
        <div className='topL'>
          <ProfileButton user={sessionUser} />

        </div>
        <div className='buttomL'>
          {contactList.map((contact) => {
            return (
              <>
                <div >{contact}</div>
              </>
            )
          })}
        </div>

      </div>
      <div className='rightP'>
        <div className='topP'>CHAT ROOM</div>
        <div className="chat-body">
          <div className="message-container" ref={chatContainerRef}>
            {messageList.map((messageBody) => {
              return (
                <div className="message"
                  id={sessionUser.id === messageBody.authorID ? 'you' : 'other'}
                >
                  <div>
                    <div className="message-content">
                      <p>{messageBody.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">{messageBody.time}</p>
                      <p id="author">{messageBody.authorName}</p>
                    </div>
                  </div>
                </div>
              )
            })}


          </div>
        </div>
        <div className='buttomP'>
          <input className='user-input' type='text' placeholder='Write a message...' value={message} onChange={(e) => setMessage(e.target.value)} />
          <button onClick={handleSendMessage} className='user-input-send'>Send</button>
        </div>
      </div>

    </div>





  );
}

export default Connect;
