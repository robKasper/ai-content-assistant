# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

This is a Next.js 16 AI content generation app with Supabase authentication and Anthropic Claude integration.

### Key Directories

- `app/` - Next.js App Router pages and API routes
- `components/ui/` - Reusable UI components (Button, Card, Input, etc.)
- `lib/supabase/` - Supabase client configuration (client.ts for browser, server.ts for server-side)
- `lib/prompts/` - AI prompt templates

### Core Flow

1. Users authenticate via `/auth/login` or `/auth/signup` using Supabase Auth
2. Dashboard (`/dashboard`) allows authenticated users to generate SEO blog outlines
3. API route `/api/generate` streams Claude responses using the Anthropic SDK
4. Generations are stored in Supabase `generations` table with a 10-credit limit per user

### Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `ANTHROPIC_API_KEY` - Anthropic API key for Claude

### Tech Stack

- Next.js 16 with App Router
- React 19
- Supabase (auth + database)
- Anthropic Claude SDK (streaming)
- Tailwind CSS 4
- Radix UI components

### Path Aliases

`@/*` maps to the project root (configured in tsconfig.json)
