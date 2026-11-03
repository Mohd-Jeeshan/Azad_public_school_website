import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

const socials = [
  { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-emerald-600' },
  { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
  { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-500' },
  { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:bg-red-600' },
  { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-emerald-700' },
];

const contactInfo = [
  { icon: MapPin, label: 'Address', value: '123 Education Lane, Knowledge Park, Springfield' },
  { icon: Phone, label: 'Phone', value: '+91 6392217088' },
  { icon: Mail, label: 'Email', value: 'admissions@azadpublicschool.edu' },
  { icon: Clock, label: 'Office Hours', value: 'Mon - Fri, 8:00 AM - 4:00 PM' },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="text-teal-400 font-semibold text-sm uppercase tracking-wider">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
            Connect With Us
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Have questions? We'd love to hear from you. Reach out through any of
            these channels or follow us on social media.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info) => (
            <div
              key={info.label}
              className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-teal-500 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center mb-4">
                <info.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-1">{info.label}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{info.value}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-slate-400 mb-6">Follow us on social media for updates and events</p>
          <div className="flex justify-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className={`w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 ${social.color} hover:text-white hover:border-transparent transition-all hover:scale-110`}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
