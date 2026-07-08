# mailbox.bot MCP server

Official Model Context Protocol (MCP) server manifest for **[mailbox.bot](https://mailbox.bot)** — a hosted postal mail API for AI agents. Send certified mail, letters, notices, postcards, and document packets; mailbox.bot prints, stamps, mails, photographs, tracks, and exposes proof/status back to agents. Turn scans, PDFs, photos, provider notices, and notes from an address you already use into inbound agentic context. Dedicated mailbox.bot-issued street addresses plus mailbox numbers are a separate managed-address reservation path for approved accounts.

Send letters and certified mail from your agent, read inbound document context, manage postal threads, configure webhooks, retrieve scoped source documents, and rehearse lifecycle events with sandbox keys on the same production endpoints.

- **Website:** https://mailbox.bot
- **Install:** https://mailbox.bot/mcp-install
- **Public tool catalog:** https://mailbox.bot/api/mcp/tools-public
- **Docs:** https://mailbox.bot/mcp-install
- **OpenAPI:** https://mailbox.bot/openapi.json and https://mailbox.bot/openapi.yaml
- **Registry:** [`bot.mailbox/mailbox`](https://registry.modelcontextprotocol.io) (DNS-verified on `mailbox.bot`)

## What this repo is

This repository holds the public [`server.json`](./server.json) manifest published to the official MCP Registry. The production server itself is hosted at `https://mailbox.bot/api/mcp` (streamable HTTP transport).

The repo also includes a small local stdio adapter ([`server.js`](./server.js)) so registries such as Glama can start the server locally and inspect the live mailbox.bot tool definitions from `https://mailbox.bot/api/mcp/tools-public`. Production users should connect to the hosted endpoint.

If you're trying to **use** the server, go to [mailbox.bot/mcp-install](https://mailbox.bot/mcp-install) for client-specific setup (Claude Code, Claude Desktop, Cursor, etc.).

## Local registry check

```bash
npm start
```

This starts a stdio MCP adapter for introspection. Authenticated tool calls should use the hosted streamable HTTP MCP endpoint at `https://mailbox.bot/api/mcp`.

## Verifying authenticity

The namespace `bot.mailbox/*` is reserved via DNS proof on the apex domain `mailbox.bot`. Only the domain owner can publish servers under this namespace to the MCP Registry. If you see another server claiming to be mailbox.bot under a different namespace, it is not official.

The canonical manifest lives in this repo and is mirrored to the registry — both should match exactly.

## Capabilities

- **Outbound mail** — send first-class letters, certified postal mail, and other USPS / FedEx / UPS classes from a PDF or a few common document formats.
- **Document review and retrieval** — stored outbound submissions can expose `document_preview_url` for human verification, and `get_outbound_mail_document` retrieves original source bytes with `document.read` scope.
- **Inbound context** — use private forwarding aliases to turn scans, PDFs, photos, provider notices, and notes from addresses the operator already controls into OCR-backed context.
- **Managed address reservation** — dedicated mailbox.bot-issued physical mailing and package addresses are available by reservation for approved accounts; approved issuance begins August 31, 2026.
- **Sandbox mode** — `sk_agent_test_` keys exercise the full lifecycle (fulfillment photos, tracking, dispatch) with zero charge.
- **Cost controls** — `dry_run` cost preview, `X-Max-Cost-Cents` cap, per-key daily piece limits, structured retryable errors.
- **Webhooks** — signed delivery events with full payload inspection via REST.

Support conversations and support attachments are REST/OpenAPI/dashboard features, not MCP tools.

Full tool list and schemas: see the [public MCP tool catalog](https://mailbox.bot/api/mcp/tools-public), the [install guide](https://mailbox.bot/mcp-install), and the OpenAPI specs at [mailbox.bot/openapi.json](https://mailbox.bot/openapi.json) and [mailbox.bot/openapi.yaml](https://mailbox.bot/openapi.yaml).

## License

[MIT](./LICENSE) — covers this manifest and any examples added to this repo. The mailbox.bot service itself is operated under the [mailbox.bot terms](https://mailbox.bot/terms).
