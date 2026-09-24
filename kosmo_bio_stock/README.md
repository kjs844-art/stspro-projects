# KOSMO BioGraph

KOSMO BioGraph is the planned evolution of the existing `kosmo_bio_stock` learning MVP into an open-source life-sciences evidence platform.

The current project already has:

- Java 21
- Spring Boot 3.5
- Gradle
- JSP/JSTL
- keyword search
- OpenAlex API integration
- a simple `Controller -> Service -> DTO -> JSP` flow

The long-term goal is not to become a stock-picking bot. The project will focus on **traceable scientific evidence** around:

- drugs and therapeutic candidates
- biological targets
- clinical trials
- publications
- FDA/regulatory events
- research changes over time

Every important claim should be connected to a source, retrieval time, and structured evidence record.

## Product direction

```text
Public scientific data
  -> connectors
  -> normalized evidence model
  -> change detection / provenance
  -> research API
  -> web UI

                         +----------------------+
                         | Open-source core     |
                         | self-hostable        |
                         +----------------------+
                                  |
                                  v
+----------------------+   +----------------------+
| Internal research    |   | Hosted SaaS          |
| governed workflows   |   | teams / alerts       |
| GPT-Rosalind later   |   | managed operations   |
+----------------------+   +----------------------+
```

## Three-track strategy

### 1. Open-source project

The reusable core should become a dedicated public repository with a clear license, documentation, tests, releases, issue tracking, and contribution workflow.

Target open-source components:

- ClinicalTrials.gov connector
- OpenAlex/PubMed literature connector
- openFDA connector
- evidence normalization schema
- provenance model
- snapshot/change-detection engine
- REST API
- basic self-hosted UI

The current monorepo is a development starting point. Before applying to any open-source support program, the project should ideally be moved or mirrored into a dedicated repository and demonstrate real usage and active maintenance.

### 2. Life-sciences research

A separate research mode will support legitimate scientific workflows such as:

- target/indication evidence review
- trial landscape analysis
- mechanism-of-action evidence synthesis
- literature comparison
- hypothesis documentation
- reproducible research briefs

If the organization later receives GPT-Rosalind access, Rosalind should be used only inside approved internal research workflows and according to the then-current OpenAI terms.

### 3. SaaS commercialization

The hosted product can monetize operational value rather than access to the source code itself:

- managed hosting
- scheduled data refresh
- watchlists and alerts
- team workspaces
- collaboration and annotations
- audit history
- enterprise SSO/RBAC
- managed connectors
- higher indexing limits

## Important boundary

GPT-Rosalind is currently intended for approved internal life-sciences research workflows. It should **not** be wired directly into a customer-facing commercial SaaS unless OpenAI explicitly allows that use at the time of deployment.

## Documentation

- [Product plan](docs/PRODUCT_PLAN.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Open-source strategy](docs/OSS_STRATEGY.md)
- [GPT-Rosalind readiness](docs/ROSALIND_READINESS.md)
- [SaaS roadmap](docs/SAAS_ROADMAP.md)

## Proposed license

**Apache-2.0 is the current proposal, not yet applied.**

Why it is being considered:

- OSI-approved open-source license
- commercial use allowed
- modification and redistribution allowed
- explicit patent grant
- broad adoption-friendly terms

Do not add a license until the owner confirms the choice and any third-party code is reviewed.

## Official program references

- Codex for Open Source: https://developers.openai.com/community/codex-for-oss
- GPT-Rosalind: https://openai.com/rosalind/
- GPT-Rosalind access: https://openai.com/form/life-sciences-access/
- GPT-Rosalind help: https://help.openai.com/en/articles/20001193
