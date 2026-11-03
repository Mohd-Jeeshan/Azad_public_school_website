import { useEffect, useState } from 'react';
import { Trophy, Search, Award, TrendingUp } from 'lucide-react';
import { supabase, type Result } from '@/lib/supabase';

export default function Results() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Result | null>(null);

  useEffect(() => {
    supabase
      .from('results')
      .select('*')
      .order('percentage', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setResults(data as Result[]);
        setLoading(false);
      });
  }, []);

  const filtered = results.filter(
    (r) =>
      r.student_name.toLowerCase().includes(search.toLowerCase()) ||
      r.roll_number.toLowerCase().includes(search.toLowerCase()) ||
      r.grade.toLowerCase().includes(search.toLowerCase())
  );

  const topPerformer = results[0];

  return (
    <section id="results" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">
            Academic Results
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mt-2 mb-4">
            Student Results
          </h2>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Celebrating the achievements of our outstanding students. Search
            by name, roll number, or class to view detailed results.
          </p>
        </div>

        {topPerformer && (
          <div className="mb-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-8 border border-amber-200 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg flex-shrink-0">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-1">
                Top Performer — {topPerformer.exam_term}
              </p>
              <h3 className="text-2xl font-bold text-slate-800">
                {topPerformer.student_name}
              </h3>
              <p className="text-slate-500">
                {topPerformer.grade} • Roll: {topPerformer.roll_number} • Scored{' '}
                {topPerformer.percentage}% ({topPerformer.grade_letter})
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-600">
                {topPerformer.percentage}%
              </div>
              <div className="text-sm text-slate-400">Overall Score</div>
            </div>
          </div>
        )}

        <div className="relative mb-8 max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, roll number, or class..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-full border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 rounded-full border-4 border-teal-200 border-t-teal-500 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-lg">No results found. Try a different search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelected(r)}
                className="group text-left bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 hover:border-teal-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">
                      {r.student_name}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {r.grade} • {r.roll_number}
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-teal-600">
                      {r.percentage}%
                    </span>
                    <span className="text-xs font-semibold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">
                      {r.grade_letter}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mb-4">{r.exam_term}</p>
                <div className="flex items-center gap-2 text-sm text-slate-400 group-hover:text-teal-500 transition-colors">
                  <Award className="w-4 h-4" />
                  <span>
                    {r.total_marks} / {r.max_marks} marks
                  </span>
                  {r.rank && (
                    <span className="ml-auto text-teal-500 font-medium">
                      Rank: {r.rank}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {selected.student_name}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {selected.grade} • Roll: {selected.roll_number}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-white">
                    {selected.percentage}%
                  </div>
                  <div className="text-white/80 text-sm">
                    Grade: {selected.grade_letter}
                  </div>
                </div>
              </div>
              <p className="text-white/70 text-sm mt-2">{selected.exam_term}</p>
            </div>

            <div className="p-6">
              {selected.rank && (
                <div className="flex items-center gap-2 mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  <span className="font-semibold text-amber-700">
                    Class Rank: {selected.rank}
                  </span>
                </div>
              )}

              <div className="space-y-3">
                {selected.subjects.map((sub, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="flex-1 text-slate-700 font-medium text-sm">
                      {sub.subject}
                    </span>
                    <div className="flex-1 h-2.5 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all"
                        style={{ width: `${(sub.marks / sub.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-slate-600 w-16 text-right">
                      {sub.marks}/{sub.total}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-teal-500" />
                  <span className="text-slate-600 font-medium">
                    Total: {selected.total_marks} / {selected.max_marks}
                  </span>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="px-6 py-2.5 rounded-full bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
