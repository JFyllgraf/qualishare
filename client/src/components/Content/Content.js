import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import io from "socket.io-client";

import './Content.css';
let socket;


const Content = () => {
  const initialText = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur assumenda suscipit quos doloribus minus, provident corrupti repudiandae totam ipsam cum numquam! Repellat voluptas magnam amet, labore tempore laborum, dignissimos laudantium?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem error, nulla delectus id, nemo aliquam commodi, non distinctio pariatur nisi rem! Provident sapiente, natus assumenda cumque error, esse distinctio porro.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora optio debitis deleniti explicabo repellat quos ipsum itaque doloremque molestiae delectus a voluptates saepe vero iusto veritatis laudantium accusantium, assumenda sunt. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, quia enim, et assumenda odit rerum vero pariatur minus commodi iusto soluta architecto porro, cum ducimus id molestias odio vitae voluptates? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, libero numquam dolores temporibus exercitationem a voluptates sit minus perferendis iste consectetur accusamus pariatur tempore cupiditate adipisci labore corporis dolore eaque.";
  const [text, setText] = useState(initialText);
  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    socket = io(ENDPOINT);

    return () => {
      socket.off();
    }

  }, [ENDPOINT, text]);

  function handleChange(event) {
    console.log('I was fired');
  }

  return (
    <div className="content-container">

      <div
        onInput={handleChange}
        className="content-input editor"
        contentEditable="true"
        suppressContentEditableWarning="true">
        {text}
      </div>

    </div>
  );
}

export default Content;
