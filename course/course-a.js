(window.CLF.course = window.CLF.course || []).push(
  {
    id: "0-1",
    module: 0,
    title: "Máy chủ, data center và vì sao có cloud",
    mins: 12,
    goals: [
      "Hiểu server (máy chủ) là gì và khác laptop của bạn ở đâu",
      "Biết một website cần những gì để chạy được 24/7",
      "Hiểu data center là gì và cái giá của việc tự vận hành máy chủ",
      "Nắm ý tưởng cốt lõi của cloud: thuê sức mạnh máy tính qua internet"
    ],
    html: `
<h3>Server là gì? Nó khác laptop của bạn ra sao</h3>
<p><b>Server</b> (máy chủ) thật ra cũng là một cái máy tính. Nó có CPU (bộ xử lý), RAM (bộ nhớ tạm), ổ cứng và card mạng, giống hệt laptop. Điểm khác là <i>mục đích</i>: laptop phục vụ một người ngồi trước màn hình, còn server phục vụ rất nhiều người cùng lúc, qua mạng.</p>
<p>Vì phải phục vụ người khác suốt ngày đêm, server thường được thiết kế để chạy liên tục nhiều năm, không tắt. Nó thường không có màn hình, bàn phím. Người quản lý điều khiển nó từ xa.</p>
<p>Khi bạn mở Facebook, YouTube hay một trang bán hàng, điện thoại của bạn đang "hỏi" một server ở đâu đó. Server nhận câu hỏi, tìm dữ liệu, rồi gửi trang web về cho bạn.</p>
<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>Laptop giống bếp nhà bạn: nấu cho cả nhà ăn. Server giống bếp nhà hàng: nấu cho hàng trăm khách, mở cửa từ sáng đến tối, không được phép "nghỉ ốm". Cùng là bếp, nhưng yêu cầu khác hẳn nhau.</p></div>

<h3>Một website cần gì để chạy được?</h3>
<p>Để một website bán hàng hoạt động, cần ít nhất mấy thứ sau:</p>
<ul>
<li><b>Máy tính để chạy code</b>: chương trình xử lý đơn hàng, đăng nhập, tính tiền.</li>
<li><b>Chỗ lưu dữ liệu</b>: danh sách sản phẩm, đơn hàng, ảnh bánh.</li>
<li><b>Kết nối internet</b> ổn định, đủ nhanh để nhiều người truy cập cùng lúc.</li>
<li><b>Điện liên tục</b>: mất điện là website "chết".</li>
<li><b>Người trông coi</b>: cập nhật phần mềm, sửa lỗi, sao lưu dữ liệu, chống hacker.</li>
</ul>
<p>Với một website nhỏ, tất cả những thứ này có thể nằm trong một chiếc máy tính. Nhưng khi kinh doanh lớn lên, mọi thứ phức tạp hơn rất nhiều.</p>
<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>Hồi mới mở bán online, chị Lan nhờ Minh dựng website trên một máy tính cũ đặt trong kho tiệm, cạnh mấy bao bột mì. Ngày thường vài chục khách vào xem, máy chạy êm.</p><p>Rồi đến đợt sale Tết. Chị Lan đăng quảng cáo, hàng nghìn người vào cùng lúc. Máy tính quá tải, website treo cứng. Tệ hơn, chiều hôm đó khu phố mất điện hai tiếng. Khách không đặt được bánh, chuyển sang tiệm khác. Minh mất cả đêm để khởi động lại và kiểm tra xem có mất đơn hàng nào không.</p></div>

<h3>Data center: "khách sạn" cho server</h3>
<p>Các công ty lớn không đặt server trong kho. Họ đặt trong <b>data center</b> (trung tâm dữ liệu): một tòa nhà chuyên dụng chứa hàng trăm, hàng nghìn server xếp trên các giá kim loại gọi là <b>rack</b>.</p>
<p>Một data center tử tế phải có:</p>
<ul>
<li>Nguồn điện dự phòng: máy phát điện, hệ thống pin (UPS) để không bị mất điện.</li>
<li>Hệ thống làm mát: server chạy liên tục tỏa nhiệt rất nhiều, nóng quá là hỏng.</li>
<li>Bảo vệ vật lý: bảo vệ, camera, thẻ từ, chống cháy, chống ngập.</li>
<li>Đường truyền internet tốc độ cao, thường có nhiều nhà mạng để dự phòng.</li>
<li>Đội kỹ sư thay ổ cứng hỏng, lắp máy mới, theo dõi 24/7.</li>
</ul>
<p>Khi một công ty tự mua server và đặt trong data center của chính mình (hoặc trong văn phòng), người ta gọi là <b>on-premises</b> (tại chỗ, hay viết tắt "on-prem").</p>

<h3>Cái giá của việc tự vận hành</h3>
<p>Tự chạy server nghe thì "chủ động", nhưng có rất nhiều vấn đề:</p>
<ul>
<li><b>Tốn tiền trả trước</b>: phải mua máy trước khi biết kinh doanh có thành công không. Một server tốt có thể đắt bằng cả năm tiền thuê mặt bằng.</li>
<li><b>Phải đoán công suất</b>: mua ít thì sập khi đông khách, mua nhiều thì máy nằm không phần lớn thời gian.</li>
<li><b>Chậm</b>: đặt mua, chờ giao hàng, lắp đặt, cài đặt có thể mất vài tuần đến vài tháng.</li>
<li><b>Chi phí ẩn</b>: tiền điện, làm mát, thuê chỗ, lương người vận hành, thay máy sau vài năm.</li>
<li><b>Rủi ro</b>: cháy, ngập, mất điện, hỏng ổ cứng, tất cả là việc của bạn.</li>
</ul>
<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>Tự vận hành server giống như muốn đi lại thì phải tự mua xe, tự thuê bãi, tự bảo dưỡng, tự mua bảo hiểm. Dù tháng đó bạn đi rất ít, bạn vẫn trả đủ mọi khoản.</p></div>

<h3>Ý tưởng của cloud: thuê thay vì mua</h3>
<p>Có những công ty khổng lồ như Amazon đã xây sẵn hàng loạt data center khắp thế giới. Họ nghĩ: "Sao không cho người khác thuê lại?". Đó chính là <b>cloud computing</b> (điện toán đám mây).</p>
<p>Với cloud, bạn không mua máy. Bạn vào trang web của nhà cung cấp, bấm vài nút, và vài phút sau có ngay một "máy chủ" để dùng. Dùng bao nhiêu trả bấy nhiêu, theo giờ hoặc thậm chí theo giây. Không dùng nữa thì tắt đi, ngừng trả tiền.</p>
<p>Chữ "đám mây" chỉ là cách nói: máy chủ vẫn là máy thật, nằm trong data center thật. Chỉ là bạn không nhìn thấy, không phải chăm sóc nó, và truy cập nó qua internet.</p>
<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>Cloud giống như đi taxi công nghệ thay vì mua xe. Cần thì gọi, đi xong trả tiền theo quãng đường. Bảo dưỡng xe, đổ xăng, gửi xe là việc của hãng.</p></div>
<p><b>AWS</b> (Amazon Web Services) là nhà cung cấp cloud của Amazon, và cũng là chủ đề của kỳ thi bạn đang ôn.</p>
<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>Sau đợt Tết thảm họa, Minh đề xuất chuyển website lên AWS. Ngày thường chỉ chạy một máy nhỏ, rẻ. Mùa Tết thì bật thêm máy cho đủ khách, hết Tết tắt bớt. Không còn lo mất điện ở kho, vì data center của AWS có điện dự phòng và đội ngũ trông coi riêng. Chị Lan chỉ trả tiền theo mức thực sự dùng.</p></div>
<div class="box exam"><b>🎯 Đề thi hay hỏi</b><ul>
<li>"stop buying servers upfront", "pay only for what you use" → lợi ích <b>Trade fixed expense for variable expense</b> (chuyển chi phí cố định thành biến đổi).</li>
<li>"buys too many servers for peaks, resources idle" → <b>Stop guessing capacity</b>.</li>
<li>"costs eliminated by moving from on-premises" → mua/thay phần cứng, điện, làm mát data center.</li>
<li>Đề thi luôn so sánh <b>on-premises</b> với <b>AWS Cloud</b>: hãy nhớ những "nỗi đau" ở trên, đáp án thường là cloud giải quyết chúng.</li>
</ul></div>
<div class="box trap"><b>⚠️ Bẫy hay gặp</b><p>Lên cloud không có nghĩa là "không còn trách nhiệm gì". AWS lo phần data center, điện, phần cứng; nhưng dữ liệu của bạn, tài khoản người dùng, cấu hình bảo mật vẫn là việc của bạn. Bạn sẽ học kỹ ở phần Shared Responsibility Model.</p></div>
`,
    summary: [
      "Server là máy tính chuyên phục vụ nhiều người qua mạng, chạy liên tục 24/7.",
      "Website cần máy chạy code, chỗ lưu dữ liệu, internet, điện và người vận hành.",
      "Data center là tòa nhà chuyên chứa server, có điện dự phòng, làm mát, bảo vệ.",
      "Tự vận hành (on-premises) tốn tiền trả trước, phải đoán công suất, chậm và nhiều chi phí ẩn.",
      "Cloud = thuê sức mạnh máy tính qua internet, dùng bao nhiêu trả bấy nhiêu, có ngay trong vài phút."
    ],
    terms: [
      ["Server", "máy chủ"],
      ["Data center", "trung tâm dữ liệu"],
      ["Rack", "giá đặt server"],
      ["On-premises (on-prem)", "hạ tầng tự đặt tại chỗ"],
      ["Cloud computing", "điện toán đám mây"],
      ["CPU", "bộ xử lý"],
      ["RAM / memory", "bộ nhớ tạm"],
      ["Capacity", "công suất"],
      ["Upfront cost", "chi phí trả trước"],
      ["Pay-as-you-go", "dùng bao nhiêu trả bấy nhiêu"]
    ],
    qids: ["d1-1", "d1-11", "d1-20"]
  },

  {
    id: "0-2",
    module: 0,
    title: "Internet hoạt động thế nào: IP, DNS, mạng và độ trễ",
    mins: 13,
    goals: [
      "Hiểu mô hình client/server khi bạn mở một trang web",
      "Biết IP address, domain name và DNS là gì",
      "Phân biệt bandwidth (băng thông) và latency (độ trễ), hiểu vì sao khoảng cách quan trọng",
      "Hiểu mạng public/private và firewall ở mức khái niệm"
    ],
    html: `
<h3>Client và server: ai hỏi, ai trả lời</h3>
<p>Mọi thứ trên internet gần như đều theo một kiểu: một bên <b>hỏi</b>, một bên <b>trả lời</b>. Bên hỏi gọi là <b>client</b> (máy khách), thường là trình duyệt hay app trên điện thoại. Bên trả lời là <b>server</b> (máy chủ).</p>
<p>Khi bạn gõ địa chỉ một trang web, trình duyệt gửi một <b>request</b> (yêu cầu) đến server. Server xử lý và gửi lại một <b>response</b> (phản hồi): trang web, hình ảnh, dữ liệu.</p>
<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>Client là khách gọi món, server là nhà bếp. Khách không cần biết bếp nấu thế nào, chỉ cần gọi đúng món và nhận đồ ăn.</p></div>

<h3>IP address, domain name và DNS</h3>
<p>Mỗi máy tính trên internet có một địa chỉ số gọi là <b>IP address</b> (địa chỉ IP), ví dụ <code>203.0.113.25</code>. Muốn gửi request đến server nào, client phải biết IP của server đó, giống như gửi thư phải biết số nhà.</p>
<p>Nhưng con người không nhớ nổi dãy số. Vì vậy ta dùng <b>domain name</b> (tên miền) dễ nhớ, như <code>banhngon.vn</code>. Hệ thống dịch tên miền sang địa chỉ IP gọi là <b>DNS</b> (Domain Name System, hệ thống phân giải tên miền).</p>
<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>DNS là danh bạ điện thoại của internet. Bạn nhớ tên "Chị Lan", danh bạ tra ra số điện thoại. Bạn gõ "banhngon.vn", DNS tra ra địa chỉ IP của server.</p></div>
<div class="flow"><span>Gõ banhngon.vn</span><span>DNS tra ra IP</span><span>Gửi request tới IP</span><span>Server trả trang web</span></div>
<p>Trên AWS, dịch vụ DNS tên là <b>Amazon Route 53</b>. Bạn sẽ gặp nó nhiều lần ở các bài sau.</p>

<h3>Port: cửa nào cho việc gì</h3>
<p>Một server có thể chạy nhiều dịch vụ cùng lúc. Để phân biệt, mỗi dịch vụ "nghe" ở một <b>port</b> (cổng) riêng, là một con số. Vài port quen thuộc:</p>
<ul>
<li><b>80</b>: HTTP, web không mã hóa.</li>
<li><b>443</b>: HTTPS, web có mã hóa (có ổ khóa trên trình duyệt).</li>
<li><b>22</b>: SSH, dùng để quản trị server Linux từ xa.</li>
</ul>
<p>Nếu IP là địa chỉ tòa nhà thì port là số phòng. Bạn chưa cần nhớ hết, chỉ cần hiểu ý tưởng này để sau học về firewall.</p>

<h3>Bandwidth và latency: rộng đường và xa đường</h3>
<p>Hai khái niệm này rất hay bị nhầm:</p>
<ul>
<li><b>Bandwidth</b> (băng thông): lượng dữ liệu có thể truyền trong một giây. Giống như <i>độ rộng</i> của con đường: đường càng nhiều làn, càng nhiều xe đi cùng lúc.</li>
<li><b>Latency</b> (độ trễ): thời gian để một gói dữ liệu đi từ client đến server và quay lại. Giống như <i>độ dài</i> quãng đường: dù đường rộng, đi xa vẫn mất thời gian.</li>
</ul>
<p>Latency phụ thuộc nhiều vào <b>khoảng cách</b>. Tín hiệu đi trong cáp quang nhanh nhưng không tức thời. Server đặt ở Mỹ thì người dùng ở Hà Nội sẽ thấy chậm hơn so với server đặt ở Singapore hay ngay tại Việt Nam.</p>
<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>Khi BánhNgon mở chi nhánh ở Nhật Bản, khách Tokyo than website tải chậm. Minh kiểm tra: server đang ở Singapore, khá xa Tokyo. Băng thông không thiếu, vấn đề là latency. Giải pháp là đặt thêm tài nguyên ở gần Nhật, hoặc dùng dịch vụ lưu sẵn bản sao ảnh bánh ở gần người dùng (sau này bạn sẽ học là Amazon CloudFront).</p></div>
<table>
<tr><th>Khái niệm</th><th>Ý nghĩa</th><th>Ẩn dụ</th></tr>
<tr><td>Bandwidth</td><td>Truyền được bao nhiêu dữ liệu mỗi giây</td><td>Đường có mấy làn xe</td></tr>
<tr><td>Latency</td><td>Mất bao lâu để dữ liệu đi và về</td><td>Quãng đường dài bao xa</td></tr>
<tr><td>Throughput</td><td>Lượng dữ liệu thực tế truyền được</td><td>Số xe thực sự đi qua</td></tr>
</table>

<h3>Mạng public, mạng private và firewall</h3>
<p><b>Public network</b> (mạng công cộng) là internet: ai cũng truy cập được. <b>Private network</b> (mạng riêng) là mạng nội bộ, chỉ những máy bên trong mới nói chuyện được với nhau, như mạng wifi trong văn phòng.</p>
<p>Nguyên tắc an toàn: chỉ để ra internet những gì <i>cần</i> cho khách thấy (trang web), còn những thứ nhạy cảm (cơ sở dữ liệu chứa đơn hàng) giấu trong mạng riêng.</p>
<p><b>Firewall</b> (tường lửa) là "người gác cổng" kiểm tra lưu lượng ra vào theo luật: cho phép IP nào, port nào; chặn cái gì. Ví dụ: "Cho phép mọi người vào port 443, nhưng port 22 chỉ cho máy của Minh".</p>
<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>Tiệm bánh có quầy bán hàng mở cho mọi người (public) và kho phía sau chỉ nhân viên được vào (private). Firewall là bác bảo vệ đứng ở cửa, cầm danh sách ai được vào cửa nào.</p></div>
<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>Minh thiết kế lại hệ thống: máy chủ web đặt ở phần mạng có thể nhận khách từ internet, chỉ mở port 443. Database chứa thông tin đơn hàng đặt ở phần mạng riêng, không có đường đi trực tiếp từ internet; chỉ máy chủ web được phép kết nối tới. Kẻ xấu muốn đọc database phải vượt qua nhiều lớp "cửa" trước.</p></div>
<p>Trên AWS, mạng riêng của bạn gọi là <b>Amazon VPC</b> (Virtual Private Cloud), và firewall có hai dạng: <b>security group</b> và <b>network ACL</b>. Bạn sẽ học kỹ ở Domain 2 và 3.</p>
<div class="box exam"><b>🎯 Đề thi hay hỏi</b><ul>
<li>"Domain Name System (DNS) web service" → <b>Amazon Route 53</b>.</li>
<li>"reduce latency for users around the world", "cache content at edge locations" → <b>Amazon CloudFront</b>.</li>
<li>"choose a Region close to users" → để giảm <b>latency</b>.</li>
<li>"stateless firewall at the subnet level" → <b>Network ACL</b>; firewall ở mức máy chủ → <b>Security group</b>.</li>
<li>"private connection that does not go over the public internet" → <b>AWS Direct Connect</b>.</li>
</ul></div>
<div class="box trap"><b>⚠️ Bẫy hay gặp</b><p>Đề hỏi về "giảm độ trễ" (latency) thì đáp án thường liên quan đến <i>đặt gần người dùng</i> (chọn Region gần, edge location, CloudFront), chứ không phải "mua thêm băng thông" hay "dùng server mạnh hơn".</p></div>
`,
    summary: [
      "Client gửi request, server trả response: đó là cách mọi trang web hoạt động.",
      "IP address là địa chỉ số của máy; domain name là tên dễ nhớ; DNS dịch tên sang IP (Route 53 trên AWS).",
      "Port phân biệt các dịch vụ trên cùng server: 80 (HTTP), 443 (HTTPS), 22 (SSH).",
      "Bandwidth là độ rộng đường, latency là thời gian đi về; khoảng cách làm tăng latency.",
      "Mạng private giấu tài nguyên nhạy cảm; firewall cho phép hoặc chặn lưu lượng theo luật."
    ],
    terms: [
      ["Client", "máy khách"],
      ["Request / Response", "yêu cầu / phản hồi"],
      ["IP address", "địa chỉ IP"],
      ["Domain name", "tên miền"],
      ["DNS (Domain Name System)", "hệ thống phân giải tên miền"],
      ["Port", "cổng"],
      ["Bandwidth", "băng thông"],
      ["Latency", "độ trễ"],
      ["Public network", "mạng công cộng"],
      ["Private network", "mạng riêng"],
      ["Firewall", "tường lửa"],
      ["Edge location", "điểm biên gần người dùng"]
    ],
    qids: ["d3-11", "d3-5", "d2-15", "d3-7", "d3-10"]
  },

  {
    id: "0-3",
    module: 0,
    title: "Ứng dụng web gồm những gì: code, database, file",
    mins: 13,
    goals: [
      "Phân biệt frontend và backend của một ứng dụng",
      "Hiểu database là gì, khác nhau giữa relational và NoSQL",
      "Biết vì sao cần lưu file riêng, sao lưu (backup) và theo dõi (monitoring)",
      "Hiểu scaling và API ở mức khái niệm"
    ],
    html: `
<h3>Frontend và backend</h3>
<p>Một ứng dụng web thường có hai phần:</p>
<ul>
<li><b>Frontend</b> (phần giao diện): những gì người dùng nhìn thấy và bấm vào: nút "Đặt bánh", ảnh sản phẩm, giỏ hàng. Nó chạy trên trình duyệt hoặc app điện thoại.</li>
<li><b>Backend</b> (phần xử lý phía sau): chạy trên server. Nó kiểm tra đăng nhập, tính tiền, lưu đơn hàng, gửi email xác nhận.</li>
</ul>
<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>Frontend là quầy bán hàng và tủ kính trưng bánh. Backend là bếp và sổ sách phía sau. Khách chỉ thấy quầy, nhưng không có bếp thì chẳng có gì để bán.</p></div>

<h3>Database: nơi ghi nhớ mọi thứ</h3>
<p><b>Database</b> (cơ sở dữ liệu) là nơi lưu dữ liệu có cấu trúc, để tìm kiếm và cập nhật nhanh: khách hàng, sản phẩm, đơn hàng. Có hai kiểu chính:</p>
<p><b>Relational database</b> (cơ sở dữ liệu quan hệ) lưu dữ liệu thành các <b>bảng</b> giống Excel, có cột cố định. Các bảng liên kết với nhau, ví dụ bảng "Đơn hàng" trỏ tới bảng "Khách hàng". Người ta dùng ngôn ngữ <b>SQL</b> để truy vấn. Ví dụ: MySQL, PostgreSQL.</p>
<p><b>NoSQL database</b> lưu dữ liệu linh hoạt hơn, không cần bảng cố định, thường theo kiểu "khóa → giá trị" hoặc tài liệu. Nó rất nhanh và dễ mở rộng cho lượng truy cập cực lớn, nhưng không mạnh về các truy vấn nối nhiều bảng.</p>
<table>
<tr><th></th><th>Relational (SQL)</th><th>NoSQL</th></tr>
<tr><td>Cách lưu</td><td>Bảng, cột cố định</td><td>Linh hoạt: key-value, document…</td></tr>
<tr><td>Mạnh ở</td><td>Liên kết dữ liệu, giao dịch chặt chẽ (đơn hàng, kế toán)</td><td>Tốc độ cao, quy mô cực lớn, cấu trúc hay thay đổi</td></tr>
<tr><td>Trên AWS</td><td>Amazon RDS, Amazon Aurora</td><td>Amazon DynamoDB</td></tr>
</table>
<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>Đơn hàng của BánhNgon cần chính xác tuyệt đối: ai đặt, bánh gì, bao nhiêu tiền, đã thanh toán chưa. Minh lưu những thứ này trong relational database. Còn giỏ hàng tạm thời của hàng nghìn khách đang lướt web mùa Tết thì cần đọc ghi rất nhanh, Minh cân nhắc dùng NoSQL.</p></div>

<h3>File, ảnh và backup</h3>
<p>Ảnh bánh, video quảng cáo, hóa đơn PDF là <b>file</b>. Lưu file trực tiếp trong database thường không hiệu quả. Người ta để file ở một kho lưu trữ riêng, database chỉ ghi lại "ảnh này nằm ở đâu". Trên AWS, kho lưu file phổ biến nhất là <b>Amazon S3</b>.</p>
<p><b>Backup</b> (sao lưu) là tạo bản sao dữ liệu để khôi phục khi có sự cố: ổ cứng hỏng, lỡ tay xóa, bị mã độc tống tiền. Backup tốt phải được làm <i>tự động</i>, <i>định kỳ</i>, và lưu ở <i>nơi khác</i> với dữ liệu gốc.</p>
<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>Backup giống như chụp ảnh sổ ghi nợ mỗi tối và gửi cho người nhà giữ. Lỡ sổ bị ướt, bạn vẫn còn bản sao.</p></div>

<h3>Scaling: lớn lên khi đông khách</h3>
<p><b>Scaling</b> (mở rộng quy mô) là tăng sức chứa của hệ thống khi có nhiều người dùng hơn. Có hai cách:</p>
<ul>
<li><b>Scale up / vertical scaling</b> (mở rộng theo chiều dọc): thay máy mạnh hơn: nhiều CPU, nhiều RAM hơn. Đơn giản nhưng có giới hạn, và thường phải tắt máy để nâng cấp.</li>
<li><b>Scale out / horizontal scaling</b> (mở rộng theo chiều ngang): thêm nhiều máy chạy song song, chia nhau phục vụ khách. Đây là cách cloud làm rất giỏi.</li>
</ul>
<p>Ngược lại, khi vắng khách thì <b>scale in</b> (bớt máy) hoặc <b>scale down</b> (dùng máy nhỏ hơn) để tiết kiệm.</p>
<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>Tết đông khách gấp 10 lần ngày thường. Thay vì mua một "siêu máy" đắt đỏ (scale up), Minh chạy 1 máy ngày thường và tự động thêm lên 5 máy vào mùa Tết (scale out), có một bộ chia tải đứng trước để phân khách đều cho các máy.</p></div>

<h3>API: cửa giao tiếp giữa các phần mềm</h3>
<p><b>API</b> (Application Programming Interface, giao diện lập trình ứng dụng) là cách để một phần mềm "nói chuyện" với phần mềm khác theo quy ước rõ ràng. Ví dụ app đặt bánh gọi API "tạo đơn hàng" của backend, hoặc backend gọi API của cổng thanh toán.</p>
<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>API giống thực đơn nhà hàng: liệt kê những món bạn được gọi và cách gọi. Bạn không vào bếp, chỉ gọi theo thực đơn và nhận kết quả.</p></div>
<p>Điều quan trọng cho kỳ thi: <b>mọi thao tác trên AWS đều là một lời gọi API</b>, dù bạn bấm trên web hay dùng dòng lệnh. Vì vậy AWS có dịch vụ ghi lại mọi lời gọi API (AWS CloudTrail) để biết ai đã làm gì.</p>

<h3>Logs và monitoring: biết hệ thống đang khỏe hay ốm</h3>
<p><b>Log</b> (nhật ký) là các dòng ghi lại sự kiện: "10:05 khách A đăng nhập", "10:06 lỗi kết nối database". <b>Monitoring</b> (giám sát) là theo dõi các con số như CPU, bộ nhớ, số request, và <b>alarm</b> (cảnh báo) khi có gì bất thường.</p>
<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>Minh đặt cảnh báo: nếu CPU máy chủ vượt 80% liên tục 5 phút, hoặc có quá nhiều lỗi khi lưu đơn hàng, điện thoại anh sẽ nhận tin nhắn. Khi có sự cố, anh mở log để xem lỗi bắt đầu từ lúc nào và do đâu.</p></div>
<p>Không có monitoring, bạn chỉ biết hệ thống hỏng khi khách gọi điện phàn nàn. Có monitoring, bạn biết trước và xử lý sớm. Trên AWS, dịch vụ giám sát chính là <b>Amazon CloudWatch</b>.</p>
<div class="box exam"><b>🎯 Đề thi hay hỏi</b><ul>
<li>"relational database", "MySQL / PostgreSQL" → <b>Amazon RDS</b> hoặc <b>Amazon Aurora</b>.</li>
<li>"NoSQL", "key-value", "single-digit millisecond" → <b>Amazon DynamoDB</b>.</li>
<li>"store images/files/objects" → <b>Amazon S3</b>.</li>
<li>"centrally manage backups" → <b>AWS Backup</b>.</li>
<li>"records API calls", "who did what and when" → <b>AWS CloudTrail</b>; "metrics, alarms, logs" → <b>Amazon CloudWatch</b>.</li>
<li>"create, publish, secure APIs" → <b>Amazon API Gateway</b>.</li>
</ul></div>
<div class="box trap"><b>⚠️ Bẫy hay gặp</b><p>CloudTrail và CloudWatch tên gần giống nhau. Mẹo: Trail = "dấu vết" (ai làm gì, audit); Watch = "theo dõi" (hiệu năng, CPU, cảnh báo).</p></div>
`,
    summary: [
      "Frontend là giao diện người dùng thấy; backend là phần xử lý chạy trên server.",
      "Relational database lưu theo bảng, dùng SQL (RDS, Aurora); NoSQL linh hoạt, cực nhanh ở quy mô lớn (DynamoDB).",
      "File và ảnh nên để ở kho lưu trữ riêng (S3); backup phải tự động, định kỳ, để nơi khác.",
      "Scale up = máy mạnh hơn; scale out = thêm nhiều máy. Cloud mạnh ở scale out/in.",
      "API là cách phần mềm gọi nhau; mọi thao tác trên AWS là một lời gọi API.",
      "Logs và monitoring giúp phát hiện sự cố sớm (CloudWatch); CloudTrail ghi lại ai làm gì."
    ],
    terms: [
      ["Frontend", "phần giao diện"],
      ["Backend", "phần xử lý phía server"],
      ["Database", "cơ sở dữ liệu"],
      ["Relational database", "cơ sở dữ liệu quan hệ"],
      ["NoSQL", "cơ sở dữ liệu phi quan hệ"],
      ["Backup", "sao lưu"],
      ["Vertical scaling (scale up)", "mở rộng theo chiều dọc"],
      ["Horizontal scaling (scale out)", "mở rộng theo chiều ngang"],
      ["API", "giao diện lập trình ứng dụng"],
      ["Log", "nhật ký"],
      ["Monitoring", "giám sát"],
      ["Alarm", "cảnh báo"]
    ],
    qids: ["d3-4", "d3-13", "d3-35", "d3-67", "d2-4"]
  },

  {
    id: "0-4",
    module: 0,
    title: "Làm quen AWS & cách đọc đề thi",
    mins: 12,
    goals: [
      "Biết AWS account, AWS Management Console và Region selector là gì",
      "Hiểu cách tránh hóa đơn bất ngờ khi tự thực hành",
      "Nắm rõ cấu trúc và cách chấm điểm của kỳ thi CLF-C02",
      "Có chiến lược đọc câu hỏi tiếng Anh và loại trừ đáp án sai"
    ],
    html: `
<h3>AWS account và Console</h3>
<p>Để dùng AWS, bạn cần một <b>AWS account</b> (tài khoản AWS). Tài khoản này vừa là "chỗ chứa" mọi tài nguyên bạn tạo, vừa là đơn vị tính tiền: mọi chi phí phát sinh trong tài khoản sẽ được tính vào hóa đơn của nó.</p>
<p>Người tạo tài khoản bằng email và mật khẩu ban đầu gọi là <b>root user</b> (người dùng gốc), có toàn quyền. Vì quyền lớn như vậy, nguyên tắc là bật xác thực nhiều lớp (MFA) cho root user và không dùng nó cho công việc hằng ngày. Bạn sẽ học kỹ ở Domain 2.</p>
<p>Cách dễ nhất để làm việc với AWS là <b>AWS Management Console</b> (bảng điều khiển web): đăng nhập trên trình duyệt, tìm dịch vụ, bấm nút để tạo tài nguyên. Ngoài ra còn có dòng lệnh (AWS CLI) và bộ thư viện cho lập trình viên (SDK), tất cả đều gọi API phía sau.</p>

<h3>Region selector và dịch vụ như những viên Lego</h3>
<p>AWS có data center ở nhiều nơi trên thế giới, chia thành các <b>Region</b> (vùng địa lý), ví dụ Singapore, Tokyo, Frankfurt. Ở góc trên bên phải Console có ô chọn Region. Hầu hết tài nguyên bạn tạo sẽ nằm trong Region đang được chọn.</p>
<div class="box trap"><b>⚠️ Bẫy hay gặp</b><p>Người mới hay "mất" tài nguyên: tạo máy ở Tokyo, hôm sau mở Console đang chọn Singapore nên không thấy, tưởng đã bị xóa, nhưng máy vẫn chạy và vẫn tính tiền. Luôn nhìn Region đang chọn trước khi tìm hay tạo tài nguyên.</p></div>
<p>Khi chọn Region cho một hệ thống thật, có 4 yếu tố hay được nhắc đến:</p>
<ul>
<li><b>Compliance / data sovereignty</b> (tuân thủ, chủ quyền dữ liệu): luật có bắt dữ liệu phải nằm trong một quốc gia/khu vực không? Yếu tố này thường được xét đầu tiên.</li>
<li><b>Proximity</b> (gần người dùng): càng gần khách hàng, latency càng thấp.</li>
<li><b>Service availability</b>: không phải Region nào cũng có đủ mọi dịch vụ, nhất là dịch vụ mới.</li>
<li><b>Pricing</b>: giá cùng một dịch vụ có thể khác nhau giữa các Region.</li>
</ul>
<p>AWS có hơn 200 dịch vụ. Đừng hoảng: hãy coi mỗi dịch vụ là một viên <b>Lego</b> làm đúng một việc. Một dịch vụ để chạy máy ảo, một dịch vụ để lưu file, một dịch vụ cho database, một dịch vụ cho DNS… Bạn ghép các viên lại thành ứng dụng. Kỳ thi chủ yếu hỏi: "Việc này thì dùng viên Lego nào?".</p>
<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>Đi siêu thị, bạn không cần biết mọi sản phẩm. Bạn chỉ cần biết quầy rau ở đâu, quầy thịt ở đâu. Học AWS cho kỳ thi này cũng vậy: biết dịch vụ nào giải quyết nhu cầu nào là đủ.</p></div>

<h3>Thực hành an toàn: Free Tier và cảnh báo chi phí</h3>
<p>AWS có chương trình <b>Free Tier</b> (dùng thử miễn phí) cho tài khoản mới, nhưng có giới hạn và điều kiện, và các điều kiện này đã thay đổi theo thời gian. Hãy đọc trang Free Tier chính thức trước khi thực hành, đừng giả định "cái gì cũng miễn phí".</p>
<p>Vài nguyên tắc để không nhận hóa đơn bất ngờ:</p>
<ul>
<li>Đặt <b>cảnh báo chi phí</b> ngay khi tạo tài khoản, ví dụ báo email khi chi phí vượt một mức nhỏ. AWS có dịch vụ <b>AWS Budgets</b> cho việc này.</li>
<li>Thực hành xong thì <b>xóa tài nguyên</b> (máy ảo, database, ổ đĩa). Chỉ "tắt" đôi khi vẫn tốn tiền lưu trữ.</li>
<li>Kiểm tra trang Billing định kỳ và nhớ kiểm tra <i>tất cả Region</i>.</li>
</ul>
<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>Lần đầu thử AWS, Minh tạo một database để học rồi quên. Cuối tháng hóa đơn nhỏ nhưng không mong muốn. Từ đó Minh đặt ngay một budget báo email khi chi phí vượt mức anh đặt ra, và có thói quen dọn dẹp sau mỗi buổi thực hành.</p></div>

<h3>Cấu trúc kỳ thi CLF-C02</h3>
<table>
<tr><th>Mục</th><th>Chi tiết</th></tr>
<tr><td>Số câu</td><td>65 câu: 50 câu tính điểm + 15 câu không tính điểm (AWS dùng để thử câu mới, bạn không biết câu nào)</td></tr>
<tr><td>Multiple choice</td><td>Chọn 1 đáp án đúng trong 4</td></tr>
<tr><td>Multiple response</td><td>Chọn 2 đáp án đúng trở lên trong 5 lựa chọn trở lên (đề ghi "Choose TWO" hoặc "Choose THREE")</td></tr>
<tr><td>Thời gian</td><td>90 phút</td></tr>
<tr><td>Điểm</td><td>Thang điểm quy đổi 100–1000, đạt từ 700</td></tr>
<tr><td>Trừ điểm khi sai?</td><td>Không. Bỏ trống cũng tính là sai, nên <b>không bao giờ bỏ trống</b></td></tr>
</table>
<p>Bốn domain và tỷ trọng: Cloud Concepts 24%, Security and Compliance 30%, Cloud Technology and Services 34%, Billing, Pricing, and Support 12%.</p>
<p>Nếu tiếng Anh không phải ngôn ngữ mẹ đẻ, bạn có thể xin <b>ESL +30</b>: thêm 30 phút làm bài. Phải gửi yêu cầu trong tài khoản thi của AWS Certification <i>trước khi</i> đặt lịch thi; yêu cầu được áp dụng cho các lần đặt lịch sau đó.</p>

<h3>Chiến lược đọc câu hỏi tiếng Anh</h3>
<p>Câu hỏi CLF-C02 thường là một tình huống ngắn rồi hỏi "Which AWS service…?". Hãy làm theo 4 bước:</p>
<ol>
<li><b>Đọc câu hỏi cuối trước</b>: họ hỏi dịch vụ, lợi ích, hay trách nhiệm của ai?</li>
<li><b>Gạch chân từ khóa</b> quyết định, đặc biệt các từ so sánh: <b>MOST cost-effective</b> (rẻ nhất mà vẫn đáp ứng), <b>LEAST operational overhead</b> (ít công vận hành nhất, thường là dịch vụ managed/serverless), <b>MOST secure</b>, <b>fastest</b>, <b>minimal changes</b>.</li>
<li><b>Loại trừ</b> đáp án sai rõ ràng: dịch vụ không liên quan, hoặc làm được nhưng vi phạm từ khóa (ví dụ tự cài trên máy ảo khi đề hỏi "least operational overhead").</li>
<li><b>Chọn</b> trong các đáp án còn lại. Không chắc thì đánh dấu (flag) để xem lại, nhưng vẫn chọn tạm một đáp án.</li>
</ol>
<p>Về thời gian: 65 câu trong 90 phút nghĩa là khoảng 1 phút 20 giây mỗi câu. Đừng sa lầy ở một câu khó; chọn tạm, đánh dấu, đi tiếp, cuối giờ quay lại. Ở website này, mỗi câu hỏi đều có bản tiếng Anh và tiếng Việt: hãy tập đọc bản tiếng Anh trước, chỉ xem bản tiếng Việt khi thật sự bí, vì ngày thi bạn chỉ có tiếng Anh.</p>
<div class="box exam"><b>🎯 Đề thi hay hỏi</b><ul>
<li>"MOST cost-effective" → chọn phương án rẻ nhất mà <i>vẫn đáp ứng yêu cầu</i>, không phải rẻ nhất tuyệt đối.</li>
<li>"LEAST operational overhead" / "without managing servers" → ưu tiên dịch vụ <b>managed</b> hoặc <b>serverless</b>.</li>
<li>"Choose TWO" / "Choose THREE" → phải chọn đủ số đáp án; thiếu hoặc sai một là mất điểm cả câu.</li>
<li>"alert when costs exceed a threshold" → <b>AWS Budgets</b>.</li>
<li>"factors when choosing a Region" → <b>data sovereignty/compliance</b>, <b>proximity to customers (latency)</b>, dịch vụ có sẵn, giá.</li>
</ul></div>
<div class="box trap"><b>⚠️ Bẫy hay gặp</b><p>Đáp án nghe "xịn" nhất chưa chắc đúng. Nếu đề hỏi cách rẻ nhất, một giải pháp nhiều Region, nhiều tầng bảo vệ thường là sai vì quá đắt so với yêu cầu.</p></div>
`,
    summary: [
      "AWS account chứa tài nguyên và là đơn vị tính tiền; root user có toàn quyền, cần bảo vệ bằng MFA.",
      "Console là giao diện web; luôn kiểm tra Region đang chọn. Chọn Region theo: tuân thủ/chủ quyền dữ liệu, gần người dùng, dịch vụ có sẵn, giá.",
      "Mỗi dịch vụ AWS như một viên Lego; đề thi hỏi nhu cầu nào dùng dịch vụ nào.",
      "Đặt cảnh báo chi phí (AWS Budgets) và xóa tài nguyên sau khi thực hành; Free Tier có giới hạn.",
      "Đề có 65 câu (50 tính điểm), 90 phút, điểm 100–1000, đạt 700, không trừ điểm khi sai.",
      "Tìm từ khóa (MOST cost-effective, LEAST operational overhead), loại trừ rồi chọn; xin ESL +30 trước khi đặt lịch."
    ],
    terms: [
      ["AWS account", "tài khoản AWS"],
      ["Root user", "người dùng gốc"],
      ["AWS Management Console", "bảng điều khiển web của AWS"],
      ["Region", "vùng địa lý"],
      ["Free Tier", "gói dùng thử miễn phí"],
      ["Budget / billing alarm", "ngân sách / cảnh báo chi phí"],
      ["Multiple choice", "chọn 1 đáp án"],
      ["Multiple response", "chọn nhiều đáp án"],
      ["Scaled score", "điểm quy đổi"],
      ["Cost-effective", "tiết kiệm chi phí"],
      ["Operational overhead", "công sức vận hành"],
      ["Managed service", "dịch vụ được AWS quản lý"]
    ],
    qids: ["d4-3", "d3-10"]
  },

  {
    id: "1-1",
    module: 1,
    title: "Cloud computing là gì: IaaS, PaaS, SaaS và mô hình triển khai",
    mins: 13,
    goals: [
      "Định nghĩa cloud computing bằng 3 ý: on-demand, pay-as-you-go, qua internet",
      "Phân biệt IaaS, PaaS, SaaS và biết ai quản lý phần nào",
      "Phân biệt 3 mô hình triển khai: cloud, hybrid, on-premises",
      "Nhận ra từ khóa trong đề để chọn đúng mô hình"
    ],
    html: `
<h3>Cloud computing trong một câu</h3>
<p><b>Cloud computing</b> (điện toán đám mây) là việc cung cấp tài nguyên IT (máy chủ, lưu trữ, database, phần mềm…) <b>theo yêu cầu</b> qua <b>internet</b>, với giá <b>dùng bao nhiêu trả bấy nhiêu</b>. Ba cụm từ cần nhớ:</p>
<ul>
<li><b>On-demand</b> (theo yêu cầu): cần là có ngay, không phải đặt mua và chờ.</li>
<li><b>Pay-as-you-go</b> (trả theo mức dùng): không trả trước, không hợp đồng dài hạn bắt buộc.</li>
<li><b>Over the internet</b> (qua internet): truy cập từ bất kỳ đâu.</li>
</ul>
<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>Giống tiền điện: bạn không xây nhà máy điện, chỉ cắm phích là có điện, cuối tháng trả theo số điện đã dùng.</p></div>

<h3>Ba mô hình dịch vụ: IaaS, PaaS, SaaS</h3>
<p>Cloud có nhiều "mức độ dịch vụ". Càng lên cao, nhà cung cấp lo càng nhiều, bạn lo càng ít. Hãy nghĩ về chuyện ăn pizza:</p>
<ul>
<li><b>On-premises</b>: tự làm pizza ở nhà từ A đến Z: mua lò, bột, nhân, tự nướng, tự dọn.</li>
<li><b>IaaS</b> (Infrastructure as a Service, hạ tầng như một dịch vụ): thuê bếp có sẵn lò. Bạn vẫn tự nhào bột, chọn nhân, nướng.</li>
<li><b>PaaS</b> (Platform as a Service, nền tảng như một dịch vụ): gọi pizza giao tận nhà. Bạn chỉ lo bàn ghế, đồ uống.</li>
<li><b>SaaS</b> (Software as a Service, phần mềm như một dịch vụ): đi ăn ở nhà hàng. Mọi thứ đã sẵn sàng, bạn chỉ việc ăn.</li>
</ul>
<table>
<tr><th>Mô hình</th><th>Bạn quản lý</th><th>Nhà cung cấp quản lý</th><th>Ví dụ</th></tr>
<tr><td><b>IaaS</b></td><td>Hệ điều hành, phần mềm, ứng dụng, dữ liệu</td><td>Phần cứng, mạng, data center, ảo hóa</td><td>Amazon EC2 (máy ảo)</td></tr>
<tr><td><b>PaaS</b></td><td>Code ứng dụng và dữ liệu</td><td>Thêm cả hệ điều hành, môi trường chạy, triển khai</td><td>AWS Elastic Beanstalk</td></tr>
<tr><td><b>SaaS</b></td><td>Chỉ dùng phần mềm, cấu hình tài khoản và dữ liệu nhập vào</td><td>Gần như tất cả</td><td>Gmail, phần mềm CRM online</td></tr>
</table>
<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>Minh có ba lựa chọn khi chuyển website lên AWS:</p><p><b>IaaS</b>: thuê máy ảo EC2, tự cài hệ điều hành, web server, vá lỗi bảo mật. Linh hoạt nhất nhưng nhiều việc nhất.</p><p><b>PaaS</b>: dùng Elastic Beanstalk, chỉ upload code, AWS tự lo máy chủ, chia tải và mở rộng.</p><p><b>SaaS</b>: chị Lan dùng phần mềm kế toán online và email doanh nghiệp: không ai trong tiệm phải cài đặt gì.</p></div>

<h3>Ba mô hình triển khai: cloud, hybrid, on-premises</h3>
<p>Ngoài "mức độ dịch vụ", đề thi còn hỏi về <b>deployment model</b> (mô hình triển khai): hệ thống của bạn <i>nằm ở đâu</i>.</p>
<ul>
<li><b>Cloud</b> (còn gọi cloud-native, all-in cloud): toàn bộ ứng dụng chạy trên cloud. Có thể là di chuyển ứng dụng cũ lên, hoặc xây mới hoàn toàn trên cloud.</li>
<li><b>Hybrid</b> (lai): kết hợp hạ tầng on-premises với cloud, hai bên kết nối với nhau. Thường gặp khi công ty chuyển dần, hoặc có hệ thống bắt buộc phải giữ tại chỗ.</li>
<li><b>On-premises</b> (còn gọi là private cloud): tài nguyên chạy trong data center của chính công ty, có thể dùng công nghệ ảo hóa để có trải nghiệm giống cloud.</li>
</ul>
<table>
<tr><th>Mô hình</th><th>Tài nguyên nằm ở đâu</th><th>Từ khóa trong đề</th></tr>
<tr><td>Cloud</td><td>Toàn bộ trên AWS</td><td>"all parts of the application run in the cloud"</td></tr>
<tr><td>Hybrid</td><td>Một phần tại chỗ, một phần trên cloud, có kết nối</td><td>"connect on-premises infrastructure with cloud resources"</td></tr>
<tr><td>On-premises / private cloud</td><td>Data center riêng</td><td>"own data center", "virtualization"</td></tr>
</table>
<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>Trong giai đoạn chuyển đổi, website mới chạy trên AWS nhưng máy tính tính tiền ở quầy và phần mềm quản lý kho cũ vẫn ở tiệm. Hai bên kết nối với nhau để đồng bộ đơn hàng. Đó là mô hình <b>hybrid</b>. Một năm sau, khi kho cũng chuyển lên cloud, BánhNgon thành mô hình <b>cloud</b>.</p></div>

<h3>Chọn mô hình nào: đánh đổi giữa kiểm soát và công sức</h3>
<p>Không có mô hình nào "tốt nhất" cho mọi trường hợp. Câu hỏi cần đặt ra là: bạn muốn <b>kiểm soát</b> bao nhiêu, và chấp nhận bỏ ra bao nhiêu <b>công sức vận hành</b>?</p>
<ul>
<li>Cần cài phần mềm đặc biệt, chỉnh sâu hệ điều hành, hoặc chuyển nguyên một máy chủ cũ lên: chọn <b>IaaS</b>.</li>
<li>Đội ngũ nhỏ, chỉ muốn tập trung viết code, không muốn lo vá lỗi máy chủ: chọn <b>PaaS</b> hoặc các dịch vụ managed.</li>
<li>Nhu cầu phổ biến (email, kế toán, quản lý khách hàng) đã có phần mềm làm sẵn: chọn <b>SaaS</b>, khỏi phải tự xây.</li>
</ul>
<p>Trong thực tế, một công ty thường dùng <i>cả ba</i> cùng lúc cho các nhu cầu khác nhau. Điều quan trọng là hiểu ranh giới trách nhiệm: phần nào bạn lo, phần nào nhà cung cấp lo. Ý tưởng này sẽ quay lại ở bài <b>Shared Responsibility Model</b> (mô hình trách nhiệm chia sẻ) trong Domain 2: dịch vụ càng được quản lý nhiều, AWS càng gánh nhiều phần việc.</p>
<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>Thuê nhà cũng vậy: thuê đất trống thì tự xây nhà (IaaS), thuê căn hộ có sẵn nội thất thì chỉ mang vali đến (PaaS), ở khách sạn thì có người dọn phòng, nấu ăn (SaaS). Càng tiện thì càng ít được tự ý sửa sang.</p></div>

<h3>Cách đề thi hỏi</h3>
<div class="box exam"><b>🎯 Đề thi hay hỏi</b><ul>
<li>"on-demand delivery of IT resources over the internet with pay-as-you-go pricing" → định nghĩa <b>cloud computing</b>.</li>
<li>"example of IaaS" / "full control over the operating system" → <b>Amazon EC2</b>.</li>
<li>"upload code and AWS handles deployment, capacity, load balancing" → <b>AWS Elastic Beanstalk</b> (PaaS).</li>
<li>"complete product run and managed by the provider" → <b>SaaS</b>.</li>
<li>"connects on-premises infrastructure with the cloud" → <b>Hybrid</b> deployment.</li>
</ul></div>
<div class="box trap"><b>⚠️ Bẫy hay gặp</b><p>"Hybrid" là mô hình <i>triển khai</i> (ở đâu), còn IaaS/PaaS/SaaS là mô hình <i>dịch vụ</i> (bạn quản lý bao nhiêu). Đừng trộn hai nhóm này. Một điểm nữa: với IaaS, bạn vẫn phải tự vá hệ điều hành; đó là lý do EC2 được xếp vào IaaS.</p></div>
`,
    summary: [
      "Cloud computing = tài nguyên IT theo yêu cầu, qua internet, trả theo mức dùng.",
      "IaaS: thuê hạ tầng, tự lo OS trở lên (EC2). PaaS: chỉ lo code (Elastic Beanstalk). SaaS: dùng phần mềm hoàn chỉnh.",
      "Càng từ IaaS lên SaaS, nhà cung cấp lo càng nhiều, bạn càng ít quyền kiểm soát.",
      "Deployment model: cloud (toàn bộ trên cloud), hybrid (kết nối on-prem với cloud), on-premises/private cloud.",
      "Đừng nhầm mô hình dịch vụ với mô hình triển khai."
    ],
    terms: [
      ["Cloud computing", "điện toán đám mây"],
      ["On-demand", "theo yêu cầu"],
      ["Pay-as-you-go", "trả theo mức dùng"],
      ["IaaS (Infrastructure as a Service)", "hạ tầng như một dịch vụ"],
      ["PaaS (Platform as a Service)", "nền tảng như một dịch vụ"],
      ["SaaS (Software as a Service)", "phần mềm như một dịch vụ"],
      ["Deployment model", "mô hình triển khai"],
      ["Hybrid", "lai (kết hợp on-prem và cloud)"],
      ["Private cloud", "đám mây riêng"],
      ["Virtualization", "ảo hóa"],
      ["Virtual machine", "máy ảo"]
    ],
    qids: ["d1-13", "d1-12", "d3-19", "d1-1"]
  },

  {
    id: "1-2",
    module: 1,
    title: "6 lợi ích của AWS Cloud và các khái niệm HA, elasticity, agility",
    mins: 15,
    goals: [
      "Thuộc và hiểu 6 lợi ích (six advantages) của cloud kèm ví dụ",
      "Phân biệt scalability và elasticity",
      "Phân biệt high availability, fault tolerance và durability",
      "Hiểu agility nghĩa là gì trong đề thi"
    ],
    html: `
<h3>Sáu lợi ích của cloud</h3>
<p>AWS tóm tắt lợi ích của cloud thành 6 câu tiếng Anh. Đề thi hay dùng <i>đúng nguyên văn</i> các câu này làm đáp án, nên hãy nhớ tên tiếng Anh.</p>
<p><b>1. Trade fixed expense for variable expense</b> (đổi chi phí cố định lấy chi phí biến đổi). Không phải bỏ tiền mua data center, server trước khi biết sẽ dùng bao nhiêu. Chỉ trả khi dùng, dùng ít trả ít.</p>
<p><b>2. Benefit from massive economies of scale</b> (hưởng lợi từ quy mô kinh tế khổng lồ). AWS phục vụ rất nhiều khách hàng, mua phần cứng với số lượng cực lớn, nên chi phí trên mỗi đơn vị thấp và giá trả theo mức dùng cũng thấp hơn so với một công ty tự làm.</p>
<p><b>3. Stop guessing capacity</b> (thôi đoán công suất). Không cần đoán trước cần bao nhiêu máy. Đông khách thì tăng, vắng khách thì giảm, trong vài phút.</p>
<p><b>4. Increase speed and agility</b> (tăng tốc độ và sự linh hoạt). Tài nguyên mới có trong vài phút thay vì vài tuần, nên đội ngũ thử nghiệm nhanh, ra sản phẩm nhanh.</p>
<p><b>5. Stop spending money running and maintaining data centers</b> (thôi tốn tiền vận hành data center). Không phải lo xếp rack, cắm điện, làm mát; tập trung vào khách hàng và sản phẩm.</p>
<p><b>6. Go global in minutes</b> (vươn ra toàn cầu trong vài phút). Triển khai ứng dụng sang nhiều Region trên thế giới chỉ với vài thao tác, giúp khách ở xa có độ trễ thấp.</p>
<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>Sáu lợi ích qua câu chuyện BánhNgon:</p><ul>
<li>Không mua máy 50 triệu nữa, trả vài trăm nghìn mỗi tháng theo mức dùng (1).</li>
<li>Giá thuê rẻ vì AWS mua máy số lượng lớn (2).</li>
<li>Mùa Tết tự tăng máy, ra Giêng giảm lại (3).</li>
<li>Minh thử tính năng "đặt bánh sinh nhật theo mẫu" trong một buổi chiều, không thành công thì xóa đi (4).</li>
<li>Không còn trông máy trong kho (5).</li>
<li>Khi mở ở Nhật, chạy thêm hệ thống ở Region Tokyo trong vài phút (6).</li>
</ul></div>

<h3>Scalability và elasticity</h3>
<p><b>Scalability</b> (khả năng mở rộng) là hệ thống <i>có thể</i> lớn lên để đáp ứng nhu cầu tăng, bằng cách thêm tài nguyên. Đây là khả năng, có thể làm thủ công hoặc theo kế hoạch.</p>
<p><b>Elasticity</b> (tính co giãn) là hệ thống <i>tự động</i> tăng tài nguyên khi nhu cầu tăng và <i>tự động giảm</i> khi nhu cầu giảm, bám sát nhu cầu thực tế để không lãng phí.</p>
<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>Scalability giống nhà hàng có thể kê thêm bàn khi cần. Elasticity giống chiếc quần thun: bụng to thì giãn ra, bụng nhỏ thì co lại, tự động, không ai phải chỉnh.</p></div>
<p>Trên AWS, elasticity thường đạt được bằng <b>Amazon EC2 Auto Scaling</b>: tự thêm hoặc bớt máy theo tải.</p>

<h3>High availability, fault tolerance và durability</h3>
<p><b>High availability</b> (tính sẵn sàng cao) nghĩa là hệ thống hầu như luôn hoạt động, thời gian ngừng (downtime) rất ít. Cách làm phổ biến: chạy ở nhiều <b>Availability Zone</b> (AZ, các cụm data center tách biệt trong một Region). Một AZ gặp sự cố thì AZ khác vẫn phục vụ.</p>
<p>Vì sao nhiều AZ lại giúp sẵn sàng cao? Vì mỗi AZ có <b>nguồn điện, hệ thống làm mát và mạng độc lập</b>, đặt cách nhau đủ xa để một vụ cháy hay mất điện không ảnh hưởng cả hai, nhưng đủ gần để kết nối với nhau có độ trễ thấp. Ở mức lớn hơn, các <b>Region</b> nằm ở những vùng địa lý khác nhau và <b>cô lập với nhau</b>.</p>
<ul>
<li>Dữ liệu bạn lưu ở một Region <b>không tự động được sao chép</b> sang Region khác. Muốn có bản sao ở Region khác, bạn phải tự bật tính năng sao chép.</li>
<li>Cần <b>disaster recovery</b> (khôi phục sau thảm họa) ở nơi cách xa hàng trăm km? Không cần xây data center thứ hai: chỉ việc dựng tài nguyên ở một Region khác, theo yêu cầu và trả theo mức dùng.</li>
</ul>
<p><b>Fault tolerance</b> (khả năng chịu lỗi) là mức cao hơn: hệ thống tiếp tục chạy <i>bình thường</i> ngay cả khi một thành phần hỏng, người dùng gần như không nhận ra. Để làm được cần dư thừa (redundancy) ở mọi thành phần quan trọng.</p>
<p><b>Durability</b> (độ bền dữ liệu) là dữ liệu <i>không bị mất</i> theo thời gian. Ví dụ Amazon S3 được thiết kế cho độ bền 99.999999999% (11 số 9) cho dữ liệu lưu trữ. Lưu ý: bền khác với sẵn sàng. Dữ liệu có thể tạm thời không truy cập được nhưng vẫn không mất.</p>
<table>
<tr><th>Khái niệm</th><th>Câu hỏi nó trả lời</th><th>Ẩn dụ tiệm bánh</th></tr>
<tr><td>High availability</td><td>Hệ thống có luôn mở cửa không?</td><td>Có 2 chi nhánh: một nơi đóng cửa thì khách sang nơi kia</td></tr>
<tr><td>Fault tolerance</td><td>Hỏng một bộ phận, có chạy tiếp như không có gì không?</td><td>Có 2 lò nướng chạy song song, hỏng 1 lò vẫn ra đủ bánh</td></tr>
<tr><td>Durability</td><td>Dữ liệu có bị mất không?</td><td>Công thức bánh được cất trong két và có nhiều bản sao</td></tr>
<tr><td>Elasticity</td><td>Có tự tăng/giảm theo nhu cầu không?</td><td>Tự gọi thêm thợ mùa Tết, cho nghỉ khi vắng</td></tr>
</table>

<h3>Agility: nhanh và dám thử</h3>
<p><b>Agility</b> (sự linh hoạt, nhanh nhẹn) trong cloud nghĩa là giảm thời gian và chi phí để có tài nguyên mới, nhờ đó doanh nghiệp <b>thử nghiệm nhiều hơn</b>, <b>sai rẻ hơn</b> và <b>ra thị trường nhanh hơn</b>. Nếu thử nghiệm thất bại, chỉ cần xóa tài nguyên, không bị "kẹt" với máy móc đã mua.</p>
<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>Minh muốn thử chatbot tư vấn bánh. Ngày xưa phải mua máy mới, mất cả tháng. Trên AWS, anh bật thử trong một ngày, cho 100 khách dùng thử một tuần. Khách thích, giữ lại; nếu khách không thích, xóa đi và chỉ mất vài đồng.</p></div>

<h3>Cách đề thi hỏi</h3>
<div class="box exam"><b>🎯 Đề thi hay hỏi</b><ul>
<li>"pay only for what you consume", "no upfront investment" → <b>Trade fixed expense for variable expense</b>.</li>
<li>"aggregated usage from many customers → lower prices" → <b>Benefit from massive economies of scale</b>.</li>
<li>"over-provisioning", "idle resources", "capacity planning" → <b>Stop guessing capacity</b>.</li>
<li>"deploy in multiple Regions around the world quickly" → <b>Go global in minutes</b>.</li>
<li>"experiment quickly", "reduce time to market" → <b>Increase speed and agility</b>.</li>
<li>"automatically acquire and release resources as demand changes" → <b>Elasticity</b>.</li>
<li>"multiple Availability Zones, keeps running if one AZ fails" → <b>High availability</b>; lý do: mỗi AZ có <b>independent power, cooling, and networking</b>.</li>
<li>"keep adding capacity as the business grows, without redesign" (tăng dần theo thời gian, không nhắc chuyện co lại) → <b>Scalability</b>; "grow and shrink automatically during a short sale" → <b>Elasticity</b>.</li>
<li>"metric that shows agility" → thời gian có môi trường mới giảm từ <i>vài tuần xuống vài phút</i>.</li>
<li>"engineers spend time replacing disks, cooling, data center leases" → <b>Stop spending money running and maintaining data centers</b>.</li>
</ul></div>
<div class="box trap"><b>⚠️ Bẫy hay gặp</b><p>Elasticity luôn có ý "cả tăng và giảm, tự động". Nếu đề chỉ nói "có thể lớn lên" thì là scalability. Và đừng nhầm durability (dữ liệu không mất) với availability (truy cập được lúc cần).</p><p>Đề cũng hay cài đáp án sai như "Customer responsibility for physical security" hay "requirement to purchase hardware upfront": đó là đặc điểm của on-premises, không phải lợi ích của cloud.</p><p>Một kiểu "NOT a benefit" khác: "AWS chịu toàn bộ trách nhiệm cấu hình ai được truy cập dữ liệu của công ty" là <b>sai</b>. AWS lo hạ tầng; quyền truy cập dữ liệu vẫn do khách hàng cấu hình. Tương tự, "dữ liệu tự được sao chép sang Region khác" cũng sai.</p></div>
`,
    summary: [
      "6 lợi ích: fixed → variable expense; economies of scale; stop guessing capacity; speed & agility; stop running data centers; go global in minutes.",
      "Scalability = có thể mở rộng; elasticity = tự động tăng và giảm theo nhu cầu.",
      "High availability = ít downtime, thường dùng nhiều AZ (mỗi AZ có điện, làm mát, mạng độc lập); fault tolerance = hỏng một phần vẫn chạy bình thường.",
      "Region cô lập với nhau; dữ liệu không tự sao chép sang Region khác. DR ở xa = dựng tài nguyên ở Region khác theo yêu cầu.",
      "Durability = dữ liệu không mất (S3: 11 số 9), khác với availability.",
      "Agility = có tài nguyên nhanh, thử nghiệm rẻ, ra thị trường nhanh."
    ],
    terms: [
      ["Variable expense", "chi phí biến đổi"],
      ["Economies of scale", "lợi thế quy mô"],
      ["Capacity planning", "hoạch định công suất"],
      ["Agility", "sự linh hoạt, nhanh nhẹn"],
      ["Scalability", "khả năng mở rộng"],
      ["Elasticity", "tính co giãn"],
      ["High availability", "tính sẵn sàng cao"],
      ["Fault tolerance", "khả năng chịu lỗi"],
      ["Durability", "độ bền dữ liệu"],
      ["Downtime", "thời gian ngừng hoạt động"],
      ["Availability Zone (AZ)", "vùng sẵn sàng"],
      ["Redundancy", "dư thừa dự phòng"],
      ["Disaster recovery (DR)", "khôi phục sau thảm họa"],
      ["Time to market", "thời gian đưa sản phẩm ra thị trường"]
    ],
    qids: ["d1-1", "d1-10", "d1-11", "d1-17", "d1-4", "d1-16", "d3-28"]
  },

  {
    id: "1-3",
    module: 1,
    title: "Kinh tế học cloud: CapEx/OpEx, TCO, BYOL, rightsizing",
    mins: 13,
    goals: [
      "Phân biệt chi phí cố định/biến đổi và CapEx/OpEx",
      "Liệt kê các chi phí ẩn của on-premises và hiểu ý tưởng TCO",
      "Phân biệt BYOL và license-included",
      "Hiểu rightsizing và vì sao automation giúp tiết kiệm"
    ],
    html: `
<h3>Chi phí cố định và chi phí biến đổi</h3>
<p><b>Fixed cost</b> (chi phí cố định) là khoản bạn trả dù dùng nhiều hay ít, như tiền mua máy, tiền thuê mặt bằng. <b>Variable cost</b> (chi phí biến đổi) thay đổi theo mức sử dụng, như tiền điện, tiền cước taxi.</p>
<p>On-premises chủ yếu là chi phí cố định: mua máy xong, tháng vắng khách máy vẫn nằm đó. Cloud chuyển phần lớn sang chi phí biến đổi: tháng vắng khách, hóa đơn thấp.</p>
<p>Ví dụ chi phí biến đổi trên AWS: Amazon S3 tính theo số GB lưu mỗi tháng; EC2 On-Demand tính theo giây sử dụng. Còn tiền mua server, hợp đồng thuê data center nhiều năm là chi phí cố định.</p>

<h3>CapEx và OpEx</h3>
<p><b>CapEx</b> (Capital Expenditure, chi phí đầu tư vốn) là tiền bỏ ra một lần để mua tài sản dùng lâu dài: server, thiết bị mạng, xây data center. <b>OpEx</b> (Operational Expenditure, chi phí vận hành) là tiền trả định kỳ để dùng dịch vụ: hóa đơn AWS hằng tháng.</p>
<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>Mua một chiếc xe tải để giao bánh là CapEx. Thuê dịch vụ giao hàng theo từng chuyến là OpEx. Cloud giúp chuyển từ "mua xe" sang "thuê chuyến".</p></div>
<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>Năm đầu, chị Lan phải bỏ một khoản lớn mua máy chủ, bộ lưu điện, điều hòa cho kho (CapEx). Lên AWS, chị không phải bỏ khoản lớn nào ban đầu; chi phí thành hóa đơn hằng tháng (OpEx), tăng giảm theo lượng khách. Số tiền tiết kiệm được chị dùng để chạy quảng cáo.</p></div>

<h3>Chi phí ẩn của on-premises và TCO</h3>
<p>Khi so sánh on-prem với cloud, nhiều người chỉ so "giá mua server" với "giá thuê máy ảo". Đó là so sánh sai, vì on-prem có rất nhiều chi phí ẩn:</p>
<ul>
<li>Điện cho server và <b>làm mát</b> (cooling).</li>
<li>Thuê chỗ, rack, an ninh vật lý, phòng cháy.</li>
<li>Lương nhân sự vận hành, trực đêm, thay ổ cứng hỏng.</li>
<li>Thiết bị mạng, đường truyền, dự phòng.</li>
<li><b>Hardware refresh</b>: sau vài năm phải thay máy mới.</li>
<li>Máy mua dư để phòng lúc cao điểm nhưng nằm không phần lớn thời gian.</li>
</ul>
<p><b>TCO</b> (Total Cost of Ownership, tổng chi phí sở hữu) là tổng <i>mọi</i> chi phí trực tiếp và gián tiếp để sở hữu và vận hành một hệ thống trong suốt vòng đời của nó. Khi tính TCO đầy đủ, cloud thường có lợi hơn nhiều so với chỉ nhìn giá máy.</p>
<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>Minh thử tính TCO cho 3 năm. Phía on-prem: tiền mua 2 server (một chiếc dự phòng), bộ lưu điện, điều hòa chạy suốt ngày đêm, tiền điện, một phần lương của chính Minh để trông máy, và khoản thay máy vào năm thứ 3. Phía AWS: hóa đơn hằng tháng ước tính theo mức dùng thực tế, cộng thời gian Minh quản lý tài khoản. Khi cộng đủ, chênh lệch lớn hơn nhiều so với lúc chỉ so "giá server" với "giá thuê máy ảo".</p></div>
<p>Lưu ý: TCO không chỉ là tiền. Thời gian của nhân viên, rủi ro sập hệ thống, tốc độ ra sản phẩm mới cũng là "chi phí" cần tính đến.</p>
<h4>Chi phí nào giảm, chi phí nào vẫn còn?</h4>
<table>
<tr><th>Giảm hoặc mất hẳn khi lên AWS</th><th>Vẫn còn (khách hàng tự lo)</th></tr>
<tr><td>Mua và thay mới server, thiết bị mạng</td><td>Thời gian vá hệ điều hành bên trong EC2 (guest OS)</td></tr>
<tr><td>Điện, làm mát, mặt bằng, an ninh vật lý data center</td><td>License phần mềm thương mại bạn cài lên máy</td></tr>
<tr><td>Máy mua dư nằm không</td><td>Cấu hình ứng dụng, quản lý dữ liệu và quyền truy cập</td></tr>
<tr><td>Công thay ổ cứng, lắp rack</td><td>Thời gian lập trình viên viết tính năng mới cho doanh nghiệp</td></tr>
</table>
<p>Với dịch vụ managed (như Amazon RDS), AWS gánh thêm việc vá database engine, sao lưu tự động. Nhưng công viết tính năng kinh doanh thì gần như không đổi dù bạn chạy ở đâu.</p>
<div class="box idea"><b>🧠 Hiểu đơn giản: vì sao giá theo giờ "đắt hơn" mà tổng vẫn rẻ hơn</b><p>Chia giá server tự mua cho số giờ trong 3 năm, có khi còn thấp hơn giá thuê EC2 theo giờ. Nhưng nếu server tự mua chỉ chạy trung bình 15% công suất, bạn đang trả tiền cho 85% nằm không. Trên AWS, công suất bám theo mức dùng thực tế, nên tổng chi phí thấp hơn. Giống thuê taxi đắt hơn tính theo km, nhưng rẻ hơn nuôi một chiếc xe nằm trong gara cả tuần.</p></div>
<p>Để ước tính chi phí trên AWS trước khi chuyển, có <b>AWS Pricing Calculator</b>. Để xây dựng phân tích kinh doanh dựa trên dữ liệu hệ thống hiện tại, có <b>Migration Evaluator</b> (bạn sẽ gặp ở bài migration).</p>

<h3>Economies of scale: vì sao AWS rẻ</h3>
<p>AWS mua phần cứng, điện, băng thông với số lượng khổng lồ và vận hành rất hiệu quả. Chi phí trên mỗi đơn vị giảm, và AWS chuyển một phần lợi ích này cho khách hàng qua giá thấp hơn. Một tiệm bánh nhỏ không bao giờ đàm phán được giá như vậy.</p>

<h3>BYOL và license-included</h3>
<p>Nhiều phần mềm thương mại (như Microsoft Windows Server, SQL Server, Oracle) cần <b>license</b> (giấy phép bản quyền). Trên AWS có hai cách:</p>
<ul>
<li><b>License-included</b> (đã gồm bản quyền): giá thuê đã bao gồm tiền license. Đơn giản, không cần mua riêng.</li>
<li><b>BYOL</b> (Bring Your Own License, mang license của bạn): công ty đã mua license từ trước thì đem lên AWS dùng tiếp, không trả lại tiền license, giúp tiết kiệm. Một số license tính theo socket/core vật lý đòi hỏi dùng máy chủ riêng như <b>EC2 Dedicated Hosts</b>.</li>
</ul>
<p>BYOL có thể tiết kiệm nhưng phải tuân thủ điều khoản của nhà cung cấp phần mềm.</p>
<table>
<tr><th>Tình huống</th><th>Chọn gì</th></tr>
<tr><td>Chưa có license, không muốn tự mua/theo dõi license (ví dụ Amazon RDS for SQL Server)</td><td><b>License Included</b>: tiền license nằm trong giá theo giờ</td></tr>
<tr><td>Đã có license, muốn dùng lại</td><td><b>BYOL</b></td></tr>
<tr><td>License tính theo socket/core vật lý, cần thấy máy chủ vật lý và giữ instance trên cùng một host lâu dài</td><td><b>EC2 Dedicated Hosts</b></td></tr>
<tr><td>Muốn dùng phần mềm bên thứ ba (firewall, phần mềm bảo mật…), trả theo giờ trên hóa đơn AWS, không tự đàm phán hợp đồng với hãng</td><td><b>AWS Marketplace</b> (danh mục phần mềm bán sẵn, có loại tính phí pay-as-you-go)</td></tr>
<tr><td>Theo dõi số license đang dùng, chặn việc chạy vượt số license đã mua</td><td><b>AWS License Manager</b></td></tr>
</table>

<h3>Rightsizing và automation</h3>
<p><b>Rightsizing</b> (chọn đúng kích cỡ) là điều chỉnh tài nguyên cho khớp với nhu cầu thực tế. Nếu máy chủ chỉ dùng 10% CPU, đổi sang loại nhỏ hơn và rẻ hơn. Trên cloud việc này dễ, vì đổi loại máy chỉ mất vài phút và đổi được bất cứ lúc nào, nên công suất bám sát mức dùng thực tế. Ở on-prem, máy đã mua thì không "thu nhỏ" được.</p>
<p>Trước khi đổi, hãy lấy bằng chứng: số liệu sử dụng (CPU, bộ nhớ…) từ <b>Amazon CloudWatch</b> và gợi ý kích cỡ phù hợp từ <b>AWS Compute Optimizer</b> (dịch vụ dùng machine learning phân tích mức dùng để đề xuất loại instance hợp hơn).</p>
<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>Xem biểu đồ giám sát, Minh thấy máy chủ website ngày thường chỉ dùng khoảng 8% CPU. Anh chuyển sang loại máy nhỏ hơn, hóa đơn giảm gần một nửa mà khách không thấy khác biệt. Đó là rightsizing.</p></div>
<p><b>Automation</b> (tự động hóa) cũng giúp tiết kiệm: tự tắt máy thử nghiệm ngoài giờ làm việc, tự co giãn theo tải, dựng hạ tầng bằng code thay vì bấm tay. Ít việc thủ công thì ít lỗi, ít giờ công, và không quên tài nguyên chạy không.</p>
<div class="box exam"><b>🎯 Đề thi hay hỏi</b><ul>
<li>"costs eliminated by moving to AWS" → <b>mua/thay phần cứng</b>, <b>điện và làm mát data center</b>. (Bảo mật dữ liệu khách hàng và thiết kế ứng dụng vẫn là việc của bạn.)</li>
<li>"use existing licenses on AWS" → <b>BYOL</b>; license theo socket/core → <b>Dedicated Hosts</b>.</li>
<li>"instances use less than 10% CPU, change to smaller types" → <b>Rightsizing</b>.</li>
<li>"rightsizing evidence before changing instance types" → <b>CloudWatch</b> (metrics) + <b>AWS Compute Optimizer</b> (recommendations).</li>
<li>"how does automation reduce costs" → giảm công việc thủ công, giảm lỗi, tắt/mở tài nguyên theo nhu cầu. "Dev/test chỉ dùng giờ hành chính" → <b>tự động stop instance ngoài giờ làm việc</b>.</li>
<li>"no license, do not want to track licenses" → <b>License Included</b>; "third-party software billed by the hour on AWS bill" → <b>AWS Marketplace</b>; "track license usage, prevent exceeding owned licenses" → <b>AWS License Manager</b>.</li>
<li>"which costs remain after rehosting to EC2" → vá guest OS, license phần mềm, cấu hình ứng dụng.</li>
<li>"estimate monthly cost before migrating" → <b>AWS Pricing Calculator</b>.</li>
</ul></div>
<div class="box trap"><b>⚠️ Bẫy hay gặp</b><p>Lên cloud <i>không</i> xóa bỏ mọi chi phí license: nếu dùng phần mềm thương mại bạn vẫn phải trả, hoặc qua license-included hoặc BYOL. Cũng không xóa bỏ chi phí bảo vệ dữ liệu, vì bảo mật dữ liệu vẫn là trách nhiệm của khách hàng.</p></div>
`,
    summary: [
      "On-prem chủ yếu là chi phí cố định/CapEx; cloud chuyển sang chi phí biến đổi/OpEx.",
      "On-prem có nhiều chi phí ẩn: điện, làm mát, chỗ đặt, nhân sự, thay phần cứng, máy dư thừa.",
      "TCO là tổng mọi chi phí sở hữu và vận hành trong cả vòng đời; so sánh cloud và on-prem phải dùng TCO.",
      "Economies of scale giúp AWS có giá thấp hơn.",
      "Sau khi lên EC2 vẫn còn: vá guest OS, license phần mềm, cấu hình ứng dụng, công viết tính năng mới.",
      "BYOL = mang license sẵn có lên AWS; License Included = giá đã gồm bản quyền; Dedicated Hosts cho license theo socket/core; Marketplace mua phần mềm bên thứ ba trả theo giờ; License Manager theo dõi license.",
      "Rightsizing (dựa trên CloudWatch + Compute Optimizer) và automation giúp không trả tiền cho tài nguyên thừa hay công việc thủ công."
    ],
    terms: [
      ["Fixed cost", "chi phí cố định"],
      ["Variable cost", "chi phí biến đổi"],
      ["CapEx (Capital Expenditure)", "chi phí đầu tư vốn"],
      ["OpEx (Operational Expenditure)", "chi phí vận hành"],
      ["TCO (Total Cost of Ownership)", "tổng chi phí sở hữu"],
      ["Hardware refresh", "thay mới phần cứng định kỳ"],
      ["Cooling", "làm mát"],
      ["Economies of scale", "lợi thế quy mô"],
      ["License", "giấy phép bản quyền"],
      ["BYOL (Bring Your Own License)", "mang giấy phép của bạn"],
      ["License-included", "giá đã gồm bản quyền"],
      ["Rightsizing", "chọn đúng kích cỡ tài nguyên"],
      ["Utilization", "mức sử dụng"],
      ["AWS Marketplace", "chợ phần mềm bên thứ ba trên AWS"],
      ["AWS License Manager", "dịch vụ quản lý giấy phép"],
      ["Automation", "tự động hóa"]
    ],
    qids: ["d1-1", "d1-10", "d1-18", "d1-19", "d1-20", "d1-22", "d4-4", "d4-12"]
  },

  {
    id: "1-4",
    module: 1,
    title: "AWS Well-Architected Framework: 6 trụ cột",
    mins: 14,
    goals: [
      "Hiểu Well-Architected Framework là gì và dùng để làm gì",
      "Giải thích ý nghĩa của từng trụ cột trong 6 trụ cột bằng lời đơn giản",
      "Nhận ra từ khóa trong đề để chọn đúng trụ cột",
      "Biết AWS Well-Architected Tool dùng để làm gì"
    ],
    html: `
<h3>Well-Architected Framework là gì?</h3>
<p><b>AWS Well-Architected Framework</b> là bộ hướng dẫn và câu hỏi giúp bạn đánh giá xem hệ thống trên cloud đã "được thiết kế tốt" chưa. Nó gom kinh nghiệm thiết kế hệ thống thành <b>6 pillars</b> (trụ cột), mỗi trụ cột có các <b>design principles</b> (nguyên tắc thiết kế) và best practice.</p>
<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>Giống bộ tiêu chuẩn kiểm định một ngôi nhà: móng có chắc không, có an toàn cháy nổ không, có tốn điện không, có dễ bảo trì không. Không phải luật bắt buộc, mà là danh sách kiểm tra để bạn tự đánh giá và cải thiện.</p></div>

<h3>Ba trụ cột đầu: vận hành, bảo mật, tin cậy</h3>
<p><b>1. Operational Excellence</b> (vận hành xuất sắc): chạy và giám sát hệ thống tốt, liên tục cải tiến quy trình. Nguyên tắc tiêu biểu: <b>perform operations as code</b> (vận hành bằng code, ví dụ dựng hạ tầng bằng AWS CloudFormation), thay đổi nhỏ và thường xuyên, có thể quay lại; học từ sự cố.</p>
<p><i>Ví dụ BánhNgon:</i> Minh viết script tự động triển khai website thay vì làm tay, sau mỗi sự cố đều viết lại "bài học rút ra".</p>
<p><b>2. Security</b> (bảo mật): bảo vệ dữ liệu, hệ thống và tài sản. Nguyên tắc: quyền tối thiểu (least privilege), bảo vệ mọi lớp, mã hóa dữ liệu, bật truy vết (traceability) để biết ai làm gì.</p>
<p><i>Ví dụ BánhNgon:</i> nhân viên bán hàng chỉ xem được đơn hàng, không xóa được database; dữ liệu khách được mã hóa.</p>
<p><b>3. Reliability</b> (độ tin cậy): hệ thống làm đúng chức năng một cách ổn định, <b>tự phục hồi khi gặp sự cố</b> và đáp ứng được nhu cầu. Nguyên tắc: tự động phục hồi, thử nghiệm quy trình phục hồi, mở rộng theo chiều ngang, thôi đoán công suất.</p>
<p><i>Ví dụ BánhNgon:</i> website chạy ở 2 Availability Zone, database có bản sao dự phòng, có kế hoạch khôi phục và đã diễn tập.</p>

<h3>Ba trụ cột sau: hiệu năng, chi phí, bền vững</h3>
<p><b>4. Performance Efficiency</b> (hiệu quả hiệu năng): dùng tài nguyên máy tính hiệu quả để đáp ứng yêu cầu, và giữ hiệu quả khi nhu cầu và công nghệ thay đổi. Nguyên tắc: dùng công nghệ tiên tiến dạng dịch vụ có sẵn, <b>go global in minutes</b>, dùng serverless, thử nghiệm thường xuyên.</p>
<p><i>Ví dụ BánhNgon:</i> chọn loại máy phù hợp với tải, dùng CloudFront để ảnh bánh tải nhanh cho khách ở Nhật.</p>
<p><b>5. Cost Optimization</b> (tối ưu chi phí): tạo ra giá trị kinh doanh với chi phí thấp nhất, tránh chi phí không cần thiết. Nguyên tắc: trả theo mức dùng, đo lường hiệu quả, theo dõi và phân bổ chi phí, thôi chi tiền cho việc nặng nhọc không tạo khác biệt.</p>
<p><i>Ví dụ BánhNgon:</i> tắt máy thử nghiệm ban đêm, rightsizing, gắn tag để biết chi phí của từng chi nhánh.</p>
<p><b>6. Sustainability</b> (bền vững): giảm tác động đến môi trường của hệ thống. Nguyên tắc: hiểu tác động của mình, <b>tối đa hóa mức sử dụng</b> tài nguyên (không để máy chạy không), dùng dịch vụ managed, giảm tài nguyên cần thiết.</p>
<p><i>Ví dụ BánhNgon:</i> gộp các máy chạy ít thành một máy chạy đủ tải, xóa dữ liệu cũ không cần nữa.</p>

<h3>Bảng so sánh và từ khóa</h3>
<table>
<tr><th>Pillar</th><th>Câu hỏi cốt lõi</th><th>Từ khóa trong đề</th></tr>
<tr><td>Operational Excellence</td><td>Vận hành và cải tiến có tốt không?</td><td>operations as code, monitoring, small frequent changes, learn from failures, runbooks</td></tr>
<tr><td>Security</td><td>Dữ liệu và hệ thống có được bảo vệ không?</td><td>least privilege, encryption, traceability, protect data, identity</td></tr>
<tr><td>Reliability</td><td>Có tự phục hồi và đáp ứng nhu cầu không?</td><td>recover from failures, automatically recover, Multi-AZ, test recovery</td></tr>
<tr><td>Performance Efficiency</td><td>Có dùng đúng loại tài nguyên một cách hiệu quả không?</td><td>select right resource type, serverless, go global, experiment</td></tr>
<tr><td>Cost Optimization</td><td>Có tránh chi phí thừa không?</td><td>avoid unnecessary costs, pay-as-you-go, measure efficiency</td></tr>
<tr><td>Sustainability</td><td>Có giảm tác động môi trường không?</td><td>environmental impact, maximize utilization, energy, carbon</td></tr>
</table>

<h3>Design principles: đề thi hay hỏi nguyên văn</h3>
<p>Đề thường đưa tên một <b>design principle</b> (nguyên tắc thiết kế) bằng tiếng Anh rồi hỏi nó thuộc trụ cột nào. Bảng dưới là các nguyên tắc hay gặp (AWS thỉnh thoảng chỉnh câu chữ trong tài liệu, nhưng ý chính giữ nguyên):</p>
<table>
<tr><th>Pillar</th><th>Design principles hay gặp</th><th>Hiểu đơn giản</th></tr>
<tr><td>Operational Excellence</td><td>Perform operations as code; Make frequent, small, reversible changes; Refine operations procedures frequently; Anticipate failure; Learn from all operational failures</td><td>Tự động hóa bằng code (kể cả runbook), đổi ít một và quay lại được, họp rút kinh nghiệm sau sự cố theo kiểu không đổ lỗi (blameless)</td></tr>
<tr><td>Security</td><td>Implement a strong identity foundation; Enable traceability; Apply security at all layers; Automate security best practices; Protect data in transit and at rest; Keep people away from data; Prepare for security events</td><td>Quyền tối thiểu, ghi vết, nhiều lớp bảo vệ (edge, VPC, subnet, instance, code), mã hóa, dùng dashboard/công cụ thay vì để người truy cập trực tiếp dữ liệu</td></tr>
<tr><td>Reliability</td><td>Automatically recover from failure; Test recovery procedures; Scale horizontally to increase aggregate workload availability; Stop guessing capacity; Manage change in automation</td><td>Tự phục hồi, diễn tập khôi phục, nhiều máy nhỏ thay vì một máy to</td></tr>
<tr><td>Performance Efficiency</td><td>Democratize advanced technologies; Go global in minutes; Use serverless architectures; Experiment more often; Consider mechanical sympathy</td><td>Dùng dịch vụ có sẵn (AI, database…) thay vì tự xây, chọn công nghệ hợp với cách dữ liệu được dùng</td></tr>
<tr><td>Cost Optimization</td><td>Implement Cloud Financial Management; Adopt a consumption model; Measure overall efficiency; Stop spending money on undifferentiated heavy lifting; Analyze and attribute expenditure</td><td>Có đội tài chính + kỹ thuật lo văn hóa chi phí, trả theo mức dùng, gắn tag để biết ai tiêu bao nhiêu</td></tr>
<tr><td>Sustainability</td><td>Understand your impact; Establish sustainability goals; Maximize utilization; Anticipate and adopt new, more efficient hardware and software offerings; Use managed services; Reduce the downstream impact of your cloud workloads</td><td>Đo tác động, không để máy chạy không, lên đời phần cứng hiệu quả hơn, dùng chung hạ tầng qua dịch vụ managed</td></tr>
</table>
<p><b>Cloud Financial Management</b> (quản lý tài chính cloud) là xây dựng năng lực và văn hóa quản lý chi phí: một nhóm gồm người tài chính và kỹ thuật đào tạo kỹ sư về ý thức chi phí, đặt mục tiêu chi tiêu, cùng các đội sản phẩm xem lại mức dùng. Việc này thuộc <b>Cost Optimization</b>.</p>
<div class="box trap"><b>⚠️ Bẫy hay gặp</b><p>"Stop guessing capacity" vừa là một trong 6 lợi ích của cloud, vừa là nguyên tắc của <b>Reliability</b> (không phải Cost Optimization). "Democratize advanced technologies" (dùng dịch vụ AI managed thay vì tự huấn luyện mô hình) thuộc <b>Performance Efficiency</b>. "Keep people away from data" thuộc <b>Security</b>.</p></div>
<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>Sau một năm trên AWS, Minh dùng <b>AWS Well-Architected Tool</b> trong Console để tự trả lời các câu hỏi về hệ thống BánhNgon. Công cụ chỉ ra: chưa diễn tập khôi phục dữ liệu (Reliability), có vài máy chạy không suốt đêm (Cost Optimization và Sustainability), và một tài khoản có quyền quá rộng (Security). Minh lên kế hoạch sửa từng mục.</p></div>
<p><b>AWS Well-Architected Tool</b> là dịch vụ miễn phí trong Console giúp bạn review workload theo các best practice của framework. Bạn trả lời bộ câu hỏi theo từng trụ cột, công cụ đánh dấu các <b>high-risk issues</b> (vấn đề rủi ro cao), cho bạn lưu <b>milestone</b> (ảnh chụp trạng thái tại một thời điểm để so sánh về sau) và tạo <b>improvement plan</b> (kế hoạch cải tiến).</p>
<p><b>Well-Architected Lenses</b> (lăng kính) là bộ câu hỏi và hướng dẫn <i>bổ sung</i> cho một ngành hoặc một loại công nghệ cụ thể, dùng thêm sau khi đã review theo 6 trụ cột chung. Ví dụ: lens cho Financial Services Industry, Serverless, SaaS, Machine Learning, Data Analytics. Trong Well-Architected Tool có thể áp dụng lens từ thư viện có sẵn, hoặc tự tạo custom lens.</p>

<h3>Đánh đổi giữa các trụ cột</h3>
<p>Các trụ cột đôi khi "kéo nhau" theo hướng ngược lại. Chạy hệ thống ở nhiều Region giúp Reliability tốt hơn nhưng tốn tiền hơn (Cost Optimization). Dùng máy thật mạnh giúp Performance nhưng có thể lãng phí khi vắng khách. Vì vậy framework khuyên bạn <b>review định kỳ</b>, không chỉ một lần, và chọn mức cân bằng phù hợp với mục tiêu kinh doanh.</p>
<p>Theo tài liệu Well-Architected, <b>Security</b> và <b>Operational Excellence</b> nhìn chung <b>không nên bị đánh đổi</b> với các trụ cột khác. Sự đánh đổi thường xảy ra giữa Reliability, Performance Efficiency, Cost Optimization và Sustainability. Ví dụ một website thử nghiệm nội bộ có thể chấp nhận độ tin cậy thấp hơn hệ thống thanh toán để tiết kiệm, nhưng không được bỏ qua bảo mật.</p>
<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>Giống chọn xe giao bánh: xe to chở nhiều nhưng tốn xăng, xe máy rẻ nhưng chở ít. Không có xe "tốt nhất", chỉ có xe hợp với nhu cầu và túi tiền của tiệm lúc đó.</p></div>
<div class="box exam"><b>🎯 Đề thi hay hỏi</b><ul>
<li>"recover from failures and meet demand" → <b>Reliability</b>.</li>
<li>"perform operations as code" → <b>Operational Excellence</b>.</li>
<li>"minimize environmental impact", "maximize utilization" → <b>Sustainability</b>.</li>
<li>"use computing resources efficiently", "select the right instance type" → <b>Performance Efficiency</b>.</li>
<li>"avoid unnecessary costs" → <b>Cost Optimization</b>.</li>
<li>"review workloads against Well-Architected best practices", "milestone", "improvement plan", "high-risk issues" → <b>AWS Well-Architected Tool</b>.</li>
<li>"additional best-practice guidance specific to an industry or technology" → <b>Well-Architected lens</b>.</li>
<li>"pillars generally NOT traded off" → <b>Security</b> và <b>Operational Excellence</b>.</li>
<li>"strong identity foundation", "traceability", "apply security at all layers", "keep people away from data" → <b>Security</b>.</li>
<li>"test recovery procedures", "scale horizontally", "stop guessing capacity" → <b>Reliability</b>.</li>
<li>"frequent, small, reversible changes", "blameless post-incident review", "runbooks as code" → <b>Operational Excellence</b>.</li>
<li>"democratize advanced technologies", "use serverless architectures", "experiment more often" → <b>Performance Efficiency</b>.</li>
<li>"Cloud Financial Management", "consumption model", "undifferentiated heavy lifting", "tag and attribute costs per team" → <b>Cost Optimization</b>.</li>
<li>"adopt new, more efficient hardware", "use managed services to share infrastructure" → <b>Sustainability</b>.</li>
</ul></div>
<div class="box trap"><b>⚠️ Bẫy hay gặp</b><p>"Maximize utilization" có thể khiến bạn nghĩ đến Performance hay Cost, nhưng khi đề nhắc đến <i>môi trường</i> (environmental impact, energy) thì đáp án là <b>Sustainability</b>. Còn "go global in minutes" vừa là một trong 6 lợi ích của cloud, vừa là nguyên tắc của Performance Efficiency: đọc kỹ đề đang hỏi về lợi ích hay về trụ cột.</p></div>
`,
    summary: [
      "Well-Architected Framework là bộ best practice giúp đánh giá và cải tiến hệ thống trên AWS.",
      "6 trụ cột: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, Sustainability.",
      "Operations as code → Operational Excellence; recover from failures → Reliability.",
      "Chọn đúng loại tài nguyên, serverless, democratize → Performance Efficiency; tránh chi phí thừa → Cost Optimization; identity, traceability, all layers → Security.",
      "Giảm tác động môi trường, tối đa hóa mức sử dụng → Sustainability.",
      "AWS Well-Architected Tool giúp review workload theo framework (milestone, improvement plan, high-risk issues); lens bổ sung câu hỏi cho từng ngành/công nghệ.",
      "Security và Operational Excellence nhìn chung không đánh đổi; Cloud Financial Management thuộc Cost Optimization."
    ],
    terms: [
      ["Well-Architected Framework", "khung kiến trúc tốt của AWS"],
      ["Pillar", "trụ cột"],
      ["Design principle", "nguyên tắc thiết kế"],
      ["Best practice", "cách làm tốt nhất"],
      ["Operational Excellence", "vận hành xuất sắc"],
      ["Security", "bảo mật"],
      ["Reliability", "độ tin cậy"],
      ["Performance Efficiency", "hiệu quả hiệu năng"],
      ["Cost Optimization", "tối ưu chi phí"],
      ["Sustainability", "bền vững"],
      ["Operations as code", "vận hành bằng code"],
      ["Workload", "khối lượng công việc / hệ thống ứng dụng"],
      ["Traceability", "khả năng truy vết"],
      ["Lens", "bộ câu hỏi bổ sung theo ngành/công nghệ"],
      ["Cloud Financial Management", "quản lý tài chính cloud"]
    ],
    qids: ["d1-2", "d1-6", "d1-7", "d3-78"]
  },

  {
    id: "1-5",
    module: 1,
    title: "Di chuyển lên cloud: 7R, AWS CAF và công cụ migration",
    mins: 16,
    goals: [
      "Phân biệt 7 chiến lược migration (7R) qua ví dụ",
      "Biết 6 perspective của AWS CAF và cách chia nhóm kinh doanh/kỹ thuật",
      "Nhớ 4 business outcome mà AWS CAF nêu ra",
      "Biết công cụ migration nào dùng cho việc gì ở mức cơ bản"
    ],
    html: `
<h3>Migration là gì?</h3>
<p><b>Migration</b> (di chuyển) là đưa ứng dụng, dữ liệu, máy chủ từ on-premises (hoặc từ cloud khác) lên AWS. Không phải ứng dụng nào cũng di chuyển theo cùng một cách. AWS gom các cách làm thành <b>7 chiến lược</b>, hay gọi là <b>7R</b> vì đều bắt đầu bằng chữ R.</p>
<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>Giống chuyển nhà: có đồ bê nguyên sang, có đồ sửa chút rồi mang đi, có đồ đóng mới hoàn toàn, có đồ bán đi mua cái mới, có đồ vứt bỏ, và có đồ để tạm lại nhà cũ.</p></div>

<h3>7 chiến lược migration (7R)</h3>
<p><b>1. Rehost</b> ("lift and shift", nhấc lên và chuyển đi): chuyển ứng dụng nguyên trạng, không sửa code. Nhanh nhất, ít rủi ro nhất.<br><i>BánhNgon:</i> chép nguyên máy chủ website trong kho thành một máy ảo trên AWS.</p>
<p><b>2. Replatform</b> ("lift, tinker and shift", chuyển kèm chỉnh nhẹ): tối ưu một chút để tận dụng cloud nhưng <i>không đổi kiến trúc cốt lõi</i>.<br><i>BánhNgon:</i> thay database MySQL tự cài bằng Amazon RDS do AWS quản lý, code gần như giữ nguyên.</p>
<p><b>3. Refactor / Re-architect</b> (tái cấu trúc): viết lại, thiết kế lại ứng dụng để dùng tính năng cloud-native, thường để mở rộng tốt hơn hoặc nhanh hơn. Tốn công nhất.<br><i>BánhNgon:</i> tách hệ thống đặt hàng thành các hàm serverless chạy trên AWS Lambda.</p>
<p><b>4. Repurchase</b> ("drop and shop", bỏ đi mua mới): bỏ phần mềm cũ, chuyển sang sản phẩm khác, thường là SaaS.<br><i>BánhNgon:</i> bỏ phần mềm quản lý khách hàng cài trên máy, chuyển sang một CRM dạng SaaS.</p>
<p><b>5. Retire</b> (cho nghỉ hưu): tắt bỏ ứng dụng không còn cần.<br><i>BánhNgon:</i> trang khuyến mãi Trung Thu năm cũ không ai dùng nữa, tắt luôn.</p>
<p><b>6. Retain</b> (giữ lại): tạm giữ ứng dụng ở on-premises, chưa di chuyển, có thể vì mới nâng cấp, vì yêu cầu đặc biệt hoặc chưa đến lúc.<br><i>BánhNgon:</i> máy tính tiền ở quầy cần chạy cả khi mất mạng, nên giữ tại tiệm.</p>
<p><b>7. Relocate</b> (chuyển vị trí hạ tầng): chuyển cả hạ tầng ảo hóa lên cloud mà không cần mua phần cứng mới hay sửa ứng dụng, ví dụ chuyển môi trường VMware lên VMware Cloud on AWS.<br><i>BánhNgon:</i> giả sử kho có cụm máy ảo VMware chạy nhiều ứng dụng nhỏ, Minh dời cả cụm lên AWS một lượt.</p>
<table>
<tr><th>Chiến lược</th><th>Thay đổi code</th><th>Từ khóa trong đề</th></tr>
<tr><td>Rehost</td><td>Không</td><td>as quickly as possible, without changes, lift and shift</td></tr>
<tr><td>Replatform</td><td>Rất ít</td><td>some optimization, move DB to RDS, without changing core architecture</td></tr>
<tr><td>Refactor</td><td>Nhiều</td><td>re-architect, cloud-native, serverless, microservices</td></tr>
<tr><td>Repurchase</td><td>Thay sản phẩm</td><td>move to SaaS, different product</td></tr>
<tr><td>Retire</td><td>Tắt bỏ</td><td>no longer needed, decommission</td></tr>
<tr><td>Retain</td><td>Giữ nguyên tại chỗ</td><td>keep on-premises, not ready to migrate</td></tr>
<tr><td>Relocate</td><td>Không</td><td>VMware, move hypervisor-level infrastructure</td></tr>
</table>
<p>Ba điểm hay bị hỏi kỹ hơn:</p>
<ul>
<li><b>Vì sao chọn Rehost trước?</b> Khi có hạn chót gấp (hết hợp đồng thuê data center, phải chuyển hàng trăm ứng dụng), rehost giúp chuyển <i>nhanh, quy mô lớn, ít thay đổi</i>; tối ưu dần sau khi đã lên cloud.</li>
<li><b>Replatform không nhất thiết phải sửa code.</b> Ví dụ chuyển ứng dụng Java đang chạy trên Tomcat tự cài, tự vá sang AWS Elastic Beanstalk, code giữ nguyên, nhưng giờ AWS lo nền tảng, công suất, chia tải. Đổi "nền" sang dịch vụ managed = Replatform.</li>
<li><b>Relocate</b> giữ nguyên cả công cụ và quy trình vận hành hiện có (ví dụ hàng nghìn máy ảo VMware), không mua phần cứng mới, không viết lại ứng dụng.</li>
</ul>

<h3>AWS Cloud Adoption Framework (AWS CAF)</h3>
<p>Di chuyển lên cloud không chỉ là chuyện kỹ thuật. Con người, quy trình, ngân sách cũng phải thay đổi. <b>AWS CAF</b> (Cloud Adoption Framework, khung áp dụng cloud) là bộ hướng dẫn giúp tổ chức chuẩn bị toàn diện, chia thành <b>6 perspectives</b> (góc nhìn):</p>
<table>
<tr><th>Nhóm</th><th>Perspective</th><th>Ý nghĩa đơn giản</th></tr>
<tr><td rowspan="3">Kinh doanh</td><td><b>Business</b></td><td>Đầu tư cloud phải phục vụ mục tiêu kinh doanh (chiến lược, sản phẩm, dữ liệu)</td></tr>
<tr><td><b>People</b></td><td>Văn hóa, cơ cấu tổ chức, lãnh đạo, kỹ năng nhân viên</td></tr>
<tr><td><b>Governance</b></td><td>Quản lý chương trình/dự án, theo dõi lợi ích mang lại, quản lý chi phí cloud (financial management), quản lý rủi ro. Thường là việc của CFO, giám đốc rủi ro</td></tr>
<tr><td rowspan="3">Kỹ thuật</td><td><b>Platform</b></td><td>Xây nền tảng cloud lai, quy mô doanh nghiệp, có thể mở rộng</td></tr>
<tr><td><b>Security</b></td><td>Giữ dữ liệu và workload bí mật, toàn vẹn, sẵn sàng: quản lý danh tính và quyền, phát hiện mối đe dọa, ứng phó sự cố. Thường là việc của CISO</td></tr>
<tr><td><b>Operations</b></td><td>Đảm bảo dịch vụ cloud chạy đúng mức kinh doanh cần: quản lý sự cố (incident/problem), vá lỗi (patch), giám sát (observability), quản lý thay đổi và phát hành</td></tr>
</table>
<p>Mẹo nhớ: <b>BPG</b> (Business, People, Governance) là "phía văn phòng"; <b>PSO</b> (Platform, Security, Operations) là "phía kỹ thuật".</p>
<p>AWS CAF cũng nêu <b>4 business outcomes</b> (kết quả kinh doanh) mà cloud mang lại:</p>
<ul>
<li><b>Reduced business risk</b>: giảm rủi ro kinh doanh.</li>
<li><b>Improved ESG performance</b>: cải thiện hiệu quả môi trường, xã hội và quản trị.</li>
<li><b>Increased revenue</b>: tăng doanh thu.</li>
<li><b>Increased operational efficiency</b>: tăng hiệu quả vận hành.</li>
</ul>
<p>Cách nhận diện: phát hiện gian lận nhanh hơn, hệ thống ổn định hơn, bảo mật tốt hơn → <b>reduced business risk</b>. Giảm phát thải carbon → <b>improved ESG performance</b>. Ra sản phẩm mới, tiếp cận khách mới → <b>increased revenue</b>. Giảm chi phí vận hành, làm việc năng suất hơn → <b>increased operational efficiency</b>.</p>
<h4>4 transformation domains và 4 giai đoạn của CAF</h4>
<p>CAF còn mô tả cloud "biến đổi" tổ chức ở 4 <b>transformation domains</b> (lĩnh vực chuyển đổi), xếp theo chuỗi giá trị:</p>
<ul>
<li><b>Technology</b>: chuyển và hiện đại hóa hạ tầng, ứng dụng, dữ liệu.</li>
<li><b>Process</b>: số hóa, tự động hóa, tối ưu quy trình nghiệp vụ, thường dùng dữ liệu, analytics, machine learning.</li>
<li><b>Organization</b>: tổ chức lại cách các nhóm làm việc, quanh sản phẩm và giá trị cho khách hàng.</li>
<li><b>Product</b>: thiết kế lại mô hình kinh doanh, tạo sản phẩm và nguồn doanh thu mới.</li>
</ul>
<p>Hành trình chuyển đổi đi qua 4 <b>phases</b> (giai đoạn), lặp đi lặp lại:</p>
<div class="flow"><span>Envision</span><span>Align</span><span>Launch</span><span>Scale</span></div>
<ul>
<li><b>Envision</b>: xác định cơ hội chuyển đổi gắn với mục tiêu kinh doanh.</li>
<li><b>Align</b>: tìm khoảng trống năng lực theo 6 perspective, thống nhất giữa các bên liên quan, lập kế hoạch.</li>
<li><b>Launch</b>: đưa vài dự án thử (pilot) vào production để chứng minh giá trị từng bước.</li>
<li><b>Scale</b>: mở rộng các pilot ra quy mô lớn, đạt lợi ích kinh doanh mong muốn.</li>
</ul>
<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>Trước khi chuyển hẳn, chị Lan và Minh ngồi lại theo CAF. <i>Business</i>: mục tiêu là bán được nhiều hơn mùa Tết. <i>People</i>: cho nhân viên đi học khóa AWS cơ bản. <i>Governance</i>: đặt ngân sách tháng và cảnh báo chi phí. <i>Platform</i>: thiết kế hệ thống trên AWS. <i>Security</i>: quy định ai được truy cập gì. <i>Operations</i>: ai trực, xử lý sự cố thế nào. Kết quả mong muốn: tăng doanh thu và giảm rủi ro sập web.</p></div>

<h3>Các công cụ migration của AWS</h3>
<p>Ở mức Cloud Practitioner, bạn chỉ cần biết công cụ nào làm việc gì:</p>
<table>
<tr><th>Công cụ</th><th>Làm gì</th><th>Giai đoạn</th></tr>
<tr><td><b>Migration Evaluator</b></td><td>Phân tích hệ thống hiện tại, xây dựng business case và ước tính chi phí khi chuyển lên AWS</td><td>Đánh giá</td></tr>
<tr><td><b>AWS Application Discovery Service</b></td><td>Thu thập thông tin máy chủ on-prem: cấu hình, mức sử dụng, phụ thuộc giữa các máy (lưu ý: từ 7/11/2025 ngừng nhận khách hàng mới, AWS khuyên dùng AWS Transform; đề thi vẫn có thể hỏi theo mô tả này)</td><td>Khảo sát</td></tr>
<tr><td><b>AWS Application Migration Service</b></td><td>Chuyển máy chủ lên AWS theo kiểu rehost (lift and shift), sao chép liên tục để giảm downtime</td><td>Di chuyển máy chủ</td></tr>
<tr><td><b>AWS DMS</b> (Database Migration Service)</td><td>Di chuyển database; database nguồn vẫn hoạt động bình thường trong lúc chuyển; hỗ trợ cùng loại engine (MySQL → MySQL) và khác loại (Oracle → PostgreSQL); sao chép thay đổi liên tục để downtime tối thiểu</td><td>Di chuyển database</td></tr>
<tr><td><b>AWS SCT</b> (Schema Conversion Tool)</td><td>Chuyển đổi cấu trúc (schema) database khi đổi sang loại database khác, ví dụ Oracle sang PostgreSQL</td><td>Di chuyển database</td></tr>
<tr><td><b>AWS Migration Hub</b></td><td>Một nơi duy nhất để theo dõi tiến độ migration qua nhiều công cụ (lưu ý: từ 7/11/2025 dịch vụ ngừng nhận khách hàng mới, AWS khuyên dùng AWS Transform; nhưng đề thi vẫn có thể hỏi theo mô tả này)</td><td>Theo dõi</td></tr>
<tr><td><b>AWS DataSync</b></td><td>Chuyển lượng lớn <i>file</i> qua mạng (internet hoặc Direct Connect) từ file server on-prem (NFS, SMB…) lên S3, EFS, FSx; tự động lên lịch, mã hóa khi truyền, kiểm tra toàn vẹn dữ liệu</td><td>Di chuyển dữ liệu file</td></tr>
</table>
<p>Ngoài công cụ, AWS còn có chương trình <b>AWS Migration Acceleration Program (MAP)</b>: dành cho doanh nghiệp muốn chuyển nhiều workload nhưng thiếu kinh nghiệm. MAP cung cấp phương pháp có cấu trúc, công cụ, chuyên gia từ đối tác (AWS Partners) và đầu tư từ AWS (ví dụ credit) để bù một phần chi phí migration.</p>
<div class="flow"><span>Migration Evaluator</span><span>Application Discovery Service</span><span>Application Migration Service / DMS</span><span>Migration Hub theo dõi</span></div>
<div class="box exam"><b>🎯 Đề thi hay hỏi</b><ul>
<li>"as quickly as possible without changes" → <b>Rehost</b>; "self-managed MySQL → Amazon RDS" → <b>Replatform</b>; "move to SaaS" → <b>Repurchase</b>.</li>
<li>"perspectives of AWS CAF" → Business, People, Governance, Platform, Security, Operations (đáp án nhiễu: Pricing, Networking, Marketing).</li>
<li>"culture, organizational structure, leadership, workforce skills" → <b>People</b>; "enterprise-grade, scalable, hybrid cloud platform" → <b>Platform</b>.</li>
<li>"business outcome of cloud adoption" → ví dụ <b>Reduced business risk</b>; "reduce carbon footprint" → <b>Improved ESG performance</b>.</li>
<li>"program management, benefits, cloud spending, risk" → <b>Governance</b>; "incident, patch, observability, change and release management" → <b>Operations</b>; "identity, threat detection, incident response" → <b>Security</b>.</li>
<li>"digitize and automate business processes, analytics, ML" → transformation domain <b>Process</b>; "deliver pilot initiatives in production" → phase <b>Launch</b>.</li>
<li>"one-time online transfer of many TB of files from NFS/SMB to Amazon S3" → <b>AWS DataSync</b>; "Oracle → Aurora PostgreSQL" → <b>SCT</b> (schema) + <b>DMS</b> (dữ liệu).</li>
<li>"program with methodology, partners, AWS credits for large migrations" → <b>AWS Migration Acceleration Program (MAP)</b>.</li>
<li>"migrate database with minimal downtime, continuous replication" → <b>AWS DMS</b>.</li>
<li>"collect information about on-premises servers, dependencies" → <b>AWS Application Discovery Service</b>; "lift and shift many servers" → <b>AWS Application Migration Service</b>; "track progress of migrations" → <b>AWS Migration Hub</b>.</li>
</ul></div>
<div class="box trap"><b>⚠️ Bẫy hay gặp</b><p><b>Security</b> vừa là một perspective của CAF, vừa là một pillar của Well-Architected: đọc kỹ đề hỏi framework nào. Và nhớ: Rehost không sửa gì; Replatform sửa nhẹ (thường là dùng dịch vụ managed) nhưng giữ kiến trúc; Refactor mới là viết lại. DMS di chuyển dữ liệu, còn SCT chuyển đổi schema khi đổi loại database.</p></div>
`,
    summary: [
      "7R: Rehost (nguyên trạng), Replatform (chỉnh nhẹ), Refactor (viết lại), Repurchase (đổi sang SaaS), Retire (tắt), Retain (giữ lại), Relocate (dời hạ tầng VMware).",
      "AWS CAF có 6 perspective: Business, People, Governance (kinh doanh) và Platform, Security, Operations (kỹ thuật).",
      "4 business outcome: reduced business risk, improved ESG performance, increased revenue, increased operational efficiency.",
      "CAF: 4 transformation domains (Technology, Process, Organization, Product); 4 phases (Envision, Align, Launch, Scale).",
      "Migration Evaluator: business case; Application Discovery Service: khảo sát máy chủ; Migration Hub: theo dõi tiến độ.",
      "Application Migration Service: rehost máy chủ; DMS: chuyển database ít downtime; SCT: chuyển schema; DataSync: chuyển file qua mạng; MAP: chương trình hỗ trợ migration lớn."
    ],
    terms: [
      ["Migration", "di chuyển lên cloud"],
      ["Rehost (lift and shift)", "chuyển nguyên trạng"],
      ["Replatform", "chuyển kèm tối ưu nhẹ"],
      ["Refactor / Re-architect", "tái cấu trúc, viết lại"],
      ["Repurchase", "mua sản phẩm mới thay thế"],
      ["Retire", "ngừng sử dụng"],
      ["Retain", "giữ lại"],
      ["Relocate", "dời hạ tầng"],
      ["AWS CAF (Cloud Adoption Framework)", "khung áp dụng cloud của AWS"],
      ["Perspective", "góc nhìn"],
      ["Business outcome", "kết quả kinh doanh"],
      ["ESG", "môi trường, xã hội và quản trị"],
      ["Schema", "cấu trúc dữ liệu"],
      ["Downtime", "thời gian ngừng hoạt động"],
      ["Business case", "phân tích lợi ích đầu tư"],
      ["Transformation domain", "lĩnh vực chuyển đổi"],
      ["Pilot", "dự án thử nghiệm"]
    ],
    qids: ["d1-3", "d1-8", "d1-9", "d1-5", "d1-15", "d1-21", "d1-23", "d3-38", "d3-39", "d3-40"]
  }
);
