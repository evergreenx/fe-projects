import type { Post, CreatePostData, UpdatePostData } from "types/post/post"


const API_BASE = "https://jsonplaceholder.typicode.com"

export const api = {
  async getPosts(): Promise<Post[]> {
    const response = await fetch(`${API_BASE}/posts`)
    if (!response.ok) throw new Error("Failed to fetch posts")
    return response.json()
  },

  async getPost(id: number): Promise<Post> {
    const response = await fetch(`${API_BASE}/posts/${id}`)
    if (!response.ok) throw new Error("Failed to fetch post")
    return response.json()
  },

  async createPost(data: CreatePostData): Promise<Post> {
    const response = await fetch(`${API_BASE}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to create post")
    return response.json()
  },

  async updatePost(data: UpdatePostData): Promise<Post> {
    const response = await fetch(`${API_BASE}/posts/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to update post")
    return response.json()
  },

  async deletePost(id: number): Promise<void> {
    const response = await fetch(`${API_BASE}/posts/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete post")
  },
}
