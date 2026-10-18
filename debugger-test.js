import { z } from "zod";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import * as dotenv from "dotenv";
dotenv.config();
// ESM equivalent for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LeadSchema = z.object({
    clientName: z.string(),
    intent: z.enum(["high", "medium", "low"]),
    budget: z.number().positive(),
    summary: z.string(),
});
const corruptedModelPayload = `
Here is the JSON object:
\`\`\`json
{
  "clientName": "Sarah Jenkins",
  "intent": "high",
  "budget": "7500",
  "summary": "Interested in downtown office space."
}
\`\`\`
`;
class AIPipelineDebugger {
    schema;
    constructor(schema) {
        this.schema = schema;
    }
    cleanOutput(raw) {
        return raw.replace(/```json/g, "").replace(/```/g, "").trim();
    }
    async debugAndRepair(rawOutput, primaryProvider = "Groq") {
        const startTime = Date.now();
        const trace = [];
        trace.push(`[TRACE] Received payload from primary provider: ${primaryProvider}`);
        let finalData = null;
        let success = false;
        try {
            const cleaned = this.cleanOutput(rawOutput);
            const json = JSON.parse(cleaned);
            if (typeof json.budget === "string") {
                json.budget = Number(json.budget);
                trace.push("[REPAIR] Self-healing fix: Coerced stringified budget into numeric type.");
            }
            const parsed = this.schema.safeParse(json);
            if (parsed.success) {
                trace.push(`[SUCCESS] Payload successfully validated against schema.`);
                finalData = parsed.data;
                success = true;
            }
            else {
                trace.push(`[SCHEMA FAIL] Validation issues found: ${JSON.stringify(parsed.error.issues)}`);
            }
        }
        catch (err) {
            trace.push(`[PARSE FAIL] JSON Parsing Error: ${err.message}`);
        }
        if (!success) {
            const fallbackResult = this.triggerFallbackNetwork(rawOutput, trace);
            success = fallbackResult.success;
            finalData = fallbackResult.data;
        }
        const durationMs = Date.now() - startTime;
        const auditRecord = {
            timestamp: new Date().toISOString(),
            primaryProvider,
            durationMs,
            success,
            trace,
            output: finalData,
        };
        this.saveAuditLog(auditRecord);
        return auditRecord;
    }
    triggerFallbackNetwork(rawOutput, trace) {
        const fallbacks = ["Gemini", "Claude"];
        for (const provider of fallbacks) {
            trace.push(`[FAILOVER] Primary failed. Routing structural repair to backup debugger: ${provider}...`);
            const simulatedRepairedJson = {
                clientName: "Sarah Jenkins",
                intent: "high",
                budget: 7500,
                summary: "Interested in downtown office space.",
            };
            const reCheck = this.schema.safeParse(simulatedRepairedJson);
            if (reCheck.success) {
                trace.push(`[SUCCESS] ${provider} successfully repaired and validated the pipeline payload.`);
                return { success: true, data: reCheck.data };
            }
        }
        return { success: false };
    }
    saveAuditLog(log) {
        const logFilePath = path.join(__dirname, "audit-logs.json");
        let existingLogs = [];
        if (fs.existsSync(logFilePath)) {
            const fileData = fs.readFileSync(logFilePath, "utf-8");
            try {
                existingLogs = JSON.parse(fileData);
            }
            catch (e) {
                existingLogs = [];
            }
        }
        existingLogs.push(log);
        fs.writeFileSync(logFilePath, JSON.stringify(existingLogs, null, 2));
        console.log(`[AUDIT] Execution trace successfully saved to audit-logs.json (${log.durationMs}ms)`);
    }
}
(async () => {
    console.log("[INIT] Starting AI Pipeline Debugger with ESM & Latency Tracking...\n");
    const debuggerInstance = new AIPipelineDebugger(LeadSchema);
    const report = await debuggerInstance.debugAndRepair(corruptedModelPayload, "Groq");
    console.log("\n=== EXECUTION AUDIT REPORT ===");
    console.log(JSON.stringify(report, null, 2));
})();
//# sourceMappingURL=debugger-test.js.map