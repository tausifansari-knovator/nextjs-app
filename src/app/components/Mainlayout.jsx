"use client";

import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow min-h-[calc(100vh-10rem-2.85rem)] bg-gray-50">
        {children}
      </main>
      <Footer />
    </div>
  );
} 