# Cô Hai Vintage — Project Procedures

Project-specific commands and steps. This was Part B of the old
`AI_ENGINEERING_WORKFLOW.md`; the section numbers (§12–§20) are kept so
existing references still resolve. Universal rules are in `AGENTS.md`;
roles and merge authority in `docs/ENGINEERING_GOVERNANCE.md`; report and
review formats in `docs/AI_ENGINEERING_WORKFLOW.md`. Read this file when you
verify, release, replace photos, or hand steps to the Project Owner.

Commands assume Windows PowerShell from the repository root (they also work in bash unless noted). Node 22 (`.nvmrc`).

## 12. Standard verification set

```bash
npm ci                 # fresh clone or dependency change
npm run check:media    # media references exist; no logs/plugin caches under public/
npm run lint
npm run typecheck
npm run build
```

Paste the actual output into the PR/handoff. For anything user-visible, also verify on a Vercel **preview** (desktop + iPhone width). After a
production deploy run `node scripts/verify-deployment.mjs https://<production-domain>` (§16) and paste its output.

## 13. Implementation task

1. Confirm scope and success criteria (what will be observably true when done). Ask the Project Owner first if an owner gate in `AGENTS.project.md` §12 applies.
2. `git switch main && git pull --ff-only && git switch -c <type>/<short-name>` (or a separate worktree if another agent is active).
3. Make the smallest change that meets the criteria; follow existing patterns (`AGENTS.md` §3).
4. Commit in logical units with messages that say what and why.
5. Run §12. Fix failures; never bypass safeguards (e.g. the photo apply script).
6. Push the branch and open a PR: scope, files changed, verification output, risks, UNVERIFIED items, Owner decisions.
7. Request Chief Engineer review (§14; reply format in `AI_ENGINEERING_WORKFLOW.md` §4). State the author lane and the reviewer lane (they must differ, governance §2b). Do not merge your own work.

## 14. Requesting and performing a Chief Engineer review

**Author prepares:** the ZIP (via `create-project-zip-universal.ps1`) or PR link; `git status`, `git log -5 --oneline --decorate`,
`git show --stat --oneline HEAD`; the §12 output (plus preview URL and observations for visual changes); the handoff file listing UNVERIFIED items and open Owner decisions.

**Reviewer** (Claude Chat or ChatGPT, never the author's lane) follows the checklist and reply format in `AI_ENGINEERING_WORKFLOW.md` §4.

## 15. Merging

1. Confirm an on-record APPROVE for the current head SHA and CI green.
2. Executor = Project Owner, Claude Code or Codex CLI/App (not OMP, not a chat lane). Record the approval source in the PR.
3. After merge: confirm the Vercel production deployment is built from the new `main` SHA, run §16, update `PROJECT_STATUS.md`.

## 16. Release / deployment verification (Vercel)

- Preview per PR; production deploys from `main`.
- Confirm environment variables for the target (`NEXT_PUBLIC_SITE_URL`).
- Run `node scripts/verify-deployment.mjs <origin>`: checks status codes, redirects, headers, canonical/sitemap/robots host, JSON-LD,
  Open Graph image, locale `<html lang>`, 404 and the image optimiser. It is **necessary but not sufficient**: sharpness, layout, motion
  and mobile behaviour still need a human look at desktop and iPhone widths.
- Record the deployed commit SHA (Vercel dashboard or connector) and what was observed; only then mark items VERIFIED in `PROJECT_STATUS.md`.
- Rollback = revert the merge commit on `main` (or promote the previous Vercel deployment) and record it.

## 17. Photography replacement

Follow `PHOTO-REPLACEMENT-GUIDE.md` exactly (stage → replace with identical filenames → `apply-photo-replacements.ps1` → render on desktop and
iPhone → §12). Look in `archive/wordpress-recovery/2025/03/` for genuine originals first. Never bypass a failed safeguard.

## 18. Switching lanes mid-task

Commit or stash cleanly, refresh the handoff (`AI_ENGINEERING_WORKFLOW.md` §3) with current Git state and next step, then start the new lane at the fresh-session rule (`AI_ENGINEERING_WORKFLOW.md` §7). Do not let two
agents share a worktree. Approval boundaries are identical in every lane.

## 19. Applying a chat-authored change (Git bundle) — steps for the Project Owner

Used when Claude Chat (or another lane without GitHub access) authored the commits. Commits keep the author's name, so the record stays honest.

1. Download the `.bundle` file to `D:\` (or note where it is saved).
2. Open Command Prompt (cmd) and run:
```
cd /d D:\cohai-vintage
git switch main
git pull
git fetch D:\<path-to>\<name>.bundle <branch-name>:<branch-name>
git switch <branch-name>
git log --oneline -5
git push -u origin <branch-name>
```
3. Open the link that `git push` prints (or go to the repository on GitHub and click **Compare & pull request**). Write in the description: what changed,
   **Author lane: Claude Chat**, **Reviewer lane: ChatGPT** (or the Project Owner).
4. Paste the review request (§20) into the reviewing lane. When it replies **APPROVE**, click **Merge pull request** on GitHub (the Project Owner may do this).
5. After merging, run `git switch main` then `git pull`. Vercel deploys `main` automatically; then run §16.

## 20. Prompt templates

Keep prompts short. Point the agent at the three mandatory files only; it
opens governance or the workflow when `AGENTS.md` §1 says to. Name the exact
git ref, bound the checks, and say what the output must look like.

**Implementation brief**
```
Repo: <path>. Run `git fetch origin` and work from origin/main.
Read: AGENTS.md, AGENTS.project.md, PROJECT_STATUS.md. Nothing else unless the task names it.
Task: <one short paragraph>
Success criteria (each must be checkable):
  1) <…>  2) <…>
May change: <paths>.  Must not change: <paths>.
Branch: <type/name>. Do not merge. Stop and ask if the task needs anything outside this scope.
Verify: §12; paste the real output.
Deliver: the completion report from AGENTS.md §9. No extra sections.
```
**Read-only audit brief**
```
NO APPLICATION CODE CHANGES.
Repo: <path>. Run `git fetch origin` and audit origin/main.
Read: AGENTS.md, AGENTS.project.md, PROJECT_STATUS.md.
Check only: <3-6 specific questions>. Skip items already tracked unless their status changed.
Deliver: VERIFIED / FAILED / UNVERIFIED / Owner decision, one line plus evidence each, under <N> lines.
```
**Chief Engineer review request**
```
Review branch <n> @ <sha>. Package attached: ZIP (create-project-zip-universal.ps1), git status/log/show --stat,
verification output, handoff file. Say whether your review is based on handed-over material only.
Reply in the review format in docs/AI_ENGINEERING_WORKFLOW.md §4.
```
