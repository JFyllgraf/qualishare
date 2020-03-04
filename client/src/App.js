import React, {Component} from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';


class App extends Component {
    state = {
        name: "",
        room: ""
};

    //this function updates parent (app.js) state as expected
    addNameAndRoom = (name, room) => {
        this.setState({
            name: name,
            room: room
        }//, () => console.log("Clicked in addname: " + this.state.name + " " + this.state.room)
        );
    };

    render() {
        return (
            <Router>
                <Route exact path="/" render={() => <Join addNameAndRoom={this.addNameAndRoom}/>} />
                <Route path="/chat" component={() => Chat(this.state.name, this.state.room)}/>} />
            </Router>
        )
    }
};

export default App
