(function(){var I=window.CLF_I18N=window.CLF_I18N||{};var L=I.ja=I.ja||{};['q','course','lessons','glossary','services','domains','ui'].forEach(function(k){L[k]=L[k]||{};});
L.course["4-1"]={title:"EC2 の購入方法: On-Demand、Reserved、Savings Plans、Spot、Dedicated",goals:["同じ EC2 サーバーなのに支払い方法が複数ある理由を理解する","On-Demand、Reserved Instances、Savings Plans、Spot Instances を区別する","Dedicated Instances、Dedicated Hosts、On-Demand Capacity Reservations を区別する","試験の各シナリオに合った購入方法を正しく選ぶ"],html:`<h3>なぜ購入方法がいくつもあるのか？</h3>
<p>おさらい: <b>Amazon EC2</b>（Elastic Compute Cloud、仮想サーバーを借りるサービス）は、AWS のデータセンターに置かれた「コンピューター」を借りられるサービスです。この 1 台 1 台を <b>instance</b>（インスタンス、仮想サーバー）と呼びます。</p>
<p>マシン自体は同じでも、<b>支払い方法</b>が異なります。AWS では、高い料金を払って自由に使うか、長期利用を約束して割引を受けるか、「マシンを返してほしい」と言われることを受け入れて格安で使うかを選べます。これらの方法を <b>purchasing options</b>（購入オプション）と呼びます。</p>
<div class="box idea"><b>🧠 かんたんに言うと</b><p>移動手段にたとえて考えてみましょう。</p>
<ul>
<li><b>タクシーを呼ぶ</b>: 必要なときに呼び、乗った分だけ払います。便利ですが、1 km あたりでは最も高くつきます。これが <b>On-Demand</b> です。</li>
<li><b>月単位・年単位で車を借りる</b>: 長期契約を結ぶので 1 日あたりの料金はずっと安くなりますが、使わなくても支払いは発生します。これが <b>Reserved Instances</b> と <b>Savings Plans</b> です。</li>
<li><b>空席待ち（standby）の航空券</b>: 空いている席を使うので驚くほど安い反面、航空会社に搭乗を断られることがあります。これが <b>Spot Instances</b> です。</li>
</ul></div>

<h3>On-Demand: 使った分だけ支払い、コミットメントなし</h3>
<p><b>On-Demand Instances</b>（オンデマンドインスタンス）はデフォルトの購入方法です。インスタンスを起動した時点から課金が始まり、停止すると課金も止まります。料金は、インスタンスタイプと OS に応じて秒単位または時間単位で計算されます。</p>
<p>契約も前払いもなく、マシンを取り上げられることもありません。その代わり、一般的な選択肢の中では最も高い料金になります。</p>
<p>向いている場面: 短期の作業、予測できないワークロード、検証中、あるいはどのくらいの期間動かすかまだ分からない新しいアプリケーション。</p>

<h3>Reserved Instances と Savings Plans: コミットして割引を受ける</h3>
<h4>Reserved Instances (RI)</h4>
<p><b>Reserved Instances</b>（リザーブドインスタンス）は、AWS に対して「このタイプのマシンを <b>1 年または 3 年</b>使います」と約束するものです。その見返りとして、On-Demand と比べて最大で約 <b>72%</b> の割引を受けられます。コミット期間が長いほど、割引は大きくなります。</p>
<p>主に 2 種類あります。</p>
<ul>
<li><b>Standard RI</b>（スタンダード RI）: 割引が最も大きい反面、柔軟性は低めです。別のインスタンスファミリー（instance family）には変更できません。</li>
<li><b>Convertible RI</b>（コンバーティブル RI）: 割引は小さくなりますが、契約期間中に別のインスタンスファミリーや OS へ交換できます。</li>
</ul>
<p>支払い方法には 3 つの段階があります。</p>
<ul>
<li><b>All Upfront</b>（全額前払い）: 最初に全額を支払い、割引が最も大きくなります。</li>
<li><b>Partial Upfront</b>（一部前払い）: 一部を前払いし、残りを毎月分割で支払います。</li>
<li><b>No Upfront</b>（前払いなし）: 前払いはせず毎月分割で支払い、3 つの中で割引が最も小さくなります。それでもコミットした分は全額支払う必要があります。</li>
</ul>
<p>RI を購入するときは、<b>スコープ</b>（scope）としてリージョン全体か 1 つの AZ かを選びます。</p>
<table>
<tr><th></th><th>Regional RI（リージョン単位の RI）</th><th>Zonal RI（1 つの AZ に紐づく RI）</th></tr>
<tr><td>割引の適用対象</td><td>リージョン内の<b>どの AZ でも</b>、条件に一致するインスタンス</td><td>選択した<b>その AZ</b> にある、条件に一致するインスタンスのみ</td></tr>
<tr><td>サイズの柔軟性（<b>size flexibility</b>）</td><td>あり（Linux など多くのケース）: 同じインスタンスファミリー内の異なるサイズに割引が自動で適用される</td><td>なし</td></tr>
<tr><td>キャパシティの予約（<b>capacity reservation</b>）</td><td>なし</td><td><b>あり</b>、その AZ でキャパシティを確保する</td></tr>
</table>
<p>よく問われるポイントをあと 3 つ挙げます。</p>
<ul>
<li><b>AWS Organizations</b>（複数の AWS アカウントをまとめて管理する仕組み。後のレッスンで詳しく学びます）を使っている場合、RI と Savings Plans の割引は、組織内の他のアカウントが条件に一致するインスタンスを動かしていれば、<b>デフォルトで共有されます</b>。例: アカウント A が Regional RI を購入したもののインスタンスを停止しており、アカウント B が同じリージョンの別の AZ で同じタイプのインスタンスを動かしている → B に自動で割引が適用されます。</li>
<li>割引を購入したアカウントだけに適用したい場合（たとえば子会社ごとの社内コストを正しく計算するため）はどうするか。<b>Management account</b>（組織の管理アカウント）が、Billing の設定でアカウントごとに <b>RI/Savings Plans の共有をオフ</b>（turn off discount sharing）にできます。</li>
<li><b>Reserved Instance Marketplace</b>（RI を再販売するマーケットプレイス）: RI が不要になった場合、他の AWS のお客様に<b>残りの期間を販売</b>できます。ここで販売できるのは <b>Standard RI</b> だけで、<b>Convertible RI は販売できません</b>（その代わり、別の構成に交換できます）。</li>
</ul>

<h4>Savings Plans</h4>
<p><b>Savings Plans</b>（節約プラン）も 1 年または 3 年のコミットメントですが、特定のインスタンスタイプではなく <b>1 時間あたりの金額</b>でコミットします（例:「サーバー料金として少なくとも 1 時間あたり 10 USD は使います」）。コミット額の範囲内の利用には割引料金が適用され、超えた分は On-Demand 料金で計算されます。</p>
<table>
<tr><th></th><th>Compute Savings Plans</th><th>EC2 Instance Savings Plans</th></tr>
<tr><td>適用されるサービス</td><td><b>EC2、AWS Fargate、AWS Lambda</b></td><td><b>EC2</b> のみ</td></tr>
<tr><td>コミットメントの紐づき先</td><td>インスタンスファミリーにもリージョンにも紐づかない</td><td><b>1 つのリージョン内の 1 つのインスタンスファミリー</b>（例: シンガポールの M ファミリー）</td></tr>
<tr><td>変更しても自動で適用されるもの</td><td>インスタンスファミリー、サイズ、OS、AZ、<b>リージョン</b>、Fargate/Lambda への移行</td><td>サイズ、OS、テナンシー（tenancy）、AZ（同じインスタンスファミリーとリージョンの中で）</td></tr>
<tr><td>割引率</td><td>やや低い（その代わり柔軟性が最も高い）</td><td><b>より高い</b>、最大で約 72%</td></tr>
</table>
<p><b>1 年または 3 年</b>という期間は、Compute Savings Plans と EC2 Instance Savings Plans に適用されます。この 2 種類のほかに、次のものもあります。</p>
<ul>
<li><b>Amazon SageMaker Savings Plans</b>: SageMaker の利用量に対して USD/時間でコミットします（1 年または 3 年）。</li>
<li><b>Database Savings Plans</b>（2025 年 12 月に提供開始）: Aurora、RDS、DynamoDB、ElastiCache など複数のデータベースサービスに対して USD/時間でコミットします。期間は <b>1 年</b>のみで、割引は最大で約 <b>35%</b>（サーバーレス形態での最大値）です。</li>
</ul>
<p>コミット額を自分で推測する必要はありません。<b>AWS Cost Explorer</b> には、過去の実際の利用量に基づく <b>Savings Plans recommendations</b>（Savings Plans の推奨事項）があり、1 時間あたり何 USD をコミットすべきか、どのくらい節約できそうかを教えてくれます。</p>
<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>BanhNgon のウェブサイトは 1 年中 24 時間 365 日稼働しており、ミンさんは今後 3 年間も少なくとも 2 台のサーバーが必要だと確信しています。そこで On-Demand で支払う代わりに、3 年の <b>Compute Savings Plans</b> を購入しました。翌年、注文処理の一部を Lambda に移しましたが、Compute Savings Plans は Lambda も対象なので、割引はそのまま自動で適用されます。もし特定のインスタンスファミリー 1 つに対して Standard RI を購入していたら、アーキテクチャを変更したときに割引を活かしにくくなっていたでしょう。</p></div>

<h3>Spot Instances: 最も安いが、取り上げられる可能性がある</h3>
<p>AWS には、常に使われていない空きマシンがあります。<b>Spot Instances</b>（スポットインスタンス、余剰キャパシティを使う格安インスタンス）では、そうしたマシンを On-Demand と比べて最大で約 <b>90%</b> の割引で利用できます。</p>
<p>その代わり、AWS がそのキャパシティを必要としたときには、インスタンスが中断されることがあります。AWS からの事前通知は <b>2 分前</b>だけです。</p>
<p>そのため Spot が向いているのは、<b>fault-tolerant</b>（耐障害性があり、障害や中断に耐えられる）で、時間に融通が利く作業だけです。たとえばバッチ処理（batch）、データ分析、画像/動画のレンダリング、テストの実行などです。メインのデータベースや、止めずに動かし続けなければならない処理には向きません。</p>
<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>BanhNgon では毎晩、ウェブサイト用のサムネイルを作るために数千枚のケーキの写真を処理する必要があります。この作業は中断されても途中の写真からやり直せばよく、翌朝までに終わっていれば問題ありません。ミンさんは <b>Spot Instances</b> を使って大幅にコストを節約しています。ただし、注文を受け付けるサーバーを Spot で動かすことは決してありません。</p></div>

<h3>Dedicated Instances、Dedicated Hosts、Capacity Reservations</h3>
<p>通常、AWS の物理サーバーでは、複数の異なるお客様の仮想マシンが動いています（それでも安全に分離されています）。しかし、規制やソフトウェアのライセンス（<b>license</b>）の都合で、<b>自社専用</b>のハードウェアが必要な企業もあります。</p>
<ul>
<li><b>Dedicated Instances</b>（専有インスタンス）: 自分の仮想マシンが、他のお客様と共有されないハードウェア上で動きます。ただし、物理マシンの詳細（ソケット数やコア数）は<b>見えません</b>。</li>
<li><b>Dedicated Hosts</b>（専有の物理サーバー）: 物理サーバーを 1 台まるごと借り、そのソケットやコアを<b>確認できます</b>。そのおかげで、ソケット/コア単位で課金される既存のライセンスを利用できます。これを <b>BYOL</b>（Bring Your Own License、ライセンスの持ち込み）と呼びます。通常、最も高額な選択肢です。</li>
</ul>
<p><b>On-Demand Capacity Reservations</b>（オンデマンドキャパシティ予約）はまったく別物です。割引ではなく、特定の AZ でマシンのキャパシティを<b>確保</b>するもので、期間は自由に決められ、1 年や 3 年のコミットメントは不要です。インスタンスを動かしているかどうかに関係なく、確保した分には On-Demand 料金を支払います。Savings Plans や Regional RI と組み合わせて割引を受けることもできます。</p>
<div class="box trap"><b>⚠️ よくあるひっかけ</b><p>「Dedicated」は安いという意味でも、「予約」という意味でもありません。キーワード <b>socket, core, BYOL, server-bound license</b> → <b>Dedicated Hosts</b>。キーワード「専用ハードウェアだが socket/core を見る<b>必要はない</b>」→ <b>Dedicated Instances</b>。キーワード「1 つの AZ でキャパシティを確保、期間は任意、長期コミットメントなし」→ <b>On-Demand Capacity Reservations</b> であり、RI ではありません。</p></div>

<h3>早見表: シナリオ → 購入方法</h3>
<table>
<tr><th>シナリオ</th><th>選ぶもの</th></tr>
<tr><td>短期、予測できない、中断は不可、コミットしたくない</td><td>On-Demand</td></tr>
<tr><td>1〜3 年にわたり安定して連続稼働、インスタンスタイプがはっきり決まっている</td><td>Standard RI または EC2 Instance Savings Plans</td></tr>
<tr><td>長期でコミットするが、インスタンスファミリーを変更する可能性がある</td><td>Convertible RI</td></tr>
<tr><td>1 時間あたりの金額でコミットし、EC2、Fargate、Lambda をまとめて使う</td><td>Compute Savings Plans</td></tr>
<tr><td>時間に融通が利き、中断に耐えられ、最も安くしたい作業</td><td>Spot Instances</td></tr>
<tr><td>ソケット/コア単位のライセンスで、ハードウェアが見える必要がある</td><td>Dedicated Hosts</td></tr>
<tr><td>専用ハードウェアが必要だが、socket/core を見る必要はない</td><td>Dedicated Instances</td></tr>
<tr><td>特定の AZ で確実にキャパシティを確保したい、期間は任意</td><td>On-Demand Capacity Reservations</td></tr>
</table>
<div class="box exam"><b>🎯 試験でよく問われること</b><ul>
<li>"steady-state", "run continuously for 3 years", "cannot be interrupted" → Reserved Instances / Savings Plans</li>
<li>"can be interrupted", "fault-tolerant", "batch", "most cost-effective" → Spot Instances</li>
<li>"commit to $/hour", "EC2, Fargate and Lambda" → Compute Savings Plans</li>
<li>"change instance families during the term" → Convertible Reserved Instances</li>
<li>"one instance family in one Region, resize often, change OS, largest Savings Plans discount" → EC2 Instance Savings Plans</li>
<li>"sell the remaining term to another customer" → Reserved Instance Marketplace で Standard RI を販売</li>
<li>"discount should apply only to the account that bought it" → management account が RI/Savings Plans discount sharing をオフにする</li>
<li>"zonal RI" → 1 つの AZ でキャパシティを確保; "regional RI" → リージョン内のすべての AZ に適用、size flexibility あり</li>
<li>"per-socket / per-core licenses", "BYOL" → Dedicated Hosts</li>
<li>"reserve capacity in a specific AZ for any duration" → On-Demand Capacity Reservations</li>
<li>"short-term, unpredictable, no upfront commitment" → On-Demand</li>
</ul></div>`,summary:["On-Demand: 使った分だけ支払い、コミットメントなし。料金は最も高く、予測しにくい短期の作業に向いています。","Reserved Instances: 1 年または 3 年のコミットメントで最大約 72% 割引。Standard は割引が最大、Convertible はインスタンスファミリーを交換可能。支払いは All/Partial/No Upfront。","Savings Plans: 1 年または 3 年、1 時間あたりの金額でコミット。Compute Savings Plans は EC2、Fargate、Lambda に適用されます。","Spot: 最大約 90% 割引。2 分前の通知で中断される可能性があり、中断に耐えられる作業にのみ使います。","Dedicated Hosts は socket/core が見え、BYOL に対応。Dedicated Instances は専用ハードウェアを保証するだけです。","On-Demand Capacity Reservations は 1 つの AZ で任意の期間キャパシティを確保するもので、割引ではありません。","AWS Organizations では、RI と Savings Plans の割引はデフォルトでアカウント間で共有されます。management account はアカウントごとに共有をオフにできます。","EC2 Instance Savings Plans: 1 つのリージョン内の 1 つのインスタンスファミリーが対象で、割引がより大きい。Compute Savings Plans はより柔軟。Zonal RI は 1 つの AZ でキャパシティを確保し、Regional RI は確保しません。RI Marketplace で再販売できるのは Standard RI だけです。"],terms:[["Purchasing options","購入オプション"],["On-Demand Instances","オンデマンドインスタンス。使った分だけ支払う"],["Reserved Instances (RI)","リザーブドインスタンス。1〜3 年のコミットメント"],["Standard / Convertible RI","スタンダード RI / 交換可能なコンバーティブル RI"],["All / Partial / No Upfront","全額前払い / 一部前払い / 前払いなし"],["Savings Plans","1 時間あたりの金額でコミットする節約プラン"],["Compute Savings Plans","EC2、Fargate、Lambda に適用される Savings Plans"],["Spot Instances","余剰キャパシティを使うインスタンス。非常に安いが中断される可能性がある"],["Fault-tolerant","耐障害性がある（障害・中断に耐えられる）"],["Dedicated Instances","専用ハードウェア上で動くインスタンス"],["Dedicated Hosts","専有の物理サーバーを 1 台まるごと借りる"],["BYOL (Bring Your Own License)","手持ちのライセンスの持ち込み"],["On-Demand Capacity Reservations","1 つの AZ でキャパシティを予約して確保する"],["Size flexibility","インスタンスサイズの柔軟性"],["Regional / Zonal RI","リージョン全体に適用される RI / 1 つの AZ に紐づく RI（キャパシティ予約あり）"],["EC2 Instance Savings Plans","1 つのリージョン内の 1 つの EC2 インスタンスファミリー向けの Savings Plans"],["Reserved Instance Marketplace","Standard RI の残り期間を再販売するマーケットプレイス"]]};
L.course["4-2"]={title:"ストレージとデータ転送の料金（Storage & Data Transfer Pricing）",goals:["AWS の主な 3 つのコスト区分（コンピューティング、ストレージ、外向きのデータ転送）を知る","Amazon S3 と Amazon EBS の料金を左右する要素を知る","どのデータ転送が無料で、どれが有料かのルールを覚える","CloudFront がデータ転送コストの削減に役立つ理由を理解する"],html:`<h3>AWS の料金はどこから発生するのか？</h3>
<p>AWS の料金モデルは <b>pay-as-you-go</b>（従量課金、使った分だけ支払う）です。請求額を見積もるには、料金が主に次の 3 つの区分から発生することを知っておく必要があります。</p>
<ul>
<li><b>Compute</b>（コンピューティング）: 処理を行う「頭脳」を借りる料金です。たとえば EC2 はインスタンスの稼働時間で、Lambda は呼び出し回数と実行時間で計算されます。</li>
<li><b>Storage</b>（ストレージ）: データを保管する料金で、通常は 1 か月あたりの容量（GB-月）で計算されます。</li>
<li><b>Data transfer out</b>（外向きのデータ転送）: データが AWS からインターネットや別の場所へ出ていくときにかかる料金です。</li>
</ul>
<div class="box idea"><b>🧠 かんたんに言うと</b><p>AWS を貸し倉庫だと想像してください。荷物を置く場所の賃料（ストレージ）、作業する人手の料金（コンピューティング）、そして<b>荷物を倉庫から運び出すトラック</b>の料金（外向きのデータ転送）を支払います。一方、荷物を倉庫に<b>運び入れる</b>分には、倉庫のオーナーはお金を取りません。できるだけたくさん預けてほしいからです。</p></div>

<h3>Amazon S3 の料金</h3>
<p><b>Amazon S3</b>（Simple Storage Service、オブジェクトストレージ）は、画像、動画、バックアップなどのファイルを保管するために使います。S3 の料金は次の要素で決まります。</p>
<ul>
<li><b>保存するデータ量</b>: 保存する GB が多いほど、料金がかかります。</li>
<li><b>Storage class</b>（ストレージクラス）: たとえば、よく使うデータ向けの S3 Standard は保存料金が高めです。あまり使わないデータや長期アーカイブ向けのクラス（S3 Glacier など）は保存料金が安い反面、データを取り出すとき（retrieval）に料金がかかることがあります。</li>
<li><b>Requests</b>（リクエスト数）: ファイルの読み取り、書き込み、一覧表示のたびに少額の料金がかかり、回数が非常に多いと合計では無視できない額になります。</li>
<li><b>Data transfer out</b>: S3 からインターネットへダウンロードされるデータには料金がかかります。</li>
</ul>
<p>一方、<b>インターネットから S3 へアップロードするデータは無料</b>です。IAM ユーザーの数やリージョン内の AZ の数は、S3 の料金に影響しません。</p>
<p>ストレージクラス間の料金の法則: <b>1 GB あたりの保存料金が安いほど、取り出すときのコストが大きくなります</b>（retrieval 料金、待ち時間、最小保存期間）。下の表は傾向を比べるためのもので、具体的な数値ではありません。</p>
<table>
<tr><th>Storage class</th><th>保存料金</th><th>データを取り出すとき</th><th>向いている用途</th></tr>
<tr><td>S3 Standard</td><td>最も高い</td><td>即時、retrieval 料金なし</td><td>頻繁に使うデータ</td></tr>
<tr><td>S3 Intelligent-Tiering</td><td>あまり使われなくなると自動で下がる（＋オブジェクト単位の少額のモニタリング料金）</td><td>即時、<b>retrieval 料金なし</b></td><td>アクセス頻度が予測できない、lifecycle rule を自分で書きたくない</td></tr>
<tr><td>S3 Standard-IA / One Zone-IA</td><td>より安い（One Zone-IA はさらに安いが、1 つの AZ にしか保存しない）</td><td>即時（ミリ秒）、retrieval 料金あり</td><td>あまり使わない（月に 1 回程度）が、すぐに取り出したい</td></tr>
<tr><td>S3 Glacier Instant Retrieval</td><td>さらに安い</td><td>やはりミリ秒、retrieval 料金はより高い</td><td>長期保存で、開くのは四半期に 1 回程度だが、すぐに開ける必要がある</td></tr>
<tr><td>S3 Glacier Flexible Retrieval</td><td>非常に安い</td><td>数分から数時間待つ</td><td>めったに必要にならないアーカイブやバックアップ</td></tr>
<tr><td>S3 Glacier Deep Archive</td><td><b>最も安い</b></td><td>約 12〜48 時間待つ</td><td>コンプライアンスのために何年も保存する</td></tr>
</table>
<p>節約のコツ: 開いて見る機会が少ないデータほど、より安いストレージクラスへ移すべきです。S3 には <b>lifecycle rules</b>（ライフサイクルルール）があり、古いファイルを安いクラスへ自動で移行したり、一定期間後に自動で削除したりできます。これにより、ファイルを 1 つずつ手作業で移さなくても、請求額は時間とともに下がっていきます。</p>

<h3>Amazon EBS の料金</h3>
<p><b>Amazon EBS</b>（Elastic Block Store）は、EC2 サーバーに接続する「ハードディスク」です。重要なポイント: EBS は<b>プロビジョニングした容量</b>（provisioned）に対して課金され、<b>実際に使っている容量ではありません</b>。</p>
<p>500 GB のボリュームを作成したのに、データは 50 GB しか入っていない場合はどうでしょうか。それでも 500 GB 分を支払います。EBS の料金は次のもので構成されます。</p>
<ul>
<li><b>プロビジョニングした容量</b>。GB-月で計算されます。</li>
<li>一部のボリュームタイプでは<b>プロビジョニングした性能</b>。たとえば <b>gp3</b> ボリューム（一般的な SSD タイプ）は、基本性能（baseline）があらかじめ料金に含まれています。baseline を超える <b>IOPS</b>（1 秒あたりの読み書き操作数）や <b>throughput</b>（1 秒あたりに読み書きするデータ量）を追加で設定すると、その分を追加で支払います。</li>
<li><b>Snapshot</b>（スナップショット、ボリュームのバックアップ）: 保存されているスナップショットのデータ量に応じて課金されます。</li>
</ul>
<p>EBS ボリュームの料金を<b>変えない</b>もの: EC2 インスタンスが実行中か停止（stop）済みか、ボリュームに実際に書き込まれているデータ量。</p>
<div class="box trap"><b>⚠️ よくあるひっかけ</b><p>EC2 インスタンスを停止（stop）すると、インスタンスの稼働時間に対する課金は止まりますが、アタッチされている EBS ボリュームは、データを保持し続けているため<b>引き続き課金されます</b>。料金を完全になくすには、（必要ならバックアップを取ったうえで）ボリュームを削除する必要があります。</p></div>

<h3>データ転送料金のルール</h3>
<p>ここは試験で非常によく問われる部分です。基本原則を覚えましょう。<b>入るのは無料、出るのは有料</b>で、遠くへ行くほど（AZ をまたぐ、リージョンをまたぐ）料金がかかる可能性が高くなります。</p>
<table>
<tr><th>データ転送の方向</th><th>料金はかかる？</th></tr>
<tr><td>インターネットから AWS <b>へ</b>（EC2 へ、S3 へ など）</td><td>無料</td></tr>
<tr><td>AWS からインターネット<b>へ</b></td><td>有料（ただし<b>毎月最初の 100 GB は無料</b>。中国リージョンと GovCloud を除く、すべてのサービスとリージョンの合算）</td></tr>
<tr><td>異なる 2 つの<b>リージョン</b>間</td><td>有料</td></tr>
<tr><td>同じリージョン内の異なる 2 つの <b>AZ</b> 間</td><td>有料</td></tr>
<tr><td><b>同じ AZ 内</b>で、プライベート IP アドレス（private IP）を使う場合</td><td>無料</td></tr>
<tr><td><b>同じリージョン内</b>の EC2 と S3 の間</td><td>無料</td></tr>
</table>
<p><b>Private IP</b>（プライベート IP アドレス）は、AWS 上の自分のプライベートネットワーク内だけで使う「番地」で、インターネットに公開されるアドレスとは異なります。補足: <b>2024 年 2 月 1 日</b>から、すべての<b>パブリック IPv4 アドレス</b>（public IPv4。インスタンスにアタッチ中の Elastic IP も含む）に、1 アドレスあたり <b>0.005 USD/時間</b>の料金がかかるようになりました。そのため、public IP を持つ EC2 インスタンス 1 台につき、月に約 3.6 USD が追加でかかります。</p>
<p>その結果として、アプリケーションの 2 つの層が異なる 2 つの AZ をまたいで大量のデータをやり取りしている場合、それらを<b>同じ AZ に配置</b>すればデータ転送料金を減らせます。その代わり、その AZ に障害が起きたときの耐障害性を失うため、重要でないワークロードに限って行うべきです。これはコストと可用性のトレードオフです。</p>
<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>ハノイのお客さんがケーキのレビュー写真をウェブサイトにアップロードします。この S3 <b>へ入る</b>データは無料です。別のお客さんがページを開いて写真を見るたびに、データはインターネット<b>へ出て</b>いき、料金がかかります。BanhNgon が日本へ事業を広げ、ミンさんがすべての写真をシンガポールリージョンから東京リージョンへコピーすると、この 2 つのリージョン間のコピーにも料金がかかります。ミンさんはこれをメモして、予算に組み込みました。</p></div>

<h3>CloudFront はどのようにデータ転送料金を減らすのか？</h3>
<p><b>Amazon CloudFront</b> は <b>CDN</b>（Content Delivery Network、コンテンツ配信ネットワーク）です。コンテンツのコピー（cache）を、ユーザーに近い <b>edge location</b>（エッジロケーション）に保存します。</p>
<p>コスト面でのメリット:</p>
<ul>
<li>キャッシュ済みのコンテンツはユーザーがエッジロケーションから取得するため、オリジンサーバー（S3 や EC2 など）が送信するデータが少なくなります。</li>
<li>AWS 上のオリジン（S3、EC2 など）から CloudFront へのデータ転送には、外向きの転送料金がかかりません。料金は CloudFront の料金表に従って支払い、閲覧量が多い場合は通常こちらのほうが有利です。</li>
<li>あわせて、遠くにいるユーザーにとってページの読み込みが速くなります。</li>
</ul>
<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>ケーキの写真は、ホーチミン市や日本の多くのお客さんに何度も繰り返し見られています。ミンさんは S3 の前段に CloudFront を配置しました。それ以来、閲覧の大部分はお客さんに近いエッジロケーションから写真を取得するようになり、S3 が直接写真を送り出すことは減り、ページは速くなり、データ転送コストも管理しやすくなりました。</p></div>

<h3>AWS Free Tier</h3>
<p>AWS には <b>Free Tier</b>（無料利用枠）というプログラムがあり、初めての人が一部のサービスを制限の範囲内で無料で試せます。ただし、Free Tier の条件は過去に変更されたことがあり、今後も変わる可能性があります。これを当てにする前に必ず公式の AWS Free Tier ページを確認し、想定外の請求を避けるためにコストアラート（後のレッスンで扱います）を設定しましょう。</p>
<p>現在の仕組みの要約（2025 年 7 月 15 日以降に作成したアカウント）: 新規アカウントは <b>100 USD のクレジット</b>を受け取り、さらに<b>最大 100 USD</b> を追加で獲得でき、<b>Free plan</b>（課金は一切なし、最長 6 か月）または <b>Paid plan</b>（クレジットを超えた分を支払う）を選びます。このほかに、毎月の無料枠がある 30 以上のサービス（<i>always free</i>）があります。詳しくはハンズオンのレッスン <b>5-1</b> を参照してください。</p>
<div class="box exam"><b>🎯 試験でよく問われること</b><ul>
<li>"factors that affect S3 cost" → amount of data stored, storage class, requests, data transfer out（data transfer in ではない）</li>
<li>"which data transfer incurs a charge" → between Regions, to the internet, between AZs</li>
<li>"which data transfer is free" → inbound from the internet; same AZ using private IP</li>
<li>"EBS charged for" → provisioned storage（プロビジョニングした容量）であり、使用済みの容量ではない。gp3 では baseline を超える IOPS/throughput が加算され、snapshot は別途課金</li>
<li>"unpredictable access, automatic, no retrieval fees" → S3 Intelligent-Tiering; "rarely accessed but milliseconds" → S3 Glacier Instant Retrieval; "cheapest long-term archive" → S3 Glacier Deep Archive</li>
<li>"reduce cross-AZ data transfer charges" → 大量のデータをやり取りする層を同じ AZ に配置する（可用性とのトレードオフ）</li>
<li>"reduce data transfer cost and latency for global users" → Amazon CloudFront</li>
</ul></div>`,summary:["AWS の主な 3 つのコスト区分は compute、storage、data transfer out です。","S3 の料金はデータ量、storage class、requests の数、外向きに転送するデータで決まります。S3 へ入るデータは無料です。","S3 storage class: 保存料金が安いほど、データを取り出すときの料金・時間が大きくなります。Intelligent-Tiering は階層を自動で移行し、retrieval 料金はかかりません。","EBS はプロビジョニングした容量に対して課金され（使い切っていなくても、EC2 インスタンスが停止中でも）、baseline を超える IOPS/throughput（gp3）と snapshot が加算されます。","インターネットから入る: 無料。インターネットへ出る、リージョン間、AZ 間: 有料。同じ AZ 内で private IP 経由: 無料。","CloudFront はコンテンツをエッジロケーションにキャッシュし、オリジンの負荷を減らしてデータ転送コストの最適化に役立ちます。","Free Tier は存在しますが条件は変わる可能性があるため、必ず公式ページを確認しましょう。"],terms:[["Pay-as-you-go","従量課金（使った分だけ支払う）"],["Compute","コンピューティングリソース"],["Storage","ストレージ"],["Data transfer in / out","内向き / 外向きのデータ転送"],["Storage class","S3 のストレージクラス"],["Requests","読み取り/書き込みのリクエスト数"],["Retrieval fee","データの取り出し料金（長期アーカイブ向けクラス）"],["Provisioned storage","プロビジョニングした容量"],["IOPS / Throughput","1 秒あたりの読み書き操作数 / 1 秒あたりに読み書きするデータ量"],["S3 Intelligent-Tiering","アクセス頻度に応じて階層を自動で移行する S3 クラス"],["Snapshot","ボリュームのバックアップ"],["Private IP address","プライベート IP アドレス"],["CDN (Content Delivery Network)","コンテンツ配信ネットワーク"],["Edge location","ユーザーに近いエッジロケーション"],["AWS Free Tier","AWS の無料利用枠"]]};
})();
(function(){var I=window.CLF_I18N=window.CLF_I18N||{};var L=I.ja=I.ja||{};['q','course','lessons','glossary','services','domains','ui'].forEach(function(k){L[k]=L[k]||{};});
L.course["4-3"]={title:"コスト管理ツールと AWS Organizations",goals:["AWS の利用前・利用中・利用後に、お金の管理でどのツールを使うかが分かる","Pricing Calculator、Cost Explorer、AWS Budgets、Cost and Usage Report を区別できる","cost allocation tags（コスト配分タグ）と、有効化が必要な理由を理解する","AWS Organizations と consolidated billing（一括請求）がどのように節約につながるかを理解する"],html:`
<h3>お金を管理する3つのタイミング</h3>
<p>AWS では、使った分に応じて料金が発生し続けます。確認を怠ると、月末に思いがけない請求書が届くことがあります。AWS には多くのツールがあり、それぞれ適したタイミングがあります。</p>
<div class="flow"><span>利用前: Pricing Calculator</span><span>利用中: Budgets（アラート）</span><span>利用後: Cost Explorer、Cost and Usage Report</span></div>
<div class="box idea"><b>🧠 かんたんに言うと</b><p>家計の食費管理に似ています。買い物に行く<b>前</b>に、何を買うか、だいたいいくらかかるかを見積もります。使っている<b>最中</b>は「今月 5 万円を超えたら知らせる」という上限を決めておきます。使った<b>後</b>は家計簿を開いてお金の行き先を確認し、来月いくら使いそうかを予想します。</p></div>

<h3>利用前: AWS Pricing Calculator</h3>
<p><b>AWS Pricing Calculator</b>（AWS の料金見積もりツール）は、構築する前にコストを<b>見積もる</b>ための無料のウェブツールです。サービスを選び、構成（何台、どのタイプ、何 GB 保存するか、どのリージョンか…）を入力すると、月額の見込み額が表示されます。</p>
<p>見積もりは保存して、上司や経理担当者に共有できます（リンクで共有、またはファイルにエクスポート）。オンプレミス (on-premises) のシステムから AWS へ移行する前にコストを比較するときにとても便利です。ただし Pricing Calculator はあくまで<b>見積もり</b>であり、実際に発生したコストを確認することは<b>できず</b>、アラートも送信しません。</p>

<h3>利用中と利用後: Budgets、Cost Explorer、CUR</h3>
<h4>AWS Budgets: しきい値を設定してアラートを受け取る</h4>
<p><b>AWS Budgets</b>（予算）では、しきい値を設定しておき、実績値または<b>予測値</b>がしきい値を超えたときに<b>アラートを送信</b>できます（E メールまたは Amazon SNS 経由）。budget には次の種類があります。</p>
<ul>
<li><b>Cost budget</b>: 金額を追跡します（例: 月 200 USD）。</li>
<li><b>Usage budget</b>: 使用量を追跡します（例: GB 数、インスタンスの稼働時間数）。</li>
<li><b>Reservation budget</b>（RI/Savings Plans）: <b>utilization</b>（購入した分のうち実際に使われた割合）または <b>coverage</b>（使用量のうち割引でカバーされた割合）がしきい値を<b>下回った</b>ときに通知します。つまり、使っていない予約分にお金を払っている状態です。</li>
</ul>
<p><b>Budgets actions</b>（Budgets のアクション）: しきい値を超えたとき、Budgets は<b>自動的に</b>（または承認を待って）制限用の <b>IAM policy</b> や <b>SCP</b> をアタッチしたり（例: 新しいリソースの作成をブロック）、EC2/RDS インスタンスを停止したりできます。自分でコードを書く必要はありません。</p>
<h4>AWS Cost Anomaly Detection: 異常な支出を検出する</h4>
<p>コストが不規則に上下するため、固定のしきい値を決めにくい場合があります。<b>AWS Cost Anomaly Detection</b>（コスト異常検出）は <b>machine learning</b>（機械学習）で普段の支出パターンを学習し、あるサービスやアカウントの支出が異常なときに、<b>root cause analysis</b>（根本原因分析）を添えて通知します。Budgets との違い: Budgets は<b>自分で設定した</b>しきい値に基づきますが、Anomaly Detection は何が異常かを<b>自分で学習</b>します。</p>
<h4>AWS Cost Explorer: 過去の分析と予測</h4>
<p><b>AWS Cost Explorer</b> は、コストの推移をグラフで表示します。サービス、メンバーアカウント (linked account)、リージョン、タグなどでフィルタリングやグループ化を行い、お金の行き先を確認できます。さらに、これまでの使用量をもとに将来のコストを<b>予測</b>します。Cost Explorer には RI と Savings Plans の utilization/coverage レポート（閲覧用）や、<b>Savings Plans recommendations</b> もあります。これは実際の利用履歴をもとに、1 時間あたり何 USD をコミットすべきか、どれだけ節約できるかを提案する機能です。</p>
<h4>AWS Cost and Usage Report (CUR)</h4>
<p><b>AWS Cost and Usage Report</b>（コストと使用状況レポート）は、<b>最も詳細な</b>データソースです。使用量の明細行ごと、リソースごとに、時間単位または日単位で記録されます。レポートは自分の <b>S3 bucket</b> に配信されます。そこから Amazon Athena や Amazon Quick（旧 Amazon QuickSight）などのツールで分析できます。現在、CUR は Billing コンソールの Data Exports 機能から設定します。</p>
<h4>Billing dashboard</h4>
<p>AWS Management Console の <b>Billing and Cost Management</b>（請求とコスト管理）ページは、今月の合計コスト、過去の月の請求書、支払い方法を確認したり、上記のツールにアクセスしたりする場所です。</p>
<table>
<tr><th>ツール</th><th>タイミング</th><th>用途</th></tr>
<tr><td>AWS Pricing Calculator</td><td>利用前</td><td>予定しているアーキテクチャのコストを見積もる</td></tr>
<tr><td>AWS Budgets</td><td>利用中</td><td>しきい値を設定（コスト、使用量、RI/Savings Plans）し、超過時（実績または予測）にアラート。自動アクションも可能</td></tr>
<tr><td>AWS Cost Anomaly Detection</td><td>利用中</td><td>ML が異常な支出を自動検出し、根本原因も提示。しきい値の設定は不要</td></tr>
<tr><td>AWS Cost Explorer</td><td>利用後</td><td>グラフ表示、過去のコスト分析、将来の予測</td></tr>
<tr><td>Cost and Usage Report</td><td>利用後</td><td>最も詳細なデータ。S3 に配信</td></tr>
</table>
<div class="box trap"><b>⚠️ よくあるひっかけ</b><p>Budgets と Cost Explorer はどちらも「予測がある」ため混同しがちです。覚え方: しきい値を超えたら<b>アラートを受け取りたい</b> → <b>Budgets</b>。コストを<b>グラフで見て分析したい</b> → <b>Cost Explorer</b>。そして<b>まだ何も動いていない</b>段階での見積もり → <b>Pricing Calculator</b> で、Cost Explorer ではありません（Cost Explorer には利用済みのデータが必要です）。</p></div>

<h3>Cost allocation tags: コストが誰のものかを把握する</h3>
<p><b>Tag</b>（タグ）は、AWS リソースに付ける「キー = 値」形式のラベルです。例: <code>Project = Website</code> や <code>Department = Marketing</code>。タグをコストの振り分けに使う場合、<b>cost allocation tags</b>（コスト配分タグ）と呼びます。</p>
<ul>
<li><b>AWS-generated tags</b>: AWS が自動で付けるので、何もする必要はありません。例えば <b>createdBy</b> タグは、どの IAM user または role がリソースを作成したかを記録します。エンジニアがタグ付けを忘れがちな場合にとても役立ちます。</li>
<li><b>User-defined tags</b>: 自分で名前と値を決めるタグです（例: Project、Department）。全員がきちんとタグを付けるかどうかに左右されます。</li>
</ul>
<p>重要なポイント: <b>どちらの種類も</b>、Billing ページで cost allocation tag として<b>有効化 (activate)</b> して初めて（Organizations を使っている場合は management account が実施）、Cost Explorer やコストレポートに表示されます。</p>
<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>AWS へ移行する前に、ミンさんは <b>Pricing Calculator</b> でコストを見積もり、ランさんに送って承認をもらいました。本番運用が始まると、ミンさんは <b>AWS Budgets</b> を月 200 USD に設定し、80% を超えたら 2 人に E メールが届くようにしました。ウェブサイト、注文アプリ、チャットボットのリソースに <code>Project</code> タグを付け、Billing でタグを有効化しました。月末に ランさんが <b>Cost Explorer</b> を開くと、チャットボットがウェブサイトと比べていくらかかっているかがすぐに分かります。</p></div>

<h3>AWS Organizations と consolidated billing</h3>
<p>会社が大きくなると、複数の <b>AWS account</b>（AWS アカウント）に分けるのが一般的です。テスト環境用、本番システム用、部署ごと…と分けることで、権限の分離やコストの切り分けがしやすくなります。</p>
<p><b>AWS Organizations</b> は、それらのアカウントを 1 つの組織にまとめ、1 つの <b>management account</b>（管理アカウント）から一元管理できるようにします。残りのアカウントは <b>member accounts</b>（メンバーアカウント）と呼ばれ、OU (Organizational Unit) というグループに整理できます。</p>
<p>Organizations の <b>consolidated billing</b>（一括請求）機能には次のメリットがあります。</p>
<ul>
<li>すべてのアカウントを<b>1 つの請求書</b>にまとめ、<b>management account</b> が支払います。アカウントごとの明細も引き続き確認できます。</li>
<li><b>ボリューム割引</b> (volume discounts): 各アカウントの使用量が合算されます。例えば S3 は使うほど単価が下がるため、合算することでより安い料金階層に早く到達できます。</li>
<li>RI と Savings Plans の割引はアカウント間で共有されます（デフォルト）。management account はアカウントごとに共有をオフにできます。</li>
<li>consolidated billing の利用に<b>追加料金はかかりません</b>。</li>
</ul>
<p>もう 1 点: Organizations には <b>SCPs</b>（Service Control Policies、サービスコントロールポリシー）があり、メンバーアカウントに許可される操作の上限を設定できます。</p>
<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>日本支店を開いたとき、BanhNgon にはベトナム、日本、テスト用の 3 つのアカウントがありました。ミンさんは 3 つすべてを AWS Organizations にまとめました。ランさんが受け取る請求書は毎月 1 通だけになり、S3 の使用量が合算されるので単価が有利になり、ベトナムのアカウントで購入した Savings Plans が日本のアカウントの料金削減にも役立ちます。</p></div>
<div class="box exam"><b>🎯 試験でよく問われるポイント</b><ul>
<li>"estimate cost before migrating / before building" → AWS Pricing Calculator</li>
<li>"alert when costs exceed a threshold" / "forecasted cost exceeds budget" → AWS Budgets</li>
<li>"RI / Savings Plans utilization or coverage falls below X%" → AWS Budgets (reservation budget)</li>
<li>"automatically apply an IAM policy / SCP when budget is exceeded, no code" → AWS Budgets actions</li>
<li>"machine learning", "unusual spend", "root cause"、固定のしきい値なし → AWS Cost Anomaly Detection</li>
<li>"recommend hourly commitment based on past usage" → Cost Explorer の Savings Plans recommendations</li>
<li>"which IAM user/role created each resource" を人によるタグ付けに頼らずに把握 → AWS-generated tag の createdBy を有効化</li>
<li>"visualize, analyze past costs, forecast" → AWS Cost Explorer</li>
<li>"most detailed / comprehensive cost and usage data, delivered to S3" → AWS Cost and Usage Report</li>
<li>"track costs by project or department" → cost allocation tags</li>
<li>"types of cost allocation tags" → AWS-generated と user-defined</li>
<li>"single bill, volume discounts for multiple accounts" → AWS Organizations consolidated billing</li>
</ul></div>
`,summary:["利用前: AWS Pricing Calculator でコストを見積もる。","利用中: AWS Budgets でしきい値（cost、usage、RI/Savings Plans）を設定し、実績または予測が超えたらアラート。Budgets actions は制限用の IAM policy/SCP を自動でアタッチできる。","AWS Cost Anomaly Detection は ML で異常な支出を自動検出し、根本原因も示す。固定のしきい値は不要。","利用後: Cost Explorer で分析・予測と Savings Plans の提案。Cost and Usage Report は最も詳細なデータで、S3 に配信される。","Cost allocation tags には AWS-generated（例: createdBy。AWS が自動付与）と user-defined があり、どちらも Billing で有効化して初めてレポートに表示される。","AWS Organizations は複数のアカウントをまとめる。consolidated billing（一括請求）は請求書を 1 つにし、ボリューム割引が受けられ、無料で使える。","Organizations の SCPs はメンバーアカウントに許可される操作を制限する。"],terms:[["AWS Pricing Calculator","AWS の料金見積もりツール"],["AWS Budgets","予算の設定とコストのアラート"],["AWS Cost Explorer","コストの分析・予測ツール"],["Forecast","予測"],["Reservation budget (utilization / coverage)","RI・Savings Plans の使用率／カバレッジを追跡する予算"],["Budgets actions","予算超過時の自動アクション"],["AWS Cost Anomaly Detection","ML による異常な支出の検出"],["AWS Cost and Usage Report (CUR)","最も詳細なコストと使用状況のレポート"],["Billing and Cost Management console","請求とコスト管理のコンソール"],["Tag","リソースに付けるラベル（タグ）"],["Cost allocation tags","コスト配分タグ"],["AWS-generated / User-defined tags","AWS 生成タグ／ユーザー定義タグ"],["AWS Organizations","複数の AWS アカウントを管理するサービス"],["Management account / Member account","管理アカウント／メンバーアカウント"],["Consolidated billing","一括請求"],["Volume discounts","ボリューム割引"],["Service Control Policies (SCPs)","メンバーアカウントの権限を制限するポリシー"]]};
L.course["4-4"]={title:"AWS Support、技術リソース、パートナー",goals:["現行の Exam Guide に基づく AWS Support プランと、どのプランが無料かが分かる","Trusted Advisor と AWS Health Dashboard の用途を理解する","サポート情報源（re:Post、Knowledge Center、Prescriptive Guidance、ドキュメント）を区別できる","AWS Professional Services、AWS Partner Network、AWS Marketplace、Trust & Safety をいつ頼るかが分かる"],html:`
<h3>AWS Support プラン</h3>
<p>AWS を使っていると、サーバーの障害、請求書の内容が分からない、アーキテクチャの相談をしたい、といった問題に直面することがあります。<b>AWS Support</b>（AWS のサポート）は、お客様を支援するサービスプランです。現行の CLF-C02 Exam Guide では次のプランがあります。</p>
<ul>
<li><b>Basic Support</b>: <b>無料</b>で、<b>すべての AWS のお客様</b>が利用できます。アカウントと請求に関する質問向けの <b>24/7 の customer service</b>、ドキュメント、ホワイトペーパー、<b>AWS re:Post</b>、パーソナライズされた <b>AWS Health</b> ページ、<b>Trusted Advisor</b> の <b>core checks</b> が含まれます。最も重要なポイント: Basic プランでは <b>technical support case を開くことができません</b>（技術的なケース）。開けるのはアカウント/請求に関するケース (customer service) と <b>service limit increase</b>（上限緩和）だけです。</li>
<li><b>AWS Business Support+</b>: 最も安い有料プランで、AWS が<b>本番 (production) ワークロードの最低ライン</b>として推奨しています。<b>technical support case</b> を <b>phone、web、chat</b> で 24/7、無制限に開けます（<b>AWS Support App in Slack</b> と <b>AWS Support API</b> も利用可能）。<b>Trusted Advisor</b> のチェックの <b>full set</b>、<b>AWS Health API</b>、AI によるサポート、AWS エキスパートによる<b>アーキテクチャの助言</b> (architectural guidance) が含まれます。重要なシステムがダウンした場合の応答: <b>&lt; 30 分</b>。</li>
<li><b>AWS Enterprise Support</b>: 組織全体の <b>business-critical</b> なワークロード向け。<b>designated Technical Account Manager (TAM)</b>（自社専任の技術アドバイザー）、追加料金なしの <b>AWS Security Incident Response</b>、<b>Trusted Advisor Priority</b>、大型イベント/製品ローンチ (planned events) の支援、プロアクティブなサービスが加わります。重要なシステムがダウンした場合の応答: <b>&lt; 15 分</b>。</li>
<li><b>AWS Unified Operations</b>: 最上位のプランで、高い回復力 (resilience) が必要な <b>mission-critical</b> なワークロード向け。TAM に加えて <b>Domain Specialist Engineers</b> と <b>Incident Management Engineers</b>、<b>24/7 のワークロード監視</b>があります。重大なインシデント: <b>Incident Management Engineer</b> が <b>&lt; 5 分</b>で応答します。</li>
</ul>
<p><b>AWS Support Plans</b> ページ（2026 年 11 月時点で照合）によると、3 つの有料プランの初回応答時間は次のとおりです。</p>
<ul>
<li><b>Business/mission-critical system down</b>: Business Support+ &lt; 30 分 · Enterprise &lt; 15 分 · Unified Operations &lt; 5 分。</li>
<li><b>Production system down</b>: &lt; 1 時間（3 プラン共通）。</li>
<li><b>Production system impaired</b>: &lt; 4 時間（3 プラン共通）。</li>
<li><b>System impaired</b>: &lt; 12 時間（3 プラン共通）。</li>
<li><b>General guidance</b>: &lt; 24 時間（3 プラン共通）。</li>
</ul>
<p> これらは AWS が達成を目指す<b>応答の目標</b>であり、復旧時間の約束ではありません。各プランの料金は <b>AWS Support Plans</b> ページで確認でき、変更される可能性があるため、ネット上の古い料金の数字を暗記しないでください。</p>
<table>
<tr><th>項目</th><th>Basic Support</th><th>AWS Business Support+</th><th>AWS Enterprise Support</th><th>AWS Unified Operations</th></tr>
<tr><td>料金</td><td>無料、すべてのお客様</td><td>有料</td><td>有料</td><td>有料</td></tr>
<tr><td>推奨対象</td><td>すべてのお客様が利用可能</td><td>本番 (production) ワークロード（最低ライン）</td><td>business-critical なワークロード</td><td>mission-critical なワークロード</td></tr>
<tr><td>Technical support case</td><td>不可（account/billing と service limit increase のみ）</td><td>可、無制限。phone、web、chat で 24/7</td><td>可、Business Support+ と同じ</td><td>可、Business Support+ と同じ</td></tr>
<tr><td>重要なシステムの障害 (critical) への応答</td><td>なし</td><td>&lt; 30 分</td><td>&lt; 15 分</td><td>&lt; 5 分 (Incident Management Engineer)</td></tr>
<tr><td>Production system down</td><td>なし</td><td>&lt; 1 時間</td><td>&lt; 1 時間</td><td>&lt; 1 時間</td></tr>
<tr><td>Trusted Advisor</td><td>Core checks</td><td>Full set of checks</td><td>Full set + Trusted Advisor Priority</td><td>Full set + Trusted Advisor Priority</td></tr>
<tr><td>AWS Health</td><td>パーソナライズされた Health Dashboard、アラート</td><td>Health Dashboard + <b>Health API</b></td><td>Health Dashboard + Health API</td><td>Health Dashboard + Health API + 24/7 のワークロード監視</td></tr>
<tr><td>専任担当者</td><td>なし</td><td>なし（designated TAM は Enterprise から）</td><td><b>Designated TAM</b></td><td>Designated TAM + Domain Specialist Engineers + Incident Management Engineers</td></tr>
</table>
<div class="box exam"><b>🎯 試験でよく問われるポイント</b><ul>
<li>"included for all customers at no cost" → Basic Support</li>
<li>"cannot open technical support cases" / "only account and billing questions" → Basic Support</li>
<li>"minimum recommended plan for production workloads", "lowest-cost plan with 24/7 technical support", "full set of Trusted Advisor checks", "AWS Health API"（これが使える最も安いプラン） → AWS Business Support+</li>
<li>"designated Technical Account Manager (TAM)", "Trusted Advisor Priority", "business-critical", "critical response &lt; 15 minutes" → AWS Enterprise Support</li>
<li>"mission-critical", "Incident Management Engineers", "domain specialist engineers", "response within 5 minutes", "24/7 workload monitoring" → AWS Unified Operations</li>
</ul></div>
<p>古い学習教材に <b>Developer</b>、<b>Business</b>、<b>Enterprise On-Ramp</b> といったプランが出てくる場合、それらは廃止が進んでいる旧プランです。<b>2025 年 12 月 2 日</b>から AWS は Developer と Business Support の新規販売を終了し（<b>Business Support+</b> に置き換え）、2026 年中に Enterprise On-Ramp の利用者は自動的に <b>Enterprise Support</b> へアップグレードされ、<b>2027 年 1 月 1 日</b>から 3 つの旧プランはすべて正式にサポート終了となります（AWS GovCloud (US) リージョンのみ継続）。そのため古い練習問題では "Developer Support" や "Enterprise On-Ramp TAM pool" が問われることがあります。名前は知っておきつつ、現行のプランで学習しましょう。試験では、Basic プランは無料、有料プランは応答が速くエキスパートによる支援が加わる、という要点を軸に判断してください。</p>
<div class="box idea"><b>🧠 かんたんに言うと</b><p>スマートフォンの保証に似ています。端末を買えば誰でも無料の基本保証が付きます。使い方ガイドを調べたり、請求についてコールセンターに問い合わせたりできます。優先対応の技術者、迅速な応答、さらには自社専任の担当者が欲しければ、より上位の保証プランを購入します。</p></div>
<p><b>サポートリクエストを開く</b> (support case) 場所は、AWS Management Console の <b>AWS Support Center</b> です。Basic Support でも、アカウントと請求に関するケースは開けます。</p>

<h3>AWS Trusted Advisor と AWS Health Dashboard</h3>
<h4>AWS Trusted Advisor</h4>
<p><b>AWS Trusted Advisor</b>（信頼できるアドバイザー）は、アカウントを自動的にチェックし、次のカテゴリで推奨事項を提示します。</p>
<ul>
<li><b>Cost optimization</b>（コスト最適化）: 例えばアイドル状態で動いているサーバー、どこにもアタッチされていない EBS ボリューム。</li>
<li><b>Performance</b>（パフォーマンス）。</li>
<li><b>Security</b>（セキュリティ）: 例えば広く開放されたネットワークポート、MFA が有効になっていないルートアカウント。</li>
<li><b>Fault tolerance</b>（耐障害性）: 例えばバックアップがない、1 つの AZ でしか動いていない。</li>
<li><b>Service limits / quotas</b>（サービスの制限）: 上限に近づくと警告します。</li>
<li><b>Operational excellence</b>（運用上の優秀性）: 例えば推奨されるログ記録や監視の設定が不足している。</li>
</ul>
<p>Basic Support では一部のコアチェックのみ利用でき、上位のプランではより多くのチェックが利用できます。</p>
<h4>AWS Health Dashboard</h4>
<p><b>AWS Health Dashboard</b>（AWS のヘルス状況ダッシュボード）は AWS サービスの状態を示し、特に<b>自分のリソースに影響する</b>障害やメンテナンス予定を、対処方法のガイダンスとともに知らせます。CloudTrail（自分のアカウントで誰がどの API を呼び出したかを記録する）とは別物です。また <b>AWS Health API</b> を使うと、自分のソフトウェアからこれらの情報を自動的に取得できます。</p>
<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>ある朝、BanhNgon のウェブサイトが異常に遅くなりました。ミンさんが <b>AWS Health Dashboard</b> を開くと、自分のサーバーが動いている AZ で障害が発生していると AWS が通知していました。この件の後、ミンさんは <b>Trusted Advisor</b> を確認し、複数の AZ で動かすこと (fault tolerance) と、放置されていた EBS ボリュームをいくつか削除すること (cost optimization) という推奨事項を受け取りました。</p></div>

<h3>自分で学び、調べるためのリソース</h3>
<ul>
<li><b>AWS re:Post</b>: Q&amp;A コミュニティ。質問を投稿すると、他のユーザーや AWS のエキスパートが回答します。</li>
<li><b>AWS Knowledge Center</b>: よくある質問やトラブルに対する回答記事を AWS がまとめたものです（現在は re:Post 上にあります）。</li>
<li><b>AWS Prescriptive Guidance</b>: システムをクラウドへ移行・モダナイズするための、実証済みの戦略、ガイド、パターン (pattern)。</li>
<li><b>AWS Documentation</b>（技術ドキュメント）、<b>whitepapers</b>（ホワイトペーパー、掘り下げた分析記事）、<b>AWS blogs</b>: 公式かつ無料の知識ソース。</li>
</ul>
<p>上記の情報源はすべて<b>セルフサービス (self-service) かつ無料</b>で、Basic Support だけのお客様を含むすべてのお客様が利用できます。これに対して、<b>AWS Professional Services</b>、APN パートナー、有料の Support プランはいずれも<b>費用がかかります</b>。</p>
<div class="box trap"><b>⚠️ よくあるひっかけ</b><p>re:Post と Knowledge Center は混同しがちです。<b>re:Post</b> は <b>Q&amp;A コミュニティ</b> (community-driven Q&amp;A)。<b>Knowledge Center</b> はよくある質問に対する<b>既存の記事</b>。<b>Prescriptive Guidance</b> は migration のための<b>戦略・パターンのガイド</b>。そして <b>AWS Artifact</b> はコンプライアンスレポートをダウンロードする場所であり、Q&amp;A の情報源ではありません。</p></div>

<h3>人による支援: Professional Services、Partners、Trust &amp; Safety</h3>
<ul>
<li><b>AWS Professional Services</b>: AWS 自身のエキスパートチームで、大規模な移行 (migration) などの大きな目標を達成するために、お客様と直接協力します。</li>
<li><b>AWS Solutions Architects</b>（ソリューションアーキテクト、SA）: AWS の技術担当社員（通常はアカウント/営業チームと一緒に活動）で、お客様が AWS 上で<b>アーキテクチャを設計</b>するのを支援します。適切なサービスの選定、Well-Architected のベストプラクティスの適用、構築前の設計レビューなどです。Professional Services（プロジェクトを一緒に進める<b>有料</b>のコンサルティングチーム）や TAM（運用に寄り添う担当者で、Enterprise Support 以上のプランに付属）とは異なります。試験のキーワード: "guidance on designing / architecting a solution on AWS" → Solutions Architect。</li>
<li><b>AWS Partner Network (APN)</b>（AWS パートナーネットワーク）: AWS と協業する外部の企業です。主に 2 つのタイプがあります。<b>system integrators</b>/コンサルティング・導入企業（プロジェクトを依頼する相手）と、<b>ISVs</b>（Independent Software Vendors、独立系ソフトウェアベンダー。AWS 上で動くソフトウェアを販売）です。APN に参加するメリット（Exam Guide の task 4.3 による）:
<ul>
<li><b>Partner training and certification</b>: パートナーの社員向けのトレーニングと認定。</li>
<li><b>Partner events</b>: パートナー向けのイベント（カンファレンス、ワークショップ、製品アップデートのセッション）。</li>
<li><b>Partner volume discounts</b>: パートナー向けのボリューム優待価格。</li>
<li><b>AWS Competency</b> プログラムによる<b>専門性の認定</b>（例: migration、セキュリティの専門）。</li>
<li><b>go-to-market</b> の支援: マーケティング、共同販売、パートナー一覧 (Partner Solutions Finder) への掲載により顧客に見つけてもらえる。</li>
<li><b>Funding</b>: AWS からの資金支援。例えば顧客との migration プロジェクトや概念実証 (proof of concept) 向け。</li>
</ul> 注意: APN に参加しても、パートナーの顧客に有料の Support プランが無償で付与されるわけでは<b>ありません</b>。</li>
<li><b>AWS Trust &amp; Safety team</b>: <b>不正利用</b> (abuse) に対応するチームです。AWS リソースがスパム送信、攻撃、詐欺などに使われているのを見つけたら、このチームに報告します。</li>
</ul>

<h3>AWS Marketplace</h3>
<p><b>AWS Marketplace</b> はオンラインの「ソフトウェア市場」です。AWS 上で動くサードパーティ製ソフトウェア（セキュリティ、監視、データベースなど）を探し、購入し、すばやくデプロイできます。購入代金は自分の <b>AWS の請求書にまとめて計上</b>されるため、ベンダーごとに個別の支払い契約を結ぶ必要がありません。AWS の請求書に含まれるので、ソフトウェアのコストは Cost Explorer などのツールで確認・分析できます。</p>
<ul>
<li><b>販売者</b>側: ソフトウェアベンダー (ISV) が AWS の顧客に製品（SaaS を含む）を販売したい場合は、<b>AWS Marketplace に製品を出品</b>します。</li>
<li><b>Private Marketplace</b>（プライベートマーケットプレイス）: 会社が<b>承認済み製品のカタログ</b>を作成し、組織内のすべてのアカウントの社員は、そのカタログにある製品だけを表示・サブスクライブできます。調達の統制 (governance) に使います。</li>
<li><b>Entitlement</b>（購入済みの使用権）: Marketplace で製品をサブスクライブするたびに、契約に基づく使用権（ライセンス数、ユーザー数、期間）を取得します。これらの権利は一元的に追跡でき（例: <b>AWS License Manager</b>）、組織内の他のアカウントと共有できます。Exam Guide (task 4.3) は Marketplace を 3 つの役割で取り上げています。<b>コスト管理</b>（AWS の請求書にまとめて計上）、<b>ガバナンス</b>（Private Marketplace）、<b>entitlement</b> です。</li>
</ul>
<div class="box example"><b>🍰 例: BanhNgon ベーカリー</b><p>日本への進出にあたり、ランさんは migration の経験がある <b>APN パートナー</b>にシステム設計の支援を依頼しました。ミンさんは <b>AWS Marketplace</b> でファイアウォールソフトウェアを購入し、代金はそのまま AWS の請求書に含まれます。ある日、ミンさんは AWS 上のサーバーが店のメールボックスにスパムを送り続けていることに気づき、<b>AWS Trust &amp; Safety</b> に報告しました。</p></div>

<h3>早見表: 何が必要か → どこを頼るか</h3>
<table>
<tr><th>ニーズ</th><th>頼る先</th></tr>
<tr><td>すべてのアカウントに付いている無料のサポート</td><td>Basic Support</td></tr>
<tr><td>サポートリクエスト (support case) を開く</td><td>AWS Support Center</td></tr>
<tr><td>コスト削減、セキュリティ、耐障害性、サービスの制限に関する推奨事項</td><td>AWS Trusted Advisor</td></tr>
<tr><td>自分のリソースに影響する AWS の障害/メンテナンス</td><td>AWS Health Dashboard / Health API</td></tr>
<tr><td>コミュニティやエキスパートに質問する</td><td>AWS re:Post</td></tr>
<tr><td>よくある質問に対する既存の回答記事</td><td>AWS Knowledge Center</td></tr>
<tr><td>migration のための戦略、パターン</td><td>AWS Prescriptive Guidance</td></tr>
<tr><td>大規模プロジェクトを一緒に進める AWS のエキスパートチーム</td><td>AWS Professional Services</td></tr>
<tr><td>AWS 上のソリューションアーキテクチャ設計の助言</td><td>AWS Solutions Architects</td></tr>
<tr><td>外部の企業にコンサルティング、導入を依頼する</td><td>AWS Partner Network</td></tr>
<tr><td>サードパーティ製ソフトウェアを購入し、AWS の請求書で支払う</td><td>AWS Marketplace</td></tr>
<tr><td>AWS リソースが不正利用されていることを報告する</td><td>AWS Trust &amp; Safety</td></tr>
</table>
<div class="box exam"><b>🎯 試験でよく問われるポイント</b><ul>
<li>"support plan included at no additional cost" → Basic Support</li>
<li>"open a technical support case" → AWS Support Center</li>
<li>"recommendations to reduce cost, idle resources, security, service limits" → AWS Trusted Advisor</li>
<li>"events and scheduled maintenance affecting my resources" → AWS Health Dashboard</li>
<li>"community-driven Q&amp;A" → AWS re:Post</li>
<li>"proven strategies, guides, patterns for migration" → AWS Prescriptive Guidance</li>
<li>"global team of AWS experts for business outcomes" → AWS Professional Services</li>
<li>"hire a partner to help migrate" → AWS Partner Network</li>
<li>"buy third-party software, billed through AWS" → AWS Marketplace; "sell my software/SaaS to AWS customers" → AWS Marketplace に出品</li>
<li>"curated list of approved products", "control which products teams can subscribe to" → Private Marketplace</li>
<li>"manage and share licenses/entitlements for software bought on AWS Marketplace" → AWS Marketplace（AWS License Manager で追跡）</li>
<li>"training and certification, partner events, volume discounts, recognized expertise, go-to-market support, funding for a partner company" → APN に参加（AWS Competency/specializations）</li>
<li>"help designing an architecture / guidance on how to build on AWS" → AWS Solutions Architects</li>
<li>"self-service, no additional cost" → re:Post、Knowledge Center、Prescriptive Guidance、documentation（Professional Services ではない）</li>
<li>"AWS resources used for spam / abuse" → AWS Trust &amp; Safety</li>
</ul></div>
`,summary:["Exam Guide に基づく Support プラン: Basic Support（無料、全アカウント）、AWS Business Support+、AWS Enterprise Support、AWS Unified Operations。詳細は公式ページで確認する。","support case は AWS Support Center で開く。","Trusted Advisor は cost optimization、performance、security、fault tolerance、service limits、operational excellence をチェックする。","AWS Health Dashboard と Health API は、自分のリソースに影響する障害やメンテナンスを知らせる。","re:Post は Q&A コミュニティ、Knowledge Center は既存の回答記事、Prescriptive Guidance は戦略とパターン。","Professional Services は AWS のエキスパート（有料）。APN はコンサルティング/導入パートナーと ISV から成り、トレーニング、専門性の認定、go-to-market の支援を受けられる。","AWS Marketplace はサードパーティ製ソフトウェアを販売し、代金は AWS の請求書に計上される。Private Marketplace は承認済み製品のカタログに限定する。","AWS リソースの不正利用は AWS Trust & Safety に報告する。"],terms:[["AWS Support plans","AWS のサポートプラン"],["Basic Support","無料の基本サポートプラン"],["Support case","サポートリクエスト（ケース）"],["AWS Support Center","サポートケースの作成・追跡を行うセンター"],["AWS Trusted Advisor","アカウントをチェックして推奨事項を示すツール"],["Service limits / quotas","サービスの制限、クォータ"],["AWS Health Dashboard","サービスとリソースの状態を示すダッシュボード"],["AWS re:Post","AWS に関する Q&A コミュニティ"],["AWS Knowledge Center","よくある質問への回答記事集"],["AWS Prescriptive Guidance","実証済みの戦略とパターンのガイド"],["AWS Professional Services","AWS のコンサルティングエキスパートチーム"],["AWS Partner Network (APN)","AWS パートナーネットワーク"],["ISV (Independent Software Vendor)","独立系ソフトウェアベンダー"],["AWS Marketplace","AWS 上のサードパーティ製ソフトウェアの市場"],["Private Marketplace","会社が承認した Marketplace 製品のカタログ"],["AWS Trust & Safety","不正利用の報告に対応するチーム"]]};
})();
