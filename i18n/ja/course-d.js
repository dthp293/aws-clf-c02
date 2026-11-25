(function(){var I=window.CLF_I18N=window.CLF_I18N||{};var L=I.ja=I.ja||{};['q','course','lessons','glossary','services','domains','ui'].forEach(function(k){L[k]=L[k]||{};});
L.course["3-8"]={title:"AWS のデータベース (Databases)",goals:["データベースとは何かを理解し、relational、NoSQL、document、graph、in-memory、data warehouse の各タイプを区別できる","EC2 に自分でインストールする代わりに、Amazon RDS のようなマネージド (managed) データベースを使う理由が分かる","RDS、Aurora、DynamoDB、DocumentDB、Neptune、ElastiCache、Redshift から正しいサービスを選べる","OLTP と OLAP を区別し、DMS と SCT がデータベースを AWS へ移行するためのものだと分かる"],html:`
<h3>1. データベースとは？ なぜ多くの種類があるのか</h3>
<p><b>Database</b>（データベース）は、ソフトウェアがデータをすばやく検索・追加・更新・削除できるように、データを整理して保存しておく場所です。Excel ファイルでもデータは保存できますが、何千人もが同時に注文するような状況には耐えられません。データベースはまさにそのために設計されています。</p>
<p>現実のデータにはさまざまな「形」があるため、データベースにも多くの種類があります。あらゆる用途に最適な種類というものはありません。CLF-C02 の試験では主に、<b>用途に合った種類を正しく選べるか</b>が問われます。</p>

<div class="box idea"><b>🧠 かんたんに言うと</b><p>家の中での物のしまい方を思い浮かべてください。<b>仕切りとラベルがきちんと付いた書類棚</b>（relational）、番号で一瞬で取り出せる<b>番号シール付きの収納ボックス</b>（key-value）、1冊に申込書がまるごと1枚入っている<b>クリップファイル</b>（document）、推理ドラマのように<b>写真をピンで留めて赤い糸でつないだボード</b>（graph）、棚を開けなくて済むように<b>机の上に貼っておく付箋</b>（in-memory cache）、そして年末の集計のために<b>何年分もの帳簿を保管しておく倉庫</b>（data warehouse）です。</p></div>

<h4>主なデータベースの種類</h4>
<ul>
<li><b>Relational database</b>（リレーショナルデータベース）: データは行と列が固定された <b>table</b>（テーブル）に入っており、テーブル同士が関連付けられています。例えば「顧客」テーブルと「注文」テーブルがつながっています。問い合わせには <b>SQL</b> という言語を使います。注文や決済のように、構造がはっきりしていて絶対的な正確さが必要なデータに向いています。</li>
<li><b>NoSQL</b>（「SQL だけではない」）: データを固定のテーブルに押し込めず、構造が柔軟で、非常に大きな規模まで拡張できます。最も一般的なタイプは <b>key-value</b>（キーと値）で、「キー」（例えばカートの ID）を渡せばすぐに値を取り出せます。</li>
<li><b>Document database</b>（ドキュメントデータベース）: NoSQL の一種で、各レコードを JSON 形式の「ドキュメント」として保存し、ドキュメントごとに異なるフィールドを持てます。商品説明の例: ホールケーキには「サイズ」、クッキーには「1箱の重さ」があります。</li>
<li><b>Graph database</b>（グラフデータベース）: 「点」とその間の「関係」を保存します。「友達の友達はどんな料理が好きか」といった質問への回答、不正検出、商品のレコメンドがとても得意です。</li>
<li><b>In-memory database / cache</b>（RAM メモリ上に保存）: RAM はディスクよりはるかに高速です。よく読み取られるデータを一時的に置いておくために使い、アプリケーションが一瞬で応答できるようにします。</li>
<li><b>Data warehouse</b>（データウェアハウス）: 多くのソースからデータを集めて長期間保存し、<b>分析</b>やレポート作成に使います。日々の販売業務には使いません。</li>
</ul>

<h3>2. EC2 に自分でインストールするか、マネージドサービスを使うか</h3>
<p>AWS でデータベースを動かす方法は2つあります。1つ目は、仮想サーバーの <b>EC2</b> を借りて、データベースソフトウェア（例えば MySQL）を自分でインストールする方法です。すべてを自由にできますが、OS のパッチ適用、データベースのアップグレード、バックアップ、冗長化のためのレプリケーション、ディスクの空き容量の監視など、すべて自分で面倒を見ることになります。</p>
<p>2つ目は、<b>managed</b>（マネージド）サービスを使う方法で、その代表が <b>Amazon RDS</b>（Relational Database Service）です。ハードウェア、インストール、データベースソフトウェアとその下の OS へのパッチ適用、自動バックアップは AWS が担当します。利用者が担当するのは、データ、テーブル設計、アクセス権限、クエリの最適化だけです。</p>
<div class="box idea"><b>🧠 かんたんに言うと</b><p>EC2 に自分でインストールするのは、<b>牛乳のために自分で牛を飼う</b>ようなものです。すべて思いどおりにできますが、毎日エサをやり、牛舎を掃除しなければなりません。RDS を使うのは<b>牛乳を宅配してもらう</b>ようなものです。あなたは牛乳を飲むだけで、牛の世話はほかの人に任せられます。</p></div>
<p>RDS は、MySQL、PostgreSQL、MariaDB、Oracle、Microsoft SQL Server、Db2、Aurora といったおなじみの「engine」（データベースソフトウェアの種類）を数多くサポートしています。試験によく出て、互いにとても混同しやすい機能が3つあります。</p>
<table>
<tr><th>機能</th><th>何をするか</th><th>問題文にこう書かれていたら使う</th></tr>
<tr><td><b>Multi-AZ</b></td><td>別の AZ に同期された <b>standby</b>（待機系）を1つ保持します。プライマリが故障すると、RDS が standby へ<b>自動で failover</b>（自動切り替え）します。</td><td>high availability, automatic failover, AZ failure</td></tr>
<tr><td><b>Read replica</b></td><td><b>読み取り専用</b>のコピーです。アプリケーションが読み取りクエリをこちらへ送ることで、メインのデータベースの<b>負荷を軽減</b>します。</td><td>read-heavy, offload read traffic, improve read performance</td></tr>
<tr><td><b>Automated backups</b></td><td>RDS が毎日自動でバックアップを取り、変更ログも保存するため、保持期間内であれば <b>point-in-time restore</b>（特定の時点、例えば 14:00 ちょうどの状態への復元）ができます。復元結果は<b>新しい DB インスタンス</b>になります。</td><td>accidentally deleted data, restore to a specific time</td></tr>
</table>
<div class="box trap"><b>⚠️ よくあるひっかけ</b><p>うっかりデータを削除してしまった場合、<b>Multi-AZ と read replica では救えません</b>。削除の操作もすぐにそちらへコピーされるからです。<b>backup / point-in-time restore</b> を使う必要があります。逆に、AZ が丸ごと停止しても耐えられるようにしたいなら、read replica ではなく <b>Multi-AZ</b> を選びます。</p></div>
<p>では、それでも<b>EC2 に自分でデータベースをインストール</b>すべきなのはどんなときでしょうか。RDS では提供されないものが必要なときです。つまり、OS へのアクセス、特殊な OS 設定、サードパーティー製のプラグイン、RDS がサポートしていない engine などです。その代わり、パッチ適用、バックアップ、冗長化は自分で面倒を見ることになります。</p>

<h3>3. AWS のデータベースサービス</h3>
<h4>Amazon Aurora</h4>
<p>AWS がクラウド向けに独自に構築したリレーショナルデータベースで、<b>MySQL および PostgreSQL と互換性</b>があります（MySQL/PostgreSQL 向けに書かれたアプリケーションを、ほとんど修正せずに Aurora 上で動かせます）。Aurora は通常の MySQL/PostgreSQL より高いパフォーマンスを発揮し、データの複数のコピーを複数の AZ に自動で保存します。Aurora は RDS を通じて管理されます。負荷に応じて自動で伸縮する <b>Aurora Serverless</b> もあります。</p>
<h4>Amazon DynamoDB</h4>
<p><b>NoSQL の key-value および document</b> データベースで、<b>serverless</b>（利用者が管理するサーバーが一切ない）であり、あらゆる規模で <b>single-digit millisecond</b>（数ミリ秒、1桁ミリ秒）程度の応答速度を実現します。ショッピングカート、ログインセッション、ゲームのランキング、IoT データなど、アクセス量が極めて多く構造が単純なものに向いています。</p>
<ul>
<li><b>On-demand capacity</b>（オンデマンドキャパシティ）: アクセス量を事前に予測する必要がありません。負荷が急増したとき（例えばフラッシュセール）も DynamoDB が自動で対応し、実際の読み取り/書き込みの回数に応じて課金されます。</li>
<li><b>Global tables</b>（グローバルテーブル）: テーブルを<b>複数のリージョン</b>へ自動でレプリケートし、<b>どのリージョンでも読み取りと書き込みの両方を受け付けます</b>（multi-active）。米国、ヨーロッパ、アジアのユーザーは、それぞれ自分に近いリージョンで低レイテンシーで読み書きできます。</li>
</ul>
<h4>Amazon DocumentDB</h4>
<p>ドキュメント型のデータベースで、<b>MongoDB と互換性</b>があります（MongoDB は非常に広く使われているオープンソースのドキュメントデータベースです）。MongoDB を使っている会社がマネージド形式で AWS へ移りたい場合は DocumentDB を選びます。</p>
<h4>Amazon Neptune</h4>
<p><b>graph</b> データベースです。ソーシャルネットワーク、商品のレコメンド（「このケーキを買った人はこんな商品も買っています...」）、不正検出など、個々のデータ行そのものよりも<b>関係性</b>のほうが重要なデータに向いています。</p>
<h4>Amazon ElastiCache</h4>
<p><b>メモリ上のキャッシュ</b>（in-memory）のサービスで、Valkey、Redis OSS、Memcached の各 engine をサポートします。ElastiCache をデータベースの前段に置いて、よく問い合わせられる結果をあらかじめ保持しておくことで、データベースの負荷を減らし、読み取りの多い（read-heavy）アプリケーションを高速化します。データが RAM 上にあるため応答は <b>sub-millisecond</b>（1ミリ秒未満）程度で、ゲームのランキング、ログインセッションなど、失われてもメインのデータベースから再構築できるデータに向いています。</p>
<h4>Amazon Redshift</h4>
<p>AWS の <b>Data warehouse</b> で、非常に大きなデータ（ペタバイト級まで）に対して複雑な分析クエリを実行するために使います。これは分析部門のためのツールであり、販売サイト用のデータベースではありません。</p>

<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>ミンさんは BanhNgon のデータを次のように設計しました。注文、顧客、決済は正確さと緊密な関連付けが必要なので、既存のコードが MySQL 向けに書かれていることから <b>Aurora</b>（MySQL-compatible）を使います。中秋節のシーズンに何千人もが同時に使うショッピングカートは <b>DynamoDB</b> に保存します。ケーキのカタログは種類ごとに情報の形が違い、以前のチームが MongoDB に慣れているため <b>DocumentDB</b> に保存します。「よく一緒に購入される商品」の機能には <b>Neptune</b> を使います。トップページに表示する「売れ筋ケーキ トップ10」は、データベースに何度も問い合わせなくて済むよう <b>ElastiCache</b> に保持しておきます。年末、ランさんはハノイ、ホーチミン、日本の各支店別に3年分の売上を見たいと考えています。そこでデータを <b>Redshift</b> に取り込んで分析します。</p></div>

<h3>4. 比較表と OLTP・OLAP</h3>
<table>
<tr><th>サービス</th><th>種類</th><th>試験でのキーワード</th></tr>
<tr><td>Amazon RDS</td><td>Relational, managed</td><td>MySQL, PostgreSQL, Oracle, SQL Server; 管理作業の削減; Multi-AZ, read replica</td></tr>
<tr><td>Amazon Aurora</td><td>Relational、AWS が独自に構築</td><td>MySQL/PostgreSQL-compatible、高パフォーマンス、built for the cloud</td></tr>
<tr><td>Amazon DynamoDB</td><td>NoSQL key-value/document, serverless</td><td>single-digit millisecond, any scale, NoSQL</td></tr>
<tr><td>Amazon DocumentDB</td><td>Document</td><td>MongoDB-compatible</td></tr>
<tr><td>Amazon Neptune</td><td>Graph</td><td>highly connected data, social network, relationships</td></tr>
<tr><td>Amazon ElastiCache</td><td>In-memory cache</td><td>caching, read-heavy, in-memory, Redis/Memcached</td></tr>
<tr><td>Amazon Redshift</td><td>Data warehouse</td><td>analytics, petabyte, OLAP, business intelligence</td></tr>
</table>
<p>よく登場する略語が2つあります。</p>
<ul>
<li><b>OLTP</b>（Online Transaction Processing、オンライントランザクション処理）: 「注文を1件追加する」「在庫からケーキを1箱減らす」のような、小さく高速な操作が絶え間なく大量に発生します。RDS、Aurora、DynamoDB を使います。</li>
<li><b>OLAP</b>（Online Analytical Processing、オンライン分析処理）: クエリの数は少ないものの1つ1つが「大きく」、「過去3年間で最も売れた月はいつか」といった質問に答えるために何百万行もスキャンします。Redshift を使います。</li>
</ul>
<div class="box trap"><b>⚠️ よくあるひっかけ</b><p>「relational」という語があっても RDS とは限りません。問題文が <b>"analytics"、"data warehouse"、"petabyte"</b> を強調していれば <b>Redshift</b> です。「NoSQL」とあればまず <b>DynamoDB</b> を思い浮かべますが、<b>"MongoDB"</b> という語があれば <b>DocumentDB</b> です。ElastiCache はデータベースの前段に置く<b>キャッシュ</b>であり、メインのデータベースの代わりにはなりません。そして覚えておきましょう。RDS を使う場合は AWS が OS とデータベース engine にパッチを適用しますが、EC2 に自分でインストールした場合にパッチを適用するのは<b>あなた</b>です。</p></div>

<h3>5. データベースを AWS へ移行する: DMS と SCT</h3>
<p><b>AWS DMS</b>（Database Migration Service、データベース移行サービス）は、既存のデータベースから AWS 上のデータベースへデータをコピーします。強みは、移行中も移行元データベースが<b>通常どおり稼働し続ける</b>こと、そして DMS が新しい変更を<b>継続的にレプリケート</b>できることで、そのため停止時間（downtime）がごく短くて済みます。</p>
<p><b>異なる</b>種類のデータベース間で移行する場合（例えば Oracle から Aurora PostgreSQL へ）、テーブル構造、データ型、データベース内部のコードを「翻訳」し直す必要があります。それを担うのが <b>AWS SCT</b>（Schema Conversion Tool、スキーマ変換ツール）です。<b>Schema</b>（スキーマ）とはデータベースの「設計図」で、どんなテーブルがあり、どんな列があり、どんな型なのかを定めたものです。</p>
<ul>
<li><b>Homogeneous migration</b>（同じ engine 同士。例: オンプレミスの PostgreSQL → RDS for PostgreSQL）: スキーマはそのままなので、<b>DMS</b> だけで済みます。</li>
<li><b>Heterogeneous migration</b>（異なる engine 間。例: Oracle → Aurora PostgreSQL）: まず <b>SCT</b> がスキーマを変換し、その後 <b>DMS</b> がデータを移行します。（現在は DMS にも DMS Schema Conversion という機能がありますが、試験では通常 SCT が正解になります。）</li>
</ul>
<div class="box idea"><b>🧠 かんたんに言うと</b><p>外国への引っ越しにたとえると、<b>SCT</b> は新居のコンセントや寸法に合うよう棚や収納の設計図を描き直す人、<b>DMS</b> は荷物を運ぶトラックで、あなたが旧居に住み続けている間に少しずつ何往復もして運んでくれます。</p></div>
<div class="box exam"><b>🎯 試験でよく問われること</b><ul>
<li>"fully managed NoSQL, single-digit millisecond" → <b>DynamoDB</b></li>
<li>"MySQL and PostgreSQL compatible, built for the cloud, higher performance" → <b>Aurora</b></li>
<li>"MongoDB compatible" → <b>DocumentDB</b></li>
<li>"highly connected relationships / social network" → <b>Neptune</b></li>
<li>"caching, read-heavy, in-memory" → <b>ElastiCache</b></li>
<li>"complex analytical queries, petabytes, data warehouse" → <b>Redshift</b></li>
<li>"benefit of RDS over database on EC2" → AWS が patching、backup、high availability を担当; "needs OS access / unsupported plugin" → <b>EC2</b> に自分でインストール</li>
<li>"automatic failover to another AZ" → <b>Multi-AZ</b>; "offload read traffic" → <b>read replica</b>; "restore to a specific time" → <b>point-in-time restore</b></li>
<li>"multiple Regions, every Region accepts writes, low latency" → <b>DynamoDB global tables</b>; "unpredictable spikes, no capacity planning" → <b>DynamoDB on-demand</b></li>
<li>"migrate database with minimal downtime" → <b>DMS</b>; 異なる engine 間で "convert the schema" → <b>SCT</b></li>
</ul></div>
`,summary:["Relational（テーブル、SQL）: RDS と Aurora。Aurora は MySQL/PostgreSQL 互換で、より高パフォーマンス。","NoSQL key-value で serverless、あらゆる規模で数ミリ秒: DynamoDB（負荷が予測しにくいなら on-demand、複数リージョンで同時に書き込むなら global tables）。MongoDB-compatible: DocumentDB。","Graph（複雑に絡み合った関係）: Neptune。RAM 上のキャッシュ: ElastiCache。分析用の data warehouse: Redshift。","EC2 に自分でインストールする代わりに RDS を使う: インストール、パッチ適用、バックアップ、Multi-AZ は AWS が担当。OS へのアクセスや特殊なプラグインが必要なら EC2 に自分でインストールする。","Multi-AZ = 自動 failover（HA）; read replica = 読み取り負荷の分散; automated backups = うっかりデータを削除したときの point-in-time restore。","OLTP = 小さく絶え間ないトランザクション（RDS、Aurora、DynamoDB）。OLAP = 大規模な分析（Redshift）。","DMS は最小限の downtime でデータを移行する。SCT は別の engine へ切り替えるとき（スキーマの変換）だけ必要。"],terms:[["Relational database","リレーショナルデータベース"],["NoSQL database","非リレーショナルデータベース"],["Key-value","キーと値"],["Document database","ドキュメントデータベース"],["Graph database","グラフデータベース"],["In-memory cache","RAM 上のキャッシュ"],["Data warehouse","データウェアハウス"],["Managed service","マネージドサービス"],["Read replica","読み取り専用のレプリカ"],["Multi-AZ deployment","複数のアベイラビリティーゾーンへのデプロイ"],["Point-in-time restore","特定の時点への復元"],["Global tables","複数リージョンにレプリケートされる DynamoDB テーブル"],["OLTP","オンライントランザクション処理"],["OLAP","オンライン分析処理"],["Schema","データベースのスキーマ（設計図）"]]};
L.course["3-9"]={title:"仮想プライベートネットワーク Amazon VPC",goals:["VPC とは何か、そして EC2 や RDS などのリソースがすべてプライベートなネットワークの中に置かれる理由を理解する","public subnet と private subnet の違い、route table、internet gateway、NAT gateway の役割を区別できる","security group と network ACL の違いを思い出す","VPC peering、VPC endpoint（S3/DynamoDB 用の gateway）、VPC Flow Logs が何のためのものか分かる"],html:`
<h3>1. コンピュータネットワークと IP アドレスを、ごくかんたんに</h3>
<p><b>Network</b>（コンピュータネットワーク）とは、データをやり取りするために互いに接続されたコンピュータの集まりです。ネットワーク内の各マシンには、家の番地のような <b>IP address</b>（IP アドレス）があり、データはそれを頼りに届け先へたどり着きます。例: 10.0.1.25。</p>
<p>IP アドレスには <b>public</b>（パブリック。インターネット上の誰からでも送信できる）なものと、<b>private</b>（プライベート。内部ネットワークの中だけで使う）なものがあります。自宅では、スマートフォンやノート PC はプライベート IP を使い、インターネットとやり取りしているのは Wi-Fi ルーターのほうです。</p>

<h3>2. Amazon VPC: 守衛付きの門がある専用の街区</h3>
<p><b>Amazon VPC</b>（Virtual Private Cloud、仮想プライベートクラウド）は、AWS リージョンの中に自分で作成する、論理的に分離されたプライベートなネットワークです。IP アドレスの範囲を自分で決め、ネットワークを小さな部分に分割し、通信の経路や誰が出入りできるかを定めます。EC2 インスタンスや RDS データベースなどは、すべて VPC の中に配置されます。</p>
<div class="box idea"><b>🧠 かんたんに言うと</b><p>VPC は<b>塀と守衛付きの門がある住宅街</b>のようなものです。内部はいくつかの<b>区画</b>（subnet）に分かれています。大通りに面していて来客を迎える表側の区画（public subnet）もあれば、部外者が直接入れない奥の区画（private subnet）もあります。街の中の<b>案内標識</b>が route table、大通りへ出る<b>正門</b>が internet gateway で、さらに各住宅の玄関には<b>専属の警備員</b>（security group）がいて、各区画の入り口には<b>検問所</b>（network ACL）があります。</p></div>
<p>1つの VPC は<b>1つのリージョン</b>の中にありますが、複数のアベイラビリティーゾーンにまたがります。各 AWS アカウントには、すぐに使える <b>default VPC</b> が各リージョンにあらかじめ用意されていますが、企業では通常、自社の設計に沿って VPC を独自に作成します。</p>

<h3>3. Subnet、route table、internet gateway、NAT gateway</h3>
<h4>Subnet（サブネット）</h4>
<p><b>Subnet</b> は VPC を小さく区切った一部分で、各 subnet は<b>1つのアベイラビリティーゾーン</b>の中に収まります。障害に強くするには、少なくとも2つの AZ に subnet を作成します。</p>
<ul>
<li><b>Public subnet</b>（パブリックサブネット）: internet gateway を経由してインターネットへ出る経路があります。load balancer や web server のように、インターネットからの来訪を受け付ける必要があるものを置きます。</li>
<li><b>Private subnet</b>（プライベートサブネット）: インターネットから直接入ってくる経路がありません。データベースや内部処理用のマシンなど、外部にさらすべきでないものを置きます。</li>
</ul>
<h4>Route table（ルートテーブル）</h4>
<p><b>Route table</b> は、「アドレス X へ行きたければ出口 Y を通る」というルールの一覧です。各 subnet は1つの route table に関連付けられます。subnet が public か private かを決めるのは、まさにこの route table です。<b>internet gateway</b> へのルートを持つ subnet が public subnet です。</p>
<h4>Internet gateway（インターネットゲートウェイ）</h4>
<p><b>Internet gateway</b> は VPC にアタッチされ、public subnet 内の（パブリック IP を持つ）リソースがインターネットと双方向に通信できるようにします。これがなければ、VPC はインターネットから完全に隔離されます。</p>
<p>EC2 インスタンスが<b>インターネットからの接続を受けられる</b>ようにするには、次の条件がすべて必要です（1つでも欠けると入ってこられません）。</p>
<ol>
<li>VPC に <b>internet gateway</b> がアタッチされている。</li>
<li>subnet の route table に、internet gateway を指す <b>0.0.0.0/0</b>（「それ以外のすべてのアドレス」という意味）のルートがある。</li>
<li>インスタンスに<b>パブリック IP</b> または <b>Elastic IP</b>（自分専用に確保しておく固定のパブリック IP）がある。</li>
<li>security group と network ACL がそのトラフィックを許可している。</li>
</ol>
<h4>NAT gateway</h4>
<p>private subnet 内のマシンも、ソフトウェアの更新をダウンロードするためなどに、インターネットへ<b>出ていく</b>必要がときどきありますが、外部の誰かに<b>入ってきて</b>ほしくはありません。これを解決するのが <b>NAT gateway</b>（Network Address Translation、ネットワークアドレス変換）です。NAT gateway は public subnet に配置します。private subnet のマシンは NAT gateway 経由で外部へリクエストを送り、その応答は戻ってこられますが、外部の側から開始された接続はブロックされます。</p>
<div class="flow"><span>private subnet 内のマシン</span><span>NAT gateway（public subnet）</span><span>Internet gateway</span><span>Internet</span></div>
<div class="box idea"><b>🧠 かんたんに言うと</b><p>NAT gateway は<b>買い物代行の人</b>のようなものです。閉ざされた区画の住人は、その人に頼んで外で買い物をして持ち帰ってもらいますが、市場の売り手は誰の家なのかを知らず、自分から訪ねてきてドアをたたくこともできません。</p></div>

<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>ミンさんは BanhNgon 用の VPC をシンガポールリージョンに作成し、2つの AZ に分けました。各 AZ には、ケーキを注文するお客さんを迎える load balancer を置く <b>public subnet</b> と、アプリケーションを動かす EC2 インスタンスと Aurora データベースを置く <b>private subnet</b> があります。public subnet の route table には <b>internet gateway</b> へのルートがありますが、private subnet の route table にはそれがなく、EC2 インスタンスが OS のパッチをダウンロードするための <b>NAT gateway</b> へ出るルートだけがあります。そのおかげで、インターネット上の悪意ある人物が、顧客情報の入ったデータベースに直接アクセスすることはできません。</p></div>

<h3>4. Security group と network ACL（Domain 2 の復習）</h3>
<p>この2つの「ファイアウォールの層」には、セキュリティのパート（Domain 2）ですでに出会っています。<b>Firewall</b>（ファイアウォール）とは、どのネットワークトラフィックを通すかを決めるフィルターです。手短に復習しましょう。</p>
<table>
<tr><th></th><th>Security group</th><th>Network ACL (NACL)</th></tr>
<tr><td>保護するレベル</td><td>個々のリソース（instance、ENI）</td><td>subnet 全体</td></tr>
<tr><td>ルールの種類</td><td><b>allow</b>（許可）のみ</td><td><b>allow</b> と <b>deny</b>（拒否）の両方がある</td></tr>
<tr><td>状態の記憶</td><td><b>Stateful</b>: 入ってくる通信を許可すれば、その応答が出ていくのも自動で許可</td><td><b>Stateless</b>: インバウンドとアウトバウンドを別々に定義する必要がある</td></tr>
<tr><td>たとえ</td><td>各住宅の玄関にいる警備員</td><td>区画全体の入り口にある検問所</td></tr>
</table>
<div class="box trap"><b>⚠️ よくあるひっかけ</b><p><b>特定の IP アドレスをブロック</b>したい（または IP の範囲をブロックしたい）なら、<b>network ACL</b> を使う必要があります。security group には deny ルールがないからです。NACL は <b>stateless</b> なので、インバウンド（例えば HTTPS のポート 443）だけを開けてアウトバウンドを開け忘れると、リクエストはサーバーに届いても<b>応答が戻ってこられません</b>（応答は一時ポート 1024-65535 を通って出ていきます）。security group は stateful なので、こうしたことは起こりません。また、混同しないようにしましょう。<b>subnet は1つの AZ に属し</b>、<b>VPC は1つのリージョンに属します</b>。さらに、「public subnet」は名前の付け方で決まるのではなく、route table に internet gateway へのルートがあることで決まります。</p></div>

<h3>5. VPC peering、VPC endpoint、VPC Flow Logs</h3>
<h4>VPC peering</h4>
<p><b>VPC peering</b>（VPC ピアリング接続）は、<b>2つの VPC</b> 同士をプライベートに接続し、インターネットを経由せずに、同じネットワークにいるかのようにプライベート IP で通信できるようにします。2つの VPC は別のアカウントでも、さらには別のリージョンでも構いません。注意点として、peering は<b>推移的ではありません</b>（non-transitive）。A と B を接続し、B と C を接続しても、A が C と通信できるわけではありません。A と C を通信させたいなら、<b>A-C を直接</b> peering で追加するか、すべてをハブとなる <b>AWS Transit Gateway</b>（次のレッスンで学びます）に接続します。通信が必要なのが <b>2つの VPC</b> だけなら、peering が<b>最もシンプルで安価</b>な方法です。VPC が数十、数百とある場合は Transit Gateway を使います。</p>
<h4>VPC endpoint: インターネットに出ずに AWS のサービスを呼び出す</h4>
<p>S3 や DynamoDB など、多くの AWS サービスはあなたの VPC の<b>外</b>にあります。通常、private subnet のマシンが S3 を呼び出すには NAT gateway を通ってインターネットへ出る必要があり、プライバシーの面で劣るうえに、<b>NAT gateway のデータ処理料金</b>もかかります。<b>VPC endpoint</b> は VPC から AWS サービスへの専用の経路を作り、トラフィックは AWS のネットワーク内にとどまります。2種類あります。</p>
<ul>
<li><b>Gateway endpoint</b>: <b>Amazon S3 と DynamoDB</b> 専用です。route table にルートを1つ追加するだけで、利用料金は<b>かかりません</b>。NAT gateway の料金を減らす方法として試験でよく問われます。</li>
<li><b>Interface endpoint</b>（<b>AWS PrivateLink</b> で動作）: プライベート IP を持つネットワークインターフェイスを subnet 内に配置し、ほかの非常に多くの AWS サービスやパートナーのサービスを呼び出します。時間単位とデータ量に応じた料金がかかります。</li>
</ul>
<h4>VPC Flow Logs</h4>
<p><b>VPC Flow Logs</b> は、VPC 内のネットワークインターフェイスを出入りする IP トラフィックの情報を記録します。どのアドレスから、どのアドレスへ、どのポートで、許可されたのか拒否されたのか、といった内容です。このデータは CloudWatch Logs または S3 に送られ、接続トラブルの解決やセキュリティに役立ちます。Amazon GuardDuty も Flow Logs を分析して脅威を検出します。</p>
<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>日本支店を開設したとき、BanhNgon には東京リージョンの VPC がもう1つ増えました。ミンさんは <b>VPC peering</b> を使い、東京のシステムがシンガポールの VPC にある商品データをプライベートなネットワーク経由で読み取れるようにしました。private subnet の EC2 インスタンスは <b>gateway endpoint</b> 経由でケーキの画像を S3 にアップロードするので、NAT gateway の請求額がぐっと減りました。ある日、ウェブサイトが異常に遅くなったため、ミンさんが <b>VPC Flow Logs</b> を開いてみると、見慣れない IP 範囲からの拒否された接続が大量に見つかり、すぐに network ACL へ deny ルールを追加しました。</p></div>

<div class="box exam"><b>🎯 試験でよく問われること</b><ul>
<li>"logically isolated section of the AWS Cloud" → <b>Amazon VPC</b></li>
<li>"subnet whose route table has a route to an internet gateway" → <b>public subnet</b></li>
<li>"instances in a private subnet need outbound internet access" → <b>NAT gateway</b></li>
<li>"allow a VPC to communicate with the internet" → <b>internet gateway</b></li>
<li>"stateful, instance level" → <b>security group</b>; "stateless, subnet level, allow and deny" → <b>network ACL</b></li>
<li>"connect two VPCs privately, most cost-effective" → <b>VPC peering</b>; "A peered with B, B with C, A cannot reach C" → A-C を直接 peering、または <b>Transit Gateway</b></li>
<li>"private subnet to S3 without NAT gateway, reduce NAT charges" → <b>gateway VPC endpoint</b></li>
<li>"instance not reachable from internet" → internet gateway、0.0.0.0/0 のルート、パブリック IP/Elastic IP を確認する</li>
<li>"responses never reach clients, NACL allows inbound" → NACL は <b>stateless</b>、outbound ルールが不足</li>
<li>"capture information about IP traffic in a VPC" → <b>VPC Flow Logs</b></li>
</ul></div>
`,summary:["VPC は論理的に分離されたプライベートなネットワークで、1つのリージョンの中にある。subnet は1つの AZ の中にある。","public subnet には internet gateway へのルートがある。private subnet にはなく、データベースや内部用のマシンに使う。","NAT gateway（public subnet に配置）は、private subnet 内のマシンをインターネットへ出られるようにしつつ、外部から入ってくる接続はブロックする。","Security group: stateful、instance レベル、allow のみ。Network ACL: stateless、subnet レベル、allow と deny がある。","VPC peering は2つの VPC をプライベートなネットワークで接続する。推移的ではない（直接の peering か Transit Gateway が必要）。","S3/DynamoDB 用の Gateway VPC endpoint: AWS のネットワーク内を通り、NAT gateway を経由せず、料金もかからない。","VPC Flow Logs は、トラブルシューティングとセキュリティのために IP トラフィックの情報を記録する。"],terms:[["Virtual Private Cloud (VPC)","仮想プライベートクラウド"],["IP address","IP アドレス"],["Subnet","サブネット"],["Public subnet","パブリックサブネット"],["Private subnet","プライベートサブネット"],["Route table","ルートテーブル"],["Internet gateway","インターネットゲートウェイ"],["NAT gateway","ネットワークアドレス変換ゲートウェイ"],["Security group","セキュリティグループ（instance レベルのファイアウォール）"],["Network ACL","ネットワークアクセスコントロールリスト（subnet レベル）"],["Stateful / Stateless","状態を記憶する / 状態を記憶しない"],["VPC peering","2つの VPC 間のピアリング接続"],["VPC endpoint (gateway / interface)","AWS サービスへのプライベートな接続ポイント"],["Elastic IP address","固定のパブリック IP アドレス"],["VPC Flow Logs","VPC のトラフィックフローのログ"]]};
L.course["3-10"]={title:"接続とコンテンツ配信: Route 53、CloudFront、Global Accelerator、VPN、Direct Connect",goals:["DNS とは何か、Route 53 が何をするのかを理解する","CloudFront（キャッシュを持つ CDN）と Global Accelerator（静的 IP、AWS ネットワーク、キャッシュなし）を区別できる","Site-to-Site VPN、Client VPN、Direct Connect を区別できる","Transit Gateway、PrivateLink、API Gateway をいつ使うのか分かる"],html:`
<h3>1. DNS と Amazon Route 53</h3>
<p>コンピュータは IP アドレス（数字の並び）で互いを見つけますが、人間が覚えるのは banhngon.vn のような名前です。<b>DNS</b>（Domain Name System、ドメインネームシステム）は、ドメイン名を IP アドレスに「翻訳」するサービスです。ドメイン名を入力すると、ブラウザはまず DNS に「この名前はどのアドレスにあるのか」と問い合わせ、それから接続します。</p>
<div class="box idea"><b>🧠 かんたんに言うと</b><p>DNS は<b>インターネットの電話帳</b>です。名前で探すと、電話帳がかけるべき番号を返してくれます。</p></div>
<p><b>Amazon Route 53</b> は AWS の DNS サービスで、可用性が高く、スケーラビリティにも優れています。主な仕事は次の3つです。</p>
<ul>
<li><b>ドメイン名の登録</b>（domain registration）。</li>
<li><b>DNS クエリへの応答</b>: ドメイン名がどこを指すか（load balancer、CloudFront、S3 など）。</li>
<li><b>Health check</b>（ヘルスチェック）と <b>routing policy</b>（ルーティングポリシー）: 問い合わせてきた相手ごとに、どのアドレスを返すかを決めます。</li>
</ul>
<table>
<tr><th>Routing policy</th><th>仕組み</th><th>使う場面</th></tr>
<tr><td><b>Simple</b></td><td>1つのドメイン名が1つの宛先を指し、health check はない</td><td>サーバー1台のシンプルなウェブサイト</td></tr>
<tr><td><b>Weighted</b></td><td>トラフィックを<b>比率</b>で振り分ける（例: 旧バージョン 90%、新バージョン 10%）</td><td>新バージョンの試験導入、パーセンテージによる負荷分散</td></tr>
<tr><td><b>Latency</b></td><td>ユーザーを、その人にとって<b>レイテンシーが最も低い</b>リージョンへ誘導する</td><td>複数リージョンで動くアプリケーションで、最速にしたいとき</td></tr>
<tr><td><b>Failover</b></td><td><b>Active-passive</b>: health check が正常なときはメインのシステムを使い、故障したら予備（例: S3 上の静的なメンテナンスページ）へ自動で切り替える</td><td>Disaster recovery、予備のページ</td></tr>
<tr><td><b>Geolocation</b></td><td>ユーザーがクエリを送信した<b>国/大陸</b>に応じて応答する</td><td>国ごとに異なるコンテンツ（著作権、言語、法律）</td></tr>
</table>
<p>このほかに geoproximity、multivalue answer などのポリシーもありますが、試験にはあまり出ません。あわせて覚えておきましょう。<b>Elastic Load Balancing が負荷分散するのは1つのリージョン内だけ</b>です。<b>複数のリージョン</b>の中から選びたい（レイテンシーに基づいて、あるいは障害中のリージョンを外して）なら <b>Route 53</b> を使います。</p>
<div class="box trap"><b>⚠️ よくあるひっかけ</b><p><b>Latency</b> はネットワークの速さで選び、<b>geolocation</b> はユーザーの所在地で選びます。問題文に "depending on the country" や "licensing by country" とあれば → geolocation であり、latency ではありません。問題文に「health check が失敗したら予備へ切り替える」とあれば → failover であり、weighted ではありません。</p></div>

<h3>2. コンテンツをより速くユーザーへ届ける: CloudFront と Global Accelerator</h3>
<h4>Amazon CloudFront</h4>
<p>サーバーから遠いユーザーはページの読み込みが遅くなります。データが長い距離を移動しなければならないからです。<b>CDN</b>（Content Delivery Network、コンテンツ配信ネットワーク）は、コンテンツのコピー（<b>cache</b>）をユーザーに近い多数の拠点に保存することでこれを解決します。<b>Amazon CloudFront</b> は AWS の CDN です。その拠点は <b>edge location</b>（エッジロケーション）と呼ばれ、世界中の非常に多くの都市にあり、リージョンの数よりはるかに多く存在します。</p>
<p>東京の誰かが初めてケーキの画像を見るとき、CloudFront はオリジンサーバー（<b>origin</b>、例えば S3 バケット）から画像を取得し、東京のエッジロケーションに保持します。それ以降の東京のユーザーはそこからすぐに画像を受け取れるので、ずっと高速です。CloudFront は AWS Shield や AWS WAF と組み合わせて攻撃を防ぐこともできます。origin が S3 バケットの場合は、<b>origin access control</b>（OAC）を使ってバケットを <b>private</b> のままにします。バケットを読み取れるのは CloudFront だけになり、ユーザーは S3 に直接アクセスできず、CloudFront を経由しなければなりません。</p>
<div class="box idea"><b>🧠 かんたんに言うと</b><p>CloudFront は、各地の<b>たくさんのコンビニにケーキの委託販売ケースを置く</b>ようなものです。お客さんはわざわざ工房まで行かなくても、家の近くの店ですぐに買えます。</p></div>
<h4>AWS Global Accelerator</h4>
<p><b>AWS Global Accelerator</b> は、世界中で使える<b>2つの静的 IP アドレス</b>（変わらないアドレス）をアプリケーションに提供します。これは <b>anycast</b> 型（同じ IP が多数のエッジロケーションから同時に「広告」される）です。TCP と <b>UDP</b> の両方のトラフィックをサポートします。ユーザーは最寄りのエッジロケーションに接続し、そこからトラフィックは（混雑したパブリックインターネットではなく）<b>AWS 専用のグローバルネットワーク</b>上を通って、適切なリージョンにあるアプリケーションへ届きます。あるリージョンで障害が起きた場合は、正常なリージョンへ非常にすばやく振り向けます。</p>
<div class="box trap"><b>⚠️ よくあるひっかけ</b><p>どちらもエッジロケーションを使いますが、<b>CloudFront はコンテンツをキャッシュします</b>（画像、動画、ウェブページに向く）。一方、<b>Global Accelerator はキャッシュしません</b>。トラフィックをより速い経路で「運ぶ」だけで、<b>静的 IP</b> を提供します（ゲーム、TCP/UDP アプリケーション、固定 IP が必要なシステムに向く）。問題文に "static IP addresses" や "AWS global network" とあり、キャッシュに触れていなければ → Global Accelerator です。</p></div>

<h3>3. オフィスやデータセンターを AWS と接続する: VPN と Direct Connect</h3>
<p>多くの会社は、今もオフィスや自社の <b>data center</b> にシステムを持っており（これを <b>on-premises</b>、オンプレミスと呼びます）、それらを AWS 上の VPC と接続する必要があります。試験によく出る選択肢は3つです。</p>
<ul>
<li><b>AWS Site-to-Site VPN</b>: オフィスのネットワークと VPC の間に、<b>パブリックインターネット</b>を経由する<b>暗号化</b>された「トンネル」を作ります。すばやく安価に構築できます。速度はインターネットに依存するため、不安定になることもあります。</li>
<li><b>AWS Client VPN</b>: <b>従業員一人ひとり</b>が、自分のノート PC から（自宅やカフェで）VPC へ安全に接続できるようにします。Site-to-Site はネットワーク全体をつなぎ、Client VPN は個人をつなぎます。</li>
<li><b>AWS Direct Connect</b>: 自社のデータセンターから AWS までの<b>専用の物理回線</b>で、<b>パブリックインターネットを経由しません</b>。帯域幅が広くレイテンシーも安定していますが、敷設に時間がかかり（通常は数週間以上）、コストも高くなります。</li>
</ul>
<p>Site-to-Site VPN では、トンネルの両端にそれぞれ「ゲートウェイ」があります。オフィス側は <b>customer gateway</b>（自社のデバイス/ルーター）、AWS 側は VPC にアタッチする <b>virtual private gateway</b> です（複数の VPC を接続する場合は Transit Gateway を使います）。</p>
<p>非常によく見かける構成があります。<b>Direct Connect をメインの経路</b>にし、<b>Site-to-Site VPN を予備の経路</b>（backup）にするというものです。VPN は安価で、既存のインターネット回線上にすばやく構築でき、暗号化もされます。Direct Connect が切断されると、トラフィックは VPN へ切り替わります。（Direct Connect の回線をもう1本追加するほうが堅牢ですが、高価で導入にも時間がかかります。）</p>
<div class="box idea"><b>🧠 かんたんに言うと</b><p>Site-to-Site VPN は<b>みんなが使う国道を走る装甲車</b>のようなものです。外装（暗号化）のおかげで安全ですが、渋滞に巻き込まれることはあります。Direct Connect は<b>自分の家だけが通れる専用道路</b>のようなものです。空いていて安定していますが、道路を造る手間がかかります。Client VPN は従業員一人ひとりの<b>個人用入館カード</b>のようなものです。</p></div>

<h3>4. Transit Gateway、PrivateLink、API Gateway</h3>
<p><b>AWS Transit Gateway</b> は<b>中央の中継拠点</b>（hub）です。VPC を1組ずつ peering でつなぐ（VPC が 10 個あれば非常に多くの組をつなぐ必要がある）代わりに、すべての VPC とオンプレミスのネットワークを Transit Gateway に接続するだけで済みます。<b>中央バスターミナル</b>のようなもので、すべての路線がターミナルに集まり、そこで乗り換えます。</p>
<p><b>AWS PrivateLink</b> は、別の VPC（自社のもの、パートナーのもの、または AWS のサービス）にある<b>特定の1つのサービス</b>へ、<b>VPC endpoint</b> を通じて、トラフィックをインターネットに出すことなくプライベートにアクセスできるようにします。peering との違い: peering は2つのネットワーク全体をつなぎますが、PrivateLink はちょうど1つの「サービスの窓口」だけを開きます。</p>
<p><b>Amazon API Gateway</b> は、<b>API</b> の作成、公開、保護、監視を支援します。<b>API</b>（Application Programming Interface、アプリケーションプログラミングインターフェイス）とは、あるプログラムが別のプログラムを呼び出すための「やり取りの窓口」で、例えばスマートフォンアプリが注文システムを呼び出すときに使われます。API Gateway は通常 Lambda の前段に置かれ、serverless アプリケーションの「玄関口」になります。</p>

<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>ランさんはドメイン名 banhngon.vn を購入し（Route 53 は .vn ドメインを販売していないため、ベトナムのドメイン登録事業者を通じて）、<b>Route 53</b> を DNS として使い、latency ポリシーで日本のお客さんは東京リージョンへ、ベトナムのお客さんはシンガポールへ誘導しています。ケーキ作りの画像や動画は <b>CloudFront</b> 経由で配信します。リアルタイムで動く「ラッキールーレット」のゲームは、なめらかに動くよう <b>Global Accelerator</b> を使います。ハノイのケーキ工房にはオンプレミスの在庫管理マシンがあります。最初は <b>Site-to-Site VPN</b> で AWS と接続し、データが増えてきたら <b>Direct Connect</b> に切り替えました。在宅勤務の経理担当者は <b>Client VPN</b> を使います。ケーキ注文アプリは、Lambda 関数の前段にある <b>API Gateway</b> を通じてシステムを呼び出します。VPC の数が十数個に増えたとき、ミンさんは <b>Transit Gateway</b> をハブとして使いました。配送パートナーは BanhNgon の「注文照会」サービスに <b>PrivateLink</b> 経由でアクセスし、インターネットにさらされることはありません。</p></div>

<h3>5. 「必要なこと → 使うもの」の表</h3>
<table>
<tr><th>ニーズ</th><th>サービス</th></tr>
<tr><td>ドメイン名の登録、DNS、レイテンシーに基づくルーティング、failover</td><td>Amazon Route 53</td></tr>
<tr><td>静的コンテンツ/動画を世界中のユーザーの近くにキャッシュする（CDN）</td><td>Amazon CloudFront</td></tr>
<tr><td>グローバルな静的 IP、AWS ネットワーク経由、キャッシュなし</td><td>AWS Global Accelerator</td></tr>
<tr><td>オフィスと VPC の間を、インターネット経由ですばやく暗号化接続する</td><td>AWS Site-to-Site VPN</td></tr>
<tr><td>リモートの従業員がノート PC から VPC へ接続する</td><td>AWS Client VPN</td></tr>
<tr><td>専用線、インターネットを経由しない、広帯域、安定</td><td>AWS Direct Connect</td></tr>
<tr><td>数百の VPC とオンプレミスのネットワークをつなぐ hub</td><td>AWS Transit Gateway</td></tr>
<tr><td>2つの VPC をプライベートに接続する</td><td>VPC peering</td></tr>
<tr><td>別の VPC にある1つのサービスへ、インターネットに出ずにプライベートにアクセスする</td><td>AWS PrivateLink</td></tr>
<tr><td>API の作成と管理、Lambda の玄関口</td><td>Amazon API Gateway</td></tr>
</table>
<div class="box exam"><b>🎯 試験でよく問われること</b><ul>
<li>"highly available and scalable DNS" → <b>Route 53</b></li>
<li>"cache content at edge locations, reduce latency globally" → <b>CloudFront</b></li>
<li>"static IP, route traffic over AWS global network" → <b>Global Accelerator</b></li>
<li>"dedicated private connection, not over the public internet" → <b>Direct Connect</b></li>
<li>"quickly establish encrypted connection over the internet" → <b>Site-to-Site VPN</b>; "AWS side of the VPN attached to the VPC" → <b>virtual private gateway</b></li>
<li>"inexpensive, encrypted backup for Direct Connect" → <b>Site-to-Site VPN</b></li>
<li>"route to lowest-latency Region" → <b>latency routing</b>; "send users to backup when health check fails" → <b>failover routing</b>; "different content by country" → <b>geolocation routing</b>; "split traffic by percentage" → <b>weighted routing</b></li>
<li>"keep S3 bucket private, serve only through CloudFront" → <b>origin access control (OAC)</b></li>
<li>"individual remote employees from laptops" → <b>Client VPN</b></li>
<li>"central hub for many VPCs" → <b>Transit Gateway</b>; "privately access services in another VPC" → <b>PrivateLink</b></li>
<li>"create, publish, secure APIs" → <b>API Gateway</b></li>
</ul></div>
`,summary:["Route 53 = DNS: ドメイン名の登録、health check、routing policy: latency（最速）、failover（予備への切り替え）、weighted（比率で振り分け）、geolocation（国別）。","CloudFront = CDN。ユーザーに近いエッジロケーションにコンテンツをキャッシュする。","Global Accelerator = 2つの静的 IP。AWS のグローバルネットワークを経由し、キャッシュはしない。","Site-to-Site VPN: インターネット経由の暗号化接続で、すばやく安価に構築でき、Direct Connect の予備としてよく使われる。Client VPN: 個々のユーザー向け。Direct Connect: 専用線で、インターネットを経由しない。","Transit Gateway は多数の VPC のための中央 hub。PrivateLink は別の VPC にある1つのサービスへプライベートにアクセスする。","API Gateway は API を作成・保護し、通常は Lambda の前段に置かれる。"],terms:[["Domain Name System (DNS)","ドメインネームシステム"],["Routing policy","ルーティングポリシー"],["Health check","ヘルスチェック（正常性の確認）"],["Content Delivery Network (CDN)","コンテンツ配信ネットワーク"],["Edge location","エッジロケーション（ユーザーに近い拠点）"],["Origin","コンテンツを保持するオリジンサーバー"],["Static IP address","静的 IP アドレス"],["On-premises","オンプレミス（企業が自社で持つインフラ）"],["Virtual Private Network (VPN)","仮想プライベートネットワーク（暗号化されたトンネル）"],["Dedicated connection","専用接続（専用線）"],["Hub","接続の中心となる拠点"],["VPC endpoint","サービスへのプライベートな接続ポイント"],["Virtual private gateway / customer gateway","AWS 側 / お客様側の VPN ゲートウェイ"],["Failover","予備のシステムへの自動切り替え"],["API","アプリケーションプログラミングインターフェイス"]]};
})();
(function(){var I=window.CLF_I18N=window.CLF_I18N||{};var L=I.ja=I.ja||{};['q','course','lessons','glossary','services','domains','ui'].forEach(function(k){L[k]=L[k]||{};});
L.course["3-11"]={title:"アプリケーション統合とその他のサービス群",goals:["decoupling（コンポーネントを疎結合にすること）とは何か、なぜ重要かを理解する","SQS、SNS、EventBridge、Step Functions を区別する","ビジネス向け（Connect、SES）、開発者向け（CodeBuild、CodePipeline、X-Ray、CLI）、エンドユーザーコンピューティング（WorkSpaces、AppStream 2.0（現 WorkSpaces Applications）、WorkSpaces Secure Browser）の各サービスを知る","Amplify と IoT Core をいつ使うかを知る"],html:`
<h3>1. Decoupling: 各部分をべったり結合させない</h3>
<p>アプリケーションは通常、注文の受付、決済、メール送信、厨房への連絡など、複数の部分で構成されます。各部分が互いを直接呼び出し、相手の処理を待たなければならない状態を <b>tightly coupled</b>（密結合）と呼びます。どこか一つが遅くなったり故障したりすると、ライン全体が止まってしまいます。</p>
<p><b>Decoupling</b>（疎結合にすること）とは、各部分が「仲介役」を通して間接的にやり取りし、それぞれが自分のペースで動けるようにすることです。ある部分が故障しても他の部分は動き続け、部分ごとに個別にスケールできます。これは AWS が非常によく取り上げる設計原則です。</p>
<div class="box idea"><b>🧠 かんたんに言うと</b><p>飲食店では、レジ係が厨房に駆け込んで、料理人が一品ずつ作り終えるのを立って待つことはしません。<b>注文伝票を伝票ホルダーに挟んでおき</b>、厨房が順番に作っていきます。混雑時は伝票が列をなして待つだけで、注文が失われることはありません。この伝票ホルダーこそが「キュー」です。</p></div>

<h3>2. SQS、SNS、EventBridge、Step Functions</h3>
<h4>Amazon SQS (Simple Queue Service)</h4>
<p><b>SQS</b> は <b>message queue</b>（メッセージキュー）のサービスです。一方がメッセージをキューに入れ、もう一方が手の空いたときに<b>自分で取り出して</b>（pull）処理します。メッセージは処理されるまで安全に保持されます。各メッセージは通常<b>1つ</b>の受信側だけが処理します。そのため SQS は、送信側が仕事を生み出す速さに処理側が追いつかないときの理想的な「緩衝材」（<b>buffer</b>）になります。仕事を一つも失わず、処理側は自分のペースで進められます。</p>
<table>
<tr><th></th><th>SQS Standard queue</th><th>SQS FIFO queue</th></tr>
<tr><td>順序</td><td>できるだけ順序を保つ（best-effort）が、前後することがある</td><td><b>送信した順序どおり</b>（First-In-First-Out）</td></tr>
<tr><td>重複</td><td>各メッセージは<b>少なくとも1回</b>配信される（at-least-once）。まれに2回配信されることがある</td><td><b>ちょうど1回</b>処理（exactly-once）。重複メッセージを自動で排除</td></tr>
<tr><td>スループット</td><td>ほぼ無制限</td><td>制限があり、Standard より低い</td></tr>
<tr><td>使いどころ</td><td>ほとんどの用途でのデフォルト</td><td>取引の指示や決済など、順序が重要で二重処理が許されない場合</td></tr>
</table>
<h4>Amazon SNS (Simple Notification Service)</h4>
<p><b>SNS</b> は <b>publish/subscribe</b>（発行/購読、略して pub/sub）モデルのサービスです。一方が <b>topic</b>（トピック）に通知を「発行」すると、SNS が<b>すべての</b>サブスクライバーへ即座に<b>プッシュ</b>（push）します。宛先はメール、SMS、スマートフォンへの通知、Lambda 関数、SQS キューなどです。1つのメッセージを多数の受信者が同時に受け取ります（これを <b>fan-out</b> と呼びます）。よくある構成は <b>SNS → 複数の SQS キュー</b>で、後段の各システムが専用のキューを持ち、同じメッセージを受け取りつつ独立して処理します。</p>
<div class="box idea"><b>🧠 かんたんに言うと</b><p><b>SQS</b> は注文伝票のホルダーです。伝票はそこで待ち、1枚につき1人の料理人が受け取ります。<b>SNS</b> は館内放送のスピーカーです。一度話せば、聞く登録をしている全員にすぐ届きます。</p></div>
<h4>Amazon EventBridge</h4>
<p><b>EventBridge</b> はサーバーレスの <b>event bus</b>（イベントバス）です。<b>Event</b>（イベント）とは「たった今起きた何か」のことで、たとえば「S3 に新しいファイルが置かれた」「注文の決済が完了した」、あるいは外部の SaaS アプリケーションからのイベントなどです。「種類 X のイベントが来たら宛先 Y に送る」といった <b>rule</b>（ルール）を設定します。さらに <b>Amazon EventBridge Scheduler</b> はサーバーレスのスケジューラーで、処理を<b>スケジュールどおりに</b>（1回だけ、または cron のように定期的に）実行します。たとえば「毎日午前1時に一時データを掃除する Lambda 関数を呼び出す」といったことが、タイマー用のサーバーを一切立てずに実現できます。</p>
<h4>AWS Step Functions</h4>
<p><b>Step Functions</b> は複数のステップを、図で見える <b>workflow</b>（ワークフロー）としてオーケストレーションします。ステップ1が終わったらステップ2へ、エラーなら再試行、失敗したら別の分岐へ、という流れです。複数の Lambda 関数やサービスを、順序の明確な一つのプロセスに組み上げたいときに適しています。</p>
<table>
<tr><th>サービス</th><th>モデル</th><th>試験でのキーワード</th></tr>
<tr><td>SQS</td><td>キュー。受信側が自分で取りに行く</td><td>queue, decouple, buffer, messages stored until processed</td></tr>
<tr><td>SNS</td><td>Pub/sub。複数の宛先へプッシュ</td><td>publish/subscribe, notifications, email, SMS, fan-out</td></tr>
<tr><td>EventBridge</td><td>Event bus。rule でルーティング。Scheduler はスケジュール実行</td><td>event bus, route events, SaaS, schedule, cron</td></tr>
<tr><td>Step Functions</td><td>状態を持つワークフロー</td><td>orchestrate, visual workflow, retries, error handling</td></tr>
</table>
<div class="box trap"><b>⚠️ よくあるひっかけ</b><p>SQS と SNS はどちらも「メッセージング」なので混同しがちです。<b>SQS = Queue（列に並んで待つ）</b>、<b>SNS = Notification（通知、即座にプッシュ、受信者は複数）</b>と覚えましょう。問題文に "workflow"、"orchestrate"、"coordinate multiple Lambda functions" とあれば <b>Step Functions</b> であり、SQS ではありません。"Exact order"、"no duplicates" → <b>SQS FIFO</b>。また、SNS は簡単な通知メールを送れますが、<b>大量のマーケティングメール/トランザクションメール</b>は <b>SES</b> の仕事です。</p></div>

<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>お客さんがケーキを注文すると、システムは注文を <b>SQS</b> に入れます。工房は注文を取り出して順に作っていくので、中秋節の時期に注文が殺到しても一件も失われません。注文の決済が完了すると、通知が <b>SNS</b> の topic に発行され、ランさんには SMS が、配送部門にはメールが同時に届きます。毎朝6時には <b>EventBridge</b> がその日の注文を集計する関数を起動します。「注文受付 → 在庫確認 → 代金の引き落とし → 配送スケジュールの設定」というプロセスは <b>Step Functions</b> で構築されており、引き落としのステップでネットワークエラーが起きても自動で再試行します。</p></div>

<h3>3. ビジネスアプリケーションと開発者ツール</h3>
<h4>Business applications（ビジネスアプリケーション）</h4>
<ul>
<li><b>Amazon Connect</b>: クラウド上に <b>contact center</b>（コンタクトセンター、顧客対応窓口）を構築し、通話とチャットを受け付けます。物理的な電話交換設備を購入する必要はありません。</li>
<li><b>Amazon SES</b> (Simple Email Service): メールを大量送信します。マーケティングメールにも、注文確認のようなトランザクションメールにも使えます。</li>
</ul>
<h4>Developer tools（開発者向けツール）</h4>
<p>まず <b>CI/CD</b>（継続的インテグレーション/継続的デリバリー）とは、開発者がコードを修正するたびに、システムが自動的に検証・パッケージ化し、本番環境へ反映するソフトウェア開発の進め方で、手作業で行うのとは対照的です。</p>
<ul>
<li><b>AWS CodeBuild</b>: <b>コードをコンパイルし、テストを実行</b>して、デプロイ可能なソフトウェアパッケージを作成します。</li>
<li><b>AWS CodePipeline</b>: <b>CI/CD パイプライン</b>全体を構築し、コード取得 → build → test → deploy の各ステップを自動でつなぎます。</li>
<li><b>AWS X-Ray</b>: 1つのリクエストが複数のコンポーネント（API Gateway → 各 Lambda → DynamoDB、あるいは多数のマイクロサービス）を通過する様子を <b>tracing</b>（トレース、追跡）し、どこが遅いのか、どこでエラーが起きているのかを突き止めます。混同に注意: CloudTrail はアカウント内で<b>誰がどの API を呼び出したか</b>を記録し、X-Ray はアプリケーション内の<b>リクエストの経路</b>を追跡します。</li>
<li><b>AWS CLI</b> (Command Line Interface): コマンドラインのウィンドウで<b>コマンドを入力</b>して AWS を操作します。スクリプトによる自動化に便利です。（Python や Java などのコードから AWS を呼び出す場合は <b>AWS SDK</b> を使います。）</li>
</ul>
<p class="small"><i>出題範囲についての注意: CLF-C02 の現在の In-Scope AWS Services 一覧（2026年11月時点で照合）では、Developer Tools のグループに残っているのは CLI、CodeBuild、CodePipeline、X-Ray だけです。<b>AWS CodeCommit、CodeDeploy、CodeArtifact、Cloud9、CodeStar</b> などのサービスや、migration グループの <b>AWS Snow Family、AWS Transfer Family</b>、<b>AWS DataSync</b> は、もうこの一覧に含まれていません。サードパーティの模擬問題（特に古い問題集）ではまだ登場することがあります。戸惑わない程度にざっと知っておけば十分で、深く学ぶ必要はありません。</i></p>

<h3>4. エンドユーザーコンピューティング、Amplify、IoT Core</h3>
<h4>End-user computing（エンドユーザーコンピューティング）</h4>
<ul>
<li><b>Amazon WorkSpaces</b>: Windows または Linux の<b>仮想デスクトップ</b>（virtual desktop）を提供します。従業員はどのデバイスからでもログインでき、完全な「パソコン」一式が目の前に現れます。</li>
<li><b>Amazon AppStream 2.0</b>（現在は <b>Amazon WorkSpaces Applications</b>。2025年11月に名称変更。<b>Exam Guide と試験では旧称の AppStream 2.0 が使われます</b>）: 特定の<b>1つのアプリケーションをストリーミング</b>でユーザーのブラウザに届けます。パソコン一式は提供しません。</li>
<li><b>Amazon WorkSpaces Secure Browser</b>（旧称 WorkSpaces Web）: 従業員に社内 Web サイトへアクセスするための<b>安全なブラウザ</b>を提供し、データが個人の端末に残りません。</li>
</ul>
<h4>AWS Amplify</h4>
<p><b>Amplify</b> は、フロントエンド（画面部分）やモバイルの開発者がフルスタックの Web/モバイルアプリを素早く<b>構築、デプロイ、ホスティング</b>できるよう支援します。ログイン、ストレージ、API があらかじめ用意されています。</p>
<h4>AWS IoT Core</h4>
<p><b>IoT</b>（Internet of Things、モノのインターネット）とは、センサーや機械など、ネットワークに接続された機器のことです。<b>AWS IoT Core</b> は、そうした数十億台のデバイスをクラウドに安全に接続し、そのデータを他の AWS サービスへ届けます。</p>
<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>BanhNgon は <b>Amazon Connect</b> でケーキ注文用のコールセンターを開設し、注文確認メールを <b>SES</b> で送信しています。ミンさんのチームは <b>CodePipeline</b> + <b>CodeBuild</b> を使い、コードを修正するたびに自動でテストして本番に反映しています。また <b>X-Ray</b> を使って決済ステップが遅いことを突き止めました。日本で働く経理担当者は <b>WorkSpaces</b> を使い、ケーキ職人はレシピ計算ソフトだけあればよいので <b>WorkSpaces Applications</b>（AppStream 2.0）を使います。ケーキ注文アプリは <b>Amplify</b> で作られています。温度センサーを取り付けたオーブンは <b>IoT Core</b> 経由でデータを送り、過熱時に警告を出します。</p></div>
<div class="box exam"><b>🎯 試験でよく問われること</b><ul>
<li>"decouple, messages stored in a queue" → <b>SQS</b>; "publish/subscribe, email, SMS" → <b>SNS</b></li>
<li>"serverless event bus, route events based on rules" → <b>EventBridge</b>; "run a Lambda function every night at 01:00" → <b>EventBridge Scheduler</b></li>
<li>"exact order, processed exactly once" → <b>SQS FIFO</b>; "same message to several systems at once" → <b>SNS</b>（fan-out。多くは SNS → 複数の SQS）</li>
<li>"coordinate Lambda functions in a visual workflow" → <b>Step Functions</b></li>
<li>"cloud contact center" → <b>Connect</b>; "send marketing and transactional emails" → <b>SES</b></li>
<li>"compile code, run tests" → <b>CodeBuild</b>; "automate build, test, deploy (CI/CD)" → <b>CodePipeline</b>; "trace requests, find bottlenecks" → <b>X-Ray</b></li>
<li>"virtual desktops" → <b>WorkSpaces</b>; "stream a desktop application to browser" → <b>AppStream 2.0</b>（現 WorkSpaces Applications。試験では旧称を使用）</li>
<li>"frontend/mobile developers build and host full-stack apps" → <b>Amplify</b>; "connect IoT devices" → <b>IoT Core</b></li>
</ul></div>
`,summary:["Decoupling: 各コンポーネントが仲介役を通してやり取りし、一部が故障してもシステム全体を巻き込まない。","SQS = キュー（pull、処理されるまでメッセージを保持）。SNS = pub/sub（複数の受信者へ push）。","SQS Standard: スループットはほぼ無制限、at-least-once。SQS FIFO: 順序どおり、exactly-once。","EventBridge = rule に従ってイベントをルーティングする event bus。EventBridge Scheduler = スケジュールどおりに処理を実行。Step Functions = 再試行（retry）付きの視覚的な workflow。","CodeBuild = build と test。CodePipeline = CI/CD パイプライン。X-Ray = リクエストの追跡。CLI = コマンドで AWS を操作。","WorkSpaces = 完全な仮想デスクトップ。AppStream 2.0（現 WorkSpaces Applications、試験では旧称を使用）= 1つのアプリケーションをストリーミング。WorkSpaces Secure Browser = 安全なブラウザ。","Connect = クラウドのコンタクトセンター。SES = メールの大量送信。Amplify = フルスタックの Web/モバイルアプリの構築とホスティング。IoT Core = IoT デバイスの接続。"],terms:[["Decoupling","疎結合にすること（コンポーネントの切り離し）"],["Message queue","メッセージキュー"],["FIFO (First-In-First-Out)","先入れ先出し、順序どおり"],["Publish/subscribe (pub/sub)","発行/購読"],["Topic","トピック（SNS における）"],["Fan-out","1つのメッセージを複数の宛先に送ること"],["Event bus","イベントバス（イベントの中継経路）"],["Workflow","ワークフロー（複数ステップのプロセス）"],["Contact center","コンタクトセンター（顧客対応窓口）"],["CI/CD","継続的インテグレーション / 継続的デリバリー"],["Tracing","トレース（リクエストの追跡）"],["Command Line Interface (CLI)","コマンドラインインターフェイス"],["Virtual desktop","仮想デスクトップ"],["Application streaming","アプリケーションストリーミング"],["Internet of Things (IoT)","モノのインターネット"]]};
L.course["3-12"]={title:"AWS の AI と Machine Learning",goals:["AI、machine learning、generative AI とは何かを平易な言葉で理解する","SageMaker AI（自分でモデルを構築）と構築済みの AI サービスを区別する","Rekognition、Textract、Comprehend、Translate、Transcribe、Polly、Lex、Amazon Q（Business、Developer）の機能を覚える","試験で正しいサービスを選ぶための覚え方を身につける"],html:`
<h3>1. AI、Machine Learning、Generative AI とは？</h3>
<p><b>AI</b>（Artificial Intelligence、人工知能）は広い概念で、画像を見る、話を聞く、文章を理解するといった、本来は人間の知能が必要な作業をコンピューターにできるようにすることです。</p>
<p><b>Machine Learning</b>（ML、機械学習）は AI を実現する方法の一つです。ルールを一つずつプログラムする代わりに、<b>大量の例</b>をコンピューターに見せて、自分で法則を見つけさせます。学習の成果物が <b>model</b>（モデル）です。コンピューターに学習させる過程を <b>training</b>（トレーニング、学習）、モデルを使って新しい事柄を予測することを <b>inference</b>（推論）と呼びます。</p>
<p><b>Generative AI</b>（生成 AI）は、文章を書く、質問に答える、コードを書く、画像を作るなど、<b>新しいコンテンツを生み出せる</b>種類の AI です。現在の対話型チャットボットがその例です。</p>
<div class="box idea"><b>🧠 かんたんに言うと</b><p>子どもに猫を見分けさせるとき、「猫は足が4本で、耳がとがっていて…」と説明するのではなく、猫の写真をたくさん見せるだけです。そのうち子どもは自分で見分けられるようになります。これが <b>machine learning</b> です。そして成長した子どもが、見たことのない新しい猫を自分で<b>描ける</b>ようになったら、それは <b>generative AI</b> に似ています。</p></div>

<h3>2. 2つの道: 自分でモデルを構築するか、構築済みサービスを使うか</h3>
<p><b>Amazon SageMaker AI</b> は、<b>data scientist</b>（データサイエンティスト）や ML エンジニアが独自のモデルを大規模に<b>自ら構築、トレーニング、デプロイ</b>するためのプラットフォームです。課題が独特な場合に使います。たとえば、自店の販売データをもとに毎日焼くべきケーキの数を予測する、といったケースです。</p>
<p>しかし、ほとんどの企業には ML の専門家がいません。AWS にはトレーニング済みの <b>AI service</b>（構築済みの AI サービス）が数多く用意されており、呼び出して画像・テキスト・音声を送るだけで結果が返ってきます。ML の知識は一切不要です。</p>
<div class="box idea"><b>🧠 かんたんに言うと</b><p>SageMaker AI は<b>厨房と材料を借りて、自分で新しいケーキのレシピを考案する</b>ようなものです。構築済みの AI サービスは<b>出来合いのケーキを買う</b>ようなもので、作り方を知らなくても、箱を開ければすぐ食べられます。</p></div>

<h3>3. 構築済みの AI サービス</h3>
<ul>
<li><b>Amazon Rekognition</b>: <b>画像と動画</b>を分析し、物体、顔、画像内の文字、動作を認識します。さらに <b>content moderation</b>（センシティブな内容や暴力的な内容を投稿前に自動でフラグ付けする機能）も備えます。</li>
<li><b>Amazon Textract</b>: スキャンした文書や書類の写真から、<b>文字を抽出</b>します。手書き文字、<b>表</b>、<b>フォームのデータ</b>も取り出せます。表の構造やフォームの入力欄まで理解できるため、単なる「文字の読み取り」以上のことができます。</li>
<li><b>Amazon Comprehend</b>: すでに文字になっている<b>テキストを理解</b>します（NLP、自然言語処理）。感情が肯定的か否定的かの判定（<b>sentiment</b>）、<b>entities</b>（エンティティ: 人名、製品、場所）や <b>key phrases</b>（キーフレーズ）の抽出、言語の判別、個人情報（PII）の検出、トピック別の文書分類ができます。Comprehend は<b>画像から文字を読み取らず</b>、<b>翻訳もしません</b>。</li>
<li><b>Amazon Translate</b>: テキストを言語間で<b>翻訳</b>します。</li>
<li><b>Amazon Transcribe</b>: <b>音声を文字に</b>変換します（speech-to-text）。たとえばコールセンターの通話をテキストに書き起こします。</li>
<li><b>Amazon Polly</b>: <b>文字を音声に</b>変換し、自然な音声を生成します（text-to-speech）。</li>
<li><b>Amazon Lex</b>: 音声とテキストの両方に対応した <b>chatbot</b> と対話インターフェイスを構築します。（Lex は音声アシスタント Alexa と同じ技術を使っています。）</li>
<li><i>Amazon Kendra</i>（Exam Guide のサービス一覧には含まれません。混同しないために知っておく程度で十分です）: 企業の社内文書を対象とするインテリジェント検索。</li>
<li><b>Amazon Q</b>: すぐに使える <b>generative AI アシスタント</b>で、自分でモデルを構築したりトレーニングしたりする必要はありません。試験によく出るのは次の2つです。
<ul>
<li><b>Amazon Q Business</b>: 会社のデータソース（wiki、規程、文書リポジトリ、SaaS アプリケーション）に接続し、従業員が<b>自然言語で質問</b>したり、要約やコンテンツ作成をしたりできます。</li>
<li><b>Amazon Q Developer</b>: <b>開発者</b>を支援します。コードの提案と作成、コードの説明、エラー対応、AWS に関する質問への回答を行います。</li>
<li><i>現在の状況（試験内容には影響しません）: Amazon Q Business は現在、新規のお客様の受け付けを終了しています（AWS は Amazon Quick への移行を案内しています）。Amazon Q Developer の IDE プラグインは2027年4月30日でサポートが終了し、<b>Kiro</b> に置き換えられます。試験では引き続き上記の説明どおりに出題されます。</i></li>
</ul></li>
</ul>
<p>これらのサービスはよく<b>連鎖的に組み合わせて</b>使われます。たとえばスペイン語でスキャンされた保険の申込書なら、Textract（文字を取り出す）→ Translate（英語に翻訳）→ Comprehend（感情、キーフレーズ）。コールセンターなら、Transcribe（音声 → 文字）→ Translate → Polly（回答を音声で読み上げる）。"Choose THREE" 形式の問題はこのパターンが大好きです。課題を「入力 → 出力」のステップに分解して考えましょう。</p>
<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>BanhNgon も大きくなり、ランさんは「AI を取り入れたい」と考えています。ミンさんは順に導入していきました。<b>Rekognition</b> はお客さんがレビュー欄に投稿した写真をチェックし、不適切な画像を除外します。<b>Textract</b> は小麦粉やバターの仕入先から届く紙の請求書を読み取り、システムに自動入力します。<b>Comprehend</b> は何千件ものレビューを分析し、お客さんが褒めているのか不満なのかを調べます。<b>Translate</b> は東京支店向けにケーキの説明を日本語に翻訳します。<b>Transcribe</b> はケーキ注文の通話をテキストに変換して保存します。<b>Polly</b> はアプリ上で「ご注文の準備ができました」というお知らせを読み上げます。<b>Lex</b> は Web サイトのケーキ注文用 chatbot になります。ミンさんのチームは <b>Amazon Q</b> を使って社内文書について質問したり、コード作成を支援してもらったりしています。そして、毎日焼くべきケーキの数を予測するモデルは、ミンさんが <b>SageMaker AI</b> で自らトレーニングしています。</p></div>

<h3>4. 覚え方とまとめ表</h3>
<ul>
<li><b>Rekognition</b>: "recognize" = 認識する → 画像・動画を見る。</li>
<li><b>Textract</b>: "text + extract" = 文書から文字を抜き出す。</li>
<li><b>Comprehend</b>: "comprehend" = 理解する → テキストの意味や感情を理解する。</li>
<li><b>Transcribe</b>: 話し言葉を文字に「書き起こす」。<b>Polly</b>: おしゃべりするオウム（polly）→ 文字を音声に。</li>
<li><b>Lex</b>: Alexa の兄弟 → 会話、chatbot。</li>
</ul>
<table>
<tr><th>入力 → 出力</th><th>サービス</th></tr>
<tr><td>画像/動画 → 物体、顔、動作</td><td>Rekognition</td></tr>
<tr><td>スキャン文書 → 文字、表、フォーム</td><td>Textract</td></tr>
<tr><td>テキスト → 感情、トピック、エンティティ</td><td>Comprehend</td></tr>
<tr><td>言語 A のテキスト → 言語 B</td><td>Translate</td></tr>
<tr><td>音声 → 文字</td><td>Transcribe</td></tr>
<tr><td>文字 → 音声</td><td>Polly</td></tr>
<tr><td>会話 → chatbot</td><td>Lex</td></tr>
<tr><td>generative AI による、会社のデータに対する質問応答（Q Business）とコード作成支援（Q Developer）</td><td>Amazon Q</td></tr>
<tr><td>ML モデルを自ら構築、トレーニング、デプロイ</td><td>SageMaker AI</td></tr>
</table>
<div class="box trap"><b>⚠️ よくあるひっかけ</b><p><b>Transcribe</b> と <b>Polly</b> は向きが逆です。Transcribe は音声 → 文字、Polly は文字 → 音声。<b>Textract</b> は<b>文書</b>の中の文字を読み取ります。<b>Rekognition</b> も画像内の文字を認識できますが、得意なのは物体や顔なので、問題文に "forms, tables, scanned documents" とあれば Textract を選びます。<b>Comprehend</b> はテキストを理解しますが<b>翻訳はしません</b>。翻訳は Translate です。また、問題文に "build, train, deploy your own models" とあれば <b>SageMaker AI</b> であり、構築済みサービスではありません。"no ML expertise"、"without building its own models" が強調されていれば、構築済みの AI サービスか Amazon Q を選びます。（CLF-C02 の Exam Guide には記載がないものの、選択肢に <b>Amazon Bedrock</b> の名前が出てくることがあります。これは開発者が API 経由で foundation model を呼び出し、generative AI アプリケーションを<b>自ら構築</b>するためのサービスで、すぐに使えるアシスタントである Amazon Q とは異なります。）</p></div>
<div class="box exam"><b>🎯 試験でよく問われること</b><ul>
<li>"build, train, and deploy ML models at scale" → <b>SageMaker AI</b></li>
<li>"identify objects, people, text, activities in images and videos" → <b>Rekognition</b></li>
<li>"extract text, handwriting, tables, forms from scanned documents" → <b>Textract</b></li>
<li>"sentiment of customer reviews", "extract entities, key phrases from text" → <b>Comprehend</b></li>
<li>"flag explicit or violent images/videos" → <b>Rekognition</b>（content moderation）</li>
<li>"convert call recordings to text" → <b>Transcribe</b>; "text into lifelike speech" → <b>Polly</b></li>
<li>"chatbot, conversational interface, voice and text" → <b>Lex</b></li>
<li>"generative AI assistant that answers questions from internal wikis and documents" → <b>Amazon Q Business</b>; "help developers write code" → <b>Amazon Q Developer</b></li>
</ul></div>
`,summary:["AI は広い概念。ML はデータからコンピューターに学習させて model を作ること。generative AI は新しいコンテンツを生み出す。","SageMaker AI: モデルを自ら構築、トレーニング、デプロイ。構築済みの AI サービス: 呼び出すだけでよく、ML の専門家は不要。","Rekognition = 画像/動画（センシティブなコンテンツのフィルタリングも）。Textract = 文書、表、フォーム。Comprehend = テキストの sentiment、entities、key phrases。","Translate = 翻訳。Transcribe = 音声を文字に。Polly = 文字を音声に。Lex = chatbot。","Amazon Q Business = 会社のデータに対する質問応答。Amazon Q Developer = プログラミングのアシスタント。","複数ステップの課題はサービスを組み合わせる。例: Textract → Translate → Comprehend、または Transcribe → Translate → Polly。"],terms:[["Artificial Intelligence (AI)","人工知能"],["Machine Learning (ML)","機械学習"],["Generative AI","生成 AI"],["Model","モデル"],["Training","トレーニング（学習）"],["Inference","推論（モデルを使って予測すること）"],["Data scientist","データサイエンティスト"],["Natural Language Processing (NLP)","自然言語処理"],["Sentiment analysis","感情分析"],["Entity / key phrase","エンティティ / キーフレーズ"],["Speech-to-text","音声を文字に変換すること"],["Text-to-speech","文字を音声に変換すること"],["Chatbot","チャットボット（自動会話アシスタント）"],["Computer vision","コンピュータービジョン"]]};
L.course["3-13"]={title:"データ分析: Athena、Kinesis、Glue、EMR、Redshift、Quick",goals:["データパイプラインを理解する: 収集 → 保存 → 変換 → 分析 → 可視化","Kinesis、S3、Glue、Athena、EMR、Redshift、Quick の各サービスがどのステップに位置するかを知る","OpenSearch Service が検索とログ分析に使われることを知り、Data Streams と Data Firehose を区別する","試験のキーワードから正しいサービスを選ぶ"],html:`
<h3>1. データパイプライン（data pipeline）とは？</h3>
<p>企業は注文、Web サイトでのクリック、お客さんのレビューなど、膨大なデータを生み出します。生データはそのままでは何も語りません。「夏に東京で一番売れるケーキはどれか」といった答えに変えるには、データが一連のステップを通過する必要があります。これを <b>data pipeline</b>（データパイプライン）と呼びます。</p>
<div class="flow"><span>収集 (Kinesis)</span><span>保存 (S3)</span><span>変換 (Glue / EMR)</span><span>分析 (Athena / Redshift)</span><span>可視化 (Quick)</span></div>
<div class="box idea"><b>🧠 かんたんに言うと</b><p>オレンジジュース作りに似ています。畑からオレンジを<b>収穫し</b>（収集）、<b>倉庫に積み</b>（保存）、<b>洗って、皮をむいて、搾り</b>（変換）、<b>味見して甘さを測り</b>（分析）、最後に<b>きれいなグラスに注いで</b>お客さんに出します（可視化）。</p></div>
<p>よく出てくる概念として、<b>data lake</b>（データレイク）があります。あらゆる種類の生データを元の形式のまま、低コストで蓄える場所です。AWS では、data lake は通常 <b>Amazon S3</b> 上に構築されます。</p>
<p>なぜ複数のステップに分けるのでしょうか。ステップごとに必要なツールの種類が違うからです。絶え間なく流れてくるデータを「受け止める」のが得意なツールが長期保存も得意とは限りませんし、重い分析を実行するツールがビジネス担当者にとって使いやすいとも限りません。AWS にはステップごとに専用のサービスがあり、試験ではニーズの説明を示して、どのサービスが適切かを問う形がよく出ます。コツ: 選択肢を読む前に「このニーズはパイプラインのどのステップに当たるか？」と自問しましょう。</p>

<h3>2. 収集と変換: Kinesis、Glue、EMR</h3>
<h4>Amazon Kinesis</h4>
<p>データには、まとまった単位で届くもの（たとえば一日の終わりのレポートファイル）もあれば、Web サイト上のクリック（<b>clickstream</b>）、IoT センサーのデータ、アプリケーションのログのように<b>毎秒絶え間なく</b>流れてくるものもあります。後者を <b>streaming data</b>（ストリーミングデータ）と呼びます。<b>Amazon Kinesis</b> はストリーミングデータを<b>リアルタイムで</b>収集、処理、分析します。試験によく出るのは次の2つです。</p>
<table>
<tr><th></th><th>Kinesis Data Streams</th><th>Amazon Data Firehose</th></tr>
<tr><td>役割</td><td>データストリームを受け止めて保持し、<b>自分のアプリケーション</b>が読み出して処理できるようにする</td><td>データストリームを宛先（S3、Redshift、OpenSearch など）へ<b>自動で配信</b>する</td></tr>
<tr><td>自分でやること</td><td>データを読み取るアプリケーション（<b>consumer</b>）を自分で書く</td><td>ほぼ何もなし。ソースと宛先を選ぶだけで、<b>consumer を書く必要はなく</b>、自動でスケールする</td></tr>
<tr><td>使いどころ</td><td>リアルタイムでカスタム処理が必要なとき</td><td>ストリーミングデータをニアリアルタイムでデータストアに<b>ロード</b>（load）するだけでよいとき</td></tr>
</table>
<p>Amazon Data Firehose の旧称は Kinesis Data Firehose です。試験ではどちらの名前も使われる可能性があります。</p>
<h4>AWS Glue</h4>
<p><b>ETL</b> は Extract - Transform - Load の略で、ソースからデータを<b>抽出</b>し、<b>変換</b>（クレンジング、形式変換、結合）して、使う場所へ<b>ロード</b>することです。<b>AWS Glue</b> は<b>サーバーレス</b>の ETL サービスです。Glue には <b>Data Catalog</b>（データカタログ）もあります。どのデータがどこにあり、どんな列を持つかを記録した「目次」で、Athena などの他のサービスがデータを見つけられるようにします。Glue にはデータを自動でスキャンして目次を作る <b>crawler</b> があります。<b>Glue ETL job をスケジュール</b>して毎晩実行することもでき、たとえば S3 内の CSV ファイルを Parquet 形式（コンパクトでクエリが速い）に変換する処理を、<b>クラスターを一切構築・管理せずに</b>行えます。</p>
<h4>Amazon EMR</h4>
<p><b>Amazon EMR</b> は、<b>Apache Spark</b>、<b>Apache Hadoop</b>、Hive、Presto といった有名なオープンソースの <b>big data</b>（ビッグデータ）処理フレームワークを実行します。会社がすでにこれらのツールに慣れていて、膨大なデータを処理する必要がある場合に適しています。クラスター（<b>cluster</b>）の構築は AWS が引き受けますが、Glue と比べると構成の選択やクラスターの運用は利用者側の作業が多くなります（EMR には Serverless 版もあります）。そのため、試験で「シンプルな ETL、<b>運用の手間が最も少ない</b>、cluster を管理しない」と問われたら <b>Glue</b> を優先します。</p>

<h3>3. 分析と可視化: Athena、Redshift、Quick、OpenSearch</h3>
<h4>Amazon Athena</h4>
<p><b>Athena</b> は<b>標準 SQL を S3 上のデータに対して直接</b>実行できます。データベースへのロードも、サーバーも不要です。料金はクエリがスキャンしたデータ量に応じて支払います。data lake 内のログファイルや CSV ファイルに対して、ときどき手早く問い合わせる用途にとても向いています。</p>
<h4>Amazon Redshift</h4>
<p><b>Redshift</b> は <b>data warehouse</b>（データウェアハウス。データベースのレッスンで登場）です。データをあらかじめロードして整理しておき、非常に大きなデータに対して複雑な分析クエリを頻繁に実行し、ビジネスレポートに役立てます。</p>
<h4>Amazon Quick</h4>
<p><b>Amazon Quick</b>（Exam Guide のサービス一覧で使われている名称。旧称は Amazon QuickSight で、古い模擬問題ではこちらの名前がよく使われます）は <b>BI</b>（Business Intelligence、ビジネスインテリジェンス）ツールで、技術の専門家でないユーザーでもデータから <b>dashboard</b>（ダッシュボード）やインタラクティブなグラフを作成できます。</p>
<h4>Amazon OpenSearch Service</h4>
<p><b>OpenSearch Service</b> は<b>全文検索</b>（full-text search。たとえば Web サイトの商品検索ボックス）と<b>ニアリアルタイムのログ分析</b>に使われ、エラーの急増を見つけるためのインタラクティブなダッシュボード（OpenSearch Dashboards）も備えています。このサービスの旧称は Amazon Elasticsearch Service です。</p>
<h4>その他の分析サービス（Exam Guide の一覧には含まれません。混同しないよう名前を知っておく程度で十分です）</h4>
<ul>
<li><b>AWS Lake Formation</b>: S3 上の data lake を素早く構築し、<b>アクセス権限を管理</b>します。</li>
<li><b>Amazon MSK</b> (Managed Streaming for Apache Kafka): <b>Apache Kafka</b> をマネージド型で実行します。問題文に "Kafka" とあれば → MSK。</li>
<li><b>AWS Data Exchange</b>: <b>サードパーティのデータ</b>（たとえば気象データや金融データ）を探してサブスクライブし、AWS 上で利用します。</li>
</ul>
<div class="box trap"><b>⚠️ よくあるひっかけ</b><p><b>Athena</b> と <b>Redshift</b> はどちらも SQL で分析を行います。違いは、Athena は<b>S3 上でその場でクエリし、サーバーレスで、データのロードが不要</b>で、単発のクエリ向きであること。Redshift は大規模で頻繁な分析のための<b>データウェアハウス</b>です。また <b>Glue</b>（サーバーレス ETL、Data Catalog）と <b>EMR</b>（Spark/Hadoop）はどちらもデータを変換します。Spark/Hadoop の名前が出てきたら EMR を選びます。Kinesis は <b>real-time streaming</b> であり、SQS（アプリケーションのコンポーネント間のメッセージキュー）と混同しないようにしましょう。</p></div>

<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>ランさんは「よく見られているのに買われていないケーキはどれか」を知りたいと考えています。ミンさんはパイプラインを構築しました。Web サイトとアプリでのクリックは <b>Kinesis</b> がリアルタイムで収集し、data lake である <b>S3</b> に流し込みます。<b>Glue</b> がデータをクレンジングして Data Catalog を作成します。単発の質問に素早く答えたいとき、ミンさんは <b>Athena</b> で S3 に対して直接 SQL を実行します。3つの支店の週次売上レポートは <b>Redshift</b> 上で実行されます。結果は <b>Quick</b> のダッシュボードとして表示され、ランさんはスマートフォンで確認できます。Web サイトの「砂糖不使用のケーキ」の検索ボックスは <b>OpenSearch Service</b> で動いています。その後、分析チームが Spark に慣れているため、一部の重い処理は <b>EMR</b> で実行するようになりました。</p></div>

<h3>4. まとめ表</h3>
<table>
<tr><th>ステップ</th><th>サービス</th><th>試験でのキーワード</th></tr>
<tr><td>収集</td><td>Amazon Kinesis (Data Streams)</td><td>real-time streaming, clickstream, IoT telemetry</td></tr>
<tr><td>収集 → ロード</td><td>Amazon Data Firehose</td><td>deliver streaming data to S3/Redshift, no code</td></tr>
<tr><td>保存</td><td>Amazon S3</td><td>data lake、低コストで保存、容量無制限</td></tr>
<tr><td>変換</td><td>AWS Glue</td><td>serverless ETL, data catalog, crawler</td></tr>
<tr><td>変換</td><td>Amazon EMR</td><td>Apache Spark, Hadoop, big data frameworks</td></tr>
<tr><td>分析</td><td>Amazon Athena</td><td>SQL queries directly on S3, serverless</td></tr>
<tr><td>分析</td><td>Amazon Redshift</td><td>data warehouse, petabyte, complex analytics</td></tr>
<tr><td>可視化</td><td>Amazon Quick</td><td>dashboards, visualizations, BI</td></tr>
<tr><td>検索、ログ</td><td>Amazon OpenSearch Service</td><td>full-text search, log analytics</td></tr>
</table>
<div class="box exam"><b>🎯 試験でよく問われること</b><ul>
<li>"run SQL queries directly on data in S3 without loading or managing servers" → <b>Athena</b></li>
<li>"collect and process real-time streaming data, clickstreams" → <b>Kinesis</b></li>
<li>"load streaming data into S3/Redshift, no consumer applications to manage" → <b>Amazon Data Firehose</b></li>
<li>"full-text search, log analytics, near real time dashboards" → <b>OpenSearch Service</b></li>
<li>"serverless data integration, ETL, data catalog", "scheduled transform, no clusters, least operational overhead" → <b>Glue</b></li>
<li>"Apache Spark, Apache Hadoop" → <b>EMR</b></li>
<li>"complex analytical queries on petabytes" → <b>Redshift</b></li>
<li>"business users create interactive dashboards" → <b>Quick</b></li>
</ul></div>
`,summary:["Data pipeline: 収集 → 保存 → 変換 → 分析 → 可視化。","Kinesis Data Streams はストリーミングデータを収集（consumer は自分で書く）。Data Firehose はストリーミングデータを S3/Redshift へ自動でロード。S3 は data lake としてよく使われる。","Glue = サーバーレス ETL + Data Catalog で運用の手間が最も少ない。EMR = big data 向けに cluster 上で Spark/Hadoop を実行。","Athena = S3 上で直接 SQL、サーバーレス。Redshift = 大規模分析向けの data warehouse。","Quick（旧称 QuickSight）= BI ダッシュボード。OpenSearch Service = 検索とログ分析。"],terms:[["Data pipeline","データパイプライン"],["Data lake","データレイク"],["Streaming data","ストリーミングデータ（絶え間なく流れるデータ）"],["Real-time","リアルタイム"],["Clickstream","クリックストリーム（ユーザーのクリックの履歴）"],["ETL (Extract, Transform, Load)","データの抽出、変換、ロード"],["Data catalog","データカタログ"],["Big data","ビッグデータ"],["Data warehouse","データウェアハウス"],["Business Intelligence (BI)","ビジネスインテリジェンス（ビジネス分析）"],["Dashboard","ダッシュボード"],["Log analytics","ログ分析"],["Consumer application","データストリームを読み取って処理するアプリケーション"]]};
L.course["3-14"]={title:"管理とガバナンス: Organizations、Control Tower、Systems Manager、Trusted Advisor…",goals:["企業がなぜ複数の AWS アカウントを使うのか、Organizations、SCP、Control Tower でどう管理するのかを理解する","Service Catalog、Service Quotas、Systems Manager、CloudFormation が何のためのものかを知る","推奨事項を提示するツール（Trusted Advisor、Compute Optimizer、Well-Architected Tool）を区別する","AWS Health Dashboard、License Manager、AWS RAM を知る"],html:`
<h3>1. 複数の AWS アカウント: Organizations、SCP、Control Tower</h3>
<p><b>AWS account</b>（AWS アカウント）は、リソースと請求をまとめる一つの「専用区画」です。大企業は通常、<b>複数のアカウント</b>を使います。テスト環境用、本番環境（production）用、部署ごと、といった具合です。このように分けることで、ある場所の障害が他へ波及しにくくなり、コストも追跡しやすくなります。ただし、アカウントが多くなると一元的に管理する方法が必要です。</p>
<h4>AWS Organizations</h4>
<p><b>AWS Organizations</b> は複数のアカウントを一つの組織にまとめ、<b>OU</b>（Organizational Unit、組織単位）と呼ばれるグループに整理します。主なメリットは次のとおりです。</p>
<ul>
<li><b>Consolidated billing</b>（一括請求）。追加料金はかかりません。<b>management account</b>（管理アカウント）が支払う共通の<b>1つの請求書</b>にまとまり、全アカウントの使用量を<b>合算</b>してより安い料金階層（volume pricing tiers）に到達でき、<b>Reserved Instances / Savings Plans</b> の割引をアカウント間で<b>共有</b>できます。</li>
<li><b>SCP</b>（Service Control Policy、サービスコントロールポリシー）: 各アカウントに許される操作の<b>上限</b>を設定します。例:「テスト用 OU では誰もアジア以外のリージョンを使えない」。</li>
</ul>
<div class="box trap"><b>⚠️ よくあるひっかけ</b><p>SCP は誰にも<b>権限を付与しません</b>。制限の「柵」を引くだけです。ユーザーには引き続き IAM による権限が必要で、実際の権限は IAM が許可するものと SCP がブロックしないものの<b>重なる部分</b>になります。SCP はアカウント全体に適用され、<b>メンバーアカウント</b>（member account）の管理者やルートユーザーも対象になりますが、management account は制限<b>しません</b>。</p></div>
<h4>AWS Control Tower</h4>
<p><b>AWS Control Tower</b> は、ベストプラクティスに沿った安全なマルチアカウント環境、すなわち <b>landing zone</b>（ランディングゾーン）を<b>素早く構築して統制する</b>のに役立ちます。内部では Organizations を使い、基盤となるアカウント（ログ用アカウント、監査用アカウントなど）を自動で作成し、あらかじめ用意された <b>control</b>（guardrail、ガードレールとも呼ばれる保護ルール）を適用します。</p>
<div class="box idea"><b>🧠 かんたんに言うと</b><p>Organizations は<b>多数の店舗を管理する企業グループ</b>のようなものです。帳簿は一つで、どの店舗も従わなければならない<b>グループ規程</b>（SCP）があります。Control Tower は<b>「チェーン店開業おまかせパック」</b>のようなもので、最初から標準仕様の店舗、防犯カメラ、安全規程がそろっており、あとは型どおりに新しい店舗を増やすだけです。</p></div>

<h3>2. リソースのプロビジョニングと運用</h3>
<ul>
<li><b>AWS Service Catalog</b>: IT 部門が<b>承認済み製品のカタログ</b>（例:「会社標準の Web サーバー」）を作成し、従業員が正しい構成で規程どおりに自らデプロイできるようにします。社員食堂の<b>固定メニュー</b>のようなもので、メニューにある料理しか選べません。</li>
<li><b>Service Quotas</b>: AWS の各サービスには<b>上限</b>（quota、service limit とも呼ばれる）があります。たとえば1つのリージョン内のリソースの最大数です。Service Quotas ではすべての上限を<b>1か所で</b>確認でき、引き上げをリクエストしたり、上限に近づいたときの CloudWatch アラームを設定したりできます。</li>
<li><b>AWS Systems Manager</b>: <b>多数のサーバーをまとめて管理・運用する</b>ための「道具箱」です（EC2 に加えてオンプレミスのマシンも対象）。パッチの自動適用（Patch Manager）、複数のマシンでのコマンド同時実行（Run Command）、SSH ポートを開けずに安全にマシンへログイン（Session Manager）、アプリケーションの設定やパスワードの保存（Parameter Store）ができます。</li>
<li><b>AWS CloudFormation</b>（おさらい）: インフラを<b>テンプレートファイル</b>で記述し、AWS にそのとおりに自動作成させます。何度でも繰り返せます。これが <b>Infrastructure as Code</b>（コードとしてのインフラ）です。</li>
</ul>

<h3>3. 推奨事項の提示とモニタリングのツール</h3>
<ul>
<li><b>AWS Trusted Advisor</b>: アカウントをチェックし、6つのカテゴリで<b>ベストプラクティスに基づく推奨事項</b>を提示します。<b>cost optimization</b>（コスト最適化）、<b>performance</b>（パフォーマンス）、<b>security</b>（セキュリティ）、<b>fault tolerance</b>（耐障害性）、<b>service limits</b>（サービスの上限）、<b>operational excellence</b>（運用上の優秀性）です。例: アイドル状態またはほとんど使われていない EC2 インスタンス、どこにもアタッチされていない EBS ボリューム、公開状態の S3 bucket、すべてのアドレスにポートを開放している security group、MFA を有効にしていないルートユーザー、サービスの上限に近づいている状況を指摘します。<b>Basic</b> プラン（無料）では、<b>service limits のチェックすべて</b>、<b>中核となるセキュリティチェック</b>（core security checks。例: ルートの MFA、ポートを開放している security group、S3 bucket permissions、公開されている EBS/RDS スナップショット）、そして <b>fault tolerance のチェック1件</b>が利用できます。全チェックを利用するには Business Support+ 以上のプランが必要です。</li>
<li><b>AWS Compute Optimizer</b>: <b>machine learning</b> で実際の使用状況を分析し、適切なリソース（EC2、Auto Scaling group、EBS、Lambda など）の<b>タイプとサイズ</b>を提案します。つまり <b>rightsizing</b> を支援します。</li>
<li><b>AWS Health Dashboard</b>: 自分のリソースに影響しうる <b>AWS サービスの障害</b>と<b>メンテナンス予定</b>を確認できます。2つの部分があります。<b>Service health</b>（すべての AWS サービスの全般的な状態。誰でも閲覧可能）と <b>Your account health</b>（自分のリソースに影響する個別のイベント。例:「この EC2 インスタンスは X 日にメンテナンスされます」）です。このデータをプログラムから取得したい場合は <b>AWS Health API</b> を使うか、EventBridge 経由でイベントを受け取って自動で通知します。</li>
<li><b>AWS Well-Architected Tool</b>: <b>AWS Well-Architected フレームワーク</b>の柱に沿って<b>ワークロードをセルフレビュー</b>し、改善すべきリスクを示してくれる質問形式のツールです。</li>
</ul>
<div class="box trap"><b>⚠️ よくあるひっかけ</b><p>Trusted Advisor、Compute Optimizer、Well-Architected Tool はどれも「助言」をします。違いは次のとおりです。<b>Trusted Advisor</b> はアカウントを自動でスキャンし、多方面（コスト、セキュリティ、上限など）について<b>幅広く</b>助言します。<b>Compute Optimizer</b> は ML による<b>リソースの適正サイズ選び</b>だけに特化しています。<b>Well-Architected Tool</b> は、1つのワークロードのアーキテクチャを評価するために<b>自分で質問集に回答する</b>ものです。一方 <b>Health Dashboard</b> は <b>AWS</b> 側の障害についての情報であり、最適化の助言ではありません。</p></div>

<h3>4. License Manager と AWS RAM</h3>
<p><b>AWS License Manager</b> は、Microsoft、Oracle、SAP などのベンダーの<b>ソフトウェアライセンスの管理と追跡</b>（ライセンスとは使用許諾のこと）を支援し、購入したライセンス数を超えて使ってしまうことを防ぎ、ライセンス監査を受けた際のリスクを回避します。</p>
<p><b>AWS Resource Access Manager</b>（AWS RAM）は、AWS アカウント間（または Organization 全体）で<b>リソースを共有</b>できるようにします。たとえば subnet や Transit Gateway を共有でき、アカウントごとに別々に作成する必要がなくなります。</p>

<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>BanhNgon には今、ハノイ、ホーチミン、日本、テスト、production それぞれ専用のアカウントがあります。ミンさんは <b>Control Tower</b> で landing zone を構築し、その下で <b>Organizations</b> が請求書を1つにまとめています。ある <b>SCP</b> は、テスト用アカウントが高価なインスタンスタイプを使うことをブロックします。新入社員がテスト用サーバーを必要とするときは <b>Service Catalog</b> から選びます。中秋節のシーズンには、ミンさんが <b>Service Quotas</b> で EC2 インスタンス数の上限引き上げを申請します。<b>Systems Manager</b> は毎週すべてのサーバーに自動でパッチを適用します。<b>Trusted Advisor</b> がどこにもアタッチされていない EBS ボリュームがいくつかあると知らせてくれたので、削除して費用を節約しました。<b>Compute Optimizer</b> は Web を動かすインスタンスのサイズを下げるよう提案します。ある日 Web サイトが遅くなり、ミンさんが <b>AWS Health Dashboard</b> を開くと、AWS がある AZ での障害を知らせていました。経理部門は <b>License Manager</b> で Windows Server のライセンスを追跡しています。共用ネットワークは <b>AWS RAM</b> 経由で各アカウントに共有されています。</p></div>

<h3>5. 「必要なこと → 使うもの」の表</h3>
<table>
<tr><th>ニーズ</th><th>サービス</th></tr>
<tr><td>複数アカウントを一元管理し、請求書を1つにまとめる</td><td>AWS Organizations (consolidated billing)</td></tr>
<tr><td>アカウント/OU の権限の上限を設定する</td><td>Service Control Policy (SCP)</td></tr>
<tr><td>ベストプラクティスに沿ったマルチアカウントの landing zone を素早く構築する</td><td>AWS Control Tower</td></tr>
<tr><td>ユーザーが自らデプロイできる承認済み IT 製品のカタログ</td><td>AWS Service Catalog</td></tr>
<tr><td>サービスの上限を確認し、引き上げを申請する</td><td>Service Quotas</td></tr>
<tr><td>パッチ適用、コマンド実行、多数のサーバーの一括管理</td><td>AWS Systems Manager</td></tr>
<tr><td>テンプレートで繰り返し可能なインフラを作成する</td><td>AWS CloudFormation</td></tr>
<tr><td>ベストプラクティスの推奨事項: コスト、セキュリティ、パフォーマンス、上限</td><td>AWS Trusted Advisor</td></tr>
<tr><td>ML で最適な EC2 のタイプ/サイズを提案する</td><td>AWS Compute Optimizer</td></tr>
<tr><td>アカウントに影響する AWS の障害とメンテナンス予定</td><td>AWS Health Dashboard</td></tr>
<tr><td>Well-Architected フレームワークに沿ってワークロードを評価する</td><td>AWS Well-Architected Tool</td></tr>
<tr><td>Microsoft、Oracle のソフトウェアライセンスを追跡する</td><td>AWS License Manager</td></tr>
<tr><td>アカウント間でリソースを共有する</td><td>AWS Resource Access Manager (RAM)</td></tr>
</table>
<div class="box exam"><b>🎯 試験でよく問われること</b><ul>
<li>"single bill, volume discounts across accounts" → <b>Organizations consolidated billing</b></li>
<li>"set up and govern a secure multi-account environment (landing zone)" → <b>Control Tower</b></li>
<li>"catalogs of approved IT services" → <b>Service Catalog</b>; "view limits and request increases" → <b>Service Quotas</b></li>
<li>"recommend optimal EC2 instance types using ML" → <b>Compute Optimizer</b></li>
<li>"identify idle resources, best practice checks", "security groups with unrestricted ports, root without MFA" → <b>Trusted Advisor</b></li>
<li>"prevent member accounts, even administrators, from using Regions outside X" → <b>SCP</b></li>
<li>"share RI/Savings Plans discounts across accounts" → <b>consolidated billing</b></li>
<li>"patch and run commands on EC2 and on-premises servers" → <b>Systems Manager</b>; "share subnets with other accounts" → <b>AWS RAM</b></li>
<li>"AWS service events, scheduled maintenance affecting your resources" → <b>AWS Health Dashboard</b></li>
<li>"review workloads against Well-Architected best practices" → <b>Well-Architected Tool</b></li>
<li>"manage software licenses (Microsoft, Oracle)" → <b>License Manager</b></li>
</ul></div>
`,summary:["Organizations は複数のアカウントをまとめる: consolidated billing（一括請求。請求書は1つ、料金階層は合算、RI/Savings Plans の割引を共有）と SCP（上限を設定するもので、権限は付与しない）。","Control Tower はベストプラクティスに沿ったマルチアカウントの landing zone を構築し、内部で Organizations を使う。","Service Catalog = 承認済み製品のカタログ。Service Quotas = 上限の確認と引き上げ申請。","Systems Manager = 多数のサーバーの一括運用（パッチ適用、コマンド実行、Session Manager）。CloudFormation = テンプレートによるインフラ構築。","Trusted Advisor = 6つのカテゴリでのベストプラクティスの推奨事項（Basic では service limits checks すべて + core security checks + fault tolerance check 1件）。Compute Optimizer = ML による rightsizing。Well-Architected Tool = ワークロードのセルフレビュー。","Health Dashboard = AWS の障害とメンテナンス。License Manager = ライセンス管理。RAM = アカウント間のリソース共有。"],terms:[["AWS account","AWS アカウント"],["Organizational Unit (OU)","組織単位（アカウントのグループ）"],["Consolidated billing","一括請求"],["Service Control Policy (SCP)","サービスコントロールポリシー"],["Landing zone","ランディングゾーン（標準に沿って構築済みのマルチアカウント環境）"],["Guardrail / control","ガードレール（保護ルール）"],["Service quota / service limit","サービスの上限（クォータ）"],["Patch","パッチ（修正プログラム）"],["Infrastructure as Code (IaC)","コードとしてのインフラ"],["Best practice","ベストプラクティス（推奨される最良の方法）"],["Rightsizing","リソースを適正なサイズにすること"],["Scheduled maintenance","予定されたメンテナンス"],["Software license","ソフトウェアライセンス"],["Resource sharing","リソース共有"]]};
})();
