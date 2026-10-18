# 🤖 Multi-Agent AI Code Debugger & Inspection Pipeline

An enterprise-grade, multi-model AI debugging pipeline built with Next.js 15, TypeScript, and Tailwind CSS. It orchestrates three specialized LLM agents—Claude 3.5 Sonnet, OpenAI GPT-4o, and Google Gemini 2.5 Flash—to analyze raw code or uploaded source files, execute security and architectural audits, and compile executive synthesis reports.

## 🚀 Key Features
* Multi-Agent Committee: Claude 3.5 Sonnet, OpenAI GPT-4o, and Google Gemini.
* Resilient Architecture: Smart fallback error handling for API rate limits and credit constraints.
* Dynamic File Ingestion: Client-side FileReader supporting JS, TS, Python, and HTML files.

## ⚙️ Getting Started
1. Run `npm install`
2. Configure `.env.local` with your API keys.
3. Run `npm run dev` and open http://localhost:3000.
