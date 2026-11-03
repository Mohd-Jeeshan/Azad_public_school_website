import { useState } from 'react';
import { Send, CheckCircle, Loader2, User, Mail, Phone, School, MessageSquare } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const grades = [
  'Pre-Kindergarten',
  'Kindergarten',
  'Grade 1',
  'Grade 2',
  'Grade 3',
  'Grade 4',
  'Grade 5',
  'Grade 6',
  'Grade 7',
  'Grade 8',
  'Grade 9',
  'Grade 10',
  'Grade 11',
  'Grade 12',
];

export default function AdmissionForm() {
  const [form, setForm] = useState({
    student_name: '',
    parent_name: '',
    email: '',
    phone: '',
    grade_applying_for: '',
    previous_school: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.student_name.trim()) e.student_name = 'Student name is required';
    if (!form.parent_name.trim()) e.parent_name = 'Parent name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    if (!form.grade_applying_for) e.grade_applying_for = 'Please select a grade';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus('submitting');

    const { error } = await supabase.from('admission_applications').insert({
      student_name: form.student_name.trim(),
      parent_name: form.parent_name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      grade_applying_for: form.grade_applying_for,
      previous_school: form.previous_school.trim() || null,
      message: form.message.trim() || null,
    });

    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
      setForm({
        student_name: '',
        parent_name: '',
        email: '',
        phone: '',
        grade_applying_for: '',
        previous_school: '',
        message: '',
      });
    }
  };

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <section id="admission" className="py-24 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="lg:sticky lg:top-28">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">
              Admissions
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mt-2 mb-6">
              Begin Your Journey With Us
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed mb-8">
              Take the first step toward a brighter future. Fill out the
              admission form and our team will reach out within 48 hours to
              guide you through the enrollment process.
            </p>

            <div className="space-y-4">
              {[
                { step: '1', title: 'Submit Application', desc: 'Complete the form with student details' },
                { step: '2', title: 'Document Verification', desc: 'Our team reviews your application' },
                { step: '3', title: 'Assessment', desc: 'Brief interaction with the student' },
                { step: '4', title: 'Enrollment', desc: 'Welcome to the Azad family!' },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">
                  Application Submitted!
                </h3>
                <p className="text-slate-500 max-w-sm mb-8">
                  Thank you for applying to Azad Public School. We'll contact
                  you within 48 hours with the next steps.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {status === 'error' && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                    Something went wrong. Please try again or contact us directly.
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Student's Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      value={form.student_name}
                      onChange={(e) => update('student_name', e.target.value)}
                      className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                        errors.student_name ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all`}
                      placeholder="e.g. Aarav Sharma"
                    />
                  </div>
                  {errors.student_name && (
                    <p className="text-red-500 text-xs mt-1">{errors.student_name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Parent / Guardian Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      value={form.parent_name}
                      onChange={(e) => update('parent_name', e.target.value)}
                      className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                        errors.parent_name ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all`}
                      placeholder="e.g. Rajesh Sharma"
                    />
                  </div>
                  {errors.parent_name && (
                    <p className="text-red-500 text-xs mt-1">{errors.parent_name}</p>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                          errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        } focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all`}
                        placeholder="parent@email.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                          errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        } focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all`}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Grade Applying For *
                  </label>
                  <select
                    value={form.grade_applying_for}
                    onChange={(e) => update('grade_applying_for', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.grade_applying_for ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    } focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all bg-white`}
                  >
                    <option value="">Select a grade</option>
                    {grades.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                  {errors.grade_applying_for && (
                    <p className="text-red-500 text-xs mt-1">{errors.grade_applying_for}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Previous School (optional)
                  </label>
                  <div className="relative">
                    <School className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      value={form.previous_school}
                      onChange={(e) => update('previous_school', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                      placeholder="Name of previous school"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Message (optional)
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                    <textarea
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      rows={3}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all resize-none"
                      placeholder="Anything you'd like us to know?"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-semibold shadow-md hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Application
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
