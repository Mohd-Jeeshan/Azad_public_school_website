import { useEffect, useState } from 'react';
import { ArrowRight, BookOpen, Award, Users } from 'lucide-react';

const slides = [
  {
    image: 'https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Welcome to Azad Public School',
    subtitle: 'Shaping Tomorrow\u2019s Leaders Today',
  },
  {
    image: 'https://images.pexels.com/photos/5212329/pexels-photo-5212329.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'A Vibrant Learning Community',
    subtitle: 'Where Curiosity Meets Excellence',
  },
  {
    image: 'https://images.pexels.com/photos/35314982/pexels-photo-35314982.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'A Beautiful Campus',
    subtitle: 'Modern Facilities, Timeless Values',
  },
  {
    image: 'https://images.pexels.com/photos/10638213/pexels-photo-10638213.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Knowledge Beyond Classrooms',
    subtitle: 'Inspiring Minds, Building Futures',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/70 via-emerald-800/60 to-teal-900/70" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-white/90 text-sm font-medium">
            Admissions Open for 2025-2026
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
          {slides[current].title.split(' ').slice(0, -2).join(' ')}
          <br />
          <span className="bg-gradient-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent">
            {slides[current].title.split(' ').slice(-2).join(' ')}
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          {slides[current].subtitle}. At Azad Public School, we nurture curious
          minds with world-class education, dedicated teachers, and a vibrant
          learning community.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#admission"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-emerald-00 font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            Apply for Admission
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#about"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold hover:bg-white/20 transition-all"
          >
            Learn More
          </a>
        </div>

        <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-16 max-w-2xl mx-auto">
          {[
            { icon: Users, value: '1,200+', label: 'Students' },
            { icon: BookOpen, value: '80+', label: 'Expert Teachers' },
            { icon: Award, value: '95%', label: 'Graduation Rate' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <stat.icon className="w-6 h-6 text-teal-300" />
              <span className="text-2xl sm:text-3xl font-bold text-white">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-white/70">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === current
                ? 'w-8 bg-white'
                : 'w-2.5 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
    </section>
  );
}
