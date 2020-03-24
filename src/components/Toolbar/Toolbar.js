import React, { useState, useEffect } from 'react';
import { Button, Label, Input } from 'reactstrap';

import './Toolbar.css';
import { highlight } from '../../Utility/Helpers';
import Quote from "../../data_model/Quote";



function Toolbar ({codes, selected, handler, emmitChange}) {
  const [codeList, setCodeList] = useState(codes);
  const [selectedCode, setSelectedCode] = useState(selected);

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

  const addQuote = (event) => {
    event.preventDefault();
    let selectedText = window.getSelection().toString();
    if(selectedText === null || selectedText === undefined || selectedText ==='') {
      return null
    }
    else {
      var quote = new Quote(selectedText, window.getSelection().anchorOffset, [selectedCode]); //looks dangerous, but should be fine
      selectedCode.addQuote(quote);
    }
    highlight(selectedCode.getColor());


    console.log(quote.getQuoteText(), quote.getQuoteOffset(), quote.getSummary());
    //console.log(selectedCode.getName() + ": " + selectedCode.getColor());
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
      </div>
    </div>

  );
}

export default Toolbar;
