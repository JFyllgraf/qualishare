import React, { useState, useEffect } from 'react';
import Mark from 'mark.js';
import './Toolbar.css';
import { highlight } from '../../../Utility/Helpers';
import Quote from "../../../data_model/Quote";
import axios from 'axios';
import {server_url} from "../../../Utility/GlobalVariables";
import io from "socket.io-client";
import Code from "../../../data_model/Code";

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
  const [userName] = useState(name);
  const [codeList, setCodeList] = useState(codes);
  const [selectedCode, setSelectedCode] = useState(selected);
  const [quoteList, setQuoteList] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(undefined);
  const [memo, setMemo] = useState("");

  useEffect(() => {
    //handler(selectedCode); //this can be left out
    setCodeList(codes);
    //setSelectedCode(selected); //this can be left out
  }, [codes]);
  useEffect(()=>{
    setSelectedCode(selected);
    setCodeList(codes);
    //draw document: i.e get all quotes and highlight based on offsets
    axios.get(server_url+"/Quotes").then(res=>{
      let quotes = ExtractQuotesFromData(res.data);
      setQuoteList(quotes);
    }).catch(err=>{
      console.log(err);
    });

  },[selected]);

/* parameterized get for quotes by id
axios.get(server_url+"/Quotes/by_Code_id", {params:{_id: "5ea6e3896cb7e64a8838f9a7"}}).then(res=>{
      console.log("my res: ", res.data);
      let quotes = ExtractQuotesFromData(res.data);
      setQuoteList(quotes);
    }).catch(err=>{
      console.log(err);
    });
 */

  function ExtractQuotesFromData(jsonArray) {
      let quotes = [];
      jsonArray.map(jsonQuote => {
        let quote = new Quote(jsonQuote._id, jsonQuote.quoteText, jsonQuote.quoteOffset, jsonQuote.codeRefs);
        quotes = [...quotes, quote];
      });
      return quotes;
    }

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
    } else if ( (sel = doc.selection) && sel.type !== "Control") {
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
    //console.log(selectedCode);
    let selectedText = window.getSelection().toString();

    var selOffsets = getSelectionCharacterOffsetWithin(document.getElementById("textDiv"));
    if(selectedText === null || selectedText === undefined || selectedText ==='') {
      //do nothing
    }
    else {
      let data = {
        quoteText: selectedText,
        quoteOffset: selOffsets.start,
        codeRefs: selectedCode._id,
        documentNum: 0, //default for now
        userName: userName,
        memo: memo
      }
      axios.post(server_url+"/newQuote", data).then(res => {

        socket.emit("newQuote", JSON.stringify(res.data));
        let quote = constructQuoteFromData(res.data);
        selectedCode.addQuote(quote); //selected code is wrong code
        setQuoteList([...quoteList, quote]);

        // Add new span with: current codecolor, current username, new quote ID
        highlight(selectedCode.getColor(), userName, quote._id);
      }).catch(err => {
        console.log(err);
      });
    }

    console.log("Selection offsets: " + selOffsets.start + ", " + selOffsets.end, selectedText.length);


    setMemo("");
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

  function handleMemoInput(event) {
    setMemo(event.target.value);
    console.log(memo);
  }


  return (
    <div className="toolbar-container">
      <div className="toolbar-innerContainer">
        <span className="label">Select Code: </span>
        <select  onChange={newSelection} id="toolbarSelect" type="select" name="select">
          {
            (codeList) ?
            codeList.map(code => {
              return <option className="toolbarOption" key={code.getId()}>{code.getName()}</option>
            }) :
            null
          }
        </select>
        <input id="memo-input" type="text" value={memo} placeholder="optional memo..." onChange={handleMemoInput} />
        <a href="something" className="toolbarButton" onKeyDown={(e) => e.keyCode===66 ? addQuote(e) : null} onClick={addQuote}>Apply</a>

      </div>
    </div>
  );
}

// <a href="something" className="toolbarButton" onClick={removeQuote}>Remove</a>
// <input type="file" onChange={handleFileChange} className="toolbarButton"/>
// <a href="something" className="toolbarButton" onClick={uploadFile}> Submit file </a>
// <a href="something" className="toolbarButton" onClick={info}> info </a>

function constructQuoteFromData(data){
  let q = new Quote(data._id, data.quoteText, data.offset, data.codeRefs, data.documentNum);
  q.memo = data.memo;
  //console.log("QQ: ",q);
  return q;
}

export default Toolbar;
