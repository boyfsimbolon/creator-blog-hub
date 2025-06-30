import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Post } from '../types';
import { getBlogPosts, formatDate, calculateReadingTime } from '../lib/supabase';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Data dummy untuk demo
  const dummyPosts: Post[] = [
    // Your dummy posts here
  ];

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const supabasePosts = await getBlogPosts(showAll ? undefined : 4);
        
        if (supabasePosts.length > 0) {
          setPosts(supabasePosts);
        } else {
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
  }, [showAll]);

  const handleShowAll = () => {
    setLoading(true);
    setShowAll(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -8,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
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
      <section id="blog" className="py-20 bg-muted/30 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="rounded-full h-12 w-12 border-b-2 border-primary mx-auto"
            />
            <motion.p 
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
              className="mt-4 text-muted-foreground"
            >
              Sedang memuat artikel...
            </motion.p>
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
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="max-w-7xl mx-auto"
          >
            {/* Section Header */}
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  Blog & Artikel
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Berbagi pengalaman, tips, dan insight terbaru dalam dunia pengembangan web dan teknologi
              </p>
            </motion.div>

            {/* Featured Post */}
            {posts.length > 0 && (
              <motion.div 
                variants={itemVariants} 
                className="mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div 
                  className="bg-card rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                  whileHover="hover"
                  variants={{
                    hover: {
                      scale: 1.01,
                      transition: { duration: 0.3 }
                    }
                  }}
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-64 md:h-auto">
                      <img
                        src={posts[0].featured_image || '/default-blog.jpg'}
                        alt={posts[0].title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                        Artikel Terbaru
                      </div>
                    </div>
                    <div className="p-6 md:p-8 flex flex-col justify-center">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                        <span>{formatDate(posts[0].created_at)}</span>
                        <span>•</span>
                        <span>{posts[0].reading_time || calculateReadingTime(posts[0].content)} menit baca</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                        {posts[0].title}
                      </h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-3">
                        {posts[0].summary}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {posts[0].tags?.map((tag) => (
                          <span 
                            key={tag} 
                            className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <motion.button
                        onClick={() => openPost(posts[0])}
                        className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity w-fit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Baca artikel ${posts[0].title}`}
                      >
                        Baca Selengkapnya
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Posts Grid - 2 cards per row on mobile */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {posts.slice(1).map((post) => (
                <motion.article
                  key={post.id}
                  variants={itemVariants}
                  className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  whileHover="hover"
                  variants={cardHoverVariants}
                  onClick={() => openPost(post)}
                  role="button"
                  aria-label={`Baca artikel ${post.title}`}
                  layout
                >
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={post.featured_image || '/default-blog.jpg'}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center space-x-3 text-sm text-muted-foreground mb-3">
                      <span>{formatDate(post.created_at)}</span>
                      <span>•</span>
                      <span>{post.reading_time || calculateReadingTime(post.content)} menit</span>
                    </div>
                    <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {post.tags?.slice(0, 3).map((tag) => (
                        <span 
                          key={tag} 
                          className="px-2 py-1 bg-muted text-foreground rounded-full text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>

            {/* Call to Action */}
            {!showAll && posts.length >= 4 && (
              <motion.div 
                variants={itemVariants} 
                className="text-center mt-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <p className="text-muted-foreground mb-6">
                  Ingin membaca lebih banyak artikel menarik?
                </p>
                <motion.button
                  onClick={handleShowAll}
                  className="px-8 py-3 border-2 border-primary text-primary rounded-full font-medium hover:bg-primary hover:text-white transition-colors relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 5px 15px rgba(99, 102, 241, 0.3)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Lihat semua artikel"
                >
                  <span className="relative z-10">Lihat Semua Artikel</span>
                  <motion.span
                    className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.1 }}
                  />
                </motion.button>
              </motion.div>
            )}
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
              className="bg-card rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                transition: { type: 'spring', damping: 25 }
              }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              layoutId={`card-${selectedPost.id}`}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-card/90 backdrop-blur-sm border-b border-border p-4 sm:p-6 flex items-center justify-between z-10">
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <span>{formatDate(selectedPost.created_at)}</span>
                  <span>•</span>
                  <span>{selectedPost.reading_time || calculateReadingTime(selectedPost.content)} menit baca</span>
                </div>
                <motion.button
                  onClick={closePost}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Tutup modal"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {selectedPost.featured_image && (
                  <motion.div 
                    className="relative rounded-xl overflow-hidden mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <img
                      src={selectedPost.featured_image}
                      alt={selectedPost.title}
                      className="w-full h-64 object-cover"
                      loading="lazy"
                    />
                  </motion.div>
                )}
                <motion.h1 
                  className="text-2xl sm:text-3xl font-bold mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {selectedPost.title}
                </motion.h1>
                <motion.div 
                  className="flex flex-wrap gap-2 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {selectedPost.tags?.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </motion.div>
                <motion.div 
                  className="prose prose-lg max-w-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div dangerouslySetInnerHTML={{ __html: selectedPost.content.replace(/\n/g, '<br/>') }} />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Blog;