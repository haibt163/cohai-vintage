# Cô Hai Vintage — Agent Contract

## Purpose

This file defines the repository-wide contract for AI and human engineering
agents working on Cô Hai Vintage.

It is harness-neutral.

Project-specific engineering rules belong in `AGENTS.project.md`.
Harness-specific operating rules belong in the relevant harness directory.
`CLAUDE.md` provides Claude Code-specific operating guidance. A map of the
project documents is in `AGENTS.project.md` §15. Claude Code and
Codex CLI/App are peer, equally higher-trust, merge-capable Main Engineer
lanes — neither is primary and neither is the other's fallback; OMP remains
a Main Engineer lane without merge authority. Likewise, Claude Chat and
ChatGPT are peer Chief Engineer lanes with identical review authority.
Detailed procedures and historical evidence remain under `docs/`.

---

## 1. Read Before Substantive Work

Before substantive work:

1. inspect the current Git state;
2. read `AGENTS.project.md`;
3. read the relevant governance/workflow documents;
4. inspect the relevant implementation;
5. inspect relevant tests;
6. inspect historical/provenance material when applicable.

Do not treat prior conversation, model reports, or handoffs as authoritative
when the repository can provide direct evidence.

---

## 2. Task Modes

### Read-only audit / investigation

Inspect and report findings without modifying application code unless explicitly
authorized.

State:

`NO APPLICATION CODE CHANGES.`

### Implementation

Modify only the files and surfaces necessary for the authorized task.

Use an isolated feature branch or worktree when parallel development could
conflict.

---

## 3. Think Before Coding

Do not silently pick an interpretation when a task is ambiguous and run with
it. This applies before implementation starts — it is about surfacing
confusion early, distinct from the after-the-fact evidence reporting in §8.

- State assumptions explicitly before implementing on top of them.
- When more than one reasonable interpretation exists, present the
  interpretations and the tradeoff between them rather than choosing quietly.
- If a simpler approach than the one implied by the task exists, say so
  before building the more complex one.
- If something in the task or the existing code is unclear, name what's
  unclear and ask, rather than guessing and proceeding.

---

## 4. Scope Discipline

Prefer the smallest correct change.

Do not add unrelated refactors, dependency upgrades, aesthetic rewrites, or
architecture changes to a scoped task unless required or explicitly
authorized.

When an existing project mechanism already solves the need, prefer it over
introducing a parallel mechanism.

**Simplicity first.** Write the minimum code that solves the authorized
task — nothing speculative:

- No features beyond what was asked.
- No abstraction introduced for what is currently single-use code.
- No "configurability" or "flexibility" that wasn't requested.
- No error handling for scenarios that cannot occur given the current
  callers and data.
- If a change could reasonably be written in a fifth of the lines, rewrite
  it rather than submit the bloated version.

The test: would a reviewer reasonably call this overcomplicated for what
was asked? If yes, simplify before handing it off.

**Surgical changes.** When editing existing code, touch only what the task
requires:

- Do not "improve" adjacent code, comments, or formatting while passing
  through it.
- Do not refactor something that isn't broken just because you're already
  in the file.
- Match the existing style in the surrounding code, even where you would
  have written it differently.
- If you notice unrelated dead code or pre-existing problems, report them
  in your handoff — do not delete or fix them as part of this task unless
  asked.
- Do remove imports, variables, or functions that your own change made
  unused — that cleanup is part of finishing your change correctly, not an
  unrelated refactor.

The test: every changed line should trace directly back to the authorized
task. If it doesn't, it's out of scope.

This is a bias toward caution over speed. For genuinely trivial changes
(a typo, an obvious one-line fix), use judgment rather than forcing the
full weight of this section — the point is avoiding costly mistakes on
non-trivial work, not slowing down the trivial kind.

---

## 5. Goal-Driven Execution

Prefer verifiable success criteria over imperative instructions followed
blindly. Where practical, translate the task into a form that can be
checked rather than merely asserted:

| Instead of...     | Do this...                                                    |
| ------------------ | -------------------------------------------------------------- |
| "Add validation"    | Write tests for the invalid-input cases, then make them pass  |
| "Fix the bug"       | Write a test that reproduces it, then make it pass             |
| "Refactor X"         | Confirm tests pass before the change and still pass after      |

For a multi-step task, state a brief plan before starting, with a
verification check against each step:

```
1. [step] → verify: [check]
2. [step] → verify: [check]
3. [step] → verify: [check]
```

A vague goal ("make it work") invites guessing and back-and-forth. A
concrete, checkable goal lets an agent work independently and lets the
result be judged on evidence rather than the agent's own confidence — see
§8 for how that evidence is reported.

---

## 6. Security, Data, Content, and Provenance

Treat secrets, customer contact details, business claims (price, stock,
condition, provenance, authenticity, measurements), recovered-media
provenance, and production configuration as sensitive boundaries.
Everything under `public/` is served to the internet.

Never:

- commit credentials or secrets;
- commit WordPress/WooCommerce logs, plugin caches, dumps, or other recovery
  artefacts;
- invent business facts that the recovered sources or the Project Owner do
  not support;
- hide poor image sources with CSS tricks, or present stock imagery as
  recovered brand material;
- bypass a failed safeguard (`npm run check:media`, the photo-apply script,
  CI);
- discard source provenance for convenience.

---

## 7. Documentation

Keep durable project knowledge in repository-visible documentation.

When current behavior changes:

- update current documentation where useful;
- preserve historical audits and reports;
- do not rewrite historical evidence merely to match later conclusions;
- avoid duplicating detailed procedures unnecessarily.

---

## 8. Evidence Standard

Use these statuses consistently:

- **VERIFIED** — supported by direct repository, command, test, CI, or
  runtime evidence.
- **UNVERIFIED** — inference, proposal, or claim without sufficient evidence.
- **FAILED** — confirmed execution failure.

Never claim that work is implemented, tested, passing, verified, complete, or
production-ready without the relevant evidence.

Report verification limitations explicitly. In particular, state whether
the evidence came from direct local execution (a lane with real shell
access, such as Claude Code, Codex CLI, or OMP) or from inspecting
material handed over into a chat session with no independent repository
access. These are not equivalent and should not be described as if they were.

---

## 9. Git and Review Boundary

`main` is the protected canonical integration branch.

Normal implementation work should use a dedicated feature branch or worktree.

Implementation agents must not bypass the project's review and approval
process, regardless of which lane or harness they run under.

Passing tests do not by themselves authorize a merge.

**Approval to merge is held by the active Chief Engineer chat lane
(Claude Chat or ChatGPT — either is independently sufficient) or the
Project Owner. Execution of the merge is held equally by the Project Owner,
Claude Code, or Codex CLI/App.** Claude Chat and ChatGPT have the same Chief
Engineer role, as peers rather than a primary lane and a backup; Claude Code
and Codex CLI/App have the same Main Engineer role and the same
higher-trust, merge-capable standing, likewise as peers with no default or
preferred lane between them. OMP is a Main Engineer lane but does not hold
merge authority. The authoritative definition is
`docs/ENGINEERING_GOVERNANCE.md` §6a.

**The author of a change never approves it.** Work may run with three lanes
(Main Engineer → Chief Engineer → Project Owner) or, for audits, small
revisions and ad hoc tasks, two lanes (one chat lane authors, the other chat
lane reviews). The Project Owner may override any rule when it benefits the
project. See `docs/ENGINEERING_GOVERNANCE.md` §2a–§2b.

## 10. Completion

Every substantive task must leave a factual evidence trail.

A completion report should state:

- task;
- mode;
- implementation or findings;
- tests / verification;
- evidence;
- files changed;
- remaining risks / limitations;
- Git state;
- handoff.

Do not report more certainty than the evidence supports.
