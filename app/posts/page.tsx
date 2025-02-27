"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import PostCard from "@/components/PostCard";
import CreatePostModal from "@/components/CreatePostModal";
import { Post } from "@/lib/types";
import { fetchPosts } from "@/lib/api";
import { useTheme } from "next-themes";

export default function PostsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const {
    data: posts,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] mt-16">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] mt-16">
        <div className="alert alert-error max-w-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error loading posts. Please try again later.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Posts</h1>
        <button
          className="btn btn-primary shadow-md hover:shadow-lg transition-all duration-300"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Post
        </button>
      </div>

      {/* Search and filter (placeholder for future enhancement) */}
      <div
        className={`mb-8 p-4 rounded-lg ${
          isDark ? "bg-base-200" : "bg-base-100 shadow-md"
        }`}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="form-control flex-1">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search posts..."
                className="input input-bordered w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {posts?.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">📝</div>
          <h3 className="text-2xl font-bold mb-2">No posts found</h3>
          <p className="text-base-content/70 mb-6">
            Get started by creating your first post
          </p>
          <button
            className="btn btn-primary"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Post
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.map((post: Post) => (
            <PostCard
              key={post.id}
              post={post}
              onPostUpdated={() => refetch()}
            />
          ))}
        </div>
      )}

      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onPostCreated={() => {
          refetch();
          setIsCreateModalOpen(false);
        }}
      />
    </div>
  );
}
