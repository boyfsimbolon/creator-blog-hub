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
