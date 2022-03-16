import React from "react";
import { useGetPostQuery } from "../services/blogAPI";
import { useParams } from "react-router-dom";

const Post: React.FC = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetPostQuery(Number(id) || 1);

  if (error) {
    return <div>Error!</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>
        {data.id} {data.title}
      </h1>
      <div>{data.body}</div>
    </>
  );
};

export default Post;
