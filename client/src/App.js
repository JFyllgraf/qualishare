import React, {Component} from 'react';



import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

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
            <div>
                {this.state.isLoggedIn ? this.chat() : this.join()}
            </div>
        )
    }
}

export default App
