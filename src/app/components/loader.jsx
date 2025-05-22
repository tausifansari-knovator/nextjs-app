"use client";
import React from "react";

const FancyLoader = () => {
  return (
    <>
      <style>
        {`
          .fancy-loader {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .svg-wrapper {
            position: relative;
            width: 80px;
            height: 80px;
          }

          .svg-wrapper svg {
            width: 100%;
            height: 100%;
            animation: spinAndPulse 2s ease-in-out infinite;
            transform-origin: center;
          }

          .center-text {
            margin-left: 20%;
            font-size: 10px;
            font-weight: bold;
            color: #3498db; 
            pointer-events: none;
          }

          .animated-path {
            stroke: #3498db;
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
            animation: colorShift 2s ease-in-out infinite;
          }

          @keyframes spinAndPulse {
            0% {
              transform: rotate(0deg) scale(1);
            }
            50% {
              transform: rotate(180deg) scale(1.05);
            }
            100% {
              transform: rotate(360deg) scale(1);
            }
          }

          @keyframes colorShift {
            0% {
              stroke: #3498db;
            }
            50% {
              stroke: #9b59b6;
            }
            100% {
              stroke: #3498db;
            }
          }
        `}
      </style>

      <div className="fancy-loader">
        <div className="svg-wrapper">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 6H18V18H6V6Z" className="animated-path" />
            <path d="M9 3V6" className="animated-path" />
            <path d="M15 3V6" className="animated-path" />
            <path d="M9 18V21" className="animated-path" />
            <path d="M15 18V21" className="animated-path" />
            <path d="M21 9H18" className="animated-path" />
            <path d="M21 15H18" className="animated-path" />
            <path d="M6 9H3" className="animated-path" />
            <path d="M6 15H3" className="animated-path" />
          </svg>
          <span className="center-text">LOADING</span>
        </div>
      </div>
    </>
  );
};

export default FancyLoader;
