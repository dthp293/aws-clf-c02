/* Bộ câu hỏi bổ sung (đợt 2). Cùng định dạng với data.js. */
window.CLF.questions.push(
  // ───────── Domain 1 ─────────
  {
    id: "d1-6", d: 1,
    en: "A company wants to minimize the environmental impact of its workloads by maximizing resource utilization. Which pillar of the AWS Well-Architected Framework does this align with?",
    vi: "Công ty muốn giảm tác động môi trường của hệ thống bằng cách tận dụng tối đa tài nguyên. Điều này thuộc trụ cột nào của Well-Architected Framework?",
    opts: [["Sustainability", "Bền vững"], ["Performance Efficiency", "Hiệu quả hiệu năng"], ["Cost Optimization", "Tối ưu chi phí"], ["Reliability", "Độ tin cậy"]],
    ans: [0],
    exp: "Thấy “environmental impact” thì chọn Sustainability, trụ cột thứ 6, được thêm vào năm 2021.",
    why: ["Đúng: Sustainability tập trung giảm tác động môi trường, ví dụ tận dụng tối đa tài nguyên để giảm lãng phí.", "Sai: Performance Efficiency tập trung vào hiệu năng, không phải môi trường.", "Sai: Cost Optimization tập trung vào chi phí.", "Sai: Reliability tập trung vào phục hồi sau sự cố."]
  },
  {
    id: "d1-7", d: 1,
    en: "Which pillar of the AWS Well-Architected Framework includes the design principle “perform operations as code”?",
    vi: "Trụ cột nào của Well-Architected Framework có nguyên tắc thiết kế “thực hiện vận hành bằng code”?",
    opts: [["Operational Excellence", "Vận hành xuất sắc"], ["Reliability", "Độ tin cậy"], ["Performance Efficiency", "Hiệu quả hiệu năng"], ["Security", "Bảo mật"]],
    ans: [0],
    exp: "Operational Excellence gồm: perform operations as code, thay đổi nhỏ và thường xuyên, học từ sự cố.",
    why: ["Đúng: “perform operations as code” là nguyên tắc thiết kế của Operational Excellence.", "Sai: Reliability có nguyên tắc như tự động phục hồi, scale ngang.", "Sai: Performance Efficiency có nguyên tắc như dùng serverless, go global in minutes.", "Sai: Security có nguyên tắc như least privilege, bật traceability."]
  },
  {
    id: "d1-8", d: 1,
    en: "During migration, a company replaces its self-managed MySQL database with Amazon RDS without changing the application's core architecture. Which migration strategy is this?",
    vi: "Khi migration, công ty thay database MySQL tự quản lý bằng Amazon RDS mà không đổi kiến trúc cốt lõi của ứng dụng. Đây là chiến lược nào?",
    opts: [["Replatform", "Replatform"], ["Rehost", "Rehost"], ["Refactor", "Refactor"], ["Repurchase", "Repurchase"]],
    ans: [0],
    exp: "Replatform (“lift, tinker, and shift”) là tối ưu nhỏ khi chuyển, ví dụ chuyển sang dịch vụ managed như RDS.",
    why: ["Đúng: chuyển sang dịch vụ managed như RDS mà không đổi kiến trúc lõi là tối ưu nhỏ kiểu Replatform.", "Sai: Rehost chuyển nguyên trạng, sẽ giữ MySQL tự quản lý trên EC2 chứ không đổi sang RDS.", "Sai: Refactor thay đổi lớn về kiến trúc, trong khi đề nói kiến trúc lõi giữ nguyên.", "Sai: Repurchase là chuyển sang sản phẩm khác (thường là SaaS)."]
  },
  {
    id: "d1-9", d: 1,
    en: "A company decides to stop using its on-premises CRM software and move to a SaaS CRM product. Which migration strategy is this?",
    vi: "Công ty quyết định bỏ phần mềm CRM tại chỗ và chuyển sang một sản phẩm CRM dạng SaaS. Đây là chiến lược nào?",
    opts: [["Repurchase", "Repurchase"], ["Rehost", "Rehost"], ["Retain", "Retain"], ["Relocate", "Relocate"]],
    ans: [0],
    exp: "Repurchase (“drop and shop”) là mua hoặc chuyển sang sản phẩm khác, thường là SaaS.",
    why: ["Đúng: bỏ phần mềm cũ để chuyển sang sản phẩm SaaS khác là Repurchase (“drop and shop”).", "Sai: Rehost là chuyển nguyên phần mềm cũ lên EC2.", "Sai: Retain là giữ lại on-premises.", "Sai: Relocate là chuyển hạ tầng ảo hóa (ví dụ VMware) lên cloud."]
  },
  {
    id: "d1-10", d: 1,
    en: "Because AWS aggregates usage from hundreds of thousands of customers, it can offer lower pay-as-you-go prices. Which advantage of cloud computing is this?",
    vi: "Vì AWS gộp mức sử dụng của hàng trăm nghìn khách hàng nên có thể đưa ra giá pay-as-you-go thấp hơn. Đây là lợi ích nào?",
    opts: [["Benefit from massive economies of scale", "Hưởng lợi từ quy mô kinh tế lớn"], ["Trade fixed expense for variable expense", "Chuyển chi phí cố định thành biến đổi"], ["Stop guessing capacity", "Không cần đoán công suất"], ["Go global in minutes", "Mở rộng toàn cầu trong vài phút"]],
    ans: [0],
    exp: "Thấy “aggregates usage” và “lower prices” thì chọn economies of scale.",
    why: ["Đúng: AWS gộp nhu cầu của rất nhiều khách hàng nên chi phí đơn vị thấp hơn và giảm giá cho khách.", "Sai: nói về việc không trả trước, chỉ trả theo mức dùng.", "Sai: nói về việc co giãn theo nhu cầu thực tế thay vì đoán trước công suất.", "Sai: nói về việc triển khai nhanh ra nhiều Region trên thế giới."]
  },
  {
    id: "d1-11", d: 1,
    en: "A company often buys too many servers for expected traffic peaks, which leaves resources idle most of the time. Which advantage of cloud computing addresses this problem?",
    vi: "Công ty thường mua thừa máy chủ cho các đợt cao điểm dự kiến, khiến tài nguyên bị nhàn rỗi phần lớn thời gian. Lợi ích nào của cloud giải quyết vấn đề này?",
    opts: [["Stop guessing capacity", "Không cần đoán công suất"], ["Go global in minutes", "Mở rộng toàn cầu trong vài phút"], ["Benefit from massive economies of scale", "Hưởng lợi từ quy mô kinh tế lớn"], ["Stop spending money running and maintaining data centers", "Không tốn tiền vận hành data center"]],
    ans: [0],
    exp: "Mua thừa (over-provisioning) hoặc thiếu công suất là vấn đề của việc đoán trước. Trên cloud thì dùng bao nhiêu lấy bấy nhiêu.",
    why: ["Đúng: trên cloud chỉ cần cấp đúng công suất đang cần và co giãn khi tải đổi, không phải mua thừa cho đỉnh tải.", "Sai: nói về việc triển khai ra nhiều Region nhanh chóng, không giải quyết việc mua thừa công suất.", "Sai: nói về giá rẻ do quy mô.", "Sai: nói về việc tập trung vào kinh doanh thay vì vận hành hạ tầng."]
  },
  {
    id: "d1-12", d: 1,
    en: "Which cloud deployment model connects a company's on-premises infrastructure with resources in the cloud?",
    vi: "Mô hình triển khai nào kết nối hạ tầng tại chỗ của công ty với tài nguyên trên cloud?",
    opts: [["Hybrid deployment", "Triển khai hybrid"], ["Cloud deployment", "Triển khai hoàn toàn trên cloud"], ["On-premises deployment", "Triển khai tại chỗ"], ["Edge deployment", "Triển khai ở biên"]],
    ans: [0],
    exp: "Hybrid là kết hợp on-premises và cloud.",
    why: ["Đúng: hybrid kết nối hạ tầng on-premises với tài nguyên trên cloud.", "Sai: cloud deployment là mọi thứ chạy trên cloud, không còn hạ tầng tại chỗ.", "Sai: on-premises là mọi thứ chạy trong data center của công ty (private cloud).", "Sai: edge không phải một trong ba mô hình triển khai chuẩn (cloud, on-premises, hybrid)."]
  },
  {
    id: "d1-13", d: 1,
    en: "Which of the following is an example of Infrastructure as a Service (IaaS)?",
    vi: "Đâu là ví dụ của Infrastructure as a Service (IaaS)?",
    opts: [["Amazon EC2", "Amazon EC2"], ["AWS Elastic Beanstalk", "AWS Elastic Beanstalk"], ["A web-based email application", "Ứng dụng email chạy trên web"], ["A CRM product delivered over the internet", "Sản phẩm CRM cung cấp qua internet"]],
    ans: [0],
    exp: "IaaS là thuê máy ảo, mạng, lưu trữ và tự quản lý OS (EC2). PaaS là chỉ lo code (Beanstalk). SaaS là dùng phần mềm hoàn chỉnh.",
    why: ["Đúng: EC2 cho thuê máy ảo, khách hàng tự quản lý OS và phần mềm, đúng kiểu IaaS.", "Sai: Beanstalk là PaaS, AWS lo hạ tầng và nền tảng, bạn chỉ lo code.", "Sai: email trên web là phần mềm hoàn chỉnh dùng ngay, tức là SaaS.", "Sai: CRM cung cấp qua internet là phần mềm hoàn chỉnh, tức là SaaS."]
  },
  {
    id: "d1-14", d: 1,
    en: "Which perspective of the AWS Cloud Adoption Framework (AWS CAF) focuses on building an enterprise-grade, scalable, hybrid cloud platform?",
    vi: "Perspective nào của AWS CAF tập trung vào việc xây dựng nền tảng cloud hybrid, có khả năng mở rộng, đạt chuẩn doanh nghiệp?",
    opts: [["Platform", "Platform"], ["People", "People"], ["Governance", "Governance"], ["Business", "Business"]],
    ans: [0],
    exp: "Platform thuộc nhóm kỹ thuật (Platform, Security, Operations).",
    why: ["Đúng: Platform perspective lo xây nền tảng cloud hybrid, mở rộng được, đạt chuẩn doanh nghiệp.", "Sai: People tập trung vào văn hóa, cơ cấu tổ chức, kỹ năng nhân sự.", "Sai: Governance tập trung vào quản trị, rủi ro, quản lý chương trình.", "Sai: Business tập trung vào việc đầu tư cloud phục vụ mục tiêu kinh doanh."]
  },
  {
    id: "d1-15", d: 1,
    en: "Which perspective of the AWS Cloud Adoption Framework (AWS CAF) focuses on culture, organizational structure, leadership, and workforce skills?",
    vi: "Perspective nào của AWS CAF tập trung vào văn hóa, cơ cấu tổ chức, lãnh đạo và kỹ năng nhân sự?",
    opts: [["People", "People"], ["Governance", "Governance"], ["Operations", "Operations"], ["Security", "Security"]],
    ans: [0],
    exp: "Thấy “culture”, “workforce”, “skills” thì chọn People.",
    why: ["Đúng: People perspective lo văn hóa, cơ cấu tổ chức, lãnh đạo và kỹ năng nhân sự.", "Sai: Governance là quản trị chương trình, rủi ro và chi phí.", "Sai: Operations là vận hành dịch vụ cloud hằng ngày.", "Sai: Security lo bảo mật dữ liệu và workload, không phải văn hóa hay kỹ năng."]
  },
  {
    id: "d1-16", d: 1,
    en: "A company deploys its application across multiple Availability Zones so that the application keeps running if one Availability Zone fails. Which concept does this demonstrate?",
    vi: "Công ty triển khai ứng dụng trên nhiều Availability Zone để ứng dụng vẫn chạy nếu một AZ gặp sự cố. Đây là khái niệm nào?",
    opts: [["High availability", "Tính sẵn sàng cao"], ["Elasticity", "Tính co giãn"], ["Agility", "Sự linh hoạt"], ["Economies of scale", "Quy mô kinh tế"]],
    ans: [0],
    exp: "Multi-AZ là cách điển hình để đạt high availability.",
    why: ["Đúng: chạy trên nhiều AZ để vẫn hoạt động khi một AZ hỏng là cách đạt high availability.", "Sai: Elasticity là co giãn số tài nguyên theo tải, không nói về chịu sự cố AZ.", "Sai: Agility là tốc độ thử nghiệm và triển khai.", "Sai: Economies of scale nói về giá rẻ nhờ quy mô."]
  },
  {
    id: "d1-17", d: 1,
    en: "Which of the following are benefits of the AWS Cloud? (Choose TWO.)",
    vi: "Những mục nào là lợi ích của AWS Cloud? (Chọn 2.)",
    opts: [["Increased speed and agility", "Tăng tốc độ và sự linh hoạt"], ["Global reach in minutes", "Mở rộng toàn cầu trong vài phút"], ["Fixed monthly pricing regardless of actual usage", "Giá cố định hằng tháng bất kể mức sử dụng thực tế"], ["No remaining security responsibilities for the customer", "Khách hàng không còn trách nhiệm bảo mật nào"], ["A guaranteed 100% uptime SLA for every AWS service", "SLA cam kết uptime 100% cho mọi dịch vụ AWS"]],
    ans: [0, 1],
    exp: "Hai đáp án đúng đều thuộc 6 lợi ích của cloud.",
    why: ["Đúng: tạo tài nguyên trong vài phút giúp thử nghiệm và ra sản phẩm nhanh hơn.", "Đúng: có thể triển khai ứng dụng ra nhiều Region trên thế giới chỉ trong vài phút.", "Sai: cloud là pay-as-you-go, chi phí biến đổi theo mức dùng chứ không cố định.", "Sai: theo mô hình trách nhiệm chia sẻ, khách hàng vẫn lo bảo mật “IN the cloud” (dữ liệu, IAM, cấu hình).", "Sai: SLA của AWS thường dưới 100% và khác nhau theo dịch vụ; khách hàng phải tự thiết kế để chịu lỗi."]
  },

  // ───────── Domain 2 ─────────
  {
    id: "d2-8", d: 2,
    en: "Which AWS service is used to create and manage encryption keys?",
    vi: "Dịch vụ nào dùng để tạo và quản lý khóa mã hóa?",
    opts: [["AWS Key Management Service (AWS KMS)", "AWS KMS"], ["AWS Secrets Manager", "AWS Secrets Manager"], ["AWS Certificate Manager (ACM)", "AWS Certificate Manager"], ["AWS Identity and Access Management (IAM)", "AWS IAM"]],
    ans: [0],
    exp: "Thấy “encryption keys” thì chọn KMS.",
    why: ["Đúng: KMS tạo, lưu và kiểm soát việc dùng khóa mã hóa, tích hợp với hầu hết dịch vụ AWS.", "Sai: Secrets Manager lưu mật khẩu và API key (bản thân nó dùng KMS để mã hóa).", "Sai: ACM quản lý chứng chỉ SSL/TLS.", "Sai: IAM quản lý danh tính và quyền."]
  },
  {
    id: "d2-9", d: 2,
    en: "A company needs to store database credentials securely and rotate them automatically. Which AWS service should it use?",
    vi: "Công ty cần lưu thông tin đăng nhập database an toàn và tự động xoay vòng (rotate). Nên dùng dịch vụ nào?",
    opts: [["AWS Secrets Manager", "AWS Secrets Manager"], ["AWS Key Management Service (AWS KMS)", "AWS KMS"], ["AWS Systems Manager Parameter Store", "AWS Systems Manager Parameter Store"], ["AWS IAM", "AWS IAM"]],
    ans: [0],
    exp: "Thấy “credentials” và “rotate automatically” thì chọn Secrets Manager.",
    why: ["Đúng: Secrets Manager lưu secret được mã hóa và có sẵn tính năng tự động rotate mật khẩu database.", "Sai: KMS quản lý khóa mã hóa, không lưu mật khẩu.", "Sai: Parameter Store lưu được giá trị mã hóa (SecureString) nhưng không có tính năng tự động rotate.", "Sai: IAM quản lý danh tính và quyền AWS, không lưu hay rotate mật khẩu database."]
  },
  {
    id: "d2-10", d: 2,
    en: "Which AWS service uses machine learning to discover and protect sensitive data, such as personally identifiable information (PII), stored in Amazon S3?",
    vi: "Dịch vụ nào dùng machine learning để phát hiện và bảo vệ dữ liệu nhạy cảm như thông tin cá nhân (PII) lưu trong S3?",
    opts: [["Amazon Macie", "Amazon Macie"], ["Amazon GuardDuty", "Amazon GuardDuty"], ["Amazon Inspector", "Amazon Inspector"], ["AWS Shield", "AWS Shield"]],
    ans: [0],
    exp: "Thấy “sensitive data”, “PII” và S3 thì chọn Macie.",
    why: ["Đúng: Macie dùng ML và pattern matching để tìm và báo cáo dữ liệu nhạy cảm như PII trong S3.", "Sai: GuardDuty phát hiện mối đe dọa từ log, không phân loại dữ liệu trong object.", "Sai: Inspector quét lỗ hổng phần mềm.", "Sai: Shield chống DDoS."]
  },
  {
    id: "d2-11", d: 2,
    en: "Which AWS service automatically scans Amazon EC2 instances and container images for software vulnerabilities?",
    vi: "Dịch vụ nào tự động quét instance EC2 và container image để tìm lỗ hổng phần mềm?",
    opts: [["Amazon Inspector", "Amazon Inspector"], ["Amazon GuardDuty", "Amazon GuardDuty"], ["Amazon Macie", "Amazon Macie"], ["AWS Trusted Advisor", "AWS Trusted Advisor"]],
    ans: [0],
    exp: "Thấy “vulnerabilities” thì chọn Inspector.",
    why: ["Đúng: Inspector tự động quét EC2, container image và Lambda để tìm lỗ hổng phần mềm (CVE).", "Sai: GuardDuty phát hiện hành vi đáng ngờ từ log.", "Sai: Macie tìm dữ liệu nhạy cảm trong S3.", "Sai: Trusted Advisor kiểm tra cấu hình theo best practice, không quét lỗ hổng phần mềm."]
  },
  {
    id: "d2-12", d: 2,
    en: "Which AWS service provides protection against DDoS attacks and is automatically enabled for all AWS customers at no additional cost?",
    vi: "Dịch vụ nào chống tấn công DDoS và được bật tự động, miễn phí cho mọi khách hàng AWS?",
    opts: [["AWS Shield Standard", "AWS Shield Standard"], ["AWS Shield Advanced", "AWS Shield Advanced"], ["AWS WAF", "AWS WAF"], ["Amazon GuardDuty", "Amazon GuardDuty"]],
    ans: [0],
    exp: "Shield Standard miễn phí và tự động bật. Shield Advanced có phí, kèm đội hỗ trợ DDoS 24/7 và bảo vệ chi phí khi bị tấn công.",
    why: ["Đúng: Shield Standard tự động bật miễn phí, chống các tấn công DDoS phổ biến ở lớp 3/4.", "Sai: Shield Advanced có phí và phải đăng ký, không tự bật.", "Sai: WAF có phí và cần cấu hình rule.", "Sai: GuardDuty có phí và không phải dịch vụ chống DDoS."]
  },
  {
    id: "d2-13", d: 2,
    en: "Which AWS service records configuration changes to AWS resources and evaluates them against desired configurations?",
    vi: "Dịch vụ nào ghi lại thay đổi cấu hình của tài nguyên AWS và đánh giá chúng so với cấu hình mong muốn?",
    opts: [["AWS Config", "AWS Config"], ["AWS CloudTrail", "AWS CloudTrail"], ["Amazon CloudWatch", "Amazon CloudWatch"], ["Amazon Inspector", "Amazon Inspector"]],
    ans: [0],
    exp: "Config trả lời câu hỏi “tài nguyên đã thay đổi cấu hình thế nào, có tuân thủ rule không”.",
    why: ["Đúng: Config ghi lịch sử cấu hình tài nguyên và dùng Config rules để đánh giá tuân thủ.", "Sai: CloudTrail ghi lại ai đã gọi API, không đánh giá cấu hình theo rule.", "Sai: CloudWatch theo dõi metric, log và alarm.", "Sai: Inspector quét lỗ hổng phần mềm, không theo dõi thay đổi cấu hình."]
  },
  {
    id: "d2-14", d: 2,
    en: "Which statement about security groups is correct?",
    vi: "Phát biểu nào về security group là đúng?",
    opts: [["They are stateful and act at the instance level", "Chúng stateful và hoạt động ở cấp instance"], ["They are stateless and act at the subnet level", "Chúng stateless và hoạt động ở cấp subnet"], ["They support both allow and deny rules", "Chúng hỗ trợ cả rule cho phép và từ chối"], ["They apply automatically to every resource in a Region", "Chúng tự áp dụng cho mọi tài nguyên trong Region"]],
    ans: [0],
    exp: "Security group: stateful, cấp instance, chỉ có rule Allow. Network ACL: stateless, cấp subnet, có cả Allow và Deny.",
    why: ["Đúng: security group stateful (tự cho phép traffic trả về) và gắn ở cấp instance/ENI.", "Sai: đó là đặc điểm của Network ACL.", "Sai: security group chỉ có rule Allow.", "Sai: security group phải được gắn vào từng tài nguyên."]
  },
  {
    id: "d2-15", d: 2,
    en: "Which AWS feature acts as a stateless firewall at the subnet level and supports both allow and deny rules?",
    vi: "Tính năng nào hoạt động như tường lửa stateless ở cấp subnet, hỗ trợ cả rule cho phép và từ chối?",
    opts: [["Network ACL", "Network ACL"], ["Security group", "Security group"], ["AWS WAF", "AWS WAF"], ["AWS Shield", "AWS Shield"]],
    ans: [0],
    exp: "Thấy “subnet”, “stateless” hoặc “deny rules” thì chọn Network ACL.",
    why: ["Đúng: Network ACL là tường lửa stateless ở cấp subnet, có cả rule Allow và Deny.", "Sai: security group stateful, cấp instance và chỉ có rule Allow.", "Sai: WAF lọc request web ở lớp 7.", "Sai: Shield chống DDoS, không phải tường lửa có rule cho subnet."]
  },
  {
    id: "d2-16", d: 2,
    en: "A company wants to grant users only the permissions they need to perform their jobs. Which security principle is this?",
    vi: "Công ty muốn chỉ cấp cho người dùng đúng những quyền cần thiết để làm việc. Đây là nguyên tắc bảo mật nào?",
    opts: [["Principle of least privilege", "Nguyên tắc đặc quyền tối thiểu"], ["Shared responsibility model", "Mô hình trách nhiệm chia sẻ"], ["Defense in depth (layered security)", "Phòng thủ nhiều lớp (defense in depth)"], ["Enable traceability", "Bật khả năng truy vết (traceability)"]],
    ans: [0],
    exp: "Least privilege là một nguyên tắc cốt lõi của IAM.",
    why: ["Đúng: least privilege là chỉ cấp đúng quyền cần thiết để thực hiện công việc.", "Sai: nói về phân chia trách nhiệm bảo mật giữa AWS và khách hàng.", "Sai: defense in depth là áp dụng bảo mật ở nhiều lớp (mạng, instance, ứng dụng), không phải giới hạn quyền.", "Sai: traceability là ghi log và giám sát hành động để truy vết, không quyết định cấp bao nhiêu quyền."]
  },
  {
    id: "d2-17", d: 2,
    en: "What is the MOST efficient way to grant the same permissions to 20 developers?",
    vi: "Cách hiệu quả nhất để cấp cùng một bộ quyền cho 20 lập trình viên là gì?",
    opts: [["Add the users to an IAM group that has the policy attached", "Thêm user vào một IAM group đã gắn policy"], ["Attach the same policy to each IAM user individually", "Gắn policy cho từng IAM user một"], ["Create an SCP in AWS Organizations that grants the permissions", "Tạo SCP trong AWS Organizations để cấp các quyền đó"], ["Add the developers to a resource-based policy on each resource", "Thêm các lập trình viên vào resource-based policy của từng tài nguyên"]],
    ans: [0],
    exp: "Group giúp quản lý quyền theo nhóm. Thêm hoặc bớt người chỉ cần thêm hoặc xóa khỏi group.",
    why: ["Đúng: gắn policy một lần vào group, mọi user trong group đều nhận quyền, thêm/bớt người rất dễ.", "Sai: làm được nhưng phải lặp lại 20 lần và khó quản lý khi quyền thay đổi.", "Sai: SCP chỉ đặt giới hạn quyền tối đa cho tài khoản, không cấp quyền cho user.", "Sai: phải sửa policy trên từng tài nguyên, tốn công và khó kiểm soát hơn nhiều so với group."]
  },
  {
    id: "d2-18", d: 2,
    en: "When a company uses Amazon RDS, which task is AWS responsible for?",
    vi: "Khi công ty dùng Amazon RDS, việc nào thuộc trách nhiệm của AWS?",
    opts: [["Patching the database engine and the host OS", "Vá lỗi database engine và hệ điều hành bên dưới"], ["Managing database user accounts and permissions", "Quản lý tài khoản và quyền của user trong database"], ["Configuring security group rules for the database", "Cấu hình rule security group cho database"], ["Deciding which data to store and which data to encrypt", "Quyết định lưu dữ liệu nào và mã hóa dữ liệu nào"]],
    ans: [0],
    exp: "Với dịch vụ managed như RDS, AWS lo cả việc vá OS và DB engine. Khách hàng chỉ chọn khung giờ bảo trì.",
    why: ["Đúng: RDS là dịch vụ managed nên AWS vá OS và database engine, khách hàng chỉ chọn khung giờ bảo trì.", "Sai: khách hàng quản lý user trong database.", "Sai: khách hàng cấu hình mạng.", "Sai: dữ liệu luôn là trách nhiệm của khách hàng."]
  },
  {
    id: "d2-19", d: 2,
    en: "Under the AWS shared responsibility model, which are AWS responsibilities? (Choose TWO.)",
    vi: "Theo mô hình trách nhiệm chia sẻ, việc nào là trách nhiệm của AWS? (Chọn 2.)",
    opts: [["Physical security of data centers", "Bảo mật vật lý data center"], ["Maintaining the hardware of the global infrastructure", "Bảo trì phần cứng của hạ tầng toàn cầu"], ["Encrypting customer data", "Mã hóa dữ liệu của khách hàng"], ["Managing IAM users and permissions", "Quản lý IAM user và quyền"], ["Securing application code", "Bảo mật mã nguồn ứng dụng"]],
    ans: [0, 1],
    exp: "AWS lo “OF the cloud”: data center, phần cứng, mạng toàn cầu.",
    why: ["Đúng: bảo mật vật lý data center là phần “OF the cloud” do AWS lo.", "Đúng: AWS bảo trì phần cứng, mạng và cơ sở vật chất của hạ tầng toàn cầu.", "Sai: khách hàng quyết định và cấu hình mã hóa.", "Sai: khách hàng quản lý IAM.", "Sai: khách hàng chịu trách nhiệm code của mình."]
  },
  {
    id: "d2-20", d: 2,
    en: "Which AWS service allows employees to sign in once and access multiple AWS accounts and business applications?",
    vi: "Dịch vụ nào cho phép nhân viên đăng nhập một lần để truy cập nhiều tài khoản AWS và ứng dụng doanh nghiệp?",
    opts: [["AWS IAM Identity Center", "AWS IAM Identity Center"], ["Amazon Cognito", "Amazon Cognito"], ["IAM groups", "IAM group"], ["AWS Organizations", "AWS Organizations"]],
    ans: [0],
    exp: "IAM Identity Center (tên cũ là AWS SSO) dùng để đăng nhập một lần (single sign-on) cho nhân viên vào nhiều tài khoản.",
    why: ["Đúng: IAM Identity Center cho nhân viên đăng nhập một lần vào nhiều tài khoản AWS và ứng dụng doanh nghiệp.", "Sai: Cognito dùng cho người dùng cuối của ứng dụng web/mobile.", "Sai: group chỉ gom user trong một tài khoản.", "Sai: Organizations quản lý tài khoản, không phải dịch vụ đăng nhập."]
  },
  {
    id: "d2-21", d: 2,
    en: "Which AWS service provides a centralized view of security alerts and security posture across multiple AWS accounts?",
    vi: "Dịch vụ nào cung cấp góc nhìn tập trung về cảnh báo bảo mật và tình trạng bảo mật trên nhiều tài khoản AWS?",
    opts: [["AWS Security Hub", "AWS Security Hub"], ["Amazon GuardDuty", "Amazon GuardDuty"], ["AWS Trusted Advisor", "AWS Trusted Advisor"], ["AWS CloudTrail", "AWS CloudTrail"]],
    ans: [0],
    exp: "Security Hub tổng hợp kết quả từ GuardDuty, Inspector, Macie... và kiểm tra theo các chuẩn bảo mật.",
    why: ["Đúng: Security Hub gom cảnh báo từ nhiều dịch vụ và tài khoản về một nơi, kèm kiểm tra theo chuẩn bảo mật.", "Sai: GuardDuty là một nguồn cảnh báo, không phải nơi tổng hợp.", "Sai: Trusted Advisor đưa khuyến nghị best practice chung.", "Sai: CloudTrail ghi lại API calls."]
  },
  {
    id: "d2-22", d: 2,
    en: "Which security feature adds an extra layer of sign-in protection by requiring a code from a device in addition to a password?",
    vi: "Tính năng bảo mật nào thêm một lớp bảo vệ khi đăng nhập, yêu cầu mã từ thiết bị ngoài mật khẩu?",
    opts: [["Multi-factor authentication (MFA)", "Xác thực đa yếu tố (MFA)"], ["Long-term access keys for the IAM user", "Access key dài hạn cho IAM user"], ["IAM identity-based permission policies", "IAM policy cấp quyền gắn với danh tính"], ["A strong IAM account password policy", "Password policy mạnh cho tài khoản"]],
    ans: [0],
    exp: "MFA yêu cầu thứ bạn biết (mật khẩu) và thứ bạn có (thiết bị).",
    why: ["Đúng: MFA yêu cầu thêm mã từ thiết bị ngoài mật khẩu khi đăng nhập.", "Sai: access key dùng cho truy cập bằng CLI/SDK, không phải lớp bảo vệ đăng nhập thứ hai.", "Sai: policy định nghĩa quyền được làm gì sau khi đăng nhập, không thêm bước xác thực.", "Sai: password policy chỉ quy định độ mạnh và thời hạn mật khẩu, vẫn chỉ là một yếu tố."]
  },

  // ───────── Domain 3 ─────────
  {
    id: "d3-8", d: 3,
    en: "Which AWS storage service provides block-level storage volumes for Amazon EC2 instances?",
    vi: "Dịch vụ lưu trữ nào cung cấp ổ đĩa dạng block cho instance EC2?",
    opts: [["Amazon Elastic Block Store (Amazon EBS)", "Amazon EBS"], ["Amazon Simple Storage Service (Amazon S3)", "Amazon S3"], ["Amazon Elastic File System (Amazon EFS)", "Amazon EFS"], ["Amazon S3 Glacier Flexible Retrieval", "Amazon S3 Glacier Flexible Retrieval"]],
    ans: [0],
    exp: "Block là EBS. Object là S3. File là EFS.",
    why: ["Đúng: EBS cung cấp volume dạng block gắn vào EC2 như một ổ đĩa.", "Sai: S3 là object storage, truy cập qua API chứ không gắn như ổ đĩa block.", "Sai: EFS là file storage dùng chung (NFS), không phải block.", "Sai: Glacier Flexible Retrieval là lớp lưu trữ dài hạn của S3 (object), không phải block."]
  },
  {
    id: "d3-9", d: 3,
    en: "Multiple Linux-based Amazon EC2 instances need shared, concurrent access to the same file system. Which AWS service should be used?",
    vi: "Nhiều instance EC2 chạy Linux cần truy cập đồng thời vào cùng một hệ thống file dùng chung. Nên dùng dịch vụ nào?",
    opts: [["Amazon EFS", "Amazon EFS"], ["Amazon Elastic Block Store (Amazon EBS)", "Amazon EBS"], ["Amazon S3 Glacier Deep Archive", "Amazon S3 Glacier Deep Archive"], ["Amazon EC2 instance store volumes", "Instance store của EC2"]],
    ans: [0],
    exp: "Thấy “shared file system” và “multiple instances” thì chọn EFS (Amazon Elastic File System).",
    why: ["Đúng: EFS là file system NFS được quản lý, nhiều instance Linux mount và truy cập đồng thời được.", "Sai: EBS thường chỉ gắn với một instance và nằm trong một AZ.", "Sai: Deep Archive là lớp lưu trữ lâu dài của S3, lấy dữ liệu mất nhiều giờ, không phải file system.", "Sai: instance store là ổ tạm thời gắn với một instance, mất dữ liệu khi dừng instance."]
  },
  {
    id: "d3-10", d: 3,
    en: "Which factors should a company consider when choosing an AWS Region for a workload? (Choose TWO.)",
    vi: "Công ty nên cân nhắc những yếu tố nào khi chọn AWS Region cho hệ thống? (Chọn 2.)",
    opts: [["Data sovereignty and compliance requirements", "Yêu cầu về chủ quyền dữ liệu và tuân thủ"], ["Proximity to customers to reduce latency", "Gần khách hàng để giảm độ trễ"], ["The Region where the company's IAM users were created", "Region nơi các IAM user của công ty được tạo"], ["The company's AWS Support plan", "Gói AWS Support của công ty"], ["The Region selected when the AWS account was first created", "Region được chọn khi mới tạo tài khoản AWS"]],
    ans: [0, 1],
    exp: "4 yếu tố chọn Region: compliance, proximity (latency), service availability, pricing.",
    why: ["Đúng: luật về chủ quyền dữ liệu có thể bắt buộc dữ liệu phải nằm trong một quốc gia hoặc khu vực.", "Đúng: Region gần người dùng giúp giảm độ trễ.", "Sai: IAM là dịch vụ toàn cầu, IAM user không thuộc Region nào.", "Sai: Support plan áp dụng cho cả tài khoản, như nhau ở mọi Region.", "Sai: tài khoản AWS không bị gắn với một Region; có thể dùng bất kỳ Region nào đang bật."]
  },
  {
    id: "d3-11", d: 3,
    en: "Which AWS service is a highly available and scalable Domain Name System (DNS) web service?",
    vi: "Dịch vụ nào là dịch vụ DNS có tính sẵn sàng cao và khả năng mở rộng?",
    opts: [["Amazon Route 53", "Amazon Route 53"], ["Amazon CloudFront", "Amazon CloudFront"], ["Elastic Load Balancing", "Elastic Load Balancing"], ["Amazon VPC", "Amazon VPC"]],
    ans: [0],
    exp: "DNS là Route 53. Con số 53 là cổng (port) của DNS.",
    why: ["Đúng: Route 53 là dịch vụ DNS có tính sẵn sàng cao, kèm đăng ký tên miền và health check.", "Sai: CloudFront là CDN, cache nội dung chứ không phân giải tên miền.", "Sai: ELB chia tải giữa các target, không phải DNS.", "Sai: VPC là mạng riêng ảo, không phải dịch vụ DNS công khai."]
  },
  {
    id: "d3-12", d: 3,
    en: "A company wants to automatically add Amazon EC2 instances during peak hours and remove them when traffic decreases. Which AWS service should it use?",
    vi: "Công ty muốn tự động thêm instance EC2 vào giờ cao điểm và bớt đi khi lưu lượng giảm. Nên dùng dịch vụ nào?",
    opts: [["Amazon EC2 Auto Scaling", "Amazon EC2 Auto Scaling"], ["Elastic Load Balancing", "Elastic Load Balancing"], ["Amazon CloudFront", "Amazon CloudFront"], ["AWS Trusted Advisor", "AWS Trusted Advisor"]],
    ans: [0],
    exp: "Thêm hoặc bớt số instance là việc của Auto Scaling. Chia traffic giữa các instance là việc của ELB.",
    why: ["Đúng: EC2 Auto Scaling tự thêm instance khi tải tăng và bớt instance khi tải giảm.", "Sai: ELB chia traffic nhưng không thay đổi số instance.", "Sai: CloudFront là CDN, cache nội dung chứ không thêm/bớt instance.", "Sai: Trusted Advisor chỉ đưa khuyến nghị, không tự thay đổi số instance."]
  },
  {
    id: "d3-13", d: 3,
    en: "Which relational database service is built by AWS for the cloud, is compatible with MySQL and PostgreSQL, and offers higher performance than standard MySQL?",
    vi: "Dịch vụ cơ sở dữ liệu quan hệ nào do AWS xây dựng cho cloud, tương thích MySQL và PostgreSQL, hiệu năng cao hơn MySQL thông thường?",
    opts: [["Amazon Aurora", "Amazon Aurora"], ["Amazon DynamoDB", "Amazon DynamoDB"], ["Amazon Redshift", "Amazon Redshift"], ["Amazon ElastiCache", "Amazon ElastiCache"]],
    ans: [0],
    exp: "Aurora là DB quan hệ của AWS, chạy trong Amazon RDS.",
    why: ["Đúng: Aurora là DB quan hệ do AWS xây cho cloud, tương thích MySQL/PostgreSQL, nhanh hơn MySQL chuẩn.", "Sai: DynamoDB là NoSQL key-value, không tương thích MySQL/PostgreSQL.", "Sai: Redshift là data warehouse cho phân tích, không phải DB giao dịch tương thích MySQL.", "Sai: ElastiCache là cache trong bộ nhớ (Redis/Memcached), không phải DB quan hệ."]
  },
  {
    id: "d3-14", d: 3,
    en: "A company needs to run complex analytical queries on petabytes of structured data. Which AWS service is designed for this?",
    vi: "Công ty cần chạy truy vấn phân tích phức tạp trên hàng petabyte dữ liệu có cấu trúc. Dịch vụ nào được thiết kế cho việc này?",
    opts: [["Amazon Redshift", "Amazon Redshift"], ["Amazon DynamoDB", "Amazon DynamoDB"], ["Amazon RDS", "Amazon RDS"], ["Amazon ElastiCache", "Amazon ElastiCache"]],
    ans: [0],
    exp: "Thấy “analytical queries” hoặc “data warehouse” thì chọn Redshift.",
    why: ["Đúng: Redshift là data warehouse dạng cột, tối ưu cho truy vấn phân tích trên hàng petabyte.", "Sai: DynamoDB là NoSQL cho ứng dụng (OLTP).", "Sai: RDS dùng cho giao dịch (OLTP), không tối ưu cho phân tích petabyte.", "Sai: ElastiCache là cache trong bộ nhớ, không chạy truy vấn phân tích trên petabyte dữ liệu."]
  },
  {
    id: "d3-15", d: 3,
    en: "A company wants to improve the performance of a read-heavy application by caching frequently accessed data in memory. Which AWS service should it use?",
    vi: "Công ty muốn tăng hiệu năng cho ứng dụng đọc nhiều bằng cách cache dữ liệu hay dùng trong bộ nhớ. Nên dùng dịch vụ nào?",
    opts: [["Amazon ElastiCache", "Amazon ElastiCache"], ["Amazon Redshift", "Amazon Redshift"], ["Amazon RDS read replicas", "Amazon RDS read replica"], ["Amazon EBS", "Amazon EBS"]],
    ans: [0],
    exp: "Cache trong bộ nhớ (in-memory) là ElastiCache (Redis/Memcached).",
    why: ["Đúng: ElastiCache là cache in-memory (Redis/Memcached), giảm tải đọc cho database.", "Sai: Redshift là data warehouse cho phân tích, không phải cache.", "Sai: read replica giúp chia tải đọc nhưng vẫn là database đọc từ đĩa, không phải cache trong bộ nhớ.", "Sai: EBS là ổ đĩa block cho EC2, không phải cache trong bộ nhớ."]
  },
  {
    id: "d3-16", d: 3,
    en: "A company wants to decouple the components of its application so that messages are stored in a queue until they are processed. Which AWS service should it use?",
    vi: "Công ty muốn tách rời (decouple) các thành phần của ứng dụng để message được lưu trong hàng đợi cho đến khi được xử lý. Nên dùng dịch vụ nào?",
    opts: [["Amazon Simple Queue Service (Amazon SQS)", "Amazon SQS"], ["Amazon Simple Notification Service (Amazon SNS)", "Amazon SNS"], ["Amazon Route 53", "Amazon Route 53"], ["AWS CloudTrail", "AWS CloudTrail"]],
    ans: [0],
    exp: "Thấy “queue” thì chọn SQS. Thấy “notification” hoặc “pub/sub” thì chọn SNS.",
    why: ["Đúng: SQS lưu message trong hàng đợi đến khi consumer xử lý, giúp tách rời các thành phần.", "Sai: SNS đẩy thông báo tới subscriber, không lưu hàng đợi chờ xử lý.", "Sai: Route 53 là DNS, không truyền message giữa các thành phần.", "Sai: CloudTrail ghi lại API calls để kiểm toán, không phải hàng đợi."]
  },
  {
    id: "d3-17", d: 3,
    en: "Which AWS service uses a publish/subscribe model to send notifications to subscribers through email, SMS, and other endpoints?",
    vi: "Dịch vụ nào dùng mô hình publish/subscribe để gửi thông báo tới người đăng ký qua email, SMS và các endpoint khác?",
    opts: [["Amazon Simple Notification Service", "Amazon SNS"], ["Amazon Simple Queue Service (Amazon SQS)", "Amazon SQS"], ["Amazon CloudWatch Logs", "Amazon CloudWatch Logs"], ["AWS Step Functions", "AWS Step Functions"]],
    ans: [0],
    exp: "SNS (Simple Notification Service) là pub/sub: một message được gửi tới nhiều subscriber cùng lúc.",
    why: ["Đúng: SNS là pub/sub, đẩy một message tới nhiều subscriber qua email, SMS, HTTP, SQS, Lambda.", "Sai: SQS là hàng đợi, consumer chủ động lấy message.", "Sai: CloudWatch Logs dùng để lưu và tìm kiếm log, không gửi thông báo tới subscriber.", "Sai: Step Functions dùng để điều phối các bước trong workflow."]
  },
  {
    id: "d3-18", d: 3,
    en: "A company wants to provision AWS resources in a repeatable way by using templates. Which AWS service should it use?",
    vi: "Công ty muốn tạo tài nguyên AWS một cách lặp lại được bằng template. Nên dùng dịch vụ nào?",
    opts: [["AWS CloudFormation", "AWS CloudFormation"], ["AWS Elastic Beanstalk", "AWS Elastic Beanstalk"], ["AWS Systems Manager", "AWS Systems Manager"], ["AWS CloudTrail", "AWS CloudTrail"]],
    ans: [0],
    exp: "Infrastructure as Code (IaC) bằng template là CloudFormation.",
    why: ["Đúng: CloudFormation tạo tài nguyên từ template (IaC), chạy lại nhiều lần cho kết quả giống nhau.", "Sai: Beanstalk triển khai ứng dụng từ code, không phải công cụ template hạ tầng tổng quát.", "Sai: Systems Manager quản lý và vận hành instance (patch, chạy lệnh).", "Sai: CloudTrail ghi lại API calls."]
  },
  {
    id: "d3-19", d: 3,
    en: "Developers want to upload their code and have AWS automatically handle deployment, capacity provisioning, load balancing, and auto scaling. Which AWS service should they use?",
    vi: "Lập trình viên muốn chỉ upload code, còn AWS tự lo triển khai, cấp phát tài nguyên, cân bằng tải và auto scaling. Nên dùng dịch vụ nào?",
    opts: [["AWS Elastic Beanstalk", "AWS Elastic Beanstalk"], ["AWS CloudFormation", "AWS CloudFormation"], ["Amazon EC2", "Amazon EC2"], ["Amazon Lightsail", "Amazon Lightsail"]],
    ans: [0],
    exp: "Thấy “upload code” và AWS lo phần còn lại thì chọn Elastic Beanstalk (PaaS).",
    why: ["Đúng: Beanstalk nhận code rồi tự lo triển khai, cấp phát, cân bằng tải và auto scaling.", "Sai: CloudFormation cần bạn tự viết template hạ tầng.", "Sai: EC2 cần tự quản lý mọi thứ.", "Sai: Lightsail là VPS đơn giản, không tự auto scaling."]
  },
  {
    id: "d3-20", d: 3,
    en: "Which AWS service lets a company run containers without managing servers or clusters of Amazon EC2 instances?",
    vi: "Dịch vụ nào cho phép chạy container mà không cần quản lý server hay cụm instance EC2?",
    opts: [["AWS Fargate", "AWS Fargate"], ["Amazon EC2", "Amazon EC2"], ["AWS Outposts", "AWS Outposts"], ["Amazon Lightsail", "Amazon Lightsail"]],
    ans: [0],
    exp: "Fargate là compute serverless cho container, dùng cùng ECS hoặc EKS.",
    why: ["Đúng: Fargate là compute serverless cho container, dùng với ECS hoặc EKS, không cần quản lý EC2.", "Sai: với EC2 bạn phải tự quản lý instance và cụm máy chạy container.", "Sai: Outposts đưa hạ tầng AWS về data center của khách hàng.", "Sai: Lightsail là VPS giá cố định, vẫn là server bạn phải quản lý."]
  },
  {
    id: "d3-21", d: 3,
    en: "Which component of the AWS global infrastructure does Amazon CloudFront use to cache content closer to users?",
    vi: "CloudFront dùng thành phần nào của hạ tầng toàn cầu AWS để cache nội dung gần người dùng?",
    opts: [["Edge locations", "Edge location"], ["Availability Zones", "Availability Zone"], ["Regions", "Region"], ["VPCs", "VPC"]],
    ans: [0],
    exp: "Edge location có số lượng nhiều hơn Region và AZ rất nhiều, đặt gần người dùng.",
    why: ["Đúng: CloudFront cache nội dung tại edge location, số lượng nhiều và đặt gần người dùng.", "Sai: AZ là nơi chạy tài nguyên trong Region, không phải điểm cache của CloudFront.", "Sai: Region là khu vực địa lý chứa nhiều AZ, số lượng ít hơn edge location rất nhiều.", "Sai: VPC là mạng riêng ảo, không phải thành phần hạ tầng toàn cầu."]
  },
  {
    id: "d3-22", d: 3,
    en: "A company wants to quickly establish an encrypted connection between its on-premises network and its Amazon VPC over the internet. Which AWS service should it use?",
    vi: "Công ty muốn nhanh chóng thiết lập kết nối mã hóa qua internet giữa mạng tại chỗ và Amazon VPC. Nên dùng dịch vụ nào?",
    opts: [["AWS Site-to-Site VPN", "AWS Site-to-Site VPN"], ["AWS Direct Connect", "AWS Direct Connect"], ["Internet gateway", "Internet gateway"], ["Amazon CloudFront", "Amazon CloudFront"]],
    ans: [0],
    exp: "Nhanh, mã hóa, qua internet thì chọn VPN. Riêng, ổn định, không qua internet thì chọn Direct Connect (triển khai lâu hơn).",
    why: ["Đúng: Site-to-Site VPN tạo đường hầm IPsec mã hóa qua internet, thiết lập nhanh.", "Sai: Direct Connect cần thời gian lắp đặt đường truyền vật lý.", "Sai: Internet gateway chỉ cho VPC ra internet, không tạo kết nối mã hóa tới on-premises.", "Sai: CloudFront là CDN."]
  },
  {
    id: "d3-23", d: 3,
    en: "Which AWS service is a hybrid cloud storage service that gives on-premises applications access to virtually unlimited cloud storage?",
    vi: "Dịch vụ nào là lưu trữ hybrid cloud, cho ứng dụng tại chỗ truy cập dung lượng lưu trữ cloud gần như không giới hạn?",
    opts: [["AWS Storage Gateway", "AWS Storage Gateway"], ["Amazon EFS", "Amazon EFS"], ["Amazon EBS", "Amazon EBS"], ["Amazon S3 Glacier", "Amazon S3 Glacier"]],
    ans: [0],
    exp: "Thấy “hybrid storage” và “on-premises applications” thì chọn Storage Gateway.",
    why: ["Đúng: Storage Gateway cho ứng dụng on-premises dùng lưu trữ trên AWS (S3, FSx...) qua giao thức file, volume, tape.", "Sai: EFS là file system cho tài nguyên trên AWS.", "Sai: EBS là ổ đĩa cho EC2.", "Sai: Glacier là lớp lưu trữ của S3, không phải cổng kết nối hybrid."]
  },
  {
    id: "d3-24", d: 3,
    en: "A developer wants to interact with AWS services from application code written in Python. What should the developer use?",
    vi: "Lập trình viên muốn thao tác với dịch vụ AWS từ code ứng dụng viết bằng Python. Nên dùng gì?",
    opts: [["AWS SDK", "AWS SDK"], ["AWS Management Console", "AWS Management Console"], ["AWS CLI", "AWS CLI"], ["AWS Trusted Advisor", "AWS Trusted Advisor"]],
    ans: [0],
    exp: "Trong code thì dùng SDK. Trên dòng lệnh thì dùng CLI. Trên giao diện web thì dùng Console.",
    why: ["Đúng: AWS SDK (với Python là Boto3) cho phép gọi API AWS ngay trong code ứng dụng.", "Sai: Console là giao diện web để thao tác thủ công, không gọi từ code.", "Sai: CLI dùng trên terminal hoặc script shell.", "Sai: Trusted Advisor chỉ đưa khuyến nghị, không phải công cụ lập trình."]
  },
  {
    id: "d3-25", d: 3,
    en: "A company must run AWS infrastructure and services in its own data center to meet low-latency requirements for on-premises systems. Which AWS service should it use?",
    vi: "Công ty cần chạy hạ tầng và dịch vụ AWS ngay trong data center của mình để đáp ứng độ trễ thấp cho hệ thống tại chỗ. Nên dùng dịch vụ nào?",
    opts: [["AWS Outposts", "AWS Outposts"], ["AWS Local Zones", "AWS Local Zones"], ["AWS Direct Connect", "AWS Direct Connect"], ["Amazon CloudFront", "Amazon CloudFront"]],
    ans: [0],
    exp: "Outposts là rack phần cứng AWS đặt tại data center của khách hàng.",
    why: ["Đúng: Outposts đặt rack phần cứng AWS ngay trong data center của khách hàng.", "Sai: Local Zones là hạ tầng AWS ở gần các thành phố lớn, nhưng không nằm trong data center của khách hàng.", "Sai: Direct Connect chỉ là đường truyền.", "Sai: CloudFront là CDN."]
  },
  {
    id: "d3-26", d: 3,
    en: "Which Amazon EC2 instance family is BEST suited for memory-intensive workloads, such as in-memory databases?",
    vi: "Họ instance EC2 nào phù hợp nhất cho tải cần nhiều bộ nhớ, như database trong bộ nhớ?",
    opts: [["Memory optimized", "Tối ưu bộ nhớ"], ["Compute optimized", "Tối ưu tính toán"], ["Storage optimized", "Tối ưu lưu trữ"], ["General purpose", "Đa dụng"]],
    ans: [0],
    exp: "Memory optimized (R, X) dùng cho tải cần nhiều RAM. Compute optimized (C) dùng cho tải cần nhiều CPU. Storage optimized (I, D) dùng cho tải đọc/ghi đĩa nhiều. General purpose (T, M) là cân bằng.",
    why: ["Đúng: Memory optimized (R, X) có tỷ lệ RAM/CPU cao, hợp với database trong bộ nhớ.", "Sai: phù hợp với xử lý nặng CPU (batch, game server).", "Sai: phù hợp với đọc/ghi đĩa tốc độ cao.", "Sai: cân bằng, không tối ưu cho bộ nhớ."]
  },

  // ───────── Domain 4 ─────────
  {
    id: "d4-7", d: 4,
    en: "Which AWS tool lets a company visualize and analyze its AWS costs over the past months and forecast future costs?",
    vi: "Công cụ nào giúp công ty trực quan hóa, phân tích chi phí AWS các tháng qua và dự báo chi phí tương lai?",
    opts: [["AWS Cost Explorer", "AWS Cost Explorer"], ["AWS Budgets", "AWS Budgets"], ["AWS Pricing Calculator", "AWS Pricing Calculator"], ["AWS Artifact", "AWS Artifact"]],
    ans: [0],
    exp: "Phân tích quá khứ và dự báo là Cost Explorer.",
    why: ["Đúng: Cost Explorer có biểu đồ chi phí theo thời gian, lọc theo dịch vụ/tag và dự báo chi phí.", "Sai: Budgets dùng để đặt ngân sách và cảnh báo.", "Sai: Pricing Calculator ước tính trước khi dùng.", "Sai: Artifact cung cấp báo cáo tuân thủ."]
  },
  {
    id: "d4-8", d: 4,
    en: "A company wants to commit to a consistent amount of compute usage (measured in $/hour) for 1 or 3 years, and have the discount apply across Amazon EC2, AWS Fargate, and AWS Lambda. Which option should it choose?",
    vi: "Công ty muốn cam kết một mức sử dụng compute ổn định (tính theo $/giờ) trong 1 hoặc 3 năm, và giảm giá áp dụng cho cả EC2, Fargate và Lambda. Nên chọn gì?",
    opts: [["Compute Savings Plans", "Compute Savings Plans"], ["Standard Reserved Instances", "Standard Reserved Instances"], ["Spot Instances", "Spot Instances"], ["Dedicated Hosts", "Dedicated Hosts"]],
    ans: [0],
    exp: "Compute Savings Plans linh hoạt nhất: áp dụng cho EC2 (mọi họ instance và Region), Fargate và Lambda.",
    why: ["Đúng: Compute Savings Plans cam kết $/giờ trong 1 hoặc 3 năm, áp dụng cho EC2, Fargate và Lambda.", "Sai: Reserved Instances chỉ áp dụng cho EC2 (và một số dịch vụ DB), gắn với loại instance.", "Sai: Spot không có cam kết.", "Sai: Dedicated Hosts là server vật lý riêng."]
  },
  {
    id: "d4-9", d: 4,
    en: "A company wants to track AWS costs by project and by department. What should it use?",
    vi: "Công ty muốn theo dõi chi phí AWS theo từng dự án và phòng ban. Nên dùng gì?",
    opts: [["Cost allocation tags", "Cost allocation tag"], ["Service control policies (SCPs)", "Service control policy (SCP)"], ["IAM roles", "IAM role"], ["Security groups", "Security group"]],
    ans: [0],
    exp: "Gắn tag (ví dụ Project=A) cho tài nguyên, bật tag đó là cost allocation tag, rồi xem chi phí theo tag trong Cost Explorer.",
    why: ["Đúng: gắn tag theo dự án/phòng ban rồi kích hoạt làm cost allocation tag để xem chi phí theo tag.", "Sai: SCP giới hạn quyền trong Organizations, không phân bổ chi phí.", "Sai: IAM role dùng để cấp quyền, không theo dõi chi phí.", "Sai: security group là tường lửa ở cấp instance, không liên quan chi phí."]
  },
  {
    id: "d4-10", d: 4,
    en: "Which AWS service provides recommendations to help reduce costs, such as identifying idle resources and underutilized Amazon EC2 instances?",
    vi: "Dịch vụ nào đưa khuyến nghị giúp giảm chi phí, ví dụ phát hiện tài nguyên nhàn rỗi và instance EC2 dùng chưa hết công suất?",
    opts: [["AWS Trusted Advisor", "AWS Trusted Advisor"], ["Amazon Inspector", "Amazon Inspector"], ["Amazon GuardDuty", "Amazon GuardDuty"], ["AWS Config", "AWS Config"]],
    ans: [0],
    exp: "Trusted Advisor kiểm tra theo 6 nhóm: cost optimization, performance, security, fault tolerance, service limits, operational excellence.",
    why: ["Đúng: nhóm kiểm tra cost optimization của Trusted Advisor chỉ ra tài nguyên nhàn rỗi và EC2 dùng chưa hết công suất.", "Sai: Inspector quét lỗ hổng phần mềm, không đưa khuyến nghị chi phí.", "Sai: GuardDuty phát hiện mối đe dọa bảo mật từ log.", "Sai: Config theo dõi và đánh giá cấu hình, không khuyến nghị giảm chi phí."]
  },
  {
    id: "d4-11", d: 4,
    en: "Which AWS Support plan is included with every AWS account at no additional cost?",
    vi: "Gói AWS Support nào có sẵn trong mọi tài khoản AWS mà không mất thêm phí?",
    opts: [["Basic Support", "Basic Support"], ["AWS Business Support+", "AWS Business Support+"], ["AWS Enterprise Support", "AWS Enterprise Support"], ["AWS Unified Operations", "AWS Unified Operations"]],
    ans: [0],
    exp: "Basic miễn phí: gồm tài liệu, diễn đàn, các kiểm tra cốt lõi của Trusted Advisor, và hỗ trợ về billing/tài khoản.",
    why: ["Đúng: Basic Support có sẵn miễn phí cho mọi tài khoản (tài liệu, re:Post, hỗ trợ billing/tài khoản).", "Sai: Business Support+ là gói trả phí, phải đăng ký thêm.", "Sai: Enterprise Support là gói trả phí cho doanh nghiệp có workload quan trọng.", "Sai: Unified Operations là gói cao nhất, trả phí, dành cho workload trọng yếu."]
  },
  {
    id: "d4-12", d: 4,
    en: "A company has existing server-bound software licenses that are licensed per socket or per core. Which EC2 option lets the company use these licenses on AWS?",
    vi: "Công ty có license phần mềm gắn với server, tính theo socket hoặc core. Lựa chọn EC2 nào cho phép dùng các license này trên AWS?",
    opts: [["Dedicated Hosts", "Dedicated Hosts"], ["Spot Instances", "Spot Instances"], ["On-Demand Instances", "On-Demand Instances"], ["Compute Savings Plans", "Compute Savings Plans"]],
    ans: [0],
    exp: "Thấy “server-bound licenses”, “per socket/per core” hoặc “BYOL” thì chọn Dedicated Hosts, vì bạn thấy được server vật lý.",
    why: ["Đúng: Dedicated Hosts cho thấy socket/core của server vật lý, nên dùng được license BYOL theo socket/core.", "Sai: Spot dùng phần cứng dùng chung và có thể bị thu hồi.", "Sai: On-Demand chạy trên phần cứng dùng chung.", "Sai: Savings Plans chỉ là mô hình giảm giá."]
  },
  {
    id: "d4-13", d: 4,
    en: "Where can a company find, buy, and quickly deploy third-party software that runs on AWS?",
    vi: "Công ty có thể tìm, mua và triển khai nhanh phần mềm của bên thứ ba chạy trên AWS ở đâu?",
    opts: [["AWS Marketplace", "AWS Marketplace"], ["AWS Artifact", "AWS Artifact"], ["AWS Service Catalog", "AWS Service Catalog"], ["AWS Partner Network (APN)", "AWS Partner Network (APN)"]],
    ans: [0],
    exp: "Marketplace là “chợ” phần mềm bên thứ ba, tính tiền qua hóa đơn AWS.",
    why: ["Đúng: Marketplace là danh mục phần mềm bên thứ ba, mua và triển khai nhanh, tính tiền qua hóa đơn AWS.", "Sai: Artifact cung cấp báo cáo tuân thủ.", "Sai: Service Catalog là danh mục sản phẩm nội bộ do công ty tự duyệt.", "Sai: APN là chương trình dành cho đối tác của AWS (công ty tư vấn, công ty phần mềm)."]
  }
);

/* Từ khóa mới */
window.CLF.glossary.push(
  { term: "environmental impact", vi: "tác động môi trường", hint: "Well-Architected → Sustainability" },
  { term: "operations as code", vi: "vận hành bằng code", hint: "Operational Excellence" },
  { term: "idle", vi: "nhàn rỗi, không dùng tới", hint: "Trusted Advisor / Stop guessing capacity" },
  { term: "encryption keys", vi: "khóa mã hóa", hint: "AWS KMS" },
  { term: "credentials", vi: "thông tin đăng nhập", hint: "Secrets Manager; không chia sẻ" },
  { term: "rotate", vi: "xoay vòng, đổi định kỳ", hint: "Secrets Manager" },
  { term: "sensitive data", vi: "dữ liệu nhạy cảm", hint: "Amazon Macie" },
  { term: "vulnerabilities", vi: "lỗ hổng bảo mật", hint: "Amazon Inspector" },
  { term: "stateful", vi: "có ghi nhớ trạng thái kết nối", hint: "Security group" },
  { term: "stateless", vi: "không ghi nhớ trạng thái", hint: "Network ACL" },
  { term: "security posture", vi: "tình trạng bảo mật tổng thể", hint: "AWS Security Hub" },
  { term: "sign in once", vi: "đăng nhập một lần", hint: "IAM Identity Center (SSO)" },
  { term: "block-level storage", vi: "lưu trữ dạng block (ổ đĩa)", hint: "Amazon EBS" },
  { term: "analytical queries", vi: "truy vấn phân tích", hint: "Amazon Redshift" },
  { term: "read-heavy", vi: "đọc nhiều", hint: "ElastiCache, read replica" },
  { term: "decouple", vi: "tách rời các thành phần", hint: "Amazon SQS" },
  { term: "publish/subscribe", vi: "mô hình phát/đăng ký", hint: "Amazon SNS" },
  { term: "templates", vi: "mẫu định nghĩa hạ tầng", hint: "AWS CloudFormation (IaC)" },
  { term: "repeatable", vi: "lặp lại được", hint: "IaC → CloudFormation" },
  { term: "memory-intensive", vi: "cần nhiều bộ nhớ (RAM)", hint: "Memory optimized" },
  { term: "forecast", vi: "dự báo", hint: "AWS Cost Explorer" },
  { term: "server-bound software licenses", vi: "license gắn với server", hint: "Dedicated Hosts" },
  { term: "third-party software", vi: "phần mềm bên thứ ba", hint: "AWS Marketplace" },
  { term: "hybrid", vi: "kết hợp on-premises và cloud", hint: "Storage Gateway, Outposts, VPN" }
);

/* Thẻ dịch vụ mới */
window.CLF.services.push(
  { name: "AWS IAM Identity Center", d: 2, vi: "Đăng nhập một lần (SSO) cho nhân viên vào nhiều tài khoản AWS và ứng dụng.", confuse: "Amazon Cognito (người dùng cuối của app)" },
  { name: "Amazon Cognito", d: 2, vi: "Đăng ký và đăng nhập cho người dùng của ứng dụng web/mobile.", confuse: "IAM Identity Center" },
  { name: "AWS Security Hub", d: 2, vi: "Tổng hợp cảnh báo và tình trạng bảo mật từ nhiều dịch vụ và tài khoản.", confuse: "GuardDuty, Trusted Advisor" },
  { name: "AWS Certificate Manager", d: 2, vi: "Cấp và quản lý chứng chỉ SSL/TLS.", confuse: "KMS" },
  { name: "AWS Fargate", d: 3, vi: "Chạy container serverless (cùng ECS/EKS).", confuse: "Lambda, EC2" },
  { name: "AWS Outposts", d: 3, vi: "Hạ tầng AWS đặt tại data center của khách hàng.", confuse: "Local Zones" },
  { name: "AWS Storage Gateway", d: 3, vi: "Lưu trữ hybrid: ứng dụng on-premises dùng lưu trữ cloud.", confuse: "EFS, Direct Connect" },
  { name: "AWS Site-to-Site VPN", d: 3, vi: "Kết nối mã hóa giữa on-premises và VPC qua internet.", confuse: "Direct Connect" },
  { name: "AWS Systems Manager", d: 3, vi: "Quản lý và vận hành instance: patch, chạy lệnh, Parameter Store.", confuse: "CloudFormation" },
  { name: "AWS Marketplace", d: 4, vi: "Chợ phần mềm bên thứ ba chạy trên AWS.", confuse: "Service Catalog, APN" }
);
