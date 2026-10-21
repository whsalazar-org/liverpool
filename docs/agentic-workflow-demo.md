# Presenter script: wishlist test coverage with an agentic workflow

## 1. Set expectations and check prerequisites

**Say:** "We are installing automation, not writing wishlist tests today. Later,
one manual run can use our frontend specialist and React skill to propose missing
tests in a draft PR. A human reviews the result; nothing approves or merges it."

GitHub Agentic Workflows is in **public preview** and subject to change. This demo
pins **gh-aw v0.92.0**; review release notes and regenerate the lock file before
adopting another version. Compilation is local validation, not proof that hosted
inference, billing, or repository policies will allow a run.

Prerequisites for the later live run:

- Git, an authenticated GitHub CLI, and Node.js 24 with npm.
- Repository write/workflow access, GitHub Actions enabled, and an Actions policy
  permitting the actions and container images in the generated lock file.
- An organization Copilot subscription with centralized billing available and
  **Organization > Settings > Copilot > Policies > Copilot CLI > Allow use of
  Copilot CLI billed to the organization** enabled by an authorized administrator.
- **Settings > Actions > General > Workflow permissions > Allow GitHub Actions
  to create and approve pull requests** enabled by an authorized administrator.
  An organization policy can prevent enabling this repository setting. This
  workflow creates drafts only; it does not approve PRs.
- A human-approved budget, permission review, and installation on the default
  branch before dispatch.

**Say:** "`copilot-requests: write` authorizes Copilot inference with the per-run
Actions `GITHUB_TOKEN`, billed to the organization. It is not repository contents
write access. No PAT or new secret is needed for this demo. A permission line
alone does not enable organization billing or override policy."

Actions compute and artifact storage follow the repository owner's Actions
allowances and pricing. Copilot inference consumes organization AI Credits
separately; model choice, token use, retries, and generated threat detection
affect cost. No-op and failed runs can still incur costs. Preview does not mean
free. Check current pricing and organization budgets before running; user-level
inference budgets do not cap organization-billed usage. The source's 15-minute
timeout bounds agent execution, not the entire multi-job run or its total cost.

The compiled v0.92.0 workflow also supplies runtime budget guardrails. These are
not a substitute for a reviewed organization budget or a guaranteed invoice cap.
Do not change repository settings, create credentials, print tokens, or dispatch
anything as part of preparing this demo.

**Show** (read-only; run shell blocks from the repository root in one Bash session):

```sh
export REPO=whsalazar-org/liverpool
gh auth status
gh repo view "$REPO" --json nameWithOwner,defaultBranchRef
export DEFAULT_BRANCH="$(gh repo view "$REPO" --json defaultBranchRef --jq '.defaultBranchRef.name')"
node --version
npm --version
git status --short
```

## 2. Inspect the existing agent, skill, and application conventions

**Say:** "The engine selects an existing custom agent, not a new persona. The
skill adds reusable React guidance. Neither expands the authorized change scope."

```sh
cat .github/agents/frontend-specialist.agent.md
cat .github/skills/react-simple-webapp/SKILL.md
cat .github/copilot-instructions.md
cat .github/instructions/react-webapp.instructions.md
cat src/App.jsx src/App.test.jsx src/products.js package.json vitest.config.js
cat .github/workflows/ci.yml
find .github -iname '*pull_request_template*' -print
```

Read any template files found, including files inside template directories.
There is no PR template in the initial demo checkout; the future workflow must
check again. Note the existing Vitest, React Testing Library, user-event,
`cleanup`, `within`, and dialog-shim conventions.

If the skill lacks frontmatter, prepend the following without replacing its
body. The demo branch already includes it:

```yaml
---
name: react-simple-webapp
description: Create and refine simple React and JavaScript applications
  with focused components, state, and user interactions.
---
```

## 3. Create the Markdown workflow

**Say:** "The Markdown file is the authored source. The compiler generates the
Actions YAML. We do not handwrite or edit the lock file."

For a fresh authoring rehearsal starting before this demo is installed, use a
clean worktree and create the branch:

```sh
git switch -c demo/react-wishlist-tests
mkdir -p .github/workflows
"${EDITOR:-vi}" .github/workflows/react-wishlist-tests.md
```

If the branch already exists, switch to it instead of recreating it. Paste the
complete source from [react-wishlist-tests.md](../.github/workflows/react-wishlist-tests.md),
including frontmatter and task body. In a checkout of this prepared branch the
file is already present; inspect it rather than recreating it:

```sh
cat .github/workflows/react-wishlist-tests.md
```

Explain the boundaries while showing the source:

- Only `workflow_dispatch` triggers it; pushes do not run the agentic workflow.
- `engine.agent` selects
  `.github/agents/frontend-specialist.agent.md`; `skills` installs
  `.github/skills/react-simple-webapp`, whose instructions are in `SKILL.md`.
- Node.js 24 and `npm ci` prepare existing locked dependencies.
- The agent has read-only contents and PR access, plus inference permission.
  The compiler generates separate privileged safe-output/conclusion jobs;
  review their actual permissions, not just the source's permissions.
- The PR handler permits only `src/App.test.jsx`, blocks protected files,
  permits at most one draft, and disables PR-to-issue fallback.
- The task checks for a covering open `[wishlist-tests]` PR before doing work.
  It requires baseline and final tests/build, meaningful observable transitions,
  a complete diff review, and no production or infrastructure changes.

The five target behaviors are empty-wishlist navigation; save/name/pressed/count
and product identity; dialog removal; adding a saved item to the bag without
unsaving it; and card unsaving without bag changes. Tests are the future
workflow's task, not part of installation.

## 4. Install the pinned compiler and compile

**Say:** "We pin the compiler so the generated workflow can be reviewed against
a known release. We do not run an initialization wizard that could add unrelated
files, settings, credentials, or dispatch a workflow."

For a first extension install:

```sh
gh extension install github/gh-aw --pin v0.92.0
gh aw version
```

If another version is already installed, stop and review replacement rather than
silently upgrading. If SAML or installation policy blocks extension installation,
ask an administrator to resolve access or use an approved release download.
Never work around a policy restriction or create credentials for this demo.

This branch was compiled with the standalone v0.92.0 Linux amd64 release binary,
verified against the published `checksums.txt`, after the authenticated extension
installer hit SAML enforcement. Its SHA-256 was
`4f1753b20416024b15ff2cbea3f5a8745d7473bd8c73d99b4e8a79d69bb0fe83`.
A standalone binary accepts the same `compile` arguments as `gh aw`.

```sh
gh aw compile react-wishlist-tests --no-check-update
git status --short
cat .gitattributes
npm ci
npm test
npm run build
git diff --check
```

Compilation must succeed without ignored errors. It generates
`.github/workflows/react-wishlist-tests.lock.yml` and marks lock files as
`linguist-generated` in `.gitattributes`. Commit both workflow files and that
attribute. Recompile after source changes; never repair generated YAML by hand.
For a different compatible release, first review its release notes, schema,
generated permissions/actions, and complete diff.

## 5. Review, commit, and push the installation branch

**Say:** "This installation changes workflow/configuration documentation only.
It does not change application code, tests, dependencies, or the existing CI."

```sh
git add .github/workflows/react-wishlist-tests.md \
  .github/workflows/react-wishlist-tests.lock.yml \
  .github/skills/react-simple-webapp/SKILL.md \
  .gitattributes docs/agentic-workflow-demo.md README.md
git diff --cached --stat
git --no-pager diff --cached
git diff --cached --check
git diff --cached --exit-code -- src package.json package-lock.json vitest.config.js .github/workflows/ci.yml
git commit -m "Add wishlist test agentic workflow demo" \
  -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
git push -u origin demo/react-wishlist-tests
```

Stop here for the preparation task. The remaining sections are commands for a
later, explicitly authorized live demonstration, not commands to execute now.
Existing CI may run on the branch push; that is not the agentic workflow.

## 6. Human-reviewed installation on the default branch

**Say:** "A branch push is not installation. A maintainer later opens an
installation PR through the GitHub UI, reviews the Markdown, skill metadata,
generated lock file, attributes, and documentation, and follows normal checks and
merge policy. We do not open that PR or merge it during preparation."

Do not bypass branch rules. Inspect generated files even though GitHub may
collapse them as generated. The compiler's diagnostic jobs can have
`issues: write` and create failure/incomplete reports; `fallback-as-issue: false`
only disables substituting an issue for the requested PR.

GitHub requires a manually dispatched workflow to exist on the default branch.
Wait for human-reviewed installation before the next step. Administrators
separately verify the prerequisites; this commit changes no repository settings.

## 7. Later: manually dispatch and follow a specific run

**Say:** "This action spends compute and inference budget and may create a draft
PR. Confirm authorization, budget, and the installed revision before dispatch."

```sh
git fetch origin
gh workflow view react-wishlist-tests.lock.yml --repo "$REPO"
gh pr list --repo "$REPO" --state open --search 'in:title "[wishlist-tests]"'
gh workflow run react-wishlist-tests.lock.yml --repo "$REPO" --ref "$DEFAULT_BRANCH"
gh run list --repo "$REPO" --workflow react-wishlist-tests.lock.yml \
  --branch "$DEFAULT_BRANCH" --event workflow_dispatch --limit 10 \
  --json databaseId,createdAt,headSha,status,url
```

Select the run matching the dispatch time, branch, SHA, and actor in Actions (or
use the URL returned by `gh workflow run`). Do not blindly watch "the latest"
run: another presenter may have dispatched one. Enter its numeric ID:

```sh
read -r -p "Agentic workflow run ID: " AW_RUN_ID
gh run view "$AW_RUN_ID" --repo "$REPO" \
  --json databaseId,event,headBranch,headSha,status,url
gh run watch "$AW_RUN_ID" --repo "$REPO" --exit-status
gh run view "$AW_RUN_ID" --repo "$REPO" --log
```

Confirm the workflow and initiating actor in the run page before trusting its
outputs. Preserve this ID for diagnostics and PR provenance.

## 8. Review the draft and manually dispatch existing CI

**Say:** "A green agent run is not approval. We inspect its exact draft, assertions,
and evidence. The agent requests `create_pull_request` exactly once; only the
safe-output handler publishes the allowed patch."

Get the draft number from this run's summary, not an unrelated search result:

```sh
read -r -p "Draft PR number from this run: " PR_NUMBER
gh pr view "$PR_NUMBER" --repo "$REPO" \
  --json title,isDraft,headRefName,headRefOid,files,body,url
gh pr diff "$PR_NUMBER" --repo "$REPO"
```

Verify that it is a draft with the `[wishlist-tests]` prefix, only
`src/App.test.jsx` changed, existing assertions are preserved, and new tests
meaningfully cover missing behaviors. Check the actual baseline/final command
results, agent and skill paths, and jsdom limitations in its description.

**Say:** "PRs and pushes created with `GITHUB_TOKEN` do not automatically trigger
normal `pull_request` or `push` CI. This prevents recursive automation. We do not
create a PAT to get around it; a human manually dispatches existing `ci.yml`."

After reviewing the branch contents, run the existing CI on that exact PR branch:

```sh
PR_BRANCH="$(gh pr view "$PR_NUMBER" --repo "$REPO" --json headRefName --jq '.headRefName')"
PR_SHA="$(gh pr view "$PR_NUMBER" --repo "$REPO" --json headRefOid --jq '.headRefOid')"
gh workflow run ci.yml --repo "$REPO" --ref "$PR_BRANCH"
gh run list --repo "$REPO" --workflow ci.yml --branch "$PR_BRANCH" \
  --commit "$PR_SHA" --event workflow_dispatch --limit 10 \
  --json databaseId,createdAt,headSha,status,url
read -r -p "CI run ID matching this dispatch and PR SHA: " CI_RUN_ID
gh run view "$CI_RUN_ID" --repo "$REPO" --json headBranch,headSha,event,status,url
gh run watch "$CI_RUN_ID" --repo "$REPO" --exit-status
```

Ensure the head SHA still matches the reviewed draft; repeat review and CI if it
changes. CI runs tests/build and dependency auditing. A manual run is not a
`pull_request` event; confirm required-check association in the PR UI and follow
branch policy rather than assuming it satisfies every required check.

jsdom shims exercise observable state and accessible names, not native browser
focus trapping or visual layout. Those claims require separate real-browser
validation. Do not approve or merge as part of this demonstration.

## 9. Explain no-op and failure outcomes

**Say:** "No draft can be the correct result. Read the run summary, not just the
presence or absence of a PR."

| Outcome | Expected evidence and response |
| --- | --- |
| Covering open PR exists | `noop` message with its URL; no duplicate draft. |
| All target behavior already covered | `noop` explaining existing coverage; no artificial test churn. |
| Baseline test/build fails | Actual failing command and error; stop without a PR. |
| Final tests/build/diff check fails or an application defect appears | Report the blocker; no PR, no production fix, no dependency change. |
| Missing tool/data, inference denial, timeout, policy rejection, or blocked patch | Inspect logs and generated diagnostics; do not widen scope or grant credentials to force success. |
| Validated, meaningful missing coverage added | At most one draft containing only `src/App.test.jsx`. |

No-op messages normally appear in the run summary/artifacts. Runtime failures or
incomplete work may also produce compiler-managed diagnostic issues; the
disabled PR fallback does not suppress all diagnostic reporting.

## 10. Diagnose the selected run

**Show:** "These commands inspect a specific run. They do not rerun or dispatch it."

```sh
gh run view "$AW_RUN_ID" --repo "$REPO" --log-failed
gh aw audit "$AW_RUN_ID" --repo "$REPO" --output /tmp/react-wishlist-tests-audit
printf '%s\n' "$AW_RUN_ID" | gh aw logs react-wishlist-tests --repo "$REPO" \
  --stdin --artifacts all --output /tmp/react-wishlist-tests-logs
gh aw compile react-wishlist-tests --no-check-update
git diff --check
git status --short
```

Use compilation/schema errors for authoring problems; activation logs for stale
lock files and skill setup; agent logs for npm commands and inference access;
detection and safe-output logs for verdicts, file restrictions, and PR-creation
errors; and conclusion/usage artifacts for no-op, failure, and cost evidence.
An inference HTTP 403 may mean budget exhaustion rather than authentication:
inspect actual usage and policy evidence before changing anything.

For blocked PR creation, ask an authorized administrator to inspect the Actions
PR-creation policy and branch restrictions. For inference failures, have the
organization owner verify subscription, centralized billing policy, and budget.
Do not modify settings or introduce credentials from this script. Do not
repeatedly dispatch retries without diagnosing the failure and approving costs.
Treat logs/artifacts as potentially sensitive; review/redact before sharing and
never commit diagnostic downloads.

## References for the presenter

- [Agentic Workflows public-preview tutorial](https://docs.github.com/en/actions/tutorials/develop-agentic-workflows-in-github-actions)
- [gh-aw v0.92.0 release](https://github.com/github/gh-aw/releases/tag/v0.92.0)
- [Authentication and organization inference permission](https://github.github.com/gh-aw/reference/auth/)
- [Billing](https://github.github.com/gh-aw/reference/billing/) and [cost management](https://github.github.com/gh-aw/reference/cost-management/)
- [Safe-output boundaries](https://github.github.com/gh-aw/reference/safe-outputs/)
- [Actions token permissions and PR-creation setting](https://docs.github.com/en/actions/how-tos/security-for-github-actions/security-guides/automatic-token-authentication)
- [Triggering workflows and preventing recursive runs](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow)
- [Manual dispatch and the default-branch requirement](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/manually-run-a-workflow)
