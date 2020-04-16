import React, {useState} from 'react';
import { FormGroup } from 'reactstrap';
import './CodeToggle.css';
import Code from '../../data_model/Code'
import io from "socket.io-client";
import {server_url} from "../../Utility/GlobalVariables";
let socket;
const CodeToggle = ({addCodeToList, deleteCodeFromList, getCodes, addReceivedCode}) => {
    const [codename, setcodeName] = useState('');
    const [onChangeEvent, setonChangeEvent] = useState();

    const ENDPOINT = server_url;
    socket = io(ENDPOINT);

    //is also onclick
    const handleOnKeyUp = (e) => {
        console.log(e.target.value);
        e.preventDefault();
        let code = new Code(e.target.value);
        addCodeToList(code);
        e.target.value = ''; //at first this seemed like it was bad idea, but it works.
        setonChangeEvent(undefined); //reset
    };
    socket.on("newCode", function (data) {
        let receivedCode = JSON.parse(data);
        console.log("Received Code", receivedCode);
        if (!isCodeInList(receivedCode._id)){
            let newCode = new Code(receivedCode._name);
            newCode._id = receivedCode._id;
            newCode._color = receivedCode._color;
            //addReceivedCodeToList(newCode);
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

    const handleOnClick = (e) => {
        e.preventDefault();
        let code = new Code(codename);
        addCodeToList(code);
        onChangeEvent.target.value = ''; //reset
        setonChangeEvent(undefined); //reset
    };
    const handleOnClickDeleteCode = () => {
        let codes = getCodes();
        let codeToDelete = onChangeEvent.target.value;

        for (let i = 0; i < codes.length; i++){
            if (codes[i].getName() === codeToDelete){
                deleteCodeFromList(i);
            }
        }
        onChangeEvent.target.value = '';//reset
        setonChangeEvent(undefined)//reset
        socket.emit("deleteCode", codeToDelete);
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

    function DisplayCode() {
        let codes = getCodes();
        return (
            <div className="code-list">
                {
                    codes.map(code => {
                        return (
                            <div className="code" key={code.getId().toString()}>
                                <li id={code.getId().toString()}>{code.getName()}</li>
                            </div>
                        )
                    })
                }
            </div>
        )
    }


  return (
    <div className="codeToggle-container">

      <h4>ACTIVE CODES</h4>
      <div className="btn-group">
        <a className="toggleButton" href="/#" id="addbtn" onClick={(e) => CheckValidInput(e) ? handleOnClick(e) : null}>+</a>
        <a className="toggleButton" href="/#" id="deletebtn" onClick={(e) => CheckValidInput(e) ? handleOnClickDeleteCode(e) : null}>-</a>
      </div>
        <div><input type="text" onChange={handleOnChange} onKeyUpCapture={(e) => e.keyCode===13 && CheckValidInput(e) ? handleOnKeyUp(e) : null}/></div>
      <div className="code-list-container">
        <FormGroup check>
            {DisplayCode()}
        </FormGroup>
      </div>
    </div>
  );
};
/*
<CustomInput type="checkbox" id="1" label="Red" />
<CustomInput type="checkbox" id="2" label="Green" />
    <CustomInput type="checkbox" id="3" label="Blue" />
*/



export default CodeToggle;
