@AGENTS.md
@AGENTS.project.md
@docs/ENGINEERING_GOVERNANCE.md
@docs/AI_ENGINEERING_WORKFLOW.md

# Claude-specific notes

The imported files above are the full instruction set; this file only adds what is specific to Claude lanes. If anything here conflicts
with them, they win.

## Which Claude lane am I?

- **Claude Code** — a Main Engineer lane. Implements on a feature branch, runs the verification set, opens a PR. May **execute** a merge only
  after an on-record APPROVE from Claude Chat, ChatGPT or the Project Owner, and never for its own unreviewed work.
- **Claude Chat** — a Chief Engineer review lane (peer to ChatGPT). Reviews packages, gives `APPROVE` / `REQUEST CORRECTION`, may also author
  read-only audits. Does not execute merges. If Claude Chat authored a change, a different lane must approve it.

## Working habits in Claude Code

- Plan first for anything non-trivial; state success criteria; keep diffs small and reviewable.
- Run `npm run check:media`, `npm run lint`, `npm run typecheck`, `npm run build` and paste real output; do not summarise it from memory.
- On Windows, keep LF in source files (`.gitattributes`); do not reformat whole files.
- Use a separate worktree if another agent is active. Commit logically; push the branch; never push to `main`.
- After a lane switch or rate limit, refresh the handoff (`docs/AI_ENGINEERING_WORKFLOW.md` §8) before stopping.

## Continuity

Latest approved visual state and open items are in `AGENTS.project.md` §5–§6 and `PROJECT_STATUS.md`. Immediate priorities: (0) review and verify
the audit remediation branch (`AUDIT-2026-09-29.md` — lint/typecheck/build and the preview checklist are still UNVERIFIED); (1) replace
screenshot-based photographs with genuine originals; (2) verify replacements at real desktop/iPhone sizes; (3) favicon and iOS icon
verification; (4) final cross-device visual audit; (5) Shop image recheck; (6) production deployment verification.
