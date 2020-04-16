import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import './Chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import { server_url } from '../../Utility/GlobalVariables';

let socket;

function Chat({Name, Room}) { //remember to destructure
  const [name] = useState(Name);
  const [room] = useState(Room);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = server_url;
  //const [users, setUsers] = useState('');


  useEffect(() => {
    console.log("Printing: ", name, room);
    socket = io(ENDPOINT);

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });

    return () => {
      socket.emit('disconnect');
      socket.off();
    }


  }, [ENDPOINT, name, room]); //'[var]' - if 'var' is changed, then useEffect() is called

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message ]);
    })
  }, [messages]);

  function sendMessage(event) {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  //console.log(message, messages); //behøver ikke skrive til consolln her

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

export default Chat
