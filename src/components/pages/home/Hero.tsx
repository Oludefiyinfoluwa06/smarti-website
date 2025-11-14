import { ArrowRight, RotateCcw, Sparkles, Target, Truck } from "lucide-react";
import { HeroNewsletterSignup } from "./HeroNewsletterSignup";
import Image from "next/image";
import Link from "next/link";

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{background: 'linear-gradient(135deg, #FBFAF7 0%, #F5F4F0 50%, #FBFAF7 100%)'}}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full font-medium" style={{backgroundColor: 'rgba(36, 17, 83, 0.1)', color: '#241153'}}>
              <Sparkles className="w-4 h-4" />
              <span>Curated for Nigerian Students</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight" style={{color: '#0F0820'}}>
              Your Student
              <span className="block" style={{background: 'linear-gradient(135deg, #241153, #1a0d3f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                Survival Box
              </span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              Everything you need to study smarter, stay motivated, and thrive as a student.
              Delivered with love and care.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#pricing" className="group text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2" style={{background: 'linear-gradient(135deg, #241153, #1a0d3f)'}}>
                <span>Get Your Box</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link href="#features" className="border-2 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-purple-50" style={{borderColor: '#241153', color: '#241153'}}>
                Learn More
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="flex items-center space-x-2 text-gray-600">
                <Truck className="w-5 h-5" style={{color: '#241153'}} />
                <span className="font-medium">Fast Shipping</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <RotateCcw className="w-5 h-5" style={{color: '#241153'}} />
                <span className="font-medium">Cancel Anytime</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Target className="w-5 h-5" style={{color: '#241153'}} />
                <span className="font-medium">Nigeria-wide</span>
              </div>
            </div>
          </div>

          <div className="relative space-y-6">
            {/* Main Product Image */}
            <div className="relative">
              <Image
                src="/study-essentials.jpg"
                alt="Student study essentials arranged beautifully"
                width={500}
                height={400}
                className="w-full h-96 object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold">Everything You Need</h3>
                <p className="text-white/90">Curated for success</p>
              </div>
            </div>

            <HeroNewsletterSignup />
          </div>
        </div>
      </div>
    </section>
  );
}
