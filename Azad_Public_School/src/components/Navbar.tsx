import { useEffect, useState } from 'react';
import { GraduationCap, Menu, X } from 'lucide-react';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'News', href: '#news' },
  { label: 'Teachers', href: '#teachers' },
  { label: 'Results', href: '#results' },
  { label: 'Admission', href: '#admission' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span
            className={`text-xl font-bold transition-colors ${
              scrolled ? 'text-slate-800' : 'text-white'
            }`}
          >
            Azad Public School
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-teal-500 ${
                scrolled ? 'text-slate-600' : 'text-white/90'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#admission"
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all"
          >
            Apply Now
          </a>
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <X className={`w-6 h-6 ${scrolled ? 'text-slate-800' : 'text-white'}`} />
          ) : (
            <Menu className={`w-6 h-6 ${scrolled ? 'text-slate-800' : 'text-white'}`} />
          )}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white shadow-xl mt-3 mx-4 rounded-2xl overflow-hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-3.5 text-slate-700 font-medium hover:bg-teal-50 hover:text-teal-600 transition-colors border-b border-gray-100 last:border-0"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#admission"
            onClick={() => setOpen(false)}
            className="block px-6 py-4 text-center bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-semibold"
          >
            Apply Now
          </a>
        </div>
      )}
    </nav>
  );
}
