# Engineering Governance

**Effective:** 22 November 2026. This standard replaces all earlier lane, review
and merge rules. It is harness-neutral and contains no project-specific content;
copy it unchanged into another repository.

## 1. Roles

### Owner — final authority

The Owner defines the task, chooses the operating mode (§2), assigns roles (§5)
and approves merges. Only the Owner's approval authorizes a merge to `main`.

### Main Engineer — any harness agent

The Main Engineer is any harness agent: OMP, Codex, Claude Code, Antigravity, or
another harness the Owner assigns. All Main Engineers have full repository
access, including merging to `main`, but only after the Owner's approval is on
record.

### Chief Engineer — advisory reviewer

The Chief Engineer is Claude, ChatGPT, Gemini, or another advisory model the Owner
assigns. The Chief Engineer reviews and recommends. The Chief Engineer never
merges.

## 2. Operating modes

The Owner chooses one mode per task.

- **Two lanes — Main Engineer + Owner.** The Main Engineer implements and opens a
  pull request. The Owner approves.
- **Three lanes — Main Engineer + Chief Engineer + Owner.** The Main Engineer
  implements and opens a pull request. The Chief Engineer reviews and recommends.
  The Owner approves.

## 3. Change flow

1. The Owner defines the task and chooses the mode.
2. The Main Engineer works on a sub-branch and opens a pull request. The pull
   request is the tracking record for the change.
3. In three-lane mode, the Chief Engineer reviews and recommends.
4. The Owner approves on record.
5. The Main Engineer or the Owner merges to `main`. The Chief Engineer does not.

No direct commits to `main`. Every change reaches `main` through a pull request
from a sub-branch.

## 4. Merge gate

A merge to `main` requires the Owner's approval on record.

**Approval on record** means either a GitHub review marked **Approve** by the
Owner, or an explicit approval comment by the Owner on the pull request. A chat
verdict is not an approval on record unless the Owner posts it on the pull
request.

- The Chief Engineer's recommendation is advisory input, not a merge gate.
- Passing tests, CI, a prior approval, or silence do not substitute for the
  Owner's approval.
- Agent approval is not a merge gate; only the Owner approves.

## 5. Role assignment and switching

The Owner may assign any harness as Main Engineer and any other as Chief Engineer
at any time. A harness may move between roles between tasks. Switching roles or
harnesses never changes the approval boundary in §4.

## 6. Standing rules

- `main` is the protected source of truth. Changes reach it only through a pull
  request approved by the Owner.
- Evidence uses **VERIFIED**, **UNVERIFIED** and **FAILED**. VERIFIED means direct
  repository, command, test, CI or runtime evidence; UNVERIFIED means inference or
  a claim without that evidence; FAILED means a confirmed execution failure.
- Do not report work as done, working or complete without evidence.
- Read-only tasks end with `NO APPLICATION CODE CHANGES.`
- One agent per worktree. Two agents must never edit the same worktree at once.
- Do not commit secrets, source ebooks or private license records.
