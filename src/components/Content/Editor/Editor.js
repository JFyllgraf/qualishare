import React, {useState, useEffect, useRef, createElement} from 'react';
import ContentEditable from 'react-contenteditable';
import io from "socket.io-client";
import './Editor.css';
import { server_url } from '../../../Utility/GlobalVariables';
import Toolbar from '../Toolbar/Toolbar';
import axios from "axios";

const {Quote} = require('../../../data_model/Quote');
const {Code} = require('../../../data_model/Code');
const {getDefaultText, getEarlyQuote, splitNodeAndInsertSpan, constructQuoteFromData} = require('../../../Utility/Helpers');
let socket;

function Editor({name, selected, codeObjects, handler, quoteHandler, addQuoteToList, addReceivedQuote}) {
  const [userName] = useState(name);
  const initialText = getDefaultText();
  const [text, setText] = useState(initialText);
  const [selectedCode, setSelectedCode] = useState(selected);
  const [codeList, setCodeList] = useState(codeObjects);
  const [file, setFile] = useState(undefined);
  const [fileName, setFileName] = useState(undefined);
  const ENDPOINT = server_url;
  const textRef = useRef(null);

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

  function styleText(quoteList){
    document.getElementById("textDiv").innerHTML = initialText;
    let retrievedCodes = null;
    axios.get(server_url + "/Codes").then(res => {
          console.log(res.data);
          retrievedCodes = extractCodesFromJson(res.data);
          return retrievedCodes;
      }).then(retrievedCodes => {
        console.log(retrievedCodes);
        for (let i = 0; i < quoteList.length; i++){
          let code = findCorrectCodeFromQuote(retrievedCodes, quoteList[i]);
          console.log(quoteList[i]);
          var range = document.createRange();
          range.setStart(document.getElementById("textDiv").firstChild, quoteList[i].quoteOffset.start);
          range.setEnd(document.getElementById("textDiv").firstChild, quoteList[i].quoteOffset.end);

          //create new span around the text
          let span = document.createElement("span");
          span.style.backgroundColor = code.color;
          span.id = quoteList[i]._id;
          span.innerText = quoteList[i].quoteText;
          span.setAttribute('memo', quoteList[i].memo);
          span.setAttribute('user', quoteList[i].userName);
          span.setAttribute('onclick', "removeSPan(this)");
          range.surroundContents(span);
        }
      }).catch(err => {
          console.log(err);
      })
  }

  function findCorrectCodeFromQuote(codeObjects, quote){
    for(let i = 0; i<codeObjects.length;i++){
      if(codeObjects[i]._id === quote.codeRefs){
        return codeObjects[i];
      }
    }
  }

  useEffect(() => {
    setSelectedCode(selected);
    setCodeList(codeObjects);
  }, [name, selected, selectedCode, codeObjects]);

  useEffect(() => {
    updateStyles();
    document.getElementById('textDiv').focus(); // hack to prevent textDiv from rerendering
  }, []);

  function updateStyles(){
    axios.get(server_url+"/Quotes").then(res=>{
      let quoteList = ExtractQuotesFromData(res.data);
      console.log(quoteList);
      quoteList.sort(compare);
      styleText(quoteList);
    }).catch(err=>{
      console.log(err);
    });
  }

  function extractCodesFromJson(jsonArray){
      let codes = [];
      jsonArray.forEach(jsonCode => {
          let code = new Code(jsonCode.codeName, jsonCode._id);
          code.color = jsonCode.color;
          code.link = jsonCode.link;
          code.memo = jsonCode.memo;
          code.userName = jsonCode.userName;
          codes = [...codes, code];
      });
      console.log(codes);
      return codes;
  }

  function ExtractQuotesFromData(jsonArray) {
    let quotes = [];
    jsonArray.map(jsonQuote => {
      let quote = new Quote(jsonQuote._id, jsonQuote.quoteText, jsonQuote.quoteOffset, jsonQuote.codeRefs, null, jsonQuote.userName);
      quote.memo = jsonQuote.memo;
      quotes = [...quotes, quote];
    });
    return quotes;
  }

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on('newQuote', function(data){
      updateStyles();
      //addReceivedQuote(constructQuoteFromData(data));
      console.log(data);
    });
  }, [ENDPOINT]);

  function handleChange(event) {
    setText(event.target.value);
  }

  function emmitChange(offsets){
    //socket.emit('editingText', text);
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
  /*
  const handleOnChange = (e) =>{
    e.preventDefault();
    e.persist();
    setonChangeEvent(e);
    setMemo(e.target.value);
  };

   */
  /*
  const getMemo = () => {
    if(onChangeEvent !==null) {
      onChangeEvent.target.value = ""; //reset
      setonChangeEvent(null);
    }
    return memo;
  };

   */

  function info(e) {
    e.preventDefault();
    let root = document.getElementById("textDiv");
    let quote = getEarlyQuote();
    splitNodeAndInsertSpan(root, quote);
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
        addQuoteToList={addQuoteToList}
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
export default Editor;
