import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import './Header.css';


const Header = () => {

  return (
    <div className="header-container">

      <Label className="label">Select Code: </Label>
      <div className="toolbox-container">
        <Form>
          <FormGroup className="form-group">
            <Input className="btn-dark" type="select" name="select" id="exampleSelect">
              <option>Red</option>
              <option>Green</option>
              <option>Blue</option>
            </Input>
          </FormGroup>
        </Form>
        <Button className="btn-dark">delete</Button>
        <Button className="btn-dark">add</Button>
      </div>

    </div>
  );
}

export default Header;
