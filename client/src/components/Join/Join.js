import React, {Component} from 'react';

import './Join.css';

class Join extends Component {
  state = {
    name: "",
    room: ""
  };


  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleOnClick = (e) => {
    e.preventDefault();
    this.props.addNameAndRoom(this.state.name, this.state.room);

  };
  render() {
    return (
        <div className="joinOuterContainer">
          <div className="joinInnerContainer">
            <h1 className="heading">Join</h1>
            <div>
              <input placeholder="Name" type="text" id="name" className="joinInput" onChange={this.handleChange}/>
            </div>
            <div>
              <input placeholder="Room" type="text" id="room" className="joinInput mt-20" onChange={this.handleChange} />
            </div>
            <button className="button mt-20" onClick={this.handleOnClick} type="submit">Sign In</button>
          </div>
        </div>
    )
  }
}



/*
const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  const fontStyle = {
    color: 'white'
  };


  return(
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div><input onChange={(event) => setName(event.target.value)} placeholder="Name" className="joinInput" type="text"/></div>
        <div><input onChange={(event) => setRoom(event.target.value)} placeholder="Room" className="joinInput mt-20" type="text"/></div>
        <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
          <button className="button mt-20" type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  )
};

 */




// function getSelectionText() {
  //   var text = "";
  //   if (window.getSelection) {
  //       text = window.getSelection().toString();
  //   } else if (document.selection && document.selection.type != "Control") {
  //       text = document.selection.createRange().text;
  //   }
  //   console.log(text);
  // }

export default Join;
