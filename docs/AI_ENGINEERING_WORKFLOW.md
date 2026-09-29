# Cô Hai Vintage — AI Engineering Workflow

**Last updated: 30 September 2026** (aligned to the CoHai Travel master `AI_ENGINEERING_WORKFLOW.md` dated 26 September 2026;
supersedes the earlier `WORKFLOWS.md`). Sections 1–11 mirror the master. Sections 12–19 are Cô Hai Vintage procedures.
See `docs/ENGINEERING_GOVERNANCE.md` for the role and approval model.

## 1. Source of truth

- GitHub `main` is the canonical repository source of truth unless explicitly overridden.
- Local project folders/checkouts are working copies unless explicitly declared otherwise.
- Session history from any lane (Claude Code, Codex, OMP, Claude Chat, ChatGPT) is useful context, not authoritative project memory.
- Durable truth comes from repository files, Git history, PRs, tests, CI/runtime evidence, and Project Owner decisions.

## 2. Live engineering pipeline

```text
Project Owner defines task
        ↓
Choose Main Engineer lane
   ┌───────────────┬────────────────┬─────────────────────────┐
   ▼                ▼                ▼                         ▼
Claude Code    Codex CLI/App       OMP CLI                (future lane)
(CLAUDE.md)    GPT/Codex models    DeepSeek/GLM/Kimi/Qwen
(peer, merge-capable)
   └───────────────┴────────────────┴─────────────────────────┘
                  ↓
           implementation / audit
                  ↓
           tests + evidence + handoff
                  ↓
      Chief Engineer — Claude Chat or ChatGPT (peers)
        APPROVE / REQUEST CORRECTION
                  ↓
      APPROVE from Chief Engineer chat OR Project Owner
      — either chat lane's APPROVE is independently sufficient
      — Project Owner relays the APPROVE when needed
                  ↓
      merge executed by Project Owner, Claude Code, or Codex CLI/App
      (equally merge-capable — never by chat; OMP does not execute merges)
                  ↓
              protected `main`  →  Vercel production deployment
```

Codex Cloud is not part of the workflow.

## 3. Main Engineer lanes

- **Claude Code** — full Main Engineer lane with local shell/filesystem/Git access; `CLAUDE.md` gives Claude-specific guidance. Peer of Codex CLI/App.
- **Codex CLI / Codex App** — local Codex lane using GPT/Codex models; same merge-capable standing as Claude Code. Use the CLI for direct
  terminal control; use the App when its agent/worktree interface is more convenient.
- **OMP CLI** — local multi-model lane (DeepSeek, GLM, Kimi, Qwen via OpenRouter or OpenCode Go). May perform the same substantive
  implementation classes when it is the better fit for cost, quality, context, latency or availability — and routinely when a session
  limit is hit elsewhere. OMP holds no merge authority.
- **Switching lanes:** a task may move between lanes when that improves results or a session/rate limit forces it. The incoming engineer
  reads governance, the handoff/report, live Git state and evidence first. Changing models or tools never changes the approval boundary.

## 4. Chief Engineer review

The role may be performed by **Claude Chat or ChatGPT** — peers; either lane's review and outcome stands on its own.

- **Chat** reviews what the Project Owner pastes/uploads (ZIP, diffs, logs, test output, handoff docs) or connector-provided repo access
  when explicitly available. No assumption of live repository access unless stated. The review must say which basis it used.
- **A coding lane offering a peer review** may inspect its local repository, but that does not replace the Chief Engineer gate.

The review covers, as applicable: scope and requirements · architecture and design · implementation quality and correctness · tests and
verification evidence · security and privacy · data/source provenance · runtime and deployment implications · remaining risks and
unresolved issues · branch, commit and PR state.

Outcome: **APPROVE** (acceptable for Project Owner consideration) or **REQUEST CORRECTION** (corrections and re-verification required).

## 5. Project Owner authority and merge execution

The Project Owner is the final human authority over scope, priorities and whether to override any recommendation. For merging to
protected `main`, the gate is satisfied by an APPROVE from **either** Claude Chat or ChatGPT (Chief Engineer) **or** the Project Owner
directly — `docs/ENGINEERING_GOVERNANCE.md` §6a is authoritative. No engineer, model, tool, successful test, prior approval, silence or
deadline substitutes for that gate. Once satisfied, the Project Owner, Claude Code or Codex CLI/App may execute the merge (equal
authority, no preferred executor) and should record the approval source. Chat lanes and OMP do not execute merges. The Project Owner
relays the APPROVE when needed.

## 6. Read-only audits

Independent read-only audits may inspect the same clean repository concurrently. Read-only agents must not modify application code unless
explicitly authorized, and must state: `NO APPLICATION CODE CHANGES.`

## 7. Implementation isolation

Each implementation effort uses its own feature branch/worktree where parallel coding could conflict. Never allow two coding agents to
edit the same worktree simultaneously — this applies to Claude Code, Codex CLI/App, OMP and any other coding agent.

## 8. Audit trail and handoff

Substantial work must leave durable repository-visible evidence rather than relying on conversation memory. Lighter-weight handoffs are
acceptable for small/exploratory work (all lanes); the templates below are the standard for substantive changes and anything crossing the
Chief Engineer boundary.

**Standard package for chat-based Chief Engineer review** — the Main Engineer's finishing sequence:

```text
git status
git log -5 --oneline --decorate
git show --stat --oneline HEAD
        ↓
run the project's ZIP snapshot script  (create-project-zip-universal.ps1 — includes .git)
        ↓
hand off: ZIP + Git output + verification command output
```

The ZIP and the Git output serve different purposes and neither replaces the other. Neither replaces the actual verification commands (§9)
and their real output.

### Audit report

```markdown
# [Audit Title]
## Scope
## Repository State
## Method
## Findings
## Evidence
## Verification Status
### VERIFIED
### UNVERIFIED
### FAILED
## Risks / Concerns
## Unresolved Questions
## Recommendations
## Changes Made
## Handoff
```

### Implementation handoff

```markdown
# Implementation Handoff
## Task
## Scope
## Design
## Changes
## Tests / Verification
## Evidence
## Remaining Risks
## Unverified
## Git
Branch:
Commit:
PR:
```

For generated external artifacts, also record the exact workspace path and user-accessibility/retrieval status.

## 9. Verification standard

- **VERIFIED** = supported by direct repository, command, test, CI or runtime evidence.
- **UNVERIFIED** = proposal, inference or claim lacking sufficient direct evidence.
- **FAILED** = confirmed execution failure.

Do not call changes fixed, working, passing, complete or production-ready without the relevant evidence. The standard command set for this
project is in §12.

## 10. Fresh-session rule

At the beginning of every new Cô Hai Vintage engineering session:

1. inspect live Git state;
2. read `docs/ENGINEERING_GOVERNANCE.md`;
3. read the current handover/report (`PROJECT_STATUS.md`, latest `AUDIT-*.md`) and relevant project plans;
4. identify whether the task is implementation or read-only audit;
5. choose a Main Engineer lane based on task fit, context, local resources, availability, quality and cost — Claude Code and Codex CLI/App
   are equally valid first choices;
6. state the evidence and handoff deliverable;
7. independently verify important prior claims before relying on them.

Do not treat prior chat history as authoritative. (Also read `AGENTS.md` and `AGENTS.project.md`.)

## 11. Cost discipline

Use the least expensive capable engineering lane that can safely perform the task, within the Project Owner's fixed monthly budget
(`docs/ENGINEERING_GOVERNANCE.md` §11). OpenRouter/OpenCode Go spend guardrails remain active for OMP. Switching lanes when a session limit
is hit is routine, not an escalation — likewise between Claude Code and Codex CLI/App, and between Claude Chat and ChatGPT. Model choice
can change without changing governance.

---

# Part B — Cô Hai Vintage procedures

Commands assume Windows PowerShell from the repository root (they also work in bash unless noted). Node 22 (`.nvmrc`).

## 12. Standard verification set

```bash
npm ci                 # fresh clone or dependency change
npm run check:media    # media references exist; no logs/plugin caches under public/
npm run lint
npm run typecheck
npm run build
```

Paste the actual output into the PR/handoff. For anything user-visible, also verify on a Vercel **preview** (desktop + iPhone width). After a
production deploy run `node scripts/verify-deployment.mjs https://<production-domain>` (§16) and paste its output.

## 13. Implementation task

1. Confirm scope and success criteria (what will be observably true when done). Ask the Owner if a gate in Governance §13 applies.
2. `git switch main && git pull --ff-only && git switch -c <type>/<short-name>` (or a separate worktree if another agent is active).
3. Make the smallest change that meets the criteria; follow existing patterns (`AGENTS.md` §4).
4. Commit in logical units with messages that say what and why.
5. Run §12. Fix failures; never bypass safeguards (e.g. the photo apply script).
6. Push the branch and open a PR: scope, files changed, verification output, risks, UNVERIFIED items, Owner decisions.
7. Request Chief Engineer review (§14). Do not merge your own work.

## 14. Requesting and performing a Chief Engineer review

**Author prepares:** the ZIP (via `create-project-zip-universal.ps1`) or PR link; `git status`, `git log -5 --oneline --decorate`,
`git show --stat --oneline HEAD`; the §12 output (plus preview URL and observations for visual changes); the handoff/audit file listing
UNVERIFIED items and open Owner decisions.

**Reviewer (Claude Chat or ChatGPT — a different lane/session from the author)** checks in order: requirements → design → correctness and
maintainability → tests/evidence → security/privacy → provenance → deployment implications → risks → Git state, then replies:

```
REVIEW OUTCOME: APPROVE | REQUEST CORRECTION
Reviewed commit: <sha>   Branch/PR: <name>
Evidence basis: handed-over material only (ZIP/PR/logs) | direct repository access
Corrections (if any): 1) … 2) …
Evidence relied on: <what was actually seen>   UNVERIFIED: <what was not>
```

An APPROVE is valid for the stated SHA only.

## 15. Merging

1. Confirm an on-record APPROVE for the current head SHA and CI green.
2. Executor = Project Owner, Claude Code or Codex CLI/App (not OMP, not a chat lane). Record the approval source in the PR.
3. After merge: confirm the Vercel production deployment is built from the new `main` SHA, run §16, update `PROJECT_STATUS.md`.

## 16. Release / deployment verification (Vercel)

- Preview per PR; production deploys from `main`.
- Confirm environment variables for the target (`NEXT_PUBLIC_SITE_URL`).
- Run `node scripts/verify-deployment.mjs <origin>`: checks status codes, redirects, headers, canonical/sitemap/robots host, JSON-LD,
  Open Graph image, locale `<html lang>`, 404 and the image optimiser. It is **necessary but not sufficient**: sharpness, layout, motion
  and mobile behaviour still need a human look at desktop and iPhone widths.
- Record the deployed commit SHA (Vercel dashboard or connector) and what was observed; only then mark items VERIFIED in `PROJECT_STATUS.md`.
- Rollback = revert the merge commit on `main` (or promote the previous Vercel deployment) and record it.

## 17. Photography replacement

Follow `PHOTO-REPLACEMENT-GUIDE.md` exactly (stage → replace with identical filenames → `apply-photo-replacements.ps1` → render on desktop and
iPhone → §12). Look in `archive/wordpress-recovery/2025/03/` for genuine originals first. Never bypass a failed safeguard.

## 18. Switching lanes mid-task

Commit or stash cleanly, refresh the handoff (§8) with current Git state and next step, then start the new lane at §10. Do not let two
agents share a worktree. Approval boundaries are identical in every lane.

## 19. Prompt templates

**Implementation brief**
```
Read docs/ENGINEERING_GOVERNANCE.md, AGENTS.md, AGENTS.project.md, PROJECT_STATUS.md, then live Git state.
Task: <…>. Success criteria: <observable outcomes>. Branch: <type/name>. Do not merge.
Run §12 verification and include the output in the PR. List UNVERIFIED items.
```
**Read-only audit brief**
```
NO APPLICATION CODE CHANGES.
Read docs/ENGINEERING_GOVERNANCE.md, AGENTS.md, AGENTS.project.md, PROJECT_STATUS.md. Audit: <area>.
Deliver a report using the §8 audit template with VERIFIED/UNVERIFIED/FAILED per finding.
```
**Chief Engineer review request**
```
Review branch <name> @ <sha> against docs/ENGINEERING_GOVERNANCE.md §2 review scope. Package attached: ZIP (from
create-project-zip-universal.ps1), git status/log/show --stat, verification output, handoff file. Say whether your review is based on
handed-over material only. Reply with APPROVE or REQUEST CORRECTION using the §14 format.
```
