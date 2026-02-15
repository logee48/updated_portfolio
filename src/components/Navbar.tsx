import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'HOME', id: 'hero' },
  { label: 'SKILLS', id: 'skills' },
  { label: 'WORK', id: 'experience' },
  { label: 'PROJECTS', id: 'projects' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 hidden md:block ${
          isScrolled
            ? 'bg-neo-yellow border-b-4 border-neo-black py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="section-padding">
          <div className="flex items-center justify-between">
            {/* Logo - Left side */}
            <button
              onClick={() => scrollToSection('hero')}
              className="font-display font-black text-2xl text-neo-black hover:text-neo-blue transition-colors"
            >
              Logesh.
            </button>

            {/* Nav Links - Right side */}
            <div className="flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="font-mono text-sm font-bold text-neo-black hover:text-neo-blue transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neo-black group-hover:w-full transition-all duration-200" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-[9998]">
        {/* Logo - Left side */}
        <button
          onClick={() => scrollToSection('hero')}
          className="fixed top-4 left-4 z-[9999] font-display font-black text-xl text-neo-black bg-neo-yellow border-4 border-neo-black px-3 py-1 shadow-neo"
        >
          LOGESH.
        </button>

        {/* Hamburger Button - Right side */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`fixed top-4 right-4 z-[9999] w-12 h-12 flex items-center justify-center transition-all duration-200 ${
            isOpen
              ? 'bg-neo-black text-neo-yellow'
              : 'bg-neo-yellow text-neo-black border-4 border-neo-black shadow-neo'
          }`}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-neo-black z-[9990] transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col items-start justify-center h-full section-padding pt-20">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="font-display font-black text-4xl text-white hover:text-neo-yellow transition-colors mb-6 text-left"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.label}
              </button>
            ))}

            {/* Decorative element */}
            <div className="mt-8 w-20 h-20 bg-neo-yellow border-4 border-white rotate-12" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

