"use client";

import PostForm from "components/min-blog/post-form";
import { usePost } from "contexts/PostContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import type { Post } from "types/post/post";

export default function EditPostPage() {
  const params = useParams();
  const router = useNavigate();
  const { getPost, posts } = usePost();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  console.log(params, "params");
  useEffect(() => {
    const id = Number.parseInt(params.postId as string);
    if (isNaN(id)) {
      router("/mini-blog");
      return;
    }

    // Try to get post from context first
    const existingPost = getPost(id);
    if (existingPost) {
      setPost(existingPost);
      setLoading(false);
    } else if (posts.length > 0) {
      // Posts are loaded but post not found
      router("/mini-blog");
    }
    // If posts are still loading, wait for them
  }, [params.id, getPost, posts, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-4">Post not found</div>
        <button
          onClick={() => router("/mini-blog")}
          className="px-4 py-2 bg-black text-white rounded-md "
        >
          Back to Posts
        </button>
      </div>
    );
  }

  return <PostForm post={post} mode="edit" />;
}
