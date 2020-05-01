import React, { useState, useEffect, useRef } from 'react';
import ContentEditable from 'react-contenteditable';
import io from "socket.io-client";
import './Editor.css';

import { getDefaultText } from '../../../Utility/Helpers';
import { server_url } from '../../../Utility/GlobalVariables';

import Toolbar from '../Toolbar/Toolbar';
import axios from "axios";
let socket;

function Editor({name, selected, codeObjects, handler, quoteHandler}) {
  const [userName] = useState(name);
  const initialText = getDefaultText;
  const [text, setText] = useState(initialText);
  const [selectedCode, setSelectedCode] = useState(selected);
  const [codeList, setCodeList] = useState(codeObjects);
  const [file, setFile] = useState(undefined);
  const [fileName, setFileName] = useState(undefined);
  socket = io(server_url);
  const textRef = useRef(null);

  useEffect(() => {
    setSelectedCode(selected);
    setCodeList(codeObjects);
  }, [name, selected, selectedCode, codeObjects]);

  useEffect(() => {
    socket.emit('editingText', text);
  }, [text])

  socket.on('editingText', function(data){
    setText(data);
  });

  function handleChange(event) {
    setText(event.target.value);
  }

  function emmitChange(offsets){
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
    <div className="editor-container">
      <Toolbar
        name={userName}
        codes={codeList}
        selected={selectedCode}
        handler={handler}
        quoteHandler={quoteHandler}
        emmitChange={emmitChange}
        uploadFile={uploadFile}
        handleFileChange={handleFileChange}
        ref={textRef}
      />

      <ContentEditable
        id="textDiv"
        onDragOver={preventDragging}
        onDrop={preventDragging}
        onKeyDown={(event) => event.preventDefault()}
        html={text}
        onChange={handleChange}
        className="editor-input">
      </ContentEditable>

    </div>
  );
}



// <div
//   id="textDiv"
//   className="editor-input">
//   {text}
// </div>


//onSelect={window.getSelection().toString() ? handleOnSelect() : null}
export default Editor;
