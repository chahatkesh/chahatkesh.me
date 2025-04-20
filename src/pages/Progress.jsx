import React, { useState } from "react";
import { Construction, Copy, CheckCircle } from "lucide-react";

const Hero = () => {
  const [copied, setCopied] = useState(false);
  const email = "chahat.create@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-black text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-75 z-0"></div>

      <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
        <Construction
          className="mx-auto mb-8 text-gray-500 animate-pulse"
          size={96}
          strokeWidth={1.25}
        />

        <h1 className="text-5xl font-extralight mb-6 tracking-tight text-gray-100">
          Portfolio In Progress
        </h1>

        <p className="text-xl text-gray-400 mb-12 max-w-xl mx-auto">
          Crafting a digital experience that pushes the boundaries of design and
          functionality.
        </p>

        <div className="bg-gray-800 bg-opacity-50 rounded-xl p-4 flex items-center justify-between max-w-md mx-auto backdrop-blur-md border border-gray-700">
          <div className="flex items-center space-x-3">
            <span className="text-gray-400">Email</span>
            <span className="font-semibold text-gray-100">{email}</span>
          </div>
          <button
            onClick={handleCopyEmail}
            className="text-gray-400 hover:text-white transition"
            aria-label="Copy email">
            {copied ? (
              <CheckCircle className="text-green-500" size={24} />
            ) : (
              <Copy size={24} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
