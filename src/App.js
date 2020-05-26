import React, {Component} from 'react';

import Editor from './components/Content/Editor/Editor';
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import Header from './components/Header/Header';
import CodeInspector from './components/Menu/CodeInspector/CodeInspector';
import CodeManager from './components/Menu/CodeManager/CodeManager';
import { server_url } from './Utility/GlobalVariables';
import {CSSTransition} from 'react-transition-group';

import './App.css';
import io from "socket.io-client";
import axios from "axios";
import SocketContext from "./Utility/SocketContext";
import {SocketProvider} from "./Utility/SocketContext";

const {ExtractQuotesFromData, extractCodesFromJson} = require('./Utility/Helpers');
const {Code} = require('../src/data_model/Code');

const socket = io(server_url);

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
        name: props.location.state.name,
        room: "",
        isLoggedIn: false,
        displayChat: true,
        codeObjects: [],
        selected: '',
        clickedQuote: '',
        quoteObjects: []
    };
  }

  updateStateHandler = (property) => {
    this.setState({selected: property}, () => {
    })
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
          });
          axios.get(server_url + "/Quotes").then(res => {
              let retrievedQuotes = ExtractQuotesFromData(res.data);
              this.setState({
                  quoteObjects: retrievedQuotes,
              });
          }).catch(err => {
              console.log(err);
          });
      }

      catch (err) {
          console.log(err)
      }
  }

  updateSelectedQuoteHandler = (event) => {
    console.log('HANDLER WORKS!');
    console.log(event.target.getAttribute('username'));
    this.setState({
      clickedQuote: event.target.getAttribute('username')
    });
  };

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
        }
      );
      socket.emit("newCode", JSON.stringify(this.state.codeObjects[this.state.codeObjects.length-1]));
  };
  addQuoteToList = (quote) =>{
      let quotes = [...this.state.quoteObjects, quote];
      this.setState({
          quoteObjects: quotes
          }
      );
      socket.emit("newQuote", JSON.stringify((this.state.quoteObjects[this.state.quoteObjects.length-1])));
  };

  addReceivedCode = (code) => {
      let codes = [...this.state.codeObjects, code];
      this.setState({
              codeObjects: codes
          } //should be removed at some point
      );
  };
  addReceivedQuote = (quote) =>{
      let quotes = [...this.state.quoteObjects, quote];
      this.setState({
          quoteObjects: quotes
      });
      console.log("Received Quote, socket.io:", this.state.quoteObjects);
  };

  deleteCodeFromList = (index) => {
      let temp = [...this.state.codeObjects];
      temp.splice(index, 1);
      this.setState({
          codeObjects: temp
      })
  };

  deleteQuoteFromList = (id) =>{
      let temp = [...this.state.quoteObjects];
      for (let i = 0; i < temp.length; i++){
        if (temp[i]._id === id){
          temp.splice(i, 1);
        }
      }

      this.setState({
          quoteObjects: temp
      });
  };

  getCodes = () => {
      return this.state.codeObjects;
  };
  getQuotes = () =>{
      return this.state.quoteObjects;
  };

  join = () => {
      return (
          <Join addNameAndRoom={this.addNameAndRoom}/>
      )
  };
  chat = () => {
      return (
          <SocketProvider value={socket}>
            <Chat Name={this.state.name} Room={this.state.room} />
          </SocketProvider>
      )
  };

  toggle(event){
    event.preventDefault();
    this.setState(prevState => ({
      displayChat: !prevState.displayChat,
    }));
  }

  render() {
      return (
        <div className="grid-container">
            <div className="header">
              <Header name={this.state.name}/>
            </div>
            <div className="menu">
                <SocketProvider value={socket}>
                    <CodeManager addCodeToList={this.addCodeToList} deleteCodeFromList={this.deleteCodeFromList} getCodes={this.getCodes} quoteObjects={this.state.quoteObjects} addReceivedCode={this.addReceivedCode} userName={this.state.name} />
                    <CodeInspector user={this.state.clickedQuote} deleteQuoteFromList={this.deleteQuoteFromList}/>
                </SocketProvider>
            </div>
            <div className="content">
                <SocketProvider value={socket}>
                    <Editor
                       selected={
                         !this.state.selected ?
                          this.state.codeObjects[0] : this.state.selected
                       }
                       name={this.state.name}
                       codeObjects={this.state.codeObjects}
                       handler={this.updateStateHandler}
                       quoteHandler={this.updateSelectedQuoteHandler}
                       addQuoteToList={this.addQuoteToList}
                       addReceivedQuote={this.addReceivedQuote}
                       deleteQuoteFromList={this.deleteQuoteFromList}
                       quoteObjects={this.state.quoteObjects}
                       />
               </SocketProvider>
            </div>
            <div className="extra">
              <CSSTransition
                in={this.state.displayChat}
                timeout={350}
                classNames="fade"
                unmountOnExit={false}
              >
                {(this.state.name) ? this.chat() : null}
              </CSSTransition>

              <a
                className="chatToggle"
                href="/#"
                onClick={(event) => this.toggle(event)}>{this.state.displayChat ? "Hide Chat" : "Show Chat"}
              </a>
            </div>
            <div className="footer">
            </div>
        </div>
      )
  }
}




export default App
