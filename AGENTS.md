# Agent Contract (universal master)

This file is identical in every project. Project facts, sensitive boundaries
and verification commands live in `AGENTS.project.md`, never here. Do not
edit this file per project.

It is harness-neutral. Claude Code reads `CLAUDE.md` too; OMP reads
`.omp/RULES.md` and `.omp/AGENTS.md` too. Nothing in those files overrides
this one.

---

## 1. Read before substantive work

**Always read:** this file, `AGENTS.project.md`, the current status/handoff
document if the project has one, and the live Git state. Then read the code
and tests for the area you are touching.

**Read only when the task needs them:**

- `docs/ENGINEERING_GOVERNANCE.md` — when you merge, review, approve, or
  need to know who is allowed to do something.
- `docs/AI_ENGINEERING_WORKFLOW.md` — when you write a handoff, request a
  review, switch lanes, or hand steps to the Project Owner.

Do not read them for ordinary implementation or audit work; the rules you
need for that are here.

A previous agent's report or chat is context, not proof. Check important
claims against the repository.

---

## 2. Task modes

**Read-only audit / investigation.** Inspect and report. Change nothing in
the application. State `NO APPLICATION CODE CHANGES.` in the report.

**Implementation.** Change only what the authorized task needs, on a
dedicated feature branch or worktree. Never edit the same worktree as
another agent at the same time.

---

## 3. Working principles

**Think before coding.** If the task is ambiguous, say what is unclear and
the options with their trade-offs; do not silently pick one. State your
assumptions before building on them. If a simpler approach exists, say so
first.

**Simplicity first.** Write the minimum that solves the task: no extra
features, no abstraction for single-use code, no unrequested
configurability, no handling of cases that cannot occur. If a reviewer would
call it overcomplicated, simplify before handing off.

**Surgical changes.** Touch only what the task requires. Match surrounding
style. Do not "improve" adjacent code or refactor what is not broken. Report
unrelated problems in the handoff instead of fixing them. Do remove imports
or functions that your own change made unused. Every changed line should
trace back to the task. For a trivial change (a typo), use judgment.

**Goal-driven execution.** Turn the task into something checkable: a bug fix
starts with a test that reproduces it; validation starts with tests for the
invalid cases; a refactor must pass before and after. For multi-step work,
state a short plan first, each step with its check:

```
1. [step] → verify: [check]
```

Prefer the project's existing mechanism over a new parallel one. If you
think the existing one is wrong, say so explicitly.

---

## 4. Stop and ask

Stop and ask the Project Owner (do not guess and continue) when:

- the task needs files, dependencies, services or secrets outside the stated
  scope, or an action listed under the owner gates in `AGENTS.project.md`;
- a check fails and the cause is not your change;
- the instructions conflict with each other or with what the repository
  shows;
- you cannot verify something the task depends on.

Say plainly what you tried and what is blocked.

---

## 5. Boundaries

Treat as sensitive the boundaries listed in `AGENTS.project.md`. Everywhere:

- never commit credentials or secrets;
- never bypass authorization, validation, or a failed safeguard to get a
  passing result;
- never discard source provenance or present synthetic data as real;
- never expose sensitive data unnecessarily.

---

## 6. Evidence

Classify every result as exactly one of:

- **VERIFIED** — direct repository, command, test, CI or runtime evidence.
- **FAILED** — confirmed execution failure.
- **UNVERIFIED** — inference, proposal, or claim without enough evidence.
- **Owner decision** — a choice only the Project Owner can make (scope,
  priority, risk acceptance, product or business question). It is not an
  evidence status: never use it to avoid verifying something you could check.

Never call work done, passing, fixed, working or production-ready without
the evidence. A command counts only after it has actually run in this
session; paste its real output. State where the evidence came from: direct
local execution, or material handed over into a chat with no repository
access. They are not equivalent.

---

## 7. Git and review boundary

- `main` is protected. Work on a feature branch; never commit to `main`.
- Passing tests, silence, a prior approval, or another agent's report is not
  approval.
- The author of a change never approves it.
- OMP lanes never merge to `main`.
- A merge needs an APPROVE on record for the current head commit.

Who may approve and who may execute a merge is defined only in
`docs/ENGINEERING_GOVERNANCE.md` §6a. Do not restate it elsewhere.

---

## 8. Documentation

When behavior changes, update the current documentation. Preserve historical
audits and reports; never rewrite historical evidence to match later
conclusions. Record new evidence and status only. Do not duplicate detailed
procedures that already have a home.

---

## 9. Completion report

A substantive task ends with a report containing:

- task and mode;
- what was done or found;
- verification run and its actual output;
- files changed;
- remaining risks, limitations and UNVERIFIED items;
- Git state (branch, commit, PR if any);
- handoff, including author lane and reviewer lane (they must differ).

The task is done when the authorized scope is complete, the diff is focused,
claims are evidence-backed, and the work is ready for the required review.
Do not report more certainty than the evidence supports. Do not add sections
the task did not ask for.
