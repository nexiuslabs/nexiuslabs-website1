# NEXIUS Labs Website

A modern, responsive website for NEXIUS Labs - an AI consulting company that helps businesses implement AI-driven automation and intelligent insights.

## 🚀 Features

- **Modern Design**: Clean, professional design with dark theme and nexius brand colors
- **Full-Stack Integration**: React frontend with Supabase backend
- **Content Management**: Admin portal for managing articles, events, images, and leads
- **AI-Powered Chat**: Live chat widget with AI responses powered by OpenAI
- **Event Management**: Complete event creation, registration, and payment processing
- **Blog System**: Rich text editor for creating and publishing articles
- **Contact Forms**: Lead capture with automated email confirmations
- **Email Integration**: Automated email notifications and confirmations
- **Payment Processing**: Stripe integration for event ticket sales
- **Real-time Features**: Live chat and notifications using Supabase realtime
- **SEO Optimized**: Proper meta tags, sitemap, and robots.txt

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **Lucide React** for icons
- **TipTap** for rich text editing

### Backend
- **Supabase** for database, authentication, and storage
- **Edge Functions** for serverless API endpoints
- **Row Level Security (RLS)** for data protection

### Integrations
- **OpenAI** for AI chat responses
- **Stripe** for payment processing
- **SMTP** for email delivery
- **Netlify** for deployment

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ArticleEditor.tsx    # Rich text editor for articles
│   ├── Chat.tsx            # Live chat widget
│   ├── ContactForm.tsx     # Lead capture form
│   ├── EventForm.tsx       # Event creation/editing
│   ├── HeroAnimation.tsx   # Animated background
│   ├── ImageUpload.tsx     # File upload component
│   └── RotatingText.tsx    # Animated text rotation
├── lib/                 # Utility functions and API calls
│   ├── supabase.ts         # Supabase client setup
│   ├── articles.ts         # Article CRUD operations
│   ├── events.ts           # Event CRUD operations
│   ├── chats.ts            # Chat functionality
│   └── storage.ts          # File upload handling
├── pages/               # Route components
│   ├── AdminPage.tsx       # Admin dashboard
│   ├── Blog.tsx            # Blog listing
│   ├── BlogPost.tsx        # Individual blog post
│   ├── Events.tsx          # Events listing
│   ├── EventDetail.tsx     # Individual event page
│   └── LinksPage.tsx       # Social links page
├── types/               # TypeScript type definitions
└── App.tsx             # Main application component
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Stripe account (for payments)
- OpenAI API key (for chat)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nexius-labs-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

### Supabase Setup

1. **Database Setup**
   - The database schema is automatically managed through migrations
   - Key tables: `articles`, `events`, `leads`, `chat_sessions`, `chat_messages`, `images`

2. **Storage Configuration**
   - Create a `website-images` bucket for file uploads
   - Configure appropriate policies for public access

3. **Edge Functions**
   - Deploy the included edge functions for chat AI, email sending, and payment processing
   - Configure environment variables for each function

## 🎨 Design System

### Color Palette
- **Primary**: Deep Navy Blue (`#1D2A4D`) - Trust and sophistication
- **Secondary**: Electric Teal (`#00CABA`) - Modern, tech-forward feel
- **Dark Theme**: Custom dark color scheme for modern appearance
- **Neutrals**: Cool grays and whites for contrast

### Typography
- **Headlines**: Montserrat (bold, geometric)
- **Body**: Inter (clean, readable)
- **Sizing**: Responsive typography scale

### Components
- Consistent 8px spacing system
- Rounded corners and subtle shadows
- Hover states and micro-interactions
- Responsive design patterns

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality
- TypeScript for type safety
- ESLint for code quality
- Consistent formatting and naming conventions
- Component-based architecture

## 🌐 Deployment

The site is configured for deployment on Netlify with:
- Automatic builds from main branch
- Redirect rules for SPA routing
- Environment variable management
- Custom domain support

## 📊 Features Overview

### Public Features
- **Homepage**: Hero with rotating text, service overview, testimonials
- **Blog**: Article listing and individual post pages
- **Events**: Event listings with registration and payment
- **Case Studies**: Success story showcases
- **Contact**: Lead capture forms
- **Live Chat**: AI-powered chat widget

### Admin Features
- **Content Management**: Create/edit articles, events, case studies
- **Lead Management**: View and manage contact form submissions
- **Chat Management**: Respond to live chat conversations
- **Image Management**: Upload and organize website assets
- **Analytics**: Basic tracking and reporting

### AI Integration
- **Smart Chat**: OpenAI-powered responses to visitor questions
- **Content Assistance**: AI helps with content creation and optimization
- **Lead Qualification**: Intelligent lead scoring and routing

## 🔒 Security

- Row Level Security (RLS) on all database tables
- Secure authentication with Supabase Auth
- API key protection and rotation
- Input validation and sanitization
- HTTPS enforcement

## 📈 Performance

- Optimized bundle size with code splitting
- Image optimization and lazy loading
- Efficient database queries with proper indexing
- CDN delivery for static assets
- Responsive images and modern formats

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential. All rights reserved by NEXIUS Labs Pte Ltd.

## 📞 Support

For technical support or questions:
- Email: support@nexiuslabs.com
- Documentation: [Internal Wiki]
- Issues: Use GitHub Issues for bug reports

---

Built with ❤️ by the NEXIUS Labs team.