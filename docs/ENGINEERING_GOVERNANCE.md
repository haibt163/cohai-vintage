# Cô Hai Vintage — Engineering Governance

**Effective:** 30 September 2026 (master: CoHai Travel `ENGINEERING_GOVERNANCE.md`, 30 September 2026 revision)

## 1. Purpose

This document defines the live engineering governance for Cô Hai Vintage.

The project uses multiple AI engineering environments, but governance does
not depend on a particular model or vendor. Implementation work may move
between Main Engineer lanes without changing the review or approval
boundary.

Work runs in one of two operating modes (§2a). In both, the lane that
authored a change never approves it (§2b), and the Project Owner may
override any rule in this document when doing so benefits the project (§2).

## 2. Roles

### Project Owner — final authority

The Project Owner is the final human authority for the project.

The Project Owner:

- defines product intent and priorities;
- decides whether proposed scope should proceed;
- holds the same approval standing at the `main` merge gate as either chat
  lane (§6a), and may approve, reject or decline to proceed;
- may override or reject an engineering recommendation;
- may override any rule in this document when doing so benefits the
  project — including committing, opening pull requests, reviewing,
  approving, merging, and relaying work between lanes personally. Governance
  is there to help the Project Owner, not to restrict them. Note an override
  on the pull request so the record stays clear;
- owns the final release decision.

The Project Owner is not expected to be an engineer. Engineers and Chief
Engineers explain hand-offs to the Project Owner in plain language with
step-by-step instructions (see `docs/AI_ENGINEERING_WORKFLOW.md` §8).

### Chief Engineer — Chat lane

The Chief Engineer role may be performed by **Claude Chat or ChatGPT**.
These two chat/review lanes have the same role, authority and review
responsibility. Neither is superior to the other by vendor or model, and
neither is a fallback for the other — either may independently review
evidence and issue the governing outcome for a given piece of work.

The Chief Engineer is the independent engineering review and quality gate.
The Chief Engineer reviews substantial engineer work before it is eligible
to merge into `main`.

**Evidence-access boundary:** a chat/review session may have no live access
to the repository, git history, or a runnable environment. Chat therefore
works from what the Project Owner pastes or uploads into the conversation
(diffs, logs, handoff documents), or from explicitly available connector
access. A direct-repository coding lane may instead have local repository
and shell access. Reviews should say plainly which situation applies — a
review based only on handed-over material is not the same as one backed by
direct inspection, and the review output should not blur the two. This
access boundary applies equally to Claude Chat and ChatGPT; neither has a
standing access advantage over the other.

The Chief Engineer reviews, as applicable:

- scope and requirements;
- architecture and design;
- implementation quality;
- code correctness and maintainability;
- tests and verification evidence;
- security and privacy risks;
- data and source provenance;
- deployment/runtime implications;
- remaining risks and unresolved issues;
- Git branch, commit and pull-request state.

Chief Engineer outcomes are:

**APPROVE** — the work is acceptable to merge into `main` under §6a (and
§2b: the approving lane must not be the author).

**REQUEST CORRECTION** — the work must be corrected and re-verified before
it can proceed.

A Chief Engineer APPROVE is a complete approval for the merge gate: an
APPROVE from either chat lane, alone, satisfies §6a, and no separate
Project Owner approval is required. The Project Owner has the same standing
as either chat lane at that gate and keeps override authority (see
"Project Owner" above). An APPROVE from either chat lane carries the same
weight; the Project Owner does not need to prefer one over the other, and a
REQUEST CORRECTION from either lane is likewise binding on its own.

### Main Engineers — interchangeable implementation lanes

Cô Hai Vintage has the following Main Engineer lanes:

1. **Claude Code** — local Claude Code CLI, with direct repository, shell,
   and git access when run in that environment. `CLAUDE.md` provides
   Claude-specific operating guidance.
2. **Codex CLI / Codex App** — the local Codex engineering lane using
   available GPT/Codex models.
3. **OMP CLI** — the local multi-model engineering lane using DeepSeek,
   GLM, Kimi, and Qwen (and other models as available) through OpenRouter
   or OpenCode Go. These are full implementation substitutes, used
   routinely for cost/availability reasons and especially when session
   limits are hit on other lanes — not backup-only or degraded lanes.

Claude Code and Codex CLI/App have the same Main Engineer role and governance
standing, including the same merge-execution authority (§6a). Environment
capabilities can differ, but governance does not, and neither lane is a
fallback for the other — either may be the lane that actually executes a
given approved merge.

**Codex Cloud is not an approved lane for Cô Hai Vintage (it is retired in the
Cô Hai Vintage reference model) and must not be selected for project
engineering work.**

Lanes may be used interchangeably according to task fit, context
capacity, local-resource constraints, quality, latency, cost, and
availability.

**Workflow for Codex CLI/App and OMP specifically:** these lanes commit
their work to a dedicated feature/sub-branch, never to `main`. Once that
branch is ready, the active Chief Engineer chat lane (Claude Chat or
ChatGPT), or a peer engineer when appropriate, reviews it. Only after an
APPROVE is on record from the active Chief Engineer chat lane or
the Project Owner may the Project Owner, Claude Code, or Codex CLI/App merge
that branch into `main`. OMP does not gain merge authority by having its branch
reviewed or merged.

No lane merges its own unreviewed work to `main`.

## 2a. Operating modes — three lanes or two lanes

**Standard mode (three lanes).** A Main Engineer lane (Claude Code, Codex
CLI/App or OMP) implements; a Chief Engineer chat lane (Claude Chat or
ChatGPT) reviews and approves; the Project Owner directs and holds equal
approval standing (§6a).

**Reduced mode (two lanes).** For audits, small revisions and ad hoc tasks,
Claude Chat or ChatGPT may act as the Main Engineer (the author) — for
example by preparing a patch, a Git bundle or documentation changes. The
*other* chat lane then acts as Chief Engineer: it reviews, and may approve
commits to a sub-branch and the merge to `main`. The Project Owner may
review and approve as well.

In both modes, final approval status for merging to `main` is equal among
Claude Chat, ChatGPT and the Project Owner (§6a), always subject to §2b.

**Capability declaration.** At the start of a session every lane states
which Git / GitHub / shell capabilities it actually has in that session. A
lane that cannot commit, push or open a pull request directly (at the time of
writing, Claude Chat has no direct GitHub write capability) hands its
commits over as a Git bundle or patch — the commits keep the authoring
lane's identity — together with plain-language steps. The Project Owner,
ChatGPT, or a Main Engineer lane then pushes the branch and opens the pull
request. If a chat lane gains direct write access (for example a GitHub
connector, or committing to sub-branches of a public fork), it may commit,
push and open pull requests itself, under the same rules. Record any
capability change in the handoff.

## 2b. Author ≠ approver

The lane (or person) that authored the commits of a change may never be the
one who approves that change's pull request or its merge to `main`. This
applies in every mode and for every lane.

- Authored by Claude Chat → approved by ChatGPT or the Project Owner.
- Authored by ChatGPT → approved by Claude Chat or the Project Owner.
- Authored by Claude Code, Codex CLI/App or OMP → approved by Claude Chat,
  ChatGPT or the Project Owner.
- Another session or model of the same lane counts as the same lane.
- Relaying is not authoring: when the Project Owner (or another lane) only
  applies or pushes someone else's commits unchanged, the original lane
  remains the author. If the Project Owner materially writes or edits the
  change, they are an author too and should not be the sole approver unless
  they are using the override in §2 (noted on the pull request).
- Every pull request states its **author lane** and **reviewer lane**; they
  must differ.
- Approval and execution are different acts: executing an already-approved
  merge (§6a) is allowed for the lanes listed there.

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

Model or environment switching does not bypass any stage. Merge
authority itself (who may approve, who may execute) is defined
exclusively in §6a and does not vary by which Main Engineer lane
produced the work, nor by which chat lane approved it.

## 4. Choosing the Main Engineer

Use the least expensive capable lane that can safely perform the task, and
switch lanes freely when a session limit is hit on the current one — this
is expected routine behavior, not an exception.

Selection factors:

- task complexity;
- required context window;
- repository size;
- local PC resource constraints;
- model quality for the specific task;
- execution environment requirements (Claude Code and Codex have local
  shell/filesystem/Git capabilities when run in those environments; other
  lanes may run in more constrained contexts);
- cost and OpenRouter/OpenCode Go spend guardrails;
- current availability / session limits;
- need for direct local Git/GitHub control.

A task may move between lanes when useful. The incoming engineer must read
the repository governance, current handoff/report, live Git state and
relevant evidence before continuing — regardless of which lane it is.

Do not use Codex Cloud for Cô Hai Vintage work.

Claude Code and Codex CLI/App are equivalent Main Engineer choices; neither
receives a governance preference over the other. The same holds for Claude
Chat and ChatGPT as Chief Engineer choices — selection between either pair
is a matter of session availability, context, and cost, never of standing.

## 5. Task modes

Every engineering request must be treated as one of these modes:

### Implementation

The engineer may modify application code, tests, configuration or
documentation within the authorized scope.

Implementation work should use a dedicated feature branch/worktree when
parallel coding could otherwise conflict.

### Read-only audit / investigation

The engineer inspects the repository and records findings without
changing application code.

Read-only work must explicitly state:

`NO APPLICATION CODE CHANGES.`

Independent read-only audits may inspect the same clean repository
concurrently.

## 6. Branch and Git rules

- `main` is the protected integration branch and source of record.
- Engineer implementation work should occur on a dedicated feature
  branch/worktree.
- Coding agents must not edit the same worktree simultaneously.
- Engineers may commit their own implementation branches and push/open/
  update PRs when the active environment has the required GitHub access.
- Engineers must not bypass the Chief Engineer review boundary.
- No engineer merges its own unreviewed work to `main`.
- A successful test run does not itself authorize a merge.
- Silence or lack of objection is not approval.
- Prior model approval does not substitute for the current review.
- A merge requires an APPROVE from the active Chief Engineer chat lane
  (Claude Chat or ChatGPT — either is sufficient on its own) or the
  Project Owner — see §6a for exactly who may then execute it.
- The author of a change may not approve it (§2b).

## 6a. Merge authority (Project Owner, Claude Code, and Codex CLI/App)

Merge execution authority to protected `main` is held equally by the
Project Owner, Claude Code, and Codex CLI/App. Claude Code and Codex
CLI/App are peer, equally higher-trust, merge-capable Main Engineer
lanes — neither is the primary and neither is the other's fallback; OMP
is not merge-capable.

**Approval gate.** A merge to `main` requires an APPROVE on record from one
of:

- Claude Chat, acting as Chief Engineer;
- ChatGPT, acting as Chief Engineer; or
- the Project Owner, directly.

Claude Chat and ChatGPT satisfy this gate identically — an APPROVE from
either one, alone, is sufficient. A Main Engineer self-review, a passing
test suite, or another Main Engineer lane's sign-off does not by itself
satisfy the Chief Engineer approval gate. The approver must not be the
author of the change (§2b).

**No direct chat-to-coding handoff is assumed.** The Project Owner relays an
APPROVE to the active implementation lane when needed. Nothing in this
document should be read as implying an automatic or live hand-off.

**Who executes the merge, once approved.** The Project Owner, Claude Code, or
Codex CLI/App may perform the merge to protected `main` and should record the
approval source. Claude Code and Codex CLI/App hold this execution authority
equally — whichever lane is active, or whichever the Project Owner asks to
handle it, may do so; there is no default or preferred executor between them.

**No approval, no merge.** If neither the Chief Engineer chat lane nor the
Project Owner has approved the work, no merge to `main` may occur.

## 7. Pull-request review boundary

A normal implementation handoff should contain:

- task and scope;
- design/approach;
- files or surfaces changed;
- tests and verification results;
- direct evidence;
- remaining risks;
- unverified items;
- branch name;
- commit SHA;
- PR number/URL when applicable;
- author lane and reviewer lane (they must differ — §2b).

The Chief Engineer may review the branch or PR and either approve it for
Project Owner consideration or request explicit corrections. Where the
Chief Engineer role is running in a chat session (Claude Chat or ChatGPT)
without direct repo access, the handoff itself — pasted or uploaded — is
the evidence; the review should note this explicitly rather than implying
independent verification that didn't happen. This applies equally
regardless of which chat lane is reviewing.

**Standard handoff package: ZIP snapshot + Git state.** For a chat-based
Chief Engineer review, the preferred handoff is two parts together, not
either alone:

1. a repository ZIP snapshot taken at the point the Main Engineer finished
   (produced by the project's zip script, `create-project-zip-universal.ps1`,
   which preserves `.git`, `.github`, `.claude`, `.omp`, `docs`, `app`,
   `components`, `lib`, `scripts`, `public`, and root configuration,
   excluding only local/runtime material such as `node_modules`, `.next`,
   `.env*` and `archive/`); and
2. the engineer's own Git output from that same point — at minimum
   `git status`, `git log -5 --oneline --decorate`, and
   `git show --stat --oneline HEAD`.

The ZIP lets the Chief Engineer inspect the full repository state directly
rather than relying solely on a pasted diff, which can hide context a
reviewer would otherwise catch. The Git output lets the Chief Engineer
locate exactly what changed and where it sits in history, without having
to reconstruct that from the snapshot alone. Neither substitutes for the
other.

This package still does not give the chat lane the ability to execute
anything — no install, no test run, no build. A ZIP-based review verifies
what the code says and does static analysis of that; it does not verify
that a test suite, lint, typecheck, or build actually passed. The handoff
should therefore also include the actual output of whichever verification
commands the Main Engineer ran (`AGENTS.project.md` §8), not just the
Git summary — a Chief Engineer reading only `git show --stat` can confirm
what changed, but not whether it works.

## 8. Evidence standard

Use these statuses consistently:

- **VERIFIED** — supported by direct repository, command, test, CI or
  runtime evidence.
- **UNVERIFIED** — proposal, inference or claim lacking sufficient direct
  evidence.
- **FAILED** — execution produced a confirmed failure.

Do not describe work as fixed, passing, working, complete or
production-ready without the relevant evidence.

## 9. Durable handoffs

Substantial work must leave repository-visible evidence. Conversation
history is useful context but is not the durable source of truth.

Preferred evidence includes:

- repository documentation;
- audit reports;
- implementation handoffs;
- Git commits;
- pull requests;
- automated test output;
- CI results;
- runtime verification.

For generated external artifacts, also record the exact workspace path
and user-accessibility/retrieval status.

## 10. Cross-agent continuity

A new engineer must not assume it knows another engineer's prior
conversation.

Preferred starting sequence:

```text
read governance
→ read current handover/report
→ inspect live Git state
→ inspect relevant code
→ independently verify important prior claims
→ continue from evidence
```

Fresh sessions are preferred for major phase boundaries and controlled
benchmarks.

## 11. Cost discipline

The project favors economical, capable models, within the Project
Owner's fixed monthly budget (current figures are stated in the CoHai
Travel governance §11 and are intentionally not duplicated here).

DeepSeek, GLM, Kimi, and Qwen through OMP are considered valid production
engineering lanes, not inferior fallback-only systems, and are expected to
see routine use whenever a primary lane's session limit is reached. Claude
Code and Codex CLI/App are equivalent Main Engineer lanes; choose between
them based on task fit, environment, context, availability, quality and
cost. Claude Chat and ChatGPT are likewise equivalent Chief Engineer
lanes; choose between them on the same basis — session availability,
budget, and which one the Project Owner has open — never on a standing
preference for one over the other.

OpenRouter/OpenCode Go spend guardrails remain active for OMP-based work.

Codex Cloud is not an approved Cô Hai Vintage engineering lane.

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

Two-lane mode (§2a): a chat lane may be the author, the other chat lane
reviews and approves, and the Project Owner has equal approval standing. The
author never approves their own change (§2b).

No model, agent, tool, successful test, deadline or previous decision may
skip getting that APPROVE. Merge *execution* authority is held equally by
the Project Owner, Claude Code, and Codex CLI/App (§6a) — it is not
exclusive to the Project Owner. Chat/review lanes and implementation lanes
may have different environment capabilities, but those differences do not
change governance authority, and no lane within either peer pair (Claude
Chat/ChatGPT, Claude Code/Codex CLI App) outranks its peer.

## 13. Cô Hai Vintage-specific additions (not in the CoHai Travel master)

These adapt the master to this project. They add evidence requirements and gates; they do not weaken any rule above.

**Evidence rules**
- Visual claims need visual evidence: desktop and iPhone-width renders of a Vercel preview or production deployment. CI green ≠ visually verified.
- Photo changes need before/after rendering and must pass the `apply-photo-replacements.ps1` SHA-256 safeguard.
- Production claims need the deployed commit SHA matched to `main` and an observation on the live URL (`scripts/verify-deployment.mjs`).
- Business/content claims (price, stock, condition, provenance, authenticity, measurements) need Owner-supplied or recovered-source evidence.
- SEO/metadata claims need the rendered output (view-source, `/sitemap.xml`, `/robots.txt`, schema validator), not just code.

**Approval gates.** Ask the Project Owner before: publishing customer-facing copy that makes a business commitment; changing the production
domain or `NEXT_PUBLIC_SITE_URL`; adding third-party services or secrets; adding dependencies; purging Git history; deleting `archive/`
(old WordPress photos; copies are also kept outside the repository); replacing approved photography; changing the approved visual direction
(`AGENTS.project.md` §5).

**"On record" means** written in the pull request (or a repository handoff file) with the reviewed commit SHA; a later commit needs a fresh
APPROVE or the Project Owner's explicit confirmation.

**Example of §2a–§2b in practice.** PR #1 (audit and governance) was authored by Claude Chat, reviewed and approved by ChatGPT and the
Project Owner, and merged by the Project Owner.

## 14. Reconciliation notes (remove when no longer needed)

- Adapted on 30 Sep 2026 from the CoHai Travel master files supplied by the Project Owner (governance and workflow originally dated 26 Sep 2026,
  revised 30 Sep 2026 for §2 / §2a / §2b). The Karpathy-derived working principles live in `AGENTS.md` §3–§5.
- If the CoHai Travel master changes, re-diff this file (§1–§12 should stay identical apart from project names and the zip-script paragraph).
