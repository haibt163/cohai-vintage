# Cô Hai Vintage — Engineering Governance

The operating model for how work is proposed, implemented, reviewed, approved, merged and evidenced in this repository.
It is the CoHai Travel reference model (OMP 2.0) adapted to this project. Models and tools are interchangeable engineering workers;
**governance stays fixed when the model or tool changes.** A project file may add project-specific names/paths but may not weaken
these principles.

Precedence when instructions conflict: **Project Owner's explicit instruction** → this document → `AGENTS.project.md` →
`AGENTS.md` → tool-specific files (`CLAUDE.md`). Procedures are in `WORKFLOWS.md`.

## 1. Source of truth

- `main` is the canonical, protected source of truth. Local checkouts are working copies.
- Conversation history is context, **not** authoritative memory.
- Durable truth = repository files, Git history, PRs, tests, CI/runtime evidence (including Vercel deployments), and Project Owner decisions.
- If a chat claim and the repository disagree, the repository wins; verify, then correct the record.

## 2. Roles and lanes

**Project Owner** — sets priorities, approves scope/copy/business claims, may approve and execute merges, owns production and secrets.

**Main Engineer lanes** (implementation; peers): Claude Code · Codex CLI/App · OMP CLI · future lanes.
- Lane choice is by task fit, context, resources, availability, quality, latency and cost. Switching lanes is routine
  (including when a session or rate limit is reached) and never changes approval boundaries.
- OMP (incl. via OpenRouter/OpenCode Go) is a routine lane, not a degraded fallback. It is implementation- and audit-capable and has
  **no merge authority**.
- Claude Code and Codex CLI/App are equally merge-capable — but only after an on-record APPROVE (§4).

**Chief Engineer review lanes** (peers): Claude Chat · ChatGPT. They review; they do **not** execute merges.

Review scope (all of): requirements · architecture/design · implementation correctness and maintainability · tests/evidence ·
security/privacy · provenance (media and content) · runtime/deployment implications (Vercel) · risks/unresolved issues · Git state.
Review outcomes are exactly `APPROVE` or `REQUEST CORRECTION` (with numbered, actionable corrections).

Explicit separation of duties: **implementation → review → approval → merge execution → evidence** are distinct steps.
No engineer merges its own unreviewed work. *(Clarification, see §9: the approving reviewer must be a different lane/session from
the author of the change.)*

## 3. Branching and worktrees

- Work on a dedicated feature branch (`feat/…`, `fix/…`, `chore/…`, `docs/…`, `audit/…`). Never commit directly to `main`.
- Use a separate worktree/clone when parallel work could conflict. **Never let two coding agents edit the same worktree at once.**
- Start from a clean tree. On Windows, keep LF line endings (`.gitattributes` enforces it; PowerShell scripts stay CRLF).
- One logical change per commit, so a reviewer can accept or drop it independently.
- Read-only audit/investigation must state **`NO APPLICATION CODE CHANGES.`** in its brief and may run concurrently on a clean repository.

## 4. Merge authority

A merge to protected `main` requires an on-record **APPROVE** from Claude Chat, ChatGPT, or the Project Owner. Once approved, the
Project Owner, Claude Code, or Codex CLI/App may execute the merge. Chat lanes do not execute merges; OMP does not execute merges.
"On record" means written in the PR (or a repository handoff file) with the reviewed commit SHA.

## 5. Evidence and handoffs

Preferred chat-review package:
1. repository ZIP snapshot (project state; `.git` normally excluded);
2. `git status`, `git log -5 --oneline --decorate`, `git show --stat --oneline HEAD` (repository state/history);
3. the **actual output** of the verification commands (execution evidence).

Keep the three layers distinct — a ZIP or Git summary never replaces real lint/typecheck/build/runtime output.

Evidence statuses are strict:
- `VERIFIED` — only with direct evidence (command output, deployment URL + observation, byte comparison, etc.).
- `UNVERIFIED` — proposals, inference, or claims without evidence.
- `FAILED` — confirmed execution failure.

Never call work *fixed, working, passing, complete or production-ready* without the relevant evidence.

Substantial work leaves a durable, repository-visible handoff/audit record covering: scope · design/method · changes/findings ·
tests/verification · evidence · risks · unverified items · Git state · unresolved questions · recommendations · artifact paths and
accessibility. Durable repository files are preferred over relying on conversation memory. See `AUDIT-2026-09-29.md` for a worked example.

## 6. Sessions and cost

- Fresh-session sequence: **read governance → current handover/report → live Git state → relevant code → independently verify
  important prior claims → continue from evidence.**
- Prefer a fresh session at major phase boundaries and for controlled benchmarks.
- Use the least expensive capable lane that can safely do the task, within budget/spend guardrails.
- Model or environment switching never bypasses governance.

## 7. Project-specific evidence rules (Cô Hai Vintage)

- **Visual claims need visual evidence:** desktop and iPhone-width renders of a Vercel preview or production deployment.
  CI green ≠ visually verified (see Phase 5 open items).
- **Photo changes** need before/after rendering and must pass the `apply-photo-replacements.ps1` SHA-256 safeguard.
- **Production** claims need the deployed commit SHA matched to `main` and an observation on the live URL.
- **Business/content claims** (price, stock, condition, provenance, authenticity, measurements) need Owner-supplied or recovered-source
  evidence. Absent that, do not write them.
- **SEO/metadata** claims need the rendered output (view-source, `/sitemap.xml`, `/robots.txt`, schema validator), not just code.

## 8. Approval gates specific to this project

Ask the Project Owner **before**: publishing or changing customer-facing copy that makes a business commitment; changing the production
domain / `NEXT_PUBLIC_SITE_URL`; adding third-party services or secrets (form service, analytics); adding dependencies; purging Git history;
deleting `archive/`; replacing approved photography; changing the approved visual direction (see `AGENTS.project.md` §5).

## 9. Adaptation notes — remove once reconciled with the CoHai Travel reference documents

- This document was written from the stored summary of the CoHai Travel governance model, **not** from the CoHai Travel files
  themselves. File names, headings and wording may differ; where they do, the CoHai Travel text is authoritative for the
  principles and this file is authoritative only for Cô Hai Vintage specifics (§7, §8).
- Additions not stated in the reference summary (confirm or delete): the **author ≠ approving reviewer** clarification in §2; "on record
  means PR/handoff file with reviewed SHA" in §4; the one-logical-change-per-commit rule in §3; the §7 evidence rules and §8 gates.
- The 29 Sep 2026 audit patch set (`chore/audit-2026-09-hardening`) was **authored** by the Claude Chat lane. Under the clarification
  above it should be approved by ChatGPT or the Project Owner, then merged by Claude Code, Codex CLI/App or the Owner.
