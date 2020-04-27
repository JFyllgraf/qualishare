import React, { useState, useEffect } from 'react';
import Mark from 'mark.js';
import Input from 'react';
import './Toolbar.css';
import { highlight } from '../../Utility/Helpers';
import Quote from "../../data_model/Quote";
import axios from 'axios';
import {server_url} from "../../Utility/GlobalVariables";
import io from "socket.io-client";

/*
//'Content-Type': 'application/json',
const config = {
  headers:{
        "Access-Control-Allow-Origin": "*"}
}
//axios.defaults.headers.common = config;
*/

let socket;
socket = io(server_url);

function Toolbar ({name, codes, selected, handler, quoteHandler, emmitChange, uploadFile, handleFileChange}) {
  const [userName, setUserName] = useState(name);
  const [codeList, setCodeList] = useState(codes);
  const [selectedCode, setSelectedCode] = useState(selected);

  const [uploadedFile, setUploadedFile] = useState(undefined);
  useEffect(() => {
    handler(selectedCode);
    setCodeList(codes);
  }, [selectedCode, codes, handler, selected]);

  function newSelection(event){
    let i;
    for (i = 0; i < codeList.length; i++) {
      if (codeList[i].getName() === event.target.value){
        setSelectedCode(codeList[i]);
      }
    }
  }
   socket.on("newQuote", function(data) {
     console.log("Receiving client data: ", data); //probably have to do duplicate checking

     //find correct code
     //check the list of correct code, if the current quote is already there
     //if not there then add
     let quote = constructQuoteFromData(JSON.parse(data));
     for (let i = 0; i<codeList.length; i++){
       if(codeList[i]._id === quote.codeRefs){ //the code that this quote belongs to
         let quoteRefs = codeList[i].quoteRefs;
         if(!isQuoteInList(quote, quoteRefs)){
           codeList[i].addQuote(quote); //create and add new client side quote
         }
       }
     }
  });

  // from: https://stackoverflow.com/questions/52019642/get-selected-element-based-on-caret-position-in-contenteditable-div
  // returns start and end offset from argument; DOM element
  function getSelectionCharacterOffsetWithin(element) {
    var start = 0;
    var end = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var range = win.getSelection().getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.startContainer, range.startOffset);
            start = preCaretRange.toString().length;
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            end = preCaretRange.toString().length;
        }
    } else if ( (sel = doc.selection) && sel.type != "Control") {
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToStart", textRange);
        start = preCaretTextRange.text.length;
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        end = preCaretTextRange.text.length;
    }
    return { start: start, end: end };
  }

  const addQuote = (event) => {
    event.preventDefault();
    let selectedText = window.getSelection().toString();
    let offset = window.getSelection().anchorOffset;

    if(selectedText === null || selectedText === undefined || selectedText ==='') {
      //do nothing
    }
    else {
      let data = {
        quoteText: selectedText,
        quoteOffset: offset,
        codeRefs: selectedCode._id,
        documentNum: 0 //default for now
      }
      axios.post(server_url+"/newQuote", data).then(res => {

        socket.emit("newQuote", JSON.stringify(res.data));
        selectedCode.addQuote(constructQuoteFromData(res.data)); //selected code is wrong code
      }).catch(err => {
        console.log(err);
      });
    }
    var selOffsets = getSelectionCharacterOffsetWithin(document.getElementById("textDiv"));
    console.log("Selection offsets: " + selOffsets.start + ", " + selOffsets.end);

    highlight(selectedCode.getColor(), userName);

    //console.log(quote.getQuoteText(), quote.getQuoteOffset(), quote.getSummary());
    //console.log(selectedCode.getName() + ": " + selectedCode.getColor());
  };
  function isQuoteInList(quote, list){
    for(let i = 0; i < list.length;i++){
      if(quote._id === list[i]._id){
        return true;
      }
    }
    return false;
  }

  const removeQuote = (event) => {
    event.preventDefault();
    let text = window.getSelection().toString();
    let quotes = selectedCode.getQuotes();

    //because duplicates, we use a boolean, fix dupes later
    let firstTime = true;
    for (let i = 0; i < quotes.length; i++){
      if (quotes[i].getQuoteText() === text){
        selectedCode.removeQuote(quotes[i]); //does not work
        if(firstTime) {
          axios.delete(server_url+'/deleteQuote', {data: quotes[i]}).then(res =>{
            firstTime = false;
            console.log("Deleted quote: ", res);
          }).catch(err =>{
            console.log(err);
          })
          document.execCommand('removeFormat', false, null);
        }
        break;
      }
    }
  };

  //for getting state information from button click
  const info = e => {
    e.preventDefault();
    console.log(codeList);
  }


  return (
    <div className="toolbar-container">
      <div className="toolbar-innerContainer">
        <span className="label">Select Code: </span>
        <select  onChange={newSelection} className="toolbarSelect" type="select" name="select">
          {
            (codeList) ?
            codeList.map(code => {
              return <option className="toolbarOption" key={code.getId()}>{code.getName()}</option>
            }) :
            null
          }
        </select>
        <a href="something" className="toolbarButton" onKeyDown={(e) => e.keyCode===66 ? addQuote(e) : null} onClick={addQuote}>Apply</a>
        <a href="something" className="toolbarButton" onClick={removeQuote}>Remove</a>
        <Input type="file" onChange={handleFileChange} className="toolbarButton"> Put in text from file</Input>
        <a href="something" className="toolbarButton" onClick={uploadFile}> Submit file </a>
        <a href="something" className="toolbarButton" onClick={info}> info </a>
      </div>
    </div>
  );
}

function constructQuoteFromData(data){
  let q = new Quote(data._id, data.quoteText, data.offset, data.codeRefs, data.documentNum);
  console.log("QQ: ",q);
  return q;
}

export default Toolbar;
