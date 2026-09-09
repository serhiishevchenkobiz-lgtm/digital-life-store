# Digital Life Store — AI Team Architecture

Status: proposed foundation
Branch: `ai-team-foundation`

## Goal

Build the store as an AI-assisted business platform while keeping commerce, payments, entitlements, and other critical business rules deterministic and auditable.

## Core topology

```text
Customer / Admin / Social Channels
              |
              v
       AI Orchestrator
        /     |      \
       /      |       \
 Support   Marketing   Research
  Agent      Agent       Agent
       \      |       /
        \     |      /
         +----+-----+
              |
        Policy / Tools
          /       \
         /         \
   Supabase       ownCloud
 commerce/data     files/content
         |
     Payment / Entitlement / Download rules

OpenCode -> OmniRoute -> verified model providers
                         \-> Ollama/local model (private-data fallback)
```

## AI roles

1. Orchestrator — coordinates jobs, delegates work, enforces permissions.
2. Developer — implementation, debugging, tests, migrations, integrations.
3. Editorial — book metadata, descriptions, collections, editorial workflows.
4. Translation — multilingual content with review status and glossary rules.
5. Marketing — campaigns, email copy, landing copy, SEO briefs.
6. Social — drafts and approved publishing/replies for Telegram, Instagram and X.
7. Customer Support — product guidance, order-status assistance, escalation.
8. Finance — reporting, reconciliation support, anomaly detection; never invents financial facts.
9. Research/SEO — competitor research, search intent, trend and content opportunities.
10. QA/Security — tests, permission checks, release verification, audit checks.

## Trust boundaries

### Deterministic / authoritative

- Supabase/Postgres is the system of record for products, customers, orders, payments, entitlements and downloads.
- Payment confirmation, entitlement creation, discount calculation, refund handling and access control must be implemented as deterministic application logic.
- AI may explain, recommend or prepare actions, but must not be the source of truth for money or access rights.

### AI-assisted

- Drafting, classification, summarization, translation, research, customer conversation and content generation.
- Social publishing should use explicit approval gates until channel behavior is proven reliable.

### Local/private

- Ollama is reserved for data that should remain on the machine when practical.
- OmniRoute is local-loopback only.
- Provider credentials remain out of source control.

## Provider policy

- Prefer free/API-based providers whose current terms permit the intended use.
- Test a model before placing it in a production combo.
- Use small verified combos before broad auto-routing.
- Treat free-tier quotas as variable, not guaranteed unlimited capacity.
- Avoid routing personal OAuth sessions through a gateway unless the provider's current terms clearly allow it.

## Deployment boundary

All local development tooling is scoped to the Windows `Bastion` account. Do not create project files, user configuration, credentials or services under `Grif`.

OmniRoute should bind to `127.0.0.1` for local development. Public exposure requires an explicit later design for authentication, TLS, firewalling and reverse proxying.

## ownCloud role

Use current ownCloud Infinite Scale as the content/file layer, not as the commerce database.

Suggested spaces:

- Books
- Covers
- Product Assets
- Editorial
- Translations
- Marketing
- Social
- Customer Support
- Finance Reports
- SEO Research
- Legal
- AI Workspace

Integration should use documented ownCloud APIs/events where needed. Avoid treating ownCloud files as authoritative commerce records.

## Social automation policy

- Telegram can be automated through the official Bot API.
- Instagram and X integrations require current official API capability/permission review before implementation.
- The “personal voice” bot should be a brand/persona representation, not a claim that a human personally sent every message.
- High-risk or irreversible actions require human approval.

## Phased implementation

### Phase 1 — foundation

- Stabilize OpenCode + OmniRoute.
- Verify 3–5 free model routes.
- Add deterministic routing and model health checks.
- Add Ollama only after hardware/resource assessment.
- Document AI roles and permission boundaries.

### Phase 2 — AI workspace

- Introduce orchestrator/job model.
- Add role-specific prompts/skills.
- Add ownCloud Infinite Scale for content assets.
- Add audit trail for agent actions.

### Phase 3 — customer/business automation

- Support agent against product/order data.
- Finance reporting agent using read-only views/tools.
- Social content drafting and approval queue.
- Telegram bot integration.

### Phase 4 — controlled channel automation

- Official API integrations for Instagram/X after capability and policy verification.
- Scheduled publishing.
- Response classification and escalation.

### Phase 5 — autonomous operations

- Long-running agents (Hermes/OpenClaw evaluated only when a concrete use case justifies the extra layer).
- Automated research/content pipelines.
- Controlled multi-agent workflows.

## Non-goals for the current phase

- No mass OAuth connector setup.
- No disabling Windows security/system services just to free a small amount of RAM.
- No production social publishing without approval controls.
- No payment/refund decisions made by an LLM.
