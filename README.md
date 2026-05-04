# mailbox.bot MCP server

Official Model Context Protocol (MCP) server manifest for **[mailbox.bot](https://mailbox.bot)** — a physical mail API for AI agents.

Send letters, certified mail, and packages from your agent. Sandbox keys for zero-charge testing on the same production endpoints.

- **Website:** https://mailbox.bot
- **Install:** https://mailbox.bot/mcp-install
- **Docs:** https://mailbox.bot/docs
- **Registry:** [`bot.mailbox/mailbox`](https://registry.modelcontextprotocol.io) (DNS-verified on `mailbox.bot`)

## What this repo is

This repository holds the public [`server.json`](./server.json) manifest published to the official MCP Registry. The server itself is hosted at `https://mailbox.bot/api/mcp` (streamable HTTP transport) — there is no code to install.

If you're trying to **use** the server, go to [mailbox.bot/mcp-install](https://mailbox.bot/mcp-install) for client-specific setup (Claude Code, Claude Desktop, Cursor, etc.).

## Verifying authenticity

The namespace `bot.mailbox/*` is reserved via DNS proof on the apex domain `mailbox.bot`. Only the domain owner can publish servers under this namespace to the MCP Registry. If you see another server claiming to be mailbox.bot under a different namespace, it is not official.

The canonical manifest lives in this repo and is mirrored to the registry — both should match exactly.

## Capabilities

- **Outbound mail** — send first-class letters, certified mail, and other USPS / FedEx / UPS classes from a PDF or a few common document formats.
- **Inbound mail** — receive, scan, forward, and shred physical mail at a US address.
- **Sandbox mode** — `sk_agent_test_` keys exercise the full lifecycle (fulfillment photos, tracking, dispatch) with zero charge.
- **Cost controls** — `dry_run` cost preview, `X-Max-Cost-Cents` cap, per-key daily piece limits, structured retryable errors.
- **Webhooks** — signed delivery events with full payload inspection via REST.

Full tool list and schemas: see the [docs](https://mailbox.bot/docs) and the OpenAPI spec at [mailbox.bot/openapi.json](https://mailbox.bot/openapi.json).

## License

[MIT](./LICENSE) — covers this manifest and any examples added to this repo. The mailbox.bot service itself is operated under the [mailbox.bot terms](https://mailbox.bot/terms).
