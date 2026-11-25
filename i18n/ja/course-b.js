(function(){var I=window.CLF_I18N=window.CLF_I18N||{};var L=I.ja=I.ja||{};['q','course','lessons','glossary','services','domains','ui'].forEach(function(k){L[k]=L[k]||{};});
L.course["2-1"]={title:"責任共有モデル (Shared Responsibility Model)",goals:["\"security OF the cloud\"（AWS の責任）と \"security IN the cloud\"（お客様の責任）を区別できる","EC2、RDS、Lambda、S3 を使うときに責任範囲がどう変わるかが分かる","shared controls の 3 つのグループ（patch management、configuration management、awareness & training）を理解する","「これは AWS の責任か、お客様の責任か」という問題にすばやく答えられる"],html:`
<h3>なぜセキュリティの責任を「分ける」のか</h3>
<p>自分でコンピューターを買って自宅に置き、Web サイトを動かす場合は、<b>すべて</b>が自分の仕事です。サーバールームの施錠、壊れたハードディスクの交換、ウイルス対策ソフトのインストール、パスワードの設定、データのバックアップ。誰も代わりにやってくれません。</p>
<p>クラウドに移行すると、AWS のインフラを<b>借りる</b>ことになります。セキュリティの仕事の一部は AWS が担い、残りは引き続きあなたの仕事です。この 2 つの境界を AWS は <b>Shared Responsibility Model</b>（責任共有モデル）と呼んでいます。</p>
<p>これは<b>試験に必ず出る</b>テーマの 1 つです。問題はたいていとても短く、「X という作業は AWS の責任か、お客様の責任か」という形です。このレッスンをしっかり押さえれば、数問は確実に得点できます。</p>

<div class="box idea"><b>🧠 かんたんに言うと</b><p>賃貸マンションの一室を借りる場面を想像してください。<b>建物のオーナー</b>は、基礎、外壁、エレベーター、エントランスの警備、共用の電気・水道設備を担当します。<b>あなた</b>（入居者）は、自分の部屋の鍵をかけること、誰に鍵を渡すかを決めること、貴重品を金庫にしまうこと、ガスコンロの火を出さないことを担当します。鍵をかけ忘れて物を盗まれても、それは建物のオーナーの落ち度ではありません。</p><p>AWS が建物のオーナーで、あなたが入居者です。</p></div>

<h3>Security OF the cloud と security IN the cloud</h3>
<p>AWS はこのモデルを、覚えやすい 2 つのフレーズでまとめています。</p>
<ul>
<li><b>Security OF the cloud</b>（クラウド<i>「の」</i>セキュリティ）は <b>AWS</b> の責任です。クラウドそのものを構成するインフラを守ることを指します。データセンター（data center）の建物、物理サーバー、ハードディスク、ネットワークケーブル、電源・冷却設備、仮想化ソフトウェア（<b>hypervisor</b>。1 台の物理サーバーを複数の仮想マシンに分割するソフトウェア層）、そしてリージョン、アベイラビリティーゾーン、エッジロケーションを結ぶグローバルネットワークです。</li>
<li><b>Security IN the cloud</b>（クラウド<i>「内の」</i>セキュリティ）は<b>お客様</b>の責任です。クラウドに置くもの、クラウド上で設定するものを守ることを指します。自分のデータ、誰がサインインして何をできるか（IAM）、ファイアウォールの設定（security group）、データを暗号化するかどうか、EC2 仮想マシン上のオペレーティングシステム、自分でインストールするアプリケーションです。</li>
</ul>
<table>
<tr><th>AWS の担当 (OF the cloud)</th><th>お客様の担当 (IN the cloud)</th></tr>
<tr><td>データセンターの物理セキュリティ: 警備員、監視カメラ、入退室管理</td><td>お客様のデータと、その分類・暗号化</td></tr>
<tr><td>ハードウェア: サーバー、ハードディスク、ネットワーク機器。古いハードディスクの交換と廃棄</td><td>ユーザー、アクセス権限、パスワード、MFA の管理 (IAM)</td></tr>
<tr><td>Hypervisor と仮想化インフラ</td><td>EC2 上のゲスト OS (guest OS): パッチ適用、設定</td></tr>
<tr><td>グローバルネットワーク、リージョン、AZ、エッジロケーション</td><td>security group、network ACL、OS 内のファイアウォールの設定</td></tr>
<tr><td>マネージドサービス（RDS、Lambda、S3 など）の基盤ソフトウェア</td><td>自分のアプリケーションとソースコード、暗号化の有効化、S3 のアクセス権限の設定</td></tr>
</table>

<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>BanhNgon の Web サイトがまだ倉庫のパソコンで動いていた頃、ネズミが電源コードをかじって切ってしまい、午前中ずっとサイトが止まったことがありました。Minh は自分で新しいコードを買いに行くしかありませんでした。AWS に移行してからは、電源、ケーブル、ハードディスクの故障は AWS の仕事です。</p><p>それでも Minh が自分でやらなければならないことがあります。アカウントに強力なパスワードを設定すること、販売スタッフにパスワードを共有しないこと、EC2 サーバーの OS にパッチを適用すること、そして S3 上の請求書画像のフォルダを公開状態にしないことです。Minh がうっかり請求書フォルダを公開してしまっても、AWS は責任を<b>負いません</b>。</p></div>

<h3>サービスの種類によって責任範囲が変わる</h3>
<p>境界は固定ではありません。サービスが <b>managed</b>（AWS があらかじめ管理してくれる）であるほど AWS の担当が増え、あなたの担当は減ります。試験によく出る 4 つのサービスを比べてみましょう。</p>
<ul>
<li><b>Amazon EC2</b>（仮想サーバー）: 「空っぽのコンピューター」を 1 台借りるイメージです。AWS はハードウェアと hypervisor を担当します。あなたは OS、パッチ、追加でインストールするソフトウェア、ファイアウォール、データを担当します。これは <b>IaaS</b>（Infrastructure as a Service、サービスとしてのインフラ）にあたり、あなたの負担が最も大きくなります。</li>
<li><b>Amazon RDS</b>（マネージド型のリレーショナルデータベース）: AWS はさらに、基盤の OS、データベースソフトウェアのインストールとパッチ適用、自動バックアップの仕組みまで担当します。あなたが担当するのは、<b>データベースアカウント</b>を作成して各アカウントに必要な権限だけを与えること、データベースのパスワード、暗号化を有効にするかどうか、security group（どの接続元からデータベースに接続できるか）、そして中に入っているデータです。</li>
<li><b>AWS Lambda</b>（サーバーを管理せずにコードを実行する <b>serverless</b>）: AWS はサーバー、OS、実行環境（runtime）、スケーリングを担当します。あなたが担当するのは、関数の<b>ソースコード</b>、関数の IAM 権限、関数が処理するデータだけです。</li>
<li><b>Amazon S3</b>（ファイルの保存）: AWS はストレージのインフラとデータの耐久性を担当します。あなたが担当するのは、誰がバケットを読み書きできるか（bucket policy、パブリックアクセスのブロック）、暗号化するかどうか、versioning を有効にするかどうか、そしてファイルの内容です。</li>
</ul>
<table>
<tr><th>必要な作業</th><th>EC2</th><th>RDS</th><th>Lambda</th><th>S3</th></tr>
<tr><td>ハードウェア、データセンター</td><td>AWS</td><td>AWS</td><td>AWS</td><td>AWS</td></tr>
<tr><td>OS のパッチ適用</td><td><b>お客様</b></td><td>AWS</td><td>AWS</td><td>AWS</td></tr>
<tr><td>データベースソフトウェア / runtime のパッチ適用</td><td><b>お客様</b>（自分でインストールした場合）</td><td>AWS</td><td>AWS</td><td>該当なし</td></tr>
<tr><td>ネットワークファイアウォール (security group) の設定</td><td><b>お客様</b></td><td><b>お客様</b></td><td>必須ではない</td><td>該当なし</td></tr>
<tr><td>アプリケーションのソースコード</td><td><b>お客様</b></td><td><b>お客様</b></td><td><b>お客様</b></td><td>該当なし</td></tr>
<tr><td>アクセス権限 (IAM、policy)</td><td><b>お客様</b></td><td><b>お客様</b></td><td><b>お客様</b></td><td><b>お客様</b></td></tr>
<tr><td>データと暗号化の有効化</td><td><b>お客様</b></td><td><b>お客様</b></td><td><b>お客様</b></td><td><b>お客様</b></td></tr>
</table>
<p>最後の 2 行に注目してください。<b>データ</b>（データの分類、保護方法の選択）と<b>アクセス権限</b>（どの ID がどのリソースを読み書きできるか）は、どのサービスを使っても、<b>Amazon DynamoDB</b> のような「非常に managed な」サービスであっても、常にお客様の責任です。あなたのデータを誰が見られるかを AWS が勝手に決めることは決してありません。</p>
<h4>試験でよく出されるケース</h4>
<ul>
<li><b>コンテナ: ECS on EC2 → AWS Fargate</b>。EC2 を使う ECS では、コンテナを動かすサーバーのパッチ適用と堅牢化（harden）を自分で行う必要があります。<b>Fargate</b>（コンテナを serverless で実行）に移ると、基盤のサーバーと OS は AWS が担当します。コンテナイメージ、コード、IAM 権限は引き続きあなたの担当です。</li>
<li><b>バックアップ (backup)</b>: AWS はハードウェア障害に備えて EBS ボリュームを 1 つの AZ 内で複製しますが、誤って削除した場合やアプリケーションが原因でデータが壊れた場合には、それでは<b>救えません</b>。復元のために <b>snapshot</b> やバックアップを作成するのは<b>お客様</b>の仕事です。</li>
<li><b>AWS Outposts</b>（お客様の施設内に設置する AWS のハードウェアラック）: ラックのハードウェアとソフトウェアは引き続き AWS が担当しますが、<b>ラック設置場所の物理セキュリティと入退室管理</b>は<b>お客様</b>に移ります。AWS のデータセンターではなく、お客様の建物の中にあるからです。</li>
</ul>

<div class="box trap"><b>⚠️ よくあるひっかけ</b><p><b>"Patching"（パッチ適用）</b>は最も間違えやすいポイントです。<b>EC2</b> 上の OS のパッチ適用は<b>お客様</b>の責任です。<b>RDS</b> の OS と database engine のパッチ適用は <b>AWS</b> の責任です（あなたはメンテナンスの時間帯を選ぶだけです）。試験ではサービス名を入れ替えて、あなたを試してきます。</p><p>もう 1 つのひっかけは「データの暗号化」です。AWS は暗号化の<b>ツールを提供</b>しますが、自分のデータの暗号化を<b>有効にして管理する</b>のは、やはりお客様の責任です。</p></div>

<h3>Shared controls: 双方がともに行う作業</h3>
<p><b>AWS とお客様の両方</b>が行わなければならないものの、それぞれが自分の範囲で行う種類の作業があります。AWS はこれを <b>shared controls</b>（共有される統制）と呼んでいます。試験でよく取り上げられるのは次の 3 つです。</p>
<ul>
<li><b>Patch management</b>（パッチ管理）: AWS は AWS のインフラにパッチを適用します。お客様は自分のゲスト OS とアプリケーションにパッチを適用します。</li>
<li><b>Configuration management</b>（構成管理）: AWS はインフラ機器を正しく設定します。お客様は自分の OS、データベース、アプリケーションを正しく設定します。</li>
<li><b>Awareness &amp; training</b>（意識向上とトレーニング）: AWS は AWS の従業員を教育します。お客様は自社の従業員を教育します（例: 不審なリンクをクリックしない、パスワードを共有しない）。</li>
</ul>
<p>混同しないように、AWS のドキュメントにある 3 種類の control を覚えておきましょう。</p>
<table>
<tr><th>control の種類</th><th>意味</th><th>例</th></tr>
<tr><td><b>Inherited controls</b>（継承される統制）</td><td>お客様が AWS から<b>完全に</b>継承するもので、何もする必要がありません。監査の際は、AWS の監査レポート（AWS Artifact からダウンロード）を証跡として使います。</td><td><b>Physical and environmental controls</b>: データセンターの物理セキュリティ、電源、冷却、防火</td></tr>
<tr><td><b>Shared controls</b>（共有される統制）</td><td>双方がともに行い、それぞれが自分の範囲を担当する</td><td>Patch management、configuration management、awareness &amp; training</td></tr>
<tr><td><b>Customer-specific controls</b>（お客様固有の統制）</td><td>お客様だけが責任を負い、内容はお客様のアプリケーションによって異なる</td><td>アプリケーションのデータと通信経路の保護、自分の環境内でのデータのゾーニング</td></tr>
</table>

<div class="box idea"><b>🧠 かんたんに言うと</b><p>マンションでは「メンテナンス」は共同の仕事です。建物のオーナーはエレベーターを保守し、あなたは自分の部屋のエアコンを保守します。「防火訓練」も共同の仕事です。管理会社は警備員に訓練を行い、あなたは家族にコンロの火を消すよう言い聞かせます。同じ種類の作業を、それぞれが自分の持ち分だけ行うのです。</p></div>

<h3>試験問題の答え方</h3>
<p>かんたんなコツ: それが<b>手で触れられる</b>ものかどうかを考えます。物理的なもの（建物、ハードディスク、ケーブル）や、その下にある仮想化レイヤーなら AWS の責任です。あなたが<b>設定する、書く、または決める</b>もの（パスワード、権限、データ、コード、security group）ならあなたの責任です。OS については、サービスが EC2（あなた）か managed（AWS）かを見ます。</p>

<div class="box exam"><b>🎯 試験でよく問われること</b><ul>
<li>"Physical security of data centers"、"hardware"、"global infrastructure"、"hypervisor" → <b>AWS</b></li>
<li>"Patching the guest operating system on EC2" → <b>Customer</b></li>
<li>"Patching the database engine on Amazon RDS" → <b>AWS</b></li>
<li>"Configuring security groups"、"IAM users and permissions"、"customer data"、"encrypting data" → <b>Customer</b></li>
<li>"With AWS Lambda, the customer is responsible for…" → <b>function code と IAM permissions</b></li>
<li>"Which is a shared control?" → <b>Patch management, configuration management, awareness and training</b></li>
<li>"Controls fully inherited from AWS" → <b>Physical and environmental controls</b></li>
<li>"Move from ECS on EC2 to Fargate, which task goes away?" → <b>patching the host OS</b>。"EBS is replicated, do we need backups?" → <b>必要。お客様が自分で snapshot/backup を作成する</b></li>
<li>"AWS Outposts in our own facility" → お客様の担当に <b>physical security of the site</b> が加わる</li>
</ul></div>
`,summary:["AWS は \"security OF the cloud\" に責任を負う: データセンター、ハードウェア、hypervisor、グローバルネットワーク。","お客様は \"security IN the cloud\" に責任を負う: データ、IAM、設定、暗号化、アプリケーション。","サービスが managed であるほど（RDS、Lambda）AWS の担当が増える。EC2 はお客様の担当が最も多い。","EC2 上の OS のパッチ適用はお客様の責任。RDS の OS と database engine のパッチ適用は AWS の責任。","データとアクセス権限は、どのサービスでも常にお客様の責任。","Shared controls: patch management、configuration management、awareness & training。それぞれが自分の範囲で行う。","Inherited controls（AWS から完全に継承）: データセンターの physical and environmental controls。","バックアップ（EBS の snapshot）はお客様の仕事。Outposts では、ラック設置場所の物理セキュリティはお客様の責任。"],terms:[["Shared Responsibility Model","責任共有モデル"],["Security OF the cloud","クラウド「の」セキュリティ（AWS の責任範囲）"],["Security IN the cloud","クラウド「内の」セキュリティ（お客様の責任範囲）"],["Data center","データセンター"],["Hypervisor","仮想化ソフトウェア。物理サーバーを仮想マシンに分割する"],["Guest operating system","ゲスト OS（仮想マシン上の OS）"],["Patch","パッチ（修正プログラム）"],["Managed service","マネージドサービス（AWS があらかじめ管理してくれるサービス）"],["Shared controls","共有される統制"],["Inherited controls","継承される統制"],["Physical and environmental controls","物理的および環境的な統制（AWS から継承）"],["AWS Outposts","お客様の施設内に設置する AWS インフラのラック"],["Configuration management","構成管理"],["Awareness and training","意識向上とトレーニング"]]};
L.course["2-2"]={title:"IAM: user、group、role、policy と least privilege",goals:["authentication（認証）と authorization（認可）を区別できる","user、group、role、policy とは何か、いつ使うのかを理解する","least privilege を適用できる。explicit deny、policy の種類、permissions boundary、SCP を理解する","EC2 やアカウント間のアクセスに role を使うべき理由が分かる"],html:`
<h3>あらゆるセキュリティシステムが問う 2 つの質問</h3>
<p>誰かがシステム上で何かをしようとするたびに、システムは次の 2 つの質問に順番に答えなければなりません。</p>
<ol>
<li><b>あなたは誰ですか？</b> これが <b>authentication</b>（認証）です。例: ユーザー名とパスワードの入力、指紋のスキャン。</li>
<li><b>あなたは何をしてよいですか？</b> これが <b>authorization</b>（認可）です。例: 経理担当者は請求書を閲覧できるが、サーバーは削除できない。</li>
</ol>
<p>AWS では、この両方を <b>AWS IAM</b>（Identity and Access Management、ID とアクセスの管理）が担います。IAM は <b>global</b>（グローバル。特定のリージョンに紐づかない）なサービスで、<b>無料</b>です。</p>

<div class="box idea"><b>🧠 かんたんに言うと</b><p>カードキーを使うオフィスビルを思い浮かべてください。受付が身分証を確認してカードを渡してくれる。これが<b>認証</b>です。あなたのカードは 3 階のドアは開けられるが、サーバールームは開けられない。これが<b>認可</b>です。「このカードでどのドアを開けられるか」の一覧こそが <b>policy</b> です。</p></div>

<h3>4 つの中核概念: user、group、role、policy</h3>
<h4>IAM user（ユーザー）</h4>
<p><b>IAM user</b> は、AWS を長期的に使う必要がある<b>1 人の人</b>（または 1 つのアプリケーション）を表します。user ごとに固有の名前と固有の認証情報があります。Web 画面（AWS Management Console）に入るためのパスワードと、コマンドラインやコードから使うための <b>access key</b> のどちらか、または両方です。原則は<b>1 人につき 1 user</b> で、共用はしません。</p>
<p><i>注意: 現在 AWS は、<b>人間のユーザー</b>（従業員）については、長期的なパスワードや access key を持つ IAM user を作るのではなく、<b>federation</b>（既存のシステムと ID を連携すること）または <b>AWS IAM Identity Center</b> 経由でサインインし、一時的な認証情報を使うことを推奨しています。IAM user は特別なケースでは引き続き使えます。詳しくはレッスン 2-3 を参照してください。CLF-C02 では今でも user/group/role がよく問われるので、以下の内容は押さえておく必要があります。</i></p>
<h4>IAM group（グループ）</h4>
<p><b>IAM group</b> は複数の user の集まりです。権限をグループに付与すると、グループ内のすべての user が自動的にその権限を持ちます。新しい従業員が入ったら、グループに追加するだけで済みます。group に入れられるのは user だけで、ほかの group は入れられません。また、group は「サインイン」に使うものではありません。</p>
<h4>IAM policy（権限ポリシー）</h4>
<p><b>policy</b> は、どのリソースに対してどのアクションを<b>許可 (Allow)</b> するか、または<b>拒否 (Deny)</b> するかを明記したドキュメントです。policy は <b>JSON</b> 形式（機械が読める構造化テキストの一種）で書きます。試験のために構文を暗記する必要はなく、考え方が分かれば十分です。おおよそ次のようなものです。</p>
<p><code>Effect: Allow | Action: s3:GetObject | Resource: bucket anh-banh</code></p>
<p>意味は「anh-banh バケット内のファイルの読み取りを許可する」です。AWS は、覚えやすい 3 つのステップで権限を評価します。</p>
<ol>
<li>デフォルトでは、許可する policy があるまで、すべてが<b>拒否</b>されます（implicit deny）。</li>
<li>該当する <b>Allow</b> の policy があれば許可されます...</li>
<li>...ただし、いずれかの policy に<b>明示的な Deny</b>（explicit deny）がある場合は別です。<b>Explicit deny は常に</b>あらゆる Allow に勝ちます。</li>
</ol>
<p>例: ある user が AdministratorAccess（すべてを Allow）を持つ group に属しているが、S3 バケットを削除するアクションを Deny する policy も追加でアタッチされているとします。この user がバケットを削除しようとすると → <b>拒否されます</b>。明示的な Deny が勝つからです。</p>
<p>ID にアタッチする policy（identity-based policy）でよく出てくるのは次の 3 種類です。</p>
<ul>
<li><b>AWS managed policy</b>: AWS があらかじめ作成し、<b>自動的に更新</b>する policy です。例: AdministratorAccess、ReadOnlyAccess、あるいは <b>SecurityAudit</b>（セキュリティ設定の閲覧）や Billing のような職務機能別の policy。手間が最も少なく、新しいサービスにも自動で追従しますが、必要以上に広い権限を与えがちで、AWS が更新すると、あなたが自分で承認しないまま権限が変わることがあります。</li>
<li><b>Customer managed policy</b>: 自分で作成する policy で、複数の user/group/role で再利用できます。<b>あなた</b>が編集したときにだけ変更され、IAM が<b>以前のバージョンを保存</b>しているので、編集を誤ったときに元に戻せます（roll back）。厳密に制御したいときに適しています。</li>
<li><b>Inline policy</b>: 1 つの user/group/role だけに<b>直接埋め込む</b> policy です。ほかの ID にはアタッチできず、その ID を削除すると<b>一緒に削除</b>されます。ある権限をただ 1 つの ID だけに持たせたいときに使います。</li>
</ul>
<p>このほかに <b>resource-based policy</b> があります。人ではなく<b>リソースそのもの</b>にアタッチする policy です。代表例は <b>S3 bucket policy</b> で、「パートナー X の AWS アカウントはファイルをアップロードできる」とバケットに直接書けるので、パートナー用の user や role を作る必要がありません。</p>
<h4>IAM role（ロール）</h4>
<p><b>IAM role</b> は、誰かまたは何かが<b>一時的に引き受ける</b>（assume role）ことのできる「権限のセット」です。role には固定のパスワードや access key がありません。role を引き受けると、AWS は一定時間で自動的に期限切れになる <b>temporary credentials</b>（一時的な認証情報）を発行します。</p>
<p>role の用途: ほかのサービスを呼び出す必要がある AWS サービス（EC2、Lambda）、<b>別の AWS アカウント</b>のユーザー、会社のシステム経由でサインインする従業員（federation。次のレッスンで学びます）。</p>

<div class="box idea"><b>🧠 かんたんに言うと</b><p><b>User</b> は、あなたの写真と名前が入った社員証のようなもので、長期間使います。<b>Group</b> は部署のようなもので、経理部の全員が書類保管庫に入れます。<b>Policy</b> は開けられるドアの一覧です。<b>Role</b> は受付にある<b>ゲストカード</b>のようなもので、必要な人が借り、使い終わったら返し、時間が過ぎるとカードは自動的に無効になります。</p></div>

<table>
<tr><th>概念</th><th>何か</th><th>長期的なパスワード/キーはあるか</th><th>使用例</th></tr>
<tr><td>User</td><td>1 人の人またはアプリケーション</td><td>ある</td><td>Minh がコンソールにサインインする</td></tr>
<tr><td>Group</td><td>user の集まり</td><td>ない（サインインできない）</td><td>「Developers」グループ</td></tr>
<tr><td>Role</td><td>一時的に引き受ける権限のセット</td><td>ない。一時的な認証情報のみ</td><td>EC2 が S3 を読む。別アカウントのユーザー</td></tr>
<tr><td>Policy</td><td>権限を定める JSON ドキュメント</td><td>該当なし</td><td>「画像バケットの読み取りのみ可」</td></tr>
</table>

<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>BanhNgon では、AWS を使う必要のある人が 6 人になりました。Minh は 1 人ずつ専用の user を作り、さらに 2 つの group を作りました。<b>Developers</b>（外部委託のプログラマー 3 人）と <b>Marketing</b>（広告担当の 2 人）です。Developers グループには、EC2 と Lambda の管理を許可する policy をアタッチしました。Marketing グループは、ある S3 バケット内の売上レポートを読むことしかできません。</p><p>ランさんが尋ねます。「手っ取り早く全員に admin 権限をあげてしまえばいいんじゃない？」。Minh はこう説明しました。マーケティング担当の誰かがだまされてパスワードを漏らしても、悪意のある人ができるのはレポートを読むことだけで、サーバーを削除することはできないのだと。</p></div>

<h3>least privilege（最小権限）の原則</h3>
<p><b>Principle of least privilege</b> とは、仕事に必要な権限を<b>過不足なく</b>与え、それ以上は与えないということです。追加で必要になったら追加し、不要になったら取り消します。</p>
<p>メリット: あるアカウントが漏えいしたり、誰かが誤操作したりしても、被害が小さな範囲に限定されます。これは基礎となる原則で、試験に非常によく出ます。</p>
<p>実践の方法: 少ない権限から始める、user ごとではなく group を通じて権限を割り当てる、必要なアクションだけを書いた policy を優先する、そして使われていない権限がないかを定期的に見直して取り除く（IAM access advisor というツールについてはレッスン 2-3 で説明します）。</p>

<h3>EC2 用の role とアカウント間のアクセス</h3>
<h4>EC2 用の role</h4>
<p>EC2 サーバー上で動くアプリケーションが、S3 から画像を読み取る必要があるとします。<b>間違った</b>方法: ある user の access key を作成し、サーバー上のファイルに保存する。誰かがそのファイルを手に入れれば、いつまでも使えるキーを持つことになります。</p>
<p><b>正しい</b>方法: S3 の読み取り権限を持つ <b>IAM role</b> を作成し、（<b>instance profile</b> を介して）EC2 に role をアタッチします。アプリケーションは一時的な認証情報を自動的に受け取り、AWS が定期的に自動で更新します。ディスク上にキーは一切残りません。</p>
<h4>アカウント間のアクセス (cross-account access)</h4>
<p>多くの会社は複数の AWS アカウントを持っています。アカウント A のユーザーがアカウント B のリソースを使う必要がある場合、B に user を追加で作っては<b>いけません</b>。代わりに、アカウント B に role を作成し、アカウント A のユーザーがその role を <b>assume</b>（引き受ける）ことを許可します。ユーザーは一時的な権限を受け取り、取り消しも簡単です。</p>
<div class="flow"><span>アカウント A の user</span><span>Assume role</span><span>アカウント B の role</span><span>B のリソース</span></div>
<p>権限を与える相手が<b>社外の会社</b>（例: 自社の AWS アカウントを使う監査法人）の場合に推奨される方法は、相手のアカウントが assume できる role（例: 読み取り専用）を作成し、別の第三者に role を悪用されないよう <b>external ID</b>（双方で取り決めた秘密のコード）を併用することです。契約が終わったら role を削除します。</p>

<h3>権限の上限を決めるガードレール: permissions boundary と SCP</h3>
<p>通常の policy は「何をしてよいか」に答えます。これとは別の質問、「<b>最大で</b>どこまでしてよいか」に答えるツールが 2 つあります。これらは<b>権限を付与せず</b>、上限を設けるだけです。</p>
<table>
<tr><th>ツール</th><th>適用対象</th><th>使う場面</th></tr>
<tr><td>IAM policy (identity/resource-based)</td><td>User、group、role、リソース</td><td>具体的な権限を付与する</td></tr>
<tr><td><b>Permissions boundary</b></td><td>アカウント内の 1 つの user または role</td><td>developer に自分で role を作らせるが、より広い policy をアタッチされても、その role があらかじめ決めた最大の権限セットを<b>決して</b>超えないようにする</td></tr>
<tr><td><b>SCP</b>（Service Control Policy、AWS Organizations の機能）</td><td>メンバーアカウント全体または OU</td><td>メンバーアカウント内の全員に、<b>そのアカウントの admin や root も含めて</b>、ある操作（例: ヨーロッパ以外のリージョンの利用）を禁止する</td></tr>
</table>
<p>実際の権限 = 重なり合う部分です。policy で Allow されていて、<b>かつ</b> boundary/SCP の範囲内にあり、どこでも Deny されていないことが必要です。</p>
<p>注意: SCP が効くのは<b>メンバーアカウント</b>だけです。SCP は <b>management account</b>（組織の管理アカウント）内の user と role を<b>制限しません</b>。そのため、このアカウントでワークロードを動かしてはいけません。</p>

<div class="box trap"><b>⚠️ よくあるひっかけ</b><p>"EC2 needs to access S3" とあって、選択肢に "store access keys on the instance" や "embed credentials in code" があれば、すぐに除外します。正解は常に <b>IAM role</b> です。</p><p>もう 1 つのひっかけ: <b>group は group を入れ子にできず</b>、<b>AWS サービスに権限を与える手段でもありません</b>。AWS サービスが使うのは role であり、group ではありません。</p></div>

<div class="box exam"><b>🎯 試験でよく問われること</b><ul>
<li>"Grant only the permissions required to perform a task" → <b>Principle of least privilege</b></li>
<li>"Give the same permissions to many developers efficiently" → <b>IAM group</b> + policy をアタッチ</li>
<li>"Application on EC2 needs to access S3 securely" → EC2 にアタッチした <b>IAM role</b></li>
<li>"User in account A needs temporary access to account B" → account B の <b>IAM role</b> (cross-account)</li>
<li>"Document that defines permissions, written in JSON" → <b>IAM policy</b></li>
<li>"Is IAM regional?" → いいえ。IAM は <b>global</b> で <b>free</b></li>
<li>"Allow from a group but explicit Deny attached" → <b>Denied</b>（explicit deny が勝つ）</li>
<li>"Full control over when permissions change, reusable, roll back" → <b>customer managed policy</b>。"one identity only, deleted with it" → <b>inline policy</b>。"least overhead, stays current with new services" → <b>AWS managed policy</b>（例: SecurityAudit）</li>
<li>"Roles that developers create can never exceed a maximum set" → <b>permissions boundary</b></li>
<li>"Prevent all member accounts, even admins, from using some Regions/services" → <b>SCP</b></li>
<li>"Grant another account access on the bucket itself" → <b>S3 bucket policy</b> (resource-based)。"external auditor's account, read-only" → <b>role + external ID</b></li>
</ul></div>
`,summary:["Authentication = あなたが誰かを確認する認証。authorization = 何をしてよいかを決める認可。IAM はその両方を担う、global で無料のサービス。","User = 1 人の人/アプリケーション。group = user の集まり。policy = 権限を定める JSON ドキュメント。role = 引き受けて使う一時的な権限。","デフォルトではすべて拒否される。明示的な Deny は常に Allow に勝つ。","AWS managed policy は AWS があらかじめ作成し自動更新する。customer managed policy は自分で制御でき、roll back 用のバージョンがある。inline policy は 1 つの ID に固く結びつく。","Resource-based policy（例: S3 bucket policy）はリソースにアタッチし、別のアカウントに権限を付与できる。","Permissions boundary と SCP は上限を設けるだけで、権限は付与しない。SCP は management account には適用されないが、メンバーアカウントの admin/root には適用される。","Least privilege: 必要な権限だけを与え、定期的に見直す。","EC2 上のアプリケーションとアカウント間のアクセスには IAM role を使い、access key は保存しない。"],terms:[["IAM (Identity and Access Management)","ID とアクセスの管理"],["Authentication","認証（あなたは誰か）"],["Authorization","認可（何をしてよいか）"],["IAM user","IAM ユーザー"],["IAM group","ユーザーのグループ"],["IAM role","ロール。一時的に引き受ける権限のセット"],["IAM policy","権限ポリシー (JSON)"],["AWS managed policy","AWS が管理する policy"],["Customer managed policy","お客様が自分で管理する policy"],["Principle of least privilege","最小権限の原則"],["Temporary credentials","一時的な認証情報"],["Assume role","ロールを引き受ける"],["Cross-account access","アカウント間のアクセス"],["Instance profile","EC2 にアタッチするための role の入れ物"],["Inline policy","ただ 1 つの ID に埋め込む policy"],["Resource-based policy","リソースにアタッチする policy（例: bucket policy）"],["Explicit deny","明示的な拒否（常に Allow に勝つ）"],["Permissions boundary","user/role の権限の上限"]]};
L.course["2-3"]={title:"ルートユーザー、MFA、サインインとシークレットの管理",goals:["root user とは何か、その守り方、root にしかできない作業が分かる","MFA、password policy、access key と、その安全な使い方を理解する","IAM Identity Center、Amazon Cognito、AWS Directory Service を区別できる","Secrets Manager と Parameter Store を正しく選べる。credential report と access advisor を知っている"],html:`
<h3>Root user: マスターキー</h3>
<p>メールアドレスとパスワードで AWS アカウントを作成すると、その ID が <b>root user</b>（ルートユーザー）になります。root user はアカウントに対して<b>絶対的な全権限</b>を持ちます。あらゆるものの作成と削除、請求書の閲覧、さらにはアカウントの解約までできます。そのアカウント自身の中では、どんな policy も root を制限できません（AWS Organizations の仕組みを使う場合を除く）。</p>
<p>これほど権限が大きいので、root が漏えいすれば、ほぼすべてを失います。AWS が推奨する守り方は次のとおりです。</p>
<ul>
<li>強力なパスワードを設定し、root の <b>MFA を有効にする</b>。現在 AWS は<b>デフォルトで root user に MFA を必須</b>としており、アカウント作成時またはサインイン時に MFA デバイスの登録を求められます。</li>
<li><b>日常の作業に root を使わない</b>。普段の作業用に、管理者権限を持つ ID を作成します。</li>
<li>root の <b>access key を作成しない</b>（すでにあれば削除する）。</li>
<li>root には専用の安全なメールアドレスを使い、root にしかできない作業が発生したときだけ root を使う。</li>
</ul>

<div class="box idea"><b>🧠 かんたんに言うと</b><p>Root user は、建物全体の<b>マスターキー</b>に不動産の権利証が付いているようなものです。毎日の買い物に持ち歩いたりはしません。金庫（MFA）にしまっておき、普段は自分の部屋の鍵（必要十分な権限を持つ IAM user/role）だけを使います。</p></div>

<h4>root user にしかできない作業</h4>
<p>試験ではこの一覧が非常によく問われます。代表的なものを挙げます。</p>
<ul>
<li>スタンドアロンのアカウントの場合: アカウントの<b>メールアドレス</b>、<b>root のパスワード</b>、root の access key の変更。（アカウント名、連絡先情報、有効にするリージョンなど、そのほかの設定に root は<b>不要</b>です。）</li>
<li>スタンドアロンの <b>AWS アカウントの解約</b>（close account）と、自分で解約したばかりのアカウントの再開。</li>
<li>唯一の IAM 管理者がうっかり自分の権限を失ってしまったときの <b>IAM 権限の復旧</b>: root でサインインして policy をアタッチし直します。</li>
<li><b>IAM user/role が Billing のページにアクセスできるよう有効化する</b>（Billing and Cost Management console）。</li>
<li>Reserved Instance Marketplace への<b>出品者（セラー）登録</b>。</li>
<li>S3 バケットの <b>MFA Delete</b> の有効化（ファイルのバージョンを削除するときに MFA を要求する）。</li>
<li><b>誤ってすべての principal を拒否してしまった S3 bucket policy の編集または削除</b>（admin まで締め出された状態）。</li>
</ul>
<p><b>Centralized root access</b>（root アクセスの一元管理）: 会社が AWS Organizations を使っている場合、IAM でこの機能を有効にすると、メンバーアカウントの<b>長期的な root 認証情報を完全に削除</b>できます（パスワード、access key、MFA）。特権が必要な作業（例: すべてをブロックしている bucket policy の解除）が発生したら、management account の admin が短時間の root セッションを使って一元的に実行します。新しく作成するメンバーアカウントにも root 認証情報はありません。</p>
<p><i>注意: 古い学習資料には、「AWS Support プランの変更」が root にしかできない作業として書かれていることがよくあります。AWS の現在の公式リストにこの項目はもうありません（適切な権限を持つ IAM user で実行できます）。試験で古い形のまま問われた場合は、アカウントの解約、root のメールアドレス/パスワードの変更といった、より確実な選択肢を優先してください。</i></p>

<h3>MFA と password policy</h3>
<p><b>MFA</b>（Multi-Factor Authentication、多要素認証）は、<b>2 つ以上</b>のもので本人であることを証明するよう求めます。あなたが<b>知っている</b>もの（パスワード）と、あなたが<b>持っている</b>もの（コード生成アプリを入れたスマートフォン、またはハードウェアのセキュリティキー）です。攻撃者がパスワードを知っていても、あなたのスマートフォンを持っていなければ入れません。</p>
<p>AWS は 3 種類の MFA デバイスをサポートしています。</p>
<table>
<tr><th>MFA の種類</th><th>何か</th><th>備考</th></tr>
<tr><td><b>Passkey / FIDO2 security key</b></td><td>USB に挿す/タッチするセキュリティキー、またはスマートフォンやパソコン上の passkey</td><td><b>フィッシング耐性あり</b>（phishing-resistant）: 偽サイトは再利用できる情報を何も盗めない</td></tr>
<tr><td>Virtual MFA</td><td>6 桁のコードを生成するスマートフォンアプリ</td><td>普及していて無料だが、だまされて偽サイトにコードを入力してしまう可能性は残る</td></tr>
<tr><td>Hardware TOTP token</td><td>コードを生成する小型デバイス</td><td>スマートフォンが不要</td></tr>
</table>
<p>root と、重要な権限を持つすべての user で MFA を有効にしましょう。各 user（root を含む）は<b>複数の MFA デバイス</b>（最大 8 台）を登録できます。<b>2 台目のデバイス</b>を登録して別の場所に保管しておけば、1 台をなくしてもサインインできます。</p>
<p><b>Password policy</b>（パスワードポリシー）は、アカウント内の <b>IAM user</b> のパスワードに適用されるルールです。最小文字数、大文字・数字・記号の必須化、変更が必要になるまでの有効期間、古いパスワードの再利用禁止などです。注意: password policy は <b>root のパスワードには適用されません</b>。</p>

<h3>Access key: プログラム用の鍵</h3>
<p>パスワードによる Web サインインのほかに、コマンドライン（<b>AWS CLI</b>）やコード（<b>AWS SDK</b>）から AWS を操作することもあります。そのときに必要なのが <b>access key</b> で、<b>access key ID</b>（ユーザー名に相当）と <b>secret access key</b>（パスワードに相当）の 2 つの部分からなります。</p>
<p>安全に使うためのルール: キーを共有しない、キーをコードに書いたりインターネットに公開したりしない、キーを定期的に更新する、使っていないキーは削除する。そして重要なのが、<b>EC2 サーバーに access key を保存しない</b>ことです。EC2 上のアプリケーションは、前のレッスンのとおり <b>IAM role</b> を使うべきです。ノートパソコンから CLI を実行する developer は、長期的な access key を端末に置くのではなく、<b>IAM Identity Center</b> 経由でサインインして<b>短期的な認証情報</b>を受け取るべきです。</p>
<p><b>access key が漏えいした場合</b>（例: 誤って公開コードリポジトリに push してしまった）: ただちに<b>キーを無効化してから削除</b>し、その後 <b>CloudTrail</b> を確認してそのキーがどの API を呼び出したかを調べ、本当に必要であれば新しいキー/role を作成します。</p>

<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>最初の年、ランさんは登録に使ったメールアドレス（root）でそのまま毎日 AWS にサインインしていて、パスワードはモニターに貼ってありました。Minh は青ざめました。彼は ランさんのスマートフォンのアプリで root の MFA を有効にし、root をしまい込み、日常の作業用に ランさん専用の管理者 ID を作成しました。</p><p>Minh はさらに、以前の developer が EC2 サーバー上のコードに access key を残していたことも見つけました。彼はそのキーを削除して IAM role に置き換え、password policy を設定しました。最小 12 文字、90 日ごとに変更です。</p></div>

<h3>シングルサインオン: federation、IAM Identity Center、Cognito、Directory Service</h3>
<p><b>Identity federation</b>（ID フェデレーション）とは、IAM user を追加で作る代わりに、<b>ほかの場所にすでにある</b>アカウント（例: Microsoft Active Directory、Okta、Google にある会社のアカウント）でユーザーが AWS にサインインできるようにすることです。<b>identity provider</b>（IdP、ID プロバイダー）がユーザーを認証し、AWS はその結果を信頼して、role を通じて一時的な権限を与えます。</p>
<ul>
<li><b>AWS IAM Identity Center</b>（旧 AWS SSO）: 会社の<b>従業員</b>向けです。<b>1 回</b>サインインするだけで（single sign-on）、AWS Organizations 内の複数の AWS アカウントや業務アプリケーションにアクセスできます。Identity Center に備わっているディレクトリを使うことも、外部の IdP を接続することもできます。権限は <b>permission set</b>（権限セット）として 1 回定義し、複数のアカウントにまたがってユーザーのグループに一括で割り当てます。これが、社内ユーザーに対して AWS が推奨する方法です。</li>
<li><b>Amazon Cognito</b>: <b>アプリケーションのエンドユーザー</b>（あなたの顧客）向けです。例えば、ケーキを買う人がモバイルアプリでサインアップやサインインをする場合で、Google や Facebook でのサインインにも対応します。非常に多くのユーザーに対応できます。</li>
<li><b>AWS Directory Service</b>: AWS 上で <b>Microsoft Active Directory</b>（企業で広く使われているアカウント管理システム）を提供します。例えば AWS Managed Microsoft AD です。あるいは、会社のオフィスにある既存の Active Directory に接続します。</li>
</ul>
<table>
<tr><th>サービス</th><th>誰がサインインするか</th><th>試験でのキーワード</th></tr>
<tr><td>IAM user</td><td>長期的な認証情報が必要な少数の人/アプリケーション</td><td>long-term credentials</td></tr>
<tr><td>IAM Identity Center</td><td>従業員、複数の AWS アカウント</td><td>single sign-on, workforce, multiple accounts</td></tr>
<tr><td>Amazon Cognito</td><td>あなたの Web/アプリを使う顧客</td><td>sign-up, sign-in for mobile/web app users</td></tr>
<tr><td>AWS Directory Service</td><td>Microsoft Active Directory を使う環境</td><td>managed Microsoft AD</td></tr>
</table>

<div class="box trap"><b>⚠️ よくあるひっかけ</b><p>"<b>employees</b>" が 1 回のサインインで複数のアカウントに入る、と問われたら → <b>IAM Identity Center</b>。"<b>users of a mobile app</b>" がサインアップ/サインインする、と問われたら → <b>Cognito</b>。この 2 つのサービスはどちらもサインインに関係するので、とても選び間違えやすいです。</p></div>

<h3>シークレットの管理: Secrets Manager と Parameter Store</h3>
<p>アプリケーションには、データベースのパスワードや API key といった <b>secret</b>（シークレット、秘密情報）が必要になることがよくあります。これらをコードに直接書くことは絶対に避けてください。専用の「金庫」にしまい、アプリケーションが必要なときに金庫に問い合わせるようにします。</p>
<ul>
<li><b>AWS Secrets Manager</b>: シークレットの保存に特化し、KMS で暗号化します。最大の特長は<b>自動ローテーション</b>（rotate、パスワードを定期的に自動で変更）で、RDS や多くのデータベースと統合済みです。有料のサービスです。</li>
<li><b>AWS Systems Manager Parameter Store</b>: 設定値（feature flag、URL など）とシンプルなシークレットを保存します。シークレットは <b>SecureString</b>（KMS で暗号化される）として保存します。standard ティアは追加料金がかからないので、自動ローテーションが不要な場合の<b>最も安い</b>選択肢です。Secrets Manager のような組み込みの自動ローテーション機能はありません。</li>
</ul>

<h3>定期的なチェック: credential report、last accessed、Access Analyzer</h3>
<ul>
<li><b>IAM credential report</b>: ダウンロードできる一覧表（CSV ファイル）で、アカウント内の<b>すべての IAM user</b> と認証情報の状態を列挙します。パスワードを最後に変更したのはいつか、MFA が有効か、access key を最後に使ったのはいつか、などです。監査に使います。</li>
<li><b>IAM access advisor</b>（コンソールでは <b>Last accessed</b> タブに表示される "last accessed information"）: ある user/role が<b>どのサービスへの権限を与えられていて、そのサービスを実際に最後に使った</b>のはいつかを示します。余分な権限を取り除く最も手間の少ない方法で、least privilege に役立ちます。</li>
<li><b>IAM Access Analyzer</b>: 自分のアカウントや組織の<b>外部に共有されている</b>リソース（S3 バケット、KMS キー、IAM role など）、つまり外部の人がアクセスできるリソースを見つけます。自分で書いた policy のチェックや、未使用の権限の発見にも役立ちます。</li>
</ul>

<div class="box exam"><b>🎯 試験でよく問われること</b><ul>
<li>"Best practice for root user" → <b>Enable MFA, don't use for everyday tasks, no access keys</b></li>
<li>"Only the root user can…" → <b>close account, change account email/root password, restore IAM permissions</b></li>
<li>"Require a code from a device in addition to a password" → <b>MFA</b></li>
<li>"Minimum password length, rotate passwords" → <b>IAM password policy</b></li>
<li>"Use existing corporate credentials" → <b>Identity federation</b>。"employees sign in once to many accounts" → <b>IAM Identity Center</b></li>
<li>"Sign-up/sign-in for mobile app users" → <b>Amazon Cognito</b></li>
<li>"Store database credentials and rotate automatically" → <b>AWS Secrets Manager</b></li>
<li>"List all users and status of passwords, access keys, MFA" → <b>IAM credential report</b></li>
<li>"Which services a role actually used and when" → <b>last accessed information</b> (access advisor)。"resources shared with principals outside the organization" → <b>IAM Access Analyzer</b></li>
<li>"Phishing-resistant MFA" → <b>passkeys / FIDO2 security keys</b>。"if the root MFA device is lost" → <b>2 台目の MFA デバイスを登録しておく</b></li>
<li>"Remove root credentials from member accounts, do root tasks centrally" → <b>centralized root access management</b></li>
<li>"Access key leaked" → <b>deactivate/delete the key</b> + <b>review CloudTrail</b></li>
<li>"Config values, a few encrypted, no rotation, cheapest" → <b>Parameter Store</b> (SecureString)</li>
</ul></div>
`,summary:["Root user は全権限を持つ: MFA を有効にし、日常的には使わず、access key を作成しない。","root にしかできないこと: root のメールアドレス/パスワードの変更、アカウントの解約（スタンドアロンのアカウント）、IAM による Billing へのアクセスの有効化、RI Marketplace への出品者登録、IAM 権限の復旧、S3 MFA Delete の有効化、すべての principal をブロックする bucket policy の修正。Support プランの変更に root は不要。","Organizations では、centralized root access によりメンバーアカウントの root 認証情報を削除し、特権が必要な作業を一元的に実行できる。","MFA = パスワード + デバイス。passkey/FIDO2 はフィッシング耐性がある。予備の MFA デバイスを用意しておく。Password policy は IAM user に適用され、root には適用されない。","Access key は CLI/SDK 用。EC2 には保存せず、代わりに IAM role を使う。","IAM Identity Center は従業員向け（複数アカウントの SSO）。Cognito はアプリのユーザー向け。Directory Service は Microsoft AD 向け。","Secrets Manager はシークレットを保存して自動ローテーションする。Parameter Store は設定値やシンプルなシークレットを保存する。","Credential report はすべての user の認証情報の状態を一覧にする。access advisor (last accessed) はどの権限が最後にいつ使われたかを示す。Access Analyzer は外部に共有されているリソースを見つける。"],terms:[["Root user","ルートユーザー（全権限を持つ）"],["MFA (Multi-Factor Authentication)","多要素認証"],["Password policy","パスワードポリシー"],["Access key","アクセスキー（CLI/SDK 用）"],["Identity federation","ID フェデレーション"],["Identity provider (IdP)","ID プロバイダー"],["Single sign-on (SSO)","シングルサインオン"],["AWS IAM Identity Center","従業員向けの SSO サービス（旧 AWS SSO）"],["Amazon Cognito","アプリケーションのユーザー向けのサインアップ/サインインサービス"],["AWS Directory Service","AWS 上の Microsoft Active Directory サービス"],["AWS Secrets Manager","シークレットを保存してローテーションするサービス"],["Rotation","ローテーション（シークレットを定期的に自動で変更）"],["IAM credential report","IAM 認証情報レポート"],["IAM access advisor","権限が最後に使われた時期を確認するツール"],["IAM Access Analyzer","外部に共有されているリソースを見つけるツール"],["Phishing-resistant MFA","フィッシング耐性のある MFA（passkey、FIDO2）"],["Permission set","IAM Identity Center の権限セット"]]};
})();
(function(){var I=window.CLF_I18N=window.CLF_I18N||{};var L=I.ja=I.ja||{};['q','course','lessons','glossary','services','domains','ui'].forEach(function(k){L[k]=L[k]||{};});
L.course["2-4"]={title:"ネットワークとアプリケーションの保護: Security Group、NACL、WAF、Shield",goals:["firewall とは何かを理解し、security group と network ACL を区別できる","DDoS、SQL injection、XSS をやさしい言葉で理解する","AWS Shield Standard、Shield Advanced、AWS WAF、AWS Firewall Manager をそれぞれいつ使うかが分かる","AWS Marketplace でサードパーティのセキュリティツールを購入できることを知る"],html:`
<h3>Firewall とは？</h3>
<p>コンピュータ同士は、ネットワーク上で <b>traffic</b>（トラフィック、データのパケット）を送り合って通信します。各パケットは <b>port</b>（ポート）を宛先にします。ポートは建物の部屋番号のようなもので、Web サイトは通常 port 443（HTTPS）と 80（HTTP）を使い、Linux マシンへの管理者ログインは port 22（SSH）を使います。</p>
<p><b>firewall</b>（ファイアウォール）は、パケットを 1 つずつ確認して通すか遮断するかを決める「門番」です。判断は <b>rule</b>（ルール）に基づきます。どのアドレスから来たか、どのポート宛てか、どのプロトコルか、といった条件です。</p>
<p>AWS では、サーバーは <b>VPC</b>（Virtual Private Cloud、仮想プライベートクラウド）の中に置かれ、VPC は複数の <b>subnet</b>（サブネット）に分割されます。AWS には 2 層のファイアウォールがあります。1 つは各サーバーの入口、もう 1 つは各サブネットの入口にあります。</p>

<h3>Security group と network ACL</h3>
<p><b>Security group</b>（セキュリティグループ）は、<b>インスタンスレベル</b>（個々の EC2 サーバー、より正確には個々のネットワークインターフェイス）にアタッチする仮想ファイアウォールです。特徴は次のとおりです。</p>
<ul>
<li>rule は <b>Allow</b>（許可）だけです。許可されていないものは遮断されます。「この IP を遮断する」という rule は書けません。</li>
<li><b>Stateful</b>（ステートフル、状態を記憶する）: あるリクエストの受信が許可されていれば、それに対応する応答は自動的に送信が許可され、別の rule は不要です。</li>
<li>デフォルト: 受信トラフィックはすべて遮断、送信トラフィックはすべて許可です。</li>
</ul>
<p><b>Network ACL</b>（NACL、ネットワークアクセスコントロールリスト）は、<b>サブネットレベル</b>のファイアウォールです。特徴は次のとおりです。</p>
<ul>
<li><b>Allow</b> と <b>Deny</b>（拒否）の両方の rule があります。特定の悪意ある IP アドレスを遮断するのに使えます。</li>
<li><b>Stateless</b>（ステートレス、状態を記憶しない）: 受信方向と送信方向は別々に検査されるため、両方向の rule を書く必要があります。</li>
<li>rule は番号の小さい順に評価され、最初に一致した rule が適用されます。</li>
</ul>

<div class="box idea"><b>🧠 かんたんに言うと</b><p><b>NACL</b> は<b>マンションのエントランス</b>にいる警備員です。入ってよい人のリストと出入り禁止のブラックリストを持ち、入るときも出るときもチェックします（誰の顔も覚えていません）。<b>Security group</b> は<b>各住戸の玄関の鍵</b>です。招待客のリストしかなく、招かれて入った人は、改めて確認されることなくそのまま出られます。</p></div>

<table>
<tr><th>特徴</th><th>Security group</th><th>Network ACL</th></tr>
<tr><td>アタッチ先</td><td>インスタンス（個々のサーバー）</td><td>サブネット（サブネット全体）</td></tr>
<tr><td>rule の種類</td><td>Allow のみ</td><td>Allow と Deny</td></tr>
<tr><td>状態</td><td>Stateful: 戻りの通信は自動的に許可</td><td>Stateless: 両方向を許可する必要がある</td></tr>
<tr><td>rule の評価順</td><td>すべての rule を評価</td><td>番号順に評価し、最初に一致した時点で終了</td></tr>
<tr><td>使う場面</td><td>どのサーバーに誰が入れるかを細かく制御する</td><td>サブネットレベルで IP 範囲ごと遮断する</td></tr>
</table>

<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>BanhNgon の Web サーバーの security group は、port 443（HTTPS）をすべての送信元から許可し、port 22（SSH）は ミンさんのオフィスの IP アドレスからのみ許可しています。データベースは専用のサブネットにあり、データベースの security group は Web サーバーの security group からのトラフィックだけを許可しています。</p><p>ある日 ミンさんは、見知らぬ IP アドレスが繰り返しスキャンをかけてきていることに気づきました。Security group には Deny の rule がないため、ミンさんはサブネットの <b>network ACL</b> にそのアドレスを <b>Deny</b> する rule を追加しました。</p></div>

<h3>よく耳にする攻撃: DDoS、SQL injection、XSS</h3>
<ul>
<li><b>DDoS</b>（Distributed Denial of Service、分散型サービス拒否攻撃）: 攻撃者が何千台ものマシンを操り、Web サイトへ一斉に無意味なリクエストを送りつけて過負荷にし、本当のお客さんがアクセスできないようにします。何百人もがケーキの注文用の電話番号にひっきりなしに電話をかけ、本当のお客さんがつながらなくなるようなものです。</li>
<li><b>SQL injection</b>（SQL インジェクション）: 攻撃者が入力欄（例: 検索ボックス）にデータベースのコマンドを打ち込みます。Web サイトの処理がずさんだと、そのコマンドが実際に実行され、データを盗み見られたり削除されたりするおそれがあります。</li>
<li><b>XSS</b>（Cross-Site Scripting）: 攻撃者が Web ページ（例: コメント欄）に悪意あるコードを仕込みます。ほかの人がそのページを開くと、その人のブラウザがそのコードを実行してしまい、ログインセッションを盗まれるおそれがあります。</li>
</ul>

<h3>AWS Shield、AWS WAF、AWS Firewall Manager</h3>
<h4>AWS Shield: DDoS 対策</h4>
<ul>
<li><b>AWS Shield Standard</b>: <b>無料</b>で、すべての AWS のお客様に対して<b>自動的に有効</b>になっています。ネットワーク層とトランスポート層（layer 3/4）の一般的な DDoS 攻撃、たとえば <b>SYN flood</b> や UDP reflection から保護します。利用者は何もする必要がありません。予算が限られた小規模な Web サイトで、対応チームやコスト保護が不要なら、Shield Standard で十分です。</li>
<li><b>AWS Shield Advanced</b>: <b>有料</b>で、CloudFront、Route 53、Elastic Load Balancing、EC2、Global Accelerator などのリソースを対象とした高度な保護です。さらに、AWS の DDoS 対応チーム（Shield Response Team）による 24 時間 365 日のサポート、詳細なレポート、攻撃を受けてリソースが急増した場合のコスト保護が付きます。</li>
</ul>
<h4>AWS WAF: ウェブアプリケーションファイアウォール</h4>
<p><b>AWS WAF</b>（Web Application Firewall）は、Web リクエストの中身（アプリケーション層、layer 7）を読み取り、rule に従ってフィルタリングします。WAF は <b>Amazon CloudFront、Application Load Balancer、Amazon API Gateway</b> などのサービスにアタッチします。よく使われる rule の種類は次のとおりです。</p>
<ul>
<li>リクエストの内容に含まれる <b>SQL injection、XSS</b> を遮断する。</li>
<li><b>IP アドレス</b>または<b>国</b>（geo match）に基づいて遮断／許可する。</li>
<li><b>Rate-based rule</b>（レートベースのルール）: ある IP が短時間に許容数を超えるリクエストを送ると、その IP を自動的に遮断します。ログインページへのパスワード総当たり（brute force）や、一部の送信元が大量に送りつける HTTP flood への対策に向いています（rule が IP ごとにリクエスト数を数え、しきい値を超えた IP を自動で遮断します）。</li>
<li><b>Managed rule groups</b>（あらかじめ用意された rule のセット）: AWS が提供するもののほか、<b>サードパーティのセキュリティベンダー</b>が作成・更新して <b>AWS Marketplace</b> で販売しているものがあり、料金は AWS の請求書に計上されます。自分で rule を書く必要はありません。</li>
</ul>
<h4>AWS Firewall Manager: 一元管理</h4>
<p>会社に AWS アカウントがたくさんあると、WAF の rule や security group をアカウントごとに 1 つずつ設定するのは大変で、漏れも起きやすくなります。<b>AWS Firewall Manager</b> を使うと、ファイアウォールのルール（WAF、Shield Advanced、security group、Network Firewall など）を<b>一度</b>設定するだけで、<b>AWS Organizations 内のすべてのアカウント</b>に適用できます。あとから新しく作成されたアカウントやリソースも対象になります。</p>
<div class="flow"><span>ユーザー</span><span>Shield（DDoS 対策）</span><span>WAF（Web リクエストのフィルタリング）</span><span>NACL（サブネット）</span><span>Security group（サーバー）</span></div>

<div class="box trap"><b>⚠️ よくあるひっかけ</b><p><b>Shield</b> は <b>DDoS</b> 対策、<b>WAF</b> は <b>SQL injection、XSS</b> 対策と Web リクエストのフィルタリングです。試験ではこの 2 つがよく並べて出されます。問題文に "free, automatically enabled" とあれば → Shield <b>Standard</b>。"24/7 DDoS response team" や "cost protection" とあれば → Shield <b>Advanced</b> です。</p></div>

<h3>サードパーティのセキュリティツール: AWS Marketplace</h3>
<p>AWS のサービス以外にも、ほかのセキュリティベンダーの製品（次世代ファイアウォール、侵入検知、ウイルス対策など）を利用できます。<b>AWS Marketplace</b> はソフトウェアの「市場」で、こうした製品を探して購入し、AWS 上にデプロイできます。そして<b>料金は AWS の請求書にまとめて計上されます</b>。</p>

<div class="box exam"><b>🎯 試験でよく問われること</b><ul>
<li>"Stateful, instance level" → <b>Security group</b></li>
<li>"Stateless, subnet level, allow and deny rules" → <b>Network ACL</b></li>
<li>"Block a specific IP address at the subnet" → <b>Network ACL</b>（Web アプリケーションの場合は AWS WAF）</li>
<li>"DDoS protection, free, automatic for all customers" → <b>AWS Shield Standard</b></li>
<li>"SQL injection, cross-site scripting, filter web requests" → <b>AWS WAF</b></li>
<li>"Centrally manage firewall rules across accounts in AWS Organizations" → <b>AWS Firewall Manager</b></li>
<li>"Buy third-party security software billed through AWS" → <b>AWS Marketplace</b>; "WAF rule set built by a third-party vendor" → <b>AWS Marketplace</b>（managed rule group）</li>
<li>"Block IPs that send too many requests in a short time", "password-guessing on login page" → <b>AWS WAF rate-based rule</b></li>
<li>"Block requests from specific countries" → <b>AWS WAF</b>（geo match）</li>
<li>"24/7 Shield Response Team, DDoS cost protection" → <b>AWS Shield Advanced</b></li>
<li>"SQL injection + DDoS team + auto-apply to new accounts in Organizations" → <b>WAF + Shield Advanced + Firewall Manager</b></li>
</ul></div>
`,summary:["Firewall はトラフィックを検査し、rule（アドレス、ポート、プロトコル）に従って通すか遮断します。","Security group: インスタンスレベル、stateful、rule は Allow のみ。","Network ACL: サブネットレベル、stateless、Allow と Deny の両方があり、番号順に評価されます。","AWS Shield Standard は無料で自動的に DDoS から保護します。Shield Advanced は有料で、24 時間 365 日のサポートチームが付きます。","AWS WAF は SQL injection と XSS を遮断し、IP／国でフィルタリングし、rate-based rule でリクエストを送りすぎる IP を遮断します。CloudFront、ALB、API Gateway にアタッチでき、AWS 提供の managed rule groups と、Marketplace にあるサードパーティ製のものがあります。","AWS Firewall Manager は、AWS Organizations 内の複数アカウントのファイアウォールルールを一元管理します。","AWS Marketplace はサードパーティのセキュリティツールを購入する場所で、料金は AWS の請求書で支払います。"],terms:[["Firewall","ファイアウォール"],["Port","ポート（通信の出入口の番号）"],["VPC (Virtual Private Cloud)","仮想プライベートクラウド（仮想の専用ネットワーク）"],["Subnet","サブネット"],["Security group","セキュリティグループ（インスタンスレベルのファイアウォール）"],["Network ACL (NACL)","ネットワークアクセスコントロールリスト（サブネットレベル）"],["Stateful","ステートフル（状態を記憶する）"],["Stateless","ステートレス（状態を記憶しない）"],["DDoS (Distributed Denial of Service)","分散型サービス拒否攻撃"],["SQL injection","SQL コードを注入する攻撃"],["Cross-site scripting (XSS)","Web ページに悪意あるコードを埋め込む攻撃"],["AWS Shield","DDoS 対策サービス"],["AWS WAF (Web Application Firewall)","ウェブアプリケーションファイアウォール"],["AWS Firewall Manager","ファイアウォールの一元管理"],["Rate-based rule","リクエストを送りすぎる送信元を遮断する WAF の rule"],["AWS Marketplace","AWS 上のサードパーティ製ソフトウェアの市場"]]};
L.course["2-5"]={title:"脅威の検出と調査: GuardDuty、Inspector、Macie、Detective、Security Hub",goals:["GuardDuty、Inspector、Macie、Detective、Security Hub の主な機能を知る","試験問題のキーワードから 5 つのサービスを素早く見分けられる","Trusted Advisor がセキュリティ面で何に役立つかを理解する"],html:`
<h3>なぜ「検出」のサービスが必要なのか？</h3>
<p>レッスン 2-2 から 2-4 では、権限を設定し、MFA を有効にし、ファイアウォールを構築しました。これらは<b>予防</b>のための対策です。しかし完璧な柵はありません。パスワードが漏れることもあれば、ソフトウェアに新しい脆弱性が見つかることもあり、従業員がうっかり機密データを公開の場所に置いてしまうこともあります。</p>
<p>そこで、<b>検出</b>のための対策（detective controls）も必要になります。継続的に監視し、異常の兆候を見つけて知らせてくれる仕組みです。AWS には複数のサービスからなる「警備チーム」があり、それぞれが専門分野を持っています。各サービスが報告する結果は、一般に <b>finding</b>（検出結果、アラート）と呼ばれます。</p>

<div class="box idea"><b>🧠 かんたんに言うと</b><p>警備チームのいるショッピングモールを想像してください。</p><ul>
<li><b>GuardDuty</b> は<b>防犯カメラの監視員</b>です。昼夜を問わず映像を見て、不審な行動（午前 3 時にうろつく人など）を見つけます。</li>
<li><b>Inspector</b> は<b>錠前の点検係</b>です。ドアを 1 つずつ回り、古くて壊されやすい錠がないかを調べます。</li>
<li><b>Macie</b> は<b>書類金庫の点検係</b>です。身分証明書やカード番号が無造作に置かれていないかを探します。</li>
<li><b>Detective</b> は<b>探偵</b>です。事件が起きたら痕跡をたどって原因を突き止めます。</li>
<li><b>Security Hub</b> は<b>指令室</b>です。全員の報告を 1 つの大きな画面に集約します。</li>
</ul></div>

<h3>Amazon GuardDuty: 脅威の検出</h3>
<p><b>Amazon GuardDuty</b> は <b>threat detection</b>（脅威検出）のサービスです。<b>AWS CloudTrail</b>（アカウント内の操作ログ）、<b>VPC Flow Logs</b>（ネットワークトラフィックのログ）、<b>DNS logs</b>（ドメイン名の問い合わせログ）といったログソースを継続的に分析し、<b>machine learning</b>（機械学習）と既知の悪意あるアドレスのリストを使って異常を見つけます。</p>
<p>検出の例: ある EC2 サーバーが、暗号資産マイニングを行う攻撃者のものとして知られる IP アドレスと通信している。あるいは、真夜中に見慣れない国から API 呼び出しがあった。GuardDuty は数クリックで有効にでき、サーバーにソフトウェア（agent）をインストールする必要はありません。</p>
<p>GuardDuty には拡張の保護機能もあり、なかでも覚えておきたいのが <b>S3 Protection</b> です。S3 バケット内のデータへのアクセス操作（S3 data events）を監視し、既知の悪意ある IP から object が読み取られたときや、異常なアクセスパターンから認証情報が悪用されてデータが持ち出されていると見られるときにアラートを出します。</p>
<div class="box trap"><b>⚠️ よくあるひっかけ</b><p>GuardDuty S3 Protection も Macie も「S3 に関係する」サービスですが、答える問いが違います。<b>Macie</b>: バケットの<b>中に</b>どんな機密データ（カード番号、パスポート、PII）があるか？ <b>GuardDuty S3 Protection</b>: バケットに不審な<b>アクセスをしているのは誰か</b>（悪意ある IP、悪用された credential）？</p></div>

<h3>Amazon Inspector: ソフトウェアの脆弱性を見つける</h3>
<p><b>vulnerability</b>（脆弱性）とは、攻撃者に悪用されうるソフトウェアの弱点です。脆弱性は毎日のように公表されています。</p>
<p><b>Amazon Inspector</b> は、<b>EC2 instance</b>、Amazon ECR 内の <b>container image</b>、<b>Lambda function</b> を<b>自動的かつ継続的にスキャン</b>し、既知のソフトウェア脆弱性（CVE。コードが利用しているオープンソースライブラリ内のものも含む）と、意図せずネットワークを外部に公開している状態（unintended network exposure）を見つけます。新しい脆弱性が公表されると Inspector が自動で再スキャンするため、どの Lambda 関数や image が影響を受けるかをすぐに把握できます。重大度を評価してくれるので、どれから先にパッチを当てるべきかが分かります。</p>
<p><i>更新情報: 2025 年 6 月から Inspector に <b>code security</b> が加わりました。ソースコードリポジトリ（例: GitHub、GitLab）をスキャンし、自作コードの不具合（SAST）、依存ライブラリの脆弱性（SCA）、Infrastructure as Code（IaC）テンプレートの設定ミスを見つけます。</i></p>

<h3>Amazon Macie: 機密データを見つける</h3>
<p><b>PII</b>（Personally Identifiable Information、個人を特定できる情報）とは、個人を特定できるデータのことです。住所付きの氏名、電話番号、銀行カード番号などが該当します。</p>
<p><b>Amazon Macie</b> は機械学習とパターンマッチングを使って、<b>Amazon S3 内の PII などの機密データを見つけます</b>。あわせて、公開状態になっているバケットや暗号化されていないバケットについても警告します。覚え方: Macie は <b>S3</b> と<b>機密データ</b>に結びつきます。</p>

<h3>Amazon Detective と AWS Security Hub</h3>
<p><b>Amazon Detective</b> は<b>調査</b>を支援します。GuardDuty が「何か起きている」と知らせてきたら、どこから始まったのか、どのリソースが関係しているのか、どれくらい続いているのかを知る必要があります。Detective はログデータを自動で集めて関係図として可視化し、<b>root cause</b>（根本原因）を突き止められるようにします。</p>
<p><b>AWS Security Hub</b> は<b>集約</b>の場所です。GuardDuty、Inspector、Macie をはじめ多くのサービス（パートナー製品を含む）からのアラートを、<b>複数アカウント</b>にわたって 1 つの画面に集めます。さらに、セキュリティ標準（例: AWS Foundational Security Best Practices、<b>CIS AWS Foundations Benchmark</b>）に照らして設定を自動でチェックし、セキュリティ状況をスコアで示します。</p>
<p><i>名称に関する更新情報: 新しい Security Hub は 2025 年 6 月から preview として公開され、2025 年 12 月 2 日に一般提供（GA）となりました。それ以降、標準に基づく設定チェックの部分は <b>AWS Security Hub CSPM</b> という名前になり、AWS Security Hub という名前は、GuardDuty、Inspector、Macie、Security Hub CSPM からのリスクを集約して優先順位を付ける新しいバージョンを指します。試験対策としては、"centralized view of findings, compliance checks across accounts" → Security Hub と覚えておけば大丈夫です。</i></p>

<table>
<tr><th>サービス</th><th>答えてくれる問い</th><th>対象／ソース</th><th>試験でのキーワード</th></tr>
<tr><td>GuardDuty</td><td>誰かが不審なことをしていないか？</td><td>CloudTrail、VPC Flow Logs、DNS logs</td><td>threat detection, malicious activity, ML</td></tr>
<tr><td>Inspector</td><td>自分のソフトウェアに脆弱性はないか？</td><td>EC2、container image（ECR）、Lambda、ソースコードリポジトリ（code security）</td><td>vulnerabilities, CVE, automated scanning</td></tr>
<tr><td>Macie</td><td>機密データはどこにあるか？</td><td>Amazon S3</td><td>PII, sensitive data</td></tr>
<tr><td>Detective</td><td>何が、なぜ起きたのか？</td><td>ログデータと finding</td><td>investigate, root cause</td></tr>
<tr><td>Security Hub</td><td>セキュリティの全体像はどうなっているか？</td><td>複数のサービス・複数のアカウントからの finding</td><td>centralized view, security posture</td></tr>
</table>

<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>BanhNgon には今では注文アプリがあり、お客さんの配送先情報を S3 に保存しています。ミンさんは警備チームを全員稼働させました。</p><ul>
<li><b>Macie</b> の報告: お客さんの氏名と電話番号が入った Excel ファイルが、公開されている商品画像用のバケットに置かれていました。ミンさんはすぐに移動させました。</li>
<li><b>Inspector</b> の報告: EC2 サーバーが、重大度 Critical の脆弱性があるライブラリを使っていました。ミンさんはパッチを適用しました。</li>
<li><b>GuardDuty</b> の報告: 見知らぬ IP アドレスから API へのログインがありました。ミンさんは <b>Detective</b> を開いて、古い access key がインターネット上に漏れていたことを突き止め、その key を無効化しました。</li>
<li>すべてのアラートは <b>Security Hub</b> にまとめて表示されるので、ランさんは 1 つの画面を見るだけで状況を把握できます。</li>
</ul></div>

<div class="box trap"><b>⚠️ よくあるひっかけ</b><p><b>GuardDuty</b>（いま起きている不審な行動を検出）と <b>Inspector</b>（ソフトウェアの脆弱性を見つける）はとても混同しやすい組み合わせです。"vulnerabilities" を問われたら → Inspector。"threats, malicious activity, analyzing logs" を問われたら → GuardDuty です。</p><p><b>Detective</b>（原因の調査）と <b>GuardDuty</b>（検出）も紛らわしい組み合わせです。GuardDuty が警報を鳴らし、Detective がその後の調査を助けます。</p></div>

<h3>Trusted Advisor: 自動のアドバイザー</h3>
<p><b>AWS Trusted Advisor</b> はアカウントをチェックし、コスト最適化、パフォーマンス、<b>セキュリティ</b>、耐障害性、サービスの制限（service quotas）、運用といった複数のカテゴリで推奨事項を提示します。</p>
<p>代表的なセキュリティチェックには、アクセス権限が開放されている S3 バケット、機密性の高い port をインターネット全体に開放している security group、MFA を有効にしていない root user、IAM を使っていない状態、公開状態の EBS/RDS snapshot などがあります。無制限に port を開放している security group、MFA 未設定の root、S3 バケットの権限、IAM の利用、公開 snapshot といった<b>コアセキュリティチェック</b>（core security checks）は、<b>Basic Support プランを含むすべてのアカウントで無料</b>です。すべてのチェックを使えるかどうかは AWS Support のプランによって決まります（詳細は公式ページで確認してください）。</p>

<div class="box exam"><b>🎯 試験でよく問われること</b><ul>
<li>"Uses ML to analyze CloudTrail, VPC Flow Logs, DNS logs to detect threats" → <b>Amazon GuardDuty</b></li>
<li>"Automatically scans EC2 instances and container images for vulnerabilities" → <b>Amazon Inspector</b></li>
<li>"Discover and protect PII / sensitive data in S3" → <b>Amazon Macie</b></li>
<li>"Investigate root cause of suspicious activity" → <b>Amazon Detective</b></li>
<li>"Centralized view of security alerts across multiple accounts" → <b>AWS Security Hub</b></li>
<li>"Recommendations: open security group ports, root MFA, S3 bucket permissions"（Basic Support でも追加料金なし）→ <b>AWS Trusted Advisor</b></li>
<li>"Alert when S3 objects are read from malicious IPs / credentials misused to pull data" → <b>GuardDuty S3 Protection</b>; "which buckets contain credit card or passport numbers" → <b>Macie</b></li>
<li>"Find Lambda functions and ECR images with a vulnerable library, continuously" → <b>Amazon Inspector</b></li>
<li>"Compare accounts against CIS Benchmark + one place for GuardDuty/Inspector/Macie findings" → <b>AWS Security Hub</b></li>
<li>"Check configuration against CIS / AWS Foundational Security Best Practices (FSBP)" → 選択肢に <b>AWS Security Hub CSPM</b> があればそれを選び、なければ <b>AWS Security Hub</b> を選びます</li>
</ul></div>
`,summary:["GuardDuty: CloudTrail、VPC Flow Logs、DNS logs を ML で分析して脅威を検出し、agent は不要です。S3 Protection は S3 への不審なアクセスを検出します（機密データを探す Macie とは別物）。","Inspector: EC2、container image、Lambda のソフトウェア脆弱性を自動でスキャンします（2025 年からはソースコードリポジトリも対象）。","Macie: S3 内の機密データ（PII）を見つけます。","Detective: セキュリティインシデントを調査し、根本原因を突き止めます。","Security Hub: 複数のサービス・複数のアカウントからアラートを集約し、セキュリティ標準に基づいてスコアを付けます。","Trusted Advisor には、開放された port、MFA 未設定の root、公開状態の S3 バケットなど、無料（Basic Support でも利用可）のコアセキュリティチェックがあります。"],terms:[["Threat detection","脅威検出"],["Finding","検出結果（サービスが報告するアラート）"],["Vulnerability","脆弱性"],["PII (Personally Identifiable Information)","個人を特定できる情報"],["Sensitive data","機密データ"],["Root cause","根本原因"],["Security posture","セキュリティ体制（全体的なセキュリティ状況）"],["Machine learning","機械学習"],["VPC Flow Logs","VPC 内のネットワークトラフィックのログ"],["Amazon GuardDuty","脅威検出サービス"],["Amazon Inspector","脆弱性スキャンサービス"],["Amazon Macie","S3 内の機密データを見つけるサービス"],["Amazon Detective","セキュリティインシデントの調査サービス"],["AWS Security Hub","セキュリティアラートの集約センター"],["AWS Trusted Advisor","ベストプラクティスに基づく推奨ツール"]]};
L.course["2-6"]={title:"データの暗号化: at rest、in transit、KMS、CloudHSM、ACM",goals:["暗号化とは何か、なぜ必要なのかを理解する","at rest の暗号化と in transit の暗号化を区別できる","AWS KMS、AWS CloudHSM、AWS Certificate Manager をそれぞれいつ使うかが分かる","それぞれの選択肢で誰がキーを管理するのかを理解する"],html:`
<h3>暗号化とは？</h3>
<p><b>Encryption</b>（暗号化）とは、読めるデータを意味のない文字列に変換することで、正しい <b>key</b>（キー、鍵）を持つ人だけが元に戻せます（<b>decryption</b>、復号）。暗号化されていないデータを <b>plaintext</b>、暗号化されたデータを <b>ciphertext</b> と呼びます。</p>
<p>暗号化は攻撃者がデータを手に入れること自体は防げませんが、キーがなければ、手に入れたデータを<b>役に立たない</b>ものにします。そのため、<b>キーを守ること</b>は暗号化そのものと同じくらい重要です。</p>

<div class="box idea"><b>🧠 かんたんに言うと</b><p>暗号化は、書類を<b>鍵付きの箱</b>にしまうようなものです。泥棒は箱ごと持ち去れますが、鍵がなければ何も読めません。鍵を持っている人こそが、書類を本当にコントロールしている人です。</p></div>

<h3>At rest と in transit</h3>
<p>データには主に 2 つの状態があり、その両方で保護する必要があります。</p>
<ul>
<li><b>Data at rest</b>（保管中のデータ）: ディスク上、データベース内、S3 バケット内、バックアップ内で「じっとしている」データです。保管時の暗号化（at rest）は、誰かにディスクやバックアップファイルを持ち出された場合にデータを守ります。AWS では多くのサービスが保管時の暗号化に対応しており、たとえば <b>S3、EBS、RDS、DynamoDB</b> があり、たいてい AWS KMS と統合されています。2023 年から、S3 は新しい object をすべて自動的に暗号化します。</li>
<li><b>Data in transit</b>（転送中のデータ）: ネットワーク上を「移動している」データです。たとえばお客さんのブラウザから Web サイトへ、あるいは 2 台のサーバー間を流れるデータです。転送中の暗号化（in transit）には <b>TLS</b>（Transport Layer Security、以前は SSL と呼ばれていました）というプロトコルを使います。Web サイトが <b>HTTPS</b>（ブラウザに鍵のアイコンが表示される）を使っていれば、データは転送中に暗号化されています。一方、<b>自社のオフィス／データセンターと VPC をインターネット経由で</b>接続する場合は <b>AWS Site-to-Site VPN</b> を使い、暗号化された <b>IPsec</b> の「トンネル」を作ります。</li>
</ul>
<table>
<tr><th></th><th>At rest</th><th>In transit</th></tr>
<tr><td>データの場所</td><td>ディスク、データベース、S3、バックアップ</td><td>ネットワーク上を移動中</td></tr>
<tr><td>何から守るか</td><td>ディスクの紛失、バックアップファイルの流出</td><td>通信経路上での盗聴</td></tr>
<tr><td>代表的な AWS のツール</td><td>AWS KMS、CloudHSM、S3/EBS/RDS の暗号化機能</td><td>TLS/HTTPS（ACM の証明書）、Site-to-Site VPN（IPsec）</td></tr>
</table>
<h4>Amazon S3 でデータを暗号化する方法</h4>
<table>
<tr><th>方法</th><th>誰が暗号化するか／誰がキーを持つか</th><th>備考</th></tr>
<tr><td><b>SSE-S3</b>（server-side encryption、S3 が管理するキー）</td><td>保存時に S3 が暗号化し、キーも S3 が管理する</td><td><b>デフォルト</b>: 何も指定せずにアップロードし、バケットにも何も設定していない場合 → object は SSE-S3 で暗号化される</td></tr>
<tr><td><b>SSE-KMS</b></td><td>S3 が AWS KMS 内のキーで暗号化する</td><td>キーの使用権限を自分で制御でき、キーが使われるたびに CloudTrail にログが残る</td></tr>
<tr><td><b>Client-side encryption</b></td><td>アップロード前に<b>自分で</b>暗号化する</td><td>S3 は暗号化済みのデータを受け取るだけ</td></tr>
</table>
<p>自分のキーを使いたい場合は、バケットの <b>default encryption</b>（デフォルトの暗号化）を SSE-KMS に設定できます。暗号化のほかに、S3 には <b>S3 Object Lock</b> もあります。保持期間のあいだ、<b>WORM</b>（write once, read many: 一度書き込んだら誰も変更・削除できない）モデルで object をロックする機能で、法令に基づく記録保管の要件に役立ちます。</p>

<div class="box idea"><b>🧠 かんたんに言うと</b><p><b>at rest</b> の暗号化は、お店の中の金庫のようなものです。お金がじっと置かれているあいだ守ります。<b>in transit</b> の暗号化は<b>装甲の現金輸送車</b>のようなものです。お店から銀行へ運ばれる途中のお金を守ります。</p></div>

<h3>AWS KMS: キー管理サービス</h3>
<p><b>AWS Key Management Service (KMS)</b> は、暗号化キーの<b>作成、保管、管理、使用の制御</b>を行うためのサービスです。キーは AWS が運用する安全なハードウェアデバイス内で保護され、暗号化されていない形で KMS の外に出ることは決してありません。</p>
<ul>
<li>非常に多くのサービスと統合されています。S3、EBS、RDS の暗号化は、いくつかの項目を選ぶだけで有効にできます。</li>
<li>IAM policy と <b>key policy</b> を使って、誰がどのキーを使えるかを決めます。</li>
<li>キーの使用はすべて <b>AWS CloudTrail</b> に記録されるため、監査が可能です。</li>
<li>KMS のキーには 3 種類あります。<b>customer managed key</b>（自分で作成して制御するキー。月額料金がかかる）、<b>AWS managed key</b>（自分のアカウント内にあり、あるサービスのために AWS が作成・管理してくれるキー。alias は <code>aws/s3</code> のような形式で、参照はできるが設定は変更できない）、<b>AWS owned key</b>（AWS サービス側のアカウントにあり、複数のお客様で共用されるキー。利用者からは見えず管理もできず、完全に無料。多くのサービスがデフォルトの暗号化にこの種類を使う）です。</li>
</ul>
<p>試験で「会社が制御するキー」を求められたら、答えは <b>Customer managed key</b> です。key policy を自分で書き、<b>キーの自動ローテーション</b>（デフォルトでは年 1 回）を有効にし、キーを<b>無効化（disable）</b>したり削除をスケジュールしたりでき、1 つのキーを複数のサービスで使えます。使用履歴はすべて CloudTrail に残ります。KMS は、1 社のお客様専用の HSM は提供<b>しません</b>。それが必要なら CloudHSM を使います。</p>

<h3>AWS CloudHSM: 専用のキー保管デバイス</h3>
<p><b>HSM</b>（Hardware Security Module、ハードウェアセキュリティモジュール）は、キーの保管と暗号化処理を行うための専用デバイスで、物理的な改ざんに耐えるよう設計されています。</p>
<p><b>AWS CloudHSM</b> では、AWS クラウド内の<b>専用</b>（single-tenant、ほかのお客様と共用しない）HSM を借りられます。HSM 上のキーとユーザーの管理は、すべて<b>お客様自身</b>が行います。AWS はハードウェアの面倒を見るだけで、お客様のキーにはアクセスできません。法令や契約上の要件で、専用ハードウェア上でキーを完全に自社管理しなければならない場合に使います。</p>
<table>
<tr><th></th><th>AWS KMS</th><th>AWS CloudHSM</th></tr>
<tr><td>ハードウェア</td><td>AWS が管理し、インフラを共用</td><td>自社専用の HSM</td></tr>
<tr><td>誰がキーを管理するか</td><td>AWS がサービスを運用し、利用者がキーの使用権限を制御</td><td>利用者が完全に自分で管理</td></tr>
<tr><td>使いやすさ</td><td>とても簡単で、多くのサービスと統合済み</td><td>より多くの手間がかかる</td></tr>
<tr><td>選ぶ場面</td><td>ほとんどのケース</td><td>厳格なコンプライアンス要件があり、専用 HSM が必要な場合</td></tr>
</table>

<h3>AWS Certificate Manager と HTTPS</h3>
<p>Web サイトを HTTPS で動かすには、<b>SSL/TLS certificate</b>（デジタル証明書）が必要です。これは、その Web サイトが確かに自分のものであることを示す「身分証明書」のようなもので、ブラウザが接続を暗号化できるようにします。</p>
<p><b>AWS Certificate Manager (ACM)</b> は、SSL/TLS 証明書の<b>発行、管理、自動更新</b>を行います。ACM が発行するパブリック証明書は、<b>Elastic Load Balancing、Amazon CloudFront、Amazon API Gateway</b> などの統合サービスで使う場合は無料です。更新を忘れて Web サイトに「安全ではありません」という警告が出る心配がなくなります。</p>

<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>ケーキを注文するお客さんは、Web サイトで住所と電話番号を入力します。ミンさんは <b>ACM</b> で banhngon.vn の証明書を発行して load balancer にアタッチしたので、お客さんのブラウザからサーバーまでのデータはすべて HTTPS によって <b>in transit</b> で暗号化されます。</p><p>RDS 上の注文データベースとサーバーの EBS ボリュームは、<b>KMS</b> 内のキーで <b>at rest</b> の暗号化を有効にしています。ミンさんは customer managed key を 1 つ作成し、アプリケーションの role だけがこのキーを使えるようにしました。BanhNgon が日本に進出し、決済パートナーから「キーは専用 HSM 上に置くこと」と求められたときに、はじめて <b>CloudHSM</b> を検討します。</p></div>

<div class="box trap"><b>⚠️ よくあるひっかけ</b><p>問題文に "<b>dedicated</b> hardware security module"、"single-tenant"、"full control of keys" とあれば → <b>CloudHSM</b>。単に "create and manage encryption keys" とあるだけなら → <b>KMS</b> です。</p><p><b>ACM</b> が管理するのは<b>証明書</b>（HTTPS 用、in transit）であり、at rest のデータ暗号化キーを管理する場所では<b>ありません</b>。そして、自分のデータの暗号化を有効にするのは、責任共有モデルにおけるお客様の責任であることを覚えておきましょう。</p></div>

<div class="box exam"><b>🎯 試験でよく問われること</b><ul>
<li>"Create and manage encryption keys", "encrypt data at rest in S3/EBS" → <b>AWS KMS</b></li>
<li>"Dedicated HSM", "regulatory requirement to control keys on dedicated hardware" → <b>AWS CloudHSM</b></li>
<li>"Encrypt data in transit between browsers and website", "provision SSL/TLS certificates" → <b>AWS Certificate Manager (ACM)</b></li>
<li>"Data stored on disk" → <b>at rest</b>; "data moving over the network" → <b>in transit</b></li>
<li>"Ways to encrypt S3 objects at rest" → <b>SSE-S3, SSE-KMS, client-side encryption</b>; "no encryption specified" → デフォルトの <b>SSE-S3</b></li>
<li>"Encrypt traffic between on-premises and VPC over the internet" → <b>Site-to-Site VPN (IPsec)</b></li>
<li>"Keys the company controls, automatic yearly rotation, disable, CloudTrail audit" → <b>KMS customer managed keys</b></li>
<li>"Encrypt EBS at rest + HTTPS to the load balancer" → <b>EBS encrypted with KMS key</b> + <b>HTTPS listener with ACM certificate</b></li>
<li>"Who is responsible for enabling encryption of customer data?" → <b>Customer</b></li>
</ul></div>
`,summary:["暗号化は、キーがなければ読めない形にデータを変換します。キーを守ることが要です。","At rest = 保管されているデータ（S3、EBS、RDS）、in transit = 転送されているデータ（TLS/HTTPS、Site-to-Site VPN の IPsec）。","S3: デフォルトは SSE-S3。SSE-KMS や client 側での暗号化も選べます。S3 Object Lock は変更・削除を防ぎます（WORM）。","AWS KMS はキーを作成・管理し、多くのサービスと統合され、キーの使用はすべて CloudTrail に記録されます。customer managed key なら自動ローテーションや無効化ができます。","AWS CloudHSM は専用の HSM を提供し、キーはお客様が完全に自分で管理します。","AWS Certificate Manager は HTTPS 用の SSL/TLS 証明書を発行・管理し、自動更新します。","データの暗号化を有効にして管理するのはお客様の責任です。"],terms:[["Encryption","暗号化"],["Decryption","復号"],["Encryption key","暗号化キー"],["Plaintext / ciphertext","平文（元のデータ）／暗号文（暗号化されたデータ）"],["Data at rest","保管中のデータ"],["Data in transit","転送中のデータ"],["TLS (Transport Layer Security)","ネットワーク接続を暗号化するプロトコル"],["HTTPS","暗号化された Web 通信プロトコル"],["AWS KMS (Key Management Service)","キー管理サービス"],["Customer managed key","お客様が管理するキー（カスタマーマネージドキー）"],["HSM (Hardware Security Module)","ハードウェアセキュリティモジュール"],["AWS CloudHSM","AWS 上の専用 HSM"],["SSL/TLS certificate","SSL/TLS 証明書"],["SSE-S3 / SSE-KMS","S3 のキー／KMS のキーによる S3 のサーバー側暗号化"],["S3 Object Lock","object をロックして変更・削除を防ぐ機能（WORM）"],["AWS Certificate Manager (ACM)","証明書管理サービス"]]};
L.course["2-7"]={title:"モニタリング、監査、コンプライアンス: CloudTrail、CloudWatch、Config、Artifact",goals:["CloudTrail、CloudWatch、Config をはっきり区別できる","各種セキュリティログがどこにあるかを知る","コンプライアンス（compliance）とは何か、AWS Artifact は何に使うのかを理解し、data residency を満たすためのリージョン選択ができる","AWS 公式のセキュリティ情報源を知る"],html:`
<h3>混同しやすい 3 冊の「帳簿」</h3>
<p>予防と検出ができたら、次はシステムがどう動いているか、誰が何をしたかを知るための<b>記録</b>が必要です。これを担うのが、名前のよく似た 3 つのサービスで、試験ではこれらを区別させる問題が<b>とてもよく</b>出ます。</p>
<p>まず、1 つ概念を押さえましょう。AWS では、あらゆる操作（サーバーの作成、ファイルの削除、権限の変更）は、Web 画面でクリックしてもコマンドを実行しても、すべて AWS に送られる <b>API call</b>（API 呼び出し）です。</p>
<h4>AWS CloudTrail: 誰が、いつ、何をしたか</h4>
<p><b>AWS CloudTrail</b> は、アカウント内の <b>API call</b> を記録します。<b>誰が</b>（どの user/role が）、<b>何を</b>、<b>いつ</b>、<b>どの IP アドレス</b>から、どのリソースに対して行ったかです。<b>監査</b>（audit）と調査のための中心的なツールです。CloudTrail は最初から有効になっており、直近 90 日間の管理イベントの履歴（<b>Event history</b>）を参照できます。もっと長く保存したい場合（例: 法令に従って 7 年間保持する）は、<b>trail</b> を作成してログファイルを S3 バケットに記録し、好きな期間だけ保持します。試験によく出る trail の機能は次の 3 つです。</p>
<ul>
<li><b>Log file integrity validation</b>（ログファイルの整合性検証）: CloudTrail がデジタル署名付きの「digest」ファイルを作成し、S3 内のログファイルが記録後に<b>変更も削除もされていない</b>ことを<b>証明</b>できるようにします。</li>
<li><b>Organization trail</b>: AWS Organizations の <b>management account</b> から作成し、<b>現在および将来のすべてのメンバーアカウント</b>のログを 1 か所に自動で集約して記録します。メンバーアカウントの管理者は、この trail を<b>停止も削除も</b>できません。</li>
<li><b>KMS キーの使用</b>も記録します。誰が（どの IAM principal が）、どのキーを、いつ使ったかが分かります。</li>
</ul>
<h4>Amazon CloudWatch: システムは健全か</h4>
<p><b>Amazon CloudWatch</b> は<b>パフォーマンスと稼働状況</b>をモニタリングします。<b>metrics</b>（CPU 使用率 %、リクエスト数、レイテンシーなどの指標）や <b>logs</b>（CloudWatch Logs によるアプリケーションログ）を収集し、<b>alarm</b>（指標がしきい値を超えたときのアラーム）と <b>dashboard</b>（監視用のダッシュボード）を作成できます。</p>
<h4>AWS Config: 設定はどう変わったか、ルールに合っているか</h4>
<p><b>AWS Config</b> は<b>リソースの設定を時系列で</b>記録し（例: この security group は昨日どの port を開けていて、今日はどの port を開けているか）、<b>Config rules</b> を使って、リソースが自分で定めたルールに<b>準拠</b>しているかを<b>継続的に</b>評価します（例: 「すべての EBS ボリュームは暗号化されていること」「公開状態の S3 バケットがないこと」）。Config rule には <b>remediation action</b>（修復アクション。Systems Manager Automation 経由で実行）も関連付けられ、違反しているリソースを<b>自動的に修正</b>できます。たとえばバケットのパブリック読み取り権限を自動でオフにでき、自分で定期実行の仕組みを書く必要はありません。</p>

<div class="box idea"><b>🧠 かんたんに言うと</b><p>ベーカリーを思い浮かべてください。</p><ul>
<li><b>CloudTrail</b> は<b>防犯カメラ + 入退室の記録簿</b>です。誰が何時に金庫を開けたかを記録します。</li>
<li><b>CloudWatch</b> はオーブンに付いた<b>温度計とメーター</b>です。オーブンが何度になっているかを測り、しきい値を超えるとベルが鳴ります。</li>
<li><b>Config</b> は<b>毎日の店内レイアウトを撮った写真</b>と規則一覧表のセットです。今日と昨日を比べ、どこが規則に反しているかを示します（「消火器が定位置から動かされている」）。</li>
</ul></div>

<table>
<tr><th></th><th>AWS CloudTrail</th><th>Amazon CloudWatch</th><th>AWS Config</th></tr>
<tr><td>答える問い</td><td><b>誰が</b>、いつ、何をしたか？</td><td>システムは<b>健全</b>か？ パフォーマンスはどうか？</td><td>設定はどう<b>変わった</b>か？ <b>ルールに合っている</b>か？</td></tr>
<tr><td>記録するもの</td><td>API call、ユーザーのアクティビティ</td><td>Metrics、logs、events</td><td>リソースの設定状態の時系列</td></tr>
<tr><td>主な機能</td><td>イベント履歴、S3 に保存する trail</td><td>Alarm、dashboard、CloudWatch Logs</td><td>Config rules、設定履歴</td></tr>
<tr><td>試験でのキーワード</td><td>audit, who made the change, API activity</td><td>monitor performance, CPU, alarm, metrics</td><td>configuration changes, compliance with rules, resource inventory</td></tr>
</table>

<div class="box trap"><b>⚠️ よくあるひっかけ</b><p>問題:「誰が S3 バケットを削除したのか？」→ <b>CloudTrail</b>（Config ではない）。問題:「この security group の設定は時間とともにどう変わったか、ルールに合っているか？」→ <b>Config</b>。問題:「CPU が 80% を超えたらアラートを出す」→ <b>CloudWatch</b>。コツ: <b>who</b> という語があれば → CloudTrail、<b>performance/alarm</b> → CloudWatch、<b>configuration/compliance rules</b> → Config です。</p></div>

<h3>セキュリティログはどこにある？</h3>
<ul>
<li><b>AWS CloudTrail logs</b>: アカウント内の API アクティビティ（誰が何をしたか）。</li>
<li><b>Amazon CloudWatch Logs</b>: アプリケーションや OS のログ。ほかの多くのサービスからログを受け取り、検索やアラートに使うこともできます。</li>
<li><b>VPC Flow Logs</b>: VPC 内のネットワークインターフェイスを出入りする IP トラフィックの情報（どこからどこへ、許可されたか遮断されたか）。</li>
<li><b>Amazon S3 server access logs</b>: ある S3 バケットへのアクセスリクエストを記録します。</li>
</ul>
<p>これらのログは通常 S3 または CloudWatch Logs に保存され、レッスン 2-5 の GuardDuty や Detective のデータソースにもなります。</p>
<p><b>即時のアラート</b>: ログは誰かが読んではじめて役に立ちます。「誰かが root で console にログインしたら数分以内にメールを送る」には、2 つのサービスを組み合わせます。<b>Amazon EventBridge</b>（rule に従って CloudTrail からのイベントを捕捉する。例: root のログインイベント）→ <b>Amazon SNS</b>（Simple Notification Service。サブスクライバーにメール／SMS を送る）。</p>
<div class="flow"><span>root がログイン</span><span>CloudTrail がイベントを記録</span><span>EventBridge の rule に一致</span><span>SNS がメールを送信</span></div>

<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>ある朝、Web サイトの商品画像が消えていました。ミンさんが <b>CloudTrail</b> を開くと、インターン生の user が昨夜 23:10 に画像フォルダを削除していたことが分かりました。続けて <b>AWS Config</b> を見ると、先週、誰かがサーバーの port 22 をインターネット全体に開放していたことが判明しました。Config rule はこのリソースを "noncompliant"（非準拠）としてマークしていました。一方 <b>CloudWatch</b> は、Web サイトの 404 エラー数が急増したため、昨夜のうちにアラートを送っていました。</p></div>

<h3>Compliance（コンプライアンス）と AWS Artifact</h3>
<p><b>Compliance</b>（コンプライアンス）とは、業界や国が求める法律、規制、標準を満たすことです。独立した機関が審査（audit）を行い、認証を与えます。よく出てくる名前がいくつかありますが、何のことか見分けられれば十分です。</p>
<ul>
<li><b>SOC</b>（System and Organization Controls）: サービス提供事業者の統制について、独立した立場から監査した報告書。</li>
<li><b>PCI DSS</b>: <b>決済カード</b>のデータを取り扱う組織向けのセキュリティ標準。</li>
<li><b>ISO/IEC 27001</b>: 情報セキュリティマネジメントシステムに関する国際標準。</li>
<li><b>HIPAA</b>: <b>医療・健康情報</b>の保護に関する米国の法律。</li>
</ul>
<p>AWS は自社のインフラ部分について多くの認証を取得しています。しかし責任共有モデルでは、AWS のインフラが基準を満たしていても、お客様のアプリケーションが自動的に基準を満たすことには<b>なりません</b>。また、<b>コンプライアンスの対応状況はサービスによって異なります</b>。すべてのサービスがすべてのプログラムの対象範囲に入っているわけではありません（AWS には確認用の "Services in Scope" ページがあります）。</p>
<p><b>AWS Artifact</b> は無料のセルフサービスポータルで、2 つの部分があります。</p>
<ul>
<li><b>Artifact Reports</b>: <b>AWS のコンプライアンスレポートをダウンロード</b>できます（SOC レポート、PCI、ISO 認証など）。監査人から「利用しているクラウド事業者が基準を満たしていることを証明してください」と言われたら、ここを使います。</li>
<li><b>Artifact Agreements</b>: アカウント（または組織全体）について、AWS との<b>契約</b>を確認、承諾、管理します。たとえば、AWS 上で医療情報（PHI）を扱う前に HIPAA 法で必要とされる <b>BAA</b>（Business Associate Addendum）です。</li>
</ul>
<p><b>AWS Audit Manager</b>（概要を知っていれば十分）は、<b>自社自身</b>の AWS 利用状況から証拠を継続的に収集し、監査の準備を助けます。</p>
<p><i>注意: Audit Manager は<b>メンテナンスモード</b>に移行しており、<b>2026 年 4 月 30 日</b>から新規アカウントを受け付けていません（既存のお客様は引き続き利用できます）。AWS は代わりに <b>AWS Config</b> の <b>conformance packs</b> の利用を推奨しています。試験対策としては、引き続き "continuously collect evidence for audits" → Audit Manager と覚えておきましょう。</i></p>

<h3>Data residency とセキュリティの情報源</h3>
<p><b>Data residency</b>（データレジデンシー、データの所在地）とは、データを特定の国や地域の中に置かなければならないという要件です。AWS では、データを保存する<b>リージョンをお客様が選び</b>、お客様が設定しない限り、AWS がデータをそのリージョンの外へ勝手に移すことはありません。したがって、データ所在地に関する法令を満たすには、その国にあるリージョンにデータを保存します。</p>
<p>AWS のセキュリティについて調べたいときの公式の情報源は次のとおりです。</p>
<ul>
<li><b>AWS Security Center</b>（AWS のセキュリティページ）: セキュリティとコンプライアンスの概要、ベストプラクティスの資料。</li>
<li><b>AWS Security Blog</b>: ベストプラクティス、新しいセキュリティ機能、サンプルソリューションに関する記事。</li>
<li><b>AWS Knowledge Center</b>（現在は <b>AWS re:Post</b> 上にあります）: AWS が執筆した記事で、よくあるエラーや質問への対処を手順を追って解説しています。お客様が AWS Support に実際に寄せた質問に基づいています。よくあるエラー（例: アカウント間の S3 アクセス許可がうまくいかない）に遭遇したら → まずここを探します。</li>
<li>そのほか: AWS のドキュメント、Trusted Advisor、Security Hub もセキュリティに関する推奨事項を提示します。</li>
</ul>

<div class="box exam"><b>🎯 試験でよく問われること</b><ul>
<li>"Record API calls to audit who did what and when" → <b>AWS CloudTrail</b></li>
<li>"Monitor CPU, set alarms, collect metrics and logs" → <b>Amazon CloudWatch</b></li>
<li>"Record configuration changes and evaluate against desired configurations" → <b>AWS Config</b></li>
<li>"Capture information about IP traffic in a VPC" → <b>VPC Flow Logs</b></li>
<li>"Download AWS SOC/PCI compliance reports" → <b>AWS Artifact</b></li>
<li>"Keep data within a country" → <b>その国にある AWS リージョンを選ぶ</b></li>
<li>"Articles about security best practices and new features" → <b>AWS Security Blog</b>; "AWS-maintained step-by-step troubleshooting article" → <b>AWS Knowledge Center (re:Post)</b></li>
<li>"Prove CloudTrail log files were not modified or deleted" → <b>log file integrity validation</b></li>
<li>"Log API activity of all current and future member accounts centrally, members can't stop it" → <b>organization trail</b></li>
<li>"Keep API records for years" → <b>trail delivering to an S3 bucket</b>（Event history は 90 日間のみ）</li>
<li>"Continuously evaluate and automatically fix noncompliant resources" → <b>AWS Config rules + remediation</b></li>
<li>"Email within minutes when root signs in" → <b>EventBridge + SNS</b></li>
<li>"Review and accept a BAA / agreements with AWS" → <b>AWS Artifact Agreements</b></li>
</ul></div>
`,summary:["CloudTrail は API call を記録します（誰が、何を、いつ、どこから）。Event history は 90 日間で、trail なら S3 に長期保存できます。log file integrity validation と organization trail もあります。","CloudWatch はパフォーマンスをモニタリングします（metrics、logs、alarm、dashboard）。EventBridge + SNS で即時のアラートを送れます（例: root のログイン）。","Config はリソースの設定履歴を記録し、Config rules でコンプライアンスを継続的に評価し、自動修復（remediation）もできます。","セキュリティログ: CloudTrail、CloudWatch Logs、VPC Flow Logs、S3 server access logs。","AWS Artifact: Reports（SOC、PCI などのレポート）と Agreements（例: HIPAA 向けの BAA）。コンプライアンスの対応状況はサービスによって異なります。","Data residency: 要件のある国に所在するリージョンを選びます。AWS がデータをリージョンの外へ勝手に移すことはありません。","セキュリティの情報源: AWS Security Center、AWS Security Blog、AWS Knowledge Center。"],terms:[["API call","API 呼び出し（AWS 上のあらゆる操作）"],["Audit","監査"],["AWS CloudTrail","API アクティビティを記録するサービス"],["Amazon CloudWatch","パフォーマンス、metrics、logs をモニタリングするサービス"],["Metric","測定指標（メトリクス）"],["Alarm","アラーム（警告）"],["AWS Config","リソースの設定を記録・評価するサービス"],["Config rule","設定を評価するルール"],["VPC Flow Logs","VPC のネットワークトラフィックのログ"],["Compliance","コンプライアンス（法令・標準への準拠）"],["AWS Artifact","コンプライアンスレポートのダウンロードと AWS との契約の承諾ができるポータル"],["Log file integrity validation","CloudTrail のログファイルが変更・削除されていないことの検証"],["Organization trail","Organizations 内のすべてのアカウントのログを記録する trail"],["AWS Audit Manager","監査用の証拠を収集するサービス"],["Data residency","データの所在地に関する要件"],["PCI DSS","決済カードデータのセキュリティ標準"],["HIPAA","医療・健康情報の保護に関する米国の法律"]]};
})();
