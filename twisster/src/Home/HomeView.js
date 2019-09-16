import React from "react";
import Home from "../Home";

const HomeView = ({ onClick }) => {
  return (
    <div>
      <h1>Home</h1>
      <form>
      <button onClick={onClick}>Login</button>
      <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default HomeView;