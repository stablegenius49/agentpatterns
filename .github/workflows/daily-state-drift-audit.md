---
on:
  schedule:
    - cron: "17 16 * * *"
  workflow_dispatch:
permissions:
  contents: read
  issues: read
  pull-requests: read
safe-outputs:
  create-issue:
    title-prefix: "[drift-audit] "
    labels: [automation]
    max: 1
    close-older-issues: true
---

# Daily State Drift Audit

Goal: detect status drift between issue labels and PR state.

Checks:
- Issues labeled `agent:execute` but with no linked open PR after a reasonable window.
- Issues labeled `agent:blocked` that have recent activity and may be stale.
- Closed issues still carrying agent execution labels.

Create one concise audit issue with:
1) Findings grouped by severity
2) Suggested fixes per finding
3) "No critical drift" statement if clean
