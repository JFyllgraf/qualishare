import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

import './App.css';

const App = () => {


  return(

      <div>
        <div className="container">
            <div className="header">HEADER</div>
            <div className="leftMenu">MENU1</div>
            <div className="content">CONTENT</div>
            <div className="rightMenu">MENU2</div>
            <div className="footer">FOOTER</div>
        </div>
      </div>

    // <Router>
    //   <Route path="/" exact component={Join} />
    //   <Route path="/chat" component={Chat} />
    // </Router>
  )
};

export default App;
