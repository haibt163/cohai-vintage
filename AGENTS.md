# Cô Hai Vintage — Agent Instructions (universal)

These rules apply to **every** lane — engineering (Claude Code, Codex CLI/App, OMP CLI, future) and review (Claude Chat, ChatGPT).
They are model-agnostic: models and tools change, these rules do not.

Precedence: Project Owner's explicit instruction → `ENGINEERING-GOVERNANCE.md` → `AGENTS.project.md` → this file → tool-specific files.

## 1. Document map

| Read | For |
|---|---|
| `ENGINEERING-GOVERNANCE.md` | roles, lanes, review, merge authority, evidence standards |
| `WORKFLOWS.md` | step-by-step procedures and prompt templates |
| `AGENTS.project.md` | Cô Hai Vintage facts: stack, architecture, media/content/design rules, open work |
| `PROJECT_STATUS.md` | current state and open items (the handover) |
| `AUDIT-2026-09-29.md` | latest audit/remediation tracker (finding IDs, Owner decisions) |
| `MEDIA-MAPPING.md`, `ORIGINAL-WORDPRESS.md`, `PHOTO-REPLACEMENT-GUIDE.md` | recovered-source provenance and photo replacement |

## 2. Session start

Follow `WORKFLOWS.md` §1: governance → handover → live Git state → relevant code → independently verify important prior claims →
continue from evidence. State whether the task is **implementation** or **read-only audit** (`NO APPLICATION CODE CHANGES.`).
Do not restart the reconstruction or begin a broad redesign unless explicitly asked.

## 3. Source of truth

`main` on GitHub is authoritative. Repository files, Git history, PRs, tests, CI/Vercel evidence and Owner decisions are durable truth.
Conversation history is context only. If they disagree, trust the repository and correct the record.

## 4. Working principles

1. **Think before coding.** State assumptions and success criteria. If the request is ambiguous or a gate in Governance §8 applies, ask
   rather than guess. Surface trade-offs; push back when a simpler path exists. Read the existing code and the recovered source first.
2. **Simplicity first.** The minimum change that meets the criteria. No speculative features, abstractions, config or dependencies.
   If 30 lines do it, do not write 200.
3. **Surgical changes.** Touch only what the task requires; match existing style and patterns. Do not refactor or "improve" adjacent code.
   Mention unrelated problems or dead code instead of silently changing them. Clean up only what *your* change made unused.
4. **Goal-driven execution.** Turn the task into checkable outcomes (e.g. "`/portfolio` returns 308 to `/journal`"), then loop — change,
   run, observe — until the evidence shows it is met. Report what you actually verified.

## 5. Evidence rules

`VERIFIED` (direct evidence) · `UNVERIFIED` (proposal/inference/claim without evidence) · `FAILED` (confirmed failure). Do not call
anything fixed, working, passing, complete or production-ready without relevant evidence. Keep layers distinct: ZIP = project state, Git
output = history, command/deployment output = execution evidence. Visual work needs a rendered look at desktop and iPhone width.

## 6. Hard boundaries

- Never commit to `main` directly; work on a feature branch/worktree. Never let two agents edit one worktree.
- Never merge your own unreviewed work. OMP and chat lanes never execute merges. Merge only after an on-record APPROVE (Governance §4).
- Never bypass a failed safeguard (photo apply script, CI, `check:media`).
- Never invent business facts: prices, stock, condition, provenance, authenticity, measurements, dates (`AGENTS.project.md` §4).
- Never commit secrets or recovery artefacts (`AGENTS.project.md` §9). Everything under `public/` is served to the internet.
- Never hide image-quality problems with CSS tricks; fix the source file (`AGENTS.project.md` §3).
- Ask the Owner before the actions listed in Governance §8.

## 7. Definition of done

Success criteria met **and** the standard verification set run with output attached (`WORKFLOWS.md` §0) **and** user-visible changes checked on a
preview deployment **and** a handoff/PR note listing scope, evidence, risks and `UNVERIFIED` items. Update `PROJECT_STATUS.md` when state changes.

## 8. Continuity

Leave durable, repository-visible handoffs (`WORKFLOWS.md` §7) rather than relying on chat memory. Any lane must be able to pick up the work
from the repository alone.

<!-- Working principles in §4 follow the "Karpathy skills" style used in CoHai Travel; replace with that project's verbatim text if it differs. -->
