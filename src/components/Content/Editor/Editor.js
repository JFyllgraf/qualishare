import React, { useState, useEffect, useRef } from 'react';
import ContentEditable from 'react-contenteditable';
import io from "socket.io-client";
import './Editor.css';
import Quote from "../../../data_model/Quote";

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
  const [memo, setMemo] = useState("");
  socket = io(server_url);
  const textRef = useRef(null);
  const [onChangeEvent, setonChangeEvent] = useState(null);
  const [quoteList, setQuoteList] = useState([]);

  // const quoteList = [
  //   new Quote(1, "text here", { start: 12, end: 16 }, null, null, "morten"),
  //   new Quote(2, "more text", { start: 22, end: 26 }, null, null, "Peter"),
  //   new Quote(4, "dasdasdsa", { start: 52, end: 56 }, null, null, "Lis"),
  //   new Quote(3, "blah blah", { start: 32, end: 36 }, null, null, "Sofie"),
  //   new Quote(5, "dasdasdsa", { start: 62, end: 66 }, null, null, "Niels"),
  //   new Quote(6, "dasdasdsa", { start: 42, end: 46 }, null, null, "Ole")
  // ];

  function compare(a, b){
    const aStart = a.quoteOffset.start;
    const bStart = b.quoteOffset.start;

    let comparison = 0;
    if (aStart < bStart){
      comparison = 1;
    } else if (aStart > bStart) {
      comparison = -1;
    }
    return comparison;
  }

  function styleText(){
    var i;
    for (i = 0; i < quoteList.length; i++){
      //console.log(quoteList[i]);
      var range = document.createRange();
      range.setStart(document.getElementById("textDiv").firstChild, quoteList[i].quoteOffset.start);
      range.setEnd(document.getElementById("textDiv").firstChild, quoteList[i].quoteOffset.end);

      //create new span around the text
      var span = document.createElement("span");
      span.style.backgroundColor = "green";
      span.innerText = quoteList[i].quoteText;
      span.setAttribute('user', quoteList[i].userName);
      span.setAttribute('onclick', "removeSPan(this)");
      range.surroundContents(span);
    }
  }

  useEffect(() => {
    setSelectedCode(selected);
    setCodeList(codeObjects);
  }, [name, selected, selectedCode, codeObjects]);

  // useEffect(() => {
  //   socket.emit('editingText', text);
  // }, [text])

  useEffect(() => {
    axios.get(server_url+"/Quotes").then(res=>{
      let quotes = ExtractQuotesFromData(res.data);
      setQuoteList(quotes);
      //quoteList.sort(compare);
    }).catch(err=>{
      console.log(err);
    });
  }, [userName])

  useEffect(() => {
    quoteList.sort(compare);
    styleText();
    console.log(quoteList);
  });

  function tester() {
    console.log(quoteList);
  }

  function ExtractQuotesFromData(jsonArray) {
    let quotes = [];
    jsonArray.map(jsonQuote => {
      let quote = new Quote(jsonQuote._id, jsonQuote.quoteText, jsonQuote.quoteOffset, jsonQuote.codeRefs);
      quotes = [...quotes, quote];
    });
    return quotes;
  }

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

      <ContentEditable
        id="textDiv"
        onDragOver={preventDragging}
        onDrop={preventDragging}
        onKeyDown={(event) => event.preventDefault()}
        html={text}
        onChange={handleChange}
        className="editor-input">
      </ContentEditable>
      <button onClick={tester}>test list</button>

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
