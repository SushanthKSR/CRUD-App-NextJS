"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { X } from "lucide-react";
import { PostSchema, PostInput } from "@/lib/schemas";
import { createPost } from "@/lib/api";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated: () => void;
}

export default function CreatePostModal({
  isOpen,
  onClose,
  onPostCreated,
}: CreatePostModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PostInput>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  const onSubmit = async (data: PostInput) => {
    try {
      await createPost(data);
      toast.success("Post created successfully!");
      reset();
      onPostCreated();
    } catch (error) {
      toast.error("Failed to create post. Please try again.");
      console.error("Error creating post:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="modal-box w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Create New Post</h3>
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
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                reset();
                onClose();
              }}
            >
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
                  Creating...
                </>
              ) : (
                "Create Post"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
