import React, { useState } from 'react';
import { Button, Label, FormGroup, Input, CustomInput } from 'reactstrap';

import './CodeToggle.css';


const CodeToggle = () => {

  return (
    <div className="codeToggle-container">

      <Label>Active codes</Label>
      <div className="btn-group">
        <Button color="dark" size="sm">+</Button>
        <Button color="dark" size="sm">-</Button>
      </div>

      <div className="code-list-container">
        <FormGroup check>
          <CustomInput type="checkbox" id="1" label="Red" />
          <CustomInput type="checkbox" id="2" label="Green" />
          <CustomInput type="checkbox" id="3" label="Blue" />
        </FormGroup>
      </div>

    </div>
  );
}

export default CodeToggle;
