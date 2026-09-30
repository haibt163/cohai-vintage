# OMP Rules — Cô Hai Vintage

## Mandatory

1. Read `AGENTS.md` before substantive work.
2. Read `AGENTS.project.md` before substantive work.
3. Read `.omp/AGENTS.md` before substantive OMP work.
4. Inspect live repository state before changing files.
5. Treat repository evidence as authoritative over prior model claims.
6. Keep implementation scope narrow and reviewable.
7. Use an isolated feature branch/worktree when needed for safe implementation.
8. Verify every claimed result with direct evidence.
9. Run relevant tests after implementation.
10. Preserve historical documentation and provenance.
11. Never add secrets or credentials.
12. Report failures and limitations honestly.
13. Do not bypass the project's review/approval boundary.
14. OMP must not merge implementation work to protected `main`; approved
    merge execution is held equally by the Project Owner, Claude Code, or
    Codex CLI/App (peers, neither preferred) after the required approval
    gate is satisfied.
15. The lane that authored a change never approves it (see
    `docs/ENGINEERING_GOVERNANCE.md` §2b).

---

## Never

- never force-push;
- never rewrite historical commits without explicit authorization;
- never silently merge branches;
- never let two coding agents edit the same worktree concurrently;
- never claim a test passed without running it;
- never claim a build passed without running it;
- never claim verification without evidence;
- never downgrade a critical failure to obtain green status;
- never introduce unrelated refactors into a scoped task;
- never upgrade dependencies without a justified requirement;
- never add secrets or credentials to source control;
- never bypass authentication, authorization, validation, or provenance;
- never treat an agent report as proof when repository verification is possible;
- never treat silence or lack of objection as approval;
- never treat prior model approval as approval for the current change;
- never merge directly to protected `main`;
- never place logs, plugin caches or dumps under `public/`;
- never invent business facts (price, stock, condition, provenance);
- never treat completion of an OMP task as merge authority;
- never assume OMP can execute a merge merely because an approval exists;
  approved merge execution is reserved for the Project Owner, Claude Code, or
  Codex CLI/App — equally, as peers, with no default between the two.

---

## Evidence

Use only:

`VERIFIED`

`UNVERIFIED`

`FAILED`

Read-only audits must state:

`NO APPLICATION CODE CHANGES.`

---

## Git Check

Before committing, inspect:

```text
git status
git diff
```

After committing, inspect:

```text
git status
git log --oneline --decorate -3
```

A clean test result does not authorize a merge.

---

## Approval Boundary

Implementation / investigation
→ tests + evidence + handoff
→ Chief Engineer review (Claude Chat or ChatGPT — either is independently
  sufficient, as peers)
→ APPROVE from Chief Engineer chat or Project Owner
→ merge executed by Project Owner, Claude Code, or Codex CLI/App (peers,
  neither preferred)
→ protected `main`

No model, harness, tool, test result, prior approval, or deadline bypasses this
boundary. OMP remains non-merge-capable even though Claude Code and Codex
CLI/App are peer, authorized merge-capable Main Engineer lanes.
