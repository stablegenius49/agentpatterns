# AIOS Core × gh-aw × Vibe Kanban — Minimal Integration Blueprint

> Goal: **GitHub as single source of truth (SoT)**, **Vibe Kanban as execution cockpit**, **gh-aw as safe automation layer**.

## 1) System Roles (clear boundaries)

- **GitHub Issues + Projects**: canonical task contract + portfolio state
- **gh-aw (GitHub Actions)**: label-gated, safe-output automation in CI
- **Vibe Kanban**: multi-agent execution panel (parallel runs, review, handoff)

Rule of thumb:
- Truth lives in GitHub
- Speed lives in Vibe
- Guardrails live in gh-aw

---

## 2) Minimal Data Model

### 2.1 Issue template (required fields)

Each work item must include:
- Goal
- Acceptance Criteria (testable)
- Non-goals
- Risks / Constraints
- Test Expectations
- Docs Impact

### 2.2 Project fields (minimal)

- `Status` (Backlog / Ready / In Progress / Review / Done / Blocked)
- `Priority` (P0/P1/P2/P3)
- `Effort` (S/M/L)
- `Owner` (human owner)
- `AgentRun` (optional run id / task id)

---

## 3) Field Mapping (GitHub ↔ Vibe)

| Concept | GitHub (SoT) | Vibe Kanban | Sync direction |
|---|---|---|---|
| Task identity | Issue # + URL | Task externalRef | GitHub → Vibe |
| Title | Issue title | Task title | GitHub → Vibe |
| Scope | Issue body | Task description | GitHub → Vibe |
| Priority | Project `Priority` | Task priority | GitHub → Vibe |
| Execution state | Project `Status` + labels | Task status | **GitHub authoritative** |
| Execution artifact | PR URL / commit | Task output links | Vibe → GitHub (comment) |
| Blockers | `agent:blocked` + issue comment | Blocked flag | Vibe → GitHub |

**Anti-drift policy**
- Only GitHub can finalize state transitions (`Done`, `Blocked`, reopen)
- Vibe writes progress as comments/PR links, not final truth

---

## 4) Label Gate Policy

Required labels:
- `agent:triage`
- `agent:plan`
- `agent:execute`
- `agent:review`
- `agent:blocked`

Behavior:
- No gate label → no agent run
- `agent:block`/`agent:blocked` present → stop/pause automation
- All mutating ops must go through gh-aw safe-outputs

---

## 5) State Machine (authoritative in GitHub)

```text
Backlog --(triaged + criteria clear)--> Ready
Ready --(agent:execute + task created in Vibe)--> In Progress
In Progress --(PR opened)--> Review
Review --(PR merged + checks pass)--> Done
Any --(blocking risk / missing info)--> Blocked
Blocked --(unblocked + criteria updated)--> Ready
```

### Transition gates

- `Backlog → Ready`: acceptance criteria complete
- `Ready → In Progress`: branch created (`agent/issue-<id>`) and task assigned
- `In Progress → Review`: PR opened with issue link
- `Review → Done`: required checks + human approval + merge

---

## 6) Minimal Workflow Set

## Workflow A — Triage (gh-aw)
Trigger: new issue or `agent:triage`
- Summarize issue
- Suggest labels
- Request missing info
- Add to Project as `Backlog`

Write scope: labels, comments, project fields (safe-outputs only)

## Workflow B — Plan (gh-aw)
Trigger: `agent:plan`
- Generate implementation checklist
- Validate acceptance criteria quality
- Move to `Ready` if criteria are testable

## Workflow C — Execute (Vibe Kanban)
Trigger: `agent:execute` or Project status = `Ready`
- Launch one or more agents
- Branch naming: `agent/issue-<id>`
- Open PR referencing issue
- Post run summary comment back to issue

## Workflow D — Review/Merge (gh-aw + human)
Trigger: PR opened/updated
- Risk/changes summary
- Test failure analysis
- Human review + merge
- On merge: close issue + set `Done`

---

## 7) Safety & Security Controls

- gh-aw tools restricted to minimal allow-list
- Safe-outputs as only write path in CI
- Treat issue/PR text as untrusted input
- Approval required for secret-touching or repo-wide changes
- Optional lock label to avoid collision: `agent:busy`

---

## 8) Rollout Plan (3 phases)

### Phase 1 (1-2 days): Baseline
- Create labels + project fields
- Standardize issue template
- Enable Triage + Plan workflows only

### Phase 2 (2-4 days): Execution sync
- Add Vibe execution process
- Enforce branch/PR conventions
- Auto-comment run summaries to issues

### Phase 3 (ongoing): Drift control
- Daily reconciliation job (Project vs PR vs issue labels)
- Weekly metric review

---

## 9) KPIs (to prove it works)

- Lead time (`Ready -> Done`)
- PR cycle time (`Open -> Merge`)
- Reopen rate
- Blocked time per issue
- Drift incidents (Vibe status != GitHub status)

---

## 10) Definition of Done (DoD)

An item is Done only when:
1. Acceptance criteria satisfied
2. PR merged to default branch
3. Linked issue closed
4. Project status = Done
5. Agent summary comment posted (what changed, tests, risks)

---

## 11) Practical defaults

- **SoT**: GitHub Issues/Projects
- **Execution**: Vibe Kanban
- **Automation**: gh-aw safe outputs
- **Sync**: Prefer one-way (GitHub → Vibe), with structured progress callbacks back to GitHub

This gives speed without sacrificing auditability, permissions hygiene, or state integrity.