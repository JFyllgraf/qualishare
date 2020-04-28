import React, { useState, useEffect} from 'react';

import './CodeManager.css';


function CodeManager({user}) {
  const [userName, setUserName] = useState(user);
  const [spanID, setSpanID] = useState('');

  useEffect(() => {
    setUserName(user);
  }, [user]);

  useEffect(() => {
    window.addEventListener("testEvent", function (e) {
      setUserName(e.detail.username);
      setSpanID(e.detail.id);
    }, false);
  });

  return (
    <div className="codeManager-container">
      <h4>Selected Code: </h4>
      <p>User Name: {userName}</p>
      <p>{spanID}</p>
    </div>
  );
}

export default CodeManager;
