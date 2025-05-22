"use client";
import React from "react";

const About = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Main Content */}
      <main className="py-16.5 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center grid grid-cols-1 gap-16 p-9">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Us</h2>
          <p className="text-lg text-gray-600 mb-8">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                Our Mission
              </h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                nec odio. Praesent libero. Sed cursus ante dapibus diam.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                Our Vision
              </h3>
              <p className="text-gray-600">
                Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis
                sagittis ipsum. Praesent mauris. Fusce nec tellus sed.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                Our Values
              </h3>
              <ul className="list-disc list-inside text-gray-600 text-left">
                <li>Lorem ipsum dolor</li>
                <li>Consectetur adipiscing</li>
                <li>Sed do eiusmod</li>
                <li>Tempor incididunt</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
