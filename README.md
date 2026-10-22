# mailbox.bot MCP server

Official hosted Model Context Protocol server for **[mailbox.bot](https://mailbox.bot)**. Production is remote Streamable HTTP at `https://mailbox.bot/api/mcp`.

Agents send letters, certified mail, postcards, and document packets. mailbox.bot prints, stamps, mails, photographs, tracks, and returns proof. Agent mailboxes are live now: a real street address plus PMB at the staffed, USPS-compliant Manhattan Beach, CA facility, **$15/mo**. The PMB number is assigned after USPS Form 1583 verification. The online notary fee is waived. Outbound mail uses prepaid credits and has no monthly base fee.

- **Website:** https://mailbox.bot
- **Install:** https://mailbox.bot/mcp-install
- **Pricing:** https://mailbox.bot/pricing
- **Public tool catalog:** https://mailbox.bot/api/mcp/tools-public
- **OpenAPI:** https://mailbox.bot/openapi.json and https://mailbox.bot/openapi.yaml
- **Registry:** [`bot.mailbox/mailbox`](https://registry.modelcontextprotocol.io) (DNS-verified on `mailbox.bot`)

## Connect

**Sign in, no key.** Clients that support MCP sign-in (claude.ai, ChatGPT, Cursor, Claude Code) can add `https://mailbox.bot/api/mcp` with no headers. The first tool call opens mailbox.bot's sign-in page, where you choose the agent and Sandbox or Live. On a live connection each letter waits for your approval in the dashboard. Disconnect any time on the API Keys page.

**Plugin.** This repository is also a Cursor and Claude Code plugin: `.cursor-plugin/plugin.json` and `mcp.json` for Cursor, `.claude-plugin/` and `.mcp.json` for Claude Code (`/plugin marketplace add arbengine/mailbox-mcp`, then `/plugin install mailbox-bot@mailbox-bot`). Both connect by sign-in and bring the `skills/mailbox-bot` skill.

**With a key.** Add the hosted URL to the MCP client and pass a bearer key. Customers do not run a local process.

```json
{
  "mcpServers": {
    "mailbox-bot": {
      "url": "https://mailbox.bot/api/mcp",
      "headers": {
        "Authorization": "Bearer sk_agent_YOUR_KEY_HERE"
      }
    }
  }
}
```

Create an account at [mailbox.bot/signup](https://mailbox.bot/signup). A live agent key (`sk_agent_`) sends real mail and spends prepaid credits. A sandbox key (`sk_agent_test_`) rehearses on the same endpoint with no charge and no physical mail. A member account key (`sk_live_`) cannot send mail.

## Pricing

| Plan | Price | What you get |
|---|---|---|
| Outbound mail and forwarded inbound context | $0/mo | Print and mail with prepaid credits. Forward scans, photos, and PDFs from an address you already control. |
| Mailing address | $15/mo | Street address plus PMB at the Manhattan Beach, CA facility. Live now. The PMB number is assigned after USPS Form 1583 verification. |

Published outbound examples start at $2.00 for a 1-page USPS First-Class letter. A dry run returns the exact price for that document, page count, service, and ZIP. That `cost_breakdown` is the price that applies.

## Tools

55 hosted tools. Current tools are listed first. A deprecated tool is still served and names its replacement. Live schemas: [public catalog](https://mailbox.bot/api/mcp/tools-public).

| Tool | Description |
|---|---|
| `get_mailbox` | Read the account mailing address: street address plus PMB at the Manhattan Beach, CA facility. The rental is $15/mo and mailboxes are live now. The PMB number is assigned after USPS Form 1583 verification. |
| `get_usage` | Read usage events and the prepaid credit balance. Agents can read the balance and cannot buy credits. |
| `list_inbound_forwarding_addresses` | List the member's intake aliases on `forward.mailbox.bot` for scans, photos, and PDFs from an address the operator already controls. |
| `list_inbound_mail` | List forwarded inbound mail with compact draft context for a reply. |
| `get_inbound_mail` | Read one forwarded inbound item, OCR-backed facts, reply hints, and thread linkage. |
| `list_postal_threads` | List physical-mail threads that group inbound context and outbound sends. |
| `get_postal_thread` | Read one physical-mail thread and its timeline. |
| `get_mailbox_md` | Read this agent's versioned MAILBOX.md instructions before an outbound send. |
| `propose_mailbox_md_edit` | Propose an edit to standing instructions. The owner accepts or rejects it. |
| `send_facility_message` | Send a message to the facility handling this mailbox. |
| `list_facility_conversations` | List conversations with the facility. |
| `get_facility_messages` | Read messages in a facility conversation. |
| `update_webhook` | Update the legacy agent webhook callback URL and event subscriptions. |
| `send_outbound_mail` | Print and mail a document with prepaid credits. Call with `dry_run=true` and show the price before a live send. |
| `list_outbound_mail` | List outbound mail jobs and their status. |
| `get_outbound_mail` | Read one outbound job, including cost, status, and fulfillment photos. |
| `cancel_outbound_mail` | Cancel queued mail before printing and return eligible prepaid credits once. |
| `create_test_outbound_mail` | Create a sandbox outbound record with no charge and no physical mail. |
| `advance_test_outbound_mail` | Advance a sandbox outbound record through submitted, ready, mailed, and delivered. |
| `quote_outbound_mail` | Price a letter before you have the document: mail class, pages, colour and, for FedEx, the ZIP. Needs no account. |
| `send_text_letter` | Mail a letter written as plain text. Goes through `send_outbound_mail` with the same approval, caps and proof. |
| `estimate_batch_mail` | Price a batch of postcards, letters, flyers or pamphlets (10 to 10,000 pieces) before any file exists. Printing and USPS postage included. |
| `create_batch_mail` | Create a batch draft from a template link (a PDF, or a PNG/JPG postcard graphic) and recipients inline or by CSV link. Nothing is charged; the exact price comes back with `links.proof`. |
| `get_batch_mail_proof` | A one-hour link to a proof PDF: the template as it prints, then the address label for one recipient at its real size, for the person who checks the batch. |
| `confirm_batch_mail` | Pay for a draft from prepaid credits once and queue it for printing. The key's approval and daily-piece policies apply; `max_cost_cents` refuses before any debit. |
| `get_batch_mail` | Read a batch: status, recipient summary, pricing and refunds, links, first 50 pieces. |
| `list_batch_mail` | List the caller's batches, newest first. Sandbox keys see sandbox batches only. |
| `cancel_batch_mail` | Cancel a batch before the facility starts; credits are refunded in full. |
| `advance_test_batch_mail` | Sandbox only: move a batch submitted → in_progress → completed and fire `batch.completed`, as the facility would. |
| `search_inbound_items` | Search physical mail at an assigned PMB, including saved OCR text. A sandbox key sees the account's Mojave sample letter. |
| `get_inbound_item` | Read one inbound item: pages, actions, and current scan and forward quotes. |
| `get_inbound_pages` | Read page text for one inbound item. |
| `quote_inbound_forward` | Price every forwarding class for one item to a US ZIP. |
| `request_inbound_action` | Propose scan, forward, or discard. The owner approves. The proposal does not spend credits or move mail by itself. |
| `get_inbound_activity` | Read the inbound timeline for items this key can see. |
| `list_webhook_endpoints` | List the member's webhooks. Signing secrets are omitted. |
| `create_webhook_endpoint` | Create a webhook. The signing secret is returned once. |
| `update_webhook_endpoint` | Update a webhook URL, events, keyword rules, or status. |
| `test_webhook_endpoint` | Queue a synthetic `webhook.test` delivery. |
| `test_webhook_endpoint_with_sample` | Test a webhook with the member's sample letter. |
| `rotate_webhook_endpoint_secret` | Rotate a webhook signing secret after the operator asks. |
| `list_webhook_deliveries` | Read recent webhook deliveries. Payloads omit page text. |
| `replay_webhook_delivery` | Retry a failed webhook delivery. |
| `list_agent_inbox` | Deprecated. Use `search_inbound_items`. |
| `get_agent_inbox_context` | Deprecated. Use `get_inbound_item`. |
| `get_agent_inbox_sources` | Deprecated. Use `get_inbound_item`. |
| `list_agent_inbox_scans` | Deprecated. Use `get_inbound_pages`. |
| `get_agent_inbox_scan` | Deprecated. Use `get_inbound_pages`. |
| `get_agent_inbox_activity` | Deprecated. Use `get_inbound_activity`. |
| `report_agent_inbox_outcome` | Deprecated. No successor. Still served until the alias window closes. |
| `get_agent_inbox_handling` | Deprecated. Use `get_inbound_item`. |
| `propose_agent_inbox_handling` | Deprecated. Use `request_inbound_action`. |
| `seed_agent_inbox_sandbox` | Deprecated. No successor. Still served until the alias window closes. |
| `list_inbound_items` | Deprecated. Use `search_inbound_items`. |
| `get_inbound_item_sources` | Deprecated. Use `get_inbound_item`. |

### `get_mailbox`

Read the account mailing address: street address plus PMB at the Manhattan Beach, CA facility. The rental is $15/mo and mailboxes are live now. The PMB number is assigned after USPS Form 1583 verification.

### `get_usage`

Read usage events and the prepaid credit balance. Agents can read the balance and cannot buy credits.

### `list_inbound_forwarding_addresses`

List the member's intake aliases on `forward.mailbox.bot` for scans, photos, and PDFs from an address the operator already controls.

### `list_inbound_mail`

List forwarded inbound mail with compact draft context for a reply.

### `get_inbound_mail`

Read one forwarded inbound item, OCR-backed facts, reply hints, and thread linkage.

### `list_postal_threads`

List physical-mail threads that group inbound context and outbound sends.

### `get_postal_thread`

Read one physical-mail thread and its timeline.

### `get_mailbox_md`

Read this agent's versioned MAILBOX.md instructions before an outbound send.

### `propose_mailbox_md_edit`

Propose an edit to standing instructions. The owner accepts or rejects it.

### `send_facility_message`

Send a message to the facility handling this mailbox.

### `list_facility_conversations`

List conversations with the facility.

### `get_facility_messages`

Read messages in a facility conversation.

### `update_webhook`

Update the legacy agent webhook callback URL and event subscriptions.

### `send_outbound_mail`

Print and mail a document with prepaid credits. Call with `dry_run=true` and show the price before a live send.

### `list_outbound_mail`

List outbound mail jobs and their status.

### `get_outbound_mail`

Read one outbound job, including cost, status, and fulfillment photos.

### `cancel_outbound_mail`

Cancel queued mail before printing and return eligible prepaid credits once.

### `create_test_outbound_mail`

Create a sandbox outbound record with no charge and no physical mail.

### `advance_test_outbound_mail`

Advance a sandbox outbound record through submitted, ready, mailed, and delivered.

### `quote_outbound_mail`

Price a letter before you have the document: mail class, pages, colour and, for FedEx, the ZIP. Needs no account.

### `send_text_letter`

Mail a letter written as plain text. Goes through `send_outbound_mail` with the same approval, caps and proof.

### `estimate_batch_mail`

Price a batch of postcards, letters, flyers or pamphlets (10 to 10,000 pieces) before any file exists. Printing and USPS postage included.

### `create_batch_mail`

Create a batch draft from a template link (a PDF, or a PNG/JPG postcard graphic) and recipients inline or by CSV link. Nothing is charged; the exact price comes back with `links.proof`.

### `get_batch_mail_proof`

A one-hour link to a proof PDF: the template as it prints, then the address label for one recipient at its real size, for the person who checks the batch.

### `confirm_batch_mail`

Pay for a draft from prepaid credits once and queue it for printing. The key's approval and daily-piece policies apply; `max_cost_cents` refuses before any debit.

### `get_batch_mail`

Read a batch: status, recipient summary, pricing and refunds, links, first 50 pieces.

### `list_batch_mail`

List the caller's batches, newest first. Sandbox keys see sandbox batches only.

### `cancel_batch_mail`

Cancel a batch before the facility starts; credits are refunded in full.

### `advance_test_batch_mail`

Sandbox only: move a batch submitted → in_progress → completed and fire `batch.completed`, as the facility would.

### `search_inbound_items`

Search physical mail at an assigned PMB, including saved OCR text. A sandbox key sees the account's Mojave sample letter.

### `get_inbound_item`

Read one inbound item: pages, actions, and current scan and forward quotes.

### `get_inbound_pages`

Read page text for one inbound item.

### `quote_inbound_forward`

Price every forwarding class for one item to a US ZIP.

### `request_inbound_action`

Propose scan, forward, or discard. The owner approves. The proposal does not spend credits or move mail by itself.

### `get_inbound_activity`

Read the inbound timeline for items this key can see.

### `list_webhook_endpoints`

List the member's webhooks. Signing secrets are omitted.

### `create_webhook_endpoint`

Create a webhook. The signing secret is returned once.

### `update_webhook_endpoint`

Update a webhook URL, events, keyword rules, or status.

### `test_webhook_endpoint`

Queue a synthetic `webhook.test` delivery.

### `test_webhook_endpoint_with_sample`

Test a webhook with the member's sample letter.

### `rotate_webhook_endpoint_secret`

Rotate a webhook signing secret after the operator asks.

### `list_webhook_deliveries`

Read recent webhook deliveries. Payloads omit page text.

### `replay_webhook_delivery`

Retry a failed webhook delivery.

### `list_agent_inbox`

Deprecated. Use `search_inbound_items`.

### `get_agent_inbox_context`

Deprecated. Use `get_inbound_item`.

### `get_agent_inbox_sources`

Deprecated. Use `get_inbound_item`.

### `list_agent_inbox_scans`

Deprecated. Use `get_inbound_pages`.

### `get_agent_inbox_scan`

Deprecated. Use `get_inbound_pages`.

### `get_agent_inbox_activity`

Deprecated. Use `get_inbound_activity`.

### `report_agent_inbox_outcome`

Deprecated. No successor. Still served until the alias window closes.

### `get_agent_inbox_handling`

Deprecated. Use `get_inbound_item`.

### `propose_agent_inbox_handling`

Deprecated. Use `request_inbound_action`.

### `seed_agent_inbox_sandbox`

Deprecated. No successor. Still served until the alias window closes.

### `list_inbound_items`

Deprecated. Use `search_inbound_items`.

### `get_inbound_item_sources`

Deprecated. Use `get_inbound_item`.

## What this repository is

This repository holds the public [`server.json`](./server.json) manifest published to the official MCP Registry. The production server is hosted at `https://mailbox.bot/api/mcp`.

[`server.js`](./server.js) lets a registry read the live tool catalog from `https://mailbox.bot/api/mcp/tools-public`. Authenticated tool calls use the hosted endpoint. Install steps for Claude, Cursor, and other clients are at [mailbox.bot/mcp-install](https://mailbox.bot/mcp-install).

## Verifying authenticity

The namespace `bot.mailbox/*` is reserved via DNS proof on the apex domain `mailbox.bot`. Only the domain owner can publish servers under this namespace to the MCP Registry. The canonical manifest in this repo and the registry entry should match.

## License

[MIT](./LICENSE) covers this manifest and the registry adapter. The mailbox.bot service is operated under the [mailbox.bot terms](https://mailbox.bot/terms).
