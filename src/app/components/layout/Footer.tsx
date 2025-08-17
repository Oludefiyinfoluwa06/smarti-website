"use client";

import { BookOpen, Facebook, Instagram, Linkedin, Mail, Twitter } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer id="contact" style={{backgroundColor: '#0F0820'}} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{background: 'linear-gradient(135deg, #241153, #1a0d3f)'}}>
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold text-white">
                Smarti
              </span>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              Empowering Nigerian students with monthly boxes of study essentials,
              wellness items, and motivation to succeed in their academic journey.
            </p>

            <div className="flex space-x-4 mt-6">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:opacity-80 transition-all duration-300"
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#241153'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#374151'}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4" style={{color: '#241153'}}>Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="w-4 h-4" />
                <span>growth@smarticommunity.com.ng</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="w-4 h-4" />
                <span>support@smarticommunity.com.ng</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4" style={{color: '#241153'}}>Quick Links</h3>
            <div className="space-y-2">
              {['Subscription Plans', 'Track Your Box', 'FAQ', 'Student Community', 'About Us', 'Privacy Policy'].map((link, index) => (
                <a key={index} href="#" className="block text-gray-300 hover:text-purple-400 transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Smarti. Made with ❤️ for Nigerian students. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
