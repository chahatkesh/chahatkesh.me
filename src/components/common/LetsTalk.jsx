import React from "react";
import { Mail, Github, Linkedin, Twitter, MessageCircle } from "lucide-react";

const LetsTalk = () => {
  return (
    <div className="px-6 py-5 bg-white border border-[#e6e6e6] rounded-lg hover:border-[#d0d0d0] transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <MessageCircle size={18} className="text-gray-600" /> Let's Talk
        </h2>

        <div className="flex gap-4">
          <a
            href="https://github.com/chahatkesh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-800 p-1.5 hover:bg-gray-100 rounded-md transition-all">
            <Github size={18} strokeWidth={2} />
          </a>
          <a
            href="https://linkedin.com/in/chahatkesharwani"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-800 p-1.5 hover:bg-gray-100 rounded-md transition-all">
            <Linkedin size={18} strokeWidth={2} />
          </a>
          <a
            href="https://x.com/chahatkesh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-800 p-1.5 hover:bg-gray-100 rounded-md transition-all">
            <Twitter size={18} strokeWidth={2} />
          </a>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Have a project in mind or want to chat? I'm always open to new
        opportunities and collaborations.
      </p>

      <a
        href="mailto:ckesharwani4@gmail.com"
        className="inline-flex items-center bg-[#f7f7f7] px-4 py-2 rounded-md text-gray-700 hover:text-gray-900 transition-all text-sm border border-[#e6e6e6]">
        <Mail size={14} className="mr-2" />
        ckesharwani4@gmail.com
      </a>
    </div>
  );
};

export default LetsTalk;
