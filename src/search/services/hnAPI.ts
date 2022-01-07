// Need to use the React-specific entry point to import createApi
import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import { searchHN } from "./clientHN";
import { RequestOptions } from "@algolia/transporter";
import { SearchOptions } from "@algolia/client-search";

const algoliaBaseQuery =
  (): BaseQueryFn<{ query: string; options?: RequestOptions & SearchOptions }> =>
  async ({ query, options }) => {
    try {
      const result = await searchHN(query, options);
      return { data: result };
    } catch (error) {
      return { error };
    }
  };

// Define a service using a base URL and expected endpoints
export const hnApi = createApi({
  reducerPath: "hnApi",
  baseQuery: algoliaBaseQuery(),
  endpoints: builder => ({
    getHackerNews: builder.query({
      query: query => ({ query, options: { hitsPerPage: 10 } }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const useGetHackerNewsQuery = hnApi.useGetHackerNewsQuery;
