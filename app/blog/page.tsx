/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Loader2, Terminal, ChevronRight, Activity } from "lucide-react";
import { createBrowserClient } from '@supabase/ssr';

export default function BlogLandingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      // Initialize Supabase Client
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
      );

      const { data, error } = await supabase
        .from('blog_posts') 
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Database Query Error:", error);
        setLoading(false);
        return;
      }

      if (data) {
        const mappedPosts = data.map((post: any) => ({
          id: post.slug || post.id, 
          category: post.category || post.topic || "Engineering",
          title: post.title,
          excerpt: post.excerpt || "Decrypting payload... Click to read full blog.",
          image: post.hero_image_url || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop", // A more cyber-themed fallback image
          date: new Date(post.created_at || post.date).toISOString().split('T')[0], // YYYY-MM-DD format for terminal vibe
          readTime: post.read_time || "5 min read",
          featured: post.featured || post.is_featured || false,
          views: post.views || 0,
        }));

        setPosts(mappedPosts);
      }
      setLoading(false);
    }

    fetchPosts();
  }, []);

  // ---------------------------------------------------------------------------
  // DATA PARTITIONING LOGIC
  // ---------------------------------------------------------------------------
  const featuredPost = posts.find(p => p.featured) || posts[0];

  const trendingPosts = [...posts]
    .sort((a, b) => b.views - a.views)
    .filter(p => p.id !== featuredPost?.id)
    .slice(0, 3);

  const trendingIds = trendingPosts.map(p => p.id);
  const archivePosts = posts.filter(p => p.id !== featuredPost?.id && !trendingIds.includes(p.id));

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ---------------------------------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center relative z-10">
        <Loader2 className="w-10 h-10 animate-spin text-accent" />
        <p className="mt-4 font-mono uppercase tracking-widest text-slate-500 text-sm animate-pulse">
          Loading BLogs...
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-transparent pt-8 pb-20 px-4 sm:px-6 lg:px-8 min-h-[90vh] relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="flex scroll-mt-20 flex-col md:flex-row md:items-end justify-between border-b border-dashed border-slate-700 pb-8 mb-6 gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight font-mono uppercase">
                Ryan&apos;s<span className="text-accent">Cyber</span>Blog
              </h1>
            </div>
            <p className="text-slate-400 font-mono text-sm flex items-center">
              <span className="text-terminal mr-2">{'>'}</span> 
              Engineering notes, architecture deep-dives, and thoughts.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input 
              type="text"
              placeholder="Query database..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all font-mono text-sm text-slate-200 placeholder:text-slate-600 shadow-inner"
            />
          </div>
        </header>

        {searchQuery ? (
          /* Search Results View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.length > 0 ? filteredPosts.map(post => (
              <ArticleCard key={post.id} post={post} />
            )) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-500 border border-dashed border-slate-800 rounded-2xl bg-slate-900/20">
                <Activity className="w-10 h-10 mb-4 opacity-50" />
                <p className="font-mono text-sm uppercase tracking-widest">No matching logs found in database.</p>
              </div>
            )}
          </div>
        ) : (
          /* Default Layout View */
          <div className="space-y-16">
            
            {/* FEATURED POST */}
            {featuredPost && (
              <section>
                <Link href={`/blog/${featuredPost.id}`} className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/40 border border-slate-800 rounded-2xl p-4 md:p-6 hover:border-accent/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(234,88,12,0.1)]">
                  
                  {/* Image Container */}
                  <div className="lg:col-span-7 overflow-hidden rounded-xl aspect-[2/1] lg:aspect-video relative border border-slate-800">
                    <img 
                      src={featuredPost.image} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
                      alt={featuredPost.title} 
                    />
                    <div className="absolute top-4 left-4 bg-accent/20 backdrop-blur-md border border-accent/50 text-accent px-3 py-1.5 rounded-md flex items-center gap-2 font-mono uppercase tracking-widest text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_rgba(234,88,12,1)]"></span>
                      Latest Entry
                    </div>
                  </div>
                  
                  {/* Content Container */}
                  <div className="lg:col-span-5 flex flex-col justify-center h-full space-y-5 px-2">
                    <div className="flex items-center gap-3 font-mono text-xs text-slate-500 uppercase tracking-widest">
                      <span className="text-terminal border border-terminal/30 bg-terminal/10 px-2 py-0.5 rounded">
                        {featuredPost.category}
                      </span>
                      <span>{featuredPost.date}</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight group-hover:text-accent transition-colors">
                      {featuredPost.title}
                    </h2>
                    
                    <p className="text-slate-400 text-base md:text-lg leading-relaxed line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex items-center text-sm font-bold text-accent pt-2">
                      Read More <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </section>
            )}

            {/* TRENDING POSTS */}
            {trendingPosts.length > 0 && (
              <section>
                <div className="flex items-center space-x-2 mb-8 border-b border-slate-800 pb-4">
                  <Activity className="w-5 h-5 text-terminal" />
                  <h3 className="text-xl font-mono font-bold text-white uppercase tracking-widest">Trending Pieces</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  {trendingPosts.map(post => (
                    <ArticleCard key={post.id} post={post} />
                  ))}
                </div>
              </section>
            )}

            {/* ARCHIVE POSTS */}
            {archivePosts.length > 0 && (
              <section>
                <div className="flex items-center space-x-2 mb-8 border-b border-slate-800 pb-4">
                  <Terminal className="w-5 h-5 text-slate-500" />
                  <h3 className="text-xl font-mono font-bold text-slate-300 uppercase tracking-widest">System Archive</h3>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {archivePosts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.id}`} className="group flex flex-col sm:flex-row gap-5 items-center bg-slate-900/30 border border-slate-800 rounded-xl p-4 hover:border-slate-600 transition-all duration-300">
                      
                      <div className="w-full sm:w-40 shrink-0 aspect-video sm:aspect-square overflow-hidden rounded-lg relative">
                        <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-70 group-hover:opacity-100" alt={post.title} />
                      </div>
                      
                      <div className="space-y-3 flex-1 min-w-0">
                        <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                          <span className="text-accent">{post.category}</span>
                          <span>|</span>
                          <span>{post.date}</span>
                        </div>
                        <h4 className="text-lg font-bold text-slate-200 leading-snug group-hover:text-white transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-slate-500 text-sm line-clamp-2">{post.excerpt}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

          </div>
        )}
      </div>
    </main>
  );
}

// ---------------------------------------------------------------------------
// REUSABLE SUB-COMPONENT
// ---------------------------------------------------------------------------
function ArticleCard({ post }: { post: any }) {
  return (
    <Link href={`/blog/${post.id}`} className="group flex flex-col space-y-3 bg-slate-900/40 border border-slate-800 rounded-2xl p-3 md:p-4 hover:border-terminal/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] transition-all duration-500">
      
      <div className="aspect-[16/9] md:aspect-[4/3] overflow-hidden rounded-xl relative border border-slate-800/50">
        <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" alt={post.title} />
      </div>
      
      <div className="space-y-2 flex-grow px-1">
        <div className="flex justify-between items-center">
          <span className="text-terminal text-[9px] font-mono border border-terminal/30 bg-terminal/10 px-1.5 py-0.5 rounded uppercase tracking-widest">
            {post.category}
          </span>
          <span className="text-slate-500 text-[9px] font-mono">{post.readTime}</span>
        </div>
        
        <h3 className="text-lg md:text-xl font-bold text-slate-200 leading-tight group-hover:text-terminal transition-colors line-clamp-2 md:line-clamp-3">
          {post.title}
        </h3>
        
        <p className="text-slate-400 text-xs md:text-sm line-clamp-2">{post.excerpt}</p>
      </div>
      
      <div className="px-1 pt-2 border-t border-dashed border-slate-800 flex items-center justify-between">
        <span className="text-slate-500 font-mono text-[9px]">{post.date}</span>
        <span className="text-terminal opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}