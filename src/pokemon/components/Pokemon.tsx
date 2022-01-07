import React from "react";
import "../../App.css";
import { useGetPokemonByNameQuery } from "../services/pokemonAPI";

function Pokemon({ name, options = {} }) {
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } = useGetPokemonByNameQuery(name, options);
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

  return (
    <>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>{data.species.name || ""}</h3>
          <img src={data.sprites.front_shiny || ""} alt={data.species.name || ""} />
        </>
      ) : null}
    </>
  );
}

export default Pokemon;
