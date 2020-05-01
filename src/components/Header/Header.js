import React, { useState, useEffect } from 'react';

import './Header.css';


function Header({name}) {
  const [userName, setUserName] = useState(name);

  useEffect(() => {
    setUserName(name);
    console.log("Header: " + name);
  }, [userName, name]);

  return (
    <nav className="navigation">

      <div className="currentUserContainer">
        Logged in as {userName}
      </div>

      </nav>
  );
}

// <ul className="header-menu">
//
//   <li className="menu__item">
//     <a href="/#" className="menu__link">
//       <span className="menu__title">
//         <span className="menu__first-word" data-hover="New">
//           New
//         </span>
//         <span className="menu__second-word" data-hover="Document">
//           Document
//         </span>
//       </span>
//     </a>
//   </li>
//
//   <li className="menu__item">
//     <a href="/#" className="menu__link">
//       <span className="menu__title">
//         <span className="menu__first-word" data-hover="Save">
//           Save
//         </span>
//         <span className="menu__second-word" data-hover="As">
//           As
//         </span>
//       </span>
//     </a>
//   </li>
//
//   <li className="menu__item">
//     <a href="/#" className="menu__link">
//       <span className="menu__title">
//         <span className="menu__first-word" data-hover="Quick">
//           Quick
//         </span>
//         <span className="menu__second-word" data-hover="Save">
//           Save
//         </span>
//       </span>
//     </a>
//   </li>
//
//
// </ul>

export default Header;
