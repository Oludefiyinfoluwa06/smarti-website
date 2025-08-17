import { ArrowRight, BookOpen, Coffee, Gift, Heart, Palette, RotateCcw, Smartphone, Sparkles, Target, Truck } from "lucide-react";
import { HeroNewsletterSignup } from "./HeroNewsletterSignup";

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{background: 'linear-gradient(135deg, #FBFAF7 0%, #F5F4F0 50%, #FBFAF7 100%)'}}>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{backgroundColor: '#241153'}}></div>
        <div className="absolute top-40 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-75" style={{backgroundColor: '#00D0A0'}}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-150" style={{backgroundColor: '#1a0d3f'}}></div>
      </div>

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
              Delivered monthly with love and care.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2" style={{background: 'linear-gradient(135deg, #241153, #1a0d3f)'}}>
                <span>Get Your Box</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="border-2 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-purple-50" style={{borderColor: '#241153', color: '#241153'}}>
                Learn More
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="flex items-center space-x-2 text-gray-600">
                <Truck className="w-5 h-5" style={{color: '#241153'}} />
                <span className="font-medium">Shipping</span>
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
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="absolute -top-4 -right-4 text-white px-4 py-2 rounded-full font-semibold transform rotate-12" style={{background: 'linear-gradient(135deg, #241153, #1a0d3f)'}}>
                New Box!
              </div>

              <h3 className="text-2xl font-bold text-center mb-6" style={{color: '#0F0820'}}>
                What&rsquo;s Inside?
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: BookOpen, label: 'Study Tools', bgColor: 'rgba(36, 17, 83, 0.1)', textColor: '#241153' },
                  { icon: Heart, label: 'Wellness', bgColor: 'rgba(0, 208, 160, 0.1)', textColor: '#00D0A0' },
                  { icon: Coffee, label: 'Snacks', bgColor: 'rgba(36, 17, 83, 0.1)', textColor: '#241153' },
                  { icon: Palette, label: 'Creative', bgColor: 'rgba(0, 208, 160, 0.1)', textColor: '#00D0A0' },
                  { icon: Gift, label: 'Surprises', bgColor: 'rgba(36, 17, 83, 0.1)', textColor: '#241153' },
                  { icon: Smartphone, label: 'Digital', bgColor: 'rgba(0, 208, 160, 0.1)', textColor: '#00D0A0' }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2" style={{backgroundColor: item.bgColor}}>
                      <item.icon className="w-6 h-6" style={{color: item.textColor}} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <HeroNewsletterSignup />
          </div>
        </div>
      </div>
    </section>
  );
}
