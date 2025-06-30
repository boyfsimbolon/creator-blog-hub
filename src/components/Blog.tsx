import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Post } from '../types';
import { getBlogPosts, formatDate, calculateReadingTime } from '../lib/supabase';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Data dummy untuk demo
  const dummyPosts: Post[] = [
    {
      id: '1',
      title: 'Membangun Aplikasi React Modern dengan TypeScript',
      summary: 'Panduan lengkap untuk membangun aplikasi React yang scalable menggunakan TypeScript. Mencakup setup project, best practices, dan tips optimasi performance.',
      content: `# Membangun Aplikasi React Modern dengan TypeScript

React telah menjadi salah satu framework JavaScript yang paling populer untuk membangun user interface. Dengan ditambahkannya TypeScript, kita dapat membangun aplikasi yang lebih robust dan maintainable.

## Mengapa TypeScript?

TypeScript memberikan beberapa keuntungan:
- **Type Safety**: Mengurangi bug di runtime
- **Better IDE Support**: Autocomplete dan refactoring yang lebih baik
- **Dokumentasi Hidup**: Interface dan type berfungsi sebagai dokumentasi

## Setup Project

\`\`\`bash
npx create-react-app my-app --template typescript
cd my-app
npm start
\`\`\`

## Best Practices

1. **Definisikan Interface untuk Props**
2. **Gunakan Union Types untuk State**
3. **Leverage Generic Types**

Mari kita mulai membangun aplikasi yang amazing!`,
      slug: 'membangun-aplikasi-react-modern-dengan-typescript',
      created_at: '2024-01-15T10:00:00Z',
      author: 'Nama Anda',
      tags: ['React', 'TypeScript', 'JavaScript'],
      featured_image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
      reading_time: 8
    },
    {
      id: '2',
      title: 'Mengenal Supabase: Backend-as-a-Service untuk Developer Modern',
      summary: 'Explore fitur-fitur powerful dari Supabase yang dapat mempercepat development process. Dari database hingga authentication, semua dalam satu platform.',
      content: `# Mengenal Supabase: Backend-as-a-Service untuk Developer Modern

Supabase adalah platform Backend-as-a-Service (BaaS) yang menyediakan semua tools yang dibutuhkan untuk membangun aplikasi modern.

## Fitur Utama Supabase

### 1. Database PostgreSQL
- Real-time subscriptions
- Row Level Security
- Full-text search

### 2. Authentication
- Multiple providers (Google, GitHub, Discord)
- Magic links
- Phone authentication

### 3. Storage
- File upload dengan CDN
- Image transformations
- Security policies

## Getting Started

\`\`\`javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'your-project-url',
  'your-anon-key'
)
\`\`\`

Supabase membuat development backend menjadi sangat mudah dan cepat!`,
      slug: 'mengenal-supabase-backend-as-a-service',
      created_at: '2024-02-10T14:30:00Z',
      author: 'Nama Anda',
      tags: ['Supabase', 'Backend', 'Database'],
      featured_image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
      reading_time: 6
    },
    {
      id: '3',
      title: 'CSS Grid vs Flexbox: Kapan Menggunakan Yang Mana?',
      summary: 'Perbandingan mendalam antara CSS Grid dan Flexbox. Pelajari kelebihan masing-masing dan kapan waktu yang tepat untuk menggunakannya dalam project.',
      content: `# CSS Grid vs Flexbox: Kapan Menggunakan Yang Mana?

Dua layout system yang paling powerful di CSS modern: Grid dan Flexbox. Keduanya memiliki kelebihan dan use case yang berbeda.

## CSS Flexbox

Flexbox dirancang untuk **one-dimensional layouts**:
- Navigation bars
- Card layouts
- Centering content
- Equal height columns

### Contoh Flexbox:
\`\`\`css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
\`\`\`

## CSS Grid

Grid dirancang untuk **two-dimensional layouts**:
- Complex page layouts
- Image galleries
- Dashboard layouts
- Magazine-style layouts

### Contoh Grid:
\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
\`\`\`

## Kesimpulan

- **Flexbox**: Untuk komponen dan layout sederhana
- **Grid**: Untuk layout kompleks dan page structure

Kombinasikan keduanya untuk hasil terbaik!`,
      slug: 'css-grid-vs-flexbox-kapan-menggunakan',
      created_at: '2024-03-05T09:15:00Z',
      author: 'Nama Anda',
      tags: ['CSS', 'Layout', 'Frontend'],
      featured_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
      reading_time: 5
    },
    {
      id: '4',
      title: 'Optimasi Performance Web: Tips dan Trik untuk Developer',
      summary: 'Teknik-teknik advanced untuk meningkatkan performa website. Dari lazy loading hingga code splitting, pelajari cara membuat website yang blazing fast.',
      content: `# Optimasi Performance Web: Tips dan Trik untuk Developer

Performance adalah salah satu faktor terpenting dalam user experience. Website yang lambat = user yang pergi.

## Mengukur Performance

Tools yang bisa digunakan:
- **Lighthouse**: Audit performance secara komprehensif
- **Web Vitals**: Core metrics dari Google
- **GTmetrix**: Analysis mendalam

## Teknik Optimasi

### 1. Image Optimization
- Gunakan format modern (WebP, AVIF)
- Implement lazy loading
- Responsive images dengan srcset

### 2. Code Splitting
\`\`\`javascript
// React lazy loading
const LazyComponent = React.lazy(() => import('./Component'));
\`\`\`

### 3. Caching Strategy
- Browser caching
- CDN implementation
- Service workers

### 4. Bundle Optimization
- Tree shaking
- Minification
- Compression (Gzip/Brotli)

## Performance Budget

Set metrics target:
- **First Contentful Paint**: < 2s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

Remember: Performance is a feature, not an afterthought!`,
      slug: 'optimasi-performance-web-tips-dan-trik',
      created_at: '2024-04-12T16:45:00Z',
      author: 'Nama Anda',
      tags: ['Performance', 'Optimization', 'Web Development'],
      featured_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      reading_time: 7
    }
  ];

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        // Coba ambil dari Supabase, jika gagal gunakan dummy data
        const supabasePosts = await getBlogPosts(4);
        
        if (supabasePosts.length > 0) {
          setPosts(supabasePosts);
        } else {
          // Gunakan dummy data jika Supabase belum dikonfigurasi
          setPosts(dummyPosts);
        }
      } catch (error) {
        console.error('Error loading posts:', error);
        setPosts(dummyPosts);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const openPost = (post: Post) => {
    setSelectedPost(post);
    document.body.style.overflow = 'hidden';
  };

  const closePost = () => {
    setSelectedPost(null);
    document.body.style.overflow = 'unset';
  };

  if (loading) {
    return (
      <section id="blog" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Memuat artikel...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="blog" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="max-w-6xl mx-auto"
          >
            {/* Section Header */}
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                Blog & Artikel
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Berbagi pengalaman, tips, dan insight terbaru dalam dunia pengembangan web dan teknologi
              </p>
            </motion.div>

            {/* Featured Post */}
            {posts.length > 0 && (
              <motion.div variants={itemVariants} className="mb-16">
                <div className="bg-card rounded-2xl overflow-hidden shadow-xl">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative">
                      <img
                        src={posts[0].featured_image || 'https://via.placeholder.com/600x400/6366f1/ffffff?text=Blog+Post'}
                        alt={posts[0].title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                        Artikel Terbaru
                      </div>
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                        <span>{formatDate(posts[0].created_at)}</span>
                        <span>•</span>
                        <span>{posts[0].reading_time || calculateReadingTime(posts[0].content)} menit baca</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-4 leading-tight">
                        {posts[0].title}
                      </h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {posts[0].summary}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {posts[0].tags?.map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-primary/10 text-primary rounded text-sm font-medium">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <motion.button
                        onClick={() => openPost(posts[0])}
                        className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors w-fit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Baca Selengkapnya
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Other Posts Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {posts.slice(1).map((post) => (
                <motion.article
                  key={post.id}
                  variants={itemVariants}
                  className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  whileHover={{ y: -5 }}
                  onClick={() => openPost(post)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={post.featured_image || 'https://via.placeholder.com/400x250/6366f1/ffffff?text=Blog+Post'}
                      alt={post.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                      <span>{formatDate(post.created_at)}</span>
                      <span>•</span>
                      <span>{post.reading_time || calculateReadingTime(post.content)} menit</span>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {post.tags?.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-muted text-foreground rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>

            {/* Call to Action */}
            <motion.div variants={itemVariants} className="text-center mt-16">
              <p className="text-muted-foreground mb-6">
                Ingin membaca lebih banyak artikel menarik?
              </p>
              <motion.button
                className="px-8 py-3 border-2 border-primary text-primary rounded-full font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Lihat Semua Artikel
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Blog Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePost}
          >
            <motion.div
              className="bg-card rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>{formatDate(selectedPost.created_at)}</span>
                  <span>•</span>
                  <span>{selectedPost.reading_time || calculateReadingTime(selectedPost.content)} menit baca</span>
                </div>
                <button
                  onClick={closePost}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {selectedPost.featured_image && (
                  <img
                    src={selectedPost.featured_image}
                    alt={selectedPost.title}
                    className="w-full h-64 object-cover rounded-xl mb-6"
                  />
                )}
                
                <h1 className="text-3xl font-bold mb-4">{selectedPost.title}</h1>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedPost.tags?.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="prose prose-lg max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: selectedPost.content.replace(/\n/g, '<br/>') }} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Blog;
