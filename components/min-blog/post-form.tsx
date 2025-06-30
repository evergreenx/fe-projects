;

import { usePost } from "contexts/PostContext";
import type React from "react";
import { useState, useEffect } from "react";
import type { Post } from "types/post/post";
import MarkdownEditor from "./markdown-editor";
import { useNavigate } from "react-router";

interface PostFormProps {
  post?: Post;
  mode: "create" | "edit";
}

export default function PostForm({ post, mode }: PostFormProps) {
  const [title, setTitle] = useState(post?.title || "");
  const [body, setBody] = useState(post?.body || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createPost, updatePost } = usePost();
  const router = useNavigate();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    setIsSubmitting(true);
    try {
      if (mode === "create") {
        await createPost({
          title: title.trim(),
          body: body.trim(),
          userId: 1, // Default user ID
        });
      } else if (post) {
        await updatePost({
          id: post.id,
          title: title.trim(),
          body: body.trim(),
          userId: post.userId,
        });
      }
      router("/mini-blog");
    } catch (error) {
      console.error("Failed to save post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {mode === "create" ? "Create New Post" : "Edit Post"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter post title..."
            required
          />
        </div>

        <div>
          <label
            htmlFor="body"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Content
          </label>
          <MarkdownEditor
            value={body}
            onChange={setBody}
            placeholder="Write your post content... (Markdown supported)"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting || !title.trim() || !body.trim()}
            className="px-6 py-2 bg-black text-white rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? "Saving..."
              : mode === "create"
              ? "Create Post"
              : "Update Post"}
          </button>
          <button
            type="button"
            onClick={() => router("/mini-blog")}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
