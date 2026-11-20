/* Đợt 3: bổ sung theo Exam Guide CLF-C02 (task statements + danh sách dịch vụ in-scope).
 * Câu hỏi do tự viết theo từng mục kiến thức trong Exam Guide, KHÔNG sao chép từ
 * Official Practice Question Set (bộ đó có bản quyền, hãy tự làm trên AWS Skill Builder).
 * Q(id, domain, en, vi, opts, ans, exp, why)
 */
(() => {
const C = window.CLF;
const Q = (id, d, en, vi, opts, ans, exp, why) => ({ id, d, en, vi, opts, ans, exp, why });
const same = n => n.map(x => [x, x]); // tên dịch vụ: giống nhau ở cả 2 ngôn ngữ

C.questions.push(
  // ───────── Domain 1 ─────────
  Q("d1-18", 1, "A company wants to use its existing Microsoft Windows Server licenses on AWS to reduce costs. Which licensing approach is this?",
    "Công ty muốn dùng license Windows Server đang có trên AWS để giảm chi phí. Đây là cách cấp phép nào?",
    [["Bring your own license (BYOL)", "Mang license của bạn (BYOL)"], ["License-included instances", "Instance đã bao gồm license"], ["Spot Instances", "Spot Instances"], ["AWS Free Tier", "AWS Free Tier"]], [0],
    "BYOL là dùng lại license đã mua. License-included là trả phí license trong giá instance.",
    ["Đúng.", "Sai: giá đã bao gồm license, không dùng lại license cũ.", "Sai: là mô hình mua compute, không phải cách cấp phép.", "Sai: Free Tier không liên quan đến license."]),
  Q("d1-19", 1, "A company finds that many of its Amazon EC2 instances use less than 10% CPU. It changes them to smaller instance types to save money. What is this practice called?",
    "Công ty thấy nhiều instance EC2 chỉ dùng dưới 10% CPU nên đổi sang loại nhỏ hơn để tiết kiệm. Cách làm này gọi là gì?",
    [["Rightsizing", "Chọn đúng kích thước (rightsizing)"], ["Rehosting", "Rehosting"], ["Elasticity", "Tính co giãn"], ["Refactoring", "Refactoring"]], [0],
    "Rightsizing là chọn loại và kích thước tài nguyên khớp với nhu cầu thực tế. AWS Compute Optimizer có thể đưa khuyến nghị cho việc này.",
    ["Đúng.", "Sai: là chiến lược migration.", "Sai: là tự động co giãn theo tải, không phải đổi kích thước một lần.", "Sai: là viết lại kiến trúc ứng dụng."]),
  Q("d1-20", 1, "Which costs can a company typically eliminate or reduce by moving from on-premises data centers to AWS? (Choose TWO.)",
    "Chi phí nào công ty thường loại bỏ hoặc giảm được khi chuyển từ data center tại chỗ lên AWS? (Chọn 2.)",
    [["Purchasing and refreshing server hardware", "Mua và thay mới phần cứng máy chủ"], ["Power and cooling for data centers", "Điện và làm mát cho data center"], ["Costs of securing customer data", "Chi phí bảo mật dữ liệu khách hàng"], ["All application software license costs", "Toàn bộ chi phí license phần mềm ứng dụng"], ["Costs of designing the application", "Chi phí thiết kế ứng dụng"]], [0, 1],
    "Chi phí hạ tầng vật lý (phần cứng, điện, làm mát, mặt bằng) được chuyển cho AWS.",
    ["Đúng.", "Đúng.", "Sai: bảo mật dữ liệu vẫn là trách nhiệm của khách hàng.", "Sai: license phần mềm vẫn phải trả (BYOL hoặc license-included).", "Sai: vẫn là việc của khách hàng."]),
  Q("d1-21", 1, "According to the AWS Cloud Adoption Framework (AWS CAF), which is a business outcome that cloud adoption can provide?",
    "Theo AWS CAF, đâu là kết quả kinh doanh mà việc áp dụng cloud có thể mang lại?",
    [["Reduced business risk", "Giảm rủi ro kinh doanh"], ["Increased hardware maintenance effort", "Tăng công bảo trì phần cứng"], ["Longer time to market", "Thời gian ra thị trường dài hơn"], ["Higher fixed IT costs", "Chi phí IT cố định cao hơn"]], [0],
    "Theo AWS CAF có 4 lợi ích kinh doanh: reduced business risk, improved ESG performance, increased revenue, increased operational efficiency.",
    ["Đúng.", "Sai: cloud giảm việc bảo trì phần cứng.", "Sai: cloud rút ngắn thời gian ra thị trường.", "Sai: cloud chuyển chi phí cố định thành biến đổi."]),
  Q("d1-22", 1, "How does automation in the AWS Cloud help a company reduce costs?",
    "Tự động hóa trên AWS giúp công ty giảm chi phí như thế nào?",
    [["It reduces manual effort and human error, for example by automatically stopping unused resources", "Giảm công thủ công và lỗi con người, ví dụ tự động tắt tài nguyên không dùng"], ["It removes the need to pay for AWS services", "Không cần trả tiền cho dịch vụ AWS"], ["It requires more servers to be purchased upfront", "Bắt buộc mua thêm máy chủ trả trước"], ["It transfers all security responsibilities to AWS", "Chuyển toàn bộ trách nhiệm bảo mật cho AWS"]], [0],
    "Automation (IaC, Auto Scaling, lịch tắt/bật) giảm công vận hành và giảm lãng phí.",
    ["Đúng.", "Sai.", "Sai.", "Sai: trách nhiệm chia sẻ không thay đổi."]),
  Q("d1-23", 1, "A company wants to migrate its production database to AWS with minimal downtime by continuously replicating changes during the migration. Which AWS service should it use?",
    "Công ty muốn chuyển database production lên AWS với thời gian gián đoạn tối thiểu, bằng cách liên tục sao chép thay đổi trong lúc migration. Nên dùng dịch vụ nào?",
    [["AWS Database Migration Service (AWS DMS)", "AWS DMS"], ["AWS Schema Conversion Tool (AWS SCT)", "AWS SCT"], ["AWS Application Discovery Service", "AWS Application Discovery Service"], ["AWS Backup", "AWS Backup"]], [0],
    "DMS di chuyển dữ liệu, có thể replicate liên tục nên database nguồn vẫn chạy trong lúc chuyển.",
    ["Đúng.", "Sai: SCT chuyển đổi schema khi đổi loại DB, không replicate dữ liệu.", "Sai: dùng để thu thập thông tin server cho việc lập kế hoạch.", "Sai: dùng để sao lưu, không phải migration."]),

  // ───────── Domain 2 ─────────
  Q("d2-23", 2, "Which AWS service is MOST commonly used to manage the keys that encrypt data at rest in Amazon S3 and Amazon EBS?",
    "Dịch vụ nào thường được dùng nhất để quản lý khóa mã hóa dữ liệu lưu trữ (at rest) trong S3 và EBS?",
    same(["AWS KMS", "AWS Certificate Manager (ACM)", "AWS Shield", "AWS WAF"]), [0],
    "Mã hóa at rest (dữ liệu đang lưu) dùng KMS. Mã hóa in transit (dữ liệu đang truyền) dùng TLS với chứng chỉ từ ACM.",
    ["Đúng.", "Sai: ACM dùng cho mã hóa in transit (SSL/TLS).", "Sai: chống DDoS.", "Sai: tường lửa web."]),
  Q("d2-24", 2, "A company needs to encrypt data in transit between users' browsers and its website. What should it use?",
    "Công ty cần mã hóa dữ liệu đang truyền giữa trình duyệt người dùng và website. Nên dùng gì?",
    [["SSL/TLS certificates from AWS Certificate Manager (ACM)", "Chứng chỉ SSL/TLS từ ACM"], ["Amazon EBS encryption", "Mã hóa Amazon EBS"], ["AWS Shield Standard", "AWS Shield Standard"], ["Amazon Macie", "Amazon Macie"]], [0],
    "In transit dùng TLS (HTTPS). ACM cấp chứng chỉ miễn phí cho dịch vụ tích hợp như ELB, CloudFront.",
    ["Đúng.", "Sai: mã hóa ổ đĩa là at rest.", "Sai: chống DDoS.", "Sai: tìm dữ liệu nhạy cảm."]),
  Q("d2-25", 2, "Which tasks can ONLY be performed by the AWS account root user? (Choose TWO.)",
    "Những việc nào CHỈ root user mới làm được? (Chọn 2.)",
    [["Registering as a seller in the Reserved Instance Marketplace", "Đăng ký làm người bán trên Reserved Instance Marketplace"], ["Closing the AWS account", "Đóng tài khoản AWS"], ["Creating an IAM user", "Tạo IAM user"], ["Launching an Amazon EC2 instance", "Chạy instance EC2"], ["Creating an Amazon S3 bucket", "Tạo S3 bucket"]], [0, 1],
    "Một số việc chỉ root làm được: đổi email/mật khẩu root, đóng tài khoản (tài khoản độc lập), khôi phục quyền IAM, đăng ký bán trên Reserved Instance Marketplace, bật MFA Delete cho S3. Đổi gói Support hiện không còn bắt buộc root (IAM có quyền phù hợp làm được).",
    ["Đúng.", "Đúng.", "Sai: IAM user có quyền phù hợp cũng làm được.", "Sai.", "Sai."]),
  Q("d2-26", 2, "A company wants employees to access AWS by using their existing corporate credentials from the company's identity provider instead of creating separate IAM users. What is this called?",
    "Công ty muốn nhân viên truy cập AWS bằng tài khoản công ty hiện có (từ identity provider) thay vì tạo IAM user riêng. Đây gọi là gì?",
    [["Identity federation", "Liên kết danh tính (federation)"], ["Cross-Region replication", "Sao chép giữa các Region"], ["Multi-factor authentication", "Xác thực đa yếu tố"], ["Principle of least privilege", "Nguyên tắc đặc quyền tối thiểu"]], [0],
    "Federation cho phép dùng danh tính từ hệ thống bên ngoài (ví dụ Active Directory, SAML) để đăng nhập AWS. Thường làm qua IAM Identity Center.",
    ["Đúng.", "Sai: là tính năng sao chép dữ liệu.", "Sai: là thêm lớp xác thực.", "Sai: là cấp quyền tối thiểu."]),
  Q("d2-27", 2, "A user in AWS Account A needs temporary access to resources in AWS Account B. What is the recommended approach?",
    "User ở tài khoản A cần quyền tạm thời vào tài nguyên ở tài khoản B. Cách được khuyến nghị là gì?",
    [["Create an IAM role in Account B that users from Account A can assume", "Tạo IAM role ở tài khoản B cho user tài khoản A assume"], ["Share the access keys of an IAM user in Account B", "Chia sẻ access key của IAM user ở tài khoản B"], ["Share the root user credentials of Account B", "Chia sẻ thông tin root của tài khoản B"], ["Open the security groups in Account B to all traffic", "Mở security group ở tài khoản B cho mọi traffic"]], [0],
    "Cross-account IAM role cấp thông tin đăng nhập tạm thời, không cần chia sẻ key.",
    ["Đúng.", "Sai: không chia sẻ key cố định.", "Sai: không bao giờ chia sẻ root.", "Sai: security group không cấp quyền IAM."]),
  Q("d2-28", 2, "How can a company require IAM users to use passwords that meet a minimum length and to change them regularly?",
    "Làm sao để bắt IAM user dùng mật khẩu có độ dài tối thiểu và đổi định kỳ?",
    [["Configure an IAM password policy", "Cấu hình IAM password policy"], ["Enable AWS Shield", "Bật AWS Shield"], ["Use AWS Artifact", "Dùng AWS Artifact"], ["Add a security group rule", "Thêm rule security group"]], [0],
    "Password policy quy định độ dài, loại ký tự, thời hạn đổi mật khẩu cho IAM user.",
    ["Đúng.", "Sai.", "Sai.", "Sai."]),
  Q("d2-29", 2, "Which AWS service centrally configures and manages AWS WAF rules and other firewall rules across all accounts in AWS Organizations?",
    "Dịch vụ nào cấu hình và quản lý tập trung rule AWS WAF và các rule tường lửa khác trên mọi tài khoản trong AWS Organizations?",
    same(["AWS Firewall Manager", "AWS Security Hub", "AWS Shield Standard", "Network ACLs"]), [0],
    "Thấy “centrally manage firewall rules across accounts” thì chọn Firewall Manager.",
    ["Đúng.", "Sai: tổng hợp cảnh báo, không quản lý rule tường lửa.", "Sai: chống DDoS cơ bản.", "Sai: tường lửa cấp subnet trong một VPC."]),
  Q("d2-30", 2, "Which AWS service helps analyze and investigate the root cause of potential security issues or suspicious activities?",
    "Dịch vụ nào giúp phân tích, điều tra nguyên nhân gốc của sự cố bảo mật hoặc hoạt động đáng ngờ?",
    same(["Amazon Detective", "Amazon Inspector", "Amazon Macie", "AWS Shield"]), [0],
    "GuardDuty phát hiện mối đe dọa. Detective điều tra nguyên nhân gốc.",
    ["Đúng.", "Sai: quét lỗ hổng.", "Sai: tìm dữ liệu nhạy cảm.", "Sai: chống DDoS."]),
  Q("d2-31", 2, "A company must use dedicated hardware security modules (HSMs) in the AWS Cloud to meet strict regulatory requirements for controlling its encryption keys. Which AWS service should it use?",
    "Công ty phải dùng thiết bị HSM chuyên dụng trên AWS để đáp ứng quy định nghiêm ngặt về kiểm soát khóa mã hóa. Nên dùng dịch vụ nào?",
    same(["AWS CloudHSM", "AWS Secrets Manager", "AWS Certificate Manager (ACM)", "AWS Artifact"]), [0],
    "Thấy “dedicated HSM” thì chọn CloudHSM. KMS là dịch vụ managed, dùng chung hạ tầng.",
    ["Đúng.", "Sai: dùng để lưu bí mật.", "Sai: dùng cho chứng chỉ SSL/TLS.", "Sai: dùng để tải báo cáo tuân thủ."]),
  Q("d2-32", 2, "An administrator wants to download a report that lists all IAM users in the account and the status of their passwords, access keys, and MFA devices. What should the administrator use?",
    "Quản trị viên muốn tải báo cáo liệt kê mọi IAM user cùng trạng thái mật khẩu, access key và MFA. Nên dùng gì?",
    [["IAM credential report", "IAM credential report"], ["AWS Cost and Usage Report", "AWS Cost and Usage Report"], ["AWS Artifact reports", "Báo cáo AWS Artifact"], ["Amazon CloudWatch dashboard", "Dashboard CloudWatch"]], [0],
    "Credential report là một loại access report của IAM, dùng cho việc audit danh tính.",
    ["Đúng.", "Sai: báo cáo chi phí.", "Sai: báo cáo tuân thủ của AWS.", "Sai: hiển thị metric."]),
  Q("d2-33", 2, "Which AWS resource publishes articles about AWS security best practices, new security features, and security solutions?",
    "Nguồn nào của AWS đăng bài về best practice bảo mật, tính năng bảo mật mới và giải pháp bảo mật?",
    same(["AWS Security Blog", "AWS Artifact", "AWS Pricing Calculator", "AWS Health Dashboard"]), [0],
    "Exam Guide nêu các nguồn thông tin bảo mật: AWS Security Blog, AWS Security Center, AWS Knowledge Center.",
    ["Đúng.", "Sai: dùng để tải báo cáo tuân thủ.", "Sai: dùng để ước tính chi phí.", "Sai: thông báo sự kiện dịch vụ."]),
  Q("d2-34", 2, "A company wants to buy a third-party intrusion detection product that runs on AWS and is billed through its AWS account. Where can it find this product?",
    "Công ty muốn mua sản phẩm phát hiện xâm nhập của bên thứ ba chạy trên AWS, tính tiền qua tài khoản AWS. Tìm ở đâu?",
    same(["AWS Marketplace", "AWS Artifact", "AWS Trusted Advisor", "AWS Config"]), [0],
    "Marketplace có nhiều sản phẩm bảo mật của bên thứ ba.",
    ["Đúng.", "Sai.", "Sai.", "Sai."]),
  Q("d2-35", 2, "When a company uses AWS Lambda, which is the customer's responsibility?",
    "Khi dùng AWS Lambda, việc nào là trách nhiệm của khách hàng?",
    [["Securing the function code and managing the IAM permissions for the function", "Bảo mật code của function và quản lý quyền IAM cho function"], ["Patching the operating system that runs the functions", "Vá hệ điều hành chạy function"], ["Managing the physical servers", "Quản lý máy chủ vật lý"], ["Scaling the underlying infrastructure", "Scale hạ tầng bên dưới"]], [0],
    "Trách nhiệm thay đổi theo dịch vụ. Với EC2, khách hàng lo OS. Với RDS hay Lambda, AWS lo OS, còn khách hàng lo code, dữ liệu và quyền.",
    ["Đúng.", "Sai: AWS lo.", "Sai: AWS lo.", "Sai: Lambda tự scale."]),
  Q("d2-36", 2, "A company must keep customer data within a specific country to meet data residency laws. What should the company do?",
    "Công ty phải giữ dữ liệu khách hàng trong một quốc gia cụ thể để tuân thủ luật lưu trú dữ liệu. Nên làm gì?",
    [["Store the data only in an AWS Region located in that country", "Chỉ lưu dữ liệu ở AWS Region đặt tại quốc gia đó"], ["Use Amazon CloudFront to cache the data worldwide", "Dùng CloudFront cache dữ liệu toàn cầu"], ["Enable AWS Shield Advanced", "Bật AWS Shield Advanced"], ["Use edge locations in many countries", "Dùng edge location ở nhiều nước"]], [0],
    "Dữ liệu không tự rời Region bạn chọn. Chọn Region phù hợp là cách đáp ứng yêu cầu data sovereignty/residency.",
    ["Đúng.", "Sai: dữ liệu sẽ bị cache ra ngoài quốc gia.", "Sai: chống DDoS.", "Sai: dữ liệu bị đưa ra nhiều nước."]),

  // ───────── Domain 3 ─────────
  Q("d3-27", 3, "Which is a valid reason to deploy a workload across multiple AWS Regions?",
    "Đâu là lý do hợp lý để triển khai hệ thống trên nhiều AWS Region?",
    [["Disaster recovery if an entire Region becomes unavailable", "Khôi phục thảm họa nếu cả một Region gặp sự cố"], ["To reduce the number of IAM users", "Giảm số IAM user"], ["To get free data transfer between Regions", "Được truyền dữ liệu giữa các Region miễn phí"], ["Because each Availability Zone supports only one service", "Vì mỗi AZ chỉ hỗ trợ một dịch vụ"]], [0],
    "Lý do dùng nhiều Region: disaster recovery, business continuity, độ trễ thấp cho người dùng toàn cầu, data sovereignty.",
    ["Đúng.", "Sai: IAM là dịch vụ toàn cầu.", "Sai: truyền dữ liệu giữa các Region có tính phí.", "Sai."]),
  Q("d3-28", 3, "Why does deploying across multiple Availability Zones help achieve high availability?",
    "Vì sao triển khai trên nhiều AZ giúp đạt tính sẵn sàng cao?",
    [["Availability Zones are physically separated and do not share single points of failure", "Các AZ tách biệt vật lý, không có điểm lỗi chung"], ["All Availability Zones are in the same building", "Mọi AZ nằm trong cùng một tòa nhà"], ["Availability Zones cache content for users", "AZ cache nội dung cho người dùng"], ["Availability Zones are the same as edge locations", "AZ chính là edge location"]], [0],
    "Mỗi AZ có điện, mạng, làm mát riêng. Một AZ gặp sự cố không kéo theo AZ khác.",
    ["Đúng.", "Sai.", "Sai: đó là edge location.", "Sai."]),
  Q("d3-29", 3, "Which AWS service is a fully managed registry for storing and managing Docker container images?",
    "Dịch vụ nào là registry được quản lý hoàn toàn để lưu trữ container image Docker?",
    same(["Amazon Elastic Container Registry (Amazon ECR)", "Amazon Elastic Container Service (Amazon ECS)", "Amazon Elastic Kubernetes Service (Amazon EKS)", "Amazon S3 Glacier"]), [0],
    "ECR lưu image. ECS và EKS chạy container.",
    ["Đúng.", "Sai: ECS điều phối, chạy container.", "Sai: EKS chạy Kubernetes.", "Sai."]),
  Q("d3-30", 3, "A company wants to run its containerized applications on AWS by using Kubernetes. Which AWS service should it use?",
    "Công ty muốn chạy ứng dụng container trên AWS bằng Kubernetes. Nên dùng dịch vụ nào?",
    same(["Amazon Elastic Kubernetes Service (Amazon EKS)", "Amazon Elastic Container Service (Amazon ECS)", "Amazon Elastic Container Registry (Amazon ECR)", "Amazon Lightsail"]), [0],
    "Thấy Kubernetes thì chọn EKS. ECS là bộ điều phối container của riêng AWS.",
    ["Đúng.", "Sai: ECS không phải Kubernetes.", "Sai: ECR chỉ lưu image.", "Sai."]),
  Q("d3-31", 3, "A company needs to run hundreds of thousands of batch computing jobs, and wants AWS to provision the optimal compute resources automatically. Which AWS service should it use?",
    "Công ty cần chạy hàng trăm nghìn job tính toán theo lô và muốn AWS tự cấp phát tài nguyên compute tối ưu. Nên dùng dịch vụ nào?",
    same(["AWS Batch", "AWS Step Functions", "Amazon SQS", "Amazon Lightsail"]), [0],
    "Thấy “batch computing jobs” thì chọn AWS Batch.",
    ["Đúng.", "Sai: điều phối workflow.", "Sai: hàng đợi message.", "Sai: VPS đơn giản."]),
  Q("d3-32", 3, "Which storage option provides temporary block-level storage that is physically attached to the host computer, where data is lost when the instance is stopped?",
    "Lựa chọn lưu trữ nào cung cấp ổ block tạm thời gắn vật lý với máy chủ, dữ liệu mất khi instance dừng?",
    same(["EC2 instance store", "Amazon EBS", "Amazon EFS", "Amazon S3"]), [0],
    "Instance store rất nhanh nhưng tạm thời. EBS thì bền và tồn tại độc lập với instance.",
    ["Đúng.", "Sai: EBS giữ dữ liệu khi dừng instance.", "Sai: file system dùng chung.", "Sai: object storage."]),
  Q("d3-33", 3, "A company needs fully managed shared file storage for its Windows-based applications that use the SMB protocol. Which AWS service should it use?",
    "Công ty cần lưu trữ file dùng chung, được quản lý hoàn toàn, cho ứng dụng Windows dùng giao thức SMB. Nên dùng dịch vụ nào?",
    same(["Amazon FSx for Windows File Server", "Amazon EFS", "Amazon EBS", "Amazon S3"]), [0],
    "Windows/SMB thì chọn FSx for Windows File Server. Linux/NFS thì chọn EFS.",
    ["Đúng.", "Sai: EFS dành cho Linux (NFS).", "Sai: ổ đĩa block.", "Sai: object storage."]),
  Q("d3-34", 3, "A company wants Amazon S3 objects to move automatically to S3 Glacier after 90 days and be deleted after 5 years. What should it use?",
    "Công ty muốn object S3 tự chuyển sang S3 Glacier sau 90 ngày và tự xóa sau 5 năm. Nên dùng gì?",
    [["S3 Lifecycle configuration", "Cấu hình S3 Lifecycle"], ["S3 Versioning", "S3 Versioning"], ["S3 Transfer Acceleration", "S3 Transfer Acceleration"], ["S3 Cross-Region Replication", "S3 Cross-Region Replication"]], [0],
    "Lifecycle policy tự chuyển object sang lớp rẻ hơn (transition) hoặc xóa (expiration).",
    ["Đúng.", "Sai: lưu nhiều phiên bản của object.", "Sai: tăng tốc upload từ xa.", "Sai: sao chép sang Region khác."]),
  Q("d3-35", 3, "Which AWS service centrally manages and automates backups across services such as Amazon EBS, Amazon RDS, Amazon DynamoDB, and Amazon EFS?",
    "Dịch vụ nào quản lý và tự động hóa sao lưu tập trung cho EBS, RDS, DynamoDB, EFS?",
    same(["AWS Backup", "AWS Storage Gateway", "Amazon S3 Glacier", "AWS Elastic Disaster Recovery"]), [0],
    "AWS Backup là nơi đặt chính sách sao lưu chung cho nhiều dịch vụ.",
    ["Đúng.", "Sai: lưu trữ hybrid.", "Sai: lớp lưu trữ lâu dài.", "Sai: replicate server để phục hồi thảm họa."]),
  Q("d3-36", 3, "A company wants to minimize downtime and data loss by continuously replicating its on-premises servers to AWS and recovering them quickly if a disaster occurs. Which AWS service should it use?",
    "Công ty muốn giảm thiểu downtime và mất dữ liệu bằng cách liên tục replicate server tại chỗ lên AWS và phục hồi nhanh khi có thảm họa. Nên dùng dịch vụ nào?",
    same(["AWS Elastic Disaster Recovery", "AWS Backup", "AWS Database Migration Service (AWS DMS)", "AWS Migration Hub"]), [0],
    "Thấy “disaster recovery” cho server và “recover quickly” thì chọn Elastic Disaster Recovery.",
    ["Đúng.", "Sai: sao lưu định kỳ, phục hồi chậm hơn.", "Sai: migration database.", "Sai: theo dõi tiến độ migration."]),
  Q("d3-37", 3, "A company is migrating from an Oracle database to Amazon Aurora PostgreSQL and needs to convert the database schema. Which AWS tool should it use?",
    "Công ty chuyển từ Oracle sang Aurora PostgreSQL và cần chuyển đổi schema. Nên dùng công cụ nào?",
    same(["AWS Schema Conversion Tool (AWS SCT)", "AWS DataSync", "AWS Application Migration Service", "AWS Migration Hub"]), [0],
    "Đổi sang loại DB khác (heterogeneous): dùng SCT để chuyển schema, rồi DMS để chuyển dữ liệu. (Hiện DMS cũng có tính năng DMS Schema Conversion, nhưng đề thi thường lấy SCT làm đáp án.)",
    ["Đúng.", "Sai: chuyển file/dữ liệu lưu trữ, không chuyển đổi schema database.", "Sai: dùng để rehost server.", "Sai: dùng để theo dõi tiến độ."]),
  Q("d3-38", 3, "A company wants to rehost (lift and shift) a large number of physical and virtual servers to AWS with minimal changes. Which AWS service should it use?",
    "Công ty muốn rehost (lift and shift) số lượng lớn server vật lý và ảo lên AWS với ít thay đổi nhất. Nên dùng dịch vụ nào?",
    same(["AWS Application Migration Service", "AWS Database Migration Service (AWS DMS)", "AWS Schema Conversion Tool (AWS SCT)", "AWS Elastic Beanstalk"]), [0],
    "Application Migration Service (MGN) là công cụ chính để rehost server.",
    ["Đúng.", "Sai: dành cho database.", "Sai: dùng để chuyển đổi schema.", "Sai: dùng để triển khai code."]),
  Q("d3-39", 3, "Before migrating, a company needs to collect information about its on-premises servers, including configuration, usage, and dependencies. Which AWS service should it use?",
    "Trước khi migration, công ty cần thu thập thông tin về server tại chỗ: cấu hình, mức dùng, phụ thuộc. Nên dùng dịch vụ nào?",
    same(["AWS Application Discovery Service", "AWS CloudTrail", "AWS Config", "AWS Trusted Advisor"]), [0],
    "Discovery Service dùng ở giai đoạn lập kế hoạch migration. Lưu ý: từ 7/11/2025, dịch vụ này ngừng nhận khách hàng mới (AWS khuyên dùng AWS Transform), nhưng đề thi vẫn có thể hỏi theo mô tả này.",
    ["Đúng.", "Sai: ghi lại API calls trên AWS.", "Sai: theo dõi cấu hình tài nguyên AWS.", "Sai: khuyến nghị cho tài nguyên AWS."]),
  Q("d3-40", 3, "Which AWS service provides a single location to track the progress of application migrations across multiple AWS and partner tools?",
    "Dịch vụ nào là nơi duy nhất để theo dõi tiến độ migration ứng dụng trên nhiều công cụ của AWS và đối tác?",
    same(["AWS Migration Hub", "AWS Control Tower", "Amazon CloudWatch", "AWS Systems Manager"]), [0],
    "Migration Hub là bảng theo dõi tiến độ migration. Lưu ý: từ 7/11/2025, dịch vụ này ngừng nhận khách hàng mới (AWS khuyên dùng AWS Transform), nhưng đề thi vẫn có thể hỏi theo mô tả này.",
    ["Đúng.", "Sai: thiết lập môi trường nhiều tài khoản.", "Sai: giám sát metric.", "Sai: vận hành instance."]),
  Q("d3-41", 3, "A company wants a fully managed document database that is compatible with MongoDB. Which AWS service should it use?",
    "Công ty muốn database dạng document, được quản lý hoàn toàn, tương thích MongoDB. Nên dùng dịch vụ nào?",
    same(["Amazon DocumentDB", "Amazon Neptune", "Amazon Redshift", "Amazon RDS for MySQL"]), [0],
    "Thấy MongoDB thì chọn DocumentDB.",
    ["Đúng.", "Sai: graph database.", "Sai: data warehouse.", "Sai: relational database."]),
  Q("d3-42", 3, "A company is building a social networking application that must store and query highly connected relationships between users. Which AWS database service is the BEST fit?",
    "Công ty xây dựng mạng xã hội, cần lưu và truy vấn các quan hệ chằng chịt giữa người dùng. Database nào phù hợp nhất?",
    same(["Amazon Neptune", "Amazon DocumentDB", "Amazon Redshift", "Amazon ElastiCache"]), [0],
    "Quan hệ (bạn bè, gợi ý, phát hiện gian lận) thì dùng graph database, tức là Neptune.",
    ["Đúng.", "Sai: document database.", "Sai: data warehouse.", "Sai: cache."]),
  Q("d3-43", 3, "What is a benefit of using Amazon RDS instead of installing and managing a database on Amazon EC2?",
    "Lợi ích của Amazon RDS so với tự cài đặt và quản lý database trên EC2 là gì?",
    [["AWS handles routine tasks such as patching, backups, and hardware provisioning", "AWS lo các việc định kỳ như vá lỗi, sao lưu, cấp phát phần cứng"], ["The customer gets full operating system root access", "Khách hàng có quyền root hệ điều hành"], ["Amazon RDS is always free", "RDS luôn miễn phí"], ["There is no need to choose an instance size", "Không cần chọn kích thước instance"]], [0],
    "Database managed giảm công vận hành. Database tự cài trên EC2 cho toàn quyền nhưng bạn phải tự lo mọi thứ.",
    ["Đúng.", "Sai: RDS không cho quyền root OS. Đó là ưu điểm của EC2.", "Sai.", "Sai: vẫn phải chọn instance class."]),
  Q("d3-44", 3, "Which AWS service helps data scientists build, train, and deploy machine learning models at scale?",
    "Dịch vụ nào giúp data scientist xây dựng, huấn luyện và triển khai mô hình machine learning ở quy mô lớn?",
    same(["Amazon SageMaker AI", "Amazon Rekognition", "Amazon Comprehend", "Amazon Lex"]), [0],
    "Tự xây mô hình ML thì dùng SageMaker AI. Các dịch vụ còn lại là AI dựng sẵn cho một việc cụ thể.",
    ["Đúng.", "Sai: phân tích ảnh/video.", "Sai: xử lý ngôn ngữ tự nhiên.", "Sai: chatbot."]),
  Q("d3-45", 3, "Which AWS service can identify objects, people, text, and activities in images and videos?",
    "Dịch vụ nào nhận diện đồ vật, con người, chữ và hoạt động trong ảnh và video?",
    same(["Amazon Rekognition", "Amazon Textract", "Amazon Polly", "Amazon Transcribe"]), [0],
    "Ảnh/video thì chọn Rekognition.",
    ["Đúng.", "Sai: trích xuất chữ từ tài liệu.", "Sai: chuyển văn bản thành giọng nói.", "Sai: chuyển giọng nói thành văn bản."]),
  Q("d3-46", 3, "A company wants to automatically extract text, handwriting, tables, and form data from scanned documents. Which AWS service should it use?",
    "Công ty muốn tự động trích xuất chữ, chữ viết tay, bảng và dữ liệu form từ tài liệu scan. Nên dùng dịch vụ nào?",
    same(["Amazon Textract", "Amazon Rekognition", "Amazon Comprehend", "Amazon Translate"]), [0],
    "Tài liệu scan, form, bảng thì chọn Textract.",
    ["Đúng.", "Sai: phân tích ảnh/video nói chung.", "Sai: phân tích ý nghĩa văn bản.", "Sai: dịch ngôn ngữ."]),
  Q("d3-47", 3, "Which AWS service converts text into lifelike speech?",
    "Dịch vụ nào chuyển văn bản thành giọng nói tự nhiên?",
    same(["Amazon Polly", "Amazon Transcribe", "Amazon Translate", "Amazon Lex"]), [0],
    "Mẹo nhớ: Polly là con vẹt, biết nói (text → speech). Transcribe là chép lại lời (speech → text).",
    ["Đúng.", "Sai: ngược lại, speech → text.", "Sai: dịch ngôn ngữ.", "Sai: chatbot."]),
  Q("d3-48", 3, "A company wants to convert recordings of customer phone calls into text. Which AWS service should it use?",
    "Công ty muốn chuyển bản ghi âm cuộc gọi khách hàng thành văn bản. Nên dùng dịch vụ nào?",
    same(["Amazon Transcribe", "Amazon Polly", "Amazon Comprehend", "Amazon Textract"]), [0],
    "Speech → text thì chọn Transcribe.",
    ["Đúng.", "Sai: text → speech.", "Sai: phân tích văn bản.", "Sai: trích xuất từ tài liệu."]),
  Q("d3-49", 3, "A company wants to analyze customer reviews to determine whether the sentiment is positive or negative. Which AWS service should it use?",
    "Công ty muốn phân tích đánh giá của khách hàng để biết cảm xúc tích cực hay tiêu cực. Nên dùng dịch vụ nào?",
    same(["Amazon Comprehend", "Amazon Rekognition", "Amazon Polly", "Amazon Translate"]), [0],
    "Xử lý ngôn ngữ tự nhiên (NLP), sentiment, trích xuất thực thể thì chọn Comprehend.",
    ["Đúng.", "Sai: ảnh/video.", "Sai: text → speech.", "Sai: dịch ngôn ngữ."]),
  Q("d3-50", 3, "Which AWS service is used to build conversational interfaces, such as chatbots, that use voice and text?",
    "Dịch vụ nào dùng để xây dựng giao diện hội thoại như chatbot bằng giọng nói và văn bản?",
    same(["Amazon Lex", "Amazon Polly", "Amazon Connect", "Amazon Translate"]), [0],
    "Chatbot thì chọn Lex (công nghệ giống Alexa).",
    ["Đúng.", "Sai: chỉ tạo giọng nói.", "Sai: contact center (có thể tích hợp Lex).", "Sai: dịch."]),
  Q("d3-51", 3, "Which AWS service is a generative AI-powered assistant that can answer questions, generate content, and help developers write code?",
    "Dịch vụ nào là trợ lý dùng AI tạo sinh (generative AI), có thể trả lời câu hỏi, tạo nội dung và giúp lập trình viên viết code?",
    same(["Amazon Q", "Amazon Lex", "Amazon SageMaker AI", "Amazon Comprehend"]), [0],
    "Amazon Q là trợ lý generative AI cho doanh nghiệp và lập trình viên.",
    ["Đúng.", "Sai: dùng để xây chatbot của riêng bạn.", "Sai: dùng để tự xây mô hình ML.", "Sai: NLP."]),
  Q("d3-52", 3, "A company wants to run standard SQL queries directly on data stored in Amazon S3 without loading it into a database or managing servers. Which AWS service should it use?",
    "Công ty muốn chạy truy vấn SQL trực tiếp trên dữ liệu trong S3, không cần nạp vào database hay quản lý server. Nên dùng dịch vụ nào?",
    same(["Amazon Athena", "Amazon Redshift", "AWS Glue", "Amazon Kinesis"]), [0],
    "SQL trực tiếp trên S3, serverless thì chọn Athena.",
    ["Đúng.", "Sai: data warehouse, thường phải nạp dữ liệu vào kho (Redshift Spectrum đọc được S3 nhưng vẫn cần Redshift).", "Sai: ETL và data catalog.", "Sai: dữ liệu streaming."]),
  Q("d3-53", 3, "A company needs to collect and process real-time streaming data, such as website clickstreams and IoT telemetry. Which AWS service should it use?",
    "Công ty cần thu thập và xử lý dữ liệu streaming theo thời gian thực như clickstream website và dữ liệu IoT. Nên dùng dịch vụ nào?",
    same(["Amazon Kinesis", "Amazon Athena", "AWS Glue", "Amazon Redshift"]), [0],
    "Thấy “real-time streaming” thì chọn Kinesis.",
    ["Đúng.", "Sai: truy vấn SQL trên S3.", "Sai: ETL.", "Sai: data warehouse."]),
  Q("d3-54", 3, "Which AWS service is a serverless data integration service that discovers, prepares, and transforms data (ETL) and maintains a data catalog?",
    "Dịch vụ nào là tích hợp dữ liệu serverless, giúp khám phá, chuẩn bị, biến đổi dữ liệu (ETL) và có data catalog?",
    same(["AWS Glue", "Amazon Athena", "Amazon EMR", "Amazon Kinesis"]), [0],
    "Thấy “ETL” và “data catalog” thì chọn Glue.",
    ["Đúng.", "Sai: dùng để truy vấn.", "Sai: EMR chạy cụm big data (Spark/Hadoop) do bạn cấu hình, không phải lựa chọn serverless ETL điển hình.", "Sai: streaming."]),
  Q("d3-55", 3, "A company wants to process vast amounts of data by using open-source big data frameworks such as Apache Spark and Apache Hadoop. Which AWS service should it use?",
    "Công ty muốn xử lý khối dữ liệu khổng lồ bằng framework big data mã nguồn mở như Apache Spark, Hadoop. Nên dùng dịch vụ nào?",
    same(["Amazon EMR", "Amazon OpenSearch Service", "Amazon Kinesis", "Amazon Quick"]), [0],
    "Spark/Hadoop thì chọn EMR.",
    ["Đúng.", "Sai: tìm kiếm và phân tích log.", "Sai: streaming.", "Sai: dashboard BI."]),
  Q("d3-56", 3, "Which AWS service lets business users create interactive dashboards and visualizations from their data?",
    "Dịch vụ nào cho người dùng nghiệp vụ tạo dashboard tương tác và biểu đồ từ dữ liệu?",
    same(["Amazon Quick", "Amazon Athena", "AWS Glue", "Amazon Kinesis"]), [0],
    "Business intelligence (BI) và dashboard thì chọn Amazon Quick (trước đây là Amazon QuickSight).",
    ["Đúng.", "Sai: truy vấn SQL.", "Sai: ETL.", "Sai: streaming."]),
  Q("d3-57", 3, "Which AWS service is a serverless event bus that routes events from AWS services and SaaS applications to targets based on rules?",
    "Dịch vụ nào là event bus serverless, định tuyến sự kiện từ dịch vụ AWS và ứng dụng SaaS tới đích dựa trên rule?",
    same(["Amazon EventBridge", "Amazon SQS", "AWS Step Functions", "Amazon Route 53"]), [0],
    "Thấy “event bus” và “rules” thì chọn EventBridge. EventBridge cũng dùng để chạy job theo lịch (cron).",
    ["Đúng.", "Sai: hàng đợi message.", "Sai: điều phối workflow.", "Sai: DNS."]),
  Q("d3-58", 3, "A company wants to coordinate multiple AWS Lambda functions into a visual workflow that includes retries and error handling. Which AWS service should it use?",
    "Công ty muốn điều phối nhiều Lambda function thành workflow trực quan, có retry và xử lý lỗi. Nên dùng dịch vụ nào?",
    same(["AWS Step Functions", "Amazon EventBridge", "Amazon SQS", "AWS CodePipeline"]), [0],
    "Workflow nhiều bước, có trạng thái thì chọn Step Functions.",
    ["Đúng.", "Sai: định tuyến sự kiện.", "Sai: hàng đợi.", "Sai: pipeline CI/CD."]),
  Q("d3-59", 3, "A company wants to set up a cloud-based contact center to handle customer calls. Which AWS service should it use?",
    "Công ty muốn dựng contact center (tổng đài chăm sóc khách hàng) trên cloud. Nên dùng dịch vụ nào?",
    same(["Amazon Connect", "Amazon SES", "Amazon SNS", "Amazon Lex"]), [0],
    "Contact center thì chọn Amazon Connect.",
    ["Đúng.", "Sai: gửi email.", "Sai: thông báo pub/sub.", "Sai: chatbot."]),
  Q("d3-60", 3, "A company needs to send marketing and transactional emails to customers at scale. Which AWS service is designed for this?",
    "Công ty cần gửi email marketing và email giao dịch cho khách hàng ở quy mô lớn. Dịch vụ nào được thiết kế cho việc này?",
    same(["Amazon Simple Email Service (Amazon SES)", "Amazon SNS", "Amazon SQS", "Amazon Connect"]), [0],
    "Gửi email hàng loạt thì chọn SES. SNS dùng cho thông báo (có thể gửi email đơn giản), không chuyên email marketing.",
    ["Đúng.", "Sai.", "Sai: hàng đợi.", "Sai: contact center."]),
  Q("d3-61", 3, "Which AWS service automates the build, test, and deploy phases of a release process (CI/CD)?",
    "Dịch vụ nào tự động hóa các bước build, test, deploy trong quy trình phát hành (CI/CD)?",
    same(["AWS CodePipeline", "AWS CodeBuild", "AWS X-Ray", "AWS CloudFormation"]), [0],
    "CodePipeline điều phối toàn bộ pipeline. CodeBuild chỉ là bước build/test.",
    ["Đúng.", "Sai: chỉ biên dịch và chạy test.", "Sai: truy vết request.", "Sai: tạo hạ tầng từ template."]),
  Q("d3-62", 3, "Which fully managed AWS service compiles source code, runs tests, and produces software packages that are ready to deploy?",
    "Dịch vụ nào (quản lý hoàn toàn) biên dịch mã nguồn, chạy test và tạo gói phần mềm sẵn sàng triển khai?",
    same(["AWS CodeBuild", "AWS CodePipeline", "AWS X-Ray", "Amazon ECR"]), [0],
    "Build và test thì chọn CodeBuild.",
    ["Đúng.", "Sai: điều phối pipeline.", "Sai: debug, truy vết.", "Sai: lưu container image."]),
  Q("d3-63", 3, "A company wants to provide virtual Windows and Linux desktops to remote employees. Which AWS service should it use?",
    "Công ty muốn cung cấp máy tính để bàn ảo Windows/Linux cho nhân viên làm việc từ xa. Nên dùng dịch vụ nào?",
    same(["Amazon WorkSpaces", "Amazon WorkSpaces Applications (AppStream 2.0)", "AWS Amplify", "Amazon Lightsail"]), [0],
    "Toàn bộ desktop ảo thì chọn WorkSpaces. Chỉ stream một ứng dụng thì chọn WorkSpaces Applications (tên cũ: AppStream 2.0).",
    ["Đúng.", "Sai: chỉ stream ứng dụng, không phải desktop đầy đủ.", "Sai: phát triển app web/mobile.", "Sai: VPS."]),
  Q("d3-64", 3, "A company wants to stream a specific desktop application to users' web browsers without providing a full virtual desktop. Which AWS service should it use?",
    "Công ty muốn stream một ứng dụng desktop cụ thể tới trình duyệt người dùng mà không cấp cả desktop ảo. Nên dùng dịch vụ nào?",
    same(["Amazon WorkSpaces Applications (AppStream 2.0)", "Amazon WorkSpaces", "Amazon CloudFront", "AWS Amplify"]), [0],
    "Stream ứng dụng thì chọn Amazon WorkSpaces Applications, tên mới từ 11/2025 của AppStream 2.0. Đề thi có thể vẫn dùng tên cũ.",
    ["Đúng.", "Sai: desktop đầy đủ.", "Sai: CDN.", "Sai: phát triển app."]),
  Q("d3-65", 3, "Which AWS service helps frontend web and mobile developers quickly build, deploy, and host full-stack applications?",
    "Dịch vụ nào giúp lập trình viên frontend web/mobile nhanh chóng xây dựng, triển khai và host ứng dụng full-stack?",
    same(["AWS Amplify", "AWS IoT Core", "Amazon WorkSpaces Applications (AppStream 2.0)", "Amazon Connect"]), [0],
    "Thấy “frontend web and mobile” thì chọn Amplify.",
    ["Đúng.", "Sai: kết nối thiết bị IoT.", "Sai: stream ứng dụng.", "Sai: contact center."]),
  Q("d3-66", 3, "A company needs to securely connect millions of IoT devices and route their messages to other AWS services. Which AWS service should it use?",
    "Công ty cần kết nối an toàn hàng triệu thiết bị IoT và chuyển message của chúng tới các dịch vụ AWS khác. Nên dùng dịch vụ nào?",
    same(["AWS IoT Core", "Amazon SQS", "AWS Amplify", "AWS Outposts"]), [0],
    "Thiết bị IoT thì chọn IoT Core.",
    ["Đúng.", "Sai: hàng đợi message giữa các ứng dụng.", "Sai: app web/mobile.", "Sai: hạ tầng AWS tại chỗ."]),
  Q("d3-67", 3, "Which AWS service makes it easy to create, publish, and secure APIs at any scale, for example as a front door for AWS Lambda functions?",
    "Dịch vụ nào giúp tạo, công bố và bảo mật API ở mọi quy mô, ví dụ làm cổng vào cho Lambda?",
    same(["Amazon API Gateway", "Amazon Route 53", "Amazon CloudFront", "AWS PrivateLink"]), [0],
    "API Gateway kết hợp Lambda là kiến trúc serverless phổ biến.",
    ["Đúng.", "Sai: DNS.", "Sai: CDN.", "Sai: kết nối riêng tư tới dịch vụ."]),
  Q("d3-68", 3, "A company wants to improve the availability and performance of its global application by routing user traffic over the AWS global network by using static IP addresses. Content caching is NOT required. Which AWS service should it use?",
    "Công ty muốn tăng tính sẵn sàng và hiệu năng cho ứng dụng toàn cầu bằng cách đưa traffic qua mạng toàn cầu của AWS với IP tĩnh. KHÔNG cần cache nội dung. Nên dùng dịch vụ nào?",
    same(["AWS Global Accelerator", "Amazon CloudFront", "Amazon Route 53", "AWS Direct Connect"]), [0],
    "Global Accelerator dùng IP tĩnh (anycast) và không cache. CloudFront cache nội dung.",
    ["Đúng.", "Sai: CloudFront là CDN có cache.", "Sai: DNS.", "Sai: đường truyền từ on-premises."]),
  Q("d3-69", 3, "A company needs to connect hundreds of VPCs and its on-premises networks through a central hub. Which AWS service should it use?",
    "Công ty cần kết nối hàng trăm VPC và mạng tại chỗ qua một điểm trung tâm (hub). Nên dùng dịch vụ nào?",
    same(["AWS Transit Gateway", "VPC peering", "Internet gateway", "AWS PrivateLink"]), [0],
    "Nhiều VPC kết nối qua hub thì chọn Transit Gateway. VPC peering là kết nối 1-1, khó quản lý khi số lượng lớn.",
    ["Đúng.", "Sai: kết nối từng cặp, không phải hub.", "Sai: ra internet.", "Sai: truy cập riêng tư tới một dịch vụ."]),
  Q("d3-70", 3, "A company wants to privately access services hosted in another VPC without exposing traffic to the public internet. Which AWS service should it use?",
    "Công ty muốn truy cập riêng tư dịch vụ ở VPC khác mà không để traffic đi qua internet công cộng. Nên dùng dịch vụ nào?",
    same(["AWS PrivateLink", "Internet gateway", "NAT gateway", "Amazon CloudFront"]), [0],
    "PrivateLink tạo kết nối riêng tư tới dịch vụ (VPC endpoint).",
    ["Đúng.", "Sai: đi ra internet.", "Sai: cho private subnet đi ra internet.", "Sai: CDN."]),
  Q("d3-71", 3, "A company wants individual remote employees to securely connect from their laptops to resources in a VPC. Which AWS service should it use?",
    "Công ty muốn từng nhân viên làm việc từ xa kết nối an toàn từ laptop tới tài nguyên trong VPC. Nên dùng dịch vụ nào?",
    same(["AWS Client VPN", "AWS Site-to-Site VPN", "AWS Direct Connect", "AWS Transit Gateway"]), [0],
    "Từng người dùng thì chọn Client VPN. Cả văn phòng hoặc data center thì chọn Site-to-Site VPN.",
    ["Đúng.", "Sai: kết nối cả mạng (site).", "Sai: đường truyền riêng của data center.", "Sai: hub kết nối mạng."]),
  Q("d3-72", 3, "A subnet whose route table has a route to an internet gateway is called what?",
    "Subnet có route table trỏ tới internet gateway được gọi là gì?",
    [["A public subnet", "Public subnet"], ["A private subnet", "Private subnet"], ["An edge location", "Edge location"], ["An Availability Zone", "Availability Zone"]], [0],
    "Public subnet có route ra internet gateway. Private subnet thì không (có thể ra ngoài qua NAT gateway).",
    ["Đúng.", "Sai.", "Sai.", "Sai."]),
  Q("d3-73", 3, "A company wants to quickly set up and govern a secure multi-account AWS environment (landing zone) based on best practices. Which AWS service should it use?",
    "Công ty muốn nhanh chóng thiết lập và quản trị môi trường AWS nhiều tài khoản an toàn (landing zone) theo best practice. Nên dùng dịch vụ nào?",
    same(["AWS Control Tower", "AWS Organizations", "AWS Config", "AWS Service Catalog"]), [0],
    "Thấy “landing zone” thì chọn Control Tower. Control Tower dùng Organizations bên dưới và tự động hóa việc thiết lập.",
    ["Đúng.", "Sai: là nền tảng quản lý tài khoản, không tự dựng landing zone theo best practice.", "Sai: theo dõi cấu hình.", "Sai: danh mục sản phẩm IT."]),
  Q("d3-74", 3, "Which AWS service lets IT administrators create and manage catalogs of approved IT services that users can deploy?",
    "Dịch vụ nào cho quản trị viên IT tạo và quản lý danh mục dịch vụ IT đã được duyệt để người dùng tự triển khai?",
    same(["AWS Service Catalog", "AWS Marketplace", "AWS Control Tower", "AWS CloudFormation"]), [0],
    "Danh mục nội bộ đã được duyệt thì chọn Service Catalog. Mua phần mềm bên thứ ba thì chọn Marketplace.",
    ["Đúng.", "Sai: chợ phần mềm bên thứ ba.", "Sai: landing zone.", "Sai: template hạ tầng."]),
  Q("d3-75", 3, "A company wants to view the limits on its AWS resources and request increases from one location. Which AWS service should it use?",
    "Công ty muốn xem giới hạn tài nguyên AWS và yêu cầu tăng giới hạn tại một nơi. Nên dùng dịch vụ nào?",
    same(["Service Quotas", "AWS Budgets", "AWS Config", "AWS Health Dashboard"]), [0],
    "Limits/quotas thì chọn Service Quotas.",
    ["Đúng.", "Sai: ngân sách chi phí.", "Sai: cấu hình.", "Sai: sự kiện dịch vụ."]),
  Q("d3-76", 3, "Which AWS service uses machine learning to recommend optimal Amazon EC2 instance types to reduce costs and improve performance?",
    "Dịch vụ nào dùng machine learning để khuyến nghị loại instance EC2 tối ưu nhằm giảm chi phí và tăng hiệu năng?",
    same(["AWS Compute Optimizer", "Amazon Inspector", "Amazon EC2 Auto Scaling", "AWS CloudTrail"]), [0],
    "Compute Optimizer hỗ trợ việc rightsizing.",
    ["Đúng.", "Sai: quét lỗ hổng.", "Sai: tự thay đổi số lượng instance, không khuyến nghị loại instance.", "Sai: ghi lại API calls."]),
  Q("d3-77", 3, "Where can a company view AWS service events and scheduled maintenance that may affect the resources in its account?",
    "Công ty xem sự kiện dịch vụ AWS và lịch bảo trì có thể ảnh hưởng đến tài nguyên trong tài khoản ở đâu?",
    same(["AWS Health Dashboard", "Amazon CloudWatch", "AWS CloudTrail", "AWS Trusted Advisor"]), [0],
    "Health Dashboard hiển thị tình trạng dịch vụ AWS và sự kiện riêng cho tài khoản. AWS Health API cho phép lấy dữ liệu này bằng lập trình.",
    ["Đúng.", "Sai: metric của tài nguyên của bạn.", "Sai: API calls.", "Sai: khuyến nghị best practice."]),
  Q("d3-78", 3, "Which AWS tool helps a company review its workloads against the best practices of the AWS Well-Architected Framework?",
    "Công cụ nào giúp công ty đánh giá hệ thống theo best practice của AWS Well-Architected Framework?",
    same(["AWS Well-Architected Tool", "AWS Trusted Advisor", "AWS Config", "Amazon Inspector"]), [0],
    "Tên dịch vụ đã nói lên chức năng: Well-Architected Tool đánh giá theo 6 trụ cột.",
    ["Đúng.", "Sai: kiểm tra tài nguyên tự động, không phải review theo framework.", "Sai.", "Sai."]),
  Q("d3-79", 3, "Which AWS service helps a company manage and track its software licenses from vendors such as Microsoft and Oracle?",
    "Dịch vụ nào giúp công ty quản lý và theo dõi license phần mềm từ các hãng như Microsoft, Oracle?",
    same(["AWS License Manager", "AWS Artifact", "AWS Marketplace", "AWS Organizations"]), [0],
    "License thì chọn License Manager. Thường dùng cùng BYOL.",
    ["Đúng.", "Sai: báo cáo tuân thủ.", "Sai: mua phần mềm.", "Sai: quản lý tài khoản."]),

  // ───────── Domain 4 ─────────
  Q("d4-14", 4, "Which EC2 option runs instances on hardware dedicated to a single customer, but does NOT provide visibility into or control over the physical server's sockets and cores?",
    "Lựa chọn EC2 nào chạy instance trên phần cứng dành riêng cho một khách hàng, nhưng KHÔNG cho thấy hay kiểm soát socket, core của server vật lý?",
    same(["Dedicated Instances", "Dedicated Hosts", "Spot Instances", "On-Demand Capacity Reservations"]), [0],
    "Cả hai đều dùng phần cứng riêng. Dedicated Hosts cho thấy và kiểm soát server (phù hợp BYOL theo socket/core). Dedicated Instances thì không.",
    ["Đúng.", "Sai: Dedicated Hosts có visibility.", "Sai: phần cứng dùng chung.", "Sai: là đặt trước công suất."]),
  Q("d4-15", 4, "A company needs to reserve compute capacity in a specific Availability Zone for any duration, without a 1-year or 3-year commitment. Which option should it use?",
    "Công ty cần giữ trước công suất compute ở một AZ cụ thể trong khoảng thời gian bất kỳ, không cam kết 1 hay 3 năm. Nên dùng gì?",
    same(["On-Demand Capacity Reservations", "Standard Reserved Instances", "Spot Instances", "Savings Plans"]), [0],
    "Capacity Reservations đảm bảo có công suất, tính giá On-Demand dù có dùng hay không, và không cần cam kết dài hạn.",
    ["Đúng.", "Sai: cần cam kết 1 hoặc 3 năm.", "Sai: không đảm bảo công suất.", "Sai: cần cam kết, chủ yếu là giảm giá."]),
  Q("d4-16", 4, "A company wants a Reserved Instance discount but expects to change instance families during the term. Which option provides this flexibility?",
    "Công ty muốn giảm giá kiểu Reserved Instance nhưng có thể đổi họ instance trong thời hạn cam kết. Lựa chọn nào linh hoạt như vậy?",
    same(["Convertible Reserved Instances", "Standard Reserved Instances", "Spot Instances", "Dedicated Hosts"]), [0],
    "Convertible RI cho đổi họ instance, OS, tenancy, nhưng giảm giá ít hơn Standard RI.",
    ["Đúng.", "Sai: Standard RI không đổi được họ instance.", "Sai.", "Sai."]),
  Q("d4-17", 4, "In AWS Organizations with consolidated billing, how are Reserved Instance discounts applied by default?",
    "Trong AWS Organizations có consolidated billing, mặc định giảm giá Reserved Instance được áp dụng thế nào?",
    [["They can apply to matching usage in other accounts in the organization", "Có thể áp dụng cho mức dùng phù hợp ở các tài khoản khác trong tổ chức"], ["They apply only to the purchasing account and can never be shared", "Chỉ áp dụng cho tài khoản mua, không bao giờ chia sẻ"], ["They are cancelled when the account joins an organization", "Bị hủy khi tài khoản tham gia tổ chức"], ["They apply only to Spot Instances", "Chỉ áp dụng cho Spot"]], [0],
    "Mặc định, RI và Savings Plans được chia sẻ giữa các tài khoản trong tổ chức. Có thể tắt chia sẻ nếu cần.",
    ["Đúng.", "Sai: mặc định được chia sẻ.", "Sai.", "Sai."]),
  Q("d4-18", 4, "Which type of data transfer typically incurs a charge?",
    "Loại truyền dữ liệu nào thường bị tính phí?",
    [["Data transferred between two AWS Regions", "Truyền dữ liệu giữa hai AWS Region"], ["Data transferred into Amazon EC2 from the internet", "Dữ liệu từ internet vào EC2"], ["Data transferred into Amazon S3 from the internet", "Dữ liệu từ internet vào S3"], ["Data transferred between EC2 instances in the same Availability Zone by using private IP addresses", "Dữ liệu giữa các EC2 trong cùng AZ qua IP private"]], [0],
    "Nguyên tắc chung: dữ liệu vào AWS thì miễn phí. Dữ liệu ra internet và giữa các Region thì tính phí. Giữa các AZ có phí nhỏ. Trong cùng AZ qua IP private thì miễn phí.",
    ["Đúng.", "Sai: miễn phí.", "Sai: miễn phí.", "Sai: miễn phí."]),
  Q("d4-19", 4, "Which AWS billing resource provides the most comprehensive and detailed set of cost and usage data, delivered to an Amazon S3 bucket?",
    "Nguồn dữ liệu billing nào cung cấp dữ liệu chi phí và mức dùng chi tiết, đầy đủ nhất, được gửi vào S3 bucket?",
    same(["AWS Cost and Usage Report", "AWS Cost Explorer", "AWS Budgets", "AWS Pricing Calculator"]), [0],
    "CUR là dữ liệu chi tiết nhất, có thể kèm cost allocation tags, và phân tích được bằng Athena hoặc Quick. Hiện CUR 2.0 được tạo qua AWS Data Exports.",
    ["Đúng.", "Sai: giao diện phân tích và biểu đồ.", "Sai: cảnh báo ngân sách.", "Sai: ước tính trước."]),
  Q("d4-20", 4, "Which types of cost allocation tags does AWS support? (Choose TWO.)",
    "AWS hỗ trợ những loại cost allocation tag nào? (Chọn 2.)",
    [["AWS-generated tags", "Tag do AWS tạo"], ["User-defined tags", "Tag do người dùng định nghĩa"], ["Region-generated tags", "Tag do Region tạo"], ["IAM-generated tags", "Tag do IAM tạo"], ["Support-generated tags", "Tag do Support tạo"]], [0, 1],
    "Có 2 loại: AWS-generated (ví dụ createdBy) và user-defined. Tag phải được activate trong Billing mới xuất hiện trong báo cáo chi phí.",
    ["Đúng.", "Đúng.", "Sai.", "Sai.", "Sai."]),
  Q("d4-21", 4, "Which AWS resource is a community-driven question-and-answer service where users can get answers from AWS experts and the community?",
    "Nguồn nào của AWS là dịch vụ hỏi đáp cộng đồng, nơi người dùng nhận câu trả lời từ chuyên gia AWS và cộng đồng?",
    same(["AWS re:Post", "AWS Artifact", "AWS Trusted Advisor", "AWS Health Dashboard"]), [0],
    "re:Post là cộng đồng hỏi đáp (thay cho AWS Forums cũ). Knowledge Center là bài viết cho các câu hỏi thường gặp.",
    ["Đúng.", "Sai.", "Sai.", "Sai."]),
  Q("d4-22", 4, "Which AWS resource provides proven strategies, guides, and patterns to help accelerate cloud migration and modernization projects?",
    "Nguồn nào của AWS cung cấp chiến lược, hướng dẫn và pattern đã được kiểm chứng để đẩy nhanh dự án migration và hiện đại hóa?",
    same(["AWS Prescriptive Guidance", "AWS Artifact", "AWS re:Post", "AWS Marketplace"]), [0],
    "Prescriptive Guidance là hướng dẫn chi tiết, có tính chỉ dẫn, do AWS và đối tác viết.",
    ["Đúng.", "Sai: báo cáo tuân thủ.", "Sai: hỏi đáp cộng đồng.", "Sai: mua phần mềm."]),
  Q("d4-23", 4, "A company wants to hire an AWS partner company to help design and migrate its workloads to AWS. Where should the company look?",
    "Công ty muốn thuê một công ty đối tác của AWS để hỗ trợ thiết kế và migration. Nên tìm ở đâu?",
    [["AWS Partner Network (APN) system integrators", "System integrator trong AWS Partner Network (APN)"], ["AWS Artifact", "AWS Artifact"], ["AWS Trust & Safety team", "Đội AWS Trust & Safety"], ["Service Quotas", "Service Quotas"]], [0],
    "APN gồm system integrators (công ty dịch vụ, tư vấn) và ISVs (công ty phần mềm).",
    ["Đúng.", "Sai.", "Sai: dùng để báo cáo lạm dụng.", "Sai."]),
  Q("d4-24", 4, "Which AWS offering is a global team of AWS experts that works with customers to achieve business outcomes, such as large-scale migrations?",
    "Dịch vụ nào là đội chuyên gia AWS toàn cầu làm việc cùng khách hàng để đạt mục tiêu kinh doanh, ví dụ các dự án migration lớn?",
    same(["AWS Professional Services", "AWS Trust & Safety", "Basic Support", "AWS re:Post"]), [0],
    "Professional Services là chuyên gia của chính AWS (có phí). Có thể làm việc cùng đối tác APN.",
    ["Đúng.", "Sai: xử lý lạm dụng.", "Sai: hỗ trợ miễn phí cơ bản.", "Sai: cộng đồng hỏi đáp."]),
  Q("d4-25", 4, "A company notices that AWS resources are being used to send spam to its servers. Which AWS team should it contact?",
    "Công ty phát hiện tài nguyên AWS đang bị dùng để gửi spam tới server của mình. Nên liên hệ đội nào của AWS?",
    same(["AWS Trust & Safety team", "AWS Professional Services", "AWS Marketplace", "AWS Artifact"]), [0],
    "Báo cáo lạm dụng (spam, port scanning, DDoS, nội dung vi phạm) từ tài nguyên AWS thì liên hệ Trust & Safety.",
    ["Đúng.", "Sai.", "Sai.", "Sai."]),
  Q("d4-26", 4, "Where does a company open a technical support case with AWS?",
    "Công ty mở yêu cầu hỗ trợ kỹ thuật (support case) với AWS ở đâu?",
    same(["AWS Support Center", "AWS Artifact", "AWS Marketplace", "AWS Health Dashboard"]), [0],
    "Support Center là nơi tạo và theo dõi case. Loại case kỹ thuật có thể mở phụ thuộc vào gói Support.",
    ["Đúng.", "Sai.", "Sai.", "Sai: chỉ xem sự kiện dịch vụ."])
);

/* Từ khóa mới */
C.glossary.push(
  { term: "BYOL", vi: "dùng license sẵn có", hint: "Dedicated Hosts, License Manager" },
  { term: "rightsizing", vi: "chọn đúng kích thước", hint: "Compute Optimizer, Cost Explorer" },
  { term: "minimal downtime", vi: "gián đoạn tối thiểu", hint: "DMS (migration DB)" },
  { term: "data at rest", vi: "dữ liệu đang lưu trữ", hint: "KMS" },
  { term: "data in transit", vi: "dữ liệu đang truyền", hint: "TLS, ACM" },
  { term: "corporate credentials", vi: "tài khoản công ty có sẵn", hint: "Federation, IAM Identity Center" },
  { term: "temporary access", vi: "quyền truy cập tạm thời", hint: "IAM role" },
  { term: "root cause", vi: "nguyên nhân gốc", hint: "Amazon Detective" },
  { term: "data residency", vi: "yêu cầu lưu trú dữ liệu", hint: "Chọn Region phù hợp" },
  { term: "disaster recovery", vi: "khôi phục thảm họa", hint: "Multi-Region, Elastic Disaster Recovery" },
  { term: "single points of failure", vi: "điểm lỗi đơn lẻ", hint: "Multi-AZ để tránh" },
  { term: "Kubernetes", vi: "nền tảng điều phối container", hint: "Amazon EKS" },
  { term: "schema", vi: "cấu trúc database", hint: "AWS SCT" },
  { term: "MongoDB", vi: "database dạng document", hint: "Amazon DocumentDB" },
  { term: "sentiment", vi: "cảm xúc (tích cực/tiêu cực)", hint: "Amazon Comprehend" },
  { term: "lifelike speech", vi: "giọng nói tự nhiên", hint: "Amazon Polly" },
  { term: "scanned documents", vi: "tài liệu scan", hint: "Amazon Textract" },
  { term: "streaming data", vi: "dữ liệu luồng liên tục", hint: "Amazon Kinesis" },
  { term: "real-time", vi: "thời gian thực", hint: "Kinesis" },
  { term: "dashboards", vi: "bảng điều khiển trực quan", hint: "Amazon Quick, CloudWatch" },
  { term: "event bus", vi: "kênh trung chuyển sự kiện", hint: "Amazon EventBridge" },
  { term: "contact center", vi: "tổng đài chăm sóc khách hàng", hint: "Amazon Connect" },
  { term: "virtual Windows and Linux desktops", vi: "máy tính để bàn ảo", hint: "Amazon WorkSpaces" },
  { term: "static IP addresses", vi: "địa chỉ IP tĩnh", hint: "Global Accelerator" },
  { term: "landing zone", vi: "môi trường nhiều tài khoản chuẩn", hint: "AWS Control Tower" },
  { term: "abuse", vi: "lạm dụng", hint: "AWS Trust & Safety" },
  { term: "spam", vi: "thư rác", hint: "AWS Trust & Safety" }
);

/* Thẻ dịch vụ mới (theo danh sách in-scope của Exam Guide) */
C.services.push(
  { name: "AWS Firewall Manager", d: 2, vi: "Quản lý tập trung rule WAF, Shield, security group cho nhiều tài khoản.", confuse: "Security Hub" },
  { name: "Amazon Detective", d: 2, vi: "Điều tra nguyên nhân gốc của sự cố bảo mật.", confuse: "GuardDuty (phát hiện)" },
  { name: "AWS CloudHSM", d: 2, vi: "Thiết bị HSM chuyên dụng, khách hàng toàn quyền kiểm soát khóa.", confuse: "KMS (managed)" },
  { name: "AWS Directory Service", d: 2, vi: "Microsoft Active Directory được quản lý trên AWS.", confuse: "IAM Identity Center" },
  { name: "AWS Resource Access Manager", d: 2, vi: "Chia sẻ tài nguyên (subnet, Transit Gateway...) giữa các tài khoản.", confuse: "" },
  { name: "Amazon ECS / EKS / ECR", d: 3, vi: "ECS: điều phối container của AWS. EKS: Kubernetes. ECR: lưu container image.", confuse: "Fargate (serverless compute cho container)" },
  { name: "AWS Batch", d: 3, vi: "Chạy job tính toán theo lô ở quy mô lớn.", confuse: "Lambda, Step Functions" },
  { name: "Amazon FSx", d: 3, vi: "File system bên thứ ba được quản lý (Windows File Server, NetApp ONTAP, OpenZFS).", confuse: "EFS (Linux NFS)" },
  { name: "AWS Backup", d: 3, vi: "Sao lưu tập trung cho nhiều dịch vụ.", confuse: "Elastic Disaster Recovery" },
  { name: "AWS Elastic Disaster Recovery", d: 3, vi: "Replicate server liên tục, phục hồi nhanh khi có thảm họa.", confuse: "AWS Backup" },
  { name: "AWS DMS / AWS SCT", d: 3, vi: "DMS: chuyển dữ liệu DB (có replicate liên tục). SCT: chuyển đổi schema giữa các loại DB.", confuse: "Nhầm lẫn giữa DMS và SCT" },
  { name: "AWS Application Migration Service", d: 3, vi: "Rehost (lift-and-shift) server lên AWS.", confuse: "DMS" },
  { name: "AWS Application Discovery Service", d: 3, vi: "Thu thập thông tin server tại chỗ để lập kế hoạch migration. Ngừng nhận khách hàng mới từ 11/2025 (thay bằng AWS Transform).", confuse: "Migration Evaluator" },
  { name: "AWS Migration Hub", d: 3, vi: "Theo dõi tiến độ migration tập trung. Ngừng nhận khách hàng mới từ 11/2025 (thay bằng AWS Transform).", confuse: "" },
  { name: "Migration Evaluator", d: 3, vi: "Xây dựng business case, dự toán chi phí khi chuyển lên AWS.", confuse: "Pricing Calculator" },
  { name: "Amazon DocumentDB", d: 3, vi: "Database document tương thích MongoDB.", confuse: "DynamoDB" },
  { name: "Amazon Neptune", d: 3, vi: "Graph database cho dữ liệu quan hệ chằng chịt.", confuse: "DocumentDB" },
  { name: "Amazon SageMaker AI", d: 3, vi: "Xây dựng, huấn luyện, triển khai mô hình ML.", confuse: "Các dịch vụ AI dựng sẵn" },
  { name: "Amazon Rekognition", d: 3, vi: "Phân tích ảnh và video.", confuse: "Textract" },
  { name: "Amazon Textract", d: 3, vi: "Trích xuất chữ, bảng, form từ tài liệu scan.", confuse: "Rekognition" },
  { name: "Amazon Polly", d: 3, vi: "Chuyển văn bản thành giọng nói.", confuse: "Transcribe" },
  { name: "Amazon Transcribe", d: 3, vi: "Chuyển giọng nói thành văn bản.", confuse: "Polly" },
  { name: "Amazon Translate", d: 3, vi: "Dịch ngôn ngữ.", confuse: "" },
  { name: "Amazon Comprehend", d: 3, vi: "NLP: phân tích cảm xúc, trích xuất thực thể.", confuse: "" },
  { name: "Amazon Lex", d: 3, vi: "Xây dựng chatbot bằng giọng nói và văn bản.", confuse: "Polly, Connect" },
  { name: "Amazon Q", d: 3, vi: "Trợ lý generative AI cho doanh nghiệp và lập trình viên.", confuse: "Lex" },
  { name: "Amazon Athena", d: 3, vi: "Truy vấn SQL trực tiếp trên S3, serverless.", confuse: "Redshift" },
  { name: "Amazon Kinesis", d: 3, vi: "Thu thập và xử lý dữ liệu streaming thời gian thực.", confuse: "SQS" },
  { name: "AWS Glue", d: 3, vi: "ETL serverless và data catalog.", confuse: "EMR" },
  { name: "Amazon EMR", d: 3, vi: "Chạy big data framework (Spark, Hadoop).", confuse: "Glue" },
  { name: "Amazon OpenSearch Service", d: 3, vi: "Tìm kiếm, phân tích log, giám sát ứng dụng.", confuse: "" },
  { name: "Amazon Quick", d: 3, vi: "BI: dashboard và trực quan hóa dữ liệu (trước đây là QuickSight).", confuse: "" },
  { name: "Amazon EventBridge", d: 3, vi: "Event bus serverless, định tuyến sự kiện theo rule, chạy job theo lịch.", confuse: "SNS, SQS" },
  { name: "AWS Step Functions", d: 3, vi: "Điều phối workflow nhiều bước.", confuse: "EventBridge" },
  { name: "Amazon Connect", d: 3, vi: "Contact center trên cloud.", confuse: "" },
  { name: "Amazon SES", d: 3, vi: "Gửi email marketing và email giao dịch.", confuse: "SNS" },
  { name: "AWS CodeBuild / CodePipeline", d: 3, vi: "CodeBuild: build và test. CodePipeline: điều phối CI/CD.", confuse: "" },
  { name: "AWS X-Ray", d: 3, vi: "Truy vết request để debug ứng dụng phân tán.", confuse: "CloudWatch, CloudTrail" },
  { name: "Amazon WorkSpaces", d: 3, vi: "Máy tính để bàn ảo (DaaS).", confuse: "WorkSpaces Applications (AppStream 2.0)" },
  { name: "Amazon WorkSpaces Applications (AppStream 2.0)", d: 3, vi: "Stream ứng dụng desktop tới trình duyệt. Đổi tên từ AppStream 2.0 vào 11/2025.", confuse: "WorkSpaces" },
  { name: "Amazon WorkSpaces Secure Browser", d: 3, vi: "Trình duyệt an toàn để truy cập website nội bộ và SaaS.", confuse: "WorkSpaces" },
  { name: "AWS Amplify", d: 3, vi: "Xây dựng và host app web/mobile full-stack.", confuse: "Elastic Beanstalk" },
  { name: "AWS IoT Core", d: 3, vi: "Kết nối và quản lý thiết bị IoT.", confuse: "" },
  { name: "Amazon API Gateway", d: 3, vi: "Tạo, công bố, bảo mật API.", confuse: "ELB" },
  { name: "AWS Global Accelerator", d: 3, vi: "Đưa traffic qua mạng toàn cầu của AWS với IP tĩnh, không cache.", confuse: "CloudFront" },
  { name: "AWS Transit Gateway", d: 3, vi: "Hub kết nối nhiều VPC và mạng tại chỗ.", confuse: "VPC peering" },
  { name: "AWS PrivateLink", d: 3, vi: "Truy cập riêng tư tới dịch vụ, không qua internet.", confuse: "" },
  { name: "AWS Client VPN", d: 3, vi: "VPN cho từng người dùng từ xa.", confuse: "Site-to-Site VPN" },
  { name: "AWS Control Tower", d: 3, vi: "Thiết lập và quản trị landing zone nhiều tài khoản.", confuse: "Organizations" },
  { name: "AWS Service Catalog", d: 3, vi: "Danh mục sản phẩm IT nội bộ đã được duyệt.", confuse: "Marketplace" },
  { name: "Service Quotas", d: 3, vi: "Xem và yêu cầu tăng giới hạn tài nguyên.", confuse: "Trusted Advisor" },
  { name: "AWS Compute Optimizer", d: 3, vi: "Khuyến nghị rightsizing bằng ML.", confuse: "Cost Explorer" },
  { name: "AWS Health Dashboard", d: 3, vi: "Sự kiện dịch vụ AWS và bảo trì ảnh hưởng đến tài khoản.", confuse: "CloudWatch" },
  { name: "AWS Well-Architected Tool", d: 3, vi: "Đánh giá hệ thống theo Well-Architected Framework.", confuse: "Trusted Advisor" },
  { name: "AWS License Manager", d: 3, vi: "Quản lý và theo dõi license phần mềm.", confuse: "" },
  { name: "AWS Cost and Usage Report", d: 4, vi: "Dữ liệu chi phí chi tiết nhất, gửi vào S3.", confuse: "Cost Explorer" },
  { name: "AWS re:Post / Knowledge Center", d: 4, vi: "re:Post: cộng đồng hỏi đáp. Knowledge Center: bài viết cho câu hỏi thường gặp.", confuse: "" },
  { name: "AWS Prescriptive Guidance", d: 4, vi: "Chiến lược, hướng dẫn, pattern đã kiểm chứng.", confuse: "" },
  { name: "AWS Professional Services", d: 4, vi: "Đội chuyên gia của AWS hỗ trợ dự án lớn.", confuse: "APN" },
  { name: "AWS Partner Network (APN)", d: 4, vi: "Mạng lưới đối tác: system integrators và ISVs.", confuse: "Professional Services" },
  { name: "AWS Trust & Safety", d: 4, vi: "Tiếp nhận báo cáo lạm dụng tài nguyên AWS.", confuse: "" }
);

/* Bài học bổ sung */
const L = C.lessons;
L[1].unshift({ t: "Về kỳ thi CLF-C02 (theo Exam Guide)", h: `
<ul><li><b>65 câu</b>: 50 câu tính điểm và 15 câu thử nghiệm không tính điểm. Bạn không biết câu nào là câu thử nghiệm.</li>
<li><b>Multiple choice</b>: 1 đáp án đúng, 3 đáp án nhiễu. <b>Multiple response</b>: từ 2 đáp án đúng trở lên, trong 5 lựa chọn trở lên.</li>
<li>Câu bỏ trống tính là sai, đoán sai không bị trừ điểm. Vì vậy <b>đừng bỏ trống câu nào</b>.</li>
<li>Điểm scaled 100–1000, <b>đậu ≥ 700</b>. Chỉ cần đạt tổng điểm, không cần đạt từng domain.</li>
<li>Ngoài phạm vi thi: viết code, thiết kế kiến trúc, troubleshooting, kiểm thử hiệu năng.</li></ul>` });
L[1].push(
  { t: "Kinh tế học cloud (Task 1.4)", h: `
<ul><li><b>Fixed vs variable cost</b>: on-premises phải trả trước (phần cứng, data center). Cloud trả theo mức dùng.</li>
<li><b>Chi phí on-premises</b>: phần cứng, điện, làm mát, mặt bằng, nhân sự vận hành, thay mới thiết bị định kỳ.</li>
<li><b>Licensing</b>: <b>BYOL</b> (dùng license sẵn có, thường cần Dedicated Hosts) và <b>license-included</b> (giá đã gồm license).</li>
<li><b>Rightsizing</b>: chọn đúng loại và kích thước. Công cụ: Compute Optimizer, Cost Explorer.</li>
<li><b>Automation</b>: IaC, Auto Scaling, tự tắt tài nguyên không dùng giúp giảm công sức và lãng phí.</li></ul>` },
  { t: "AWS CAF: lợi ích kinh doanh & tài nguyên migration (Task 1.3)", h: `
<p>4 kết quả kinh doanh: <b>reduced business risk</b>, <b>improved ESG performance</b>, <b>increased revenue</b>, <b>increased operational efficiency</b>.</p>
<p>Công cụ migration: Migration Evaluator (business case) → Application Discovery Service (thu thập thông tin) → Application Migration Service (rehost server) / DMS + SCT (database) → Migration Hub (theo dõi tiến độ).</p>` }
);
L[2].push(
  { t: "Mã hóa: at rest & in transit", h: `
<table><tr><th>Loại</th><th>Nghĩa</th><th>Dịch vụ</th></tr>
<tr><td>At rest</td><td>Dữ liệu đang lưu (S3, EBS, RDS)</td><td>AWS KMS, CloudHSM (HSM riêng)</td></tr>
<tr><td>In transit</td><td>Dữ liệu đang truyền</td><td>TLS/HTTPS, chứng chỉ từ ACM</td></tr></table>` },
  { t: "Root user & quản lý danh tính (Task 2.3)", h: `
<p><b>Việc chỉ root làm được</b> (ví dụ): đổi email/mật khẩu root, đóng tài khoản, khôi phục quyền IAM, đăng ký bán trên Reserved Instance Marketplace, bật MFA Delete cho S3.</p>
<ul><li><b>Bảo vệ root</b>: bật MFA, không tạo access key, khóa thông tin đăng nhập, dùng IAM cho việc hằng ngày.</li>
<li><b>Password policy</b>: độ dài, độ phức tạp, thời hạn đổi mật khẩu.</li>
<li><b>Federation</b>: dùng danh tính của công ty (AD, SAML) để đăng nhập AWS, qua IAM Identity Center.</li>
<li><b>Cross-account role</b>: user tài khoản A assume role ở tài khoản B để nhận quyền tạm thời.</li>
<li><b>Lưu bí mật</b>: Secrets Manager (có rotate tự động), Systems Manager Parameter Store.</li>
<li><b>Access reports</b>: IAM credential report (trạng thái mật khẩu, key, MFA), access advisor (quyền nào chưa dùng).</li>
<li><b>Policy</b>: AWS managed policy (AWS viết sẵn) và customer managed policy (bạn tự viết).</li></ul>` },
  { t: "Dịch vụ bảo mật bổ sung & nguồn thông tin (Task 2.2, 2.4)", h: `
<table><tr><th>Dịch vụ</th><th>Chức năng</th></tr>
<tr><td>AWS Firewall Manager</td><td>Quản lý rule WAF/Shield/security group tập trung cho nhiều tài khoản</td></tr>
<tr><td>Amazon Detective</td><td>Điều tra nguyên nhân gốc</td></tr>
<tr><td>AWS CloudHSM</td><td>HSM chuyên dụng</td></tr>
<tr><td>AWS Directory Service</td><td>Microsoft AD được quản lý</td></tr>
<tr><td>AWS RAM</td><td>Chia sẻ tài nguyên giữa các tài khoản</td></tr>
<tr><td>Amazon Cognito</td><td>Đăng nhập cho người dùng của ứng dụng</td></tr></table>
<p><b>Log bảo mật</b> ở đâu: CloudTrail (API calls), CloudWatch Logs, VPC Flow Logs, S3 access logs.</p>
<p><b>Nguồn thông tin</b>: AWS Artifact (báo cáo tuân thủ), AWS Security Center, AWS Security Blog, AWS Knowledge Center. Sản phẩm bảo mật bên thứ ba có trên AWS Marketplace.</p>
<p><b>Tuân thủ theo quốc gia/ngành</b>: chọn Region phù hợp (data residency). Mức độ tuân thủ (ví dụ HIPAA eligible) khác nhau theo từng dịch vụ.</p>` }
);
L[3].push(
  { t: "Multi-AZ & Multi-Region (Task 3.2)", h: `
<ul><li>AZ tách biệt vật lý, <b>không có single point of failure chung</b>, nên triển khai Multi-AZ để đạt high availability.</li>
<li>Dùng nhiều Region khi cần: <b>disaster recovery</b>, <b>business continuity</b>, <b>độ trễ thấp</b> cho người dùng toàn cầu, <b>data sovereignty</b>.</li>
<li>Edge location giúp đưa nội dung gần người dùng (CloudFront) và tăng tốc định tuyến (Global Accelerator, Route 53).</li></ul>` },
  { t: "Container, batch & loại instance (Task 3.3)", h: `
<ul><li><b>ECS</b>: điều phối container của AWS. <b>EKS</b>: Kubernetes. <b>ECR</b>: lưu image. <b>Fargate</b>: chạy container serverless.</li>
<li><b>AWS Batch</b>: job theo lô. <b>Lambda</b>: function theo sự kiện (tối đa 15 phút).</li>
<li>Loại instance: General purpose (cân bằng), Compute optimized (nặng CPU), Memory optimized (nặng RAM), Storage optimized (đọc/ghi đĩa nhiều), Accelerated computing (GPU).</li>
<li><b>Auto Scaling</b> mang lại elasticity. <b>Load balancer</b> chia tải và kiểm tra health của target.</li></ul>` },
  { t: "Storage nâng cao (Task 3.6)", h: `
<table><tr><th>Nhu cầu</th><th>Dịch vụ</th></tr>
<tr><td>Ổ tạm thời rất nhanh, mất khi dừng</td><td>EC2 instance store</td></tr>
<tr><td>File dùng chung cho Windows (SMB)</td><td>Amazon FSx for Windows File Server</td></tr>
<tr><td>File dùng chung cho Linux (NFS)</td><td>Amazon EFS</td></tr>
<tr><td>Hybrid: on-premises dùng lưu trữ cloud (cached)</td><td>AWS Storage Gateway</td></tr>
<tr><td>Tự chuyển lớp lưu trữ hoặc xóa object theo thời gian</td><td>S3 Lifecycle policy</td></tr>
<tr><td>Sao lưu tập trung nhiều dịch vụ</td><td>AWS Backup</td></tr>
<tr><td>Phục hồi thảm họa cho server</td><td>AWS Elastic Disaster Recovery</td></tr></table>` },
  { t: "Database & migration (Task 3.4)", h: `
<ul><li><b>EC2-hosted DB</b>: toàn quyền nhưng tự lo mọi thứ. <b>Managed DB</b> (RDS, Aurora): AWS lo patch, backup, phần cứng.</li>
<li>Relational: RDS, Aurora · NoSQL: DynamoDB · Document (MongoDB): DocumentDB · Graph: Neptune · In-memory: ElastiCache</li>
<li><b>AWS DMS</b>: chuyển dữ liệu, có replicate liên tục, downtime thấp. <b>AWS SCT</b>: chuyển đổi schema khi đổi loại DB.</li></ul>` },
  { t: "AI/ML (Task 3.7)", h: `
<table><tr><th>Việc</th><th>Dịch vụ</th></tr>
<tr><td>Tự xây, huấn luyện mô hình ML</td><td>Amazon SageMaker AI</td></tr>
<tr><td>Trợ lý generative AI</td><td>Amazon Q</td></tr>
<tr><td>Ảnh/video: nhận diện đồ vật, khuôn mặt</td><td>Amazon Rekognition</td></tr>
<tr><td>Trích chữ, bảng, form từ tài liệu</td><td>Amazon Textract</td></tr>
<tr><td>Text → giọng nói</td><td>Amazon Polly</td></tr>
<tr><td>Giọng nói → text</td><td>Amazon Transcribe</td></tr>
<tr><td>Dịch ngôn ngữ</td><td>Amazon Translate</td></tr>
<tr><td>Phân tích văn bản, sentiment</td><td>Amazon Comprehend</td></tr>
<tr><td>Chatbot</td><td>Amazon Lex</td></tr></table>` },
  { t: "Analytics (Task 3.7)", h: `
<table><tr><th>Việc</th><th>Dịch vụ</th></tr>
<tr><td>SQL trực tiếp trên S3 (serverless)</td><td>Amazon Athena</td></tr>
<tr><td>Dữ liệu streaming thời gian thực</td><td>Amazon Kinesis</td></tr>
<tr><td>ETL serverless, data catalog</td><td>AWS Glue</td></tr>
<tr><td>Big data (Spark, Hadoop)</td><td>Amazon EMR</td></tr>
<tr><td>Tìm kiếm, phân tích log</td><td>Amazon OpenSearch Service</td></tr>
<tr><td>Dashboard BI</td><td>Amazon Quick</td></tr>
<tr><td>Data warehouse</td><td>Amazon Redshift</td></tr></table>` },
  { t: "Các nhóm dịch vụ khác (Task 3.8)", h: `
<ul><li><b>Application integration</b>: EventBridge (event bus, lịch chạy), SNS (thông báo pub/sub), SQS (hàng đợi), Step Functions (workflow).</li>
<li><b>Business applications</b>: Amazon Connect (contact center), Amazon SES (gửi email).</li>
<li><b>Developer tools</b>: CodeBuild (build/test), CodePipeline (CI/CD), X-Ray (truy vết), AWS CLI.</li>
<li><b>End-user computing</b>: WorkSpaces (desktop ảo), WorkSpaces Applications, tên cũ AppStream 2.0 (stream ứng dụng), WorkSpaces Secure Browser (trình duyệt an toàn).</li>
<li><b>Frontend web & mobile</b>: AWS Amplify. <b>IoT</b>: AWS IoT Core.</li>
<li><b>Customer enablement</b>: AWS Support.</li></ul>` },
  { t: "Networking nâng cao (Task 3.5)", h: `
<table><tr><th>Dịch vụ</th><th>Dùng khi</th></tr>
<tr><td>Public / private subnet</td><td>Public subnet có route ra internet gateway. Private subnet thì không.</td></tr>
<tr><td>Amazon API Gateway</td><td>Tạo và công bố API</td></tr>
<tr><td>AWS Global Accelerator</td><td>IP tĩnh, đi qua mạng AWS, không cache</td></tr>
<tr><td>AWS Transit Gateway</td><td>Hub kết nối nhiều VPC và on-premises</td></tr>
<tr><td>AWS PrivateLink</td><td>Truy cập dịch vụ riêng tư, không qua internet</td></tr>
<tr><td>Site-to-Site VPN / Client VPN</td><td>Kết nối cả mạng / từng người dùng</td></tr></table>` },
  { t: "Management & governance", h: `
<table><tr><th>Dịch vụ</th><th>Chức năng</th></tr>
<tr><td>AWS Control Tower</td><td>Landing zone nhiều tài khoản theo best practice</td></tr>
<tr><td>AWS Organizations</td><td>Quản lý nhiều tài khoản, SCP, consolidated billing</td></tr>
<tr><td>AWS Service Catalog</td><td>Danh mục IT nội bộ đã được duyệt</td></tr>
<tr><td>Service Quotas</td><td>Xem và tăng giới hạn tài nguyên</td></tr>
<tr><td>AWS Compute Optimizer</td><td>Khuyến nghị rightsizing</td></tr>
<tr><td>AWS Health Dashboard</td><td>Sự kiện dịch vụ ảnh hưởng đến tài khoản</td></tr>
<tr><td>AWS Well-Architected Tool</td><td>Review hệ thống theo framework</td></tr>
<tr><td>AWS License Manager</td><td>Quản lý license</td></tr>
<tr><td>AWS Systems Manager</td><td>Vận hành instance: patch, chạy lệnh, Parameter Store</td></tr></table>` }
);
L[4].push(
  { t: "Thêm về lựa chọn mua EC2 (Task 4.1)", h: `
<ul><li><b>Dedicated Instances</b>: phần cứng riêng, không thấy được server. <b>Dedicated Hosts</b>: thấy và kiểm soát socket/core, phù hợp BYOL.</li>
<li><b>On-Demand Capacity Reservations</b>: giữ công suất ở 1 AZ, không cam kết, tính giá On-Demand.</li>
<li><b>Standard RI</b>: giảm nhiều nhất, ít linh hoạt. <b>Convertible RI</b>: đổi được họ instance, giảm ít hơn. Regional RI linh hoạt về kích thước trong cùng họ instance.</li>
<li>Trong Organizations, giảm giá của RI và Savings Plans <b>được chia sẻ</b> giữa các tài khoản (mặc định).</li></ul>` },
  { t: "Chi phí truyền dữ liệu", h: `
<table><tr><th>Loại</th><th>Phí</th></tr>
<tr><td>Từ internet vào AWS</td><td>Miễn phí</td></tr>
<tr><td>Từ AWS ra internet</td><td>Tính phí</td></tr>
<tr><td>Giữa các Region</td><td>Tính phí</td></tr>
<tr><td>Giữa các AZ trong cùng Region</td><td>Tính phí (thấp)</td></tr>
<tr><td>Trong cùng AZ qua IP private</td><td>Miễn phí</td></tr></table>` },
  { t: "Billing nâng cao (Task 4.2)", h: `
<ul><li><b>Cost and Usage Report</b>: dữ liệu chi tiết nhất, gửi vào S3.</li>
<li><b>Cost allocation tags</b>: có 2 loại, AWS-generated và user-defined. Phải <b>activate</b> trong Billing mới hiện trong báo cáo.</li>
<li><b>Budgets</b>: cảnh báo. <b>Cost Explorer</b>: phân tích, dự báo. <b>Pricing Calculator</b>: ước tính trước.</li></ul>` },
  { t: "Tài nguyên kỹ thuật & đối tác (Task 4.3)", h: `
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
<tr><td>AWS Marketplace</td><td>Mua phần mềm bên thứ ba (quản lý chi phí, governance, entitlement)</td></tr></table>` }
);
})();
