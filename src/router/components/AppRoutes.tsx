import { Route, Routes } from "react-router-dom";
import { Counter } from "../../counter/components/Counter";
import Pokemon from "../../pokemon/components/Pokemon";
import AlgoliaSearch from "../../search/components/AlgoliaSearch";
import Blog from "../../blog/components";
import Post from "../../blog/components/Post";
import React from "react";

function AppRoutes() {
  return (
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
  );
}

export default AppRoutes;
