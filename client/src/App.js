import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

import './App.css';

const App = () => {


  return(

        <div className="container">
            <div className="header">HEADER</div>
            <div className="menu">MENU</div>
            <div className="content">CONTENT</div>
            <div className="extra">EXTRA</div>
            <div className="footer">FOOTER</div>
        </div>

    // <Router>
    //   <Route path="/" exact component={Join} />
    //   <Route path="/chat" component={Chat} />
    // </Router>
  )
};

export default App;
