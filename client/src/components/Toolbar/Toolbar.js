import React, { useState, useEffect } from 'react';
import { Button, Label, Input } from 'reactstrap';

import './Toolbar.css';
import { highlight } from '../../Utility/Helpers';


function Toolbar ({codes, selected, handler, emmitChange}) {
  const [codeList, setCodeList] = useState(codes);
  const [selectedCode, setSelectedCode] = useState(selected);

  useEffect(() => {
    handler(selectedCode);
  }, [selectedCode]);

  function newSelection(event){
    setSelectedCode(event.target.value);
  }

  function removeCode(){
    document.execCommand('removeFormat', false, null);
  }

  function addCode(){
    highlight(selectedCode);
  }

  return (
    <div className="toolbar-container">
      <Label className="label">Select Code: </Label>
      <div className="toolbar-innerContainer">
        <Input value={selectedCode} onChange={newSelection} className="select btn-dark" type="select" name="select" id="exampleSelect">
          {
            codeList.map(code => {
              return <option key={code}>{code}</option>
            })
          }
        </Input>
        <Button className="btn-dark" onClick={addCode}>Apply</Button>
        <Button className="btn-dark" onClick={removeCode}>Remove</Button>
      </div>
    </div>
  );
}

export default Toolbar;
