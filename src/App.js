import React, {Component} from 'react';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import CodeToggle from './components/CodeToggle/CodeToggle';
import CodeFeed from './components/CodeFeed/CodeFeed';
import Code from './data_model/Code';
import { server_url } from './Utility/GlobalVariables';


import './App.css';
import io from "socket.io-client";
import axios from "axios";
    // <Router>
    //   <Route path="/" exact component={Join} />
    //   <Route path="/chat" component={Chat} />
    // </Router>

let socket;

//added comment to reset server

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
        name: "",
        room: "",
        isLoggedIn: false,
        codeObjects: [],//[new Code('Code 1', 0), new Code('Code 2', 1)],
        selected: '',
        randomVar: ''
    };
      socket = io(server_url);
  }

    updateStateHandler = (property) => {
    this.setState({selected: property}, () => {
      //console.log("In updateStatehandler: ");
      //console.log(this.state.selected);
      //console.log("Stringify: ", JSON.stringify(this.state.codeObjects[this.state.codeObjects.length-1]));
    }//, socket.emit("newCode", JSON.stringify(this.state.codeObjects[this.state.codeObjects.length-1]))); //always emit last
    );
  };
  componentDidMount() {
      try {
          axios.get(server_url + "/Codes").then(res => {
              let retrievedCodes = extractCodesFromJson(res.data);
              this.setState({
                  codeObjects: retrievedCodes,
                  selected: retrievedCodes[0]
              })
          }).catch(err => {
              console.log(err);
          })
      }
      catch (err) {
          console.log(err)
      }
  }


    //this function updates parent (app.js) state as expected
  addNameAndRoom = (name, room) => {
      this.setState({
          name: name,
          room: room,
          isLoggedIn: true
      }
      );
  };

  addCodeToList = (code) => {
      let codes = [...this.state.codeObjects, code];
      this.setState({
          codeObjects: codes
        } //should be removed at some point
      );
      //setTimeout(socket.emit, 100, "newCode", JSON.stringify(this.state.codeObjects[this.state.codeObjects.length-1]));
      socket.emit("newCode", JSON.stringify(this.state.codeObjects[this.state.codeObjects.length-1]));
  };

  addReceivedCode = (code) => {
      let codes = [...this.state.codeObjects, code];
      this.setState({
              codeObjects: codes
          } //should be removed at some point
      );
  };

  deleteCodeFromList = (index) => {
      let temp = [...this.state.codeObjects];
      temp.splice(index, 1);
      this.setState({
          codeObjects: temp
      })
  };

  getCodes = () => {
      return this.state.codeObjects;
  };

  join = () => {
      return (
          <Join addNameAndRoom={this.addNameAndRoom}/>
      )
  };
  chat = () => {
      console.log("In chat: ", this.state);
      return (
      <Chat Name={this.state.name} Room={this.state.room} />
      )
  };

  render() {
      return (
        <div className="grid-container">
            <div className="header">
            <Header/>
            </div>
            <div className="menu">
              <CodeToggle addCodeToList={this.addCodeToList} deleteCodeFromList={this.deleteCodeFromList} getCodes={this.getCodes} addReceivedCode={this.addReceivedCode} />
              <CodeFeed/>
            </div>
            <div className="content">
              <Content
               selected={
                 !this.state.selected ?
                  this.state.codeObjects[0] : this.state.selected
               }
               codeObjects={this.state.codeObjects}
               handler={this.updateStateHandler}
               />
            </div>
            <div className="extra">
              {this.state.isLoggedIn ? this.chat() : this.join()}
            </div>
            <div className="footer"></div>
        </div>
      )
  }
}

function extractCodesFromJson(jsonArray){
    let codes = []
    jsonArray.map(jsoncode => {
        let code = new Code(jsoncode.codeName, jsoncode.id)
        code.color = jsoncode.color;
        code.link = jsoncode.link;
        code.memo = jsoncode.memo;
        codes = [...codes, code];
    })
    return codes;
}

export default App
