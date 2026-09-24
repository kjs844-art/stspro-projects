# Open-Source Strategy

## 1. Goal

Build an open-source project that is useful independently of the hosted SaaS.

The long-term open-source identity should be:

> A provenance-first toolkit for collecting, normalizing, comparing, and exposing public life-sciences evidence.

## 2. Why a dedicated repository will eventually be better

The current project lives inside the public `stspro-projects` monorepo.

That is acceptable for development, but a dedicated repository would make it easier to establish:

- a clear license
- project-specific issues
- releases
- tags
- contributor history
- package publishing
- documentation
- adoption metrics
- security policy
- contribution policy

Suggested future repository name:

`kosmo-biograph`

Do not split until the current folder is stable enough to migrate cleanly.

## 3. Proposed open-source scope

Open-source:

- source connectors
- canonical schemas
- evidence/provenance model
- snapshot storage interface
- change-detection engine
- public REST API
- CLI/import tools
- basic web UI
- self-host deployment example
- tests and sample datasets

Hosted-only operational value may include:

- managed data refresh
- managed infrastructure
- alert delivery
- high-volume indexing
- team administration
- enterprise SSO
- support/SLA
- managed backups
- hosted audit retention

The community edition must remain genuinely useful.

## 4. License proposal

Proposed: **Apache License 2.0**

Reasons:

- permissive
- commercial use allowed
- modification and redistribution allowed
- explicit patent grant
- commonly accepted for developer infrastructure

Trade-off:

A competitor can legally use the code in a commercial service while complying with the license.

Alternative if network-service reciprocity becomes strategically important:

- AGPL-3.0

Do not choose or add a license purely for program eligibility. Choose it based on the desired ecosystem and business model.

## 5. Minimum repository quality before public promotion

- README with one-command local setup
- architecture overview
- license
- CODE_OF_CONDUCT.md
- CONTRIBUTING.md
- SECURITY.md
- issue templates
- pull-request template
- sample data
- tests
- versioned releases
- changelog
- documented data-source terms
- no secrets in history

## 6. Codex for Open Source alignment

OpenAI currently states that the program is for core maintainers or maintainers of active public open-source projects, with signals such as:

- meaningful usage
- broad adoption
- ecosystem importance
- active maintenance
- PR review
- issue triage
- release management

Program reference:

https://developers.openai.com/community/codex-for-oss

Therefore, creating a public repository alone is **not** the finish line.

## 7. Application readiness checklist

Apply when most of these are true:

- [ ] dedicated public repository exists
- [ ] an OSI-approved license is applied
- [ ] installation works from a clean machine
- [ ] at least one tagged release exists
- [ ] CI is green
- [ ] project has real documentation
- [ ] issues are being triaged
- [ ] maintainer activity is visible
- [ ] outside users have used or tested it
- [ ] there is evidence of real utility
- [ ] API-credit use case is specifically tied to OSS maintenance

Good API-credit use cases:

- PR review assistance
- issue triage
- release-note generation
- regression-test generation
- maintainer automation
- security review of the open-source codebase

Do not describe credits primarily as a way to subsidize inference for paying SaaS customers.

## 8. Contribution model

Start simple.

### Roles

- Maintainer
- Contributor
- Reviewer

### Contribution workflow

```text
issue
 -> discussion
 -> small PR
 -> tests
 -> maintainer review
 -> merge
 -> changelog/release
```

Use labels:

- good first issue
- connector
- schema
- bug
- documentation
- research
- security
- breaking-change

## 9. Package strategy

Possible future artifacts:

- Java connector SDK
- Python connector SDK
- Docker image
- OpenAPI specification
- schema package

Do not publish packages until versioning and compatibility rules exist.

## 10. Security disclosure

Create `SECURITY.md` before promoting the project.

It should explain:

- supported versions
- where to report vulnerabilities privately
- what not to include in public issues
- expected response window

If Codex Security access is later granted, use it as one part of the security process, not as the only security control.
