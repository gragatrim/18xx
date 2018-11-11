import React from "react";
import Matches from "./Matches";
import { NavLink } from "react-router-dom";

const Home = () => {
  const wordStyle = {
    float: 'left',
    clear: 'both',
    'marginLeft': '10px'
  }
  return (
    <div className="home">
      <NavLink style={wordStyle} to={`/newuser`}>Create New User</NavLink>
      <NavLink style={wordStyle} to={`/newgame`}>New Game</NavLink>
      <Matches />
    </div>
  );
};

export default Home;
