# SaaS Roadmap — KOSMO BioGraph

## 1. Business model

The source code can be open while the managed service is paid.

Customers pay for:

- convenience
- reliable operations
- scheduled ingestion
- alerts
- collaboration
- security
- support
- scale

not merely for permission to read the source.

## 2. Proposed editions

### Community / Self-hosted

Free open-source core:

- public connectors
- entity search
- evidence pages
- snapshot/change engine
- basic watchlists
- local deployment
- basic research briefs

### Hosted Free

Managed service:

- limited watchlist
- slower refresh
- limited history
- public datasets
- basic exports

### Pro

Potential features:

- more watchlists
- faster refresh
- change alerts
- saved research briefs
- evidence comparison
- CSV/JSON exports
- longer history

### Team

Potential features:

- shared workspaces
- annotations
- review workflow
- audit history
- roles
- shared saved searches
- team reports

### Enterprise

Potential features:

- SSO/SAML
- SCIM
- advanced RBAC
- private connectors
- dedicated retention controls
- SLA/support
- custom deployment
- contractual security review

Pricing should not be finalized until actual infrastructure costs and user demand are measured.

## 3. Feature boundary

A sustainable open-core product should not cripple the open-source edition.

Good paid differentiators:

- hosting
- operational scale
- collaboration
- enterprise controls
- managed integrations

Bad differentiator:

- intentionally removing basic scientific correctness from the open-source edition

## 4. Revenue channels

Possible future revenue:

- SaaS subscriptions
- enterprise contracts
- managed private deployments
- support
- data-pipeline consulting
- API usage plans
- custom research-workflow engineering

Do not assume OpenAI OSS program credits or research-access benefits will fund customer production usage.

## 5. SaaS architecture boundary

```text
Internet
  |
  v
Web frontend
  |
  v
Public API / auth
  |
  +--> PostgreSQL
  +--> public data connectors
  +--> alert workers
  +--> allowed general AI
  |
  X--> GPT-Rosalind direct customer path
```

Internal research remains separate.

## 6. Commercial data discipline

Before selling data-derived features, document for every source:

- source owner
- API/data terms
- redistribution rights
- attribution requirements
- rate limits
- caching rules
- commercial-use rules

Open-source code licensing does not automatically grant rights to redistribute third-party datasets.

## 7. Early go-to-market sequence

### Stage 1 — Developer/research proof

Goal:

- prove evidence model
- prove connectors
- prove change detection

### Stage 2 — Public demo

Goal:

- searchable website
- source-linked evidence pages
- feedback form
- public examples

### Stage 3 — Hosted beta

Goal:

- accounts
- saved watchlists
- scheduled refresh
- alerts

### Stage 4 — Paid beta

Goal:

- Pro plan
- usage limits
- payment provider
- support process

### Stage 5 — Team/enterprise

Goal:

- organization workspaces
- RBAC
- SSO
- audit logs
- security documentation

## 8. Metrics before charging

Track:

- connector reliability
- data freshness
- false/incorrect entity matches
- change-detection precision
- number of source-linked claims
- user retention
- alert usefulness
- infrastructure cost

Scientific trust should improve before aggressive monetization.

## 9. One-project / three-outcome model

```text
KOSMO BioGraph
   |
   +--> Open-source core
   |      -> community
   |      -> maintainer record
   |      -> possible Codex for OSS application
   |
   +--> Internal research capability
   |      -> governance
   |      -> reproducible science workflows
   |      -> possible GPT-Rosalind application
   |
   +--> Hosted SaaS
          -> managed convenience
          -> subscriptions
          -> enterprise services
```

The same codebase can support all three, but permissions, model usage, data handling, and commercial boundaries must remain explicit.
