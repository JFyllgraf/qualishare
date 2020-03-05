import React, { useState } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

import './Content.css';


const Content = () => {
  const initialText = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur assumenda suscipit quos doloribus minus, provident corrupti repudiandae totam ipsam cum numquam! Repellat voluptas magnam amet, labore tempore laborum, dignissimos laudantium?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem error, nulla delectus id, nemo aliquam commodi, non distinctio pariatur nisi rem! Provident sapiente, natus assumenda cumque error, esse distinctio porro.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora optio debitis deleniti explicabo repellat quos ipsum itaque doloremque molestiae delectus a voluptates saepe vero iusto veritatis laudantium accusantium, assumenda sunt. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, quia enim, et assumenda odit rerum vero pariatur minus commodi iusto soluta architecto porro, cum ducimus id molestias odio vitae voluptates? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, libero numquam dolores temporibus exercitationem a voluptates sit minus perferendis iste consectetur accusamus pariatur tempore cupiditate adipisci labore corporis dolore eaque.";
  const [text, setText] = useState(initialText);

  return (
    <div className="content-container">

      <Form>
        <FormGroup >
          <Label for="exampleText">Text Area</Label>
          <Input
              value={text}
              className="content-input"
              onChange={(event) => setText(event.target.value)}
              type="textarea"
              name="text"/>
        </FormGroup>
      </Form>

    </div>
  );
}

export default Content;
