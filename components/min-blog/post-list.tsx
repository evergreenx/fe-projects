import { usePost } from "contexts/PostContext"
import { Link } from "react-router"





export default function PostList() {
  const { posts, loading, error, deletePost } = usePost()

  const handleDelete = async (id: number, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deletePost(id)
      } catch (error) {
        console.error("Failed to delete post:", error)
      }
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-black text-white rounded-md "
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <article
          key={post.id}
          className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold text-gray-900 flex-1 mr-4">{post.title}</h2>
            <div className="flex gap-2 flex-shrink-0">
              <Link
                to={`/mini-blog/edit/${post.id}`}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(post.id, post.title)}
                className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed">
            {post.body.length > 200 ? `${post.body.substring(0, 200)}...` : post.body}
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Post ID: {post.id} • User ID: {post.userId}
          </div>
        </article>
      ))}

      {posts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">No posts found</div>
          <Link to="/new" className="px-4 py-2 bg-black text-white rounded-md ">
            Create your first post
          </Link>
        </div>
      )}
    </div>
  )
}
