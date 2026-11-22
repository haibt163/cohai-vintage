# Cô Hai Vintage — AI Engineering Workflow

**Last updated: 22 November 2026.** Roles, operating modes and the merge gate are
defined only in `docs/ENGINEERING_GOVERNANCE.md`. This file describes the session
flow and handoff formats; it does not restate governance.

## 1. Source of truth

- GitHub `main` is the canonical source of truth.
- Local folders and sandboxes are working copies.
- Repository files, Git history, pull requests, CI/Vercel evidence and Owner
  decisions outrank session history and prior reports.
- Current project state is in `PROJECT_STATUS.md`; commands are in
  `docs/PROJECT_PROCEDURES.md`.

## 2. Session start

1. State which Git / GitHub / shell / network capabilities this session has.
2. Read `docs/ENGINEERING_GOVERNANCE.md`, `PROJECT_STATUS.md`, `AGENTS.md` and
   `AGENTS.project.md`.
3. Inspect live Git state and the relevant code.
4. Identify the mode (two lanes or three lanes) and the task type
   (implementation or read-only).
5. Independently verify important prior claims before relying on them.

## 3. Flow

```text
Owner defines task and mode
        ↓
Main Engineer works on a sub-branch
        ↓
Pull request opened for tracking
        ↓
Chief Engineer reviews and recommends (three-lane mode only)
        ↓
Owner approves on record
        ↓
Main Engineer or Owner merges → main
```

A task may move between harnesses. The incoming engineer reads the governance,
`PROJECT_STATUS.md` and live Git state before continuing.

## 4. Implementation handoff

```markdown
# Implementation Handoff
## Task
## Scope
## Approach
## Changes (files / surfaces)
## Tests / Verification (real output, labelled sandbox or live)
## Evidence (screenshots, logs)
## Remaining Risks
## Unverified
## Git
Branch:
Commit:
PR:
Mode:
Author lane:
Reviewer lane: Chief Engineer name, or "Owner only"
```

## 5. Pull request

Every pull request states:

- what changed;
- what was verified, with real output;
- what could not be verified;
- files left unchanged on purpose;
- open questions for the Owner;
- author lane and reviewer lane (or "Owner only" in two-lane mode).

Owner steps are written in plain language, with exact commands and what to expect.

Keep the description under 200 words. Use the pull request as the review surface:
diff, commit history and visible CI/preview results. A review states what it
actually inspected and what it could not see.

## 6. Verification

- **VERIFIED** — direct repository, command, test, CI or runtime evidence.
- **UNVERIFIED** — proposal, inference or claim lacking direct evidence.
- **FAILED** — confirmed execution failure.

Run the checks defined by the repository and report actual output. Do not call
work fixed, passing, complete or production-ready without that evidence. Label
checks run in a sandbox as sandbox evidence.

## 7. Isolation and audits

- Each effort uses its own feature branch or worktree. Never let two agents edit
  the same worktree at once.
- Read-only audits may inspect concurrently, change no application code, and end
  with `NO APPLICATION CODE CHANGES.`
- Do not stack pull requests on each other when avoidable; merge or close the
  earlier one first, or say clearly that a later one contains it.
