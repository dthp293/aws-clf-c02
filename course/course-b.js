(window.CLF.course = window.CLF.course || []).push(
  {
    id: "2-1",
    module: 2,
    title: "Mô hình trách nhiệm chia sẻ (Shared Responsibility Model)",
    mins: 13,
    goals: [
      "Phân biệt được \"security OF the cloud\" (việc của AWS) và \"security IN the cloud\" (việc của bạn)",
      "Biết trách nhiệm thay đổi thế nào khi dùng EC2, RDS, Lambda, S3",
      "Hiểu ba nhóm shared controls: patch management, configuration management, awareness & training",
      "Trả lời nhanh các câu hỏi \"việc này là của AWS hay của khách hàng?\""
    ],
    html: `
<h3>Vì sao phải \"chia\" trách nhiệm bảo mật?</h3>
<p>Khi bạn tự mua một máy tính đặt trong nhà để chạy website, <b>mọi thứ</b> là việc của bạn: khóa cửa phòng máy, thay ổ cứng hỏng, cài phần mềm diệt virus, đặt mật khẩu, sao lưu dữ liệu. Không ai làm giúp.</p>
<p>Khi chuyển lên cloud, bạn đang <b>thuê</b> hạ tầng của AWS. Một phần công việc bảo mật giờ do AWS làm, phần còn lại vẫn là của bạn. Ranh giới giữa hai phần này được AWS gọi là <b>Shared Responsibility Model</b> (mô hình trách nhiệm chia sẻ).</p>
<p>Đây là một trong những chủ đề <b>chắc chắn có trong đề thi</b>. Câu hỏi thường rất ngắn: \"Việc X là trách nhiệm của AWS hay của khách hàng?\". Nắm vững bài này là ăn chắc vài câu.</p>

<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>Hãy tưởng tượng bạn thuê một căn hộ chung cư. <b>Chủ tòa nhà</b> lo móng nhà, tường bao, thang máy, bảo vệ ở cổng, hệ thống điện nước chung. <b>Bạn</b> (người thuê) lo khóa cửa căn hộ của mình, quyết định đưa chìa khóa cho ai, cất đồ quý vào két, không để bếp ga cháy. Nếu bạn quên khóa cửa và bị mất đồ, đó không phải lỗi của chủ tòa nhà.</p><p>AWS là chủ tòa nhà. Bạn là người thuê.</p></div>

<h3>Security OF the cloud và security IN the cloud</h3>
<p>AWS tóm tắt mô hình bằng hai cụm từ dễ nhớ:</p>
<ul>
<li><b>Security OF the cloud</b> (bảo mật <i>của</i> đám mây) là việc của <b>AWS</b>. Nghĩa là bảo vệ chính cái hạ tầng làm nên cloud: tòa nhà data center (trung tâm dữ liệu), máy chủ vật lý, ổ cứng, dây mạng, hệ thống điện và làm mát, phần mềm ảo hóa (<b>hypervisor</b>, lớp phần mềm chia một máy chủ thật thành nhiều máy ảo), và mạng toàn cầu nối các Region, Availability Zone, Edge Location.</li>
<li><b>Security IN the cloud</b> (bảo mật <i>bên trong</i> đám mây) là việc của <b>khách hàng</b>. Nghĩa là bảo vệ những gì bạn đặt vào và cấu hình trên cloud: dữ liệu của bạn, ai được đăng nhập và làm gì (IAM), cấu hình tường lửa (security group), có mã hóa dữ liệu hay không, hệ điều hành trên máy ảo EC2 và ứng dụng bạn cài.</li>
</ul>
<table>
<tr><th>AWS lo (OF the cloud)</th><th>Khách hàng lo (IN the cloud)</th></tr>
<tr><td>An ninh vật lý data center: bảo vệ, camera, kiểm soát ra vào</td><td>Dữ liệu của khách hàng và việc phân loại, mã hóa dữ liệu</td></tr>
<tr><td>Phần cứng: máy chủ, ổ cứng, thiết bị mạng; thay thế và tiêu hủy ổ cứng cũ</td><td>Quản lý người dùng, quyền truy cập, mật khẩu, MFA (IAM)</td></tr>
<tr><td>Hypervisor và hạ tầng ảo hóa</td><td>Hệ điều hành khách (guest OS) trên EC2: cài bản vá, cấu hình</td></tr>
<tr><td>Mạng toàn cầu, Region, AZ, Edge Location</td><td>Cấu hình security group, network ACL, tường lửa trong máy</td></tr>
<tr><td>Phần mềm nền của các dịch vụ managed (RDS, Lambda, S3…)</td><td>Ứng dụng và mã nguồn của mình, bật mã hóa, cấu hình quyền truy cập S3</td></tr>
</table>

<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>Hồi website BánhNgon còn chạy trên chiếc máy tính trong kho, có lần chuột cắn đứt dây điện, website tắt cả buổi sáng. Minh phải tự đi mua dây mới. Từ khi chuyển lên AWS, chuyện điện, dây, ổ cứng hỏng là việc của AWS.</p><p>Nhưng Minh vẫn phải tự lo: đặt mật khẩu mạnh cho tài khoản, không chia sẻ mật khẩu cho nhân viên bán hàng, cài bản vá cho hệ điều hành trên máy chủ EC2, và không để thư mục ảnh hóa đơn trên S3 ở chế độ công khai. Nếu Minh lỡ mở công khai thư mục hóa đơn, AWS <b>không</b> chịu trách nhiệm.</p></div>

<h3>Trách nhiệm thay đổi theo loại dịch vụ</h3>
<p>Ranh giới không cố định. Dịch vụ càng <b>managed</b> (được AWS quản lý sẵn) thì AWS càng lo nhiều, bạn càng lo ít. Hãy so sánh bốn dịch vụ hay xuất hiện trong đề:</p>
<ul>
<li><b>Amazon EC2</b> (máy chủ ảo): bạn thuê một \"máy tính trống\". AWS lo phần cứng và hypervisor. Bạn lo hệ điều hành, bản vá, phần mềm cài thêm, tường lửa, dữ liệu. Đây là kiểu <b>IaaS</b> (Infrastructure as a Service, hạ tầng như một dịch vụ), nên bạn gánh nhiều việc nhất.</li>
<li><b>Amazon RDS</b> (cơ sở dữ liệu quan hệ được quản lý): AWS lo thêm hệ điều hành bên dưới, cài đặt và vá phần mềm database, hỗ trợ sao lưu tự động. Bạn lo: tạo <b>tài khoản database</b> và chỉ cấp cho mỗi tài khoản đúng quyền cần thiết, mật khẩu database, có bật mã hóa không, security group (nguồn nào được kết nối tới database), và dữ liệu bên trong.</li>
<li><b>AWS Lambda</b> (chạy code không cần quản lý máy chủ, <b>serverless</b>): AWS lo máy chủ, hệ điều hành, môi trường chạy (runtime), việc mở rộng. Bạn chỉ lo <b>mã nguồn</b> của hàm, quyền IAM của hàm và dữ liệu nó xử lý.</li>
<li><b>Amazon S3</b> (lưu trữ file): AWS lo hạ tầng lưu trữ và độ bền dữ liệu. Bạn lo: ai được đọc/ghi bucket (bucket policy, chặn truy cập công khai), có mã hóa không, có bật versioning không, và nội dung file.</li>
</ul>
<table>
<tr><th>Việc cần làm</th><th>EC2</th><th>RDS</th><th>Lambda</th><th>S3</th></tr>
<tr><td>Phần cứng, data center</td><td>AWS</td><td>AWS</td><td>AWS</td><td>AWS</td></tr>
<tr><td>Vá hệ điều hành</td><td><b>Khách hàng</b></td><td>AWS</td><td>AWS</td><td>AWS</td></tr>
<tr><td>Vá phần mềm database / runtime</td><td><b>Khách hàng</b> (nếu tự cài)</td><td>AWS</td><td>AWS</td><td>Không áp dụng</td></tr>
<tr><td>Cấu hình tường lửa mạng (security group)</td><td><b>Khách hàng</b></td><td><b>Khách hàng</b></td><td>Không bắt buộc</td><td>Không áp dụng</td></tr>
<tr><td>Mã nguồn ứng dụng</td><td><b>Khách hàng</b></td><td><b>Khách hàng</b></td><td><b>Khách hàng</b></td><td>Không áp dụng</td></tr>
<tr><td>Quyền truy cập (IAM, policy)</td><td><b>Khách hàng</b></td><td><b>Khách hàng</b></td><td><b>Khách hàng</b></td><td><b>Khách hàng</b></td></tr>
<tr><td>Dữ liệu và bật mã hóa</td><td><b>Khách hàng</b></td><td><b>Khách hàng</b></td><td><b>Khách hàng</b></td><td><b>Khách hàng</b></td></tr>
</table>
<p>Hãy để ý hai dòng cuối: <b>dữ liệu</b> (phân loại dữ liệu, chọn cách bảo vệ nó) và <b>quyền truy cập</b> (danh tính nào được đọc/ghi tài nguyên nào) luôn là việc của khách hàng, dù dùng dịch vụ nào, kể cả dịch vụ \"rất managed\" như <b>Amazon DynamoDB</b>. AWS không bao giờ tự quyết định ai được xem dữ liệu của bạn.</p>
<h4>Vài trường hợp đề hay đưa ra</h4>
<ul>
<li><b>Container: ECS trên EC2 → AWS Fargate</b>. Với ECS dùng EC2, bạn phải vá và gia cố (harden) các máy chủ chạy container. Chuyển sang <b>Fargate</b> (chạy container serverless), AWS lo máy chủ và hệ điều hành bên dưới; bạn vẫn lo image container, code và quyền IAM.</li>
<li><b>Sao lưu (backup)</b>: AWS sao chép ổ EBS trong một AZ để chống hỏng phần cứng, nhưng điều đó <b>không</b> cứu bạn khi lỡ xóa nhầm hay dữ liệu bị hỏng do ứng dụng. Tạo <b>snapshot</b>/bản sao lưu để khôi phục là việc của <b>khách hàng</b>.</li>
<li><b>AWS Outposts</b> (rack phần cứng AWS đặt trong cơ sở của bạn): AWS vẫn lo phần cứng và phần mềm của rack, nhưng <b>an ninh vật lý và kiểm soát ra vào nơi đặt rack</b> chuyển sang <b>khách hàng</b>, vì nó nằm trong nhà bạn chứ không trong data center AWS.</li>
</ul>

<div class="box trap"><b>⚠️ Bẫy hay gặp</b><p><b>\"Patching\" (vá lỗi)</b> là chỗ dễ nhầm nhất. Vá hệ điều hành trên <b>EC2</b> là việc của <b>khách hàng</b>. Vá hệ điều hành và database engine của <b>RDS</b> là việc của <b>AWS</b> (bạn chỉ chọn khung giờ bảo trì). Đề thi hay đổi tên dịch vụ để thử bạn.</p><p>Một bẫy khác: \"mã hóa dữ liệu\". AWS <b>cung cấp công cụ</b> mã hóa, nhưng <b>bật và quản lý</b> việc mã hóa dữ liệu của bạn vẫn là trách nhiệm của khách hàng.</p></div>

<h3>Shared controls: những việc cả hai bên cùng làm</h3>
<p>Có một số loại công việc mà <b>cả AWS và khách hàng</b> đều phải làm, nhưng mỗi bên làm ở phạm vi của mình. AWS gọi đó là <b>shared controls</b> (các biện pháp kiểm soát chung). Đề thi hay nhắc ba loại:</p>
<ul>
<li><b>Patch management</b> (quản lý bản vá): AWS vá lỗi cho hạ tầng của AWS. Khách hàng vá lỗi cho hệ điều hành khách và ứng dụng của mình.</li>
<li><b>Configuration management</b> (quản lý cấu hình): AWS cấu hình đúng các thiết bị hạ tầng. Khách hàng cấu hình đúng hệ điều hành, database, ứng dụng của mình.</li>
<li><b>Awareness &amp; training</b> (nâng cao nhận thức và đào tạo): AWS đào tạo nhân viên AWS. Khách hàng đào tạo nhân viên của chính mình (ví dụ: không bấm link lạ, không chia sẻ mật khẩu).</li>
</ul>
<p>Để không nhầm, hãy nhớ ba nhóm control theo tài liệu AWS:</p>
<table>
<tr><th>Loại control</th><th>Nghĩa</th><th>Ví dụ</th></tr>
<tr><td><b>Inherited controls</b> (được thừa hưởng)</td><td>Khách hàng hưởng <b>trọn vẹn</b> từ AWS, không phải làm gì. Khi kiểm toán, bạn dùng báo cáo kiểm toán của AWS (tải từ AWS Artifact) làm bằng chứng.</td><td><b>Physical and environmental controls</b>: an ninh vật lý, điện, làm mát, phòng cháy của data center</td></tr>
<tr><td><b>Shared controls</b> (chung)</td><td>Cả hai bên cùng làm, mỗi bên ở phạm vi của mình</td><td>Patch management, configuration management, awareness &amp; training</td></tr>
<tr><td><b>Customer-specific controls</b> (riêng của khách hàng)</td><td>Chỉ khách hàng chịu trách nhiệm, tùy ứng dụng của họ</td><td>Bảo vệ dữ liệu và luồng giao tiếp của ứng dụng, phân vùng dữ liệu trong môi trường của mình</td></tr>
</table>

<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>Trong chung cư, \"bảo trì\" là việc chung: chủ tòa nhà bảo trì thang máy, bạn bảo trì máy lạnh trong căn hộ. \"Tập huấn phòng cháy\" cũng là việc chung: ban quản lý tập huấn bảo vệ, bạn dặn người nhà tắt bếp. Cùng một loại việc, mỗi bên làm phần của mình.</p></div>

<h3>Cách trả lời câu hỏi trong đề</h3>
<p>Mẹo đơn giản: hỏi xem việc đó có <b>chạm tay được</b> không. Nếu là thứ vật lý (tòa nhà, ổ cứng, dây cáp) hoặc lớp ảo hóa bên dưới thì là của AWS. Nếu là thứ bạn <b>cấu hình, viết ra, hoặc quyết định</b> (mật khẩu, quyền, dữ liệu, code, security group) thì là của bạn. Với hệ điều hành, xem dịch vụ là EC2 (bạn) hay managed (AWS).</p>

<div class="box exam"><b>🎯 Đề thi hay hỏi</b><ul>
<li>\"Physical security of data centers\", \"hardware\", \"global infrastructure\", \"hypervisor\" → <b>AWS</b></li>
<li>\"Patching the guest operating system on EC2\" → <b>Customer</b></li>
<li>\"Patching the database engine on Amazon RDS\" → <b>AWS</b></li>
<li>\"Configuring security groups\", \"IAM users and permissions\", \"customer data\", \"encrypting data\" → <b>Customer</b></li>
<li>\"With AWS Lambda, the customer is responsible for…\" → <b>function code và IAM permissions</b></li>
<li>\"Which is a shared control?\" → <b>Patch management, configuration management, awareness and training</b></li>
<li>\"Controls fully inherited from AWS\" → <b>Physical and environmental controls</b></li>
<li>\"Move from ECS on EC2 to Fargate, which task goes away?\" → <b>patching the host OS</b>; \"EBS is replicated, do we need backups?\" → <b>Có, khách hàng tự tạo snapshot/backup</b></li>
<li>\"AWS Outposts in our own facility\" → khách hàng lo thêm <b>physical security of the site</b></li>
</ul></div>
`,
    summary: [
      "AWS chịu trách nhiệm \"security OF the cloud\": data center, phần cứng, hypervisor, mạng toàn cầu.",
      "Khách hàng chịu trách nhiệm \"security IN the cloud\": dữ liệu, IAM, cấu hình, mã hóa, ứng dụng.",
      "Dịch vụ càng managed (RDS, Lambda) thì AWS lo càng nhiều; EC2 khách hàng lo nhiều nhất.",
      "Vá OS trên EC2 là của khách hàng; vá OS và database engine của RDS là của AWS.",
      "Dữ liệu và quyền truy cập luôn là trách nhiệm của khách hàng với mọi dịch vụ.",
      "Shared controls: patch management, configuration management, awareness & training; mỗi bên làm ở phạm vi của mình.",
      "Inherited controls (thừa hưởng trọn từ AWS): physical and environmental controls của data center.",
      "Sao lưu (snapshot EBS) là việc của khách hàng; với Outposts, an ninh vật lý nơi đặt rack là của khách hàng."
    ],
    terms: [
      ["Shared Responsibility Model", "mô hình trách nhiệm chia sẻ"],
      ["Security OF the cloud", "bảo mật của đám mây (phần AWS lo)"],
      ["Security IN the cloud", "bảo mật bên trong đám mây (phần khách hàng lo)"],
      ["Data center", "trung tâm dữ liệu"],
      ["Hypervisor", "phần mềm ảo hóa, chia máy chủ thật thành máy ảo"],
      ["Guest operating system", "hệ điều hành khách (trên máy ảo)"],
      ["Patch", "bản vá lỗi"],
      ["Managed service", "dịch vụ được AWS quản lý sẵn"],
      ["Shared controls", "biện pháp kiểm soát chung"],
      ["Inherited controls", "biện pháp kiểm soát được thừa hưởng"],
      ["Physical and environmental controls", "kiểm soát vật lý và môi trường (thừa hưởng từ AWS)"],
      ["AWS Outposts", "rack hạ tầng AWS đặt tại cơ sở của khách hàng"],
      ["Configuration management", "quản lý cấu hình"],
      ["Awareness and training", "nâng cao nhận thức và đào tạo"]
    ],
    qids: ["d2-1", "d2-18", "d2-19", "d2-35"]
  },

  {
    id: "2-2",
    module: 2,
    title: "IAM: user, group, role, policy và least privilege",
    mins: 14,
    goals: [
      "Phân biệt authentication (xác thực) và authorization (phân quyền)",
      "Hiểu user, group, role, policy là gì và dùng khi nào",
      "Áp dụng least privilege; hiểu explicit deny, các loại policy, permissions boundary và SCP",
      "Biết vì sao nên dùng role cho EC2 và cho truy cập giữa các tài khoản"
    ],
    html: `
<h3>Hai câu hỏi của mọi hệ thống bảo mật</h3>
<p>Mỗi khi ai đó muốn làm gì trên hệ thống, hệ thống phải trả lời hai câu hỏi theo thứ tự:</p>
<ol>
<li><b>Bạn là ai?</b> Đây là <b>authentication</b> (xác thực). Ví dụ: nhập tên đăng nhập và mật khẩu, quét vân tay.</li>
<li><b>Bạn được phép làm gì?</b> Đây là <b>authorization</b> (phân quyền). Ví dụ: nhân viên kế toán được xem hóa đơn nhưng không được xóa máy chủ.</li>
</ol>
<p>Trên AWS, cả hai việc này do <b>AWS IAM</b> (Identity and Access Management, quản lý danh tính và quyền truy cập) đảm nhận. IAM là dịch vụ <b>global</b> (toàn cầu, không gắn với Region nào) và <b>miễn phí</b>.</p>

<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>Hãy nghĩ đến một tòa văn phòng dùng thẻ từ. Lễ tân kiểm tra CMND rồi phát thẻ cho bạn: đó là <b>xác thực</b>. Thẻ của bạn quẹt mở được cửa tầng 3 nhưng không mở được phòng server: đó là <b>phân quyền</b>. Danh sách \"thẻ này mở được cửa nào\" chính là <b>policy</b>.</p></div>

<h3>Bốn khái niệm cốt lõi: user, group, role, policy</h3>
<h4>IAM user (người dùng)</h4>
<p>Một <b>IAM user</b> đại diện cho <b>một người</b> (hoặc một ứng dụng) cần dùng AWS lâu dài. Mỗi user có tên riêng và thông tin đăng nhập riêng: mật khẩu để vào giao diện web (AWS Management Console) và/hoặc <b>access key</b> để dùng dòng lệnh hay code. Nguyên tắc: <b>mỗi người một user</b>, không dùng chung.</p>
<p><i>Lưu ý: hiện nay AWS khuyến nghị với <b>người dùng là con người</b> (nhân viên), nên đăng nhập qua <b>federation</b> (liên kết danh tính với hệ thống sẵn có) hoặc <b>AWS IAM Identity Center</b> để dùng thông tin đăng nhập tạm thời, thay vì tạo IAM user với mật khẩu/access key dài hạn. IAM user vẫn dùng được cho trường hợp đặc biệt. Xem thêm ở bài 2-3. Đề CLF-C02 vẫn hỏi nhiều về user/group/role nên phần dưới vẫn cần nắm.</i></p>
<h4>IAM group (nhóm)</h4>
<p>Một <b>IAM group</b> là tập hợp nhiều user. Bạn gắn quyền vào nhóm, mọi user trong nhóm tự động có quyền đó. Khi có nhân viên mới, chỉ cần thêm vào nhóm. Group chỉ chứa user, không chứa group khác, và group không phải là thứ để \"đăng nhập\".</p>
<h4>IAM policy (chính sách quyền)</h4>
<p>Một <b>policy</b> là văn bản ghi rõ <b>được phép (Allow)</b> hoặc <b>bị cấm (Deny)</b> làm hành động gì, trên tài nguyên nào. Policy viết bằng định dạng <b>JSON</b> (một kiểu văn bản có cấu trúc mà máy đọc được). Bạn không cần thuộc cú pháp cho kỳ thi, chỉ cần hiểu ý tưởng, đại loại:</p>
<p><code>Effect: Allow | Action: s3:GetObject | Resource: bucket anh-banh</code></p>
<p>Nghĩa là: \"cho phép đọc file trong bucket anh-banh\". AWS xét quyền theo ba bước dễ nhớ:</p>
<ol>
<li>Mặc định mọi thứ đều <b>bị từ chối</b> (implicit deny) cho tới khi có policy cho phép.</li>
<li>Có policy <b>Allow</b> phù hợp thì được phép...</li>
<li>...trừ khi ở bất kỳ policy nào có một <b>Deny rõ ràng</b> (explicit deny). <b>Explicit deny luôn thắng</b> mọi Allow.</li>
</ol>
<p>Ví dụ: user nằm trong group có AdministratorAccess (Allow mọi thứ), nhưng được gắn thêm một policy Deny hành động xóa bucket S3. Khi user xóa bucket → <b>bị từ chối</b>, vì Deny rõ ràng thắng.</p>
<p>Ba loại policy gắn vào danh tính (identity-based policy) hay gặp:</p>
<ul>
<li><b>AWS managed policy</b>: policy do AWS viết sẵn và <b>tự cập nhật</b>, ví dụ AdministratorAccess, ReadOnlyAccess, hoặc các policy theo chức năng công việc như <b>SecurityAudit</b> (xem cấu hình bảo mật), Billing. Ít công sức nhất và tự theo kịp dịch vụ mới, nhưng thường cấp rộng hơn mức cần, và quyền có thể thay đổi khi AWS cập nhật mà bạn không chủ động duyệt.</li>
<li><b>Customer managed policy</b>: policy do bạn tự viết, dùng lại được cho nhiều user/group/role. Chỉ thay đổi khi <b>bạn</b> sửa, và IAM <b>lưu các phiên bản trước</b> để bạn quay lại (roll back) khi sửa sai. Phù hợp khi cần kiểm soát chính xác.</li>
<li><b>Inline policy</b>: policy <b>nhúng thẳng</b> vào một user/group/role duy nhất. Không gắn được cho danh tính khác và <b>bị xóa theo</b> khi xóa danh tính đó. Dùng khi một quyền chỉ được phép thuộc về đúng một danh tính.</li>
</ul>
<p>Ngoài ra còn có <b>resource-based policy</b>: policy gắn vào <b>chính tài nguyên</b> thay vì vào người. Ví dụ điển hình là <b>S3 bucket policy</b>: bạn ghi ngay trên bucket rằng \"tài khoản AWS của đối tác X được phép tải file lên\", không cần tạo user hay role cho đối tác.</p>
<h4>IAM role (vai trò)</h4>
<p>Một <b>IAM role</b> là một \"bộ quyền\" mà ai đó hoặc thứ gì đó có thể <b>đảm nhận tạm thời</b> (assume role). Role không có mật khẩu hay access key cố định. Khi đảm nhận role, AWS cấp <b>temporary credentials</b> (thông tin đăng nhập tạm thời) tự hết hạn sau một thời gian.</p>
<p>Role dùng cho: dịch vụ AWS (EC2, Lambda) cần gọi dịch vụ khác; người dùng ở <b>tài khoản AWS khác</b>; nhân viên đăng nhập qua hệ thống công ty (federation, sẽ học ở bài sau).</p>

<div class="box idea"><b>🧠 Hiểu đơn giản</b><p><b>User</b> giống thẻ nhân viên có ảnh và tên bạn, dùng lâu dài. <b>Group</b> giống phòng ban: cả phòng Kế toán được vào kho hồ sơ. <b>Policy</b> là danh sách cửa được mở. <b>Role</b> giống <b>thẻ khách</b> ở quầy lễ tân: ai cần thì mượn, dùng xong trả, hết giờ thẻ tự vô hiệu.</p></div>

<table>
<tr><th>Khái niệm</th><th>Là gì</th><th>Có mật khẩu/key lâu dài?</th><th>Ví dụ dùng</th></tr>
<tr><td>User</td><td>Một người hoặc ứng dụng</td><td>Có</td><td>Minh đăng nhập console</td></tr>
<tr><td>Group</td><td>Tập hợp user</td><td>Không (không đăng nhập được)</td><td>Nhóm \"Developers\"</td></tr>
<tr><td>Role</td><td>Bộ quyền để đảm nhận tạm thời</td><td>Không, chỉ có thông tin tạm thời</td><td>EC2 đọc S3; người ở tài khoản khác</td></tr>
<tr><td>Policy</td><td>Văn bản JSON quy định quyền</td><td>Không áp dụng</td><td>\"Chỉ được đọc bucket ảnh\"</td></tr>
</table>

<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>BánhNgon đã có 6 người cần vào AWS. Minh tạo user riêng cho từng người, rồi tạo hai group: <b>Developers</b> (3 lập trình viên thuê ngoài) và <b>Marketing</b> (2 bạn làm quảng cáo). Group Developers được gắn policy cho phép quản lý EC2 và Lambda. Group Marketing chỉ được đọc báo cáo doanh số trong một bucket S3.</p><p>Chị Lan hỏi: \"Sao không cho mọi người quyền admin luôn cho nhanh?\". Minh giải thích: nếu một bạn marketing bị lừa lộ mật khẩu, kẻ xấu cũng chỉ đọc được báo cáo, chứ không xóa được máy chủ.</p></div>

<h3>Nguyên tắc least privilege (quyền tối thiểu)</h3>
<p><b>Principle of least privilege</b> nghĩa là: chỉ cấp <b>đúng và đủ</b> quyền cần cho công việc, không hơn. Khi cần thêm thì cấp thêm, khi hết cần thì thu lại.</p>
<p>Lợi ích: nếu một tài khoản bị lộ hoặc ai đó bấm nhầm, thiệt hại bị giới hạn trong phạm vi nhỏ. Đây là nguyên tắc nền tảng, xuất hiện rất thường xuyên trong đề thi.</p>
<p>Cách làm thực tế: bắt đầu với ít quyền, gán quyền qua group thay vì từng user, ưu tiên policy chỉ ghi đúng hành động cần, và định kỳ rà soát xem quyền nào không dùng tới để gỡ bỏ (bài 2-3 sẽ nói về công cụ IAM access advisor).</p>

<h3>Role cho EC2 và truy cập giữa các tài khoản</h3>
<h4>Role cho EC2</h4>
<p>Giả sử một ứng dụng chạy trên máy chủ EC2 cần đọc ảnh từ S3. Cách <b>sai</b>: tạo access key của một user rồi lưu vào file trên máy chủ. Nếu ai đó lấy được file, họ có key dùng mãi mãi.</p>
<p>Cách <b>đúng</b>: tạo một <b>IAM role</b> có quyền đọc S3, gắn role vào EC2 (qua <b>instance profile</b>). Ứng dụng tự nhận thông tin đăng nhập tạm thời, AWS tự thay mới định kỳ. Không có key nào nằm trên ổ đĩa.</p>
<h4>Truy cập giữa các tài khoản (cross-account access)</h4>
<p>Nhiều công ty có nhiều tài khoản AWS. Nếu người ở tài khoản A cần dùng tài nguyên ở tài khoản B, <b>không</b> tạo thêm user ở B. Thay vào đó, tạo một role ở tài khoản B và cho phép người ở tài khoản A <b>assume</b> (đảm nhận) role đó. Họ nhận quyền tạm thời, dễ thu hồi.</p>
<div class="flow"><span>User ở tài khoản A</span><span>Assume role</span><span>Role ở tài khoản B</span><span>Tài nguyên ở B</span></div>
<p>Khi bên được cấp quyền là <b>công ty bên ngoài</b> (ví dụ hãng kiểm toán dùng tài khoản AWS của họ), cách khuyến nghị là tạo role (ví dụ chỉ đọc) cho tài khoản của họ assume, kèm một <b>external ID</b> (mã bí mật hai bên thỏa thuận) để tránh bên thứ ba khác lợi dụng role. Hết hợp đồng thì xóa role.</p>

<h3>Hàng rào giới hạn quyền tối đa: permissions boundary và SCP</h3>
<p>Policy thường trả lời \"được làm gì\". Có hai công cụ trả lời câu hỏi khác: \"<b>tối đa</b> được làm tới đâu\". Chúng <b>không cấp quyền</b>, chỉ đặt trần.</p>
<table>
<tr><th>Công cụ</th><th>Áp dụng cho</th><th>Dùng khi</th></tr>
<tr><td>IAM policy (identity/resource-based)</td><td>User, group, role, tài nguyên</td><td>Cấp quyền cụ thể</td></tr>
<tr><td><b>Permissions boundary</b></td><td>Một user hoặc role trong tài khoản</td><td>Cho developer tự tạo role nhưng role đó <b>không bao giờ</b> vượt quá bộ quyền tối đa đã định, dù họ gắn policy rộng hơn</td></tr>
<tr><td><b>SCP</b> (Service Control Policy, của AWS Organizations)</td><td>Cả tài khoản thành viên hoặc OU</td><td>Cấm mọi người trong tài khoản thành viên, <b>kể cả admin và root</b> của tài khoản đó, làm điều gì (ví dụ dùng Region ngoài châu Âu)</td></tr>
</table>
<p>Quyền thực tế = phần giao nhau: phải được policy Allow <b>và</b> nằm trong boundary/SCP, và không bị Deny ở đâu cả.</p>
<p>Lưu ý: SCP chỉ tác động lên <b>tài khoản thành viên</b>. SCP <b>không giới hạn</b> user và role trong <b>management account</b> (tài khoản quản lý của tổ chức), vì vậy đừng chạy workload trong tài khoản đó.</p>

<div class="box trap"><b>⚠️ Bẫy hay gặp</b><p>Thấy \"EC2 needs to access S3\" mà đáp án có \"store access keys on the instance\" hay \"embed credentials in code\" thì loại ngay. Đáp án đúng luôn là <b>IAM role</b>.</p><p>Một bẫy khác: <b>group không lồng group</b> và <b>không phải là cách cấp quyền cho dịch vụ AWS</b>. Dịch vụ AWS dùng role, không dùng group.</p></div>

<div class="box exam"><b>🎯 Đề thi hay hỏi</b><ul>
<li>\"Grant only the permissions required to perform a task\" → <b>Principle of least privilege</b></li>
<li>\"Give the same permissions to many developers efficiently\" → <b>IAM group</b> + gắn policy</li>
<li>\"Application on EC2 needs to access S3 securely\" → <b>IAM role</b> gắn vào EC2</li>
<li>\"User in account A needs temporary access to account B\" → <b>IAM role</b> ở account B (cross-account)</li>
<li>\"Document that defines permissions, written in JSON\" → <b>IAM policy</b></li>
<li>\"Is IAM regional?\" → Không, IAM là <b>global</b> và <b>free</b></li>
<li>\"Allow from a group but explicit Deny attached\" → <b>Denied</b> (explicit deny thắng)</li>
<li>\"Full control over when permissions change, reusable, roll back\" → <b>customer managed policy</b>; \"one identity only, deleted with it\" → <b>inline policy</b>; \"least overhead, stays current with new services\" → <b>AWS managed policy</b> (ví dụ SecurityAudit)</li>
<li>\"Roles that developers create can never exceed a maximum set\" → <b>permissions boundary</b></li>
<li>\"Prevent all member accounts, even admins, from using some Regions/services\" → <b>SCP</b></li>
<li>\"Grant another account access on the bucket itself\" → <b>S3 bucket policy</b> (resource-based); \"external auditor's account, read-only\" → <b>role + external ID</b></li>
</ul></div>
`,
    summary: [
      "Authentication = xác thực bạn là ai; authorization = bạn được làm gì. IAM làm cả hai, là dịch vụ global và miễn phí.",
      "User = một người/ứng dụng; group = tập hợp user; policy = văn bản JSON quy định quyền; role = quyền tạm thời để đảm nhận.",
      "Mặc định mọi thứ bị từ chối; Deny rõ ràng luôn thắng Allow.",
      "AWS managed policy do AWS viết sẵn và tự cập nhật; customer managed policy do bạn kiểm soát, có phiên bản để roll back; inline policy gắn chặt vào một danh tính.",
      "Resource-based policy (ví dụ S3 bucket policy) gắn trên tài nguyên, cấp quyền được cho tài khoản khác.",
      "Permissions boundary và SCP chỉ đặt giới hạn tối đa, không cấp quyền; SCP không áp dụng cho management account, nhưng áp dụng cả admin/root của tài khoản thành viên.",
      "Least privilege: chỉ cấp đúng quyền cần thiết, rà soát định kỳ.",
      "Ứng dụng trên EC2 và truy cập giữa tài khoản: dùng IAM role, không lưu access key."
    ],
    terms: [
      ["IAM (Identity and Access Management)", "quản lý danh tính và quyền truy cập"],
      ["Authentication", "xác thực (bạn là ai)"],
      ["Authorization", "phân quyền (bạn được làm gì)"],
      ["IAM user", "người dùng IAM"],
      ["IAM group", "nhóm người dùng"],
      ["IAM role", "vai trò, bộ quyền đảm nhận tạm thời"],
      ["IAM policy", "chính sách quyền (JSON)"],
      ["AWS managed policy", "policy do AWS quản lý"],
      ["Customer managed policy", "policy do khách hàng tự quản lý"],
      ["Principle of least privilege", "nguyên tắc quyền tối thiểu"],
      ["Temporary credentials", "thông tin đăng nhập tạm thời"],
      ["Assume role", "đảm nhận vai trò"],
      ["Cross-account access", "truy cập giữa các tài khoản"],
      ["Instance profile", "vật chứa role để gắn vào EC2"],
      ["Inline policy", "policy nhúng vào đúng một danh tính"],
      ["Resource-based policy", "policy gắn trên tài nguyên (ví dụ bucket policy)"],
      ["Explicit deny", "từ chối rõ ràng (luôn thắng Allow)"],
      ["Permissions boundary", "giới hạn quyền tối đa cho user/role"]
    ],
    qids: ["d2-7", "d2-16", "d2-17", "d2-27"]
  },

  {
    id: "2-3",
    module: 2,
    title: "Root user, MFA, đăng nhập và quản lý bí mật",
    mins: 15,
    goals: [
      "Biết root user là gì, cách bảo vệ và những việc chỉ root làm được",
      "Hiểu MFA, password policy, access key và cách dùng an toàn",
      "Phân biệt IAM Identity Center, Amazon Cognito và AWS Directory Service",
      "Chọn đúng giữa Secrets Manager và Parameter Store; biết credential report và access advisor"
    ],
    html: `
<h3>Root user: chìa khóa tổng</h3>
<p>Khi bạn tạo tài khoản AWS bằng email và mật khẩu, danh tính đó là <b>root user</b> (người dùng gốc). Root user có <b>toàn quyền tuyệt đối</b> với tài khoản: tạo, xóa mọi thứ, xem hóa đơn, thậm chí đóng tài khoản. Không có policy nào giới hạn được root trong chính tài khoản đó (trừ khi dùng các cơ chế của AWS Organizations).</p>
<p>Vì quyền lớn như vậy, nếu root bị lộ thì gần như mất tất cả. Cách bảo vệ theo khuyến nghị của AWS:</p>
<ul>
<li>Đặt mật khẩu mạnh và <b>bật MFA</b> cho root. Hiện nay AWS đã <b>bắt buộc MFA cho root user theo mặc định</b>: khi tạo tài khoản hoặc khi đăng nhập, bạn sẽ được yêu cầu đăng ký thiết bị MFA.</li>
<li><b>Không dùng root cho công việc hằng ngày</b>. Tạo một danh tính có quyền quản trị để làm việc thường ngày.</li>
<li><b>Không tạo access key</b> cho root (nếu đã có thì xóa).</li>
<li>Dùng email riêng, an toàn cho root, và chỉ dùng root khi gặp việc mà chỉ root làm được.</li>
</ul>

<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>Root user giống <b>chìa khóa tổng</b> của cả tòa nhà kèm sổ đỏ. Bạn không mang nó theo người đi chợ mỗi ngày. Bạn cất vào két sắt (MFA), và hằng ngày chỉ dùng chìa khóa căn hộ (IAM user/role có quyền vừa đủ).</p></div>

<h4>Những việc chỉ root user làm được</h4>
<p>Đề thi rất hay hỏi danh sách này. Một số việc tiêu biểu:</p>
<ul>
<li>Với tài khoản độc lập: đổi <b>email</b> của tài khoản, <b>mật khẩu root</b>, access key của root. (Các cài đặt khác như tên tài khoản, thông tin liên hệ, Region được bật <b>không</b> cần root.)</li>
<li><b>Đóng tài khoản AWS</b> độc lập (close account), và mở lại tài khoản vừa tự đóng.</li>
<li><b>Khôi phục quyền IAM</b> khi người quản trị IAM duy nhất lỡ tự khóa quyền của mình: đăng nhập root rồi gắn lại policy.</li>
<li><b>Kích hoạt quyền cho IAM user/role truy cập trang Billing</b> (Billing and Cost Management console).</li>
<li><b>Đăng ký làm người bán</b> trên Reserved Instance Marketplace.</li>
<li>Bật <b>MFA Delete</b> cho một bucket S3 (yêu cầu MFA khi xóa phiên bản file).</li>
<li><b>Sửa hoặc xóa một S3 bucket policy lỡ từ chối mọi principal</b> (khóa cả admin ngoài cửa).</li>
</ul>
<p><b>Centralized root access</b> (quản lý root tập trung): nếu công ty dùng AWS Organizations, có thể bật tính năng này trong IAM để <b>xóa hẳn thông tin đăng nhập root lâu dài</b> (mật khẩu, access key, MFA) của các tài khoản thành viên. Khi cần làm việc đặc quyền (ví dụ gỡ bucket policy chặn tất cả), admin ở management account thực hiện tập trung bằng một phiên root ngắn hạn. Tài khoản thành viên tạo mới cũng không có thông tin đăng nhập root.</p>
<p><i>Lưu ý: tài liệu ôn cũ thường ghi "đổi gói AWS Support" là việc chỉ root làm được. Danh sách chính thức hiện tại của AWS không còn mục này (IAM user có quyền phù hợp làm được). Nếu đề thi vẫn hỏi theo kiểu cũ, hãy ưu tiên các đáp án chắc chắn hơn như đóng tài khoản, đổi email/mật khẩu root.</i></p>

<h3>MFA và password policy</h3>
<p><b>MFA</b> (Multi-Factor Authentication, xác thực nhiều yếu tố) yêu cầu bạn chứng minh danh tính bằng <b>hai thứ trở lên</b>: thứ bạn <b>biết</b> (mật khẩu) và thứ bạn <b>có</b> (điện thoại chạy app tạo mã, hoặc khóa bảo mật phần cứng). Kẻ gian biết mật khẩu nhưng không cầm điện thoại của bạn thì vẫn không vào được.</p>
<p>AWS hỗ trợ ba loại thiết bị MFA:</p>
<table>
<tr><th>Loại MFA</th><th>Là gì</th><th>Ghi chú</th></tr>
<tr><td><b>Passkey / FIDO2 security key</b></td><td>Khóa bảo mật cắm USB/chạm, hoặc passkey trên điện thoại, máy tính</td><td><b>Chống phishing</b> (phishing-resistant): trang giả mạo không lấy được gì để dùng lại</td></tr>
<tr><td>Virtual MFA</td><td>App trên điện thoại tạo mã 6 số</td><td>Phổ biến, miễn phí, nhưng mã vẫn có thể bị lừa nhập vào trang giả</td></tr>
<tr><td>Hardware TOTP token</td><td>Thiết bị nhỏ tạo mã</td><td>Không cần điện thoại</td></tr>
</table>
<p>Nên bật MFA cho root và cho mọi user có quyền quan trọng. Mỗi user (kể cả root) có thể đăng ký <b>nhiều thiết bị MFA</b> (tối đa 8). Hãy đăng ký <b>thiết bị thứ hai</b> và cất ở nơi khác, để lỡ mất một thiết bị vẫn đăng nhập được.</p>
<p><b>Password policy</b> (chính sách mật khẩu) là quy định áp dụng cho mật khẩu của <b>IAM user</b> trong tài khoản: độ dài tối thiểu, bắt buộc có chữ hoa, số, ký tự đặc biệt, thời hạn phải đổi, không được dùng lại mật khẩu cũ. Lưu ý: password policy <b>không áp dụng cho mật khẩu root</b>.</p>

<h3>Access key: chìa khóa cho máy móc</h3>
<p>Ngoài đăng nhập web bằng mật khẩu, người ta còn điều khiển AWS bằng dòng lệnh (<b>AWS CLI</b>) hoặc code (<b>AWS SDK</b>). Khi đó cần <b>access key</b>, gồm hai phần: <b>access key ID</b> (giống tên đăng nhập) và <b>secret access key</b> (giống mật khẩu).</p>
<p>Quy tắc an toàn: không chia sẻ key, không đưa key vào code hay đẩy lên mạng, đổi key định kỳ, xóa key không dùng. Và quan trọng: <b>không lưu access key trên máy chủ EC2</b>. Ứng dụng trên EC2 nên dùng <b>IAM role</b> như bài trước. Developer chạy CLI từ laptop nên đăng nhập qua <b>IAM Identity Center</b> để nhận <b>thông tin đăng nhập ngắn hạn</b>, thay vì giữ access key lâu dài trên máy.</p>
<p><b>Nếu access key bị lộ</b> (ví dụ lỡ đẩy lên kho code công khai): <b>vô hiệu hóa rồi xóa key</b> ngay, sau đó xem <b>CloudTrail</b> để biết key đó đã gọi những API nào, và tạo key/role mới nếu thật sự cần.</p>

<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>Năm đầu, chị Lan dùng luôn email đăng ký (root) để đăng nhập AWS mỗi ngày, và mật khẩu dán trên màn hình. Minh hoảng hồn: anh bật MFA cho root bằng app trên điện thoại của chị Lan, cất root đi, tạo cho chị một danh tính quản trị riêng để làm việc hằng ngày.</p><p>Minh còn phát hiện một bạn developer cũ đã để access key trong code trên máy chủ EC2. Anh xóa key đó, thay bằng IAM role, và cài password policy: tối thiểu 12 ký tự, đổi mỗi 90 ngày.</p></div>

<h3>Đăng nhập một lần: federation, IAM Identity Center, Cognito, Directory Service</h3>
<p><b>Identity federation</b> (liên kết danh tính) nghĩa là cho phép người dùng đăng nhập AWS bằng tài khoản <b>đã có sẵn ở nơi khác</b> (ví dụ tài khoản công ty trong Microsoft Active Directory, Okta, Google), thay vì tạo thêm IAM user. Một <b>identity provider</b> (IdP, nhà cung cấp danh tính) xác thực họ, AWS tin kết quả đó và cấp quyền tạm thời qua role.</p>
<ul>
<li><b>AWS IAM Identity Center</b> (trước đây là AWS SSO): dành cho <b>nhân viên</b> của công ty. Họ đăng nhập <b>một lần</b> (single sign-on) và truy cập được nhiều tài khoản AWS trong AWS Organizations cùng các ứng dụng doanh nghiệp. Có thể dùng danh bạ có sẵn trong Identity Center hoặc kết nối IdP bên ngoài. Quyền được định nghĩa một lần dưới dạng <b>permission set</b> (bộ quyền) rồi gán cho một nhóm người trên nhiều tài khoản cùng lúc. Đây là cách AWS khuyến nghị cho người dùng nội bộ.</li>
<li><b>Amazon Cognito</b>: dành cho <b>người dùng cuối của ứng dụng</b> (khách hàng của bạn), ví dụ người mua bánh đăng ký, đăng nhập vào app di động, kể cả đăng nhập bằng Google, Facebook. Có thể phục vụ số lượng người dùng rất lớn.</li>
<li><b>AWS Directory Service</b>: cung cấp <b>Microsoft Active Directory</b> (hệ thống quản lý tài khoản phổ biến trong doanh nghiệp) trên AWS, ví dụ AWS Managed Microsoft AD, hoặc kết nối tới Active Directory có sẵn tại văn phòng công ty.</li>
</ul>
<table>
<tr><th>Dịch vụ</th><th>Ai đăng nhập?</th><th>Từ khóa trong đề</th></tr>
<tr><td>IAM user</td><td>Một vài người/ứng dụng cần thông tin đăng nhập lâu dài</td><td>long-term credentials</td></tr>
<tr><td>IAM Identity Center</td><td>Nhân viên, nhiều tài khoản AWS</td><td>single sign-on, workforce, multiple accounts</td></tr>
<tr><td>Amazon Cognito</td><td>Khách hàng dùng web/app của bạn</td><td>sign-up, sign-in for mobile/web app users</td></tr>
<tr><td>AWS Directory Service</td><td>Môi trường dùng Microsoft Active Directory</td><td>managed Microsoft AD</td></tr>
</table>

<div class="box trap"><b>⚠️ Bẫy hay gặp</b><p>Đề hỏi \"<b>employees</b>\" đăng nhập một lần vào nhiều tài khoản → <b>IAM Identity Center</b>. Đề hỏi \"<b>users of a mobile app</b>\" đăng ký/đăng nhập → <b>Cognito</b>. Hai dịch vụ này đều liên quan đăng nhập nên rất dễ chọn nhầm.</p></div>

<h3>Quản lý bí mật: Secrets Manager và Parameter Store</h3>
<p>Ứng dụng thường cần các <b>secret</b> (bí mật) như mật khẩu database, API key. Tuyệt đối không ghi thẳng chúng vào code. Hãy cất vào một \"két\" chuyên dụng, ứng dụng hỏi két khi cần.</p>
<ul>
<li><b>AWS Secrets Manager</b>: chuyên lưu bí mật, mã hóa bằng KMS, và nổi bật nhất là <b>tự động xoay vòng</b> (rotate, tự đổi mật khẩu định kỳ), tích hợp sẵn với RDS và nhiều database. Là dịch vụ trả phí.</li>
<li><b>AWS Systems Manager Parameter Store</b>: lưu cấu hình (feature flag, URL…) và bí mật đơn giản; bí mật lưu dạng <b>SecureString</b> (được mã hóa bằng KMS). Gói standard không mất thêm phí, nên là lựa chọn <b>rẻ nhất</b> khi không cần xoay vòng tự động. Không có tính năng tự động xoay vòng tích hợp sẵn như Secrets Manager.</li>
</ul>

<h3>Kiểm tra định kỳ: credential report, last accessed, Access Analyzer</h3>
<ul>
<li><b>IAM credential report</b>: một bảng tải về (file CSV) liệt kê <b>mọi IAM user</b> trong tài khoản và trạng thái thông tin đăng nhập: mật khẩu đổi lần cuối khi nào, có bật MFA không, access key đã dùng lần cuối khi nào. Dùng cho kiểm toán.</li>
<li><b>IAM access advisor</b> (trong console hiển thị ở tab <b>Last accessed</b>, \"last accessed information\"): cho biết một user/role <b>được cấp quyền tới dịch vụ nào và lần cuối thực sự dùng</b> dịch vụ đó là khi nào. Cách ít công sức nhất để gỡ quyền thừa, phục vụ least privilege.</li>
<li><b>IAM Access Analyzer</b>: tìm các tài nguyên (bucket S3, khóa KMS, IAM role…) đang được <b>chia sẻ ra ngoài</b> tài khoản hoặc tổ chức của bạn, tức người bên ngoài có thể truy cập. Nó còn kiểm tra policy bạn viết và giúp tìm quyền không dùng tới.</li>
</ul>

<div class="box exam"><b>🎯 Đề thi hay hỏi</b><ul>
<li>\"Best practice for root user\" → <b>Enable MFA, don't use for everyday tasks, no access keys</b></li>
<li>\"Only the root user can…\" → <b>close account, change account email/root password, restore IAM permissions</b></li>
<li>\"Require a code from a device in addition to a password\" → <b>MFA</b></li>
<li>\"Minimum password length, rotate passwords\" → <b>IAM password policy</b></li>
<li>\"Use existing corporate credentials\" → <b>Identity federation</b>; \"employees sign in once to many accounts\" → <b>IAM Identity Center</b></li>
<li>\"Sign-up/sign-in for mobile app users\" → <b>Amazon Cognito</b></li>
<li>\"Store database credentials and rotate automatically\" → <b>AWS Secrets Manager</b></li>
<li>\"List all users and status of passwords, access keys, MFA\" → <b>IAM credential report</b></li>
<li>\"Which services a role actually used and when\" → <b>last accessed information</b> (access advisor); \"resources shared with principals outside the organization\" → <b>IAM Access Analyzer</b></li>
<li>\"Phishing-resistant MFA\" → <b>passkeys / FIDO2 security keys</b>; \"if the root MFA device is lost\" → <b>đăng ký thiết bị MFA thứ hai</b></li>
<li>\"Remove root credentials from member accounts, do root tasks centrally\" → <b>centralized root access management</b></li>
<li>\"Access key leaked\" → <b>deactivate/delete the key</b> + <b>review CloudTrail</b></li>
<li>\"Config values, a few encrypted, no rotation, cheapest\" → <b>Parameter Store</b> (SecureString)</li>
</ul></div>
`,
    summary: [
      "Root user có toàn quyền: bật MFA, không dùng hằng ngày, không tạo access key.",
      "Chỉ root làm được: đổi email/mật khẩu root, đóng tài khoản (tài khoản độc lập), kích hoạt IAM truy cập Billing, đăng ký bán trên RI Marketplace, khôi phục quyền IAM, bật S3 MFA Delete, sửa bucket policy chặn mọi principal. Đổi gói Support không cần root.",
      "Trong Organizations, centralized root access cho phép xóa thông tin đăng nhập root của tài khoản thành viên và làm việc đặc quyền tập trung.",
      "MFA = mật khẩu + thiết bị; passkey/FIDO2 chống phishing; nên có thiết bị MFA dự phòng. Password policy áp dụng cho IAM user, không cho root.",
      "Access key dùng cho CLI/SDK; không lưu trên EC2, dùng IAM role thay thế.",
      "IAM Identity Center cho nhân viên (SSO nhiều tài khoản); Cognito cho người dùng app; Directory Service cho Microsoft AD.",
      "Secrets Manager lưu bí mật và tự động xoay vòng; Parameter Store lưu cấu hình/bí mật đơn giản.",
      "Credential report liệt kê trạng thái đăng nhập của mọi user; access advisor (last accessed) cho biết quyền nào được dùng lần cuối khi nào; Access Analyzer tìm tài nguyên chia sẻ ra ngoài."
    ],
    terms: [
      ["Root user", "người dùng gốc (toàn quyền)"],
      ["MFA (Multi-Factor Authentication)", "xác thực nhiều yếu tố"],
      ["Password policy", "chính sách mật khẩu"],
      ["Access key", "khóa truy cập (cho CLI/SDK)"],
      ["Identity federation", "liên kết danh tính"],
      ["Identity provider (IdP)", "nhà cung cấp danh tính"],
      ["Single sign-on (SSO)", "đăng nhập một lần"],
      ["AWS IAM Identity Center", "dịch vụ SSO cho nhân viên (trước đây là AWS SSO)"],
      ["Amazon Cognito", "dịch vụ đăng ký/đăng nhập cho người dùng ứng dụng"],
      ["AWS Directory Service", "dịch vụ Microsoft Active Directory trên AWS"],
      ["AWS Secrets Manager", "dịch vụ lưu và xoay vòng bí mật"],
      ["Rotation", "xoay vòng (tự đổi bí mật định kỳ)"],
      ["IAM credential report", "báo cáo thông tin đăng nhập IAM"],
      ["IAM access advisor", "công cụ xem quyền được dùng lần cuối"],
      ["IAM Access Analyzer", "công cụ tìm tài nguyên bị chia sẻ ra ngoài"],
      ["Phishing-resistant MFA", "MFA chống lừa đảo (passkey, FIDO2)"],
      ["Permission set", "bộ quyền trong IAM Identity Center"]
    ],
    qids: ["d2-2", "d2-9", "d2-20", "d2-22", "d2-25", "d2-26", "d2-28", "d2-32"]
  },

  {
    id: "2-4",
    module: 2,
    title: "Bảo vệ mạng và ứng dụng: Security Group, NACL, WAF, Shield",
    mins: 14,
    goals: [
      "Hiểu firewall là gì và phân biệt security group với network ACL",
      "Hiểu DDoS, SQL injection, XSS bằng lời đơn giản",
      "Biết khi nào dùng AWS Shield Standard, Shield Advanced, AWS WAF, AWS Firewall Manager",
      "Biết có thể mua công cụ bảo mật bên thứ ba trên AWS Marketplace"
    ],
    html: `
<h3>Firewall là gì?</h3>
<p>Máy tính nói chuyện với nhau qua mạng bằng cách gửi <b>traffic</b> (lưu lượng, các gói dữ liệu). Mỗi gói dữ liệu đi đến một <b>port</b> (cổng), giống số phòng trong tòa nhà: website thường dùng port 443 (HTTPS) và 80 (HTTP), đăng nhập quản trị máy Linux dùng port 22 (SSH).</p>
<p>Một <b>firewall</b> (tường lửa) là \"người gác cổng\" xem từng gói dữ liệu và quyết định cho qua hay chặn, dựa trên các <b>rule</b> (quy tắc): từ địa chỉ nào, đến cổng nào, giao thức gì.</p>
<p>Trên AWS, máy chủ của bạn nằm trong <b>VPC</b> (Virtual Private Cloud, mạng riêng ảo), được chia thành các <b>subnet</b> (mạng con). AWS cho bạn hai lớp tường lửa: một lớp ở cửa từng máy chủ, một lớp ở cổng từng subnet.</p>

<h3>Security group và network ACL</h3>
<p><b>Security group</b> (nhóm bảo mật) là tường lửa ảo gắn ở <b>cấp instance</b> (từng máy chủ EC2, hay chính xác hơn là từng giao diện mạng). Đặc điểm:</p>
<ul>
<li>Chỉ có rule <b>Allow</b> (cho phép). Cái gì không được cho phép thì bị chặn. Bạn không viết được rule \"chặn IP này\".</li>
<li><b>Stateful</b> (có nhớ trạng thái): nếu một yêu cầu được phép đi vào, câu trả lời tương ứng được tự động cho đi ra, không cần rule riêng.</li>
<li>Mặc định: chặn mọi traffic đi vào, cho phép mọi traffic đi ra.</li>
</ul>
<p><b>Network ACL</b> (NACL, danh sách kiểm soát truy cập mạng) là tường lửa ở <b>cấp subnet</b>. Đặc điểm:</p>
<ul>
<li>Có cả rule <b>Allow</b> và <b>Deny</b> (chặn). Dùng được để chặn một địa chỉ IP xấu cụ thể.</li>
<li><b>Stateless</b> (không nhớ trạng thái): chiều vào và chiều ra được kiểm tra riêng, nên phải viết rule cho cả hai chiều.</li>
<li>Rule được xét theo số thứ tự, từ nhỏ đến lớn; rule đầu tiên khớp sẽ được áp dụng.</li>
</ul>

<div class="box idea"><b>🧠 Hiểu đơn giản</b><p><b>NACL</b> là bảo vệ ở <b>cổng khu chung cư</b>: có danh sách ai được vào và danh sách đen ai bị cấm, và kiểm tra cả lúc vào lẫn lúc ra (không nhớ mặt ai). <b>Security group</b> là <b>khóa cửa từng căn hộ</b>: chỉ có danh sách khách được mời; ai đã được mời vào thì tự nhiên được ra, không cần hỏi lại.</p></div>

<table>
<tr><th>Đặc điểm</th><th>Security group</th><th>Network ACL</th></tr>
<tr><td>Gắn ở đâu</td><td>Instance (từng máy chủ)</td><td>Subnet (cả mạng con)</td></tr>
<tr><td>Loại rule</td><td>Chỉ Allow</td><td>Allow và Deny</td></tr>
<tr><td>Trạng thái</td><td>Stateful: chiều về tự được phép</td><td>Stateless: phải cho phép cả hai chiều</td></tr>
<tr><td>Thứ tự xét rule</td><td>Xét tất cả rule</td><td>Theo số thứ tự, khớp đầu tiên thì dừng</td></tr>
<tr><td>Dùng khi</td><td>Kiểm soát chi tiết ai vào máy chủ nào</td><td>Chặn cả dải IP ở cấp subnet</td></tr>
</table>

<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>Máy chủ web BánhNgon có security group chỉ cho phép port 443 (HTTPS) từ mọi nơi, và port 22 (SSH) chỉ từ địa chỉ IP văn phòng của Minh. Database nằm trong subnet riêng, security group của database chỉ cho phép traffic đến từ security group của máy chủ web.</p><p>Một hôm Minh thấy một địa chỉ IP lạ liên tục dò quét. Security group không có rule Deny, nên Minh thêm rule <b>Deny</b> địa chỉ đó vào <b>network ACL</b> của subnet.</p></div>

<h3>Các kiểu tấn công hay nghe: DDoS, SQL injection, XSS</h3>
<ul>
<li><b>DDoS</b> (Distributed Denial of Service, tấn công từ chối dịch vụ phân tán): kẻ xấu điều khiển hàng nghìn máy cùng gửi yêu cầu rác tới website, làm nó quá tải, khách thật không vào được. Giống hàng trăm người gọi điện liên tục vào số đặt bánh để khách thật không gọi được.</li>
<li><b>SQL injection</b> (chèn mã SQL): kẻ xấu gõ một đoạn lệnh database vào ô nhập liệu (ví dụ ô tìm kiếm). Nếu website xử lý ẩu, đoạn lệnh đó chạy thật, có thể đọc trộm hoặc xóa dữ liệu.</li>
<li><b>XSS</b> (Cross-Site Scripting): kẻ xấu cài đoạn mã độc vào trang web (ví dụ trong ô bình luận). Người khác mở trang thì trình duyệt của họ chạy mã độc đó, có thể bị đánh cắp phiên đăng nhập.</li>
</ul>

<h3>AWS Shield, AWS WAF, AWS Firewall Manager</h3>
<h4>AWS Shield: chống DDoS</h4>
<ul>
<li><b>AWS Shield Standard</b>: <b>miễn phí</b>, <b>tự động bật</b> cho mọi khách hàng AWS. Bảo vệ trước các kiểu DDoS phổ biến ở tầng mạng và tầng vận chuyển (layer 3/4), ví dụ <b>SYN flood</b>, UDP reflection. Bạn không cần làm gì. Với website nhỏ, ngân sách hạn chế, không cần đội phản ứng hay bảo vệ chi phí, Shield Standard là đủ.</li>
<li><b>AWS Shield Advanced</b>: <b>trả phí</b>, bảo vệ nâng cao cho các tài nguyên như CloudFront, Route 53, Elastic Load Balancing, EC2, Global Accelerator. Có thêm hỗ trợ 24/7 từ đội phản ứng DDoS của AWS (Shield Response Team), báo cáo chi tiết, và bảo vệ chi phí khi bị tấn công làm tài nguyên tăng vọt.</li>
</ul>
<h4>AWS WAF: tường lửa ứng dụng web</h4>
<p><b>AWS WAF</b> (Web Application Firewall) đọc nội dung các yêu cầu web (tầng ứng dụng, layer 7) để lọc theo rule. WAF gắn vào <b>Amazon CloudFront, Application Load Balancer, Amazon API Gateway</b> và một số dịch vụ khác. Các loại rule hay gặp:</p>
<ul>
<li>Chặn <b>SQL injection, XSS</b> trong nội dung yêu cầu.</li>
<li>Chặn/cho phép theo <b>địa chỉ IP</b> hoặc theo <b>quốc gia</b> (geo match).</li>
<li><b>Rate-based rule</b>: tự động chặn một IP khi nó gửi quá số yêu cầu cho phép trong thời gian ngắn. Hợp để chống dò mật khẩu (brute force) vào trang đăng nhập hay HTTP flood từ một số nguồn gửi dồn dập (rule đếm số yêu cầu theo từng IP và tự chặn IP vượt ngưỡng).</li>
<li><b>Managed rule groups</b> (bộ rule có sẵn): của AWS, hoặc do <b>hãng bảo mật bên thứ ba</b> xây dựng, cập nhật và bán trên <b>AWS Marketplace</b>, tính tiền vào hóa đơn AWS. Bạn không phải tự viết rule.</li>
</ul>
<h4>AWS Firewall Manager: quản lý tập trung</h4>
<p>Khi công ty có nhiều tài khoản AWS, cài từng rule WAF hay security group ở từng tài khoản rất mệt và dễ sót. <b>AWS Firewall Manager</b> cho phép đặt quy tắc tường lửa (WAF, Shield Advanced, security group, Network Firewall…) <b>một lần</b> và áp dụng cho <b>mọi tài khoản trong AWS Organizations</b>, kể cả tài khoản và tài nguyên mới tạo sau này.</p>
<div class="flow"><span>Người dùng</span><span>Shield (chống DDoS)</span><span>WAF (lọc yêu cầu web)</span><span>NACL (subnet)</span><span>Security group (máy chủ)</span></div>

<div class="box trap"><b>⚠️ Bẫy hay gặp</b><p><b>Shield</b> chống <b>DDoS</b>; <b>WAF</b> chống <b>SQL injection, XSS</b> và lọc yêu cầu web. Đề hay đặt cả hai cạnh nhau. Nếu đề nói \"free, automatically enabled\" → Shield <b>Standard</b>. Nếu đề nói \"24/7 DDoS response team\" hay \"cost protection\" → Shield <b>Advanced</b>.</p></div>

<h3>Công cụ bảo mật bên thứ ba: AWS Marketplace</h3>
<p>Ngoài dịch vụ của AWS, bạn có thể dùng sản phẩm của các hãng bảo mật khác (tường lửa thế hệ mới, phát hiện xâm nhập, chống virus…). <b>AWS Marketplace</b> là \"chợ\" phần mềm, nơi bạn tìm, mua và triển khai các sản phẩm này lên AWS, và <b>tiền được tính chung vào hóa đơn AWS</b>.</p>

<div class="box exam"><b>🎯 Đề thi hay hỏi</b><ul>
<li>\"Stateful, instance level\" → <b>Security group</b></li>
<li>\"Stateless, subnet level, allow and deny rules\" → <b>Network ACL</b></li>
<li>\"Block a specific IP address at the subnet\" → <b>Network ACL</b> (hoặc AWS WAF nếu là ứng dụng web)</li>
<li>\"DDoS protection, free, automatic for all customers\" → <b>AWS Shield Standard</b></li>
<li>\"SQL injection, cross-site scripting, filter web requests\" → <b>AWS WAF</b></li>
<li>\"Centrally manage firewall rules across accounts in AWS Organizations\" → <b>AWS Firewall Manager</b></li>
<li>\"Buy third-party security software billed through AWS\" → <b>AWS Marketplace</b>; \"WAF rule set built by a third-party vendor\" → <b>AWS Marketplace</b> (managed rule group)</li>
<li>\"Block IPs that send too many requests in a short time\", \"password-guessing on login page\" → <b>AWS WAF rate-based rule</b></li>
<li>\"Block requests from specific countries\" → <b>AWS WAF</b> (geo match)</li>
<li>\"24/7 Shield Response Team, DDoS cost protection\" → <b>AWS Shield Advanced</b></li>
<li>\"SQL injection + DDoS team + auto-apply to new accounts in Organizations\" → <b>WAF + Shield Advanced + Firewall Manager</b></li>
</ul></div>
`,
    summary: [
      "Firewall kiểm tra traffic và cho qua hoặc chặn theo rule (địa chỉ, port, giao thức).",
      "Security group: cấp instance, stateful, chỉ có rule Allow.",
      "Network ACL: cấp subnet, stateless, có cả Allow và Deny, xét theo số thứ tự.",
      "AWS Shield Standard miễn phí và tự động chống DDoS; Shield Advanced trả phí, có đội hỗ trợ 24/7.",
      "AWS WAF chặn SQL injection, XSS, lọc theo IP/quốc gia, rate-based rule chặn IP gửi quá nhiều yêu cầu; gắn vào CloudFront, ALB, API Gateway; có managed rule groups của AWS và của hãng thứ ba trên Marketplace.",
      "AWS Firewall Manager quản lý rule tường lửa tập trung cho nhiều tài khoản trong AWS Organizations.",
      "AWS Marketplace là nơi mua công cụ bảo mật bên thứ ba, tính tiền qua hóa đơn AWS."
    ],
    terms: [
      ["Firewall", "tường lửa"],
      ["Port", "cổng mạng"],
      ["VPC (Virtual Private Cloud)", "mạng riêng ảo"],
      ["Subnet", "mạng con"],
      ["Security group", "nhóm bảo mật (tường lửa cấp instance)"],
      ["Network ACL (NACL)", "danh sách kiểm soát truy cập mạng (cấp subnet)"],
      ["Stateful", "có nhớ trạng thái"],
      ["Stateless", "không nhớ trạng thái"],
      ["DDoS (Distributed Denial of Service)", "tấn công từ chối dịch vụ phân tán"],
      ["SQL injection", "tấn công chèn mã SQL"],
      ["Cross-site scripting (XSS)", "tấn công chèn mã độc vào trang web"],
      ["AWS Shield", "dịch vụ chống DDoS"],
      ["AWS WAF (Web Application Firewall)", "tường lửa ứng dụng web"],
      ["AWS Firewall Manager", "quản lý tường lửa tập trung"],
      ["Rate-based rule", "rule WAF chặn nguồn gửi quá nhiều yêu cầu"],
      ["AWS Marketplace", "chợ phần mềm bên thứ ba trên AWS"]
    ],
    qids: ["d2-5", "d2-12", "d2-14", "d2-15", "d2-29", "d2-34"]
  },

  {
    id: "2-5",
    module: 2,
    title: "Phát hiện và điều tra mối đe dọa: GuardDuty, Inspector, Macie, Detective, Security Hub",
    mins: 13,
    goals: [
      "Biết chức năng chính của GuardDuty, Inspector, Macie, Detective, Security Hub",
      "Phân biệt nhanh năm dịch vụ qua từ khóa trong đề",
      "Hiểu Trusted Advisor giúp gì cho bảo mật"
    ],
    html: `
<h3>Vì sao cần dịch vụ \"phát hiện\"?</h3>
<p>Ở các bài 2-2 đến 2-4, bạn đã phân quyền, bật MFA, dựng tường lửa. Đó là các biện pháp <b>phòng ngừa</b>. Nhưng không có hàng rào nào hoàn hảo: mật khẩu vẫn có thể bị lộ, phần mềm vẫn có lỗ hổng mới, nhân viên vẫn có thể lỡ tay đưa dữ liệu nhạy cảm lên chỗ công khai.</p>
<p>Vì vậy cần thêm các biện pháp <b>phát hiện</b> (detective controls): liên tục theo dõi, tìm dấu hiệu bất thường và báo cho bạn. AWS có một \"đội bảo vệ\" gồm nhiều dịch vụ, mỗi dịch vụ có một chuyên môn riêng. Kết quả mỗi dịch vụ báo ra thường gọi là <b>finding</b> (phát hiện, cảnh báo).</p>

<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>Tưởng tượng một trung tâm thương mại có đội an ninh:</p><ul>
<li><b>GuardDuty</b> là <b>người trực camera</b>, xem suốt ngày đêm để thấy hành vi khả nghi (ai đó lảng vảng lúc 3 giờ sáng).</li>
<li><b>Inspector</b> là <b>thợ kiểm tra ổ khóa</b>, đi kiểm từng cửa xem khóa nào cũ, dễ bẻ.</li>
<li><b>Macie</b> là <b>người kiểm tra két tài liệu</b>, tìm xem có giấy tờ tùy thân, số thẻ để lung tung không.</li>
<li><b>Detective</b> là <b>thám tử</b>, khi có sự cố thì lần lại dấu vết để tìm nguyên nhân.</li>
<li><b>Security Hub</b> là <b>phòng chỉ huy</b>, gom báo cáo của mọi người lên một màn hình lớn.</li>
</ul></div>

<h3>Amazon GuardDuty: phát hiện mối đe dọa</h3>
<p><b>Amazon GuardDuty</b> là dịch vụ <b>threat detection</b> (phát hiện mối đe dọa). Nó liên tục phân tích các nguồn nhật ký như <b>AWS CloudTrail</b> (nhật ký hành động trong tài khoản), <b>VPC Flow Logs</b> (nhật ký lưu lượng mạng) và <b>DNS logs</b> (nhật ký tra cứu tên miền), dùng <b>machine learning</b> (học máy) và danh sách địa chỉ độc hại đã biết để tìm điều bất thường.</p>
<p>Ví dụ phát hiện: một máy chủ EC2 đang liên lạc với địa chỉ IP đã biết là của kẻ đào tiền ảo, hoặc có lệnh gọi API từ một quốc gia lạ lúc nửa đêm. Bật GuardDuty chỉ cần vài cú nhấp, không phải cài phần mềm (agent) lên máy chủ.</p>
<p>GuardDuty còn có các tính năng bảo vệ mở rộng, đáng nhớ nhất là <b>S3 Protection</b>: theo dõi các hoạt động truy cập dữ liệu trong bucket S3 (S3 data events) để cảnh báo khi object bị đọc từ IP độc hại đã biết, hoặc khi kiểu truy cập bất thường cho thấy thông tin đăng nhập đang bị lạm dụng để rút dữ liệu.</p>
<div class="box trap"><b>⚠️ Bẫy hay gặp</b><p>Cả GuardDuty S3 Protection và Macie đều \"liên quan S3\" nhưng trả lời hai câu hỏi khác nhau. <b>Macie</b>: <b>bên trong</b> bucket có dữ liệu nhạy cảm gì (số thẻ, hộ chiếu, PII)? <b>GuardDuty S3 Protection</b>: <b>ai đang truy cập</b> bucket một cách đáng ngờ (IP độc hại, credential bị lạm dụng)?</p></div>

<h3>Amazon Inspector: tìm lỗ hổng phần mềm</h3>
<p>Một <b>vulnerability</b> (lỗ hổng) là điểm yếu trong phần mềm mà kẻ xấu có thể lợi dụng. Các lỗ hổng được công bố công khai mỗi ngày.</p>
<p><b>Amazon Inspector</b> <b>tự động và liên tục quét</b> các <b>EC2 instance</b>, <b>container image</b> trong Amazon ECR và <b>Lambda function</b> để tìm lỗ hổng phần mềm đã biết (CVE, kể cả trong thư viện mã nguồn mở mà code dùng) và việc vô tình mở mạng ra ngoài (unintended network exposure). Khi có lỗ hổng mới được công bố, Inspector tự quét lại, nên bạn nhanh chóng biết hàm Lambda hay image nào bị ảnh hưởng. Nó chấm mức độ nghiêm trọng để bạn biết cái nào cần vá trước.</p>
<p><i>Cập nhật: từ 6/2025 Inspector có thêm <b>code security</b>: quét kho mã nguồn (ví dụ GitHub, GitLab) để tìm lỗi trong code tự viết (SAST), lỗ hổng trong thư viện phụ thuộc (SCA) và cấu hình sai trong mẫu hạ tầng dạng code (IaC).</i></p>

<h3>Amazon Macie: tìm dữ liệu nhạy cảm</h3>
<p><b>PII</b> (Personally Identifiable Information, thông tin định danh cá nhân) là dữ liệu có thể xác định một người: họ tên kèm địa chỉ, số điện thoại, số thẻ ngân hàng…</p>
<p><b>Amazon Macie</b> dùng machine learning và nhận dạng mẫu để <b>tìm dữ liệu nhạy cảm như PII trong Amazon S3</b>, đồng thời cảnh báo bucket nào đang công khai hoặc không mã hóa. Nhớ: Macie gắn với <b>S3</b> và <b>dữ liệu nhạy cảm</b>.</p>

<h3>Amazon Detective và AWS Security Hub</h3>
<p><b>Amazon Detective</b> giúp <b>điều tra</b>. Khi GuardDuty báo \"có chuyện\", bạn cần biết: chuyện bắt đầu từ đâu, liên quan những tài nguyên nào, kéo dài bao lâu. Detective tự gom dữ liệu nhật ký và vẽ thành biểu đồ quan hệ để bạn tìm <b>root cause</b> (nguyên nhân gốc).</p>
<p><b>AWS Security Hub</b> là nơi <b>tập trung</b>. Nó gom cảnh báo từ GuardDuty, Inspector, Macie và nhiều dịch vụ khác (kể cả sản phẩm của đối tác), trên <b>nhiều tài khoản</b>, vào một màn hình. Nó còn tự kiểm tra cấu hình của bạn so với các bộ tiêu chuẩn bảo mật (ví dụ AWS Foundational Security Best Practices, <b>CIS AWS Foundations Benchmark</b>) và cho điểm tình trạng bảo mật.</p>
<p><i>Cập nhật tên gọi: phiên bản Security Hub mới được giới thiệu dạng preview từ 6/2025 và chính thức (GA) ngày 2/12/2025. Từ đó, phần kiểm tra cấu hình theo tiêu chuẩn mang tên <b>AWS Security Hub CSPM</b>, còn tên AWS Security Hub dùng cho phiên bản mới gom và ưu tiên rủi ro từ GuardDuty, Inspector, Macie, Security Hub CSPM. Với đề thi, cứ nhớ: \"centralized view of findings, compliance checks across accounts\" → Security Hub.</i></p>

<table>
<tr><th>Dịch vụ</th><th>Câu hỏi nó trả lời</th><th>Đối tượng / nguồn</th><th>Từ khóa trong đề</th></tr>
<tr><td>GuardDuty</td><td>Có ai đang làm gì khả nghi không?</td><td>CloudTrail, VPC Flow Logs, DNS logs</td><td>threat detection, malicious activity, ML</td></tr>
<tr><td>Inspector</td><td>Phần mềm của tôi có lỗ hổng không?</td><td>EC2, container image (ECR), Lambda, kho mã nguồn (code security)</td><td>vulnerabilities, CVE, automated scanning</td></tr>
<tr><td>Macie</td><td>Dữ liệu nhạy cảm nằm ở đâu?</td><td>Amazon S3</td><td>PII, sensitive data</td></tr>
<tr><td>Detective</td><td>Chuyện gì đã xảy ra, vì sao?</td><td>Dữ liệu nhật ký và finding</td><td>investigate, root cause</td></tr>
<tr><td>Security Hub</td><td>Tổng thể bảo mật của tôi ra sao?</td><td>Finding từ nhiều dịch vụ, nhiều tài khoản</td><td>centralized view, security posture</td></tr>
</table>

<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>BánhNgon giờ có app đặt hàng và lưu thông tin giao hàng của khách trên S3. Minh bật cả đội bảo vệ:</p><ul>
<li><b>Macie</b> báo: có một file Excel chứa họ tên và số điện thoại khách nằm trong bucket ảnh sản phẩm công khai. Minh chuyển nó đi ngay.</li>
<li><b>Inspector</b> báo: máy chủ EC2 đang dùng một thư viện có lỗ hổng mức Critical. Minh cập nhật bản vá.</li>
<li><b>GuardDuty</b> báo: có đăng nhập API từ địa chỉ IP lạ. Minh mở <b>Detective</b> để lần ra rằng một access key cũ bị lộ trên mạng, rồi vô hiệu hóa key đó.</li>
<li>Mọi cảnh báo hiện chung trên <b>Security Hub</b>, nên chị Lan chỉ cần xem một màn hình để biết tình hình.</li>
</ul></div>

<div class="box trap"><b>⚠️ Bẫy hay gặp</b><p><b>GuardDuty</b> (phát hiện hành vi đáng ngờ đang xảy ra) và <b>Inspector</b> (tìm lỗ hổng trong phần mềm) rất hay bị nhầm. Hỏi \"vulnerabilities\" → Inspector. Hỏi \"threats, malicious activity, analyzing logs\" → GuardDuty.</p><p><b>Detective</b> (điều tra nguyên nhân) và <b>GuardDuty</b> (phát hiện) cũng dễ nhầm: GuardDuty báo động, Detective giúp điều tra sau đó.</p></div>

<h3>Trusted Advisor: chuyên gia tư vấn tự động</h3>
<p><b>AWS Trusted Advisor</b> kiểm tra tài khoản của bạn và đưa ra khuyến nghị theo nhiều nhóm: tối ưu chi phí, hiệu năng, <b>bảo mật</b>, khả năng chịu lỗi, giới hạn dịch vụ (service quotas) và vận hành.</p>
<p>Một số kiểm tra bảo mật tiêu biểu: bucket S3 có quyền truy cập mở, security group mở các port nhạy cảm ra toàn Internet, root user chưa bật MFA, chưa dùng IAM, snapshot EBS/RDS để công khai. Các <b>kiểm tra bảo mật cốt lõi</b> (core security checks) như security group mở port không giới hạn, root chưa bật MFA, quyền bucket S3, việc dùng IAM, snapshot công khai <b>miễn phí cho mọi tài khoản, kể cả gói Basic Support</b>. Bộ kiểm tra đầy đủ phụ thuộc gói AWS Support (nên xem trang chính thức để biết chi tiết).</p>

<div class="box exam"><b>🎯 Đề thi hay hỏi</b><ul>
<li>\"Uses ML to analyze CloudTrail, VPC Flow Logs, DNS logs to detect threats\" → <b>Amazon GuardDuty</b></li>
<li>\"Automatically scans EC2 instances and container images for vulnerabilities\" → <b>Amazon Inspector</b></li>
<li>\"Discover and protect PII / sensitive data in S3\" → <b>Amazon Macie</b></li>
<li>\"Investigate root cause of suspicious activity\" → <b>Amazon Detective</b></li>
<li>\"Centralized view of security alerts across multiple accounts\" → <b>AWS Security Hub</b></li>
<li>\"Recommendations: open security group ports, root MFA, S3 bucket permissions\" (kể cả với Basic Support, không thêm phí) → <b>AWS Trusted Advisor</b></li>
<li>\"Alert when S3 objects are read from malicious IPs / credentials misused to pull data\" → <b>GuardDuty S3 Protection</b>; \"which buckets contain credit card or passport numbers\" → <b>Macie</b></li>
<li>\"Find Lambda functions and ECR images with a vulnerable library, continuously\" → <b>Amazon Inspector</b></li>
<li>\"Compare accounts against CIS Benchmark + one place for GuardDuty/Inspector/Macie findings\" → <b>AWS Security Hub</b></li>
<li>\"Check configuration against CIS / AWS Foundational Security Best Practices (FSBP)\" → nếu đáp án có <b>AWS Security Hub CSPM</b> thì chọn nó; nếu không thì chọn <b>AWS Security Hub</b></li>
</ul></div>
`,
    summary: [
      "GuardDuty: phát hiện mối đe dọa bằng ML từ CloudTrail, VPC Flow Logs, DNS logs, không cần agent; S3 Protection phát hiện truy cập S3 đáng ngờ (khác Macie là tìm dữ liệu nhạy cảm).",
      "Inspector: tự động quét lỗ hổng phần mềm trên EC2, container image, Lambda (và từ 2025 cả kho mã nguồn).",
      "Macie: tìm dữ liệu nhạy cảm (PII) trong S3.",
      "Detective: điều tra, tìm nguyên nhân gốc của sự cố bảo mật.",
      "Security Hub: gom cảnh báo từ nhiều dịch vụ và nhiều tài khoản, chấm điểm theo tiêu chuẩn bảo mật.",
      "Trusted Advisor có các kiểm tra bảo mật cốt lõi miễn phí (kể cả Basic Support) như port mở, root chưa có MFA, bucket S3 mở."
    ],
    terms: [
      ["Threat detection", "phát hiện mối đe dọa"],
      ["Finding", "phát hiện / cảnh báo do dịch vụ báo ra"],
      ["Vulnerability", "lỗ hổng bảo mật"],
      ["PII (Personally Identifiable Information)", "thông tin định danh cá nhân"],
      ["Sensitive data", "dữ liệu nhạy cảm"],
      ["Root cause", "nguyên nhân gốc"],
      ["Security posture", "tình trạng bảo mật tổng thể"],
      ["Machine learning", "học máy"],
      ["VPC Flow Logs", "nhật ký lưu lượng mạng trong VPC"],
      ["Amazon GuardDuty", "dịch vụ phát hiện mối đe dọa"],
      ["Amazon Inspector", "dịch vụ quét lỗ hổng"],
      ["Amazon Macie", "dịch vụ tìm dữ liệu nhạy cảm trong S3"],
      ["Amazon Detective", "dịch vụ điều tra sự cố bảo mật"],
      ["AWS Security Hub", "trung tâm tổng hợp cảnh báo bảo mật"],
      ["AWS Trusted Advisor", "công cụ khuyến nghị theo best practice"]
    ],
    qids: ["d2-6", "d2-10", "d2-11", "d2-21", "d2-30"]
  },

  {
    id: "2-6",
    module: 2,
    title: "Mã hóa dữ liệu: at rest, in transit, KMS, CloudHSM, ACM",
    mins: 13,
    goals: [
      "Hiểu mã hóa là gì và vì sao cần nó",
      "Phân biệt mã hóa at rest và in transit",
      "Biết khi nào dùng AWS KMS, AWS CloudHSM, AWS Certificate Manager",
      "Hiểu ai quản lý khóa trong từng lựa chọn"
    ],
    html: `
<h3>Mã hóa là gì?</h3>
<p><b>Encryption</b> (mã hóa) là biến dữ liệu đọc được thành một chuỗi ký tự vô nghĩa, chỉ ai có <b>key</b> (khóa) đúng mới biến ngược lại được (<b>decryption</b>, giải mã). Dữ liệu chưa mã hóa gọi là <b>plaintext</b>, dữ liệu đã mã hóa gọi là <b>ciphertext</b>.</p>
<p>Mã hóa không ngăn kẻ xấu lấy được dữ liệu, nhưng làm cho dữ liệu lấy được <b>vô dụng</b> nếu họ không có khóa. Vì vậy, <b>bảo vệ khóa</b> quan trọng không kém việc mã hóa.</p>

<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>Mã hóa giống cất giấy tờ vào <b>hộp có khóa</b>. Kẻ trộm có thể ôm cả hộp đi, nhưng không có chìa thì không đọc được gì. Người giữ chìa khóa mới là người thực sự kiểm soát giấy tờ.</p></div>

<h3>At rest và in transit</h3>
<p>Dữ liệu có hai trạng thái chính, và cần bảo vệ ở cả hai:</p>
<ul>
<li><b>Data at rest</b> (dữ liệu khi lưu trữ): dữ liệu đang \"nằm yên\" trên ổ đĩa, trong database, trong bucket S3, trong bản sao lưu. Mã hóa at rest bảo vệ khi ai đó lấy được ổ đĩa hay file sao lưu. Trên AWS, nhiều dịch vụ hỗ trợ mã hóa at rest, ví dụ <b>S3, EBS, RDS, DynamoDB</b>, thường tích hợp với AWS KMS. Từ năm 2023, S3 tự động mã hóa mọi object mới.</li>
<li><b>Data in transit</b> (dữ liệu khi truyền đi): dữ liệu đang \"di chuyển\" qua mạng, ví dụ từ trình duyệt của khách tới website, hoặc giữa hai máy chủ. Mã hóa in transit dùng giao thức <b>TLS</b> (Transport Layer Security, trước đây gọi là SSL). Khi website dùng <b>HTTPS</b> (có biểu tượng ổ khóa trên trình duyệt), dữ liệu đang được mã hóa in transit. Còn kết nối giữa <b>văn phòng/data center của bạn và VPC qua Internet</b> thì dùng <b>AWS Site-to-Site VPN</b>, tạo các \"đường hầm\" <b>IPsec</b> được mã hóa.</li>
</ul>
<table>
<tr><th></th><th>At rest</th><th>In transit</th></tr>
<tr><td>Dữ liệu ở đâu</td><td>Ổ đĩa, database, S3, bản sao lưu</td><td>Đang đi trên mạng</td></tr>
<tr><td>Chống lại</td><td>Mất ổ đĩa, lộ file sao lưu</td><td>Nghe lén trên đường truyền</td></tr>
<tr><td>Công cụ AWS điển hình</td><td>AWS KMS, CloudHSM, tính năng mã hóa của S3/EBS/RDS</td><td>TLS/HTTPS (chứng chỉ từ ACM), Site-to-Site VPN (IPsec)</td></tr>
</table>
<h4>Các cách mã hóa dữ liệu trong Amazon S3</h4>
<table>
<tr><th>Cách</th><th>Ai mã hóa / ai giữ khóa</th><th>Ghi chú</th></tr>
<tr><td><b>SSE-S3</b> (server-side encryption, khóa do S3 quản lý)</td><td>S3 mã hóa khi lưu, S3 tự lo khóa</td><td><b>Mặc định</b>: upload không chỉ định gì, bucket không cấu hình gì → object vẫn được mã hóa bằng SSE-S3</td></tr>
<tr><td><b>SSE-KMS</b></td><td>S3 mã hóa bằng khóa trong AWS KMS</td><td>Bạn kiểm soát quyền dùng khóa, mỗi lần dùng khóa có log trong CloudTrail</td></tr>
<tr><td><b>Client-side encryption</b></td><td><b>Bạn</b> mã hóa trước khi upload</td><td>S3 chỉ nhận dữ liệu đã mã hóa</td></tr>
</table>
<p>Bạn có thể đặt <b>default encryption</b> (mã hóa mặc định) của bucket là SSE-KMS nếu muốn dùng khóa của mình. Ngoài mã hóa, S3 còn có <b>S3 Object Lock</b>: khóa object theo mô hình <b>WORM</b> (write once, read many: ghi một lần, không ai sửa/xóa được) trong một thời gian lưu giữ, hữu ích cho yêu cầu lưu trữ hồ sơ theo luật.</p>

<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>Mã hóa <b>at rest</b> giống két sắt trong tiệm: giữ tiền khi tiền nằm yên. Mã hóa <b>in transit</b> giống <b>xe chở tiền bọc thép</b>: bảo vệ tiền khi đang trên đường từ tiệm tới ngân hàng.</p></div>

<h3>AWS KMS: dịch vụ quản lý khóa</h3>
<p><b>AWS Key Management Service (KMS)</b> giúp bạn <b>tạo, lưu, quản lý và kiểm soát việc sử dụng</b> khóa mã hóa. Khóa được bảo vệ trong thiết bị phần cứng an toàn do AWS vận hành, và khóa không bao giờ rời khỏi KMS ở dạng không mã hóa.</p>
<ul>
<li>Tích hợp với rất nhiều dịch vụ: bật mã hóa S3, EBS, RDS chỉ bằng vài lựa chọn.</li>
<li>Bạn dùng IAM policy và <b>key policy</b> để quyết định ai được dùng khóa nào.</li>
<li>Mọi lần dùng khóa được ghi lại trong <b>AWS CloudTrail</b>, nên kiểm toán được.</li>
<li>Có ba kiểu khóa KMS: <b>customer managed key</b> (khóa do bạn tạo và kiểm soát, có phí hằng tháng), <b>AWS managed key</b> (nằm trong tài khoản của bạn, AWS tạo và quản lý giúp cho một dịch vụ, alias dạng <code>aws/s3</code>, bạn xem được nhưng không đổi được cài đặt) và <b>AWS owned key</b> (nằm trong tài khoản của dịch vụ AWS, dùng chung cho nhiều khách hàng, bạn không thấy và không quản lý, hoàn toàn miễn phí; nhiều dịch vụ dùng loại này để mã hóa mặc định).</li>
</ul>
<p><b>Customer managed key</b> là đáp án khi đề đòi \"khóa do công ty kiểm soát\": bạn viết key policy, bật <b>xoay vòng khóa tự động</b> (mặc định mỗi năm một lần), <b>vô hiệu hóa (disable)</b> hoặc lên lịch xóa khóa, và dùng một khóa cho nhiều dịch vụ; mọi lần dùng đều có trong CloudTrail. KMS <b>không</b> cung cấp HSM dành riêng một khách hàng; muốn vậy phải dùng CloudHSM.</p>

<h3>AWS CloudHSM: thiết bị khóa riêng</h3>
<p><b>HSM</b> (Hardware Security Module, mô-đun bảo mật phần cứng) là một thiết bị chuyên dụng để lưu khóa và thực hiện mã hóa, được thiết kế chống can thiệp vật lý.</p>
<p><b>AWS CloudHSM</b> cho bạn thuê HSM <b>dành riêng</b> (single-tenant, không dùng chung với khách khác) trong AWS Cloud. <b>Bạn</b> toàn quyền quản lý khóa và người dùng trên HSM; AWS chỉ lo phần cứng và không truy cập được khóa của bạn. Dùng khi có yêu cầu pháp lý hoặc hợp đồng bắt buộc phải tự kiểm soát hoàn toàn khóa trên phần cứng riêng.</p>
<table>
<tr><th></th><th>AWS KMS</th><th>AWS CloudHSM</th></tr>
<tr><td>Phần cứng</td><td>Do AWS quản lý, dùng chung hạ tầng</td><td>HSM dành riêng cho bạn</td></tr>
<tr><td>Ai quản lý khóa</td><td>AWS vận hành dịch vụ; bạn kiểm soát quyền dùng khóa</td><td>Bạn tự quản lý hoàn toàn</td></tr>
<tr><td>Độ dễ dùng</td><td>Rất dễ, tích hợp sẵn nhiều dịch vụ</td><td>Cần nhiều công sức hơn</td></tr>
<tr><td>Khi nào chọn</td><td>Hầu hết trường hợp</td><td>Yêu cầu tuân thủ nghiêm ngặt, cần HSM riêng</td></tr>
</table>

<h3>AWS Certificate Manager và HTTPS</h3>
<p>Để website chạy HTTPS, bạn cần một <b>SSL/TLS certificate</b> (chứng chỉ số), giống \"giấy chứng minh\" rằng website đúng là của bạn, và nó cho phép trình duyệt mã hóa kết nối.</p>
<p><b>AWS Certificate Manager (ACM)</b> giúp bạn <b>cấp, quản lý và tự động gia hạn</b> chứng chỉ SSL/TLS. Chứng chỉ công khai do ACM cấp miễn phí khi dùng với các dịch vụ tích hợp như <b>Elastic Load Balancing, Amazon CloudFront, Amazon API Gateway</b>. Bạn không còn lo quên gia hạn khiến website báo lỗi \"không an toàn\".</p>

<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>Khách đặt bánh nhập địa chỉ và số điện thoại trên website. Minh dùng <b>ACM</b> cấp chứng chỉ cho banhngon.vn và gắn vào load balancer, nên mọi dữ liệu từ trình duyệt khách tới máy chủ được mã hóa <b>in transit</b> qua HTTPS.</p><p>Database đơn hàng trên RDS và ổ EBS của máy chủ được bật mã hóa <b>at rest</b> bằng khóa trong <b>KMS</b>. Minh tạo một customer managed key và chỉ cho phép role của ứng dụng dùng khóa này. Khi BánhNgon mở rộng sang Nhật và một đối tác thanh toán yêu cầu khóa phải nằm trên HSM riêng, Minh mới cân nhắc <b>CloudHSM</b>.</p></div>

<div class="box trap"><b>⚠️ Bẫy hay gặp</b><p>Đề nói \"<b>dedicated</b> hardware security module\", \"single-tenant\", \"full control of keys\" → <b>CloudHSM</b>. Đề chỉ nói \"create and manage encryption keys\" → <b>KMS</b>.</p><p><b>ACM</b> quản lý <b>chứng chỉ</b> (cho HTTPS, in transit), <b>không</b> phải nơi quản lý khóa mã hóa dữ liệu at rest. Và nhớ: bật mã hóa dữ liệu của bạn là trách nhiệm của khách hàng trong mô hình trách nhiệm chia sẻ.</p></div>

<div class="box exam"><b>🎯 Đề thi hay hỏi</b><ul>
<li>\"Create and manage encryption keys\", \"encrypt data at rest in S3/EBS\" → <b>AWS KMS</b></li>
<li>\"Dedicated HSM\", \"regulatory requirement to control keys on dedicated hardware\" → <b>AWS CloudHSM</b></li>
<li>\"Encrypt data in transit between browsers and website\", \"provision SSL/TLS certificates\" → <b>AWS Certificate Manager (ACM)</b></li>
<li>\"Data stored on disk\" → <b>at rest</b>; \"data moving over the network\" → <b>in transit</b></li>
<li>\"Ways to encrypt S3 objects at rest\" → <b>SSE-S3, SSE-KMS, client-side encryption</b>; \"no encryption specified\" → <b>SSE-S3</b> mặc định</li>
<li>\"Encrypt traffic between on-premises and VPC over the internet\" → <b>Site-to-Site VPN (IPsec)</b></li>
<li>\"Keys the company controls, automatic yearly rotation, disable, CloudTrail audit\" → <b>KMS customer managed keys</b></li>
<li>\"Encrypt EBS at rest + HTTPS to the load balancer\" → <b>EBS encrypted with KMS key</b> + <b>HTTPS listener with ACM certificate</b></li>
<li>\"Who is responsible for enabling encryption of customer data?\" → <b>Customer</b></li>
</ul></div>
`,
    summary: [
      "Mã hóa biến dữ liệu thành dạng không đọc được nếu không có khóa; bảo vệ khóa là cốt lõi.",
      "At rest = dữ liệu đang lưu trữ (S3, EBS, RDS); in transit = dữ liệu đang truyền (TLS/HTTPS, Site-to-Site VPN IPsec).",
      "S3: mặc định SSE-S3; có thể dùng SSE-KMS hoặc tự mã hóa phía client; S3 Object Lock chống sửa/xóa (WORM).",
      "AWS KMS tạo và quản lý khóa, tích hợp nhiều dịch vụ, mọi lần dùng khóa ghi vào CloudTrail; customer managed key cho phép xoay vòng tự động, vô hiệu hóa.",
      "AWS CloudHSM cung cấp HSM dành riêng, khách hàng tự quản lý khóa hoàn toàn.",
      "AWS Certificate Manager cấp, quản lý, tự gia hạn chứng chỉ SSL/TLS cho HTTPS.",
      "Bật và quản lý mã hóa dữ liệu là trách nhiệm của khách hàng."
    ],
    terms: [
      ["Encryption", "mã hóa"],
      ["Decryption", "giải mã"],
      ["Encryption key", "khóa mã hóa"],
      ["Plaintext / ciphertext", "dữ liệu gốc / dữ liệu đã mã hóa"],
      ["Data at rest", "dữ liệu khi lưu trữ"],
      ["Data in transit", "dữ liệu khi truyền đi"],
      ["TLS (Transport Layer Security)", "giao thức mã hóa kết nối mạng"],
      ["HTTPS", "giao thức web có mã hóa"],
      ["AWS KMS (Key Management Service)", "dịch vụ quản lý khóa"],
      ["Customer managed key", "khóa do khách hàng quản lý"],
      ["HSM (Hardware Security Module)", "mô-đun bảo mật phần cứng"],
      ["AWS CloudHSM", "HSM dành riêng trên AWS"],
      ["SSL/TLS certificate", "chứng chỉ SSL/TLS"],
      ["SSE-S3 / SSE-KMS", "mã hóa phía server của S3 bằng khóa S3 / khóa KMS"],
      ["S3 Object Lock", "khóa object không cho sửa/xóa (WORM)"],
      ["AWS Certificate Manager (ACM)", "dịch vụ quản lý chứng chỉ"]
    ],
    qids: ["d2-8", "d2-23", "d2-24", "d2-31"]
  },

  {
    id: "2-7",
    module: 2,
    title: "Giám sát, kiểm toán và tuân thủ: CloudTrail, CloudWatch, Config, Artifact",
    mins: 15,
    goals: [
      "Phân biệt rõ CloudTrail, CloudWatch và Config",
      "Biết các loại nhật ký bảo mật nằm ở đâu",
      "Hiểu tuân thủ (compliance) là gì, AWS Artifact dùng để làm gì, và chọn Region để đáp ứng data residency",
      "Biết các nguồn thông tin bảo mật chính thức của AWS"
    ],
    html: `
<h3>Ba \"cuốn sổ\" hay bị nhầm</h3>
<p>Sau khi đã phòng ngừa và phát hiện, bạn còn cần <b>ghi chép</b> để biết hệ thống đang chạy thế nào và ai đã làm gì. Đây là công việc của ba dịch vụ có tên na ná nhau, và đề thi <b>rất thích</b> bắt bạn phân biệt chúng.</p>
<p>Trước hết, một khái niệm: trên AWS, mọi thao tác (tạo máy chủ, xóa file, đổi quyền), dù bấm trên web hay chạy lệnh, đều là một <b>API call</b> (lệnh gọi giao diện lập trình) gửi tới AWS.</p>
<h4>AWS CloudTrail: ai đã làm gì, khi nào</h4>
<p><b>AWS CloudTrail</b> ghi lại <b>các API call</b> trong tài khoản: <b>ai</b> (user/role nào), làm <b>gì</b>, <b>khi nào</b>, từ <b>địa chỉ IP nào</b>, trên tài nguyên nào. Đây là công cụ chính để <b>kiểm toán</b> (audit) và điều tra. CloudTrail được bật sẵn: bạn xem được lịch sử sự kiện quản lý của 90 ngày gần nhất (<b>Event history</b>). Muốn lưu lâu hơn (ví dụ giữ 7 năm theo luật), tạo một <b>trail</b> để ghi file nhật ký vào bucket S3 và giữ bao lâu tùy bạn. Ba tính năng của trail hay gặp trong đề:</p>
<ul>
<li><b>Log file integrity validation</b> (xác thực tính toàn vẹn file log): CloudTrail tạo file \"digest\" có chữ ký số, giúp <b>chứng minh</b> file log trong S3 <b>không bị sửa hay xóa</b> sau khi được ghi.</li>
<li><b>Organization trail</b>: tạo từ <b>management account</b> của AWS Organizations, tự ghi log của <b>mọi tài khoản thành viên hiện tại và tương lai</b> về một nơi tập trung; admin ở tài khoản thành viên <b>không tắt hay xóa</b> được trail này.</li>
<li>Ghi lại cả việc <b>sử dụng khóa KMS</b>: ai (IAM principal nào) dùng khóa nào, khi nào.</li>
</ul>
<h4>Amazon CloudWatch: hệ thống đang khỏe không</h4>
<p><b>Amazon CloudWatch</b> theo dõi <b>hiệu năng và tình trạng hoạt động</b>: thu thập <b>metrics</b> (chỉ số như % CPU, số yêu cầu, độ trễ), <b>logs</b> (nhật ký ứng dụng qua CloudWatch Logs), tạo <b>alarm</b> (cảnh báo khi chỉ số vượt ngưỡng) và <b>dashboard</b> (bảng theo dõi).</p>
<h4>AWS Config: cấu hình đã thay đổi thế nào, có đúng quy định không</h4>
<p><b>AWS Config</b> ghi lại <b>cấu hình của tài nguyên theo thời gian</b> (ví dụ security group này hôm qua mở port nào, hôm nay mở port nào) và dùng <b>Config rules</b> để <b>liên tục</b> đánh giá tài nguyên có <b>tuân thủ</b> quy định bạn đặt ra không (ví dụ \"mọi ổ EBS phải được mã hóa\", \"không bucket S3 nào được công khai\"). Config rule còn gắn được <b>remediation action</b> (hành động khắc phục, chạy qua Systems Manager Automation) để <b>tự động sửa</b> tài nguyên vi phạm, ví dụ tự tắt quyền đọc công khai của bucket, không cần tự viết lịch chạy.</p>

<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>Hãy nghĩ tới một tiệm bánh:</p><ul>
<li><b>CloudTrail</b> là <b>camera an ninh + sổ ra vào</b>: ghi lại ai mở két lúc mấy giờ.</li>
<li><b>CloudWatch</b> là <b>nhiệt kế và đồng hồ đo</b> trên lò nướng: lò nóng bao nhiêu độ, vượt ngưỡng thì chuông kêu.</li>
<li><b>Config</b> là <b>ảnh chụp cách bày tiệm mỗi ngày</b> kèm bảng quy định: so sánh hôm nay với hôm qua, và chỉ ra chỗ nào sai quy định (\"bình cứu hỏa bị dời khỏi chỗ\").</li>
</ul></div>

<table>
<tr><th></th><th>AWS CloudTrail</th><th>Amazon CloudWatch</th><th>AWS Config</th></tr>
<tr><td>Trả lời câu hỏi</td><td><b>Ai</b> đã làm gì, khi nào?</td><td>Hệ thống có <b>khỏe</b> không? Hiệu năng ra sao?</td><td>Cấu hình <b>đã đổi</b> thế nào? Có <b>đúng quy định</b> không?</td></tr>
<tr><td>Ghi lại</td><td>API call, hoạt động người dùng</td><td>Metrics, logs, events</td><td>Trạng thái cấu hình tài nguyên theo thời gian</td></tr>
<tr><td>Tính năng nổi bật</td><td>Lịch sử sự kiện, trail lưu vào S3</td><td>Alarm, dashboard, CloudWatch Logs</td><td>Config rules, lịch sử cấu hình</td></tr>
<tr><td>Từ khóa trong đề</td><td>audit, who made the change, API activity</td><td>monitor performance, CPU, alarm, metrics</td><td>configuration changes, compliance with rules, resource inventory</td></tr>
</table>

<div class="box trap"><b>⚠️ Bẫy hay gặp</b><p>Đề: \"Ai đã xóa bucket S3?\" → <b>CloudTrail</b> (không phải Config). Đề: \"Security group này đã thay đổi cấu hình thế nào theo thời gian, có đúng quy định không?\" → <b>Config</b>. Đề: \"Cảnh báo khi CPU vượt 80%\" → <b>CloudWatch</b>. Mẹo: thấy chữ <b>who</b> → CloudTrail; <b>performance/alarm</b> → CloudWatch; <b>configuration/compliance rules</b> → Config.</p></div>

<h3>Nhật ký bảo mật nằm ở đâu?</h3>
<ul>
<li><b>AWS CloudTrail logs</b>: hoạt động API trong tài khoản (ai làm gì).</li>
<li><b>Amazon CloudWatch Logs</b>: nhật ký ứng dụng, hệ điều hành, và có thể nhận nhật ký từ nhiều dịch vụ khác để tìm kiếm, cảnh báo.</li>
<li><b>VPC Flow Logs</b>: thông tin về lưu lượng IP đi vào và ra các giao diện mạng trong VPC (từ đâu đến đâu, được cho qua hay bị chặn).</li>
<li><b>Amazon S3 server access logs</b>: ghi lại các yêu cầu truy cập vào một bucket S3.</li>
</ul>
<p>Các nhật ký này thường được lưu vào S3 hoặc CloudWatch Logs, và cũng là nguồn dữ liệu cho GuardDuty, Detective ở bài 2-5.</p>
<p><b>Cảnh báo tức thì</b>: nhật ký chỉ có ích nếu có người đọc. Muốn \"gửi email trong vài phút khi có ai đăng nhập console bằng root\", ghép hai dịch vụ: <b>Amazon EventBridge</b> (bắt sự kiện từ CloudTrail theo rule, ví dụ sự kiện đăng nhập của root) → <b>Amazon SNS</b> (Simple Notification Service, gửi email/SMS tới người đăng ký).</p>
<div class="flow"><span>Root đăng nhập</span><span>CloudTrail ghi sự kiện</span><span>EventBridge rule khớp</span><span>SNS gửi email</span></div>

<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>Một sáng, ảnh sản phẩm trên website biến mất. Minh mở <b>CloudTrail</b> và thấy: user của một bạn thực tập đã xóa thư mục ảnh lúc 23:10 tối qua. Minh xem tiếp <b>AWS Config</b> và phát hiện tuần trước có ai đó mở port 22 của máy chủ ra toàn Internet; Config rule đánh dấu tài nguyên này là \"noncompliant\" (không tuân thủ). Còn <b>CloudWatch</b> thì đã gửi cảnh báo từ tối qua vì số lỗi 404 trên website tăng vọt.</p></div>

<h3>Compliance (tuân thủ) và AWS Artifact</h3>
<p><b>Compliance</b> (tuân thủ) nghĩa là đáp ứng các luật, quy định và tiêu chuẩn mà ngành nghề hoặc quốc gia yêu cầu. Các tổ chức độc lập kiểm tra (audit) và cấp chứng nhận. Một số tên hay gặp, bạn chỉ cần nhận diện:</p>
<ul>
<li><b>SOC</b> (System and Organization Controls): báo cáo kiểm toán độc lập về các biện pháp kiểm soát của một nhà cung cấp dịch vụ.</li>
<li><b>PCI DSS</b>: tiêu chuẩn bảo mật cho tổ chức xử lý dữ liệu <b>thẻ thanh toán</b>.</li>
<li><b>ISO/IEC 27001</b>: tiêu chuẩn quốc tế về hệ thống quản lý an toàn thông tin.</li>
<li><b>HIPAA</b>: luật của Mỹ về bảo vệ <b>thông tin sức khỏe</b>.</li>
</ul>
<p>AWS đạt nhiều chứng nhận cho phần hạ tầng của mình. Nhưng theo mô hình trách nhiệm chia sẻ, hạ tầng AWS đạt chuẩn <b>không có nghĩa</b> ứng dụng của bạn tự động đạt chuẩn. Ngoài ra, <b>mức tuân thủ khác nhau tùy dịch vụ</b>: không phải dịch vụ nào cũng nằm trong phạm vi của mọi chương trình (AWS có trang \"Services in Scope\" để tra).</p>
<p><b>AWS Artifact</b> là cổng tự phục vụ, miễn phí, có hai phần:</p>
<ul>
<li><b>Artifact Reports</b>: <b>tải về các báo cáo tuân thủ của AWS</b> (như báo cáo SOC, PCI, chứng nhận ISO). Khi kiểm toán viên hỏi \"chứng minh nhà cung cấp cloud của bạn đạt chuẩn\", bạn vào đây.</li>
<li><b>Artifact Agreements</b>: xem, chấp nhận và quản lý <b>thỏa thuận</b> với AWS cho tài khoản (hoặc cả tổ chức), ví dụ <b>BAA</b> (Business Associate Addendum) mà luật HIPAA yêu cầu trước khi xử lý thông tin sức khỏe (PHI) trên AWS.</li>
</ul>
<p><b>AWS Audit Manager</b> (biết qua là đủ) giúp bạn liên tục thu thập bằng chứng từ việc sử dụng AWS của <b>chính bạn</b> để chuẩn bị cho các cuộc kiểm toán.</p>
<p><i>Lưu ý: Audit Manager đã chuyển sang <b>chế độ bảo trì</b>, không nhận tài khoản mới từ <b>30/4/2026</b> (khách cũ vẫn dùng được). AWS gợi ý dùng <b>conformance packs</b> của <b>AWS Config</b> thay thế. Với đề thi, vẫn nhớ: "continuously collect evidence for audits" → Audit Manager.</i></p>

<h3>Data residency và nguồn thông tin bảo mật</h3>
<p><b>Data residency</b> (nơi lưu trú dữ liệu) là yêu cầu dữ liệu phải nằm trong một quốc gia hoặc khu vực nhất định. Trên AWS, <b>bạn chọn Region</b> để lưu dữ liệu, và AWS không tự chuyển dữ liệu của bạn ra khỏi Region đó trừ khi bạn cấu hình. Vì vậy, muốn đáp ứng luật lưu trú dữ liệu, hãy lưu dữ liệu trong Region đặt tại quốc gia đó.</p>
<p>Khi cần tìm hiểu về bảo mật trên AWS, đây là các nguồn chính thức:</p>
<ul>
<li><b>AWS Security Center</b> (trang bảo mật của AWS): tổng quan về bảo mật, tuân thủ, tài liệu best practice.</li>
<li><b>AWS Security Blog</b>: bài viết về best practice, tính năng bảo mật mới, giải pháp mẫu.</li>
<li><b>AWS Knowledge Center</b> (nay nằm trên <b>AWS re:Post</b>): các bài do AWS viết, hướng dẫn từng bước xử lý những lỗi/câu hỏi thường gặp, dựa trên câu hỏi thực tế của khách hàng gửi AWS Support. Gặp lỗi phổ biến (ví dụ cấp quyền S3 giữa các tài khoản không được) → tìm ở đây trước.</li>
<li>Ngoài ra: tài liệu AWS, Trusted Advisor và Security Hub cũng đưa ra khuyến nghị bảo mật.</li>
</ul>

<div class="box exam"><b>🎯 Đề thi hay hỏi</b><ul>
<li>\"Record API calls to audit who did what and when\" → <b>AWS CloudTrail</b></li>
<li>\"Monitor CPU, set alarms, collect metrics and logs\" → <b>Amazon CloudWatch</b></li>
<li>\"Record configuration changes and evaluate against desired configurations\" → <b>AWS Config</b></li>
<li>\"Capture information about IP traffic in a VPC\" → <b>VPC Flow Logs</b></li>
<li>\"Download AWS SOC/PCI compliance reports\" → <b>AWS Artifact</b></li>
<li>\"Keep data within a country\" → <b>Chọn AWS Region ở quốc gia đó</b></li>
<li>\"Articles about security best practices and new features\" → <b>AWS Security Blog</b>; \"AWS-maintained step-by-step troubleshooting article\" → <b>AWS Knowledge Center (re:Post)</b></li>
<li>\"Prove CloudTrail log files were not modified or deleted\" → <b>log file integrity validation</b></li>
<li>\"Log API activity of all current and future member accounts centrally, members can't stop it\" → <b>organization trail</b></li>
<li>\"Keep API records for years\" → <b>trail delivering to an S3 bucket</b> (Event history chỉ 90 ngày)</li>
<li>\"Continuously evaluate and automatically fix noncompliant resources\" → <b>AWS Config rules + remediation</b></li>
<li>\"Email within minutes when root signs in\" → <b>EventBridge + SNS</b></li>
<li>\"Review and accept a BAA / agreements with AWS\" → <b>AWS Artifact Agreements</b></li>
</ul></div>
`,
    summary: [
      "CloudTrail ghi API call: ai làm gì, khi nào, từ đâu; Event history 90 ngày, trail lưu lâu dài vào S3; có log file integrity validation và organization trail.",
      "CloudWatch theo dõi hiệu năng: metrics, logs, alarm, dashboard. EventBridge + SNS để gửi cảnh báo tức thì (ví dụ root đăng nhập).",
      "Config ghi lịch sử cấu hình tài nguyên, đánh giá tuân thủ liên tục bằng Config rules và có thể tự khắc phục (remediation).",
      "Nhật ký bảo mật: CloudTrail, CloudWatch Logs, VPC Flow Logs, S3 server access logs.",
      "AWS Artifact: Reports (báo cáo SOC, PCI…) và Agreements (ví dụ BAA cho HIPAA); mức tuân thủ khác nhau tùy dịch vụ.",
      "Data residency: chọn Region đặt tại quốc gia yêu cầu; AWS không tự chuyển dữ liệu ra khỏi Region.",
      "Nguồn thông tin bảo mật: AWS Security Center, AWS Security Blog, AWS Knowledge Center."
    ],
    terms: [
      ["API call", "lệnh gọi giao diện lập trình (mọi thao tác trên AWS)"],
      ["Audit", "kiểm toán"],
      ["AWS CloudTrail", "dịch vụ ghi lại hoạt động API"],
      ["Amazon CloudWatch", "dịch vụ giám sát hiệu năng, metrics, logs"],
      ["Metric", "chỉ số đo lường"],
      ["Alarm", "cảnh báo"],
      ["AWS Config", "dịch vụ ghi và đánh giá cấu hình tài nguyên"],
      ["Config rule", "quy tắc đánh giá cấu hình"],
      ["VPC Flow Logs", "nhật ký lưu lượng mạng VPC"],
      ["Compliance", "tuân thủ"],
      ["AWS Artifact", "cổng tải báo cáo tuân thủ và chấp nhận thỏa thuận với AWS"],
      ["Log file integrity validation", "xác thực file log CloudTrail không bị sửa/xóa"],
      ["Organization trail", "trail ghi log cho mọi tài khoản trong Organizations"],
      ["AWS Audit Manager", "dịch vụ thu thập bằng chứng phục vụ kiểm toán"],
      ["Data residency", "yêu cầu nơi lưu trú dữ liệu"],
      ["PCI DSS", "tiêu chuẩn bảo mật dữ liệu thẻ thanh toán"],
      ["HIPAA", "luật bảo vệ thông tin sức khỏe của Mỹ"]
    ],
    qids: ["d2-3", "d2-4", "d2-13", "d2-33", "d2-36"]
  }
);
