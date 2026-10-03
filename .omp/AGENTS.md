# OMP Agent Instructions (universal master)

OMP is an implementation and investigation lane running whichever model
providers are configured in OMP. Project rules are in `AGENTS.md` and
`AGENTS.project.md`; hard tripwires are in `.omp/RULES.md`. This file adds
only what is specific to OMP.

## What is specific to OMP

- **No merge authority.** Commit to a feature branch, push it if you have
  access, and hand over the branch with evidence. Approval and merge happen
  through the process in `docs/ENGINEERING_GOVERNANCE.md` §6a. Changing model
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
