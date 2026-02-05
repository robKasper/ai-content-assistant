export const getCreatePrompt = (
  topic: string,
  keyword: string
) => `You are an expert SEO content strategist. Generate a comprehensive blog post outline for the following:

Topic: ${topic}
Target Keyword: ${keyword}

Please provide:
1. 5 catchy, SEO-optimized title options (each incorporating the target keyword naturally)
2. A compelling meta description (150-160 characters)
3. A detailed blog post outline with:
   - Introduction hook
   - 5-7 main sections (H2 headings) with 3-4 bullet points each
   - Conclusion with call-to-action
4. Suggested word count

Make it actionable, engaging, and optimized for search engines. Use the target keyword naturally throughout.`;
