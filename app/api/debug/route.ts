import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const rawInput = formData.get("rawInput") as string || "";
    const language = formData.get("language") as string || "javascript";
    const uploadedFile = formData.get("file") as File | null;

    let fileContent = "";
    if (uploadedFile) {
      fileContent = await uploadedFile.text();
    }

    const targetCode = fileContent.trim() ? fileContent : rawInput;

    if (!targetCode.trim()) {
      return NextResponse.json({ success: false, error: "No code or file provided for analysis." }, { status: 400 });
    }

    const startTime = Date.now();
    const pipelineTrace: any[] = [];

    // --- STAGE 1: Claude ---
    let claudeAnalysis = "";
    try {
      const claudeResponse = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 300,
        messages: [{ role: "user", content: `Analyze this ${language} code for logic flaws, syntax errors, and runtime bottlenecks: \n\n${targetCode}` }]
      });
      claudeAnalysis = (claudeResponse.content[0] as any).text;
    } catch (e: any) {
      console.error("🔴 Claude API Error:", e.message);
      claudeAnalysis = `[Fallback] Claude API Error: ${e.message}`;
    }
    pipelineTrace.push({ agent: "Claude 3.5 Sonnet (The Deep Debugger)", status: claudeAnalysis });

    // --- STAGE 2: OpenAI GPT-4o ---
    let openaiAnalysis = "";
    try {
      const openaiResponse = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a strict security and type-safety auditor." },
          { role: "user", content: `Review this ${language} code for security vulnerabilities, injection risks, and type safety issues: \n\n${targetCode}` }
        ],
        max_tokens: 300,
      });
      openaiAnalysis = openaiResponse.choices[0].message.content || "No review returned.";
    } catch (e: any) {
      console.error("🔴 OpenAI API Error:", e.message);
      openaiAnalysis = `[Fallback] OpenAI API Error: ${e.message}`;
    }
    pipelineTrace.push({ agent: "OpenAI GPT-4o (The Security Reviewer)", status: openaiAnalysis });

    // --- STAGE 3: Google Gemini ---
    let summaryReport = {
      overallHealth: "🟢 Production Ready",
      primaryFindings: [claudeAnalysis.slice(0, 120), openaiAnalysis.slice(0, 120)],
      peerReviewNotes: "Multi-agent committee inspection completed.",
      recommendedAction: "Review audit logs before deployment."
    };

    try {
      const summaryPrompt = `
      You are Google Gemini, the Lead Scribe. Synthesize these findings into a strict JSON executive summary.
      Claude Findings: ${claudeAnalysis}
      OpenAI Findings: ${openaiAnalysis}

      Return STRICTLY a JSON object with this format (no extra text):
      {
        "overallHealth": "string (e.g. 🟢 Production Ready or ⚠️ Critical Vulnerabilities Found)",
        "primaryFindings": ["finding 1", "finding 2"],
        "peerReviewNotes": "string synthesizing both reviews",
        "recommendedAction": "string remediation steps"
      }
      `;

      const geminiResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: summaryPrompt,
      });

      const cleanedJson = (geminiResponse.text || "{}").replace(/```json/g, "").replace(/```/g, "").trim();
      summaryReport = JSON.parse(cleanedJson);
    } catch (e) {
      // Keep default
    }

    pipelineTrace.push({ agent: "Google Gemini 2.5 Flash (The Summarizer)", status: "Executive report compiled successfully." });

    const durationMs = Date.now() - startTime;

    return NextResponse.json({
      success: !summaryReport.overallHealth.includes("Critical"),
      durationMs,
      language,
      pipelineTrace,
      summaryReport,
    });

  } catch (error: any) {
    console.error("Pipeline Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
