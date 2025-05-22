"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

export default function AccountPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        email: session.user.email || "",
        image: session.user.image || "",
      });
    }
  }, [status, session, router]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: "error", text: "Image size should be less than 5MB" });
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      setMessage({ type: "error", text: "Please upload an image file" });
      return;
    }

    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const formData = new FormData();
      formData.append('file', file);

      console.log('Uploading image to Cloudinary...');
      const { data } = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!data.url) {
        throw new Error('No URL received from upload');
      }

      console.log('Image uploaded successfully:', data.url);
      setFormData(prev => ({ ...prev, image: data.url }));
      setMessage({ type: "success", text: "Image uploaded successfully!" });
    } catch (error) {
      console.error('Image upload error:', error);
      setMessage({ 
        type: "error", 
        text: error.response?.data?.error || "Failed to upload image. Please try again." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const dataToSend = {
        name: formData.name,
        email: formData.email,
        image: formData.image || "",
      };

      console.log("Submitting form data:", dataToSend);
      const { data: updatedUser } = await axios.put('/api/user/update', dataToSend);
      console.log("Server response:", updatedUser);

      await update({
        ...session,
        user: {
          ...session.user,
          ...dataToSend
        }
      });

      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (error) {
      console.error("Update error:", error);
      setMessage({ 
        type: "error", 
        text: error.response?.data?.error || "Failed to update profile" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Account Settings</h1>
            <p className="text-sm text-gray-600">Manage your personal information and preferences</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-blue-100">
                      <Image
                        src={formData.image || "/globe.svg"}
                        alt="Profile"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                        unoptimized={!formData.image}
                      />
                    </div>
                    <label
                      htmlFor="image-upload"
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <span className="text-white text-sm">Change</span>
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                      disabled={isLoading}
                    />
                  </div>
                  <h2 className="mt-3 text-base font-semibold text-gray-900">{formData.name}</h2>
                  <p className="text-sm text-gray-600">{formData.email}</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {message.text && (
                  <div
                    className={`mb-4 p-3 rounded-lg ${
                      message.type === "success"
                        ? "bg-green-50 text-green-800"
                        : "bg-red-50 text-red-800"
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, name: e.target.value }))
                        }
                        className="w-full px-3 py-2 text-black rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, email: e.target.value }))
                        }
                        className="w-full px-3 py-2 text-black rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 