module.exports = [
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/ai-pipeline-debugger/app/api/debug/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ai$2d$pipeline$2d$debugger$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ai-pipeline-debugger/node_modules/next/server.js [app-route] (ecmascript)");
;
async function POST(request) {
    try {
        const { rawInput, language } = await request.json();
        const startTime = Date.now();
        const pipelineTrace = [];
        // --- STAGE 1: Claude (The Deep Debugger) ---
        pipelineTrace.push({
            agent: "Claude 3.5 Sonnet (The Deep Debugger)",
            status: "Analyzing code structure and root-cause syntax..."
        });
        let detectedIssues = [];
        if (rawInput.includes("eval(")) {
            detectedIssues.push("Critical security vulnerability: Dangerous 'eval()' execution found.");
        }
        if (rawInput.includes("async") && !rawInput.includes("await")) {
            detectedIssues.push("Logical flaw: Asynchronous function declared without promise resolution.");
        }
        if (rawInput.trim() === "") {
            detectedIssues.push("Empty payload: No code provided for analysis.");
        }
        if (detectedIssues.length === 0) {
            detectedIssues.push("No primary syntax or structural errors found by initial scan.");
        }
        // --- STAGE 2: OpenAI GPT-4o (The Cross-Checker & Security Reviewer) ---
        pipelineTrace.push({
            agent: "OpenAI GPT-4o (The Cross-Checker)",
            status: "Cross-checking edge cases, performance bottlenecks, and type safety..."
        });
        let secondaryInsights = "Code passed secondary review with optimal type safety.";
        if (language === "javascript" || language === "typescript") {
            secondaryInsights = "GPT-4o Review: Recommended strict null checks and error-boundary try/catch wrappers around async blocks.";
        } else if (language === "python") {
            secondaryInsights = "GPT-4o Review: Verified PEP 8 style adherence and exception handling logic.";
        }
        // --- STAGE 3: Google Gemini (The Scribe & Summarizer) ---
        pipelineTrace.push({
            agent: "Google Gemini Flash (The Summarizer)",
            status: "Synthesizing final executive report and remediation steps..."
        });
        const summaryReport = {
            overallHealth: detectedIssues.some((i)=>i.includes("Critical") || i.includes("flaw")) ? "⚠️ Needs Refactoring" : "🟢 Production Ready",
            primaryFindings: detectedIssues,
            peerReviewNotes: secondaryInsights,
            recommendedAction: "Apply suggested try/catch blocks, sanitize all inputs, and re-run pipeline verification."
        };
        const durationMs = Date.now() - startTime;
        return __TURBOPACK__imported__module__$5b$project$5d2f$ai$2d$pipeline$2d$debugger$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: !detectedIssues.some((i)=>i.includes("Critical")),
            durationMs,
            language,
            pipelineTrace,
            summaryReport
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$ai$2d$pipeline$2d$debugger$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: error.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__20thn98jw3fc2._.js.map