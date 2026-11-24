/* Nội dung ôn thi CLF-C02.
 * Thêm câu hỏi mới: copy một object trong `questions`, đổi id (không trùng), sửa nội dung.
 * - d: domain (1-4)
 * - opts: [["English", "Tiếng Việt"], ...]
 * - ans: chỉ số đáp án đúng (bắt đầu từ 0). Nhiều đáp án → câu "Choose TWO".
 * - why: giải thích từng lựa chọn (cùng thứ tự với opts)
 */
window.CLF = {
  domains: [
    { id: 1, en: "Cloud Concepts", vi: "Khái niệm Cloud", weight: 24 },
    { id: 2, en: "Security and Compliance", vi: "Bảo mật & Tuân thủ", weight: 30 },
    { id: 3, en: "Cloud Technology and Services", vi: "Công nghệ & Dịch vụ", weight: 34 },
    { id: 4, en: "Billing, Pricing, and Support", vi: "Chi phí, Giá & Hỗ trợ", weight: 12 }
  ],

  questions: [
    // ───────── Domain 1 ─────────
    {
      id: "d1-1", d: 1,
      en: "A company wants to stop buying servers upfront and pay only for the IT resources it consumes. Which advantage of cloud computing does this describe?",
      vi: "Một công ty muốn ngừng mua máy chủ trả trước và chỉ trả tiền cho tài nguyên IT thực sự sử dụng. Đây là lợi ích nào của điện toán đám mây?",
      opts: [
        ["Trade fixed expense for variable expense", "Chuyển chi phí cố định thành chi phí biến đổi"],
        ["Benefit from massive economies of scale", "Hưởng lợi từ quy mô kinh tế lớn"],
        ["Go global in minutes", "Mở rộng toàn cầu trong vài phút"],
        ["Increase speed and agility", "Tăng tốc độ và sự linh hoạt"]
      ],
      ans: [0],
      exp: "Mua phần cứng trả trước (upfront) là chi phí cố định. Trả theo mức dùng (pay-as-you-go) là chi phí biến đổi.",
      why: [
        "Đúng: bỏ chi phí trả trước, chỉ trả theo mức sử dụng thực tế.",
        "Sai: nói về việc AWS mua số lượng cực lớn nên giá cho mọi khách hàng rẻ hơn.",
        "Sai: nói về việc triển khai ứng dụng ra nhiều Region trên thế giới nhanh chóng.",
        "Sai: nói về việc tạo tài nguyên mới trong vài phút, thử nghiệm nhanh."
      ]
    },
    {
      id: "d1-2", d: 1,
      en: "Which pillar of the AWS Well-Architected Framework focuses on the ability of a workload to recover from failures and meet demand?",
      vi: "Trụ cột nào của AWS Well-Architected Framework tập trung vào khả năng của hệ thống phục hồi sau sự cố và đáp ứng nhu cầu?",
      opts: [
        ["Reliability", "Độ tin cậy"],
        ["Performance Efficiency", "Hiệu quả hiệu năng"],
        ["Operational Excellence", "Vận hành xuất sắc"],
        ["Sustainability", "Bền vững"]
      ],
      ans: [0],
      exp: "Thấy “recover from failures” thì nghĩ ngay đến Reliability.",
      why: [
        "Đúng: Reliability gồm phục hồi sau sự cố, tự động phục hồi, đáp ứng nhu cầu.",
        "Sai: Performance Efficiency là dùng tài nguyên hiệu quả, chọn đúng loại và kích thước.",
        "Sai: Operational Excellence là vận hành, giám sát và cải tiến quy trình (ví dụ dùng IaC).",
        "Sai: Sustainability là giảm tác động tới môi trường."
      ]
    },
    {
      id: "d1-3", d: 1,
      en: "A company wants to migrate an application to AWS as quickly as possible without making any changes to the application. Which migration strategy should the company use?",
      vi: "Một công ty muốn di chuyển ứng dụng lên AWS nhanh nhất có thể mà không thay đổi gì ở ứng dụng. Nên dùng chiến lược migration nào?",
      opts: [
        ["Rehost", "Rehost (chuyển nguyên trạng)"],
        ["Replatform", "Replatform (tối ưu nhỏ)"],
        ["Refactor", "Refactor (viết lại kiến trúc)"],
        ["Retire", "Retire (loại bỏ)"]
      ],
      ans: [0],
      exp: "Rehost còn gọi là “lift-and-shift”: bê nguyên ứng dụng lên cloud, không sửa gì.",
      why: [
        "Đúng: nhanh nhất, không thay đổi ứng dụng.",
        "Sai: Replatform có tối ưu nhỏ (ví dụ chuyển database sang Amazon RDS).",
        "Sai: Refactor viết lại kiến trúc (ví dụ sang serverless), tốn nhiều thời gian nhất.",
        "Sai: Retire là tắt bỏ ứng dụng không còn cần."
      ]
    },
    {
      id: "d1-4", d: 1,
      en: "Which cloud concept describes the ability to automatically acquire resources when demand increases and release them when demand decreases?",
      vi: "Khái niệm nào mô tả khả năng tự động lấy thêm tài nguyên khi nhu cầu tăng và trả lại khi nhu cầu giảm?",
      opts: [
        ["Elasticity", "Tính co giãn"],
        ["Fault tolerance", "Khả năng chịu lỗi"],
        ["High availability", "Tính sẵn sàng cao"],
        ["Durability", "Độ bền dữ liệu"]
      ],
      ans: [0],
      exp: "Elasticity là co giãn theo nhu cầu, tự động cả chiều tăng lẫn chiều giảm.",
      why: [
        "Đúng: tự động tăng/giảm theo nhu cầu.",
        "Sai: Fault tolerance là hệ thống vẫn hoạt động khi một thành phần bị hỏng.",
        "Sai: High availability là hệ thống luôn sẵn sàng, ít downtime (ví dụ chạy Multi-AZ).",
        "Sai: Durability là dữ liệu không bị mất (S3 có độ bền 99.999999999%)."
      ]
    },
    {
      id: "d1-5", d: 1,
      en: "Which of the following are perspectives of the AWS Cloud Adoption Framework (AWS CAF)? (Choose TWO.)",
      vi: "Những mục nào là góc nhìn (perspective) của AWS Cloud Adoption Framework (AWS CAF)? (Chọn 2.)",
      opts: [
        ["Business", "Kinh doanh"],
        ["Security", "Bảo mật"],
        ["Cost Optimization", "Tối ưu chi phí"],
        ["Networking", "Mạng"],
        ["Sustainability", "Bền vững"]
      ],
      ans: [0, 1],
      exp: "AWS CAF có 6 perspective: Business, People, Governance, Platform, Security, Operations.",
      why: [
        "Đúng: Business perspective giúp đảm bảo đầu tư cloud phục vụ mục tiêu kinh doanh.",
        "Đúng: Security perspective lo tính bảo mật, toàn vẹn và sẵn sàng của dữ liệu và workload.",
        "Sai: Cost Optimization là trụ cột của Well-Architected Framework, không phải perspective của CAF.",
        "Sai: networking là một phần của Platform perspective, không phải perspective riêng.",
        "Sai: Sustainability là trụ cột của Well-Architected Framework, không phải perspective của CAF."
      ]
    },

    // ───────── Domain 2 ─────────
    {
      id: "d2-1", d: 2,
      en: "Under the AWS shared responsibility model, which tasks are the customer's responsibility? (Choose TWO.)",
      vi: "Theo mô hình trách nhiệm chia sẻ của AWS, việc nào thuộc trách nhiệm của khách hàng? (Chọn 2.)",
      opts: [
        ["Configuring security groups", "Cấu hình security group"],
        ["Patching the guest operating system on Amazon EC2 instances", "Vá lỗi hệ điều hành bên trong instance EC2"],
        ["Physical security of data centers", "Bảo mật vật lý của trung tâm dữ liệu"],
        ["Maintaining the hypervisor", "Bảo trì lớp ảo hóa (hypervisor)"],
        ["Replacing failed hardware", "Thay phần cứng hỏng"]
      ],
      ans: [0, 1],
      exp: "AWS lo bảo mật “OF the cloud” (phần cứng, data center, hypervisor). Khách hàng lo bảo mật “IN the cloud” (OS của EC2, dữ liệu, IAM, security group).",
      why: [
        "Đúng: cấu hình mạng và tường lửa là việc của khách hàng.",
        "Đúng: với EC2, khách hàng tự vá hệ điều hành.",
        "Sai: bảo mật vật lý data center là phần “OF the cloud” do AWS chịu trách nhiệm.",
        "Sai: hypervisor là lớp ảo hóa do AWS quản lý, khách hàng không truy cập được.",
        "Sai: phần cứng vật lý thuộc hạ tầng do AWS bảo trì và thay thế."
      ]
    },
    {
      id: "d2-2", d: 2,
      en: "Which is a best practice for securing the AWS account root user?",
      vi: "Đâu là thực hành tốt nhất để bảo vệ tài khoản root user của AWS?",
      opts: [
        ["Enable MFA and avoid using the root user for everyday tasks", "Bật MFA và không dùng root user cho công việc hằng ngày"],
        ["Attach an IAM policy to the root user to restrict its permissions", "Gắn IAM policy cho root user để giới hạn quyền của nó"],
        ["Create access keys for the root user to use in automation scripts", "Tạo access key cho root user để dùng trong script tự động"],
        ["Use a strong password without MFA, since CloudTrail logs root activity", "Dùng mật khẩu mạnh, không cần MFA vì CloudTrail đã ghi lại hoạt động của root"]
      ],
      ans: [0],
      exp: "Root user có toàn quyền. Hãy bật MFA, không tạo access key cho root, và dùng IAM user/role cho công việc hằng ngày.",
      why: [
        "Đúng: MFA thêm lớp bảo vệ khi đăng nhập, và hạn chế dùng root giảm rủi ro lộ thông tin có toàn quyền.",
        "Sai: không thể gắn IAM policy cho root user; root luôn có toàn quyền trong tài khoản của nó.",
        "Sai: AWS khuyến nghị không tạo access key cho root vì key dài hạn có toàn quyền rất dễ bị lộ.",
        "Sai: CloudTrail chỉ ghi lại sau khi sự việc xảy ra, không ngăn được việc mật khẩu root bị đánh cắp; vẫn cần MFA."
      ]
    },
    {
      id: "d2-3", d: 2,
      en: "A company's auditor needs to download AWS compliance reports, such as SOC and PCI reports. Which AWS service provides these documents?",
      vi: "Kiểm toán viên của công ty cần tải báo cáo tuân thủ của AWS như SOC và PCI. Dịch vụ nào cung cấp các tài liệu này?",
      opts: [
        ["AWS Artifact", "AWS Artifact"],
        ["AWS Config", "AWS Config"],
        ["Amazon Inspector", "Amazon Inspector"],
        ["AWS Trusted Advisor", "AWS Trusted Advisor"]
      ],
      ans: [0],
      exp: "Thấy “compliance reports” hoặc “agreements” thì nghĩ đến AWS Artifact.",
      why: [
        "Đúng: là cổng tải báo cáo tuân thủ và thỏa thuận (agreements).",
        "Sai: Config ghi lại lịch sử cấu hình tài nguyên và kiểm tra quy tắc.",
        "Sai: Inspector quét lỗ hổng phần mềm trên EC2, container image, Lambda.",
        "Sai: Trusted Advisor đưa khuyến nghị tối ưu chi phí, bảo mật, hiệu năng."
      ]
    },
    {
      id: "d2-4", d: 2,
      en: "Which AWS service records API calls made in an AWS account so that a company can audit who did what and when?",
      vi: "Dịch vụ nào ghi lại các lời gọi API trong tài khoản AWS để công ty kiểm tra ai đã làm gì, khi nào?",
      opts: [
        ["AWS CloudTrail", "AWS CloudTrail"],
        ["Amazon CloudWatch", "Amazon CloudWatch"],
        ["AWS Config", "AWS Config"],
        ["AWS X-Ray", "AWS X-Ray"]
      ],
      ans: [0],
      exp: "Mẹo nhớ: CloudTrail là “dấu vết” (trail) của ai làm gì. CloudWatch là “theo dõi” (watch) hiệu năng.",
      why: [
        "Đúng: CloudTrail ghi lại mọi lời gọi API (ai, làm gì, khi nào, từ đâu) để phục vụ kiểm toán.",
        "Sai: CloudWatch theo dõi metric, log và alarm (hiệu năng).",
        "Sai: Config ghi lại thay đổi cấu hình của tài nguyên, không phải ai gọi API.",
        "Sai: X-Ray truy vết request trong ứng dụng phân tán để debug."
      ]
    },
    {
      id: "d2-5", d: 2,
      en: "Which AWS service helps protect a web application from common attacks such as SQL injection and cross-site scripting?",
      vi: "Dịch vụ nào giúp bảo vệ ứng dụng web khỏi các tấn công phổ biến như SQL injection và cross-site scripting?",
      opts: [
        ["AWS WAF", "AWS WAF"],
        ["AWS Shield Standard", "AWS Shield Standard"],
        ["Amazon GuardDuty", "Amazon GuardDuty"],
        ["Amazon Macie", "Amazon Macie"]
      ],
      ans: [0],
      exp: "WAF là tường lửa ứng dụng web (lớp 7), lọc request theo rule. Shield là để chống DDoS.",
      why: [
        "Đúng: WAF lọc request HTTP/HTTPS theo rule, có sẵn rule chặn SQL injection và XSS.",
        "Sai: Shield chống DDoS. Bản Standard được bật miễn phí cho mọi khách hàng.",
        "Sai: GuardDuty phát hiện mối đe dọa từ log, không chặn request.",
        "Sai: Macie tìm dữ liệu nhạy cảm (PII) trong S3."
      ]
    },
    {
      id: "d2-6", d: 2,
      en: "Which AWS service uses machine learning to continuously analyze AWS CloudTrail events, VPC Flow Logs, and DNS logs to detect threats?",
      vi: "Dịch vụ nào dùng machine learning để liên tục phân tích sự kiện CloudTrail, VPC Flow Logs và DNS logs nhằm phát hiện mối đe dọa?",
      opts: [
        ["Amazon GuardDuty", "Amazon GuardDuty"],
        ["Amazon Inspector", "Amazon Inspector"],
        ["Amazon Macie", "Amazon Macie"],
        ["AWS Shield Advanced", "AWS Shield Advanced"]
      ],
      ans: [0],
      exp: "GuardDuty là dịch vụ phát hiện mối đe dọa (threat detection) dựa trên log.",
      why: [
        "Đúng: GuardDuty dùng ML phân tích CloudTrail, VPC Flow Logs và DNS logs để phát hiện mối đe dọa.",
        "Sai: Inspector quét lỗ hổng (vulnerability) phần mềm.",
        "Sai: Macie tìm dữ liệu nhạy cảm trong S3.",
        "Sai: Shield Advanced chống DDoS nâng cao, có đội hỗ trợ DDoS 24/7."
      ]
    },
    {
      id: "d2-7", d: 2,
      en: "An application running on an Amazon EC2 instance needs to read objects from Amazon S3. What is the MOST secure way to grant this access?",
      vi: "Ứng dụng chạy trên EC2 cần đọc object từ S3. Cách cấp quyền an toàn nhất là gì?",
      opts: [
        ["Attach an IAM role to the EC2 instance", "Gắn IAM role cho instance EC2"],
        ["Store an IAM user's access keys on the instance", "Lưu access key của IAM user trên instance"],
        ["Allow the instance's public IP address in the S3 bucket policy", "Cho phép địa chỉ IP public của instance trong bucket policy của S3"],
        ["Open the security group to allow all outbound traffic", "Mở security group cho phép mọi lưu lượng đi ra"]
      ],
      ans: [0],
      exp: "IAM role cấp quyền tạm thời và tự động xoay vòng (rotate), không cần lưu key trên máy.",
      why: [
        "Đúng: role cấp credential tạm thời, tự xoay vòng, không phải lưu key trên instance.",
        "Sai: access key dài hạn lưu cố định trên máy dễ bị lộ và phải tự xoay vòng.",
        "Sai: lọc theo IP không xác thực danh tính, IP public có thể thay đổi và mọi thứ chạy từ IP đó đều được truy cập.",
        "Sai: security group chỉ kiểm soát mạng, không cấp quyền IAM để đọc S3."
      ]
    },

    // ───────── Domain 3 ─────────
    {
      id: "d3-1", d: 3,
      en: "Which of the following best describes an Availability Zone?",
      vi: "Mô tả nào đúng nhất về Availability Zone?",
      opts: [
        ["One or more discrete data centers with redundant power and networking in a Region", "Một hoặc nhiều data center tách biệt, có nguồn điện và mạng dự phòng, nằm trong một Region"],
        ["A large geographic area, such as a continent, that contains multiple Regions", "Một khu vực địa lý lớn (ví dụ một châu lục) chứa nhiều Region"],
        ["A site in a major city that Amazon CloudFront uses to cache content near end users", "Địa điểm ở các thành phố lớn mà CloudFront dùng để cache nội dung gần người dùng"],
        ["A logically isolated virtual network that a customer defines inside a Region", "Một mạng ảo cô lập về logic do khách hàng tự định nghĩa trong một Region"]
      ],
      ans: [0],
      exp: "Thứ tự từ lớn đến nhỏ: Region chứa nhiều AZ (thường từ 3 trở lên), mỗi AZ gồm 1 hoặc nhiều data center. Edge location là điểm cache của CloudFront.",
      why: [
        "Đúng: AZ là một hoặc nhiều data center tách biệt, có nguồn điện và mạng dự phòng, nằm trong một Region.",
        "Sai: ngược lại, Region mới là khu vực địa lý, chứa nhiều AZ; AWS không có cấp “chứa nhiều Region”.",
        "Sai: đó là edge location, điểm cache của CloudFront, không phải nơi chạy tài nguyên như EC2.",
        "Sai: đó là Amazon VPC, một mạng ảo trải trên các AZ của Region."
      ]
    },
    {
      id: "d3-2", d: 3,
      en: "Which AWS service lets a company run code without provisioning or managing servers and pay only for the compute time used?",
      vi: "Dịch vụ nào cho phép chạy code mà không cần cấp phát hay quản lý máy chủ, và chỉ trả tiền cho thời gian tính toán đã dùng?",
      opts: [
        ["AWS Lambda", "AWS Lambda"],
        ["Amazon EC2", "Amazon EC2"],
        ["AWS Elastic Beanstalk", "AWS Elastic Beanstalk"],
        ["Amazon Lightsail", "Amazon Lightsail"]
      ],
      ans: [0],
      exp: "Thấy “without provisioning or managing servers” thì nghĩ đến serverless, tức là Lambda (hoặc Fargate cho container).",
      why: [
        "Đúng: Lambda là serverless, chạy code theo sự kiện và tính tiền theo thời gian chạy.",
        "Sai: EC2 là máy ảo, khách hàng tự quản lý.",
        "Sai: Beanstalk (PaaS) tự dựng EC2 giúp bạn, nhưng vẫn có server và tính tiền theo EC2.",
        "Sai: Lightsail là VPS giá cố định hằng tháng, dễ dùng."
      ]
    },
    {
      id: "d3-3", d: 3,
      en: "A company must keep archive data for 7 years. The data is rarely accessed, and a retrieval time of up to 12 hours is acceptable. Which Amazon S3 storage class is the MOST cost-effective?",
      vi: "Công ty phải lưu dữ liệu lưu trữ trong 7 năm. Dữ liệu hiếm khi được truy cập, chấp nhận thời gian lấy ra tới 12 giờ. Lớp lưu trữ S3 nào tiết kiệm nhất?",
      opts: [
        ["S3 Glacier Deep Archive", "S3 Glacier Deep Archive"],
        ["S3 Standard", "S3 Standard"],
        ["S3 Standard-Infrequent Access", "S3 Standard-IA"],
        ["S3 Glacier Instant Retrieval", "S3 Glacier Instant Retrieval"]
      ],
      ans: [0],
      exp: "Lưu lâu, hiếm khi dùng và chấp nhận chờ nhiều giờ thì chọn Deep Archive, lớp rẻ nhất của S3.",
      why: [
        "Đúng: Deep Archive có giá lưu trữ thấp nhất, thời gian lấy dữ liệu trong vòng 12 giờ là đủ đáp ứng.",
        "Sai: Standard dành cho dữ liệu dùng thường xuyên, giá cao nhất.",
        "Sai: Standard-IA dành cho dữ liệu ít dùng nhưng cần lấy ngay, đắt hơn Glacier.",
        "Sai: Instant Retrieval lấy ra trong mili-giây nên đắt hơn Deep Archive. Đề không cần lấy nhanh."
      ]
    },
    {
      id: "d3-4", d: 3,
      en: "Which AWS service is a fully managed NoSQL database that delivers single-digit millisecond performance at any scale?",
      vi: "Dịch vụ nào là cơ sở dữ liệu NoSQL được quản lý hoàn toàn, cho hiệu năng vài mili-giây ở mọi quy mô?",
      opts: [
        ["Amazon DynamoDB", "Amazon DynamoDB"],
        ["Amazon RDS", "Amazon RDS"],
        ["Amazon Redshift", "Amazon Redshift"],
        ["Amazon Aurora", "Amazon Aurora"]
      ],
      ans: [0],
      exp: "NoSQL và key-value là DynamoDB. Quan hệ (SQL) là RDS hoặc Aurora. Kho dữ liệu phân tích là Redshift.",
      why: [
        "Đúng: DynamoDB là NoSQL key-value serverless, độ trễ vài mili-giây ở mọi quy mô.",
        "Sai: RDS là cơ sở dữ liệu quan hệ (MySQL, PostgreSQL...).",
        "Sai: Redshift là data warehouse cho phân tích (OLAP).",
        "Sai: Aurora là cơ sở dữ liệu quan hệ do AWS phát triển, tương thích MySQL/PostgreSQL."
      ]
    },
    {
      id: "d3-5", d: 3,
      en: "A company wants to reduce latency for users around the world by caching static content at edge locations. Which AWS service should the company use?",
      vi: "Công ty muốn giảm độ trễ cho người dùng toàn cầu bằng cách cache nội dung tĩnh tại các edge location. Nên dùng dịch vụ nào?",
      opts: [
        ["Amazon CloudFront", "Amazon CloudFront"],
        ["Amazon Route 53", "Amazon Route 53"],
        ["AWS Direct Connect", "AWS Direct Connect"],
        ["Elastic Load Balancing", "Elastic Load Balancing"]
      ],
      ans: [0],
      exp: "CloudFront là CDN (mạng phân phối nội dung), cache nội dung tại edge location.",
      why: [
        "Đúng: CloudFront là CDN, cache nội dung tại edge location gần người dùng để giảm độ trễ.",
        "Sai: Route 53 là DNS (phân giải tên miền), không cache nội dung.",
        "Sai: Direct Connect là đường truyền riêng từ on-premises tới AWS.",
        "Sai: ELB phân phối traffic tới nhiều server trong một Region."
      ]
    },
    {
      id: "d3-6", d: 3,
      en: "Which AWS service automatically distributes incoming traffic across multiple Amazon EC2 instances?",
      vi: "Dịch vụ nào tự động phân phối lưu lượng truy cập đến qua nhiều instance EC2?",
      opts: [
        ["Elastic Load Balancing", "Elastic Load Balancing"],
        ["Amazon EC2 Auto Scaling", "Amazon EC2 Auto Scaling"],
        ["Amazon VPC", "Amazon VPC"],
        ["AWS Direct Connect", "AWS Direct Connect"]
      ],
      ans: [0],
      exp: "ELB chia tải. Auto Scaling thay đổi số lượng instance. Hai dịch vụ này thường dùng cùng nhau.",
      why: [
        "Đúng: ELB nhận traffic và phân phối tới nhiều target khỏe mạnh (EC2, container, IP).",
        "Sai: Auto Scaling tăng/giảm số instance, không chia traffic.",
        "Sai: VPC là mạng riêng ảo chứa tài nguyên, không tự phân phối traffic giữa các instance.",
        "Sai: Direct Connect là đường kết nối riêng từ on-premises tới AWS, không cân bằng tải."
      ]
    },
    {
      id: "d3-7", d: 3,
      en: "A company needs a dedicated private network connection from its on-premises data center to AWS that does not go over the public internet. Which service meets this requirement?",
      vi: "Công ty cần kết nối mạng riêng chuyên dụng từ data center tại chỗ tới AWS, không đi qua internet công cộng. Dịch vụ nào đáp ứng?",
      opts: [
        ["AWS Direct Connect", "AWS Direct Connect"],
        ["AWS Site-to-Site VPN", "AWS Site-to-Site VPN"],
        ["Internet gateway", "Internet gateway"],
        ["VPC peering", "VPC peering"]
      ],
      ans: [0],
      exp: "Thấy “dedicated” và “not over the public internet” thì chọn Direct Connect. VPN thì đi qua internet nhưng được mã hóa.",
      why: [
        "Đúng: Direct Connect là đường truyền vật lý riêng, không đi qua internet công cộng.",
        "Sai: VPN đi qua internet công cộng (có mã hóa). Bù lại triển khai nhanh, rẻ.",
        "Sai: Internet gateway cho VPC kết nối ra internet.",
        "Sai: VPC peering kết nối hai VPC với nhau."
      ]
    },

    // ───────── Domain 4 ─────────
    {
      id: "d4-1", d: 4,
      en: "A company has a steady-state workload that will run continuously for the next 3 years and cannot be interrupted. Which EC2 pricing option is the MOST cost-effective?",
      vi: "Công ty có tải ổn định, chạy liên tục trong 3 năm tới và không được gián đoạn. Lựa chọn giá EC2 nào tiết kiệm nhất?",
      opts: [
        ["Reserved Instances", "Reserved Instances"],
        ["On-Demand Instances", "On-Demand Instances"],
        ["Spot Instances", "Spot Instances"],
        ["Dedicated Hosts", "Dedicated Hosts"]
      ],
      ans: [0],
      exp: "Tải ổn định và cam kết dài hạn (1 hoặc 3 năm) thì chọn Reserved Instances hoặc Savings Plans, giảm tới khoảng 72%.",
      why: [
        "Đúng: cam kết 3 năm cho tải ổn định giúp giảm giá nhiều so với On-Demand mà không bị gián đoạn.",
        "Sai: On-Demand linh hoạt nhưng đắt nhất về lâu dài.",
        "Sai: Spot rẻ nhất nhưng có thể bị thu hồi, mà đề yêu cầu không được gián đoạn.",
        "Sai: Dedicated Hosts dùng khi cần server vật lý riêng (license, tuân thủ), đắt."
      ]
    },
    {
      id: "d4-2", d: 4,
      en: "A company runs fault-tolerant batch processing jobs that can be interrupted and restarted at any time. Which EC2 purchasing option provides the lowest cost?",
      vi: "Công ty chạy job xử lý theo lô có khả năng chịu lỗi, có thể bị gián đoạn và chạy lại bất cứ lúc nào. Lựa chọn mua EC2 nào rẻ nhất?",
      opts: [
        ["Spot Instances", "Spot Instances"],
        ["Reserved Instances", "Reserved Instances"],
        ["On-Demand Instances", "On-Demand Instances"],
        ["Dedicated Instances", "Dedicated Instances"]
      ],
      ans: [0],
      exp: "Thấy “can be interrupted” hoặc “fault-tolerant” thì chọn Spot, giảm tới khoảng 90%. AWS báo trước 2 phút trước khi thu hồi.",
      why: [
        "Đúng: Spot dùng công suất dư của AWS, rẻ nhất, hợp với job chịu được việc bị thu hồi.",
        "Sai: Reserved cần cam kết dài hạn, không rẻ bằng Spot.",
        "Sai: On-Demand đắt hơn Spot.",
        "Sai: Dedicated Instances chạy trên phần cứng riêng, đắt."
      ]
    },
    {
      id: "d4-3", d: 4,
      en: "A company wants to receive an alert when its AWS costs exceed a specific threshold. Which AWS service should it use?",
      vi: "Công ty muốn nhận cảnh báo khi chi phí AWS vượt một ngưỡng nhất định. Nên dùng dịch vụ nào?",
      opts: [
        ["AWS Budgets", "AWS Budgets"],
        ["AWS Cost Explorer", "AWS Cost Explorer"],
        ["AWS Pricing Calculator", "AWS Pricing Calculator"],
        ["AWS Cost and Usage Report", "AWS Cost and Usage Report"]
      ],
      ans: [0],
      exp: "Budgets dùng để đặt ngân sách và cảnh báo khi vượt (hoặc dự báo sẽ vượt).",
      why: [
        "Đúng: Budgets đặt ngưỡng chi phí và gửi cảnh báo khi chi phí thực tế hoặc dự báo vượt ngưỡng.",
        "Sai: Cost Explorer dùng để xem và phân tích chi phí quá khứ, có dự báo, nhưng không phải công cụ cảnh báo chính.",
        "Sai: Pricing Calculator ước tính chi phí trước khi dùng.",
        "Sai: CUR là báo cáo chi tiết nhất về chi phí và mức dùng (file dữ liệu)."
      ]
    },
    {
      id: "d4-4", d: 4,
      en: "A company wants to estimate the monthly cost of running its workload on AWS before migrating from on-premises. Which tool should it use?",
      vi: "Công ty muốn ước tính chi phí hằng tháng khi chạy hệ thống trên AWS trước khi di chuyển từ on-premises. Nên dùng công cụ nào?",
      opts: [
        ["AWS Pricing Calculator", "AWS Pricing Calculator"],
        ["AWS Cost Explorer", "AWS Cost Explorer"],
        ["AWS Budgets", "AWS Budgets"],
        ["AWS Trusted Advisor", "AWS Trusted Advisor"]
      ],
      ans: [0],
      exp: "Chưa dùng AWS mà muốn ước tính thì dùng Pricing Calculator. Đã dùng rồi, muốn phân tích thì dùng Cost Explorer.",
      why: [
        "Đúng: Pricing Calculator ước tính chi phí của kiến trúc dự kiến khi chưa chạy gì trên AWS.",
        "Sai: Cost Explorer phân tích chi phí đã phát sinh.",
        "Sai: Budgets đặt ngân sách và cảnh báo cho chi phí thực tế, không ước tính trước khi migration.",
        "Sai: Trusted Advisor khuyến nghị tối ưu cho tài nguyên đang chạy."
      ]
    },
    {
      id: "d4-5", d: 4,
      en: "A company has multiple AWS accounts and wants a single bill and volume discounts based on the combined usage of all accounts. Which feature should it use?",
      vi: "Công ty có nhiều tài khoản AWS và muốn một hóa đơn duy nhất, được giảm giá theo khối lượng dựa trên mức dùng gộp của mọi tài khoản. Nên dùng tính năng nào?",
      opts: [
        ["Consolidated billing in AWS Organizations", "Consolidated billing của AWS Organizations"],
        ["AWS Budgets with one shared budget for all accounts", "AWS Budgets với một ngân sách chung cho mọi tài khoản"],
        ["Cost allocation tags in AWS Cost Explorer", "Cost allocation tag trong AWS Cost Explorer"],
        ["AWS Trusted Advisor", "AWS Trusted Advisor"]
      ],
      ans: [0],
      exp: "Consolidated billing gộp hóa đơn, cộng dồn mức dùng để đạt bậc giảm giá (ví dụ S3 theo bậc dung lượng), và không tốn thêm phí.",
      why: [
        "Đúng: consolidated billing gộp hóa đơn của mọi tài khoản và cộng dồn mức dùng để đạt bậc giảm giá.",
        "Sai: Budgets chỉ theo dõi và cảnh báo chi phí, không gộp hóa đơn hay tạo giảm giá theo khối lượng.",
        "Sai: tag giúp phân bổ và xem chi phí theo dự án, không gộp hóa đơn của nhiều tài khoản.",
        "Sai: Trusted Advisor đưa khuyến nghị tối ưu, không liên quan đến việc gộp hóa đơn."
      ]
    },
    {
      id: "d4-6", d: 4,
      en: "Which factors affect the cost of using Amazon S3? (Choose TWO.)",
      vi: "Những yếu tố nào ảnh hưởng đến chi phí dùng Amazon S3? (Chọn 2.)",
      opts: [
        ["The amount of data stored", "Dung lượng dữ liệu lưu trữ"],
        ["Data transfer out to the internet", "Dữ liệu truyền ra internet"],
        ["Data transfer in from the internet", "Dữ liệu truyền vào từ internet"],
        ["Data transfer from S3 to Amazon EC2 in the same Region", "Dữ liệu truyền từ S3 tới EC2 trong cùng Region"],
        ["Turning on S3 Block Public Access for a bucket", "Bật S3 Block Public Access cho bucket"]
      ],
      ans: [0, 1],
      exp: "Chi phí S3 gồm: dung lượng lưu trữ, lớp lưu trữ (storage class), số request, và data transfer OUT. Data transfer IN thì miễn phí.",
      why: [
        "Đúng: S3 tính phí theo GB lưu trữ mỗi tháng (giá khác nhau theo storage class).",
        "Đúng: dữ liệu truyền từ S3 ra internet bị tính phí theo GB.",
        "Sai: dữ liệu vào AWS từ internet miễn phí.",
        "Sai: truyền dữ liệu từ S3 tới EC2 trong cùng Region không mất phí data transfer.",
        "Sai: Block Public Access là thiết lập bảo mật miễn phí, không ảnh hưởng chi phí."
      ]
    }
  ],

  /* Từ khóa trong đề: được tô màu trong câu hỏi + dùng làm flashcard từ vựng */
  glossary: [
    { term: "upfront", vi: "trả trước", hint: "Chi phí cố định (CapEx)" },
    { term: "pay only for", vi: "chỉ trả tiền cho phần dùng", hint: "Pay-as-you-go → chi phí biến đổi" },
    { term: "workload", vi: "hệ thống/ứng dụng đang chạy", hint: "" },
    { term: "recover from failures", vi: "phục hồi sau sự cố", hint: "Well-Architected → Reliability" },
    { term: "migrate", vi: "di chuyển (lên cloud)", hint: "Chiến lược 7R" },
    { term: "without making any changes", vi: "không thay đổi gì", hint: "Rehost (lift-and-shift)" },
    { term: "demand", vi: "nhu cầu, tải", hint: "Elasticity, Auto Scaling" },
    { term: "perspectives", vi: "góc nhìn", hint: "AWS CAF có 6 perspective" },
    { term: "shared responsibility model", vi: "mô hình trách nhiệm chia sẻ", hint: "AWS: OF the cloud · Khách hàng: IN the cloud" },
    { term: "patching", vi: "vá lỗi, cập nhật bản vá", hint: "OS của EC2 → khách hàng; RDS → AWS" },
    { term: "guest operating system", vi: "hệ điều hành bên trong máy ảo", hint: "Trách nhiệm của khách hàng" },
    { term: "physical security", vi: "bảo mật vật lý", hint: "Trách nhiệm của AWS" },
    { term: "hypervisor", vi: "lớp ảo hóa", hint: "Trách nhiệm của AWS" },
    { term: "root user", vi: "tài khoản gốc (toàn quyền)", hint: "Bật MFA, không dùng hằng ngày" },
    { term: "MFA", vi: "xác thực đa yếu tố", hint: "" },
    { term: "access keys", vi: "khóa truy cập (cho CLI/SDK)", hint: "Không lưu trên EC2 → dùng IAM role" },
    { term: "best practice", vi: "cách làm được khuyến nghị", hint: "" },
    { term: "compliance reports", vi: "báo cáo tuân thủ", hint: "AWS Artifact" },
    { term: "auditor", vi: "kiểm toán viên", hint: "" },
    { term: "audit", vi: "kiểm tra, kiểm toán", hint: "Ai làm gì → CloudTrail" },
    { term: "API calls", vi: "lời gọi API (thao tác)", hint: "CloudTrail" },
    { term: "SQL injection", vi: "tấn công chèn mã SQL", hint: "AWS WAF" },
    { term: "cross-site scripting", vi: "tấn công XSS", hint: "AWS WAF" },
    { term: "DDoS", vi: "tấn công từ chối dịch vụ phân tán", hint: "AWS Shield" },
    { term: "threats", vi: "mối đe dọa", hint: "Amazon GuardDuty" },
    { term: "MOST secure", vi: "an toàn nhất", hint: "Thường: IAM role, least privilege, MFA" },
    { term: "least privilege", vi: "đặc quyền tối thiểu", hint: "Chỉ cấp đúng quyền cần thiết" },
    { term: "data centers", vi: "trung tâm dữ liệu", hint: "" },
    { term: "provisioning", vi: "cấp phát, chuẩn bị sẵn tài nguyên", hint: "“without provisioning” → serverless" },
    { term: "serverless", vi: "không cần quản lý máy chủ", hint: "Lambda, Fargate, DynamoDB, S3" },
    { term: "rarely accessed", vi: "hiếm khi truy cập", hint: "S3 IA / Glacier" },
    { term: "archive", vi: "lưu trữ lâu dài", hint: "S3 Glacier" },
    { term: "retrieval time", vi: "thời gian lấy dữ liệu ra", hint: "Chấp nhận chờ lâu → Glacier Deep Archive" },
    { term: "MOST cost-effective", vi: "tiết kiệm chi phí nhất", hint: "Chọn đáp án rẻ nhất mà vẫn đáp ứng yêu cầu" },
    { term: "fully managed", vi: "AWS quản lý hoàn toàn", hint: "" },
    { term: "NoSQL", vi: "cơ sở dữ liệu phi quan hệ", hint: "DynamoDB" },
    { term: "latency", vi: "độ trễ", hint: "CloudFront, chọn Region gần user" },
    { term: "caching", vi: "lưu đệm", hint: "CloudFront, ElastiCache" },
    { term: "edge location", vi: "điểm biên (gần người dùng)", hint: "CloudFront, Route 53" },
    { term: "static content", vi: "nội dung tĩnh (ảnh, CSS, JS)", hint: "S3 + CloudFront" },
    { term: "incoming traffic", vi: "lưu lượng truy cập đến", hint: "Elastic Load Balancing" },
    { term: "on-premises", vi: "hạ tầng tại chỗ (của công ty)", hint: "" },
    { term: "public internet", vi: "internet công cộng", hint: "Không qua internet → Direct Connect" },
    { term: "dedicated", vi: "chuyên dụng, dành riêng", hint: "Direct Connect, Dedicated Hosts" },
    { term: "steady-state", vi: "tải ổn định, đều đặn", hint: "Reserved Instances / Savings Plans" },
    { term: "interrupted", vi: "bị gián đoạn", hint: "Chấp nhận gián đoạn → Spot" },
    { term: "fault-tolerant", vi: "chịu lỗi được", hint: "Spot; kiến trúc Multi-AZ" },
    { term: "batch processing", vi: "xử lý theo lô", hint: "" },
    { term: "threshold", vi: "ngưỡng", hint: "AWS Budgets" },
    { term: "estimate", vi: "ước tính", hint: "AWS Pricing Calculator" },
    { term: "volume discounts", vi: "giảm giá theo khối lượng", hint: "Consolidated billing" },
    { term: "combined usage", vi: "mức dùng gộp", hint: "Consolidated billing" },
    { term: "data transfer out", vi: "dữ liệu truyền ra", hint: "Có tính phí" },
    { term: "data transfer in", vi: "dữ liệu truyền vào", hint: "Miễn phí" },
    { term: "highly available", vi: "sẵn sàng cao", hint: "Multi-AZ, ELB" },
    { term: "least operational overhead", vi: "ít công vận hành nhất", hint: "Chọn dịch vụ managed/serverless" },
    { term: "Choose TWO", vi: "chọn 2 đáp án", hint: "Phải chọn đủ và đúng cả 2" }
  ],

  /* Thẻ dịch vụ AWS */
  services: [
    { name: "Amazon EC2", d: 3, vi: "Máy chủ ảo. Bạn tự quản lý OS (IaaS).", confuse: "Lambda (serverless), Lightsail (VPS đơn giản)" },
    { name: "AWS Lambda", d: 3, vi: "Chạy code serverless, trả tiền theo số request và thời gian chạy.", confuse: "EC2, Fargate (container serverless)" },
    { name: "AWS Elastic Beanstalk", d: 3, vi: "PaaS: upload code, AWS tự dựng EC2, ELB, Auto Scaling.", confuse: "CloudFormation (IaC)" },
    { name: "AWS CloudFormation", d: 3, vi: "Infrastructure as Code: tạo tài nguyên từ template YAML/JSON.", confuse: "Elastic Beanstalk" },
    { name: "Amazon S3", d: 3, vi: "Lưu trữ object, độ bền 11 số 9, nhiều storage class.", confuse: "EBS (block), EFS (file)" },
    { name: "Amazon EBS", d: 3, vi: "Ổ đĩa block gắn cho EC2, nằm trong 1 AZ.", confuse: "EFS (chia sẻ nhiều EC2), Instance Store (mất khi dừng)" },
    { name: "Amazon EFS", d: 3, vi: "File system dùng chung cho nhiều EC2 (Linux, NFS).", confuse: "EBS" },
    { name: "Amazon RDS", d: 3, vi: "Cơ sở dữ liệu quan hệ được quản lý (MySQL, PostgreSQL...).", confuse: "Aurora, DynamoDB" },
    { name: "Amazon Aurora", d: 3, vi: "DB quan hệ của AWS, tương thích MySQL/PostgreSQL, hiệu năng cao.", confuse: "RDS" },
    { name: "Amazon DynamoDB", d: 3, vi: "NoSQL key-value serverless, độ trễ vài mili-giây.", confuse: "RDS (SQL)" },
    { name: "Amazon Redshift", d: 3, vi: "Data warehouse để phân tích dữ liệu lớn (OLAP).", confuse: "RDS (OLTP)" },
    { name: "Amazon ElastiCache", d: 3, vi: "Cache trong bộ nhớ (Redis/Memcached).", confuse: "DynamoDB" },
    { name: "Amazon CloudFront", d: 3, vi: "CDN: cache nội dung tại edge location.", confuse: "Route 53, Global Accelerator" },
    { name: "Amazon Route 53", d: 3, vi: "DNS, đăng ký domain, định tuyến, health check.", confuse: "CloudFront" },
    { name: "Amazon VPC", d: 3, vi: "Mạng riêng ảo: subnet, route table, gateway.", confuse: "" },
    { name: "AWS Direct Connect", d: 3, vi: "Đường truyền vật lý riêng từ on-premises tới AWS.", confuse: "Site-to-Site VPN (qua internet)" },
    { name: "Elastic Load Balancing", d: 3, vi: "Chia tải traffic qua nhiều target.", confuse: "Auto Scaling" },
    { name: "Amazon EC2 Auto Scaling", d: 3, vi: "Tự tăng/giảm số instance EC2 theo tải.", confuse: "ELB" },
    { name: "Amazon SNS / SQS", d: 3, vi: "SNS: gửi thông báo pub/sub. SQS: hàng đợi message để tách rời (decouple) các thành phần.", confuse: "Nhầm lẫn giữa SNS và SQS" },
    { name: "AWS IAM", d: 2, vi: "Quản lý user, group, role, policy. Miễn phí, dùng toàn cầu.", confuse: "IAM Identity Center (SSO)" },
    { name: "AWS CloudTrail", d: 2, vi: "Ghi lại API calls: ai làm gì, khi nào.", confuse: "CloudWatch, Config" },
    { name: "Amazon CloudWatch", d: 2, vi: "Theo dõi metric, log, alarm.", confuse: "CloudTrail" },
    { name: "AWS Config", d: 2, vi: "Lịch sử cấu hình tài nguyên và kiểm tra tuân thủ rule.", confuse: "CloudTrail" },
    { name: "AWS Shield", d: 2, vi: "Chống DDoS. Standard miễn phí, Advanced có phí.", confuse: "WAF" },
    { name: "AWS WAF", d: 2, vi: "Tường lửa web lớp 7: chặn SQL injection, XSS, lọc IP.", confuse: "Shield, Security Group" },
    { name: "Amazon GuardDuty", d: 2, vi: "Phát hiện mối đe dọa từ log (CloudTrail, VPC Flow Logs, DNS).", confuse: "Inspector, Macie" },
    { name: "Amazon Inspector", d: 2, vi: "Quét lỗ hổng phần mềm trên EC2, ECR, Lambda.", confuse: "GuardDuty" },
    { name: "Amazon Macie", d: 2, vi: "Tìm dữ liệu nhạy cảm (PII) trong S3 bằng ML.", confuse: "GuardDuty" },
    { name: "AWS KMS", d: 2, vi: "Tạo và quản lý khóa mã hóa.", confuse: "Secrets Manager (lưu mật khẩu), CloudHSM" },
    { name: "AWS Secrets Manager", d: 2, vi: "Lưu và tự xoay vòng (rotate) mật khẩu, API key.", confuse: "KMS" },
    { name: "AWS Artifact", d: 2, vi: "Tải báo cáo tuân thủ (SOC, PCI, ISO) và agreements.", confuse: "Config, Audit Manager" },
    { name: "AWS Trusted Advisor", d: 4, vi: "Khuyến nghị theo 6 nhóm: chi phí, hiệu năng, bảo mật, chịu lỗi, service limits, operational excellence.", confuse: "Inspector" },
    { name: "AWS Budgets", d: 4, vi: "Đặt ngân sách và cảnh báo khi vượt.", confuse: "Cost Explorer" },
    { name: "AWS Cost Explorer", d: 4, vi: "Xem, phân tích chi phí theo thời gian, có dự báo.", confuse: "Budgets, Pricing Calculator" },
    { name: "AWS Pricing Calculator", d: 4, vi: "Ước tính chi phí trước khi dùng.", confuse: "Cost Explorer" },
    { name: "AWS Organizations", d: 4, vi: "Quản lý nhiều tài khoản, consolidated billing, SCP.", confuse: "" }
  ],

  /* Bài học: tiếng Việt, giữ thuật ngữ tiếng Anh */
  lessons: {
    1: [
      { t: "6 lợi ích của Cloud (Six advantages)", h: `
<table><tr><th>Thuật ngữ</th><th>Ý nghĩa</th></tr>
<tr><td><b>Trade fixed expense for variable expense</b></td><td>Không mua phần cứng trả trước, chỉ trả theo mức dùng</td></tr>
<tr><td><b>Benefit from massive economies of scale</b></td><td>AWS mua số lượng lớn nên giá rẻ hơn cho mọi khách hàng</td></tr>
<tr><td><b>Stop guessing capacity</b></td><td>Không cần đoán trước công suất, có thể co giãn theo nhu cầu</td></tr>
<tr><td><b>Increase speed and agility</b></td><td>Tạo tài nguyên trong vài phút, thử nghiệm nhanh</td></tr>
<tr><td><b>Stop spending money running and maintaining data centers</b></td><td>Tập trung vào kinh doanh, không lo vận hành data center</td></tr>
<tr><td><b>Go global in minutes</b></td><td>Triển khai ra nhiều Region trên thế giới nhanh chóng</td></tr></table>` },
      { t: "Mô hình dịch vụ & triển khai", h: `
<ul><li><b>IaaS</b>: thuê hạ tầng (máy ảo, mạng), ví dụ EC2. Bạn quản lý nhiều nhất.</li>
<li><b>PaaS</b>: chỉ lo code, ví dụ Elastic Beanstalk.</li>
<li><b>SaaS</b>: dùng phần mềm hoàn chỉnh, ví dụ Gmail.</li></ul>
<ul><li><b>Cloud</b>: tất cả chạy trên cloud.</li>
<li><b>Hybrid</b>: kết hợp cloud và on-premises.</li>
<li><b>On-premises</b> (private cloud): chạy trong data center của công ty.</li></ul>` },
      { t: "Well-Architected Framework: 6 trụ cột", h: `
<table><tr><th>Pillar</th><th>Từ khóa trong đề</th></tr>
<tr><td><b>Operational Excellence</b></td><td>vận hành, giám sát, cải tiến liên tục, IaC</td></tr>
<tr><td><b>Security</b></td><td>bảo vệ dữ liệu, IAM, truy vết</td></tr>
<tr><td><b>Reliability</b></td><td>recover from failures, đáp ứng nhu cầu</td></tr>
<tr><td><b>Performance Efficiency</b></td><td>dùng tài nguyên hiệu quả, chọn đúng loại</td></tr>
<tr><td><b>Cost Optimization</b></td><td>tránh chi phí không cần thiết</td></tr>
<tr><td><b>Sustainability</b></td><td>giảm tác động môi trường</td></tr></table>` },
      { t: "Chiến lược migration (7R)", h: `
<ul><li><b>Rehost</b> (lift-and-shift): chuyển nguyên trạng, nhanh nhất</li>
<li><b>Replatform</b>: tối ưu nhỏ, ví dụ chuyển DB sang RDS</li>
<li><b>Refactor / Re-architect</b>: viết lại, ví dụ sang serverless</li>
<li><b>Repurchase</b>: chuyển sang sản phẩm SaaS</li>
<li><b>Retire</b>: tắt bỏ</li>
<li><b>Retain</b>: giữ lại on-premises</li>
<li><b>Relocate</b>: chuyển hạ tầng (ví dụ VMware) lên cloud</li></ul>` },
      { t: "AWS CAF: 6 perspectives", h: `
<p>Nhóm kinh doanh: <b>Business</b>, <b>People</b>, <b>Governance</b>.<br>Nhóm kỹ thuật: <b>Platform</b>, <b>Security</b>, <b>Operations</b>.</p>` },
      { t: "Các khái niệm hay bị nhầm", h: `
<ul><li><b>Elasticity</b>: tự động tăng và giảm theo nhu cầu.</li>
<li><b>Scalability</b>: khả năng mở rộng khi cần.</li>
<li><b>High availability</b>: luôn sẵn sàng, ít downtime (Multi-AZ).</li>
<li><b>Fault tolerance</b>: vẫn chạy khi một thành phần hỏng.</li>
<li><b>Durability</b>: dữ liệu không bị mất.</li></ul>` }
    ],
    2: [
      { t: "Shared Responsibility Model", h: `
<table><tr><th>AWS: security <u>OF</u> the cloud</th><th>Khách hàng: security <u>IN</u> the cloud</th></tr>
<tr><td>Data center, phần cứng, physical security</td><td>Dữ liệu và mã hóa dữ liệu</td></tr>
<tr><td>Hypervisor, mạng toàn cầu</td><td>IAM: user, quyền, MFA</td></tr>
<tr><td>Hạ tầng của dịch vụ managed (ví dụ vá OS của RDS)</td><td>OS của EC2 (patching), security group</td></tr></table>
<p>Mẹo: càng “managed” (RDS, Lambda) thì AWS lo càng nhiều.</p>` },
      { t: "IAM", h: `
<ul><li><b>User</b>: một người hoặc ứng dụng. <b>Group</b>: nhóm user. <b>Role</b>: quyền tạm thời (cho EC2, Lambda, user tài khoản khác). <b>Policy</b>: tài liệu JSON quy định quyền.</li>
<li><b>Least privilege</b>: chỉ cấp quyền tối thiểu cần thiết.</li>
<li><b>Root user</b>: bật MFA, không tạo access key, không dùng hằng ngày.</li>
<li>IAM là dịch vụ <b>global</b> và <b>miễn phí</b>.</li></ul>` },
      { t: "Bảng dịch vụ bảo mật", h: `
<table><tr><th>Nhu cầu</th><th>Dịch vụ</th></tr>
<tr><td>Chống DDoS</td><td>AWS Shield (Standard miễn phí)</td></tr>
<tr><td>Chặn SQL injection, XSS (lớp 7)</td><td>AWS WAF</td></tr>
<tr><td>Phát hiện mối đe dọa từ log</td><td>Amazon GuardDuty</td></tr>
<tr><td>Quét lỗ hổng phần mềm</td><td>Amazon Inspector</td></tr>
<tr><td>Tìm dữ liệu nhạy cảm trong S3</td><td>Amazon Macie</td></tr>
<tr><td>Quản lý khóa mã hóa</td><td>AWS KMS</td></tr>
<tr><td>Lưu mật khẩu, tự rotate</td><td>AWS Secrets Manager</td></tr>
<tr><td>Báo cáo tuân thủ (SOC, PCI)</td><td>AWS Artifact</td></tr>
<tr><td>Tổng hợp cảnh báo bảo mật</td><td>AWS Security Hub</td></tr></table>` },
      { t: "Giám sát & audit: 3 dịch vụ hay nhầm", h: `
<ul><li><b>CloudTrail</b>: <i>ai</i> làm <i>gì</i>, <i>khi nào</i> (API calls).</li>
<li><b>CloudWatch</b>: hiệu năng (CPU, log, alarm).</li>
<li><b>Config</b>: cấu hình tài nguyên đã thay đổi thế nào, có tuân thủ rule không.</li></ul>` },
      { t: "Security Group vs Network ACL", h: `
<table><tr><th></th><th>Security Group</th><th>Network ACL</th></tr>
<tr><td>Phạm vi</td><td>Instance</td><td>Subnet</td></tr>
<tr><td>Trạng thái</td><td>Stateful</td><td>Stateless</td></tr>
<tr><td>Rule</td><td>Chỉ Allow</td><td>Allow và Deny</td></tr></table>` }
    ],
    3: [
      { t: "Hạ tầng toàn cầu", h: `
<ul><li><b>Region</b>: khu vực địa lý, gồm nhiều AZ.</li>
<li><b>Availability Zone</b>: 1 hoặc nhiều data center tách biệt trong Region.</li>
<li><b>Edge location</b>: điểm cache của CloudFront và Route 53, gần người dùng.</li></ul>
<p>Chọn Region dựa trên 4 yếu tố: <b>compliance</b> (luật dữ liệu), <b>latency</b> (gần người dùng), <b>service availability</b> (dịch vụ có hỗ trợ không), <b>pricing</b> (giá).</p>` },
      { t: "Compute", h: `
<table><tr><th>Dịch vụ</th><th>Khi nào dùng</th></tr>
<tr><td>EC2</td><td>Cần toàn quyền với máy ảo</td></tr>
<tr><td>Lambda</td><td>Serverless, chạy theo sự kiện, tối đa 15 phút mỗi lần</td></tr>
<tr><td>ECS / EKS</td><td>Chạy container (EKS dùng Kubernetes)</td></tr>
<tr><td>Fargate</td><td>Container serverless</td></tr>
<tr><td>Elastic Beanstalk</td><td>PaaS: chỉ upload code</td></tr>
<tr><td>Lightsail</td><td>VPS đơn giản, giá cố định</td></tr></table>` },
      { t: "Storage & S3 storage classes", h: `
<ul><li><b>S3</b>: object · <b>EBS</b>: block (gắn 1 EC2, trong 1 AZ) · <b>EFS</b>: file dùng chung</li></ul>
<table><tr><th>Storage class</th><th>Dùng khi</th></tr>
<tr><td>S3 Standard</td><td>Dùng thường xuyên</td></tr>
<tr><td>S3 Intelligent-Tiering</td><td>Không biết trước tần suất truy cập</td></tr>
<tr><td>S3 Standard-IA</td><td>Ít dùng, cần lấy ngay</td></tr>
<tr><td>S3 One Zone-IA</td><td>Ít dùng, chấp nhận lưu trong 1 AZ</td></tr>
<tr><td>Glacier Instant Retrieval</td><td>Lưu trữ, lấy ra trong mili-giây</td></tr>
<tr><td>Glacier Flexible Retrieval</td><td>Lưu trữ, lấy ra từ vài phút đến vài giờ</td></tr>
<tr><td>Glacier Deep Archive</td><td>Rẻ nhất, lấy ra trong vòng 12 giờ hoặc hơn</td></tr></table>` },
      { t: "Database", h: `
<ul><li><b>RDS / Aurora</b>: quan hệ (SQL), OLTP</li>
<li><b>DynamoDB</b>: NoSQL key-value, serverless</li>
<li><b>Redshift</b>: data warehouse, phân tích</li>
<li><b>ElastiCache</b>: cache trong bộ nhớ</li></ul>` },
      { t: "Networking", h: `
<ul><li><b>VPC</b>: mạng riêng. <b>Internet gateway</b>: cho VPC ra internet. <b>NAT gateway</b>: cho private subnet đi ra internet.</li>
<li><b>Direct Connect</b>: đường truyền riêng. <b>Site-to-Site VPN</b>: kết nối mã hóa qua internet.</li>
<li><b>Route 53</b>: DNS. <b>CloudFront</b>: CDN. <b>ELB</b>: chia tải. <b>Auto Scaling</b>: tăng/giảm số instance.</li></ul>` },
      { t: "Cách truy cập AWS", h: `
<ul><li><b>Management Console</b> (web) · <b>CLI</b> (dòng lệnh) · <b>SDK</b> (trong code)</li>
<li><b>CloudFormation</b>: Infrastructure as Code (IaC)</li></ul>` }
    ],
    4: [
      { t: "Mô hình giá EC2", h: `
<table><tr><th>Lựa chọn</th><th>Đặc điểm</th><th>Từ khóa</th></tr>
<tr><td>On-Demand</td><td>Trả theo giây/giờ, không cam kết</td><td>ngắn hạn, không đoán trước được tải</td></tr>
<tr><td>Reserved Instances</td><td>Cam kết 1 hoặc 3 năm, giảm tới ~72%</td><td>steady-state</td></tr>
<tr><td>Savings Plans</td><td>Cam kết số tiền $/giờ trong 1 hoặc 3 năm, linh hoạt hơn</td><td>steady-state, linh hoạt</td></tr>
<tr><td>Spot</td><td>Giảm tới ~90%, có thể bị thu hồi (báo trước 2 phút)</td><td>can be interrupted, fault-tolerant</td></tr>
<tr><td>Dedicated Hosts</td><td>Server vật lý riêng</td><td>license theo socket/core, tuân thủ</td></tr></table>` },
      { t: "Công cụ quản lý chi phí", h: `
<ul><li><b>Pricing Calculator</b>: ước tính <i>trước</i> khi dùng</li>
<li><b>Cost Explorer</b>: phân tích chi phí <i>đã</i> phát sinh, có dự báo</li>
<li><b>Budgets</b>: đặt ngân sách và cảnh báo</li>
<li><b>Cost and Usage Report</b>: dữ liệu chi tiết nhất</li>
<li><b>Cost allocation tags</b>: gắn tag để chia chi phí theo dự án/phòng ban</li></ul>` },
      { t: "AWS Organizations", h: `
<ul><li>Quản lý nhiều tài khoản tập trung.</li>
<li><b>Consolidated billing</b>: một hóa đơn, cộng dồn mức dùng để được giảm giá theo khối lượng.</li>
<li><b>SCP</b> (Service Control Policies): giới hạn quyền tối đa của các tài khoản con.</li></ul>` },
      { t: "Support plans & Trusted Advisor", h: `
<p>Exam Guide CLF-C02 hiện tại liệt kê các lựa chọn hỗ trợ: <b>Basic Support</b> (miễn phí, có sẵn cho mọi tài khoản), <b>AWS Business Support+</b>, <b>AWS Enterprise Support</b>, <b>AWS Unified Operations</b>, cùng kênh customer service và cộng đồng.</p>
<p>Tên gói cũ có thể vẫn gặp trong tài liệu: Developer, Business, Enterprise On-Ramp, Enterprise. Gói càng cao thì phản hồi càng nhanh và có thêm chuyên gia riêng (ví dụ TAM, Technical Account Manager).</p>
<ul><li><b>Trusted Advisor</b>: kiểm tra 6 nhóm: cost optimization, performance, security, fault tolerance, service limits, operational excellence. Gói trả phí có bộ kiểm tra đầy đủ hơn.</li></ul>
<p class="note">AWS vừa đổi cơ cấu các gói Support. Hãy đối chiếu quyền lợi chi tiết với trang AWS Support Plans chính thức.</p>` }
    ]
  }
};
