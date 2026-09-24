# Product Plan — KOSMO BioGraph

## 1. Problem

Life-sciences evidence is fragmented across clinical-trial registries, research papers, regulatory databases, company disclosures, and specialist scientific databases.

A researcher or analyst often has to answer questions such as:

- What clinical trials exist for this drug or target?
- What changed since the last review?
- Which publications support or contradict a mechanism?
- Which source supports this statement?
- What is new enough to justify another review?

KOSMO BioGraph will organize public evidence into a traceable, time-aware research workspace.

## 2. Product principle

The product should prefer:

```text
source -> structured fact -> evidence link -> interpretation
```

over:

```text
AI opinion -> unsupported score
```

Scores may be added later, but they must be explainable and derived from explicit rules or clearly labeled model outputs.

## 3. Initial users

### Open-source users

- developers building biotech research tools
- students learning scientific-data engineering
- bioinformatics / computational-biology developers
- maintainers who need reusable public-data connectors

### Hosted-product users

- biotech research teams
- small investment/research teams studying biotech
- science writers and analysts
- academic research groups
- innovation teams

The product should not present itself as medical advice or an autonomous clinical decision system.

## 4. Core domain model

The first stable schema should contain:

### Drug

- internal id
- preferred name
- aliases
- sponsor/company
- indication
- development stage
- external identifiers

### Target

- gene/protein identifier
- preferred symbol/name
- organism
- pathway references
- external identifiers

### ClinicalTrial

- NCT id
- title
- sponsor
- phase
- status
- interventions
- conditions
- start/completion dates
- locations
- source URL
- retrieved_at

### Publication

- DOI / PMID / OpenAlex id
- title
- abstract metadata
- authors
- publication date
- journal
- citation metadata
- source URL
- retrieved_at

### RegulatoryEvent

- authority
- event type
- product/drug
- date
- source document
- source URL
- retrieved_at

### Evidence

An edge connecting two or more entities.

Examples:

- Drug -> studied_in -> ClinicalTrial
- Drug -> targets -> Target
- Publication -> supports -> Mechanism
- RegulatoryEvent -> affects -> Drug

Each evidence record should include:

- source
- source identifier
- retrieval timestamp
- evidence text/metadata
- confidence type: deterministic / curator / model-assisted
- provenance chain

### SourceSnapshot

Stores the raw or normalized state of a source at a point in time.

### ChangeEvent

Represents a difference between two snapshots.

Examples:

- trial status changed
- trial completion date changed
- new publication discovered
- FDA event added

## 5. MVP

The first useful public MVP should do only five things well.

### Feature 1 — Search

Search by:

- drug
- target
- trial id
- disease/indication
- keyword

### Feature 2 — Evidence page

A single page shows:

- entity summary
- trials
- publications
- regulatory events
- source links
- last-updated timestamp

### Feature 3 — Change detection

Example:

```text
NCT01234567
Previous status: RECRUITING
Current status: COMPLETED
Detected: 2026-10-08
Source: ClinicalTrials.gov
```

### Feature 4 — Watchlist

Users save drugs, targets, or trials.

### Feature 5 — Research brief

Generate a structured brief from collected evidence:

- question
- evidence reviewed
- supporting findings
- conflicting/uncertain findings
- source list
- limitations
- generated-at timestamp

The first version can use deterministic templates. General-purpose AI can later improve summaries. GPT-Rosalind must remain an approved internal-research option, not a public SaaS dependency.

## 6. What the MVP will not do

Initially exclude:

- patient diagnosis
- treatment recommendations
- processing of identifiable patient data
- PHI
- raw personal genomic data
- autonomous wet-lab execution
- autonomous experimental design execution
- stock buy/sell recommendations
- unsupported probability-of-success predictions

## 7. Open-source value

A developer should be able to clone the public core and use it without the hosted SaaS.

Minimum reusable value:

```text
public data source
  -> connector
  -> normalized object
  -> snapshot
  -> diff
  -> REST API
```

This makes the repository a real tool rather than a marketing shell.

## 8. Research value

The research mode should focus on evidence synthesis and reproducibility.

Example workflow:

```text
Question:
"What evidence links Target X to Disease Y?"

1. Retrieve target metadata
2. Retrieve relevant trials
3. Retrieve literature
4. Normalize identifiers
5. rank evidence by transparent criteria
6. show conflicting evidence
7. create cited research brief
8. save workflow + timestamp
```

## 9. Success metrics

### Open-source

- successful self-host installs
- GitHub stars (secondary signal)
- outside issues
- outside pull requests
- contributors
- releases
- packages/downloads
- dependent projects
- documentation usage

### Research

- percentage of statements with provenance
- reproducible queries/workflows
- source freshness
- curator corrections
- time saved on evidence collection

### SaaS

- weekly active research workspaces
- saved watchlists
- alert retention
- team collaboration events
- paid conversion
- infrastructure cost per active workspace

## 10. Recommended project name

Working brand:

**KOSMO BioGraph**

Tagline:

> Open-source, provenance-first life-sciences evidence and change tracking.

The existing folder `kosmo_bio_stock` can remain during migration; renaming packages and repositories should happen only after the architecture is stable.
