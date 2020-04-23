import React, { useState, useEffect } from 'react';
import ContentEditable from 'react-contenteditable';
import io from "socket.io-client";
//import Quote from '../../data_model/Quote';
import './Content.css';

import { getDefaultText } from '../../Utility/Helpers';
import { server_url } from '../../Utility/GlobalVariables';

import Toolbar from '../Toolbar/Toolbar';

let socket;

function Content({name, selected, codeObjects, handler, quoteHandler}) {
  const [userName, setUserName] = useState(name);
  const initialText = getDefaultText;
  const [text, setText] = useState(initialText);
  const [selectedCode, setSelectedCode] = useState(selected);
  const [codeList, setCodeList] = useState(codeObjects);

  const ENDPOINT = server_url;
  socket = io(ENDPOINT);

  useEffect(() => {
    setSelectedCode(selected);
    setCodeList(codeObjects);
  }, [name, selected, selectedCode, codeObjects]);

  useEffect(() => {
    socket.emit('editingText', text);
  }, [text])

  socket.on('editingText', function(data){
    //console.log('Client: receiving data: '+ data);
    setText(data);
  });

  function handleChange(event) {
    setText(event.target.value);
  }

  function emmitChange(offsets){
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
        name={userName}
        codes={codeList}
        selected={selectedCode}
        handler={handler}
        quoteHandler={quoteHandler}
        emmitChange={emmitChange}
      />

      <ContentEditable
        id="textDiv"
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



// <div
//   id="textDiv"
//   className="content-input">
//   {text}
// </div>


//onSelect={window.getSelection().toString() ? handleOnSelect() : null}
export default Content;
