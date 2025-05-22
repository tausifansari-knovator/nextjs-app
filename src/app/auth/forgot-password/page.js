"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FancyLoader from "@/app/components/loader";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setMessage("Password reset email sent. Please check your inbox.");
      setEmail("");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-800">Reset Password</h2>
          <p className="text-gray-500">Enter your email to receive reset instructions</p>
        </div>

        {message && (
          <div className="p-4 text-sm text-green-600 bg-green-50 border-l-4 border-green-500 rounded">
            {message}
          </div>
        )}

        {error && (
          <div className="p-4 text-sm text-red-600 bg-red-50 border-l-4 border-red-500 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center font-medium"
          >
            {isLoading ? <FancyLoader /> : 'Send Reset Link'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Remember your password?{' '}
          <a href="/auth/login" className="text-indigo-600 hover:text-indigo-500 font-medium">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
  