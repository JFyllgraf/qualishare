import React from 'react';


import './Input.css';

const Input = ({ message, setMessage, sendMessage }) => (
  <form className="form">
    <textarea
    row="1"
    className="input"
    placeholder="Type a message..."
    value={message}
    onChange={(event) => setMessage(event.target.value)}
    onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <div className="btnContainer">
      <button className="btn-lg sendButton" onClick={(event) => sendMessage(event)}>Send</button>
    </div>
  </form>
)

export default Input;
