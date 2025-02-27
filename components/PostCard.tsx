'use client';

import { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Post } from '@/lib/types';
import { deletePost } from '@/lib/api';
import EditPostModal from './EditPostModal';
import { useTheme } from 'next-themes';

interface PostCardProps {
  post: Post;
  onPostUpdated: () => void;
}

export default function PostCard({ post, onPostUpdated }: PostCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setIsDeleting(true);
      try {
        await deletePost(post.id);
        toast.success('Post deleted successfully!');
        onPostUpdated();
      } catch (error) {
        toast.error('Failed to delete post. Please try again.');
        console.error('Error deleting post:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className={`card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
      isDark ? 'border border-base-300' : ''
    }`}>
      <div className="card-body">
        <h2 className="card-title text-xl font-bold line-clamp-2">{post.title}</h2>
        <p className="text-base-content/70 line-clamp-3 mb-4">{post.body}</p>
        <div className="card-actions justify-end">
          <button 
            className="btn btn-outline btn-warning"
            onClick={() => setIsEditModalOpen(true)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </button>
          <button 
            className="btn btn-outline btn-error"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </>
            )}
          </button>
        </div>
      </div>

      <EditPostModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        post={post}
        onPostUpdated={() => {
          onPostUpdated();
          setIsEditModalOpen(false);
        }}
      />
    </div>
  );
}