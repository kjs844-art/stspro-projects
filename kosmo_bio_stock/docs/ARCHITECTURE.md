# Architecture — KOSMO BioGraph

## 1. Architecture philosophy

Do not rewrite the current application all at once.

The existing Java/Spring project should become the first API and ingestion service, then new components should be introduced only when they solve a real problem.

## 2. Current stack

The repository currently uses:

- Java 21
- Spring Boot 3.5.x
- Gradle
- JSP/JSTL
- Spring MVC
- OpenAlex HTTP integration

This is a valid starting point.

## 3. Target stack

### Backend / platform API

**Java 21 + Spring Boot 3**

Responsibilities:

- authentication integration
- REST API
- domain model
- user/team/workspace logic
- watchlists
- authorization
- audit events
- SaaS billing boundary
- orchestration of data connectors
- stable public API

Suggested Spring modules:

- Spring Web
- Spring Validation
- Spring Data JPA
- Spring Security
- Actuator
- Flyway
- PostgreSQL driver

### Scientific data / research worker

**Python 3.12 + FastAPI**

Introduce only after the Java MVP is stable.

Responsibilities:

- scientific-data parsing
- bioinformatics utilities
- heavier data transformation
- literature processing
- future model/tool workflows
- future approved GPT-Rosalind research integration

Useful Python packages may include:

- httpx
- pydantic
- pandas
- biopython
- polars where useful
- networkx for evidence-graph experiments

Do not add heavy packages unless a workflow actually needs them.

### Frontend

#### Phase 1

Keep JSP for fast iteration and learning.

#### Phase 2

Move the user interface to:

- React
- TypeScript
- Vite

Why:

- already aligned with the current learning stack
- clean API/UI separation
- easier graph and research-workspace UI
- easier future PWA/mobile wrapper

Suggested UI libraries should remain optional until needed.

### Database

**PostgreSQL**

Core tables:

- organizations
- users
- workspaces
- drugs
- targets
- trials
- publications
- regulatory_events
- evidence
- source_snapshots
- change_events
- watchlists
- research_briefs
- audit_events

Use normal relational tables first.

Add `pgvector` only when semantic search is implemented and benchmarked.

### Cache / job queue

Do not add Redis on day one.

Initial background work can use:

- scheduled Spring jobs
- PostgreSQL job table

Add Redis or a dedicated queue only when ingestion volume requires it.

### Object storage

For large source documents or generated artifacts:

- S3-compatible object storage

The database should store metadata and object references, not large binary blobs.

## 4. Data connectors

Initial public-data connectors:

### OpenAlex

Purpose:

- publication discovery
- metadata
- citation relationships

### ClinicalTrials.gov API v2

Purpose:

- trial metadata
- trial status
- intervention and condition mapping
- snapshot comparison

### openFDA

Purpose:

- public FDA datasets where appropriate

### PubMed / NCBI

Purpose:

- biomedical literature identifiers and metadata

Later candidates:

- Crossref
- UniProt
- Ensembl
- ChEMBL
- PubChem

Every connector should implement a common contract.

Example:

```text
Connector
  fetch()
  normalize()
  sourceMetadata()
  version()
```

## 5. Proposed repository structure

For the future dedicated repository:

```text
kosmo-biograph/
├─ apps/
│  ├─ api/                 # Java Spring Boot
│  ├─ web/                 # React + TypeScript
│  └─ research-worker/     # Python FastAPI
├─ packages/
│  ├─ schemas/
│  └─ connector-spec/
├─ connectors/
│  ├─ openalex/
│  ├─ clinicaltrials/
│  ├─ openfda/
│  └─ pubmed/
├─ infra/
│  ├─ docker/
│  └─ migrations/
├─ docs/
├─ examples/
├─ .github/
│  └─ workflows/
└─ README.md
```

During the current monorepo phase, keep implementation under `kosmo_bio_stock/` and avoid moving files until the migration is deliberately planned.

## 6. API design

Version the API from the beginning.

Example endpoints:

```text
GET  /api/v1/search?q=
GET  /api/v1/drugs/{id}
GET  /api/v1/targets/{id}
GET  /api/v1/trials/{nctId}
GET  /api/v1/publications/{id}
GET  /api/v1/entities/{id}/evidence
GET  /api/v1/entities/{id}/changes
POST /api/v1/watchlists
GET  /api/v1/watchlists/{id}
POST /api/v1/research/briefs
```

All responses that summarize scientific claims should include provenance fields.

## 7. Provenance contract

Every externally sourced record should include:

```json
{
  "source": "clinicaltrials.gov",
  "source_id": "NCT01234567",
  "source_url": "...",
  "retrieved_at": "2026-09-25T00:00:00Z",
  "connector_version": "0.1.0"
}
```

Generated interpretations should separately record:

- model/provider
- model version if available
- prompt/workflow version
- evidence ids used
- generated_at
- human review status

## 8. Change-detection engine

The change engine is a strong open-source differentiator.

Pipeline:

```text
fetch
 -> normalize
 -> canonicalize
 -> hash
 -> compare previous snapshot
 -> classify changed fields
 -> create ChangeEvent
 -> notify subscribers
```

Important:

- store previous normalized state
- ignore known unstable fields
- keep field-level diffs
- never overwrite history

## 9. Research orchestration

Use a separate service boundary for advanced scientific reasoning.

```text
Public SaaS request
       |
       v
Spring API
       |
       +---- normal public-data workflow
       |
       X---- GPT-Rosalind direct customer route
             (do not implement)

Internal approved research workspace
       |
       v
Research Worker
       |
       v
Approved GPT-Rosalind / scientific tools
```

This boundary prevents accidental use of an internal research model in an external commercial path.

## 10. Authentication and authorization

Phase 1:

- local dev users or basic auth only in development

Production:

- OIDC/OAuth provider
- workspace membership
- RBAC
- service-to-service credentials
- short-lived tokens where possible

Authorization must be checked in the backend, never only in React.

## 11. Security baseline

- secrets only through environment variables or secret manager
- never commit API keys
- dependency scanning
- branch protection
- code review
- rate limiting
- input validation
- output encoding
- SQL parameterization
- strict CORS
- CSRF protection where cookie auth is used
- audit logs for sensitive actions
- tenant isolation tests
- backups
- restore tests

## 12. Testing

### Java

- JUnit 5
- Spring Boot Test
- Testcontainers for PostgreSQL integration tests

### Python

- pytest
- contract tests against saved source fixtures

### Frontend

- Vitest
- React Testing Library
- Playwright for critical flows

### Connector tests

Do not depend entirely on live external APIs in CI.

Store sanitized fixtures and run:

- parser tests
- schema tests
- change-detection tests

A smaller scheduled integration job can verify live source compatibility.

## 13. CI/CD

GitHub Actions:

```text
pull request
 -> format/lint
 -> unit tests
 -> schema tests
 -> security checks
 -> build

main
 -> build containers
 -> integration tests
 -> release artifact
```

Do not automate production deployment until secrets, rollback, and environment separation are in place.

## 14. Deployment

Development:

- Docker Compose
- PostgreSQL
- API
- web
- optional research worker

Initial SaaS:

- one managed PostgreSQL instance
- containerized API
- static/frontend hosting
- object storage
- managed secrets

Kubernetes is not required for the first product.
