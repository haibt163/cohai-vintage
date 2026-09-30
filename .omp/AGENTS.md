# OMP Agent Instructions — Cô Hai Vintage

## Purpose

OMP is an implementation and investigation harness for Cô Hai Vintage.

This file defines OMP-specific operating procedure.

Project-wide rules are defined in:

- `AGENTS.md`
- `AGENTS.project.md`

Hard OMP guardrails are defined in:

- `.omp/RULES.md`

Detailed project governance remains under `docs/`.

---

## 1. Establish Context Before Editing

Before substantive work:

1. read `AGENTS.md`;
2. read `AGENTS.project.md`;
3. read `.omp/RULES.md`;
4. read relevant governance/workflow documentation;
5. inspect live Git state;
6. inspect the relevant implementation;
7. inspect relevant tests;
8. inspect historical/provenance material when applicable.

Do not treat a prior agent report as proof of current repository state.

Claude Code and Codex CLI/App are peer, equally higher-trust, merge-capable
Main Engineer lanes under the project governance — neither is primary and
neither is the other's fallback. OMP remains an implementation lane and
does not execute merges to protected `main`, however much implementation
work it performs.

---

## 2. Task Modes

### Read-only audit / investigation

Inspect and report findings without application-code changes unless explicitly
authorized.

State:

`NO APPLICATION CODE CHANGES.`

### Implementation

Modify only the authorized scope.

Use an isolated feature branch or worktree when parallel work could conflict.

---

## 3. Operating Sequence

For a non-trivial task:

Understand
→ inspect
→ identify exact gap
→ plan smallest correct change
→ implement
→ verify
→ inspect diff
→ report evidence

Do not implement solely from the task description when repository evidence is
available.

**Think before coding.** Do not silently pick an interpretation of an
ambiguous task and run with it:

- State assumptions explicitly before implementing on top of them.
- When more than one reasonable interpretation exists, name the options and
  their tradeoff rather than choosing quietly.
- If something in the task or the existing code is unclear, say what's
  unclear and ask, rather than guessing.

**Goal-driven execution.** Where practical, turn the task into a checkable
goal rather than an instruction followed blindly — e.g. "write a test that
reproduces the bug, then make it pass" rather than just "fix the bug." For
a multi-step task, state a short plan with a verification check per step
before implementing:

```
1. [step] → verify: [check]
2. [step] → verify: [check]
```

A concrete, checkable goal is what lets §5 (Verification) be evidence
rather than self-report.

---

## 4. Scope Discipline

For a scoped change:

- fix the requested issue;
- fix defects directly caused by the change;
- preserve unrelated behavior;
- avoid unrelated refactors;
- avoid dependency upgrades unless required;
- preserve historical/provenance material.

**Simplicity first.** Write the minimum code the task requires — no
speculative abstraction, no unrequested configurability, no error handling
for cases that can't occur given current callers and data. If a change
could reasonably be a fifth of the size, write it that way.

**Surgical changes.** Touch only what the task requires. Don't "improve"
adjacent code, comments, or formatting while passing through a file, and
don't refactor something that isn't broken just because you're already
there. If you notice unrelated dead code or a pre-existing problem, report
it — don't fix it as part of this task unless asked. Do remove imports,
variables, or functions that your own change made unused; that's part of
finishing the change correctly, not an unrelated refactor.

The target is a focused, reviewable patch: every changed line should trace
back to the authorized task.

---

## 5. Verification

Use the project evidence vocabulary:

- **VERIFIED**
- **UNVERIFIED**
- **FAILED**

Never claim a test, build, lint, typecheck, runtime behavior, or production
state without direct evidence.

If verification is blocked by the environment, report that limitation.

---

## 6. Tests

When a change introduces or modifies an invariant:

- add or update executable verification where practical;
- cover intended valid behavior;
- cover meaningful invalid/failure behavior;
- run the relevant tests.

A verification command only counts as evidence after it has actually run.

---

## 7. Sensitive Boundaries

Take extra care with:

- secrets and credentials;
- customer contact details;
- business claims (price, stock, condition, provenance, authenticity);
- recovered-media provenance and image quality;
- anything placed under `public/` (it is served to the internet);
- production configuration and environment variables.

Do not weaken safeguards to obtain a passing result.

---

## 8. Documentation

When current behavior changes:

- update the appropriate current documentation where useful;
- preserve historical audits and reports;
- do not rewrite historical evidence;
- avoid duplicating detailed procedures unnecessarily.

---

## 9. Cross-Agent Handoffs

When continuing another agent's work:

read governance
→ read current handoff/report
→ inspect Git state
→ inspect relevant implementation
→ verify important claims
→ continue from evidence

A previous model's conversation is context, not project truth.

When OMP hands work to another lane, the incoming engineer must follow the
shared governance: Claude Chat and ChatGPT are peer Chief Engineer chat
lanes with identical authority; Claude Code and Codex CLI/App are peer,
equally higher-trust, merge-capable Main Engineer lanes; OMP does not hold
merge authority.

---

## 10. Completion Report

Every substantive OMP task should finish with:

- task;
- mode;
- implementation or findings;
- tests / verification;
- evidence;
- files changed;
- remaining risks / limitations;
- Git state;
- handoff.

Read-only tasks must state:

`NO APPLICATION CODE CHANGES.`

---

## 11. Model Choice

Use the least expensive capable model that can safely perform the task.

Model selection may vary with:

- task complexity;
- context needs;
- repository size;
- quality;
- latency;
- availability;
- cost.

Changing models does not change project governance. OMP cannot promote
itself into a merge-capable lane merely by changing its model.
