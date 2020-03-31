import React, { useState, useEffect } from 'react';
import ContentEditable from 'react-contenteditable';
import io from "socket.io-client";
import Quote from '../../data_model/Quote'
import './Content.css';
import { getDefaultText } from '../../Utility/Helpers';

import Toolbar from '../Toolbar/Toolbar';
let socket;

function Content({selected, codeObjects, handler}) {
  const initialText = getDefaultText;
  const [text, setText] = useState(initialText);
  const [selectedCode, setSelectedCode] = useState(selected);
  const [codeList, setCodeList] = useState(codeObjects);

  const ENDPOINT = 'localhost:5000';
  socket = io(ENDPOINT);

  useEffect(() => {
    setSelectedCode(selected);
    setCodeList(codeObjects);
  }, [selected, selectedCode, codeObjects]);

  useEffect(() => {
    emmitChange();
  }, [text])

  socket.on('editingText', function(data){
    //console.log('Client: receiving data: '+ data);
    setText(data);
  });

  function handleChange(event) {
    setText(event.target.value);
  }

  function emmitChange(){
    socket.emit('editingText', text);
  }

  /*
  const handleOnSelect = () => {
    let selectedText = window.getSelection().toString();
    if(selectedText === null || selectedText === undefined) {
      return null
    }
    else {
      var quote = new Quote(selectedText, window.getSelection().anchorOffset, [selectedCode]); //looks dangerous, but should be fine
      selectedCode.addQuote(quote)
    }
    console.log(quote);
  };
*/

  function preventDragging(event){
    event.preventDefault();
  }

  return (
    <div className="content-container">
      <Toolbar
        codes={codeList}
        selected={selectedCode}
        handler={handler}
        emmitChange={emmitChange}
      />
      <ContentEditable
        onDragOver={preventDragging}
        onDrop={preventDragging}
        onKeyDown={(event) => event.preventDefault()}
        html={text}
        onChange={handleChange}
        className="content-input">
      </ContentEditable>
    </div>
  );
}
//onSelect={window.getSelection().toString() ? handleOnSelect() : null}
export default Content;
