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
import { supabase } from '@/lib/supabase';
import { Post } from '@/types';

// Schema validation with file input for Base64 conversion
const blogSchema = z.object({
  title: z.string().min(1, 'Judul harus diisi'),
  summary: z.string().min(1, 'Ringkasan harus diisi'),
  content: z.string().min(1, 'Konten harus diisi'),
  tags: z.string().min(1, 'Tags harus diisi'),
  featured_image: z
    .any()
    .optional(),
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
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      author: 'Boy Full Simbolon',
    },
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  // Convert file to Base64 with size logging
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileSizeKB = (file.size / 1024).toFixed(2);
      console.log(`File size: ${file.size} bytes (${fileSizeKB} KB)`);

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64SizeKB = (result.length / 1024).toFixed(2);
        console.log(`Base64 size: ${result.length} bytes (${base64SizeKB} KB)`);

        // Check Base64 size (allow up to 1.5 MB to account for encoding overhead)
        if (result.length > 1_500_000) {
          reject(new Error(`Ukuran data Base64 melebihi batas 1.5 MB: ${base64SizeKB} KB`));
        } else {
          resolve(result);
        }
      };
      reader.onerror = () => reject(new Error('Gagal mengonversi gambar ke Base64'));
      reader.readAsDataURL(file);
    });
  };

  const onSubmit = async (data: BlogFormData) => {
  setIsSubmitting(true);
  console.log('📥 Data form sebelum diproses:', data);

  try {
    let imageBase64: string | undefined;

    // Convert file to Base64 if provided
    const file = data.featured_image?.[0];
    if (file) {
      console.log(`📁 File yang dipilih: ${file.name}`);
      try {
        imageBase64 = await convertToBase64(file);
      } catch (error: any) {
        throw new Error(`Gagal mengonversi gambar: ${error.message}`);
      }
    } else {
      console.log('⚠️ Tidak ada file gambar dipilih.');
    }

    // Build newPost object
    const newPost: Omit<Post, 'id' | 'created_at'> = {
      title: data.title,
      summary: data.summary,
      content: data.content,
      slug: generateSlug(data.title),
      author: data.author,
      tags: data.tags.split(',').map((tag) => tag.trim()),
      featured_image: imageBase64,
      reading_time: Math.ceil(data.content.split(' ').length / 200),
    };

    console.log('📤 Payload yang dikirim ke Supabase:', newPost);

    // Insert to Supabase
    const { error: insertError } = await supabase.from('posts').insert([newPost]);

    if (insertError) {
      console.error('❌ Supabase insert error:', insertError);
      throw new Error(`Gagal menyimpan artikel: ${insertError.message}`);
    }

    toast({
      title: 'Berhasil!',
      description: 'Artikel baru telah dibuat dan disimpan ke Supabase.',
    });

    reset();
  } catch (error: any) {
    console.error('❌ Error saat membuat post:', error);
    toast({
      title: 'Error',
      description: error.message || 'Gagal membuat artikel. Silakan coba lagi.',
      variant: 'destructive',
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
        <meta name="keywords" content="admin, blog, Supabase, artikel" />
        <link rel="canonical" content="https://yourwebsite.com/admin" />
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
                      placeholder="React, JavaScript, Web Development (pisahkan denganbesar koma)"
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
                    <Label htmlFor="featured_image">Gambar Utama</Label>
                    <Input
                      id="featured_image"
                      type="file"
                      accept="image/jpeg,image/png,image/gif"
                      {...register('featured_image')}
                      multiple={false}
                    />
                    {errors.featured_image && (
                      <p className="text-sm text-destructive">{errors.featured_image.message}</p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      Maksimum 1 MB, format JPEG, PNG, atau GIF. Gambar akan dikonversi ke Base64.
                    </p>
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
                      aria-label={isSubmitting ? 'Menyimpan artikel...' : 'Buat artikel baru'}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin mr-2 h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Menyimpan...
                        </span>
                      ) : (
                        'Buat Artikel'
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => reset()}
                      disabled={isSubmitting}
                      aria-label="Reset formulir"
                    >
                      Reset
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Admin;