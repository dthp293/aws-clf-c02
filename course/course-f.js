(window.CLF.course = window.CLF.course || []).push(
  // ───────────────────────── 5-1 ─────────────────────────
  {
    id: "5-1",
    module: 5,
    title: "Lab 1: Tạo tài khoản an toàn và chặn hóa đơn bất ngờ",
    mins: 30,
    goals: [
      "Bảo vệ root user bằng MFA và hiểu vì sao không dùng root cho việc hằng ngày",
      "Tạo một danh tính quản trị riêng để làm việc hằng ngày (IAM Identity Center hoặc IAM user có MFA)",
      "Tạo một cost budget trong AWS Budgets với cảnh báo email ở mức tiền thấp",
      "Biết đường vào trang Billing và Cost Explorer để tự kiểm tra chi phí"
    ],
    html: `
<h3>Trước khi bắt đầu: vì sao lab này phải làm đầu tiên?</h3>
<p>Từ bài này trở đi, bạn sẽ tự tay bấm trên <b>AWS Management Console</b> (bảng điều khiển web của AWS). Học bằng tay giúp nhớ lâu hơn đọc lý thuyết rất nhiều. Nhưng có hai nỗi sợ lớn của người mới: <b>bị lộ tài khoản</b> và <b>nhận hóa đơn bất ngờ</b>.</p>
<p>Lab 1 xử lý đúng hai nỗi sợ đó. Làm xong lab này, tài khoản của bạn có "khóa hai lớp", bạn có một tài khoản riêng để làm việc hằng ngày, và AWS sẽ gửi email báo ngay khi chi phí vượt mức bạn đặt.</p>
<p>Lưu ý chung cho mọi lab: <b>giao diện có thể khác đôi chút</b> so với mô tả, vì AWS thay đổi Console khá thường xuyên. Hãy tìm theo tên chức năng, đừng tìm theo vị trí nút bấm.</p>

<div class="box idea"><b>🧠 Hiểu đơn giản</b>
<p>Root user giống <b>chìa khóa gốc của cả tòa nhà</b>: mở được mọi cửa, kể cả cửa đóng luôn tòa nhà. Bạn không mang chìa khóa gốc đi chợ mỗi ngày. Bạn cất nó vào két (bật MFA, ít dùng), rồi làm một chìa khóa riêng cho việc hằng ngày (danh tính quản trị). Còn AWS Budgets giống <b>tin nhắn báo số dư</b> của ngân hàng: tiêu quá mức là điện thoại "ting" ngay.</p>
</div>

<h3>Chi phí và chuẩn bị</h3>
<p><b>Chi phí:</b> bật MFA, tạo IAM user hay dùng IAM Identity Center đều không tính phí. Xem trang Billing và Cost Explorer trên giao diện web cũng không tính phí. Tạo budget và nhận cảnh báo qua email trong AWS Budgets <b>không tính phí</b>; chỉ một số tính năng nâng cao (budget có gắn hành động tự động vượt mức miễn phí, báo cáo budget định kỳ) mới tính phí. Lab này chỉ tạo <b>một</b> budget cảnh báo, nên chi phí bằng 0.</p>
<p><b>Về Free Tier:</b> từ tháng 7/2025, AWS đã đổi điều khoản <b>AWS Free Tier</b> (ưu đãi miễn phí) cho tài khoản mới: chuyển sang mô hình dựa trên <b>credit</b> (tín dụng dùng thử), và khi đăng ký bạn chọn một trong hai gói:</p>
<ul>
<li><b>Free plan</b> (gói miễn phí): không phát sinh phí trong lúc dùng. Gói kết thúc sau một thời hạn (vài tháng) hoặc khi dùng hết credit; khi đó tài khoản <b>tự đóng</b> nếu bạn không nâng cấp, nên hãy để ý email của AWS. Một số dịch vụ/tính năng có thể tiêu nhiều tiền không dùng được trong gói này. Lưu ý: một số thao tác sẽ <b>tự động nâng cấp</b> tài khoản lên gói trả phí, ví dụ tham gia hoặc tạo <b>AWS Organizations</b>.</li>
<li><b>Paid plan</b> (gói trả phí): dùng được mọi dịch vụ; phần vượt credit hoặc dịch vụ không áp dụng credit sẽ <b>bị tính tiền thật</b>. Với gói này, budget cảnh báo ở Phần C là bắt buộc.</li>
</ul>
<p>Số credit, thời hạn và danh sách dịch vụ có thể thay đổi, nên hãy <b>đọc trang AWS Free Tier chính thức</b> trước khi làm lab. Đừng tin vào số liệu trên blog cũ (ví dụ "miễn phí 12 tháng" là điều khoản cho tài khoản tạo trước 7/2025).</p>
<p><b>Chuẩn bị:</b></p>
<ul>
<li>Một địa chỉ email bạn dùng thường xuyên (đây sẽ là email của root user).</li>
<li>Một thẻ thanh toán (AWS yêu cầu khi đăng ký) và số điện thoại để xác minh.</li>
<li>Một ứng dụng xác thực trên điện thoại (authenticator app) hoặc một khóa bảo mật vật lý, để làm <b>MFA</b> (Multi-Factor Authentication, xác thực nhiều lớp).</li>
</ul>

<h3>Các bước thực hành</h3>
<h4>Phần A: Đăng nhập root và bật MFA</h4>
<ol>
<li>Nếu chưa có tài khoản, vào trang đăng ký AWS và làm theo hướng dẫn. Đọc kỹ phần chọn gói (free plan / paid plan) theo điều khoản Free Tier hiện hành.</li>
<li>Đăng nhập Console bằng tùy chọn <b>Root user</b>, nhập email và mật khẩu của tài khoản. Root user là danh tính được tạo cùng tài khoản, có toàn quyền.</li>
<li>Bấm vào tên tài khoản ở góc trên, chọn mục <b>Security credentials</b> (thông tin bảo mật).</li>
<li>Tìm phần <b>Multi-factor authentication (MFA)</b>, chọn gán thiết bị MFA. Chọn loại thiết bị (ứng dụng xác thực, passkey/khóa bảo mật…), quét mã QR bằng điện thoại và nhập mã theo hướng dẫn.</li>
<li>Trên cùng trang đó, kiểm tra mục <b>Access keys</b>: root user <b>không nên có access key</b> nào. Nếu có và bạn không dùng, hãy xóa.</li>
<li>Đăng xuất rồi đăng nhập lại bằng root để chắc chắn MFA hoạt động.</li>
</ol>

<h4>Phần B: Tạo danh tính quản trị để làm việc hằng ngày</h4>
<p>Có hai con đường. <b>Cách được AWS khuyến nghị</b> cho con người là <b>AWS IAM Identity Center</b> (trước đây là AWS SSO): bạn đăng nhập qua một cổng truy cập riêng, nhận quyền tạm thời, và sau này dễ mở rộng ra nhiều tài khoản. Nhưng để dùng Identity Center đăng nhập vào <b>tài khoản AWS</b> (gán permission set), bạn phải bật nó ở dạng <b>organization instance</b>, tức là phải bật kèm <b>AWS Organizations</b> (quản lý nhiều tài khoản); tài khoản của bạn trở thành management account. Organizations không tốn phí, nhưng nếu bạn đang ở <b>Free plan</b>, việc bật Organizations sẽ <b>tự động chuyển tài khoản sang Paid plan</b>. (Nếu Console chỉ cho tạo "account instance", instance đó không cấp được quyền vào tài khoản AWS.)</p>
<p>Cách đơn giản hơn để học là tạo một <b>IAM user</b> có quyền quản trị và bật MFA cho user đó. Cách này dùng mật khẩu lâu dài nên kém an toàn hơn một chút, nhưng dễ hiểu cho người mới và <b>không đụng tới Organizations</b>. Chọn một trong hai:</p>
<ol>
<li><b>Cách 1 (AWS khuyến nghị, hợp với Paid plan):</b> mở dịch vụ <b>IAM Identity Center</b>, bấm bật (Enable) và đồng ý tạo organization khi được hỏi. Tạo một user cho chính bạn, tạo một <b>permission set</b> (bộ quyền) có quyền quản trị (ví dụ dùng loại AdministratorAccess), rồi gán user + permission set đó cho tài khoản AWS của bạn. Mở email kích hoạt, đặt mật khẩu, bật MFA, và lưu lại đường link <b>AWS access portal</b> (cổng truy cập).</li>
<li><b>Cách 2 (đơn giản, nên chọn nếu bạn đang ở Free plan):</b> mở dịch vụ <b>IAM</b>, tạo một user (ví dụ tên <code>minh-admin</code>), cho phép đăng nhập Console, gán policy <code>AdministratorAccess</code>. Đăng nhập bằng user này qua đường link đăng nhập IAM của tài khoản, rồi vào Security credentials của user để bật MFA.</li>
<li>Từ giờ, đăng nhập bằng danh tính quản trị này. Chỉ dùng root khi thật sự cần các việc mà chỉ root làm được.</li>
</ol>

<h4>Phần C: Tạo budget cảnh báo chi phí</h4>
<ol>
<li>Mở <b>Billing and Cost Management</b>, tìm mục <b>Budgets</b>, chọn tạo budget.</li>
<li>Chọn loại <b>Cost budget</b> (budget theo chi phí). Console thường có mẫu dựng sẵn như "zero spend budget" hoặc "monthly cost budget"; dùng mẫu hay tự cấu hình đều được.</li>
<li>Đặt chu kỳ hằng tháng và một số tiền rất thấp do bạn tự chọn (mức bạn chấp nhận được khi đang học).</li>
<li>Thêm ngưỡng cảnh báo (ví dụ khi chi phí thực tế vượt một phần trăm của budget) và nhập email nhận thông báo. Có thể thêm cảnh báo theo chi phí <b>dự báo</b> (forecasted).</li>
<li>Lưu budget và kiểm tra email (nếu có yêu cầu xác nhận). Lưu ý: dữ liệu chi phí chỉ được cập nhật vài lần mỗi ngày, nên email cảnh báo có thể đến <b>trễ vài giờ</b> so với lúc phát sinh chi phí. Budget là lưới an toàn, không thay thế việc tự dọn tài nguyên ngay sau mỗi lab.</li>
<li>Vào phần <b>Billing preferences</b> (tùy chọn thanh toán), bật nhận cảnh báo sử dụng Free Tier qua email nếu có tùy chọn này.</li>
</ol>

<h4>Phần D: Xem Billing và Cost Explorer</h4>
<ol>
<li>Trong <b>Billing and Cost Management</b>, mở trang tổng quan (Home) và <b>Bills</b> để xem hóa đơn tháng hiện tại theo từng dịch vụ.</li>
<li>Mở <b>Cost Explorer</b>. Nếu lần đầu dùng, AWS có thể cần một khoảng thời gian (có thể tới khoảng một ngày) để chuẩn bị dữ liệu.</li>
<li>Thử lọc chi phí theo dịch vụ và theo tháng. Để ý phần dự báo chi phí cuối tháng.</li>
<li>Nếu đăng nhập bằng danh tính quản trị (IAM user hoặc qua Identity Center) mà bị từ chối ở trang Billing dù có quyền AdministratorAccess, hãy đăng nhập root, vào trang <b>Account</b> và bật tùy chọn <b>IAM user and role access to Billing information</b>.</li>
</ol>

<div class="box example"><b>🍰 Ví dụ: BánhNgon</b>
<p>Ngày đầu chuyển lên AWS, Minh dùng luôn email của chị Lan để đăng ký và đăng nhập root mọi lúc. Một người bạn làm bảo mật nhắc: "Lộ mật khẩu root là mất cả tiệm đấy". Minh bật MFA cho root, cất điện thoại MFA cẩn thận, rồi tạo danh tính quản trị riêng qua IAM Identity Center.</p>
<p>Chị Lan lo nhất chuyện tiền. Minh tạo một budget hằng tháng ở mức thấp, gửi cảnh báo cho cả email của chị Lan và của Minh. Lần đầu email báo về vì Minh quên tắt máy chủ thử nghiệm, hai chị em xử lý ngay trong ngày, hóa đơn chỉ nhích lên chút ít.</p>
</div>

<div class="box trap"><b>⚠️ Dọn dẹp và kiểm tra cuối lab</b>
<ul>
<li>Lab này <b>không cần xóa</b> gì: MFA, danh tính quản trị và budget là những thứ bạn nên giữ lâu dài.</li>
<li>Kiểm tra root user <b>không có access key</b>.</li>
<li>Kiểm tra email cảnh báo budget đúng địa chỉ bạn đọc hằng ngày.</li>
<li>Đã đăng xuất root và chuyển sang danh tính quản trị.</li>
<li>Budget <b>chỉ cảnh báo</b>, không tự tắt tài nguyên. Nhận email rồi vẫn phải tự vào dọn.</li>
</ul></div>

<div class="box exam"><b>🎯 Liên hệ đề thi</b>
<ul>
<li>"Best practice for the root user" → bật <b>MFA</b>, không dùng root cho việc hằng ngày, không tạo access key cho root.</li>
<li>"Tasks that only the root user can perform" → ví dụ đóng tài khoản, đổi một số cài đặt tài khoản; đề hay đưa vài lựa chọn kiểu này.</li>
<li>"Sign in once to access multiple accounts" → <b>AWS IAM Identity Center</b>.</li>
<li>"Alert when cost/usage exceeds a threshold" hoặc "forecasted cost" → <b>AWS Budgets</b>.</li>
<li>"Visualize past costs and forecast" → <b>AWS Cost Explorer</b>.</li>
</ul></div>
`,
    summary: [
      "Root user có toàn quyền: bật MFA, không tạo access key, chỉ dùng cho việc mà chỉ root làm được.",
      "Làm việc hằng ngày bằng danh tính quản trị riêng; AWS khuyến nghị IAM Identity Center cho con người.",
      "AWS Budgets gửi cảnh báo khi chi phí thực tế hoặc dự báo vượt ngưỡng, nhưng không tự tắt tài nguyên.",
      "Cost Explorer dùng để xem, lọc chi phí quá khứ và dự báo; trang Bills cho hóa đơn theo dịch vụ.",
      "Free Tier cho tài khoản mới (từ 7/2025) dựa trên credit, có Free plan (không tính phí, hết hạn thì tài khoản tự đóng) và Paid plan (vượt credit là trả tiền): luôn đọc trang chính thức.",
      "Identity Center cấp quyền vào tài khoản AWS cần AWS Organizations; ở Free plan, bật Organizations sẽ tự chuyển sang Paid plan."
    ],
    terms: [
      ["Root user", "người dùng gốc, danh tính toàn quyền tạo cùng tài khoản"],
      ["MFA (Multi-Factor Authentication)", "xác thực nhiều lớp"],
      ["Access key", "khóa truy cập dùng cho lập trình/CLI"],
      ["AWS IAM Identity Center", "dịch vụ đăng nhập một lần cho nhiều tài khoản (trước đây là AWS SSO)"],
      ["Permission set", "bộ quyền trong IAM Identity Center"],
      ["AWS access portal", "cổng truy cập của IAM Identity Center"],
      ["AWS Budgets", "dịch vụ đặt ngân sách và cảnh báo chi phí"],
      ["Cost budget", "ngân sách theo chi phí"],
      ["Forecasted cost", "chi phí dự báo"],
      ["AWS Cost Explorer", "công cụ xem và phân tích chi phí"],
      ["AWS Free Tier", "ưu đãi dùng miễn phí của AWS"],
      ["Credit", "tín dụng (số tiền dùng thử)"]
    ],
    qids: ["d2-2", "d2-22", "d2-25", "d2-51", "d2-20", "d4-3", "d4-29", "d4-7"]
  },

  // ───────────────────────── 5-2 ─────────────────────────
  {
    id: "5-2",
    module: 5,
    title: "Lab 2: IAM user, group, policy và least privilege",
    mins: 25,
    goals: [
      "Tạo một IAM group và gắn một AWS managed policy chỉ đọc",
      "Tạo IAM user, đưa vào group và đăng nhập thử bằng user đó",
      "Tự kiểm chứng least privilege: thấy rõ việc gì user làm được và việc gì bị từ chối",
      "Dọn sạch user và group sau khi học"
    ],
    html: `
<h3>Ôn nhanh: user, group, policy</h3>
<p><b>IAM</b> (Identity and Access Management, quản lý danh tính và quyền truy cập) trả lời hai câu hỏi: <b>bạn là ai</b> và <b>bạn được làm gì</b>.</p>
<ul>
<li><b>IAM user</b> (người dùng IAM): một danh tính có tên, có thể đăng nhập Console bằng mật khẩu hoặc gọi API bằng access key.</li>
<li><b>IAM group</b> (nhóm): một tập hợp user. Gắn quyền cho nhóm thì mọi user trong nhóm cùng được hưởng.</li>
<li><b>Policy</b> (chính sách quyền): một tài liệu dạng JSON liệt kê hành động nào được phép (Allow) hoặc bị cấm (Deny) trên tài nguyên nào. <b>AWS managed policy</b> là policy do AWS viết sẵn và tự cập nhật.</li>
</ul>
<p>Nguyên tắc vàng là <b>least privilege</b> (đặc quyền tối thiểu): chỉ cho đúng quyền cần để làm việc, không hơn. Mặc định, một user mới <b>không có quyền gì cả</b>; mọi thứ bị từ chối cho đến khi có policy cho phép.</p>

<div class="box idea"><b>🧠 Hiểu đơn giản</b>
<p>Hãy nghĩ tới thẻ từ ra vào văn phòng. Nhân viên mới nhận thẻ trắng, không mở được cửa nào. Phòng nhân sự gán thẻ vào nhóm "Kế toán", thế là thẻ mở được phòng kế toán và phòng họp, nhưng không mở được phòng máy chủ. Gán theo nhóm thì khi có 20 kế toán mới, chỉ cần thêm họ vào nhóm, không phải cài từng thẻ.</p>
</div>

<h3>Chi phí và chuẩn bị</h3>
<p><b>Chi phí:</b> IAM không tính phí. Tạo user, group, policy đều miễn phí. Lab này không tạo tài nguyên tính tiền nào, nên chi phí bằng 0 nếu bạn làm đúng các bước.</p>
<p><b>Chuẩn bị:</b></p>
<ul>
<li>Đã làm Lab 1: root có MFA, bạn đang đăng nhập bằng danh tính quản trị.</li>
<li>Một cửa sổ trình duyệt ẩn danh (private/incognito) để đăng nhập thử user mới mà không phải đăng xuất tài khoản quản trị.</li>
</ul>
<p>Lưu ý: với con người làm việc thật, AWS khuyến nghị dùng <b>IAM Identity Center</b>. Lab này dùng IAM user để bạn nhìn tận mắt cách user, group và policy hoạt động, vì đề thi hỏi rất nhiều về chúng. Console có thể gợi ý chuyển sang Identity Center khi bạn tạo user; ở lab này cứ chọn tạo IAM user.</p>

<h3>Các bước thực hành</h3>
<p><b>Giao diện có thể khác đôi chút</b>; hãy tìm theo tên chức năng.</p>
<h4>Phần A: Tạo group có quyền chỉ đọc</h4>
<ol>
<li>Mở dịch vụ <b>IAM</b>, chọn <b>User groups</b>, bấm tạo group.</li>
<li>Đặt tên, ví dụ <code>lab-s3-readonly</code>.</li>
<li>Ở phần gắn policy, tìm và chọn AWS managed policy <code>AmazonS3ReadOnlyAccess</code> (chỉ được đọc S3). Tạo group.</li>
<li>Mở policy vừa chọn, xem tab nội dung JSON. Bạn sẽ thấy các hành động bắt đầu bằng <code>s3:Get</code> và <code>s3:List</code> với hiệu lực <code>Allow</code>: chỉ xem, không sửa.</li>
</ol>

<h4>Phần B: Tạo user và đưa vào group</h4>
<ol>
<li>Trong IAM, chọn <b>Users</b>, bấm tạo user, đặt tên ví dụ <code>lab-viewer</code>.</li>
<li>Bật quyền truy cập Console, đặt mật khẩu tạm (có thể bật yêu cầu đổi mật khẩu ở lần đăng nhập đầu).</li>
<li>Ở bước cấp quyền, chọn <b>thêm user vào group</b> và chọn <code>lab-s3-readonly</code>. Không gắn policy trực tiếp cho user.</li>
<li>Tạo user. Ghi lại đường link đăng nhập Console dành cho IAM user (có chứa account ID hoặc alias của tài khoản).</li>
</ol>

<h4>Phần C: Thử quyền</h4>
<ol>
<li>Mở cửa sổ ẩn danh, vào đường link đăng nhập IAM, đăng nhập bằng <code>lab-viewer</code>.</li>
<li>Mở <b>S3</b>: bạn xem được danh sách bucket (nếu tài khoản có bucket).</li>
<li>Thử <b>tạo bucket</b>: thao tác sẽ thất bại với thông báo kiểu "Access Denied" vì policy không có quyền tạo.</li>
<li>Mở <b>EC2</b>: bạn sẽ thấy nhiều thông báo không có quyền (not authorized) vì group chỉ có quyền S3.</li>
<li>Quay lại cửa sổ quản trị, mở user <code>lab-viewer</code>, xem tab quyền: quyền S3 đến từ group, không gắn trực tiếp. Đó là cách quản lý gọn gàng. (Nếu bạn bật "đổi mật khẩu ở lần đăng nhập đầu", Console tự gắn thêm policy <code>IAMUserChangePassword</code> trực tiếp cho user để user tự đổi được mật khẩu; đó là bình thường.)</li>
<li>(Tùy chọn) Thử gỡ user khỏi group, đăng nhập lại bằng user: giờ S3 cũng bị từ chối, vì mặc định là cấm hết.</li>
</ol>

<div class="box example"><b>🍰 Ví dụ: BánhNgon</b>
<p>BánhNgon thuê thêm bạn Hà làm kế toán. Hà cần xem báo cáo doanh số lưu trong S3 nhưng tuyệt đối không được xóa hay sửa. Minh tạo group "ke-toan" gắn policy chỉ đọc S3, rồi thêm Hà vào group.</p>
<p>Một hôm Hà lỡ bấm nhầm nút xóa một file báo cáo. AWS từ chối ngay vì Hà không có quyền xóa. Chị Lan thở phào: least privilege vừa cứu một file quan trọng.</p>
</div>

<h3>Vì sao gắn quyền cho group thay vì cho từng user?</h3>
<p>Nếu gắn policy trực tiếp cho từng người, khi có 20 người cùng vai trò, bạn phải lặp lại 20 lần, và rất dễ sót hoặc cho thừa quyền. Gắn vào group thì chỉ sửa một chỗ. Khi một người chuyển bộ phận, chỉ cần chuyển họ sang group khác.</p>
<p>Ngoài ra, nhớ quy tắc đánh giá quyền: mặc định là <b>implicit deny</b> (từ chối ngầm định); có Allow thì được phép; nhưng nếu ở đâu đó có <b>explicit Deny</b> (từ chối rõ ràng) thì Deny luôn thắng.</p>

<div class="box trap"><b>⚠️ Dọn dẹp cuối lab</b>
<ul>
<li>Đăng xuất <code>lab-viewer</code> và đóng cửa sổ ẩn danh.</li>
<li>Xóa user <code>lab-viewer</code> (Console sẽ xóa kèm mật khẩu và gỡ khỏi group).</li>
<li>Xóa group <code>lab-s3-readonly</code>.</li>
<li>Không xóa AWS managed policy (bạn không xóa được, và cũng không cần).</li>
<li>Kiểm tra lại danh sách Users: không còn user thử nghiệm nào có mật khẩu hay access key bị bỏ quên.</li>
</ul></div>

<div class="box exam"><b>🎯 Liên hệ đề thi</b>
<ul>
<li>"Grant only the permissions required" → <b>principle of least privilege</b>.</li>
<li>"Most efficient way to give the same permissions to many users" → thêm user vào <b>IAM group</b> có policy phù hợp.</li>
<li>"Application on EC2 needs to access S3" → dùng <b>IAM role</b>, không nhét access key vào code.</li>
<li>"Enforce password length/rotation" → <b>IAM password policy</b>.</li>
<li>"Report of all users and credential status" → <b>IAM credential report</b>.</li>
</ul></div>
`,
    summary: [
      "IAM trả lời 'bạn là ai' (user, group, role) và 'bạn được làm gì' (policy).",
      "User mới mặc định không có quyền; explicit Deny luôn thắng Allow.",
      "Gắn policy cho group thay vì từng user giúp quản lý gọn và ít sai sót.",
      "AWS managed policy do AWS viết sẵn, như AmazonS3ReadOnlyAccess cho quyền chỉ đọc S3.",
      "Least privilege: chỉ cấp đúng quyền cần thiết, và kiểm chứng bằng cách thử thao tác bị từ chối.",
      "IAM miễn phí, nhưng vẫn phải xóa user thử nghiệm để không để lại mật khẩu bị bỏ quên."
    ],
    terms: [
      ["IAM (Identity and Access Management)", "quản lý danh tính và quyền truy cập"],
      ["IAM user", "người dùng IAM"],
      ["IAM group", "nhóm người dùng IAM"],
      ["IAM role", "vai trò, danh tính có quyền tạm thời"],
      ["Policy", "chính sách quyền dạng JSON"],
      ["AWS managed policy", "policy do AWS viết sẵn và quản lý"],
      ["Least privilege", "đặc quyền tối thiểu"],
      ["Implicit deny", "từ chối ngầm định (mặc định)"],
      ["Explicit deny", "từ chối rõ ràng, luôn thắng Allow"],
      ["Access Denied", "bị từ chối truy cập"],
      ["Password policy", "chính sách mật khẩu"],
      ["Credential report", "báo cáo thông tin đăng nhập của user"]
    ],
    qids: ["d2-16", "d2-17", "d2-50", "d2-7", "d2-28", "d2-32", "d2-27"]
  },

  // ───────────────────────── 5-3 ─────────────────────────
  {
    id: "5-3",
    module: 5,
    title: "Lab 3: Website tĩnh trên Amazon S3",
    mins: 30,
    goals: [
      "Tạo S3 bucket và upload một trang index.html",
      "Bật static website hosting và hiểu bước mở quyền công khai (Block Public Access, bucket policy)",
      "Hiểu vì sao mở bucket ra công khai là rủi ro, và CloudFront là cách làm chuẩn cho môi trường thật",
      "Xóa object và bucket để không phát sinh chi phí"
    ],
    html: `
<h3>Website tĩnh là gì?</h3>
<p>Một <b>static website</b> (website tĩnh) chỉ gồm các file có sẵn: HTML, CSS, hình ảnh, JavaScript chạy trên trình duyệt. Máy chủ không cần "tính toán" gì, chỉ việc gửi file cho người xem. Trang giới thiệu, menu bánh, trang liên hệ là ví dụ điển hình.</p>
<p><b>Amazon S3</b> (Simple Storage Service, dịch vụ lưu trữ đối tượng) lưu file trong các <b>bucket</b> (thùng chứa). Mỗi file là một <b>object</b> (đối tượng). S3 có tính năng <b>static website hosting</b> để phục vụ các file đó như một website, không cần máy chủ nào.</p>

<div class="box idea"><b>🧠 Hiểu đơn giản</b>
<p>S3 bucket giống một <b>tủ kính trưng bày</b>. Mặc định tủ khóa kín, chỉ chủ tiệm mở được. Muốn khách qua đường nhìn thấy bánh, bạn phải mở cửa tủ cho mọi người xem. Mở tủ thì tiện, nhưng nếu lỡ để giấy tờ riêng trong tủ, ai cũng thấy luôn. Vì vậy chỉ để vào tủ những thứ bạn thật sự muốn công khai.</p>
</div>

<h3>Chi phí và chuẩn bị</h3>
<p><b>Chi phí:</b> S3 tính tiền theo dung lượng lưu trữ, số request và dữ liệu truyền ra internet. Một file HTML vài KB, xem vài lần, chi phí gần như bằng 0 và có thể nằm trong ưu đãi miễn phí của tài khoản bạn. Để giữ gần bằng 0: chỉ upload file nhỏ, không chia sẻ link rộng rãi, và <b>xóa bucket ngay khi xong</b>.</p>
<p><b>Chuẩn bị:</b></p>
<ul>
<li>Đã làm Lab 1 (có budget cảnh báo) và đăng nhập bằng danh tính quản trị.</li>
<li>Một file <code>index.html</code> đơn giản trên máy, ví dụ chỉ có một dòng: <code>&lt;h1&gt;Xin chào từ BánhNgon&lt;/h1&gt;</code>.</li>
</ul>

<h3>Các bước thực hành</h3>
<p><b>Giao diện có thể khác đôi chút</b>; hãy tìm theo tên chức năng.</p>
<ol>
<li>Mở <b>S3</b>, bấm tạo bucket. Chọn Region gần bạn (ví dụ Singapore). Đặt tên bucket <b>duy nhất trên toàn cầu</b>, chỉ chữ thường, số và dấu gạch ngang, ví dụ <code>banhngon-lab-tenban-123</code>.</li>
<li>Để ý mục <b>Block Public Access</b> (chặn truy cập công khai): mặc định đang <b>bật</b> cho bucket mới. Tạm thời giữ nguyên và tạo bucket.</li>
<li>Mở bucket, chọn <b>Upload</b>, tải lên file <code>index.html</code>.</li>
<li>Vào tab <b>Properties</b> của bucket, kéo xuống phần <b>Static website hosting</b>, chọn bật (Enable), kiểu "Host a static website", nhập <code>index.html</code> làm index document. Lưu lại.</li>
<li>Cũng trong phần đó, sao chép đường link <b>Bucket website endpoint</b>. Mở thử trên trình duyệt: bạn sẽ nhận lỗi <b>403 Forbidden</b>. Đúng như mong đợi, vì bucket vẫn đang khóa kín.</li>
<li>Vào tab <b>Permissions</b>, sửa <b>Block Public Access</b> cho bucket này: bỏ chọn <b>Block all public access</b> để cho phép bucket policy công khai. Console sẽ cảnh báo và bắt bạn xác nhận. Đọc kỹ cảnh báo. Chỉ tắt ở cấp <b>bucket này</b>; nếu ở bước sau Console vẫn báo lỗi khi lưu policy công khai, có thể tài khoản đang bật Block Public Access ở <b>cấp tài khoản</b> (mục "Block Public Access settings for this account" trong menu S3). Khi đó tốt nhất là dừng lab ở bước 5 thay vì mở công khai cả tài khoản.</li>
<li>Vẫn ở tab Permissions, sửa <b>Bucket policy</b>, cho phép mọi người (<code>"Principal": "*"</code>) thực hiện <b>duy nhất</b> hành động <code>s3:GetObject</code> (đọc file) trên <code>arn:aws:s3:::TEN-BUCKET/*</code>. Thay TEN-BUCKET bằng tên bucket của bạn. Console có trình tạo policy (policy generator) và ví dụ để bạn tham khảo.</li>
<li>Mở lại website endpoint: trang "Xin chào từ BánhNgon" hiện lên. Để ý endpoint này chỉ là <b>HTTP</b>, không có HTTPS.</li>
</ol>

<h3>Vì sao mở bucket công khai là rủi ro?</h3>
<p>Rất nhiều vụ lộ dữ liệu trên thế giới bắt nguồn từ một bucket S3 vô tình để công khai, chứa file khách hàng, file sao lưu hoặc mật khẩu. Vì thế AWS bật Block Public Access mặc định và cảnh báo nhiều lớp khi bạn tắt.</p>
<p>Trong lab, rủi ro nhỏ vì bucket chỉ có một file HTML vô hại. Nhưng nguyên tắc chung: <b>không bao giờ</b> để chung dữ liệu riêng tư với nội dung công khai, và chỉ cho quyền đọc (GetObject), không cho quyền ghi hay xóa.</p>
<p>Ở môi trường thật, cách chuẩn là giữ bucket <b>riêng tư</b> và đặt <b>Amazon CloudFront</b> (mạng phân phối nội dung, CDN) phía trước. CloudFront được phép đọc bucket qua cơ chế <b>Origin Access Control</b> (OAC), còn người dùng chỉ truy cập qua CloudFront. Bạn được thêm HTTPS (dùng chứng chỉ từ AWS Certificate Manager), nội dung được cache ở <b>edge location</b> gần khách nên nhanh hơn, và có thể gắn thêm AWS WAF.</p>
<div class="flow"><span>Khách hàng</span><span>CloudFront (HTTPS, edge)</span><span>S3 bucket riêng tư</span></div>

<div class="box example"><b>🍰 Ví dụ: BánhNgon</b>
<p>Minh muốn đưa trang menu bánh Trung thu lên mạng thật nhanh. Cậu tạo một bucket, upload trang HTML và ảnh bánh, bật static website hosting. Chỉ mất mười phút, không cần máy chủ nào.</p>
<p>Khi khách ở Nhật cũng bắt đầu xem, Minh chuyển sang CloudFront: bucket khóa kín trở lại, trang chạy HTTPS, ảnh bánh tải nhanh hơn từ edge location gần Tokyo. Bucket chứa file sao lưu đơn hàng thì Minh tách riêng, không bao giờ mở công khai.</p>
</div>

<div class="box trap"><b>⚠️ Dọn dẹp cuối lab</b>
<ul>
<li>Mở bucket, chọn tất cả object và <b>xóa</b> (hoặc dùng chức năng <b>Empty</b> bucket). Bucket phải rỗng mới xóa được.</li>
<li>Nếu bạn có bật Versioning, nhớ xóa cả các phiên bản cũ (Empty bucket sẽ xử lý).</li>
<li><b>Xóa bucket</b> (Console bắt bạn gõ lại tên bucket để xác nhận).</li>
<li>Kiểm tra danh sách bucket (Console S3 liệt kê bucket của mọi Region trên cùng một trang): không còn bucket thử nghiệm nào. Mở lại website endpoint: giờ phải báo lỗi, không còn hiện trang.</li>
<li>Nếu đã tắt Block Public Access ở <b>cấp tài khoản</b> (không khuyến khích), hãy bật lại.</li>
<li>Nếu đã thử tạo CloudFront distribution, phải disable rồi delete nó riêng.</li>
</ul></div>

<div class="box exam"><b>🎯 Liên hệ đề thi</b>
<ul>
<li>"Host a static website without servers" → <b>Amazon S3 static website hosting</b>.</li>
<li>"Cache static content at edge locations, reduce latency globally" → <b>Amazon CloudFront</b> (dùng <b>edge locations</b>).</li>
<li>"Factors that affect S3 cost" → dung lượng lưu trữ, số request, <b>data transfer out</b> ra internet.</li>
<li>"Encrypt data in transit for a website" → HTTPS/TLS, chứng chỉ từ <b>AWS Certificate Manager</b>.</li>
<li>Bucket policy, Block Public Access thuộc phần trách nhiệm của <b>khách hàng</b> trong shared responsibility model.</li>
</ul></div>
`,
    summary: [
      "S3 static website hosting phục vụ file HTML/CSS/ảnh mà không cần máy chủ.",
      "Bucket mới mặc định bật Block Public Access; truy cập công khai sẽ bị lỗi 403 cho đến khi bạn mở.",
      "Mở công khai cần tắt Block Public Access và thêm bucket policy chỉ cho phép s3:GetObject.",
      "Bucket công khai là nguyên nhân phổ biến của lộ dữ liệu: không để dữ liệu riêng chung với nội dung công khai.",
      "Cách chuẩn cho môi trường thật: bucket riêng tư + CloudFront (OAC, HTTPS, cache ở edge).",
      "Dọn dẹp: Empty bucket rồi xóa bucket."
    ],
    terms: [
      ["Static website", "website tĩnh, chỉ gồm file có sẵn"],
      ["Bucket", "thùng chứa trong S3"],
      ["Object", "đối tượng, một file lưu trong S3"],
      ["Static website hosting", "lưu trữ và phục vụ website tĩnh"],
      ["Block Public Access", "chặn truy cập công khai"],
      ["Bucket policy", "chính sách quyền gắn vào bucket"],
      ["Website endpoint", "địa chỉ truy cập website của bucket"],
      ["403 Forbidden", "lỗi bị cấm truy cập"],
      ["CDN (Content Delivery Network)", "mạng phân phối nội dung"],
      ["Origin Access Control (OAC)", "cơ chế cho CloudFront đọc bucket riêng tư"],
      ["Edge location", "điểm biên, nơi CloudFront cache nội dung"],
      ["Data transfer out", "dữ liệu truyền ra ngoài AWS"]
    ],
    qids: ["d4-6", "d3-5", "d3-21", "d4-31", "d2-24", "d2-23", "d2-1"]
  },

  // ───────────────────────── 5-4 ─────────────────────────
  {
    id: "5-4",
    module: 5,
    title: "Lab 4: Chạy một máy chủ EC2 và dọn dẹp",
    mins: 35,
    goals: [
      "Khởi chạy một EC2 instance nhỏ, ưu tiên loại có nhãn dùng thử miễn phí nếu Console hiển thị",
      "Phân biệt key pair và EC2 Instance Connect, cấu hình security group chỉ mở đúng cổng cần",
      "Kết nối vào máy chủ và xem metric cơ bản trong CloudWatch",
      "Terminate instance và kiểm tra không còn EBS volume hay Elastic IP sót lại"
    ],
    html: `
<h3>EC2 là gì, nhắc lại thật ngắn</h3>
<p><b>Amazon EC2</b> (Elastic Compute Cloud) cho bạn thuê <b>máy chủ ảo</b>, gọi là <b>instance</b>. Bạn chọn hệ điều hành qua một <b>AMI</b> (Amazon Machine Image, ảnh mẫu của máy), chọn cấu hình qua <b>instance type</b> (loại máy, ví dụ bao nhiêu CPU và RAM), rồi bật lên trong vài phút. Ổ đĩa của máy là một <b>EBS volume</b> (ổ đĩa khối gắn qua mạng).</p>
<p>Đây là lab dễ phát sinh chi phí nhất nếu quên dọn, vì máy chủ chạy là tính tiền liên tục theo thời gian. Hãy đọc kỹ phần dọn dẹp trước khi bắt đầu.</p>

<div class="box idea"><b>🧠 Hiểu đơn giản</b>
<p>Thuê EC2 giống <b>thuê một căn phòng khách sạn</b>. Bạn ở bao lâu trả bấy lâu. <b>Stop</b> (dừng) giống tạm ra ngoài nhưng vẫn giữ phòng và đồ đạc: không trả tiền "giường" nữa nhưng vẫn trả tiền giữ đồ (ổ đĩa EBS). <b>Terminate</b> (chấm dứt) giống trả phòng hẳn: khách sạn dọn sạch, bạn không trả thêm gì. <b>Security group</b> là bác bảo vệ ở cửa phòng, chỉ cho vào những ai có tên trong danh sách.</p>
</div>

<h3>Chi phí và chuẩn bị</h3>
<p><b>Chi phí:</b> EC2 tính theo thời gian instance chạy (tùy instance type), cộng dung lượng EBS, và <b>địa chỉ IPv4 công cộng</b> (hiện AWS tính phí theo giờ cho public IPv4; Elastic IP không gắn vào máy đang chạy cũng bị tính). Một số instance type nhỏ được gắn nhãn kiểu "Free tier eligible" trong Console và có thể được ưu đãi miễn phí hoặc trừ vào credit tùy điều khoản tài khoản của bạn. Để giữ gần bằng 0: chọn instance nhỏ nhất có nhãn ưu đãi, dùng ổ đĩa mặc định, chạy trong thời gian ngắn và <b>terminate ngay khi xong</b>.</p>
<p><b>Chuẩn bị:</b></p>
<ul>
<li>Đã có budget cảnh báo từ Lab 1.</li>
<li>Đăng nhập bằng danh tính quản trị, chọn một Region gần bạn và <b>nhớ Region đó</b> (EC2 chỉ hiện tài nguyên của Region đang chọn).</li>
</ul>

<h3>Key pair hay EC2 Instance Connect?</h3>
<p>Để đăng nhập vào máy Linux, người ta thường dùng <b>SSH</b> (giao thức điều khiển máy từ xa, cổng 22).</p>
<ul>
<li><b>Key pair</b> (cặp khóa): AWS giữ khóa công khai, bạn tải về file khóa riêng (private key). Mất file là không vào được bằng cách này; lộ file là người khác vào được.</li>
<li><b>EC2 Instance Connect</b>: kết nối SSH ngay trên trình duyệt từ Console. AWS đẩy một khóa tạm thời có hiệu lực ngắn, nên bạn không phải giữ file khóa. Amazon Linux có sẵn thành phần cần thiết. Lưu ý: kết nối kiểu trình duyệt đi ra từ dải IP của dịch vụ Instance Connect trong Region, nên security group phải cho phép cổng 22 từ dải đó. AWS có sẵn một <b>managed prefix list</b> (danh sách dải IP do AWS quản lý) tên dạng <code>com.amazonaws.TEN-REGION.ec2-instance-connect</code>, ví dụ <code>com.amazonaws.ap-southeast-1.ec2-instance-connect</code> cho Singapore. Kiểu kết nối này cũng cần instance có <b>public IPv4</b> (có tính phí theo giờ, xem phần chi phí).</li>
</ul>
<p>Ngoài ra còn <b>AWS Systems Manager Session Manager</b>, kết nối mà không cần mở cổng SSH, nhưng cần cấu hình IAM role cho máy; bạn có thể tìm hiểu sau.</p>

<h3>Các bước thực hành</h3>
<p><b>Giao diện có thể khác đôi chút</b>; hãy tìm theo tên chức năng.</p>
<ol>
<li>Mở <b>EC2</b>, chọn <b>Launch instance</b>. Đặt tên, ví dụ <code>banhngon-lab</code>.</li>
<li>Chọn AMI <b>Amazon Linux</b> (bản mới nhất mà Console gợi ý).</li>
<li>Chọn instance type nhỏ có nhãn ưu đãi miễn phí nếu Console hiển thị. Nếu không thấy nhãn, chọn loại nhỏ nhất và ghi nhớ phải tắt sớm.</li>
<li>Ở phần key pair: chọn tạo key pair mới và tải file về (để giữ đường lui), hoặc chọn tiếp tục không có key pair nếu chỉ dùng Instance Connect.</li>
<li>Ở phần network settings, để mặc định VPC/subnet và <b>Auto-assign public IP</b> đang bật (cần cho bước kết nối). Tạo <b>security group</b> mới. Chỉ để <b>một rule inbound SSH cổng 22</b>. Wizard thường đề xuất sẵn nguồn <b>Anywhere</b> (<code>0.0.0.0/0</code>, mọi nơi trên internet): <b>đổi nó đi</b>. Vì bước 8 dùng EC2 Instance Connect trên trình duyệt, hãy chọn nguồn <b>Custom</b> rồi chọn prefix list <code>ec2-instance-connect</code> của Region. (Nếu bạn SSH từ máy mình bằng key pair thì chọn "My IP"; lưu ý "My IP" sẽ <b>không</b> cho kết nối Instance Connect trên trình duyệt.) <b>Không</b> mở các cổng khác. Nếu khó chọn prefix list trong wizard, có thể sửa rule trong security group sau khi Launch.</li>
<li>Giữ ổ đĩa mặc định, để ý tùy chọn <b>Delete on termination</b> của root volume đang bật. Bấm Launch.</li>
<li>Chờ trạng thái chuyển sang <b>Running</b> và các status check đạt.</li>
<li>Chọn instance, bấm <b>Connect</b>, chọn tab <b>EC2 Instance Connect</b>, kết nối. Một cửa sổ dòng lệnh hiện ra. Gõ thử <code>whoami</code> và <code>uptime</code>.</li>
<li>Thoát, quay lại instance, mở tab <b>Monitoring</b>: xem biểu đồ CPU, network. Đây là metric của <b>Amazon CloudWatch</b>. Mặc định là basic monitoring, dữ liệu theo chu kỳ 5 phút; RAM không có sẵn mà cần cài agent.</li>
</ol>

<div class="box example"><b>🍰 Ví dụ: BánhNgon</b>
<p>Minh thử dựng một máy chủ EC2 để chạy bản thử trang đặt bánh. Lần đầu, cậu mở security group cho "mọi nơi" ở mọi cổng cho nhanh. Vài giờ sau log đầy các lần dò mật khẩu từ khắp thế giới.</p>
<p>Minh sửa lại: chỉ mở cổng 22 cho dải IP cần thiết. Tối hôm đó, cậu quên terminate máy. Email cảnh báo từ AWS Budgets (Lab 1) nhắc cậu sáng hôm sau. Từ đó Minh luôn làm checklist dọn dẹp ngay khi thử xong.</p>
</div>

<div class="box trap"><b>⚠️ Dọn dẹp cuối lab (quan trọng nhất trong các lab)</b>
<ul>
<li>Chọn instance, chọn <b>Instance state → Terminate</b> (không phải Stop). Stop vẫn tính tiền ổ đĩa EBS (và Elastic IP nếu có).</li>
<li>Chờ trạng thái chuyển sang <b>Terminated</b> (instance có thể còn hiện trong danh sách một lúc rồi tự biến mất).</li>
<li>Mở <b>Elastic Block Store → Volumes</b>: không còn volume nào ở trạng thái "available" của lab. Nếu còn, xóa.</li>
<li>Mở <b>Snapshots</b>: xóa snapshot nếu bạn có tạo.</li>
<li>Mở <b>Elastic IPs</b>: nếu có cấp phát, <b>release</b> (trả lại). Elastic IP không dùng vẫn bị tính phí.</li>
<li>Xóa security group <code>launch-wizard</code> và key pair của lab nếu không dùng nữa (miễn phí nhưng nên gọn).</li>
<li>Kiểm tra lại đúng <b>Region</b> đã dùng; nếu không chắc, xem trang Bills hoặc dùng EC2 Global View để tìm.</li>
</ul></div>

<div class="box exam"><b>🎯 Liên hệ đề thi</b>
<ul>
<li>"Example of IaaS" → <b>Amazon EC2</b>: bạn quản lý hệ điều hành, bản vá, cấu hình.</li>
<li>"Security groups" → <b>stateful</b>, hoạt động ở cấp <b>instance</b>, chỉ có rule allow. Cấu hình chúng là trách nhiệm <b>khách hàng</b>.</li>
<li>"Block storage for EC2" → <b>Amazon EBS</b>; "temporary storage attached to the host" → <b>instance store</b>.</li>
<li>"Alarm when CPU stays high" → <b>Amazon CloudWatch</b>.</li>
<li>"Instances use under 10% CPU, change to smaller type" → <b>rightsizing</b>; gợi ý tối ưu chi phí → <b>Trusted Advisor</b>, <b>Compute Optimizer</b>.</li>
</ul></div>
`,
    summary: [
      "EC2 = máy chủ ảo: chọn AMI, instance type, ổ đĩa EBS, security group.",
      "Key pair là file khóa riêng bạn tự giữ; EC2 Instance Connect dùng khóa tạm qua trình duyệt.",
      "Security group là tường lửa stateful ở cấp instance: chỉ mở đúng cổng, đúng nguồn cần thiết.",
      "CloudWatch hiển thị metric CPU, network của instance; basic monitoring theo chu kỳ 5 phút.",
      "Terminate (không phải Stop) để ngừng tính phí; rồi kiểm tra EBS volume, snapshot, Elastic IP.",
      "Public IPv4 và Elastic IP không dùng đều có thể phát sinh phí."
    ],
    terms: [
      ["Instance", "một máy chủ ảo EC2"],
      ["AMI (Amazon Machine Image)", "ảnh mẫu hệ điều hành để tạo máy"],
      ["Instance type", "loại cấu hình máy (CPU, RAM)"],
      ["EBS volume", "ổ đĩa khối gắn vào EC2"],
      ["Key pair", "cặp khóa công khai/riêng để đăng nhập"],
      ["SSH (Secure Shell)", "giao thức điều khiển máy từ xa an toàn"],
      ["EC2 Instance Connect", "kết nối SSH bằng khóa tạm thời qua Console"],
      ["Security group", "tường lửa ảo cấp instance"],
      ["Inbound rule", "quy tắc cho lưu lượng đi vào"],
      ["Elastic IP", "địa chỉ IPv4 công cộng cố định"],
      ["Stop / Terminate", "dừng tạm / xóa hẳn instance"],
      ["Delete on termination", "tự xóa ổ đĩa khi instance bị terminate"],
      ["Metric", "chỉ số đo lường"]
    ],
    qids: ["d1-13", "d2-14", "d2-1", "d2-37", "d3-8", "d3-32", "d2-41", "d1-19", "d4-10"]
  },

  // ───────────────────────── 5-5 ─────────────────────────
  {
    id: "5-5",
    module: 5,
    title: "Lab 5: Hàm Lambda đầu tiên và xem log",
    mins: 25,
    goals: [
      "Tạo một hàm AWS Lambda 'hello world' bằng Python hoặc Node.js ngay trên Console",
      "Chạy thử hàm bằng test event và đọc log trong CloudWatch Logs",
      "Thấy CloudTrail Event history đã ghi lại các lệnh API bạn vừa thực hiện",
      "Xóa hàm và log group sau khi học"
    ],
    html: `
<h3>Serverless và Lambda, nói đơn giản</h3>
<p>Ở Lab 4, bạn phải chọn máy, mở cổng, nhớ tắt máy. Với <b>AWS Lambda</b>, bạn chỉ viết một đoạn code gọi là <b>function</b> (hàm). AWS lo hết phần máy chủ: chạy code khi có sự kiện, tự mở rộng khi nhiều yêu cầu, và bạn trả tiền theo <b>số lần gọi</b> và <b>thời gian chạy</b>. Không có ai gọi thì gần như không tốn gì. Đó là ý nghĩa của <b>serverless</b> (phi máy chủ: vẫn có máy chủ, nhưng bạn không phải quản lý).</p>
<p>Mỗi lần chạy, Lambda có giới hạn tối đa 15 phút. Việc chạy lâu hơn thế thì cần dịch vụ khác.</p>

<div class="box idea"><b>🧠 Hiểu đơn giản</b>
<p>EC2 giống <b>tự nuôi một đầu bếp toàn thời gian</b>: có khách hay không vẫn trả lương. Lambda giống <b>gọi đầu bếp theo đơn</b>: có đơn thì đầu bếp đến nấu, nấu xong về, bạn trả theo số món và thời gian nấu. CloudWatch Logs là <b>sổ nhật ký bếp</b>; CloudTrail là <b>camera ở cửa văn phòng</b> ghi lại ai đã ra lệnh thuê, sa thải đầu bếp.</p>
</div>

<h3>Chi phí và chuẩn bị</h3>
<p><b>Chi phí:</b> Lambda tính theo số request và thời gian chạy (theo dung lượng bộ nhớ cấu hình). Lambda có mức dùng miễn phí hằng tháng; vài lần chạy thử gần như không tốn gì. <b>CloudWatch Logs</b> tính phí theo lượng log ghi vào và lưu trữ, nhưng vài dòng log là rất nhỏ. <b>CloudTrail Event history</b> được bật sẵn và xem miễn phí. Để giữ gần bằng 0: chỉ chạy thử vài lần, không gắn trigger công khai, và xóa hàm cùng log group khi xong.</p>
<p><b>Chuẩn bị:</b> đã làm Lab 1, đăng nhập bằng danh tính quản trị, chọn một Region và nhớ Region đó.</p>

<h3>Các bước thực hành</h3>
<p><b>Giao diện có thể khác đôi chút</b>; hãy tìm theo tên chức năng.</p>
<h4>Phần A: Tạo và chạy thử hàm</h4>
<ol>
<li>Mở <b>Lambda</b>, bấm tạo function, chọn <b>Author from scratch</b> (viết từ đầu).</li>
<li>Đặt tên, ví dụ <code>banhngon-hello</code>. Chọn runtime <b>Python</b> (bản 3.x mới nhất) hoặc <b>Node.js</b>.</li>
<li>Ở phần quyền, để mặc định: Lambda sẽ tự tạo một <b>execution role</b> (IAM role cho hàm) có quyền cơ bản để ghi log vào CloudWatch. Tạo function.</li>
<li>Trong trình soạn code, sửa hàm mẫu để in ra một dòng log và trả về lời chào. Với Python, hàm có dạng <code>def lambda_handler(event, context):</code>, bên trong có <code>print("Xin chao tu BanhNgon")</code> và trả về một dict có <code>statusCode</code> là 200. Bấm <b>Deploy</b> để lưu.</li>
<li>Chọn <b>Test</b>, tạo một test event (có thể để JSON mẫu), đặt tên và chạy.</li>
<li>Xem kết quả: phần response là giá trị hàm trả về; phần log có dòng bạn in ra, cùng dòng REPORT ghi thời gian chạy và bộ nhớ đã dùng. Thời gian chạy này chính là cơ sở tính tiền.</li>
</ol>

<h4>Phần B: Xem log trong CloudWatch Logs</h4>
<ol>
<li>Trong trang hàm, mở tab <b>Monitor</b>, chọn xem log trong CloudWatch (hoặc mở thẳng dịch vụ <b>CloudWatch → Logs → Log groups</b>).</li>
<li>Tìm <b>log group</b> tên dạng <code>/aws/lambda/banhngon-hello</code>. Bên trong là các <b>log stream</b>, mỗi stream chứa log của các lần chạy.</li>
<li>Mở stream mới nhất, tìm dòng "Xin chao tu BanhNgon". Chạy test thêm một lần và làm mới để thấy log mới xuất hiện.</li>
</ol>

<h4>Phần C: Xem CloudTrail Event history</h4>
<ol>
<li>Mở <b>CloudTrail</b>, chọn <b>Event history</b>. Mục này lưu các sự kiện quản lý (management events) trong 90 ngày gần nhất mà không cần cấu hình gì.</li>
<li>Đảm bảo đang ở <b>đúng Region</b> đã tạo hàm. Ở ô lọc, chọn <b>Event source</b> và nhập <code>lambda.amazonaws.com</code> (hoặc chọn <b>Resource name</b> và nhập <code>banhngon-hello</code>). Ô lọc cần nhập <b>đúng toàn bộ giá trị</b>; tên sự kiện tạo hàm thực tế có kèm đuôi phiên bản, dạng <code>CreateFunction20150331</code>, nên lọc theo event source dễ hơn. Có thể mất vài phút sự kiện mới hiện.</li>
<li>Mở sự kiện: bạn thấy <b>ai</b> gọi (danh tính quản trị của bạn), <b>lúc nào</b>, <b>từ IP nào</b>, gọi API gì. Muốn thấy sự kiện tạo IAM role cho hàm (<code>CreateRole</code>), hãy chuyển Region sang <b>US East (N. Virginia)</b>: IAM là dịch vụ toàn cầu nên sự kiện của nó được ghi ở Region đó.</li>
<li>Để ý: các lần <b>chạy hàm</b> (Invoke) là <b>data event</b>, mặc định không nằm trong Event history. Event history chủ yếu ghi các thao tác quản lý như tạo, sửa, xóa tài nguyên.</li>
</ol>

<div class="box example"><b>🍰 Ví dụ: BánhNgon</b>
<p>Minh viết một hàm Lambda gửi lời cảm ơn mỗi khi có đơn bánh mới. Một hôm hàm báo lỗi; Minh mở CloudWatch Logs, đọc dòng lỗi và sửa được trong năm phút.</p>
<p>Tuần sau, hàm bỗng biến mất. Minh mở CloudTrail Event history, lọc sự kiện DeleteFunction và thấy chính tài khoản của cậu thực tập sinh đã xóa nhầm. Không ai phải đoán mò: CloudTrail trả lời câu hỏi "ai đã làm gì, lúc nào".</p>
</div>

<div class="box trap"><b>⚠️ Dọn dẹp cuối lab</b>
<ul>
<li>Trong Lambda, chọn hàm <code>banhngon-hello</code> và <b>xóa</b>.</li>
<li>Xóa hàm <b>không</b> tự xóa log. Vào <b>CloudWatch → Log groups</b>, xóa log group <code>/aws/lambda/banhngon-hello</code>.</li>
<li>Vào <b>IAM → Roles</b>, xóa execution role mà Lambda đã tự tạo cho hàm này (tên thường bắt đầu bằng tên hàm, dạng <code>banhngon-hello-role-...</code>). Nếu trong <b>IAM → Policies</b> (lọc "Customer managed") có policy tên dạng <code>AWSLambdaBasicExecutionRole-...</code> được tạo cùng lúc, xóa luôn; không xóa được (và không cần xóa) policy do AWS quản lý.</li>
<li>Nếu bạn đã thêm trigger (API Gateway, S3, EventBridge…), xóa luôn các tài nguyên đó.</li>
<li>Không cần xóa CloudTrail Event history: nó là mặc định, miễn phí và chính sự kiện xóa của bạn cũng sẽ được ghi lại.</li>
</ul></div>

<div class="box exam"><b>🎯 Liên hệ đề thi</b>
<ul>
<li>"Run code without provisioning servers, pay only for compute time" → <b>AWS Lambda</b>.</li>
<li>"Job runs about 3 hours continuously" → <b>không</b> dùng Lambda (tối đa 15 phút).</li>
<li>"Which services are serverless" → Lambda, DynamoDB, Fargate…</li>
<li>Với Lambda, khách hàng chịu trách nhiệm <b>code và quyền IAM</b> của hàm; AWS lo hạ tầng và hệ điều hành.</li>
<li>"Who did what, when (API calls), who deleted a resource" → <b>AWS CloudTrail</b>. "Metrics, logs, alarms" → <b>Amazon CloudWatch</b>.</li>
</ul></div>
`,
    summary: [
      "Lambda chạy code theo sự kiện, không quản lý máy chủ, tính tiền theo số request và thời gian chạy; tối đa 15 phút mỗi lần.",
      "Execution role là IAM role cho hàm; quyền mặc định đủ để ghi log vào CloudWatch Logs.",
      "Log của hàm nằm ở log group /aws/lambda/ + tên hàm, chia thành các log stream.",
      "CloudTrail Event history ghi các management event 90 ngày, bật sẵn: ai gọi API gì, lúc nào, từ đâu.",
      "CloudWatch = metric, log, alarm (hệ thống chạy ra sao); CloudTrail = lịch sử gọi API (ai làm gì).",
      "Dọn dẹp: xóa hàm, xóa log group (không tự mất), xóa execution role."
    ],
    terms: [
      ["Serverless", "phi máy chủ, không phải tự quản lý máy chủ"],
      ["Function", "hàm, đơn vị code chạy trên Lambda"],
      ["Runtime", "môi trường ngôn ngữ chạy code (Python, Node.js…)"],
      ["Handler", "hàm được Lambda gọi khi chạy"],
      ["Test event", "sự kiện mẫu để chạy thử hàm"],
      ["Execution role", "IAM role cấp quyền cho hàm Lambda"],
      ["Trigger", "nguồn sự kiện kích hoạt hàm"],
      ["Log group", "nhóm log trong CloudWatch Logs"],
      ["Log stream", "dòng log trong một log group"],
      ["Event history", "lịch sử sự kiện 90 ngày của CloudTrail"],
      ["Management event", "sự kiện quản lý (tạo, sửa, xóa tài nguyên)"],
      ["Data event", "sự kiện dữ liệu (ví dụ gọi hàm, đọc object)"]
    ],
    qids: ["d3-2", "d3-83", "d3-85", "d2-35", "d2-4", "d2-39", "d2-41", "d3-67"]
  }
);
