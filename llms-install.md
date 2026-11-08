# Installing mailbox.bot in Cline

mailbox.bot is a hosted MCP server at `https://mailbox.bot/api/mcp` (Streamable HTTP). There is nothing to clone, build or run: add one entry to Cline's MCP settings (`cline_mcp_settings.json`).

## Sign in (no key)

```json
{
  "mcpServers": {
    "mailbox-bot": {
      "type": "streamableHttp",
      "url": "https://mailbox.bot/api/mcp"
    }
  }
}
```

Then authorize the server. Cline opens mailbox.bot's sign-in page, where the user chooses the agent and Sandbox or Live.

## Or with a key

Ask the user for an agent key from https://mailbox.bot/dashboard/api-keys; never make one up. A Sandbox key (`sk_agent_test_`) practices for free: nothing is printed, mailed or charged. A Live key (`sk_agent_`) mails for real and spends prepaid credits.

```json
{
  "mcpServers": {
    "mailbox-bot": {
      "type": "streamableHttp",
      "url": "https://mailbox.bot/api/mcp",
      "headers": { "Authorization": "Bearer sk_agent_test_YOUR_KEY" }
    }
  }
}
```

## Check it works

List the tools, then ask for a price, which charges nothing: `quote_outbound_mail` for a one-page letter to ZIP 90266.

More: https://mailbox.bot/mcp-install
