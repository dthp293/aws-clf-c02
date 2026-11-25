# CLF-C02 Study: AWS Certified Cloud Practitioner prep

**English** · [Tiếng Việt](README.vi.md)

A self-study website for the **AWS Certified Cloud Practitioner (CLF-C02)** exam, written for complete beginners. It started as a Vietnamese course and now has **Vietnamese, English and Japanese** editions.

👉 **Open the site:** https://dthp293.github.io/aws-clf-c02/

- **39 lessons** (about 57,000 words): IT basics, the 4 exam domains, and 5 optional hands-on labs.
- **357 practice questions**, plus a **separate pool of 195 mock-exam questions**: enough for 3 completely fresh 65-question exams that never show up in practice.
- **Spaced repetition (SRS)** review, 65-question / 90-minute mock exams, and stats per task statement.
- Works **offline** on your phone (PWA). No account needed; your progress stays on your device.
- **Interface languages:** Tiếng Việt / English / 日本語, chosen in Settings.

> The content is written from AWS's public CLF-C02 Exam Guide. It does not copy real exam questions or the Official Practice Question Set.

---

## 1. Getting started

1. Open the site, or install it on your phone (see [📱 Install on your phone](#-install-on-your-phone-and-use-offline)).
2. Go to **Settings**:
   - **Language:** Tiếng Việt, English or 日本語.
   - **Exam date:** enter it if you have booked the exam. The app uses it to bring every card back before the exam and to suggest a study pace.
   - **New cards per day:** 15 by default.
3. Go back to the **home page**. If your current new-card limit is too low to learn everything before the exam date, the home page shows the daily number you need; press **"Set N a day"** to use it.

---

## 2. Suggested study plan (about 6 weeks, 45–60 minutes a day)

| Week | What to study |
|---|---|
| 1 | **IT basics** (lessons 0-1 → 0-4) + **Domain 1** (1-1 → 1-5) |
| 2 | **Domain 2: Security** (2-1 → 2-7) |
| 3 | **Domain 3**, part 1 (3-1 → 3-7) |
| 4 | **Domain 3**, part 2 (3-8 → 3-14) + **Domain 4** (4-1 → 4-4) |
| 5 | Review weak tasks; practice **Questions you often miss**, **Advanced** and **Multiple-response** questions; try a few labs (optional) |
| 6 | Take 2–3 fresh **mock exams**, check the **🎯 Readiness** card and review the tasks it points to; do the Official Practice Question Set on AWS Skill Builder |

**Daily habit:**

1. Open **Today** and finish the session (about 10–15 minutes).
2. Study **one new lesson** under **Lessons**, then press **"✍️ Practice this lesson’s N questions"** at the end of it.
3. Press **"✓ Mark as done"**. The app tracks your progress and brings that lesson's questions into your new cards sooner.
4. If you have time left, open **Practice → Questions you often miss**, or **Free practice**.

**When are you ready?** When the **🎯 Readiness** card on the Mock exam page turns into **"🎯 Ready for the exam"**, and you also do well on AWS's free official question set on Skill Builder. See [📝 Mock exam](#-mock-exam) for how to read the card.

---

## 3. How to use it

### 🏠 Home page

- **Cards due / new cards today:** what is in today's **Today** session. Press **Start review** to begin.
- **Cards studied**, **day streak**, and **days until the exam** (if you entered an exam date).
- **Latest mock exam:** the score of your last exam and your **estimated readiness**. Press it to see the result.
- **Pace advice:** only shown when you have an exam date and your new-card limit is too low. In the last 7 days before the exam it no longer suggests new cards.
- **🎯 Tasks that need the most work:** the 3 tasks with the lowest recent accuracy, each with **Practice now**.
- **Progress by domain:** questions studied and accuracy (from the last 3 answers to each question).

### 📚 Lessons

- **Course:** study in order. Each lesson has:
  - learning goals
  - explanations from first principles, everyday examples and a running story about the *BanhNgon Bakery*
  - **🎯 What the exam asks** and **⚠️ Common trap** boxes
  - a summary and a term list
- **📋 Quick summary:** short cheat sheets to review after the full lessons.
- **🛠️ Hands-on labs (optional):** 5 labs on a real AWS account. **Always follow the clean-up steps at the end of each lab** to avoid charges, and read the Free Tier warning in lab 5-1.

### 📅 Today (SRS)

Each session mixes questions, exam vocabulary and AWS service cards: **due** cards first (the ones you forget most come first), then **new** cards up to your daily limit. When you are done, press **"Learn 10 more new cards"** or switch to **Free practice**.

**Answering a card:**

- **Question:** choose your answer (keys A–F) and press **Check** (Enter).
  - **Right:** the card is scheduled **Good** right away, so leaving now still counts. If it felt hard or too easy, press **Hard** or **Easy**; each button shows when you will see the card again. Enter = **Good** and moves on.
  - **Wrong:** read the explanation for each option, then press **Continue** (Enter). The card comes back after **10 minutes**; if the session ends first, it waits for the next session.
- **Vocabulary / service card:** recall the meaning, press **Flip card** (Space), then grade yourself **Again / Hard / Good / Easy** (keys 1–4).

**How the schedule works** (an SM-2 variant):

- **Right answers:** the gap grows each time: 1 → 4 → 10 → 26… days.
- **Mistakes:**
  - mistakes while a card is still new, or again in the same session, aren't penalized;
  - a forgotten card keeps about 25% of its old interval once you relearn it;
  - a late review that you still remember is spaced from the days you actually remembered it.
- **New cards:**
  - questions come before vocabulary and service cards;
  - questions are split by the exam's domain weights (more from domain 3 than domain 4);
  - weak tasks and questions from finished lessons come first;
  - two questions of the same task are never next to each other.
- **With an exam date:** every card is due again within the **last 7 days** before the exam, spread across those days rather than piled on one. Only the due date moves; the card's interval is not shortened.
- **A learned card never appears before it is due**, in any mode.
- **Daily new-card limit:** only new cards learned in **Today** count toward it. New questions answered in Practice, lesson quizzes or Free practice don't use it up.
- **Study day:** it rolls over at **4 a.m.** (like Anki), so late-night reviews after midnight count for the previous day.

#### 🔁 Free practice (its own schedule)

When you've cleared your reviews and want more, open **Today → Free practice** and choose **Domain 1–4** or **Mix everything**.

- **Separate schedule:** same grading, but fully separate from the main schedule. It doesn't change what's due in Today, doesn't use the daily new-card limit, and doesn't change the numbers on the home page.
- **When cards appear:** a card you have never practiced here is available right away, even if it isn't due in the main schedule. Once practiced here, it only comes back when it is due in the free-practice schedule.
- **What's included:** each **Domain** has that domain's questions and service cards; **Mix everything** adds the **exam vocabulary**. Mock-exam pool questions never appear.
- **Stats:** your right/wrong answers still count toward the domain and task stats.

### ✍️ Practice

- **Shared schedule:** the tiles for each **domain**, **mix everything**, **🔥 advanced questions**, **☑️ multiple-response questions** (Choose TWO/THREE), and the lesson quizzes, use the **same main schedule** as Today.
  - They only show **new** or **due** questions.
  - Each tile shows **questions available now / total**.
  - When nothing is left, the app says when the next question is due and points you to Free practice.
- **🎯 Questions you often miss:**
  - **What counts:** questions you got wrong last time, or right fewer than 2 of the last 3 times. A retry right after a mistake, while you still remember the answer, doesn't count.
  - **Schedule:** this tile uses the **Free practice schedule**, so you can practice them right away instead of waiting until they are due.
- **📖 Question-reading drill** (Vietnamese and English editions):
  - You see only the English question and tap the words that decide the answer (e.g. *MOST cost-effective*, *cannot be interrupted*), against a timer.
  - The app then shows the key terms and only then the options.
  - Aim for about **80 seconds per question** in the exam.
- **Task-statement table (1.1 → 4.3):** combines practice and mock-exam results using the last 3 answers to each question, lists the weakest tasks first, and has a practice button for each task.

### 📝 Mock exam

**Before the exam**

- **Format:** 65 questions in 90 minutes, split **16 / 19 / 22 / 8** across the 4 domains. The tasks within each domain follow the same mix too. Turn on **ESL +30 minutes** if you requested that accommodation when booking the exam.
- **Question pool:** questions come from a **separate pool of 195** that **never appears in practice**, so your score reflects what you know, not what you remember.
- **Fresh exams:** the pool has enough for **3 completely fresh exams**, and the Mock exam page shows how many are left. Each exam uses up its new questions, so **save fresh exams for the last 1–2 weeks** to measure readiness.

**During the exam**

- **Navigation:** move freely between questions and **flag** the ones you want to review.
  - **Shortcuts:** A–F to choose, ←/→ to move, **M** to flag.
  - A multiple-response question with too few choices gets a dashed border, and you are reminded when you submit.
- **Time runs out while you are on the page:** the exam is submitted, as in the real exam.
- **Abandoned** (closed tab, sleeping computer… when time ran out):
  - submitted if at least half of the questions are fully answered;
  - otherwise discarded. Questions you never opened stay new.
- **Cancel exam:** the score is not saved, but every question you saw still counts toward readiness, and incomplete ones count as wrong. So you can't answer only the easy ones and cancel.

**After the exam**

- **Results:**
  - **% correct** and a breakdown by domain;
  - **tasks to review**;
  - how many questions were new to you;
  - a question-by-question review with explanations.
- **Practice the tasks you missed:** opens up to 20 practice questions, split by how many you missed in each task.

**Reading the 🎯 Readiness card**

- **"Estimated X–Y%":** the score you are likely to get on the real exam (an 80% interval). The more data, the narrower it gets.
- **What it uses:** only your **first** answer to each pool question, so redoing questions you have seen doesn't change the estimate. Recent results weigh more than old ones, and the card shows the date of the latest data.
- **Domain table:** the estimate and range for each domain, with how many answers it is based on.
- **Tasks to review:** press one to practice it.
- **Ready when:**
  - there is enough data: about 80 recent answers, at least 8 in every domain;
  - the lower bound is ≥ 75% overall and ≥ 65% in every domain.

  This usually takes 2–3 exams. The last line of the card says what is still missing.
- **Pass mark:** the real exam uses a scaled score (pass at 700/1000) that can't be converted directly from % correct, so aim for 80% to leave a safety margin.

### 🌐 Interface language (Tiếng Việt / English / 日本語)

- **How to switch:** choose it under **Settings → 🌐 Language**. The page reloads; your progress is kept and shared across languages.
- **English edition:** questions and options stay in the original English, as in the real exam.
- **日本語 edition:** questions and options are also in Japanese, using AWS's official Japanese terminology, because CLF-C02 is offered in Japanese. The English reading drill is not available in this edition.
- **What else is translated:** the interface, the per-option explanations, lessons, quick summaries, vocabulary, service cards and keyword tooltips all use the chosen language.
- **Vietnamese only:** the Vietnamese question translation and the bilingual reading modes.
- **Fallback:** anything not yet translated, or not loaded (for example offline before the language was ever opened), falls back to Vietnamese.

### 🔤 Exam vocabulary

- **Highlighted keywords** in questions: hover or tap one to see its meaning and the services it usually points to.
- **Glossary** page: exam keywords and 100+ AWS services, each with a "often confused with" note.

### 📱 Install on your phone and use offline

- **iPhone/iPad:** open the link in **Safari**, then **Share → "Add to Home Screen"**.
- **Android:** open it in **Chrome**, then **⋮ → "Install app"**, or use **Settings → 📲 Install app** inside the site.
- **Offline use:** open the app once while online so it can save the content; after that it works without a connection. The English and Japanese files are only downloaded if you choose that language.
- **Updates:** when new content is available, a **"🔄 New content available · Update"** bar appears.

### 💾 Back up your progress (important)

Progress is stored **only in the browser/device you use** and does not sync between devices.

- **Back up:** use **Settings → Export data (.json)**.
- **Move to another device:** use **Import data** there to continue.
- **Back up regularly.** On iPhone, the system may delete a site's data if the app isn't opened for a long time.
- **Several tabs on the same device** stay in sync: when one tab saves, the others reload your progress (a session in progress in another tab starts again from the new data).

---

## 4. CLF-C02 exam tips

- **65 questions:** 50 scored + 15 unscored trial questions, and you can't tell which is which. **Wrong answers aren't penalized, so never leave a question blank.**
- **Read the last sentence first** (*Which service…? / Which is the MOST cost-effective…?*). Then look for the **constraints** (*without managing servers, cannot be interrupted, data must stay in the country…*).
- **Choose TWO/THREE:** you must pick all the correct options to score.
- **Eliminate first:** remove the clearly wrong options, then compare the last two against the question's keywords.
- **Commonly confused pairs:**
  - CloudTrail / CloudWatch / Config
  - Shield / WAF / Firewall Manager
  - GuardDuty / Inspector / Macie
  - Multi-AZ / read replica
  - SQS / SNS / EventBridge
  - Cost Explorer / Budgets / Pricing Calculator

---

## 5. For maintainers

> Commit messages, branch names, PR titles and PR descriptions are written in English and follow [CONTRIBUTING.md](CONTRIBUTING.md). The PR description template is `.github/pull_request_template.md`. To use the commit template, run `git config commit.template .gitmessage` once.

### Run locally

The site is static and has no build step:

```bash
python3 -m http.server 8766
```

Then open http://localhost:8766. The service worker (offline mode) only runs on `localhost` or HTTPS.

Before opening a PR, run the same checks as CI. Run `npm install` once, then:

```bash
npm run check
```

That runs ESLint and every test in `tests/`. npm is only used for lint and tests.

### Folder layout

| Path | Contents |
|---|---|
| `index.html`, `style.css` | Page shell and styles |
| `js/*.js` | App code, as plain scripts that share one global scope, loaded in order by `index.html`: `core` (state, tagging) → `i18n` → `util` → `srs` → `keywords` → `session` → `home` → `review` → `practice` → `learn` → `settings` → `exam` → `pwa` → `main` (router, boot). Progress is in `localStorage`; `cards` is the main SRS schedule and `free` is the Free practice schedule. |
| `content/domains.js` | Exam domains. Loaded first; creates `window.CLF` |
| `content/questions/d1.js` … `d4.js` | Practice questions per domain |
| `content/exam/d1.js` … `d4.js` | **Separate mock-exam pool** per domain, never linked to lessons or practice |
| `content/lessons/course-a.js` … `course-f.js` | Lessons: basics + D1, D2, D3 (2 files), D4, labs. A lesson's practice questions come from its `qids` plus the lesson in `content/tags.js` |
| `content/glossary.js`, `content/services.js`, `content/quick-summary.js` | Exam vocabulary, AWS service cards, quick summary cheat sheets |
| `content/tags.js` | Maps each question to its **task statement** (1.1 → 4.3) and lesson |
| `i18n/vi/ui.js` | Vietnamese UI strings (always loaded, used as fallback) |
| `i18n/en/`, `i18n/ja/` | English / Japanese editions. Each has `ui.js` (UI), `data.js` (domains, vocabulary, services, quick summaries), `q-1.js` … `q-8.js` (explanations; the ja edition also has the question text and options) and `course-a.js` … `course-f.js` (lessons). Details: `i18n/FILES.txt` |
| `manifest.webmanifest`, `sw.js`, `icons/` | PWA and offline mode |
| `tests/`, `eslint.config.js`, `package.json` | Automated checks (`npm run check`), run by GitHub Actions on every PR (`.github/workflows/ci.yml`). Not used by the site. |

### Adding a question

Each question is an object:

```js
{ id: "d3-200", d: 3, en: "English stem…", vi: "Vietnamese translation…",
  opts: [["Option EN", "Option VI"], …], ans: [0],
  exp: "Overall explanation (Vietnamese)", why: ["Reason for each option", …] }
```

- **`ans`:** the indexes of the correct options, from 0. Multiple-answer questions must say "(Choose TWO.)" or "(Choose THREE.)" in `en`.
- **`why`:** must have as many entries as `opts`, in the same order. Each entry gives a reason, not just "Wrong.".
- **Where:** add it to `content/questions/d<N>.js` for its domain, or `content/exam/d<N>.js` for the mock-exam pool (id starting with `x`).
- **Tags:** add the question to `content/tags.js`, e.g. `"d3-200": ["3.6", "3-6"]` (task statement, lesson). Mock-exam pool questions (ids starting with `x`) use `null` as the lesson.
- **New file:** add a `<script>` tag to `index.html` (content before `js/`), add the file to `FILES` in `sw.js`, and bump `VERSION`. Any change to a file the site loads also needs a `VERSION` bump so installed apps update.
- **Translations:**
  - Add `"d3-200": { exp: "…", why: ["…", …] }` to any `i18n/<lang>/q-*.js` file; the `ja` entry also needs `q` and `opts`.
  - Until then, the English/Japanese editions show the Vietnamese explanation.
  - `npm test` lists any question that is still missing a translation.

### Content accuracy

- **Fact register:** `tests/facts.json` records what was checked against official AWS pages: every sentence with a concrete value (number, limit, price, date, plan name or feature) and every answer key a blind solver questioned. Each entry has its source URLs and says how it was checked: `checks: 2` means a second checker confirmed it with a verbatim quote, `checks: 1` means one checker against the topic pages, and `indirect` means only indirect official support was found. All other statements (concepts, comparisons, service-to-use-case mappings) were screened in full by four reviewers; only the few they flagged or were unsure about were verified online (`concept:` entries). `tests/facts.test.js` fails if an outdated value listed under `deny` (for example Lambda's old 15-minute limit) appears again.
- **Consistency test:** `tests/content-vi.test.js` checks the Vietnamese content: answer keys, the "(Choose TWO.)" markers, the per-option reasons and the tags.
- **Weekly watch:** a scheduled GitHub Action re-opens the AWS source pages and checks that the quoted text is still there. When AWS changes a page, it opens a `facts-watch` issue listing the facts to re-check.
- **How to re-check:** see CONTRIBUTING.md, "Checking content accuracy".

### Translations (i18n)

- **Loading:**
  - On load, the app (`js/main.js`) reads `settings.ui` (`vi` | `en` | `ja`).
  - For `en`/`ja`, it injects the 16 `<script>` tags of `i18n/<lang>/` and then renders. The list is `I18N_FILES` in `js/i18n.js`, matching `i18n/FILES.txt`.
  - A file that fails to load is skipped and Vietnamese is used instead.
- Each file writes into `window.CLF_I18N[lang]` = `{ ui, q, course, lessons, glossary, services, domains }`.
- **UI strings** use `t('key', { params })`, which looks up the chosen language, then Vietnamese, then returns the key itself. `{name}` is a parameter and `{n?one:many}` picks singular/plural. **New strings need the same key in all three** `i18n/vi|en|ja/ui.js` files.
- **Caching:** changing files in `i18n/` also needs a `VERSION` bump in `sw.js`. The `i18n/en` and `i18n/ja` files aren't in `FILES`; the service worker caches them only when a user picks that language.

### Deploy

The repo is published with **GitHub Pages** from the `main` branch root. Merging to `main` updates the site within about a minute.

---

## Notes

- This is personal study material, **not official AWS documentation**. AWS often renames services, Support plans and Free Tier rules, so check against the [CLF-C02 Exam Guide](https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02.html) and AWS's official pages.
- No material guarantees a pass. Combine this site with **AWS Skill Builder** (Cloud Practitioner Essentials, Official Practice Question Set) and hands-on practice in an AWS account.
