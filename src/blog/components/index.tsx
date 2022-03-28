import React from "react";
import { Link } from "react-router-dom";
import { useGetPostsQuery } from "../services/blogApi";

const Blog: React.FC = () => {
  const { data: posts = [], error, isLoading } = useGetPostsQuery(null);

  if (error) {
    return <div>Error!</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ol type="I">
      {posts.map(post => (
        <Link key={post.id} to={`/blog/${post.id}`}>
          <li>{post.title}</li>
        </Link>
      ))}
    </ol>
  );
};

export default Blog;
