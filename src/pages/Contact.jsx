import React from "react";
import { Mail, Clock } from "lucide-react";
import { FaSquareXTwitter, FaLinkedin, FaSquareGithub } from "react-icons/fa6";
import LetsTalk from "../components/common/LetsTalk";

// FAQ Data
const faqData = [
  {
    question: "What types of projects do you work on?",
    answer:
      "I specialize in full-stack web development, UI/UX design, and AI-integrated applications that solve real-world problems.",
  },
  {
    question: "Are you available for freelance work?",
    answer:
      "Yes! I'm currently accepting select freelance projects. Reach out with your project details and timeline to discuss possibilities.",
  },
  {
    question: "What's your preferred collaboration method?",
    answer:
      "I adapt to your team's workflow, comfortable with GitHub, Figma, Slack, and Zoom.",
  },
  {
    question: "What is your approach to project deadlines?",
    answer:
      "I prioritize transparent communication, realistic timelines, and proactive updates to ensure quality work delivered on schedule.",
  },
  {
    question: "Do you offer technical consulting services?",
    answer:
      "Yes, I provide consulting on technology stack selection, code reviews, and architectural decisions for startups and established businesses.",
  },
  {
    question: "How do you handle project revisions and feedback?",
    answer:
      "I build regular check-in points throughout projects and include a set number of revision rounds in agreements to deliver exactly what you need.",
  },
];

const Contact = () => {
  return (
    <div className="min-h-screen bg-white text-[#37352f] flex flex-col">
      <main className="flex-1">
        <section className="py-16 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
          <h1 className="text-3xl font-medium mb-8">Contact Me</h1>

          {/* Contact Info Section - Notion Style */}
          <div className="mb-12 p-6 bg-[#f7f6f3] rounded-lg border border-[#e6e6e6]">
            <h2 className="text-xl font-medium mb-4 text-gray-800">
              Let's Connect
            </h2>
            <p className="text-gray-600 mb-6">
              I'm always interested in hearing about new projects and
              opportunities. Whether you have a question or just want to say hi,
              I'll try my best to get back to you!
            </p>

            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="flex items-start">
                <Mail className="text-gray-500 mr-3 mt-1" size={18} />
                <div>
                  <h3 className="font-medium text-gray-800">Email</h3>
                  <a
                    href="mailto:ckesharwani4@gmail.com"
                    className="text-gray-700 hover:underline">
                    ckesharwani4@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="text-gray-500 mr-3 mt-1" size={18} />
                <div>
                  <h3 className="font-medium text-gray-800">Response Time</h3>
                  <p className="text-gray-600">Usually within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#e6e6e6]">
              <div className="flex items-center space-x-4">
                <a
                  href="https://github.com/chahatkesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800/70 hover:text-gray-800 transition-colors">
                  <FaSquareGithub size={20} />
                </a>
                <a
                  href="https://linkedin.com/in/chahatkesharwani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800/70 hover:text-gray-800 transition-colors">
                  <FaLinkedin size={20} />
                </a>
                <a
                  href="https://x.com/chahatkesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800/70 hover:text-gray-800 transition-colors">
                  <FaSquareXTwitter size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* FAQ Section - using data array */}
          <div className="bg-white p-6 mb-12">
            <h2 className="text-2xl font-medium mb-8">
              Frequently Asked Questions
            </h2>

            <div className="space-y-8">
              {faqData.map((faq, index) => (
                <div key={index}>
                  <h3 className="font-medium text-lg text-gray-800 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Use the existing LetsTalk component */}
          <LetsTalk />
        </section>
      </main>
    </div>
  );
};

export default Contact;
