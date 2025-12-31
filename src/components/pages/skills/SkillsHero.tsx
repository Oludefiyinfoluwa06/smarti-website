import { ArrowRight, Lightbulb } from "lucide-react";
import Link from "next/link";

export const SkillsHero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20" style={{background: 'linear-gradient(135deg, #241153, #1a0d3f)'}}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full font-medium bg-white/10 text-white border border-white/20">
            <Lightbulb className="w-4 h-4" />
            <span>Master In-Demand Skills</span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
            Learn Skills That
            <span className="block text-yellow-300">Transform Your Future</span>
          </h1>

          <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            Enroll in our expertly-designed skill courses taught by industry professionals.
            Unlock your potential and gain certifications recognized by employers worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="#available-skills" className="group text-[#241153] bg-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
              <span>Explore Skills</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
