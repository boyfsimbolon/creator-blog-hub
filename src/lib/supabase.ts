
import { createClient } from '@supabase/supabase-js';
import { Post, Project, Skill } from '../types';

// Konfigurasi Supabase
// PENTING: Ganti dengan kredensial Supabase yang sebenarnya
const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Blog Functions
export const getBlogPosts = async (limit?: number): Promise<Post[]> => {
  try {
    let query = supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (limit) {
      query = query.limit(limit);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in getBlogPosts:', error);
    return [];
  }
};

export const getBlogPostBySlug = async (slug: string): Promise<Post | null> => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error in getBlogPostBySlug:', error);
    return null;
  }
};

export const createBlogPost = async (post: Omit<Post, 'id' | 'created_at'>): Promise<Post | null> => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .insert([post])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating blog post:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error in createBlogPost:', error);
    return null;
  }
};

// Project Functions
export const getProjects = async (featured?: boolean): Promise<Project[]> => {
  try {
    let query = supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (featured !== undefined) {
      query = query.eq('featured', featured);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in getProjects:', error);
    return [];
  }
};

// Skills Functions
export const getSkills = async (): Promise<Skill[]> => {
  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('level', { ascending: false });
    
    if (error) {
      console.error('Error fetching skills:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in getSkills:', error);
    return [];
  }
};

// Contact Form Function
export const submitContactForm = async (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('contact_submissions')
      .insert([{
        ...formData,
        submitted_at: new Date().toISOString()
      }]);
    
    if (error) {
      console.error('Error submitting contact form:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in submitContactForm:', error);
    return false;
  }
};

// Search Function
export const searchBlogPosts = async (query: string): Promise<Post[]> => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .or(`title.ilike.%${query}%,content.ilike.%${query}%,summary.ilike.%${query}%`)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error searching blog posts:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in searchBlogPosts:', error);
    return [];
  }
};

// Analytics Function (optional)
export const incrementPageView = async (page: string): Promise<void> => {
  try {
    await supabase
      .from('page_views')
      .insert([{
        page,
        viewed_at: new Date().toISOString()
      }]);
  } catch (error) {
    console.error('Error incrementing page view:', error);
  }
};

// Newsletter Subscription (optional)
export const subscribeToNewsletter = async (email: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert([{
        email,
        subscribed_at: new Date().toISOString()
      }]);
    
    if (error) {
      console.error('Error subscribing to newsletter:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in subscribeToNewsletter:', error);
    return false;
  }
};

// Helper function untuk generate slug
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Helper function untuk format tanggal
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Helper function untuk menghitung reading time
export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};
