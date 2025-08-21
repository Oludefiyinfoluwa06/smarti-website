import { BookOpen } from "lucide-react";
import Link from "next/link";

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center" style={{background: 'linear-gradient(135deg, #241153, #1a0d3f)'}}>
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              Smarti
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/#features" className="text-gray-700 hover:text-purple-600 transition-colors font-medium" style={{'&:hover': {color: '#241153'}} as any}>
              Features
            </Link>
            <Link href="/#pricing" className="text-gray-700 hover:text-purple-600 transition-colors font-medium" style={{'&:hover': {color: '#241153'}} as any}>
              Pricing
            </Link>
            <Link href="/#contact" className="text-gray-700 hover:text-purple-600 transition-colors font-medium" style={{'&:hover': {color: '#241153'}} as any}>
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
