import React, {useEffect, useState} from 'react';
import { Button, Label, FormGroup, Input, CustomInput } from 'reactstrap';
import './CodeToggle.css';
import Code from '../../data_model/Code'


const CodeToggle = ({addCodeToList, getCodes}) => {
    const [temp, setTemp] = useState('');


    useEffect(() => {
        setTemp('');
    }, [temp]);

    const handleOnKeyUp = (e) => {
        e.preventDefault();
        let code = new Code(e.target.value);
        addCodeToList(code);
        e.target.value = ''; //at first this seemed like it was bad idea, but it works.

        //we should also do check for duplicate codes
    };
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

      <Label>Active codes</Label>
      <div className="btn-group">
        <Button color="dark" size="sm">+</Button>
        <Button color="dark" size="sm">-</Button>
      </div>
        <div><input type="text" onKeyUpCapture={(e) => e.keyCode===13 ? handleOnKeyUp(e) : null}/></div>
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
