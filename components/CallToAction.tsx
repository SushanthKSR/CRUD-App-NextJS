'use client';

import Link from 'next/link';
import { FileText } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function CallToAction() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle, ${isDark ? '#fff' : '#000'} 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Explore our CRUD application and see how easy it is to manage your posts.
        </p>
        <Link href="/posts" className="btn btn-lg bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <FileText className="h-5 w-5 mr-2" />
          View Posts
        </Link>
      </div>
    </section>
  );
}