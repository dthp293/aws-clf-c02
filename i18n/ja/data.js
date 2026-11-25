(function(){var I=window.CLF_I18N=window.CLF_I18N||{};var L=I.ja=I.ja||{};['q','course','lessons','glossary','services','domains','ui'].forEach(function(k){L[k]=L[k]||{};});
Object.assign(L.domains,{1:"クラウドのコンセプト",2:"セキュリティとコンプライアンス",3:"クラウドテクノロジーとサービス",4:"請求、料金、およびサポート"});
Object.assign(L.glossary,{
"upfront":{meaning:"前払い",hint:"固定費（CapEx）"},
"pay only for":{meaning:"使った分だけ支払う",hint:"Pay-as-you-go → 変動費"},
"workload":{meaning:"稼働中のシステム／アプリケーション",hint:""},
"recover from failures":{meaning:"障害から復旧する",hint:"Well-Architected → Reliability"},
"migrate":{meaning:"（クラウドへ）移行する",hint:"7R の移行戦略"},
"without making any changes":{meaning:"何も変更せずに",hint:"Rehost (lift-and-shift)"},
"demand":{meaning:"需要、負荷",hint:"Elasticity, Auto Scaling"},
"perspectives":{meaning:"パースペクティブ（視点）",hint:"AWS CAF には 6 つの perspective がある"},
"shared responsibility model":{meaning:"責任共有モデル",hint:"AWS: OF the cloud · お客様: IN the cloud"},
"patching":{meaning:"パッチ適用、修正プログラムの更新",hint:"EC2 の OS → お客様; RDS → AWS"},
"guest operating system":{meaning:"仮想マシン内のオペレーティングシステム",hint:"お客様の責任"},
"physical security":{meaning:"物理的セキュリティ",hint:"AWS の責任"},
"hypervisor":{meaning:"仮想化レイヤー",hint:"AWS の責任"},
"root user":{meaning:"ルートユーザー（全権限を持つアカウント）",hint:"MFA を有効化し、日常的には使わない"},
"MFA":{meaning:"多要素認証",hint:""},
"access keys":{meaning:"アクセスキー（CLI/SDK 用）",hint:"EC2 上に保存しない → IAM role を使う"},
"best practice":{meaning:"推奨される方法（ベストプラクティス）",hint:""},
"compliance reports":{meaning:"コンプライアンスレポート",hint:"AWS Artifact"},
"auditor":{meaning:"監査人",hint:""},
"audit":{meaning:"検査、監査",hint:"誰が何をしたか → CloudTrail"},
"API calls":{meaning:"API コール（操作）",hint:"CloudTrail"},
"SQL injection":{meaning:"SQL コードを注入する攻撃",hint:"AWS WAF"},
"cross-site scripting":{meaning:"XSS 攻撃",hint:"AWS WAF"},
"DDoS":{meaning:"分散型サービス拒否攻撃",hint:"AWS Shield"},
"threats":{meaning:"脅威",hint:"Amazon GuardDuty"},
"MOST secure":{meaning:"最も安全",hint:"多くの場合: IAM role, least privilege, MFA"},
"least privilege":{meaning:"最小権限",hint:"必要な権限だけを付与する"},
"data centers":{meaning:"データセンター",hint:""},
"provisioning":{meaning:"プロビジョニング（リソースを事前に割り当て・準備すること）",hint:"“without provisioning” → serverless"},
"serverless":{meaning:"サーバーの管理が不要",hint:"Lambda, Fargate, DynamoDB, S3"},
"rarely accessed":{meaning:"めったにアクセスされない",hint:"S3 IA / Glacier"},
"archive":{meaning:"長期保管（アーカイブ）",hint:"S3 Glacier"},
"retrieval time":{meaning:"データの取り出しにかかる時間",hint:"長時間待てる → Glacier Deep Archive"},
"MOST cost-effective":{meaning:"最もコスト効率が高い",hint:"要件を満たす中で最も安い選択肢を選ぶ"},
"fully managed":{meaning:"AWS が完全に管理する（フルマネージド）",hint:""},
"NoSQL":{meaning:"非リレーショナルデータベース",hint:"DynamoDB"},
"latency":{meaning:"レイテンシー（遅延）",hint:"CloudFront、ユーザーに近いリージョンを選ぶ"},
"caching":{meaning:"キャッシュ",hint:"CloudFront, ElastiCache"},
"edge location":{meaning:"エッジロケーション（ユーザーに近い拠点）",hint:"CloudFront, Route 53"},
"static content":{meaning:"静的コンテンツ（画像、CSS、JS）",hint:"S3 + CloudFront"},
"incoming traffic":{meaning:"受信トラフィック",hint:"Elastic Load Balancing"},
"on-premises":{meaning:"オンプレミス（自社内のインフラ）",hint:""},
"public internet":{meaning:"パブリックインターネット",hint:"インターネットを経由しない → Direct Connect"},
"dedicated":{meaning:"専用の、占有の",hint:"Direct Connect, Dedicated Hosts"},
"steady-state":{meaning:"安定して一定の負荷",hint:"Reserved Instances / Savings Plans"},
"interrupted":{meaning:"中断される",hint:"中断を許容できる → Spot"},
"fault-tolerant":{meaning:"障害に耐えられる（耐障害性がある）",hint:"Spot; Multi-AZ アーキテクチャ"},
"batch processing":{meaning:"バッチ処理",hint:""},
"threshold":{meaning:"しきい値",hint:"AWS Budgets"},
"estimate":{meaning:"見積もる",hint:"AWS Pricing Calculator"},
"volume discounts":{meaning:"ボリュームディスカウント（利用量に応じた割引）",hint:"Consolidated billing"},
"combined usage":{meaning:"合算した使用量",hint:"Consolidated billing"},
"data transfer out":{meaning:"アウトバウンドのデータ転送（外へ出るデータ）",hint:"課金される"},
"data transfer in":{meaning:"インバウンドのデータ転送（入ってくるデータ）",hint:"無料"},
"highly available":{meaning:"高可用性",hint:"Multi-AZ, ELB"},
"least operational overhead":{meaning:"運用の手間が最も少ない",hint:"managed/serverless のサービスを選ぶ"},
"Choose TWO":{meaning:"2 つ選択する",hint:"2 つとも過不足なく正しく選ぶ必要がある"},
"environmental impact":{meaning:"環境への影響",hint:"Well-Architected → Sustainability"},
"operations as code":{meaning:"運用をコードで行う",hint:"Operational Excellence"},
"idle":{meaning:"アイドル状態、使われていない",hint:"Trusted Advisor / Stop guessing capacity"},
"encryption keys":{meaning:"暗号化キー",hint:"AWS KMS"},
"credentials":{meaning:"認証情報",hint:"Secrets Manager; 共有しない"},
"rotate":{meaning:"ローテーションする、定期的に変更する",hint:"Secrets Manager"},
"sensitive data":{meaning:"機密データ",hint:"Amazon Macie"},
"vulnerabilities":{meaning:"セキュリティの脆弱性",hint:"Amazon Inspector"},
"stateful":{meaning:"接続の状態を記憶する（ステートフル）",hint:"Security group"},
"stateless":{meaning:"状態を記憶しない（ステートレス）",hint:"Network ACL"},
"security posture":{meaning:"全体的なセキュリティの状態",hint:"AWS Security Hub"},
"sign in once":{meaning:"一度だけサインインする",hint:"IAM Identity Center (SSO)"},
"block-level storage":{meaning:"ブロックレベルのストレージ（ディスク）",hint:"Amazon EBS"},
"analytical queries":{meaning:"分析クエリ",hint:"Amazon Redshift"},
"read-heavy":{meaning:"読み取りが多い",hint:"ElastiCache, read replica"},
"decouple":{meaning:"コンポーネントを切り離す（疎結合にする）",hint:"Amazon SQS"},
"publish/subscribe":{meaning:"発行／購読モデル",hint:"Amazon SNS"},
"templates":{meaning:"インフラを定義するテンプレート",hint:"AWS CloudFormation (IaC)"},
"repeatable":{meaning:"繰り返し実行できる",hint:"IaC → CloudFormation"},
"memory-intensive":{meaning:"メモリ（RAM）を大量に必要とする",hint:"Memory optimized"},
"forecast":{meaning:"予測",hint:"AWS Cost Explorer"},
"server-bound software licenses":{meaning:"サーバーに紐づくライセンス",hint:"Dedicated Hosts"},
"third-party software":{meaning:"サードパーティー製ソフトウェア",hint:"AWS Marketplace"},
"hybrid":{meaning:"オンプレミスとクラウドの組み合わせ（ハイブリッド）",hint:"Storage Gateway, Outposts, VPN"},
"BYOL":{meaning:"既存のライセンスを持ち込んで使う",hint:"Dedicated Hosts, License Manager"},
"rightsizing":{meaning:"適切なサイズを選ぶ",hint:"Compute Optimizer, Cost Explorer"},
"minimal downtime":{meaning:"最小限のダウンタイム",hint:"DMS（DB の移行）"},
"data at rest":{meaning:"保管中のデータ",hint:"KMS"},
"data in transit":{meaning:"転送中のデータ",hint:"TLS, ACM"},
"corporate credentials":{meaning:"既存の社内アカウント（認証情報）",hint:"Federation, IAM Identity Center"},
"temporary access":{meaning:"一時的なアクセス権限",hint:"IAM role"},
"root cause":{meaning:"根本原因",hint:"Amazon Detective"},
"data residency":{meaning:"データレジデンシー（データの保管場所に関する要件）",hint:"適切なリージョンを選ぶ"},
"disaster recovery":{meaning:"ディザスタリカバリ（災害復旧）",hint:"Multi-Region, Elastic Disaster Recovery"},
"single points of failure":{meaning:"単一障害点",hint:"Multi-AZ で回避する"},
"Kubernetes":{meaning:"コンテナオーケストレーションのプラットフォーム",hint:"Amazon EKS"},
"schema":{meaning:"データベースの構造（スキーマ）",hint:"AWS SCT"},
"MongoDB":{meaning:"ドキュメント型のデータベース",hint:"Amazon DocumentDB"},
"sentiment":{meaning:"感情（ポジティブ／ネガティブ）",hint:"Amazon Comprehend"},
"lifelike speech":{meaning:"自然な音声",hint:"Amazon Polly"},
"scanned documents":{meaning:"スキャンした文書",hint:"Amazon Textract"},
"streaming data":{meaning:"連続的に流れるストリーミングデータ",hint:"Amazon Kinesis"},
"real-time":{meaning:"リアルタイム",hint:"Kinesis"},
"dashboards":{meaning:"ダッシュボード（視覚的な管理画面）",hint:"Amazon Quick（旧 QuickSight）, CloudWatch"},
"event bus":{meaning:"イベントを中継する経路（イベントバス）",hint:"Amazon EventBridge"},
"contact center":{meaning:"カスタマーサポートのコンタクトセンター",hint:"Amazon Connect"},
"virtual Windows and Linux desktops":{meaning:"仮想デスクトップ",hint:"Amazon WorkSpaces"},
"static IP addresses":{meaning:"静的 IP アドレス",hint:"Global Accelerator"},
"landing zone":{meaning:"標準化されたマルチアカウント環境",hint:"AWS Control Tower"},
"abuse":{meaning:"不正利用（悪用）",hint:"AWS Trust & Safety"},
"spam":{meaning:"スパム（迷惑メール）",hint:"AWS Trust & Safety"}
});
Object.assign(L.services,{
"Amazon EC2":{desc:"仮想サーバー。OS は利用者が自分で管理します（IaaS）。",confuse:"Lambda（サーバーレス）、Lightsail（シンプルな VPS）"},
"AWS Lambda":{desc:"コードをサーバーレスで実行し、リクエスト数と実行時間に応じて支払います。",confuse:"EC2、Fargate（サーバーレスのコンテナ）"},
"AWS Elastic Beanstalk":{desc:"PaaS: コードをアップロードすると、AWS が EC2、ELB、Auto Scaling を自動で構築します。",confuse:"CloudFormation（IaC）"},
"AWS CloudFormation":{desc:"Infrastructure as Code: YAML/JSON のテンプレートからリソースを作成します。",confuse:"Elastic Beanstalk"},
"Amazon S3":{desc:"オブジェクトストレージ。耐久性はイレブンナイン（99.999999999%）で、複数のストレージクラスがあります。",confuse:"EBS（ブロック）、EFS（ファイル）"},
"Amazon EBS":{desc:"EC2 にアタッチするブロックストレージ（ディスク）。1 つの AZ 内に存在します。",confuse:"EFS（複数の EC2 で共有）、Instance Store（停止すると消える）"},
"Amazon EFS":{desc:"複数の EC2 で共有できるファイルシステム（Linux、NFS）。",confuse:"EBS"},
"Amazon RDS":{desc:"マネージド型のリレーショナルデータベース（MySQL、PostgreSQL など）。",confuse:"Aurora、DynamoDB"},
"Amazon Aurora":{desc:"AWS 独自のリレーショナル DB。MySQL/PostgreSQL と互換性があり、高性能です。",confuse:"RDS"},
"Amazon DynamoDB":{desc:"サーバーレスの NoSQL key-value データベース。レイテンシーは数ミリ秒です。",confuse:"RDS（SQL）"},
"Amazon Redshift":{desc:"大規模データを分析するためのデータウェアハウス（OLAP）。",confuse:"RDS（OLTP）"},
"Amazon ElastiCache":{desc:"インメモリキャッシュ（Redis/Memcached）。",confuse:"DynamoDB"},
"Amazon CloudFront":{desc:"CDN: エッジロケーションでコンテンツをキャッシュします。",confuse:"Route 53、Global Accelerator"},
"Amazon Route 53":{desc:"DNS、ドメイン登録、ルーティング、ヘルスチェック。",confuse:"CloudFront"},
"Amazon VPC":{desc:"仮想プライベートネットワーク: サブネット、ルートテーブル、ゲートウェイ。",confuse:""},
"AWS Direct Connect":{desc:"オンプレミスから AWS への専用の物理回線。",confuse:"Site-to-Site VPN（インターネット経由）"},
"Elastic Load Balancing":{desc:"トラフィックを複数のターゲットに分散します。",confuse:"Auto Scaling"},
"Amazon EC2 Auto Scaling":{desc:"負荷に応じて EC2 インスタンスの数を自動で増減します。",confuse:"ELB"},
"Amazon SNS / SQS":{desc:"SNS: pub/sub 方式で通知を送信します。SQS: コンポーネントを疎結合にする（decouple）ためのメッセージキューです。",confuse:"SNS と SQS の取り違え"},
"AWS IAM":{desc:"ユーザー、グループ、ロール、ポリシーを管理します。無料で、グローバルに使えます。",confuse:"IAM Identity Center（SSO）"},
"AWS CloudTrail":{desc:"API コールを記録します: 誰が、何を、いつ行ったか。",confuse:"CloudWatch、Config"},
"Amazon CloudWatch":{desc:"メトリクス、ログ、アラームを監視します。",confuse:"CloudTrail"},
"AWS Config":{desc:"リソースの設定履歴を記録し、ルールへの準拠を確認します。",confuse:"CloudTrail"},
"AWS Shield":{desc:"DDoS 対策。Standard は無料、Advanced は有料です。",confuse:"WAF"},
"AWS WAF":{desc:"レイヤー 7 のウェブファイアウォール: SQL injection や XSS をブロックし、IP をフィルタリングします。",confuse:"Shield、Security Group"},
"Amazon GuardDuty":{desc:"ログ（CloudTrail、VPC Flow Logs、DNS）から脅威を検出します。",confuse:"Inspector、Macie"},
"Amazon Inspector":{desc:"EC2、ECR、Lambda 上のソフトウェアの脆弱性をスキャンします。",confuse:"GuardDuty"},
"Amazon Macie":{desc:"ML を使って S3 内の機密データ（PII）を検出します。",confuse:"GuardDuty"},
"AWS KMS":{desc:"暗号化キーを作成・管理します。",confuse:"Secrets Manager（パスワードの保管）、CloudHSM"},
"AWS Secrets Manager":{desc:"パスワードや API キーを保管し、自動でローテーション（rotate）します。",confuse:"KMS"},
"AWS Artifact":{desc:"コンプライアンスレポート（SOC、PCI、ISO）や agreements（契約）をダウンロードできます。",confuse:"Config、Audit Manager"},
"AWS Trusted Advisor":{desc:"6 つのカテゴリで推奨事項を提示します: コスト、パフォーマンス、セキュリティ、耐障害性、service limits、operational excellence。",confuse:"Inspector"},
"AWS Budgets":{desc:"予算を設定し、超過時にアラートを出します。",confuse:"Cost Explorer"},
"AWS Cost Explorer":{desc:"コストを時系列で表示・分析でき、予測機能もあります。",confuse:"Budgets、Pricing Calculator"},
"AWS Pricing Calculator":{desc:"利用開始前にコストを見積もります。",confuse:"Cost Explorer"},
"AWS Organizations":{desc:"複数アカウントの管理、consolidated billing（一括請求）、SCP。",confuse:""},
"AWS IAM Identity Center":{desc:"従業員が複数の AWS アカウントやアプリケーションにシングルサインオン（SSO）できるようにします。",confuse:"Amazon Cognito（アプリのエンドユーザー向け）"},
"Amazon Cognito":{desc:"ウェブ／モバイルアプリのユーザー向けのサインアップとサインイン。",confuse:"IAM Identity Center"},
"AWS Security Hub":{desc:"複数のサービスやアカウントからのアラートとセキュリティの状態を集約します。",confuse:"GuardDuty、Trusted Advisor"},
"AWS Certificate Manager":{desc:"SSL/TLS 証明書を発行・管理します。",confuse:"KMS"},
"AWS Fargate":{desc:"コンテナをサーバーレスで実行します（ECS/EKS と併用）。",confuse:"Lambda、EC2"},
"AWS Outposts":{desc:"お客様のデータセンターに設置する AWS のインフラ。",confuse:"Local Zones"},
"AWS Storage Gateway":{desc:"ハイブリッドストレージ: オンプレミスのアプリケーションからクラウドストレージを利用します。",confuse:"EFS、Direct Connect"},
"AWS Site-to-Site VPN":{desc:"オンプレミスと VPC の間をインターネット経由で暗号化接続します。",confuse:"Direct Connect"},
"AWS Systems Manager":{desc:"インスタンスの管理と運用: パッチ適用、コマンド実行、Parameter Store。",confuse:"CloudFormation"},
"AWS Marketplace":{desc:"AWS 上で動くサードパーティー製ソフトウェアのマーケット。",confuse:"Service Catalog、APN"},
"AWS Firewall Manager":{desc:"複数アカウントの WAF、Shield、security group のルールを一元管理します。",confuse:"Security Hub"},
"Amazon Detective":{desc:"セキュリティインシデントの根本原因を調査します。",confuse:"GuardDuty（検出）"},
"AWS CloudHSM":{desc:"専用の HSM デバイス。お客様がキーを完全にコントロールできます。",confuse:"KMS（マネージド）"},
"AWS Directory Service":{desc:"AWS 上のマネージド型 Microsoft Active Directory。",confuse:"IAM Identity Center"},
"AWS Resource Access Manager":{desc:"リソース（サブネット、Transit Gateway など）をアカウント間で共有します。",confuse:""},
"Amazon ECS / EKS / ECR":{desc:"ECS: AWS 独自のコンテナオーケストレーション。EKS: Kubernetes。ECR: コンテナイメージの保管。",confuse:"Fargate（コンテナ向けのサーバーレスコンピューティング）"},
"AWS Batch":{desc:"大規模なバッチ計算ジョブを実行します。",confuse:"Lambda、Step Functions"},
"Amazon FSx":{desc:"マネージド型のサードパーティー製ファイルシステム: Windows File Server（SMB）、NetApp ONTAP、OpenZFS、Lustre（HPC/ML。FSx for Lustre は CLF-C02 の範囲外（out-of-scope）リストに含まれます）。",confuse:"EFS（Linux NFS）"},
"AWS Backup":{desc:"複数のサービスのバックアップを一元管理します。",confuse:"Elastic Disaster Recovery"},
"AWS Elastic Disaster Recovery":{desc:"サーバーを継続的にレプリケートし、災害時にすばやく復旧します。",confuse:"AWS Backup"},
"AWS DMS / AWS SCT":{desc:"DMS: DB のデータを移行します（継続的なレプリケーションに対応）。SCT: 異なる種類の DB 間でスキーマを変換します。",confuse:"DMS と SCT の取り違え"},
"AWS Application Migration Service":{desc:"サーバーを AWS へ Rehost（lift-and-shift）します。",confuse:"DMS"},
"AWS Application Discovery Service":{desc:"移行計画を立てるためにオンプレミスのサーバー情報を収集します。2025 年 11 月から新規のお客様の受付を停止（後継は AWS Transform）。",confuse:"Migration Evaluator"},
"AWS Migration Hub":{desc:"移行の進捗を一元的に追跡します。2025 年 11 月から新規のお客様の受付を停止（後継は AWS Transform）。",confuse:""},
"Migration Evaluator":{desc:"AWS への移行にあたってビジネスケースを作成し、コストを見積もります。",confuse:"Pricing Calculator"},
"Amazon DocumentDB":{desc:"MongoDB 互換のドキュメントデータベース。",confuse:"DynamoDB"},
"Amazon Neptune":{desc:"複雑に絡み合った関係性を持つデータ向けのグラフデータベース。",confuse:"DocumentDB"},
"Amazon SageMaker AI":{desc:"ML モデルの構築、トレーニング、デプロイを行います。",confuse:"構築済みの AI サービス"},
"Amazon Rekognition":{desc:"画像と動画を分析します。",confuse:"Textract"},
"Amazon Textract":{desc:"スキャンした文書から文字、表、フォームを抽出します。",confuse:"Rekognition"},
"Amazon Polly":{desc:"テキストを音声に変換します。",confuse:"Transcribe"},
"Amazon Transcribe":{desc:"音声をテキストに変換します。",confuse:"Polly"},
"Amazon Translate":{desc:"言語を翻訳します。",confuse:""},
"Amazon Comprehend":{desc:"NLP: 感情分析、エンティティ抽出。",confuse:""},
"Amazon Lex":{desc:"音声とテキストによるチャットボットを構築します。",confuse:"Polly、Connect"},
"Amazon Q":{desc:"企業向け（Q Business）と開発者向け（Q Developer）の生成 AI アシスタント。Q Business は新規のお客様の受付を終了しており、Q Developer の IDE プラグインは 2027 年 4 月 30 日にサポートが終了します。",confuse:"Lex"},
"Amazon Athena":{desc:"S3 上のデータに直接 SQL クエリを実行します。サーバーレスです。",confuse:"Redshift"},
"Amazon Kinesis":{desc:"ストリーミングデータをリアルタイムで収集・処理します。",confuse:"SQS"},
"AWS Glue":{desc:"サーバーレスの ETL とデータカタログ。",confuse:"EMR"},
"Amazon EMR":{desc:"ビッグデータフレームワーク（Spark、Hadoop）を実行します。",confuse:"Glue"},
"Amazon OpenSearch Service":{desc:"検索、ログ分析、アプリケーション監視。",confuse:""},
"Amazon Quick":{desc:"BI: ダッシュボードとデータの可視化（旧 QuickSight）。",confuse:""},
"Amazon EventBridge":{desc:"サーバーレスのイベントバス。ルールに基づいてイベントをルーティングし、スケジュールに従ってジョブを実行します。",confuse:"SNS、SQS"},
"AWS Step Functions":{desc:"複数ステップのワークフローをオーケストレーションします。",confuse:"EventBridge"},
"Amazon Connect":{desc:"クラウド上のコンタクトセンター。",confuse:""},
"Amazon SES":{desc:"マーケティングメールとトランザクションメールを送信します。",confuse:"SNS"},
"AWS CodeBuild / CodePipeline":{desc:"CodeBuild: ビルドとテスト。CodePipeline: CI/CD のオーケストレーション。",confuse:""},
"AWS X-Ray":{desc:"リクエストをトレースして分散アプリケーションをデバッグします。",confuse:"CloudWatch、CloudTrail"},
"Amazon WorkSpaces":{desc:"仮想デスクトップ（DaaS）。",confuse:"WorkSpaces Applications（AppStream 2.0）"},
"Amazon WorkSpaces Applications (AppStream 2.0)":{desc:"デスクトップアプリケーションをブラウザにストリーミングします。2025 年 11 月に AppStream 2.0 から名称変更されました。",confuse:"WorkSpaces"},
"Amazon WorkSpaces Secure Browser":{desc:"社内ウェブサイトや SaaS にアクセスするための安全なブラウザ。",confuse:"WorkSpaces"},
"AWS Amplify":{desc:"フルスタックのウェブ／モバイルアプリを構築し、ホスティングします。",confuse:"Elastic Beanstalk"},
"AWS IoT Core":{desc:"IoT デバイスを接続・管理します。",confuse:""},
"Amazon API Gateway":{desc:"API を作成、公開、保護します。",confuse:"ELB"},
"AWS Global Accelerator":{desc:"静的 IP を使って AWS のグローバルネットワーク経由でトラフィックを届けます。キャッシュはしません。",confuse:"CloudFront"},
"AWS Transit Gateway":{desc:"複数の VPC とオンプレミスネットワークを接続するハブ。",confuse:"VPC peering"},
"AWS PrivateLink":{desc:"インターネットを経由せず、サービスにプライベートにアクセスします。",confuse:""},
"AWS Client VPN":{desc:"リモートユーザー一人ひとりのための VPN。",confuse:"Site-to-Site VPN"},
"AWS Control Tower":{desc:"マルチアカウントの landing zone をセットアップし、統制します。",confuse:"Organizations"},
"AWS Service Catalog":{desc:"承認済みの社内 IT 製品のカタログ。",confuse:"Marketplace"},
"Service Quotas":{desc:"リソースの上限を確認し、引き上げをリクエストします。",confuse:"Trusted Advisor"},
"AWS Compute Optimizer":{desc:"ML を使って rightsizing の推奨事項を提示します。",confuse:"Cost Explorer"},
"AWS Health Dashboard":{desc:"アカウントに影響する AWS サービスのイベントやメンテナンスを表示します。",confuse:"CloudWatch"},
"AWS Well-Architected Tool":{desc:"Well-Architected フレームワークに沿ってシステムを評価します。",confuse:"Trusted Advisor"},
"AWS License Manager":{desc:"ソフトウェアライセンスを管理・追跡します。",confuse:""},
"AWS Cost and Usage Report":{desc:"最も詳細なコストデータ。S3 に配信されます。",confuse:"Cost Explorer"},
"AWS re:Post / Knowledge Center":{desc:"re:Post: 質問と回答のコミュニティ。Knowledge Center: よくある質問に答える記事。",confuse:""},
"AWS Prescriptive Guidance":{desc:"実証済みの戦略、ガイド、パターン。",confuse:""},
"AWS Professional Services":{desc:"大規模プロジェクトを支援する AWS の専門家チーム。",confuse:"APN"},
"AWS Partner Network (APN)":{desc:"パートナーのネットワーク: system integrators と ISVs。",confuse:"Professional Services"},
"AWS Trust & Safety":{desc:"AWS リソースの不正利用（abuse）の報告を受け付けます。",confuse:""}
});
L.lessons[1]=[
{t:"CLF-C02 試験について（Exam Guide 準拠）",h:`<ul><li><b>65 問</b>: 採点対象が 50 問、採点されない試験的な問題が 15 問。どれが採点対象外の問題かは分かりません。</li>
<li><b>Multiple choice</b>: 正解 1 つ、誤答選択肢（ひっかけ）3 つ。<b>Multiple response</b>: 5 つ以上の選択肢の中に正解が 2 つ以上。</li>
<li>未回答は不正解として扱われ、間違えても減点はありません。ですから<b>1 問も空欄のままにしない</b>でください。</li>
<li>スコアは 100〜1000 のスケールドスコアで、<b>合格は 700 以上</b>。合計点で合否が決まり、分野ごとに合格点を取る必要はありません。</li>
<li>試験範囲外: コーディング、アーキテクチャ設計、トラブルシューティング、パフォーマンステスト。</li></ul>`},
{t:"クラウドの 6 つのメリット（Six advantages）",h:`<table><tr><th>用語</th><th>意味</th></tr>
<tr><td><b>Trade fixed expense for variable expense</b></td><td>ハードウェアを前払いで購入せず、使った分だけ支払う</td></tr>
<tr><td><b>Benefit from massive economies of scale</b></td><td>AWS が大量に調達するため、すべての利用者にとって価格が安くなる</td></tr>
<tr><td><b>Stop guessing capacity</b></td><td>キャパシティを事前に予測する必要がなく、需要に応じて伸縮できる</td></tr>
<tr><td><b>Increase speed and agility</b></td><td>数分でリソースを作成でき、すばやく試せる</td></tr>
<tr><td><b>Stop spending money running and maintaining data centers</b></td><td>データセンターの運用を気にせず、ビジネスに集中できる</td></tr>
<tr><td><b>Go global in minutes</b></td><td>世界中の複数のリージョンへすばやく展開できる</td></tr></table>`},
{t:"サービスモデルとデプロイモデル",h:`<ul><li><b>IaaS</b>: インフラ（仮想マシン、ネットワーク）を借りる。例: EC2。利用者が管理する範囲が最も広い。</li>
<li><b>PaaS</b>: コードだけに集中する。例: Elastic Beanstalk。</li>
<li><b>SaaS</b>: 完成したソフトウェアを使う。例: Gmail。</li></ul>
<ul><li><b>Cloud</b>: すべてをクラウド上で実行する。</li>
<li><b>Hybrid</b>: クラウドとオンプレミスを組み合わせる。</li>
<li><b>On-premises</b>（private cloud）: 自社のデータセンター内で実行する。</li></ul>`},
{t:"Well-Architected フレームワーク: 6 つの柱",h:`<table><tr><th>Pillar</th><th>問題文のキーワード</th></tr>
<tr><td><b>Operational Excellence</b></td><td>運用、モニタリング、継続的な改善、IaC</td></tr>
<tr><td><b>Security</b></td><td>データ保護、IAM、追跡（トレーサビリティ）</td></tr>
<tr><td><b>Reliability</b></td><td>recover from failures、需要への対応</td></tr>
<tr><td><b>Performance Efficiency</b></td><td>リソースを効率よく使う、適切なタイプを選ぶ</td></tr>
<tr><td><b>Cost Optimization</b></td><td>不要なコストを避ける</td></tr>
<tr><td><b>Sustainability</b></td><td>環境への影響を減らす</td></tr></table>`},
{t:"移行戦略（7R）",h:`<ul><li><b>Rehost</b>（lift-and-shift）: そのままの状態で移す。最も速い</li>
<li><b>Replatform</b>: 小さな最適化を加える。例: DB を RDS に移す</li>
<li><b>Refactor / Re-architect</b>: 作り直す。例: サーバーレスへ</li>
<li><b>Repurchase</b>: SaaS 製品に乗り換える</li>
<li><b>Retire</b>: 廃止する</li>
<li><b>Retain</b>: オンプレミスに残す</li>
<li><b>Relocate</b>: インフラ（例: VMware）をクラウドへ移す</li></ul>`},
{t:"AWS CAF: 6 つの perspectives",h:`<p>ビジネス系: <b>Business</b>、<b>People</b>、<b>Governance</b>。<br>技術系: <b>Platform</b>、<b>Security</b>、<b>Operations</b>。</p>`},
{t:"混同しやすい概念",h:`<ul><li><b>Elasticity</b>（伸縮性）: 需要に応じて自動で増減する。</li>
<li><b>Scalability</b>（スケーラビリティ）: 必要なときに拡張できる能力。</li>
<li><b>High availability</b>（高可用性）: 常に利用でき、ダウンタイムが少ない（Multi-AZ）。</li>
<li><b>Fault tolerance</b>（耐障害性）: コンポーネントの 1 つが故障しても動き続ける。</li>
<li><b>Durability</b>（耐久性）: データが失われない。</li></ul>`},
{t:"クラウドエコノミクス（Task 1.4）",h:`<ul><li><b>Fixed vs variable cost</b>: オンプレミスは前払いが必要（ハードウェア、データセンター）。クラウドは使った分だけ支払う。</li>
<li><b>オンプレミスのコスト</b>: ハードウェア、電力、冷却、設置スペース、運用担当者の人件費、機器の定期的な更新。</li>
<li><b>Licensing</b>: <b>BYOL</b>（既存のライセンスを持ち込む。多くの場合 Dedicated Hosts が必要）と <b>license-included</b>（料金にライセンスが含まれる）。</li>
<li><b>Rightsizing</b>: 適切なタイプとサイズを選ぶ。ツール: Compute Optimizer、Cost Explorer。</li>
<li><b>Automation</b>: IaC、Auto Scaling、未使用リソースの自動停止により、手間と無駄を減らせる。</li></ul>`},
{t:"AWS CAF: ビジネス上のメリットと移行のリソース（Task 1.3）",h:`<p>4 つのビジネス成果: <b>reduced business risk</b>、<b>improved ESG performance</b>、<b>increased revenue</b>、<b>increased operational efficiency</b>。</p>
<p>移行ツール: Migration Evaluator（ビジネスケース）→ Application Discovery Service（情報収集）→ Application Migration Service（サーバーの rehost）/ DMS + SCT（データベース）→ Migration Hub（進捗の追跡）。</p>
<p class="note">注意: 2025 年 11 月 7 日から、AWS Migration Hub と AWS Application Discovery Service は新規のお客様の受付を停止しています（後継サービスは AWS Transform）。Exam guide には引き続きこの 2 つのサービスが記載されているため、試験では従来の説明に沿って出題される可能性があります。</p>`}
];
L.lessons[2]=[
{t:"責任共有モデル（Shared Responsibility Model）",h:`<table><tr><th>AWS: security <u>OF</u> the cloud</th><th>お客様: security <u>IN</u> the cloud</th></tr>
<tr><td>データセンター、ハードウェア、physical security</td><td>データとデータの暗号化</td></tr>
<tr><td>Hypervisor、グローバルネットワーク</td><td>IAM: ユーザー、権限、MFA</td></tr>
<tr><td>マネージドサービスのインフラ（例: RDS の OS へのパッチ適用）</td><td>EC2 の OS（patching）、security group</td></tr></table>
<p>コツ: 「managed」の度合いが高いほど（RDS、Lambda）、AWS が担う範囲が広くなります。</p>`},
{t:"IAM",h:`<ul><li><b>User</b>: 1 人の人またはアプリケーション。<b>Group</b>: ユーザーの集まり。<b>Role</b>: 一時的な権限（EC2、Lambda、別アカウントのユーザー向け）。<b>Policy</b>: 権限を定義する JSON ドキュメント。</li>
<li><b>Least privilege</b>（最小権限）: 必要最小限の権限だけを付与する。</li>
<li><b>Root user</b>: MFA を有効化し、access key を作らず、日常的には使わない。</li>
<li>IAM は <b>global</b> なサービスで、<b>無料</b>です。</li></ul>`},
{t:"セキュリティサービス早見表",h:`<table><tr><th>ニーズ</th><th>サービス</th></tr>
<tr><td>DDoS 対策</td><td>AWS Shield（Standard は無料）</td></tr>
<tr><td>SQL injection、XSS をブロック（レイヤー 7）</td><td>AWS WAF</td></tr>
<tr><td>ログから脅威を検出</td><td>Amazon GuardDuty</td></tr>
<tr><td>ソフトウェアの脆弱性をスキャン</td><td>Amazon Inspector</td></tr>
<tr><td>S3 内の機密データを検出</td><td>Amazon Macie</td></tr>
<tr><td>暗号化キーの管理</td><td>AWS KMS</td></tr>
<tr><td>パスワードの保管と自動 rotate</td><td>AWS Secrets Manager</td></tr>
<tr><td>コンプライアンスレポート（SOC、PCI）</td><td>AWS Artifact</td></tr>
<tr><td>セキュリティアラートの集約</td><td>AWS Security Hub</td></tr></table>`},
{t:"モニタリングと監査: 混同しやすい 3 つのサービス",h:`<ul><li><b>CloudTrail</b>: <i>誰が</i>、<i>何を</i>、<i>いつ</i>行ったか（API calls）。</li>
<li><b>CloudWatch</b>: パフォーマンス（CPU、ログ、アラーム）。</li>
<li><b>Config</b>: リソースの設定がどう変更されたか、ルールに準拠しているか。</li></ul>`},
{t:"Security Group vs Network ACL",h:`<table><tr><th></th><th>Security Group</th><th>Network ACL</th></tr>
<tr><td>適用範囲</td><td>インスタンス</td><td>サブネット</td></tr>
<tr><td>状態</td><td>Stateful</td><td>Stateless</td></tr>
<tr><td>ルール</td><td>Allow のみ</td><td>Allow と Deny</td></tr></table>`},
{t:"暗号化: at rest と in transit",h:`<table><tr><th>種類</th><th>意味</th><th>サービス</th></tr>
<tr><td>At rest</td><td>保管中のデータ（S3、EBS、RDS）</td><td>AWS KMS、CloudHSM（専用の HSM）</td></tr>
<tr><td>In transit</td><td>転送中のデータ</td><td>TLS/HTTPS、ACM の証明書</td></tr></table>`},
{t:"ルートユーザーとアイデンティティ管理（Task 2.3）",h:`<p><b>ルートユーザーにしかできない作業</b>（例）: ルートユーザーのメールアドレス／パスワードの変更、アカウントの解約、IAM 権限の復旧、Reserved Instance Marketplace への出品者登録、S3 の MFA Delete の有効化。</p>
<ul><li><b>ルートユーザーの保護</b>: AWS は現在、あらゆる種類のアカウント（standalone、management、member）でルートユーザーの MFA を必須にしています（未設定の場合は、最初のサインインから 14 日以内に登録が必要）。そのほか: access key を作らない、認証情報を厳重に保管する、日常の作業には IAM を使う。</li>
<li><b>Password policy</b>: 長さ、複雑さ、パスワードの変更期限。</li>
<li><b>Federation</b>: 会社のアイデンティティ（AD、SAML）を使い、IAM Identity Center 経由で AWS にサインインする。</li>
<li><b>Cross-account role</b>: アカウント A のユーザーがアカウント B のロールを assume して、一時的な権限を得る。</li>
<li><b>シークレットの保管</b>: Secrets Manager（自動 rotate あり）、Systems Manager Parameter Store。</li>
<li><b>Access reports</b>: IAM credential report（パスワード、キー、MFA の状態）、access advisor（使われていない権限）。</li>
<li><b>Policy</b>: AWS managed policy（AWS があらかじめ用意したもの）と customer managed policy（自分で作成するもの）。</li></ul>`},
{t:"その他のセキュリティサービスと情報源（Task 2.2, 2.4）",h:`<table><tr><th>サービス</th><th>機能</th></tr>
<tr><td>AWS Firewall Manager</td><td>複数アカウントの WAF/Shield/security group のルールを一元管理</td></tr>
<tr><td>Amazon Detective</td><td>根本原因の調査</td></tr>
<tr><td>AWS CloudHSM</td><td>専用の HSM</td></tr>
<tr><td>AWS Directory Service</td><td>マネージド型の Microsoft AD</td></tr>
<tr><td>AWS RAM</td><td>アカウント間でリソースを共有</td></tr>
<tr><td>Amazon Cognito</td><td>アプリケーションのユーザー向けサインイン</td></tr></table>
<p><b>セキュリティログ</b>の場所: CloudTrail（API calls）、CloudWatch Logs、VPC Flow Logs、S3 access logs。</p>
<p><b>情報源</b>: AWS Artifact（コンプライアンスレポート）、AWS Security Center、AWS Security Blog、AWS Knowledge Center。サードパーティー製のセキュリティ製品は AWS Marketplace で入手できます。</p>
<p><b>国・業界ごとのコンプライアンス</b>: 適切なリージョンを選ぶ（data residency）。コンプライアンスへの対応状況（例: HIPAA eligible）はサービスごとに異なります。</p>`}
];
L.lessons[3]=[
{t:"グローバルインフラストラクチャ",h:`<ul><li><b>Region</b>（リージョン）: 地理的なエリア。複数の AZ で構成される。</li>
<li><b>Availability Zone</b>（アベイラビリティーゾーン）: リージョン内にある、互いに分離された 1 つ以上のデータセンター。</li>
<li><b>Edge location</b>（エッジロケーション）: CloudFront と Route 53 のキャッシュ拠点。ユーザーの近くにある。</li></ul>
<p>リージョンは 4 つの要素で選びます: <b>compliance</b>（データに関する法規制）、<b>latency</b>（ユーザーに近いか）、<b>service availability</b>（使いたいサービスが提供されているか）、<b>pricing</b>（料金）。</p>`},
{t:"Compute",h:`<table><tr><th>サービス</th><th>使う場面</th></tr>
<tr><td>EC2</td><td>仮想マシンを完全にコントロールしたい</td></tr>
<tr><td>Lambda</td><td>サーバーレス、イベント駆動で実行、1 回の実行は最大 15 分</td></tr>
<tr><td>ECS / EKS</td><td>コンテナを実行する（EKS は Kubernetes を使用）</td></tr>
<tr><td>Fargate</td><td>サーバーレスのコンテナ</td></tr>
<tr><td>Elastic Beanstalk</td><td>PaaS: コードをアップロードするだけ</td></tr>
<tr><td>Lightsail</td><td>シンプルな VPS、固定料金</td></tr></table>`},
{t:"Storage と S3 のストレージクラス",h:`<ul><li><b>S3</b>: オブジェクト · <b>EBS</b>: ブロック（1 つの EC2 にアタッチ、1 つの AZ 内）· <b>EFS</b>: 共有ファイル</li></ul>
<table><tr><th>Storage class</th><th>使う場面</th></tr>
<tr><td>S3 Standard</td><td>頻繁に使う</td></tr>
<tr><td>S3 Intelligent-Tiering</td><td>アクセス頻度が事前に分からない</td></tr>
<tr><td>S3 Standard-IA</td><td>あまり使わないが、すぐに取り出したい</td></tr>
<tr><td>S3 One Zone-IA</td><td>あまり使わず、1 つの AZ だけでの保管を許容できる</td></tr>
<tr><td>Glacier Instant Retrieval</td><td>アーカイブ、ミリ秒単位で取り出せる</td></tr>
<tr><td>Glacier Flexible Retrieval</td><td>アーカイブ、取り出しに数分〜数時間</td></tr>
<tr><td>Glacier Deep Archive</td><td>最も安い、取り出しに 12 時間以上</td></tr></table>`},
{t:"Database",h:`<ul><li><b>RDS / Aurora</b>: リレーショナル（SQL）、OLTP</li>
<li><b>DynamoDB</b>: NoSQL key-value、サーバーレス</li>
<li><b>Redshift</b>: データウェアハウス、分析</li>
<li><b>ElastiCache</b>: インメモリキャッシュ</li></ul>`},
{t:"Networking",h:`<ul><li><b>VPC</b>: プライベートネットワーク。<b>Internet gateway</b>: VPC をインターネットにつなぐ。<b>NAT gateway</b>: private subnet からインターネットへ出られるようにする。</li>
<li><b>Direct Connect</b>: 専用回線。<b>Site-to-Site VPN</b>: インターネット経由の暗号化接続。</li>
<li><b>Route 53</b>: DNS。<b>CloudFront</b>: CDN。<b>ELB</b>: 負荷分散。<b>Auto Scaling</b>: インスタンス数の増減。</li></ul>`},
{t:"AWS へのアクセス方法",h:`<ul><li><b>Management Console</b>（ウェブ）· <b>CLI</b>（コマンドライン）· <b>SDK</b>（コード内から）</li>
<li><b>CloudFormation</b>: Infrastructure as Code（IaC）</li></ul>`},
{t:"Multi-AZ と Multi-Region（Task 3.2）",h:`<ul><li>AZ は物理的に分離されていて、<b>共通の single point of failure がありません</b>。そのため、high availability を実現するには Multi-AZ でデプロイします。</li>
<li>複数のリージョンを使うのは次のような場合です: <b>disaster recovery</b>、<b>business continuity</b>、世界中のユーザーへの<b>低レイテンシー</b>、<b>data sovereignty</b>。</li>
<li>エッジロケーションは、コンテンツをユーザーの近くに届け（CloudFront）、ルーティングを高速化します（Global Accelerator、Route 53）。</li></ul>`},
{t:"コンテナ、バッチ、インスタンスタイプ（Task 3.3）",h:`<ul><li><b>ECS</b>: AWS 独自のコンテナオーケストレーション。<b>EKS</b>: Kubernetes。<b>ECR</b>: イメージの保管。<b>Fargate</b>: コンテナをサーバーレスで実行。</li>
<li><b>AWS Batch</b>: バッチジョブ。<b>Lambda</b>: イベント駆動の関数（最大 15 分）。</li>
<li>インスタンスタイプ: General purpose（バランス型）、Compute optimized（CPU 負荷が高い）、Memory optimized（RAM を多く使う）、Storage optimized（ディスクの読み書きが多い）、Accelerated computing（GPU）。</li>
<li><b>Auto Scaling</b> は elasticity をもたらします。<b>Load balancer</b> は負荷を分散し、ターゲットのヘルスチェックを行います。</li></ul>`},
{t:"Storage 応用編（Task 3.6）",h:`<table><tr><th>ニーズ</th><th>サービス</th></tr>
<tr><td>非常に高速な一時ディスク、停止すると消える</td><td>EC2 instance store</td></tr>
<tr><td>Windows 向けの共有ファイル（SMB）</td><td>Amazon FSx for Windows File Server</td></tr>
<tr><td>Linux 向けの共有ファイル（NFS）</td><td>Amazon EFS</td></tr>
<tr><td>ハイブリッド: オンプレミスからクラウドストレージを利用（cached）</td><td>AWS Storage Gateway</td></tr>
<tr><td>時間の経過に応じてストレージクラスを自動で移行、またはオブジェクトを削除</td><td>S3 Lifecycle policy</td></tr>
<tr><td>複数サービスのバックアップを一元管理</td><td>AWS Backup</td></tr>
<tr><td>サーバーのディザスタリカバリ</td><td>AWS Elastic Disaster Recovery</td></tr></table>`},
{t:"Database と移行（Task 3.4）",h:`<ul><li><b>EC2-hosted DB</b>: 完全にコントロールできるが、すべて自分で面倒を見る。<b>Managed DB</b>（RDS、Aurora）: パッチ、バックアップ、ハードウェアは AWS が担当。</li>
<li>Relational: RDS、Aurora · NoSQL: DynamoDB · Document（MongoDB）: DocumentDB · Graph: Neptune · In-memory: ElastiCache</li>
<li><b>AWS DMS</b>: データを移行する。継続的なレプリケーションに対応し、ダウンタイムが少ない。<b>AWS SCT</b>: DB の種類を変えるときにスキーマを変換する。</li></ul>`},
{t:"AI/ML（Task 3.7）",h:`<table><tr><th>やりたいこと</th><th>サービス</th></tr>
<tr><td>ML モデルを自分で構築・トレーニングする</td><td>Amazon SageMaker AI</td></tr>
<tr><td>生成 AI アシスタント</td><td>Amazon Q</td></tr>
<tr><td>画像／動画: 物体や顔の認識</td><td>Amazon Rekognition</td></tr>
<tr><td>文書から文字、表、フォームを抽出</td><td>Amazon Textract</td></tr>
<tr><td>テキスト → 音声</td><td>Amazon Polly</td></tr>
<tr><td>音声 → テキスト</td><td>Amazon Transcribe</td></tr>
<tr><td>言語の翻訳</td><td>Amazon Translate</td></tr>
<tr><td>テキスト分析、sentiment</td><td>Amazon Comprehend</td></tr>
<tr><td>チャットボット</td><td>Amazon Lex</td></tr></table>`},
{t:"Analytics（Task 3.7）",h:`<table><tr><th>やりたいこと</th><th>サービス</th></tr>
<tr><td>S3 上で直接 SQL を実行（サーバーレス）</td><td>Amazon Athena</td></tr>
<tr><td>リアルタイムのストリーミングデータ</td><td>Amazon Kinesis</td></tr>
<tr><td>サーバーレスの ETL、データカタログ</td><td>AWS Glue</td></tr>
<tr><td>ビッグデータ（Spark、Hadoop）</td><td>Amazon EMR</td></tr>
<tr><td>検索、ログ分析</td><td>Amazon OpenSearch Service</td></tr>
<tr><td>BI ダッシュボード</td><td>Amazon Quick（旧 QuickSight）</td></tr>
<tr><td>データウェアハウス</td><td>Amazon Redshift</td></tr></table>`},
{t:"その他のサービスカテゴリ（Task 3.8）",h:`<ul><li><b>Application integration</b>: EventBridge（イベントバス、スケジュール実行）、SNS（pub/sub の通知）、SQS（キュー）、Step Functions（ワークフロー）。</li>
<li><b>Business applications</b>: Amazon Connect（コンタクトセンター）、Amazon SES（メール送信）。</li>
<li><b>Developer tools</b>: CodeBuild（ビルド／テスト）、CodePipeline（CI/CD）、X-Ray（トレース）、AWS CLI。</li>
<li><b>End-user computing</b>: WorkSpaces（仮想デスクトップ）、WorkSpaces Applications、旧称 AppStream 2.0（アプリケーションのストリーミング）、WorkSpaces Secure Browser（安全なブラウザ）。</li>
<li><b>Frontend web & mobile</b>: AWS Amplify。<b>IoT</b>: AWS IoT Core。</li>
<li><b>Customer enablement</b>: AWS Support。</li></ul>`},
{t:"Networking 応用編（Task 3.5）",h:`<table><tr><th>サービス</th><th>使う場面</th></tr>
<tr><td>Public / private subnet</td><td>Public subnet には internet gateway へのルートがある。Private subnet にはない。</td></tr>
<tr><td>Amazon API Gateway</td><td>API を作成・公開する</td></tr>
<tr><td>AWS Global Accelerator</td><td>静的 IP、AWS のネットワークを経由、キャッシュなし</td></tr>
<tr><td>AWS Transit Gateway</td><td>複数の VPC とオンプレミスを接続するハブ</td></tr>
<tr><td>AWS PrivateLink</td><td>インターネットを経由せず、サービスにプライベートにアクセス</td></tr>
<tr><td>Site-to-Site VPN / Client VPN</td><td>ネットワーク全体を接続 / ユーザー単位で接続</td></tr></table>`},
{t:"Management & governance",h:`<table><tr><th>サービス</th><th>機能</th></tr>
<tr><td>AWS Control Tower</td><td>best practice に沿ったマルチアカウントの landing zone</td></tr>
<tr><td>AWS Organizations</td><td>複数アカウントの管理、SCP、consolidated billing</td></tr>
<tr><td>AWS Service Catalog</td><td>承認済みの社内 IT カタログ</td></tr>
<tr><td>Service Quotas</td><td>リソースの上限の確認と引き上げ</td></tr>
<tr><td>AWS Compute Optimizer</td><td>rightsizing の推奨事項</td></tr>
<tr><td>AWS Health Dashboard</td><td>アカウントに影響するサービスイベント</td></tr>
<tr><td>AWS Well-Architected Tool</td><td>フレームワークに沿ったシステムのレビュー</td></tr>
<tr><td>AWS License Manager</td><td>ライセンスの管理</td></tr>
<tr><td>AWS Systems Manager</td><td>インスタンスの運用: パッチ適用、コマンド実行、Parameter Store</td></tr></table>`}
];
L.lessons[4]=[
{t:"EC2 の料金モデル",h:`<table><tr><th>選択肢</th><th>特徴</th><th>キーワード</th></tr>
<tr><td>On-Demand</td><td>秒／時間単位で支払い、コミットメントなし</td><td>短期、負荷を予測できない</td></tr>
<tr><td>Reserved Instances</td><td>1 年または 3 年のコミットメント、最大約 72% 割引</td><td>steady-state</td></tr>
<tr><td>Savings Plans</td><td>1 年または 3 年、$/時間の利用額をコミット。より柔軟</td><td>steady-state、柔軟</td></tr>
<tr><td>Spot</td><td>最大約 90% 割引、中断される可能性あり（2 分前に通知）</td><td>can be interrupted, fault-tolerant</td></tr>
<tr><td>Dedicated Hosts</td><td>専用の物理サーバー</td><td>ソケット／コア単位のライセンス、コンプライアンス</td></tr></table>`},
{t:"コスト管理ツール",h:`<ul><li><b>Pricing Calculator</b>: 使い始める<i>前</i>に見積もる</li>
<li><b>Cost Explorer</b>: <i>すでに</i>発生したコストを分析する。予測機能あり</li>
<li><b>Budgets</b>: 予算を設定し、アラートを出す</li>
<li><b>Cost and Usage Report</b>: 最も詳細なデータ</li>
<li><b>Cost allocation tags</b>（コスト配分タグ）: タグを付けて、プロジェクト／部門ごとにコストを分ける</li></ul>`},
{t:"AWS Organizations",h:`<ul><li>複数のアカウントを一元管理する。</li>
<li><b>Consolidated billing</b>（一括請求）: 請求書が 1 つにまとまり、使用量を合算してボリュームディスカウントを受けられる。</li>
<li><b>SCP</b>（Service Control Policies）: メンバーアカウントの権限の上限を制限する。</li></ul>`},
{t:"Support プランと Trusted Advisor",h:`<p>現行の CLF-C02 Exam Guide には、サポートの選択肢として <b>Basic Support</b>（無料、すべてのアカウントで利用可能）、<b>AWS Business Support+</b>、<b>AWS Enterprise Support</b>、<b>AWS Unified Operations</b> と、customer service およびコミュニティの窓口が記載されています。</p>
<p>以前のプラン名も資料によっては見かけることがあります: Developer、Business、Enterprise On-Ramp、Enterprise。上位のプランほど応答が速く、専任の担当者（例: TAM、Technical Account Manager）が付きます。</p>
<ul><li><b>Trusted Advisor</b>: 6 つのカテゴリをチェックします: cost optimization、performance、security、fault tolerance、service limits、operational excellence。有料プランではより充実したチェック一式を利用できます。</li></ul>
<p class="note">AWS は最近 Support プランの体系を変更しました。詳しい特典は公式の AWS Support Plans のページで確認してください。</p>`},
{t:"EC2 の購入オプション補足（Task 4.1）",h:`<ul><li><b>Dedicated Instances</b>: 専用のハードウェア。サーバー自体は見えない。<b>Dedicated Hosts</b>: ソケット／コアを確認・制御でき、BYOL に適している。</li>
<li><b>On-Demand Capacity Reservations</b>: 1 つの AZ でキャパシティを確保する。コミットメントなしで、料金は On-Demand。</li>
<li><b>Standard RI</b>: 割引率が最も高いが、柔軟性は低い。<b>Convertible RI</b>: インスタンスファミリーを変更できるが、割引率は低め。Regional RI は同じインスタンスファミリー内でサイズを柔軟に変えられる。</li>
<li>Organizations では、RI と Savings Plans の割引はアカウント間で<b>共有されます</b>（デフォルト）。</li></ul>`},
{t:"データ転送のコスト",h:`<table><tr><th>種類</th><th>料金</th></tr>
<tr><td>インターネットから AWS へ</td><td>無料</td></tr>
<tr><td>AWS からインターネットへ</td><td>課金あり。毎月最初の 100 GB は無料（China と GovCloud を除く全サービス・全リージョンの合算）</td></tr>
<tr><td>リージョン間</td><td>課金あり</td></tr>
<tr><td>同じリージョン内の AZ 間</td><td>課金あり（低額）</td></tr>
<tr><td>同じ AZ 内でプライベート IP 経由</td><td>無料</td></tr></table>`},
{t:"Billing 応用編（Task 4.2）",h:`<ul><li><b>Cost and Usage Report</b>: 最も詳細なデータ。S3 に配信される。</li>
<li><b>Cost allocation tags</b>: AWS-generated と user-defined の 2 種類がある。Billing で <b>activate</b> しないとレポートに表示されない。</li>
<li><b>Budgets</b>: アラート。<b>Cost Explorer</b>: 分析、予測。<b>Pricing Calculator</b>: 事前の見積もり。</li></ul>`},
{t:"技術リソースとパートナー（Task 4.3）",h:`<table><tr><th>リソース</th><th>使う場面</th></tr>
<tr><td>AWS Support Center</td><td>サポートケースを起票する</td></tr>
<tr><td>AWS re:Post</td><td>コミュニティでの質問と回答</td></tr>
<tr><td>AWS Knowledge Center</td><td>よくある質問に答える記事</td></tr>
<tr><td>AWS Prescriptive Guidance</td><td>移行の戦略、パターン</td></tr>
<tr><td>Whitepapers, Blogs, Documentation</td><td>公式資料</td></tr>
<tr><td>AWS Health Dashboard / Health API</td><td>自分に影響するサービスイベント</td></tr>
<tr><td>AWS Trust & Safety</td><td>不正利用の報告（スパム、AWS リソースからの攻撃）</td></tr>
<tr><td>AWS Professional Services, Solutions Architects</td><td>プロジェクトを支援する AWS の専門家</td></tr>
<tr><td>AWS Partner Network (APN)</td><td>System integrators、ISVs。パートナーはトレーニング、イベント、割引を受けられる</td></tr>
<tr><td>AWS Marketplace</td><td>サードパーティー製ソフトウェアの購入（コスト管理、governance、entitlement）</td></tr></table>`}
];
})();
