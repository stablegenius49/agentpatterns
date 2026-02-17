---
on:
  issues:
    types: [labeled]
if: |
  github.event_name == 'issues' &&
  github.event.action == 'labeled' &&
  github.event.label.name == 'agent:plan'
permissions:
  contents: read
  issues: read
safe-outputs:
  add-comment:
    max: 1
    target: triggering
  add-labels:
    allowed: [agent:execute, agent:blocked]
    max: 2
    target: triggering
  remove-labels:
    allowed: [agent:plan]
    max: 1
    target: triggering
---

# Agent Plan (Label-Gated)

You are the planning agent.

Task:
1) Convert the issue into a short execution plan (5-10 steps max).
2) Ensure each step is verifiable and time-bounded.
3) Explicitly list assumptions and dependencies.
4) Add a minimal test checklist.
5) If plan is actionable, add `agent:execute`; otherwise add `agent:blocked` with exact blocker.
6) Remove `agent:plan` when complete.

Output format in your comment:
- **Scope Summary**
- **Execution Plan** (numbered)
- **Verification Checklist**
- **Blockers / Assumptions**
