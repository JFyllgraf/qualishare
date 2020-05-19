import React, {useState, useEffect, useRef, createElement} from 'react';
import ContentEditable from 'react-contenteditable';
import io from "socket.io-client";
import './Editor.css';



import { server_url } from '../../../Utility/GlobalVariables';

import Toolbar from '../Toolbar/Toolbar';
import axios from "axios";
const {Quote} = require('../../../data_model/Quote');
const {Code} = require('../../../data_model/Code');
const {getDefaultText, getEarlyQuote} = require('../../../Utility/Helpers');

let socket;

function Editor({name, selected, codeObjects, handler, quoteHandler}) {
  const [userName] = useState(name);
  const initialText = getDefaultText();
  const [text, setText] = useState(initialText);
  const [selectedCode, setSelectedCode] = useState(selected);
  const [codeList, setCodeList] = useState(codeObjects);
  const [file, setFile] = useState(undefined);
  const [fileName, setFileName] = useState(undefined);
  const [memo, setMemo] = useState("");
  const ENDPOINT = server_url;
  const textRef = useRef(null);
  const [onChangeEvent, setonChangeEvent] = useState(null);

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

  function styleText(quoteList){
    document.getElementById("textDiv").innerHTML = initialText;
    let retrievedCodes = null;
    axios.get(server_url + "/Codes").then(res => {
          console.log(res.data);
          retrievedCodes = extractCodesFromJson(res.data);
          return retrievedCodes;
      }).then(retrievedCodes => {
        console.log(retrievedCodes);
        var i;
        for (i = 0; i < quoteList.length; i++){
          let code = findCorrectCodeFromQuote(retrievedCodes, quoteList[i]);
          console.log(quoteList[i]);
          var range = document.createRange();
          range.setStart(document.getElementById("textDiv").firstChild, quoteList[i].quoteOffset.start);
          range.setEnd(document.getElementById("textDiv").firstChild, quoteList[i].quoteOffset.end);

          //create new span around the text
          var span = document.createElement("span");
          span.style.backgroundColor = code.color;
          span.id = quoteList[i]._id;
          span.innerText = quoteList[i].quoteText;
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

  // useEffect(() => {
  //   socket.emit('editingText', text);
  // }, [text])

  useEffect(() => {
    //updateStyles();
  }, []);

  function updateStyles(){
    axios.get(server_url+"/Quotes").then(res=>{
      var quoteList = ExtractQuotesFromData(res.data);
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

  function tester() {
    //console.log(quoteList);
  }

  function ExtractQuotesFromData(jsonArray) {
    let quotes = [];
    jsonArray.map(jsonQuote => {
      let quote = new Quote(jsonQuote._id, jsonQuote.quoteText, jsonQuote.quoteOffset, jsonQuote.codeRefs, null, jsonQuote.userName);
      quotes = [...quotes, quote];
    });
    return quotes;
  }

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on('newQuote', function(data){
      updateStyles();
    });
    // socket.on('deleteQuote', function(data){
    //   updateStyles();
    // });
  }, [ENDPOINT]);


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
  };
  const getMemo = () => {
    if(onChangeEvent !==null) {
      onChangeEvent.target.value = ""; //reset
      setonChangeEvent(null);
    }
    return memo;
  };

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
      <button onClick={tester}>test list</button>
    </div>
  );
}

function splitNodeAndInsertSpan(rootNode, quote){
  let [nodeToSplit, index] = findCorrectChildNode(rootNode, quote);
  let leftText = nodeToSplit.textContent.slice(0, quote.quoteOffset.start);
  let rightText = nodeToSplit.textContent.slice(quote.quoteOffset.end, nodeToSplit.textContent.length);

  let leftTextNode = document.createTextNode(leftText);
  let span = createSpan(quote);
  let rightTextNode = document.createTextNode(rightText);

  //insert the three nodes into root, before
  if(rootNode.childNodes.length === index+1){
    rootNode.append(leftTextNode);
    rootNode.append(span);
    rootNode.append(rightTextNode);
  }
  else{
    rootNode.insertBefore(leftTextNode, rootNode.childNodes[index+1]);
    rootNode.insertBefore(span, rootNode.childNodes[index+1]);
    rootNode.insertBefore(rightTextNode, rootNode.childNodes[index+1]);
  }

  //then delete child with index, because that was the original child, that is now replaced by three others
  rootNode.removeChild(rootNode.childNodes[index]);
}

function findCorrectChildNode(rootNode, quote){
  let text = quote.quoteText;
  for(let i = 0; i<rootNode.childNodes.length;i++){
    if(rootNode.childNodes[i].nodeType===3 && rootNode.childNodes[i].textContent.includes(text)){
      return [rootNode.childNodes[i], i];
    }
  }
  return [null, null];
}

//is not correct yet, because we need also need to access the referenced code
function createSpan(quote){
  let span = document.createElement("span");
  span.style.backgroundColor = "#d41c1c"; //code color
  span.innerText = quote.quoteText;
  span.setAttribute('user', quote.userName);
  span.id = quote._id;
  span.setAttribute('onclick', "removeSPan(this)");
  return span;
}


module.exports = {
  //Editor: Editor,
  createSpan: createSpan,
  findCorrectChildNode: findCorrectChildNode,
  splitNodeAndInsertSpan: splitNodeAndInsertSpan,
};

export default Editor;
