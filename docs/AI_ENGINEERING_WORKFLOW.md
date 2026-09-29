# Cô Hai Vintage — Workflows

Step-by-step procedures that implement `ENGINEERING-GOVERNANCE.md`. Commands assume Windows PowerShell from the repository root;
they work in bash unless noted. Node 22 (`.nvmrc`).

## 0. Standard verification set

```bash
npm ci                 # after dependency changes or on a fresh clone
npm run check:media    # media references exist; no logs/plugin caches under public/
npm run lint
npm run typecheck
npm run build
```

Paste the **actual output** into the PR or handoff. Then, for anything user-visible, verify on a Vercel **preview** deployment
(desktop + iPhone width). Never write "passing" or "working" without this output.

## 1. Start of every session (any lane)

1. Read `ENGINEERING-GOVERNANCE.md`, `AGENTS.md`, `AGENTS.project.md`.
2. Read the current handover: `PROJECT_STATUS.md` and the newest audit/handoff file (currently `AUDIT-2026-09-29.md`).
3. Check live Git state: `git status`, `git branch --show-current`, `git log -5 --oneline --decorate`, `git fetch` and compare with `origin/main`.
4. Read only the code relevant to the task.
5. Independently verify any important prior claim you will rely on (run the command; do not trust the summary).
6. Continue from evidence. State the task, the success criteria, and whether it is **implementation** or **read-only audit**.

## 2. Implementation task (Main Engineer lane)

1. Confirm scope and success criteria (what will be observably true when done). Ask the Owner if a gate in Governance §8 applies.
2. `git switch main && git pull --ff-only && git switch -c <type>/<short-name>` (or a separate worktree if another agent is active).
3. Make the smallest change that meets the criteria; follow existing patterns (see `AGENTS.md` §4).
4. Commit in logical units with messages that say *what* and *why*.
5. Run the standard verification set (§0). Fix failures; never bypass safeguards (e.g. the photo apply script).
6. Push the branch and open a PR containing: scope, files changed, verification output, risks, `UNVERIFIED` items, Owner decisions.
7. Request Chief Engineer review (§4). **Do not merge your own work.**

## 3. Read-only audit / investigation

Begin the brief with **`NO APPLICATION CODE CHANGES.`** Work on a clean checkout; several audits may run concurrently.
Output is a findings document (see template §7) with evidence statuses. Recommendations become implementation tasks (§2) only after
the Owner or reviewer accepts them. Example: `AUDIT-2026-09-29.md`.

## 4. Requesting and performing a Chief Engineer review

**Author (any lane) prepares the review package:**
- repository ZIP snapshot (exclude `.git`, `node_modules`, `.next`); or the PR link;
- `git status`, `git log -5 --oneline --decorate`, `git show --stat --oneline HEAD`;
- output of §0 verification commands (and preview URL + observations for visual changes);
- the handoff/audit file, listing `UNVERIFIED` items and open Owner decisions.

**Reviewer (Claude Chat or ChatGPT — a different lane from the author)** checks, in order: requirements → design → correctness and
maintainability → tests/evidence → security/privacy → provenance (media/content) → deployment implications → risks → Git state.
It ends with exactly one outcome:

```
REVIEW OUTCOME: APPROVE | REQUEST CORRECTION
Reviewed commit: <sha>   Branch/PR: <name>
Corrections (if any): 1) … 2) …
Evidence relied on: <what was actually seen>   UNVERIFIED: <what was not>
```

An APPROVE is only valid for the stated SHA; new commits need a new outcome (or the Owner's explicit confirmation).

## 5. Merging

1. Confirm an on-record APPROVE for the current head SHA and CI green.
2. Executor = Project Owner, Claude Code or Codex CLI/App (**not** OMP, **not** a chat lane). Not the author unless the Owner is executing.
3. Prefer squash or merge per Owner preference; keep the history of `chore/media` moves reviewable (rename detection).
4. After merge: confirm the Vercel production deployment builds `main`'s new SHA; run the production checks in §6; update `PROJECT_STATUS.md`.

## 6. Release / deployment verification (Vercel)

- Preview per PR. Production deploys from `main`.
- Confirm required environment variables (`NEXT_PUBLIC_SITE_URL`) are set for the target environment.
- Check on the deployed URL: routes 200/redirects as expected; `/sitemap.xml`, `/robots.txt`; response headers; no console errors or
  failed network requests; images sharp at desktop and iPhone widths; EN and VI; contact flow; favicon/Apple icon.
- Record the deployed commit SHA and what was observed. Only then mark items `VERIFIED` in `PROJECT_STATUS.md`.
- Rollback = revert the merge commit on `main` (or promote the previous Vercel deployment) and record it.

## 7. Handoff / audit record template

```
# <Title> — <date>
Branch/SHA: …   Lane/model: …   Type: implementation | read-only audit (NO APPLICATION CODE CHANGES.)
Scope: …        Method/design: …
Changes or findings: (ID · description · status · evidence status)
Verification run: (commands + pasted output)   Evidence: (links/paths)
Risks: …        UNVERIFIED items: …        Unresolved questions / Owner decisions: …
Git state: (status, log -5, stat)    Recommendations: …    Artifacts: (paths, accessibility)
Review outcome: (filled by reviewer)
```

## 8. Photography replacement (project-specific)

Follow `PHOTO-REPLACEMENT-GUIDE.md` exactly (stage → replace with identical filenames → `apply-photo-replacements.ps1` → render on desktop
and iPhone → §0). Look in `archive/wordpress-recovery/2025/03/` for genuine originals first. Never bypass a failed safeguard.

## 9. Switching lanes mid-task

Commit or stash cleanly, write/refresh the handoff (§7) with current Git state and next step, then start the new lane at §1. Do not let
two agents share a worktree. Approval boundaries are identical in every lane.

## 10. Prompt templates

**Implementation brief**
```
Read ENGINEERING-GOVERNANCE.md, AGENTS.md, AGENTS.project.md, PROJECT_STATUS.md, then live Git state.
Task: <…>. Success criteria: <observable outcomes>. Branch: <type/name>. Do not merge.
Run §0 verification and include the output in the PR. List UNVERIFIED items.
```
**Read-only audit brief**
```
NO APPLICATION CODE CHANGES.
Read ENGINEERING-GOVERNANCE.md, AGENTS.md, AGENTS.project.md, PROJECT_STATUS.md. Audit: <area>.
Deliver a findings document using the WORKFLOWS.md §7 template with VERIFIED/UNVERIFIED/FAILED per finding.
```
**Chief Engineer review request**
```
Review branch <name> @ <sha> against ENGINEERING-GOVERNANCE.md §2 review scope. Package attached: ZIP, git status/log/show --stat,
verification output, handoff file. Reply with APPROVE or REQUEST CORRECTION using the WORKFLOWS.md §4 format.
```
