# Notes for Claude

- Follow `CONTRIBUTING.md` for commit messages, branch names, PR titles and PR descriptions. All of them are in English, and the PR body uses `.github/pull_request_template.md`.
- Split commits by role (content → app → ui strings → en → ja → pwa → docs). Never one big commit.
- Run `npm run check` (ESLint + tests, same as CI) before committing.
- Only commit or push when the user asks. Branch from `main`; never commit to `main` directly.
- **Content:** when question or lesson text changes, update `i18n/en` and `i18n/ja` for the same ids.
- **Service worker:** when a file loaded by the site is added or renamed, update `sw.js` `FILES` and `VERSION`.
