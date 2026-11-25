/* English UI strings. Same keys as i18n/vi/ui.js (missing keys fall back to Vietnamese).
 * Syntax: {name} = parameter; {n?one:many} = picks the singular/plural form by parameter n.
 * Some strings contain HTML (<b>, <a>…): keep the tags when translating. */
(function(){var I=window.CLF_I18N=window.CLF_I18N||{};var L=I.en=I.en||{};['q','course','lessons','glossary','services','domains','ui'].forEach(function(k){L[k]=L[k]||{};});
Object.assign(L.ui,{
  // Navigation
  'nav.home': 'Home', 'nav.review': 'Today', 'nav.practice': 'Practice', 'nav.exam': 'Mock exam',
  'nav.learn': 'Lessons', 'nav.glossary': 'Glossary', 'nav.settings': 'Settings',
  'boot.loading': 'Loading content…',

  // Task statements (Exam Guide)
  'task.1.1': 'Benefits of the AWS Cloud', 'task.1.2': 'Well-Architected Framework', 'task.1.3': 'Migration & AWS CAF', 'task.1.4': 'Cloud economics',
  'task.2.1': 'Shared responsibility', 'task.2.2': 'Security, governance, compliance', 'task.2.3': 'Access management (IAM)', 'task.2.4': 'Security services & resources',
  'task.3.1': 'Deploying & operating', 'task.3.2': 'Global infrastructure', 'task.3.3': 'Compute', 'task.3.4': 'Database', 'task.3.5': 'Network',
  'task.3.6': 'Storage', 'task.3.7': 'AI/ML & Analytics', 'task.3.8': 'Other service categories',
  'task.4.1': 'Pricing models', 'task.4.2': 'Billing & cost management', 'task.4.3': 'Support & resources',
  'task.colTopic': 'Topic', 'task.colAcc': 'Correct', 'task.attempts': '{n} {n?attempt:attempts}', 'task.practiceN': 'Practice {n}',

  // Course modules
  'mod.0': 'IT basics for beginners', 'mod.5': 'Hands-on with AWS (optional)', 'mod.short0': 'Basics', 'mod.short5': 'Hands-on',

  // SRS
  'ivl.10min': '10 min', 'ivl.days': '{n} {n?day:days}', 'ivl.months': '{n} mo',
  'grade.again': 'Again', 'grade.hard': 'Hard', 'grade.good': 'Good', 'grade.easy': 'Easy',

  // Review / practice session
  'session.done': '🎉 Finished “{title}”',
  'session.summary': 'Reviewed <b>{n}</b> {n?card:cards}.',
  'session.summaryQ': 'Reviewed <b>{n}</b> {n?card:cards} · Questions: <b>{right}</b> correct / <b>{wrong}</b> wrong.',
  'session.note': 'Cards you got wrong will come back soon. Cards you got right will be spaced further apart.',
  'btn.home': 'Back to home', 'btn.morePractice': 'Practice more',

  // Questions
  'q.showVi': 'Show Vietnamese', 'q.hideVi': 'Hide Vietnamese',
  'q.check': 'Check', 'q.keys': 'Keys: A–{last} select · Enter to check',
  'q.correct': '✅ <b>Correct!</b>', 'q.howWasIt': 'How did this one feel? (Enter = Good)',
  'q.wrong': '❌ <b>Not quite.</b>', 'q.again10': 'This question will come back in 10 minutes.', 'q.continue': 'Continue (Enter)',
  'tag.hard': '🔥 Advanced', 'tag.new': 'New', 'tag.choose': 'Choose {n}',

  // Vocabulary / service flashcards
  'flash.example': 'Example from a question:', 'flash.confuse': '⚠️ Often confused with:',
  'flash.vocab': 'Exam keyword', 'flash.service': 'AWS service · Domain {d}',
  'flash.askVocab': 'What does it mean? Which service does it usually point to?', 'flash.askService': 'What does this service do?',
  'flash.keys': 'Keys 1–4 to grade', 'flash.flip': 'Flip card (Space)',

  // Home
  'home.title': 'AWS Certified Cloud Practitioner exam prep',
  'home.weight': '{w}% of exam',
  'home.domProgress': 'Studied {seen}/{total} questions · Accuracy: <b>{acc}</b>',
  'home.due': 'cards due', 'home.new': 'new cards today', 'home.learned': 'cards studied', 'home.streak': 'day streak',
  'home.daysToExam': 'days until the exam',
  'home.lastExam': 'latest mock exam · readiness {ok}/3 (fresh exams)',
  'home.examInProgress': 'Exam in progress · resume',
  'home.todayN': 'You have <b>{n}</b> {n?card:cards} to review today.', 'home.todayDone': 'You are done for today 🎉',
  'home.startReview': 'Start review', 'home.viewSchedule': 'View schedule',
  'home.course': '📚 Course: <b>{done}/{total}</b> lessons', 'home.next': 'Next: {id}. {title}',
  'home.weakTasks': '🎯 Tasks that need the most work', 'home.practiceNow': 'Practice now', 'home.fullStats': 'See full statistics →',
  'home.byDomain': 'Progress by domain', 'home.howto': 'How to use this site',
  'home.howto1': '📅 <b>Today</b> mixes questions, exam keywords and service cards using <b>spaced repetition (SRS)</b>. Cards you get wrong come back after 10 minutes. Cards you get right are spaced out to 1, 4, 10... days.',
  'home.howto2': '🟨 <span class="kw" tabindex="0" data-k="most cost-effective">Highlighted</span> words in a question are important keywords. Hover over or tap one to see what it means and what it usually hints at.',
  'home.howto3': '🌐 Go to <a href="#/settings">Settings</a> to change the language (Tiếng Việt / English / 日本語). Questions and answer options are always shown in English, just like the real exam.',
  'home.howto4': 'Progress is saved only in this browser. Use Settings → Export data to back it up.',

  // Course
  'learn.continue': 'Continue', 'learn.start': 'Start learning', 'learn.review': 'Review',
  'learn.tabCourse': '📚 Course', 'learn.tabSummary': '📋 Quick summary',
  'learn.noCourse': 'No detailed lessons yet. See the <a href="#/learn/sum/1">Quick summary</a>.',
  'learn.modCount': '{done}/{total} lessons', 'learn.examWeight': '{w}% of the exam', 'learn.mins': '{n} min',
  'learn.labNote': 'Not required for the exam, but it helps things stick. Always follow the clean-up steps at the end of each lab to avoid unexpected charges.',
  'learn.practiceDomain': 'Practice Domain {d} questions',
  'learn.progress': 'Course progress: {done}/{total} lessons',
  'learn.continueLesson': 'Continue: lesson {id} →', 'learn.startLesson': 'Start learning: lesson {id} →',
  'learn.allDone': '🎉 All lessons done!',
  'learn.tip': 'Tip: go in order, starting from the Basics module. Each lesson ends with related practice questions. Finished lessons get a ✓.',
  'sum.note': 'Cheat sheets for reviewing after you have studied the detailed lessons.',
  'lesson.notFound': 'Lesson not found. <a href="#/learn">Back to the list</a>',
  'lesson.n': 'Lesson {id}', 'lesson.readMins': '⏱ {n} min read', 'lesson.nQuestions': '✍️ {n} practice {n?question:questions}', 'lesson.done': '✓ Done',
  'lesson.goals': '🎯 After this lesson you will', 'lesson.summary': '📌 Lesson summary', 'lesson.terms': '📖 Terms in this lesson',
  'lesson.unmark': '↩︎ Unmark as done', 'lesson.mark': '✓ Mark as done',
  'lesson.quiz': '✍️ Practice this lesson’s {n} {n?question:questions}', 'lesson.quizTitle': 'Lesson {id} practice',

  // Table columns
  'col.term': 'Term', 'col.meaning': 'Meaning', 'col.hint': 'Hint',
  'col.service': 'Service', 'col.function': 'What it does', 'col.confuse': 'Often confused with',

  // Today (review)
  'review.done': '🎉 All done for today!', 'review.nextDue': 'Next card due: <b>{when}</b>',
  'review.more10': 'Learn 10 more new cards', 'review.freePractice': 'Free practice',
  'review.remaining': '{n} {n?card:cards} not studied yet.', 'review.extraTitle': 'Extra new cards',

  // Practice
  'practice.all': 'All domains', 'practice.hard': 'Advanced questions', 'practice.multi': 'Multiple-response questions',
  'practice.weak': 'Questions you often miss', 'practice.read': 'Question-reading drill', 'practice.mixAll': 'Mix everything',
  'practice.empty': 'No questions in this set yet. <a href="#/practice">Go back</a>',
  'practice.intro': 'Practice questions by domain. Results still feed your SRS schedule.',
  'practice.domLine': '{total} questions · {acc} correct', 'practice.nQuestions': '{n} {n?question:questions}',
  'practice.weakLine': '{n} {n?question:questions} (accuracy below 70%)', 'practice.hardLine': '{n} questions close to real exam difficulty',
  'practice.multiLine': '{n} questions (Choose TWO/THREE)',
  'practice.readLine': 'Find the deciding keywords before you see the options · 15 long questions',
  'practice.byTask': 'By task statement',
  'practice.byTaskNote': 'Combines practice and mock exam results. Tasks with the lowest accuracy come first. Click to practice a single task.',

  // Question-reading drill
  'read.step1': '📖 Step 1/2: read the question and tap the deciding keywords',
  'read.hint': 'Tip: look for the main requirement (MOST cost-effective, LEAST operational overhead…), the constraints (cannot be interrupted, without managing servers…) and the subject (data, users, servers…).',
  'read.reveal': 'Show suggested keywords & options →',
  'read.goal': 'Exam target: about 80 seconds per question (90 minutes / 65 questions)',
  'read.time': '<b>⏱ {secs}s</b> to read the question.',
  'read.timeSlow': '<b>⏱ {secs}s</b> to read the question (a bit slow; practice skimming for keywords).',
  'read.yours': 'Words you picked: <i>{words}</i>', 'read.none': 'none',
  'read.keywords': '🔑 Suggested keywords:',

  // Glossary
  'gloss.search': 'Search terms or meanings...', 'gloss.keywords': 'Exam keywords ({n})', 'gloss.services': 'AWS services ({n})',

  // Settings
  'set.uiLang': '🌐 Language · Ngôn ngữ · 言語',
  'set.uiNote': 'Changing the language reloads the page. Your progress is kept and shared across all languages. In the English and 日本語 editions, questions and answer options are shown in English only (like the real exam); explanations, lessons and the interface use the language you choose.',
  'set.langMode': 'Language mode', 'set.display': 'Question display',
  'set.mode.bi': 'Bilingual', 'set.mode.bi.d': 'Always show English and Vietnamese (weeks 1–2)',
  'set.mode.en-first': 'English first', 'set.mode.en-first.d': 'Show English, click to see the translation (weeks 3–4)',
  'set.mode.en-only': 'English only', 'set.mode.en-only.d': 'Like the real exam; translation only after you answer (weeks 5–6)',
  'set.kw': 'Highlight keywords in questions',
  'set.schedule': 'Study schedule', 'set.newPerDay': 'New cards per day:', 'set.examDate': 'Exam date:',
  'set.data': 'Data',
  'set.dataNote': 'Progress is saved only in this browser. Export a file to back it up or move it to another device.',
  'set.export': 'Export data (.json)', 'set.import': 'Import data', 'set.reset': 'Erase all progress',
  'set.saved': 'Saved.', 'set.npdKeep': 'Kept {n} cards/day (an empty value is not valid).',
  'set.imported': '✅ Data imported.', 'set.badFile': '❌ Invalid file.',
  'set.resetConfirm': 'Erase all study progress (SRS cards, statistics, completed lessons, mock exam history, exam in progress)? Settings are kept. This cannot be undone.',
  'set.resetDone': 'Progress erased.',

  // Mock exam
  'exam.verdict.ok': '✅ Above the safe threshold (≥ 80%)',
  'exam.verdict.warn': '⚠️ Borderline: the real exam may be harder, keep studying',
  'exam.verdict.no': '❌ Not there yet: review your weak domains',
  'exam.notCounted': '(not counted toward readiness)',
  'exam.intro': 'The exam has <b>{n} questions</b> and a time limit of {mins}.', 'exam.mins': '{n} minutes',
  'exam.shortNote': '(The real exam has 65 questions in 90 minutes. The bank currently has {n} questions, so the time is scaled proportionally.)',
  'exam.rule1': 'Like the real exam: <b>English only</b>, no keyword highlighting, no answers shown along the way.',
  'exam.rule2': 'Questions come first from a <b>separate pool of {pool} exam-only questions</b>. They <b>never appear</b> in Practice or SRS review, so your result reflects real ability rather than memory. You have seen {seen}/{pool} of them in previous mock exams.',
  'exam.freshLeft': 'The pool still has enough unseen questions for <b>{n} completely fresh {n?exam:exams}</b>.',
  'exam.noFresh': '<b>No completely fresh exams left</b>: upcoming exams will repeat questions you have seen, so your score may be higher than your real ability.',
  'exam.saveFresh': 'Each exam you finish “uses up” those fresh questions, so <b>save fresh exams for the final stretch</b> (1–2 weeks before exam day) to measure your readiness; early on, use Practice and Today instead.',
  'exam.rule4': 'You can <b>flag</b> questions for review and move back and forth between questions. The exam is submitted automatically when time runs out.',
  'exam.rule5': 'Your result is the <b>percentage of correct answers</b>. The real exam uses a scaled score (pass at 700/1000) and may be harder, so aim for <b>≥ 80%</b>.',
  'exam.esl': 'Apply <b>ESL +30 minutes</b> (if you request this accommodation when scheduling your exam)',
  'exam.start': 'Start exam', 'exam.history': 'Mock exam history',
  'exam.colTime': 'Date', 'exam.colPct': '% correct', 'exam.colCorrect': 'Correct', 'exam.colFresh': 'First-time questions', 'exam.colUsed': 'Time used',
  'exam.freshNote': '“First-time questions”: how many questions you saw for the first time in that exam. If this is low, your score may be higher than your real ability because you remembered the answers.',
  'exam.none': 'No exams taken yet.',
  'exam.invalid': 'The exam in progress no longer has any valid questions (the question bank was updated), so it was cancelled. <a href="#/exam">Start a new exam</a>',
  'exam.qOf': 'Question {i}/{n}', 'exam.flag': '🏳️ Flag', 'exam.unflag': '🚩 Unflag',
  'exam.prev': '← Previous', 'exam.next': 'Next →',
  'exam.keys': 'Keys: A–{last} select · ←/→ move · M flag',
  'exam.navSummary': 'Question map · Fully answered {answered}/{n} · Flagged {flags}',
  'exam.navPartial': ' · Incomplete selection {n} (dashed border)',
  'exam.submit': 'Submit exam', 'exam.quit': 'Cancel exam',
  'exam.cUnanswered': '{n} {n?question is:questions are} unanswered. ', 'exam.cPartial': '{n} multiple-response {n?question does:questions do} not have enough options selected. ',
  'exam.cFlagged': '{n} {n?question is:questions are} flagged. ', 'exam.cSubmit': 'Submit the exam?',
  'exam.cQuit': 'Cancel this exam? The result will not be saved.',
  'exam.notFound': 'Exam not found. <a href="#/exam">Go back</a>',
  'ready.yes': '🎯 Ready for the exam', 'ready.title': '🎯 Readiness',
  'ready.yesNote': 'You scored ≥ 80% on your 3 most recent fresh exams. Try the Official Practice Question Set on AWS Skill Builder before you book the exam.',
  'ready.goal': 'Goal: score ≥ 80% on <b>3 fresh exams in a row</b> (currently {ok} of your last {n} passed).',
  'ready.rule': 'Only exams where <b>at least half of the questions are first-time questions</b> count; exams that repeat many old questions measure memory more than ability.',
  'ready.skipped': '{n} {n?exam:exams} in your history {n?is:are} not counted for that reason.',

  // Mock exam result
  'res.qN': 'Question {i}', 'res.right': '✅ Correct', 'res.wrong': '❌ Wrong', 'res.blank': '⚪ Unanswered', 'res.none': 'No questions.',
  'res.auto': ' · auto-submitted when time ran out', 'res.pctCorrect': '% correct',
  'res.line': '<b>{c}/{n}</b> correct · Time used {used}', 'res.fresh': ' · First-time questions: <b>{f}/{n}</b>',
  'res.scoreNote': 'Rough conversion to the 1000-point scale ≈ {score}, for reference only. The real exam uses a scaled score (pass at {pass}) and may be harder, so aim for ≥ 80% on 3 exams in a row.',
  'res.seenWarn': '⚠️ This exam had many questions you had already seen, so the result may be higher than your real ability and does not count toward readiness.',
  'res.retake': 'Take another exam', 'res.drill': 'Review {n} missed {n?question:questions} now (practice questions)', 'res.drillTitle': 'Missed questions from the mock exam',
  'res.byDomain': 'Results by domain', 'res.domainNote': 'For any domain below 70%, go back over that domain’s lessons.',
  'res.weakTasks': 'Tasks to review', 'res.taskLine': '{c}/{n} correct ({p}%)', 'res.practiceTask': 'Practice this task',
  'res.review': 'Review your answers',
  'res.fAll': 'All ({n})', 'res.fWrong': 'Wrong / unanswered ({n})', 'res.fFlag': 'Flagged ({n})',
  'res.showVi': 'Show Vietnamese',

  // PWA
  'pwa.newContent': '🔄 New content available', 'pwa.update': 'Update',
  'pwa.installed': '✅ You are using the installed app. It works offline.',
  'pwa.installPrompt': 'Install this website as an app to open it from your home screen and use it offline.',
  'pwa.installBtn': '📲 Install app',
  'pwa.ios': 'On iPhone/iPad: open this page in <b>Safari</b> → tap the <b>Share</b> button (the square with an up arrow) → choose <b>“Add to Home Screen”</b>.',
  'pwa.android': 'On Android: open in <b>Chrome</b> → menu <b>⋮</b> → <b>“Install app”</b> or <b>“Add to Home screen”</b>. On a computer: click the install icon in the address bar.',
  'pwa.title': '📱 App & offline',
  'pwa.cached': '✓ Content is saved for offline use.',
  'pwa.httpsOnly': 'Offline mode only works when the site is opened over HTTPS (for example GitHub Pages).',
  'pwa.autoUpdate': 'New content downloads automatically when you are online.',
  'pwa.refresh': '🔄 Reload the latest content',
  'pwa.offline': 'You are offline. Connect to the internet and try again.',

  // Recovery screen
  'rec.title': '⚠️ The app hit an error while rendering',
  'rec.p1': 'The progress data in this browser may be corrupted (for example after importing a file in the wrong format).',
  'rec.detail': 'Details:', 'rec.retry': 'Try the home page again', 'rec.export': 'Download a copy of the current data',
  'rec.reset': 'Erase data and start over', 'rec.confirm': 'Erase all progress data in this browser?'
});})();
