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

function Toolbar ({codes, selected, handler, emmitChange}) {
  const [codeList, setCodeList] = useState(codes);
  const [selectedCode, setSelectedCode] = useState(selected);
  const [file, setFile] = useState(undefined);
  const [fileName, setFileName] = useState(undefined);
  const [uploadedFile, setUploadedFile] = useState(undefined);
  useEffect(() => {
    handler(selectedCode);
    setCodeList(codes);
  }, [selectedCode, codes]);

  function newSelection(event){
    let i;
    for (i = 0; i < codeList.length; i++) {
      if (codeList[i].getName() === event.target.value){
        setSelectedCode(codeList[i]);
      }
    }
  }
   socket.on("newQuote", function(data) {
     console.log("Receiving client data: ", JSON.stringify(data));
     selectedCode.addQuote(constructQuoteFromData(data)); //create and add new client side quote
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
        console.log("Succes!", res);
      }).then(() => {
        socket.emit("newQuote", data);
        selectedCode.addQuote(constructQuoteFromData(data));
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

    for (let i = 0; i < quotes.length; i++){
      if (quotes[i].getQuoteText() === text){
        selectedCode.removeQuote(quotes[i]);
        document.execCommand('removeFormat', false, null);
        break;
      }
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);

  };
  const uploadFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    console.log("Client try");

    try{
      const res = await axios.post(server_url+'/upload', formData, {
        headers: {
          'content-Type':'multipart/form-data'
        }
      });
      const {fileName, filePath} = res.data;
    } catch (err){
      if (err.status === 500){
        alert("Problem with the server: ");
      }
      else{
        console.log("Error: ", err);
      }
    }
  };
  const handleThis = e => {
    addQuote(e);
  }

  return (
    <div className="toolbar-container">
      <div className="toolbar-innerContainer">
        <span className="label">Select Code: </span>
        <select value={selectedCode.getName()} onChange={newSelection} className="toolbarSelect" type="select" name="select">
          {
            (codeList) ?
            codeList.map(code => {
              return <option className="toolbarOption" key={code.getId()}>{code.getName()}</option>
            }) :
            null
          }
        </select>
        <a href="something" className="toolbarButton" onClick={addQuote}>Apply</a>
        <a href="something" className="toolbarButton" onClick={removeQuote}>Remove</a>
        <Input type="file" onChange={handleFileChange} className="toolbarButton"> Put in text from file</Input>
        <a href="something" className="toolbarButton" onClick={uploadFile}> Submit file </a>
      </div>
    </div>
  );
}

function constructQuoteFromData(data){
  return new Quote(data.id, data.quoteText, data.offset, [data.codeRefs], data.documentNum);
}

export default Toolbar;
