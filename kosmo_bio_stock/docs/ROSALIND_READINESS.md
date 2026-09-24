# GPT-Rosalind Readiness Plan

## 1. Current reality

GPT-Rosalind is a specialized OpenAI life-sciences research offering available through a trusted-access program for eligible organizations.

Current official references:

- https://openai.com/rosalind/
- https://openai.com/form/life-sciences-access/
- https://help.openai.com/en/articles/20001193

Current OpenAI guidance says approved API use is for **internal research tools, workflows, and applications** and is not currently available for customer-facing products or external commercial applications.

This document therefore plans for **Rosalind readiness**, not automatic eligibility.

## 2. Research mission

The project should be able to state a legitimate research purpose without referring to investment returns.

Recommended research mission:

> Build reproducible, provenance-rich workflows that help research teams synthesize public evidence across targets, therapeutics, clinical trials, publications, and regulatory events.

Example research questions:

- What evidence supports a target-disease relationship?
- What clinical programs test the same mechanism?
- Which publications conflict on a mechanism?
- What changed in a trial landscape during a defined period?
- What evidence gaps should a human researcher investigate next?

## 3. Separation from the investment use case

The public product may have biotech-market users later, but Rosalind application materials should accurately describe the scientific research workflow.

Do not present:

- stock-picking
- price prediction
- trading automation
- guaranteed drug success predictions

as the scientific purpose of Rosalind access.

## 4. Organization readiness

The current access process asks for organizational information and verification.

Before applying, prepare:

- legal entity or eligible organization
- public website
- named organization owner/admin
- OpenAI organization id if available
- research purpose
- countries of use
- governance owner
- safety policy
- data-handling policy
- approved-user list
- incident process

Access requirements may change, so re-check official documentation at application time.

## 5. Governance boundary

Create two explicit environments.

### A. Public / commercial environment

May contain:

- public data
- normal application API
- standard approved AI models
- customer workspaces
- billing
- alerts

Must not call GPT-Rosalind unless OpenAI later explicitly authorizes that customer-facing use.

### B. Internal research environment

May contain:

- researcher-only workspace
- approved datasets
- reviewed scientific workflows
- GPT-Rosalind if access is granted
- audit trail
- human review

The two environments should use separate:

- API keys
- service accounts
- network policies
- logs
- permissions

## 6. Initial data policy

Start with public, non-sensitive data.

Preferred early sources:

- OpenAlex
- PubMed/NCBI metadata
- ClinicalTrials.gov
- openFDA
- other clearly licensed/public scientific metadata

Initially exclude:

- identifiable patient records
- PHI
- private clinical data
- personal genomic data
- controlled biological design data
- confidential sponsor data

This reduces compliance risk while the product and governance mature.

## 7. Scientific provenance

A Rosalind-ready workflow should make human review easy.

For every research brief, record:

- user question
- source list
- source versions / retrieval times
- structured evidence ids
- workflow version
- model used
- model output
- human review status
- final researcher notes

The model should not be the sole source of truth.

## 8. Human oversight

Required product behavior:

- clearly mark model-generated analysis
- preserve citations
- show uncertainty
- show conflicting evidence
- allow researcher correction
- never silently overwrite source evidence
- preserve an audit trail

## 9. Example internal research workflow

```text
Researcher asks:
"Summarize the evidence linking Target X to Disease Y."

1. Resolve canonical target and disease identifiers
2. Retrieve public trial and literature evidence
3. Store source snapshots
4. Build evidence set
5. Researcher verifies source selection
6. GPT-Rosalind analyzes the approved evidence set
7. Generate a structured internal research brief
8. Researcher reviews, edits, and signs off
9. Save evidence ids + workflow version + review record
```

## 10. Customer-facing boundary

Until terms change, do not implement:

```text
SaaS customer
 -> public web request
 -> GPT-Rosalind API
 -> response to customer
```

Instead:

```text
SaaS customer
 -> public application stack
 -> allowed models / deterministic analysis
```

and separately:

```text
approved internal researcher
 -> internal research environment
 -> GPT-Rosalind
```

Any future use of Rosalind-derived research in external commercial outputs should be reviewed against the then-current OpenAI terms and the organization's legal/compliance requirements.

## 11. Application evidence to build

Before applying, aim to have:

- live project website
- clear research mission
- public technical documentation
- working scientific-data pipeline
- reproducible example workflow
- governance document
- data policy
- security model
- audit capability
- named research owner
- realistic public-benefit statement

## 12. Public-benefit framing

Examples of defensible public-benefit goals:

- reduce time needed to locate and compare scientific evidence
- improve traceability of research summaries
- make changes in clinical evidence easier to detect
- help researchers reproduce evidence-collection workflows
- expose uncertainty and contradictory sources instead of hiding them
