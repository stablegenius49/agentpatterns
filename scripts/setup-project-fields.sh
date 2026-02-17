#!/usr/bin/env bash
set -euo pipefail

OWNER="${1:-stablegenius49}"
REPO="${2:-stablegenius49/agentpatterns}"
PROJECT_TITLE="${3:-Agent Delivery Board}"

need_scope_msg() {
  echo "GitHub token needs project scope. Run: gh auth refresh -s project"
}

if ! gh project list --owner "$OWNER" --limit 1 >/dev/null 2>&1; then
  need_scope_msg
  exit 1
fi

project_number=$(gh project list --owner "$OWNER" --limit 100 --format json \
  | jq -r --arg t "$PROJECT_TITLE" '.projects[] | select(.title==$t) | .number' | head -n1)

if [[ -z "${project_number:-}" ]]; then
  echo "Creating project: $PROJECT_TITLE"
  gh project create --owner "$OWNER" --title "$PROJECT_TITLE" >/dev/null
  project_number=$(gh project list --owner "$OWNER" --limit 100 --format json \
    | jq -r --arg t "$PROJECT_TITLE" '.projects[] | select(.title==$t) | .number' | head -n1)
fi

echo "Using project #$project_number"

ensure_field() {
  local name="$1" type="$2" opts="${3:-}"
  if gh project field-list "$project_number" --owner "$OWNER" --format json \
    | jq -e --arg n "$name" '.fields[] | select(.name==$n)' >/dev/null; then
    echo "Field exists: $name"
  else
    if [[ -n "$opts" ]]; then
      gh project field-create "$project_number" --owner "$OWNER" --name "$name" --data-type "$type" --single-select-options "$opts" >/dev/null
    else
      gh project field-create "$project_number" --owner "$OWNER" --name "$name" --data-type "$type" >/dev/null
    fi
    echo "Field created: $name"
  fi
}

# Status is a built-in Project field. Ensure only custom fields here.
ensure_field "Priority" "SINGLE_SELECT" "P0,P1,P2,P3"
ensure_field "Effort" "SINGLE_SELECT" "S,M,L"
ensure_field "Owner" "TEXT"
ensure_field "AgentRun" "TEXT"

# Link repo to project (idempotent)
if gh project link "$project_number" --owner "$OWNER" --repo "$REPO" >/dev/null 2>&1; then
  echo "Linked repo to project: $REPO"
else
  echo "Repo already linked or link not required: $REPO"
fi

echo "Done. Open: https://github.com/users/$OWNER/projects/$project_number"
