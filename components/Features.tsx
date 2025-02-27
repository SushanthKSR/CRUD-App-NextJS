import { FileText, Edit, Trash2, Plus } from "lucide-react";

export default function Features() {
  return (
    <section id="features" className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-gray-500">
            CRUD Operations
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            CRUD application provides a complete set of Create, Read, Update,
            and Delete operations for managing your Posts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="card-body items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="card-title text-2xl mb-2 text-gray-500">Read</h3>
              <p className="text-base-content/70">
                View all your posts in a beautiful layout with easy navigation.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="card-body items-center text-center">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
                <Plus className="h-8 w-8 text-success" />
              </div>
              <h3 className="card-title text-2xl mb-2 text-gray-500">Create</h3>
              <p className="text-base-content/70">
                Add new posts with a user-friendly form that validates your
                input before submission.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="card-body items-center text-center">
              <div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center mb-4">
                <Edit className="h-8 w-8 text-warning" />
              </div>
              <h3 className="card-title text-2xl mb-2 text-gray-500">Update</h3>
              <p className="text-base-content/70">
                Modify existing posts with pre-filled forms that make editing
                quick and easy.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="card-body items-center text-center">
              <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center mb-4">
                <Trash2 className="h-8 w-8 text-error" />
              </div>
              <h3 className="card-title text-2xl mb-2 text-gray-500">Delete</h3>
              <p className="text-base-content/70">
                Remove posts with confirmation dialogs to prevent accidental
                deletions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
