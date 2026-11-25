(function(){var I=window.CLF_I18N=window.CLF_I18N||{};var L=I.ja=I.ja||{};['q','course','lessons','glossary','services','domains','ui'].forEach(function(k){L[k]=L[k]||{};});
L.course["0-1"]={title:"サーバー、データセンター、そしてクラウドが生まれた理由",goals:["server（サーバー）とは何か、自分のノートパソコンと何が違うのかを理解する","Web サイトを 24 時間 365 日動かすために何が必要かを知る","data center とは何か、サーバーを自前で運用する代償を理解する","クラウドの核となる考え方「インターネット経由でコンピューティング能力を借りる」を押さえる"],html:`
<h3>Server とは何か？ノートパソコンとの違い</h3>
<p><b>Server</b>（サーバー）も、実はただのコンピュータです。CPU（プロセッサ）、RAM（一時的なメモリ）、ハードディスク、ネットワークカードを備えており、ノートパソコンとまったく同じです。違うのは<i>目的</i>です。ノートパソコンは画面の前に座る 1 人のために働きますが、サーバーはネットワーク経由で同時に非常に多くの人のために働きます。</p>
<p>昼夜を問わず他の人にサービスを提供し続ける必要があるため、サーバーは通常、電源を切らずに何年も連続稼働できるように設計されています。たいていはディスプレイもキーボードもありません。管理者は離れた場所からリモートで操作します。</p>
<p>Facebook や YouTube、ショッピングサイトを開くとき、あなたのスマートフォンはどこかにあるサーバーに「問い合わせ」をしています。サーバーはその問い合わせを受け取り、データを探し、Web ページをあなたに送り返します。</p>
<div class="box idea"><b>🧠 かんたんに言うと</b><p>ノートパソコンは自宅のキッチンのようなもので、家族の分を作ります。サーバーはレストランの厨房のようなもので、何百人ものお客さんのために料理を作り、朝から晩まで営業し、「病欠」は許されません。同じキッチンでも、求められるものはまったく違います。</p></div>

<h3>Web サイトを動かすには何が必要か？</h3>
<p>1 つのショッピングサイトを動かすには、少なくとも次のものが必要です。</p>
<ul>
<li><b>コードを実行するコンピュータ</b>: 注文処理、ログイン、代金の計算を行うプログラムを動かします。</li>
<li><b>データの保存場所</b>: 商品一覧、注文、ケーキの写真など。</li>
<li>安定していて、多くの人が同時にアクセスできるだけの速度がある<b>インターネット接続</b>。</li>
<li><b>途切れない電力</b>: 停電すれば Web サイトは「死んで」しまいます。</li>
<li><b>面倒を見る人</b>: ソフトウェアの更新、不具合の修正、データのバックアップ、ハッカー対策を行います。</li>
</ul>
<p>小さな Web サイトなら、これらすべてを 1 台のコンピュータに収めることもできます。しかしビジネスが大きくなると、すべてがはるかに複雑になります。</p>
<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>オンライン販売を始めたばかりの頃、店主のランさんはミンさんに頼んで、店の倉庫に置いた古いパソコン（小麦粉の袋の隣です）で Web サイトを立ち上げてもらいました。普段は数十人のお客さんが見に来る程度で、パソコンは問題なく動いていました。</p><p>そしてテト（旧正月）のセールがやって来ます。ランさんが広告を出すと、何千人もの人が一斉にアクセスしました。パソコンは過負荷になり、Web サイトは完全に固まってしまいます。さらに悪いことに、その日の午後、その地区が 2 時間停電しました。お客さんはケーキを注文できず、他の店に流れてしまいました。ミンさんは再起動と、失われた注文がないかの確認に一晩を費やしました。</p></div>

<h3>Data center: サーバーのための「ホテル」</h3>
<p>大企業はサーバーを倉庫には置きません。<b>data center</b>（データセンター）に置きます。これは、<b>rack</b>（ラック）と呼ばれる金属製の棚に並べた何百台、何千台ものサーバーを収容する専用の建物です。</p>
<p>きちんとした data center には、次のものが必要です。</p>
<ul>
<li>予備電源: 停電しないようにするための発電機やバッテリーシステム（UPS）。</li>
<li>冷却システム: 連続稼働するサーバーは大量の熱を出し、熱くなりすぎると故障します。</li>
<li>物理的な保護: 警備員、カメラ、カードキー、防火、浸水対策。</li>
<li>高速なインターネット回線。通常は冗長化のために複数の通信事業者と接続します。</li>
<li>故障したハードディスクの交換、新しいマシンの設置、24 時間 365 日の監視を行うエンジニアチーム。</li>
</ul>
<p>企業が自分でサーバーを購入し、自社の data center（またはオフィス内）に設置することを <b>on-premises</b>（オンプレミス。略して "on-prem"）と呼びます。</p>

<h3>自前で運用することの代償</h3>
<p>サーバーを自前で動かすのは「自分でコントロールできる」ように聞こえますが、問題がたくさんあります。</p>
<ul>
<li><b>前払いの費用がかかる</b>: ビジネスが成功するかどうか分かる前に、マシンを買わなければなりません。良いサーバー 1 台が、店舗の賃料 1 年分に相当することもあります。</li>
<li><b>キャパシティを予測しなければならない</b>: 少なく買えばお客さんが多いときにダウンし、多く買えばほとんどの時間マシンが遊んでしまいます。</li>
<li><b>遅い</b>: 発注、納品待ち、設置、セットアップに数週間から数か月かかることがあります。</li>
<li><b>隠れたコスト</b>: 電気代、冷却、設置場所の賃料、運用担当者の人件費、数年後のマシン交換。</li>
<li><b>リスク</b>: 火災、浸水、停電、ハードディスクの故障。すべてあなたの仕事です。</li>
</ul>
<div class="box idea"><b>🧠 かんたんに言うと</b><p>サーバーを自前で運用するのは、移動するために車を自分で買い、駐車場を自分で借り、自分で整備し、自分で保険に入るようなものです。その月にほとんど乗らなくても、すべての費用を満額払うことになります。</p></div>

<h3>クラウドの考え方: 買う代わりに借りる</h3>
<p>Amazon のような巨大企業は、世界中に数多くの data center をすでに建設していました。そこで彼らは考えました。「これを他の人に貸し出してはどうだろう？」。それがまさに <b>cloud computing</b>（クラウドコンピューティング）です。</p>
<p>クラウドでは、マシンを買いません。プロバイダーの Web サイトにアクセスしていくつかボタンを押すだけで、数分後にはすぐに使える「サーバー」が手に入ります。使った分だけ、時間単位、あるいは秒単位で支払います。使わなくなったら停止すれば、支払いも止まります。</p>
<p>「クラウド（雲）」というのは単なる言い回しです。サーバーは今も本物のマシンであり、本物の data center の中にあります。ただ、あなたにはそれが見えず、世話をする必要もなく、インターネット経由でアクセスするというだけです。</p>
<div class="box idea"><b>🧠 かんたんに言うと</b><p>クラウドは、車を買う代わりに配車アプリのタクシーを使うようなものです。必要なときに呼び、乗り終わったら走った距離の分だけ支払います。車の整備、給油、駐車は事業者の仕事です。</p></div>
<p><b>AWS</b>（Amazon Web Services）は Amazon のクラウドプロバイダーであり、あなたが今勉強している試験のテーマでもあります。</p>
<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>悲惨だったテトのセールの後、ミンさんは Web サイトを AWS に移すことを提案しました。普段は小さくて安いマシンを 1 台だけ動かします。テトの時期はお客さんをさばけるようにマシンを追加で起動し、テトが終われば減らします。AWS の data center には予備電源と専任の管理チームがあるので、倉庫の停電を心配する必要はもうありません。ランさんは実際に使った分だけ支払います。</p></div>
<div class="box exam"><b>🎯 試験によく出る</b><ul>
<li>"stop buying servers upfront", "pay only for what you use" → <b>Trade fixed expense for variable expense</b>（固定費を変動費に変える）というメリット。</li>
<li>"buys too many servers for peaks, resources idle" → <b>Stop guessing capacity</b>。</li>
<li>"costs eliminated by moving from on-premises" → ハードウェアの購入・交換、電力、data center の冷却。</li>
<li>試験では常に <b>on-premises</b> と <b>AWS Cloud</b> が比較されます。上で挙げた「痛み」を覚えておきましょう。正解はたいてい、クラウドがそれらを解決するというものです。</li>
</ul></div>
<div class="box trap"><b>⚠️ よくあるひっかけ</b><p>クラウドに移行しても「責任が何もなくなる」わけではありません。AWS は data center、電力、ハードウェアの部分を担当しますが、あなたのデータ、ユーザーアカウント、セキュリティ設定は引き続きあなたの仕事です。詳しくは Shared Responsibility Model（責任共有モデル）のパートで学びます。</p></div>
`,summary:["Server は、ネットワーク経由で多くの人にサービスを提供する専用のコンピュータで、24 時間 365 日動き続けます。","Web サイトには、コードを動かすマシン、データの保存場所、インターネット、電力、運用する人が必要です。","Data center はサーバーを収容する専用の建物で、予備電源、冷却、警備を備えています。","自前での運用（on-premises）は、前払いの費用がかかり、キャパシティを予測しなければならず、遅く、隠れたコストも多くなります。","クラウド = インターネット経由でコンピューティング能力を借りること。使った分だけ支払い（従量課金）、数分ですぐに使えます。"],terms:[["Server","サーバー"],["Data center","データセンター"],["Rack","サーバーを設置するラック"],["On-premises (on-prem)","オンプレミス（自社設置のインフラ）"],["Cloud computing","クラウドコンピューティング"],["CPU","プロセッサ"],["RAM / memory","一時的なメモリ"],["Capacity","キャパシティ（処理能力）"],["Upfront cost","前払いの費用（初期費用）"],["Pay-as-you-go","従量課金（使った分だけ支払う）"]]};
L.course["0-2"]={title:"インターネットの仕組み: IP、DNS、ネットワーク、レイテンシー",goals:["Web ページを開くときの client/server モデルを理解する","IP address、domain name、DNS とは何かを知る","bandwidth（帯域幅）と latency（レイテンシー、遅延）を区別し、なぜ距離が重要なのかを理解する","public/private ネットワークと firewall を概念レベルで理解する"],html:`
<h3>Client と server: 誰が尋ね、誰が答えるか</h3>
<p>インターネット上のほとんどすべてのものは、1 つのパターンに従っています。一方が<b>尋ね</b>、もう一方が<b>答える</b>というものです。尋ねる側を <b>client</b>（クライアント）と呼び、たいていはブラウザやスマートフォンのアプリです。答える側が <b>server</b>（サーバー）です。</p>
<p>Web サイトのアドレスを入力すると、ブラウザはサーバーに <b>request</b>（リクエスト、要求）を送ります。サーバーはそれを処理し、<b>response</b>（レスポンス、応答）として Web ページ、画像、データを返します。</p>
<div class="box idea"><b>🧠 かんたんに言うと</b><p>Client は料理を注文するお客さん、server は厨房です。お客さんは厨房がどう調理しているかを知る必要はなく、正しく注文して料理を受け取るだけです。</p></div>

<h3>IP address、domain name、DNS</h3>
<p>インターネット上の各コンピュータは、<b>IP address</b>（IP アドレス）と呼ばれる数字の住所を持っています。たとえば <code>203.0.113.25</code> です。あるサーバーに request を送るには、client はそのサーバーの IP を知っていなければなりません。手紙を送るには番地を知っている必要があるのと同じです。</p>
<p>しかし、人間は数字の並びを覚えきれません。そこで、覚えやすい <b>domain name</b>（ドメイン名）を使います。たとえば <code>banhngon.vn</code> です。ドメイン名を IP アドレスに変換する仕組みを <b>DNS</b>（Domain Name System、ドメインネームシステム）と呼びます。</p>
<div class="box idea"><b>🧠 かんたんに言うと</b><p>DNS はインターネットの電話帳です。あなたは「ランさん」という名前を覚えていて、電話帳が電話番号を調べてくれます。「banhngon.vn」と入力すれば、DNS がサーバーの IP アドレスを調べてくれます。</p></div>
<div class="flow"><span>banhngon.vn と入力</span><span>DNS が IP を調べる</span><span>その IP に request を送る</span><span>Server が Web ページを返す</span></div>
<p>AWS では、DNS サービスの名前は <b>Amazon Route 53</b> です。この先のレッスンで何度も登場します。</p>

<h3>Port: どのドアが何の用件か</h3>
<p>1 台のサーバーは、同時に複数のサービスを動かすことができます。それらを区別するために、各サービスはそれぞれ別の <b>port</b>（ポート）で「待ち受け」ます。ポートは 1 つの番号です。よく知られたポートをいくつか挙げます。</p>
<ul>
<li><b>80</b>: HTTP。暗号化されていない Web。</li>
<li><b>443</b>: HTTPS。暗号化された Web（ブラウザに鍵マークが表示されます）。</li>
<li><b>22</b>: SSH。Linux サーバーをリモートで管理するために使います。</li>
</ul>
<p>IP が建物の住所だとすれば、port は部屋番号です。まだ全部を覚える必要はありません。後で firewall を学ぶために、この考え方だけ理解しておけば十分です。</p>

<h3>Bandwidth と latency: 道の広さと道の遠さ</h3>
<p>この 2 つの概念は、とてもよく混同されます。</p>
<ul>
<li><b>Bandwidth</b>（帯域幅）: 1 秒間に転送できるデータの量。道路の<i>幅</i>のようなものです。車線が多い道ほど、同時に多くの車が走れます。</li>
<li><b>Latency</b>（レイテンシー、遅延）: データのパケット 1 つが client から server まで行って戻ってくるのにかかる時間。道のりの<i>長さ</i>のようなものです。道が広くても、遠ければ時間がかかります。</li>
</ul>
<p>Latency は<b>距離</b>に大きく左右されます。光ファイバーの中を進む信号は高速ですが、瞬時に届くわけではありません。サーバーが米国にあると、東京のユーザーは、サーバーがシンガポールや日本国内にある場合よりも遅く感じます。</p>
<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>BanhNgon が日本に支店を開いたとき、東京のお客さんから Web サイトの読み込みが遅いという声が上がりました。ミンさんが調べたところ、サーバーはシンガポールにあり、東京からはかなり離れていました。帯域幅は足りており、問題は latency でした。解決策は、日本の近くにリソースを追加で配置するか、ケーキの写真のコピーをユーザーの近くにあらかじめ保存しておくサービスを使うことです（後で学ぶ Amazon CloudFront です）。</p></div>
<table>
<tr><th>概念</th><th>意味</th><th>たとえ</th></tr>
<tr><td>Bandwidth</td><td>1 秒あたりにどれだけのデータを転送できるか</td><td>道路に車線がいくつあるか</td></tr>
<tr><td>Latency</td><td>データが行って戻るのにどれだけ時間がかかるか</td><td>道のりがどれだけ長いか</td></tr>
<tr><td>Throughput</td><td>実際に転送できたデータの量</td><td>実際に通過した車の台数</td></tr>
</table>

<h3>Public ネットワーク、private ネットワーク、firewall</h3>
<p><b>Public network</b>（パブリックネットワーク）とはインターネットのことで、誰でもアクセスできます。<b>Private network</b>（プライベートネットワーク）は内部ネットワークで、オフィス内の Wi-Fi のように、中にあるマシン同士だけが通信できます。</p>
<p>安全のための原則は、お客さんに見せる<i>必要がある</i>もの（Web ページ）だけをインターネットに公開し、機密性の高いもの（注文を保存しているデータベース）はプライベートネットワークの中に隠すことです。</p>
<p><b>Firewall</b>（ファイアウォール）は、出入りするトラフィックをルールに従って検査する「門番」です。どの IP、どの port を許可し、何をブロックするかを決めます。例: 「port 443 には全員を通すが、port 22 はミンさんのマシンだけに許可する」。</p>
<div class="box idea"><b>🧠 かんたんに言うと</b><p>ベーカリーには、誰にでも開かれた販売カウンター（public）と、従業員だけが入れる奥の倉庫（private）があります。Firewall は入口に立つ警備員で、誰がどのドアに入れるかのリストを持っています。</p></div>
<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>ミンさんはシステムを設計し直しました。Web サーバーはインターネットからお客さんを受け入れられるネットワーク部分に置き、port 443 だけを開けます。注文情報を保存する database はプライベートなネットワーク部分に置き、インターネットから直接たどり着く経路はありません。接続を許可されているのは Web サーバーだけです。悪意のある人が database を読もうとすれば、その前に何重もの「ドア」を突破しなければなりません。</p></div>
<p>AWS では、あなた専用のプライベートネットワークを <b>Amazon VPC</b>（Virtual Private Cloud）と呼び、firewall には <b>security group</b> と <b>network ACL</b> の 2 種類があります。詳しくは Domain 2 と 3 で学びます。</p>
<div class="box exam"><b>🎯 試験によく出る</b><ul>
<li>"Domain Name System (DNS) web service" → <b>Amazon Route 53</b>。</li>
<li>"reduce latency for users around the world", "cache content at edge locations" → <b>Amazon CloudFront</b>。</li>
<li>"choose a Region close to users" → <b>latency</b> を下げるため。</li>
<li>"stateless firewall at the subnet level" → <b>Network ACL</b>。サーバー（インスタンス）レベルの firewall → <b>Security group</b>。</li>
<li>"private connection that does not go over the public internet" → <b>AWS Direct Connect</b>。</li>
</ul></div>
<div class="box trap"><b>⚠️ よくあるひっかけ</b><p>問題が「遅延を減らす」（latency）ことを尋ねている場合、正解はたいてい<i>ユーザーの近くに置く</i>こと（近い Region を選ぶ、edge location、CloudFront）に関係しており、「帯域幅を増やす」や「より強力なサーバーを使う」ではありません。</p></div>
`,summary:["Client が request を送り、server が response を返す。これがすべての Web ページの動く仕組みです。","IP address はマシンの数字の住所、domain name は覚えやすい名前、DNS は名前を IP に変換します（AWS では Route 53）。","Port は同じサーバー上のサービスを区別します: 80（HTTP）、443（HTTPS）、22（SSH）。","Bandwidth は道の広さ、latency は往復にかかる時間です。距離が離れると latency が増えます。","Private ネットワークは機密性の高いリソースを隠し、firewall はルールに従ってトラフィックを許可またはブロックします。"],terms:[["Client","クライアント"],["Request / Response","リクエスト（要求）/ レスポンス（応答）"],["IP address","IP アドレス"],["Domain name","ドメイン名"],["DNS (Domain Name System)","ドメイン名を IP アドレスに変換する仕組み"],["Port","ポート"],["Bandwidth","帯域幅"],["Latency","レイテンシー（遅延）"],["Public network","パブリックネットワーク"],["Private network","プライベートネットワーク"],["Firewall","ファイアウォール"],["Edge location","エッジロケーション（ユーザーに近い拠点）"]]};
L.course["0-3"]={title:"Web アプリケーションの構成要素: コード、データベース、ファイル",goals:["アプリケーションの frontend と backend を区別する","database とは何か、relational と NoSQL の違いを理解する","ファイルを別に保存する理由、バックアップ（backup）と監視（monitoring）が必要な理由を知る","scaling と API を概念レベルで理解する"],html:`
<h3>Frontend と backend</h3>
<p>Web アプリケーションは通常、2 つの部分からできています。</p>
<ul>
<li><b>Frontend</b>（フロントエンド、画面の部分）: ユーザーが目にして操作するもの。「ケーキを注文」ボタン、商品の写真、カートなどです。ブラウザやスマートフォンのアプリ上で動きます。</li>
<li><b>Backend</b>（バックエンド、裏側の処理部分）: サーバー上で動きます。ログインの確認、代金の計算、注文の保存、確認メールの送信を行います。</li>
</ul>
<div class="box idea"><b>🧠 かんたんに言うと</b><p>Frontend は販売カウンターとケーキを並べたショーケースです。Backend は奥の厨房と帳簿です。お客さんに見えるのはカウンターだけですが、厨房がなければ売るものは何もありません。</p></div>

<h3>Database: すべてを記憶する場所</h3>
<p><b>Database</b>（データベース）は、顧客、商品、注文といった構造化されたデータを、すばやく検索・更新できるように保存する場所です。主に 2 つの種類があります。</p>
<p><b>Relational database</b>（リレーショナルデータベース）は、データを Excel のような<b>テーブル（表）</b>として保存し、列は固定です。テーブル同士は関連付けられており、たとえば「注文」テーブルが「顧客」テーブルを参照します。クエリには <b>SQL</b> という言語を使います。例: MySQL、PostgreSQL。</p>
<p><b>NoSQL database</b> は、データをより柔軟に保存します。固定のテーブルは不要で、たいていは「キー → 値」形式やドキュメント形式です。非常に高速で、膨大なアクセス量に合わせて拡張しやすい一方、複数のテーブルを結合するようなクエリは得意ではありません。</p>
<table>
<tr><th></th><th>Relational (SQL)</th><th>NoSQL</th></tr>
<tr><td>保存の仕方</td><td>テーブル、固定の列</td><td>柔軟: key-value、document…</td></tr>
<tr><td>得意なこと</td><td>データの関連付け、厳密なトランザクション（注文、会計）</td><td>高速、超大規模、構造が頻繁に変わるデータ</td></tr>
<tr><td>AWS では</td><td>Amazon RDS、Amazon Aurora</td><td>Amazon DynamoDB</td></tr>
</table>
<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>BanhNgon の注文には絶対的な正確さが必要です。誰が注文したか、どのケーキか、いくらか、支払い済みかどうか。ミンさんはこれらを relational database に保存します。一方、テトの時期にサイトを見て回っている何千人ものお客さんの一時的なカートは、非常に高速な読み書きが必要なので、ミンさんは NoSQL の利用を検討しています。</p></div>

<h3>ファイル、画像、backup</h3>
<p>ケーキの写真、広告動画、PDF の請求書は<b>ファイル</b>です。ファイルを database に直接保存するのは、たいてい効率的ではありません。ファイルは専用のストレージに置き、database には「この写真がどこにあるか」だけを記録します。AWS で最も一般的なファイルの保存先は <b>Amazon S3</b> です。</p>
<p><b>Backup</b>（バックアップ）とは、ハードディスクの故障、うっかり削除、ランサムウェアの被害といった障害が起きたときに復旧できるよう、データのコピーを作成することです。良い backup は、<i>自動的</i>に、<i>定期的</i>に行われ、元のデータとは<i>別の場所</i>に保存されていなければなりません。</p>
<div class="box idea"><b>🧠 かんたんに言うと</b><p>Backup は、毎晩ツケの帳面を写真に撮って、家族に送って預かってもらうようなものです。万一帳面が濡れてしまっても、コピーが残っています。</p></div>

<h3>Scaling: お客さんが増えたら大きくなる</h3>
<p><b>Scaling</b>（スケーリング、規模の拡張）とは、ユーザーが増えたときにシステムの収容力を上げることです。方法は 2 つあります。</p>
<ul>
<li><b>Scale up / vertical scaling</b>（垂直スケーリング）: より強力なマシンに取り替えます。CPU を増やし、RAM を増やします。単純ですが限界があり、アップグレードのためにマシンを停止しなければならないことがよくあります。</li>
<li><b>Scale out / horizontal scaling</b>（水平スケーリング）: 並列で動くマシンを増やし、分担してお客さんに対応します。これはクラウドが非常に得意とするやり方です。</li>
</ul>
<p>逆に、お客さんが少ないときは <b>scale in</b>（マシンを減らす）または <b>scale down</b>（より小さいマシンを使う）で節約します。</p>
<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>テトの時期は、普段の 10 倍のお客さんが訪れます。高価な「スーパーマシン」を 1 台買う（scale up）代わりに、ミンさんは普段は 1 台で動かし、テトの時期には自動的に 5 台まで増やします（scale out）。その手前にはロードバランサーを置き、お客さんを各マシンに均等に振り分けます。</p></div>

<h3>API: ソフトウェア同士の連絡窓口</h3>
<p><b>API</b>（Application Programming Interface、アプリケーションプログラミングインターフェイス）は、あるソフトウェアが別のソフトウェアと明確な取り決めに従って「会話」するための方法です。たとえば、ケーキ注文アプリが backend の「注文を作成する」API を呼び出したり、backend が決済ゲートウェイの API を呼び出したりします。</p>
<div class="box idea"><b>🧠 かんたんに言うと</b><p>API はレストランのメニューのようなものです。注文できる料理と注文の仕方が並んでいます。あなたは厨房には入らず、メニューに従って注文し、結果を受け取るだけです。</p></div>
<p>試験にとって重要なこと: <b>AWS 上のすべての操作は、1 回の API 呼び出しです</b>。Web 画面でクリックしても、コマンドラインを使っても同じです。そのため AWS には、誰が何をしたかを把握できるよう、すべての API 呼び出しを記録するサービス（AWS CloudTrail）があります。</p>

<h3>Logs と monitoring: システムが元気か不調かを知る</h3>
<p><b>Log</b>（ログ）は、出来事を記録した行のことです。「10:05 顧客 A がログイン」「10:06 database 接続エラー」といったものです。<b>Monitoring</b>（モニタリング、監視）は、CPU、メモリ、request 数などの数値を追跡することで、何か異常があれば <b>alarm</b>（アラーム）で知らせます。</p>
<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>ミンさんはアラームを設定しました。サーバーの CPU が 5 分間連続で 80% を超えた場合や、注文の保存時にエラーが多すぎる場合、彼のスマートフォンにメッセージが届きます。障害が起きたときは、log を開いて、エラーがいつから、何が原因で始まったのかを確認します。</p></div>
<p>Monitoring がなければ、お客さんから苦情の電話が来て初めてシステムの故障を知ることになります。Monitoring があれば、先に気づいて早めに対処できます。AWS の主要な監視サービスは <b>Amazon CloudWatch</b> です。</p>
<div class="box exam"><b>🎯 試験によく出る</b><ul>
<li>"relational database", "MySQL / PostgreSQL" → <b>Amazon RDS</b> または <b>Amazon Aurora</b>。</li>
<li>"NoSQL", "key-value", "single-digit millisecond" → <b>Amazon DynamoDB</b>。</li>
<li>"store images/files/objects" → <b>Amazon S3</b>。</li>
<li>"centrally manage backups" → <b>AWS Backup</b>。</li>
<li>"records API calls", "who did what and when" → <b>AWS CloudTrail</b>。"metrics, alarms, logs" → <b>Amazon CloudWatch</b>。</li>
<li>"create, publish, secure APIs" → <b>Amazon API Gateway</b>。</li>
</ul></div>
<div class="box trap"><b>⚠️ よくあるひっかけ</b><p>CloudTrail と CloudWatch は名前がよく似ています。覚え方: Trail =「足跡」（誰が何をしたか、audit（監査））。Watch =「見守る」（パフォーマンス、CPU、アラーム）。</p></div>
`,summary:["Frontend はユーザーに見える画面、backend はサーバー上で動く処理の部分です。","Relational database はテーブルで保存し、SQL を使います（RDS、Aurora）。NoSQL は柔軟で、大規模でも非常に高速です（DynamoDB）。","ファイルや画像は専用のストレージ（S3）に置くべきです。backup は自動で、定期的に、別の場所に保存します。","Scale up = より強力なマシン、scale out = マシンの台数を増やす。クラウドは scale out/in が得意です。","API はソフトウェア同士が呼び出し合う方法です。AWS 上のすべての操作は 1 回の API 呼び出しです。","Logs と monitoring は障害の早期発見に役立ちます（CloudWatch）。CloudTrail は誰が何をしたかを記録します。"],terms:[["Frontend","フロントエンド（画面の部分）"],["Backend","バックエンド（サーバー側の処理部分）"],["Database","データベース"],["Relational database","リレーショナルデータベース"],["NoSQL","非リレーショナルデータベース"],["Backup","バックアップ"],["Vertical scaling (scale up)","垂直スケーリング（スケールアップ）"],["Horizontal scaling (scale out)","水平スケーリング（スケールアウト）"],["API","アプリケーションプログラミングインターフェイス"],["Log","ログ（記録）"],["Monitoring","モニタリング（監視）"],["Alarm","アラーム（警告通知）"]]};
L.course["0-4"]={title:"AWS に慣れる & 試験問題の読み方",goals:["AWS account、AWS Management Console、Region selector とは何かを知る","自分でハンズオンをするときに、予期しない請求を避ける方法を理解する","CLF-C02 試験の構成と採点方法をしっかり押さえる","英語の問題文を読み、誤った選択肢を消去するための戦略を持つ"],html:`
<h3>AWS account と Console</h3>
<p>AWS を使うには、<b>AWS account</b>（AWS アカウント）が必要です。このアカウントは、あなたが作成するすべてのリソースの「入れ物」であると同時に、課金の単位でもあります。アカウント内で発生したすべての費用は、そのアカウントの請求書に計上されます。</p>
<p>最初にメールアドレスとパスワードでアカウントを作成した人を <b>root user</b>（ルートユーザー）と呼び、すべての権限を持ちます。権限がそれほど大きいため、root user には多要素認証（MFA）を有効にし、日常の作業には使わないのが原則です。詳しくは Domain 2 で学びます。</p>
<p>AWS を操作する最も簡単な方法は <b>AWS Management Console</b>（Web の管理画面）です。ブラウザでログインし、サービスを探し、ボタンを押してリソースを作成します。このほかにコマンドライン（AWS CLI）や開発者向けのライブラリ群（SDK）もあり、いずれも裏側では API を呼び出しています。</p>

<h3>Region selector と、レゴブロックのようなサービス</h3>
<p>AWS は世界各地に data center を持っており、それらは <b>Region</b>（リージョン、地理的な地域）に分かれています。たとえば Singapore、Tokyo、Frankfurt です。Console の右上には Region を選ぶ欄があります。あなたが作成するリソースのほとんどは、そのとき選択されている Region に置かれます。</p>
<div class="box trap"><b>⚠️ よくあるひっかけ</b><p>初心者はよくリソースを「なくし」ます。Tokyo でマシンを作成し、翌日 Console を開くと Singapore が選択されているので見当たらず、削除されたと思い込みます。しかしマシンは動き続け、料金もかかり続けています。リソースを探したり作成したりする前に、必ず選択中の Region を確認しましょう。</p></div>
<p>実際のシステムのために Region を選ぶとき、よく挙げられる要素が 4 つあります。</p>
<ul>
<li><b>Compliance / data sovereignty</b>（コンプライアンス、データ主権）: データを特定の国・地域内に置くことが法律で義務付けられていないか？この要素は通常、最初に検討されます。</li>
<li><b>Proximity</b>（ユーザーへの近さ）: 顧客に近いほど、latency は低くなります。</li>
<li><b>Service availability</b>: すべての Region ですべてのサービスが使えるわけではありません。特に新しいサービスはそうです。</li>
<li><b>Pricing</b>: 同じサービスでも、Region によって料金が異なることがあります。</li>
</ul>
<p>AWS には 200 を超えるサービスがあります。慌てないでください。各サービスを、1 つの仕事だけをこなす<b>レゴ</b>ブロックだと考えましょう。仮想マシンを動かすサービス、ファイルを保存するサービス、database のサービス、DNS のサービス…。あなたはブロックを組み合わせてアプリケーションを作ります。試験で主に問われるのは「この仕事にはどのレゴブロックを使うか？」です。</p>
<div class="box idea"><b>🧠 かんたんに言うと</b><p>スーパーに行くとき、すべての商品を知っている必要はありません。野菜売り場がどこで、肉売り場がどこかを知っていれば十分です。この試験のために AWS を学ぶのも同じで、どのサービスがどのニーズを解決するかを知っていれば足ります。</p></div>

<h3>安全にハンズオンをする: Free Tier とコストのアラート</h3>
<p>AWS には新規アカウント向けの <b>Free Tier</b>（無料利用枠）がありますが、制限と条件があり、その条件は時期によって変わってきました。<b>2025 年 7 月 15 日</b>以降に作成したアカウントでは、登録時に <b>Free plan</b> または <b>Paid plan</b> を選びます。どちらも <b>100 USD のクレジット</b>を受け取り、いくつかのアクティビティを行うことでさらに<b>最大 100 USD</b> を獲得できます。Free plan は料金が一切発生しませんが、期間は<b>最大 6 か月</b>（またはクレジットを使い切るまで）です。詳細と予期しない請求を避ける方法は、ハンズオンのレッスン <b>5-1</b> を参照してください。ハンズオンの前に公式の Free Tier ページを読み、「何でも無料」と決めつけないようにしましょう。</p>
<p>予期しない請求を受け取らないための原則をいくつか挙げます。</p>
<ul>
<li>アカウントを作成したらすぐに<b>コストのアラート</b>を設定します。たとえば、コストが少額のしきい値を超えたらメールで知らせるようにします。AWS にはそのためのサービス <b>AWS Budgets</b> があります。</li>
<li>ハンズオンが終わったら<b>リソースを削除</b>します（仮想マシン、database、ディスク）。「停止」しただけでは、ストレージの料金がかかり続けることがあります。</li>
<li>Billing ページを定期的に確認し、<i>すべての Region</i> を確認することも忘れないでください。</li>
</ul>
<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>初めて AWS を試したとき、ミンさんは勉強用に database を 1 つ作成し、そのまま忘れてしまいました。月末の請求は少額でしたが、望んだものではありませんでした。それ以来ミンさんは、コストが自分で決めた金額を超えたらメールで知らせる budget をすぐに設定し、ハンズオンのたびに後片付けをする習慣をつけました。</p></div>

<h3>CLF-C02 試験の構成</h3>
<table>
<tr><th>項目</th><th>詳細</th></tr>
<tr><td>問題数</td><td>65 問: 採点対象 50 問 + 採点対象外 15 問（AWS が新しい問題を試すためのもので、どの問題かは分かりません）</td></tr>
<tr><td>Multiple choice</td><td>4 つの選択肢から正解を 1 つ選ぶ</td></tr>
<tr><td>Multiple response</td><td>5 つ以上の選択肢から正解を 2 つ以上選ぶ（問題文に "Choose TWO" または "Choose THREE" と書かれています）</td></tr>
<tr><td>試験時間</td><td>90 分</td></tr>
<tr><td>スコア</td><td>100〜1000 のスケールドスコアで、700 以上で合格</td></tr>
<tr><td>誤答で減点される？</td><td>されません。空欄も不正解として扱われるので、<b>絶対に空欄にしない</b>こと</td></tr>
</table>
<p>4 つの domain と出題比率: Cloud Concepts 24%、Security and Compliance 30%、Cloud Technology and Services 34%、Billing, Pricing, and Support 12%。</p>
<p>英語が母語でない場合は、<b>ESL +30</b> を申請できます。試験時間が 30 分延長されます。試験を予約する<i>前に</i>、AWS Certification の受験アカウントでリクエストを送る必要があります。リクエストは、その後の予約に適用されます。</p>

<h3>英語の問題文を読む戦略</h3>
<p>CLF-C02 の問題は、たいてい短いシナリオの後に "Which AWS service…?" と尋ねる形式です。次の 4 つのステップで解きましょう。</p>
<ol>
<li><b>最後の設問を先に読む</b>: 問われているのはサービスか、メリットか、それとも誰の責任か？</li>
<li>決め手となる<b>キーワードに下線を引く</b>。特に比較を表す語に注目します: <b>MOST cost-effective</b>（要件を満たしつつ最も安い）、<b>LEAST operational overhead</b>（運用の手間が最も少ない。たいていは managed/serverless のサービス）、<b>MOST secure</b>、<b>fastest</b>、<b>minimal changes</b>。</li>
<li>明らかに誤っている選択肢を<b>消去する</b>: 関係のないサービスや、実現はできるがキーワードに反するもの（例: 問題が "least operational overhead" を求めているのに、仮想マシンに自分でインストールする）。</li>
<li>残った選択肢の中から<b>選ぶ</b>。自信がなければ見直し用にフラグ（flag）を付けますが、それでもいったん 1 つ選んでおきます。</li>
</ol>
<p>時間について: 90 分で 65 問ということは、1 問あたり約 1 分 20 秒です。難しい 1 問にはまり込まないでください。いったん選び、フラグを付けて先へ進み、最後に戻ります。このサイトでは、問題文と選択肢は本番と同じ英語で、解説は日本語で表示されます。まず英語の問題文を自力で読む練習をし、本当に行き詰まったときだけ日本語の解説に頼りましょう。試験当日、あなたの手元にあるのは英語だけだからです。</p>
<div class="box exam"><b>🎯 試験によく出る</b><ul>
<li>"MOST cost-effective" → <i>要件を満たしたうえで</i>最も安い案を選びます。絶対的に最も安いものではありません。</li>
<li>"LEAST operational overhead" / "without managing servers" → <b>managed</b> または <b>serverless</b> のサービスを優先します。</li>
<li>"Choose TWO" / "Choose THREE" → 指定された数だけ選ぶ必要があります。1 つでも不足したり間違えたりすると、その問題全体が得点になりません。</li>
<li>"alert when costs exceed a threshold" → <b>AWS Budgets</b>。</li>
<li>"factors when choosing a Region" → <b>data sovereignty/compliance</b>、<b>proximity to customers (latency)</b>、利用できるサービス、料金。</li>
</ul></div>
<div class="box trap"><b>⚠️ よくあるひっかけ</b><p>いちばん「立派」に聞こえる選択肢が正解とは限りません。問題が最も安い方法を尋ねているなら、複数の Region や何層もの保護を使うソリューションは、要件に対して高すぎるため、たいてい不正解です。</p></div>
`,summary:["AWS account はリソースの入れ物であり、課金の単位です。root user はすべての権限を持つため、MFA で保護する必要があります。","Console は Web の画面です。選択中の Region を必ず確認しましょう。Region は、コンプライアンス/データ主権、ユーザーへの近さ、利用できるサービス、料金で選びます。","AWS の各サービスはレゴブロックのようなもの。試験では、どのニーズにどのサービスを使うかが問われます。","コストのアラート（AWS Budgets）を設定し、ハンズオンの後はリソースを削除します。Free Tier には制限があります。","試験は 65 問（採点対象 50 問）、90 分、スコアは 100〜1000、合格は 700、誤答による減点はありません。","キーワード（MOST cost-effective、LEAST operational overhead）を見つけ、消去してから選びます。ESL +30 は試験を予約する前に申請します。"],terms:[["AWS account","AWS アカウント"],["Root user","ルートユーザー"],["AWS Management Console","AWS の Web 管理画面（マネジメントコンソール）"],["Region","リージョン（地理的な地域）"],["Free Tier","無料利用枠"],["Budget / billing alarm","予算 / 請求アラーム"],["Multiple choice","正解を 1 つ選ぶ形式"],["Multiple response","正解を複数選ぶ形式"],["Scaled score","スケールドスコア（換算後の得点）"],["Cost-effective","費用対効果が高い（コストを抑えられる）"],["Operational overhead","運用の手間（運用上のオーバーヘッド）"],["Managed service","マネージドサービス（AWS が管理するサービス）"]]};
L.course["1-1"]={title:"Cloud computing とは: IaaS、PaaS、SaaS とデプロイモデル",goals:["cloud computing を 3 つのポイントで定義する: on-demand、pay-as-you-go、インターネット経由","IaaS、PaaS、SaaS を区別し、誰がどの部分を管理するかを知る","3 つのデプロイモデル（cloud、hybrid、on-premises）を区別する","問題文のキーワードに気づき、正しいモデルを選ぶ"],html:`
<h3>Cloud computing をひと言で</h3>
<p><b>Cloud computing</b>（クラウドコンピューティング）とは、IT リソース（サーバー、ストレージ、database、ソフトウェア…）を、<b>インターネット</b>経由で<b>オンデマンド</b>に、<b>使った分だけ支払う</b>料金で提供することです。覚えておくべきフレーズは 3 つです。</p>
<ul>
<li><b>On-demand</b>（オンデマンド）: 必要なときにすぐ手に入り、発注して待つ必要がありません。</li>
<li><b>Pay-as-you-go</b>（従量課金）: 前払いもなく、長期契約の義務もありません。</li>
<li><b>Over the internet</b>（インターネット経由）: どこからでもアクセスできます。</li>
</ul>
<div class="box idea"><b>🧠 かんたんに言うと</b><p>電気料金と同じです。あなたは発電所を建てず、プラグを差し込むだけで電気が使え、月末に使った電力量に応じて支払います。</p></div>

<h3>3 つのサービスモデル: IaaS、PaaS、SaaS</h3>
<p>クラウドには、いくつもの「サービスのレベル」があります。上に行くほどプロバイダーが担当する範囲が広がり、あなたが担当する範囲は減ります。ピザを食べる場面で考えてみましょう。</p>
<ul>
<li><b>On-premises</b>: 自宅で最初から最後まで自分でピザを作ります。オーブン、生地、具材を買い、自分で焼き、自分で片付けます。</li>
<li><b>IaaS</b>（Infrastructure as a Service、サービスとしてのインフラストラクチャ）: オーブンが備え付けられたキッチンを借ります。生地をこね、具材を選び、焼くのは引き続きあなたです。</li>
<li><b>PaaS</b>（Platform as a Service、サービスとしてのプラットフォーム）: 宅配ピザを注文します。あなたが用意するのはテーブルと椅子、飲み物だけです。</li>
<li><b>SaaS</b>（Software as a Service、サービスとしてのソフトウェア）: レストランに食べに行きます。すべてが用意されていて、あなたは食べるだけです。</li>
</ul>
<table>
<tr><th>モデル</th><th>あなたが管理するもの</th><th>プロバイダーが管理するもの</th><th>例</th></tr>
<tr><td><b>IaaS</b></td><td>オペレーティングシステム、ソフトウェア、アプリケーション、データ</td><td>ハードウェア、ネットワーク、data center、仮想化</td><td>Amazon EC2（仮想マシン）</td></tr>
<tr><td><b>PaaS</b></td><td>アプリケーションのコードとデータ</td><td>さらにオペレーティングシステム、実行環境、デプロイまで</td><td>AWS Elastic Beanstalk</td></tr>
<tr><td><b>SaaS</b></td><td>ソフトウェアを使うだけ。アカウントの設定と入力するデータ</td><td>ほぼすべて</td><td>Gmail、オンラインの CRM ソフトウェア</td></tr>
</table>
<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>Web サイトを AWS に移すにあたり、ミンさんには 3 つの選択肢があります。</p><p><b>IaaS</b>: EC2 の仮想マシンを借り、オペレーティングシステムと Web サーバーを自分でインストールし、セキュリティパッチも自分で適用します。最も柔軟ですが、作業も最も多くなります。</p><p><b>PaaS</b>: Elastic Beanstalk を使い、コードをアップロードするだけ。サーバー、負荷分散、スケーリングは AWS が面倒を見ます。</p><p><b>SaaS</b>: ランさんはオンラインの会計ソフトと法人向けメールを使っています。店の誰も、何もインストールする必要がありません。</p></div>

<h3>3 つのデプロイモデル: cloud、hybrid、on-premises</h3>
<p>「サービスのレベル」のほかに、試験では <b>deployment model</b>（デプロイモデル）、つまりあなたのシステムが<i>どこにあるか</i>も問われます。</p>
<ul>
<li><b>Cloud</b>（cloud-native、all-in cloud とも呼ばれます）: アプリケーション全体がクラウド上で動きます。既存のアプリケーションを移行する場合もあれば、クラウド上でまったく新しく構築する場合もあります。</li>
<li><b>Hybrid</b>（ハイブリッド）: on-premises のインフラとクラウドを組み合わせ、両者を相互に接続します。企業が段階的に移行している場合や、どうしても自社内に残さなければならないシステムがある場合によく見られます。</li>
<li><b>On-premises</b>（private cloud とも呼ばれます）: リソースが自社の data center 内で動きます。仮想化技術を使って、クラウドに近い使い勝手を実現することもできます。</li>
</ul>
<table>
<tr><th>モデル</th><th>リソースがある場所</th><th>問題文のキーワード</th></tr>
<tr><td>Cloud</td><td>すべて AWS 上</td><td>"all parts of the application run in the cloud"</td></tr>
<tr><td>Hybrid</td><td>一部は自社内、一部はクラウド上で、接続されている</td><td>"connect on-premises infrastructure with cloud resources"</td></tr>
<tr><td>On-premises / private cloud</td><td>自社の data center</td><td>"own data center", "virtualization"</td></tr>
</table>
<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>移行期間中、新しい Web サイトは AWS 上で動いていますが、カウンターのレジ用パソコンと古い在庫管理ソフトはまだ店にあります。両者は注文を同期するために接続されています。これが <b>hybrid</b> モデルです。1 年後、在庫管理もクラウドに移ると、BanhNgon は <b>cloud</b> モデルになります。</p></div>

<h3>どのモデルを選ぶか: コントロールと手間のトレードオフ</h3>
<p>あらゆる場合に「最良」のモデルはありません。考えるべき問いは、どれだけ<b>コントロール</b>したいのか、そしてどれだけの<b>運用の手間</b>をかけてもよいのか、です。</p>
<ul>
<li>特殊なソフトウェアをインストールしたい、オペレーティングシステムを深くチューニングしたい、あるいは古いサーバーを丸ごと移したい: <b>IaaS</b> を選びます。</li>
<li>チームが小さく、コードを書くことだけに集中したい、サーバーのパッチ適用に煩わされたくない: <b>PaaS</b> または managed なサービスを選びます。</li>
<li>一般的なニーズ（メール、会計、顧客管理）で、すでに出来合いのソフトウェアがある: <b>SaaS</b> を選べば、自分で構築せずに済みます。</li>
</ul>
<p>実際には、1 つの企業がさまざまなニーズのために <i>3 つすべて</i>を同時に使うのが普通です。大切なのは責任の境界を理解することです。どの部分をあなたが担当し、どの部分をプロバイダーが担当するのか。この考え方は、Domain 2 のレッスン <b>Shared Responsibility Model</b>（責任共有モデル）で再び登場します。サービスが managed であるほど、AWS が引き受ける作業が増えます。</p>
<div class="box idea"><b>🧠 かんたんに言うと</b><p>住まいを借りるのも同じです。自分の土地に自分で家を建てるのが on-premises。<b>家具なしの部屋</b>を借りる場合、壁や電気・水道は備わっていて、家具は自分で買って自分で配置します（IaaS）。<b>家具付きの部屋</b>を借りる場合は、スーツケースを持ち込むだけで住めます（PaaS）。<b>ホテル</b>に泊まる場合は、部屋の掃除も食事の用意もしてもらえて、あなたは利用するだけです（SaaS）。上のピザの話と同じで、便利になるほど自由に手を加えられる範囲は狭くなります。</p></div>

<h3>試験での問われ方</h3>
<div class="box exam"><b>🎯 試験によく出る</b><ul>
<li>"on-demand delivery of IT resources over the internet with pay-as-you-go pricing" → <b>cloud computing</b> の定義。</li>
<li>"example of IaaS" / "full control over the operating system" → <b>Amazon EC2</b>。</li>
<li>"upload code and AWS handles deployment, capacity, load balancing" → <b>AWS Elastic Beanstalk</b>（PaaS）。</li>
<li>"complete product run and managed by the provider" → <b>SaaS</b>。</li>
<li>"connects on-premises infrastructure with the cloud" → <b>Hybrid</b> デプロイ。</li>
</ul></div>
<div class="box trap"><b>⚠️ よくあるひっかけ</b><p>"Hybrid" は<i>デプロイ</i>モデル（どこにあるか）で、IaaS/PaaS/SaaS は<i>サービス</i>モデル（どこまで自分で管理するか）です。この 2 つのグループを混ぜないでください。もう 1 点: IaaS では、オペレーティングシステムのパッチ適用は引き続き自分で行う必要があります。これが、EC2 が IaaS に分類される理由です。</p></div>
`,summary:["Cloud computing = インターネット経由で、オンデマンドに、使った分だけ支払う IT リソース。","IaaS: インフラを借り、OS から上は自分で面倒を見る（EC2）。PaaS: コードだけに集中する（Elastic Beanstalk）。SaaS: 完成したソフトウェアを使う。","IaaS から SaaS に向かうほど、プロバイダーが担当する範囲が広がり、あなたがコントロールできる範囲は狭くなります。","Deployment model: cloud（すべてクラウド上）、hybrid（on-prem とクラウドを接続）、on-premises/private cloud。","サービスモデルとデプロイモデルを混同しないこと。"],terms:[["Cloud computing","クラウドコンピューティング"],["On-demand","オンデマンド（必要なときに必要なだけ）"],["Pay-as-you-go","従量課金（使った分だけ支払う）"],["IaaS (Infrastructure as a Service)","サービスとしてのインフラストラクチャ"],["PaaS (Platform as a Service)","サービスとしてのプラットフォーム"],["SaaS (Software as a Service)","サービスとしてのソフトウェア"],["Deployment model","デプロイモデル（導入形態）"],["Hybrid","ハイブリッド（on-prem とクラウドの組み合わせ）"],["Private cloud","プライベートクラウド"],["Virtualization","仮想化"],["Virtual machine","仮想マシン"]]};
})();
(function(){var I=window.CLF_I18N=window.CLF_I18N||{};var L=I.ja=I.ja||{};['q','course','lessons','glossary','services','domains','ui'].forEach(function(k){L[k]=L[k]||{};});
L.course["1-2"]={title:"AWS クラウドの 6 つのメリットと HA・elasticity・agility の概念",goals:["クラウドの 6 つのメリット (six advantages) を例とともに覚えて理解する","scalability と elasticity を区別する","high availability、fault tolerance、durability を区別する","試験で agility が何を意味するかを理解する"],html:`
<h3>クラウドの 6 つのメリット</h3>
<p>AWS はクラウドのメリットを 6 つの英語の文にまとめています。試験ではこれらの文が<i>ほぼ原文のまま</i>選択肢として出るので、英語の名称で覚えましょう。</p>
<p><b>1. Trade fixed expense for variable expense</b>（固定費を変動費に切り替える）。どれだけ使うか分からないうちに、データセンターやサーバーにお金をかける必要がありません。使ったときだけ支払い、使用量が少なければ支払いも少なくなります。</p>
<p><b>2. Benefit from massive economies of scale</b>（圧倒的な規模の経済の恩恵を受ける）。AWS は非常に多くのお客様にサービスを提供し、ハードウェアを桁違いの量で調達するため、単位あたりのコストが低くなり、従量課金の料金も 1 社が自前で用意する場合より安くなります。</p>
<p><b>3. Stop guessing capacity</b>（キャパシティの推測をやめる）。サーバーが何台必要かを事前に予測する必要がありません。アクセスが多ければ増やし、少なければ減らすことが数分でできます。</p>
<p><b>4. Increase speed and agility</b>（スピードと俊敏性を高める）。新しいリソースが数週間ではなく数分で手に入るので、チームは素早く試し、素早く製品を出せます。</p>
<p><b>5. Stop spending money running and maintaining data centers</b>（データセンターの運用にお金をかけるのをやめる）。ラックの設置、電源、冷却を気にする必要がなく、お客様と製品に集中できます。</p>
<p><b>6. Go global in minutes</b>（数分で世界中に展開する）。わずかな操作でアプリケーションを世界中の複数の Region にデプロイでき、遠方のユーザーにも低レイテンシーで提供できます。</p>
<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>BanhNgon の物語で見る 6 つのメリット:</p><ul>
<li>30 万円のサーバーを買うのをやめ、使った分だけ月に数千円を支払う (1)。</li>
<li>AWS がサーバーを大量に調達しているので利用料金が安い (2)。</li>
<li>テト（旧正月）の繁忙期には自動でサーバーを増やし、テトが明けたら元に戻す (3)。</li>
<li>ミンさんは「デザインを選んで誕生日ケーキを注文する」機能を午後の半日で試し、うまくいかなければ削除する (4)。</li>
<li>倉庫に置いたサーバーの面倒を見る必要がなくなった (5)。</li>
<li>日本に出店するときは、Tokyo Region に数分でシステムを追加で立ち上げる (6)。</li>
</ul></div>

<h3>Scalability と elasticity</h3>
<p><b>Scalability</b>（スケーラビリティ）とは、リソースを追加することで、増える需要に応えられるようシステムが大きく<i>なれる</i>ことです。これは能力のことであり、手動でも計画的にでも行えます。</p>
<p><b>Elasticity</b>（伸縮性）とは、需要が増えたらシステムが<i>自動的に</i>リソースを増やし、需要が減ったら<i>自動的に減らす</i>ことです。実際の需要に追従するので無駄が出ません。</p>
<div class="box idea"><b>🧠 かんたんに言うと</b><p>Scalability は、必要なときにテーブルを追加できるレストランのようなものです。Elasticity はゴムウエストのズボンのようなもので、お腹が大きくなれば伸び、小さくなれば縮みます。自動で行われ、誰も調整する必要がありません。</p></div>
<p>AWS では、elasticity は通常 <b>Amazon EC2 Auto Scaling</b> で実現します。負荷に応じてサーバーを自動で追加・削減します。</p>

<h3>High availability、fault tolerance、durability</h3>
<p><b>High availability</b>（高可用性）とは、システムがほぼ常に稼働しており、停止時間 (downtime) がごくわずかであることです。一般的な方法は、複数の <b>Availability Zone</b>（AZ。1 つの Region 内にある、互いに分離されたデータセンター群）で稼働させることです。1 つの AZ に障害が起きても、別の AZ がサービスを続けます。</p>
<p>なぜ複数の AZ を使うと高可用性になるのでしょうか。各 AZ は<b>独立した電源、冷却設備、ネットワーク</b>を備えており、火災や停電が両方に影響しない程度に離れて配置されている一方、互いを低レイテンシーで接続できる程度には近いからです。さらに大きな単位では、<b>Region</b> はそれぞれ異なる地理的エリアにあり、<b>互いに分離</b>されています。</p>
<ul>
<li>ある Region に保存したデータが、別の Region へ<b>自動的にコピーされることはありません</b>。別の Region にコピーを持ちたい場合は、自分でレプリケーション機能を有効にする必要があります。</li>
<li>数百 km 離れた場所での <b>disaster recovery</b>（ディザスタリカバリ）が必要ですか？ 2 つ目のデータセンターを建てる必要はありません。別の Region に、必要に応じてリソースを構築し、使った分だけ支払えばよいのです。</li>
</ul>
<p><b>Fault tolerance</b>（耐障害性）はさらに上のレベルです。1 つのコンポーネントが故障しても、システムは<i>通常どおり</i>動き続け、ユーザーはほとんど気づきません。これを実現するには、重要なコンポーネントすべてに冗長性 (redundancy) が必要です。</p>
<p><b>Durability</b>（耐久性）とは、時間が経ってもデータが<i>失われない</i>ことです。例えば Amazon S3 は、保存されたデータについて 99.999999999%（イレブンナイン、9 が 11 個）の耐久性を実現するよう設計されています。注意: 耐久性と可用性は別物です。データに一時的にアクセスできなくても、データ自体は失われていないことがあります。</p>
<table>
<tr><th>概念</th><th>答える問い</th><th>ベーカリーでの例え</th></tr>
<tr><td>High availability</td><td>システムは常に営業していますか？</td><td>2 店舗あり、片方が閉まってもお客様はもう片方へ行ける</td></tr>
<tr><td>Fault tolerance</td><td>部品が 1 つ壊れても、何事もなかったように動き続けますか？</td><td>オーブン 2 台が並行して動いていて、1 台が壊れても必要な数を焼ける</td></tr>
<tr><td>Durability</td><td>データは失われませんか？</td><td>レシピを金庫にしまい、複数のコピーも持っている</td></tr>
<tr><td>Elasticity</td><td>需要に応じて自動で増減しますか？</td><td>テトの繁忙期には自動で職人を追加で呼び、暇なときは休んでもらう</td></tr>
</table>

<h3>Agility: 素早く、思い切って試す</h3>
<p>クラウドにおける <b>Agility</b>（俊敏性）とは、新しいリソースを手に入れるための時間とコストを減らし、それによって企業が<b>より多く実験でき</b>、<b>失敗のコストが安くなり</b>、<b>より早く市場に出せる</b>ことを意味します。実験が失敗したらリソースを削除するだけでよく、購入済みの機器に「縛られる」ことがありません。</p>
<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>ミンさんはケーキ選びを手伝うチャットボットを試したいと考えました。以前なら新しいサーバーを買う必要があり、丸 1 か月かかりました。AWS なら 1 日で立ち上げ、100 人のお客様に 1 週間試してもらえます。好評ならそのまま残し、不評なら削除すれば、かかる費用はごくわずかです。</p></div>

<h3>試験での問われ方</h3>
<div class="box exam"><b>🎯 試験でよく問われること</b><ul>
<li>"pay only for what you consume", "no upfront investment" → <b>Trade fixed expense for variable expense</b>。</li>
<li>"aggregated usage from many customers → lower prices" → <b>Benefit from massive economies of scale</b>。</li>
<li>"over-provisioning", "idle resources", "capacity planning" → <b>Stop guessing capacity</b>。</li>
<li>"deploy in multiple Regions around the world quickly" → <b>Go global in minutes</b>。</li>
<li>"experiment quickly", "reduce time to market" → <b>Increase speed and agility</b>。</li>
<li>"automatically acquire and release resources as demand changes" → <b>Elasticity</b>。</li>
<li>"multiple Availability Zones, keeps running if one AZ fails" → <b>High availability</b>。理由: 各 AZ が <b>independent power, cooling, and networking</b> を備えているため。</li>
<li>"keep adding capacity as the business grows, without redesign"（時間とともに増やしていく話で、縮小には触れない）→ <b>Scalability</b>。"grow and shrink automatically during a short sale" → <b>Elasticity</b>。</li>
<li>"metric that shows agility" → 新しい環境を用意する時間が<i>数週間から数分に</i>短縮されること。</li>
<li>"engineers spend time replacing disks, cooling, data center leases" → <b>Stop spending money running and maintaining data centers</b>。</li>
</ul></div>
<div class="box trap"><b>⚠️ よくあるひっかけ</b><p>Elasticity には必ず「増やすのも減らすのも、自動で」という意味が含まれます。問題文が「大きくできる」としか言っていなければ scalability です。また、durability（データが失われない）と availability（必要なときにアクセスできる）を混同しないようにしましょう。</p><p>試験では "Customer responsibility for physical security" や "requirement to purchase hardware upfront" のような誤答選択肢もよく仕込まれます。これらはオンプレミスの特徴であり、クラウドのメリットではありません。</p><p>もう 1 つの「NOT a benefit」のパターン: 「会社のデータに誰がアクセスできるかの設定について、AWS がすべての責任を負う」は<b>誤り</b>です。AWS が担うのはインフラであり、データへのアクセス権限はあくまでお客様が設定します。同様に、「データは別の Region に自動的にコピーされる」も誤りです。</p></div>
`,summary:["6 つのメリット: fixed → variable expense、economies of scale、stop guessing capacity、speed & agility、stop running data centers、go global in minutes。","Scalability = 拡張できること。elasticity = 需要に応じて自動で増減すること。","High availability = downtime が少ないこと。通常は複数の AZ を使う（各 AZ は独立した電源、冷却、ネットワークを持つ）。fault tolerance = 一部が故障しても通常どおり動き続けること。","Region は互いに分離されており、データが別の Region に自動でコピーされることはない。遠隔地の DR = 別の Region に必要に応じてリソースを構築する。","Durability = データが失われないこと（S3: イレブンナイン）。availability とは別物。","Agility = リソースを素早く入手でき、安く実験でき、早く市場に出せること。"],terms:[["Variable expense","変動費"],["Economies of scale","規模の経済"],["Capacity planning","キャパシティプランニング（容量計画）"],["Agility","俊敏性"],["Scalability","スケーラビリティ（拡張性）"],["Elasticity","伸縮性"],["High availability","高可用性"],["Fault tolerance","耐障害性"],["Durability","耐久性"],["Downtime","ダウンタイム（停止時間）"],["Availability Zone (AZ)","アベイラビリティーゾーン"],["Redundancy","冗長性"],["Disaster recovery (DR)","ディザスタリカバリ（災害復旧）"],["Time to market","市場投入までの時間"]]};
L.course["1-3"]={title:"クラウドの経済性: CapEx/OpEx、TCO、BYOL、rightsizing",goals:["固定費/変動費と CapEx/OpEx を区別する","オンプレミスの隠れたコストを挙げ、TCO の考え方を理解する","BYOL と license-included を区別する","rightsizing と、automation がなぜコスト削減につながるのかを理解する"],html:`
<h3>固定費と変動費</h3>
<p><b>Fixed cost</b>（固定費）は、サーバーの購入費や場所の賃料のように、使用量が多くても少なくても支払う費用です。<b>Variable cost</b>（変動費）は、電気代やタクシー料金のように、使用量に応じて変わる費用です。</p>
<p>オンプレミスは主に固定費です。サーバーを買ってしまえば、アクセスの少ない月でもサーバーはそこに置かれたままです。クラウドではその大部分が変動費に変わり、アクセスの少ない月は請求額も低くなります。</p>
<p>AWS での変動費の例: Amazon S3 は毎月保存している GB 数に応じて課金され、EC2 On-Demand は使用した秒数に応じて課金されます。一方、サーバーの購入費や複数年のデータセンター賃貸契約は固定費です。</p>

<h3>CapEx と OpEx</h3>
<p><b>CapEx</b>（Capital Expenditure、設備投資）は、サーバー、ネットワーク機器、データセンターの建設など、長期間使う資産を購入するために一度に支出するお金です。<b>OpEx</b>（Operational Expenditure、運用費）は、毎月の AWS の請求のように、サービスを利用するために定期的に支払うお金です。</p>
<div class="box idea"><b>🧠 かんたんに言うと</b><p>パンやケーキを配達するためにトラックを 1 台買うのが CapEx です。配達 1 回ごとに配送サービスを頼むのが OpEx です。クラウドは「車を買う」から「1 回ごとに頼む」への切り替えを可能にします。</p></div>
<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>1 年目、ランさんはサーバー、無停電電源装置、倉庫用のエアコンの購入に大きな金額を投じなければなりませんでした (CapEx)。AWS に移行すると、最初に大きな金額を出す必要はなくなり、コストは毎月の請求 (OpEx) となって、お客様の数に応じて増減します。浮いたお金は広告に回しました。</p></div>

<h3>オンプレミスの隠れたコストと TCO</h3>
<p>オンプレミスとクラウドを比べるとき、多くの人は「サーバーの購入価格」と「仮想マシンの利用料金」だけを比べます。これは誤った比較です。オンプレミスには隠れたコストがたくさんあるからです:</p>
<ul>
<li>サーバーの電気代と<b>冷却</b> (cooling)。</li>
<li>設置場所の賃料、ラック、物理セキュリティ、防火設備。</li>
<li>運用、夜間待機、故障したハードディスクの交換を行う要員の人件費。</li>
<li>ネットワーク機器、回線、予備機。</li>
<li><b>Hardware refresh</b>: 数年後には新しいサーバーに入れ替えなければならない。</li>
<li>ピーク時に備えて余分に買ったのに、ほとんどの時間は遊んでいるサーバー。</li>
</ul>
<p><b>TCO</b>（Total Cost of Ownership、総所有コスト）とは、システムをそのライフサイクル全体にわたって所有・運用するための、直接・間接の<i>あらゆる</i>コストの合計です。TCO を漏れなく計算すると、サーバーの価格だけを見る場合に比べて、クラウドのほうがはるかに有利になることが多いです。</p>
<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>ミンさんは 3 年間の TCO を試算してみました。オンプレミス側: サーバー 2 台（1 台は予備）の購入費、無停電電源装置、昼夜動かし続けるエアコン、電気代、サーバーの面倒を見るミンさん自身の給与の一部、そして 3 年目のサーバー入れ替え費用。AWS 側: 実際の使用量から見積もった毎月の請求額に、ミンさんがアカウントを管理する時間を加えたもの。すべてを合計すると、その差は「サーバーの価格」と「仮想マシンの利用料金」だけを比べたときよりもずっと大きくなりました。</p></div>
<p>注意: TCO はお金だけではありません。従業員の時間、システムダウンのリスク、新製品を出すスピードも、考慮すべき「コスト」です。</p>
<h4>減るコストと、残るコストは？</h4>
<table>
<tr><th>AWS に移行すると減る、またはなくなる</th><th>引き続き残る（お客様が自分で担う）</th></tr>
<tr><td>サーバーやネットワーク機器の購入と入れ替え</td><td>EC2 内のオペレーティングシステム (guest OS) にパッチを当てる時間</td></tr>
<tr><td>データセンターの電気、冷却、設置場所、物理セキュリティ</td><td>サーバーにインストールする商用ソフトウェアのライセンス</td></tr>
<tr><td>余分に買って遊んでいるサーバー</td><td>アプリケーションの設定、データとアクセス権限の管理</td></tr>
<tr><td>ハードディスクの交換やラックへの設置の作業</td><td>開発者が自社ビジネス向けの新機能を作る時間</td></tr>
</table>
<p>マネージドサービス（Amazon RDS など）では、データベースエンジンのパッチ適用や自動バックアップも AWS が引き受けます。しかし、ビジネス機能を作る手間は、どこで動かしてもほとんど変わりません。</p>
<div class="box idea"><b>🧠 かんたんに言うと: 時間単価は「高い」のに、合計では安くなる理由</b><p>自前で買ったサーバーの価格を 3 年間の時間数で割ると、EC2 の時間あたりの料金より安くなることさえあります。しかし、自前のサーバーが平均で能力の 15% しか使われていないなら、遊んでいる 85% にお金を払っていることになります。AWS ではキャパシティが実際の使用量に追従するので、総コストは低くなります。タクシーは 1 km あたりでは割高でも、1 週間ずっと車庫に置いたままの車を維持するより安いのと同じです。</p></div>
<p>移行前に AWS でのコストを見積もるには <b>AWS Pricing Calculator</b> があります。現在のシステムのデータに基づいてビジネスケースを作成するには <b>Migration Evaluator</b> があります（移行のレッスンで登場します）。</p>

<h3>Economies of scale: AWS が安い理由</h3>
<p>AWS はハードウェア、電力、帯域を膨大な量で調達し、非常に効率的に運用しています。単位あたりのコストが下がり、AWS はそのメリットの一部を、より低い料金という形でお客様に還元します。小さなベーカリーでは、同じような価格交渉は決してできません。</p>

<h3>BYOL と license-included</h3>
<p>多くの商用ソフトウェア（Microsoft Windows Server、SQL Server、Oracle など）には <b>license</b>（ライセンス、使用許諾）が必要です。AWS では 2 つの方法があります:</p>
<ul>
<li><b>License-included</b>（ライセンス込み）: 利用料金にライセンス料が含まれています。シンプルで、別途購入する必要がありません。</li>
<li><b>BYOL</b>（Bring Your Own License、ライセンスの持ち込み）: 会社がすでに購入済みのライセンスを AWS に持ち込んで使い続ける方法で、ライセンス料を二重に払わずに済み、節約になります。物理ソケット/コア単位で数えるライセンスの中には、<b>EC2 Dedicated Hosts</b> のような専用サーバーを必要とするものがあります。</li>
</ul>
<p>BYOL は節約になり得ますが、ソフトウェアベンダーの契約条件を守る必要があります。</p>
<table>
<tr><th>状況</th><th>選ぶもの</th></tr>
<tr><td>ライセンスをまだ持っておらず、自分で購入・管理したくない（例: Amazon RDS for SQL Server）</td><td><b>License Included</b>: ライセンス料が時間あたりの料金に含まれる</td></tr>
<tr><td>すでにライセンスを持っていて、再利用したい</td><td><b>BYOL</b></td></tr>
<tr><td>物理ソケット/コア単位のライセンスで、物理サーバーが見える必要があり、インスタンスを同じホスト上に長期間置き続けたい</td><td><b>EC2 Dedicated Hosts</b></td></tr>
<tr><td>サードパーティ製ソフトウェア（ファイアウォール、セキュリティソフトなど）を使い、AWS の請求書で時間単位で支払い、ベンダーとの契約交渉は自分でしたくない</td><td><b>AWS Marketplace</b>（すぐに購入できるソフトウェアのカタログ。pay-as-you-go で課金されるものもある）</td></tr>
<tr><td>使用中のライセンス数を追跡し、購入済みのライセンス数を超えた実行を防ぐ</td><td><b>AWS License Manager</b></td></tr>
</table>

<h3>Rightsizing と automation</h3>
<p><b>Rightsizing</b>（適切なサイズの選択）とは、リソースを実際の需要に合うよう調整することです。サーバーが CPU を 10% しか使っていないなら、より小さく安いタイプに変更します。クラウドではこれが簡単です。インスタンスタイプの変更は数分で済み、いつでも変更できるので、キャパシティを実際の使用量に合わせられます。オンプレミスでは、買ってしまったサーバーを「小さくする」ことはできません。</p>
<p>変更する前に、根拠を集めましょう。<b>Amazon CloudWatch</b> から使用状況のデータ（CPU、メモリなど）を、<b>AWS Compute Optimizer</b>（machine learning で使用状況を分析し、より適したインスタンスタイプを提案するサービス）から適切なサイズの推奨を得ます。</p>
<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>モニタリングのグラフを見たミンさんは、ウェブサイトのサーバーが平日は CPU を 8% 程度しか使っていないことに気づきました。より小さいタイプに切り替えると、請求額はほぼ半分になり、お客様は違いに気づきませんでした。これが rightsizing です。</p></div>
<p><b>Automation</b>（自動化）もコスト削減に役立ちます。テスト用サーバーを業務時間外に自動で停止する、負荷に応じて自動でスケールする、手作業のクリックではなくコードでインフラを構築する、などです。手作業が減れば、ミスも作業時間も減り、動かしたまま忘れられるリソースもなくなります。</p>
<div class="box exam"><b>🎯 試験でよく問われること</b><ul>
<li>"costs eliminated by moving to AWS" → <b>ハードウェアの購入/入れ替え</b>、<b>データセンターの電気と冷却</b>。（顧客データのセキュリティとアプリケーションの設計は、引き続きお客様の仕事です。）</li>
<li>"use existing licenses on AWS" → <b>BYOL</b>。ソケット/コア単位のライセンス → <b>Dedicated Hosts</b>。</li>
<li>"instances use less than 10% CPU, change to smaller types" → <b>Rightsizing</b>。</li>
<li>"rightsizing evidence before changing instance types" → <b>CloudWatch</b> (metrics) + <b>AWS Compute Optimizer</b> (recommendations)。</li>
<li>"how does automation reduce costs" → 手作業を減らす、ミスを減らす、需要に応じてリソースを停止/起動する。「開発/テスト環境は業務時間内しか使わない」→ <b>業務時間外にインスタンスを自動で stop する</b>。</li>
<li>"no license, do not want to track licenses" → <b>License Included</b>。"third-party software billed by the hour on AWS bill" → <b>AWS Marketplace</b>。"track license usage, prevent exceeding owned licenses" → <b>AWS License Manager</b>。</li>
<li>"which costs remain after rehosting to EC2" → guest OS のパッチ適用、ソフトウェアライセンス、アプリケーションの設定。</li>
<li>"estimate monthly cost before migrating" → <b>AWS Pricing Calculator</b>。</li>
</ul></div>
<div class="box trap"><b>⚠️ よくあるひっかけ</b><p>クラウドに移行しても、ライセンス費用がすべてなくなるわけでは<i>ありません</i>。商用ソフトウェアを使うなら、license-included か BYOL のどちらかの形で支払いが必要です。データ保護のコストもなくなりません。データのセキュリティは引き続きお客様の責任だからです。</p></div>
`,summary:["オンプレミスは主に固定費/CapEx。クラウドは変動費/OpEx に切り替わる。","オンプレミスには隠れたコストが多い: 電気、冷却、設置場所、人員、ハードウェアの入れ替え、余剰サーバー。","TCO はライフサイクル全体での所有・運用にかかるあらゆるコストの合計。クラウドとオンプレミスの比較には TCO を使う。","Economies of scale により AWS は料金を低くできる。","EC2 に移行した後も残るもの: guest OS のパッチ適用、ソフトウェアライセンス、アプリケーションの設定、新機能を作る手間。","BYOL = 既存のライセンスを AWS に持ち込む。License Included = 料金にライセンスが含まれる。Dedicated Hosts はソケット/コア単位のライセンス向け。Marketplace はサードパーティ製ソフトウェアを時間単位の支払いで購入。License Manager はライセンスを追跡。","Rightsizing（CloudWatch + Compute Optimizer に基づく）と automation により、余分なリソースや手作業にお金を払わずに済む。"],terms:[["Fixed cost","固定費"],["Variable cost","変動費"],["CapEx (Capital Expenditure)","設備投資"],["OpEx (Operational Expenditure)","運用費"],["TCO (Total Cost of Ownership)","総所有コスト"],["Hardware refresh","ハードウェアの定期的な入れ替え"],["Cooling","冷却"],["Economies of scale","規模の経済"],["License","ライセンス（使用許諾）"],["BYOL (Bring Your Own License)","ライセンスの持ち込み"],["License-included","料金にライセンスが含まれる"],["Rightsizing","リソースの適切なサイズの選択"],["Utilization","使用率"],["AWS Marketplace","AWS 上のサードパーティ製ソフトウェアのマーケット"],["AWS License Manager","ライセンスを管理するサービス"],["Automation","自動化"]]};
L.course["1-4"]={title:"AWS Well-Architected フレームワーク: 6 つの柱",goals:["Well-Architected フレームワークとは何か、何のために使うのかを理解する","6 つの柱それぞれの意味をやさしい言葉で説明する","問題文のキーワードに気づき、正しい柱を選ぶ","AWS Well-Architected Tool が何に使われるかを知る"],html:`
<h3>Well-Architected フレームワークとは？</h3>
<p><b>AWS Well-Architected Framework</b>（AWS Well-Architected フレームワーク）は、クラウド上のシステムが「適切に設計されている」かどうかを評価するためのガイダンスと質問のセットです。システム設計の経験を <b>6 pillars</b>（6 つの柱）にまとめており、それぞれの柱に <b>design principles</b>（設計原則）とベストプラクティスがあります。</p>
<div class="box idea"><b>🧠 かんたんに言うと</b><p>家の検査基準のようなものです。基礎はしっかりしているか、火災に対して安全か、電気を無駄に使わないか、メンテナンスしやすいか。守らなければならない法律ではなく、自分で評価して改善するためのチェックリストです。</p></div>

<h3>最初の 3 つの柱: 運用、セキュリティ、信頼性</h3>
<p><b>1. Operational Excellence</b>（運用上の優秀性）: システムを適切に運用・モニタリングし、プロセスを継続的に改善します。代表的な原則: <b>safely automate where possible</b>（安全に自動化する。つまりコードで運用することで、例えば AWS CloudFormation でインフラを構築する。以前のドキュメントでは <i>perform operations as code</i> と呼ばれていた）、<b>implement observability</b>（計測・モニタリングして意思決定に役立てる）、小さく頻繁で元に戻せる変更を行う、障害から学ぶ、<b>use managed services</b>（マネージドサービスを使って運用の負担を減らす）。</p>
<p><i>BanhNgon の例:</i> ミンさんは手作業の代わりにウェブサイトを自動でデプロイするスクリプトを書き、障害のたびに「得られた教訓」を書き残しています。</p>
<p><b>2. Security</b>（セキュリティ）: データ、システム、資産を保護します。原則: 最小権限 (least privilege)、すべてのレイヤーの保護、データの暗号化、誰が何をしたかが分かるようトレーサビリティを維持する（<b>maintain traceability</b>）。</p>
<p><i>BanhNgon の例:</i> 販売スタッフは注文を見ることしかできず、データベースは削除できません。顧客データは暗号化されています。</p>
<p><b>3. Reliability</b>（信頼性）: システムが本来の機能を安定して果たし、<b>障害が起きたら自動的に復旧し</b>、需要に応えられること。原則: 自動復旧、復旧手順のテスト、水平方向へのスケール、キャパシティの推測をやめる。</p>
<p><i>BanhNgon の例:</i> ウェブサイトは 2 つの Availability Zone で稼働し、データベースには予備のレプリカがあり、復旧計画を用意して訓練も済ませています。</p>

<h3>残りの 3 つの柱: パフォーマンス、コスト、持続可能性</h3>
<p><b>4. Performance Efficiency</b>（パフォーマンス効率）: コンピューティングリソースを効率的に使って要件を満たし、需要や技術が変化してもその効率を保ちます。原則: 複雑な技術を自分で運用しなくて済むようマネージドサービスを使う、<b>お客様の近くにデプロイする</b>（以前のドキュメント: <i>go global in minutes</i>）、スケールできるアーキテクチャ（例: serverless）、頻繁に実験する。</p>
<p><i>BanhNgon の例:</i> 負荷に合ったインスタンスタイプを選び、CloudFront を使って日本のお客様にもケーキの画像が速く表示されるようにしています。</p>
<p><b>5. Cost Optimization</b>（コスト最適化）: 最も低いコストでビジネス価値を生み出し、不要なコストを避けます。原則: クラウド財務管理、使った分だけ支払う、ビジネスの成果に対するコストを測定する、マネージドサービスと自動化を使う、コストをきめ細かく配分する（例: タグを使う）。</p>
<p><i>BanhNgon の例:</i> 夜間はテスト用サーバーを停止する、rightsizing を行う、タグを付けて店舗ごとのコストを把握する。</p>
<p><b>6. Sustainability</b>（持続可能性）: システムが環境に与える影響を減らします。原則: 自分の影響を理解する、持続可能性の目標を設定する、リソースの<b>使用率を最大化する</b>（サーバーを遊ばせない）、より効率的なハードウェア/ソフトウェアへ移行する、本当に必要なデータだけを保持する。</p>
<p><i>BanhNgon の例:</i> あまり使われていない複数のサーバーを、十分な負荷で動く 1 台に集約し、不要になった古いデータを削除する。</p>

<h3>比較表とキーワード</h3>
<table>
<tr><th>Pillar</th><th>核となる問い</th><th>問題文のキーワード</th></tr>
<tr><td>Operational Excellence</td><td>運用と改善はうまくできていますか？</td><td>operations as code, automate safely, observability, small frequent changes, learn from failures, runbooks, use managed services</td></tr>
<tr><td>Security</td><td>データとシステムは保護されていますか？</td><td>least privilege, encryption, traceability, protect data, identity</td></tr>
<tr><td>Reliability</td><td>自動的に復旧し、需要に応えられますか？</td><td>recover from failures, automatically recover, Multi-AZ, test recovery</td></tr>
<tr><td>Performance Efficiency</td><td>適切な種類のリソースを効率的に使っていますか？</td><td>select right resource type, serverless, deploy closer to customers, experiment</td></tr>
<tr><td>Cost Optimization</td><td>余分なコストを避けていますか？</td><td>avoid unnecessary costs, pay-as-you-go, measure efficiency</td></tr>
<tr><td>Sustainability</td><td>環境への影響を減らしていますか？</td><td>environmental impact, maximize utilization, energy, carbon</td></tr>
</table>

<h3>Design principles: 試験では原文のまま問われる</h3>
<p>試験では、<b>design principle</b>（設計原則）の名前を英語で示し、それがどの柱に属するかを問うことがよくあります。下の表は、docs.aws.amazon.com にある<b>現行の Well-Architected フレームワークのドキュメント</b>（Operational Excellence の原則は 7 つ）に基づいています（2026 年 11 月に照合）。AWS は文言を何度か変更しているため、3 列目には、サードパーティの書籍、講座、模擬試験でいまもよく使われる<b>旧名称</b>を載せています。どちらの名前に出会っても、柱を見分けられるようにしましょう。</p>
<table>
<tr><th>Pillar</th><th>現行の design principles</th><th>学習教材でよく見かける旧名称</th><th>かんたんに言うと</th></tr>
<tr><td>Operational Excellence</td><td>Implement observability for actionable insights; Safely automate where possible; Make frequent, small, reversible changes; Refine operations frequently; Anticipate failure; Learn from all operational events and metrics; <b>Use managed services</b></td><td>Perform operations as code（現在は <i>Safely automate where possible</i>）; Refine operations procedures frequently; Learn from all operational failures; Organize teams around business outcomes（Operational Excellence Pillar のホワイトペーパーにはあるが、現行のフレームワークのページには載っていない）</td><td>ビジネス目標に沿ってチームを編成する、計測して意思決定に役立てる、安全のためのガードレールを設けたうえでコード（runbook を含む）により自動化する、少しずつ変更して元に戻せるようにする、障害の後は誰も責めない (blameless) 形で教訓を得る、マネージドサービスを使って運用作業を減らす</td></tr>
<tr><td>Security</td><td>Implement a strong identity foundation; <b>Maintain traceability</b>; Apply security at all layers; Automate security best practices; Protect data in transit and at rest; Keep people away from data; Prepare for security events</td><td>Enable traceability（現在は <i>Maintain traceability</i>）</td><td>最小権限、操作の記録、多層の保護（edge、VPC、subnet、instance、code）、暗号化、人がデータに直接アクセスする代わりにダッシュボードやツールを使う</td></tr>
<tr><td>Reliability</td><td>Automatically recover from failure; Test recovery procedures; Scale horizontally to increase aggregate workload availability; Stop guessing capacity; Manage change through automation</td><td>Manage change in automation</td><td>自動復旧、復旧の訓練、大きな 1 台ではなく小さな複数台</td></tr>
<tr><td>Performance Efficiency</td><td>Use managed services to reduce operational complexity; Deploy workloads closer to your customers; Build scalable architectures; Experiment more often; Consider mechanical sympathy; Design for change and variable demand</td><td>Democratize advanced technologies; Go global in minutes; Use serverless architectures</td><td>深い専門知識を自前で築く代わりに既存のサービス（AI、NoSQL など）を使う、システムをお客様の近くに置く、データの使われ方に合った技術を選ぶ</td></tr>
<tr><td>Cost Optimization</td><td>Implement Cloud Financial Management; Adopt a consumption model; Measure business outcomes relative to costs; Use managed services and automation; Implement granular cost allocation</td><td>Measure overall efficiency; Stop spending money on undifferentiated heavy lifting; Analyze and attribute expenditure</td><td>財務 + 技術のチームがコスト意識の文化を担う、使った分だけ支払う、生み出した価値に対するコストを測る、タグを付けて誰がいくら使ったかを把握する</td></tr>
<tr><td>Sustainability</td><td>Understand your impact; Establish sustainability goals; Maximize utilization; Anticipate and adopt new, more efficient hardware and software offerings; Align computational approach to problem complexity; Minimize the footprint of data and its processing</td><td>Use managed services; Reduce the downstream impact of your cloud workloads</td><td>影響を測る、サーバーを遊ばせない、より効率的なハードウェアへ移行する、「鶏を割くのに牛刀を使う」ようなことをしない、目的が明確なデータだけを保持する</td></tr>
</table>
<p><b>"Use managed services"</b> は現在、複数の柱に登場します。単独で出てくる場合は <b>Operational Excellence</b> の原則（運用の負担を減らす）、"…to reduce operational complexity" の形は <b>Performance Efficiency</b>、"…and automation" の形は <b>Cost Optimization</b> に属します。以前のドキュメントでは Sustainability にも分類されていました。試験で問われたら、フレーズ全体と、そこに示された目的（運用を減らすのか、難しい技術を使うのか、コストを節約するのか）をよく読みましょう。</p>
<p><b>Cloud Financial Management</b>（クラウド財務管理）とは、コストを管理する能力と文化を築くことです。財務担当者と技術者からなるチームが、エンジニアにコスト意識を教育し、支出の目標を設定し、各プロダクトチームと一緒に使用状況を見直します。これは <b>Cost Optimization</b> に属します。</p>
<div class="box trap"><b>⚠️ よくあるひっかけ</b><p>"Stop guessing capacity" は、クラウドの 6 つのメリットの 1 つであると同時に、<b>Reliability</b> の原則でもあります（Cost Optimization ではありません）。"Democratize advanced technologies"（旧名称。現在は "Use managed services to reduce operational complexity"。モデルを自分でトレーニングする代わりにマネージドの AI サービスを使うこと）は <b>Performance Efficiency</b> に属します。"Keep people away from data" は <b>Security</b> に属します。</p></div>
<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>AWS に移行して 1 年後、ミンさんは Console の <b>AWS Well-Architected Tool</b> を使い、BanhNgon のシステムに関する質問に自分で答えてみました。ツールが指摘したのは、データ復旧の訓練をまだしていないこと (Reliability)、一晩中遊んでいるサーバーが数台あること (Cost Optimization と Sustainability)、権限が広すぎるアカウントが 1 つあること (Security) でした。ミンさんは項目ごとに改善の計画を立てました。</p></div>
<p><b>AWS Well-Architected Tool</b> は Console で使える無料のサービスで、フレームワークのベストプラクティスに照らしてワークロードをレビューするのに役立ちます。柱ごとの質問に答えていくと、ツールが <b>high-risk issues</b>（高リスクの問題）を示し、<b>milestone</b>（後で比較できるよう、ある時点の状態を記録したスナップショット）を保存でき、<b>improvement plan</b>（改善計画）を作成してくれます。</p>
<p><b>Well-Architected Lenses</b>（レンズ）は、特定の業界や特定の種類の技術向けの<i>追加の</i>質問とガイダンスのセットで、共通の 6 つの柱でレビューした後に追加で使います。例: Financial Services Industry、Serverless、SaaS、Machine Learning、Data Analytics 向けのレンズ。Well-Architected Tool では、用意されたライブラリからレンズを適用することも、custom lens を自分で作成することもできます。</p>

<h3>柱の間のトレードオフ</h3>
<p>柱どうしは、ときに逆方向へ「引っ張り合う」ことがあります。システムを複数の Region で動かせば Reliability は向上しますが、コストは増えます (Cost Optimization)。非常に高性能なサーバーを使えば Performance は良くなりますが、アクセスが少ないときには無駄になるかもしれません。そのためフレームワークは、1 回きりではなく<b>定期的にレビュー</b>し、ビジネス目標に合ったバランスを選ぶことを勧めています。</p>
<p>Well-Architected のドキュメントによると、<b>Security</b> と <b>Operational Excellence</b> は一般に、ほかの柱との<b>トレードオフの対象にすべきではありません</b>。トレードオフは通常、Reliability、Performance Efficiency、Cost Optimization、Sustainability の間で起こります。例えば、社内向けの実験用ウェブサイトなら、節約のために決済システムより低い信頼性を許容できますが、セキュリティを省くことは許されません。</p>
<div class="box idea"><b>🧠 かんたんに言うと</b><p>配達用の車選びに似ています。大きな車はたくさん運べますがガソリン代がかかり、バイクは安いけれど少ししか運べません。「いちばん良い」車というものはなく、そのときの店のニーズと予算に合った車があるだけです。</p></div>
<div class="box exam"><b>🎯 試験でよく問われること</b><ul>
<li>"recover from failures and meet demand" → <b>Reliability</b>。</li>
<li>"perform operations as code", "safely automate where possible", "implement observability", "use managed services to reduce operational burden" → <b>Operational Excellence</b>。</li>
<li>"minimize environmental impact", "maximize utilization" → <b>Sustainability</b>。</li>
<li>"use computing resources efficiently", "select the right instance type" → <b>Performance Efficiency</b>。</li>
<li>"avoid unnecessary costs" → <b>Cost Optimization</b>。</li>
<li>"review workloads against Well-Architected best practices", "milestone", "improvement plan", "high-risk issues" → <b>AWS Well-Architected Tool</b>。</li>
<li>"additional best-practice guidance specific to an industry or technology" → <b>Well-Architected lens</b>。</li>
<li>"pillars generally NOT traded off" → <b>Security</b> と <b>Operational Excellence</b>。</li>
<li>"strong identity foundation", "traceability", "apply security at all layers", "keep people away from data" → <b>Security</b>。</li>
<li>"test recovery procedures", "scale horizontally", "stop guessing capacity" → <b>Reliability</b>。</li>
<li>"frequent, small, reversible changes", "blameless post-incident review", "runbooks as code" → <b>Operational Excellence</b>。</li>
<li>"democratize advanced technologies", "use serverless architectures", "go global in minutes" / "deploy closer to customers", "experiment more often" → <b>Performance Efficiency</b>。</li>
<li>"Cloud Financial Management", "consumption model", "granular cost allocation", "tag and attribute costs per team" → <b>Cost Optimization</b>。"Stop spending money on undifferentiated heavy lifting" は Cost Optimization の原則の<b>旧名称</b>です（"undifferentiated heavy lifting" という言い回しは、クラウドのメリットの話でもよく出てきます）。問題が柱を問うていて<b>コスト</b>に触れているなら、<b>Cost Optimization</b> を選びます。</li>
<li>"adopt new, more efficient hardware", "establish sustainability goals", "minimize the footprint of data" → <b>Sustainability</b>（以前のドキュメント: "use managed services to share infrastructure" も Sustainability に属する）。</li>
</ul></div>
<div class="box trap"><b>⚠️ よくあるひっかけ</b><p>"Maximize utilization" は Performance や Cost を連想させるかもしれませんが、問題文が<i>環境</i> (environmental impact, energy) に触れているなら、答えは <b>Sustainability</b> です。また "go global in minutes" は、クラウドの 6 つのメリットの 1 つであると同時に、Performance Efficiency の原則の旧名称でもあります（現在は "Deploy workloads closer to your customers"）。問題がメリットを問うているのか、柱を問うているのかをよく読みましょう。</p></div>
`,summary:["Well-Architected フレームワークは、AWS 上のシステムを評価・改善するためのベストプラクティス集。","6 つの柱: Operational Excellence、Security、Reliability、Performance Efficiency、Cost Optimization、Sustainability。","Operations as code / safely automate、observability、use managed services → Operational Excellence。recover from failures → Reliability。","適切な種類のリソースを選ぶ、serverless、democratize → Performance Efficiency。余分なコストを避ける → Cost Optimization。identity、traceability、all layers → Security。","環境への影響を減らす、使用率を最大化する → Sustainability。","AWS Well-Architected Tool はフレームワークに沿ったワークロードのレビューを支援する（milestone、improvement plan、high-risk issues）。lens は業界/技術ごとの質問を追加する。","Security と Operational Excellence は一般にトレードオフの対象にしない。Cloud Financial Management は Cost Optimization に属する。"],terms:[["Well-Architected Framework","AWS Well-Architected フレームワーク（優れた設計のための枠組み）"],["Pillar","柱"],["Design principle","設計原則"],["Best practice","ベストプラクティス（最良の方法）"],["Operational Excellence","運用上の優秀性"],["Security","セキュリティ"],["Reliability","信頼性"],["Performance Efficiency","パフォーマンス効率"],["Cost Optimization","コスト最適化"],["Sustainability","持続可能性"],["Operations as code","コードによる運用"],["Workload","ワークロード / アプリケーションシステム"],["Traceability","トレーサビリティ（追跡可能性）"],["Lens","業界/技術ごとの追加の質問セット"],["Cloud Financial Management","クラウド財務管理"]]};
L.course["1-5"]={title:"クラウドへの移行: 7R、AWS CAF、移行ツール",goals:["7 つの移行戦略 (7R) を例を通して区別する","AWS CAF の 6 つのパースペクティブと、ビジネス/技術のグループ分けを知る","AWS CAF が挙げる 4 つの business outcome を覚える","どの移行ツールが何に使われるかを基本レベルで知る"],html:`
<h3>Migration とは？</h3>
<p><b>Migration</b>（移行）とは、アプリケーション、データ、サーバーをオンプレミス（または他のクラウド）から AWS へ移すことです。すべてのアプリケーションが同じ方法で移行されるわけではありません。AWS はその方法を <b>7 つの戦略</b>にまとめており、どれも R で始まるため <b>7R</b> と呼ばれます。</p>
<div class="box idea"><b>🧠 かんたんに言うと</b><p>引っ越しに似ています。そのまま運ぶもの、少し直してから持っていくもの、まったく新しく作り直すもの、売って新しいものを買うもの、捨てるもの、そしてしばらく元の家に置いておくものがあります。</p></div>

<h3>7 つの移行戦略 (7R)</h3>
<p><b>1. Rehost</b>（"lift and shift"、持ち上げてそのまま移す）: アプリケーションを現状のまま移し、コードは変更しません。最も速く、リスクも最も低い方法です。<br><i>BanhNgon:</i> 倉庫にあるウェブサイトのサーバーを、そのまま AWS 上の仮想マシンとしてコピーする。</p>
<p><b>2. Replatform</b>（"lift, tinker and shift"、少し手を加えて移す）: クラウドを活用できるよう少しだけ最適化しますが、<i>中核となるアーキテクチャは変えません</i>。<br><i>BanhNgon:</i> 自分でインストールした MySQL データベースを、AWS が管理する Amazon RDS に置き換える。コードはほぼそのまま。</p>
<p><b>3. Refactor / Re-architect</b>（再設計）: クラウドネイティブの機能を使うためにアプリケーションを書き直し、設計し直します。通常は、より良くスケールさせるため、またはより速くするためです。最も手間がかかります。<br><i>BanhNgon:</i> 注文システムを、AWS Lambda 上で動くサーバーレスの関数に分割する。</p>
<p><b>4. Repurchase</b>（"drop and shop"、捨てて買い替える）: 古いソフトウェアをやめて別の製品に切り替えます。多くの場合は SaaS です。<br><i>BanhNgon:</i> パソコンにインストールしていた顧客管理ソフトをやめ、SaaS 型の CRM に切り替える。</p>
<p><b>5. Retire</b>（廃止）: 不要になったアプリケーションを停止して廃止します。<br><i>BanhNgon:</i> 過去の年の中秋節キャンペーンページはもう誰も使っていないので、停止してしまう。</p>
<p><b>6. Retain</b>（保持）: アプリケーションを当面オンプレミスに残し、まだ移行しません。アップグレードしたばかり、特別な要件がある、まだ時期ではない、といった理由が考えられます。<br><i>BanhNgon:</i> 店頭のレジはネットワークが切れても動く必要があるので、店舗に残す。</p>
<p><b>7. Relocate</b>（インフラの移設）: 新しいハードウェアの購入もアプリケーションの修正もせずに、仮想化インフラをまるごとクラウドへ移します。例えば VMware 環境を VMware Cloud on AWS へ移す場合です。<br><i>BanhNgon:</i> 仮に、倉庫に小さなアプリケーションをいくつも動かす VMware の仮想マシンクラスターがあるとすれば、ミンさんはクラスターごと一度に AWS へ移す。</p>
<table>
<tr><th>戦略</th><th>コードの変更</th><th>問題文のキーワード</th></tr>
<tr><td>Rehost</td><td>なし</td><td>as quickly as possible, without changes, lift and shift</td></tr>
<tr><td>Replatform</td><td>ごくわずか</td><td>some optimization, move DB to RDS, without changing core architecture</td></tr>
<tr><td>Refactor</td><td>多い</td><td>re-architect, cloud-native, serverless, microservices</td></tr>
<tr><td>Repurchase</td><td>製品を入れ替える</td><td>move to SaaS, different product</td></tr>
<tr><td>Retire</td><td>停止して廃止</td><td>no longer needed, decommission</td></tr>
<tr><td>Retain</td><td>そのまま現地に残す</td><td>keep on-premises, not ready to migrate</td></tr>
<tr><td>Relocate</td><td>なし</td><td>VMware, move hypervisor-level infrastructure</td></tr>
</table>
<p>より詳しく問われやすい 3 つのポイント:</p>
<ul>
<li><b>なぜ最初に Rehost を選ぶのか？</b> 差し迫った期限がある場合（データセンターの賃貸契約が切れる、数百のアプリケーションを移さなければならない）、rehost なら<i>速く、大規模に、少ない変更で</i>移行できます。最適化はクラウドに移ってから少しずつ行います。</li>
<li><b>Replatform は必ずしもコードの修正を伴いません。</b> 例えば、自分でインストールしてパッチを当てている Tomcat 上で動く Java アプリケーションを AWS Elastic Beanstalk に移す場合、コードはそのままですが、プラットフォーム、キャパシティ、負荷分散は AWS が面倒を見るようになります。「土台」をマネージドサービスに替える = Replatform です。</li>
<li><b>Relocate</b> は、既存の運用ツールと運用プロセスもそのまま維持します（例: 数千台の VMware 仮想マシン）。新しいハードウェアは買わず、アプリケーションも書き直しません。</li>
</ul>

<h3>AWS Cloud Adoption Framework (AWS CAF)</h3>
<p>クラウドへの移行は技術だけの話ではありません。人、プロセス、予算も変わる必要があります。<b>AWS CAF</b>（Cloud Adoption Framework、AWS クラウド導入フレームワーク）は、組織が総合的に準備を進めるためのガイダンスで、<b>6 perspectives</b>（6 つのパースペクティブ）に分かれています:</p>
<table>
<tr><th>グループ</th><th>Perspective</th><th>かんたんな意味</th></tr>
<tr><td rowspan="3">ビジネス</td><td><b>Business</b></td><td>クラウドへの投資はビジネス目標（戦略、製品、データ）に役立つものでなければならない</td></tr>
<tr><td><b>People</b></td><td>文化、組織構造、リーダーシップ、従業員のスキル</td></tr>
<tr><td><b>Governance</b></td><td>プログラム/プロジェクトの管理、得られた効果の追跡、クラウドコストの管理 (financial management)、リスク管理。通常は CFO や最高リスク責任者の仕事</td></tr>
<tr><td rowspan="3">技術</td><td><b>Platform</b></td><td>エンタープライズ規模でスケーラブルなハイブリッドクラウドのプラットフォームを構築する</td></tr>
<tr><td><b>Security</b></td><td>データとワークロードの機密性、完全性、可用性を保つ: アイデンティティと権限の管理、脅威の検出、インシデント対応。通常は CISO の仕事</td></tr>
<tr><td><b>Operations</b></td><td>クラウドサービスがビジネスに必要な水準で提供されるようにする: 障害の管理 (incident/problem)、パッチ適用 (patch)、モニタリング (observability)、変更とリリースの管理</td></tr>
</table>
<p>覚え方: <b>BPG</b> (Business, People, Governance) は「オフィス側」、<b>PSO</b> (Platform, Security, Operations) は「技術側」です。</p>
<p>AWS CAF は、クラウドがもたらす <b>4 business outcomes</b>（4 つのビジネス成果）も挙げています:</p>
<ul>
<li><b>Reduced business risk</b>: ビジネスリスクの低減。</li>
<li><b>Improved ESG performance</b>: 環境・社会・ガバナンスのパフォーマンス向上。</li>
<li><b>Increased revenue</b>: 収益の増加。</li>
<li><b>Increased operational efficiency</b>: 運用効率の向上。</li>
</ul>
<p>見分け方: 不正をより早く検出する、システムがより安定する、セキュリティが向上する → <b>reduced business risk</b>。炭素排出量を減らす → <b>improved ESG performance</b>。新製品を出す、新しい顧客にリーチする → <b>increased revenue</b>。運用コストを下げる、生産性を高める → <b>increased operational efficiency</b>。</p>
<h4>CAF の 4 つの transformation domains と 4 つのフェーズ</h4>
<p>CAF はさらに、クラウドが組織を「変革」する 4 つの <b>transformation domains</b>（変革領域）を、バリューチェーンに沿った順で説明しています:</p>
<ul>
<li><b>Technology</b>: インフラ、アプリケーション、データを移行しモダナイズする。</li>
<li><b>Process</b>: 業務プロセスをデジタル化、自動化、最適化する。多くの場合、データ、analytics、machine learning を活用する。</li>
<li><b>Organization</b>: 製品と顧客への価値を軸に、チームの働き方を再編する。</li>
<li><b>Product</b>: ビジネスモデルを再設計し、新しい製品と収益源を生み出す。</li>
</ul>
<p>変革の道のりは 4 つの <b>phases</b>（フェーズ）を、繰り返しながら進みます:</p>
<div class="flow"><span>Envision</span><span>Align</span><span>Launch</span><span>Scale</span></div>
<ul>
<li><b>Envision</b>: ビジネス目標に結びついた変革の機会を特定する。</li>
<li><b>Align</b>: 6 つのパースペクティブに沿って能力のギャップを見つけ、関係者間で合意を形成し、計画を立てる。</li>
<li><b>Launch</b>: いくつかの試験的プロジェクト (pilot) を本番環境に投入し、価値を段階的に実証する。</li>
<li><b>Scale</b>: pilot を大規模に展開し、期待するビジネス上の効果を得る。</li>
</ul>
<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>本格的に移行する前に、ランさんとミンさんは CAF に沿って話し合いました。<i>Business</i>: 目標はテト（旧正月）の繁忙期にもっと多く売ること。<i>People</i>: スタッフに AWS の基礎講座を受けてもらう。<i>Governance</i>: 月次の予算とコストのアラートを設定する。<i>Platform</i>: AWS 上のシステムを設計する。<i>Security</i>: 誰が何にアクセスできるかを決める。<i>Operations</i>: 誰が当番をし、障害にどう対応するか。期待する成果: 収益の増加と、サイトが落ちるリスクの低減。</p></div>

<h3>AWS の移行ツール</h3>
<p>Cloud Practitioner のレベルでは、どのツールが何をするのかを知っていれば十分です:</p>
<table>
<tr><th>ツール</th><th>何をするか</th><th>段階</th></tr>
<tr><td><b>Migration Evaluator</b></td><td>現在のシステムを分析し、ビジネスケースを作成して、AWS へ移行した場合のコストを見積もる</td><td>評価</td></tr>
<tr><td><b>AWS Application Discovery Service</b></td><td>オンプレミスのサーバーの情報を収集する: 構成、使用状況、サーバー間の依存関係（注意: 2025 年 11 月 7 日から新規のお客様の受け付けを停止しており、AWS は AWS Transform の利用を推奨しています。試験ではこの説明のとおりに問われる可能性があります）</td><td>調査</td></tr>
<tr><td><b>AWS Application Migration Service</b></td><td>サーバーを rehost (lift and shift) 方式で AWS へ移す。継続的にレプリケーションして downtime を減らす</td><td>サーバーの移行</td></tr>
<tr><td><b>AWS DMS</b> (Database Migration Service)</td><td>データベースを移行する。移行中も移行元のデータベースは通常どおり稼働する。同じ種類のエンジン (MySQL → MySQL) と異なる種類のエンジン (Oracle → PostgreSQL) の両方に対応。変更を継続的にレプリケーションして downtime を最小限に抑える</td><td>データベースの移行</td></tr>
<tr><td><b>AWS SCT</b> (Schema Conversion Tool)</td><td>別の種類のデータベースへ切り替えるときに、データベースの構造 (schema) を変換する。例: Oracle から PostgreSQL へ</td><td>データベースの移行</td></tr>
<tr><td><b>AWS Migration Hub</b></td><td>複数のツールにまたがる移行の進捗を 1 か所で追跡する（注意: 2025 年 11 月 7 日から新規のお客様の受け付けを停止しており、AWS は AWS Transform の利用を推奨しています。ただし試験ではこの説明のとおりに問われる可能性があります）</td><td>追跡</td></tr>
<tr><td><b>AWS DataSync</b></td><td>オンプレミスのファイルサーバー（NFS、SMB など）から S3、EFS、FSx へ、大量の<i>ファイル</i>をネットワーク（インターネットまたは Direct Connect）経由で転送する。スケジュールの自動実行、転送中の暗号化、データ整合性の検証を行う（注意: DataSync は CLF-C02 の現行の in-scope リストには含まれていませんが、模擬試験ではよく見かけます）</td><td>ファイルデータの移行</td></tr>
<tr><td><b>AWS Snowball</b>（AWS Snow Family の一員）</td><td>AWS が現地まで送ってくれる<b>物理</b>デバイス。データをコピーして返送すると、AWS が S3 に取り込む。<b>数 TB から数 PB</b> を移す必要があるのに、回線が遅すぎる、または高すぎる場合に使う（注意: 2025 年 11 月 7 日から Snowball Edge は新規のお客様の受け付けを停止しており、AWS は DataSync または AWS Data Transfer Terminal の利用を推奨しています。Snow Family も CLF-C02 の現行の in-scope リストには含まれなくなりましたが、模擬試験では "petabytes, limited bandwidth, offline transfer" → Snowball が非常によく問われます）</td><td>オフラインでのデータ移行</td></tr>
</table>
<p>ツールのほかに、AWS には <b>AWS Migration Acceleration Program (MAP)</b> というプログラムもあります。多くのワークロードを移行したいものの経験が不足している企業向けです。MAP は、体系的な方法論、ツール、パートナー (AWS Partners) の専門家、そして移行コストの一部を補う AWS からの投資（例: クレジット）を提供します。</p>
<div class="flow"><span>Migration Evaluator</span><span>Application Discovery Service</span><span>Application Migration Service / DMS</span><span>Migration Hub で追跡</span></div>
<div class="box exam"><b>🎯 試験でよく問われること</b><ul>
<li>"as quickly as possible without changes" → <b>Rehost</b>。"self-managed MySQL → Amazon RDS" → <b>Replatform</b>。"move to SaaS" → <b>Repurchase</b>。</li>
<li>"perspectives of AWS CAF" → Business, People, Governance, Platform, Security, Operations（誤答選択肢: Pricing, Networking, Marketing）。</li>
<li>"culture, organizational structure, leadership, workforce skills" → <b>People</b>。"enterprise-grade, scalable, hybrid cloud platform" → <b>Platform</b>。</li>
<li>"business outcome of cloud adoption" → 例えば <b>Reduced business risk</b>。"reduce carbon footprint" → <b>Improved ESG performance</b>。</li>
<li>"program management, benefits, cloud spending, risk" → <b>Governance</b>。"incident, patch, observability, change and release management" → <b>Operations</b>。"identity, threat detection, incident response" → <b>Security</b>。</li>
<li>"digitize and automate business processes, analytics, ML" → transformation domain の <b>Process</b>。"deliver pilot initiatives in production" → phase の <b>Launch</b>。</li>
<li>"one-time online transfer of many TB of files from NFS/SMB to Amazon S3" → <b>AWS DataSync</b>。"Oracle → Aurora PostgreSQL" → <b>SCT</b> (schema) + <b>DMS</b>（データ）。</li>
<li>"program with methodology, partners, AWS credits for large migrations" → <b>AWS Migration Acceleration Program (MAP)</b>。</li>
<li>"migrate database with minimal downtime, continuous replication" → <b>AWS DMS</b>。</li>
<li>"move petabytes of data, limited or no network bandwidth, physical device" → <b>AWS Snowball</b>（物理デバイス。現在は新規のお客様の受け付けを停止しているが、模擬試験ではまだ見かける）。</li>
<li>"collect information about on-premises servers, dependencies" → <b>AWS Application Discovery Service</b>。"lift and shift many servers" → <b>AWS Application Migration Service</b>。"track progress of migrations" → <b>AWS Migration Hub</b>。</li>
</ul></div>
<div class="box trap"><b>⚠️ よくあるひっかけ</b><p><b>Security</b> は CAF のパースペクティブの 1 つであると同時に、Well-Architected の柱の 1 つでもあります。問題がどちらのフレームワークを問うているのかをよく読みましょう。そして覚えておきましょう: Rehost は何も変更しない。Replatform は少しだけ変更する（多くはマネージドサービスの利用）がアーキテクチャは保つ。書き直すのは Refactor です。DMS はデータを移行し、SCT はデータベースの種類を変えるときに schema を変換します。</p></div>
`,summary:["7R: Rehost（現状のまま）、Replatform（少し手を加える）、Refactor（書き直す）、Repurchase（SaaS に切り替える）、Retire（停止する）、Retain（残す）、Relocate（VMware インフラを移設する）。","AWS CAF には 6 つのパースペクティブがある: Business、People、Governance（ビジネス）と Platform、Security、Operations（技術）。","4 つの business outcome: reduced business risk、improved ESG performance、increased revenue、increased operational efficiency。","CAF: 4 つの transformation domains（Technology、Process、Organization、Product）、4 つの phases（Envision、Align、Launch、Scale）。","Migration Evaluator: ビジネスケース。Application Discovery Service: サーバーの調査。Migration Hub: 進捗の追跡。","Application Migration Service: サーバーの rehost。DMS: 少ない downtime でのデータベース移行。SCT: schema の変換。DataSync: ネットワーク経由のファイル転送。MAP: 大規模な移行を支援するプログラム。"],terms:[["Migration","クラウドへの移行"],["Rehost (lift and shift)","現状のまま移す"],["Replatform","軽い最適化を加えて移す"],["Refactor / Re-architect","再設計、書き直し"],["Repurchase","代わりの新しい製品を購入する"],["Retire","使用をやめる（廃止）"],["Retain","残す（保持）"],["Relocate","インフラの移設"],["AWS CAF (Cloud Adoption Framework)","AWS クラウド導入フレームワーク"],["Perspective","パースペクティブ（視点）"],["Business outcome","ビジネス成果"],["ESG","環境・社会・ガバナンス"],["Schema","スキーマ（データの構造）"],["Downtime","ダウンタイム（停止時間）"],["Business case","ビジネスケース（投資効果の分析）"],["Transformation domain","変革領域"],["Pilot","試験的プロジェクト"]]};
})();
