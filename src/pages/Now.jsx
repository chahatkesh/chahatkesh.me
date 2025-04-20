import React from "react";
import { Calendar, BookOpen, Code, Zap, Clock, Globe } from "lucide-react";
import LetsTalk from "../components/common/LetsTalk";
import {
  currentFocus,
  currentlyLearning,
  currentReads,
  locationAndTravel,
  upcomingEvents,
  introText,
} from "../data/nowData";

const Now = () => {
  // Get current date for the "Last Updated" section
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-white text-[#37352f] flex flex-col">
      <main className="flex-1">
        <section className="py-16 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-medium">Now</h1>
            <span className="text-sm text-gray-500 flex items-center">
              <Clock size={14} className="mr-1" /> Last updated: {currentDate}
            </span>
          </div>

          {/* What I'm focused on now - top section */}
          <div className="mb-10 p-6 bg-[#f7f6f3] rounded-lg border border-[#e6e6e6]">
            <p className="text-gray-700 italic">
              {introText.split("nownownow.com")[0]}
              <a
                href="https://nownownow.com/about"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800">
                nownownow.com
              </a>
              {introText.split("nownownow.com")[1]}
            </p>
          </div>

          {/* Current Focus Section */}
          <div className="mb-12 border-t border-[#f0f0f0] pt-10">
            <div className="flex items-center mb-6">
              <div className="p-2 rounded-md bg-[#e1f0ff] text-[#2382FC] mr-3">
                <Zap size={20} />
              </div>
              <h2 className="text-xl font-medium">Current Focus</h2>
            </div>
            <div className="space-y-4 ml-2">
              <p className="text-gray-700">{currentFocus.description}</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {currentFocus.goals.map((goal, index) => (
                  <li key={index}>{goal}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Currently Learning Section */}
          <div className="mb-12 border-t border-[#f0f0f0] pt-10">
            <div className="flex items-center mb-6">
              <div className="p-2 rounded-md bg-[#d4f9db] text-[#0e9d3a] mr-3">
                <Code size={20} />
              </div>
              <h2 className="text-xl font-medium">Currently Learning</h2>
            </div>
            <div className="space-y-6 ml-2">
              <div className="flex flex-wrap gap-3">
                {currentlyLearning.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-50 text-gray-800 text-sm rounded-md border border-gray-200 hover:bg-gray-100 transition-colors flex items-center">
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-gray-700">{currentlyLearning.focus}</p>
            </div>
          </div>

          {/* Current Reads Section */}
          <div className="mb-12 border-t border-[#f0f0f0] pt-10">
            <div className="flex items-center mb-6">
              <div className="p-2 rounded-md bg-[#fff3e1] text-[#ff8c38] mr-3">
                <BookOpen size={20} />
              </div>
              <h2 className="text-xl font-medium">Current Reads</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-2">
              {currentReads.map((book, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-all duration-200">
                  <h3 className="font-medium mb-1">{book.title}</h3>
                  <p className="text-sm text-gray-600">{book.author}</p>
                  <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`${book.progressColor} h-full rounded-full`}
                      style={{ width: `${book.progress}%` }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {book.progress}% complete
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Current Location & Travel */}
          <div className="mb-12 border-t border-[#f0f0f0] pt-10">
            <div className="flex items-center mb-6">
              <div className="p-2 rounded-md bg-[#f9e9fd] text-[#bf4ec5] mr-3">
                <Globe size={20} />
              </div>
              <h2 className="text-xl font-medium">Location & Travel</h2>
            </div>
            <div className="ml-2">
              <p className="text-gray-700 mb-3">
                Currently based in{" "}
                <span className="font-medium">
                  {locationAndTravel.currentLocation}
                </span>{" "}
                {locationAndTravel.context}.
              </p>
              <p className="text-gray-700">{locationAndTravel.plans}</p>
            </div>
          </div>

          {/* Upcoming Section */}
          <div className="mb-12 border-t border-[#f0f0f0] pt-10">
            <div className="flex items-center mb-6">
              <div className="p-2 rounded-md bg-[#e8e9ff] text-[#4851d5] mr-3">
                <Calendar size={20} />
              </div>
              <h2 className="text-xl font-medium">Upcoming</h2>
            </div>
            <div className="space-y-4 ml-2">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{event.name}</h3>
                    <p className="text-sm text-gray-600">{event.description}</p>
                  </div>
                  <span className="text-xs text-gray-500">{event.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Add LetsTalk component at bottom */}
          <div className="mt-12">
            <LetsTalk />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Now;
