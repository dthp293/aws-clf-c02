# Notes for Claude

- Follow `CONTRIBUTING.md` for commit messages, branch names, PR titles and PR descriptions. All of them are in English. PR titles use the commit format `<type>(<scope>): <summary>`, and the PR body uses `.github/pull_request_template.md`.
- Split commits by role (content → app → ui strings → en → ja → pwa → docs). Never one big commit.
- Run `npm run check` (ESLint + tests, same as CI) before committing.
- Only commit or push when the user asks. Branch from `main`; never commit to `main` directly.
- **README:** `README.md` is English and `README.vi.md` is Vietnamese; keep them in sync.
- **App code** is in `js/`: plain scripts that share one global scope, loaded in order by `index.html` (`core.js` first, `main.js` last). Each top-level name must be unique across files (`tests/app-structure.test.js` checks this).
- **Content** is in `content/` (questions and the mock-exam pool split by domain).
- **Content:** when question or lesson text changes, update `i18n/en` and `i18n/ja` for the same ids.
- **Service worker:** when a file loaded by the site is added or renamed, update `sw.js` `FILES` and `VERSION`.
