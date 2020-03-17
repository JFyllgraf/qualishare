import React, { useState, useEffect } from 'react';
import ContentEditable from 'react-contenteditable';
import io from "socket.io-client";

import './Content.css';

import Toolbar from '../Toolbar/Toolbar';
let socket;

function Content({selected, codes, handler}) {
  const initialText = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur assumenda suscipit quos doloribus minus, provident corrupti repudiandae totam ipsam cum numquam! Repellat voluptas magnam amet, labore tempore laborum, dignissimos laudantium?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem error, nulla delectus id, nemo aliquam commodi, non distinctio pariatur nisi rem! Provident sapiente, natus assumenda cumque error, esse distinctio porro.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora optio debitis deleniti explicabo repellat quos ipsum itaque doloremque molestiae delectus a voluptates saepe vero iusto veritatis laudantium accusantium, assumenda sunt. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, quia enim, et assumenda odit rerum vero pariatur minus commodi iusto soluta architecto porro, cum ducimus id molestias odio vitae voluptates? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, libero numquam dolores temporibus exercitationem a voluptates sit minus perferendis iste consectetur accusamus pariatur tempore cupiditate adipisci labore corporis dolore eaque.";
  const [text, setText] = useState(initialText);
  const [selectedCode, setSelectedCode] = useState(selected);
  const codeList = codes;

  const ENDPOINT = 'localhost:5000';
  socket = io(ENDPOINT);

  useEffect(() => {
    setSelectedCode(selected);
    console.log(selectedCode);
  }, [selected, selectedCode]);

  socket.on('editingText', function(data){
    console.log('Client: receiving data: '+ data);
    setText(data);
  });

  function handleChange(event) {
    setText(event.target.value);
  }

  function emmitChange(){
    socket.emit('editingText', text);
  }

  const handleOnSelect = (e) => {
    console.log(window.getSelection().anchorOffset);
  };

  return (
    <div className="content-container">
      <Toolbar
        codes={codeList}
        selected={selectedCode}
        handler={handler}
        emmitChange={emmitChange}
      />
      <ContentEditable
        html={text}
        onChange={handleChange}
        onSelect={handleOnSelect}
        className="content-input">
      </ContentEditable>
    </div>
  );
}

export default Content;
