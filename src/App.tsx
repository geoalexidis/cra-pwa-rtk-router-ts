import React from "react";
import logo from "./logo.svg";
import { Counter } from "./counter/components/Counter";
import "./App.css";
import Pokemon from "./pokemon/components/Pokemon";
import Blog from "./blog/components";
import Post from "./blog/components/Post";
import { NavLink, Routes, Route } from "react-router-dom";
import AlgoliaSearch from "./search/components/AlgoliaSearch";

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
        <Routes>
          <Route path="/" element={<h2>Home</h2>} />
          <Route path="counter" element={<Counter />} />
          <Route
            path="pokemon"
            element={
              <>
                <Pokemon name="bulbasaur" />
                <Pokemon name="ditto" options={{ pollingInterval: 5000 }} />
              </>
            }
          />
          <Route path="hn" element={<AlgoliaSearch />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<Post />} />
        </Routes>
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
