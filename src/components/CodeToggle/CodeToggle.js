import React, {useState} from 'react';
import { FormGroup, CustomInput } from 'reactstrap';
import './CodeToggle.css';
import Code from '../../data_model/Code'


const CodeToggle = ({addCodeToList, deleteCodeFromList, getCodes}) => {
    const [codename, setcodeName] = useState('');
    const [onChangeEvent, setonChangeEvent] = useState();

    //is also onclick
    const handleOnKeyUp = (e) => {
        console.log(e.target.value);
        e.preventDefault();
        let code = new Code(e.target.value);
        addCodeToList(code);
        e.target.value = ''; //at first this seemed like it was bad idea, but it works.
    };
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

      <h4>Active Codes</h4>
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