/* 日本語 UI 文字列。キーは i18n/en/ui.js と同じ。
 * {name} = パラメータ。日本語には単複の区別がないため {n?one:many} 形式は使わず {n} のみ。
 * 一部の文字列は HTML (<b>, <a>…) を含む。タグはそのまま保持。 */
(function(){var I=window.CLF_I18N=window.CLF_I18N||{};var L=I.ja=I.ja||{};['q','course','lessons','glossary','services','domains','ui'].forEach(function(k){L[k]=L[k]||{};});
Object.assign(L.ui,{
  // ナビゲーション
  'nav.home': 'ホーム', 'nav.review': '今日の学習', 'nav.practice': '問題演習', 'nav.exam': '模擬試験',
  'nav.learn': 'レッスン', 'nav.glossary': '用語集', 'nav.settings': '設定',
  'boot.loading': 'コンテンツを読み込み中…',

  // タスクステートメント (試験ガイド)
  'task.1.1': 'AWS クラウドの利点', 'task.1.2': 'AWS クラウドの設計原則', 'task.1.3': 'AWS クラウドへの移行の利点と戦略', 'task.1.4': 'クラウドエコノミクスのコンセプト',
  'task.2.1': 'AWS の責任共有モデル', 'task.2.2': 'セキュリティ、ガバナンス、コンプライアンスのコンセプト', 'task.2.3': 'AWS アクセス管理機能', 'task.2.4': 'セキュリティのためのコンポーネントとリソース',
  'task.3.1': 'AWS クラウドでのデプロイと運用の方法', 'task.3.2': 'AWS のグローバルインフラストラクチャ', 'task.3.3': 'AWS のコンピューティングサービス', 'task.3.4': 'AWS データベースサービス', 'task.3.5': 'AWS のネットワークサービス',
  'task.3.6': 'AWS ストレージサービス', 'task.3.7': 'AWS の AI/ML サービスと分析サービス', 'task.3.8': 'その他の AWS のサービスカテゴリ',
  'task.4.1': 'AWS 料金モデル', 'task.4.2': '請求、予算、コスト管理のためのリソース', 'task.4.3': 'AWS の技術リソースと AWS サポートオプション',
  'task.colTopic': 'トピック', 'task.colAcc': '正答率', 'task.attempts': '{n} 回解答', 'task.practiceN': '{n} 問を演習',

  // コースのモジュール
  'mod.0': '初心者のための IT 基礎', 'mod.5': 'AWS ハンズオン（任意）', 'mod.short0': '基礎', 'mod.short5': 'ハンズオン',

  // SRS
  'ivl.10min': '10 分', 'ivl.days': '{n} 日', 'ivl.months': '{n} か月',
  'grade.again': 'もう一度', 'grade.hard': '難しい', 'grade.good': '普通', 'grade.easy': '簡単',

  // 復習・演習セッション
  'session.done': '🎉 「{title}」を完了しました',
  'session.summary': '<b>{n}</b> 枚のカードを復習しました。',
  'session.summaryQ': '<b>{n}</b> 枚のカードを復習しました · 問題: 正解 <b>{right}</b> / 不正解 <b>{wrong}</b>',
  'session.note': '間違えたカードは 10 分後（期限が来たとき）にもう一度出題されます。正解したカードは出題間隔が長くなります。',
  'btn.home': 'ホームに戻る', 'btn.morePractice': 'さらに演習する',

  // 問題
  'q.showVi': 'ベトナム語訳を表示', 'q.hideVi': 'ベトナム語訳を隠す',
  'q.check': '解答を確認', 'q.keys': 'キー操作: A–{last} で選択 · Enter で確認',
  'q.correct': '✅ <b>正解です！</b>', 'q.howWasIt': 'この問題の手応えはどうでしたか？（Enter = 普通）',
  'q.wrong': '❌ <b>不正解です。</b>', 'q.again10': 'この問題は 10 分後にもう一度出題されます。', 'q.continue': '次へ (Enter)',
  'tag.hard': '🔥 発展', 'tag.new': '新規', 'tag.choose': '{n} つ選択',

  // 用語・サービスのフラッシュカード
  'flash.example': '問題文での使用例:', 'flash.confuse': '⚠️ 混同しやすいもの:',
  'flash.vocab': '試験キーワード', 'flash.service': 'AWS サービス · 分野 {d}',
  'flash.askVocab': 'どういう意味ですか？ どのサービスを指すことが多いですか？', 'flash.askService': 'このサービスは何をするものですか？',
  'flash.keys': '1–4 キーで評価', 'flash.flip': 'カードをめくる (Space)',

  // ホーム
  'home.title': 'AWS Certified Cloud Practitioner 試験対策',
  'home.weight': '試験の {w}%',
  'home.domProgress': '学習済み {seen}/{total} 問 · 正答率: <b>{acc}</b>',
  'home.due': '復習予定のカード', 'home.new': '今日の新規カード', 'home.learned': '学習済みカード', 'home.streak': '日連続',
  'home.daysToExam': '試験までの日数',
  'home.lastExam': '直近の模擬試験 · 推定正答率 {lo}–{hi}%',
  'home.paceOver': '上限の 1 日 100 枚でもすべては学習しきれません。問題演習と苦手なタスクを優先しましょう。',
  'home.paceApply': '1 日 {n} 枚にする',
  'home.pace': '新しいカードが残り <b>{remain}</b> 枚あります。試験日までにすべて学習し、最後の 7 日間を復習に充てるには、今後 {days} 日間 <b>1 日あたり約 {n} 枚</b>の新しいカードが必要です（現在 {cur} 枚）。',
  'home.lastExamNoEst': '直近の模擬試験',
  'home.examInProgress': '模擬試験が進行中 · 再開する',
  'home.todayN': '今日復習するカードは <b>{n}</b> 枚です。', 'home.todayDone': '今日の学習は完了です 🎉',
  'home.startReview': '復習を始める', 'home.viewSchedule': '学習予定を見る',
  'home.course': '📚 コース: <b>{done}/{total}</b> レッスン', 'home.next': '次: {id}. {title}',
  'home.weakTasks': '🎯 重点的に取り組むべきタスク', 'home.practiceNow': '今すぐ演習', 'home.fullStats': '詳しい統計を見る →',
  'home.byDomain': '分野別の進捗', 'home.howto': 'このサイトの使い方',
  'home.howto1': '📅 <b>今日の学習</b>では、問題・試験キーワード・サービスカードを<b>間隔反復 (SRS)</b> で組み合わせて出題します。間違えたカードは 10 分後に再出題され、正解したカードは 1 日、4 日、10 日…と間隔が延びていきます。学習済みのカードは期限が来たときだけ再出題されます。スケジュール外でさらに演習したい場合は<a href="#/review/free">自由演習</a>（専用スケジュール）を使ってください。',
  'home.howto2': '🟨 問題文中の<span class="kw" tabindex="0" data-k="most cost-effective">ハイライト</span>された語は重要なキーワードです。マウスを重ねるかタップすると、その意味と、何を示唆することが多いかを確認できます。',
  'home.howto3': '🌐 言語（Tiếng Việt / English / 日本語）は<a href="#/settings">設定</a>で変更できます。日本語版では、問題文と選択肢も本試験の日本語版と同じく AWS の公式日本語用語で表示されます（サービス名は英語のまま）。',
  'home.howto4': '学習の進捗はこのブラウザにのみ保存されます。バックアップするには「設定 → データをエクスポート」を使ってください。',

  // コース
  'learn.continue': '続きから', 'learn.start': '学習を始める', 'learn.review': '復習する',
  'learn.tabCourse': '📚 コース', 'learn.tabSummary': '📋 クイックまとめ',
  'learn.noCourse': '詳細レッスンはまだありません。<a href="#/learn/sum/1">クイックまとめ</a>をご覧ください。',
  'learn.modCount': '{done}/{total} レッスン', 'learn.examWeight': '試験の {w}%', 'learn.mins': '{n} 分',
  'learn.labNote': '試験に必須ではありませんが、知識の定着に役立ちます。想定外の課金を避けるため、各ラボの最後にあるクリーンアップ手順を必ず実施してください。',
  'learn.practiceDomain': '分野 {d} の問題を演習',
  'learn.progress': 'コースの進捗: {done}/{total} レッスン',
  'learn.continueLesson': '続きから: レッスン {id} →', 'learn.startLesson': '学習を始める: レッスン {id} →',
  'learn.allDone': '🎉 すべてのレッスンを完了しました！',
  'learn.tip': 'ヒント: 「基礎」モジュールから順番に進めましょう。各レッスンの最後には関連する演習問題があります。完了したレッスンには ✓ が付きます。',
  'sum.note': '詳細レッスンを学習した後の復習に使える要点まとめです。',
  'lesson.notFound': 'レッスンが見つかりません。<a href="#/learn">一覧に戻る</a>',
  'lesson.n': 'レッスン {id}', 'lesson.readMins': '⏱ 読了目安 {n} 分', 'lesson.nQuestions': '✍️ 演習問題 {n} 問', 'lesson.done': '✓ 完了',
  'lesson.goals': '🎯 このレッスンの学習目標', 'lesson.summary': '📌 レッスンのまとめ', 'lesson.terms': '📖 このレッスンの用語',
  'lesson.unmark': '↩︎ 完了を取り消す', 'lesson.mark': '✓ 完了にする',
  'lesson.quiz': '✍️ このレッスンの問題 {n} 問を演習', 'lesson.quizTitle': 'レッスン {id} の演習',

  // 表の列
  'col.term': '用語', 'col.meaning': '意味', 'col.hint': 'ヒント',
  'col.service': 'サービス', 'col.function': '機能', 'col.confuse': '混同しやすいもの',

  // 今日の学習 (復習)
  'review.done': '🎉 今日の分はすべて完了です！', 'review.nextDue': '次の復習予定: <b>{when}</b>',
  'review.more10': '新規カードをあと 10 枚学習', 'review.freePractice': '自由演習',
  'review.remaining': '未学習のカードが {n} 枚あります。', 'review.extraTitle': '追加の新規カード',

  // 問題演習
  'practice.all': '全分野', 'practice.hard': '発展問題', 'practice.multi': '複数選択問題',
  'practice.weak': 'よく間違える問題', 'practice.read': '問題文の読解トレーニング', 'practice.mixAll': 'すべてをミックス',
  'practice.empty': 'このセットにはまだ問題がありません。<a href="#/practice">戻る</a>',
  'practice.intro': '分野別に問題を演習します。<b>新しい問題</b>または<b>復習期限が来た問題</b>だけが表示され、結果は SRS のスケジュールに記録されます（1 日あたりの新規カード数には数えられません）。各タイルの数字は<b>今すぐ演習できる問題数 / 全問題数</b>です。スケジュール外でさらに演習するには: <a href="#/review/free">自由演習</a>。',
  'practice.domLine': '{total} 問 · 正答率 {acc}', 'practice.nQuestions': '{n} 問',
  'practice.weakLine': '{n} 問（直近の解答が不正解、または直近 3 回で正解が 2 回未満。自由演習のスケジュールを使用）', 'practice.hardLine': '本試験に近い難易度の問題 {n} 問',
  'practice.multiLine': '{n} 問（2 つ／3 つ選択）',
  'practice.readLine': '選択肢を見る前に決め手となるキーワードを探す · 長文問題を最大 15 問（{n} 問）',
  'practice.byTask': 'タスクステートメント別',
  'practice.byTaskNote': '問題演習と模擬試験の結果を合算しています。正答率は各問題の直近 3 回の解答で計算するため、最近の上達が反映されます。正答率の低いタスクから順に表示されます。クリックするとそのタスクだけを演習できます（今すぐ演習できる問題数 / 全問題数）。',

  // 問題文の読解トレーニング
  'read.step1': '📖 ステップ 1/2: 問題文を読み、決め手となるキーワードをタップ',
  'read.hint': 'ヒント: 主な要件（「最も費用対効果の高い」「運用上のオーバーヘッドが最も少ない」…）、制約条件（「中断できない」「サーバーを管理せずに」…）、対象（データ、ユーザー、サーバー…）を探しましょう。',
  'read.reveal': 'キーワードの例と選択肢を表示 →',
  'read.goal': '本試験の目安: 1 問あたり約 80 秒（90 分 / 65 問）',
  'read.time': '問題文を読むのにかかった時間: <b>⏱ {secs} 秒</b>。',
  'read.timeSlow': '問題文を読むのにかかった時間: <b>⏱ {secs} 秒</b>（やや遅めです。キーワードを拾い読みする練習をしましょう）。',
  'read.yours': '選んだ語: <i>{words}</i>', 'read.none': 'なし',
  'read.keywords': '🔑 キーワードの例:',

  // 用語集
  'gloss.search': '用語または意味で検索...', 'gloss.keywords': '試験キーワード ({n})', 'gloss.services': 'AWS サービス ({n})',

  // 設定
  'set.uiLang': '🌐 Language · Ngôn ngữ · 言語',
  'set.uiNote': '言語を変更するとページが再読み込みされます。学習の進捗は保持され、すべての言語で共有されます。日本語版では、問題文・選択肢・解説・レッスン・画面表示がすべて日本語になります（CLF-C02 は日本語でも受験できます）。',
  'set.langMode': '言語モード', 'set.display': '問題の表示',
  'set.mode.bi': 'バイリンガル', 'set.mode.bi.d': '英語とベトナム語を常に表示（1〜2 週目）',
  'set.mode.en-first': '英語優先', 'set.mode.en-first.d': '英語を表示し、クリックで訳を表示（3〜4 週目）',
  'set.mode.en-only': '英語のみ', 'set.mode.en-only.d': '本試験と同じ形式。訳は解答後にのみ表示（5〜6 週目）',
  'set.kw': '問題文のキーワードをハイライトする',
  'set.schedule': '学習スケジュール', 'set.newPerDay': '1 日あたりの新規カード数:', 'set.examDate': '受験日:',
  'set.data': 'データ',
  'set.dataNote': '学習の進捗はこのブラウザにのみ保存されます。バックアップや別の端末への移行には、ファイルにエクスポートしてください。',
  'set.export': 'データをエクスポート (.json)', 'set.import': 'データをインポート', 'set.reset': 'すべての進捗を消去',
  'set.saved': '保存しました。', 'set.npdKeep': '1 日 {n} 枚のままにしました（空欄は無効です）。',
  'set.imported': '✅ データをインポートしました。', 'set.badFile': '❌ 無効なファイルです。',
  'set.resetConfirm': '学習の進捗（SRS カード、自由演習のスケジュール、統計、完了したレッスン、模擬試験の履歴、進行中の模擬試験）をすべて消去しますか？ 設定は保持されます。この操作は元に戻せません。',
  'set.resetDone': '進捗を消去しました。',

  // 模擬試験
  'exam.verdict.ok': '✅ 安全圏（80% 以上）',
  'exam.verdict.warn': '⚠️ ボーダーライン: 本試験はより難しい可能性があります。学習を続けましょう',
  'exam.verdict.no': '❌ まだ届いていません: 苦手な分野を復習しましょう',
  'exam.notCounted': '（既出の問題が多い）',
  'exam.intro': '試験は<b>全 {n} 問</b>、制限時間は {mins} です。', 'exam.mins': '{n} 分',
  'exam.shortNote': '（本試験は 65 問・90 分です。現在の問題バンクは {n} 問のため、時間は比例して調整されています。）',
  'exam.rule1': '<b>本試験と同じ形式</b>で、キーワードのハイライトはなく、途中で正解は表示されません。',
  'exam.rule2': '問題はまず<b>模擬試験専用の {pool} 問のプール</b>から出題されます。これらは問題演習や SRS の復習には<b>一切出てこない</b>ため、結果は暗記ではなく実力を反映します。これまでの模擬試験で {seen}/{pool} 問を見ています。',
  'exam.freshLeft': 'プールには、<b>完全に初見の模擬試験 {n} 回分</b>の未出題問題が残っています。',
  'exam.noFresh': '<b>完全に初見の模擬試験はもう残っていません</b>: 今後の模擬試験では既出の問題が繰り返されるため、スコアが実力より高く出る可能性があります。',
  'exam.saveFresh': '模擬試験を 1 回終えるたびに初見の問題を「消費」します。<b>初見の模擬試験は直前期</b>（受験日の 1〜2 週間前）<b>に取っておき</b>、合格準備度の測定に使いましょう。それまでは「問題演習」と「今日の学習」を使ってください。',
  'exam.rule4': '見直したい問題に<b>フラグ</b>を付けたり、問題間を行き来したりできます。時間切れになると自動的に提出されます。離席中（タブを閉じた、PC がスリープした など）に時間切れになり、解答済みの問題が半分未満の場合は、試験は破棄されます。',
  'exam.rule5': '結果は<b>正答率</b>で表示されます。本試験はスケールドスコア（1000 点中 700 点で合格）を採用しており、より難しい可能性があるため、<b>80% 以上</b>を目標にしましょう。',
  'exam.esl': '<b>ESL +30 分</b>を適用する（母国語以外の言語で受験し、受験予約時にこの配慮を申請する場合）',
  'exam.start': '試験を開始', 'exam.history': '模擬試験の履歴',
  'exam.colTime': '日付', 'exam.colPct': '正答率', 'exam.colCorrect': '正解数', 'exam.colFresh': '初見の問題', 'exam.colUsed': '所要時間',
  'exam.freshNote': '「初見の問題」: その模擬試験で初めて見た問題の数です。この数が少ない場合、答えを覚えていたためにスコアが実力より高く出ている可能性があります。',
  'exam.none': 'まだ模擬試験を受けていません。',
  'exam.invalid': '進行中の模擬試験には有効な問題がなくなったため（問題バンクが更新されました）、キャンセルされました。<a href="#/exam">新しい模擬試験を始める</a>',
  'exam.qOf': '問題 {i}/{n}', 'exam.flag': '🏳️ フラグを付ける', 'exam.unflag': '🚩 フラグを外す',
  'exam.prev': '← 前へ', 'exam.next': '次へ →',
  'exam.keys': 'キー操作: A–{last} で選択 · ←/→ で移動 · M でフラグ',
  'exam.navSummary': '問題マップ · 解答済み {answered}/{n} · フラグ {flags}',
  'exam.navPartial': ' · 選択数が不足 {n}（破線の枠）',
  'exam.submit': '試験を提出', 'exam.quit': '試験を中止',
  'exam.cUnanswered': '未解答の問題が {n} 問あります。', 'exam.cPartial': '選択数が足りない複数選択問題が {n} 問あります。',
  'exam.cFlagged': 'フラグ付きの問題が {n} 問あります。', 'exam.cSubmit': '試験を提出しますか？',
  'exam.cQuit': 'この試験を中止しますか？ 得点は保存されません。表示した問題は合格準備度に記録され（解答が不完全な問題は不正解扱い）、初見の問題としては扱われなくなります。',
  'exam.notFound': '模擬試験が見つかりません。<a href="#/exam">戻る</a>',
  'exam.expired': '途中の試験は、解答が半分に満たないまま時間切れになったため、採点せずに破棄しました。表示した {n} 問は合格準備度に記録されています（解答が不完全な問題は不正解扱い）。<a href="#/exam">新しい試験を始める</a>',
  'ready.yes': '🎯 受験の準備ができています', 'ready.title': '🎯 合格準備度',
  'ready.age': '最新データ: {date}。',
  'ready.domN': '{n} 問',
  'ready.needDomain': '分野 {d} の推定の確度を上げるには、あと約 {n} 問の初見の解答が必要です。',
  'ready.lowDomain': '下限が {lo}% 未満の分野があります。その分野を復習してから、もう一度模擬試験を受けましょう。',
  'ready.lowTotal': '下限がまだ {lo}% 未満です。上のタスクを復習してから、もう一度模擬試験を受けましょう。',
  'ready.needMore': '推定の確度を上げるには、あと約 {n} 問の初見の解答（模擬試験の追加受験）が必要です。',
  'ready.risky': '復習が必要なタスク:',
  'ready.basis': '80% 区間、初見の解答 {n} 問に基づく。',
  'ready.range': '{lo}–{hi}%',
  'ready.est': '推定 {lo}–{hi}%',
  'ready.noData': 'まだデータがありません。模擬試験を受けると最初の推定値が表示されます。',
  'ready.yesNote': 'すべての分野で推定値が十分に目標を上回っています。受験を予約する前に、AWS Skill Builder の公式練習問題集 (Official Practice Question Set) も試してみましょう。',
  'ready.rule': '推定値は、模擬試験専用の問題プールの各問題に<b>初めて</b>解答した結果（最近の結果ほど重視）を、本試験の分野別配分で重み付けして計算します。十分なデータ（最近の解答が約 80 問、各分野 8 問以上）があり、全体の下限が 75% 以上、各分野の下限が 65% 以上で準備完了です。',

  // 模擬試験の結果
  'res.qN': '問題 {i}', 'res.right': '✅ 正解', 'res.wrong': '❌ 不正解', 'res.blank': '⚪ 未解答', 'res.none': '問題がありません。',
  'res.auto': ' · 時間切れにより自動提出', 'res.pctCorrect': '正答率',
  'res.line': '<b>{c}/{n}</b> 問正解 · 所要時間 {used}', 'res.fresh': ' · 初見の問題: <b>{f}/{n}</b>',
  'res.scoreNote': '本試験は 100～1000 点のスケールドスコア（合格ライン 700）で、正答率から直接換算することはできません。余裕を持って 80% 以上を目標にしましょう。',
  'res.seenWarn': '⚠️ この模擬試験には既出の問題が多く含まれていたため、結果が実力より高く出ている可能性があります。合格準備度には各問題の初回の解答のみを使います。',
  'res.retake': 'もう一度受験する', 'res.drill': '間違えた {t} タスクの問題を {n} 問演習', 'res.drillTitle': '模擬試験の復習演習',
  'res.byDomain': '分野別の結果', 'res.domainNote': '70% 未満の分野は、その分野のレッスンを復習しましょう。',
  'res.weakTasks': '復習すべきタスク', 'res.taskLine': '{c}/{n} 問正解 ({p}%)', 'res.practiceTask': 'このタスクを演習',
  'res.review': '解答を振り返る',
  'res.fAll': 'すべて ({n})', 'res.fWrong': '不正解・未解答 ({n})', 'res.fFlag': 'フラグ付き ({n})',
  'res.showVi': 'ベトナム語訳を表示',

  // PWA
  'pwa.newContent': '🔄 新しいコンテンツがあります', 'pwa.update': '更新',
  'pwa.installed': '✅ インストール済みのアプリを使用中です。オフラインでも動作します。',
  'pwa.installPrompt': 'このサイトをアプリとしてインストールすると、ホーム画面から開けて、オフラインでも使えます。',
  'pwa.installBtn': '📲 アプリをインストール',
  'pwa.ios': 'iPhone/iPad の場合: このページを <b>Safari</b> で開く → <b>共有</b>ボタン（四角に上向き矢印）をタップ → <b>「ホーム画面に追加」</b>を選択。',
  'pwa.android': 'Android の場合: <b>Chrome</b> で開く → メニュー <b>⋮</b> → <b>「アプリをインストール」</b>または<b>「ホーム画面に追加」</b>。パソコンの場合: アドレスバーのインストールアイコンをクリック。',
  'pwa.title': '📱 アプリとオフライン',
  'pwa.cached': '✓ コンテンツはオフライン用に保存されています。',
  'pwa.httpsOnly': 'オフラインモードは、サイトを HTTPS（例: GitHub Pages）で開いた場合にのみ動作します。',
  'pwa.autoUpdate': 'オンライン時に新しいコンテンツが自動的にダウンロードされます。',
  'pwa.refresh': '🔄 最新のコンテンツを再読み込み',
  'pwa.offline': 'オフラインです。インターネットに接続してからもう一度お試しください。',

  // リカバリー画面
  'rec.title': '⚠️ 画面の表示中にエラーが発生しました',
  'rec.p1': 'このブラウザに保存された進捗データが破損している可能性があります（例: 形式の誤ったファイルをインポートした後など）。',
  'rec.detail': '詳細:', 'rec.retry': 'ホーム画面をもう一度開く', 'rec.export': '現在のデータのコピーをダウンロード',
  'rec.reset': 'データを消去してやり直す', 'rec.confirm': 'このブラウザ内の進捗データをすべて消去しますか？',

  // Dùng chung · Common · 共通
  'common.domain': '分野 {d}',
  'common.task': 'タスク {t}',
  'common.back': '戻る',
  'task.colTask': 'タスク',
  'session.freeNote': 'このセッションは自由演習専用のスケジュールを使うため、「今日の学習」のスケジュールには影響しません。',
  'session.freeMore': '自由演習を続ける',
  'home.howtoMode': '🔤 <a href="#/settings">設定</a>で言語モードを切り替えられます: <i>バイリンガル</i> → <i>英語優先</i> → <i>英語のみ</i>。',
  'review.title': '今日の学習',
  'review.freeNote': '自由演習は専用のスケジュールを使うため、この復習スケジュールには影響しません。',

  // Không có gì để luyện · Nothing to practice · 演習なし
  'empty.title': '✅ 今すぐ演習する問題はありません',
  'empty.body': '<b>{title}</b>: 新しい問題は残っておらず、学習済みの問題もまだ復習の期限が来ていません。',
  'empty.bodyFree': '<b>{title}</b>: 新しいカードは残っておらず、学習済みのカードも自由演習のスケジュールではまだ期限が来ていません。',
  'empty.nextDue': 'このセットで次に期限が来るのは <b>{when}</b> です',
  'empty.freeNote': '自由演習には専用のスケジュールがあるため、そこで追加演習しても「今日の学習」のスケジュールは乱れません。',

  // Luyện tập tự do · Free practice · 自由演習
  'free.title': '自由演習 · {scope}',
  'free.otherScope': '別の範囲を選ぶ',
  'free.avail': '今すぐ演習できるカード <b>{av}/{total}</b> 枚',
  'free.kindQ': '問題 {n}',
  'free.kindS': 'サービス {n}',
  'free.kindV': 'キーワード {n}',
  'free.nextDue': '⏳ 次のカードの期限: {when}',
  'free.intro': '<b>専用のスケジュール</b>で好きなだけ演習できます。「今日の学習」のスケジュールは変わらず、1 日あたりの新規カード数にも数えられません。ここで演習したカードも SRS で間隔が延びていき、この専用スケジュールで期限が来たときにだけ再出題されます。',
  'free.allSub': '全 4 分野 + 試験キーワード',
  'free.nextDueAll': '自由演習で次に期限が来るカード: <b>{when}</b>。',
  'free.scopeNote': '分野にはその分野の問題とサービスカードが含まれます。試験キーワードは「すべてをミックス」にのみ含まれます。',

  // Quiz bài học · Lesson quiz · レッスンの演習
  'lesson.quizLeft': '残りの {n} 問は学習済みで、まだ復習の期限が来ていません。',
  'lesson.quizNone': 'このレッスンの {n} 問はすべて学習済みで、まだ復習の期限が来ていません。',
  'lesson.quizNext': '次の期限: <b>{when}</b>。',
  'lesson.quizFree': 'さらに演習するには: <a href="#/review/free">自由演習</a>。'
});})();
