import Link from "next/link";
import Image from "next/image";

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center gap-2">
              <Image src="/logo-short.png" alt="Smarti" width={50} height={50} />
              <span className="text-2xl font-bold text-[#241153]">
                Smarti
              </span>
            </div>
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
