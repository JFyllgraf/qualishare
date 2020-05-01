import React, {useState, useEffect, useRef, createElement} from 'react';
import ContentEditable from 'react-contenteditable';
import io from "socket.io-client";
import './Editor.css';
import Mark from 'mark.js';

import {getCleanDefaultText, getDefaultText} from '../../../Utility/Helpers';
import { server_url } from '../../../Utility/GlobalVariables';

import Toolbar from '../Toolbar/Toolbar';
import axios from "axios";
import Quote from "../../../data_model/Quote";
let socket;

function Editor({name, selected, codeObjects, handler, quoteHandler}) {
  const [userName] = useState(name);
  const initialText = getCleanDefaultText();
  const [text, setText] = useState(initialText);
  const [selectedCode, setSelectedCode] = useState(selected);
  const [codeList, setCodeList] = useState(codeObjects);
  const [file, setFile] = useState(undefined);
  const [fileName, setFileName] = useState(undefined);
  const [memo, setMemo] = useState("");
  socket = io(server_url);
  const textRef = useRef(null);
  const [onChangeEvent, setonChangeEvent] = useState(null);

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
  const handleOnChange = (e) =>{
    e.preventDefault();
    e.persist();
    setonChangeEvent(e);
    setMemo(e.target.value);
  }
  const getMemo = () => {
    if(onChangeEvent !==null) {
      onChangeEvent.target.value = ""; //reset
      setonChangeEvent(null);
    }
    return memo;
  }

  function insertSpan(root, quote){
    for(let i = 0; i < root.childNodes.length;i++) {
      console.log(root.childNodes[i].textContent);
      let textToMatch = root.childNodes[i].textContent.slice(quote.quoteOffset, quote.quoteText.length)
      if(textToMatch === quote.quoteText){
        let span = createSpan(quote)
        let newNode = root.childNodes[i].cloneNode(true);

        root.childNodes[i].textContent = root.childNodes[i].textContent.slice(0, quote.quoteOffset);
        newNode.textContent = root.childNodes[i].textContent.slice(quote.quoteOffset+quote.quoteText.length, root.childNodes[i].textContent.length);

        if(root.lastChild.isEqualNode(root.childNodes[i])){
          root.appendChild(span)
          root.appendChild(newNode);
        }
        else{
          root.insertBefore(span, root.childNodes[i+1]);
          root.insertBefore(newNode, root.childNodes[i+1])
        }
      }
    }
  }
  function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
  }
  function createSpan(quote){
    let span = document.createElement("span");
    span.style.backgroundColor = "#d41c1c"; //code color
    span.innerText = quote.quoteText;
    span.setAttribute('user', quote.userName);
    span.id = quote._id;
    span.setAttribute('onclick', "removeSPan(this)");
    return span;
  }
  function ExtractQuotesFromData(jsonArray) {
    let quotes = [];
    jsonArray.map(jsonQuote => {
      let quote = new Quote(jsonQuote._id, jsonQuote.quoteText, jsonQuote.quoteOffset, jsonQuote.codeRefs);
      quote.userName = jsonQuote.userName;
      quotes = [...quotes, quote];
    });
    return quotes;
  }
  function info(e){
    e.preventDefault()
    let root = document.getElementById("textDiv");
    let quotes = null
    let quote = null;
    let span = null;
    axios.get(server_url+"/Quotes").then(res=>{
      quotes = ExtractQuotesFromData(res.data);
      quote = quotes[0];
      insertSpan(root, quote);
      return root
    }).then((res)=>{
      console.log(res);
      //root.appendChild()
      console.log(root.childNodes);
    }).catch(err=>{
      console.log(err);
    });


  }

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
        getMemo={getMemo}
      />
      <div> <input type="text" onChange={handleOnChange} />   </div>

      <a href="something" className="toolbarButton" onClick={info}> info2 </a>
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
