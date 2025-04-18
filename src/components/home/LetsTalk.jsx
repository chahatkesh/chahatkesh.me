import { useState } from "react";
import { Mail, Github, Linkedin, Send, Globe } from "lucide-react";

export default function LetsTalkSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulating form submission with a timeout
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Let's Talk</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out.
            I'm always open to discussing new projects, creative ideas, or
            opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Get in Touch
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Tell me about your project, idea, or question..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full inline-flex items-center justify-center ${
                  isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                } text-white px-6 py-3 rounded-lg font-medium transition-colors`}>
                {isSubmitting ? (
                  <>Sending...</>
                ) : (
                  <>
                    Send Message
                    <Send size={16} className="ml-2" />
                  </>
                )}
              </button>

              {submitSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  Thank you for your message! I'll get back to you soon.
                </div>
              )}
            </form>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Contact Information
            </h3>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="p-2 bg-blue-50 rounded-md mr-4">
                    <Mail size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Email</h4>
                    <a
                      href="mailto:ckesharwani4@gmail.com"
                      className="text-gray-600 hover:text-blue-600 transition-colors">
                      ckesharwani4@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 bg-blue-50 rounded-md mr-4">
                    <Globe size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Website</h4>
                    <a
                      href="https://chahatkesh.me"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 transition-colors">
                      chahatkesh.me
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-medium text-gray-900 mb-4">
                  Connect with me
                </h4>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/chahatkesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                    <Github size={20} />
                  </a>
                  <a
                    href="https://linkedin.com/chahatkesharwani"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">Phone</h4>
                <p className="text-gray-600">+91 9170602005</p>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-medium text-gray-900 mb-4">
                I'm currently available for
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-gray-700">Full-time positions</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-gray-700">Freelance projects</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-gray-700">Technical consulting</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
