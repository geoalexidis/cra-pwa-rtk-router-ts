import React, { useEffect, useMemo, useState } from "react";
import { searchHn } from "../services/clientHn";
import { useGetHackerNewsQuery } from "../services/hnApi";
import { StringParam, useQueryParam } from "use-query-params";

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

const defaultQ = "react";

function AlgoliaSearch() {
  const [result, setResult] = useState({ hits: [] });
  const [q, setQ] = useQueryParam("q", StringParam);
  // search and setSearch was used in a previous example before useQueryParam was added
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [search, setSearch] = useState(defaultQ);
  const { data, error, isLoading } = useGetHackerNewsQuery(q ?? defaultQ);

  useEffect(
    function initDefaultQ() {
      if (q) return;
      // workaround since setQ directly fails with router. possible due workaround in RouteAdapter.tsx
      // setQ(defaultQ);
      setTimeout(() => setQ(defaultQ), 0);
    },
    [setQ, q],
  );

  useEffect(
    function handleWithoutRTK() {
      async function fetchData(): Promise<undefined> {
        if (!q) return;
        const result = await searchHn(q, { hitsPerPage: 10 });
        setResult(result);
      }

      fetchData().then();
    },
    [q],
  );

  const setSearchDebounced = useMemo(() => debounce(setSearch, 350), []);
  const setQDebounced = useMemo(() => debounce(setQ, 350), [setQ]);

  return (
    <>
      <label htmlFor="search">Search HN: </label>
      <input
        type="text"
        id="search"
        name="name"
        defaultValue={q ?? defaultQ}
        onChange={e => {
          setSearchDebounced(e.target.value);
          setQDebounced(e.target.value);
        }}
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
