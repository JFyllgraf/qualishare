import React, {useState, useEffect} from 'react';
import { FormGroup } from 'reactstrap';
import './CodeManager.css';
import Code from '../../../data_model/Code';
import Quote from '../../../data_model/Quote';
import io from "socket.io-client";
import {server_url} from "../../../Utility/GlobalVariables";
import axios from 'axios';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Modal from 'react-bootstrap/Modal';

let socket;
const CodeManager = ({addCodeToList, deleteCodeFromList, getCodes, addReceivedCode, userName}) => {
  const [codename, setcodeName] = useState('');
  const [onChangeEvent, setonChangeEvent] = useState();


  const [activeCodeName, setActiveCodeName] = useState();
  const [activeCodeId, setActiveCodeId] = useState();
  const [quoteList, setQuoteList] = useState();

  //modal handling
  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log(quoteList);
  }, [quoteList])

  const ENDPOINT = server_url;
  socket = io(ENDPOINT);
  socket.on("newCode", function (data) {
      let receivedCode = JSON.parse(data);
      if (!isCodeInList(receivedCode._id)){
          let newCode = new Code(receivedCode.codeName);
          newCode._id = receivedCode._id;
          newCode.color = receivedCode.color;
          newCode.userName = receivedCode.userName;
          addReceivedCode(newCode);
      }
      //do nothing
  });
  socket.on("deleteCode", function(data){
      let codes = getCodes();

      for (let i = 0; i < codes.length; i++){
          if (codes[i].getName() === data){
              deleteCodeFromList(i);
          }
      }
  });
  function isCodeInList(id){
      let codes = getCodes();
      let bool = false;

      for (let i = 0; i < codes.length; i++){
          if (codes[i].getId() === id){
              bool = true;
              break;
          }
      }
      return bool;
  }
  const handleOnChange = (e) => {
      e.preventDefault();
      e.persist();
      setonChangeEvent(e);
      setcodeName(e.target.value);
  };

  //this adds new code through the button: add new code
  const handleOnClick = (e) => {
      e.preventDefault();

      axios.post(server_url+"/newCode", {codeName: codename, userName:userName}).then(res => {
          let code = constructCodeFromData(res.data);
          addCodeToList(code);
      }).catch(err =>{
          console.log(err);
      })
      onChangeEvent.target.value = ''; //reset
      setonChangeEvent(undefined); //reset

  };
  function constructCodeFromData(data){
      let code = new Code(data.codeName, data._id);
      code.color = data.color
      code.quoteRefs = data.quoteRefs;
      code.userName = data.userName;
      return code;
  }
  const handleOnClickDeleteCode = (e) => {
      e.preventDefault();
      let codes = getCodes();
      let codeToDelete = onChangeEvent.target.value;

      for (let i = 0; i < codes.length; i++){
          if (codes[i].getName() === codeToDelete){
              axios.delete(server_url+"/deleteCode", {data: codes[i]}).then(res=>{
                  deleteCodeFromList(i);
                  onChangeEvent.target.value = '';//reset
                  setonChangeEvent(undefined)//reset
                  socket.emit("deleteCode", codeToDelete);


                  axios.delete(server_url+"/deleteQuotes/by_Code_id", {data:{_id:codes[i]._id}}).then(res=>{
                      socket.emit("newQuote", ""); //this is a hack, in order to updatestyle
                      console.log("Success, deleted all quotes of code", res);
                  }).catch(err => {
                      console.log(err);
                  });

              }).catch(err=>{
                  console.log(err);
              });




          }
      }
  };


  function CheckValidInput(e){
      if(onChangeEvent === undefined){
          return false;
      }

      let inputString = onChangeEvent.target.value;
      if (inputString ===''){
          return false;
      }

      let bool = true;
      let codes = getCodes();
      for (let i = 0; i < codes.length; i++){
        if (codes[i].getName() === inputString){
          bool = false;
        }
      }



      if(e.target.id === "deletebtn"){
          bool = !bool;
      }
      return bool;
  }

  function numOfQuotes(code) {
      return "";//" ("+code.quoteRefs.length.toString()+")";
  }

  function DisplayCode() {
    let codes = getCodes();
    return (
      <div className="code-list">
          {
            codes.map(code => {
                return (
                  <div className="code-element" name={code.getName()} id={code.getId()} key={code.getId()} onClick={openCodeModal}>
                    {code.getName()}
                  </div>
                )
            })
          }
      </div>
    )
  }

  function openCodeModal(event){
    setActiveCodeId(event.target.id);
    setActiveCodeName(event.target.getAttribute('name'));
    setShow(true);
    console.log(event.target.getAttribute('name'));
  }

  function updateQuoteList() {
    axios.get(server_url+"/Quotes/by_Code_id", {params:{_id: activeCodeId}}).then(res=>{
      console.log("my res: ", res.data);
      let quotes = ExtractQuotesFromData(res.data);
      setQuoteList(quotes);
    }).catch(err=>{
      console.log(err);
    });
    console.log("Quotes: " + quoteList);
  }

  function ExtractQuotesFromData(jsonArray) {
      let quotes = [];
      jsonArray.map(jsonQuote => {
        let quote = new Quote(jsonQuote._id, jsonQuote.quoteText, jsonQuote.quoteOffset, jsonQuote.codeRefs, jsonQuote.memo, jsonQuote.userName);
        quotes = [...quotes, quote];
      });
      return quotes;
  }

  return (
    <div className="codeManager-container">
      <h4>ACTIVE CODES</h4>
      <div className="btn-group">
        <a className="toggleButton" href="/#" id="addbtn" onClick={(e) => CheckValidInput(e) ? handleOnClick(e) : null}>+</a>
        <a className="toggleButton" href="/#" id="deletebtn" onClick={(e) => CheckValidInput(e) ? handleOnClickDeleteCode(e) : null}>-</a>
      </div>
        <div><input type="text" onChange={handleOnChange} onKeyUpCapture={(e) => e.keyCode===13 && CheckValidInput(e) ? handleOnClick(e) : null}/></div>
      <div className="code-list-container">
        <div className="input-icons">
          {DisplayCode()}
        </div>
      </div>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        onEnter={updateQuoteList}
        dialogClassName="custom-modal"
        aria-labelledby="example-custom-modal-styling-title"
        centered
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title id="modal-title">
            <b>Code: </b>{activeCodeName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul id="quoteList">
            { (quoteList && quoteList.length > 0) ?
              quoteList.map(quote => {
                return <li className="quote-element">{quote.quoteText} <i className="quoteUsername"> - coded by {quote.userName}</i></li>
              }) :
              <p>This code has not been applied yet...</p>}
          </ul>
        </Modal.Body>
      </Modal>

    </div>
  );
};
/*
<CustomInput type="checkbox" id="1" label="Red" />
<CustomInput type="checkbox" id="2" label="Green" />
    <CustomInput type="checkbox" id="3" label="Blue" />
*/



export default CodeManager;
