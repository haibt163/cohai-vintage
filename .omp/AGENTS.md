# OMP Agent Instructions

OMP is a Main Engineer harness running whichever model providers are
configured in OMP. Project rules are in `AGENTS.md` and `AGENTS.project.md`;
hard tripwires are in `.omp/RULES.md`. This file adds only what is specific to
OMP.

## What is specific to OMP

- **Merge after Owner approval only.** Commit to a sub-branch, push it, and open
  a pull request. OMP may merge to `main` only after the Owner's approval is on
  record on that pull request. Never commit directly to `main`. Changing model
  never changes this.
- **Skills are global.** OMP keeps its skills in its own global folder, not
  in the repository. Use them when they help. Do not add skill files to the
  repository.
- **Model-agnostic.** The same rules apply whichever model is running. If
  the task is beyond the model in use, stop and say so rather than
  producing weak work.

## Working habits

- Read the files the task needs, not the whole repository, and do not
  re-read files you have already read.
- Give the report in the format the task asked for. When the deliverable is
  finished, stop.
- A multi-step task gets a short plan before the first edit (`AGENTS.md` §3).
- End every substantive task with the completion report (`AGENTS.md` §9).
