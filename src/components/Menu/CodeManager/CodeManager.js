import React, {useState} from 'react';
import { FormGroup } from 'reactstrap';
import './CodeManager.css';
import Code from '../../../data_model/Code'
import io from "socket.io-client";
import {server_url} from "../../../Utility/GlobalVariables";
import axios from 'axios';
import CustomInput from "reactstrap/es/CustomInput";

let socket;
const CodeManager = ({addCodeToList, deleteCodeFromList, getCodes, addReceivedCode}) => {
    const [codename, setcodeName] = useState('');
    const [onChangeEvent, setonChangeEvent] = useState();

    const ENDPOINT = server_url;
    socket = io(ENDPOINT);
    socket.on("newCode", function (data) {
        let receivedCode = JSON.parse(data);
        if (!isCodeInList(receivedCode._id)){
            let newCode = new Code(receivedCode.codeName);
            newCode._id = receivedCode._id;
            newCode.color = receivedCode.color;
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

        axios.post(server_url+"/newCode", {codeName: codename}).then(res => {
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
                }).catch(err=>{
                    console.log(err);
                })
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
                            <div className="code" key={code.getId()}>
                                <CustomInput type="checkbox" id={code.getId()} label={code.getName()+numOfQuotes(code)}/>
                            </div>
                        )
                    })
                }
            </div>
        )
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



export default CodeManager;
