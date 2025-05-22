"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const profileImage = session?.user?.image || "/globe.svg";

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 sticky top-0 z-50 shadow-lg w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand/Logo - Always visible */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <span className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
                TA Group
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          {session && (
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-700 text-lg font-semibold hover:text-indigo-600 hover:scale-105 transition-all duration-200"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-700 text-lg font-semibold hover:text-indigo-600 hover:scale-105 transition-all duration-200"
              >
                About
              </Link>
              <Link
                href="/blog"
                className="text-gray-700 text-lg font-semibold hover:text-indigo-600 hover:scale-105 transition-all duration-200"
              >
                Blog
              </Link>
            </nav>
          )}

          {/* Desktop Search - Hidden on mobile */}
          {session && (
            <div className="hidden md:flex flex-1 max-w-sm mx-8">
              <div className="relative w-full text-gray-600">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full border border-gray-200 rounded-full pl-10 pr-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all duration-200 hover:shadow-md focus:bg-white"
                />
                <svg
                  className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M16.65 9a7.65 7.65 0 11-15.3 0 7.65 7.65 0 0115.3 0z"
                  />
                </svg>
              </div>
            </div>
          )}

          {/* Right side - Avatar or Auth + Mobile menu toggle */}
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                {/* User Avatar Dropdown */}
                <div ref={dropdownRef} className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 hover:text-indigo-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-full p-1"
                  >
                    <Image
                      src={profileImage}
                      alt="Profile"
                      width={36}
                      height={36}
                      className="rounded-full border-2 border-indigo-200 hover:border-indigo-400 transition-all duration-200"
                    />
                    <span className="hidden sm:block text-gray-700 text-sm font-semibold hover:text-indigo-600 transition-all duration-200 max-w-32 truncate">
                      {session.user?.name || "User"}
                    </span>
                    <svg
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {session.user?.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {session.user?.email || ""}
                        </p>
                      </div>
                      <Link
                        href="/account"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-all duration-150"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Manage Account
                      </Link>
                      <button
                        onClick={() => signOut({ callbackUrl: "/home" })}
                        className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 font-medium transition-all duration-150"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>

                {/* Mobile Menu Toggle - Only show when logged in */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  aria-label="Toggle mobile menu"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {isMobileMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              </>
            ) : (
              /* Auth buttons for non-logged in users */
              <div className="flex items-center space-x-3">
                <Link
                  href="/auth/login"
                  className="text-gray-700 text-sm sm:text-base font-semibold hover:text-indigo-600 hover:scale-105 transition-all duration-200 whitespace-nowrap"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 sm:px-5 py-2 rounded-full hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg transition-all duration-200 font-semibold text-sm sm:text-base whitespace-nowrap"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu - Only show when logged in */}
        {session && isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="px-4 py-4 space-y-1">
              {/* Mobile Search */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full border border-gray-200 rounded-full pl-10 pr-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all duration-200 hover:shadow-md focus:bg-white"
                />
                <svg
                  className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M16.65 9a7.65 7.65 0 11-15.3 0 7.65 7.65 0 0115.3 0z"
                  />
                </svg>
              </div>

              {/* Mobile Navigation Links */}
              <Link
                href="/"
                className="block px-3 py-3 text-gray-700 text-base font-semibold hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block px-3 py-3 text-gray-700 text-base font-semibold hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/blog"
                className="block px-3 py-3 text-gray-700 text-base font-semibold hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              
              
            </div>
          </div>
        )}
      </div>
    </header>
  );
};  