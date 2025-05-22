"use client";
import React, { useState } from "react";
import { useBlogs } from "@/lib/useBlogs";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FancyLoader from "../components/loader";

const Blog = () => {
  const { blogs, loading, createBlogs, deleteBlogs, updateBlogs } = useBlogs();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    link: "",
  });
  const [editingBlog, setEditingBlog] = useState(null);

  const handleCreate = () => {
    setEditingBlog(null);
    setFormData({ title: "", content: "", link: "" });
    setIsModalOpen(true);
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({ title: blog.title, content: blog.content, link: blog.link });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBlog) {
        await updateBlogs(editingBlog._id, formData);
        toast.success("Blog post updated successfully!");
      } else {
        await createBlogs(formData);
        toast.success("Blog post created successfully!");
      }
      setIsModalOpen(false);
      setFormData({ title: "", content: "", link: "" });
    } catch (error) {
      console.error("Error submitting blog:", error);
      toast.error("Failed to save blog post");
    }
  };

  const handleDelete = async (id) => {
    console.log(id);

    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        const res = await deleteBlogs(id);
        console.log(res);
        toast.success("Blog post deleted successfully!");
      } catch (error) {
        console.error("Error deleting blog:", error);
        toast.error("Failed to delete blog post");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white text-gray-800">
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Main Content */}
      <main className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center ">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">
            Latest Blog Posts
          </h2>
          <button
            onClick={handleCreate}
            className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            + New Blog
          </button>

          {loading && (
            <div className="flex justify-center ">
              <div className=" h-16 w-16 border-indigo-600">
                <FancyLoader />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white p-6 rounded-lg shadow text-left border border-[#202468] "
              >
                <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
                  {blog.title}
                </h2>
                <p className="mb-4 text-[211f9c] ">{blog.content}</p>
                <a href={blog.link} className="text-indigo-500 hover:underline">
                  Read more
                </a>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="relative overflow-hidden px-5 py-2 bg-blue-700 text-white font-semibold rounded transition-all duration-300"
                  >
                    Edit
                    <span className="shine"></span>
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="px-5 py-2 bg-red-600 text-white relative overflow-hidden font-semibold rounded transition-all duration-300 "
                  >
                    <span className="shine"></span>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modal for Create/Edit Blog */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsModalOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-lg bg-white p-8 shadow-lg border-2 border-[#202468]  ">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl font-bold"
                  >
                    ×
                  </button>
                  <Dialog.Title
                    as="h2"
                    className="text-2xl font-bold text-gray-900 mb-6"
                  >
                    {editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
                  </Dialog.Title>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label
                        htmlFor="title"
                        className="block font-arial text-lg text-gray-800 font-medium px-1"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="content"
                        className="block text-lg text-gray-800 font-medium px-1"
                      >
                        Content
                      </label>
                      <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 text-black  rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        rows="4"
                        required
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="link"
                        className="block text-lg text-gray-800 font-medium px-1"
                      >
                        Link
                      </label>
                      <input
                        type="url"
                        id="link"
                        name="link"
                        value={formData.link}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 text-black  rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        disabled={loading}
                      >
                        {loading
                          ? "Submitting..."
                          : editingBlog
                          ? "Update"
                          : "Create"}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Blog;
