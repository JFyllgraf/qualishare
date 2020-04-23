import React from "react";
import {BrowserRouter as Router, Route } from "react-router-dom";

import Join from "./components/Join/Join";
import App from "./App";


const ClientRouter = () => (
      <Router>
        <Route path="/" exact component={Join} />
        <Route path="/home" render={(props) => <App {...props} isAuthed={true}/>}/>
      </Router>
);

export default ClientRouter;
