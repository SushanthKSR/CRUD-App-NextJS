import { Post } from './types';
import { PostInput } from './schemas';

const API_URL = 'https://jsonplaceholder.typicode.com';

export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch(`${API_URL}/posts`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  return response.json();
}

export async function fetchPost(id: number): Promise<Post> {
  const response = await fetch(`${API_URL}/posts/${id}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch post with id ${id}`);
  }
  
  return response.json();
}

export async function createPost(data: PostInput): Promise<Post> {
  const response = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      userId: 1, // Using a fixed userId for simplicity
    }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create post');
  }
  
  return response.json();
}

export async function updatePost(id: number, data: PostInput): Promise<Post> {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      id,
      userId: 1, // Using a fixed userId for simplicity
    }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to update post with id ${id}`);
  }
  
  return response.json();
}

export async function deletePost(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error(`Failed to delete post with id ${id}`);
  }
}