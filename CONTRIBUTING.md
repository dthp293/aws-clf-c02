# Contributing conventions

These rules cover commit messages, branch names, pull request titles and pull request descriptions. Write all of them in **English**, even though the site started in Vietnamese.

The README exists in two languages: `README.md` (English, shown on GitHub) and `README.vi.md` (Vietnamese). When one changes, update the other in the same PR.

## 1. Commit messages

Format, based on [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <summary>

<body: optional, explains why>

<footer: optional>
```

### Type

| Type | Use for |
|---|---|
| `feat` | New behavior in the app (`js/`, `index.html`, `style.css`) |
| `fix` | Bug fix in the app |
| `content` | Vietnamese source content under `content/`: questions, lessons, glossary, services, exam pool, tags |
| `i18n` | Translations under `i18n/` (UI strings or en/ja content) |
| `docs` | README (`README.md` + `README.vi.md`), CONTRIBUTING, `i18n/FILES.txt`, code comments only |
| `chore` | Service worker, manifest, icons, repo config, templates |
| `test` | Test or validation scripts |
| `refactor` | Code change with no behavior change |
| `style` | CSS or formatting only, no behavior change |

### Scope

Optional but recommended. Use the area that changed:

- **App:** `app`, `srs`, `exam`, `practice`, `lessons`, `settings`, `i18n`
- **Content:** `questions`, `lessons`, `exam`, `meta`, `glossary`
- **Translations:** `ui`, `en`, `ja`
- **Other:** `pwa`, `repo`

### Summary

- Imperative mood: "add", "fix", "use", not "added" / "fixes".
- Lowercase first word, no trailing period, at most 72 characters including the prefix.
- Say what changes for the learner or the content, not which file was edited.

### Body and footer

- **Body:** explain *why* when it isn't obvious, for example an AWS fact that changed (with the source URL) or a bug's cause. Wrap at 72 characters.
- **Breaking changes:** a change that breaks saved progress (the localStorage format) needs a footer `BREAKING CHANGE: <what happens to existing data>`.
- **AI-assisted commits** end with a `Co-Authored-By:` line.

### One commit per role

Do not put everything in one commit. Split a change by role, in this order:

1. Vietnamese source content (`content`)
2. App code (`feat` / `fix`)
3. UI strings (`i18n(ui)`)
4. Translations per language (`i18n(en)`, `i18n(ja)`)
5. Service worker (`chore(pwa)`)
6. Docs (`docs`)

Each commit should leave the site working.

### Examples

```
content(questions): use current Well-Architected design principle names
feat(srs): never show learned cards before due
fix(app): keep current language when importing an old backup
i18n(ja): translate questions using official AWS Japanese terms
chore(pwa): bump service worker to v7
docs: describe language selection in README
```

To get this template in your editor when running `git commit`, run once:

```bash
git config commit.template .gitmessage
```

## 2. Branch names

`<kind>/<short-kebab-description>`, where kind is one of `feature`, `fix`, `content`, `i18n`, `refactor`, `docs`, `chore`.

Examples: `feature/srs-scheduling`, `feature/i18n`, `content/update-support-plans`, `chore/conventions`.

Never commit directly to `main`. Every change goes through a pull request.

## 3. Pull request titles

Same format as a commit message, so the PR list can be sorted by area at a glance:

```
<type>(<scope>): <summary>
```

- **Type and scope:** use the same lists as for commits (section 1). Pick the type of the PR's main change, using this priority: `feat` > `fix` > `content` > `i18n` > `refactor` > `test` > `chore` > `docs` > `style`. The scope names the area most affected, for example `srs`, `i18n`, `questions`, `ci`.
- **Summary:** English, imperative, lowercase first word, no trailing period. The whole title is at most 72 characters.
- **Two independent changes:** join them with `;` rather than "and".

Examples:

- `feat(srs): never show learned cards early; add free-practice schedule`
- `feat(i18n): add English and Japanese editions with official AWS terms`
- `chore(repo): add contribution conventions; run ESLint and tests in CI`
- `content(questions): update support plans to the 2026 lineup`
- `fix(exam): keep the timer running after switching tabs`

## 4. Pull request descriptions

Use the template in `.github/pull_request_template.md`; GitHub fills it in automatically. Sections:

1. **Summary:** 1–3 sentences on what changes for the learner and why.
2. **Changes:** grouped by area (App, Content, Translations, PWA, Docs). Name the concrete behavior, not every file.
3. **Sources:** official AWS URLs for any changed exam fact. Leave it out if no facts changed.
4. **Test plan:** `npm run check` plus a checklist of what was actually run, with results. Anything not verified stays unchecked with a short reason. Never check a box for something that wasn't run.
5. **Notes:** follow-ups or anything the reviewer should know. Optional.

AI-generated descriptions end with the line `🤖 Generated with [Claude Code](https://claude.com/claude-code)`.

## 5. Checks (CI)

Every pull request and every push to `main` runs `.github/workflows/ci.yml`. Run the same locally before opening a PR:

```bash
npm install
npm run check
```

- `npm run lint`: ESLint (recommended rules only, no style rules) on `js/`, `sw.js` and `tests/`. Content data files (`content/`, `i18n/`) are not linted.
- `npm test` runs `tests/run.js`, which covers:
  - `node --check` on every JS file
  - i18n keys and placeholders identical in vi/en/ja
  - en/ja translation coverage and shape against the Vietnamese source
  - render of every screen in en/ja
  - SRS rules

There is no formatter. Keep the existing style of the file you edit.

## 6. Release checklist (in the PR)

- **New or renamed file loaded by the site:** add it to `FILES` in `sw.js` and bump `VERSION`. en/ja files under `i18n/` are cached on demand and are not listed.
- **Changed question or lesson text:** update `i18n/en` and `i18n/ja` for the same ids.
- **New UI string:** add the key to all three `i18n/*/ui.js` files.
