# Engineering Governance (universal master)

**Effective:** 2 October 2026. Consolidates the 30 September 2026 revision
into one home per rule. Roles, authority and merge rules are unchanged.

This file is identical in every project. Project-specific gates and evidence
rules live in `AGENTS.project.md`. Agents read this file only when merging,
reviewing, approving, or resolving who may do something (`AGENTS.md` §1).

## 1. Purpose

Defines who does what, who may approve, and who may merge. It does not depend
on any model or vendor: work can move between Main Engineer lanes without
changing the review or approval boundary. The lane that authored a change
never approves it (§2b). The Project Owner may override any rule here when it
benefits the project (§2).

## 2. Roles

### Project Owner — final authority

The Project Owner (Maris):

- defines product intent and priorities, and decides whether scope proceeds;
- holds the same approval standing at the `main` merge gate as either chat
  lane (§6a), and may approve, reject or decline to proceed;
- may override any rule in this document when it benefits the project,
  including committing, opening pull requests, reviewing, approving, merging
  and relaying work personally. Governance helps the Project Owner; it does
  not restrict them. Note an override on the pull request;
- owns the release decision.

The Project Owner is not expected to be an engineer. Hand-offs to them are in
plain language with step-by-step instructions
(`docs/AI_ENGINEERING_WORKFLOW.md` §6).

### Chief Engineer — chat lane

Performed by **Claude Chat or ChatGPT**. They have identical role, authority
and responsibility, and neither is a fallback for the other. The Chief
Engineer is the independent review and quality gate for substantial work
before it can merge into `main`. A review covers, as applicable: scope,
design, correctness and maintainability, tests and evidence, security and
privacy, provenance, deployment implications, remaining risks, and Git/PR
state.

Outcomes:

- **APPROVE** — acceptable to merge under §6a (the approver must not be the
  author, §2b).
- **REQUEST CORRECTION** — correct and re-verify before proceeding.

An APPROVE from either chat lane alone satisfies the merge gate; no separate
Project Owner approval is needed. A REQUEST CORRECTION from either lane is
binding on its own.

**Evidence-access boundary.** A chat session may have no live access to the
repository, history or a runnable environment. It works from what the Project
Owner pastes or uploads, or from connector access if explicitly available. A
review must say which applies. A review of handed-over material is not the
same as direct inspection, and the review must not blur the two. This applies
equally to both chat lanes.

### Main Engineers — implementation lanes

1. **Claude Code** — local CLI with repository, shell and Git access.
   Operating notes in `CLAUDE.md`.
2. **Codex CLI / Codex App** — local Codex lane using GPT/Codex models.
3. **OMP CLI** — local multi-model implementation lane using the model
   providers configured in OMP. A full implementation substitute, used
   routinely for cost or availability, not a degraded lane.

Claude Code and Codex CLI/App have the same role and standing, including
merge-execution authority (§6a); neither is the other's fallback. OMP does
not execute merges, and cannot gain merge authority by changing model or by
having its branch reviewed or merged.

All Main Engineers commit to a dedicated feature branch, never to `main`. No
lane merges its own unreviewed work. **Codex Cloud is retired and must not be
used.**

## 2a. Operating modes

**Standard (three lanes).** A Main Engineer implements; a Chief Engineer chat
lane reviews and approves; the Project Owner directs and holds equal approval
standing.

**Reduced (two lanes).** For audits, small revisions and ad hoc tasks, Claude
Chat or ChatGPT may be the author (patch, Git bundle, documentation). The
*other* chat lane then reviews and may approve commits to a sub-branch and the
merge. The Project Owner may review and approve as well.

**Capability declaration.** At the start of a session every lane states which
Git, GitHub and shell capabilities it actually has. A lane that cannot commit,
push or open a pull request (Claude Chat, at the time of writing) hands its
commits over as a Git bundle or patch, which keeps the authoring lane's
identity, with plain-language steps. The Project Owner, ChatGPT or a Main
Engineer then pushes and opens the PR. If a chat lane gains direct write
access, it may do these itself under the same rules. Record capability changes
in the handoff.

## 2b. Author ≠ approver

The lane or person who authored a change's commits never approves its pull
request or merge, in any mode, for any lane.

- Claude Chat authored → ChatGPT or the Project Owner approves.
- ChatGPT authored → Claude Chat or the Project Owner approves.
- Claude Code, Codex CLI/App or OMP authored → Claude Chat, ChatGPT or the
  Project Owner approves.
- Another session or model of the same lane is the same lane.
- Relaying is not authoring: applying or pushing someone else's commits
  unchanged leaves the original lane as author. If the Project Owner
  materially writes or edits the change, they are an author too and should not
  be sole approver unless using the §2 override, noted on the pull request.
- Every pull request states its **author lane** and **reviewer lane**; they
  must differ.
- Approving and executing a merge are different acts (§6a).

## 3. Engineering pipeline

```text
Project Owner defines task
        ↓
Main Engineer lane implements or investigates
(Claude Code | Codex CLI/App | OMP)
        ↓
tests + evidence + handoff
        ↓
Chief Engineer review — Claude Chat or ChatGPT (either is sufficient)
APPROVE / REQUEST CORRECTION
        ↓
APPROVE on record from a chief engineer chat lane OR the Project Owner
(the Project Owner relays it when needed)
        ↓
merge executed by Project Owner, Claude Code, or Codex CLI/App
(never by chat; never by OMP)
        ↓
protected `main`
```

Switching model or environment skips no stage. Who may approve and execute is
defined only in §6a.

## 4. Choosing the Main Engineer

Use the least expensive capable lane that can safely do the task. Switch lanes
freely when a session limit is hit; that is routine. Factors: complexity,
context needed, repository size, local resources, model quality for the task,
execution environment, spend guardrails, availability, and need for direct Git
control. Claude Code and Codex CLI/App are equivalent choices, as are Claude
Chat and ChatGPT; choose on fit and availability, never on standing. An
incoming engineer follows the fresh-session rule in
`docs/AI_ENGINEERING_WORKFLOW.md` §7.

## 5. Task modes

See `AGENTS.md` §2.

## 6. Branch and Git rules

- `main` is the protected integration branch and source of record.
- Implementation happens on a feature branch or worktree; two agents never
  edit the same worktree at once.
- Engineers may commit their own branches and push or update PRs when their
  environment has the access.
- No engineer merges its own unreviewed work. A passing test run does not
  authorize a merge. Silence is not approval. A prior approval does not
  substitute for the current review.
- A merge requires an APPROVE under §6a. The author never approves (§2b).

## 6a. Merge authority

**Approval gate.** A merge to `main` requires an APPROVE on record from one of:
Claude Chat as Chief Engineer, ChatGPT as Chief Engineer, or the Project
Owner directly. Either chat lane alone is sufficient. A Main Engineer
self-review, a passing suite, or another Main Engineer's sign-off does not
satisfy the gate. The approver must not be the author (§2b).

**"On record"** means written in the pull request (or a repository handoff
file) with the reviewed commit SHA. An APPROVE is valid for that SHA only; a
later commit needs a fresh APPROVE or the Project Owner's explicit
confirmation.

**Execution.** Once approved, the Project Owner, Claude Code or Codex CLI/App
may execute the merge, whichever is active or asked, with no preferred
executor. Record the approval source. Chat lanes do not execute merges. OMP
does not execute merges.

**No live channel.** No direct chat-to-coding handoff is assumed. The Project
Owner relays an APPROVE to the implementation lane when needed.

**No approval, no merge.**

## 7. Pull-request review boundary

A normal implementation handoff contains: task and scope; approach; what
changed; tests and verification results; direct evidence; remaining risks;
UNVERIFIED items; branch, commit SHA and PR number; author lane and reviewer
lane (different, §2b).

The chat Chief Engineer's review package, and the review reply format, are in
`docs/AI_ENGINEERING_WORKFLOW.md` §4. Where the reviewer has only handed-over
material, the review states that, rather than implying independent
verification.

## 8. Evidence standard

See `AGENTS.md` §6.

## 9. Durable handoffs

Substantial work leaves repository-visible evidence (documentation, audit
reports, handoffs, commits, PRs, test output, CI, runtime verification);
conversation history is context, not truth. For generated external artifacts,
also record the exact workspace path and how the Project Owner can retrieve it.
Report and handoff formats: `docs/AI_ENGINEERING_WORKFLOW.md` §3.

## 10. Cross-agent continuity

See `docs/AI_ENGINEERING_WORKFLOW.md` §7. Prefer fresh sessions at major
phase boundaries and controlled benchmarks.

## 11. Cost discipline

Favor economical, capable models within the Project Owner's fixed monthly
budget. Models run through OMP are valid production lanes and see routine use
when another lane's session limit is hit. Spend guardrails stay active for OMP. Choose between peer lanes on task fit,
availability and cost.

## 12. Operating rule in one paragraph

Main Engineers (Claude Code, Codex CLI/App, OMP) implement. Chief Engineers
(Claude Chat, ChatGPT) review; either one's APPROVE, or the Project Owner's,
is required. The Project Owner, Claude Code or Codex CLI/App executes the
merge; chat and OMP never do. The author never approves. The Project Owner may
override any rule and notes it on the PR. No model, tool, test result,
deadline or earlier decision skips the APPROVE.
