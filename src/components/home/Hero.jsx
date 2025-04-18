import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="w-[100vw] h-[100vh] flex items-center justify-center">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            I am Chahat Kesharwani
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 md:w-4/5 leading-relaxed">
            Bringing digital products to life with pixels and code.
          </p>
        </div>
      </div>
    </section>
  );
}
