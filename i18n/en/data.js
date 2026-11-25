(function(){var I=window.CLF_I18N=window.CLF_I18N||{};var L=I.en=I.en||{};['q','course','lessons','glossary','services','domains','ui'].forEach(function(k){L[k]=L[k]||{};});
Object.assign(L.domains,{1:"Cloud Concepts",2:"Security and Compliance",3:"Cloud Technology and Services",4:"Billing, Pricing, and Support"});
Object.assign(L.glossary,{
"upfront":{meaning:"paid in advance, before you use it",hint:"Fixed cost (CapEx)"},
"pay only for":{meaning:"you are charged only for what you actually use",hint:"Pay-as-you-go → variable cost"},
"workload":{meaning:"a system or application that is running",hint:""},
"recover from failures":{meaning:"get back to normal after something breaks",hint:"Well-Architected → Reliability"},
"migrate":{meaning:"move systems or data (to the cloud)",hint:"The 7 Rs migration strategies"},
"without making any changes":{meaning:"moved exactly as it is, nothing modified",hint:"Rehost (lift and shift)"},
"demand":{meaning:"how much load or usage there is",hint:"Elasticity, Auto Scaling"},
"perspectives":{meaning:"points of view, areas of focus",hint:"AWS CAF has 6 perspectives"},
"shared responsibility model":{meaning:"the split of security duties between AWS and the customer",hint:"AWS: OF the cloud · Customer: IN the cloud"},
"patching":{meaning:"installing fixes and security updates",hint:"EC2 operating system → customer; RDS → AWS"},
"guest operating system":{meaning:"the operating system running inside a virtual machine",hint:"Customer's responsibility"},
"physical security":{meaning:"protecting the buildings and hardware",hint:"AWS's responsibility"},
"hypervisor":{meaning:"the software layer that runs virtual machines on a physical server",hint:"AWS's responsibility"},
"root user":{meaning:"the account owner identity with full, unrestricted access",hint:"Turn on MFA, do not use it for daily work"},
"MFA":{meaning:"multi-factor authentication: a second proof of identity besides the password",hint:""},
"access keys":{meaning:"long-term keys that authenticate requests from the CLI or SDK",hint:"Do not store them on EC2 → use an IAM role"},
"best practice":{meaning:"the recommended way of doing something",hint:""},
"compliance reports":{meaning:"documents proving that standards and regulations are met",hint:"AWS Artifact"},
"auditor":{meaning:"a person who checks that rules and standards are followed",hint:""},
"audit":{meaning:"to review and check what was done",hint:"Who did what → CloudTrail"},
"API calls":{meaning:"requests sent to AWS services (every action is one)",hint:"CloudTrail"},
"SQL injection":{meaning:"an attack that slips malicious SQL into a query",hint:"AWS WAF"},
"cross-site scripting":{meaning:"an attack (XSS) that injects malicious scripts into web pages",hint:"AWS WAF"},
"DDoS":{meaning:"distributed denial-of-service: flooding a system with traffic to take it down",hint:"AWS Shield"},
"threats":{meaning:"dangers or malicious activity",hint:"Amazon GuardDuty"},
"MOST secure":{meaning:"the safest of the options",hint:"Usually: IAM role, least privilege, MFA"},
"least privilege":{meaning:"the minimum permissions needed, nothing more",hint:"Grant only the permissions that are required"},
"data centers":{meaning:"buildings that house servers and network equipment",hint:""},
"provisioning":{meaning:"setting up and preparing resources ahead of use",hint:"“without provisioning” → serverless"},
"serverless":{meaning:"you do not manage any servers",hint:"Lambda, Fargate, DynamoDB, S3"},
"rarely accessed":{meaning:"almost never read or used",hint:"S3 IA / Glacier"},
"archive":{meaning:"keep for a long time, mostly untouched",hint:"S3 Glacier"},
"retrieval time":{meaning:"how long it takes to get the data back",hint:"A long wait is acceptable → Glacier Deep Archive"},
"MOST cost-effective":{meaning:"the best value for money",hint:"Pick the cheapest answer that still meets the requirements"},
"fully managed":{meaning:"AWS runs and maintains it entirely for you",hint:""},
"NoSQL":{meaning:"a non-relational database",hint:"DynamoDB"},
"latency":{meaning:"delay before a response arrives",hint:"CloudFront, choose a Region close to users"},
"caching":{meaning:"keeping a copy nearby so it can be served faster",hint:"CloudFront, ElastiCache"},
"edge location":{meaning:"an AWS site close to end users",hint:"CloudFront, Route 53"},
"static content":{meaning:"files that do not change per request (images, CSS, JS)",hint:"S3 + CloudFront"},
"incoming traffic":{meaning:"requests arriving at your application",hint:"Elastic Load Balancing"},
"on-premises":{meaning:"in the company's own data center, not in the cloud",hint:""},
"public internet":{meaning:"the open internet that everyone shares",hint:"Not over the internet → Direct Connect"},
"dedicated":{meaning:"reserved for one customer only, not shared",hint:"Direct Connect, Dedicated Hosts"},
"steady-state":{meaning:"constant, predictable usage",hint:"Reserved Instances / Savings Plans"},
"interrupted":{meaning:"stopped unexpectedly while running",hint:"Interruptions are acceptable → Spot"},
"fault-tolerant":{meaning:"keeps working even when a part fails",hint:"Spot; Multi-AZ architecture"},
"batch processing":{meaning:"processing jobs in groups rather than one by one in real time",hint:""},
"threshold":{meaning:"a limit that triggers an action when crossed",hint:"AWS Budgets"},
"estimate":{meaning:"a rough calculation made in advance",hint:"AWS Pricing Calculator"},
"volume discounts":{meaning:"lower unit prices the more you use",hint:"Consolidated billing"},
"combined usage":{meaning:"usage added together across accounts",hint:"Consolidated billing"},
"data transfer out":{meaning:"data leaving AWS",hint:"Charged"},
"data transfer in":{meaning:"data coming into AWS",hint:"Free"},
"highly available":{meaning:"almost always up, with very little downtime",hint:"Multi-AZ, ELB"},
"least operational overhead":{meaning:"the least day-to-day management work",hint:"Pick the managed/serverless service"},
"Choose TWO":{meaning:"select exactly two answers",hint:"You must pick both correct answers"},
"environmental impact":{meaning:"the effect on the environment",hint:"Well-Architected → Sustainability"},
"operations as code":{meaning:"running and automating operations through code",hint:"Operational Excellence"},
"idle":{meaning:"running but not being used",hint:"Trusted Advisor / Stop guessing capacity"},
"encryption keys":{meaning:"the keys used to lock and unlock encrypted data",hint:"AWS KMS"},
"credentials":{meaning:"sign-in details such as passwords and keys",hint:"Secrets Manager; never share them"},
"rotate":{meaning:"replace on a regular schedule",hint:"Secrets Manager"},
"sensitive data":{meaning:"private data that must be protected, such as personal information",hint:"Amazon Macie"},
"vulnerabilities":{meaning:"security weaknesses that could be exploited",hint:"Amazon Inspector"},
"stateful":{meaning:"remembers the connection, so return traffic is allowed automatically",hint:"Security group"},
"stateless":{meaning:"does not remember the connection; each direction needs its own rule",hint:"Network ACL"},
"security posture":{meaning:"the overall state of your security",hint:"AWS Security Hub"},
"sign in once":{meaning:"one login gives access to many accounts and apps",hint:"IAM Identity Center (SSO)"},
"block-level storage":{meaning:"storage that behaves like a disk drive",hint:"Amazon EBS"},
"analytical queries":{meaning:"queries that analyze large amounts of data",hint:"Amazon Redshift"},
"read-heavy":{meaning:"many more reads than writes",hint:"ElastiCache, read replica"},
"decouple":{meaning:"separate components so they do not depend directly on each other",hint:"Amazon SQS"},
"publish/subscribe":{meaning:"a sender publishes a message and all subscribers receive it",hint:"Amazon SNS"},
"templates":{meaning:"files that define the infrastructure to create",hint:"AWS CloudFormation (IaC)"},
"repeatable":{meaning:"can be done again the same way every time",hint:"IaC → CloudFormation"},
"memory-intensive":{meaning:"needs a lot of memory (RAM)",hint:"Memory optimized"},
"forecast":{meaning:"a prediction of future values",hint:"AWS Cost Explorer"},
"server-bound software licenses":{meaning:"licenses tied to a specific physical server",hint:"Dedicated Hosts"},
"third-party software":{meaning:"software made by vendors other than AWS",hint:"AWS Marketplace"},
"hybrid":{meaning:"a mix of on-premises and cloud",hint:"Storage Gateway, Outposts, VPN"},
"BYOL":{meaning:"bring your own license: use licenses you already own",hint:"Dedicated Hosts, License Manager"},
"rightsizing":{meaning:"choosing the right size, neither too big nor too small",hint:"Compute Optimizer, Cost Explorer"},
"minimal downtime":{meaning:"as little interruption as possible",hint:"DMS (database migration)"},
"data at rest":{meaning:"data that is stored",hint:"KMS"},
"data in transit":{meaning:"data moving over a network",hint:"TLS, ACM"},
"corporate credentials":{meaning:"the company logins employees already have",hint:"Federation, IAM Identity Center"},
"temporary access":{meaning:"permissions that expire after a short time",hint:"IAM role"},
"root cause":{meaning:"the underlying reason something happened",hint:"Amazon Detective"},
"data residency":{meaning:"a rule that data must stay in a certain country or area",hint:"Choose a suitable Region"},
"disaster recovery":{meaning:"restoring systems after a major outage",hint:"Multi-Region, Elastic Disaster Recovery"},
"single points of failure":{meaning:"one component whose failure takes down the whole system",hint:"Use Multi-AZ to avoid them"},
"Kubernetes":{meaning:"an open-source platform for orchestrating containers",hint:"Amazon EKS"},
"schema":{meaning:"the structure of a database",hint:"AWS SCT"},
"MongoDB":{meaning:"a popular document database",hint:"Amazon DocumentDB"},
"sentiment":{meaning:"the feeling in a text (positive or negative)",hint:"Amazon Comprehend"},
"lifelike speech":{meaning:"natural-sounding spoken audio",hint:"Amazon Polly"},
"scanned documents":{meaning:"paper documents turned into image files",hint:"Amazon Textract"},
"streaming data":{meaning:"data that flows in continuously",hint:"Amazon Kinesis"},
"real-time":{meaning:"processed immediately as it happens",hint:"Kinesis"},
"dashboards":{meaning:"visual screens of charts and metrics",hint:"Amazon Quick (formerly QuickSight), CloudWatch"},
"event bus":{meaning:"a channel that receives events and routes them to targets",hint:"Amazon EventBridge"},
"contact center":{meaning:"a customer service call center",hint:"Amazon Connect"},
"virtual Windows and Linux desktops":{meaning:"desktop computers that run in the cloud",hint:"Amazon WorkSpaces"},
"static IP addresses":{meaning:"IP addresses that never change",hint:"Global Accelerator"},
"landing zone":{meaning:"a well-set-up, multi-account AWS environment",hint:"AWS Control Tower"},
"abuse":{meaning:"misuse of AWS resources for harmful purposes",hint:"AWS Trust & Safety"},
"spam":{meaning:"unwanted bulk email",hint:"AWS Trust & Safety"}
});
Object.assign(L.services,{
"Amazon EC2":{desc:"Virtual servers. You manage the operating system yourself (IaaS).",confuse:"Lambda (serverless), Lightsail (simple VPS)"},
"AWS Lambda":{desc:"Runs code without servers to manage; you pay per request and for run time.",confuse:"EC2, Fargate (serverless containers)"},
"AWS Elastic Beanstalk":{desc:"PaaS: upload your code and AWS sets up EC2, ELB, and Auto Scaling for you.",confuse:"CloudFormation (IaC)"},
"AWS CloudFormation":{desc:"Infrastructure as Code: creates resources from YAML/JSON templates.",confuse:"Elastic Beanstalk"},
"Amazon S3":{desc:"Object storage with 11 nines of durability and many storage classes.",confuse:"EBS (block), EFS (file)"},
"Amazon EBS":{desc:"Block storage volumes attached to EC2; each lives in a single AZ.",confuse:"EFS (shared by many EC2 instances), Instance Store (lost when the instance stops)"},
"Amazon EFS":{desc:"A shared file system for many EC2 instances (Linux, NFS).",confuse:"EBS"},
"Amazon RDS":{desc:"Managed relational databases (MySQL, PostgreSQL...).",confuse:"Aurora, DynamoDB"},
"Amazon Aurora":{desc:"AWS's own relational database, MySQL/PostgreSQL-compatible, high performance.",confuse:"RDS"},
"Amazon DynamoDB":{desc:"Serverless NoSQL key-value database with single-digit millisecond latency.",confuse:"RDS (SQL)"},
"Amazon Redshift":{desc:"Data warehouse for analyzing large amounts of data (OLAP).",confuse:"RDS (OLTP)"},
"Amazon ElastiCache":{desc:"In-memory cache (Redis/Memcached).",confuse:"DynamoDB"},
"Amazon CloudFront":{desc:"CDN: caches content at edge locations.",confuse:"Route 53, Global Accelerator"},
"Amazon Route 53":{desc:"DNS, domain registration, routing, health checks.",confuse:"CloudFront"},
"Amazon VPC":{desc:"Your own isolated private network in AWS: subnets, route tables, gateways.",confuse:""},
"AWS Direct Connect":{desc:"A dedicated physical connection from on-premises to AWS.",confuse:"Site-to-Site VPN (over the internet)"},
"Elastic Load Balancing":{desc:"Distributes traffic across multiple targets.",confuse:"Auto Scaling"},
"Amazon EC2 Auto Scaling":{desc:"Automatically adds or removes EC2 instances based on load.",confuse:"ELB"},
"Amazon SNS / SQS":{desc:"SNS: sends pub/sub notifications. SQS: a message queue that decouples components.",confuse:"Mixing up SNS and SQS"},
"AWS IAM":{desc:"Manages users, groups, roles, and policies. Free and global.",confuse:"IAM Identity Center (SSO)"},
"AWS CloudTrail":{desc:"Records API calls: who did what, and when.",confuse:"CloudWatch, Config"},
"Amazon CloudWatch":{desc:"Monitors metrics, logs, and alarms.",confuse:"CloudTrail"},
"AWS Config":{desc:"Resource configuration history and compliance checks against rules.",confuse:"CloudTrail"},
"AWS Shield":{desc:"DDoS protection. Standard is free, Advanced is paid.",confuse:"WAF"},
"AWS WAF":{desc:"Layer 7 web firewall: blocks SQL injection and XSS, filters IPs.",confuse:"Shield, Security Group"},
"Amazon GuardDuty":{desc:"Detects threats from logs (CloudTrail, VPC Flow Logs, DNS).",confuse:"Inspector, Macie"},
"Amazon Inspector":{desc:"Scans for software vulnerabilities on EC2, ECR, and Lambda.",confuse:"GuardDuty"},
"Amazon Macie":{desc:"Finds sensitive data (PII) in S3 using ML.",confuse:"GuardDuty"},
"AWS KMS":{desc:"Creates and manages encryption keys.",confuse:"Secrets Manager (stores passwords), CloudHSM"},
"AWS Secrets Manager":{desc:"Stores and automatically rotates passwords and API keys.",confuse:"KMS"},
"AWS Artifact":{desc:"Download compliance reports (SOC, PCI, ISO) and agreements.",confuse:"Config, Audit Manager"},
"AWS Trusted Advisor":{desc:"Recommendations in 6 categories: cost, performance, security, fault tolerance, service limits, operational excellence.",confuse:"Inspector"},
"AWS Budgets":{desc:"Set budgets and get alerts when you exceed them.",confuse:"Cost Explorer"},
"AWS Cost Explorer":{desc:"View and analyze costs over time, with forecasts.",confuse:"Budgets, Pricing Calculator"},
"AWS Pricing Calculator":{desc:"Estimates costs before you use a service.",confuse:"Cost Explorer"},
"AWS Organizations":{desc:"Manages multiple accounts, consolidated billing, SCPs.",confuse:""},
"AWS IAM Identity Center":{desc:"Single sign-on (SSO) for employees to many AWS accounts and applications.",confuse:"Amazon Cognito (end users of an app)"},
"Amazon Cognito":{desc:"Sign-up and sign-in for users of web/mobile applications.",confuse:"IAM Identity Center"},
"AWS Security Hub":{desc:"Aggregates security alerts and security posture from many services and accounts.",confuse:"GuardDuty, Trusted Advisor"},
"AWS Certificate Manager":{desc:"Issues and manages SSL/TLS certificates.",confuse:"KMS"},
"AWS Fargate":{desc:"Runs containers without managing servers (with ECS/EKS).",confuse:"Lambda, EC2"},
"AWS Outposts":{desc:"AWS infrastructure installed in the customer's data center.",confuse:"Local Zones"},
"AWS Storage Gateway":{desc:"Hybrid storage: on-premises applications use cloud storage.",confuse:"EFS, Direct Connect"},
"AWS Site-to-Site VPN":{desc:"Encrypted connection between on-premises and a VPC over the internet.",confuse:"Direct Connect"},
"AWS Systems Manager":{desc:"Manages and operates instances: patching, running commands, Parameter Store.",confuse:"CloudFormation"},
"AWS Marketplace":{desc:"A marketplace for third-party software that runs on AWS.",confuse:"Service Catalog, APN"},
"AWS Firewall Manager":{desc:"Centrally manages WAF, Shield, and security group rules across many accounts.",confuse:"Security Hub"},
"Amazon Detective":{desc:"Investigates the root cause of security incidents.",confuse:"GuardDuty (detection)"},
"AWS CloudHSM":{desc:"Dedicated HSM hardware; the customer has full control of the keys.",confuse:"KMS (managed)"},
"AWS Directory Service":{desc:"Managed Microsoft Active Directory on AWS.",confuse:"IAM Identity Center"},
"AWS Resource Access Manager":{desc:"Shares resources (subnets, Transit Gateway...) between accounts.",confuse:""},
"Amazon ECS / EKS / ECR":{desc:"ECS: AWS's own container orchestration. EKS: Kubernetes. ECR: stores container images.",confuse:"Fargate (serverless compute for containers)"},
"AWS Batch":{desc:"Runs batch computing jobs at large scale.",confuse:"Lambda, Step Functions"},
"Amazon FSx":{desc:"Managed third-party file systems: Windows File Server (SMB), NetApp ONTAP, OpenZFS, Lustre (HPC/ML; FSx for Lustre is on the CLF-C02 out-of-scope list).",confuse:"EFS (Linux NFS)"},
"AWS Backup":{desc:"Centralized backup for many services.",confuse:"Elastic Disaster Recovery"},
"AWS Elastic Disaster Recovery":{desc:"Continuously replicates servers for fast recovery after a disaster.",confuse:"AWS Backup"},
"AWS DMS / AWS SCT":{desc:"DMS: migrates database data (with continuous replication). SCT: converts the schema between database types.",confuse:"Mixing up DMS and SCT"},
"AWS Application Migration Service":{desc:"Rehosts (lift and shift) servers to AWS.",confuse:"DMS"},
"AWS Application Discovery Service":{desc:"Collects information about on-premises servers to plan a migration. Closed to new customers since November 2025 (replaced by AWS Transform).",confuse:"Migration Evaluator"},
"AWS Migration Hub":{desc:"Tracks migration progress in one place. Closed to new customers since November 2025 (replaced by AWS Transform).",confuse:""},
"Migration Evaluator":{desc:"Builds the business case and cost estimate for moving to AWS.",confuse:"Pricing Calculator"},
"Amazon DocumentDB":{desc:"MongoDB-compatible document database.",confuse:"DynamoDB"},
"Amazon Neptune":{desc:"Graph database for highly connected data.",confuse:"DocumentDB"},
"Amazon SageMaker AI":{desc:"Build, train, and deploy ML models.",confuse:"The pre-built AI services"},
"Amazon Rekognition":{desc:"Analyzes images and video.",confuse:"Textract"},
"Amazon Textract":{desc:"Extracts text, tables, and forms from scanned documents.",confuse:"Rekognition"},
"Amazon Polly":{desc:"Turns text into speech.",confuse:"Transcribe"},
"Amazon Transcribe":{desc:"Turns speech into text.",confuse:"Polly"},
"Amazon Translate":{desc:"Translates between languages.",confuse:""},
"Amazon Comprehend":{desc:"NLP: sentiment analysis, entity extraction.",confuse:""},
"Amazon Lex":{desc:"Builds voice and text chatbots.",confuse:"Polly, Connect"},
"Amazon Q":{desc:"Generative AI assistant for businesses (Q Business) and developers (Q Developer). Q Business no longer accepts new customers; the Q Developer IDE plugins reach end of support on April 30, 2027.",confuse:"Lex"},
"Amazon Athena":{desc:"Runs SQL queries directly on S3, serverless.",confuse:"Redshift"},
"Amazon Kinesis":{desc:"Collects and processes real-time streaming data.",confuse:"SQS"},
"AWS Glue":{desc:"Serverless ETL and data catalog.",confuse:"EMR"},
"Amazon EMR":{desc:"Runs big data frameworks (Spark, Hadoop).",confuse:"Glue"},
"Amazon OpenSearch Service":{desc:"Search, log analytics, application monitoring.",confuse:""},
"Amazon Quick":{desc:"BI: dashboards and data visualization (formerly QuickSight).",confuse:""},
"Amazon EventBridge":{desc:"Serverless event bus: routes events by rules and runs jobs on a schedule.",confuse:"SNS, SQS"},
"AWS Step Functions":{desc:"Orchestrates multi-step workflows.",confuse:"EventBridge"},
"Amazon Connect":{desc:"Contact center in the cloud.",confuse:""},
"Amazon SES":{desc:"Sends marketing and transactional email.",confuse:"SNS"},
"AWS CodeBuild / CodePipeline":{desc:"CodeBuild: build and test. CodePipeline: orchestrates CI/CD.",confuse:""},
"AWS X-Ray":{desc:"Traces requests to debug distributed applications.",confuse:"CloudWatch, CloudTrail"},
"Amazon WorkSpaces":{desc:"Virtual desktops (DaaS).",confuse:"WorkSpaces Applications (AppStream 2.0)"},
"Amazon WorkSpaces Applications (AppStream 2.0)":{desc:"Streams desktop applications to a browser. Renamed from AppStream 2.0 in November 2025.",confuse:"WorkSpaces"},
"Amazon WorkSpaces Secure Browser":{desc:"A secure browser for accessing internal websites and SaaS.",confuse:"WorkSpaces"},
"AWS Amplify":{desc:"Build and host full-stack web/mobile apps.",confuse:"Elastic Beanstalk"},
"AWS IoT Core":{desc:"Connects and manages IoT devices.",confuse:""},
"Amazon API Gateway":{desc:"Create, publish, and secure APIs.",confuse:"ELB"},
"AWS Global Accelerator":{desc:"Sends traffic over the AWS global network with static IPs; no caching.",confuse:"CloudFront"},
"AWS Transit Gateway":{desc:"A hub that connects many VPCs and on-premises networks.",confuse:"VPC peering"},
"AWS PrivateLink":{desc:"Private access to services, without going over the internet.",confuse:""},
"AWS Client VPN":{desc:"VPN for individual remote users.",confuse:"Site-to-Site VPN"},
"AWS Control Tower":{desc:"Sets up and governs a multi-account landing zone.",confuse:"Organizations"},
"AWS Service Catalog":{desc:"A catalog of approved internal IT products.",confuse:"Marketplace"},
"Service Quotas":{desc:"View resource limits and request increases.",confuse:"Trusted Advisor"},
"AWS Compute Optimizer":{desc:"Rightsizing recommendations powered by ML.",confuse:"Cost Explorer"},
"AWS Health Dashboard":{desc:"AWS service events and maintenance that affect your account.",confuse:"CloudWatch"},
"AWS Well-Architected Tool":{desc:"Reviews your system against the Well-Architected Framework.",confuse:"Trusted Advisor"},
"AWS License Manager":{desc:"Manages and tracks software licenses.",confuse:""},
"AWS Cost and Usage Report":{desc:"The most detailed cost data, delivered to S3.",confuse:"Cost Explorer"},
"AWS re:Post / Knowledge Center":{desc:"re:Post: community Q&A. Knowledge Center: articles answering frequently asked questions.",confuse:""},
"AWS Prescriptive Guidance":{desc:"Proven strategies, guides, and patterns.",confuse:""},
"AWS Professional Services":{desc:"AWS's own team of experts that helps with large projects.",confuse:"APN"},
"AWS Partner Network (APN)":{desc:"The partner network: system integrators and ISVs.",confuse:"Professional Services"},
"AWS Trust & Safety":{desc:"Receives reports of abuse of AWS resources.",confuse:""}
});
L.lessons[1]=[
{t:"About the CLF-C02 exam (per the Exam Guide)",h:`
<ul><li><b>65 questions</b>: 50 scored and 15 unscored trial questions. You cannot tell which ones are the trial questions.</li>
<li><b>Multiple choice</b>: 1 correct answer, 3 distractors. <b>Multiple response</b>: 2 or more correct answers out of 5 or more options.</li>
<li>Unanswered questions count as wrong, and there is no penalty for guessing. So <b>never leave a question blank</b>.</li>
<li>Scaled score 100–1000, <b>pass at ≥ 700</b>. You only need the overall score; you do not have to pass each domain.</li>
<li>Out of scope: writing code, designing architecture, troubleshooting, performance testing.</li></ul>`},
{t:"The six advantages of cloud computing",h:`
<table><tr><th>Term</th><th>Meaning</th></tr>
<tr><td><b>Trade fixed expense for variable expense</b></td><td>No upfront hardware purchase; you pay only for what you use</td></tr>
<tr><td><b>Benefit from massive economies of scale</b></td><td>AWS buys in huge volumes, so prices are lower for every customer</td></tr>
<tr><td><b>Stop guessing capacity</b></td><td>No need to predict capacity in advance; scale up and down with demand</td></tr>
<tr><td><b>Increase speed and agility</b></td><td>Create resources in minutes and experiment quickly</td></tr>
<tr><td><b>Stop spending money running and maintaining data centers</b></td><td>Focus on your business instead of running data centers</td></tr>
<tr><td><b>Go global in minutes</b></td><td>Deploy to many Regions around the world quickly</td></tr></table>`},
{t:"Service models & deployment models",h:`
<ul><li><b>IaaS</b>: rent infrastructure (virtual machines, networking), for example EC2. You manage the most.</li>
<li><b>PaaS</b>: you only take care of the code, for example Elastic Beanstalk.</li>
<li><b>SaaS</b>: use complete, ready-made software, for example Gmail.</li></ul>
<ul><li><b>Cloud</b>: everything runs in the cloud.</li>
<li><b>Hybrid</b>: a mix of cloud and on-premises.</li>
<li><b>On-premises</b> (private cloud): runs in the company's own data center.</li></ul>`},
{t:"Well-Architected Framework: 6 pillars",h:`
<table><tr><th>Pillar</th><th>Keywords in the question</th></tr>
<tr><td><b>Operational Excellence</b></td><td>operations, monitoring, continuous improvement, IaC</td></tr>
<tr><td><b>Security</b></td><td>protecting data, IAM, traceability</td></tr>
<tr><td><b>Reliability</b></td><td>recover from failures, meet demand</td></tr>
<tr><td><b>Performance Efficiency</b></td><td>use resources efficiently, choose the right type</td></tr>
<tr><td><b>Cost Optimization</b></td><td>avoid unnecessary costs</td></tr>
<tr><td><b>Sustainability</b></td><td>reduce environmental impact</td></tr></table>`},
{t:"Migration strategies (the 7 Rs)",h:`
<ul><li><b>Rehost</b> (lift and shift): move as is, the fastest option</li>
<li><b>Replatform</b>: small optimizations, for example moving the database to RDS</li>
<li><b>Refactor / Re-architect</b>: rewrite, for example to serverless</li>
<li><b>Repurchase</b>: switch to a SaaS product</li>
<li><b>Retire</b>: shut it down</li>
<li><b>Retain</b>: keep it on-premises</li>
<li><b>Relocate</b>: move the infrastructure (for example VMware) to the cloud</li></ul>`},
{t:"AWS CAF: 6 perspectives",h:`
<p>Business group: <b>Business</b>, <b>People</b>, <b>Governance</b>.<br>Technical group: <b>Platform</b>, <b>Security</b>, <b>Operations</b>.</p>`},
{t:"Concepts that are easy to mix up",h:`
<ul><li><b>Elasticity</b>: automatically scale out and in with demand.</li>
<li><b>Scalability</b>: the ability to grow when needed.</li>
<li><b>High availability</b>: always up, little downtime (Multi-AZ).</li>
<li><b>Fault tolerance</b>: keeps running when a component fails.</li>
<li><b>Durability</b>: data is not lost.</li></ul>`},
{t:"Cloud economics (Task 1.4)",h:`
<ul><li><b>Fixed vs variable cost</b>: on-premises means paying upfront (hardware, data center). In the cloud you pay for what you use.</li>
<li><b>On-premises costs</b>: hardware, power, cooling, floor space, operations staff, periodic hardware replacement.</li>
<li><b>Licensing</b>: <b>BYOL</b> (use licenses you already own, usually requires Dedicated Hosts) and <b>license-included</b> (the price already includes the license).</li>
<li><b>Rightsizing</b>: choose the right type and size. Tools: Compute Optimizer, Cost Explorer.</li>
<li><b>Automation</b>: IaC, Auto Scaling, and automatically shutting down unused resources reduce effort and waste.</li></ul>`},
{t:"AWS CAF: business benefits & migration resources (Task 1.3)",h:`
<p>The 4 business outcomes: <b>reduced business risk</b>, <b>improved ESG performance</b>, <b>increased revenue</b>, <b>increased operational efficiency</b>.</p>
<p>Migration tools: Migration Evaluator (business case) → Application Discovery Service (collect information) → Application Migration Service (rehost servers) / DMS + SCT (databases) → Migration Hub (track progress).</p>
<p class="note">Note: since November 7, 2025, AWS Migration Hub and AWS Application Discovery Service no longer accept new customers (AWS Transform is the successor). The exam guide still lists both services, so the exam may ask about them using the old descriptions.</p>`}
];
L.lessons[2]=[
{t:"Shared Responsibility Model",h:`
<table><tr><th>AWS: security <u>OF</u> the cloud</th><th>Customer: security <u>IN</u> the cloud</th></tr>
<tr><td>Data centers, hardware, physical security</td><td>Data and data encryption</td></tr>
<tr><td>Hypervisor, global network</td><td>IAM: users, permissions, MFA</td></tr>
<tr><td>Infrastructure of managed services (for example patching the RDS operating system)</td><td>EC2 operating system (patching), security groups</td></tr></table>
<p>Tip: the more “managed” a service is (RDS, Lambda), the more AWS takes care of.</p>`},
{t:"IAM",h:`
<ul><li><b>User</b>: a person or an application. <b>Group</b>: a collection of users. <b>Role</b>: temporary permissions (for EC2, Lambda, users from another account). <b>Policy</b>: a JSON document that defines permissions.</li>
<li><b>Least privilege</b>: grant only the minimum permissions needed.</li>
<li><b>Root user</b>: turn on MFA, do not create access keys, do not use it for daily work.</li>
<li>IAM is a <b>global</b> service and it is <b>free</b>.</li></ul>`},
{t:"Security services table",h:`
<table><tr><th>Need</th><th>Service</th></tr>
<tr><td>DDoS protection</td><td>AWS Shield (Standard is free)</td></tr>
<tr><td>Block SQL injection, XSS (layer 7)</td><td>AWS WAF</td></tr>
<tr><td>Detect threats from logs</td><td>Amazon GuardDuty</td></tr>
<tr><td>Scan for software vulnerabilities</td><td>Amazon Inspector</td></tr>
<tr><td>Find sensitive data in S3</td><td>Amazon Macie</td></tr>
<tr><td>Manage encryption keys</td><td>AWS KMS</td></tr>
<tr><td>Store passwords, rotate automatically</td><td>AWS Secrets Manager</td></tr>
<tr><td>Compliance reports (SOC, PCI)</td><td>AWS Artifact</td></tr>
<tr><td>Aggregate security alerts</td><td>AWS Security Hub</td></tr></table>`},
{t:"Monitoring & audit: 3 services people mix up",h:`
<ul><li><b>CloudTrail</b>: <i>who</i> did <i>what</i>, and <i>when</i> (API calls).</li>
<li><b>CloudWatch</b>: performance (CPU, logs, alarms).</li>
<li><b>Config</b>: how resource configurations have changed, and whether they comply with rules.</li></ul>`},
{t:"Security Group vs Network ACL",h:`
<table><tr><th></th><th>Security Group</th><th>Network ACL</th></tr>
<tr><td>Scope</td><td>Instance</td><td>Subnet</td></tr>
<tr><td>State</td><td>Stateful</td><td>Stateless</td></tr>
<tr><td>Rules</td><td>Allow only</td><td>Allow and Deny</td></tr></table>`},
{t:"Encryption: at rest & in transit",h:`
<table><tr><th>Type</th><th>Meaning</th><th>Services</th></tr>
<tr><td>At rest</td><td>Data that is stored (S3, EBS, RDS)</td><td>AWS KMS, CloudHSM (your own HSM)</td></tr>
<tr><td>In transit</td><td>Data moving over the network</td><td>TLS/HTTPS, certificates from ACM</td></tr></table>`},
{t:"Root user & identity management (Task 2.3)",h:`
<p><b>Tasks only the root user can do</b> (examples): change the root email/password, close the account, restore IAM permissions, register as a seller on the Reserved Instance Marketplace, enable MFA Delete for S3.</p>
<ul><li><b>Protecting root</b>: AWS now requires MFA for the root user on every type of account (standalone, management, member; if it is not set up yet, you must register within 14 days of the first sign-in). Also: do not create access keys, lock away the credentials, and use IAM for daily work.</li>
<li><b>Password policy</b>: length, complexity, and how often passwords must be changed.</li>
<li><b>Federation</b>: use your company identities (AD, SAML) to sign in to AWS, through IAM Identity Center.</li>
<li><b>Cross-account role</b>: a user in account A assumes a role in account B to get temporary permissions.</li>
<li><b>Storing secrets</b>: Secrets Manager (with automatic rotation), Systems Manager Parameter Store.</li>
<li><b>Access reports</b>: IAM credential report (status of passwords, keys, MFA), access advisor (which permissions are unused).</li>
<li><b>Policy</b>: AWS managed policies (pre-written by AWS) and customer managed policies (written by you).</li></ul>`},
{t:"More security services & information sources (Task 2.2, 2.4)",h:`
<table><tr><th>Service</th><th>What it does</th></tr>
<tr><td>AWS Firewall Manager</td><td>Centrally manages WAF/Shield/security group rules across many accounts</td></tr>
<tr><td>Amazon Detective</td><td>Investigates the root cause</td></tr>
<tr><td>AWS CloudHSM</td><td>Dedicated HSM</td></tr>
<tr><td>AWS Directory Service</td><td>Managed Microsoft AD</td></tr>
<tr><td>AWS RAM</td><td>Shares resources between accounts</td></tr>
<tr><td>Amazon Cognito</td><td>Sign-in for users of an application</td></tr></table>
<p>Where <b>security logs</b> live: CloudTrail (API calls), CloudWatch Logs, VPC Flow Logs, S3 access logs.</p>
<p><b>Information sources</b>: AWS Artifact (compliance reports), AWS Security Center, AWS Security Blog, AWS Knowledge Center. Third-party security products are available on AWS Marketplace.</p>
<p><b>Compliance by country/industry</b>: choose a suitable Region (data residency). Compliance levels (for example HIPAA eligible) differ from service to service.</p>`}
];
L.lessons[3]=[
{t:"Global infrastructure",h:`
<ul><li><b>Region</b>: a geographic area made up of multiple AZs.</li>
<li><b>Availability Zone</b>: 1 or more separate data centers within a Region.</li>
<li><b>Edge location</b>: a cache point for CloudFront and Route 53, close to users.</li></ul>
<p>Choose a Region based on 4 factors: <b>compliance</b> (data laws), <b>latency</b> (close to users), <b>service availability</b> (is the service offered there?), <b>pricing</b> (cost).</p>`},
{t:"Compute",h:`
<table><tr><th>Service</th><th>When to use</th></tr>
<tr><td>EC2</td><td>You need full control of the virtual machine</td></tr>
<tr><td>Lambda</td><td>Serverless, event-driven, up to 15 minutes per run</td></tr>
<tr><td>ECS / EKS</td><td>Run containers (EKS uses Kubernetes)</td></tr>
<tr><td>Fargate</td><td>Serverless containers</td></tr>
<tr><td>Elastic Beanstalk</td><td>PaaS: just upload your code</td></tr>
<tr><td>Lightsail</td><td>Simple VPS, fixed price</td></tr></table>`},
{t:"Storage & S3 storage classes",h:`
<ul><li><b>S3</b>: object · <b>EBS</b>: block (attached to 1 EC2 instance, in 1 AZ) · <b>EFS</b>: shared file storage</li></ul>
<table><tr><th>Storage class</th><th>Use when</th></tr>
<tr><td>S3 Standard</td><td>Frequently accessed</td></tr>
<tr><td>S3 Intelligent-Tiering</td><td>Access frequency is not known in advance</td></tr>
<tr><td>S3 Standard-IA</td><td>Infrequently accessed, but needs immediate access</td></tr>
<tr><td>S3 One Zone-IA</td><td>Infrequently accessed, and storing in 1 AZ is acceptable</td></tr>
<tr><td>Glacier Instant Retrieval</td><td>Archive, retrieved in milliseconds</td></tr>
<tr><td>Glacier Flexible Retrieval</td><td>Archive, retrieved in minutes to hours</td></tr>
<tr><td>Glacier Deep Archive</td><td>Cheapest; retrieval within 12 hours (or longer)</td></tr></table>`},
{t:"Database",h:`
<ul><li><b>RDS / Aurora</b>: relational (SQL), OLTP</li>
<li><b>DynamoDB</b>: NoSQL key-value, serverless</li>
<li><b>Redshift</b>: data warehouse, analytics</li>
<li><b>ElastiCache</b>: in-memory cache</li></ul>`},
{t:"Networking",h:`
<ul><li><b>VPC</b>: a private network. <b>Internet gateway</b>: lets the VPC reach the internet. <b>NAT gateway</b>: lets a private subnet go out to the internet.</li>
<li><b>Direct Connect</b>: a dedicated connection. <b>Site-to-Site VPN</b>: an encrypted connection over the internet.</li>
<li><b>Route 53</b>: DNS. <b>CloudFront</b>: CDN. <b>ELB</b>: distributes load. <b>Auto Scaling</b>: adds/removes instances.</li></ul>`},
{t:"Ways to access AWS",h:`
<ul><li><b>Management Console</b> (web) · <b>CLI</b> (command line) · <b>SDK</b> (in code)</li>
<li><b>CloudFormation</b>: Infrastructure as Code (IaC)</li></ul>`},
{t:"Multi-AZ & Multi-Region (Task 3.2)",h:`
<ul><li>AZs are physically separate and <b>share no single point of failure</b>, so deploy Multi-AZ to achieve high availability.</li>
<li>Use multiple Regions when you need: <b>disaster recovery</b>, <b>business continuity</b>, <b>low latency</b> for global users, <b>data sovereignty</b>.</li>
<li>Edge locations bring content close to users (CloudFront) and speed up routing (Global Accelerator, Route 53).</li></ul>`},
{t:"Containers, batch & instance types (Task 3.3)",h:`
<ul><li><b>ECS</b>: AWS's own container orchestration. <b>EKS</b>: Kubernetes. <b>ECR</b>: stores images. <b>Fargate</b>: runs containers without managing servers.</li>
<li><b>AWS Batch</b>: batch jobs. <b>Lambda</b>: event-driven functions (up to 15 minutes).</li>
<li>Instance types: General purpose (balanced), Compute optimized (CPU-heavy), Memory optimized (RAM-heavy), Storage optimized (heavy disk reads/writes), Accelerated computing (GPU).</li>
<li><b>Auto Scaling</b> provides elasticity. A <b>load balancer</b> distributes load and checks the health of its targets.</li></ul>`},
{t:"More on storage (Task 3.6)",h:`
<table><tr><th>Need</th><th>Service</th></tr>
<tr><td>Very fast temporary disk, lost when the instance stops</td><td>EC2 instance store</td></tr>
<tr><td>Shared files for Windows (SMB)</td><td>Amazon FSx for Windows File Server</td></tr>
<tr><td>Shared files for Linux (NFS)</td><td>Amazon EFS</td></tr>
<tr><td>Hybrid: on-premises uses cloud storage (cached)</td><td>AWS Storage Gateway</td></tr>
<tr><td>Automatically move objects between storage classes or delete them over time</td><td>S3 Lifecycle policy</td></tr>
<tr><td>Centralized backup across many services</td><td>AWS Backup</td></tr>
<tr><td>Disaster recovery for servers</td><td>AWS Elastic Disaster Recovery</td></tr></table>`},
{t:"Database & migration (Task 3.4)",h:`
<ul><li><b>EC2-hosted DB</b>: full control, but you take care of everything. <b>Managed DB</b> (RDS, Aurora): AWS handles patching, backups, and hardware.</li>
<li>Relational: RDS, Aurora · NoSQL: DynamoDB · Document (MongoDB): DocumentDB · Graph: Neptune · In-memory: ElastiCache</li>
<li><b>AWS DMS</b>: migrates data, with continuous replication and low downtime. <b>AWS SCT</b>: converts the schema when you change database types.</li></ul>`},
{t:"AI/ML (Task 3.7)",h:`
<table><tr><th>Task</th><th>Service</th></tr>
<tr><td>Build and train your own ML models</td><td>Amazon SageMaker AI</td></tr>
<tr><td>Generative AI assistant</td><td>Amazon Q</td></tr>
<tr><td>Images/video: detect objects, faces</td><td>Amazon Rekognition</td></tr>
<tr><td>Extract text, tables, forms from documents</td><td>Amazon Textract</td></tr>
<tr><td>Text → speech</td><td>Amazon Polly</td></tr>
<tr><td>Speech → text</td><td>Amazon Transcribe</td></tr>
<tr><td>Language translation</td><td>Amazon Translate</td></tr>
<tr><td>Text analysis, sentiment</td><td>Amazon Comprehend</td></tr>
<tr><td>Chatbot</td><td>Amazon Lex</td></tr></table>`},
{t:"Analytics (Task 3.7)",h:`
<table><tr><th>Task</th><th>Service</th></tr>
<tr><td>SQL directly on S3 (serverless)</td><td>Amazon Athena</td></tr>
<tr><td>Real-time streaming data</td><td>Amazon Kinesis</td></tr>
<tr><td>Serverless ETL, data catalog</td><td>AWS Glue</td></tr>
<tr><td>Big data (Spark, Hadoop)</td><td>Amazon EMR</td></tr>
<tr><td>Search, log analytics</td><td>Amazon OpenSearch Service</td></tr>
<tr><td>BI dashboards</td><td>Amazon Quick (formerly QuickSight)</td></tr>
<tr><td>Data warehouse</td><td>Amazon Redshift</td></tr></table>`},
{t:"Other service categories (Task 3.8)",h:`
<ul><li><b>Application integration</b>: EventBridge (event bus, schedules), SNS (pub/sub notifications), SQS (queues), Step Functions (workflows).</li>
<li><b>Business applications</b>: Amazon Connect (contact center), Amazon SES (sending email).</li>
<li><b>Developer tools</b>: CodeBuild (build/test), CodePipeline (CI/CD), X-Ray (tracing), AWS CLI.</li>
<li><b>End-user computing</b>: WorkSpaces (virtual desktops), WorkSpaces Applications, formerly AppStream 2.0 (application streaming), WorkSpaces Secure Browser (secure browser).</li>
<li><b>Frontend web & mobile</b>: AWS Amplify. <b>IoT</b>: AWS IoT Core.</li>
<li><b>Customer enablement</b>: AWS Support.</li></ul>`},
{t:"More on networking (Task 3.5)",h:`
<table><tr><th>Service</th><th>Use when</th></tr>
<tr><td>Public / private subnet</td><td>A public subnet has a route to an internet gateway. A private subnet does not.</td></tr>
<tr><td>Amazon API Gateway</td><td>Create and publish APIs</td></tr>
<tr><td>AWS Global Accelerator</td><td>Static IPs, travels over the AWS network, no caching</td></tr>
<tr><td>AWS Transit Gateway</td><td>A hub connecting many VPCs and on-premises</td></tr>
<tr><td>AWS PrivateLink</td><td>Private access to services, without going over the internet</td></tr>
<tr><td>Site-to-Site VPN / Client VPN</td><td>Connect a whole network / individual users</td></tr></table>`},
{t:"Management & governance",h:`
<table><tr><th>Service</th><th>What it does</th></tr>
<tr><td>AWS Control Tower</td><td>Multi-account landing zone built on best practices</td></tr>
<tr><td>AWS Organizations</td><td>Manages multiple accounts, SCPs, consolidated billing</td></tr>
<tr><td>AWS Service Catalog</td><td>A catalog of approved internal IT products</td></tr>
<tr><td>Service Quotas</td><td>View and raise resource limits</td></tr>
<tr><td>AWS Compute Optimizer</td><td>Rightsizing recommendations</td></tr>
<tr><td>AWS Health Dashboard</td><td>Service events that affect your account</td></tr>
<tr><td>AWS Well-Architected Tool</td><td>Reviews your system against the framework</td></tr>
<tr><td>AWS License Manager</td><td>Manages licenses</td></tr>
<tr><td>AWS Systems Manager</td><td>Operates instances: patching, running commands, Parameter Store</td></tr></table>`}
];
L.lessons[4]=[
{t:"EC2 pricing models",h:`
<table><tr><th>Option</th><th>Characteristics</th><th>Keywords</th></tr>
<tr><td>On-Demand</td><td>Pay per second/hour, no commitment</td><td>short-term, unpredictable workload</td></tr>
<tr><td>Reserved Instances</td><td>1- or 3-year commitment, up to ~72% off</td><td>steady-state</td></tr>
<tr><td>Savings Plans</td><td>Commit to a $/hour amount for 1 or 3 years, more flexible</td><td>steady-state, flexible</td></tr>
<tr><td>Spot</td><td>Up to ~90% off, can be reclaimed (2-minute warning)</td><td>can be interrupted, fault-tolerant</td></tr>
<tr><td>Dedicated Hosts</td><td>Your own physical server</td><td>per-socket/core licenses, compliance</td></tr></table>`},
{t:"Cost management tools",h:`
<ul><li><b>Pricing Calculator</b>: estimate <i>before</i> you use a service</li>
<li><b>Cost Explorer</b>: analyze costs you have <i>already</i> incurred, with forecasts</li>
<li><b>Budgets</b>: set budgets and alerts</li>
<li><b>Cost and Usage Report</b>: the most detailed data</li>
<li><b>Cost allocation tags</b>: tag resources to split costs by project/department</li></ul>`},
{t:"AWS Organizations",h:`
<ul><li>Centrally manages multiple accounts.</li>
<li><b>Consolidated billing</b>: one bill, with usage combined to earn volume discounts.</li>
<li><b>SCP</b> (Service Control Policies): limit the maximum permissions of member accounts.</li></ul>`},
{t:"Support plans & Trusted Advisor",h:`
<p>The current CLF-C02 Exam Guide lists these support options: <b>Basic Support</b> (free, included with every account), <b>AWS Business Support+</b>, <b>AWS Enterprise Support</b>, <b>AWS Unified Operations</b>, plus customer service and community channels.</p>
<p>You may still see the old plan names in study materials: Developer, Business, Enterprise On-Ramp, Enterprise. The higher the plan, the faster the response and the more dedicated experts you get (for example a TAM, Technical Account Manager).</p>
<ul><li><b>Trusted Advisor</b>: checks 6 categories: cost optimization, performance, security, fault tolerance, service limits, operational excellence. Paid plans get the fuller set of checks.</li></ul>
<p class="note">AWS recently restructured its Support plans. Check the detailed benefits against the official AWS Support Plans page.</p>`},
{t:"More on EC2 purchasing options (Task 4.1)",h:`
<ul><li><b>Dedicated Instances</b>: dedicated hardware, but you have no visibility into the server. <b>Dedicated Hosts</b>: you can see and control sockets/cores, a good fit for BYOL.</li>
<li><b>On-Demand Capacity Reservations</b>: reserve capacity in 1 AZ, no commitment, billed at the On-Demand rate.</li>
<li><b>Standard RI</b>: biggest discount, least flexible. <b>Convertible RI</b>: you can change the instance family, smaller discount. Regional RIs are flexible on size within the same instance family.</li>
<li>In Organizations, RI and Savings Plans discounts <b>are shared</b> across accounts (by default).</li></ul>`},
{t:"Data transfer costs",h:`
<table><tr><th>Type</th><th>Charge</th></tr>
<tr><td>From the internet into AWS</td><td>Free</td></tr>
<tr><td>From AWS out to the internet</td><td>Charged; the first 100 GB each month is free (aggregated across all services and Regions, except China and GovCloud)</td></tr>
<tr><td>Between Regions</td><td>Charged</td></tr>
<tr><td>Between AZs in the same Region</td><td>Charged (low)</td></tr>
<tr><td>Within the same AZ over private IPs</td><td>Free</td></tr></table>`},
{t:"More on billing (Task 4.2)",h:`
<ul><li><b>Cost and Usage Report</b>: the most detailed data, delivered to S3.</li>
<li><b>Cost allocation tags</b>: there are 2 kinds, AWS-generated and user-defined. You must <b>activate</b> them in Billing before they show up in reports.</li>
<li><b>Budgets</b>: alerts. <b>Cost Explorer</b>: analysis, forecasts. <b>Pricing Calculator</b>: estimates in advance.</li></ul>`},
{t:"Technical resources & partners (Task 4.3)",h:`
<table><tr><th>Resource</th><th>Use when</th></tr>
<tr><td>AWS Support Center</td><td>Open a support case</td></tr>
<tr><td>AWS re:Post</td><td>Community Q&A</td></tr>
<tr><td>AWS Knowledge Center</td><td>Articles answering frequently asked questions</td></tr>
<tr><td>AWS Prescriptive Guidance</td><td>Migration strategies and patterns</td></tr>
<tr><td>Whitepapers, Blogs, Documentation</td><td>Official documentation</td></tr>
<tr><td>AWS Health Dashboard / Health API</td><td>Service events that affect you</td></tr>
<tr><td>AWS Trust & Safety</td><td>Report abuse (spam, attacks coming from AWS resources)</td></tr>
<tr><td>AWS Professional Services, Solutions Architects</td><td>AWS experts who help with your project</td></tr>
<tr><td>AWS Partner Network (APN)</td><td>System integrators, ISVs. Partners get training, events, and discounts</td></tr>
<tr><td>AWS Marketplace</td><td>Buy third-party software (cost management, governance, entitlement)</td></tr></table>`}
];
})();
