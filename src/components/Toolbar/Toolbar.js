import React, { useState, useEffect } from 'react';
import Mark from 'mark.js';

import './Toolbar.css';
import { highlight } from '../../Utility/Helpers';
import Quote from "../../data_model/Quote";



function Toolbar ({name, codes, selected, handler, quoteHandler, emmitChange}) {
  const [userName, setUserName] = useState(name);
  const [codeList, setCodeList] = useState(codes);
  const [selectedCode, setSelectedCode] = useState(selected);

  useEffect(() => {
    handler(selectedCode);
    setCodeList(codes);
  }, [selectedCode, codes, handler]);

  function newSelection(event){
    let i;
    for (i = 0; i < codeList.length; i++) {
      if (codeList[i].getName() === event.target.value){
        setSelectedCode(codeList[i]);
      }
    }
  }

  function OLDhighlight(color) {
    var userSelection = window.getSelection().getRangeAt(0);
    highlightRange(userSelection, color);
  }

  function highlightRange(range, color) {
    if (range.startContainer.parentElement.nodeName == "SPAN" || range.endContainer.parentElement.nodeName == "SPAN"){
      alert('test');
    } else {
      var newNode = document.createElement("span");
      newNode.setAttribute(
        "username",
        userName
      );
      newNode.setAttribute(
         "style",
         "background-color: "+ color +"; display: inline;"
      );
      const text = range.toString();
      newNode.onmousedown = quoteHandler;
      newNode.innerText = text;
      document.execCommand('insertHTML', false, newNode.outerHTML);
      //range.surroundContents(newNode);
      var selOffsets = getSelectionCharacterOffsetWithin(document.getElementById("textDiv"));
      console.log("Selection offsets: " + selOffsets.start + ", " + selOffsets.end);
    }
  }

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

  function log(){
    console.log('test');
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
    highlight(selectedCode.getColor(), userName);

    //console.log(quote.getQuoteText(), quote.getQuoteOffset(), quote.getSummary());
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
        <a href="/#" className="toolbarButton" onClick={addQuote}>Apply</a>
        <a href="/#" className="toolbarButton" onClick={removeQuote}>Remove</a>
      </div>
    </div>

  );
}

export default Toolbar;
