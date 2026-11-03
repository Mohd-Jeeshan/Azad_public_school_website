import { Mail, Linkedin } from 'lucide-react';

const teachers = [
  {
    name: 'Dr. Sarah Mitchell',
    role: 'Principal & Mathematics',
    image:
      'https://images.pexels.com/photos/8423069/pexels-photo-8423069.jpeg?auto=compress&cs=tinysrgb&w=600',
    bio: 'Ph.D. in Mathematics Education with 20+ years of experience shaping young minds.',
  },
  {
    name: 'Mr. James Anderson',
    role: 'Science Department Head',
    image:
      'https://images.pexels.com/photos/6325958/pexels-photo-6325958.jpeg?auto=compress&cs=tinysrgb&w=600',
    bio: 'M.Sc. Physics. Passionate about hands-on experiments and inquiry-based learning.',
  },
  {
    name: 'Ms. Emily Roberts',
    role: 'English & Literature',
    image:
      'https://images.pexels.com/photos/6981004/pexels-photo-6981004.jpeg?auto=compress&cs=tinysrgb&w=600',
    bio: 'M.A. in English Literature. Brings stories to life and fosters a love for reading.',
  },
  {
    name: 'Prof. David Chen',
    role: 'Computer Science',
    image:
      'https://images.pexels.com/photos/8617725/pexels-photo-8617725.jpeg?auto=compress&cs=tinysrgb&w=600',
    bio: 'Former software engineer turned educator. Teaches coding from scratch to advanced.',
  },
  {
    name: 'Mrs. Priya Sharma',
    role: 'Social Studies',
    image:
      'https://images.pexels.com/photos/37795371/pexels-photo-37795371.jpeg?auto=compress&cs=tinysrgb&w=600',
    bio: 'M.A. History. Makes the past relevant and inspires civic engagement.',
  },
  {
    name: 'Mr. Robert Williams',
    role: 'Senior Faculty — Commerce',
    image:
      'https://images.pexels.com/photos/8197541/pexels-photo-8197541.jpeg?auto=compress&cs=tinysrgb&w=600',
    bio: 'MBA. 15 years guiding students in economics, accounting, and business studies.',
  },
];

export default function Teachers() {
  return (
    <section id="teachers" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">
            Our Faculty
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mt-2 mb-4">
            Meet Our Dedicated Teachers
          </h2>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Our educators are the heart of Azad Public School. Each brings passion,
            expertise, and a deep commitment to every student's success.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((teacher) => (
            <div
              key={teacher.name}
              className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative overflow-hidden h-80">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                  <a
                    href="#contact"
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-emerald-600 transition-colors"
                    aria-label={`Email ${teacher.name}`}
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                  <a
                    href="#contact"
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-emerald-600 transition-colors"
                    aria-label={`LinkedIn profile of ${teacher.name}`}
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-800">
                  {teacher.name}
                </h3>
                <p className="text-teal-600 font-medium text-sm mb-3">
                  {teacher.role}
                </p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {teacher.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
