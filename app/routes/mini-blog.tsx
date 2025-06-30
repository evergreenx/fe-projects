import PostList from "components/min-blog/post-list";
import { Link } from "react-router";

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto p-3">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Mini Blog</h1>
        <Link
          to="/mini-blog/new"
          className="px-6 py-3 bg-black text-white rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Create New Post
        </Link>
      </div>

      <PostList />
    </div>
  );
}
