import React, { useState } from 'react';
import { Button, Label, FormGroup, Input, CustomInput } from 'reactstrap';
import './CodeToggle.css';
import Code from '../../data_model/Code'


const CodeToggle = ({addCodeToList}) => {

    const handleOnKeyUp = (e) => {
        e.preventDefault();
        let code = new Code(e.target.value);
        addCodeToList(code);
    };

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
          <CustomInput type="checkbox" id="1" label="Red" />
          <CustomInput type="checkbox" id="2" label="Green" />
          <CustomInput type="checkbox" id="3" label="Blue" />
        </FormGroup>
      </div>

    </div>
  );
};

export default CodeToggle;
