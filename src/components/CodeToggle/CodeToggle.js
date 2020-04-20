import React, {useState} from 'react';
import { FormGroup, CustomInput } from 'reactstrap';
import './CodeToggle.css';
import Code from '../../data_model/Code'
import io from "socket.io-client";
import {server_url} from "../../Utility/GlobalVariables";
import axios from 'axios';




let socket;
const CodeToggle = ({addCodeToList, deleteCodeFromList, getCodes, addReceivedCode}) => {
    const [codename, setcodeName] = useState('');
    const [onChangeEvent, setonChangeEvent] = useState();
    
    const ENDPOINT = server_url;
    socket = io(ENDPOINT);
    

    socket.on("newCode", function (data) {
        let receivedCode = JSON.parse(data);
        console.log("Received Code", receivedCode);
        if (!isCodeInList(receivedCode._id)){
            let newCode = new Code(receivedCode.codeName);
            newCode.id = receivedCode.id;
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

    //is also onclick, this adds new code through the 'enter' key
    const handleOnKeyUp = (e) => {
        e.preventDefault();

        axios.post(server_url+"/newCode", {codeName: codename}).then(res => {
            let code = constructCodeFromData(res.data)
            addCodeToList(code);
            e.target.value = ''; //at first this seemed like it was bad idea, but it works.
            setonChangeEvent(undefined); //reset
        }).catch(err => {
            console.log(err);
        })
    };

    //this adds new code through the button
    const handleOnClick = (e) => {
        e.preventDefault();
        axios.post(server_url+"/newCode", {codeName: codename}).then(res => {
            let code = constructCodeFromData(res.data);
            addCodeToList(code);
            onChangeEvent.target.value = ''; //reset
            setonChangeEvent(undefined); //reset
        }).catch(err =>{
            console.log(err);
        })

    };
    function constructCodeFromData(data){
        let code = new Code(data.codeName, data.id);
        code.color = data.color
        code.quoteRefs = data.quoteRefs;
        return code;
    }
    const handleOnClickDeleteCode = () => {
        let codes = getCodes();
        let codeToDelete = onChangeEvent.target.value;

        for (let i = 0; i < codes.length; i++){
            if (codes[i].getName() === codeToDelete){
                axios.delete(server_url+"/deleteCode", {data: codes[i]}).then(res=>{
                    console.log(res);
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
        codes.map((code) => {
            if (code.getName() === inputString){
                bool = false;
            }
        });

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
                                <CustomInput type="checkbox" id={code.getId().toString()} label={code.getName()}/>
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
        <a className="toggleButton"  id="addbtn" onClick={(e) => CheckValidInput(e) ? handleOnClick(e) : null} color="dark" size="sm">+</a>
        <a className="toggleButton" id="deletebtn" onClick={(e) => CheckValidInput(e) ? handleOnClickDeleteCode(e) : null} color="dark" size="sm">-</a>
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
