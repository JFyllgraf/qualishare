import React, {Component} from 'react';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import CodeToggle from './components/CodeToggle/CodeToggle';
import CodeFeed from './components/CodeFeed/CodeFeed';

import './App.css';

    // <Router>
    //   <Route path="/" exact component={Join} />
    //   <Route path="/chat" component={Chat} />
    // </Router>

class App extends Component {
    state = {
        name: "",
        room: "",
        isLoggedIn: false,
        codes: ['green', 'blue', 'red'],
        selected: 'green',
        codeObjects: []
    };

    updateStateHandler = (property) => {
      this.setState({selected: property}, () => {
        console.log(this.state.selected);
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
        )
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
              </div>
              <div className="menu">
                <CodeToggle addCodeToList={this.addCodeToList}/>
                <CodeFeed/>
              </div>
              <div className="content">
                <Content
                 selected={this.state.selected}
                 codes={this.state.codes}
                 handler={this.updateStateHandler}
                 />
              </div>
              <div className="extra">
                {this.state.isLoggedIn ? this.chat() : this.join()}
              </div>
              <div className="footer">FOOTER</div>
          </div>
        )
    }
}

export default App
