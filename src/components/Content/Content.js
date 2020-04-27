import React, { useState, useEffect } from 'react';
import ContentEditable from 'react-contenteditable';
import io from "socket.io-client";
import './Content.css';

import Toolbar from '../Toolbar/Toolbar';
import {server_url} from "../../Utility/GlobalVariables";
import axios from "axios";
let socket;

function Content({selected, codeObjects, handler}) {
  const initialText = "Lorem more ipsum dolor sit amet, consectetur adipisicinfgdfghdhdjjdg elit. Pariatur assumenda suscipit quos doloribus minus, provident corrupti repudiandae totam ipsam cum numquam! Repellat voluptas magnam amet, labore tempore laborum, dignissimos laudantium?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem error, nulla delectus id, nemo aliquam commodi, non distinctio pariatur nisi rem! Provident sapiente, natus assumenda cumque error, esse distinctio porro.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora optio debitis deleniti explicabo repellat quos ipsum itaque doloremque molestiae delectus a voluptates saepe vero iusto veritatis laudantium accusantium, assumenda sunt. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, quia enim, et assumenda odit rerum vero pariatur minus commodi iusto soluta architecto porro, cum ducimus id molestias odio vitae voluptates? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, libero numquam dolores temporibus exercitationem a voluptates sit minus perferendis iste consectetur accusamus pariatur tempore cupiditate adipisci labore corporis dolore eaque confirm.";
  const [text, setText] = useState(initialText);
  const [selectedCode, setSelectedCode] = useState(selected);
  const [codeList, setCodeList] = useState(codeObjects);
  const [file, setFile] = useState(undefined);
  const [fileName, setFileName] = useState(undefined);

  socket = io(server_url);

  useEffect(() => {
    setSelectedCode(selected);
    setCodeList(codeObjects);
  }, [selected, selectedCode, codeObjects]);

  useEffect(() => {
    emmitChange();
  }, [text])

  socket.on('editingText', function(data){
    setText(data);
  });

  function handleChange(event) {
    setText(event.target.value);
  }

  function emmitChange(){
    socket.emit('editingText', text);
  }

  function preventDragging(event){
    event.preventDefault();
  }
  const uploadFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try{
      const res = await axios.post(server_url+'/upload', formData, {
        headers: {
          'content-Type':'multipart/form-data'
        }
      });
      let newString = res.data.replace(new RegExp('\r?\n','g'), '<br />');
      setText(newString);

    } catch (err){
      if (err.status === 500){
        console.log("Problem with the server: ", err);
      }
      else{
        console.log("Error: ", err);

      }
    }
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  return (
    <div className="content-container">
      <Toolbar
        codes={codeList}
        selected={selectedCode}
        handler={handler}
        emmitChange={emmitChange}
        uploadFile={uploadFile}
        handleFileChange={handleFileChange}
      />
      <ContentEditable
          id="textDiv"
        onDragover={preventDragging}
        onDrop={preventDragging}
        onKeyDown={(event) => event.preventDefault()}
        html={text}
        onChange={handleChange}
        className="content-input">
      </ContentEditable>
    </div>
  );
}

export default Content;