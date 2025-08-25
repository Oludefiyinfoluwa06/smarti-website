import { BookOpen, Coffee, Gift, Heart, Palette, Smartphone } from "lucide-react";
import Image from "next/image";

export const Features: React.FC = () => {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Study Essentials",
      description: "Premium stationery, planners, and organizational tools to help you study smarter and stay organized.",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Mental Wellness",
      description: "Affirmation cards, stress relief items, and self-care essentials for your mental health journey.",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      title: "Local Treats",
      description: "Carefully selected Nigerian snacks and treats to fuel your brain during study sessions.",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Creative Vibes",
      description: "Exclusive designs, stickers, and decorative items to personalize your study space.",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Digital Bonuses",
      description: "Access to study playlists, productivity sheets, wallpapers, and exclusive digital content.",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: "Monthly Surprises",
      description: "Every box is different with seasonal themes and surprise items to keep you excited.",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{color: '#0F0820'}}>
            Why Students
            <span className="block" style={{background: 'linear-gradient(135deg, #241153, #1a0d3f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              Love Smarti
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We understand what students need to succeed. Every item in your box is carefully selected
            to support your academic journey and personal growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white" style={{background: 'linear-gradient(135deg, #241153, #1a0d3f)'}}>
                    {feature.icon}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3" style={{color: '#0F0820'}}>{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
