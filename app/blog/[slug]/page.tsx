/* eslint-disable prefer-const */
// app/blog/[slug]/page.tsx
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Terminal } from 'lucide-react';
// import SmartAd from '@/components/SmartAd';

async function getPost(slug: string) {
  const cookieStore = await cookies();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  );

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    console.error("Critical DB Failure:", error.message);
    return null;
  }
    
  return data;
}

export default async function BlogPost({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <main className="min-h-[70vh] bg-[#0f172a] text-[#cbd5e1] font-mono selection:bg-accent/30 relative z-10">
      <div className="max-w-4xl mx-auto px-6 py-3">
        {/* Navigation */}
        <Link 
          href="/blog" 
          className="group flex items-center gap-2 text-[#ea580c] mb-12 hover:translate-x-[-4px] hover:text-terminal transition-transform duration-300 w-fit"
        >
          <ArrowLeft size={18} />
          <span className="uppercase tracking-tighter text-sm">Back</span>
        </Link>

        <article className="space-y-8">
          <header className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black text-white font-sans leading-none tracking-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 text-xs text-slate-500 border-l-2 border-[#ea580c] pl-4 py-1">
                <h1 className="font-bold text-slate-400">Ryan Musuka</h1>
                <span className="text-slate-400">|</span>
              <span className="flex items-center gap-1"><Clock size={12}/> {post.read_time || "5 min read"}</span>
              <span className="text-slate-400">|</span>
              <span className="uppercase">{post.category || "Engineering"}</span>
            </div>
          </header>

          {post.hero_image_url && (
            <div className="relative aspect-video border border-slate-800 bg-slate-900 rounded-sm overflow-hidden group shadow-[0_0_30px_rgba(234,88,12,0.05)]">
              <img 
                src={post.hero_image_url} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />
            </div>
          )}

          <section className="space-y-8 text-lg leading-relaxed text-slate-300 font-sans">
            {post.content?.split('\n').map((para: string, i: number) => {
              const trimmedPara = para.trim();
              if (!trimmedPara) return null;

              // 1. Check for Numbered Headings 
              const headingRegex = /^\d+\.\s/;
              if (headingRegex.test(trimmedPara)) {
                return (
                  <h2 key={i} className="text-2xl md:text-3xl font-black text-white font-mono pt-4 flex items-baseline">
                    <span className="text-accent mr-2 opacity-50 select-none">{'>'}</span>
                    {trimmedPara}
                  </h2>
                );
              }

              // 2. Handle Inline Formatting (## for Accent Bold, ### for White Bold)
              const formatContent = (text: string) => {
                let parts = text.split(/(###|##)/g);
                let isAccentBold = false;
                let isWhiteBold = false;

                return parts.map((part, index) => {
                  if (part === "##") {
                    isAccentBold = !isAccentBold;
                    return null;
                  }
                  if (part === "###") {
                    isWhiteBold = !isWhiteBold;
                    return null;
                  }

                  if (isAccentBold) return <strong key={index} className="text-accent font-bold">{part}</strong>;
                  if (isWhiteBold) return <strong key={index} className="text-white font-bold">{part}</strong>;
                  return part;
                });
              };

              return (
                <p key={i} className="leading-relaxed">
                  {formatContent(trimmedPara)}
                </p>
              );
            })}
          </section>

          <footer className="pt-8 border-t border-accent">
            <div className="flex items-center gap-3 text-sm">
              <Terminal size={16} className="text-[#ea580c]" />
              <span className="text-slate-500 uppercase tracking-widest text-xs">End of transmission</span>
            </div>
          </footer>
        </article>
      </div>
    </main>
  );
}