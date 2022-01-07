import React, { useEffect, useMemo, useState } from "react";
import { searchHN } from "../services/clientHN";
import { useGetHackerNewsQuery } from "../services/hnAPI";

const debounce = (func, delay: number) => {
  let timer;
  return function (...args) {
    // @ts-ignore
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, delay);
  };
};

function AlgoliaSearch() {
  const [result, setResult] = useState({ hits: [] });
  const [search, setSearch] = useState("react");
  const { data, error, isLoading } = useGetHackerNewsQuery(search);

  useEffect(() => {
    const fetchData = async () => {
      const result = await searchHN(search, { hitsPerPage: 10 });
      setResult(result);
    };
    fetchData().then();
  }, [search]);

  const setSearchDebounced = useMemo(() => debounce(setSearch, 350), []);

  return (
    <>
      <label htmlFor="search">Search HN: </label>
      <input
        type="text"
        id="search"
        name="name"
        onChange={e => setSearchDebounced(e.target.value)}
        style={{ fontSize: "1.5rem" }}
      />
      <div style={{ margin: 8 }}>
        <strong>Example with RTK-Query</strong>
      </div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error!</div>}
      {data && data.hits && (
        <>
          {data.hits.map((hit, i) => (
            <a key={i} href={hit["url"]} rel="noopener noreferrer" target="_blank">
              {hit["title"]}
            </a>
          ))}
        </>
      )}

      <div style={{ margin: 8 }}>
        <strong>Example without RTK-Query</strong>
      </div>
      {result.hits.map((hit, i) => (
        <a key={i} href={hit["url"]} rel="noopener noreferrer" target="_blank">
          {hit["title"]}
        </a>
      ))}
    </>
  );
}

export default AlgoliaSearch;
