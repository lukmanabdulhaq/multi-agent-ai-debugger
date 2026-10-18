'use client';

import React, { useState } from "react";

export default function PipelineDebugger() {
  const [language, setLanguage] = useState("javascript");
  const [inputCode, setInputCode] = useState(`async function loadData() {\n  const data = eval("getData()");\n  return data;\n}`);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  // Automatically read file content and paste it into the code editor text area
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    // Auto-detect language based on file extension
    if (file.name.endsWith(".html") || file.name.endsWith(".htm")) {
      setLanguage("html");
    } else if (file.name.endsWith(".ts") || file.name.endsWith(".tsx")) {
      setLanguage("typescript");
    } else if (file.name.endsWith(".py")) {
      setLanguage("python");
    } else if (file.name.endsWith(".js") || file.name.endsWith(".jsx")) {
      setLanguage("javascript");
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string || "";
      setInputCode(content); // Pasts the file code directly into the box!
    };
    reader.readAsText(file);
  };

  const handleRunPipeline = async () => {
    setLoading(true);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append("rawInput", inputCode);
      formData.append("language", language);

      const res = await fetch("/api/debug", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ color: "#111" }}>🤖 Real-Time Multi-Agent Debugging Pipeline</h1>
      <p style={{ color: "#555" }}>Powered live by Claude, OpenAI, and Google Gemini with automatic file code extraction.</p>

      <div style={{ marginBottom: "15px", display: "flex", gap: "15px", alignItems: "center", flexWrap: "wrap" }}>
        <div>
          <label style={{ fontWeight: "bold", marginRight: "8px" }}>Language:</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} style={{ padding: "5px" }}>
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="html">HTML</option>
          </select>
        </div>

        <div>
          <label style={{ fontWeight: "bold", marginRight: "8px" }}>Upload & Paste File Code:</label>
          <input 
            type="file" 
            onChange={handleFileChange} 
            style={{ fontSize: "14px" }}
          />
        </div>
        {fileName && <span style={{ fontSize: "13px", color: "#2e7d32", fontWeight: "bold" }}>Loaded: {fileName}</span>}
      </div>

      <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Target Code Workspace:</label>
      <textarea
        rows={10}
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
        placeholder="Paste code or upload a file above to auto-populate code here..."
        style={{ width: "100%", padding: "12px", fontFamily: "monospace", borderRadius: "5px", border: "1px solid #ccc", background: "#fdfdfd", color: "#111" }}
      />

      <button
        onClick={handleRunPipeline}
        disabled={loading}
        style={{ marginTop: "12px", padding: "12px 24px", background: "#7928ca", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px" }}
      >
        {loading && <span>⏳</span>}
        {loading ? "Multi-Agent Committee is Analyzing..." : "Execute Live AI Pipeline"}
      </button>

      {/* Thinking State Animation while loading */}
      {loading && (
        <div style={{ marginTop: "30px", background: "#111", color: "#fff", padding: "20px", borderRadius: "8px" }}>
          <h3>🧠 Multi-Agent Committee is Thinking...</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "15px" }}>
            <div style={{ background: "#222", padding: "10px", borderRadius: "5px", display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "20px" }}>🤖</span>
              <span><strong>Claude 3.5 Sonnet:</strong> Inspecting code architecture and syntax...</span>
            </div>
            <div style={{ background: "#222", padding: "10px", borderRadius: "5px", display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "20px" }}>🤖</span>
              <span><strong>OpenAI GPT-4o:</strong> Scanning for security vulnerabilities...</span>
            </div>
            <div style={{ background: "#222", padding: "10px", borderRadius: "5px", display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "20px" }}>🤖</span>
              <span><strong>Google Gemini Flash:</strong> Synthesizing executive report...</span>
            </div>
          </div>
        </div>
      )}

      {/* Final Results */}
      {result && !loading && (
        <div style={{ marginTop: "30px", background: "#111", color: "#fff", padding: "25px", borderRadius: "8px" }}>
          <h3>Live AI Execution Report ({result.durationMs}ms)</h3>
          <p><strong>Pipeline Status:</strong> {result.success ? "🟢 Passed Review" : "⚠️ Issues Flagged"}</p>

          <h4 style={{ color: "#8be9fd", marginTop: "20px" }}>🔄 Real-Time Multi-Agent Trace:</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {result.pipelineTrace?.map((stage: any, i: number) => (
              <div key={i} style={{ background: "#222", padding: "12px", borderRadius: "5px", borderLeft: "4px solid #5af78e", display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <span style={{ fontSize: "22px" }}>🤖</span>
                <div>
                  <span style={{ color: "#ff79c6", fontWeight: "bold" }}>Step {i + 1} [{stage.agent}]:</span>
                  <p style={{ margin: "5px 0 0 0", fontFamily: "monospace", fontSize: "14px", whiteSpace: "pre-wrap" }}>{stage.status}</p>
                </div>
              </div>
            ))}
          </div>

          {result.summaryReport && (
            <div style={{ marginTop: "20px" }}>
              <h4 style={{ color: "#5af78e" }}>📋 Executive Summary:</h4>
              <div style={{ background: "#1a1a1a", padding: "15px", borderRadius: "5px", border: "1px solid #333" }}>
                <p><strong>System Health:</strong> {result.summaryReport.overallHealth}</p>
                <p><strong>Primary Findings:</strong></p>
                <ul>
                  {result.summaryReport.primaryFindings?.map((f: string, idx: number) => (
                    <li key={idx} style={{ color: f.includes("Critical") || f.includes("Vulnerabilit") ? "#ff5f56" : "#f1fa8c" }}>{f}</li>
                  ))}
                </ul>
                <p><strong>Peer Review Notes:</strong> {result.summaryReport.peerReviewNotes}</p>
                <p><strong>Remediation:</strong> {result.summaryReport.recommendedAction}</p>
              </div>
            </div>
          )}

          {result.error && (
            <p style={{ color: "#ff5f56" }}>Error: {result.error}</p>
          )}
        </div>
      )}
    </main>
  );
}
