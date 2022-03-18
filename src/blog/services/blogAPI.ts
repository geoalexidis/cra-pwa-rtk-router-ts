import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { gql } from "graphql-request";

export const blogApi = createApi({
  reducerPath: "blog",
  baseQuery: graphqlRequestBaseQuery({
    url: "https://graphqlzero.almansi.me/api",
  }),
  endpoints: builder => ({
    getPosts: builder.query<any[], any>({
      query: () => ({
        document: gql`
          query GetPosts {
            posts {
              data {
                id
                title
              }
            }
          }
        `,
      }),
      transformResponse: (response: { posts: { data: any[] } }) => response.posts.data,
    }),
    getPost: builder.query<any, number>({
      query: (id = 0) => ({
        document: gql`
          query GetPost($id: ID!) {
            post(id: $id) {
              id
              title
              body
            }
          }
        `,
        variables: {
          id,
        },
      }),
      transformResponse: (response: any) => response.post,
    }),
  }),
});

export const { useGetPostsQuery, useGetPostQuery } = blogApi;
