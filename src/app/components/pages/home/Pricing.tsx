import { Check, CreditCard, RotateCcw, Star, Truck } from "lucide-react";

export const Pricing: React.FC = () => {
  const pricingTiers = [
    {
      name: "StudyLite",
      price: "₦10,000",
      priceUSD: "$8",
      description: "Perfect for students starting their organized study journey",
      features: [
        "1 A5/A6 premium notebook",
        "2 quality pens",
        "Sticky notes set",
        "3 motivational affirmation cards",
        "1 local snack",
        "Tea/coffee pack",
        "Motivational sticker",
        "Hand sanitizer & nail cutter"
      ]
    },
    {
      name: "StudyPro",
      price: "₦15,000",
      priceUSD: "$11",
      description: "Complete package for serious students who want it all",
      popular: true,
      features: [
        "2 premium notebooks",
        "4 pens/highlighters",
        "Sticky notes + to-do lists",
        "Full affirmation card set",
        "Gratitude journal",
        "Stress ball & wellness items",
        "2-3 local snacks variety",
        "Multiple drink sachets",
        "Chocolate treats",
        "Mini wall poster",
        "Premium sticker collection",
        "Complete personal care kit",
        "Branded water bottle"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-24" style={{background: 'linear-gradient(135deg, #FBFAF7 0%, #F5F4F0 50%, #FBFAF7 100%)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{color: '#0F0820'}}>
            Choose Your
            <span className="block" style={{background: 'linear-gradient(135deg, #241153, #1a0d3f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              Study Plan
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Flexible plans designed for every student&rsquo;s needs and budget.
            Start with what works for you and upgrade anytime.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <div key={index} className={`relative bg-white rounded-3xl shadow-xl overflow-hidden ${tier.popular ? 'ring-4 ring-[#241153] transform scale-105' : ''}`}>
              {tier.popular && (
                <div className="absolute top-0 left-0 right-0 text-white text-center py-3 font-semibold" style={{background: 'linear-gradient(135deg, #241153, #1a0d3f)'}}>
                  <Star className="w-4 h-4 inline mr-2" />
                  Most Popular
                </div>
              )}

              <div className={`p-8 ${tier.popular ? 'pt-16' : ''}`}>
                <h3 className="text-2xl font-bold mb-2" style={{color: '#0F0820'}}>{tier.name}</h3>
                <p className="text-gray-600 mb-6">{tier.description}</p>

                <div className="mb-6">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-bold" style={{color: '#0F0820'}}>{tier.price}</span>
                    <span className="text-lg text-gray-500">{tier.priceUSD}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{color: '#241153'}} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-4 px-6 rounded-full font-semibold text-lg transition-all duration-300 ${
                  tier.popular
                    ? 'text-white hover:shadow-xl transform hover:scale-105'
                    : 'border-2 hover:text-white hover:bg-purple-600'
                }`} style={tier.popular ? {background: 'linear-gradient(135deg, #241153, #1a0d3f)'} : {borderColor: '#241153', color: '#241153'}}>
                  Start {tier.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-6 bg-white rounded-2xl px-8 py-4 shadow-lg">
            <div className="flex items-center space-x-2 text-gray-600">
              <Truck className="w-5 h-5" style={{color: '#241153'}} />
              <span className="font-medium">Delivery across Nigeria</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <RotateCcw className="w-5 h-5" style={{color: '#241153'}} />
              <span className="font-medium">Skip or cancel anytime</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <CreditCard className="w-5 h-5" style={{color: '#241153'}} />
              <span className="font-medium">Secure payment</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
