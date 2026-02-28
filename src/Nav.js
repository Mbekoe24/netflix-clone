import React from "react";
import "./Nav.css";
import avatarImg from "./assets/avatar-img.png";

function Nav() {
  return (
    <nav className="nav" aria-label="Main navigation">
      <div className="nav__contents">
        <img
          className="nav__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix logo"
        />
        <img
          className="nav__avatar"
          src={avatarImg}
          alt="User avatar"
        />
      </div>
    </nav>
  );
}

export default Nav;

