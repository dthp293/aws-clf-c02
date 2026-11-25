(function(){var I=window.CLF_I18N=window.CLF_I18N||{};var L=I.ja=I.ja||{};['q','course','lessons','glossary','services','domains','ui'].forEach(function(k){L[k]=L[k]||{};});
L.course["3-1"]={title:"グローバルインフラストラクチャ: リージョン、アベイラビリティーゾーン、エッジロケーション",goals:["リージョン、アベイラビリティーゾーン (AZ)、エッジロケーションとは何か、どのような入れ子構造になっているかを理解する","リージョン選択の4つの要素（コンプライアンス、レイテンシー、利用可能なサービス、料金）を知る","複数の AZ を使う場面（high availability）と、複数のリージョンを使う場面（disaster recovery、低レイテンシー、データ主権）を区別する","試験問題で Local Zones と AWS Outposts を見分けられるようになる"],html:`
<h3>まず確認: 「クラウド」は実際どこにあるのか？</h3>
<p>「cloud」（雲）と聞くと、データがどこかにふわふわ浮かんでいると思う人も少なくありません。実際には、AWS 上のあらゆるものは本物のコンピューターの上で動いており、それらは <b>data center</b>（データセンター）と呼ばれる本物の建物の中に置かれています。</p>
<p>データセンターは何千台ものサーバーを収容する建物で、予備電源、冷却設備、高速ネットワーク回線、厳重な警備を備えています。あなたがその中に入ることは決してありません。インターネット経由で、それらのサーバーの能力の一部を「借りる」だけです。</p>
<p>AWS は世界中の非常に多くの場所にデータセンターを持っています。管理しやすくするため、AWS はこのインフラを <b>Region</b>、<b>Availability Zone</b>、<b>Edge location</b> の3つの階層に分けています。この3階層の理解は、試験で「可用性」に関するほぼすべての問題の土台になります。</p>

<div class="box idea"><b>🧠 かんたんに言うと</b>
<p>大きなスーパーマーケットチェーンを想像してください。<b>Region</b> はチェーンが出店している都市（東京、大阪、シンガポール…）のようなものです。<b>Availability Zone</b> はその都市の中にある個別の倉庫のようなもので、互いに数十 km 離れており、それぞれ専用の電源を持っています。<b>Edge location</b> は近所の角にある小さなコンビニのようなものです。すべての商品は置いていませんが、よく売れる商品だけをあらかじめ置いておき、お客さんがすぐ手に取れるようにしています。</p>
</div>

<h3>リージョンとアベイラビリティーゾーン</h3>
<p><b>Region</b>（リージョン）は、世界の中で独立した地理的なエリアです。例: Asia Pacific (Singapore)、Asia Pacific (Tokyo)、US East (N. Virginia)。各リージョンにはコード名があり、たとえば <code>ap-southeast-1</code> はシンガポールです。リージョン同士は互いに独立しています。あなたのデータは置いたリージョンにそのまま留まり、あなた自身が意図して別の場所へコピーしない限り移動しません。</p>
<p>各リージョンの中には複数の <b>Availability Zone</b>（AZ、アベイラビリティーゾーン）があります。1つの AZ は<b>1つ以上の独立したデータセンター</b>で、専用の電源、ネットワーク、冗長な接続を備えています。通常、1つのリージョンには<b>3つ以上の AZ</b> があります。</p>
<p>重要なポイント: 同じリージョン内の AZ は、ある AZ での障害（火災、洪水、地域的な停電）が別の AZ を巻き込まないよう、十分に離れた場所にあります。試験の言い回しで言えば、AZ 同士は <b>single point of failure を共有しません</b>（単一障害点）。それでいて AZ 同士は十分に近く、高速・低レイテンシーのネットワークで結ばれているため、アプリケーションを複数の AZ で並行してスムーズに動かせます。</p>

<div class="flow"><span>AWS グローバルインフラストラクチャ</span><span>リージョン（例: シンガポール）</span><span>複数の AZ（通常 ≥ 3）</span><span>各 AZ = 1つ以上のデータセンター</span></div>

<h4>Multi-AZ: 1つのリージョン内の障害に備える</h4>
<p>アプリケーションを1つの AZ の1台のサーバーだけで動かしていると、その AZ に障害が起きたときアプリケーションも一緒に「落ちて」しまいます。標準的なやり方は、アプリケーションの複製を<b>2つ以上の AZ</b> に配置することです。1つの AZ が故障しても、残りの AZ が引き続きお客さんに対応します。これがまさに <b>high availability</b>（高可用性）です。</p>

<h4>Multi-Region: 1つのリージョンでは足りないとき</h4>
<p><b>複数のリージョン</b>を使う理由には次のものがあります。</p>
<ul>
<li><b>Disaster recovery</b>（ディザスタリカバリ）と <b>business continuity</b>（事業継続）: リージョン全体が大規模な障害に見舞われた場合への備え。</li>
<li>複数の大陸にいる顧客への <b>Low latency</b>（低レイテンシー）: 顧客グループごとに近くのリージョンを使います。</li>
<li><b>Data sovereignty</b>（データ主権）: 一部の国の法律は、国民のデータを国内または域内に保存するよう求めているため、対応するリージョンが必要になります。</li>
</ul>

<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b>
<p>最初のころ、BanhNgon のウェブサイトは店の倉庫に置いた1台のコンピューターで動いていました。あるとき倉庫が午後いっぱい停電し、オンライン注文がすべて失われてしまいました。ランさんはとても悔しい思いをしました。</p>
<p>AWS へ移行するとき、ミンさんはシンガポールリージョン（ベトナムに近い）を選びました。そしてウェブサイトを、異なる2つの AZ に置いた2台の仮想サーバーで動かしました。片方の AZ が停電しても、もう片方の AZ が注文を受け付けます。これが multi-AZ です。</p>
<p>数年後、BanhNgon は日本に支店を開きました。日本のお客さんはシンガポールへのアクセスが少し遅いと感じ、日本のパートナーは日本の顧客データを日本国内に保存することを望みました。ミンさんは東京リージョンにもう1つ環境をデプロイしました。これが multi-Region です。レイテンシーを下げ、データに関する要件を満たし、さらに別の地域に「予備」を持つこともできます。</p>
</div>

<h3>リージョンはどう選ぶか？</h3>
<p>試験では「リージョンを選ぶときに考慮すべき要素はどれか」がよく問われます。次の4つの要素を覚えましょう。</p>
<table>
<tr><th>要素（試験での英語表現）</th><th>意味</th><th>例</th></tr>
<tr><td><b>Compliance</b> / data sovereignty</td><td>データの保存場所に関する法律・規制</td><td>日本の顧客データは日本国内に置く必要がある → 東京を選ぶ</td></tr>
<tr><td><b>Proximity to customers</b> (latency)</td><td>顧客に近いほど応答が速い</td><td>顧客が主に東南アジアにいる → シンガポール</td></tr>
<tr><td><b>Service availability</b></td><td>すべてのリージョンで全サービスが使えるわけではない。特に新しいサービス</td><td>新しい AI サービスが必要 → そのリージョンで提供済みか確認する</td></tr>
<tr><td><b>Pricing</b></td><td>同じサービスでもリージョンによって料金が異なる</td><td>一部のリージョンは他のリージョンより安い</td></tr>
</table>
<p>優先順位は通常、まず法令の順守（必須）、その次にレイテンシー、サービス、料金の順です。</p>

<div class="box trap"><b>⚠️ よくあるひっかけ</b>
<p>「AWS の本社に近いリージョンを選ぶ」「AZ が最も多いリージョンを選ぶ」「エッジロケーションが最も多いリージョンを選ぶ」といった誤答選択肢は、どれも正しい基準では<b>ありません</b>。また、AZ は<b>1つ以上の</b>データセンターであり、「ちょうど1つのデータセンター」でも「小さなリージョン」でもないことを覚えておきましょう。</p>
</div>

<h3>エッジロケーション: ユーザーの近くにある「補給基地」</h3>
<p>リージョンと AZ のほかに、AWS は世界中の大都市に非常に多くの <b>edge location</b>（エッジロケーション）を置いており、その数はリージョンよりはるかに多くなっています。エッジロケーションは、あなたのアプリケーション全体を動かすためのものではありません。主な役割は<b>コンテンツをユーザーの近くへ届けること</b>です。</p>
<p>エッジロケーションを使う代表的なサービスが <b>Amazon CloudFront</b>（コンテンツ配信ネットワーク、CDN）です。CloudFront は画像、動画、ウェブページなどのファイルをエッジロケーションに一時保存（<b>cache</b>）します。ダナンのお客さんがケーキの画像を開くと、シンガポールから取り寄せるのではなく、最寄りのエッジロケーションから画像を受け取ります。このほか <b>Amazon Route 53</b>（DNS サービス）と <b>AWS Global Accelerator</b> もエッジネットワークを活用しています。</p>
<div class="flow"><span>ダナンのお客さん</span><span>最寄りのエッジロケーション（CloudFront のキャッシュ）</span><span>なければ: シンガポールリージョンから取得</span></div>

<h3>Local Zones と AWS Outposts</h3>
<p>顧客が極めて低いレイテンシーを必要としているのに、リージョンから遠い場所にいることがあります。AWS にはさらに2つの選択肢があります。</p>
<ul>
<li><b>AWS Local Zones</b>: AWS がインフラの一部（サーバー、ストレージなど）を大都市に直接置き、リージョンよりもエンドユーザーの近くに配置します。オンラインゲームやライブ動画編集など、数ミリ秒のレイテンシーが必要な用途に適しています。</li>
<li><b>AWS Outposts</b>: AWS が自社のハードウェア（ラック形式）を<b>あなたのデータセンターに設置</b>します。AWS のサービスをその場で使えるので、データを自社の場所（on-premises）に留めなければならない場合や、社内システムへの極めて低いレイテンシーが必要な場合に適しています。これは <b>hybrid</b>（ハイブリッド）の一形態です。</li>
</ul>
<p>このほか <b>AWS Wavelength Zones</b> もあります（CLF-C02 の Exam Guide は Wavelength を<i>試験範囲外</i>のグループに分類しており、Local Zones と混同しないために知っておけば十分です）。通信事業者の <b>5G</b> ネットワークの内部に置かれた AWS インフラで、極めて低いレイテンシーが必要なモバイルアプリケーション（自動運転車、スマートフォンゲームなど）向けです。</p>
<table>
<tr><th>選択肢</th><th>設置場所</th><th>ハードウェアの担当</th><th>選ぶ場面</th></tr>
<tr><td><b>Region / AZ</b></td><td>AWS のデータセンター</td><td>AWS</td><td>ほとんどのアプリケーションの標準</td></tr>
<tr><td><b>Local Zones</b></td><td>リージョンがまだない大都市</td><td>AWS</td><td>その都市のユーザーに数 ms のレイテンシーが必要で、ハードウェアを自分で管理したくない</td></tr>
<tr><td><b>Wavelength Zones</b></td><td>通信事業者の 5G ネットワーク内</td><td>AWS</td><td>極めて低いレイテンシーが必要な 5G モバイルアプリケーション</td></tr>
<tr><td><b>Outposts</b></td><td>あなた自身のデータセンター / 建物</td><td>AWS が提供・保守。設置場所、電源、ネットワークはあなたが用意</td><td>データをその場に留める必要がある、またはオンプレミスのシステムへの低レイテンシーが必要で、それでも同じ AWS の API、ツール、サービス（EC2、EBS など）を使いたい</td></tr>
</table>

<div class="box trap"><b>⚠️ よくあるひっかけ</b>
<p>複数の AZ か、複数のリージョンか？ 要件が「<b>1つのデータセンター / 1つの AZ</b> の故障に耐える」だけなら、<b>同じリージョン内の multi-AZ</b> で十分で、<b>最も安く</b>済みます。問題文が「リージョン全体が使えない」（entire Region unavailable）と言っているときだけ、2つ目のリージョンの追加（そこへデータをコピーし、復旧用のリソースを準備する）が必要です。また、法令とレイテンシーの条件を満たしたあとでも、2つのリージョンは<b>料金</b>と<b>利用可能なサービス/機能</b>が異なります。この2点を続けて比較する必要があります。</p>
</div>

<div class="box exam"><b>🎯 試験でよく問われること</b>
<ul>
<li>"one or more discrete data centers with redundant power, networking" → <b>Availability Zone</b></li>
<li>"keep running if one Availability Zone fails" / "do not share single points of failure" → <b>deploy across multiple AZs</b> (high availability)</li>
<li>"an entire Region becomes unavailable", "disaster recovery", "data must stay in a country" → <b>multiple Regions</b></li>
<li>"factors when choosing a Region" → <b>compliance / data sovereignty, proximity (latency), service availability, pricing</b></li>
<li>"cache content closer to users" → <b>edge locations</b> + <b>Amazon CloudFront</b></li>
<li>"run AWS infrastructure in its own data center", "same AWS APIs and tools on premises" → <b>AWS Outposts</b>; "low latency in a metropolitan area with no Region, no hardware to manage" → <b>AWS Local Zones</b>; "5G", "mobile edge" → AWS Wavelength (<i>Wavelength は CLF-C02 の試験範囲外リストに含まれており、誤答選択肢として除外できるよう見分けられれば十分です</i>)</li>
<li>"which services use edge locations" → <b>Amazon CloudFront</b>, <b>Amazon Route 53</b>（および Global Accelerator）</li>
<li>"data must stay in a country" → <b>その国にあるリージョン</b>を選ぶ。AWS はあなたが選んだリージョンの外へデータを勝手に移しません</li>
<li>"remain available if an AZ fails" → <b>2つ以上の AZ</b> に EC2 を配置 + <b>Elastic Load Balancer</b> で負荷分散（レッスン 3-5）</li>
</ul>
</div>
`,summary:["リージョン = 独立した地理的エリア。あなたがコピーしない限り、データが勝手にリージョンを出ることはありません。","アベイラビリティーゾーン = リージョン内の1つ以上の独立したデータセンター。1つのリージョンには通常3つ以上の AZ があり、障害点を共有しません。","Multi-AZ → high availability（高可用性）。multi-Region → disaster recovery、グローバルでの低レイテンシー、データ主権。","リージョンは4つの要素で選ぶ: compliance、顧客への近さ (latency)、利用可能なサービス、料金。","エッジロケーションは CloudFront（コンテンツのキャッシュ）、Route 53、Global Accelerator で使われ、数はリージョンより多い。","Local Zones はインフラを大都市の近くに置く。Wavelength Zones は 5G ネットワーク内にある。Outposts は AWS のインフラをあなたのデータセンターに持ち込む。","1つの AZ の障害に耐えるだけでよい → multi-AZ（より安い）。リージョン全体の喪失に耐える必要がある → 2つ目のリージョンを追加。"],terms:[["Data center","データセンター"],["Region","リージョン（AWS の地理的なエリア）"],["Availability Zone (AZ)","アベイラビリティーゾーン。1つ以上の独立したデータセンター"],["Edge location","エッジロケーション。ユーザーの近くにあり、コンテンツのキャッシュに使う"],["High availability","高可用性"],["Single point of failure","単一障害点"],["Disaster recovery","ディザスタリカバリ（災害復旧）"],["Business continuity","事業継続"],["Latency","レイテンシー（遅延）"],["Data sovereignty","データ主権"],["Compliance","コンプライアンス（法令・規制の順守）"],["Cache","キャッシュ。すばやく取り出すための一時保存"],["AWS Local Zones","大都市の近くに置かれた AWS インフラ"],["AWS Outposts","顧客のデータセンターに設置される AWS インフラ"],["AWS Wavelength Zones","通信事業者の 5G ネットワーク内に置かれた AWS インフラ"]]};
L.course["3-2"]={title:"AWS の操作方法: Console、CLI、SDK、Infrastructure as Code",goals:["AWS に指示を出す3つの基本的な方法（Management Console、AWS CLI、AWS SDK）と、そのすべてが API を経由することを知る","1回限りの操作と、繰り返しが必要なプロセスを区別する","AWS CloudFormation による Infrastructure as Code と、Elastic Beanstalk が PaaS であることを理解する","3つのデプロイモデル（cloud、hybrid、on-premises）を復習し、AWS Systems Manager の用途を知る"],html:`
<h3>API: すべての裏側にある「注文カウンター」</h3>
<p>ツールの話に入る前に、土台となる概念を1つ理解しておく必要があります。<b>API</b>（Application Programming Interface、アプリケーションプログラミングインターフェイス）です。API とは、あるシステムが公開している「標準の命令」のセットで、別のシステムがそれを呼び出して作業を依頼できます。</p>
<p>AWS では、「サーバーを1台作る」「ファイルを1つ削除する」「請求書を見る」といったあらゆる操作が、AWS に送られる1回の API 呼び出しです。ウェブ画面でクリックしてもコマンドを入力しても、最終的にはすべて API 呼び出しになります。</p>

<div class="box idea"><b>🧠 かんたんに言うと</b>
<p>API は飲食店の注文カウンターのようなものです。厨房（AWS）はカウンター経由でしか注文を受けません。メニューの写真を指さして注文する（Console）、決まった形式で料理名を読み上げる（CLI）、フードデリバリーアプリに自動で注文を送らせる（SDK）といった方法があります。注文の仕方は違っても、すべて同じカウンターを通ります。</p>
</div>

<h3>AWS に指示を出す3つの方法</h3>
<h4>1. AWS Management Console</h4>
<p><b>AWS Management Console</b>（ウェブの管理画面）は、サインインしてクリック操作をしたり、グラフを見たり、サービスを作成したりするウェブサイトです。初心者にとって最も使いやすく、探索や学習、あるいは<b>1回限り</b>の作業（たとえば障害調査中に S3 バケットの設定を確認する）にとても向いています。</p>
<p>ウェブ版のほかに <b>AWS Console Mobile Application</b>（iOS/Android のモバイルアプリ）もあります。手元にノート PC がないとき、障害対応の当番はスマートフォンで <b>CloudWatch alarm</b>（アラーム）、<b>AWS Health</b> のイベント、リソースの状態、コストを確認し、いくつかの軽い操作を実行できます。複雑な設定作業についてはウェブ版の代わりにはなりません。</p>
<h4>2. AWS CLI</h4>
<p><b>AWS CLI</b>（Command Line Interface、コマンドラインインターフェイス）はコンピューターにインストールするツールで、文字のコマンドを入力して AWS を操作できます。たとえば S3 のストレージ「バケット」を一覧表示するコマンドは <code>aws s3 ls</code> の1行です。</p>
<p>利点: 複数のコマンドを <b>script</b>（スクリプト。たとえば Linux の shell script）にまとめて、自動実行、何度もの繰り返し、毎晩の定時実行ができます。しかも Python や Java のような言語で<b>プログラミングができなくても</b>かまいません。このほか <b>AWS CloudShell</b> もあります。ブラウザの中でそのまま開くコマンドラインのウィンドウで、CLI があらかじめ入っており、インストールは不要です（<i>CloudShell は CLF-C02 の試験範囲外リストに含まれています。実習で使うために知っておきましょう</i>）。</p>
<h4>3. AWS SDK</h4>
<p><b>AWS SDK</b>（Software Development Kit、ソフトウェア開発キット）は、Python、Java、JavaScript、.NET、Go などのプログラミング言語向けのライブラリです。開発者は SDK を使って、<b>アプリケーション自身のコードの中から</b> AWS を呼び出します。例: ケーキの注文アプリで、お客さんが画像をアップロードすると、コードが SDK を使って画像を S3 に保存します。</p>
<p>なぜ、手っ取り早く自分で HTTPS 経由の API 呼び出しを送らないのでしょうか。API 呼び出しは1回ごとに認証情報で<b>署名</b>（request signing）しなければならず、エラーを処理し、ネットワークが不安定なときには<b>自動で再試行</b>（retry）する必要があるからです。SDK はこれらをあらかじめ用意してくれているので、開発者は関数を呼び出すだけで済みます。</p>

<table>
<tr><th>ツール</th><th>使い方</th><th>最も向いている場面</th></tr>
<tr><td>Management Console</td><td>ウェブ上でクリック操作</td><td>学習、探索、1回限りの操作、視覚的な確認</td></tr>
<tr><td>AWS CLI</td><td>コマンド入力、スクリプト作成</td><td>管理作業の自動化、繰り返しの操作</td></tr>
<tr><td>AWS SDK</td><td>アプリケーションのコードから呼び出す</td><td>アプリケーションが AWS のサービスとやり取りする必要があるとき</td></tr>
</table>

<h3>1回だけか、何度も繰り返すか？</h3>
<p>試験で重要な考え方: <b>one-time operation</b>（1回限りの操作）なら Console で十分です。しかし、ある作業を<b>何度も、まったく同じように、複数の場所で</b>行う必要があるとき（repeatable process）、クリック操作は遅いうえにミスも起きやすくなります。そのときはスクリプトで、さらに望ましくは Infrastructure as Code で自動化すべきです。</p>

<h3>AWS CloudFormation による Infrastructure as Code</h3>
<p><b>Infrastructure as Code</b>（IaC、コードとしてのインフラストラクチャ）とは、インフラ全体（サーバー、ネットワーク、データベース、権限など）を1つのテキストファイルに記述することです。そのあとツールがファイルを読み込み、記述どおりのものを自動で作成します。</p>
<p>AWS の主要な IaC サービスが <b>AWS CloudFormation</b> です。あなたは JSON または YAML 形式で <b>template</b>（テンプレート）を書きます。CloudFormation はテンプレートを読み込み、<b>stack</b> と呼ばれるリソースのグループを作成します。削除したければ stack を削除すれば、その中のリソースもすべて一緒に片付けられます。また必要になったら<b>同じテンプレート</b>から新しい stack を作成すれば、まったく同じ環境が手に入ります。同じ1つのテンプレートを、複数のリージョン、複数のアカウントに stack としてデプロイできます。</p>
<p>JSON/YAML を書きたくない場合、開発者は <b>AWS CDK</b>（Cloud Development Kit）を使えます。使い慣れたプログラミング言語（Python、TypeScript など）でインフラを記述すると、CDK がそれを CloudFormation のテンプレートに変換します。</p>

<div class="box idea"><b>🧠 かんたんに言うと</b>
<p>テンプレートは、小麦粉 200g、卵3個、180度で25分焼く、と明記された<b>ケーキのレシピ</b>のようなものです。レシピを手にすれば誰でもまったく同じケーキを作れます。10の支店で10回分焼きたい？ 同じレシピを渡すだけです。変更したい？ レシピを直して作り直せば、古いレシピは比較用に残しておけます。</p>
</div>

<p>IaC のメリット:</p>
<ul>
<li><b>繰り返し可能で一貫している</b>: テスト環境と本番環境をまったく同じに作成できます。</li>
<li><b>速い</b>: 一日中クリックする代わりに、数分でシステム全体を構築できます。</li>
<li><b>人為的ミスが少ない</b>: 手順を忘れることがありません。</li>
<li><b>バージョン管理</b>: テンプレートはファイルなので、コードと同じように変更履歴を保存できます。</li>
</ul>
<p>CloudFormation 自体は、通常の AWS リソースについて追加料金がかかりません。支払うのは CloudFormation が作成したリソースの料金です。これはまさに、Well-Architected フレームワークの Operational Excellence（運用上の優秀性）の柱にある「perform operations as code」の原則でもあります。</p>

<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b>
<p>BanhNgon にウェブサイトが1つしかなかったころ、ミンさんはすべてを Console で作成していました。ホーチミン市、続いて日本に支店を開く段階になると、ミンさんは新しい場所にほぼ同じシステムを構築し直す必要が出てきました。そこで、ネットワーク、2つの AZ に置く2台のサーバー、ロードバランサー、データベースを記述した CloudFormation テンプレートを書きました。東京では、そのテンプレートを実行していくつかのパラメータを変えるだけで済みます。注文アプリのコードでは、ミンさんの同僚が Python 用の SDK を使い、お客さんが特別注文したケーキの画像を S3 に保存しています。</p>
</div>

<h3>AWS Elastic Beanstalk: コードを渡すだけ</h3>
<p>誰もがサーバー、負荷分散、自動スケーリングを自分で面倒見たいわけではありません。<b>AWS Elastic Beanstalk</b> は <b>PaaS</b>（Platform as a Service、サービスとしてのプラットフォーム）型のサービスです。コード（Java、.NET、PHP、Node.js、Python、Ruby、Go、Docker など）をアップロードするだけで、Beanstalk がデプロイ、サーバーの割り当て、負荷分散、スケーリング、アプリケーションのヘルスモニタリングを自動で引き受けます。必要なら、基盤となるリソースを確認・調整することもできます。Beanstalk に追加料金はかからず、Beanstalk が使用するリソースの料金を支払います。</p>

<div class="box trap"><b>⚠️ よくあるひっかけ</b>
<p><b>CloudFormation</b> = "provision resources using templates"、"repeatable"、"infrastructure as code"。<b>Elastic Beanstalk</b> = "upload code, AWS handles deployment, capacity, load balancing, scaling"。どちらのサービスも自動化を行いますが、CloudFormation はインフラを記述するもので、Beanstalk はコードからウェブアプリケーションを動かすことに重点を置いています。</p>
</div>

<h3>デプロイモデルと AWS Systems Manager</h3>
<p>Domain 1 で学んだ3つの <b>deployment model</b>（デプロイモデル）を振り返りましょう。</p>
<ul>
<li><b>Cloud</b>（すべてクラウド上）: すべてが AWS 上で動きます。</li>
<li><b>Hybrid</b>（ハイブリッド）: 一部は自社のデータセンター（on-premises）、一部は AWS 上にあり、相互に接続されています。</li>
<li><b>On-premises</b>（オンプレミス。private cloud とも呼ばれる）: すべてが会社自身のインフラにあります。</li>
</ul>
<p>AWS 上のサーバーとオンプレミスのサーバーの両方があると、管理が煩雑になります。<b>AWS Systems Manager</b> を使うと、サーバーの「フリート」全体（EC2 とオンプレミスのサーバーの両方）を1か所から確認・運用できます。パッチ（patch）の一括適用、複数のサーバーでのコマンド同時実行、SSH ポートを開けずに安全にサーバーへログインする機能（Session Manager）、設定やパラメータの保存（Parameter Store）などです。</p>

<div class="box exam"><b>🎯 試験でよく問われること</b>
<ul>
<li>"interact with AWS services from application code (Python, Java…)" → <b>AWS SDK</b></li>
<li>"manage AWS services from a terminal / shell script / scheduled job, no programming language" → <b>AWS CLI</b></li>
<li>"web-based interface", "one-time task, visual interface" → <b>AWS Management Console</b></li>
<li>"check alarms, AWS Health events, resource status from a smartphone" → <b>AWS Console Mobile Application</b></li>
<li>Console、CLI、SDK の共通点は？ → どれも <b>AWS service API を呼び出す</b>。SDK は多くの言語向けに用意され、<b>request の署名、retry、エラー処理</b>を自動で行う</li>
<li>"remove all resources and later rebuild exactly, least effort" → <b>CloudFormation stack を削除し、あとでテンプレートから再作成する</b></li>
<li>"provision resources in a repeatable way by using templates", "infrastructure as code" → <b>AWS CloudFormation</b></li>
<li>"upload code, AWS handles deployment, capacity provisioning, load balancing, auto scaling" → <b>AWS Elastic Beanstalk</b></li>
<li>"connects on-premises infrastructure with cloud resources" → <b>hybrid deployment</b></li>
<li>"patch and manage a fleet of EC2 and on-premises servers" → <b>AWS Systems Manager</b></li>
</ul>
</div>
`,summary:["AWS に対するあらゆる操作は、最終的にはすべて API 呼び出しです。","Console = ウェブ上でクリック操作（スマートフォン向けの Console Mobile Application もある）。CLI = コマンド入力、スクリプト作成。SDK = アプリケーションのコードから AWS を呼び出し、request の署名と retry を自動で処理。","1回限りの作業は Console で。繰り返す作業は自動化すべき。","CloudFormation = Infrastructure as Code: template (JSON/YAML) からリソースの stack を作成し、繰り返し可能で一貫性がある。","Elastic Beanstalk = PaaS: コードをアップロードすれば、AWS がデプロイ、スケーリング、負荷分散を引き受ける。","3つのデプロイモデル: cloud、hybrid、on-premises。Systems Manager は AWS 上のサーバーとオンプレミスのサーバーの両方を管理する。"],terms:[["API (Application Programming Interface)","アプリケーションプログラミングインターフェイス"],["AWS Management Console","AWS のウェブ管理画面"],["AWS Console Mobile Application","リソースをすばやく確認・管理するためのモバイルアプリ"],["AWS CLI (Command Line Interface)","コマンドラインツール"],["AWS SDK (Software Development Kit)","コードから AWS を呼び出すためのライブラリ群"],["Script","スクリプト（自動実行するコマンドの手順書）"],["Infrastructure as Code (IaC)","コードとしてのインフラストラクチャ"],["Template","インフラを記述するテンプレート"],["Stack","CloudFormation が作成するリソースのグループ"],["PaaS (Platform as a Service)","サービスとしてのプラットフォーム"],["Repeatable process","繰り返し可能なプロセス"],["Deployment model","デプロイモデル"],["Hybrid","ハイブリッドモデル（オンプレミス + クラウド）"],["On-premises","オンプレミス。会社自身のインフラ"],["Patch","パッチ（ソフトウェアの修正プログラム）"]]};
L.course["3-3"]={title:"Amazon EC2: 仮想サーバー",goals:["サーバーと仮想マシン（virtual machine）とは何か、EC2 が何を提供するのかを理解する","AMI の用途と、5つのグループに沿った instance type の選び方を知る","EBS のルートボリュームと instance store を区別し、インスタンスに関連付けられる security group を理解する","Amazon Lightsail が EC2 よりシンプルな選択肢であることを知る"],html:`
<h3>サーバーと仮想マシンとは？</h3>
<p><b>Server</b>（サーバー）は、他のコンピューターに「サービスを提供する」ための専用コンピューターです。ウェブサイトを置く、注文を処理する、問い合わせに応じてデータを返す、といった役割を担います。本質的にはあなたのパソコンと同じく CPU（プロセッサ）、RAM（メモリ）、ディスク、ネットワークカードを備えており、より高性能で昼も夜も動き続けるという点が違うだけです。</p>
<p>物理サーバーは通常とても高性能で、1つの用途だけに使うのは無駄です。そこで <b>hypervisor</b> というソフトウェアを使い、1台の物理マシンを複数の <b>virtual machine</b>（VM、仮想マシン）に分割します。各仮想マシンは専用の OS と専用のディスクを持ち、独立した1台のコンピューターとして動作します。</p>

<div class="box idea"><b>🧠 かんたんに言うと</b>
<p>物理サーバーは1棟のマンションのようなものです。hypervisor は建物を多くの部屋に分ける仕組みにあたります。各部屋（仮想マシン）には専用の鍵付きドア、専用の電気と水道があり、ある部屋の住人が別の部屋に入ることはできません。EC2 を借りるのは部屋を1つ借りるようなものです。広さを選んですぐに入居でき、家を建てる必要はありません。</p>
</div>

<h3>Amazon EC2 とは？</h3>
<p><b>Amazon EC2</b>（Elastic Compute Cloud）は、AWS 上の仮想サーバーを借りられるサービスです。仮想マシン1台を <b>instance</b>（インスタンス）と呼びます。インスタンスは数分で作成でき、好きなだけ動かし、不要になったら停止（stop）または完全に削除（terminate）でき、支払うのは使った時間の分だけです。注意: <b>stop</b> したインスタンスにはコンピューティング料金はかかりませんが、アタッチされている <b>EBS</b> ボリュームには、削除するまでストレージ料金がかかり続けます。</p>
<p>EC2 は <b>IaaS</b>（Infrastructure as a Service）の典型例です。AWS はハードウェア、電源、ネットワーク、建物を担当します。あなたは OS から上のすべてを担当します。ソフトウェアのインストール、OS のパッチ適用、ファイアウォールの設定、データの保護です。これが責任共有モデルにおけるお客様の責任範囲です。</p>
<p>インスタンスを作成する手順を簡単にまとめると次のとおりです。</p>
<div class="flow"><span>AMI を選ぶ</span><span>instance type を選ぶ</span><span>ネットワーク + security group を選ぶ</span><span>ディスクをアタッチ</span><span>Launch</span></div>

<h3>AMI: 「インストール済みのひな形」</h3>
<p><b>AMI</b>（Amazon Machine Image）はインスタンスを作成するためのひな形です。OS（Amazon Linux、Ubuntu、Windows Server など）を含み、ソフトウェアや設定をあらかじめ同梱することもできます。1つの AMI から、まったく同じインスタンスをいくつでも作成できます。</p>
<p>AMI の入手元は3つあります。AWS が提供するもの、<b>AWS Marketplace</b> で購入・入手するもの（ソフトウェアベンダー製）、そしてセットアップを終えた自分のインスタンスから<b>自分で作成</b>するものです。</p>

<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b>
<p>ミンさんは Amazon Linux のインスタンスを作成し、ウェブ用のソフトウェアと BanhNgon のウェブサイトのコードをインストールして、安定して動くように調整しました。そのあと、このインスタンスから独自の AMI を作成し、「banhngon-web-v1」と名付けました。サーバーの追加が必要になるたびに（中秋節の時期や Black Friday）、その AMI から launch するだけで、すべてがインストール済みのサーバーがすぐに手に入り、最初からインストールし直す必要はありません。</p>
</div>

<h3>Instance type: マシンの「スペック」を選ぶ</h3>
<p><b>Instance type</b>（インスタンスタイプ）は、仮想マシンの性能を決めます。vCPU の数、RAM の量、ネットワークの速さです。名前は <code>t3.micro</code> や <code>m5.large</code> のような形式で、先頭の文字がファミリー（family）、数字が世代、ピリオドの後ろがサイズです。名前を暗記する必要はありませんが、<b>5つのグループ</b>と、それぞれの得意分野は覚えておく必要があります。</p>
<table>
<tr><th>グループ</th><th>ファミリーの例</th><th>強み</th><th>用途</th></tr>
<tr><td><b>General purpose</b>（汎用）</td><td>T, M</td><td>CPU、RAM、ネットワークのバランスが良い</td><td>ウェブサーバー、小〜中規模のアプリケーション、テスト環境。<b>T</b> ファミリーは <b>burstable</b>（バースト可能）なタイプで、普段は軽く動き、短い負荷増加があると一時的に「バースト」します。負荷が低く、ときどきスパイクがあるアプリケーションに向いています</td></tr>
<tr><td><b>Compute optimized</b>（コンピューティング最適化）</td><td>C</td><td>RAM に対して CPU が強力</td><td>バッチ処理、動画エンコード（transcoding）、ゲームサーバー、科学シミュレーション、高性能ウェブサーバー</td></tr>
<tr><td><b>Memory optimized</b>（メモリ最適化）</td><td>R, X</td><td>非常に大きな RAM</td><td>インメモリ（in-memory）データベース、大規模データのリアルタイム処理</td></tr>
<tr><td><b>Storage optimized</b>（ストレージ最適化）</td><td>I, D</td><td><b>ローカル接続</b>のディスク（instance store）でランダム読み書きが極めて速く、IOPS が非常に高い</td><td>データウェアハウス、自己管理の NoSQL データベース、分散ファイルシステム</td></tr>
<tr><td><b>Accelerated computing</b>（高速コンピューティング）</td><td>P, G, Inf, Trn</td><td><b>GPU</b> または専用チップを搭載し、膨大な並列計算が可能</td><td>deep learning/machine learning のトレーニング、グラフィックス処理、科学計算</td></tr>
</table>
<p><b>IOPS</b>（Input/Output Operations Per Second）は1秒あたりのディスク読み書き回数で、高いほどディスクの「手が速い」ことを意味します。ファミリー名を暗記する必要はありませんが、問題文に "for example, C instances" や "P instances" と書かれていたら、どのグループかすぐ分かるようにしておきましょう。</p>
<p>サイズを選び間違えても大丈夫です。インスタンスを停止し、別の type に変更してから再び起動できます。自信がなければ、<b>AWS Compute Optimizer</b> が machine learning を使い、実際の使用状況に基づいてより適した instance type を提案してくれます（rightsizing）。</p>

<div class="box trap"><b>⚠️ よくあるひっかけ</b>
<p>"In-memory database"、"large datasets in memory" → <b>Memory optimized</b> であり、Storage optimized ではありません。"High, low-latency random read/write IOPS on locally attached disks" → <b>Storage optimized</b>。"High performance computing"、"batch processing"、"video transcoding"、"CPU-bound, little memory" → <b>Compute optimized</b>。"Deep learning training"、"GPU"、"massively parallel"、"graphics" → <b>Accelerated computing</b>。"Balanced, low traffic with short spikes" → <b>General purpose (burstable T)</b>。</p>
</div>

<h3>インスタンスのディスクとファイアウォール</h3>
<h4>EBS root volume と instance store</h4>
<p>各インスタンスには OS を格納するディスクが必要で、これを <b>root volume</b>（ルートボリューム）と呼びます。通常これは <b>Amazon EBS</b>（Elastic Block Store）のボリュームです。ネットワーク経由のディスクで、物理サーバーから切り離されているため、インスタンスを停止してもデータは残ります。注意: デフォルトでは、インスタンスを terminate（完全に削除）すると EBS のルートボリュームも一緒に削除されますが、この設定は変更できます。</p>
<p>一部の instance type には <b>instance store</b> もあります。物理サーバーに直接接続されたディスクで、非常に高速ですが<b>一時的</b>なものです。インスタンスが停止・削除されたり、ハードウェアが故障したりすると、instance store 上のデータは失われます。バッファや作業用ファイルなどの一時データにだけ使いましょう。ストレージについてはレッスン 3-7 で詳しく説明します。</p>
<h4>Security group</h4>
<p>各インスタンスには少なくとも1つの <b>security group</b>（セキュリティグループ）が関連付けられます。インスタンスレベルの仮想ファイアウォールで、どのトラフィックの出入りを許可するかを定めます。例: インターネットからウェブサーバーへはポート 443（HTTPS）だけを許可する。security group には<b>許可</b>（allow）ルールしかなく、<b>stateful</b>（ステートフル）です。つまり、入ってくるリクエストを許可すれば、その応答は自動的に出ていくことができます。この部分はセキュリティとネットワークのテーマに属するので、ここでは security group が常にインスタンスに付いてくることだけ知っておけば十分です。</p>

<h3>Amazon Lightsail と料金の話</h3>
<p>EC2 は非常に柔軟ですが選択肢が多く、初心者は戸惑いがちです。<b>Amazon Lightsail</b> はシンプル版です。仮想マシン、SSD ディスク、<b>データ転送の許容量</b>（data transfer allowance）がセットになった既成の「プラン」を、低額で予測しやすい<b>月額固定料金</b>で選びます。<b>WordPress</b> や人気のアプリケーション向けのワンクリックインストール用テンプレートも用意されています。ブログ、小規模なウェブサイト、テスト環境、クラウドの経験がない人に適しています。</p>
<table>
<tr><th></th><th>Amazon EC2</th><th>Amazon Lightsail</th></tr>
<tr><td>選択肢</td><td>非常に多い: 数百の instance type、ネットワークやディスクは自分で設定</td><td>いくつかの固定プラン。ディスクと data transfer 込み</td></tr>
<tr><td>料金</td><td>秒/時間単位、多数の購入モデル</td><td>月額のパッケージ料金</td></tr>
<tr><td>向いている用途</td><td>柔軟性、スケーリング、コントロールが必要なアプリケーション</td><td>小規模なウェブサイト、WordPress、初心者</td></tr>
</table>
<p>EC2 の料金について: On-Demand、Reserved Instances、Savings Plans、Spot Instances、Dedicated Hosts など多くの購入方法があります。この部分は <b>Domain 4</b> に属し、あとのレッスンで学びます。ここでは、デフォルトでは稼働時間に応じて支払い、前払いは不要であることだけ覚えておきましょう。</p>

<div class="box exam"><b>🎯 試験でよく問われること</b>
<ul>
<li>"resizable compute capacity in the cloud", "virtual servers" → <b>Amazon EC2</b>。EC2 は <b>IaaS</b> の例</li>
<li>"template that contains the OS and software to launch an instance" → <b>AMI</b></li>
<li>"memory-intensive workloads, in-memory databases" → <b>Memory optimized</b></li>
<li>"temporary block storage physically attached to the host" → <b>instance store</b></li>
<li>"virtual firewall for an EC2 instance" → <b>security group</b></li>
<li>"simple virtual private server with a predictable monthly price", "WordPress for a beginner, storage and data transfer included" → <b>Amazon Lightsail</b></li>
<li>"CPU-bound batch, video transcoding" → <b>Compute optimized</b>; "deep learning training, GPU" → <b>Accelerated computing</b>; "very high local IOPS" → <b>Storage optimized</b></li>
<li>"recommend optimal EC2 instance types" → <b>AWS Compute Optimizer</b></li>
</ul>
</div>
`,summary:["仮想マシンは物理サーバーから分割された独立したコンピューター。EC2 は仮想マシン（instance）を使用時間に応じて貸し出す。","EC2 は IaaS: お客様が OS、パッチ適用、ソフトウェア、security group の設定を自分で担当する。","AMI = OS + ソフトウェアを含む、インスタンス作成用のひな形。独自の AMI を自分で作成することもできる。","インスタンスの5グループ: general purpose（T は burstable、M）、compute optimized (C)、memory optimized (R, X)、storage optimized（I, D: 高いローカル IOPS）、accelerated computing（P, G: ML 向け GPU）。","Root volume は通常 EBS（永続的で、stop しても残る）。instance store は高速だが、stop/terminate するとデータが失われる。","Lightsail = シンプルな仮想マシン、月額固定料金。EC2 の料金モデルは Domain 4 で学ぶ。"],terms:[["Server","サーバー"],["Virtual machine (VM)","仮想マシン"],["Hypervisor","物理マシンを複数の仮想マシンに分割するソフトウェア"],["Instance","EC2 の仮想マシン1台"],["AMI (Amazon Machine Image)","インスタンスを作成するためのひな形"],["Instance type","インスタンスの種類/スペック"],["General purpose","汎用"],["Compute optimized","コンピューティング最適化"],["Memory optimized","メモリ最適化"],["Storage optimized","ストレージ最適化"],["Accelerated computing","高速コンピューティング (GPU)"],["Burstable instance","CPU を一時的にバーストできるインスタンス（T ファミリー）"],["IOPS","1秒あたりのディスク読み書き操作数"],["Amazon Lightsail","シンプルな仮想サーバー、月額パッケージ料金"],["Root volume","OS を格納するルートディスク"],["Instance store","物理マシンに直接接続された一時ディスク"],["Security group","セキュリティグループ。インスタンスレベルの仮想ファイアウォール"],["Terminate","インスタンスを完全に削除する"]]};
L.course["3-4"]={title:"コンテナとサーバーレス: ECS、EKS、ECR、Fargate、Lambda、Batch",goals:["コンテナとは何か、仮想マシンとどこが違うのかを理解する","Amazon ECS、Amazon EKS、Amazon ECR、AWS Fargate を区別する","サーバーレスと、AWS Lambda の仕組み・課金方法を理解する","EC2、コンテナ、Lambda、AWS Batch をそれぞれいつ選ぶかを知る"],html:`
<h3>コンテナとは？</h3>
<p>開発者はよくこう嘆きます。「自分のマシンでは動いたのに、なぜサーバーに載せるとエラーになるの？」。理由は環境の違いです。ソフトウェアのバージョン、ライブラリ、設定などが、場所ごとにばらばらだからです。</p>
<p><b>Container</b>（コンテナ）は、アプリケーションを<b>必要なものすべてと一緒に</b>（ライブラリ、設定、ツール）1つの標準的なかたまりにパッケージ化することで、この問題を解決します。そのかたまりは、開発者のマシンでも、会社のサーバーでも、AWS 上でも、どこで動かしても同じように動きます。最も普及しているコンテナツールが <b>Docker</b> です。</p>
<p>パッケージ化された「ひな形」を <b>container image</b>（コンテナイメージ）と呼びます。イメージを起動すると、稼働中のコンテナになります。</p>

<div class="box idea"><b>🧠 かんたんに言うと</b>
<p>貨物船に積まれる<b>輸送用コンテナ</b>を思い浮かべてください。コンテナが登場する前は、荷物の種類（木箱、米袋、バイク）ごとに積み下ろしの方法が違い、とても時間がかかりました。コンテナはサイズが規格化されていて、中に何を入れてもよく、どの船、クレーン、トラックでも積めます。ソフトウェアのコンテナも同じです。標準の形でパッケージ化され、どこへ運んでも動かせます。</p>
</div>

<h4>コンテナは仮想マシンとどう違うのか？</h4>
<p>仮想マシンは<b>専用の OS を丸ごと</b>含むため、重く（数 GB）、起動に数分かかります。コンテナはホストの <b>OS カーネルを共有</b>し、アプリケーションとライブラリだけを含むため、軽く、数秒で起動します。1台のサーバーで非常に多くのコンテナを動かせます。</p>
<table>
<tr><th></th><th>仮想マシン (VM)</th><th>コンテナ</th></tr>
<tr><td>中身</td><td>完全な OS + アプリケーション</td><td>アプリケーション + ライブラリ。OS カーネルは共有</td></tr>
<tr><td>サイズ</td><td>大きい</td><td>小さく軽い</td></tr>
<tr><td>起動</td><td>通常は数分</td><td>通常は数秒</td></tr>
<tr><td>AWS での例</td><td>Amazon EC2</td><td>Amazon ECS, Amazon EKS</td></tr>
</table>

<h3>区別すべき4つのコンテナサービス</h3>
<p>コンテナが数十、数百になると、どのコンテナをどのマシンで動かすか、故障したものを再起動するかを決める「調整役」が必要になります。これを <b>container orchestration</b>（コンテナオーケストレーション）と呼びます。</p>
<ul>
<li><b>Amazon ECS</b>（Elastic Container Service）: AWS が独自に開発したコンテナオーケストレーションサービスで、シンプルで AWS と深く統合されています。</li>
<li><b>Amazon EKS</b>（Elastic Kubernetes Service）: AWS が管理する <b>Kubernetes</b>（非常に普及しているオープンソースのコンテナオーケストレーションソフトウェア）を実行します。会社がすでに Kubernetes に慣れている場合や、他の環境と共通のツールを使いたい場合に EKS を選びます。</li>
<li><b>Amazon ECR</b>（Elastic Container Registry）: <b>container image</b> を保存・管理する「倉庫」です。ECS と EKS はここからイメージを取得して実行します。</li>
<li><b>AWS Fargate</b>: コンテナを <b>serverless</b>（サーバーレス）で実行するモードです。通常、ECS/EKS はコンテナを動かすための EC2 マシン群を必要とし、それらを自分で管理しなければなりません。Fargate では「コンテナに必要な CPU と RAM はどれだけか」を伝えるだけで、サーバーの部分は AWS が引き受けます。Fargate は ECS と EKS の両方で使えます。</li>
</ul>
<div class="flow"><span>アプリをイメージにパッケージ化</span><span>イメージを ECR に保存</span><span>ECS または EKS がオーケストレーション</span><span>EC2 または Fargate 上で実行</span></div>
<h4>ECS は EC2 上か、Fargate 上か？</h4>
<p>コンテナは何らかの「マシン」の上で動かす必要があります。ECS では、次の2つの <b>launch type</b>（起動タイプ）のどちらかを選びます。EKS にも同様の2つの選択肢（EC2 ノードまたは Fargate）があります。</p>
<table>
<tr><th></th><th>EC2 launch type</th><th>Fargate launch type</th></tr>
<tr><td>コンテナを動かすマシン</td><td><b>あなたの</b> EC2 instance。自分で見ることもログインすることもできる</td><td>AWS が担当し、サーバーは見えない</td></tr>
<tr><td>あなたが担当すること</td><td>instance type の選択、OS のパッチ適用、クラスター内のマシン数のスケーリング</td><td>コンテナの CPU と RAM を指定するだけ</td></tr>
<tr><td>選ぶ場面</td><td>instance type を正確に選ぶ必要がある（例: GPU）、<b>各ホストに監視/セキュリティ用の agent</b> をインストールする、深いレベルで制御したい</td><td>運用作業を最小限にしたい（least operational overhead）</td></tr>
</table>

<div class="box trap"><b>⚠️ よくあるひっかけ</b>
<p>ECR はコンテナを<b>実行しません</b>。<b>イメージを保存する</b>だけです。問題文に "Kubernetes" とあれば → 必ず <b>EKS</b>。"Run containers without managing servers / EC2 instances" → <b>Fargate</b> であり、単なる ECS や EKS ではありません。</p>
</div>

<h3>サーバーレスと AWS Lambda</h3>
<p><b>Serverless</b>（サーバーレス）は、サーバーが存在しないという意味ではありません。サーバーは存在しますが、<b>あなたがそれを目にしたり管理したりする必要がない</b>のです。スペックを選ばず、OS にパッチを当てず、スケーリングも気にしません。あなたはコードだけを担当し、通常はコードが実際に動いたときだけ料金を支払います。</p>
<p><b>AWS Lambda</b> は最も代表的なサーバーレスサービスです。<b>function</b>（関数）と呼ばれる小さなコードを書き、「いつ実行するか」を指定します。Lambda は <b>event-driven</b>（イベント駆動）で動作し、イベントが発生すると関数が実行されます。イベントの例: S3 にファイルがアップロードされた、API にリクエストが届いた、キューにメッセージが入った、あるいはスケジュールされた時刻になった、など。</p>
<ul>
<li><b>課金</b>: 関数の<b>呼び出し回数（request）</b>と<b>実行時間（duration）</b>、および割り当てたメモリ量に応じて課金されます。実行しなければ、ほとんど費用はかかりません。</li>
<li><b>自動スケーリング</b>: イベントが1件でも同時に 1,000 件でも、Lambda が必要な数のコピーを自動で実行します。</li>
<li><b>重要な制限</b>: 1回の実行は最大 <b>15 分</b>です。それより長い処理は Lambda に向きません。</li>
<li><b>あなたの責任</b>: コードのセキュリティと、関数への IAM 権限の付与。インフラ、OS、runtime は AWS が担当します。</li>
</ul>
<p>Lambda は唯一のサーバーレスサービスではありません。ほかにも「サーバーの管理が不要で、自動でスケールする」サービスがあります。<b>AWS Fargate</b>、<b>Amazon DynamoDB</b>（NoSQL データベース）、<b>Amazon S3</b>、<b>Amazon SQS</b>、<b>Amazon SNS</b>、<b>Amazon API Gateway</b>、<b>Amazon Aurora Serverless</b> です。逆に、<b>Amazon EC2</b> と通常版の <b>Amazon RDS</b>（インスタンスを自分で選ぶ）はサーバーレスでは<b>ありません</b>。</p>

<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b>
<p>バースデーケーキを注文するお客さんは、ケーキの表面にプリントする写真をよくアップロードします。元の画像はとても大きなサイズです。ミンさんは Lambda 関数を書きました。新しい画像が S3 にアップロードされるたびに（イベント）、関数が自動で画像を縮小し、小さい版を保存します。1日に 30 枚の画像があれば 30 回実行され、1回あたり数秒です。ランさんが支払うのはちょうどその分だけで、昼夜動き続けるサーバーを維持する必要はありません。</p>
<p>一方、新しい注文アプリについては、ミンさんのチームがコンテナにパッケージ化し、イメージを ECR に push して、EC2 マシンを管理しなくて済むよう Fargate 上の ECS で実行しています。</p>
</div>

<h3>AWS Batch とコンピューティングサービスの選び方</h3>
<p><b>AWS Batch</b> は <b>batch job</b>（バッチジョブ）の実行に使います。バックグラウンドで動く数百、数千の計算タスクのことで、たとえば1か月分のデータ処理、レンダリング、シミュレーションなどです。ジョブをキューに送ると、Batch が適切なマシンの種類と台数を自動で選び（EC2、Spot、Fargate を利用可能）、実行が終わるとリソースを回収します。Lambda と違い、Batch のジョブは 15 分より長く実行できます。</p>
<table>
<tr><th>選択肢</th><th>あなたが管理するもの</th><th>向いている場面</th></tr>
<tr><td><b>Amazon EC2</b></td><td>OS、ソフトウェア、スケーリング</td><td>サーバーを完全にコントロールしたい、特殊なソフトウェアがある、長期間実行する</td></tr>
<tr><td><b>EC2 上の ECS / EKS</b></td><td>コンテナと EC2 マシンのクラスター</td><td>アプリケーションがコンテナ化済みで、基盤のマシンをコントロールしたい</td></tr>
<tr><td><b>Fargate 上の ECS / EKS</b></td><td>コンテナだけ</td><td>サーバーを管理せずにコンテナを実行したい</td></tr>
<tr><td><b>AWS Lambda</b></td><td>コードだけ</td><td>短い処理（最大 15 分）、イベントに応じて実行、トラフィックが不規則</td></tr>
<tr><td><b>AWS Batch</b></td><td>ジョブの定義</td><td>非常に多くのバッチ計算タスク。長時間の実行も可能</td></tr>
</table>

<div class="box exam"><b>🎯 試験でよく問われること</b>
<ul>
<li>"run code without provisioning or managing servers, pay only for compute time" → <b>AWS Lambda</b></li>
<li>"run containers without managing servers or clusters of EC2 instances" → <b>AWS Fargate</b></li>
<li>"store and manage Docker container images" → <b>Amazon ECR</b></li>
<li>"Kubernetes" → <b>Amazon EKS</b>; "run and scale containers on AWS"（Kubernetes に言及なし） → 通常は <b>Amazon ECS</b></li>
<li>"hundreds of thousands of batch computing jobs" → <b>AWS Batch</b></li>
<li>15 分より長く実行される処理（例: 3 時間のジョブ） → Lambda は選ば<b>ない</b></li>
<li>"create a thumbnail each time a photo is uploaded to S3, long idle periods" → <b>Lambda + S3 event notification</b></li>
<li>"containers, no instance types, no patching, no cluster scaling" → <b>Fargate launch type の ECS</b>; "agent on every host, choose exact instance types" → <b>EC2 launch type の ECS</b></li>
<li>"which services are serverless" → Lambda, Fargate, DynamoDB, S3, SQS, SNS…（EC2 ではない）</li>
<li>Lambda: お客様は function の<b>コードと IAM 権限</b>に責任を負う</li>
</ul>
</div>
`,summary:["コンテナはアプリケーションをライブラリと一緒にパッケージ化し、どこでも同じように動く。仮想マシンより軽く、起動も速い。","ECS = AWS のコンテナオーケストレーション。EKS = マネージド型の Kubernetes。ECR = container image を保存するレジストリ。","Fargate = コンテナをサーバーレスで実行し、ECS と EKS の両方で使える。instance type を自分で選びたい、または各ホストに agent をインストールしたい場合は EC2 launch type。","Serverless = サーバーを管理する必要がない。Lambda はイベントに応じてコードを実行し、request 数と実行時間で課金され、最大 15 分。","AWS Batch は大量のバッチ処理ジョブを実行し、適切なリソースを自動でプロビジョニングする。","完全なコントロールが必要なら EC2、コンテナ化済みならコンテナ、イベント駆動の短い処理には Lambda を選ぶ。"],terms:[["Container","アプリケーションをライブラリと一緒にパッケージ化したもの"],["Container image","コンテナのパッケージ化されたひな形"],["Docker","広く使われているコンテナツール"],["Container orchestration","コンテナオーケストレーション（コンテナの調整・管理）"],["Kubernetes","オープンソースのコンテナオーケストレーションソフトウェア"],["Amazon ECS","AWS のコンテナオーケストレーションサービス"],["Amazon EKS","マネージド型の Kubernetes サービス"],["Amazon ECR","container image を保存するレジストリ"],["AWS Fargate","サーバーを管理せずにコンテナを実行"],["Serverless","サーバーレス（サーバーを管理する必要がない）"],["Function","関数。Lambda 上で実行されるコード"],["Event-driven","イベント駆動"],["Batch job","バッチジョブ（まとめて処理する作業）"],["Launch type","コンテナの起動タイプ: EC2 上または Fargate 上"]]};
})();
(function(){var I=window.CLF_I18N=window.CLF_I18N||{};var L=I.ja=I.ja||{};['q','course','lessons','glossary','services','domains','ui'].forEach(function(k){L[k]=L[k]||{};});
L.course["3-5"]={title:"伸縮と負荷分散: Auto Scaling、Elastic Load Balancing",goals:["scale up（マシンの増強）と scale out（マシンの追加）を区別する","Amazon EC2 Auto Scaling がどのように伸縮性（elasticity）をもたらすかを理解する","Elastic Load Balancing がどのように負荷を分散し、ヘルスチェック（health check）を行うかを理解する","Auto Scaling、ELB、マルチ AZ が連携して、負荷に耐えつつ高可用性を実現する仕組みを理解する"],html:`
<h3>課題: アクセス数は多いときも少ないときもある</h3>
<p>Web サイトのアクセス数が一定であることはありません。夜は少なく、昼は多く、祝日には何十倍にも膨れ上がります。最も混雑する日に合わせてサーバーを用意すると、ほとんどの時間はマシンが遊んでいて、お金の無駄になります。少なめに用意すると、混雑する日に Web サイトが落ちてしまいます。</p>
<p>クラウドはこれを 2 つの考え方で解決します。<b>scaling</b>（処理能力の伸縮）と <b>load balancing</b>（負荷分散）です。</p>

<h3>scale up と scale out</h3>
<ul>
<li><b>Scale up</b> / <b>vertical scaling</b>（垂直スケーリング）: 今あるマシンを<b>より高性能な</b>マシン（CPU や RAM が多いもの）に置き換えます。シンプルですが、限界があり（最も高性能なマシンにも上限があります）、多くの場合は切り替えのために一時停止が必要で、しかもマシンは 1 台のままなので、壊れたらそれで終わりです。</li>
<li><b>Scale out</b> / <b>horizontal scaling</b>（水平スケーリング）: 並列で動く<b>マシンを追加</b>します。ほぼ無制限に拡張でき、1 台が壊れても他のマシンは動き続けます。その逆が <b>scale in</b> で、アクセスが少ないときにマシンを減らします。</li>
</ul>

<div class="box idea"><b>🧠 かんたんに言うと</b>
<p>ケーキ店が混雑しているとします。scale up は、レジ係を会計がものすごく速い人に替えることです。限界がありますし、その人が病気で休めば店は麻痺します。scale out は、レジを増やすことです。混んでいれば 5 台開け、空いていれば 1 台だけにします。そして <b>load balancer</b> は、入口に立って「3 番レジが空いていますので、そちらへどうぞ」と案内する人です。閉まっているレジがあれば、そこにはもうお客様を案内しません。</p>
</div>

<h3>Amazon EC2 Auto Scaling</h3>
<p><b>Amazon EC2 Auto Scaling</b> は、<b>負荷が増えたらインスタンスを追加し、負荷が減ったらインスタンスを減らす</b>ことを自動で行います。これこそが <b>elasticity</b>（伸縮性）であり、クラウドの中核となるメリットの 1 つです。そのとき必要な分のリソースだけを使い、その分だけ料金を支払えばよく、キャパシティを「事前に推測」する必要がありません（stop guessing capacity）。</p>
<p><b>Auto Scaling group</b>（自動で伸縮するグループ）を作成し、3 つの数値を設定します。</p>
<ul>
<li><b>Minimum</b>（最小）: アクセスが少ないときでも、常に最低これだけのインスタンスを維持します。</li>
<li><b>Desired</b>（希望）: 現時点で稼働しているべきインスタンス数です。</li>
<li><b>Maximum</b>（最大）: コストを管理するため、これを超えることは決してありません。</li>
</ul>
<p>次に、スケーリングのルールを設定します。</p>
<ul>
<li><b>Dynamic scaling</b>（動的スケーリング）。例えば <b>target tracking</b> では「平均 CPU 使用率を 50% 前後に保つ」と指定します。負荷が増えた<b>後で</b>反応します。</li>
<li><b>Scheduled scaling</b>（スケジュールに基づくスケーリング）: 「毎週金曜の 19:00 に 6 台に増やす」。<b>時刻があらかじめ分かっている</b>ピークに向いています。新しいインスタンスは準備が整うまで数分かかるため、スケジュールを設定しておけば、お客様が押し寄せる<b>前に</b>十分な台数を確保できます。</li>
<li><b>Predictive scaling</b>（予測スケーリング）: machine learning で過去の負荷の履歴から学習し、繰り返し発生する周期の前にマシンを増やします。</li>
</ul>
<p>さらに、Auto Scaling には<b>自己修復</b>の役割もあります。インスタンスが 1 台故障すると、新しいインスタンスに自動で置き換えて、希望する台数（desired）を維持します。新しいインスタンスは通常、AMI、インスタンスタイプ、security group などを指定した <b>launch template</b> から作成されます。</p>
<p>技術的な注意点: Auto Scaling は<b>デフォルトでは</b> <b>EC2 status checks</b>（マシンが動いているか、ハードウェアに障害がないか）だけを使います。load balancer が正常でないと報告したインスタンス（例えば、マシンは動いているのにアプリケーションがハングしている場合）も Auto Scaling に置き換えさせたいなら、Auto Scaling group で <b>ELB health checks を有効にする</b>必要があります。</p>
<p>障害時に自動で復旧し、需要に応じてキャパシティを自動調整することは、まさに Well-Architected フレームワーク（レッスン 1-4）の <b>Reliability</b>（信頼性）の柱の原則である "automatically recover from failure"、"stop guessing capacity"、"scale horizontally" にあたります。ELB + Auto Scaling を複数の AZ にまたがって配置することが、これらの原則を実現する方法です。</p>

<h3>Elastic Load Balancing</h3>
<p>インスタンスが複数あるとき、お客様はどこにアクセスすればよいのでしょうか。背後のマシンにリクエストを振り分ける、ただ 1 つの「入口」が必要です。それが <b>load balancer</b>（ロードバランサー）です。AWS のサービスは <b>Elastic Load Balancing (ELB)</b> で、AWS が管理し、トラフィックに応じて自動的にスケールします。</p>
<p>ELB は継続的に <b>health check</b>（ヘルスチェック）を行い、各インスタンスに定期的に「様子を尋ね」ます。正しく応答しないインスタンスは正常でないとみなされ、ELB は回復するまでそこへお客様を送るのをやめます。</p>
<p>主な load balancer の種類:</p>
<table>
<tr><th>種類</th><th>特徴</th><th>適した用途</th></tr>
<tr><td><b>Application Load Balancer</b> (ALB)</td><td>HTTP/HTTPS の内容を理解し、<b>URL パス</b>（/api、/images）やドメイン名に基づいて別々のマシングループに振り分けられる</td><td>Web サイト、Web アプリケーション、microservices</td></tr>
<tr><td><b>Network Load Balancer</b> (NLB)</td><td>TCP/UDP レベルで動作し（独自プロトコルも含む）、<b>毎秒数百万のリクエスト</b>を処理でき、レイテンシーが極めて低く、<b>静的 IP アドレス</b>（static IP）を持てる</td><td>ゲーム、金融取引、非常に高いネットワーク性能が必要なアプリケーション、ファイアウォールを開けるために固定 IP が必要な取引先</td></tr>
<tr><td><b>Gateway Load Balancer</b> (GWLB)</td><td>トラフィックを<b>透過的に</b>（transparent）<b>サードパーティーの仮想ネットワークアプライアンス</b>群（通常は AWS Marketplace で購入）に通し、同時にそのアプライアンス群のスケーリングと高可用性も支える</td><td>ファイアウォール、侵入検知/防止システム、パケット検査</td></tr>
</table>
<p>核心となるポイント: ELB は「1 つまたは複数の AZ にある複数のターゲット（EC2、コンテナ、IP、Lambda）にトラフィックを自動的に分散」します。最近の試験では、上の表のキーワードから<b>正しい種類</b>の load balancer を選ぶ問題も出るので、3 つとも覚えておきましょう。</p>

<h3>組み合わせる: Auto Scaling + ELB + マルチ AZ</h3>
<p>この 3 つは、標準的なアーキテクチャとして一緒に使われるのが一般的です。</p>
<div class="flow"><span>お客様</span><span>Elastic Load Balancer</span><span>AZ-a と AZ-b にまたがる Auto Scaling group</span><span>EC2 インスタンス群</span></div>
<ul>
<li><b>ELB</b> は唯一の入口で、正常なインスタンスにお客様を均等に振り分けます。</li>
<li><b>Auto Scaling</b> は負荷に応じてインスタンスを追加・削減し、新しいインスタンスを ELB に自動登録します。</li>
<li><b>Multi-AZ</b>: Auto Scaling group を複数の AZ にまたがって配置します。1 つの AZ で障害が起きると、ELB はすべてのお客様を残りの AZ に切り替え、Auto Scaling は正常な AZ でインスタンスを補充します。</li>
</ul>
<p>その結果、<b>scalable</b>（増えた負荷に耐えられる）、<b>elastic</b>（自動で伸縮する）、<b>highly available</b>（高可用性）のすべてを満たせます。</p>

<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b>
<p>昨年、BanhNgon は Black Friday の割引キャンペーンを行いました。Web サイトのサーバーは 1 台だけで、夜 8 時にお客様が押し寄せると、Web サイトは完全に固まってしまいました。ランさんは一晩分の売上を失いました。</p>
<p>今年は ミンさんが作り直しました。前段に Application Load Balancer を 1 つ置き、その後ろに 2 つの AZ にまたがる Auto Scaling group を配置し、インスタンスは min 2、max 10、ルールは「CPU を 50% 程度に保つ」です。Black Friday の夜、CPU が急上昇すると、Auto Scaling が自動で 8 インスタンスまで増やし、ELB がお客様を均等に振り分けました。夜中にインスタンスが 1 台故障しましたが、health check が検知し、ELB はそこへお客様を送るのをやめ、Auto Scaling が新しいマシンに置き換えました。翌朝アクセスが減ると、システムは自動で 2 インスタンスに戻りました。ランさんが支払うのは、8 台で動かした数時間分だけです。</p>
</div>

<div class="box trap"><b>⚠️ よくあるひっかけ</b>
<p><b>Auto Scaling</b> はインスタンスの<b>数</b>を変えます（マシンの追加、削減、故障したマシンの置き換え）。<b>ELB</b> は<b>トラフィックの分散</b>と health check を行いますが、<b>それ自体が新しいインスタンスを作ることはありません</b>。この 2 つのサービスは選択肢の中でよく入れ替えられます。また、<b>scalability</b>（大きな負荷に対応するために拡張できる能力）と <b>elasticity</b>（実際の需要に応じて自動的に増減すること）を区別しましょう。"automatically acquire and release resources" と問われたら <b>elasticity</b> です。</p>
</div>

<div class="box exam"><b>🎯 試験でよく問われること</b>
<ul>
<li>"automatically add EC2 instances during peak hours and remove them when traffic decreases" → <b>Amazon EC2 Auto Scaling</b></li>
<li>"automatically distributes incoming traffic across multiple EC2 instances" → <b>Elastic Load Balancing</b></li>
<li>"route traffic only to healthy instances" → ELB の <b>health checks</b>、"replace instances that fail health checks" → <b>Auto Scaling</b></li>
<li>"predictable peak at a fixed time, add capacity before it" → <b>scheduled scaling</b></li>
<li>"route by URL path (/api, /images)"、HTTP/HTTPS → <b>Application Load Balancer</b></li>
<li>"custom TCP protocol, millions of requests per second, static IP" → <b>Network Load Balancer</b></li>
<li>"third-party firewall / virtual appliances, transparent, scale" → <b>Gateway Load Balancer</b></li>
<li>"acquire resources when demand increases and release when demand decreases" → <b>elasticity</b></li>
<li>"overprovisioning for peaks leaves resources idle" → <b>stop guessing capacity</b> というメリット</li>
<li>"keep running if one Availability Zone fails" → <b>multi-AZ</b> 構成でのデプロイ（high availability）</li>
</ul>
</div>
`,summary:["Scale up = より高性能なマシンに替える（限界あり）、scale out = 並列でマシンを追加する（柔軟で、障害に強い）。","EC2 Auto Scaling は負荷に応じてインスタンスを自動で追加・削減し、台数を min と max の間に保ち、故障したインスタンスを自動で置き換える。","Elasticity = 需要に応じてリソースを自動的に増減させ、使った分だけ支払うこと。","Elastic Load Balancing はトラフィックを複数のターゲットに分散し、health check を使って正常なインスタンスだけに送る。","スケーリングの方法は target tracking（動的）、scheduled（時刻が事前に分かっているピーク）、predictive（ML による予測）。","主な種類: Application（HTTP/HTTPS、URL パスで振り分け）、Network（TCP/UDP、毎秒数百万リクエスト、静的 IP）、Gateway（サードパーティーのセキュリティアプライアンス）。","ELB + Auto Scaling + マルチ AZ = 伸縮性と高可用性を兼ね備えたアーキテクチャ。"],terms:[["Scale up / vertical scaling","垂直スケーリング（より高性能なマシンにする）"],["Scale out / horizontal scaling","水平スケーリング（マシンを追加する）"],["Scale in","縮小、マシンを減らすこと"],["Elasticity","自動的な伸縮性"],["Scalability","スケーラビリティ（拡張できる能力）"],["Auto Scaling group","自動で伸縮するインスタンスのグループ"],["Launch template","新しいインスタンスを作成するための設定テンプレート"],["Load balancer","ロードバランサー（負荷分散装置）"],["Elastic Load Balancing (ELB)","AWS の負荷分散サービス"],["Health check","ヘルスチェック（正常性の確認）"],["Application Load Balancer","HTTP/HTTPS 向けのロードバランサー"],["Network Load Balancer","TCP/UDP 向けのロードバランサー"],["Target tracking","ある指標を目標値に保つルール"],["Scheduled scaling","事前に決めたスケジュールに基づくスケーリング"],["Gateway Load Balancer","トラフィックをサードパーティーの仮想ネットワークアプライアンスに通す"]]};
L.course["3-6"]={title:"Amazon S3 によるオブジェクトストレージ",goals:["3 種類のストレージ（object、block、file）を区別する","bucket、object、イレブンナイン（11 個の 9）の耐久性、S3 の代表的な用途を理解する","アクセス頻度とデータ取り出しの速さに応じて、適切な S3 storage class を選ぶ","lifecycle policy、versioning、そして S3 のコストに影響する要素を知る"],html:`
<h3>3 種類のストレージ: object、block、file</h3>
<p>S3 を学ぶ前に、データの保存方法には 3 つの異なる方式があることを知っておく必要があります。</p>
<ul>
<li><b>Block storage</b>（ブロックストレージ）: データをディスク上の小さなブロックに分割して保存します。パソコンの中のハードディスクのようなものです。OS がディスクをアタッチして直接読み書きするので、非常に高速です。AWS では <b>Amazon EBS</b>。</li>
<li><b>File storage</b>（ファイルストレージ）: データをフォルダとファイルで整理し、複数のマシンから同時にアクセスできます。オフィスの共有ネットワークドライブのようなものです。AWS では <b>Amazon EFS</b>、<b>Amazon FSx</b>。</li>
<li><b>Object storage</b>（オブジェクトストレージ）: 各ファイルは、データ、<b>metadata</b>（説明情報）、一意のキー（名前）からなる 1 つの <b>object</b> です。インターネット経由で API を使ってアクセスし、容量はほぼ無制限です。AWS では <b>Amazon S3</b>。</li>
</ul>

<div class="box idea"><b>🧠 かんたんに言うと</b>
<p>Block storage は、自分のパソコンに取り付けたハードディスクのようなものです。File storage は、部署全体で使う共有の書類棚のようなもので、引き出しやフォルダがあり、誰でも開けられます。Object storage は<b>荷物預かりサービス</b>のようなものです。荷物を 1 つ渡すと番号札を受け取り、取り出したいときはその番号を渡します。倉庫には数え切れないほどの荷物を保管でき、どの棚に置かれているかを知る必要はありません。</p>
</div>

<h3>Amazon S3: bucket と object</h3>
<p><b>Amazon S3</b>（Simple Storage Service）は AWS のオブジェクトストレージサービスです。基本となる概念は 2 つあります。</p>
<ul>
<li><b>Bucket</b>（バケット）: object を入れる場所です。bucket 名は<b>デフォルトでは</b><b>全世界で一意</b>でなければならず（誰とも重複できません）、bucket は自分で選んだ 1 つのリージョンに作成されます。（2026 年 3 月から、S3 に <i>account regional namespace</i> というオプションが加わりました。bucket 名にアカウント ID とリージョンを付けることで、他人に名前を取られないようにするものです。試験では、答えは引き続き "globally unique" です。）</li>
<li><b>Object</b>: 保存する 1 つ 1 つのファイル（画像、動画、バックアップファイル、ドキュメントなど）です。1 つの object は最大 50 TB（2025 年 12 月より前は 5 TB — 古い資料にはこの数字が書かれていることがあります）で、bucket 内の object 数に制限はありません。1 回のアップロード操作（single PUT）で送れるのは最大 <b>5 GB</b> までで、それより大きいファイルは <b>multipart upload</b>（複数のパートに分割して並列でアップロードする方法）を使う必要があります。</li>
</ul>
<p>S3 は <b>99.999999999%</b>（<b>イレブンナイン</b>、durability）の耐久性で有名です。ざっくり言えば、S3 がデータを複数の場所に自動的に複製するため、保存したデータが失われることはほぼありません。なお、<b>durability</b>（耐久性、データが失われないこと）は <b>availability</b>（可用性、必要なときにすぐアクセスできること）とは異なる点に注意してください。</p>
<p>代表的な用途:</p>
<ul>
<li><b>Static website hosting</b>: サーバーなしで静的 Web サイト（HTML、画像、CSS）をホストします。</li>
<li><b>Backup and restore</b>: バックアップの保存、長期保管。</li>
<li><b>Data lake</b>（データレイク）: あらゆる種類のデータを 1 か所に集め、後で分析します（例えば Amazon Athena を使って S3 上で直接 SQL クエリを実行する）。</li>
<li>アプリケーション用の画像や動画の保存、CloudFront がコンテンツを配信するためのオリジンとしての利用。</li>
</ul>

<h3>storage class: 使い方に応じて支払う</h3>
<p>すべてのデータが頻繁に開かれるわけではありません。S3 には複数の <b>storage class</b>（ストレージクラス）があります。共通の原則は、<b>アクセスが少ないほど保存料金は安くなるが、データの取り出し料金が高くなるか、待ち時間が長くなる</b>ということです。</p>
<table>
<tr><th>Storage class</th><th>特徴</th><th>使う場面</th></tr>
<tr><td><b>S3 Standard</b></td><td>デフォルト。高速にアクセスでき、複数の AZ に保存</td><td>頻繁に使うデータ: 商品画像、Web サイト</td></tr>
<tr><td><b>S3 Intelligent-Tiering</b></td><td>実際のアクセス状況に応じて、object ごとに階層間を自動で移動。object 数に応じた少額のモニタリング料金はあるが、データ取り出し料金は<b>なく</b>、運用の手間も不要</td><td>アクセス頻度が事前に分からない、または変化する場合。よく読まれるものもあれば、めったに読まれないものもあるとき</td></tr>
<tr><td><b>S3 Standard-IA</b> (Infrequent Access)</td><td>Standard より安く、データ取り出し料金がかかる。複数の AZ に保存</td><td>あまり使わないが、必要なときはすぐ取り出したい: 最近のバックアップ</td></tr>
<tr><td><b>S3 One Zone-IA</b></td><td>Standard-IA と同様だが、<b>1 つの AZ</b> のみに保存し、より安い</td><td>あまり使わず、失っても簡単に作り直せるもの: 副次的なコピー、サムネイル画像</td></tr>
<tr><td><b>S3 Glacier Instant Retrieval</b></td><td>長期保管向けで、<b>ミリ秒</b>で取り出せる。ほとんど読まない場合は Standard-IA より安い</td><td>アクセスはごくまれ（四半期に 1 回程度）だが、すぐに取り出す必要がある: 医療画像、古い記録の画像</td></tr>
<tr><td><b>S3 Glacier Flexible Retrieval</b></td><td>取り出しは<b>数分</b>（expedited、料金は高め）から<b>数時間</b>（standard、bulk）</td><td>年に 1〜2 回読むアーカイブやバックアップ。通常は数時間待てるが、たまに数分で急ぎ取り出したい場合</td></tr>
<tr><td><b>S3 Glacier Deep Archive</b></td><td><b>最も安い</b>。取り出しには約 <b>12〜48 時間</b>かかる（standard は 12 時間以内、bulk は 48 時間以内）</td><td>規制遵守のために何年も保管し、ほぼ開くことがないデータ</td></tr>
</table>

<div class="box trap"><b>⚠️ よくあるひっかけ</b>
<p>"Unknown or changing access patterns" → <b>Intelligent-Tiering</b>。"Lowest cost archive, retrieval within 12–48 hours is acceptable" → <b>Glacier Deep Archive</b>。"Infrequently accessed, can be recreated, lowest cost" → <b>One Zone-IA</b>。"Rarely accessed (once a quarter) but needs milliseconds" → <b>Glacier Instant Retrieval</b>。"Read once or twice a year, minutes for rare urgent cases, hours otherwise" → <b>Glacier Flexible Retrieval</b>。One Zone-IA は 1 つの AZ にしかなく、その AZ が災害に遭うとデータが失われる可能性があるため、唯一の重要なデータには使わないことを覚えておきましょう。</p>
</div>

<h3>lifecycle policy と versioning</h3>
<h4>Lifecycle policy: 自動で「倉庫を移す」</h4>
<p><b>S3 Lifecycle configuration</b>（ライフサイクル設定）は自動化のルールで、2 種類のアクションがあります。<b>transition</b>（X 日後に object をより安い storage class に移行する）と <b>expiration</b>（Y 日後に object を削除する）です。一度設定すれば S3 がずっと自動で実行してくれるので、誰かが覚えておかなくてもコストを節約できます。</p>
<div class="flow"><span>0 日目: S3 Standard</span><span>30 日後: Standard-IA</span><span>90 日後: Glacier Flexible Retrieval</span><span>5 年後: 削除</span></div>
<h4>Versioning: バージョンを残す</h4>
<p>bucket で <b>versioning</b>（バージョニング）を有効にすると、object を上書きするたびに、S3 は古いバージョンを残します。削除したときも、S3 は「削除マーカー」を付けるだけなので、復元できます。誤削除や誤上書きを防ぐのにとても役立ちます。versioning は <b>replication</b>（別の bucket への自動複製。別のリージョンの bucket も可）機能を使うための前提条件でもあります。</p>

<h3>データ保護と、試験によく出る S3 の機能</h3>
<table>
<tr><th>機能</th><th>何をするか</th><th>使う場面</th></tr>
<tr><td><b>S3 Versioning</b></td><td>object の古いバージョンをすべて保持する</td><td>誤削除、誤上書きの防止</td></tr>
<tr><td><b>MFA Delete</b></td><td>バージョンを完全に削除したり versioning を無効にしたりする際に、<b>MFA</b>（多要素認証）コードの入力を必須にする。事前に versioning の有効化が必要</td><td>誤削除や悪意ある削除を防ぐロックをもう 1 段追加する</td></tr>
<tr><td><b>S3 Object Lock</b></td><td>一定の保持期間中、object を <b>WORM</b>（write once, read many: 一度書き込んだら読み取り専用）モデルでロックする。versioning が必要</td><td>法律上、改変せずに保管しなければならない記録（財務、法務）</td></tr>
<tr><td><b>Cross-Region Replication (CRR)</b> / <b>Same-Region Replication (SRR)</b></td><td>新しい object を<b>別のリージョン</b>の bucket（CRR）または同じリージョンの bucket（SRR）に自動で複製する</td><td>コンプライアンス、災害対策、別のリージョンのユーザーに対するレイテンシーの低減</td></tr>
<tr><td><b>S3 Transfer Acceleration</b></td><td>最寄りの <b>edge location</b> に入ってから AWS のプライベートネットワークを通ることで、長距離のアップロードを高速化する</td><td>bucket のリージョンから遠く離れたユーザーが大きなファイルをアップロードする場合</td></tr>
<tr><td><b>Block Public Access</b> とデフォルトの暗号化</td><td>意図しない bucket の公開をブロックする。新しい object はあらかじめ暗号化される（SSE-S3）</td><td>基本的なセキュリティ。新しい bucket ではデフォルトで有効</td></tr>
</table>
<p>Object Lock には 2 つのモードがあります。<b>governance mode</b>（特別な権限を持つユーザーはロックを解除できる）と <b>compliance mode</b>（期限が来るまで<b>誰も</b>削除も変更もできない。アカウントの root user であっても同じ）です。問題文に "no one, including the root user" とあれば → <b>compliance mode</b>。</p>

<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b>
<p>ミンさんは S3 をさまざまな用途に使っています。Web サイトの商品画像は、お客様が絶えず閲覧するので <b>S3 Standard</b> に置いています。データベースの日次バックアップは S3 に入れ、lifecycle を設定しています。30 日後に <b>Standard-IA</b> へ、90 日後に <b>Glacier Flexible Retrieval</b> へ移行します。法律で何年も保管しなければならない請求書や会計書類は、ほぼ開くことがないので、最も安い <b>Glacier Deep Archive</b> に入れています。</p>
<p>あるとき、スタッフがうっかり新しい価格表のファイルを古い価格表に上書きアップロードしてしまいました。bucket で versioning を有効にしていたおかげで、ミンさんは 1 分で古いバージョンを取り戻せました。</p>
</div>

<h3>S3 のコストはどう計算される?</h3>
<p>S3 の請求額に影響する主な要素:</p>
<ul>
<li><b>保存するデータ量</b>（月あたりの GB 単位）と、選択した <b>storage class</b>。</li>
<li><b>request の数</b>（読み取り、書き込み、一覧表示などのリクエスト）と、IA/Glacier クラスでのデータ取り出し料金。</li>
<li><b>Data transfer out</b>: インターネットへ（または別のリージョンへ）<b>出ていく</b>データには料金がかかります。</li>
<li><b>Data transfer in</b>: インターネットから S3 に<b>入れる</b>データは<b>無料</b>です。</li>
</ul>
<p>料金の詳細は Domain 4 で学びます。</p>

<div class="box exam"><b>🎯 試験でよく問われること</b>
<ul>
<li>"object storage"、"store and retrieve any amount of data"、"static website" → <b>Amazon S3</b></li>
<li>"99.999999999% durability" → <b>Amazon S3</b>（イレブンナイン）</li>
<li>"rarely accessed archive, retrieval within 12–48 hours acceptable, lowest cost" → <b>S3 Glacier Deep Archive</b></li>
<li>"unknown or changing access patterns" → <b>S3 Intelligent-Tiering</b></li>
<li>"move objects to Glacier after 90 days and delete after 5 years" → <b>S3 Lifecycle configuration</b></li>
<li>"protect against accidental deletion or overwrite" → <b>S3 Versioning</b>（+ <b>MFA Delete</b>）</li>
<li>"write-once-read-many (WORM)"、"retention period" → <b>S3 Object Lock</b>、"no one, including root, can delete" → <b>compliance mode</b></li>
<li>"automatically copy every new object to a bucket in another Region" → <b>S3 Cross-Region Replication</b></li>
<li>"faster uploads from distant users over long distances" → <b>S3 Transfer Acceleration</b></li>
<li>"rarely accessed, millisecond retrieval, lowest cost" → <b>S3 Glacier Instant Retrieval</b></li>
<li>Lifecycle でできることは? → より安いクラスへの <b>transition</b> と、あらかじめ設定した日数後の <b>expire</b>（削除）</li>
<li>"factors that affect S3 cost" → <b>amount of data stored</b>、<b>requests</b>、<b>data transfer out</b>（data in は無料）</li>
</ul>
</div>
`,summary:["3 種類のストレージ: block（EBS）、file（EFS、FSx）、object（S3）。","S3 は object を bucket に保存する。bucket 名は全世界で一意、bucket は 1 つのリージョン内にあり、耐久性はイレブンナイン。","S3 は静的 Web サイト、バックアップ、data lake、アプリケーション用の画像・動画の保存に使う。","Storage class: Standard、Intelligent-Tiering、Standard-IA、One Zone-IA、Glacier Instant/Flexible Retrieval、Glacier Deep Archive（最も安い）。","Lifecycle policy は時間の経過に応じて object をより安いクラスへ自動で移行（transition）または削除（expiration）する。versioning は古いバージョンを保持し、誤削除を防ぐ。","データ保護: MFA Delete、Object Lock（WORM。compliance mode では root でも削除できない）、Cross-Region Replication。Transfer Acceleration は遠隔地からのアップロードを高速化する。","S3 のコスト: 保存容量、request、data transfer out。data transfer in は無料。"],terms:[["Object storage","オブジェクトストレージ"],["Block storage","ブロックストレージ"],["File storage","ファイルストレージ"],["Bucket","バケット（S3 で object を入れる入れ物）"],["Object","オブジェクト（S3 に保存する 1 つのファイル）"],["Metadata","メタデータ（データを説明する情報）"],["Durability","耐久性（データが失われないこと）"],["Availability","可用性（必要なときにアクセスできること）"],["Storage class","ストレージクラス"],["Infrequent Access (IA)","低頻度アクセス"],["Archive","アーカイブ（長期保管）"],["Lifecycle configuration","ライフサイクル設定"],["Versioning","バージョニング"],["Data lake","データレイク"],["Data transfer out","外部へ転送されるデータ（データ転送アウト）"],["WORM (Write Once, Read Many)","一度書き込んだら読み取り専用で、変更・削除できない"],["S3 Object Lock","保持期間中、object を WORM 方式でロックする"],["MFA Delete","object のバージョンを完全に削除する際に MFA コードを要求する"],["Cross-Region Replication (CRR)","object を別のリージョンへ自動で複製する"],["S3 Transfer Acceleration","edge location 経由で S3 へのアップロードを高速化する"]]};
L.course["3-7"]={title:"ディスク、共有ファイル、バックアップとディザスタリカバリ",goals:["Amazon EBS、snapshot、そして instance store との違いを理解する","Amazon EFS（Linux、NFS）と Amazon FSx（Windows File Server やその他のファイルシステム）を区別する","AWS Storage Gateway がハイブリッド構成で使われることを知る","AWS Backup と AWS Elastic Disaster Recovery、および基本的なディザスタリカバリ戦略を知る"],html:`
<h3>Amazon EBS: 仮想サーバーのためのハードディスク</h3>
<p>EC2 のレッスンで、各インスタンスにはディスクが必要だと学びました。<b>Amazon EBS</b>（Elastic Block Store）は、ネットワーク経由で EC2 にアタッチする <b>block storage</b> タイプのディスクを提供します。EBS のディスク 1 つ 1 つを <b>volume</b> と呼びます。</p>
<ul>
<li>データは<b>永続的</b>です。インスタンスとは独立して存在し、インスタンスを stop してもそのまま残り、取り外して別のインスタンスにアタッチすることもできます。</li>
<li>1 つの volume は <b>1 つの AZ</b> 内にあり、同じ AZ のインスタンスにしかアタッチできません。AWS はハードウェア障害に備えて、AZ 内で volume を自動的に複製します。</li>
<li>通常、1 つの volume は 1 つのインスタンスにアタッチします（一部の特殊なタイプは複数インスタンスへのアタッチが可能ですが、一般的なケースではありません）。</li>
<li>複数の種類があります。高速な SSD、大容量データをシーケンシャルに読む用途向けでより安価な HDD などです。</li>
</ul>
<h4>EBS snapshot</h4>
<p><b>Snapshot</b>（スナップショット）は、ある時点の EBS volume のバックアップで、AWS によって高い耐久性で保存されます（AWS が管理する S3 上）。Snapshot は <b>incremental</b>（増分）です。次回以降は変更された部分だけを保存するので、コストを節約できます。snapshot からは新しい volume を作り直すことができ、別の AZ にも作成できます。さらに、災害に備えて <b>snapshot を別のリージョンにコピー</b>することもできます。</p>
<p>volume は別の AZ にアタッチできないため、AZ A のデータを AZ B のインスタンスに移したい場合は、<b>snapshot を作成 → AZ B で snapshot から新しい volume を作成 → インスタンスにアタッチ</b>します。</p>

<div class="box idea"><b>🧠 かんたんに言うと</b>
<p>EBS volume は外付けハードディスクのようなものです。抜いて別のマシンに挿すことができ、電源を切ってもデータは残ります。Snapshot は、そのハードディスク全体を写真に撮って金庫にしまうようなものです。一方、<b>Instance store</b> は会議室のホワイトボードのようなものです。すばやく書けてすばやく消せますが、会議が終わる（stop instance）ときれいに消されてしまいます。</p>
</div>

<h3>Instance store: 高速だが一時的</h3>
<p><b>Instance store</b> は、インスタンスが動いている物理サーバーに直接取り付けられたディスクです。マシン上に直接あるため、非常に高速です。しかしデータは <b>ephemeral</b>（一時的）で、インスタンスが stop、terminate されたとき、または基盤のハードウェアが故障したときに失われます（reboot による再起動では残ります）。キャッシュ、一時ファイル、または別の場所にコピーがあるデータにだけ使います。</p>

<h3>共有ファイル: Amazon EFS と Amazon FSx</h3>
<p>複数のサーバーが<b>同じフォルダ</b>を同時に読み書きする必要がある場合があります。例えば、複数の Web サーバーが画像の保管場所を共有するケースです。EBS は通常 1 台のマシンにしかアタッチできないので、共有の <b>file storage</b> が必要になります。</p>
<ul>
<li><b>Amazon EFS</b>（Elastic File System）: <b>Linux</b> マシン向けの共有ファイルシステムで、<b>NFS</b> プロトコルを使います。（複数の AZ にある）数千のインスタンスが同時にアクセスできます。容量はファイルの量に応じて<b>自動的に増減</b>し、事前に確保する必要はなく、実際に使った容量に対して支払います。</li>
<li><b>Amazon FSx</b>: 企業で広く使われているファイルシステムをベースにした、フルマネージドのファイルシステムサービス群です（表を参照）。</li>
</ul>
<table>
<tr><th>FSx の種類</th><th>プロトコル / 特徴</th><th>選ぶ場面</th></tr>
<tr><td><b>FSx for Windows File Server</b></td><td><b>SMB</b>、Active Directory と統合</td><td>共有フォルダが必要な <b>Windows</b> アプリケーション</td></tr>
<tr><td><b>FSx for Lustre</b>（<i>試験範囲外。区別のためにのみ記載</i>）</td><td>ミリ秒未満のレイテンシー、毎秒数百 GB のスループット、<b>S3 内のデータと直接連携</b></td><td><b>HPC</b>、シミュレーション、machine learning のトレーニング</td></tr>
<tr><td><b>FSx for NetApp ONTAP</b></td><td>マルチプロトコル: 同じデータに対して <b>NFS と SMB</b>（iSCSI も）。snapshot、重複排除（deduplication）、圧縮</td><td>オンプレミスの <b>NetApp</b> ストレージ機器の置き換え。Linux マシンと Windows マシンでデータを共有</td></tr>
<tr><td><b>FSx for OpenZFS</b></td><td>NFS、ZFS ファイルシステム</td><td>ZFS/Linux を使っているシステムを AWS に移行</td></tr>
</table>

<div class="box trap"><b>⚠️ よくあるひっかけ</b>
<p>"Linux"、"NFS"、"shared file system for many EC2 instances" → <b>EFS</b>。"Windows"、"SMB"、"Active Directory" → <b>FSx for Windows File Server</b>。"High performance computing"、"data in S3" → FSx for Lustre（このサービスは CLF-C02 の試験範囲外リストに含まれていますが、Amazon FSx 全般は引き続き範囲内です）。"NetApp"、"NFS and SMB on the same data" → <b>FSx for NetApp ONTAP</b>。"Block storage for one EC2 instance" → <b>EBS</b>。"Temporary storage physically attached to host" → <b>instance store</b>。</p>
</div>

<h3>ハイブリッドと一元的なバックアップ: Storage Gateway、AWS Backup</h3>
<h4>AWS Storage Gateway</h4>
<p>多くの企業は、まだオンプレミスにサーバーを持ちながら、AWS のほぼ無制限の容量を使いたいと考えています。<b>AWS Storage Gateway</b> は <b>hybrid cloud storage</b> のサービスです。オフィスやデータセンターに「ゲートウェイ」（ソフトウェアまたはアプライアンス）を設置すると、オンプレミスのアプリケーションからは使い慣れたディスクやフォルダが見えたままですが、実際のデータは AWS（S3 など）に保存されます。Gateway は<b>ローカルキャッシュ</b>（local cache）を保持するので、よく使うファイルはオフィスでも素早く開けます。</p>
<table>
<tr><th>gateway の種類</th><th>オンプレミスのアプリケーションから見えるもの</th><th>AWS でのデータの保存形式</th><th>使う場面</th></tr>
<tr><td><b>S3 File Gateway</b></td><td><b>NFS / SMB</b> 経由の共有フォルダ</td><td><b>Amazon S3</b> 内の object</td><td>オフィスのファイルを S3 に保存しつつ、ローカルキャッシュも使う</td></tr>
<tr><td><b>Volume Gateway</b></td><td>ブロックディスク（iSCSI）</td><td>S3 上のデータ。EBS snapshot を作成可能</td><td>オンプレミスサーバーのディスクをクラウドにバックアップ</td></tr>
<tr><td><b>Tape Gateway</b></td><td><b>仮想テープライブラリ</b>（virtual tape library）</td><td>S3 内の仮想テープ。長期保管は S3 Glacier</td><td>物理テープをやめつつ、今使っている<b>バックアップソフトウェアはそのまま使う</b></td></tr>
</table>
<h4>AWS Backup</h4>
<p>サービスごとにバックアップの方法が違うと、管理がとても大変です。<b>AWS Backup</b> は、EBS、EC2、RDS、Aurora、DynamoDB、EFS、FSx、S3、Storage Gateway など多くのサービスの<b>バックアップを一元的に管理・自動化</b>します。<b>backup plan</b>（バックアッププラン）を作成し、いつバックアップするか、どれだけ保持するか、<b>別のリージョンへコピー</b>（cross-Region copy）するか、別のアカウントへコピーするかを決めます。AWS Organizations と組み合わせると、<b>複数のアカウント</b>にバックアップポリシーを適用でき、<b>AWS Backup Audit Manager</b> を使えばバックアップの<b>コンプライアンス状況のレポート</b>を 1 か所から作成できます。</p>

<h3>ディザスタリカバリ: AWS Elastic Disaster Recovery</h3>
<p><b>Disaster recovery</b>（DR、ディザスタリカバリ）は、大きな障害が起きたときにシステムを再び稼働させるための計画です。知っておくべき指標は 2 つあります。</p>
<ul>
<li><b>RPO</b>（Recovery Point Objective）: 最大でどれだけのデータ損失を許容するかを、時間で表したもの（例: 最大 1 時間分のデータを失う）。</li>
<li><b>RTO</b>（Recovery Time Objective）: どれだけの時間内に復旧を終えなければならないか（例: 4 時間以内）。</li>
</ul>
<p>DR 戦略は、安くて遅いものから高くて速いものへと並びます。<b>backup and restore</b>（バックアップして復元する）→ <b>pilot light</b>（最小限の中核部分を用意しておく）→ <b>warm standby</b>（縮小版を常時稼働させておく）→ <b>multi-site active/active</b>（複数の場所で同時にフル稼働させる）。</p>
<p><b>AWS Elastic Disaster Recovery</b>（AWS DRS）は、サーバー（オンプレミス、他のクラウド上、または別のリージョンの EC2）を、コストを抑えた形で AWS に継続的に<b>レプリケーション</b>します。障害が起きたら、レプリケーション済みのマシンを AWS 上で数分で起動でき、ダウンタイムとデータ損失を最小限に抑えられます。</p>

<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b>
<p>BanhNgon のシステムは、今ではかなり大きくなりました。各 Web サーバーにはルート用の EBS ディスクがあり、ミンさんは <b>AWS Backup</b> を使って毎晩 snapshot を取り、30 日間保持し、1 つを別のリージョンにコピーしています。Web サーバー群は <b>EFS</b> を通じて画像の保管場所を共有しています。経理部は Windows マシンを使っているので、会計書類の共有フォルダは <b>FSx for Windows File Server</b> 上に置いています。</p>
<p>店の倉庫には、まだクラウドに移行していない古い在庫管理サーバーが 1 台残っています。ミンさんは <b>Storage Gateway</b> を導入してそのデータを S3 に保存できるようにし、<b>Elastic Disaster Recovery</b> でそのサーバーを AWS に継続的にレプリケーションしています。以前のように倉庫がまた停電しても、ミンさんは AWS 上のレプリカを数分で起動できます。</p>
</div>

<h3>まとめ比較表</h3>
<table>
<tr><th>サービス</th><th>種類</th><th>主な特徴</th><th>試験のキーワード</th></tr>
<tr><td>Amazon EBS</td><td>Block</td><td>EC2 用の永続的なディスク。1 つの AZ 内にあり、snapshot を取れる</td><td>block storage for EC2</td></tr>
<tr><td>Instance store</td><td>Block</td><td>物理マシンに直接取り付け。非常に高速で、データは一時的</td><td>temporary, physically attached</td></tr>
<tr><td>Amazon EFS</td><td>File</td><td>Linux 向けの共有ストレージ。NFS、自動で伸縮、複数 AZ</td><td>shared file system, Linux</td></tr>
<tr><td>Amazon FSx</td><td>File</td><td>Windows File Server（SMB）、ONTAP、OpenZFS、Lustre（HPC、試験範囲外）</td><td>Windows, SMB, HPC</td></tr>
<tr><td>Amazon S3</td><td>Object</td><td>容量無制限、イレブンナインの耐久性</td><td>object storage</td></tr>
<tr><td>AWS Storage Gateway</td><td>Hybrid</td><td>オンプレミスのアプリケーションが AWS のストレージを利用</td><td>hybrid, on-premises access to cloud storage</td></tr>
<tr><td>AWS Backup</td><td>バックアップ管理</td><td>一元的で、プランに基づく、複数サービスのバックアップ</td><td>centrally manage backups</td></tr>
<tr><td>AWS Elastic Disaster Recovery</td><td>ディザスタリカバリ</td><td>継続的にレプリケーションし、AWS 上で素早く復旧</td><td>minimize downtime and data loss</td></tr>
</table>

<div class="box exam"><b>🎯 試験でよく問われること</b>
<ul>
<li>"block-level storage volumes for EC2" → <b>Amazon EBS</b>、"point-in-time backup of EBS" → <b>EBS snapshot</b></li>
<li>"multiple Linux EC2 instances need shared, concurrent access" → <b>Amazon EFS</b></li>
<li>"shared file storage for Windows applications, SMB" → <b>Amazon FSx for Windows File Server</b></li>
<li>"on-premises applications access virtually unlimited cloud storage" → <b>AWS Storage Gateway</b></li>
<li>"NFS/SMB file shares on premises, store as objects in S3, local cache" → <b>S3 File Gateway</b>、"replace physical tapes, keep backup software" → <b>Tape Gateway</b></li>
<li>"replace NetApp, NFS + SMB, snapshots, deduplication" → <b>FSx for NetApp ONTAP</b></li>
<li>"copy an EBS volume to another AZ" → <b>snapshot を取り、その AZ で新しい volume を作成する</b>。snapshot はどこに保存される? → <b>AWS が管理する S3 内</b></li>
<li>"centrally manage and automate backups across AWS services"、"multiple accounts, cross-Region copy, compliance reporting" → <b>AWS Backup</b></li>
<li>"continuously replicate servers to AWS to minimize downtime and data loss" → <b>AWS Elastic Disaster Recovery</b></li>
</ul>
</div>
`,summary:["EBS = EC2 用の永続的な block ディスクで、1 つの AZ 内にある。snapshot は増分バックアップで、別のリージョンにコピーできる。","Instance store = 物理マシンに直接取り付けられたディスクで、非常に高速だが、stop/terminate でデータが失われる。","EFS = Linux 向けの共有ファイル（NFS）で、自動で伸縮する。FSx = Windows File Server（SMB）、Lustre（HPC、試験範囲外）、NetApp ONTAP（NFS + SMB、snapshot、dedup）、OpenZFS。","Storage Gateway = ハイブリッドストレージ: S3 File Gateway（NFS/SMB → S3、キャッシュあり）、Volume Gateway（ブロックディスク）、Tape Gateway（仮想テープ）。","AWS Backup = 複数サービス・複数アカウントを対象に、プランに基づいて一元的にバックアップし、別のリージョンへのコピーやコンプライアンスレポートも行える。","Elastic Disaster Recovery はサーバーを AWS に継続的にレプリケーションして素早く復旧する。RPO = 許容できるデータ損失量、RTO = 復旧にかかる時間。"],terms:[["Volume","EBS のディスク 1 つ"],["Snapshot","スナップショット（ある時点のバックアップ）"],["Incremental","増分（変更された部分だけを保存する）"],["Ephemeral","一時的"],["NFS (Network File System)","Linux で広く使われるファイル共有プロトコル"],["SMB (Server Message Block)","Windows で広く使われるファイル共有プロトコル"],["Shared file system","共有ファイルシステム"],["Hybrid cloud storage","ハイブリッドクラウドストレージ"],["Tape Gateway","バックアップデータを AWS に保存する仮想テープライブラリ"],["Local cache","オフィス側のローカルキャッシュ"],["Backup plan","バックアッププラン"],["Disaster recovery (DR)","ディザスタリカバリ（災害復旧）"],["RPO (Recovery Point Objective)","目標復旧時点。許容できるデータ損失量"],["RTO (Recovery Time Objective)","目標復旧時間"],["Pilot light","最小限の中核部分を用意しておく方式"],["Warm standby","常時稼働している縮小版の待機系"]]};
})();
