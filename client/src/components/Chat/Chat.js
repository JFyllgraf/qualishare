import React, { useState, useEffect } from "react";
//import queryString from 'query-string';
import io from "socket.io-client";

import './Chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
let socket;

function Chat({Name, Room}) {
  console.log(Name, Room);
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
//const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    //const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(Name);
    setRoom(Room);

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });

    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }
  , [name, room], []);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message ]);
    })
  }, [messages]);


  //function that handles the send message
  const sendMessage = (event) => {
    event.preventDefault();


    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));

    }
  };

  console.log(message, messages);

  return(
    <div className="outerContainer">
      <div className="innerContainer">

        <InfoBar room={room}/>
        <Messages messages={messages} name={name}/>
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      </div>
    </div>
  );
}

export default Chat;
