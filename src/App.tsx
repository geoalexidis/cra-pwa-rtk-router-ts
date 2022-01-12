import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { NavLink } from "react-router-dom";
import AppRoutes from "./router/components/AppRoutes";

const activeStyle = {
  textDecoration: "underline wavy blue ",
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <ul>
            <li>
              <NavLink className="App-link" to="/" style={({ isActive }) => (isActive ? activeStyle : {})}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className="App-link" to="counter" style={({ isActive }) => (isActive ? activeStyle : {})}>
                Counter (RTK Example)
              </NavLink>
            </li>
            <li>
              <NavLink className="App-link" to="pokemon" style={({ isActive }) => (isActive ? activeStyle : {})}>
                Pokemon (RTK-Query Example)
              </NavLink>
            </li>
            <li>
              <NavLink className="App-link" to="hn" style={({ isActive }) => (isActive ? activeStyle : {})}>
                HN (RTK-Query Algolia Example)
              </NavLink>
            </li>
            <li>
              <NavLink className="App-link" to="blog" style={({ isActive }) => (isActive ? activeStyle : {})}>
                Blog (RTK-Query GraphQL Example)
              </NavLink>
            </li>
          </ul>
        </nav>
        <img src={logo} className="App-logo" alt="logo" />
        <AppRoutes />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a className="App-link" href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
            React
          </a>
          <span>, </span>
          <a className="App-link" href="https://redux.js.org/" target="_blank" rel="noopener noreferrer">
            Redux
          </a>
          <span>, </span>
          <a className="App-link" href="https://redux-toolkit.js.org/" target="_blank" rel="noopener noreferrer">
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a className="App-link" href="https://react-redux.js.org/" target="_blank" rel="noopener noreferrer">
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
