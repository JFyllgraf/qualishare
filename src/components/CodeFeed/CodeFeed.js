import React, { useState, useEffect} from 'react';

import './CodeFeed.css';


function CodeFeed({user}) {
  const [userName, setUserName] = useState(user);

  useEffect(() => {
    setUserName(user);
  }, [user]);

  useEffect(() => {
    window.addEventListener("testEvent", function (e) {
      setUserName(e.detail.username);
    }, false);
  });

  return (
    <div className="codeFeed-container">
      <h4>Selected Code: </h4>
      <p>User Name: {userName}</p>
    </div>
  );
}

export default CodeFeed;
