import React, { useState, useEffect } from 'react';
import { Button, Label, Input } from 'reactstrap';

import './Toolbar.css';
import { highlight } from '../../Utility/Helpers';
import Quote from "../../data_model/Quote";
import axios from 'axios';
import {server_url} from "../../Utility/GlobalVariables";
import io from "socket.io-client";

//'Content-Type': 'application/json',
const config = {
  headers:{
        "Access-Control-Allow-Origin": "*"}
}
//axios.defaults.headers.common = config;


let socket;
socket = io(server_url);

function Toolbar ({codes, selected, handler, emmitChange, uploadFile, handleFileChange}) {
  const [codeList, setCodeList] = useState(codes);
  const [selectedCode, setSelectedCode] = useState(selected);

  const [uploadedFile, setUploadedFile] = useState(undefined);
  useEffect(() => {
    handler(selectedCode);
    setCodeList(codes);
  }, [selectedCode, codes, selected]);
  useEffect(()=>{
    setSelectedCode(selected);
  })

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
     selectedCode.addQuote(constructQuoteFromData(JSON.parse(data))); //create and add new client side quote
  });

  const addQuote = (event) => { 
    event.preventDefault();
    let selectedText = window.getSelection().toString();
    let offset = window.getSelection().anchorOffset;

    if(selectedText === null || selectedText === undefined || selectedText ==='') {
      return null
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
        selectedCode.addQuote(constructQuoteFromData(res.data));
      }).catch(err => {
        console.log(err);
      });
    }
    highlight(selectedCode.getColor());
  };

  const removeQuote = (event) => {
    event.preventDefault();
    let text = window.getSelection().toString();
    let quotes = selectedCode.getQuotes();

    //because duplicates, we use a boolean, fix dupes later
    let firstTime = true;
    for (let i = 0; i < quotes.length; i++){
      if (quotes[i].getQuoteText() === text){
        selectedCode.removeQuote(quotes[i]);
        if(firstTime) {
          axios.delete(server_url+'/deleteQuote', {data: quotes[i]}).then(res =>{
            firstTime = false;
            console.log("Deleted quote");
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
    console.log("stuffz");
  }


  return (
    <div className="toolbar-container">
      <div className="toolbar-innerContainer">
        <span className="label">Select Code: </span>
        <select value="{selectedCode.codeName}" onChange={newSelection} className="toolbarSelect" type="select" name="select">
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
  return new Quote(data.id, data.quoteText, data.offset, [data.codeRefs], data.documentNum);
}

export default Toolbar;
