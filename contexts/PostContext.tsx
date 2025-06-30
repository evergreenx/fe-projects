

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import type { Post, CreatePostData, UpdatePostData } from "types/post/post"
import { api } from "utils/api"


interface PostState {
  posts: Post[]
  loading: boolean
  error: string | null
}

type PostAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_POSTS"; payload: Post[] }
  | { type: "ADD_POST"; payload: Post }
  | { type: "UPDATE_POST"; payload: Post }
  | { type: "DELETE_POST"; payload: number }
  | { type: "OPTIMISTIC_ADD"; payload: Post }
  | { type: "OPTIMISTIC_UPDATE"; payload: Post }
  | { type: "OPTIMISTIC_DELETE"; payload: number }

interface PostContextType extends PostState {
  fetchPosts: () => Promise<void>
  createPost: (data: CreatePostData) => Promise<void>
  updatePost: (data: UpdatePostData) => Promise<void>
  deletePost: (id: number) => Promise<void>
  getPost: (id: number) => Post | undefined
}

const PostContext = createContext<PostContextType | undefined>(undefined)

const postReducer = (state: PostState, action: PostAction): PostState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false }
    case "SET_POSTS":
      return { ...state, posts: action.payload, loading: false, error: null }
    case "ADD_POST":
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
        error: null,
      }
    case "UPDATE_POST":
      return {
        ...state,
        posts: state.posts.map((post) => (post.id === action.payload.id ? action.payload : post)),
        loading: false,
        error: null,
      }
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
        loading: false,
        error: null,
      }
    case "OPTIMISTIC_ADD":
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      }
    case "OPTIMISTIC_UPDATE":
      return {
        ...state,
        posts: state.posts.map((post) => (post.id === action.payload.id ? action.payload : post)),
      }
    case "OPTIMISTIC_DELETE":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      }
    default:
      return state
  }
}

export function PostProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(postReducer, {
    posts: [],
    loading: false,
    error: null,
  })

  const fetchPosts = async () => {
    dispatch({ type: "SET_LOADING", payload: true })
    try {
      const posts = await api.getPosts()
      dispatch({ type: "SET_POSTS", payload: posts })
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to fetch posts" })
    }
  }

  const createPost = async (data: CreatePostData) => {
    // Optimistic update
    const optimisticPost: Post = {
      id: Date.now(), // Temporary ID
      ...data,
    }
    dispatch({ type: "OPTIMISTIC_ADD", payload: optimisticPost })

    try {
      const newPost = await api.createPost(data)
      // Replace optimistic post with real post
      dispatch({ type: "UPDATE_POST", payload: { ...newPost, id: newPost.id || optimisticPost.id } })
    } catch (error) {
      // Revert optimistic update
      dispatch({ type: "DELETE_POST", payload: optimisticPost.id })
      dispatch({ type: "SET_ERROR", payload: "Failed to create post" })
      throw error
    }
  }

  const updatePost = async (data: UpdatePostData) => {
    // Optimistic update
    dispatch({ type: "OPTIMISTIC_UPDATE", payload: data })

    try {
      const updatedPost = await api.updatePost(data)
      dispatch({ type: "UPDATE_POST", payload: updatedPost })
    } catch (error) {
      // Revert would require storing previous state - for simplicity, refetch
      await fetchPosts()
      dispatch({ type: "SET_ERROR", payload: "Failed to update post" })
      throw error
    }
  }

  const deletePost = async (id: number) => {
    // Optimistic update
    dispatch({ type: "OPTIMISTIC_DELETE", payload: id })

    try {
      await api.deletePost(id)
      dispatch({ type: "DELETE_POST", payload: id })
    } catch (error) {
      // Revert would require storing previous state - for simplicity, refetch
      await fetchPosts()
      dispatch({ type: "SET_ERROR", payload: "Failed to delete post" })
      throw error
    }
  }

  const getPost = (id: number) => {
    return state.posts.find((post) => post.id === id)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <PostContext.Provider
      value={{
        ...state,
        fetchPosts,
        createPost,
        updatePost,
        deletePost,
        getPost,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export function usePost() {
  const context = useContext(PostContext)
  if (context === undefined) {
    throw new Error("usePost must be used within a PostProvider")
  }
  return context
}
