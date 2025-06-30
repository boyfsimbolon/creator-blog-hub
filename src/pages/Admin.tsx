
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { generateSlug } from '@/lib/supabase';
import { Post } from '@/types';

const blogSchema = z.object({
  title: z.string().min(1, 'Judul harus diisi'),
  summary: z.string().min(1, 'Ringkasan harus diisi'),
  content: z.string().min(1, 'Konten harus diisi'),
  tags: z.string().min(1, 'Tags harus diisi'),
  featured_image: z.string().url('URL gambar tidak valid').optional(),
  author: z.string().min(1, 'Nama penulis harus diisi'),
});

type BlogFormData = z.infer<typeof blogSchema>;

const Admin: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      author: 'Boy Full Simbolon'
    }
  });

  const onSubmit = async (data: BlogFormData) => {
    setIsSubmitting(true);
    
    try {
      // Create new post object
      const newPost: Omit<Post, 'id' | 'created_at'> = {
        title: data.title,
        summary: data.summary,
        content: data.content,
        slug: generateSlug(data.title),
        author: data.author,
        tags: data.tags.split(',').map(tag => tag.trim()),
        featured_image: data.featured_image || undefined,
        reading_time: Math.ceil(data.content.split(' ').length / 200)
      };

      // TODO: Integrate with Supabase when connected
      console.log('New post created:', newPost);
      
      toast({
        title: 'Berhasil!',
        description: 'Artikel baru telah dibuat successfully.',
      });
      
      // Reset form
      reset();
      
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: 'Error',
        description: 'Gagal membuat artikel. Silakan coba lagi.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Buat Artikel Baru</title>
        <meta name="description" content="Dashboard admin untuk mengelola artikel blog" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                Admin Dashboard
              </h1>
              <p className="text-lg text-muted-foreground">
                Buat dan kelola artikel blog Anda
              </p>
            </div>

            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Buat Artikel Baru</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Judul Artikel *</Label>
                    <Input
                      id="title"
                      {...register('title')}
                      placeholder="Masukkan judul artikel..."
                      className="text-lg"
                    />
                    {errors.title && (
                      <p className="text-sm text-destructive">{errors.title.message}</p>
                    )}
                  </div>

                  {/* Summary */}
                  <div className="space-y-2">
                    <Label htmlFor="summary">Ringkasan *</Label>
                    <Textarea
                      id="summary"
                      {...register('summary')}
                      placeholder="Tulis ringkasan singkat artikel..."
                      className="min-h-[100px]"
                    />
                    {errors.summary && (
                      <p className="text-sm text-destructive">{errors.summary.message}</p>
                    )}
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <Label htmlFor="content">Konten *</Label>
                    <Textarea
                      id="content"
                      {...register('content')}
                      placeholder="Tulis konten artikel lengkap..."
                      className="min-h-[300px]"
                    />
                    {errors.content && (
                      <p className="text-sm text-destructive">{errors.content.message}</p>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags *</Label>
                    <Input
                      id="tags"
                      {...register('tags')}
                      placeholder="React, JavaScript, Web Development (pisahkan dengan koma)"
                    />
                    {errors.tags && (
                      <p className="text-sm text-destructive">{errors.tags.message}</p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      Pisahkan setiap tag dengan koma
                    </p>
                  </div>

                  {/* Featured Image */}
                  <div className="space-y-2">
                    <Label htmlFor="featured_image">URL Gambar Utama</Label>
                    <Input
                      id="featured_image"
                      {...register('featured_image')}
                      placeholder="https://example.com/image.jpg"
                      type="url"
                    />
                    {errors.featured_image && (
                      <p className="text-sm text-destructive">{errors.featured_image.message}</p>
                    )}
                  </div>

                  {/* Author */}
                  <div className="space-y-2">
                    <Label htmlFor="author">Penulis *</Label>
                    <Input
                      id="author"
                      {...register('author')}
                      placeholder="Nama penulis"
                    />
                    {errors.author && (
                      <p className="text-sm text-destructive">{errors.author.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1"
                    >
                      {isSubmitting ? 'Menyimpan...' : 'Buat Artikel'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => reset()}
                      disabled={isSubmitting}
                    >
                      Reset
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="mt-8 bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    i
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">
                      Integrasi Supabase
                    </h3>
                    <p className="text-blue-700 text-sm">
                      Saat ini artikel disimpan secara lokal. Untuk menyimpan ke database dan menampilkan di blog,
                      hubungkan project Anda dengan Supabase melalui tombol hijau di pojok kanan atas.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Admin;
