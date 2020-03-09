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
        isLoggedIn: false
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
        console.log(this.state);
        return (
          <div className="grid-container">
              <div className="header">
                <Header/>
              </div>
              <div className="menu">
                <CodeToggle/>
                <CodeFeed/>
              </div>
              <div className="content">
                <Content/>
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
