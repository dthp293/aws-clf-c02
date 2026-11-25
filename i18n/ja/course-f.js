(function(){var I=window.CLF_I18N=window.CLF_I18N||{};var L=I.ja=I.ja||{};['q','course','lessons','glossary','services','domains','ui'].forEach(function(k){L[k]=L[k]||{};});
L.course["5-1"]={title:"Lab 1: アカウントを安全に作成し、想定外の請求を防ぐ",goals:["ルートユーザーを MFA で保護し、日常業務にルートを使わない理由を理解する","日常業務用の管理者 ID を別に作成する（IAM Identity Center、または MFA 付きの IAM user）","AWS Budgets で cost budget を作成し、低い金額でメールアラートを設定する","Billing と Cost Explorer の画面への行き方を知り、自分でコストを確認できるようになる"],html:`
<h3>始める前に: なぜこのラボを最初にやるのか</h3>
<p>このレッスンからは、<b>AWS Management Console</b>（AWS のウェブ管理画面）を自分の手で操作していきます。手を動かして学ぶと、理論を読むだけよりもずっと記憶に残ります。ただし、初心者には大きな不安が 2 つあります。<b>アカウントの漏えい</b>と<b>想定外の請求</b>です。</p>
<p>Lab 1 はまさにこの 2 つの不安に対処します。このラボを終えると、アカウントには「二重の鍵」がかかり、日常業務用の専用アカウントができ、コストが設定額を超えたら AWS がすぐにメールで知らせてくれるようになります。</p>
<p>すべてのラボに共通する注意点: AWS は Console をかなり頻繁に変更するため、<b>画面は説明と少し異なる場合があります</b>。ボタンの位置ではなく、機能名で探してください。</p>

<div class="box idea"><b>🧠 かんたんに言うと</b>
<p>ルートユーザーは<b>ビル全体のマスターキー</b>のようなものです。すべてのドアを開けられ、ビルそのものを閉鎖するドアさえ開けられます。マスターキーを毎日の買い物に持ち歩く人はいません。金庫にしまい（MFA を有効にして、めったに使わない）、日常の用事には別の鍵（管理者 ID）を作ります。一方、AWS Budgets は銀行の<b>残高通知メッセージ</b>のようなものです。使いすぎると、すぐにスマートフォンに通知が届きます。</p>
</div>

<h3>コストと準備</h3>
<p><b>コスト:</b> MFA の有効化、IAM user の作成、IAM Identity Center の利用は、いずれも無料です。ウェブ画面で Billing と Cost Explorer を見るのも無料です。AWS Budgets で budget を作成してメールでアラートを受け取るのは<b>無料</b>です。料金がかかるのは一部の高度な機能（無料枠を超えた自動アクション付きの budget、定期的な budget レポート）だけです。このラボではアラート用の budget を <b>1 つ</b>作るだけなので、コストは 0 です。</p>
<p><b>Free Tier について:</b> 2025 年 7 月から、AWS は新規アカウント向けの <b>AWS Free Tier</b>（無料利用枠）の条件を変更しました。<b>credit</b>（お試し用クレジット）ベースのモデルに移行し、登録時に次の 2 つのプランのどちらかを選びます。</p>
<ul>
<li><b>Free plan</b>（無料プラン）: 利用中に料金は発生しません。プランは <b>6 か月</b>後、またはクレジットを使い切った時点の、どちらか早いほうで終了します。その時点でアップグレードしなければ、アカウントは<b>自動的に閉鎖</b>されます。AWS はデータを <b>90 日間</b>保持したあと完全に削除します。この 90 日の間であれば、Paid plan にアップグレードしてアクセスを取り戻せます。このプランでは、クレジットを使い切る可能性のあるサービス/機能は利用できません。たとえば <b>Reserved Instances や Savings Plans は購入できず</b>、AWS Marketplace の一部の有料製品も使えません。注意: 次の操作を行うと、アカウントは有料プランへ<b>自動的にアップグレード</b>されます。<b>AWS Organizations</b> への参加、<b>AWS Control Tower</b> の landing zone の構築、<b>AWS Partner Network</b> への参加、Professional Services 契約の締結、Enterprise Agreement の申し込み、AWS Skill Builder Team プランの購入、またはアカウントを HIPAA/SEC 準拠としてマークすることです。</li>
<li><b>Paid plan</b>（有料プラン）: すべてのサービスを利用できます。クレジットを超えた分や、クレジットが適用されないサービスは<b>実際に課金されます</b>。このプランでは、パート C のアラート用 budget は必須です。</li>
</ul>
<p>クレジットの額、期間、対象サービスの一覧は変わる可能性があるため、ラボを始める前に<b>公式の AWS Free Tier ページを読んでください</b>。古いブログの数字を信用してはいけません（たとえば「12 か月無料」は 2025 年 7 月より前に作成されたアカウント向けの条件です）。</p>
<p><b>準備:</b></p>
<ul>
<li>普段よく使うメールアドレス 1 つ（これがルートユーザーのメールアドレスになります）。</li>
<li>支払い用カード 1 枚（登録時に AWS が要求します）と、本人確認用の電話番号。</li>
<li>スマートフォンの認証アプリ（authenticator app）または物理セキュリティキー。<b>MFA</b>（Multi-Factor Authentication、多要素認証）に使います。</li>
</ul>

<h3>ハンズオンの手順</h3>
<h4>パート A: ルートでサインインして MFA を有効にする</h4>
<ol>
<li>アカウントがまだない場合は、AWS の登録ページを開いて案内に従います。現行の Free Tier の条件に沿って、プラン選択（free plan / paid plan）の部分をよく読んでください。</li>
<li><b>Root user</b> のオプションで Console にサインインし、アカウントのメールアドレスとパスワードを入力します。ルートユーザーはアカウントと同時に作成される ID で、すべての権限を持っています。</li>
<li>画面上部のアカウント名をクリックし、<b>Security credentials</b>（セキュリティ認証情報）を選びます。</li>
<li><b>Multi-factor authentication (MFA)</b> のセクションを探し、MFA デバイスの割り当てを選びます。デバイスの種類（認証アプリ、passkey/セキュリティキーなど）を選び、スマートフォンで QR コードを読み取って、案内どおりにコードを入力します。</li>
<li>同じページで <b>Access keys</b> の項目を確認します。ルートユーザーは access key を<b>ひとつも持つべきではありません</b>。もし存在していて使っていないなら、削除してください。</li>
<li>いったんサインアウトし、ルートでもう一度サインインして、MFA が確実に機能していることを確認します。</li>
</ol>

<h4>パート B: 日常業務用の管理者 ID を作成する</h4>
<p>方法は 2 つあります。人間のユーザー向けに <b>AWS が推奨する方法</b>は <b>AWS IAM Identity Center</b>（旧 AWS SSO）です。専用のアクセスポータルからサインインして一時的な権限を受け取る仕組みで、あとから複数アカウントへ広げるのも簡単です。ただし、Identity Center を使って <b>AWS アカウント</b>にサインインする（permission set を割り当てる）には、<b>organization instance</b> として有効化する必要があります。つまり <b>AWS Organizations</b>（複数アカウントの管理）も一緒に有効にしなければならず、あなたのアカウントは management account になります。Organizations 自体は無料ですが、<b>Free plan</b> を利用中の場合、Organizations を有効にすると<b>アカウントは自動的に Paid plan へ切り替わります</b>。（Console で "account instance" しか作成できない場合、その instance では AWS アカウントへのアクセス権を付与できません。）</p>
<p>学習用としてもっと簡単なのは、管理者権限を持つ <b>IAM user</b> を作成し、その user に MFA を有効にする方法です。長期的なパスワードを使うため安全性は少し劣りますが、初心者には分かりやすく、<b>Organizations に触れずに済みます</b>。次のどちらかを選んでください。</p>
<ol>
<li><b>方法 1（AWS 推奨、Paid plan 向き）:</b> <b>IAM Identity Center</b> サービスを開き、有効化（Enable）をクリックして、尋ねられたら organization の作成に同意します。自分用の user を 1 つ作成し、管理者権限を持つ <b>permission set</b>（権限セット）を作成して（たとえば AdministratorAccess タイプを使用）、その user と permission set を自分の AWS アカウントに割り当てます。有効化メールを開いてパスワードを設定し、MFA を有効にして、<b>AWS access portal</b>（アクセスポータル）のリンクを保存しておきます。</li>
<li><b>方法 2（シンプル。Free plan を利用中ならこちらがおすすめ）:</b> <b>IAM</b> サービスを開き、user を 1 つ作成して（名前の例: <code>minh-admin</code>）、Console へのサインインを許可し、policy <code>AdministratorAccess</code> をアタッチします。アカウントの IAM サインイン用リンクからこの user でサインインし、user の Security credentials を開いて MFA を有効にします。</li>
<li>これ以降は、この管理者 ID でサインインします。ルートを使うのは、ルートにしかできない作業が本当に必要なときだけにします。</li>
</ol>

<h4>パート C: コストアラート用の budget を作成する</h4>
<ol>
<li><b>Billing and Cost Management</b> を開き、<b>Budgets</b> の項目を探して、budget の作成を選びます。</li>
<li>種類は <b>Cost budget</b>（コストベースの budget）を選びます。Console には通常 "zero spend budget" や "monthly cost budget" といったテンプレートが用意されています。テンプレートを使っても、自分で設定してもかまいません。</li>
<li>期間を月次にし、自分で決めたごく低い金額（学習中に許容できる額）を設定します。</li>
<li>アラートのしきい値を追加し（たとえば実際のコストが budget の一定の割合を超えたとき）、通知を受け取るメールアドレスを入力します。<b>予測</b>コスト（forecasted）に基づくアラートも追加できます。</li>
<li>budget を保存し、メールを確認します（確認を求められた場合）。注意: コストデータは 1 日に数回しか更新されないため、アラートメールはコストが発生した時点から<b>数時間遅れて</b>届くことがあります。budget は安全ネットであり、各ラボの直後に自分でリソースを片付ける作業の代わりにはなりません。</li>
<li><b>Billing preferences</b>（請求設定）を開き、Free Tier の使用状況アラートをメールで受け取るオプションがあれば有効にします。</li>
</ol>

<h4>パート D: Billing と Cost Explorer を見る</h4>
<ol>
<li><b>Billing and Cost Management</b> で、概要ページ（Home）と <b>Bills</b> を開き、今月の請求をサービス別に確認します。</li>
<li><b>Cost Explorer</b> を開きます。初めて使う場合、AWS がデータを準備するのに時間がかかることがあります（最大で 1 日程度）。</li>
<li>コストをサービス別・月別に絞り込んでみます。月末のコスト予測の部分にも注目してください。</li>
<li>管理者 ID（IAM user、または Identity Center 経由）でサインインして、AdministratorAccess 権限があるのに Billing のページで拒否された場合は、ルートでサインインし、<b>Account</b> ページで <b>IAM user and role access to Billing information</b> のオプションを有効にします。</li>
</ol>

<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b>
<p>AWS に移行した初日、ミンさんはランさんのメールアドレスをそのまま使って登録し、いつもルートでサインインしていました。セキュリティの仕事をしている友人が注意します。「ルートのパスワードが漏れたら、店ごと失うことになるよ」。ミンさんはルートに MFA を有効にし、MFA 用のスマートフォンを大切に保管したうえで、IAM Identity Center で専用の管理者 ID を作成しました。</p>
<p>ランさんがいちばん心配しているのはお金のことです。ミンさんは低い金額で月次の budget を作成し、アラートをランさんと自分の両方のメールアドレスに送るようにしました。初めてアラートメールが届いたのは、ミンさんがテスト用サーバーを止め忘れたときでした。2 人はその日のうちに対処し、請求額はほんの少し増えただけで済みました。</p>
</div>

<div class="box trap"><b>⚠️ ラボ終了時の後片付けと確認</b>
<ul>
<li>このラボでは<b>何も削除する必要はありません</b>。MFA、管理者 ID、budget は、長く残しておくべきものです。</li>
<li>ルートユーザーに <b>access key がない</b>ことを確認します。</li>
<li>budget のアラートメールが、毎日読むアドレスに届く設定になっていることを確認します。</li>
<li>ルートからサインアウトし、管理者 ID に切り替えたことを確認します。</li>
<li>budget は<b>アラートを出すだけ</b>で、リソースを自動的に停止はしません。メールを受け取っても、自分で片付けに行く必要があります。</li>
</ul></div>

<div class="box exam"><b>🎯 試験との関連</b>
<ul>
<li>"Best practice for the root user" → <b>MFA</b> を有効にする、日常業務にルートを使わない、ルートに access key を作成しない。</li>
<li>"Tasks that only the root user can perform" → たとえばアカウントの閉鎖、一部のアカウント設定の変更など。試験ではこの種の選択肢がいくつか並ぶことがよくあります。</li>
<li>"Sign in once to access multiple accounts" → <b>AWS IAM Identity Center</b>。</li>
<li>"Alert when cost/usage exceeds a threshold" または "forecasted cost" → <b>AWS Budgets</b>。</li>
<li>"Visualize past costs and forecast" → <b>AWS Cost Explorer</b>。</li>
</ul></div>
`,summary:["ルートユーザーはすべての権限を持つ: MFA を有効にし、access key を作成せず、ルートにしかできない作業にだけ使う。","日常業務は専用の管理者 ID で行う。AWS は人間のユーザーに IAM Identity Center を推奨している。","AWS Budgets は実際のコストまたは予測コストがしきい値を超えるとアラートを送るが、リソースを自動的に停止はしない。","Cost Explorer は過去のコストの表示・絞り込みと予測に使う。Bills ページではサービス別の請求を確認できる。","新規アカウント向けの Free Tier（2025 年 7 月以降）はクレジットベースで、Free plan（課金なし、期限が切れるとアカウントは自動的に閉鎖）と Paid plan（クレジットを超えると課金）がある: 必ず公式ページを読むこと。","Identity Center で AWS アカウントへのアクセス権を付与するには AWS Organizations が必要。Free plan では、Organizations を有効にすると自動的に Paid plan へ切り替わる。"],terms:[["Root user","ルートユーザー。アカウントと同時に作成される、すべての権限を持つ ID"],["MFA (Multi-Factor Authentication)","多要素認証"],["Access key","プログラム/CLI から使うアクセスキー"],["AWS IAM Identity Center","複数アカウントへのシングルサインオンサービス（旧 AWS SSO）"],["Permission set","IAM Identity Center の権限セット"],["AWS access portal","IAM Identity Center のアクセスポータル"],["AWS Budgets","予算を設定してコストのアラートを出すサービス"],["Cost budget","コストベースの予算"],["Forecasted cost","予測コスト"],["AWS Cost Explorer","コストを表示・分析するツール"],["AWS Free Tier","AWS の無料利用枠"],["Credit","クレジット（お試し用の金額）"]]};
L.course["5-2"]={title:"Lab 2: IAM user、group、policy と least privilege",goals:["IAM group を作成し、読み取り専用の AWS managed policy をアタッチする","IAM user を作成して group に追加し、その user で試しにサインインする","least privilege を自分で確かめる: user にできることと拒否されることをはっきり確認する","学習後に user と group をきれいに削除する"],html:`
<h3>おさらい: user、group、policy</h3>
<p><b>IAM</b>（Identity and Access Management、ID とアクセス権の管理）は 2 つの問いに答えます。<b>あなたは誰か</b>、そして<b>あなたは何をしてよいか</b>です。</p>
<ul>
<li><b>IAM user</b>（IAM ユーザー）: 名前を持つ ID で、パスワードで Console にサインインしたり、access key で API を呼び出したりできます。</li>
<li><b>IAM group</b>（グループ）: user の集まりです。グループに権限を付けると、グループ内のすべての user が同じ権限を持ちます。</li>
<li><b>Policy</b>（権限ポリシー）: どのリソースに対してどのアクションを許可（Allow）または禁止（Deny）するかを列挙した JSON 形式のドキュメントです。<b>AWS managed policy</b> は AWS があらかじめ作成し、自動で更新する policy です。</li>
</ul>
<p>黄金律は <b>least privilege</b>（最小権限）です。仕事に必要な権限だけを与え、それ以上は与えません。デフォルトでは、新しい user は<b>何の権限も持っていません</b>。許可する policy が付くまで、すべてが拒否されます。</p>

<div class="box idea"><b>🧠 かんたんに言うと</b>
<p>オフィスの入退室カードを思い浮かべてください。新入社員が受け取るのは白紙のカードで、どのドアも開けられません。人事部がカードを「経理」グループに割り当てると、経理室と会議室は開けられるようになりますが、サーバールームは開けられません。グループ単位で割り当てておけば、新しい経理担当が 20 人入っても、グループに追加するだけで済み、カードを 1 枚ずつ設定する必要はありません。</p>
</div>

<h3>コストと準備</h3>
<p><b>コスト:</b> IAM は無料です。user、group、policy の作成はすべて無料です。このラボでは課金対象のリソースをひとつも作らないので、手順どおりに進めればコストは 0 です。</p>
<p><b>準備:</b></p>
<ul>
<li>Lab 1 を終えていること: ルートに MFA があり、管理者 ID でサインインしている状態です。</li>
<li>ブラウザのプライベートウィンドウ（private/incognito）を 1 つ。管理者アカウントからサインアウトせずに、新しい user で試しにサインインするために使います。</li>
</ul>
<p>注意: 実際の業務で人間が使う場合、AWS は <b>IAM Identity Center</b> の利用を推奨しています。このラボで IAM user を使うのは、user、group、policy の動きを自分の目で確かめるためです。試験ではこれらについて非常によく問われます。user を作成するとき、Console が Identity Center への切り替えを提案してくることがありますが、このラボではそのまま IAM user の作成を選んでください。</p>

<h3>ハンズオンの手順</h3>
<p><b>画面は少し異なる場合があります</b>。機能名で探してください。</p>
<h4>パート A: 読み取り専用権限を持つ group を作成する</h4>
<ol>
<li><b>IAM</b> サービスを開き、<b>User groups</b> を選んで、group の作成をクリックします。</li>
<li>名前を付けます。例: <code>lab-s3-readonly</code>。</li>
<li>policy をアタッチする部分で、AWS managed policy の <code>AmazonS3ReadOnlyAccess</code>（S3 の読み取りのみ可能）を検索して選びます。group を作成します。</li>
<li>選んだ policy を開き、JSON の内容のタブを見てみます。<code>s3:Get</code> と <code>s3:List</code> で始まるアクションが、効果 <code>Allow</code> で並んでいるはずです。見るだけで、変更はできません。</li>
</ol>

<h4>パート B: user を作成して group に追加する</h4>
<ol>
<li>IAM で <b>Users</b> を選び、user の作成をクリックして、名前を付けます。例: <code>lab-viewer</code>。</li>
<li>Console へのアクセスを有効にし、仮のパスワードを設定します（初回サインイン時にパスワード変更を求める設定を有効にしてもかまいません）。</li>
<li>権限を付与するステップでは、<b>user を group に追加</b>を選び、<code>lab-s3-readonly</code> を選択します。user に policy を直接アタッチはしません。</li>
<li>user を作成します。IAM user 用の Console サインインリンク（アカウントの account ID または alias を含むもの）を控えておきます。</li>
</ol>

<h4>パート C: 権限を試す</h4>
<ol>
<li>プライベートウィンドウを開き、IAM のサインインリンクにアクセスして、<code>lab-viewer</code> でサインインします。</li>
<li><b>S3</b> を開きます: bucket の一覧を見ることができます（アカウントに bucket がある場合）。</li>
<li><b>bucket の作成</b>を試します: policy に作成の権限がないため、"Access Denied" のようなメッセージが出て操作は失敗します。</li>
<li><b>EC2</b> を開きます: group には S3 の権限しかないため、権限がない（not authorized）というメッセージがたくさん表示されます。</li>
<li>管理者のウィンドウに戻り、user <code>lab-viewer</code> を開いて権限のタブを見ます。S3 の権限は group から来ており、直接アタッチされてはいません。これがすっきりした管理の方法です。（「初回サインイン時にパスワードを変更」を有効にした場合、user が自分でパスワードを変更できるように、Console が policy <code>IAMUserChangePassword</code> を user に直接追加でアタッチします。これは正常な動作です。）</li>
<li>（任意）user を group から外し、その user でもう一度サインインしてみます。今度は S3 も拒否されます。デフォルトはすべて禁止だからです。</li>
</ol>

<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b>
<p>BanhNgon は経理担当としてハーさんを新たに雇いました。ハーさんは S3 に保存された売上レポートを見る必要がありますが、削除や変更は絶対にできてはいけません。ミンさんは S3 読み取り専用の policy をアタッチした group "ke-toan" を作成し、ハーさんをその group に追加しました。</p>
<p>ある日、ハーさんはうっかりレポートファイルの削除ボタンを押してしまいました。ハーさんには削除の権限がないため、AWS はすぐに拒否しました。ランさんは胸をなで下ろします。least privilege が大切なファイルを救ってくれたのです。</p>
</div>

<h3>なぜ user ごとではなく group に権限を付けるのか</h3>
<p>policy を 1 人ずつ直接アタッチすると、同じ役割の人が 20 人いる場合、同じ作業を 20 回繰り返すことになり、付け忘れや権限の与えすぎが起こりやすくなります。group にアタッチしておけば、修正は 1 か所だけです。誰かが部署を異動したときも、別の group に移すだけで済みます。</p>
<p>あわせて、権限評価のルールも覚えておきましょう。デフォルトは <b>implicit deny</b>（暗黙的な拒否）で、Allow があれば許可されます。ただし、どこかに <b>explicit Deny</b>（明示的な拒否）があれば、常に Deny が優先されます。</p>

<div class="box trap"><b>⚠️ ラボ終了時の後片付け</b>
<ul>
<li><code>lab-viewer</code> からサインアウトし、プライベートウィンドウを閉じます。</li>
<li>user <code>lab-viewer</code> を削除します（Console がパスワードの削除と group からの除外も一緒に行います）。</li>
<li>group <code>lab-s3-readonly</code> を削除します。</li>
<li>AWS managed policy は削除しません（削除できませんし、その必要もありません）。</li>
<li>Users の一覧をもう一度確認します: パスワードや access key が放置されたままのテスト用 user が残っていないこと。</li>
</ul></div>

<div class="box exam"><b>🎯 試験との関連</b>
<ul>
<li>"Grant only the permissions required" → <b>principle of least privilege</b>。</li>
<li>"Most efficient way to give the same permissions to many users" → 適切な policy を持つ <b>IAM group</b> に user を追加する。</li>
<li>"Application on EC2 needs to access S3" → <b>IAM role</b> を使う。access key をコードに埋め込まない。</li>
<li>"Enforce password length/rotation" → <b>IAM password policy</b>。</li>
<li>"Report of all users and credential status" → <b>IAM credential report</b>。</li>
</ul></div>
`,summary:["IAM は「あなたは誰か」（user、group、role）と「あなたは何をしてよいか」（policy）に答える。","新しい user はデフォルトで権限を持たない。explicit Deny は常に Allow より優先される。","user ごとではなく group に policy をアタッチすると、管理がすっきりしてミスが減る。","AWS managed policy は AWS があらかじめ作成したもので、たとえば AmazonS3ReadOnlyAccess は S3 の読み取り専用権限を与える。","Least privilege: 必要な権限だけを付与し、拒否される操作を実際に試して確かめる。","IAM は無料だが、パスワードを放置しないよう、テスト用の user は必ず削除する。"],terms:[["IAM (Identity and Access Management)","ID とアクセス権の管理"],["IAM user","IAM ユーザー"],["IAM group","IAM ユーザーのグループ"],["IAM role","ロール。一時的な権限を持つ ID"],["Policy","JSON 形式の権限ポリシー"],["AWS managed policy","AWS があらかじめ作成し管理する policy"],["Least privilege","最小権限"],["Implicit deny","暗黙的な拒否（デフォルト）"],["Explicit deny","明示的な拒否。常に Allow より優先される"],["Access Denied","アクセスが拒否された"],["Password policy","パスワードポリシー"],["Credential report","user の認証情報に関するレポート"]]};
L.course["5-3"]={title:"Lab 3: Amazon S3 で静的ウェブサイトを公開する",goals:["S3 bucket を作成し、index.html のページをアップロードする","static website hosting を有効にし、公開アクセスを開く手順（Block Public Access、bucket policy）を理解する","bucket を公開することがなぜリスクなのか、そして本番環境では CloudFront が標準的な方法であることを理解する","コストが発生しないように object と bucket を削除する"],html:`
<h3>静的ウェブサイトとは</h3>
<p><b>static website</b>（静的ウェブサイト）は、あらかじめ用意されたファイルだけで構成されます。HTML、CSS、画像、ブラウザ上で動く JavaScript です。サーバーは何も「計算」する必要がなく、閲覧者にファイルを送るだけです。紹介ページ、ケーキのメニュー、問い合わせページが典型的な例です。</p>
<p><b>Amazon S3</b>（Simple Storage Service、オブジェクトストレージサービス）は、ファイルを <b>bucket</b>（バケット、入れ物）に保存します。1 つ 1 つのファイルが <b>object</b>（オブジェクト）です。S3 には <b>static website hosting</b> という機能があり、サーバーを 1 台も使わずに、それらのファイルをウェブサイトとして配信できます。</p>

<div class="box idea"><b>🧠 かんたんに言うと</b>
<p>S3 bucket は<b>ガラスのショーケース</b>のようなものです。デフォルトでは鍵がかかっていて、開けられるのは店主だけです。通りがかりのお客さんにケーキを見てもらいたければ、誰でも見られるようにショーケースの扉を開けなければなりません。開ければ便利ですが、うっかり私的な書類をケースの中に置いていたら、それも全員に見えてしまいます。ですから、本当に公開したいものだけをケースに入れましょう。</p>
</div>

<h3>コストと準備</h3>
<p><b>コスト:</b> S3 はストレージ容量、request 数、インターネットへ出ていくデータ転送量に応じて課金されます。数 KB の HTML ファイル 1 つを数回見る程度なら、コストはほぼ 0 で、アカウントの無料特典の範囲に収まることもあります。ほぼ 0 に保つには、小さなファイルだけをアップロードし、リンクを広く共有せず、<b>終わったらすぐに bucket を削除</b>します。</p>
<p><b>準備:</b></p>
<ul>
<li>Lab 1 を終えていて（アラート用の budget がある）、管理者 ID でサインインしていること。</li>
<li>手元のパソコンにシンプルな <code>index.html</code> ファイルを 1 つ。たとえば次の 1 行だけでかまいません: <code>&lt;h1&gt;BanhNgon へようこそ&lt;/h1&gt;</code>。</li>
</ul>

<h3>ハンズオンの手順</h3>
<p><b>画面は少し異なる場合があります</b>。機能名で探してください。</p>
<ol>
<li><b>S3</b> を開き、bucket の作成をクリックします。自分に近い Region（例: 東京）を選びます。画面右上の Region セレクター、または bucket 作成フォームの中で選べます。bucket の名前は<b>世界中で一意</b>で、小文字・数字・ハイフンのみにします。例: <code>banhngon-lab-yourname-123</code>。</li>
<li><b>Block Public Access</b>（パブリックアクセスのブロック）の項目に注目します。新しい bucket ではデフォルトで<b>有効</b>になっています。ひとまずそのままにして bucket を作成します。</li>
<li>bucket を開いて <b>Upload</b> を選び、<code>index.html</code> ファイルをアップロードします。</li>
<li>bucket の <b>Properties</b> タブを開き、<b>Static website hosting</b> のセクションまでスクロールして、有効化（Enable）を選び、タイプは "Host a static website"、index document に <code>index.html</code> を入力します。保存します。</li>
<li>同じセクションで <b>Bucket website endpoint</b> のリンクをコピーします。ブラウザで開いてみると、<b>403 Forbidden</b> エラーになります。bucket はまだ鍵がかかったままなので、これは期待どおりです。</li>
<li><b>Permissions</b> タブを開き、この bucket の <b>Block Public Access</b> を編集します。<b>Block all public access</b> のチェックを外して、公開用の bucket policy を許可します。Console が警告を出し、確認を求めてきます。警告をよく読んでください。オフにするのは<b>この bucket</b> のレベルだけです。次の手順で公開用 policy を保存するときに Console がまだエラーを出す場合は、アカウントで<b>アカウントレベル</b>の Block Public Access が有効になっている可能性があります（S3 メニューの "Block Public Access settings for this account"）。その場合は、アカウント全体を公開可能にするよりも、手順 5 でラボを止めておくのが最善です。</li>
<li>引き続き Permissions タブで <b>Bucket policy</b> を編集し、すべての人（<code>"Principal": "*"</code>）に対して、<b>ただ 1 つ</b>のアクション <code>s3:GetObject</code>（ファイルの読み取り）だけを、<code>arn:aws:s3:::BUCKET-NAME/*</code> に対して許可します。BUCKET-NAME は自分の bucket 名に置き換えてください。Console には policy 作成ツール（policy generator）や例があるので参考にできます。</li>
<li>website endpoint をもう一度開くと、「BanhNgon へようこそ」のページが表示されます。この endpoint は <b>HTTP</b> だけで、HTTPS には対応していない点に注目してください。</li>
</ol>

<h3>なぜ bucket の公開はリスクなのか</h3>
<p>世界で起きたデータ漏えい事件の非常に多くは、意図せず公開状態になっていた S3 bucket が原因で、そこには顧客のファイル、バックアップファイル、パスワードなどが入っていました。そのため AWS は Block Public Access をデフォルトで有効にし、オフにしようとすると何重にも警告を出します。</p>
<p>このラボでは、bucket に無害な HTML ファイルが 1 つあるだけなのでリスクは小さいです。しかし一般原則として、プライベートなデータを公開コンテンツと一緒に置くことは<b>絶対に</b>避け、読み取り権限（GetObject）だけを与えて、書き込みや削除の権限は与えません。</p>
<p>本番環境での標準的な方法は、bucket を<b>プライベート</b>のままにして、その前段に <b>Amazon CloudFront</b>（コンテンツ配信ネットワーク、CDN）を置くことです。CloudFront は <b>Origin Access Control</b>（OAC）の仕組みによって bucket の読み取りを許可され、ユーザーは CloudFront 経由でのみアクセスします。HTTPS が使えるようになり（AWS Certificate Manager の証明書を利用）、コンテンツは顧客に近い <b>edge location</b> にキャッシュされるので高速になり、さらに AWS WAF を追加することもできます。</p>
<div class="flow"><span>顧客</span><span>CloudFront（HTTPS、edge）</span><span>プライベートな S3 bucket</span></div>

<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b>
<p>ミンさんは、中秋節の月餅メニューのページをできるだけ早くネットに公開したいと考えました。bucket を 1 つ作成し、HTML ページとケーキの写真をアップロードして、static website hosting を有効にします。かかった時間はわずか 10 分で、サーバーは 1 台も必要ありませんでした。</p>
<p>日本のお客さんも見るようになると、ミンさんは CloudFront に切り替えました。bucket は再び非公開に戻り、ページは HTTPS で動き、ケーキの写真は東京に近い edge location からより速く読み込まれます。注文のバックアップファイルを入れる bucket は別に分け、決して公開しません。</p>
</div>

<div class="box trap"><b>⚠️ ラボ終了時の後片付け</b>
<ul>
<li>bucket を開き、すべての object を選んで<b>削除</b>します（または bucket の <b>Empty</b> 機能を使います）。bucket は空でなければ削除できません。</li>
<li>Versioning を有効にしていた場合は、古いバージョンも忘れずに削除します（Empty bucket が処理してくれます）。</li>
<li><b>bucket を削除</b>します（Console は確認のために bucket 名の再入力を求めます）。</li>
<li>bucket の一覧を確認します（S3 の Console は、すべての Region の bucket を同じページに表示します）: テスト用の bucket が残っていないこと。website endpoint をもう一度開きます: 今度はエラーになり、ページは表示されないはずです。</li>
<li><b>アカウントレベル</b>で Block Public Access をオフにしていた場合（非推奨）は、再び有効にします。</li>
<li>CloudFront distribution の作成を試した場合は、それを別途 disable してから delete する必要があります。</li>
</ul></div>

<div class="box exam"><b>🎯 試験との関連</b>
<ul>
<li>"Host a static website without servers" → <b>Amazon S3 static website hosting</b>。</li>
<li>"Cache static content at edge locations, reduce latency globally" → <b>Amazon CloudFront</b>（<b>edge locations</b> を利用）。</li>
<li>"Factors that affect S3 cost" → ストレージ容量、request 数、インターネットへの <b>data transfer out</b>。</li>
<li>"Encrypt data in transit for a website" → HTTPS/TLS、<b>AWS Certificate Manager</b> の証明書。</li>
<li>bucket policy と Block Public Access は、shared responsibility model（責任共有モデル）における<b>お客様</b>の責任範囲です。</li>
</ul></div>
`,summary:["S3 static website hosting は、サーバーなしで HTML/CSS/画像ファイルを配信する。","新しい bucket ではデフォルトで Block Public Access が有効。公開するまで、パブリックアクセスは 403 エラーになる。","公開するには、Block Public Access をオフにし、s3:GetObject だけを許可する bucket policy を追加する必要がある。","公開された bucket はデータ漏えいのよくある原因: プライベートなデータを公開コンテンツと一緒に置かない。","本番環境での標準的な方法: プライベートな bucket + CloudFront（OAC、HTTPS、edge でのキャッシュ）。","後片付け: bucket を Empty してから bucket を削除する。"],terms:[["Static website","静的ウェブサイト。あらかじめ用意されたファイルだけで構成される"],["Bucket","バケット。S3 の入れ物"],["Object","オブジェクト。S3 に保存された 1 つのファイル"],["Static website hosting","静的ウェブサイトのホスティングと配信"],["Block Public Access","パブリックアクセスのブロック"],["Bucket policy","bucket にアタッチする権限ポリシー"],["Website endpoint","bucket のウェブサイトにアクセスするためのアドレス"],["403 Forbidden","アクセス禁止のエラー"],["CDN (Content Delivery Network)","コンテンツ配信ネットワーク"],["Origin Access Control (OAC)","CloudFront がプライベートな bucket を読み取るための仕組み"],["Edge location","エッジロケーション。CloudFront がコンテンツをキャッシュする拠点"],["Data transfer out","AWS の外へ出ていくデータ転送"]]};
L.course["5-4"]={title:"Lab 4: EC2 サーバーを 1 台起動して後片付けする",goals:["小さな EC2 instance を起動する。Console に無料お試しのラベルが表示されていれば、そのタイプを優先する","key pair と EC2 Instance Connect の違いを理解し、必要なポートだけを開くように security group を設定する","サーバーに接続し、CloudWatch で基本的な metric を見る","instance を terminate し、EBS volume や Elastic IP が残っていないことを確認する"],html:`
<h3>EC2 とは何か、ごく短くおさらい</h3>
<p><b>Amazon EC2</b>（Elastic Compute Cloud）は、<b>instance</b> と呼ばれる<b>仮想サーバー</b>を借りられるサービスです。<b>AMI</b>（Amazon Machine Image、マシンのテンプレートイメージ）で OS を選び、<b>instance type</b>（マシンのタイプ。たとえば CPU と RAM の量）でスペックを選んで、数分で起動できます。マシンのディスクは <b>EBS volume</b>（ネットワーク経由で接続するブロックストレージ）です。</p>
<p>これは、片付けを忘れると最もコストが発生しやすいラボです。サーバーは動いているかぎり時間に応じて課金され続けるからです。始める前に、後片付けの部分をよく読んでください。</p>

<div class="box idea"><b>🧠 かんたんに言うと</b>
<p>EC2 を借りるのは、<b>ホテルの部屋を借りる</b>ようなものです。泊まった分だけ支払います。<b>Stop</b>（停止）は、部屋と荷物をそのままにして一時的に外出するようなものです。「ベッド」代はかからなくなりますが、荷物の保管料（EBS ディスク）は払い続けます。<b>Terminate</b>（終了）は完全にチェックアウトするようなものです。ホテルが部屋をきれいに片付け、それ以上の支払いはありません。<b>Security group</b> は部屋の入口に立つ警備員で、リストに名前がある人だけを通します。</p>
</div>

<h3>コストと準備</h3>
<p><b>コスト:</b> EC2 は instance の稼働時間（instance type による）に加えて、EBS の容量、そして<b>パブリック IPv4 アドレス</b>に対して課金されます（現在、AWS は public IPv4 に時間単位で課金しています。稼働中のマシンに関連付けられていない Elastic IP も課金されます）。一部の小さな instance type には、Console で "Free tier eligible" のようなラベルが付いており、アカウントの条件に応じて無料特典の対象になったり、クレジットから差し引かれたりします。EC2 のドキュメントによると、<b>2025 年 7 月 15 日</b>以降に作成されたアカウントでは <b>t3.micro、t3.small、t4g.micro、t4g.small、c7i-flex.large、m7i-flex.large</b> が対象で、それより前に作成されたアカウントでは <b>t2.micro または t3.micro</b>（Region による）が対象です。一覧は変わる可能性があるので、自分自身の <b>Console に表示される "Free tier eligible" ラベルを信頼してください</b>。ほぼ 0 に保つには、特典ラベルの付いた最も小さい instance を選び、デフォルトのディスクを使い、短時間だけ動かして、<b>終わったらすぐに terminate</b> します。</p>
<p><b>準備:</b></p>
<ul>
<li>Lab 1 のアラート用 budget があること。</li>
<li>管理者 ID でサインインし、自分に近い Region を 1 つ選んで、<b>その Region を覚えておく</b>こと（EC2 は選択中の Region のリソースしか表示しません）。</li>
</ul>

<h3>Key pair か、EC2 Instance Connect か</h3>
<p>Linux マシンにログインするには、通常 <b>SSH</b>（マシンをリモート操作するプロトコル、ポート 22）を使います。</p>
<ul>
<li><b>Key pair</b>（キーペア）: AWS が公開鍵を保持し、あなたは秘密鍵（private key）のファイルをダウンロードします。ファイルを失くすとこの方法では入れなくなり、ファイルが漏れると他人が入れてしまいます。</li>
<li><b>EC2 Instance Connect</b>: Console からブラウザ上でそのまま SSH 接続します。AWS が有効期間の短い一時的な鍵を送り込むので、鍵ファイルを保管する必要がありません。Amazon Linux には必要なコンポーネントが最初から入っています。注意: ブラウザ型の接続は、その Region の Instance Connect サービスの IP 範囲から出ていくため、security group でその範囲からのポート 22 を許可する必要があります。AWS には <b>managed prefix list</b>（AWS が管理する IP 範囲のリスト）が用意されており、名前は <code>com.amazonaws.REGION-NAME.ec2-instance-connect</code> の形式です。たとえば東京なら <code>com.amazonaws.ap-northeast-1.ec2-instance-connect</code> です。この接続方法では、instance に <b>public IPv4</b> があることも必要です（時間単位で課金されます。コストの項を参照）。</li>
</ul>
<p>このほかに <b>AWS Systems Manager Session Manager</b> もあります。SSH ポートを開かずに接続できますが、マシンに IAM role を設定する必要があります。これはあとで調べてみてください。</p>

<h3>ハンズオンの手順</h3>
<p><b>画面は少し異なる場合があります</b>。機能名で探してください。</p>
<ol>
<li><b>EC2</b> を開き、<b>Launch instance</b> を選びます。名前を付けます。例: <code>banhngon-lab</code>。</li>
<li>AMI は <b>Amazon Linux</b>（Console が提案する最新版）を選びます。</li>
<li>Console に表示されていれば、無料特典のラベルが付いた小さな instance type を選びます。ラベルが見当たらない場合は、最も小さいタイプを選び、早めに止めることを忘れないようにします。</li>
<li>key pair の部分: 新しい key pair を作成してファイルをダウンロードするか（予備の手段を残すため）、Instance Connect だけを使うなら key pair なしで続行を選びます。</li>
<li>network settings の部分では、VPC/subnet はデフォルトのままにし、<b>Auto-assign public IP</b> も有効のままにします（接続の手順で必要です）。新しい <b>security group</b> を作成します。<b>inbound の SSH ポート 22 のルールを 1 つだけ</b>にします。ウィザードは通常、ソースとして <b>Anywhere</b>（<code>0.0.0.0/0</code>、インターネット上のあらゆる場所）をあらかじめ提案してきますが、<b>これは変更してください</b>。手順 8 ではブラウザ上の EC2 Instance Connect を使うので、ソースに <b>Custom</b> を選び、その Region の prefix list <code>ec2-instance-connect</code> を選択します。（自分のパソコンから key pair で SSH する場合は "My IP" を選びます。ただし "My IP" ではブラウザ上の Instance Connect 接続は<b>できません</b>。）ほかのポートは<b>開けません</b>。ウィザードで prefix list を選びにくい場合は、Launch のあとで security group のルールを編集してもかまいません。</li>
<li>ディスクはデフォルトのままにし、root volume の <b>Delete on termination</b> オプションが有効になっていることを確認します。Launch をクリックします。</li>
<li>状態が <b>Running</b> に変わり、status check が合格するまで待ちます。</li>
<li>instance を選んで <b>Connect</b> をクリックし、<b>EC2 Instance Connect</b> タブを選んで接続します。コマンドラインのウィンドウが開きます。試しに <code>whoami</code> と <code>uptime</code> を入力してみます。</li>
<li>終了して instance の画面に戻り、<b>Monitoring</b> タブを開いて、CPU や network のグラフを見ます。これは <b>Amazon CloudWatch</b> の metric です。デフォルトは basic monitoring で、データは 5 分間隔です。RAM は標準では取得できず、agent のインストールが必要です。</li>
</ol>

<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b>
<p>ミンさんは、ケーキ注文ページの試作版を動かすために EC2 サーバーを 1 台立ててみました。最初は手早く済ませようと、security group をすべてのポートで「あらゆる場所」に開けてしまいました。数時間後、ログは世界中からのパスワード総当たりの試行でいっぱいになっていました。</p>
<p>ミンさんは設定を直し、ポート 22 を必要な IP 範囲にだけ開けるようにしました。その夜、マシンを terminate するのを忘れてしまいます。翌朝、AWS Budgets（Lab 1）からのアラートメールが気づかせてくれました。それ以来、ミンさんは試し終わったらすぐに後片付けのチェックリストを実行するようにしています。</p>
</div>

<div class="box trap"><b>⚠️ ラボ終了時の後片付け（全ラボの中で最も重要）</b>
<ul>
<li>instance を選び、<b>Instance state → Terminate</b> を選びます（Stop ではありません）。Stop では EBS ディスク（および、あれば Elastic IP）の料金がかかり続けます。</li>
<li>状態が <b>Terminated</b> に変わるまで待ちます（instance はしばらく一覧に残ったあと、自動的に消えます）。</li>
<li><b>Elastic Block Store → Volumes</b> を開きます: このラボの volume が "available" 状態で残っていないこと。残っていれば削除します。</li>
<li><b>Snapshots</b> を開きます: snapshot を作成していた場合は削除します。</li>
<li><b>Elastic IPs</b> を開きます: 割り当てていた場合は <b>release</b>（解放）します。使っていない Elastic IP にも料金がかかります。</li>
<li>もう使わないなら、このラボの security group <code>launch-wizard</code> と key pair を削除します（無料ですが、整理しておくのがよいでしょう）。</li>
<li>使用した <b>Region</b> で確認しているか、もう一度チェックします。自信がなければ、Bills ページを見るか、EC2 Global View を使って探します。</li>
</ul></div>

<div class="box exam"><b>🎯 試験との関連</b>
<ul>
<li>"Example of IaaS" → <b>Amazon EC2</b>: OS、パッチ、設定はお客様が管理します。</li>
<li>"Security groups" → <b>stateful</b> で、<b>instance</b> レベルで動作し、allow ルールしかありません。その設定は<b>お客様</b>の責任です。</li>
<li>"Block storage for EC2" → <b>Amazon EBS</b>。"temporary storage attached to the host" → <b>instance store</b>。</li>
<li>"Alarm when CPU stays high" → <b>Amazon CloudWatch</b>。</li>
<li>"Instances use under 10% CPU, change to smaller type" → <b>rightsizing</b>。コスト最適化の提案 → <b>Trusted Advisor</b>、<b>Compute Optimizer</b>。</li>
</ul></div>
`,summary:["EC2 = 仮想サーバー: AMI、instance type、EBS ディスク、security group を選ぶ。","Key pair は自分で保管する秘密鍵ファイル。EC2 Instance Connect はブラウザ経由で一時的な鍵を使う。","Security group は instance レベルの stateful なファイアウォール: 必要なポートを、必要なソースにだけ開ける。","CloudWatch は instance の CPU や network の metric を表示する。basic monitoring は 5 分間隔。","課金を止めるには Terminate する（Stop ではない）。そのあと EBS volume、snapshot、Elastic IP を確認する。","Public IPv4 も、使っていない Elastic IP も、料金が発生することがある。"],terms:[["Instance","EC2 の仮想サーバー 1 台"],["AMI (Amazon Machine Image)","マシンを作成するための OS のテンプレートイメージ"],["Instance type","マシンのスペックのタイプ（CPU、RAM）"],["EBS volume","EC2 にアタッチするブロックストレージのディスク"],["Key pair","ログインに使う公開鍵/秘密鍵のペア"],["SSH (Secure Shell)","マシンを安全にリモート操作するプロトコル"],["EC2 Instance Connect","Console から一時的な鍵で SSH 接続する機能"],["Security group","instance レベルの仮想ファイアウォール"],["Inbound rule","入ってくるトラフィックに対するルール"],["Elastic IP","固定のパブリック IPv4 アドレス"],["Stop / Terminate","instance の一時停止 / 完全な削除"],["Delete on termination","instance が terminate されたときにディスクを自動削除する設定"],["Metric","メトリクス（測定指標）"]]};
L.course["5-5"]={title:"Lab 5: はじめての Lambda 関数とログの確認",goals:["Console 上で直接、Python または Node.js の 'hello world' AWS Lambda 関数を作成する","test event で関数を試しに実行し、CloudWatch Logs でログを読む","自分が実行したばかりの API コールが CloudTrail Event history に記録されていることを確認する","学習後に関数と log group を削除する"],html:`
<h3>Serverless と Lambda をかんたんに</h3>
<p>Lab 4 では、マシンを選び、ポートを開け、マシンを止めるのを忘れないようにする必要がありました。<b>AWS Lambda</b> では、<b>function</b>（関数）と呼ばれるコードを書くだけです。サーバーの部分はすべて AWS が引き受けます。イベントが発生したらコードを実行し、リクエストが増えたら自動的にスケールし、料金は<b>呼び出し回数</b>と<b>実行時間</b>に応じて支払います。誰も呼び出さなければ、ほとんど何もかかりません。これが <b>serverless</b>（サーバーレス: サーバーは存在するが、自分で管理しなくてよい）の意味です。</p>
<p>Lambda には、1 回の実行につき最大 15 分という制限があります。それより長くかかる処理には、別のサービスが必要です。</p>

<div class="box idea"><b>🧠 かんたんに言うと</b>
<p>EC2 は<b>フルタイムのシェフを自分で雇う</b>ようなものです。お客さんが来ても来なくても給料を払います。Lambda は<b>注文ごとにシェフを呼ぶ</b>ようなものです。注文が入るとシェフが来て調理し、終われば帰ります。支払いは料理の数と調理時間に応じて決まります。CloudWatch Logs は<b>厨房の業務日誌</b>、CloudTrail は<b>オフィスの入口にある防犯カメラ</b>で、誰がシェフの雇用や解雇を指示したかを記録します。</p>
</div>

<h3>コストと準備</h3>
<p><b>コスト:</b> Lambda は request 数と実行時間（設定したメモリ量に応じる）で課金されます。Lambda には毎月の無料利用分があり、数回試しに実行する程度ならほとんど何もかかりません。<b>CloudWatch Logs</b> は書き込まれたログの量と保存量に応じて課金されますが、数行のログならごくわずかです。<b>CloudTrail Event history</b> は最初から有効で、無料で閲覧できます。ほぼ 0 に保つには、数回だけ試しに実行し、公開の trigger を付けず、終わったら関数と log group を削除します。</p>
<p><b>準備:</b> Lab 1 を終えていること、管理者 ID でサインインしていること、Region を 1 つ選んでその Region を覚えておくこと。</p>

<h3>ハンズオンの手順</h3>
<p><b>画面は少し異なる場合があります</b>。機能名で探してください。</p>
<h4>パート A: 関数を作成して試しに実行する</h4>
<ol>
<li><b>Lambda</b> を開き、function の作成をクリックして、<b>Author from scratch</b>（一から作成）を選びます。</li>
<li>名前を付けます。例: <code>banhngon-hello</code>。runtime は <b>Python</b>（最新の 3.x 版）または <b>Node.js</b> を選びます。</li>
<li>権限の部分はデフォルトのままにします。Lambda が、CloudWatch にログを書き込むための基本的な権限を持つ <b>execution role</b>（関数用の IAM role）を自動的に作成します。function を作成します。</li>
<li>コードエディタで、サンプルの関数を編集して、ログを 1 行出力し、あいさつを返すようにします。Python の場合、関数は <code>def lambda_handler(event, context):</code> の形で、その中に <code>print("Hello from BanhNgon")</code> を書き、<code>statusCode</code> が 200 の dict を返します。<b>Deploy</b> をクリックして保存します。</li>
<li><b>Test</b> を選び、test event を作成して（サンプルの JSON のままでかまいません）、名前を付けて実行します。</li>
<li>結果を見ます。response の部分は関数が返した値です。ログの部分には、自分が出力した行と、実行時間と使用メモリを記録した REPORT 行があります。この実行時間こそが課金の基準です。</li>
</ol>

<h4>パート B: CloudWatch Logs でログを見る</h4>
<ol>
<li>関数のページで <b>Monitor</b> タブを開き、CloudWatch でログを表示するオプションを選びます（または <b>CloudWatch → Logs → Log groups</b> サービスを直接開きます）。</li>
<li><b>log group</b> を探します。名前は <code>/aws/lambda/banhngon-hello</code> の形式です。その中に複数の <b>log stream</b> があり、各 stream に実行ごとのログが入っています。</li>
<li>最新の stream を開き、"Hello from BanhNgon" の行を探します。test をもう 1 回実行して画面を更新すると、新しいログが現れるのが分かります。</li>
</ol>

<h4>パート C: CloudTrail Event history を見る</h4>
<ol>
<li><b>CloudTrail</b> を開き、<b>Event history</b> を選びます。ここには、何も設定しなくても、直近 90 日間の管理イベント（management events）が保存されています。</li>
<li>関数を作成した<b>正しい Region</b> にいることを確認します。フィルター欄で <b>Event source</b> を選び、<code>lambda.amazonaws.com</code> と入力します（または <b>Resource name</b> を選び、<code>banhngon-hello</code> と入力します）。フィルター欄には<b>値全体を正確に</b>入力する必要があります。関数作成の実際のイベント名にはバージョンの接尾辞が付いていて <code>CreateFunction20150331</code> のような形になるため、event source で絞り込むほうが簡単です。イベントが表示されるまで数分かかることがあります。</li>
<li>イベントを開くと、<b>誰が</b>呼び出したか（あなたの管理者 ID）、<b>いつ</b>、<b>どの IP から</b>、どの API を呼び出したかが分かります。関数用の IAM role を作成したイベント（<code>CreateRole</code>）を見たい場合は、Region を <b>US East (N. Virginia)</b> に切り替えます。IAM はグローバルサービスなので、そのイベントはこの Region に記録されます。</li>
<li>注目点: <b>関数の実行</b>（Invoke）は <b>data event</b> であり、デフォルトでは Event history に含まれません。Event history が主に記録するのは、リソースの作成・変更・削除といった管理操作です。</li>
</ol>

<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b>
<p>ミンさんは、新しいケーキの注文が入るたびにお礼のメッセージを送る Lambda 関数を書きました。ある日、関数がエラーを出します。ミンさんは CloudWatch Logs を開いてエラーの行を読み、5 分で修正できました。</p>
<p>翌週、関数が突然消えてしまいました。ミンさんが CloudTrail Event history を開いて DeleteFunction イベントで絞り込むと、インターンのアカウントが誤って削除していたことが分かりました。誰も当て推量をする必要はありません。CloudTrail が「誰が、いつ、何をしたか」という問いに答えてくれます。</p>
</div>

<div class="box trap"><b>⚠️ ラボ終了時の後片付け</b>
<ul>
<li>Lambda で関数 <code>banhngon-hello</code> を選び、<b>削除</b>します。</li>
<li>関数を削除してもログは自動では削除<b>されません</b>。<b>CloudWatch → Log groups</b> を開き、log group <code>/aws/lambda/banhngon-hello</code> を削除します。</li>
<li><b>IAM → Roles</b> を開き、Lambda がこの関数用に自動作成した execution role を削除します（名前は通常、関数名で始まり、<code>banhngon-hello-role-...</code> のような形です）。<b>IAM → Policies</b>（"Customer managed" で絞り込み）に、同時に作成された <code>AWSLambdaBasicExecutionRole-...</code> という形式の名前の policy があれば、それも削除します。AWS が管理する policy は削除できません（削除する必要もありません）。</li>
<li>trigger（API Gateway、S3、EventBridge など）を追加していた場合は、それらのリソースも削除します。</li>
<li>CloudTrail Event history を削除する必要はありません。デフォルトの機能で無料ですし、あなたの削除イベント自体もそこに記録されます。</li>
</ul></div>

<div class="box exam"><b>🎯 試験との関連</b>
<ul>
<li>"Run code without provisioning servers, pay only for compute time" → <b>AWS Lambda</b>。</li>
<li>"Job runs about 3 hours continuously" → Lambda は<b>使いません</b>（最大 15 分）。</li>
<li>"Which services are serverless" → Lambda、DynamoDB、Fargate など。</li>
<li>Lambda では、お客様は関数の<b>コードと IAM 権限</b>に責任を負い、AWS がインフラと OS を担当します。</li>
<li>"Who did what, when (API calls), who deleted a resource" → <b>AWS CloudTrail</b>。"Metrics, logs, alarms" → <b>Amazon CloudWatch</b>。</li>
</ul></div>
`,summary:["Lambda はイベントに応じてコードを実行し、サーバーの管理は不要で、request 数と実行時間で課金される。1 回の実行は最大 15 分。","Execution role は関数用の IAM role。デフォルトの権限で CloudWatch Logs へのログ書き込みには十分。","関数のログは log group「/aws/lambda/ + 関数名」にあり、複数の log stream に分かれている。","CloudTrail Event history は 90 日分の management event を記録し、最初から有効: 誰が、いつ、どこから、どの API を呼び出したか。","CloudWatch = metric、log、alarm（システムがどう動いているか）。CloudTrail = API 呼び出しの履歴（誰が何をしたか）。","後片付け: 関数を削除し、log group を削除し（自動では消えない）、execution role を削除する。"],terms:[["Serverless","サーバーレス。サーバーを自分で管理しなくてよい"],["Function","関数。Lambda 上で実行されるコードの単位"],["Runtime","コードを実行する言語環境（Python、Node.js など）"],["Handler","実行時に Lambda から呼び出される関数"],["Test event","関数を試しに実行するためのサンプルイベント"],["Execution role","Lambda 関数に権限を与える IAM role"],["Trigger","関数を起動するイベントソース"],["Log group","CloudWatch Logs のロググループ"],["Log stream","log group 内のログストリーム"],["Event history","CloudTrail の 90 日間のイベント履歴"],["Management event","管理イベント（リソースの作成・変更・削除）"],["Data event","データイベント（関数の呼び出し、object の読み取りなど）"]]};
})();
