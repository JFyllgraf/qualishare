import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import './Header.css';


function Header ({codes, selected, handler, test}) {
  const [codeList, setCodeList] = useState(codes);
  const [selectedCode, setSelectedCode] = useState(selected);
  const myTest = test;
  console.log(myTest);

  useEffect(() => {
    handler(selectedCode);
    console.log(selectedCode);
  }, [selectedCode]);

  function handleChange(event){
    setSelectedCode(event.target.value);
  }

  function surroundSelection() {
    const result = window.confirm("Want to delete the code?");
    if (result){
      var span = document.createElement("span");
      span.style.fontWeight = "bold";
      span.style.color = "black";

      if (window.getSelection) {
          var sel = window.getSelection();
          if (sel.rangeCount) {
              var range = sel.getRangeAt(0).cloneRange();
              range.surroundContents(span);
              sel.removeAllRanges();
              sel.addRange(range);
          }
      }
    }
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
        <Button className="btn-dark" onClick={surroundSelection}>Apply</Button>
      </div>

    </div>
  );
}

export default Header;
