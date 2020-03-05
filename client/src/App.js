import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import CodeToggle from './components/CodeToggle/CodeToggle';
import CodeFeed from './components/CodeFeed/CodeFeed';

import './App.css';

const App = () => {


  return(

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
