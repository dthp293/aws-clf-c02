/* Quick summary cheat sheets per domain (Lessons → Quick summary): [{ t: title, h: html }]. */
(window.CLF = window.CLF || {}).lessons = {
  "1": [
    {
      t: "Về kỳ thi CLF-C02 (theo Exam Guide)",
      h: `
<ul><li><b>65 câu</b>: 50 câu tính điểm và 15 câu thử nghiệm không tính điểm. Bạn không biết câu nào là câu thử nghiệm.</li>
<li><b>Multiple choice</b>: 1 đáp án đúng, 3 đáp án nhiễu. <b>Multiple response</b>: từ 2 đáp án đúng trở lên, trong 5 lựa chọn trở lên.</li>
<li>Câu bỏ trống tính là sai, đoán sai không bị trừ điểm. Vì vậy <b>đừng bỏ trống câu nào</b>.</li>
<li>Điểm scaled 100–1000, <b>đậu ≥ 700</b>. Chỉ cần đạt tổng điểm, không cần đạt từng domain.</li>
<li>Ngoài phạm vi thi: viết code, thiết kế kiến trúc, troubleshooting, kiểm thử hiệu năng.</li></ul>`,
    },
    {
      t: "6 lợi ích của Cloud (Six advantages)",
      h: `
<table><tr><th>Thuật ngữ</th><th>Ý nghĩa</th></tr>
<tr><td><b>Trade fixed expense for variable expense</b></td><td>Không mua phần cứng trả trước, chỉ trả theo mức dùng</td></tr>
<tr><td><b>Benefit from massive economies of scale</b></td><td>AWS mua số lượng lớn nên giá rẻ hơn cho mọi khách hàng</td></tr>
<tr><td><b>Stop guessing capacity</b></td><td>Không cần đoán trước công suất, có thể co giãn theo nhu cầu</td></tr>
<tr><td><b>Increase speed and agility</b></td><td>Tạo tài nguyên trong vài phút, thử nghiệm nhanh</td></tr>
<tr><td><b>Stop spending money running and maintaining data centers</b></td><td>Tập trung vào kinh doanh, không lo vận hành data center</td></tr>
<tr><td><b>Go global in minutes</b></td><td>Triển khai ra nhiều Region trên thế giới nhanh chóng</td></tr></table>`,
    },
    {
      t: "Mô hình dịch vụ & triển khai",
      h: `
<ul><li><b>IaaS</b>: thuê hạ tầng (máy ảo, mạng), ví dụ EC2. Bạn quản lý nhiều nhất.</li>
<li><b>PaaS</b>: chỉ lo code, ví dụ Elastic Beanstalk.</li>
<li><b>SaaS</b>: dùng phần mềm hoàn chỉnh, ví dụ Gmail.</li></ul>
<ul><li><b>Cloud</b>: tất cả chạy trên cloud.</li>
<li><b>Hybrid</b>: kết hợp cloud và on-premises.</li>
<li><b>On-premises</b> (private cloud): chạy trong data center của công ty.</li></ul>`,
    },
    {
      t: "Well-Architected Framework: 6 trụ cột",
      h: `
<table><tr><th>Pillar</th><th>Từ khóa trong đề</th></tr>
<tr><td><b>Operational Excellence</b></td><td>vận hành, giám sát, cải tiến liên tục, IaC</td></tr>
<tr><td><b>Security</b></td><td>bảo vệ dữ liệu, IAM, truy vết</td></tr>
<tr><td><b>Reliability</b></td><td>recover from failures, đáp ứng nhu cầu</td></tr>
<tr><td><b>Performance Efficiency</b></td><td>dùng tài nguyên hiệu quả, chọn đúng loại</td></tr>
<tr><td><b>Cost Optimization</b></td><td>tránh chi phí không cần thiết</td></tr>
<tr><td><b>Sustainability</b></td><td>giảm tác động môi trường</td></tr></table>`,
    },
    {
      t: "Chiến lược migration (7R)",
      h: `
<ul><li><b>Rehost</b> (lift-and-shift): chuyển nguyên trạng, nhanh nhất</li>
<li><b>Replatform</b>: tối ưu nhỏ, ví dụ chuyển DB sang RDS</li>
<li><b>Refactor / Re-architect</b>: viết lại, ví dụ sang serverless</li>
<li><b>Repurchase</b>: chuyển sang sản phẩm SaaS</li>
<li><b>Retire</b>: tắt bỏ</li>
<li><b>Retain</b>: giữ lại on-premises</li>
<li><b>Relocate</b>: chuyển hạ tầng (ví dụ VMware) lên cloud</li></ul>`,
    },
    {
      t: "AWS CAF: 6 perspectives",
      h: `
<p>Nhóm kinh doanh: <b>Business</b>, <b>People</b>, <b>Governance</b>.<br>Nhóm kỹ thuật: <b>Platform</b>, <b>Security</b>, <b>Operations</b>.</p>`,
    },
    {
      t: "Các khái niệm hay bị nhầm",
      h: `
<ul><li><b>Elasticity</b>: tự động tăng và giảm theo nhu cầu.</li>
<li><b>Scalability</b>: khả năng mở rộng khi cần.</li>
<li><b>High availability</b>: luôn sẵn sàng, ít downtime (Multi-AZ).</li>
<li><b>Fault tolerance</b>: vẫn chạy khi một thành phần hỏng.</li>
<li><b>Durability</b>: dữ liệu không bị mất.</li></ul>`,
    },
    {
      t: "Kinh tế học cloud (Task 1.4)",
      h: `
<ul><li><b>Fixed vs variable cost</b>: on-premises phải trả trước (phần cứng, data center). Cloud trả theo mức dùng.</li>
<li><b>Chi phí on-premises</b>: phần cứng, điện, làm mát, mặt bằng, nhân sự vận hành, thay mới thiết bị định kỳ.</li>
<li><b>Licensing</b>: <b>BYOL</b> (dùng license sẵn có, thường cần Dedicated Hosts) và <b>license-included</b> (giá đã gồm license).</li>
<li><b>Rightsizing</b>: chọn đúng loại và kích thước. Công cụ: Compute Optimizer, Cost Explorer.</li>
<li><b>Automation</b>: IaC, Auto Scaling, tự tắt tài nguyên không dùng giúp giảm công sức và lãng phí.</li></ul>`,
    },
    {
      t: "AWS CAF: lợi ích kinh doanh & tài nguyên migration (Task 1.3)",
      h: `
<p>4 kết quả kinh doanh: <b>reduced business risk</b>, <b>improved ESG performance</b>, <b>increased revenue</b>, <b>increased operational efficiency</b>.</p>
<p>Công cụ migration: Migration Evaluator (business case) → Application Discovery Service (thu thập thông tin) → Application Migration Service (rehost server) / DMS + SCT (database) → Migration Hub (theo dõi tiến độ).</p>
<p class="note">Lưu ý: từ 7/11/2025, AWS Migration Hub và AWS Application Discovery Service ngừng nhận khách hàng mới (AWS Transform là dịch vụ kế nhiệm). Exam guide vẫn liệt kê hai dịch vụ này nên đề có thể hỏi theo mô tả cũ.</p>`,
    },
  ],
  "2": [
    {
      t: "Shared Responsibility Model",
      h: `
<table><tr><th>AWS: security <u>OF</u> the cloud</th><th>Khách hàng: security <u>IN</u> the cloud</th></tr>
<tr><td>Data center, phần cứng, physical security</td><td>Dữ liệu và mã hóa dữ liệu</td></tr>
<tr><td>Hypervisor, mạng toàn cầu</td><td>IAM: user, quyền, MFA</td></tr>
<tr><td>Hạ tầng của dịch vụ managed (ví dụ vá OS của RDS)</td><td>OS của EC2 (patching), security group</td></tr></table>
<p>Mẹo: càng “managed” (RDS, Lambda) thì AWS lo càng nhiều.</p>`,
    },
    {
      t: "IAM",
      h: `
<ul><li><b>User</b>: một người hoặc ứng dụng. <b>Group</b>: nhóm user. <b>Role</b>: quyền tạm thời (cho EC2, Lambda, user tài khoản khác). <b>Policy</b>: tài liệu JSON quy định quyền.</li>
<li><b>Least privilege</b>: chỉ cấp quyền tối thiểu cần thiết.</li>
<li><b>Root user</b>: bật MFA, không tạo access key, không dùng hằng ngày.</li>
<li>IAM là dịch vụ <b>global</b> và <b>miễn phí</b>.</li></ul>`,
    },
    {
      t: "Bảng dịch vụ bảo mật",
      h: `
<table><tr><th>Nhu cầu</th><th>Dịch vụ</th></tr>
<tr><td>Chống DDoS</td><td>AWS Shield (Standard miễn phí)</td></tr>
<tr><td>Chặn SQL injection, XSS (lớp 7)</td><td>AWS WAF</td></tr>
<tr><td>Phát hiện mối đe dọa từ log</td><td>Amazon GuardDuty</td></tr>
<tr><td>Quét lỗ hổng phần mềm</td><td>Amazon Inspector</td></tr>
<tr><td>Tìm dữ liệu nhạy cảm trong S3</td><td>Amazon Macie</td></tr>
<tr><td>Quản lý khóa mã hóa</td><td>AWS KMS</td></tr>
<tr><td>Lưu mật khẩu, tự rotate</td><td>AWS Secrets Manager</td></tr>
<tr><td>Báo cáo tuân thủ (SOC, PCI)</td><td>AWS Artifact</td></tr>
<tr><td>Tổng hợp cảnh báo bảo mật</td><td>AWS Security Hub</td></tr></table>`,
    },
    {
      t: "Giám sát & audit: 3 dịch vụ hay nhầm",
      h: `
<ul><li><b>CloudTrail</b>: <i>ai</i> làm <i>gì</i>, <i>khi nào</i> (API calls).</li>
<li><b>CloudWatch</b>: hiệu năng (CPU, log, alarm).</li>
<li><b>Config</b>: cấu hình tài nguyên đã thay đổi thế nào, có tuân thủ rule không.</li></ul>`,
    },
    {
      t: "Security Group vs Network ACL",
      h: `
<table><tr><th></th><th>Security Group</th><th>Network ACL</th></tr>
<tr><td>Phạm vi</td><td>Instance</td><td>Subnet</td></tr>
<tr><td>Trạng thái</td><td>Stateful</td><td>Stateless</td></tr>
<tr><td>Rule</td><td>Chỉ Allow</td><td>Allow và Deny</td></tr></table>`,
    },
    {
      t: "Mã hóa: at rest & in transit",
      h: `
<table><tr><th>Loại</th><th>Nghĩa</th><th>Dịch vụ</th></tr>
<tr><td>At rest</td><td>Dữ liệu đang lưu (S3, EBS, RDS)</td><td>AWS KMS, CloudHSM (HSM riêng)</td></tr>
<tr><td>In transit</td><td>Dữ liệu đang truyền</td><td>TLS/HTTPS, chứng chỉ từ ACM</td></tr></table>`,
    },
    {
      t: "Root user & quản lý danh tính (Task 2.3)",
      h: `
<p><b>Việc chỉ root làm được</b> (ví dụ): đổi email/mật khẩu root, đóng tài khoản, khôi phục quyền IAM, đăng ký bán trên Reserved Instance Marketplace, bật MFA Delete cho S3.</p>
<ul><li><b>Bảo vệ root</b>: AWS hiện bắt buộc MFA cho root user ở mọi loại tài khoản (standalone, management, member; phải đăng ký trong 14 ngày kể từ lần đăng nhập đầu nếu chưa có). Ngoài ra: không tạo access key, khóa thông tin đăng nhập, dùng IAM cho việc hằng ngày.</li>
<li><b>Password policy</b>: độ dài, độ phức tạp, thời hạn đổi mật khẩu.</li>
<li><b>Federation</b>: dùng danh tính của công ty (AD, SAML) để đăng nhập AWS, qua IAM Identity Center.</li>
<li><b>Cross-account role</b>: user tài khoản A assume role ở tài khoản B để nhận quyền tạm thời.</li>
<li><b>Lưu bí mật</b>: Secrets Manager (có rotate tự động), Systems Manager Parameter Store.</li>
<li><b>Access reports</b>: IAM credential report (trạng thái mật khẩu, key, MFA), access advisor (quyền nào chưa dùng).</li>
<li><b>Policy</b>: AWS managed policy (AWS viết sẵn) và customer managed policy (bạn tự viết).</li></ul>`,
    },
    {
      t: "Dịch vụ bảo mật bổ sung & nguồn thông tin (Task 2.2, 2.4)",
      h: `
<table><tr><th>Dịch vụ</th><th>Chức năng</th></tr>
<tr><td>AWS Firewall Manager</td><td>Quản lý rule WAF/Shield/security group tập trung cho nhiều tài khoản</td></tr>
<tr><td>Amazon Detective</td><td>Điều tra nguyên nhân gốc</td></tr>
<tr><td>AWS CloudHSM</td><td>HSM chuyên dụng</td></tr>
<tr><td>AWS Directory Service</td><td>Microsoft AD được quản lý</td></tr>
<tr><td>AWS RAM</td><td>Chia sẻ tài nguyên giữa các tài khoản</td></tr>
<tr><td>Amazon Cognito</td><td>Đăng nhập cho người dùng của ứng dụng</td></tr></table>
<p><b>Log bảo mật</b> ở đâu: CloudTrail (API calls), CloudWatch Logs, VPC Flow Logs, S3 access logs.</p>
<p><b>Nguồn thông tin</b>: AWS Artifact (báo cáo tuân thủ), AWS Security Center, AWS Security Blog, AWS Knowledge Center. Sản phẩm bảo mật bên thứ ba có trên AWS Marketplace.</p>
<p><b>Tuân thủ theo quốc gia/ngành</b>: chọn Region phù hợp (data residency). Mức độ tuân thủ (ví dụ HIPAA eligible) khác nhau theo từng dịch vụ.</p>`,
    },
  ],
  "3": [
    {
      t: "Hạ tầng toàn cầu",
      h: `
<ul><li><b>Region</b>: khu vực địa lý, gồm nhiều AZ.</li>
<li><b>Availability Zone</b>: 1 hoặc nhiều data center tách biệt trong Region.</li>
<li><b>Edge location</b>: điểm cache của CloudFront và Route 53, gần người dùng.</li></ul>
<p>Chọn Region dựa trên 4 yếu tố: <b>compliance</b> (luật dữ liệu), <b>latency</b> (gần người dùng), <b>service availability</b> (dịch vụ có hỗ trợ không), <b>pricing</b> (giá).</p>`,
    },
    {
      t: "Compute",
      h: `
<table><tr><th>Dịch vụ</th><th>Khi nào dùng</th></tr>
<tr><td>EC2</td><td>Cần toàn quyền với máy ảo</td></tr>
<tr><td>Lambda</td><td>Serverless, chạy theo sự kiện, tối đa 30 phút mỗi lần</td></tr>
<tr><td>ECS / EKS</td><td>Chạy container (EKS dùng Kubernetes)</td></tr>
<tr><td>Fargate</td><td>Container serverless</td></tr>
<tr><td>Elastic Beanstalk</td><td>PaaS: chỉ upload code</td></tr>
<tr><td>Lightsail</td><td>VPS đơn giản, giá cố định</td></tr></table>`,
    },
    {
      t: "Storage & S3 storage classes",
      h: `
<ul><li><b>S3</b>: object · <b>EBS</b>: block (gắn 1 EC2, trong 1 AZ) · <b>EFS</b>: file dùng chung</li></ul>
<table><tr><th>Storage class</th><th>Dùng khi</th></tr>
<tr><td>S3 Standard</td><td>Dùng thường xuyên</td></tr>
<tr><td>S3 Intelligent-Tiering</td><td>Không biết trước tần suất truy cập</td></tr>
<tr><td>S3 Standard-IA</td><td>Ít dùng, cần lấy ngay</td></tr>
<tr><td>S3 One Zone-IA</td><td>Ít dùng, chấp nhận lưu trong 1 AZ</td></tr>
<tr><td>Glacier Instant Retrieval</td><td>Lưu trữ, lấy ra trong mili-giây</td></tr>
<tr><td>Glacier Flexible Retrieval</td><td>Lưu trữ, lấy ra từ vài phút đến vài giờ</td></tr>
<tr><td>Glacier Deep Archive</td><td>Rẻ nhất, lấy ra trong vòng 12 giờ hoặc hơn</td></tr></table>`,
    },
    {
      t: "Database",
      h: `
<ul><li><b>RDS / Aurora</b>: quan hệ (SQL), OLTP</li>
<li><b>DynamoDB</b>: NoSQL key-value, serverless</li>
<li><b>Redshift</b>: data warehouse, phân tích</li>
<li><b>ElastiCache</b>: cache trong bộ nhớ</li></ul>`,
    },
    {
      t: "Networking",
      h: `
<ul><li><b>VPC</b>: mạng riêng. <b>Internet gateway</b>: cho VPC ra internet. <b>NAT gateway</b>: cho private subnet đi ra internet.</li>
<li><b>Direct Connect</b>: đường truyền riêng. <b>Site-to-Site VPN</b>: kết nối mã hóa qua internet.</li>
<li><b>Route 53</b>: DNS. <b>CloudFront</b>: CDN. <b>ELB</b>: chia tải. <b>Auto Scaling</b>: tăng/giảm số instance.</li></ul>`,
    },
    {
      t: "Cách truy cập AWS",
      h: `
<ul><li><b>Management Console</b> (web) · <b>CLI</b> (dòng lệnh) · <b>SDK</b> (trong code)</li>
<li><b>CloudFormation</b>: Infrastructure as Code (IaC)</li></ul>`,
    },
    {
      t: "Multi-AZ & Multi-Region (Task 3.2)",
      h: `
<ul><li>AZ tách biệt vật lý, <b>không có single point of failure chung</b>, nên triển khai Multi-AZ để đạt high availability.</li>
<li>Dùng nhiều Region khi cần: <b>disaster recovery</b>, <b>business continuity</b>, <b>độ trễ thấp</b> cho người dùng toàn cầu, <b>data sovereignty</b>.</li>
<li>Edge location giúp đưa nội dung gần người dùng (CloudFront) và tăng tốc định tuyến (Global Accelerator, Route 53).</li></ul>`,
    },
    {
      t: "Container, batch & loại instance (Task 3.3)",
      h: `
<ul><li><b>ECS</b>: điều phối container của AWS. <b>EKS</b>: Kubernetes. <b>ECR</b>: lưu image. <b>Fargate</b>: chạy container serverless.</li>
<li><b>AWS Batch</b>: job theo lô. <b>Lambda</b>: function theo sự kiện (tối đa 30 phút).</li>
<li>Loại instance: General purpose (cân bằng), Compute optimized (nặng CPU), Memory optimized (nặng RAM), Storage optimized (đọc/ghi đĩa nhiều), Accelerated computing (GPU).</li>
<li><b>Auto Scaling</b> mang lại elasticity. <b>Load balancer</b> chia tải và kiểm tra health của target.</li></ul>`,
    },
    {
      t: "Storage nâng cao (Task 3.6)",
      h: `
<table><tr><th>Nhu cầu</th><th>Dịch vụ</th></tr>
<tr><td>Ổ tạm thời rất nhanh, mất khi dừng</td><td>EC2 instance store</td></tr>
<tr><td>File dùng chung cho Windows (SMB)</td><td>Amazon FSx for Windows File Server</td></tr>
<tr><td>File dùng chung cho Linux (NFS)</td><td>Amazon EFS</td></tr>
<tr><td>Hybrid: on-premises dùng lưu trữ cloud (cached)</td><td>AWS Storage Gateway</td></tr>
<tr><td>Tự chuyển lớp lưu trữ hoặc xóa object theo thời gian</td><td>S3 Lifecycle policy</td></tr>
<tr><td>Sao lưu tập trung nhiều dịch vụ</td><td>AWS Backup</td></tr>
<tr><td>Phục hồi thảm họa cho server</td><td>AWS Elastic Disaster Recovery</td></tr></table>`,
    },
    {
      t: "Database & migration (Task 3.4)",
      h: `
<ul><li><b>EC2-hosted DB</b>: toàn quyền nhưng tự lo mọi thứ. <b>Managed DB</b> (RDS, Aurora): AWS lo patch, backup, phần cứng.</li>
<li>Relational: RDS, Aurora · NoSQL: DynamoDB · Document (MongoDB): DocumentDB · Graph: Neptune · In-memory: ElastiCache</li>
<li><b>AWS DMS</b>: chuyển dữ liệu, có replicate liên tục, downtime thấp. <b>AWS SCT</b>: chuyển đổi schema khi đổi loại DB.</li></ul>`,
    },
    {
      t: "AI/ML (Task 3.7)",
      h: `
<table><tr><th>Việc</th><th>Dịch vụ</th></tr>
<tr><td>Tự xây, huấn luyện mô hình ML</td><td>Amazon SageMaker AI</td></tr>
<tr><td>Trợ lý generative AI</td><td>Amazon Q</td></tr>
<tr><td>Ảnh/video: nhận diện đồ vật, khuôn mặt</td><td>Amazon Rekognition</td></tr>
<tr><td>Trích chữ, bảng, form từ tài liệu</td><td>Amazon Textract</td></tr>
<tr><td>Text → giọng nói</td><td>Amazon Polly</td></tr>
<tr><td>Giọng nói → text</td><td>Amazon Transcribe</td></tr>
<tr><td>Dịch ngôn ngữ</td><td>Amazon Translate</td></tr>
<tr><td>Phân tích văn bản, sentiment</td><td>Amazon Comprehend</td></tr>
<tr><td>Chatbot</td><td>Amazon Lex</td></tr></table>`,
    },
    {
      t: "Analytics (Task 3.7)",
      h: `
<table><tr><th>Việc</th><th>Dịch vụ</th></tr>
<tr><td>SQL trực tiếp trên S3 (serverless)</td><td>Amazon Athena</td></tr>
<tr><td>Dữ liệu streaming thời gian thực</td><td>Amazon Kinesis</td></tr>
<tr><td>ETL serverless, data catalog</td><td>AWS Glue</td></tr>
<tr><td>Big data (Spark, Hadoop)</td><td>Amazon EMR</td></tr>
<tr><td>Tìm kiếm, phân tích log</td><td>Amazon OpenSearch Service</td></tr>
<tr><td>Dashboard BI</td><td>Amazon Quick (nay là AWS Quick, trước đây là QuickSight)</td></tr>
<tr><td>Data warehouse</td><td>Amazon Redshift</td></tr></table>`,
    },
    {
      t: "Các nhóm dịch vụ khác (Task 3.8)",
      h: `
<ul><li><b>Application integration</b>: EventBridge (event bus, lịch chạy), SNS (thông báo pub/sub), SQS (hàng đợi), Step Functions (workflow).</li>
<li><b>Business applications</b>: Amazon Connect (contact center), Amazon SES (gửi email).</li>
<li><b>Developer tools</b>: CodeBuild (build/test), CodePipeline (CI/CD), X-Ray (truy vết), AWS CLI.</li>
<li><b>End-user computing</b>: WorkSpaces (desktop ảo), WorkSpaces Applications, tên cũ AppStream 2.0 (stream ứng dụng), WorkSpaces Secure Browser (trình duyệt an toàn).</li>
<li><b>Frontend web & mobile</b>: AWS Amplify. <b>IoT</b>: AWS IoT Core.</li>
<li><b>Customer enablement</b>: AWS Support.</li></ul>`,
    },
    {
      t: "Networking nâng cao (Task 3.5)",
      h: `
<table><tr><th>Dịch vụ</th><th>Dùng khi</th></tr>
<tr><td>Public / private subnet</td><td>Public subnet có route ra internet gateway. Private subnet thì không.</td></tr>
<tr><td>Amazon API Gateway</td><td>Tạo và công bố API</td></tr>
<tr><td>AWS Global Accelerator</td><td>IP tĩnh, đi qua mạng AWS, không cache</td></tr>
<tr><td>AWS Transit Gateway</td><td>Hub kết nối nhiều VPC và on-premises</td></tr>
<tr><td>AWS PrivateLink</td><td>Truy cập dịch vụ riêng tư, không qua internet</td></tr>
<tr><td>Site-to-Site VPN / Client VPN</td><td>Kết nối cả mạng / từng người dùng</td></tr></table>`,
    },
    {
      t: "Management & governance",
      h: `
<table><tr><th>Dịch vụ</th><th>Chức năng</th></tr>
<tr><td>AWS Control Tower</td><td>Landing zone nhiều tài khoản theo best practice</td></tr>
<tr><td>AWS Organizations</td><td>Quản lý nhiều tài khoản, SCP, consolidated billing</td></tr>
<tr><td>AWS Service Catalog</td><td>Danh mục IT nội bộ đã được duyệt</td></tr>
<tr><td>Service Quotas</td><td>Xem và tăng giới hạn tài nguyên</td></tr>
<tr><td>AWS Compute Optimizer</td><td>Khuyến nghị rightsizing</td></tr>
<tr><td>AWS Health Dashboard</td><td>Sự kiện dịch vụ ảnh hưởng đến tài khoản</td></tr>
<tr><td>AWS Well-Architected Tool</td><td>Review hệ thống theo framework</td></tr>
<tr><td>AWS License Manager</td><td>Quản lý license</td></tr>
<tr><td>AWS Systems Manager</td><td>Vận hành instance: patch, chạy lệnh, Parameter Store</td></tr></table>`,
    },
  ],
  "4": [
    {
      t: "Mô hình giá EC2",
      h: `
<table><tr><th>Lựa chọn</th><th>Đặc điểm</th><th>Từ khóa</th></tr>
<tr><td>On-Demand</td><td>Trả theo giây/giờ, không cam kết</td><td>ngắn hạn, không đoán trước được tải</td></tr>
<tr><td>Reserved Instances</td><td>Cam kết 1 hoặc 3 năm, giảm tới ~72%</td><td>steady-state</td></tr>
<tr><td>Savings Plans</td><td>Cam kết số tiền $/giờ trong 1 hoặc 3 năm, linh hoạt hơn</td><td>steady-state, linh hoạt</td></tr>
<tr><td>Spot</td><td>Giảm tới ~90%, có thể bị thu hồi (báo trước 2 phút)</td><td>can be interrupted, fault-tolerant</td></tr>
<tr><td>Dedicated Hosts</td><td>Server vật lý riêng</td><td>license theo socket/core, tuân thủ</td></tr></table>`,
    },
    {
      t: "Công cụ quản lý chi phí",
      h: `
<ul><li><b>Pricing Calculator</b>: ước tính <i>trước</i> khi dùng</li>
<li><b>Cost Explorer</b>: phân tích chi phí <i>đã</i> phát sinh, có dự báo</li>
<li><b>Budgets</b>: đặt ngân sách và cảnh báo</li>
<li><b>Cost and Usage Report</b>: dữ liệu chi tiết nhất</li>
<li><b>Cost allocation tags</b>: gắn tag để chia chi phí theo dự án/phòng ban</li></ul>`,
    },
    {
      t: "AWS Organizations",
      h: `
<ul><li>Quản lý nhiều tài khoản tập trung.</li>
<li><b>Consolidated billing</b>: một hóa đơn, cộng dồn mức dùng để được giảm giá theo khối lượng.</li>
<li><b>SCP</b> (Service Control Policies): giới hạn quyền tối đa của các tài khoản con.</li></ul>`,
    },
    {
      t: "Support plans & Trusted Advisor",
      h: `
<p>Exam Guide CLF-C02 hiện tại liệt kê các lựa chọn hỗ trợ: <b>Basic Support</b> (miễn phí, có sẵn cho mọi tài khoản), <b>AWS Business Support+</b>, <b>AWS Enterprise Support</b>, <b>AWS Unified Operations</b>, cùng kênh customer service và cộng đồng.</p>
<p>Tên gói cũ có thể vẫn gặp trong tài liệu: Developer, Business, Enterprise On-Ramp, Enterprise. Gói càng cao thì phản hồi càng nhanh và có thêm chuyên gia riêng (ví dụ TAM, Technical Account Manager).</p>
<ul><li><b>Trusted Advisor</b>: kiểm tra 6 nhóm: cost optimization, performance, security, fault tolerance, service limits, operational excellence. Gói trả phí có bộ kiểm tra đầy đủ hơn.</li></ul>
<p class="note">AWS vừa đổi cơ cấu các gói Support. Hãy đối chiếu quyền lợi chi tiết với trang AWS Support Plans chính thức.</p>`,
    },
    {
      t: "Thêm về lựa chọn mua EC2 (Task 4.1)",
      h: `
<ul><li><b>Dedicated Instances</b>: phần cứng riêng, không thấy được server. <b>Dedicated Hosts</b>: thấy và kiểm soát socket/core, phù hợp BYOL.</li>
<li><b>On-Demand Capacity Reservations</b>: giữ công suất ở 1 AZ, không cam kết, tính giá On-Demand.</li>
<li><b>Standard RI</b>: giảm nhiều nhất, ít linh hoạt. <b>Convertible RI</b>: đổi được họ instance, giảm ít hơn. Regional RI linh hoạt về kích thước trong cùng họ instance.</li>
<li>Trong Organizations, giảm giá của RI và Savings Plans <b>được chia sẻ</b> giữa các tài khoản (mặc định).</li></ul>`,
    },
    {
      t: "Chi phí truyền dữ liệu",
      h: `
<table><tr><th>Loại</th><th>Phí</th></tr>
<tr><td>Từ internet vào AWS</td><td>Miễn phí</td></tr>
<tr><td>Từ AWS ra internet</td><td>Tính phí; 100 GB đầu tiên mỗi tháng miễn phí (gộp cho mọi dịch vụ và Region, trừ China và GovCloud)</td></tr>
<tr><td>Giữa các Region</td><td>Tính phí</td></tr>
<tr><td>Giữa các AZ trong cùng Region</td><td>Tính phí (thấp)</td></tr>
<tr><td>Trong cùng AZ qua IP private</td><td>Miễn phí</td></tr></table>`,
    },
    {
      t: "Billing nâng cao (Task 4.2)",
      h: `
<ul><li><b>Cost and Usage Report</b>: dữ liệu chi tiết nhất, gửi vào S3.</li>
<li><b>Cost allocation tags</b>: có 2 loại, AWS-generated và user-defined. Phải <b>activate</b> trong Billing mới hiện trong báo cáo.</li>
<li><b>Budgets</b>: cảnh báo. <b>Cost Explorer</b>: phân tích, dự báo. <b>Pricing Calculator</b>: ước tính trước.</li></ul>`,
    },
    {
      t: "Tài nguyên kỹ thuật & đối tác (Task 4.3)",
      h: `
<table><tr><th>Nguồn</th><th>Dùng khi</th></tr>
<tr><td>AWS Support Center</td><td>Mở case hỗ trợ</td></tr>
<tr><td>AWS re:Post</td><td>Hỏi đáp cộng đồng</td></tr>
<tr><td>AWS Knowledge Center</td><td>Bài viết cho câu hỏi thường gặp</td></tr>
<tr><td>AWS Prescriptive Guidance</td><td>Chiến lược, pattern migration</td></tr>
<tr><td>Whitepapers, Blogs, Documentation</td><td>Tài liệu chính thức</td></tr>
<tr><td>AWS Health Dashboard / Health API</td><td>Sự kiện dịch vụ ảnh hưởng đến bạn</td></tr>
<tr><td>AWS Trust & Safety</td><td>Báo cáo lạm dụng (spam, tấn công từ tài nguyên AWS)</td></tr>
<tr><td>AWS Professional Services, Solutions Architects</td><td>Chuyên gia của AWS hỗ trợ dự án</td></tr>
<tr><td>AWS Partner Network (APN)</td><td>System integrators, ISVs. Đối tác được hưởng đào tạo, sự kiện, giảm giá</td></tr>
<tr><td>AWS Marketplace</td><td>Mua phần mềm bên thứ ba (quản lý chi phí, governance, entitlement)</td></tr></table>`,
    },
  ],
};
