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
  'task.1.1': 'AWS クラウドの利点', 'task.1.2': 'Well-Architected フレームワーク', 'task.1.3': '移行と AWS CAF', 'task.1.4': 'クラウドエコノミクス',
  'task.2.1': '責任共有モデル', 'task.2.2': 'セキュリティ・ガバナンス・コンプライアンス', 'task.2.3': 'アクセス管理 (IAM)', 'task.2.4': 'セキュリティのサービスとリソース',
  'task.3.1': 'デプロイと運用', 'task.3.2': 'グローバルインフラストラクチャ', 'task.3.3': 'コンピューティング', 'task.3.4': 'データベース', 'task.3.5': 'ネットワーク',
  'task.3.6': 'ストレージ', 'task.3.7': 'AI/ML と分析', 'task.3.8': 'その他のサービスカテゴリ',
  'task.4.1': '料金モデル', 'task.4.2': '請求とコスト管理', 'task.4.3': 'サポートとリソース',
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
  'session.note': '間違えたカードはすぐにもう一度出題されます。正解したカードは出題間隔が長くなります。',
  'btn.home': 'ホームに戻る', 'btn.morePractice': 'さらに演習する',

  // 問題
  'q.showVi': 'ベトナム語訳を表示', 'q.hideVi': 'ベトナム語訳を隠す',
  'q.check': '解答を確認', 'q.keys': 'キー操作: A–{last} で選択 · Enter で確認',
  'q.correct': '✅ <b>正解です！</b>', 'q.howWasIt': 'この問題の手応えは？（Enter = 普通）',
  'q.wrong': '❌ <b>不正解です。</b>', 'q.again10': 'この問題は 10 分後にもう一度出題されます。', 'q.continue': '次へ (Enter)',
  'tag.hard': '🔥 発展', 'tag.new': '新規', 'tag.choose': '{n} つ選択',

  // 用語・サービスのフラッシュカード
  'flash.example': '問題文での使用例:', 'flash.confuse': '⚠️ 混同しやすいもの:',
  'flash.vocab': '試験キーワード', 'flash.service': 'AWS サービス · ドメイン {d}',
  'flash.askVocab': 'どういう意味？ どのサービスを指すことが多い？', 'flash.askService': 'このサービスは何をするもの？',
  'flash.keys': '1–4 キーで評価', 'flash.flip': 'カードをめくる (Space)',

  // ホーム
  'home.title': 'AWS Certified Cloud Practitioner 試験対策',
  'home.weight': '試験の {w}%',
  'home.domProgress': '学習済み {seen}/{total} 問 · 正答率: <b>{acc}</b>',
  'home.due': '復習予定のカード', 'home.new': '今日の新規カード', 'home.learned': '学習済みカード', 'home.streak': '日連続',
  'home.daysToExam': '試験までの日数',
  'home.lastExam': '直近の模擬試験 · 合格準備度 {ok}/3（初見の模擬試験）',
  'home.examInProgress': '模擬試験が進行中 · 再開する',
  'home.todayN': '今日復習するカードは <b>{n}</b> 枚です。', 'home.todayDone': '今日の学習は完了です 🎉',
  'home.startReview': '復習を始める', 'home.viewSchedule': '学習予定を見る',
  'home.course': '📚 コース: <b>{done}/{total}</b> レッスン', 'home.next': '次: {id}. {title}',
  'home.weakTasks': '🎯 重点的に取り組むべきタスク', 'home.practiceNow': '今すぐ演習', 'home.fullStats': '詳しい統計を見る →',
  'home.byDomain': 'ドメイン別の進捗', 'home.howto': 'このサイトの使い方',
  'home.howto1': '📅 <b>今日の学習</b>では、問題・試験キーワード・サービスカードを<b>間隔反復 (SRS)</b> で組み合わせて出題します。間違えたカードは 10 分後に再出題され、正解したカードは 1 日、4 日、10 日…と間隔が延びていきます。',
  'home.howto2': '🟨 問題文中の<span class="kw" tabindex="0" data-k="most cost-effective">ハイライト</span>された語は重要なキーワードです。マウスを重ねるかタップすると、その意味と、何を示唆することが多いかを確認できます。',
  'home.howto3': '🌐 言語（Tiếng Việt / English / 日本語）は<a href="#/settings">設定</a>で変更できます。問題文と選択肢は、本試験（英語版）と同じく常に英語で表示されます。',
  'home.howto4': '学習の進捗はこのブラウザにのみ保存されます。バックアップするには「設定 → データをエクスポート」を使ってください。',

  // コース
  'learn.continue': '続きから', 'learn.start': '学習を始める', 'learn.review': '復習する',
  'learn.tabCourse': '📚 コース', 'learn.tabSummary': '📋 クイックまとめ',
  'learn.noCourse': '詳細レッスンはまだありません。<a href="#/learn/sum/1">クイックまとめ</a>をご覧ください。',
  'learn.modCount': '{done}/{total} レッスン', 'learn.examWeight': '試験の {w}%', 'learn.mins': '{n} 分',
  'learn.labNote': '試験に必須ではありませんが、知識の定着に役立ちます。想定外の課金を避けるため、各ラボの最後にあるクリーンアップ手順を必ず実施してください。',
  'learn.practiceDomain': 'ドメイン {d} の問題を演習',
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
  'practice.all': '全ドメイン', 'practice.hard': '発展問題', 'practice.multi': '複数選択問題',
  'practice.weak': 'よく間違える問題', 'practice.read': '問題文の読解トレーニング', 'practice.mixAll': 'すべてをミックス',
  'practice.empty': 'このセットにはまだ問題がありません。<a href="#/practice">戻る</a>',
  'practice.intro': 'ドメイン別に問題を演習します。結果は SRS の学習スケジュールにも反映されます。',
  'practice.domLine': '{total} 問 · 正答率 {acc}', 'practice.nQuestions': '{n} 問',
  'practice.weakLine': '{n} 問（正答率 70% 未満）', 'practice.hardLine': '本試験に近い難易度の問題 {n} 問',
  'practice.multiLine': '{n} 問 (Choose TWO/THREE)',
  'practice.readLine': '選択肢を見る前に決め手となるキーワードを探す · 長文問題 15 問',
  'practice.byTask': 'タスクステートメント別',
  'practice.byTaskNote': '問題演習と模擬試験の結果を合算しています。正答率の低いタスクから順に表示されます。クリックするとそのタスクだけを演習できます。',

  // 問題文の読解トレーニング
  'read.step1': '📖 ステップ 1/2: 問題文を読み、決め手となるキーワードをタップ',
  'read.hint': 'ヒント: 主な要件（MOST cost-effective、LEAST operational overhead…）、制約条件（cannot be interrupted、without managing servers…）、対象（データ、ユーザー、サーバー…）を探しましょう。',
  'read.reveal': 'キーワードの例と選択肢を表示 →',
  'read.goal': '本試験の目安: 1 問あたり約 80 秒（90 分 / 65 問）',
  'read.time': '問題文の読解に <b>⏱ {secs} 秒</b>。',
  'read.timeSlow': '問題文の読解に <b>⏱ {secs} 秒</b>（やや遅めです。キーワードを拾い読みする練習をしましょう）。',
  'read.yours': '選んだ語: <i>{words}</i>', 'read.none': 'なし',
  'read.keywords': '🔑 キーワードの例:',

  // 用語集
  'gloss.search': '用語または意味で検索...', 'gloss.keywords': '試験キーワード ({n})', 'gloss.services': 'AWS サービス ({n})',

  // 設定
  'set.uiLang': '🌐 Language · Ngôn ngữ · 言語',
  'set.uiNote': '言語を変更するとページが再読み込みされます。学習の進捗は保持され、すべての言語で共有されます。English 版と日本語版では、問題文と選択肢は本試験と同じく英語のみで表示され、解説・レッスン・画面表示は選択した言語になります。',
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
  'set.resetConfirm': '学習の進捗（SRS カード、統計、完了したレッスン、模擬試験の履歴、進行中の模擬試験）をすべて消去しますか？ 設定は保持されます。この操作は元に戻せません。',
  'set.resetDone': '進捗を消去しました。',

  // 模擬試験
  'exam.verdict.ok': '✅ 安全圏（80% 以上）',
  'exam.verdict.warn': '⚠️ ボーダーライン: 本試験はより難しい可能性があります。学習を続けましょう',
  'exam.verdict.no': '❌ まだ届いていません: 苦手なドメインを復習しましょう',
  'exam.notCounted': '（合格準備度には含まれません）',
  'exam.intro': '試験は<b>全 {n} 問</b>、制限時間は {mins} です。', 'exam.mins': '{n} 分',
  'exam.shortNote': '（本試験は 65 問・90 分です。現在の問題バンクは {n} 問のため、時間は比例して調整されています。）',
  'exam.rule1': '本試験と同じく<b>英語のみ</b>で、キーワードのハイライトはなく、途中で正解は表示されません。',
  'exam.rule2': '問題はまず<b>模擬試験専用の {pool} 問のプール</b>から出題されます。これらは問題演習や SRS の復習には<b>一切出てこない</b>ため、結果は暗記ではなく実力を反映します。これまでの模擬試験で {seen}/{pool} 問を見ています。',
  'exam.freshLeft': 'プールには、<b>完全に初見の模擬試験 {n} 回分</b>の未出題問題が残っています。',
  'exam.noFresh': '<b>完全に初見の模擬試験はもう残っていません</b>: 今後の模擬試験では既出の問題が繰り返されるため、スコアが実力より高く出る可能性があります。',
  'exam.saveFresh': '模擬試験を 1 回終えるたびに初見の問題を「消費」します。<b>初見の模擬試験は直前期</b>（受験日の 1〜2 週間前）<b>に取っておき</b>、合格準備度の測定に使いましょう。それまでは「問題演習」と「今日の学習」を使ってください。',
  'exam.rule4': '見直したい問題に<b>フラグ</b>を付けたり、問題間を行き来したりできます。時間切れになると自動的に提出されます。',
  'exam.rule5': '結果は<b>正答率</b>で表示されます。本試験はスケールドスコア（1000 点中 700 点で合格）を採用しており、より難しい可能性があるため、<b>80% 以上</b>を目標にしましょう。',
  'exam.esl': '<b>ESL +30 分</b>を適用する（受験予約時にこの配慮を申請する場合）',
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
  'exam.cQuit': 'この試験を中止しますか？ 結果は保存されません。',
  'exam.notFound': '模擬試験が見つかりません。<a href="#/exam">戻る</a>',
  'ready.yes': '🎯 受験の準備ができています', 'ready.title': '🎯 合格準備度',
  'ready.yesNote': '直近 3 回の初見の模擬試験で 80% 以上を取りました。受験を予約する前に、AWS Skill Builder の Official Practice Question Set も試してみましょう。',
  'ready.goal': '目標: <b>初見の模擬試験で 3 回連続</b> 80% 以上（現在、直近 {n} 回中 {ok} 回達成）。',
  'ready.rule': '<b>問題の半分以上が初見</b>の模擬試験のみを数えます。既出の問題が多い試験は、実力よりも記憶を測ってしまうためです。',
  'ready.skipped': '履歴のうち {n} 回は、この理由で対象外です。',

  // 模擬試験の結果
  'res.qN': '問題 {i}', 'res.right': '✅ 正解', 'res.wrong': '❌ 不正解', 'res.blank': '⚪ 未解答', 'res.none': '問題がありません。',
  'res.auto': ' · 時間切れにより自動提出', 'res.pctCorrect': '正答率',
  'res.line': '<b>{c}/{n}</b> 問正解 · 所要時間 {used}', 'res.fresh': ' · 初見の問題: <b>{f}/{n}</b>',
  'res.scoreNote': '1000 点満点への概算換算 ≈ {score}（参考値）。本試験はスケールドスコア（合格ライン {pass}）を採用しており、より難しい可能性があるため、3 回連続で 80% 以上を目標にしましょう。',
  'res.seenWarn': '⚠️ この模擬試験には既出の問題が多く含まれていたため、結果が実力より高く出ている可能性があり、合格準備度には含まれません。',
  'res.retake': 'もう一度受験する', 'res.drill': '間違えた {n} 問を今すぐ復習（演習問題）', 'res.drillTitle': '模擬試験で間違えた問題',
  'res.byDomain': 'ドメイン別の結果', 'res.domainNote': '70% 未満のドメインは、そのドメインのレッスンを復習しましょう。',
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
  'rec.reset': 'データを消去してやり直す', 'rec.confirm': 'このブラウザ内の進捗データをすべて消去しますか？'
});})();
