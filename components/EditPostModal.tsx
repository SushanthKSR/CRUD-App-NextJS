"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { X } from "lucide-react";
import { PostSchema, PostInput } from "@/lib/schemas";
import { updatePost } from "@/lib/api";
import { Post } from "@/lib/types";

interface EditPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post;
  onPostUpdated: () => void;
}

export default function EditPostModal({
  isOpen,
  onClose,
  post,
  onPostUpdated,
}: EditPostModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PostInput>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: post.title,
      body: post.body,
    },
  });

  const onSubmit = async (data: PostInput) => {
    try {
      await updatePost(post.id, data);
      toast.success("Post updated successfully!");
      onPostUpdated();
    } catch (error) {
      toast.error("Failed to update post. Please try again.");
      console.error("Error updating post:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="modal-box w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Edit Post</h3>
          <button className="btn btn-sm btn-circle" onClick={onClose}>
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              className={`input input-bordered w-full ${
                errors.title ? "input-error" : ""
              }`}
              {...register("title")}
            />
            {errors.title && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.title.message}
                </span>
              </label>
            )}
          </div>

          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text">Content</span>
            </label>
            <textarea
              className={`textarea textarea-bordered h-24 ${
                errors.body ? "textarea-error" : ""
              }`}
              {...register("body")}
            ></textarea>
            {errors.body && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.body.message}
                </span>
              </label>
            )}
          </div>

          <div className="modal-action">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Updating...
                </>
              ) : (
                "Update Post"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
