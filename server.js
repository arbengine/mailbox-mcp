#!/usr/bin/env node

import readline from "node:readline";

const TOOL_CATALOG_URL = "https://mailbox.bot/api/mcp/tools-public";
const SERVER_NAME = "mailbox.bot";
const SERVER_VERSION = "1.0.0";
const PROTOCOL_VERSION = "2025-11-25";

let cachedTools = null;

async function loadTools() {
  if (cachedTools) {
    return cachedTools;
  }

  const response = await fetch(TOOL_CATALOG_URL, {
    headers: { accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Unable to load mailbox.bot tool catalog: ${response.status}`);
  }

  const catalog = await response.json();
  cachedTools = (catalog.tools ?? []).map((tool) => ({
    name: tool.name,
    description: tool.description,
    inputSchema: tool.inputSchema ?? {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
    annotations: tool.annotations,
    outputSchema: tool.outputSchema,
  }));

  return cachedTools;
}

function send(message) {
  process.stdout.write(`${JSON.stringify(message)}\n`);
}

function result(id, value) {
  send({ jsonrpc: "2.0", id, result: value });
}

function error(id, code, message) {
  send({ jsonrpc: "2.0", id, error: { code, message } });
}

async function handleRequest(request) {
  const { id, method } = request;

  if (id === undefined || id === null) {
    return;
  }

  try {
    if (method === "initialize") {
      result(id, {
        protocolVersion: PROTOCOL_VERSION,
        capabilities: {
          tools: { listChanged: false },
        },
        serverInfo: {
          name: SERVER_NAME,
          version: SERVER_VERSION,
        },
        instructions:
          "mailbox.bot is a physical postal mail API for AI agents. Use the hosted streamable HTTP endpoint at https://mailbox.bot/api/mcp with a mailbox.bot agent key for live tool calls.",
      });
      return;
    }

    if (method === "ping") {
      result(id, {});
      return;
    }

    if (method === "tools/list") {
      result(id, { tools: await loadTools() });
      return;
    }

    if (method === "tools/call") {
      result(id, {
        isError: true,
        content: [
          {
            type: "text",
            text:
              "This local stdio adapter is for MCP registry introspection. For authenticated mailbox.bot tool calls, connect to https://mailbox.bot/api/mcp with a mailbox.bot agent key.",
          },
        ],
      });
      return;
    }

    if (method === "resources/list") {
      result(id, { resources: [] });
      return;
    }

    if (method === "prompts/list") {
      result(id, { prompts: [] });
      return;
    }

    error(id, -32601, `Method not found: ${method}`);
  } catch (err) {
    error(id, -32603, err instanceof Error ? err.message : "Internal error");
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  crlfDelay: Infinity,
});

rl.on("line", async (line) => {
  const trimmed = line.trim();
  if (!trimmed) {
    return;
  }

  try {
    await handleRequest(JSON.parse(trimmed));
  } catch {
    error(null, -32700, "Parse error");
  }
});

