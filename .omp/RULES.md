# OMP Rules

Short tripwire list. The reasons and details are in `AGENTS.md`; the
project's own "never" items are in `AGENTS.project.md`. Both apply.

## Before you start

1. Read `AGENTS.md`, `AGENTS.project.md` and `docs/ENGINEERING_GOVERNANCE.md`.
2. Check live Git state (`git status`, current branch) before changing files.
3. Repository evidence beats any earlier model's claim.

## Never

- merge to `main` without the Owner's approval on record, or commit directly
  to `main`;
- force-push, or rewrite history, without explicit authorization;
- approve any change; only the Owner approves;
- treat silence, a green test run, or an earlier approval as approval;
- claim a test, build, lint or typecheck passed without running it;
- downgrade a real failure to get a green result;
- weaken or bypass authentication, authorization, validation, provenance, or
  a failed safeguard;
- add secrets or credentials to the repository;
- mix unrelated refactors or dependency upgrades into a scoped task;
- let two agents edit the same worktree at once;
- add sections or work the task did not ask for.

## Git check

Before committing: `git status` and `git diff`.
After committing: `git status` and `git log --oneline --decorate -3`.

## Evidence

Classify results only as `VERIFIED`, `FAILED`, `UNVERIFIED` or `Owner decision`
(`AGENTS.md` §6). Read-only work ends with
`NO APPLICATION CODE CHANGES.`
