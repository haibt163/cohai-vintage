# AI Engineering Workflow (universal master)

This file is identical in every project. Project commands, deployment steps
and prompt templates live in `AGENTS.project.md` or, if present, `docs/PROJECT_PROCEDURES.md`.
Roles and authority are defined only in `docs/ENGINEERING_GOVERNANCE.md`.
Read this file when you write a handoff, request a review, switch lanes, or
give the Project Owner steps to follow (`AGENTS.md` §1).

## 1. Source of truth

Repository state and direct evidence beat chat memory. Durable knowledge
goes in repository-visible documents: `AGENTS.md`, `AGENTS.project.md`, the
status/handover document, audits and handoffs. Historical audits are
evidence; add new evidence and status, never rewrite old findings.

## 2. Lanes in one line each

Governance §2 defines them. Practically: Claude Code and Codex CLI/App
implement and may execute approved merges; OMP implements and never merges;
Claude Chat and ChatGPT review (and sometimes author, reduced mode); the
Project Owner directs and may do anything the others can. Changing model or
tool never changes the approval boundary.

## 3. Report formats

**Audit / review result.** Use exactly these four headings, in this order,
and nothing else unless the task asks:

```
VERIFIED
FAILED
UNVERIFIED
Owner decision
```

Each item: one line of finding, then the evidence (file and line, command and
output, PR or commit). Do not re-list items already known unless they now
block the current phase or the evidence or priority changed. Read-only work
ends with `NO APPLICATION CODE CHANGES.`

**Implementation handoff.** Task · scope · what changed · verification run
with real output · remaining risks · UNVERIFIED items · Git (branch, commit,
PR, author lane, reviewer lane). Small or exploratory work may use a short
summary of the same facts.

**Final report to the Project Owner.** Concise, plain language, ordered:
*Must fix / verify now* · *Owner decision required* · *Future work*.

## 4. Requesting and performing a review

**Author's package for a chat reviewer** (the chat lane cannot see the
repository):

```text
git status
git log -5 --oneline --decorate
git show --stat --oneline HEAD
```

plus the project's ZIP snapshot script output, the real
verification output, and the handoff. Both are needed: the ZIP shows the
files as handed over; the Git output shows what is actually committed and
whether anything is uncommitted. Neither replaces the other, and neither
replaces running the checks.

**Reviewer** checks in this order: requirements → design → correctness and
maintainability → tests and evidence → security and privacy → provenance →
deployment implications → risks → Git state. Then replies:

```
REVIEW OUTCOME: APPROVE | REQUEST CORRECTION
Reviewed commit: <sha>   Branch/PR: <n>
Author lane: <lane>   Reviewer lane: <lane> (must differ)
Evidence basis: handed-over material only | direct repository access
Corrections (if any): 1) … 2) …
Evidence relied on: <what was actually seen>   UNVERIFIED: <what was not>
```

An APPROVE is valid for the stated commit only. A coding lane may give a peer
review, but it does not replace the Chief Engineer gate.

## 5. Read-only audits and parallel work

Several read-only audits may inspect a clean repository at once. They change
no application code and say so. Implementation uses its own branch or
worktree; two coding agents never share a worktree.

## 6. Handing work to the Project Owner (plain language)

The Project Owner is not an engineer. Every hand-off to them:

- says in one or two plain sentences what changed and why;
- gives numbered steps, each command in its own code block (Windows Command
  Prompt unless told otherwise);
- says what they should see after each step and what to do if it differs;
- avoids jargon, or explains a term the first time;
- names the author lane and the reviewer lane.

A lane that cannot push (governance §2a) hands over a Git bundle or patch so
commits keep their author. If the project has `docs/PROJECT_PROCEDURES.md`, its step-by-step
bundle instructions are there.

## 7. Fresh-session rule

At the start of a new engineering session:

1. inspect live Git state, and state which Git/GitHub/shell capabilities
   this session actually has;
2. read `AGENTS.md` and `AGENTS.project.md`, then the current
   status/handover document and the task's handoff, if any;
3. identify whether the task is implementation or read-only audit;
4. state the evidence and handoff you will deliver;
5. verify important prior claims before relying on them.

Do not read governance or this workflow for this; open them only when
`AGENTS.md` §1 says to. Do not treat prior chat history as authoritative.

When switching lanes mid-task: commit or stash cleanly, refresh the handoff
with the current Git state and next step, then start the new lane at step 1.

## 8. Cost

Use the least expensive capable lane that can safely do the task, within the
Project Owner's fixed monthly budget (governance §11). Switching lanes when a
session limit is hit is routine. If a cheaper lane keeps producing work that
fails review, report it to the Project Owner; do not keep paying for
corrections.
