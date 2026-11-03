import { Target, Heart, Lightbulb, Shield } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    desc: 'To provide an inclusive, inspiring learning environment where every student discovers their potential and develops the skills to thrive in a changing world.',
  },
  {
    icon: Lightbulb,
    title: 'Our Vision',
    desc: 'To be a beacon of educational excellence, empowering students to become critical thinkers, compassionate citizens, and lifelong learners.',
  },
  {
    icon: Heart,
    title: 'Our Values',
    desc: 'Integrity, respect, and curiosity guide everything we do. We celebrate diversity and foster a community where every voice matters.',
  },
  {
    icon: Shield,
    title: 'Safe Environment',
    desc: 'A secure, nurturing campus with modern facilities, trained staff, and a culture of care that puts student wellbeing first.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">
            About Us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mt-2 mb-4">
            A Tradition of Excellence
          </h2>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
            For over 25 years, Azad Public School has been at the forefront of
            quality education, blending tradition with innovation to create an
            unparalleled learning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val) => (
            <div
              key={val.title}
              className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl border border-gray-100 hover:border-teal-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <val.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                {val.title}
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
