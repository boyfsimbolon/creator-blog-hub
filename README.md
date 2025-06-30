
# 🚀 Portofolio & Blog Pribadi

Website portofolio dan blog pribadi yang modern, responsif, dan SEO-friendly. Dibangun dengan React, TypeScript, Tailwind CSS, dan terintegrasi dengan Supabase untuk manajemen konten blog.

## ✨ Fitur Utama

- **🎨 Design Modern**: UI/UX yang clean dengan animasi smooth menggunakan Framer Motion
- **📱 Fully Responsive**: Tampil sempurna di semua perangkat (mobile, tablet, desktop)
- **🌓 Dark/Light Mode**: Toggle tema dengan transisi yang halus
- **⚡ Performance Optimized**: Fast loading dengan lazy loading dan code splitting
- **🔍 SEO Ready**: Meta tags dinamis, sitemap, dan schema markup
- **📝 Blog System**: Terintegrasi dengan Supabase untuk manajemen artikel
- **📊 Analytics Ready**: Page view tracking dan form submission
- **🎯 TypeScript**: Type safety untuk development yang lebih robust

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool & Dev Server
- **Tailwind CSS** - Styling Framework
- **Framer Motion** - Animations
- **React Helmet Async** - SEO Management

### Backend & Database
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Database (via Supabase)
- **Real-time Subscriptions** - Live updates

### Additional Tools
- **React Router** - Client-side routing
- **React Query** - Data fetching & caching
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 atau lebih baru)
- npm atau yarn
- Akun Supabase (opsional untuk demo)

### Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/yourusername/portfolio-blog.git
   cd portfolio-blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   - Buat file `.env.local` (opsional, untuk production)
   - Atau edit `src/lib/supabase.ts` dengan kredensial Supabase Anda

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   - Buka http://localhost:8080

## 🗄️ Setup Supabase (Opsional)

Jika ingin menggunakan Supabase untuk blog system:

### 1. Buat Project Supabase
- Daftar di [supabase.com](https://supabase.com)
- Buat project baru
- Copy URL dan Anon Key

### 2. Setup Database Tables

```sql
-- Tabel untuk blog posts
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  summary TEXT,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  author TEXT,
  tags TEXT[],
  featured_image TEXT,
  reading_time INTEGER
);

-- Tabel untuk projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT,
  demo_url TEXT,
  github_url TEXT,
  technologies TEXT[],
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel untuk skills
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  level INTEGER NOT NULL CHECK (level >= 0 AND level <= 100),
  category TEXT NOT NULL CHECK (category IN ('frontend', 'backend', 'tools', 'other')),
  icon TEXT
);

-- Tabel untuk contact form submissions
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel untuk page views (analytics)
CREATE TABLE page_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page TEXT NOT NULL,
  viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel untuk newsletter subscribers (opsional)
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Update Kredensial
Edit file `src/lib/supabase.ts`:
```typescript
const SUPABASE_URL = 'your-project-url';
const SUPABASE_ANON_KEY = 'your-anon-key';
```

## 📁 Struktur Project

```
portfolio-blog/
├── public/
│   ├── sitemap.xml          # SEO sitemap
│   └── robots.txt           # Search engine directives
├── src/
│   ├── components/          # React components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Blog.tsx
│   │   ├── Skills.tsx
│   │   ├── Contact.tsx
│   │   ├── SEO.tsx
│   │   └── ThemeToggle.tsx
│   ├── lib/
│   │   └── supabase.ts      # Supabase client & functions
│   ├── pages/
│   │   ├── Index.tsx        # Main landing page
│   │   └── NotFound.tsx     # 404 page
│   ├── types/
│   │   └── index.ts         # TypeScript type definitions
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── package.json
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## 🎨 Customization

### 1. Personal Information
Edit komponen-komponen berikut untuk mengganti informasi pribadi:
- `src/components/Hero.tsx` - Nama, tagline, dan deskripsi
- `src/components/About.tsx` - Pengalaman kerja dan pendidikan
- `src/components/Contact.tsx` - Informasi kontak dan social media
- `src/pages/Index.tsx` - Footer information

### 2. Styling & Colors
- Edit `src/index.css` untuk mengubah color scheme
- Modify `tailwind.config.ts` untuk custom animations dan utilities
- Update `src/components/ThemeToggle.tsx` untuk theme customization

### 3. Content
- Tambahkan data dummy di setiap komponen (jika tidak menggunakan Supabase)
- Upload gambar ke folder `public/` atau gunakan CDN
- Edit meta tags di `src/components/SEO.tsx`

## 🚀 Deployment

### Vercel (Recommended)
1. Push ke GitHub repository
2. Connect repository di [vercel.com](https://vercel.com)
3. Deploy otomatis akan berjalan

### Netlify
1. Build project: `npm run build`
2. Upload folder `dist/` ke Netlify
3. Setup redirects untuk SPA

### Manual Deployment
```bash
npm run build
# Upload folder dist/ ke hosting provider
```

## 📊 SEO Features

- ✅ Meta tags dinamis
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ Canonical URLs
- ✅ Schema markup (JSON-LD)
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Alt text untuk gambar
- ✅ Semantic HTML structure
- ✅ Page loading optimization

## 🔧 Development Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Type checking
npm run type-check
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI Library
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Framer Motion](https://www.framer.com/motion/) - Animation Library
- [Supabase](https://supabase.com/) - Backend-as-a-Service
- [Lucide React](https://lucide.dev/) - Icon Library
- [Vercel](https://vercel.com/) - Deployment Platform

## 📞 Support

Jika Anda memiliki pertanyaan atau butuh bantuan:
- 📧 Email: your.email@example.com
- 💬 WhatsApp: +62 812-3456-7890
- 🐦 Twitter: [@yourusername](https://twitter.com/yourusername)

---

**Happy Coding! 🚀**
