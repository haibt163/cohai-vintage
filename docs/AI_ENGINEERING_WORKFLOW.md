# Cô Hai Vintage — AI Engineering Workflow

**Last updated: 30 September 2026** (supersedes 26 September 2026 version)

## 1. Source of truth

- GitHub `main` is the canonical repository source of truth unless
  explicitly overridden.
- Local project folders/checkouts are working copies unless explicitly
  declared otherwise.
- Session history from any lane (Claude Code, Codex, OMP) is useful
  context, not authoritative project memory.
- Durable truth comes from repository files, Git history, PRs, tests,
  CI/runtime evidence, and Project Owner decisions.
- See `docs/ENGINEERING_GOVERNANCE.md` for the role and approval model.

## 2. Live engineering pipeline

```text
Project Owner defines task
        ↓
Choose Main Engineer lane
   ┌───────────────┬────────────────┬─────────────────────────┐
   │                │                │                         │
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
      (Claude Code and Codex CLI/App are equally merge-capable —
       never by chat; OMP does not execute merges)
                  ↓
              protected `main`
```

Codex Cloud is retired and not part of the workflow.

**Two-lane mode.** For audits, small revisions and ad hoc tasks, Claude Chat
or ChatGPT may act as the Main Engineer (author) while the other chat lane
acts as Chief Engineer (see `docs/ENGINEERING_GOVERNANCE.md` §2a). The
author never approves their own change (§2b).

## 3. Main Engineer lanes

### Claude Code

Claude Code is a full Main Engineer lane with local shell/filesystem/Git
access when run in that environment. `CLAUDE.md` provides Claude-specific
operating guidance. Claude Code has the same Main Engineer role and
higher-trust, merge-capable standing as Codex CLI/App — the two are peers,
not primary-and-backup.

### Codex CLI / Codex App

The official Codex lane for Cô Hai Vintage is local Codex via the CLI or
Windows App, using available GPT/Codex models. It holds the same
merge-capable standing as Claude Code (see `docs/ENGINEERING_GOVERNANCE.md`
§6a).

Use the CLI when direct terminal control, command visibility, Git
operations and interactive debugging are valuable. Use the App when its
agent/worktree interface is more convenient for local development or
parallel work.

### OMP CLI

OMP CLI is the local multi-model engineering lane using DeepSeek, GLM,
Kimi, and Qwen through OpenRouter or OpenCode Go. These models may perform
the same substantive implementation classes as Claude Code or Codex when
they are the better fit for cost, quality, context, latency, or
availability — and routinely when a session limit is hit elsewhere. OMP
does not hold merge authority, regardless of the implementation work it
performs.

### Retired environment

**Codex Cloud is permanently retired from Cô Hai Vintage engineering. Do not
select it, route work to it, or treat it as an approved fallback.**

### Switching lanes

A task may move between any of the lanes above when that improves
engineering results or is forced by a session/rate limit. The incoming
engineer must read the current governance, handoff/report, live Git state
and relevant evidence before continuing.

Changing models or tools never changes the approval boundary.

## 4. Chief Engineer review

The Chief Engineer role may be performed by the active chat/review lane:
**Claude Chat or ChatGPT**. These two chat lanes have the same governance
role and review authority — peers, not primary-and-backup. Either lane's
review and outcome stands on its own; neither requires confirmation from
the other.

- **Chat** — reviews based on what the Project Owner pastes/uploads (diffs,
  logs, test output, handoff docs), or on connector-provided repo access when
  explicitly available. No assumption of live, independent repository access
  unless stated. This applies equally to Claude Chat and ChatGPT.
- **A coding lane providing a peer review** may inspect its local repository
  directly, but peer review does not replace the Chief Engineer gate. Any
  Main Engineer lane offering peer review is held to the same evidence
  standard as any other.

Either way, the review covers, as applicable:

- scope and requirements;
- architecture and design;
- implementation quality and correctness;
- tests and verification evidence;
- security and privacy;
- data/source provenance;
- runtime and deployment implications;
- remaining risks and unresolved issues;
- branch, commit and PR state.

Outcome:

**APPROVE** — acceptable to merge under `docs/ENGINEERING_GOVERNANCE.md` §6a
(the approving lane must not be the author — §2b).

**REQUEST CORRECTION** — corrective actions and re-verification are
required.

A Chief Engineer APPROVE from either chat lane satisfies the merge gate on
its own (governance §6a); the Project Owner has the same standing and keeps
override authority (governance §2).

## 5. Project Owner authority and merge execution

The Project Owner is the final human authority over scope, priorities, and
whether to override any engineering recommendation, and may override any
governance rule when that benefits the project (governance §2). The approver
of a change is never its author (governance §2b).

For the specific act of merging to protected `main`, the approval gate is
satisfied by an APPROVE from **either** Claude Chat or ChatGPT acting as
Chief Engineer — either one alone is sufficient, with no preference between
them — **or** the Project Owner directly — see
`docs/ENGINEERING_GOVERNANCE.md` §6a for the authoritative definition.
No engineer, model, tool, successful test, prior approval, silence or
deadline substitutes for that gate.

Once the gate is satisfied, the Project Owner, Claude Code, or Codex CLI/App
may execute the merge — Claude Code and Codex CLI/App hold this authority
equally, with no default or preferred executor between them. The active
chat/review lane may approve but does not execute merges from chat-only
environments, regardless of which chat lane it is. OMP does not execute
merges. There is no direct live channel between the chat/review lane and
the implementation lane, so the Project Owner relays the APPROVE when
needed.

## 6. Read-only audits

Independent read-only audits may inspect the same clean repository
concurrently for archaeology, architecture reconnaissance, security
review, verification or other analysis.

Read-only agents must not modify application code unless explicitly
authorized.

Read-only work must explicitly state:

`NO APPLICATION CODE CHANGES.`

## 7. Implementation isolation

Each implementation effort should use its own feature branch/worktree
where parallel coding could conflict.

Never allow two coding agents to edit the same worktree simultaneously.

This applies to Claude Code, Codex CLI/App, OMP and any other coding
agent.

## 8. Audit trail and handoff

Substantial work must leave durable repository-visible evidence rather
than relying on conversation memory.

Claude Code may use a lighter-weight handoff for small/exploratory work
per `CLAUDE.md` §5; the full templates below remain the standard for
substantive changes and for anything crossing the Chief Engineer review
boundary. The same lighter-weight allowance applies to Codex CLI/App for
equivalent small/exploratory work.

**Standard package for chat-based Chief Engineer review.** When the
Chief Engineer review is happening in a chat lane (Claude Chat or
ChatGPT) without direct repo access, the Main Engineer's finishing
sequence should be:

```text
git status
git log -5 --oneline --decorate
git show --stat --oneline HEAD
        ↓
run the project's ZIP snapshot script
        ↓
hand off: ZIP + Git output + verification command output
```

The ZIP snapshot and the Git output serve different purposes and neither
replaces the other — see `docs/ENGINEERING_GOVERNANCE.md` §7 for why both
are required. This is the preferred handoff shape for substantive work
reaching the Chief Engineer gate; it does not replace running the actual
verification commands (§9 below) or reporting their real output.

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
Author lane:
Reviewer lane:
```

For generated external artifacts, also record the exact workspace path
and user-accessibility/retrieval status.

### Handoff to the Project Owner (plain language)

The Project Owner is not expected to be an engineer. Whenever a lane hands
work to the Project Owner it should:

- say in one or two plain sentences what changed and why;
- give numbered steps, including where files go and the exact Git commands
  to type in Command Prompt (cmd), each in its own code block;
- say what the Project Owner should see after each step, and what to do if
  it looks different;
- avoid engineering jargon, or explain any term the first time it is used;
- say which lane authored the work and which lane should review it (§2b of
  the governance).

A lane that cannot commit or open pull requests itself (governance §2a)
hands over a Git bundle or patch so that commits keep the authoring lane's
identity; the Project Owner (or another lane) pushes it and opens the pull
request.

## 9. Verification standard

- **VERIFIED** = supported by direct repository, command, test, CI or
  runtime evidence.
- **UNVERIFIED** = proposal, inference or claim lacking sufficient direct
  evidence.
- **FAILED** = confirmed execution failure.

Do not call changes fixed, working, passing, complete or
production-ready without the relevant evidence.

## 10. Fresh-session rule

At the beginning of every new Cô Hai Vintage engineering session:

1. inspect live Git state and state which Git/GitHub/shell capabilities
   this session actually has (governance §2a);
2. read `docs/ENGINEERING_GOVERNANCE.md`;
3. read the current handover/report and relevant project plans;
4. identify whether the task is implementation or read-only audit;
5. choose a Main Engineer lane (Claude Code, Codex CLI/App, or OMP) based
   on task fit, context, local resources, availability, quality and cost —
   Claude Code and Codex CLI/App are equally valid first choices;
6. state the evidence and handoff deliverable;
7. independently verify important prior claims before relying on them.

Do not treat prior chat history as authoritative.

## 11. Cost discipline

Use the least expensive capable engineering lane that can safely perform
the task, within the Project Owner's fixed monthly budget (see
`docs/ENGINEERING_GOVERNANCE.md` §11).

OpenRouter/OpenCode Go spend guardrails remain active for OMP. Switching
to OMP when a primary lane's session limit is hit is expected, routine
behavior — not a fallback of last resort. The same routine-switching logic
applies between Claude Code and Codex CLI/App, and between Claude Chat and
ChatGPT: switching is normal operation, not an escalation.

Model choice can change without changing governance, but Codex Cloud is
excluded from the approved choices.

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
7. Request Chief Engineer review (§14). State the author lane and the reviewer lane (they must differ — governance §2b). Do not merge your own work.

## 14. Requesting and performing a Chief Engineer review

**Author prepares:** the ZIP (via `create-project-zip-universal.ps1`) or PR link; `git status`, `git log -5 --oneline --decorate`,
`git show --stat --oneline HEAD`; the §12 output (plus preview URL and observations for visual changes); the handoff/audit file listing
UNVERIFIED items and open Owner decisions.

**Reviewer (Claude Chat or ChatGPT — never the author's lane, governance §2b)** checks in order: requirements → design → correctness and
maintainability → tests/evidence → security/privacy → provenance → deployment implications → risks → Git state, then replies:

```
REVIEW OUTCOME: APPROVE | REQUEST CORRECTION
Reviewed commit: <sha>   Branch/PR: <name>
Author lane: <lane>   Reviewer lane: <lane> (must differ)
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

## 19. Applying a chat-authored change (Git bundle) — steps for the Project Owner

Used when Claude Chat (or another lane without GitHub access) authored the commits. Commits keep the author's name, so the record stays honest.

1. Download the `.bundle` file to `D:\` (or note where it is saved).
2. Open Command Prompt (cmd) and run:
```
cd /d D:\cohai-vintage
git switch main
git pull
git fetch D:\<path-to>\<name>.bundle <branch-name>:<branch-name>
git switch <branch-name>
git log --oneline -5
git push -u origin <branch-name>
```
3. Open the link that `git push` prints (or go to the repository on GitHub and click **Compare & pull request**). Write in the description: what changed,
   **Author lane: Claude Chat**, **Reviewer lane: ChatGPT** (or the Project Owner).
4. Paste the review request (§20) into the reviewing lane. When it replies **APPROVE**, click **Merge pull request** on GitHub (the Project Owner may do this).
5. After merging, run `git switch main` then `git pull`. Vercel deploys `main` automatically; then run §16.

## 20. Prompt templates

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
