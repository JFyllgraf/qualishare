import React, { useState, useEffect} from 'react';

import './CodeInspector.css';
import axios from "axios";
import {server_url} from "../../../Utility/GlobalVariables";


function CodeInspector({user}) {
  const [userName, setUserName] = useState('');
  const [spanID, setSpanID] = useState('');

  useEffect(() => {
    setUserName(user);
  }, [user]);

  useEffect(() => {
    window.addEventListener("testEvent", function (e) {
      setUserName(e.detail.username);
      setSpanID(e.detail.id);
    }, false);
  });

  function removeQuote(){
    var span = document.getElementById(spanID);

    // remove span from Editor
    // place childNodes in document fragment
   	var docFrag = document.createDocumentFragment();
   	while (span.firstChild) {
   		var child = span.removeChild(span.firstChild);
   		docFrag.appendChild(child);
   	}
   	// replace wrapper with document fragment
   	span.parentNode.replaceChild(docFrag, span);
    document.getElementById('textDiv').focus();
    // remove quote from DB
      axios.delete(server_url+'/deleteQuote', {data: {_id:spanID}}).then(res =>{
          console.log("Deleted quote: ", res);
      }).catch(err =>{
          console.log(err);
      })
    setUserName('');
   }

  return (
    <div className="codeInspector-container">

      {(userName) ?<div>
          <h4> Selected Code: </h4>
          <p>Coded by: {userName}</p>
          <button onClick={removeQuote}>Delete quote</button>
        </div>
      : <div></div>}
    </div>
  );
}

export default CodeInspector;
