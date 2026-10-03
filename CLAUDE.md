@AGENTS.md
@AGENTS.project.md

# CLAUDE.md (universal master)

Operating notes for Claude Code as a Main Engineer. Rules live in
`AGENTS.md` and `AGENTS.project.md` (imported above); this file adds only
Claude Code mechanics. Governance and workflow documents are read on demand
(`AGENTS.md` §1), not imported.

## Before real work

1. Check actual Git state (`git status`, `git log -5`, current branch).
2. Skim the project status document for current posture. Docs drift.
3. Read the real code and tests for the area. Do not infer behavior from
   documentation alone.
4. If another agent left a handoff, read it and verify its claims,
   especially anything marked UNVERIFIED.

You have local shell and filesystem access. Chat lanes and the Project Owner
usually cannot re-run your commands, so the evidence you leave must stand on
its own.

## Working style

- Use the existing mechanism when one solves the problem. Match the existing
  stack. If you think the mechanism is wrong, say so rather than building a
  parallel path.
- For anything listed as sensitive in `AGENTS.project.md`, slow down, find
  the invariant being protected, and do not paper over a gap with a UI-only
  check.
- When producing something for the Project Owner to copy, keep code in its
  own fenced block and commentary outside it.

## Skills

Use installed skills proactively; the Project Owner does not want to invoke
them by name. Pull in `architecture`, `code-review`, `testing-strategy`,
`documentation`, `data` and `modern-web-guidance` whenever they would
materially sharpen the work. This is a standing instruction.

## Handoff

Follow `AGENTS.md` §9. Small or exploratory work can use a short summary
(what changed and why, what you ran and the real result, what is still
unverified, branch and commit). When the work goes to a chat-based Chief
Engineer, follow the package steps in `docs/AI_ENGINEERING_WORKFLOW.md` §4
and give the Project Owner the actual Git output; a chat lane cannot inspect
the repository itself.

## Merging

Claude Code may execute an approved merge (governance §6a). Never approve a
change you authored, and name your lane as author lane on the pull request.
