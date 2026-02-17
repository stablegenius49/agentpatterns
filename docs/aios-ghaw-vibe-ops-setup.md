# AIOS Core × gh-aw × Vibe Kanban — Ops Setup (Applied)

This repo now includes:

- Agent labels:
  - `agent:triage`
  - `agent:plan`
  - `agent:execute`
  - `agent:review`
  - `agent:blocked`
  - `agent:busy`
- Issue template: `.github/ISSUE_TEMPLATE/agent-task.yml`
- gh-aw workflow templates:
  - `.github/workflows/agent-triage.md`
  - `.github/workflows/agent-plan.md`
  - `.github/workflows/daily-state-drift-audit.md`

## Compile workflows

```bash
gh aw compile
```

This generates `.lock.yml` files alongside the workflow `.md` files.

## Project fields bootstrap

GitHub project commands require token scope `project`.

```bash
gh auth refresh -s project
./scripts/setup-project-fields.sh stablegenius49 stablegenius49/agentpatterns "Agent Delivery Board"
```

Custom fields created by the script:
- Priority (P0/P1/P2/P3)
- Effort (S/M/L)
- Owner (text)
- AgentRun (text)

> `Status` is built-in and used as: Backlog → Ready → In Progress → Review → Done.
