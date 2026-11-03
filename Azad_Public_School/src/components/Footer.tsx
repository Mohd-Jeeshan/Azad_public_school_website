import { GraduationCap, Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

const socials = [Facebook, Twitter, Instagram, Youtube, Linkedin];

export default function Footer() {
  return (
    <footer className="bg-slate-950 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-lg">Azad Public School</p>
              <p className="text-slate-500 text-sm">Shaping Tomorrow's Leaders</p>
            </div>
          </div>

          <div className="flex gap-3">
            {socials.map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-teal-500 transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Azad Public School. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
