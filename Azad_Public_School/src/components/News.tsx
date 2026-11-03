import { useEffect, useState } from 'react';
import { Newspaper, Calendar, ChevronRight, X } from 'lucide-react';
import { supabase, type NewsItem } from '@/lib/supabase';

const categoryColors: Record<string, string> = {
  Event: 'bg-emerald-100 text-emerald-700',
  Achievement: 'bg-amber-100 text-amber-700',
  Announcement: 'bg-teal-100 text-teal-700',
};

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<NewsItem | null>(null);

  useEffect(() => {
    supabase
      .from('news')
      .select('*')
      .order('date', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setNews(data as NewsItem[]);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <section id="news" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">
            Latest Updates
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mt-2 mb-4">
            School News & Events
          </h2>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Stay up to date with the latest happenings, achievements, and
            announcements from Azad Public School.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 rounded-full border-4 border-teal-200 border-t-teal-500 animate-spin" />
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <Newspaper className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No news articles yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <article
                key={item.id}
                onClick={() => setSelected(item)}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-2xl border border-gray-100 hover:border-teal-200 transition-all duration-300 hover:-translate-y-1"
              >
                {item.image_url && (
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span
                      className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
                        categoryColors[item.category] || 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {item.category}
                    </span>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(item.date)}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-teal-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">
                    {item.summary}
                  </p>
                  <span className="inline-flex items-center gap-1 text-teal-600 text-sm font-semibold group-hover:gap-2 transition-all">
                    Read More
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </article>
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
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {selected.image_url && (
              <div className="relative h-64 overflow-hidden rounded-t-3xl">
                <img
                  src={selected.image_url}
                  alt={selected.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-slate-800 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
                <span
                  className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
                    categoryColors[selected.category] || 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {selected.category}
                </span>
              </div>
            )}
            <div className="p-8">
              <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(selected.date)}</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                {selected.title}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                {selected.summary}
              </p>
              {selected.content && (
                <p className="text-slate-500 leading-relaxed">
                  {selected.content}
                </p>
              )}
              <button
                onClick={() => setSelected(null)}
                className="mt-8 px-6 py-2.5 rounded-full bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
