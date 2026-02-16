# Integration patterns: GitHub Agentic Workflows (gh-aw) + GitHub Projects/Issues + Vibe Kanban

> **Purpose**: practical patterns for an AI‑agent development pipeline that combines **gh-aw** (agentic workflows in GitHub Actions), **GitHub Issues/Projects** (system of record), and **Vibe Kanban** (agent orchestration cockpit).

## Sources (primary)
- **gh-aw repo + docs**: https://github.com/github/gh-aw | https://github.github.com/gh-aw/
- **gh-aw security architecture**: https://github.github.com/gh-aw/introduction/architecture/
- **gh-aw “How they work”**: https://github.github.com/gh-aw/introduction/how-they-work/
- **Vibe Kanban repo**: https://github.com/BloopAI/vibe-kanban | docs: https://vibekanban.com/docs

## Quick capability summary (what matters for integration)

### gh-aw (GitHub Agentic Workflows)
- **Natural‑language workflow spec** in Markdown with **frontmatter** (triggers, permissions, tools) + instructions. Runs in **GitHub Actions**.
- **Read‑only by default**; **write ops only via safe‑outputs** (sanitized, pre‑approved GitHub operations). Strong guardrails: **sandboxing**, **tool allow‑list**, **network isolation**, **compile‑time validation**, **SHA‑pinned deps**.
- Uses **MCP tools** for GitHub operations and external APIs. Supports Copilot/Claude/Codex engines.

### Vibe Kanban
- Focused on **orchestrating multiple coding agents**, parallel or sequential.
- **Switch between agents**, track task status, **review work**, run dev servers.
- **Centralize MCP config** for agents; supports **remote projects via SSH**.
- Runs as a **local/hosted orchestration UI** (CLI: `npx vibe-kanban`).

### GitHub Issues + Projects
- Issues = **source‑of‑truth task contracts** (scope + acceptance criteria).
- Projects = **portfolio‑level state/throughput** (Backlog → Ready → In‑Progress → Review → Done). 

---

## Integration patterns (practical)

### 1) **Issues as the contract, Projects as the scoreboard**
- **Issues** carry *exact* scope, acceptance criteria, and risk/constraints.
- **Projects** track state across work items and across repos if needed.
- **gh-aw** reads issue bodies to triage, summarize, and update metadata; **Vibe Kanban** uses issues as the tasks agents execute.

**Why this works**: Issues are durable and reviewable; Projects provide consistent roll‑up; Vibe Kanban executes but doesn’t need to be the system of record.

---

### 2) **Label‑gated agent runs**
Use labels to explicitly **authorize agent actions**. For example:
- `agent:triage` → gh-aw runs triage workflow
- `agent:plan` → gh-aw generates plan + task breakdown
- `agent:execute` → signals Vibe Kanban operator to run agents
- `agent:block` → pause all agent‑driven changes

**Why this works**: prevents accidental automation, creates a clear audit trail, and avoids prompt‑injection from untrusted issues.

---

### 3) **Safe‑outputs as the only write path**
- Restrict gh-aw to **safe outputs** for: create issue, add labels, comment, update project fields, open PR, etc.
- Use **human approval** for any repo‑modifying steps or PR merges.

**Why this works**: aligns with gh-aw’s security model and keeps CI agent execution within a minimal blast radius.

---

### 4) **Vibe Kanban as execution cockpit**
- Use Vibe Kanban to **run agent workflows locally/remote**, while gh-aw stays in CI for controlled automation.
- Each Vibe Kanban task references a **single issue URL** and a **branch name convention** (e.g., `agent/issue-1234`).

**Why this works**: keeps real code changes closer to human oversight and developer tooling while gh-aw handles deterministic, safe automation in CI.

---

### 5) **Projects ↔ Issue ↔ PR state linkage**
- Update Project fields when **issue labels change** or **PRs open/merge**.
- Example mapping:
  - `Backlog` → new issue, no `agent:plan`
  - `Ready` → `agent:execute`
  - `In Progress` → PR opened
  - `Review` → PR ready for review / CI green
  - `Done` → PR merged + issue closed

**Why this works**: single source of truth for status with clear, automatic transitions.

---

## Concrete recommendations (actionable)

1. **Standardize issue templates**
   - Fields: *Goal*, *Acceptance criteria*, *Non‑goals*, *Risk/constraints*, *Test expectations*, *Docs impact*.

2. **Define explicit labels for agent workflows**
   - `agent:triage`, `agent:plan`, `agent:execute`, `agent:blocked`, `agent:review`.

3. **Create a minimal Project schema**
   - Fields: **Status**, **Priority**, **Effort**, **Owner**. Keep it tiny to avoid sync drift.

4. **Use gh-aw for safe, high‑leverage tasks**
   - Triage, issue summarization, code‑review summaries, release notes drafts, test‑failure analysis.

5. **Run code‑changing agent work in Vibe Kanban**
   - Pair with strict branch naming + PR templates.
   - Ensure each Vibe Kanban task links back to a single Issue.

6. **Prefer one‑way sync where possible**
   - GitHub → Vibe Kanban for tasks; avoid two‑way status editing unless you implement explicit idempotent mapping.

7. **Gate sensitive actions**
   - Use approval checks for write operations, PR merge, or workflow steps that touch secrets.

---

## Pitfalls / gotchas

- **State drift**: GitHub Projects vs Vibe Kanban statuses can diverge. Choose a single source of truth.
- **Permission creep**: don’t grant write tokens or broad scopes to gh-aw; safe‑outputs only.
- **Prompt injection via issues/PRs**: treat user input as untrusted; restrict tools + require approvals.
- **Agent concurrency collisions**: two agents working same files leads to merge conflicts. Use locking labels (`agent:busy`).
- **Over‑automation**: auto‑closing issues or editing metadata without human review can harm trust.
- **Unclear acceptance criteria**: agents need precise “done” signals; otherwise they loop or over‑scope.
- **Hidden dependencies**: issues referencing untracked external systems or unreproducible environments stall agents.

---

## Minimal workflow set (recommended)

### 1) **Issue Triage (gh-aw)**
**Trigger**: new issue opened, or `agent:triage` label
- Summarize issue, suggest labels (`bug`, `feature`, `needs-info`), and add to Project as `Backlog`.
- Ask for missing info if necessary.
- **Write path**: safe‑outputs only (labels, comments, project update).

### 2) **Plan & Scope (gh-aw)**
**Trigger**: `agent:plan` label
- Generate plan + checklist, extract acceptance criteria, propose sub‑tasks.
- Add `Ready` status if acceptance criteria is clear.
- **Write path**: safe‑outputs only (comment + project update).

### 3) **Execute (Vibe Kanban)**
**Trigger**: `agent:execute` label or Project status → `Ready`
- Human/operator launches Vibe Kanban task, selects agent(s), runs in parallel.
- Work on branch `agent/issue-<id>`; open PR with link to issue.
- Update project to `In Progress` when PR opens.

### 4) **Review & Merge (gh-aw + humans)**
**Trigger**: PR opened or ready‑for‑review
- gh-aw posts a PR summary, flags risk, checks tests; human review + merge.
- On merge, issue auto‑closed, Project moved to `Done`.

*(Optional)* **Daily Status Report (gh-aw)**
- Scheduled summary for stakeholders; creates a short issue or discussion note.

---

## Notes on implementation style
- **Frontmatter discipline**: keep gh-aw tool list minimal and permissions explicit.
- **MCP configuration**: Vibe Kanban centralizes MCP configs; mirror those in gh-aw via MCP Gateway where needed.
- **Branch & PR conventions**: enforce predictable naming so automation can parse and link reliably.

---

## Example label + status schema (minimal)

**Labels**
- `agent:triage`
- `agent:plan`
- `agent:execute`
- `agent:blocked`
- `agent:review`

**Project Status**
- Backlog → Ready → In Progress → Review → Done

---

## Bottom line
Use **GitHub Issues/Projects as the canonical system of record**, **gh-aw for safe CI‑native automation**, and **Vibe Kanban as the execution cockpit** for multi‑agent coding. Keep permissions minimal, rely on label‑gated workflows, and avoid two‑way state sync unless you implement explicit, idempotent mappings.
