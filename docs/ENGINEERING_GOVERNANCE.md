# Cô Hai Vintage — Engineering Governance

**Effective:** 30 September 2026 (aligned to the CoHai Travel master, `ENGINEERING_GOVERNANCE.md` effective 26 September 2026)

## 1. Purpose

This document defines the live engineering governance for Cô Hai Vintage.

The project uses multiple AI engineering environments, but governance does not depend on a particular model or vendor. Implementation
work may move between Main Engineer lanes without changing the review or approval boundary. Governance stays fixed when the model or
tool changes. A project file may add project-specific names and paths but may not weaken these principles.

Precedence when instructions conflict: **Project Owner's explicit instruction** → this document → `AGENTS.project.md` → `AGENTS.md` →
tool-specific files (`CLAUDE.md`). Procedures are in `docs/AI_ENGINEERING_WORKFLOW.md`.

## 2. Roles

### Project Owner — final authority

The Project Owner is the final human authority for the project. The Project Owner:

- defines product intent and priorities;
- decides whether proposed scope should proceed;
- gives the final green light for protected `main`;
- may override or reject an engineering recommendation;
- owns the final release decision (production domain, secrets, business claims).

### Chief Engineer — Chat lane

The Chief Engineer role may be performed by **Claude Chat or ChatGPT**. These two chat/review lanes have the same role, authority and
review responsibility. Neither is superior to the other by vendor or model, and neither is a fallback for the other — either may
independently review evidence and issue the governing outcome for a given piece of work.

The Chief Engineer is the independent engineering review and quality gate. It reviews substantial engineer work before that work is
eligible for the Project Owner's final approval.

**Evidence-access boundary:** a chat/review session may have no live access to the repository, Git history, or a runnable environment.
Chat therefore works from what the Project Owner pastes or uploads (diffs, logs, ZIP, handoff documents), or from explicitly available
connector access. A direct-repository coding lane may instead have local repository and shell access. Reviews must say plainly which
situation applies — a review based only on handed-over material is not the same as one backed by direct inspection, and the review
output must not blur the two. This applies equally to Claude Chat and ChatGPT.

The Chief Engineer reviews, as applicable:

- scope and requirements;
- architecture and design;
- implementation quality;
- code correctness and maintainability;
- tests and verification evidence;
- security and privacy risks;
- data and source provenance (recovered media and content);
- deployment/runtime implications (Vercel);
- remaining risks and unresolved issues;
- Git branch, commit and pull-request state.

Chief Engineer outcomes are:

**APPROVE** — the work is acceptable for Project Owner consideration.

**REQUEST CORRECTION** — the work must be corrected and re-verified before it can proceed.

Chief Engineer approval is an engineering gate, not the final product-owner approval. An APPROVE from either chat lane carries the same
weight, and a REQUEST CORRECTION from either lane is likewise binding on its own. For the specific act of merging to `main`, §6a is the
authoritative definition of the gate.

### Main Engineers — interchangeable implementation lanes

Cô Hai Vintage has the following Main Engineer lanes:

1. **Claude Code** — local Claude Code CLI, with direct repository, shell and Git access when run in that environment. `CLAUDE.md`
   provides Claude-specific operating guidance.
2. **Codex CLI / Codex App** — the local Codex engineering lane using available GPT/Codex models.
3. **OMP CLI** — the local multi-model engineering lane using DeepSeek, GLM, Kimi and Qwen (and other models as available) through
   OpenRouter or OpenCode Go. These are full implementation substitutes, used routinely for cost/availability reasons and especially
   when session limits are hit on other lanes — not backup-only or degraded lanes.

Claude Code and Codex CLI/App have the same Main Engineer role and governance standing, including the same merge-execution authority
(§6a). Environment capabilities can differ, but governance does not, and neither lane is a fallback for the other.

**Codex Cloud is not an approved engineering lane** (retired in the CoHai Travel reference model) and must not be selected for
Cô Hai Vintage work.

Lanes may be used interchangeably according to task fit, context capacity, local-resource constraints, quality, latency, cost and
availability.

**Workflow for Codex CLI/App and OMP specifically:** these lanes commit their work to a dedicated feature/sub-branch, never to `main`.
Once that branch is ready, the active Chief Engineer chat lane (Claude Chat or ChatGPT), or a peer engineer when appropriate, reviews
it. Only after an APPROVE is on record from the active Chief Engineer chat lane or the Project Owner may the Project Owner, Claude Code
or Codex CLI/App merge that branch into `main`. OMP does not gain merge authority by having its branch reviewed or merged.

No lane merges its own unreviewed work to `main`.

## 3. Engineering pipeline

```text
Project Owner defines task
        ↓
Choose Main Engineer lane
   ┌──────────────┬───────────────┬──────────────────────┐
   │               │               │                      │
   ▼               ▼               ▼                      ▼
Claude Code    Codex CLI/App     OMP CLI              (future lanes)
(CLAUDE.md)    GPT/Codex models  DeepSeek/GLM/Kimi/Qwen
   (peer, merge-capable)
   └──────────────┴───────────────┴──────────────────────┘
                 ↓
          Implement / investigate
                 ↓
          Tests + evidence + handoff
                 ↓
       Chief Engineer — Claude Chat or ChatGPT (peers)
          APPROVE / REQUEST CORRECTION
                 ↓
     APPROVE from Chief Engineer chat OR Project Owner
     — Project Owner relays the APPROVE when needed
                 ↓
        merge executed by Project Owner, Claude Code, or Codex CLI/App
        (Claude Code and Codex CLI/App are equally merge-capable —
         never by chat; OMP does not execute merges)
                 ↓
              protected `main`
```

Model or environment switching does not bypass any stage. Merge authority itself (who may approve, who may execute) is defined
exclusively in §6a and does not vary by which Main Engineer lane produced the work, nor by which chat lane approved it.

## 4. Choosing the Main Engineer

Use the least expensive capable lane that can safely perform the task, and switch lanes freely when a session limit is hit on the
current one — this is expected routine behaviour, not an exception.

Selection factors: task complexity · required context window · repository size · local PC resource constraints · model quality for the
specific task · execution environment requirements · cost and OpenRouter/OpenCode Go spend guardrails · current availability/session
limits · need for direct local Git/GitHub control.

A task may move between lanes when useful. The incoming engineer must read the repository governance, current handoff/report, live Git
state and relevant evidence before continuing — regardless of which lane it is.

Claude Code and Codex CLI/App are equivalent Main Engineer choices; neither receives a governance preference. The same holds for Claude
Chat and ChatGPT as Chief Engineer choices — selection between either pair is a matter of session availability, context and cost, never
of standing.

## 5. Task modes

Every engineering request must be treated as one of these modes:

### Implementation

The engineer may modify application code, tests, configuration or documentation within the authorized scope. Implementation work should
use a dedicated feature branch/worktree when parallel coding could otherwise conflict.

### Read-only audit / investigation

The engineer inspects the repository and records findings without changing application code. Read-only work must explicitly state:

`NO APPLICATION CODE CHANGES.`

Independent read-only audits may inspect the same clean repository concurrently.

## 6. Branch and Git rules

- `main` is the protected integration branch and source of record.
- Engineer implementation work should occur on a dedicated feature branch/worktree (`feat/…`, `fix/…`, `chore/…`, `docs/…`, `audit/…`).
- Coding agents must not edit the same worktree simultaneously.
- Engineers may commit their own implementation branches and push/open/update PRs when the active environment has the required GitHub access.
- Engineers must not bypass the Chief Engineer review boundary.
- No engineer merges its own unreviewed work to `main`.
- A successful test run does not itself authorize a merge.
- Silence or lack of objection is not approval.
- Prior model approval does not substitute for the current review.
- A merge requires an APPROVE from the active Chief Engineer chat lane (Claude Chat or ChatGPT — either is sufficient on its own) or the
  Project Owner — see §6a for exactly who may then execute it.
- Keep LF line endings (`.gitattributes`); one logical change per commit so a reviewer can accept or drop it independently.

## 6a. Merge authority (Project Owner, Claude Code, and Codex CLI/App)

Merge execution authority to protected `main` is held equally by the Project Owner, Claude Code and Codex CLI/App. Claude Code and Codex
CLI/App are peer, equally higher-trust, merge-capable Main Engineer lanes — neither is the primary and neither is the other's fallback;
OMP is not merge-capable.

**Approval gate.** A merge to `main` requires an APPROVE on record from one of:

- Claude Chat, acting as Chief Engineer;
- ChatGPT, acting as Chief Engineer; or
- the Project Owner, directly.

Claude Chat and ChatGPT satisfy this gate identically — an APPROVE from either one, alone, is sufficient. A Main Engineer self-review, a
passing test suite, or another Main Engineer lane's sign-off does not by itself satisfy the Chief Engineer approval gate.

**No direct chat-to-coding handoff is assumed.** The Project Owner relays an APPROVE to the active implementation lane when needed.
Nothing in this document implies an automatic or live hand-off.

**Who executes the merge, once approved.** The Project Owner, Claude Code or Codex CLI/App may perform the merge to protected `main` and
should record the approval source. Claude Code and Codex CLI/App hold this execution authority equally; there is no default or preferred
executor between them. Chat lanes do not execute merges; OMP does not execute merges.

**No approval, no merge.** If neither the Chief Engineer chat lane nor the Project Owner has approved the work, no merge to `main` may occur.

## 7. Pull-request review boundary

A normal implementation handoff should contain: task and scope · design/approach · files or surfaces changed · tests and verification
results · direct evidence · remaining risks · unverified items · branch name · commit SHA · PR number/URL when applicable.

The Chief Engineer may review the branch or PR and either approve it for Project Owner consideration or request explicit corrections.
Where the Chief Engineer role is running in a chat session without direct repo access, the handoff itself — pasted or uploaded — is the
evidence; the review should note this explicitly rather than implying independent verification that did not happen.

**Standard handoff package: ZIP snapshot + Git state.** For a chat-based Chief Engineer review, the preferred handoff is two parts
together, not either alone:

1. a repository ZIP snapshot taken at the point the Main Engineer finished, produced by the project's zip script
   (`create-project-zip-universal.ps1`), which **includes `.git`** (and `.github`, `.claude`, `.omp`, `.vercel` when present) and excludes
   only local/runtime material such as `node_modules`, `.next` and `.env` files; and
2. the engineer's own Git output from that same point — at minimum `git status`, `git log -5 --oneline --decorate` and
   `git show --stat --oneline HEAD`.

The ZIP lets the Chief Engineer inspect the full repository state directly; the Git output locates exactly what changed and where it sits
in history. Neither substitutes for the other.

This package still does not give the chat lane the ability to execute anything — no install, no test run, no build. A ZIP-based review
verifies what the code says and does static analysis of that; it does not verify that lint, typecheck or build actually passed. The
handoff must therefore also include the **actual output** of the verification commands the Main Engineer ran (`AGENTS.project.md` §8),
not just the Git summary.

## 8. Evidence standard

- **VERIFIED** — supported by direct repository, command, test, CI or runtime evidence.
- **UNVERIFIED** — proposal, inference or claim lacking sufficient direct evidence.
- **FAILED** — execution produced a confirmed failure.

Do not describe work as fixed, passing, working, complete or production-ready without the relevant evidence.

## 9. Durable handoffs

Substantial work must leave repository-visible evidence. Conversation history is useful context but is not the durable source of truth.
Preferred evidence: repository documentation · audit reports · implementation handoffs · Git commits · pull requests · automated test
output · CI results · runtime verification (Vercel deployment SHA and live-URL observations). For generated external artifacts, also
record the exact workspace path and user-accessibility/retrieval status. `AUDIT-2026-09-29.md` is a worked example.

## 10. Cross-agent continuity

A new engineer must not assume it knows another engineer's prior conversation. Preferred starting sequence:

```text
read governance
→ read current handover/report
→ inspect live Git state
→ inspect relevant code
→ independently verify important prior claims
→ continue from evidence
```

Fresh sessions are preferred for major phase boundaries and controlled benchmarks. `main` on GitHub is the canonical source of truth;
local folders are working copies; conversation history is context, not authoritative memory.

## 11. Cost discipline

The project favours economical, capable models within the Project Owner's fixed monthly budget (current figures are stated in the CoHai
Travel governance §11 and are intentionally not duplicated here). DeepSeek, GLM, Kimi and Qwen through OMP are valid production engineering
lanes, not inferior fallback-only systems, and see routine use whenever a primary lane's session limit is reached. Claude Code and
Codex CLI/App are equivalent Main Engineer lanes; Claude Chat and ChatGPT are equivalent Chief Engineer lanes; choose between the members
of each pair by task fit, environment, context, availability, quality and cost — never by standing preference. OpenRouter/OpenCode Go
spend guardrails remain active for OMP-based work. Codex Cloud is not an approved lane.

## 12. Simple operating rule

```text
MAIN ENGINEERS (peers)
Claude Code ↔ Codex CLI/App ↔ OMP (DeepSeek/GLM/Kimi/Qwen)
  (Claude Code and Codex CLI/App are equally merge-capable;
   OMP is implementation-only)
                  │
                  ▼
   CHIEF ENGINEER (peers) — Claude Chat or ChatGPT
                  │
                  ▼
 APPROVE from Chief Engineer chat OR Project Owner required
 — either chat lane's APPROVE is independently sufficient
 — Project Owner relays the APPROVE when needed
                  │
                  ▼
       merge executed by Project Owner, Claude Code, or Codex CLI/App
       (never by chat; OMP does not execute merges)
                  │
                  ▼
             protected `main`
```

No model, agent, tool, successful test, deadline or previous decision may skip getting that APPROVE. Merge *execution* authority is held
equally by the Project Owner, Claude Code and Codex CLI/App (§6a). No lane within either peer pair outranks its peer.

## 13. Cô Hai Vintage-specific additions (not in the CoHai Travel master)

These adapt the master to this project. They add evidence requirements and gates; they do not weaken any rule above.

**Evidence rules**
- Visual claims need visual evidence: desktop and iPhone-width renders of a Vercel preview or production deployment. CI green ≠ visually verified.
- Photo changes need before/after rendering and must pass the `apply-photo-replacements.ps1` SHA-256 safeguard.
- Production claims need the deployed commit SHA matched to `main` and an observation on the live URL (`scripts/verify-deployment.mjs`).
- Business/content claims (price, stock, condition, provenance, authenticity, measurements) need Owner-supplied or recovered-source evidence.
- SEO/metadata claims need the rendered output (view-source, `/sitemap.xml`, `/robots.txt`, schema validator), not just code.

**Approval gates.** Ask the Project Owner before: publishing customer-facing copy that makes a business commitment; changing the production
domain or `NEXT_PUBLIC_SITE_URL`; adding third-party services or secrets; adding dependencies; purging Git history; deleting `archive/`;
replacing approved photography; changing the approved visual direction (`AGENTS.project.md` §5).

**Author ≠ approving reviewer (proposed clarification of "independent").** A lane or session that authored a change must not be the one that
approves it: e.g. work authored by Claude Chat is approved by ChatGPT or the Project Owner. This mirrors how audit PR #1 was handled.
*Proposed for promotion into the master if the Project Owner agrees.*

**"On record" means** written in the PR (or a repository handoff file) with the reviewed commit SHA; a later commit needs a fresh APPROVE
or the Project Owner's explicit confirmation.

## 14. Reconciliation notes (remove once the master is updated)

- Aligned on 30 Sep 2026 against the uploaded master files dated 26 Sep 2026. Vercel shows a later CoHai Travel merge (27 Sep,
  "integrate Karpathy-derived agent principles into governance docs"); if that changed governance wording, re-diff this file and the
  working principles in `AGENTS.md` §4.
- The master governance §2 says Chief Engineer approval is "not the final product-owner approval", while §6a lets a chat APPROVE alone
  satisfy the merge gate. This file follows §6a for merging (as the master workflow §5 also says). Worth clarifying in the master.
- Earlier drafts of this project's docs said `.git` is normally excluded from review ZIPs; the master and the zip script include it. Fixed here.
