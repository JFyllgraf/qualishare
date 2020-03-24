import React from 'react';

import './Header.css';


function Header () {

  return (
    <nav className="navigation">
      <ul className="header-menu">
        <li className="menu__item">
          <a className="menu__link">
            <span className="menu__title">
              <span className="menu__first-word" data-hover="New">
                New
              </span>
              <span className="menu__second-word" data-hover="Document">
                Document
              </span>
            </span>
          </a>
        </li>

        <li className="menu__item">
          <a href="#" className="menu__link">
            <span className="menu__title">
              <span className="menu__first-word" data-hover="Save">
                Save
              </span>
              <span className="menu__second-word" data-hover="As">
                As
              </span>
            </span>
          </a>
        </li>

        <li className="menu__item">
          <a href="#" className="menu__link">
            <span className="menu__title">
              <span className="menu__first-word" data-hover="Quick">
                Quick
              </span>
              <span className="menu__second-word" data-hover="Save">
                Save
              </span>
            </span>
          </a>
        </li>


      </ul>
      </nav>
  );
}

export default Header;
