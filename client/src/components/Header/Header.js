import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import './Header.css';


function Header ({codes, selected, handler}) {
  const [codeList, setCodeList] = useState(codes);
  const [selectedCode, setSelectedCode] = useState(selected);

  useEffect(() => {
    handler(selectedCode);
    console.log(selectedCode);
  }, [selectedCode]);

  function handleChange(event){
    setSelectedCode(event.target.value);
  }

  return (
    <div className="header-container">
      <Label className="label">Select Code: </Label>
      <div className="toolbox-container">
        <Form>
          <FormGroup className="form-group">
            <Input value={selectedCode} onChange={handleChange} className="btn-dark" type="select" name="select" id="exampleSelect">
              {
                codeList.map(code => {
                  return <option key={code}>{code}</option>
                })
              }
            </Input>
          </FormGroup>
        </Form>
        <Button className="btn-dark">Remove</Button>
        <Button className="btn-dark">Apply</Button>
      </div>

    </div>
  );
}

export default Header;
