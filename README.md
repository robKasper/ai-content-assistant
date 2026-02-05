# AI Content Assistant

An AI-powered content generation tool that creates SEO-optimized blog outlines using Claude. Built with Next.js, Supabase, and the Anthropic SDK.

**[View Live Demo →](https://ai-content-assistant-rk.vercel.app)**

![AI Content Assistant](public/screenshots/dashboard.png)

## Features

- **AI-Powered Outlines** - Generate comprehensive blog outlines with SEO-optimized titles, meta descriptions, and structured sections
- **Real-time Streaming** - Watch content generate in real-time with streaming responses
- **Authentication** - Secure login/signup with Supabase Auth
- **Generation History** - View, search, copy, and delete past generations
- **Credit System** - 10 free generations per user
- **Mobile-Friendly** - Responsive design across all pages

## Screenshots

| Dashboard | Generation History |
|-----------|-------------------|
| ![Dashboard](public/screenshots/dashboard.png) | ![History](public/screenshots/history.png) |

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS 4, Radix UI
- **Auth & Database**: Supabase
- **AI**: Anthropic Claude SDK

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase account
- Anthropic API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/robKasper/ai-content-assistant.git
   cd ai-content-assistant
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` with your credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ANTHROPIC_API_KEY=your_anthropic_api_key
   ```

4. Set up Supabase database:
   - Create a `generations` table with columns: `id`, `user_id`, `topic`, `keyword`, `output`, `created_at`
   - Enable Row Level Security (RLS) for user-specific access

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── page.tsx              # Landing page
├── auth/
│   ├── login/page.tsx    # Login page
│   └── signup/page.tsx   # Signup page
├── dashboard/page.tsx    # Main generation interface
├── history/page.tsx      # Generation history
└── api/generate/route.ts # AI generation endpoint

components/
├── ui/                   # Reusable UI components
└── AuthCard.tsx          # Shared auth form component

lib/
├── supabase/             # Supabase client config
└── prompts/              # AI prompt templates
```

## Deployment

Deployed on Vercel: **[ai-content-assistant-rk.vercel.app](https://ai-content-assistant-rk.vercel.app)**

Deploy your own:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/robKasper/ai-content-assistant)

Remember to add environment variables in the Vercel dashboard.

## License

MIT
