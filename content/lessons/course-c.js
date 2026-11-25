(window.CLF.course = window.CLF.course || []).push(
  // ───────────────────────── 3-1 ─────────────────────────
  {
    id: "3-1",
    module: 3,
    title: "Hạ tầng toàn cầu: Region, Availability Zone, Edge location",
    mins: 14,
    goals: [
      "Hiểu Region, Availability Zone (AZ) và Edge location là gì, chúng lồng vào nhau ra sao",
      "Biết 4 yếu tố để chọn Region: tuân thủ, độ trễ, dịch vụ có sẵn, giá",
      "Phân biệt khi nào dùng nhiều AZ (high availability) và khi nào dùng nhiều Region (disaster recovery, độ trễ thấp, chủ quyền dữ liệu)",
      "Nhận ra Local Zones và AWS Outposts trong đề thi"
    ],
    html: `
<h3>Trước hết: "đám mây" thật ra nằm ở đâu?</h3>
<p>Nghe chữ "cloud" (đám mây), nhiều người tưởng dữ liệu bay lơ lửng đâu đó. Thật ra, mọi thứ trên AWS đều chạy trên những chiếc máy tính thật, đặt trong những tòa nhà thật gọi là <b>data center</b> (trung tâm dữ liệu).</p>
<p>Một data center là một tòa nhà chứa hàng nghìn máy chủ, có điện dự phòng, máy làm mát, đường mạng tốc độ cao và bảo vệ nghiêm ngặt. Bạn không bao giờ được vào đó. Bạn chỉ "thuê" một phần sức mạnh của các máy chủ ấy qua internet.</p>
<p>AWS có data center ở rất nhiều nơi trên thế giới. Để dễ quản lý, AWS chia hạ tầng này thành ba tầng: <b>Region</b>, <b>Availability Zone</b> và <b>Edge location</b>. Hiểu ba tầng này là nền móng cho gần như mọi câu hỏi về "độ sẵn sàng" trong đề thi.</p>

<div class="box idea"><b>🧠 Hiểu đơn giản</b>
<p>Hãy tưởng tượng một chuỗi siêu thị lớn. <b>Region</b> giống một thành phố mà chuỗi có mặt (Hà Nội, Tokyo, Singapore…). <b>Availability Zone</b> giống từng kho hàng riêng biệt trong thành phố đó, cách nhau vài chục km, mỗi kho có nguồn điện riêng. <b>Edge location</b> giống những cửa hàng tiện lợi nhỏ ở đầu ngõ: không chứa hết hàng, nhưng để sẵn những món hay mua nhất cho khách lấy nhanh.</p>
</div>

<h3>Region và Availability Zone</h3>
<p><b>Region</b> (vùng) là một khu vực địa lý riêng biệt trên thế giới, ví dụ Asia Pacific (Singapore), Asia Pacific (Tokyo), US East (N. Virginia). Mỗi Region có tên mã, ví dụ <code>ap-southeast-1</code> là Singapore. Các Region độc lập với nhau: dữ liệu của bạn ở Region nào thì nằm yên ở Region đó, trừ khi chính bạn chủ động sao chép sang nơi khác.</p>
<p>Bên trong mỗi Region có nhiều <b>Availability Zone</b> (AZ, vùng sẵn sàng). Một AZ là <b>một hoặc nhiều data center tách biệt</b>, có nguồn điện, hệ thống mạng và kết nối dự phòng riêng. Thông thường một Region có <b>ít nhất 3 AZ</b>.</p>
<p>Điểm mấu chốt: các AZ trong cùng Region nằm cách nhau đủ xa để một sự cố (cháy, lụt, mất điện khu vực) ở AZ này không kéo theo AZ kia. Nói theo ngôn ngữ đề thi: các AZ <b>không dùng chung single point of failure</b> (điểm hỏng duy nhất). Đồng thời chúng vẫn đủ gần và nối với nhau bằng mạng tốc độ cao, độ trễ thấp, nên ứng dụng có thể chạy song song ở nhiều AZ một cách mượt mà.</p>

<div class="flow"><span>Hạ tầng toàn cầu AWS</span><span>Region (vd: Singapore)</span><span>Nhiều AZ (thường ≥ 3)</span><span>Mỗi AZ = 1 hoặc nhiều data center</span></div>

<h4>Multi-AZ: chống sự cố trong một Region</h4>
<p>Nếu bạn chỉ chạy ứng dụng trên một máy chủ ở một AZ, khi AZ đó gặp sự cố thì ứng dụng "chết" theo. Cách làm chuẩn là đặt các bản sao ứng dụng ở <b>ít nhất 2 AZ</b>. Một AZ hỏng, AZ còn lại vẫn phục vụ khách. Đây chính là <b>high availability</b> (tính sẵn sàng cao).</p>

<h4>Multi-Region: khi một Region là chưa đủ</h4>
<p>Có những lý do để dùng <b>nhiều Region</b>:</p>
<ul>
<li><b>Disaster recovery</b> (khôi phục sau thảm họa) và <b>business continuity</b> (kinh doanh liên tục): phòng khi cả một Region gặp sự cố lớn.</li>
<li><b>Low latency</b> (độ trễ thấp) cho khách ở nhiều châu lục: mỗi nhóm khách dùng Region gần mình.</li>
<li><b>Data sovereignty</b> (chủ quyền dữ liệu): luật một số nước yêu cầu dữ liệu công dân phải lưu trong nước hoặc trong khu vực, nên bạn cần Region tương ứng.</li>
</ul>

<div class="box example"><b>🍰 Ví dụ: BánhNgon</b>
<p>Lúc đầu, website BánhNgon chạy trên một máy tính trong kho tiệm. Một lần kho bị cúp điện cả buổi chiều, đơn hàng online mất trắng. Chị Lan rất tiếc.</p>
<p>Khi chuyển lên AWS, Minh chọn Region Singapore (gần Việt Nam). Cậu chạy website trên 2 máy chủ ảo đặt ở 2 AZ khác nhau. Nếu một AZ mất điện, AZ kia vẫn nhận đơn. Đó là multi-AZ.</p>
<p>Vài năm sau, BánhNgon mở chi nhánh ở Nhật Bản. Khách Nhật truy cập Singapore thấy hơi chậm, và đối tác Nhật muốn dữ liệu khách Nhật lưu tại Nhật. Minh triển khai thêm một bản ở Region Tokyo. Đó là multi-Region: vừa giảm độ trễ, vừa đáp ứng yêu cầu dữ liệu, vừa có một "bản dự phòng" ở khu vực khác.</p>
</div>

<h3>Chọn Region như thế nào?</h3>
<p>Đề thi rất thích hỏi "yếu tố nào cần cân nhắc khi chọn Region". Hãy nhớ 4 yếu tố:</p>
<table>
<tr><th>Yếu tố (tiếng Anh trong đề)</th><th>Ý nghĩa</th><th>Ví dụ</th></tr>
<tr><td><b>Compliance</b> / data sovereignty</td><td>Luật pháp, quy định về nơi lưu dữ liệu</td><td>Dữ liệu khách Nhật phải ở Nhật → chọn Tokyo</td></tr>
<tr><td><b>Proximity to customers</b> (latency)</td><td>Càng gần khách, phản hồi càng nhanh</td><td>Khách chủ yếu ở Đông Nam Á → Singapore</td></tr>
<tr><td><b>Service availability</b></td><td>Không phải Region nào cũng có đủ mọi dịch vụ, nhất là dịch vụ mới</td><td>Cần một dịch vụ AI mới → kiểm tra Region đó đã có chưa</td></tr>
<tr><td><b>Pricing</b></td><td>Giá cùng một dịch vụ khác nhau giữa các Region</td><td>Một số Region rẻ hơn Region khác</td></tr>
</table>
<p>Thứ tự ưu tiên thường là: tuân thủ luật trước (bắt buộc), rồi mới đến độ trễ, dịch vụ và giá.</p>

<div class="box trap"><b>⚠️ Bẫy hay gặp</b>
<p>Đáp án nhiễu kiểu "chọn Region gần trụ sở của AWS", "chọn Region có nhiều AZ nhất", hay "chọn Region có nhiều edge location nhất" đều <b>không phải</b> tiêu chí chuẩn. Và nhớ: AZ là <b>một hoặc nhiều</b> data center, không phải "đúng một data center", cũng không phải "một Region nhỏ".</p>
</div>

<h3>Edge location: những "trạm tiếp tế" gần người dùng</h3>
<p>Ngoài Region và AZ, AWS còn có rất nhiều <b>edge location</b> (điểm biên) đặt ở các thành phố lớn khắp thế giới, số lượng nhiều hơn hẳn Region. Edge location không dùng để chạy toàn bộ ứng dụng của bạn. Nhiệm vụ chính của nó là <b>đưa nội dung đến gần người dùng</b>.</p>
<p>Dịch vụ tiêu biểu dùng edge location là <b>Amazon CloudFront</b> (mạng phân phối nội dung, CDN). CloudFront lưu tạm (<b>cache</b>) các file như ảnh, video, trang web tại edge location. Khách ở Đà Nẵng mở ảnh bánh kem sẽ nhận ảnh từ edge location gần nhất, thay vì phải kéo từ Singapore. Ngoài ra <b>Amazon Route 53</b> (dịch vụ DNS) và <b>AWS Global Accelerator</b> cũng tận dụng mạng edge.</p>
<div class="flow"><span>Khách ở Đà Nẵng</span><span>Edge location gần nhất (CloudFront cache)</span><span>Nếu chưa có: lấy từ Region Singapore</span></div>

<h3>Local Zones và AWS Outposts</h3>
<p>Đôi khi khách hàng cần độ trễ cực thấp nhưng lại ở xa Region. AWS có thêm hai lựa chọn:</p>
<ul>
<li><b>AWS Local Zones</b>: AWS đặt một phần hạ tầng (máy chủ, lưu trữ…) ngay tại một thành phố lớn, gần người dùng cuối hơn Region. Phù hợp với game online, chỉnh sửa video trực tiếp… cần độ trễ chỉ vài mili-giây.</li>
<li><b>AWS Outposts</b>: AWS mang chính phần cứng của mình (dạng tủ rack) <b>đặt vào data center của bạn</b>. Bạn dùng dịch vụ AWS ngay tại chỗ, phù hợp khi dữ liệu phải ở lại nơi bạn (on-premises) hoặc cần độ trễ cực thấp tới hệ thống nội bộ. Đây là một kiểu <b>hybrid</b> (lai).</li>
</ul>
<p>Ngoài ra còn <b>AWS Wavelength Zones</b> (Exam Guide CLF-C02 xếp Wavelength vào nhóm <i>ngoài phạm vi thi</i>, chỉ cần biết để không nhầm với Local Zones): hạ tầng AWS đặt bên trong mạng <b>5G</b> của nhà mạng viễn thông, cho ứng dụng di động cần độ trễ cực thấp (xe tự hành, game trên điện thoại…).</p>
<table>
<tr><th>Lựa chọn</th><th>Đặt ở đâu</th><th>Ai lo phần cứng</th><th>Khi nào chọn</th></tr>
<tr><td><b>Region / AZ</b></td><td>Data center của AWS</td><td>AWS</td><td>Mặc định cho hầu hết ứng dụng</td></tr>
<tr><td><b>Local Zones</b></td><td>Thành phố lớn chưa có Region</td><td>AWS</td><td>Cần độ trễ vài ms tới người dùng ở thành phố đó, không muốn tự quản lý phần cứng</td></tr>
<tr><td><b>Wavelength Zones</b></td><td>Trong mạng 5G của nhà mạng</td><td>AWS</td><td>Ứng dụng di động 5G cần độ trễ cực thấp</td></tr>
<tr><td><b>Outposts</b></td><td>Data center / tòa nhà của chính bạn</td><td>AWS cung cấp và bảo trì; bạn lo chỗ đặt, điện, mạng</td><td>Dữ liệu phải ở lại tại chỗ, hoặc cần độ trễ thấp tới hệ thống on-premises, nhưng vẫn muốn cùng API, công cụ và dịch vụ AWS (EC2, EBS…)</td></tr>
</table>

<div class="box trap"><b>⚠️ Bẫy hay gặp</b>
<p>Nhiều AZ hay nhiều Region? Nếu yêu cầu chỉ là "chịu được hỏng <b>một data center / một AZ</b>" thì <b>multi-AZ trong cùng Region</b> là đủ và <b>rẻ nhất</b>. Chỉ khi đề nói "cả Region không dùng được" (entire Region unavailable) mới cần thêm Region thứ hai (sao chép dữ liệu và chuẩn bị tài nguyên khôi phục ở đó). Còn khi đã thỏa luật và độ trễ, hai Region còn khác nhau ở <b>giá</b> và <b>dịch vụ/tính năng có sẵn</b>, đó là hai thứ cần so sánh tiếp.</p>
</div>

<div class="box exam"><b>🎯 Đề thi hay hỏi</b>
<ul>
<li>"one or more discrete data centers with redundant power, networking" → <b>Availability Zone</b></li>
<li>"keep running if one Availability Zone fails" / "do not share single points of failure" → <b>deploy across multiple AZs</b> (high availability)</li>
<li>"an entire Region becomes unavailable", "disaster recovery", "data must stay in a country" → <b>multiple Regions</b></li>
<li>"factors when choosing a Region" → <b>compliance / data sovereignty, proximity (latency), service availability, pricing</b></li>
<li>"cache content closer to users" → <b>edge locations</b> + <b>Amazon CloudFront</b></li>
<li>"run AWS infrastructure in its own data center", "same AWS APIs and tools on premises" → <b>AWS Outposts</b>; "low latency in a metropolitan area with no Region, no hardware to manage" → <b>AWS Local Zones</b>; "5G", "mobile edge" → AWS Wavelength (<i>Wavelength nằm trong danh sách ngoài phạm vi đề CLF-C02, chỉ cần nhận ra để loại nhiễu</i>)</li>
<li>"which services use edge locations" → <b>Amazon CloudFront</b>, <b>Amazon Route 53</b> (và Global Accelerator)</li>
<li>"data must stay in a country" → chọn <b>Region đặt tại nước đó</b>; AWS không tự chuyển dữ liệu ra khỏi Region bạn chọn</li>
<li>"remain available if an AZ fails" → EC2 ở <b>ít nhất 2 AZ</b> + <b>Elastic Load Balancer</b> chia tải (bài 3-5)</li>
</ul>
</div>
`,
    summary: [
      "Region = khu vực địa lý độc lập; dữ liệu không tự rời Region nếu bạn không sao chép.",
      "Availability Zone = một hoặc nhiều data center tách biệt trong Region; một Region thường có ít nhất 3 AZ, không dùng chung điểm hỏng.",
      "Multi-AZ → high availability; multi-Region → disaster recovery, độ trễ thấp toàn cầu, chủ quyền dữ liệu.",
      "Chọn Region theo 4 yếu tố: compliance, độ gần khách hàng (latency), dịch vụ có sẵn, giá.",
      "Edge location dùng cho CloudFront (cache nội dung), Route 53, Global Accelerator; số lượng nhiều hơn Region.",
      "Local Zones đưa hạ tầng gần thành phố lớn; Wavelength Zones nằm trong mạng 5G; Outposts đưa hạ tầng AWS vào data center của bạn.",
      "Chỉ cần chịu lỗi một AZ → multi-AZ (rẻ hơn); phải chịu được mất cả Region → thêm Region thứ hai."
    ],
    terms: [
      ["Data center", "trung tâm dữ liệu"],
      ["Region", "vùng địa lý của AWS"],
      ["Availability Zone (AZ)", "vùng sẵn sàng, một hoặc nhiều data center tách biệt"],
      ["Edge location", "điểm biên, gần người dùng, dùng để cache nội dung"],
      ["High availability", "tính sẵn sàng cao"],
      ["Single point of failure", "điểm hỏng duy nhất"],
      ["Disaster recovery", "khôi phục sau thảm họa"],
      ["Business continuity", "kinh doanh liên tục"],
      ["Latency", "độ trễ"],
      ["Data sovereignty", "chủ quyền dữ liệu"],
      ["Compliance", "tuân thủ quy định"],
      ["Cache", "bộ nhớ đệm, lưu tạm để lấy nhanh"],
      ["AWS Local Zones", "hạ tầng AWS đặt gần thành phố lớn"],
      ["AWS Outposts", "hạ tầng AWS đặt tại data center của khách"],
      ["AWS Wavelength Zones", "hạ tầng AWS đặt trong mạng 5G của nhà mạng"]
    ],
    qids: ["d3-1", "d3-10", "d3-21", "d3-27", "d3-28", "d1-16", "d3-5", "d3-25", "d3-80"]
  },

  // ───────────────────────── 3-2 ─────────────────────────
  {
    id: "3-2",
    module: 3,
    title: "Cách làm việc với AWS: Console, CLI, SDK, Infrastructure as Code",
    mins: 13,
    goals: [
      "Biết ba cách cơ bản để ra lệnh cho AWS: Management Console, AWS CLI, AWS SDK, và tất cả đều đi qua API",
      "Phân biệt thao tác làm một lần và quy trình cần lặp lại",
      "Hiểu Infrastructure as Code với AWS CloudFormation, và Elastic Beanstalk là PaaS",
      "Ôn lại ba mô hình triển khai (cloud, hybrid, on-premises) và biết AWS Systems Manager dùng để làm gì"
    ],
    html: `
<h3>API: "cửa sổ gọi món" phía sau mọi thứ</h3>
<p>Trước khi nói về công cụ, cần hiểu một khái niệm gốc: <b>API</b> (Application Programming Interface, giao diện lập trình ứng dụng). API là một bộ "câu lệnh chuẩn" mà một hệ thống mở ra để hệ thống khác gọi vào và yêu cầu làm việc.</p>
<p>Với AWS, mọi hành động như "tạo một máy chủ", "xóa một file", "xem hóa đơn" đều là một lời gọi API gửi tới AWS. Dù bạn bấm chuột trên web hay gõ lệnh, cuối cùng đều thành lời gọi API.</p>

<div class="box idea"><b>🧠 Hiểu đơn giản</b>
<p>API giống quầy gọi món ở quán ăn. Bếp (AWS) chỉ nhận order qua quầy. Bạn có thể gọi món bằng cách chỉ tay vào hình trên menu (Console), đọc to tên món theo đúng mẫu (CLI), hay để một ứng dụng giao đồ ăn tự gửi order (SDK). Cách gọi khác nhau, nhưng tất cả đều đi qua cùng một quầy.</p>
</div>

<h3>Ba cách ra lệnh cho AWS</h3>
<h4>1. AWS Management Console</h4>
<p><b>AWS Management Console</b> (bảng điều khiển web) là trang web bạn đăng nhập để bấm chuột, xem biểu đồ, tạo dịch vụ. Dễ dùng nhất cho người mới, rất hợp để khám phá, học, hoặc làm những việc <b>một lần</b>, ví dụ xem cấu hình một bucket S3 trong lúc điều tra sự cố.</p>
<p>Ngoài bản web còn có <b>AWS Console Mobile Application</b> (ứng dụng di động trên iOS/Android). Khi không có laptop bên cạnh, người trực sự cố có thể dùng điện thoại để xem <b>CloudWatch alarm</b> (cảnh báo), sự kiện <b>AWS Health</b>, tình trạng tài nguyên, chi phí, và thực hiện một số thao tác nhẹ. Nó không thay thế được bản web cho việc cấu hình phức tạp.</p>
<h4>2. AWS CLI</h4>
<p><b>AWS CLI</b> (Command Line Interface, giao diện dòng lệnh) là công cụ cài trên máy tính, cho phép gõ lệnh dạng chữ để điều khiển AWS. Ví dụ một dòng lệnh để liệt kê các "thùng" lưu trữ S3: <code>aws s3 ls</code>.</p>
<p>Ưu điểm: có thể ghép nhiều lệnh thành <b>script</b> (kịch bản, ví dụ shell script trên Linux) để chạy tự động, lặp lại nhiều lần, hẹn giờ chạy mỗi tối, mà <b>không cần biết lập trình</b> bằng một ngôn ngữ như Python hay Java. Ngoài ra có <b>AWS CloudShell</b>: một cửa sổ dòng lệnh mở ngay trong trình duyệt, có sẵn CLI, không cần cài đặt (<i>CloudShell nằm trong danh sách ngoài phạm vi đề CLF-C02, biết để dùng khi thực hành</i>).</p>
<h4>3. AWS SDK</h4>
<p><b>AWS SDK</b> (Software Development Kit, bộ công cụ phát triển phần mềm) là thư viện cho các ngôn ngữ lập trình như Python, Java, JavaScript, .NET, Go… Lập trình viên dùng SDK để <b>trong chính code của ứng dụng</b> gọi tới AWS. Ví dụ: app đặt bánh, khi khách tải ảnh lên, code dùng SDK để lưu ảnh vào S3.</p>
<p>Vì sao không tự gửi lời gọi API qua HTTPS cho nhanh? Vì mỗi lời gọi API phải được <b>ký</b> (request signing) bằng thông tin xác thực, phải xử lý lỗi và <b>tự thử lại</b> (retry) khi mạng chập chờn. SDK làm sẵn những việc đó, lập trình viên chỉ cần gọi hàm.</p>

<table>
<tr><th>Công cụ</th><th>Dùng như thế nào</th><th>Hợp nhất khi</th></tr>
<tr><td>Management Console</td><td>Bấm chuột trên web</td><td>Học, khám phá, thao tác một lần, xem trực quan</td></tr>
<tr><td>AWS CLI</td><td>Gõ lệnh, viết script</td><td>Tự động hóa việc quản trị, thao tác lặp lại</td></tr>
<tr><td>AWS SDK</td><td>Gọi từ code ứng dụng</td><td>Ứng dụng cần tương tác với dịch vụ AWS</td></tr>
</table>

<h3>Làm một lần hay lặp đi lặp lại?</h3>
<p>Một tư duy quan trọng trong đề thi: <b>one-time operation</b> (thao tác một lần) thì Console là đủ. Nhưng khi một việc phải làm <b>nhiều lần, giống hệt nhau, ở nhiều nơi</b> (repeatable process), bấm chuột vừa chậm vừa dễ sai. Lúc đó nên tự động hóa bằng script hoặc tốt hơn nữa là Infrastructure as Code.</p>

<h3>Infrastructure as Code với AWS CloudFormation</h3>
<p><b>Infrastructure as Code</b> (IaC, hạ tầng dưới dạng mã) nghĩa là mô tả toàn bộ hạ tầng (máy chủ, mạng, cơ sở dữ liệu, quyền…) trong một file văn bản. Sau đó một công cụ đọc file và tự tạo đúng y như mô tả.</p>
<p>Dịch vụ IaC chính của AWS là <b>AWS CloudFormation</b>. Bạn viết một <b>template</b> (bản mẫu) bằng định dạng JSON hoặc YAML. CloudFormation đọc template và tạo ra một nhóm tài nguyên gọi là <b>stack</b>. Muốn xóa thì xóa stack, mọi tài nguyên trong đó được dọn theo. Cần lại thì tạo stack mới từ <b>cùng template</b>, được môi trường y hệt. Cùng một template có thể triển khai thành stack ở nhiều Region, nhiều tài khoản.</p>
<p>Nếu không muốn viết JSON/YAML, lập trình viên có thể dùng <b>AWS CDK</b> (Cloud Development Kit): mô tả hạ tầng bằng ngôn ngữ lập trình quen thuộc (Python, TypeScript…), CDK chuyển thành template CloudFormation.</p>

<div class="box idea"><b>🧠 Hiểu đơn giản</b>
<p>Template giống <b>công thức làm bánh</b> ghi rõ: 200g bột, 3 quả trứng, nướng 180 độ trong 25 phút. Ai cầm công thức cũng làm ra chiếc bánh giống hệt. Muốn làm 10 mẻ ở 10 chi nhánh? Cứ đưa cùng một công thức. Muốn sửa? Sửa công thức rồi làm lại, và công thức cũ được lưu lại để so sánh.</p>
</div>

<p>Lợi ích của IaC:</p>
<ul>
<li><b>Lặp lại được, nhất quán</b>: tạo môi trường thử nghiệm và môi trường thật giống hệt nhau.</li>
<li><b>Nhanh</b>: dựng cả hệ thống trong vài phút thay vì bấm chuột cả ngày.</li>
<li><b>Ít lỗi người</b>: không quên bước nào.</li>
<li><b>Quản lý phiên bản</b>: template là file, có thể lưu lịch sử thay đổi như code.</li>
</ul>
<p>Bản thân CloudFormation không tính thêm phí cho tài nguyên AWS thông thường; bạn trả tiền cho các tài nguyên mà nó tạo ra. Đây cũng chính là nguyên tắc "perform operations as code" trong trụ cột Operational Excellence của Well-Architected Framework.</p>

<div class="box example"><b>🍰 Ví dụ: BánhNgon</b>
<p>Khi BánhNgon chỉ có một website, Minh tạo mọi thứ bằng Console. Đến lúc mở chi nhánh TP.HCM rồi Nhật Bản, Minh cần dựng lại gần như y hệt hệ thống ở chỗ mới. Cậu viết một template CloudFormation mô tả: mạng, 2 máy chủ ở 2 AZ, bộ cân bằng tải, cơ sở dữ liệu. Ở Tokyo, Minh chỉ cần chạy template đó và đổi vài tham số. Trong code app đặt hàng, đồng nghiệp của Minh dùng SDK cho Python để lưu ảnh bánh khách đặt riêng vào S3.</p>
</div>

<h3>AWS Elastic Beanstalk: chỉ cần đưa code</h3>
<p>Không phải ai cũng muốn tự lo máy chủ, cân bằng tải, tự co giãn. <b>AWS Elastic Beanstalk</b> là dịch vụ kiểu <b>PaaS</b> (Platform as a Service, nền tảng như một dịch vụ): bạn chỉ việc tải code lên (Java, .NET, PHP, Node.js, Python, Ruby, Go, Docker…), Beanstalk tự lo triển khai, cấp máy chủ, cân bằng tải, co giãn và theo dõi sức khỏe ứng dụng. Bạn vẫn có thể xem và chỉnh các tài nguyên bên dưới nếu muốn. Beanstalk không tính thêm phí, bạn trả cho tài nguyên nó dùng.</p>

<div class="box trap"><b>⚠️ Bẫy hay gặp</b>
<p><b>CloudFormation</b> = "provision resources using templates", "repeatable", "infrastructure as code". <b>Elastic Beanstalk</b> = "upload code, AWS handles deployment, capacity, load balancing, scaling". Hai dịch vụ đều tự động hóa, nhưng CloudFormation mô tả hạ tầng, còn Beanstalk tập trung vào việc chạy ứng dụng web từ code.</p>
</div>

<h3>Mô hình triển khai và AWS Systems Manager</h3>
<p>Nhắc lại ba <b>deployment model</b> (mô hình triển khai) đã học ở Domain 1:</p>
<ul>
<li><b>Cloud</b> (toàn bộ trên đám mây): mọi thứ chạy trên AWS.</li>
<li><b>Hybrid</b> (lai): một phần ở data center của mình (on-premises), một phần trên AWS, kết nối với nhau.</li>
<li><b>On-premises</b> (tại chỗ, còn gọi là private cloud): mọi thứ ở hạ tầng riêng của công ty.</li>
</ul>
<p>Khi có cả máy chủ trên AWS lẫn máy chủ tại chỗ, việc quản lý trở nên rối. <b>AWS Systems Manager</b> giúp xem và điều hành cả "đội" máy chủ (EC2 và cả máy chủ on-premises) từ một nơi: cập nhật bản vá (patch) hàng loạt, chạy lệnh trên nhiều máy cùng lúc, đăng nhập vào máy chủ an toàn mà không cần mở cổng SSH (Session Manager), lưu cấu hình và tham số (Parameter Store).</p>

<div class="box exam"><b>🎯 Đề thi hay hỏi</b>
<ul>
<li>"interact with AWS services from application code (Python, Java…)" → <b>AWS SDK</b></li>
<li>"manage AWS services from a terminal / shell script / scheduled job, no programming language" → <b>AWS CLI</b></li>
<li>"web-based interface", "one-time task, visual interface" → <b>AWS Management Console</b></li>
<li>"check alarms, AWS Health events, resource status from a smartphone" → <b>AWS Console Mobile Application</b></li>
<li>Console, CLI, SDK giống nhau ở chỗ nào? → đều <b>gọi AWS service API</b>; SDK có cho nhiều ngôn ngữ và tự lo <b>ký request, retry, xử lý lỗi</b></li>
<li>"remove all resources and later rebuild exactly, least effort" → <b>xóa CloudFormation stack, sau đó tạo lại từ template</b></li>
<li>"provision resources in a repeatable way by using templates", "infrastructure as code" → <b>AWS CloudFormation</b></li>
<li>"upload code, AWS handles deployment, capacity provisioning, load balancing, auto scaling" → <b>AWS Elastic Beanstalk</b></li>
<li>"connects on-premises infrastructure with cloud resources" → <b>hybrid deployment</b></li>
<li>"patch and manage a fleet of EC2 and on-premises servers" → <b>AWS Systems Manager</b></li>
</ul>
</div>
`,
    summary: [
      "Mọi thao tác với AWS cuối cùng đều là lời gọi API.",
      "Console = bấm chuột trên web (có cả Console Mobile Application cho điện thoại); CLI = gõ lệnh, viết script; SDK = gọi AWS từ code ứng dụng, tự lo ký request và retry.",
      "Việc một lần dùng Console; việc lặp lại nên tự động hóa.",
      "CloudFormation = Infrastructure as Code: template (JSON/YAML) tạo ra stack tài nguyên, lặp lại được và nhất quán.",
      "Elastic Beanstalk = PaaS: tải code lên, AWS lo triển khai, co giãn, cân bằng tải.",
      "Ba mô hình triển khai: cloud, hybrid, on-premises; Systems Manager quản lý cả máy chủ AWS và on-premises."
    ],
    terms: [
      ["API (Application Programming Interface)", "giao diện lập trình ứng dụng"],
      ["AWS Management Console", "bảng điều khiển web của AWS"],
      ["AWS Console Mobile Application", "ứng dụng di động để xem và quản lý nhanh tài nguyên"],
      ["AWS CLI (Command Line Interface)", "công cụ dòng lệnh"],
      ["AWS SDK (Software Development Kit)", "bộ thư viện để gọi AWS từ code"],
      ["Script", "kịch bản lệnh tự động"],
      ["Infrastructure as Code (IaC)", "hạ tầng dưới dạng mã"],
      ["Template", "bản mẫu mô tả hạ tầng"],
      ["Stack", "nhóm tài nguyên do CloudFormation tạo"],
      ["PaaS (Platform as a Service)", "nền tảng như một dịch vụ"],
      ["Repeatable process", "quy trình lặp lại được"],
      ["Deployment model", "mô hình triển khai"],
      ["Hybrid", "mô hình lai (on-premises + cloud)"],
      ["On-premises", "tại chỗ, hạ tầng riêng của công ty"],
      ["Patch", "bản vá phần mềm"]
    ],
    qids: ["d3-18", "d3-19", "d3-24", "d1-12", "d1-7"]
  },

  // ───────────────────────── 3-3 ─────────────────────────
  {
    id: "3-3",
    module: 3,
    title: "Amazon EC2: máy chủ ảo",
    mins: 14,
    goals: [
      "Hiểu server, máy ảo (virtual machine) là gì và EC2 cung cấp điều gì",
      "Biết AMI dùng để làm gì và cách chọn instance type theo 5 nhóm",
      "Phân biệt ổ EBS gốc và instance store, hiểu security group gắn với instance",
      "Biết Amazon Lightsail là lựa chọn đơn giản hơn EC2"
    ],
    html: `
<h3>Server và máy ảo là gì?</h3>
<p><b>Server</b> (máy chủ) là một chiếc máy tính chuyên để "phục vụ" máy khác: chứa website, xử lý đơn hàng, trả dữ liệu khi có người hỏi. Về bản chất nó cũng có CPU (bộ xử lý), RAM (bộ nhớ), ổ đĩa và card mạng như máy tính của bạn, chỉ là mạnh hơn và chạy cả ngày lẫn đêm.</p>
<p>Một máy chủ vật lý thường rất mạnh, dùng cho một việc thì lãng phí. Vì vậy người ta dùng phần mềm <b>hypervisor</b> để chia một máy vật lý thành nhiều <b>virtual machine</b> (VM, máy ảo). Mỗi máy ảo có hệ điều hành riêng, ổ đĩa riêng, hoạt động như một máy tính độc lập.</p>

<div class="box idea"><b>🧠 Hiểu đơn giản</b>
<p>Máy chủ vật lý giống một tòa chung cư. Hypervisor giống việc chia tòa nhà thành nhiều căn hộ. Mỗi căn hộ (máy ảo) có cửa khóa riêng, điện nước riêng, người ở căn này không vào được căn kia. Thuê EC2 giống thuê một căn hộ: bạn chọn diện tích, dọn vào ở ngay, không phải xây nhà.</p>
</div>

<h3>Amazon EC2 là gì?</h3>
<p><b>Amazon EC2</b> (Elastic Compute Cloud) cho bạn thuê máy chủ ảo trên AWS. Mỗi máy ảo gọi là một <b>instance</b>. Bạn có thể tạo instance trong vài phút, chạy bao lâu tùy ý, rồi dừng (stop) hoặc xóa hẳn (terminate) khi không cần nữa và chỉ trả tiền cho thời gian dùng. Lưu ý: instance đã <b>stop</b> thì không tính tiền compute nữa, nhưng ổ <b>EBS</b> gắn kèm vẫn bị tính phí lưu trữ cho tới khi bạn xóa nó.</p>
<p>EC2 là ví dụ điển hình của <b>IaaS</b> (Infrastructure as a Service). AWS lo phần cứng, điện, mạng, tòa nhà. Bạn lo mọi thứ từ hệ điều hành trở lên: cài phần mềm, vá lỗi hệ điều hành, cấu hình tường lửa, bảo vệ dữ liệu. Đó là phần của khách hàng trong mô hình trách nhiệm chia sẻ.</p>
<p>Các bước tạo một instance, nói gọn:</p>
<div class="flow"><span>Chọn AMI</span><span>Chọn instance type</span><span>Chọn mạng + security group</span><span>Gắn ổ đĩa</span><span>Launch</span></div>

<h3>AMI: "bản cài đặt sẵn"</h3>
<p><b>AMI</b> (Amazon Machine Image) là khuôn mẫu để tạo instance: gồm hệ điều hành (Amazon Linux, Ubuntu, Windows Server…) và có thể kèm sẵn phần mềm, cấu hình. Từ một AMI, bạn tạo được bao nhiêu instance giống hệt cũng được.</p>
<p>AMI có ba nguồn: do AWS cung cấp, mua/lấy trên <b>AWS Marketplace</b> (của các hãng phần mềm), hoặc <b>tự tạo</b> từ một instance bạn đã cài đặt xong.</p>

<div class="box example"><b>🍰 Ví dụ: BánhNgon</b>
<p>Minh tạo một instance Amazon Linux, cài phần mềm web và code website BánhNgon, chỉnh cho chạy ổn. Sau đó cậu tạo một AMI riêng từ instance này, đặt tên "banhngon-web-v1". Mỗi khi cần thêm máy chủ (mùa Trung thu, Black Friday), chỉ cần launch từ AMI đó là có ngay máy chủ đã cài sẵn mọi thứ, không phải cài lại từ đầu.</p>
</div>

<h3>Instance type: chọn "cấu hình" máy</h3>
<p><b>Instance type</b> quyết định máy ảo mạnh cỡ nào: bao nhiêu vCPU, bao nhiêu RAM, mạng nhanh ra sao. Tên có dạng như <code>t3.micro</code> hay <code>m5.large</code>: chữ cái đầu là họ (family), số là thế hệ, phần sau dấu chấm là kích cỡ. Bạn không cần thuộc tên, nhưng phải nhớ <b>5 nhóm</b> và việc mỗi nhóm giỏi:</p>
<table>
<tr><th>Nhóm</th><th>Ví dụ họ</th><th>Mạnh về</th><th>Dùng cho</th></tr>
<tr><td><b>General purpose</b> (đa dụng)</td><td>T, M</td><td>Cân bằng CPU, RAM, mạng</td><td>Web server, ứng dụng nhỏ và vừa, môi trường thử nghiệm. Họ <b>T</b> là loại <b>burstable</b>: bình thường chạy nhẹ, khi có đợt tăng ngắn thì "bứt tốc" tạm thời, hợp ứng dụng ít tải, thỉnh thoảng có spike</td></tr>
<tr><td><b>Compute optimized</b> (tối ưu tính toán)</td><td>C</td><td>CPU mạnh so với RAM</td><td>Xử lý hàng loạt, mã hóa video (transcoding), game server, mô phỏng khoa học, web server hiệu năng cao</td></tr>
<tr><td><b>Memory optimized</b> (tối ưu bộ nhớ)</td><td>R, X</td><td>RAM rất lớn</td><td>Cơ sở dữ liệu trong bộ nhớ (in-memory), xử lý dữ liệu lớn theo thời gian thực</td></tr>
<tr><td><b>Storage optimized</b> (tối ưu lưu trữ)</td><td>I, D</td><td>Ổ đĩa <b>gắn cục bộ</b> (instance store) đọc/ghi ngẫu nhiên cực nhanh, IOPS rất cao</td><td>Kho dữ liệu, cơ sở dữ liệu NoSQL tự quản lý, hệ thống file phân tán</td></tr>
<tr><td><b>Accelerated computing</b> (tăng tốc)</td><td>P, G, Inf, Trn</td><td>Có <b>GPU</b> hoặc chip chuyên dụng, tính toán song song khổng lồ</td><td>Huấn luyện deep learning/machine learning, xử lý đồ họa, tính toán khoa học</td></tr>
</table>
<p><b>IOPS</b> (Input/Output Operations Per Second) là số lần đọc/ghi ổ đĩa mỗi giây, càng cao thì ổ càng "nhanh tay". Không cần thuộc tên họ, nhưng nếu đề ghi "for example, C instances" hay "P instances" thì bạn nhận ra ngay nhóm nào.</p>
<p>Chọn sai cỡ không sao: bạn có thể dừng instance, đổi sang type khác rồi chạy lại. Nếu không chắc, <b>AWS Compute Optimizer</b> dùng machine learning để gợi ý instance type phù hợp hơn dựa trên mức sử dụng thực tế (rightsizing).</p>

<div class="box trap"><b>⚠️ Bẫy hay gặp</b>
<p>"In-memory database", "large datasets in memory" → <b>Memory optimized</b>, không phải Storage optimized. "High, low-latency random read/write IOPS on locally attached disks" → <b>Storage optimized</b>. "High performance computing", "batch processing", "video transcoding", "CPU-bound, little memory" → <b>Compute optimized</b>. "Deep learning training", "GPU", "massively parallel", "graphics" → <b>Accelerated computing</b>. "Balanced, low traffic with short spikes" → <b>General purpose (burstable T)</b>.</p>
</div>

<h3>Ổ đĩa và tường lửa của instance</h3>
<h4>EBS root volume và instance store</h4>
<p>Mỗi instance cần một ổ đĩa để chứa hệ điều hành, gọi là <b>root volume</b> (ổ gốc). Thường đây là một ổ <b>Amazon EBS</b> (Elastic Block Store): ổ đĩa mạng, tách rời khỏi máy chủ vật lý, nên dữ liệu vẫn còn khi bạn dừng instance. Lưu ý: mặc định, khi terminate (xóa hẳn) instance thì ổ EBS gốc cũng bị xóa theo, nhưng bạn có thể đổi thiết lập này.</p>
<p>Một số instance type còn có <b>instance store</b>: ổ đĩa gắn trực tiếp vào máy chủ vật lý, rất nhanh nhưng <b>tạm thời</b>. Khi instance bị dừng, bị xóa hay phần cứng hỏng, dữ liệu trên instance store mất. Chỉ dùng cho dữ liệu tạm như bộ đệm, file nháp. Bài 3-7 sẽ nói kỹ hơn về lưu trữ.</p>
<h4>Security group</h4>
<p>Mỗi instance được gắn ít nhất một <b>security group</b> (nhóm bảo mật): một bức tường lửa ảo ở cấp instance, quy định lưu lượng nào được vào/ra. Ví dụ: chỉ cho phép cổng 443 (HTTPS) từ internet vào web server. Security group chỉ có quy tắc <b>cho phép</b> (allow), và là <b>stateful</b>: đã cho một yêu cầu đi vào thì câu trả lời tự động được đi ra. Phần này thuộc chủ đề bảo mật và mạng, ở đây chỉ cần biết nó luôn đi kèm instance.</p>

<h3>Amazon Lightsail và chuyện giá</h3>
<p>EC2 rất linh hoạt nhưng có nhiều lựa chọn, người mới dễ bối rối. <b>Amazon Lightsail</b> là phiên bản đơn giản: chọn một "gói" có sẵn gồm máy ảo, ổ đĩa SSD và <b>hạn mức truyền dữ liệu</b> (data transfer allowance) với <b>giá cố định hằng tháng</b>, thấp và dễ đoán. Có sẵn mẫu cài đặt một chạm cho <b>WordPress</b> và các ứng dụng phổ biến. Phù hợp cho blog, website nhỏ, môi trường thử nghiệm, người chưa có kinh nghiệm cloud.</p>
<table>
<tr><th></th><th>Amazon EC2</th><th>Amazon Lightsail</th></tr>
<tr><td>Lựa chọn</td><td>Rất nhiều: hàng trăm instance type, mạng, ổ đĩa tự cấu hình</td><td>Vài gói cố định, đã kèm ổ đĩa và data transfer</td></tr>
<tr><td>Giá</td><td>Theo giây/giờ, nhiều mô hình mua</td><td>Giá trọn gói hằng tháng</td></tr>
<tr><td>Hợp với</td><td>Ứng dụng cần linh hoạt, co giãn, kiểm soát</td><td>Website nhỏ, WordPress, người mới</td></tr>
</table>
<p>Về giá EC2: có nhiều cách mua như On-Demand, Reserved Instances, Savings Plans, Spot Instances, Dedicated Hosts. Phần này thuộc <b>Domain 4</b> và sẽ học ở bài sau. Ở đây chỉ cần nhớ: mặc định bạn trả theo thời gian chạy, không phải trả trước.</p>

<div class="box exam"><b>🎯 Đề thi hay hỏi</b>
<ul>
<li>"resizable compute capacity in the cloud", "virtual servers" → <b>Amazon EC2</b>; EC2 là ví dụ của <b>IaaS</b></li>
<li>"template that contains the OS and software to launch an instance" → <b>AMI</b></li>
<li>"memory-intensive workloads, in-memory databases" → <b>Memory optimized</b></li>
<li>"temporary block storage physically attached to the host" → <b>instance store</b></li>
<li>"virtual firewall for an EC2 instance" → <b>security group</b></li>
<li>"simple virtual private server with a predictable monthly price", "WordPress for a beginner, storage and data transfer included" → <b>Amazon Lightsail</b></li>
<li>"CPU-bound batch, video transcoding" → <b>Compute optimized</b>; "deep learning training, GPU" → <b>Accelerated computing</b>; "very high local IOPS" → <b>Storage optimized</b></li>
<li>"recommend optimal EC2 instance types" → <b>AWS Compute Optimizer</b></li>
</ul>
</div>
`,
    summary: [
      "Máy ảo là một máy tính độc lập được chia ra từ máy chủ vật lý; EC2 cho thuê máy ảo (instance) theo thời gian dùng.",
      "EC2 là IaaS: khách hàng tự lo hệ điều hành, vá lỗi, phần mềm, cấu hình security group.",
      "AMI = khuôn mẫu gồm hệ điều hành + phần mềm để tạo instance; có thể tự tạo AMI riêng.",
      "5 nhóm instance: general purpose (T burstable, M), compute optimized (C), memory optimized (R, X), storage optimized (I, D: IOPS cục bộ cao), accelerated computing (P, G: GPU cho ML).",
      "Root volume thường là EBS (bền, còn khi stop); instance store nhanh nhưng mất dữ liệu khi stop/terminate.",
      "Lightsail = máy ảo đơn giản, giá cố định hằng tháng; các mô hình giá EC2 học ở Domain 4."
    ],
    terms: [
      ["Server", "máy chủ"],
      ["Virtual machine (VM)", "máy ảo"],
      ["Hypervisor", "phần mềm chia máy vật lý thành nhiều máy ảo"],
      ["Instance", "một máy ảo EC2"],
      ["AMI (Amazon Machine Image)", "khuôn mẫu để tạo instance"],
      ["Instance type", "loại/cấu hình instance"],
      ["General purpose", "đa dụng"],
      ["Compute optimized", "tối ưu tính toán"],
      ["Memory optimized", "tối ưu bộ nhớ"],
      ["Storage optimized", "tối ưu lưu trữ"],
      ["Accelerated computing", "tính toán tăng tốc (GPU)"],
      ["Burstable instance", "instance có thể bứt tốc CPU tạm thời (họ T)"],
      ["IOPS", "số thao tác đọc/ghi ổ đĩa mỗi giây"],
      ["Amazon Lightsail", "máy chủ ảo đơn giản, giá trọn gói hằng tháng"],
      ["Root volume", "ổ đĩa gốc chứa hệ điều hành"],
      ["Instance store", "ổ đĩa tạm gắn trực tiếp máy vật lý"],
      ["Security group", "nhóm bảo mật, tường lửa ảo cấp instance"],
      ["Terminate", "xóa hẳn instance"]
    ],
    qids: ["d3-26", "d1-13", "d3-32", "d3-76", "d1-19"]
  },

  // ───────────────────────── 3-4 ─────────────────────────
  {
    id: "3-4",
    module: 3,
    title: "Container và serverless: ECS, EKS, ECR, Fargate, Lambda, Batch",
    mins: 15,
    goals: [
      "Hiểu container là gì và khác máy ảo ở đâu",
      "Phân biệt Amazon ECS, Amazon EKS, Amazon ECR và AWS Fargate",
      "Hiểu serverless và cách AWS Lambda hoạt động, tính tiền",
      "Biết khi nào chọn EC2, container, Lambda hay AWS Batch"
    ],
    html: `
<h3>Container là gì?</h3>
<p>Lập trình viên hay than: "Trên máy em chạy được mà, sao lên server lại lỗi?". Lý do là môi trường khác nhau: phiên bản phần mềm, thư viện, cấu hình… mỗi nơi một kiểu.</p>
<p><b>Container</b> giải quyết chuyện này bằng cách đóng gói ứng dụng <b>cùng mọi thứ nó cần</b> (thư viện, cấu hình, công cụ) thành một khối chuẩn. Khối đó chạy ở đâu cũng giống nhau: máy lập trình viên, máy chủ công ty hay trên AWS. Công cụ container phổ biến nhất là <b>Docker</b>.</p>
<p>Bản "khuôn" đóng gói gọi là <b>container image</b> (ảnh container). Khi chạy image lên thì ta có một container đang hoạt động.</p>

<div class="box idea"><b>🧠 Hiểu đơn giản</b>
<p>Hãy nghĩ tới <b>container chở hàng</b> trên tàu biển. Trước khi có container, mỗi loại hàng (thùng gỗ, bao gạo, xe máy) phải bốc xếp một kiểu, rất chậm. Container có kích thước chuẩn, bên trong chứa gì cũng được, và tàu, cần cẩu, xe tải nào cũng xếp được. Container phần mềm cũng vậy: đóng gói chuẩn, chuyển đi đâu chạy cũng được.</p>
</div>

<h4>Container khác máy ảo thế nào?</h4>
<p>Máy ảo chứa <b>cả một hệ điều hành riêng</b>, nên nặng (vài GB) và khởi động mất vài phút. Container <b>dùng chung nhân hệ điều hành</b> của máy chủ, chỉ chứa ứng dụng và thư viện, nên nhẹ và khởi động trong vài giây. Một máy chủ có thể chạy rất nhiều container.</p>
<table>
<tr><th></th><th>Máy ảo (VM)</th><th>Container</th></tr>
<tr><td>Chứa gì</td><td>Hệ điều hành đầy đủ + ứng dụng</td><td>Ứng dụng + thư viện, dùng chung nhân hệ điều hành</td></tr>
<tr><td>Kích thước</td><td>Lớn</td><td>Nhỏ, nhẹ</td></tr>
<tr><td>Khởi động</td><td>Thường vài phút</td><td>Thường vài giây</td></tr>
<tr><td>Ví dụ trên AWS</td><td>Amazon EC2</td><td>Amazon ECS, Amazon EKS</td></tr>
</table>

<h3>Bốn dịch vụ container cần phân biệt</h3>
<p>Khi có hàng chục, hàng trăm container, cần một "người điều phối" quyết định container nào chạy ở máy nào, cái nào hỏng thì khởi động lại. Việc này gọi là <b>container orchestration</b> (điều phối container).</p>
<ul>
<li><b>Amazon ECS</b> (Elastic Container Service): dịch vụ điều phối container do AWS tự phát triển, đơn giản, tích hợp sâu với AWS.</li>
<li><b>Amazon EKS</b> (Elastic Kubernetes Service): chạy <b>Kubernetes</b> (phần mềm điều phối container mã nguồn mở rất phổ biến) được AWS quản lý. Chọn EKS khi công ty đã quen dùng Kubernetes hoặc muốn dùng chung công cụ với nơi khác.</li>
<li><b>Amazon ECR</b> (Elastic Container Registry): "kho" lưu trữ và quản lý <b>container image</b>. ECS và EKS lấy image từ đây để chạy.</li>
<li><b>AWS Fargate</b>: chế độ chạy container <b>serverless</b>. Bình thường ECS/EKS cần một nhóm máy EC2 để chạy container, bạn phải tự quản lý chúng. Với Fargate, bạn chỉ nói "container cần bao nhiêu CPU, RAM", AWS lo phần máy chủ. Fargate dùng được với cả ECS và EKS.</li>
</ul>
<div class="flow"><span>Đóng gói app thành image</span><span>Lưu image ở ECR</span><span>ECS hoặc EKS điều phối</span><span>Chạy trên EC2 hoặc Fargate</span></div>
<h4>ECS trên EC2 hay trên Fargate?</h4>
<p>Container phải chạy trên "máy" nào đó. Với ECS, bạn chọn một trong hai <b>launch type</b> (kiểu chạy) dưới đây; EKS cũng có hai lựa chọn tương tự (node EC2 hoặc Fargate):</p>
<table>
<tr><th></th><th>EC2 launch type</th><th>Fargate launch type</th></tr>
<tr><td>Máy chạy container</td><td>Các EC2 instance <b>của bạn</b>, bạn nhìn thấy và đăng nhập được</td><td>AWS lo, bạn không thấy máy chủ</td></tr>
<tr><td>Bạn phải lo</td><td>Chọn instance type, vá hệ điều hành, co giãn số máy trong cụm</td><td>Chỉ khai báo CPU, RAM cho container</td></tr>
<tr><td>Chọn khi</td><td>Cần chọn chính xác instance type (vd GPU), cài <b>agent giám sát/bảo mật trên từng máy chủ</b>, kiểm soát sâu</td><td>Muốn ít việc vận hành nhất (least operational overhead)</td></tr>
</table>

<div class="box trap"><b>⚠️ Bẫy hay gặp</b>
<p>ECR <b>không chạy</b> container, nó chỉ <b>lưu image</b>. "Kubernetes" trong đề → luôn là <b>EKS</b>. "Run containers without managing servers / EC2 instances" → <b>Fargate</b>, không phải ECS hay EKS đơn thuần.</p>
</div>

<h3>Serverless và AWS Lambda</h3>
<p><b>Serverless</b> (phi máy chủ) không có nghĩa là không có máy chủ. Máy chủ vẫn có, nhưng <b>bạn không phải nhìn thấy hay quản lý</b>: không chọn cấu hình, không vá hệ điều hành, không lo co giãn. Bạn chỉ lo code, và thường chỉ trả tiền khi code thật sự chạy.</p>
<p><b>AWS Lambda</b> là dịch vụ serverless nổi bật nhất. Bạn viết một đoạn code nhỏ gọi là <b>function</b> (hàm), và cho biết "khi nào thì chạy". Lambda hoạt động theo kiểu <b>event-driven</b> (hướng sự kiện): có sự kiện thì hàm chạy. Ví dụ sự kiện: một file được tải lên S3, một yêu cầu tới từ API, một tin nhắn vào hàng đợi, hay theo lịch hẹn giờ.</p>
<ul>
<li><b>Tính tiền</b>: theo <b>số lần gọi (request)</b> và <b>thời gian chạy (duration)</b> của hàm, kèm lượng bộ nhớ bạn cấp. Không chạy thì gần như không tốn tiền.</li>
<li><b>Tự co giãn</b>: 1 sự kiện hay 1.000 sự kiện cùng lúc, Lambda tự chạy đủ số bản sao.</li>
<li><b>Giới hạn quan trọng</b>: mỗi lần chạy tối đa <b>30 phút</b> với function thông thường (AWS tăng từ 15 lên 30 phút ngày 19/11/2026; riêng Lambda Managed Instances cho lời gọi bất đồng bộ chạy được tới 90 phút; tài liệu và đề cũ có thể vẫn ghi 15 phút). Việc dài hơn thì không hợp Lambda.</li>
<li><b>Trách nhiệm của bạn</b>: bảo mật code và cấp quyền IAM cho hàm. AWS lo hạ tầng, hệ điều hành, runtime.</li>
</ul>
<p>Lambda không phải dịch vụ serverless duy nhất. Những dịch vụ khác cũng "không phải quản lý máy chủ, tự co giãn": <b>AWS Fargate</b>, <b>Amazon DynamoDB</b> (cơ sở dữ liệu NoSQL), <b>Amazon S3</b>, <b>Amazon SQS</b>, <b>Amazon SNS</b>, <b>Amazon API Gateway</b>, <b>Amazon Aurora Serverless</b>. Ngược lại, <b>Amazon EC2</b> và <b>Amazon RDS</b> bản thường (bạn chọn instance) <b>không</b> phải serverless.</p>

<div class="box example"><b>🍰 Ví dụ: BánhNgon</b>
<p>Khách đặt bánh sinh nhật thường tải lên ảnh để in lên mặt bánh. Ảnh gốc rất to. Minh viết một hàm Lambda: mỗi khi có ảnh mới được tải vào S3 (sự kiện), hàm tự thu nhỏ ảnh và lưu bản nhỏ. Một ngày có 30 ảnh thì chạy 30 lần, mỗi lần vài giây; chị Lan chỉ trả tiền cho đúng chừng đó, không phải nuôi một máy chủ chạy suốt ngày đêm.</p>
<p>Còn app đặt hàng mới, nhóm của Minh đóng gói thành container, đẩy image lên ECR, rồi chạy bằng ECS trên Fargate để khỏi phải quản lý máy EC2.</p>
</div>

<h3>AWS Batch và cách chọn dịch vụ compute</h3>
<p><b>AWS Batch</b> dùng để chạy <b>batch job</b> (công việc xử lý theo lô): hàng trăm, hàng nghìn tác vụ tính toán chạy nền, ví dụ xử lý dữ liệu cả tháng, dựng hình, mô phỏng. Bạn gửi job vào hàng đợi, Batch tự chọn loại và số lượng máy phù hợp (có thể dùng EC2, Spot hoặc Fargate), chạy xong thì thu hồi. Khác Lambda, job của Batch có thể chạy lâu hơn 30 phút.</p>
<table>
<tr><th>Lựa chọn</th><th>Bạn quản lý</th><th>Hợp khi</th></tr>
<tr><td><b>Amazon EC2</b></td><td>Hệ điều hành, phần mềm, co giãn</td><td>Cần toàn quyền kiểm soát máy chủ, phần mềm đặc thù, chạy lâu dài</td></tr>
<tr><td><b>ECS / EKS trên EC2</b></td><td>Container và cụm máy EC2</td><td>Ứng dụng đã đóng gói container, muốn kiểm soát máy bên dưới</td></tr>
<tr><td><b>ECS / EKS trên Fargate</b></td><td>Chỉ container</td><td>Muốn chạy container mà không quản lý máy chủ</td></tr>
<tr><td><b>AWS Lambda</b></td><td>Chỉ code</td><td>Tác vụ ngắn (tối đa 30 phút), chạy theo sự kiện, lưu lượng thất thường</td></tr>
<tr><td><b>AWS Batch</b></td><td>Định nghĩa job</td><td>Rất nhiều tác vụ tính toán theo lô, có thể chạy lâu</td></tr>
</table>

<div class="box exam"><b>🎯 Đề thi hay hỏi</b>
<ul>
<li>"run code without provisioning or managing servers, pay only for compute time" → <b>AWS Lambda</b></li>
<li>"run containers without managing servers or clusters of EC2 instances" → <b>AWS Fargate</b></li>
<li>"store and manage Docker container images" → <b>Amazon ECR</b></li>
<li>"Kubernetes" → <b>Amazon EKS</b>; "run and scale containers on AWS" (không nhắc Kubernetes) → thường là <b>Amazon ECS</b></li>
<li>"hundreds of thousands of batch computing jobs" → <b>AWS Batch</b></li>
<li>Tác vụ chạy lâu hơn 30 phút (vd job 3 giờ) → <b>không</b> chọn Lambda</li>
<li>"create a thumbnail each time a photo is uploaded to S3, long idle periods" → <b>Lambda + S3 event notification</b></li>
<li>"containers, no instance types, no patching, no cluster scaling" → <b>ECS với Fargate launch type</b>; "agent on every host, choose exact instance types" → <b>ECS với EC2 launch type</b></li>
<li>"which services are serverless" → Lambda, Fargate, DynamoDB, S3, SQS, SNS… (không phải EC2)</li>
<li>Lambda: khách hàng chịu trách nhiệm về <b>code và quyền IAM</b> của function</li>
</ul>
</div>
`,
    summary: [
      "Container đóng gói ứng dụng cùng thư viện, chạy giống nhau ở mọi nơi; nhẹ và khởi động nhanh hơn máy ảo.",
      "ECS = điều phối container của AWS; EKS = Kubernetes được quản lý; ECR = kho lưu container image.",
      "Fargate = chạy container serverless, dùng được với ECS và EKS; EC2 launch type khi cần tự chọn instance type hoặc cài agent trên từng máy chủ.",
      "Serverless = không phải quản lý máy chủ; Lambda chạy code theo sự kiện, tính tiền theo số request và thời gian chạy, tối đa 30 phút.",
      "AWS Batch chạy số lượng lớn job xử lý theo lô, tự cấp phát tài nguyên phù hợp.",
      "Chọn EC2 khi cần toàn quyền; container khi đã đóng gói; Lambda cho tác vụ ngắn theo sự kiện."
    ],
    terms: [
      ["Container", "khối đóng gói ứng dụng cùng thư viện"],
      ["Container image", "khuôn mẫu đóng gói của container"],
      ["Docker", "công cụ container phổ biến"],
      ["Container orchestration", "điều phối container"],
      ["Kubernetes", "phần mềm điều phối container mã nguồn mở"],
      ["Amazon ECS", "dịch vụ điều phối container của AWS"],
      ["Amazon EKS", "dịch vụ Kubernetes được quản lý"],
      ["Amazon ECR", "kho lưu container image"],
      ["AWS Fargate", "chạy container không cần quản lý máy chủ"],
      ["Serverless", "phi máy chủ (không phải quản lý máy chủ)"],
      ["Function", "hàm, đoạn code chạy trên Lambda"],
      ["Event-driven", "hướng sự kiện"],
      ["Batch job", "công việc xử lý theo lô"],
      ["Launch type", "kiểu chạy container: trên EC2 hoặc Fargate"]
    ],
    qids: ["d3-2", "d3-20", "d3-29", "d3-30", "d3-31", "d2-35"]
  },

  // ───────────────────────── 3-5 ─────────────────────────
  {
    id: "3-5",
    module: 3,
    title: "Co giãn và cân bằng tải: Auto Scaling, Elastic Load Balancing",
    mins: 13,
    goals: [
      "Phân biệt scale up (nâng cấp máy) và scale out (thêm máy)",
      "Hiểu Amazon EC2 Auto Scaling mang lại tính co giãn (elasticity) ra sao",
      "Hiểu Elastic Load Balancing chia tải và kiểm tra sức khỏe (health check) như thế nào",
      "Thấy cách Auto Scaling, ELB và multi-AZ phối hợp để ứng dụng vừa chịu tải vừa sẵn sàng cao"
    ],
    html: `
<h3>Vấn đề: lượng khách lúc nhiều lúc ít</h3>
<p>Một website không bao giờ có lượng truy cập đều đặn. Ban đêm vắng, buổi trưa đông, ngày lễ thì đông gấp chục lần. Nếu chuẩn bị máy chủ cho ngày đông nhất, phần lớn thời gian máy ngồi không, tốn tiền. Nếu chuẩn bị ít, ngày đông website sập.</p>
<p>Cloud giải quyết bằng hai ý tưởng: <b>scaling</b> (co giãn năng lực) và <b>load balancing</b> (cân bằng tải).</p>

<h3>Scale up và scale out</h3>
<ul>
<li><b>Scale up</b> / <b>vertical scaling</b> (mở rộng theo chiều dọc): thay máy hiện có bằng máy <b>mạnh hơn</b> (nhiều CPU, RAM hơn). Đơn giản, nhưng có giới hạn (máy mạnh nhất cũng có trần), thường phải tạm dừng để đổi, và vẫn chỉ có một máy, hỏng là hết.</li>
<li><b>Scale out</b> / <b>horizontal scaling</b> (mở rộng theo chiều ngang): <b>thêm nhiều máy</b> chạy song song. Gần như không giới hạn, và nếu một máy hỏng thì các máy khác vẫn chạy. Ngược lại là <b>scale in</b>: bớt máy khi vắng khách.</li>
</ul>

<div class="box idea"><b>🧠 Hiểu đơn giản</b>
<p>Quán bánh đông khách. Scale up là thay cô thu ngân bằng một người tính tiền siêu nhanh: có giới hạn, và người đó nghỉ ốm là quán tê liệt. Scale out là mở thêm quầy thu ngân: đông thì mở 5 quầy, vắng thì để 1 quầy. Còn <b>load balancer</b> chính là người đứng ở cửa hướng dẫn "quầy số 3 đang trống, mời anh qua đó", và nếu quầy nào đóng thì không chỉ khách vào quầy đó nữa.</p>
</div>

<h3>Amazon EC2 Auto Scaling</h3>
<p><b>Amazon EC2 Auto Scaling</b> tự động <b>thêm instance khi tải tăng và bớt instance khi tải giảm</b>. Đây chính là <b>elasticity</b> (tính co giãn), một lợi ích cốt lõi của cloud: chỉ dùng và trả tiền cho đúng lượng tài nguyên cần lúc đó, không phải "đoán trước" năng lực (stop guessing capacity).</p>
<p>Bạn tạo một <b>Auto Scaling group</b> (nhóm tự co giãn) và đặt ba con số:</p>
<ul>
<li><b>Minimum</b> (tối thiểu): luôn có ít nhất từng này instance, kể cả lúc vắng.</li>
<li><b>Desired</b> (mong muốn): số instance nên chạy hiện tại.</li>
<li><b>Maximum</b> (tối đa): không bao giờ vượt quá, để kiểm soát chi phí.</li>
</ul>
<p>Rồi đặt quy tắc co giãn:</p>
<ul>
<li><b>Dynamic scaling</b> (co giãn động), ví dụ <b>target tracking</b>: "giữ CPU trung bình quanh 50%". Phản ứng <b>sau khi</b> tải đã tăng.</li>
<li><b>Scheduled scaling</b> (co giãn theo lịch): "mỗi tối thứ Sáu 19:00 tăng lên 6 máy". Hợp với đỉnh tải <b>biết trước giờ</b>. Vì instance mới cần vài phút để sẵn sàng, đặt lịch giúp có đủ máy <b>trước</b> khi khách ùa vào.</li>
<li><b>Predictive scaling</b> (co giãn dự đoán): dùng machine learning học từ lịch sử tải để tăng máy trước các chu kỳ lặp lại.</li>
</ul>
<p>Ngoài ra Auto Scaling còn có vai trò <b>tự chữa lành</b>: nếu một instance bị hỏng, nó tự thay bằng instance mới để giữ đủ số lượng mong muốn (desired). Instance mới thường được tạo từ một <b>launch template</b> chỉ rõ AMI, instance type, security group…</p>
<p>Lưu ý kỹ thuật: <b>mặc định</b> Auto Scaling chỉ dùng <b>EC2 status checks</b> (máy có đang chạy, phần cứng có lỗi không). Muốn Auto Scaling thay cả instance mà load balancer báo là không khỏe (ví dụ ứng dụng bị treo nhưng máy vẫn chạy), bạn phải <b>bật ELB health checks</b> cho Auto Scaling group.</p>
<p>Tự phục hồi khi lỗi và tự điều chỉnh công suất theo nhu cầu chính là nguyên tắc của trụ cột <b>Reliability</b> trong Well-Architected Framework (bài 1-4): "automatically recover from failure", "stop guessing capacity", "scale horizontally". ELB + Auto Scaling trải nhiều AZ là cách hiện thực các nguyên tắc đó.</p>

<h3>Elastic Load Balancing</h3>
<p>Khi có nhiều instance, khách truy cập vào đâu? Cần một "cửa vào" duy nhất phân phối yêu cầu cho các máy phía sau. Đó là <b>load balancer</b> (bộ cân bằng tải). Dịch vụ của AWS là <b>Elastic Load Balancing (ELB)</b>, được AWS quản lý và tự mở rộng theo lưu lượng.</p>
<p>ELB liên tục làm <b>health check</b> (kiểm tra sức khỏe): định kỳ "hỏi thăm" từng instance. Instance nào không trả lời đúng sẽ bị coi là không khỏe, ELB ngừng gửi khách tới đó cho đến khi nó khỏe lại.</p>
<p>Các loại load balancer chính:</p>
<table>
<tr><th>Loại</th><th>Đặc điểm</th><th>Hợp với</th></tr>
<tr><td><b>Application Load Balancer</b> (ALB)</td><td>Hiểu nội dung HTTP/HTTPS, có thể chia theo <b>đường dẫn URL</b> (/api, /images) hoặc tên miền tới các nhóm máy khác nhau</td><td>Website, ứng dụng web, microservices</td></tr>
<tr><td><b>Network Load Balancer</b> (NLB)</td><td>Làm việc ở mức TCP/UDP (kể cả giao thức tự viết), xử lý <b>hàng triệu request mỗi giây</b>, độ trễ cực thấp, có thể có <b>địa chỉ IP tĩnh</b> (static IP)</td><td>Game, giao dịch tài chính, ứng dụng cần hiệu năng mạng rất cao, đối tác cần IP cố định để mở tường lửa</td></tr>
<tr><td><b>Gateway Load Balancer</b> (GWLB)</td><td>Đưa lưu lượng <b>trong suốt</b> (transparent) qua một đội <b>thiết bị mạng ảo của bên thứ ba</b> (thường mua trên AWS Marketplace), đồng thời giúp đội thiết bị đó co giãn và sẵn sàng cao</td><td>Tường lửa, hệ thống phát hiện/ngăn chặn xâm nhập, kiểm tra gói tin</td></tr>
</table>
<p>Điều cốt lõi: ELB "tự động chia lưu lượng tới nhiều đích (EC2, container, IP, Lambda), ở một hoặc nhiều AZ". Đề thi gần đây còn hỏi chọn <b>đúng loại</b> load balancer theo từ khóa trong bảng trên, nên hãy nhớ cả ba.</p>

<h3>Ghép lại: Auto Scaling + ELB + multi-AZ</h3>
<p>Ba thứ này thường đi chung thành một kiến trúc chuẩn:</p>
<div class="flow"><span>Khách hàng</span><span>Elastic Load Balancer</span><span>Auto Scaling group trải trên AZ-a và AZ-b</span><span>Các EC2 instance</span></div>
<ul>
<li><b>ELB</b> là cửa vào duy nhất, chia khách đều cho các instance khỏe.</li>
<li><b>Auto Scaling</b> thêm/bớt instance theo tải, và tự đăng ký instance mới với ELB.</li>
<li><b>Multi-AZ</b>: Auto Scaling group được trải ra nhiều AZ. Nếu một AZ gặp sự cố, ELB chuyển hết khách sang AZ còn lại, Auto Scaling bù instance ở AZ còn khỏe.</li>
</ul>
<p>Kết quả: vừa <b>scalable</b> (chịu được tải tăng), vừa <b>elastic</b> (tự co giãn), vừa <b>highly available</b> (sẵn sàng cao).</p>

<div class="box example"><b>🍰 Ví dụ: BánhNgon</b>
<p>Năm ngoái, BánhNgon chạy chương trình giảm giá Black Friday. Website chỉ có 1 máy chủ, 8 giờ tối khách ùa vào, website treo cứng. Chị Lan mất cả đêm doanh thu.</p>
<p>Năm nay Minh làm lại: một Application Load Balancer đứng trước, sau là Auto Scaling group trải ở 2 AZ, min 2, max 10 instance, quy tắc "giữ CPU khoảng 50%". Tối Black Friday, CPU tăng vọt, Auto Scaling tự thêm lên 8 instance, ELB chia đều khách. Giữa đêm, một instance bị lỗi, health check phát hiện, ELB ngừng gửi khách vào đó, Auto Scaling thay máy mới. Sáng hôm sau vắng khách, hệ thống tự thu về 2 instance. Chị Lan chỉ trả tiền cho mấy tiếng chạy 8 máy.</p>
</div>

<div class="box trap"><b>⚠️ Bẫy hay gặp</b>
<p><b>Auto Scaling</b> thay đổi <b>số lượng</b> instance (thêm máy, bớt máy, thay máy hỏng). <b>ELB</b> <b>phân phối lưu lượng</b> và health check, nhưng <b>tự nó không tạo ra instance mới</b>. Hai dịch vụ hay bị tráo đổi trong đáp án. Ngoài ra, phân biệt <b>scalability</b> (khả năng mở rộng để đáp ứng tải lớn) với <b>elasticity</b> (tự động tăng và giảm theo nhu cầu thực tế); đề hỏi "automatically acquire and release resources" là <b>elasticity</b>.</p>
</div>

<div class="box exam"><b>🎯 Đề thi hay hỏi</b>
<ul>
<li>"automatically add EC2 instances during peak hours and remove them when traffic decreases" → <b>Amazon EC2 Auto Scaling</b></li>
<li>"automatically distributes incoming traffic across multiple EC2 instances" → <b>Elastic Load Balancing</b></li>
<li>"route traffic only to healthy instances" → <b>health checks</b> của ELB; "replace instances that fail health checks" → <b>Auto Scaling</b></li>
<li>"predictable peak at a fixed time, add capacity before it" → <b>scheduled scaling</b></li>
<li>"route by URL path (/api, /images)", HTTP/HTTPS → <b>Application Load Balancer</b></li>
<li>"custom TCP protocol, millions of requests per second, static IP" → <b>Network Load Balancer</b></li>
<li>"third-party firewall / virtual appliances, transparent, scale" → <b>Gateway Load Balancer</b></li>
<li>"acquire resources when demand increases and release when demand decreases" → <b>elasticity</b></li>
<li>"overprovisioning for peaks leaves resources idle" → lợi ích <b>stop guessing capacity</b></li>
<li>"keep running if one Availability Zone fails" → triển khai <b>multi-AZ</b> (high availability)</li>
</ul>
</div>
`,
    summary: [
      "Scale up = đổi sang máy mạnh hơn (có giới hạn); scale out = thêm máy song song (linh hoạt, chịu lỗi tốt).",
      "EC2 Auto Scaling tự thêm/bớt instance theo tải, giữ số lượng giữa min và max, tự thay instance hỏng.",
      "Elasticity = tự tăng và giảm tài nguyên theo nhu cầu, chỉ trả cho phần dùng.",
      "Elastic Load Balancing chia lưu lượng cho nhiều đích, dùng health check để chỉ gửi tới instance khỏe.",
      "Co giãn theo target tracking (động), scheduled (đỉnh tải biết trước giờ) hoặc predictive (dự đoán bằng ML).",
      "Các loại chính: Application (HTTP/HTTPS, chia theo URL path), Network (TCP/UDP, hàng triệu request/giây, IP tĩnh), Gateway (thiết bị bảo mật bên thứ ba).",
      "ELB + Auto Scaling + multi-AZ = kiến trúc vừa co giãn vừa sẵn sàng cao."
    ],
    terms: [
      ["Scale up / vertical scaling", "mở rộng theo chiều dọc (máy mạnh hơn)"],
      ["Scale out / horizontal scaling", "mở rộng theo chiều ngang (thêm máy)"],
      ["Scale in", "thu hẹp, bớt máy"],
      ["Elasticity", "tính co giãn tự động"],
      ["Scalability", "khả năng mở rộng"],
      ["Auto Scaling group", "nhóm instance tự co giãn"],
      ["Launch template", "mẫu cấu hình để tạo instance mới"],
      ["Load balancer", "bộ cân bằng tải"],
      ["Elastic Load Balancing (ELB)", "dịch vụ cân bằng tải của AWS"],
      ["Health check", "kiểm tra sức khỏe"],
      ["Application Load Balancer", "bộ cân bằng tải cho HTTP/HTTPS"],
      ["Network Load Balancer", "bộ cân bằng tải cho TCP/UDP"],
      ["Target tracking", "quy tắc giữ một chỉ số ở mức mục tiêu"],
      ["Scheduled scaling", "co giãn theo lịch hẹn trước"],
      ["Gateway Load Balancer", "đưa lưu lượng qua thiết bị mạng ảo bên thứ ba"]
    ],
    qids: ["d3-6", "d3-12", "d1-4", "d1-11", "d1-16", "d1-2"]
  },

  // ───────────────────────── 3-6 ─────────────────────────
  {
    id: "3-6",
    module: 3,
    title: "Lưu trữ object với Amazon S3",
    mins: 15,
    goals: [
      "Phân biệt ba kiểu lưu trữ: object, block, file",
      "Hiểu bucket, object, độ bền 11 số 9 và các ứng dụng điển hình của S3",
      "Chọn đúng S3 storage class theo tần suất truy cập và tốc độ lấy dữ liệu",
      "Biết lifecycle policy, versioning và những gì ảnh hưởng tới chi phí S3"
    ],
    html: `
<h3>Ba kiểu lưu trữ: object, block, file</h3>
<p>Trước khi học S3, cần biết dữ liệu có thể được lưu theo ba cách khác nhau:</p>
<ul>
<li><b>Block storage</b> (lưu trữ khối): dữ liệu chia thành các khối nhỏ trên một ổ đĩa, giống ổ cứng trong máy tính. Hệ điều hành gắn ổ vào và đọc ghi trực tiếp, rất nhanh. Trên AWS: <b>Amazon EBS</b>.</li>
<li><b>File storage</b> (lưu trữ file): dữ liệu sắp xếp theo thư mục và file, nhiều máy cùng truy cập được, giống ổ mạng chung trong văn phòng. Trên AWS: <b>Amazon EFS</b>, <b>Amazon FSx</b>.</li>
<li><b>Object storage</b> (lưu trữ đối tượng): mỗi file là một <b>object</b> gồm dữ liệu, <b>metadata</b> (thông tin mô tả) và một khóa (tên) duy nhất. Truy cập qua internet bằng API, dung lượng gần như vô hạn. Trên AWS: <b>Amazon S3</b>.</li>
</ul>

<div class="box idea"><b>🧠 Hiểu đơn giản</b>
<p>Block storage giống ổ cứng gắn trong máy của bạn. File storage giống tủ hồ sơ chung của cả phòng: có ngăn, có thư mục, ai cũng mở được. Object storage giống <b>dịch vụ gửi đồ</b>: bạn đưa một món đồ, nhận lại một mã số; muốn lấy thì đưa mã số. Kho có thể chứa vô số món, bạn không cần biết nó để ở kệ nào.</p>
</div>

<h3>Amazon S3: bucket và object</h3>
<p><b>Amazon S3</b> (Simple Storage Service) là dịch vụ lưu trữ object của AWS. Hai khái niệm cơ bản:</p>
<ul>
<li><b>Bucket</b> (thùng chứa): nơi chứa object. Tên bucket <b>mặc định</b> phải <b>duy nhất trên toàn thế giới</b> (không ai được trùng), và bucket được tạo trong một Region bạn chọn. (Từ 3/2026 S3 có thêm tùy chọn <i>account regional namespace</i>: tên bucket gắn kèm mã tài khoản và Region để không bị người khác chiếm tên. Với đề thi, đáp án vẫn là "globally unique".)</li>
<li><b>Object</b>: từng file bạn lưu (ảnh, video, file sao lưu, tài liệu…). Mỗi object tối đa 50 TB (trước 12/2025 là 5 TB — tài liệu cũ có thể ghi số này), số lượng object trong bucket không giới hạn. Một lệnh tải lên đơn lẻ (single PUT) chỉ được tối đa <b>5 GB</b>; file lớn hơn phải dùng <b>multipart upload</b> (chia thành nhiều phần tải song song).</li>
</ul>
<p>S3 nổi tiếng với độ bền <b>99.999999999%</b> (<b>11 số 9</b>, durability). Hiểu nôm na: dữ liệu bạn lưu gần như không bao giờ bị mất, vì S3 tự sao chép nó ra nhiều nơi. Lưu ý <b>durability</b> (độ bền, dữ liệu không mất) khác <b>availability</b> (độ sẵn sàng, lúc cần thì truy cập được ngay).</p>
<p>Các ứng dụng điển hình:</p>
<ul>
<li><b>Static website hosting</b>: chứa website tĩnh (HTML, ảnh, CSS) mà không cần máy chủ.</li>
<li><b>Backup and restore</b>: lưu bản sao lưu, lưu trữ lâu dài.</li>
<li><b>Data lake</b> (hồ dữ liệu): đổ mọi loại dữ liệu vào một chỗ để phân tích sau (ví dụ dùng Amazon Athena truy vấn SQL trực tiếp trên S3).</li>
<li>Lưu ảnh, video cho ứng dụng; làm nguồn gốc cho CloudFront phân phối nội dung.</li>
</ul>

<h3>Các storage class: trả tiền theo cách bạn dùng</h3>
<p>Không phải dữ liệu nào cũng được mở thường xuyên. S3 có nhiều <b>storage class</b> (lớp lưu trữ). Nguyên tắc chung: <b>càng ít truy cập, giá lưu trữ càng rẻ, nhưng phí lấy dữ liệu ra càng cao hoặc chờ càng lâu</b>.</p>
<table>
<tr><th>Storage class</th><th>Đặc điểm</th><th>Dùng khi</th></tr>
<tr><td><b>S3 Standard</b></td><td>Mặc định, truy cập nhanh, lưu ở nhiều AZ</td><td>Dữ liệu dùng thường xuyên: ảnh sản phẩm, website</td></tr>
<tr><td><b>S3 Intelligent-Tiering</b></td><td>Tự chuyển từng object giữa các tầng theo mức truy cập thực tế; có phí giám sát nhỏ theo số object, <b>không</b> có phí lấy dữ liệu, không cần ai vận hành</td><td>Không biết trước hoặc tần suất truy cập thay đổi, chỗ thì hay đọc chỗ thì hiếm</td></tr>
<tr><td><b>S3 Standard-IA</b> (Infrequent Access)</td><td>Rẻ hơn Standard, có phí lấy dữ liệu, lưu ở nhiều AZ</td><td>Ít dùng nhưng cần lấy ngay khi cần: bản sao lưu gần đây</td></tr>
<tr><td><b>S3 One Zone-IA</b></td><td>Như Standard-IA nhưng chỉ lưu ở <b>1 AZ</b>, rẻ hơn</td><td>Ít dùng, dễ tạo lại nếu mất: bản sao phụ, ảnh thu nhỏ</td></tr>
<tr><td><b>S3 Glacier Instant Retrieval</b></td><td>Lưu trữ lâu dài, lấy ra trong <b>mili-giây</b>, rẻ hơn Standard-IA khi rất ít đọc</td><td>Rất ít truy cập (khoảng một lần mỗi quý) nhưng cần lấy ngay: ảnh y tế, ảnh hồ sơ cũ</td></tr>
<tr><td><b>S3 Glacier Flexible Retrieval</b></td><td>Lấy ra từ <b>vài phút</b> (kiểu expedited, tốn phí hơn) đến <b>vài giờ</b> (standard, bulk)</td><td>Lưu trữ, sao lưu đọc 1-2 lần/năm, thường chờ được vài giờ, thỉnh thoảng cần gấp trong vài phút</td></tr>
<tr><td><b>S3 Glacier Deep Archive</b></td><td><b>Rẻ nhất</b>, lấy ra mất khoảng <b>12–48 giờ</b> (standard trong vòng 12 giờ, bulk trong vòng 48 giờ)</td><td>Lưu nhiều năm để tuân thủ quy định, gần như không bao giờ mở</td></tr>
</table>

<div class="box trap"><b>⚠️ Bẫy hay gặp</b>
<p>"Unknown or changing access patterns" → <b>Intelligent-Tiering</b>. "Lowest cost archive, retrieval within 12–48 hours is acceptable" → <b>Glacier Deep Archive</b>. "Infrequently accessed, can be recreated, lowest cost" → <b>One Zone-IA</b>. "Rarely accessed (once a quarter) but needs milliseconds" → <b>Glacier Instant Retrieval</b>. "Read once or twice a year, minutes for rare urgent cases, hours otherwise" → <b>Glacier Flexible Retrieval</b>. Nhớ rằng One Zone-IA chỉ ở 1 AZ, nếu AZ đó gặp thảm họa thì dữ liệu có thể mất, nên không dùng cho dữ liệu quan trọng duy nhất.</p>
</div>

<h3>Lifecycle policy và versioning</h3>
<h4>Lifecycle policy: tự động "chuyển kho"</h4>
<p><b>S3 Lifecycle configuration</b> (chính sách vòng đời) là các quy tắc tự động gồm hai loại hành động: <b>transition</b> (sau X ngày thì chuyển object sang storage class rẻ hơn) và <b>expiration</b> (sau Y ngày thì xóa object). Bạn đặt một lần, S3 tự làm mãi, tiết kiệm chi phí mà không cần ai nhớ.</p>
<div class="flow"><span>Ngày 0: S3 Standard</span><span>Sau 30 ngày: Standard-IA</span><span>Sau 90 ngày: Glacier Flexible Retrieval</span><span>Sau 5 năm: xóa</span></div>
<h4>Versioning: giữ lại các phiên bản</h4>
<p>Khi bật <b>versioning</b> (lập phiên bản) cho bucket, mỗi lần ghi đè một object, S3 giữ lại phiên bản cũ. Khi xóa, S3 chỉ đặt một "dấu xóa", có thể khôi phục. Rất hữu ích để chống xóa nhầm, ghi đè nhầm. Versioning cũng là điều kiện để dùng tính năng <b>replication</b> (sao chép tự động sang bucket khác, kể cả ở Region khác).</p>

<h3>Bảo vệ dữ liệu và các tính năng S3 hay gặp trong đề</h3>
<table>
<tr><th>Tính năng</th><th>Làm gì</th><th>Dùng khi</th></tr>
<tr><td><b>S3 Versioning</b></td><td>Giữ mọi phiên bản cũ của object</td><td>Chống xóa nhầm, ghi đè nhầm</td></tr>
<tr><td><b>MFA Delete</b></td><td>Bắt buộc nhập mã <b>MFA</b> (xác thực nhiều lớp) mới được xóa hẳn một phiên bản hoặc tắt versioning. Cần bật versioning trước</td><td>Thêm một lớp khóa chống xóa nhầm/xóa ác ý</td></tr>
<tr><td><b>S3 Object Lock</b></td><td>Khóa object theo mô hình <b>WORM</b> (write once, read many: ghi một lần, chỉ đọc) trong một thời gian lưu giữ. Cần versioning</td><td>Hồ sơ phải giữ nguyên vẹn theo luật (tài chính, pháp lý)</td></tr>
<tr><td><b>Cross-Region Replication (CRR)</b> / <b>Same-Region Replication (SRR)</b></td><td>Tự động sao chép object mới sang bucket ở <b>Region khác</b> (CRR) hoặc cùng Region (SRR)</td><td>Tuân thủ, phòng thảm họa, giảm độ trễ cho người dùng ở Region khác</td></tr>
<tr><td><b>S3 Transfer Acceleration</b></td><td>Tải lên nhanh hơn qua đường dài bằng cách đi vào <b>edge location</b> gần nhất rồi chạy trên mạng riêng của AWS</td><td>Người dùng ở xa Region của bucket tải file lớn lên</td></tr>
<tr><td><b>Block Public Access</b> và mã hóa mặc định</td><td>Chặn công khai bucket ngoài ý muốn; object mới được mã hóa sẵn (SSE-S3)</td><td>Bảo mật cơ bản, bật mặc định cho bucket mới</td></tr>
</table>
<p>Object Lock có hai chế độ: <b>governance mode</b> (người có quyền đặc biệt vẫn gỡ khóa được) và <b>compliance mode</b> (<b>không ai</b> xóa hay sửa được trước hạn, kể cả root user của tài khoản). Đề nói "no one, including the root user" → <b>compliance mode</b>.</p>

<div class="box example"><b>🍰 Ví dụ: BánhNgon</b>
<p>Minh dùng S3 cho nhiều việc. Ảnh sản phẩm trên website để ở <b>S3 Standard</b> vì khách xem liên tục. Bản sao lưu cơ sở dữ liệu hằng ngày cho vào S3, kèm lifecycle: sau 30 ngày chuyển sang <b>Standard-IA</b>, sau 90 ngày sang <b>Glacier Flexible Retrieval</b>. Hóa đơn, chứng từ kế toán phải giữ nhiều năm theo luật thì đưa vào <b>Glacier Deep Archive</b>, rẻ nhất, vì gần như không bao giờ mở.</p>
<p>Một lần nhân viên lỡ tay tải đè file bảng giá mới lên bảng giá cũ. Nhờ bucket đã bật versioning, Minh lấy lại bản cũ trong một phút.</p>
</div>

<h3>Chi phí S3 tính thế nào?</h3>
<p>Những yếu tố chính ảnh hưởng tới hóa đơn S3:</p>
<ul>
<li><b>Lượng dữ liệu lưu trữ</b> (theo GB mỗi tháng) và <b>storage class</b> bạn chọn.</li>
<li><b>Số lượng request</b> (yêu cầu đọc, ghi, liệt kê…) và phí lấy dữ liệu với các lớp IA/Glacier.</li>
<li><b>Data transfer out</b>: dữ liệu đi <b>ra</b> internet (hoặc sang Region khác) có tính phí.</li>
<li><b>Data transfer in</b>: dữ liệu đưa <b>vào</b> S3 từ internet thì <b>miễn phí</b>.</li>
</ul>
<p>Chi tiết về giá sẽ học ở Domain 4.</p>

<div class="box exam"><b>🎯 Đề thi hay hỏi</b>
<ul>
<li>"object storage", "store and retrieve any amount of data", "static website" → <b>Amazon S3</b></li>
<li>"99.999999999% durability" → <b>Amazon S3</b> (11 số 9)</li>
<li>"rarely accessed archive, retrieval within 12–48 hours acceptable, lowest cost" → <b>S3 Glacier Deep Archive</b></li>
<li>"unknown or changing access patterns" → <b>S3 Intelligent-Tiering</b></li>
<li>"move objects to Glacier after 90 days and delete after 5 years" → <b>S3 Lifecycle configuration</b></li>
<li>"protect against accidental deletion or overwrite" → <b>S3 Versioning</b> (+ <b>MFA Delete</b>)</li>
<li>"write-once-read-many (WORM)", "retention period" → <b>S3 Object Lock</b>; "no one, including root, can delete" → <b>compliance mode</b></li>
<li>"automatically copy every new object to a bucket in another Region" → <b>S3 Cross-Region Replication</b></li>
<li>"faster uploads from distant users over long distances" → <b>S3 Transfer Acceleration</b></li>
<li>"rarely accessed, millisecond retrieval, lowest cost" → <b>S3 Glacier Instant Retrieval</b></li>
<li>Lifecycle làm được gì? → <b>transition</b> sang lớp rẻ hơn và <b>expire</b> (xóa) sau số ngày đặt trước</li>
<li>"factors that affect S3 cost" → <b>amount of data stored</b>, <b>requests</b>, <b>data transfer out</b> (data in là miễn phí)</li>
</ul>
</div>
`,
    summary: [
      "Ba kiểu lưu trữ: block (EBS), file (EFS, FSx), object (S3).",
      "S3 lưu object trong bucket; tên bucket duy nhất toàn cầu, bucket nằm trong một Region; độ bền 11 số 9.",
      "S3 dùng cho website tĩnh, sao lưu, data lake, lưu ảnh/video cho ứng dụng.",
      "Storage class: Standard, Intelligent-Tiering, Standard-IA, One Zone-IA, Glacier Instant/Flexible Retrieval, Glacier Deep Archive (rẻ nhất).",
      "Lifecycle policy tự chuyển object sang lớp rẻ hơn (transition) hoặc xóa (expiration) theo thời gian; versioning giữ phiên bản cũ, chống xóa nhầm.",
      "Bảo vệ dữ liệu: MFA Delete, Object Lock (WORM; compliance mode thì kể cả root cũng không xóa được), Cross-Region Replication; Transfer Acceleration tăng tốc tải lên từ xa.",
      "Chi phí S3: dung lượng lưu, request, data transfer out; data transfer in miễn phí."
    ],
    terms: [
      ["Object storage", "lưu trữ đối tượng"],
      ["Block storage", "lưu trữ khối"],
      ["File storage", "lưu trữ file"],
      ["Bucket", "thùng chứa object trong S3"],
      ["Object", "đối tượng, một file lưu trong S3"],
      ["Metadata", "dữ liệu mô tả"],
      ["Durability", "độ bền (không mất dữ liệu)"],
      ["Availability", "độ sẵn sàng (truy cập được khi cần)"],
      ["Storage class", "lớp lưu trữ"],
      ["Infrequent Access (IA)", "truy cập không thường xuyên"],
      ["Archive", "lưu trữ lâu dài"],
      ["Lifecycle configuration", "chính sách vòng đời"],
      ["Versioning", "lập phiên bản"],
      ["Data lake", "hồ dữ liệu"],
      ["Data transfer out", "dữ liệu truyền ra ngoài"],
      ["WORM (Write Once, Read Many)", "ghi một lần, chỉ đọc, không sửa/xóa được"],
      ["S3 Object Lock", "khóa object theo WORM trong thời gian lưu giữ"],
      ["MFA Delete", "yêu cầu mã MFA khi xóa hẳn phiên bản object"],
      ["Cross-Region Replication (CRR)", "sao chép object tự động sang Region khác"],
      ["S3 Transfer Acceleration", "tăng tốc tải lên S3 qua edge location"]
    ],
    qids: ["d3-3", "d3-34", "d4-6", "d3-52", "d3-8"]
  },

  // ───────────────────────── 3-7 ─────────────────────────
  {
    id: "3-7",
    module: 3,
    title: "Ổ đĩa, file dùng chung, sao lưu và khôi phục thảm họa",
    mins: 14,
    goals: [
      "Hiểu Amazon EBS, snapshot và khác biệt với instance store",
      "Phân biệt Amazon EFS (Linux, NFS) và Amazon FSx (Windows File Server và các hệ thống file khác)",
      "Biết AWS Storage Gateway dùng cho mô hình hybrid",
      "Biết AWS Backup và AWS Elastic Disaster Recovery, các chiến lược khôi phục thảm họa cơ bản"
    ],
    html: `
<h3>Amazon EBS: ổ cứng cho máy chủ ảo</h3>
<p>Ở bài EC2, bạn đã biết mỗi instance cần ổ đĩa. <b>Amazon EBS</b> (Elastic Block Store) cung cấp ổ đĩa kiểu <b>block storage</b> gắn vào EC2 qua mạng. Mỗi ổ EBS gọi là một <b>volume</b>.</p>
<ul>
<li>Dữ liệu <b>bền</b>: tồn tại độc lập với instance, còn nguyên khi stop instance, có thể tháo ra gắn sang instance khác.</li>
<li>Một volume nằm trong <b>một AZ</b> và chỉ gắn được với instance ở cùng AZ đó. AWS tự sao chép volume trong AZ để chống hỏng phần cứng.</li>
<li>Thường mỗi volume gắn vào một instance (một số loại đặc biệt cho phép gắn nhiều instance, nhưng không phải trường hợp phổ biến).</li>
<li>Có nhiều loại: SSD cho tốc độ cao, HDD cho dữ liệu lớn đọc tuần tự với giá rẻ hơn.</li>
</ul>
<h4>EBS snapshot</h4>
<p><b>Snapshot</b> (ảnh chụp nhanh) là bản sao lưu của một EBS volume tại một thời điểm, được AWS lưu bền vững (trên S3, do AWS quản lý). Snapshot là <b>incremental</b> (tăng dần): lần sau chỉ lưu phần thay đổi, tiết kiệm chi phí. Từ snapshot, bạn tạo lại volume mới, kể cả ở AZ khác, và có thể <b>sao chép snapshot sang Region khác</b> để phòng thảm họa.</p>
<p>Vì volume không gắn được sang AZ khác, muốn đưa dữ liệu từ AZ A sang instance ở AZ B thì: <b>tạo snapshot → tạo volume mới từ snapshot ở AZ B → gắn vào instance</b>.</p>

<div class="box idea"><b>🧠 Hiểu đơn giản</b>
<p>EBS volume giống một chiếc ổ cứng gắn ngoài: rút ra cắm sang máy khác được, tắt máy dữ liệu vẫn còn. Snapshot giống việc chụp ảnh toàn bộ ổ cứng đó và cất vào két sắt. <b>Instance store</b> thì giống bảng trắng trong phòng họp: viết nhanh, xóa nhanh, hết buổi họp (stop instance) là bị lau sạch.</p>
</div>

<h3>Instance store: nhanh nhưng tạm thời</h3>
<p><b>Instance store</b> là ổ đĩa gắn trực tiếp vào máy chủ vật lý đang chạy instance. Vì nằm ngay trên máy, nó rất nhanh. Nhưng dữ liệu là <b>ephemeral</b> (tạm thời): mất khi instance bị stop, terminate, hoặc phần cứng bên dưới hỏng (khởi động lại bằng reboot thì vẫn còn). Chỉ dùng cho bộ đệm, file tạm, hoặc dữ liệu đã có bản sao ở nơi khác.</p>

<h3>File dùng chung: Amazon EFS và Amazon FSx</h3>
<p>Có lúc nhiều máy chủ cần đọc ghi <b>cùng một thư mục</b> cùng lúc, ví dụ nhiều web server dùng chung kho ảnh. EBS thường chỉ gắn với một máy, nên cần <b>file storage</b> dùng chung.</p>
<ul>
<li><b>Amazon EFS</b> (Elastic File System): hệ thống file dùng chung cho máy <b>Linux</b>, dùng giao thức <b>NFS</b>. Hàng nghìn instance (ở nhiều AZ) có thể truy cập cùng lúc. Dung lượng <b>tự tăng giảm</b> theo lượng file, không cần đặt trước, trả theo dung lượng thực dùng.</li>
<li><b>Amazon FSx</b>: họ dịch vụ hệ thống file được quản lý hoàn toàn, dựa trên các hệ thống file phổ biến mà doanh nghiệp đang dùng (xem bảng).</li>
</ul>
<table>
<tr><th>Biến thể FSx</th><th>Giao thức / đặc điểm</th><th>Chọn khi</th></tr>
<tr><td><b>FSx for Windows File Server</b></td><td><b>SMB</b>, tích hợp Active Directory</td><td>Ứng dụng <b>Windows</b> cần thư mục chia sẻ</td></tr>
<tr><td><b>FSx for Lustre</b> (<i>ngoài phạm vi đề, chỉ để phân biệt</i>)</td><td>Độ trễ dưới mili-giây, thông lượng hàng trăm GB/giây, <b>liên kết trực tiếp với dữ liệu trong S3</b></td><td><b>HPC</b>, mô phỏng, huấn luyện machine learning</td></tr>
<tr><td><b>FSx for NetApp ONTAP</b></td><td>Đa giao thức: <b>NFS và SMB</b> (cả iSCSI) trên cùng dữ liệu; snapshot, chống trùng lặp (deduplication), nén</td><td>Thay thế thiết bị lưu trữ <b>NetApp</b> tại chỗ; máy Linux và Windows dùng chung dữ liệu</td></tr>
<tr><td><b>FSx for OpenZFS</b></td><td>NFS, hệ thống file ZFS</td><td>Chuyển hệ thống đang dùng ZFS/Linux lên AWS</td></tr>
</table>

<div class="box trap"><b>⚠️ Bẫy hay gặp</b>
<p>"Linux", "NFS", "shared file system for many EC2 instances" → <b>EFS</b>. "Windows", "SMB", "Active Directory" → <b>FSx for Windows File Server</b>. "High performance computing", "data in S3" → FSx for Lustre (dịch vụ này nằm trong danh sách ngoài phạm vi đề CLF-C02; Amazon FSx nói chung thì vẫn trong phạm vi). "NetApp", "NFS and SMB on the same data" → <b>FSx for NetApp ONTAP</b>. "Block storage for one EC2 instance" → <b>EBS</b>. "Temporary storage physically attached to host" → <b>instance store</b>.</p>
</div>

<h3>Hybrid và sao lưu tập trung: Storage Gateway, AWS Backup</h3>
<h4>AWS Storage Gateway</h4>
<p>Nhiều công ty vẫn còn máy chủ tại chỗ nhưng muốn dùng dung lượng gần như vô hạn của AWS. <b>AWS Storage Gateway</b> là dịch vụ <b>hybrid cloud storage</b>: đặt một "cổng" (phần mềm hoặc thiết bị) ở văn phòng/data center, ứng dụng tại chỗ vẫn thấy ổ đĩa hoặc thư mục quen thuộc, nhưng dữ liệu thực tế được lưu lên AWS (như S3). Gateway giữ một <b>bộ đệm cục bộ</b> (local cache) để file hay dùng vẫn mở nhanh tại văn phòng.</p>
<table>
<tr><th>Kiểu gateway</th><th>Ứng dụng tại chỗ thấy gì</th><th>Dữ liệu lưu ở AWS dưới dạng</th><th>Dùng khi</th></tr>
<tr><td><b>S3 File Gateway</b></td><td>Thư mục chia sẻ qua <b>NFS / SMB</b></td><td>Object trong <b>Amazon S3</b></td><td>Lưu file văn phòng lên S3, vẫn có cache cục bộ</td></tr>
<tr><td><b>Volume Gateway</b></td><td>Ổ đĩa khối (iSCSI)</td><td>Dữ liệu trên S3, có thể tạo EBS snapshot</td><td>Sao lưu ổ đĩa máy chủ tại chỗ lên cloud</td></tr>
<tr><td><b>Tape Gateway</b></td><td><b>Thư viện băng từ ảo</b> (virtual tape library)</td><td>Băng ảo trong S3, lưu trữ lâu dài ở S3 Glacier</td><td>Bỏ băng từ vật lý nhưng <b>giữ nguyên phần mềm sao lưu</b> đang dùng</td></tr>
</table>
<h4>AWS Backup</h4>
<p>Mỗi dịch vụ có cách sao lưu riêng thì quản lý rất mệt. <b>AWS Backup</b> giúp <b>quản lý và tự động hóa sao lưu tập trung</b> cho nhiều dịch vụ: EBS, EC2, RDS, Aurora, DynamoDB, EFS, FSx, S3, Storage Gateway… Bạn tạo <b>backup plan</b> (kế hoạch sao lưu): sao lưu lúc nào, giữ bao lâu, có <b>sao chép sang Region khác</b> (cross-Region copy) hay tài khoản khác không. Kết hợp AWS Organizations, bạn áp dụng chính sách sao lưu cho <b>nhiều tài khoản</b>, và dùng <b>AWS Backup Audit Manager</b> để <b>báo cáo việc tuân thủ</b> sao lưu từ một nơi.</p>

<h3>Khôi phục sau thảm họa: AWS Elastic Disaster Recovery</h3>
<p><b>Disaster recovery</b> (DR, khôi phục sau thảm họa) là kế hoạch đưa hệ thống trở lại hoạt động khi có sự cố lớn. Hai chỉ số cần biết:</p>
<ul>
<li><b>RPO</b> (Recovery Point Objective): chấp nhận mất tối đa bao nhiêu dữ liệu, tính bằng thời gian (ví dụ mất tối đa 1 giờ dữ liệu).</li>
<li><b>RTO</b> (Recovery Time Objective): phải khôi phục xong trong bao lâu (ví dụ trong 4 giờ).</li>
</ul>
<p>Các chiến lược DR từ rẻ, chậm đến đắt, nhanh: <b>backup and restore</b> (sao lưu rồi khôi phục) → <b>pilot light</b> (giữ sẵn phần cốt lõi tối thiểu) → <b>warm standby</b> (một bản thu nhỏ luôn chạy) → <b>multi-site active/active</b> (chạy đầy đủ ở nhiều nơi cùng lúc).</p>
<p><b>AWS Elastic Disaster Recovery</b> (AWS DRS) liên tục <b>sao chép</b> máy chủ (tại chỗ hoặc trên cloud khác, hoặc EC2 ở Region khác) sang AWS ở dạng tiết kiệm chi phí. Khi có sự cố, bạn khởi chạy các máy đã sao chép trên AWS trong vài phút, giảm tối đa thời gian gián đoạn và lượng dữ liệu mất.</p>

<div class="box example"><b>🍰 Ví dụ: BánhNgon</b>
<p>Hệ thống của BánhNgon giờ đã khá lớn. Mỗi web server có ổ EBS gốc; Minh dùng <b>AWS Backup</b> chụp snapshot mỗi đêm, giữ 30 ngày, và sao chép một bản sang Region khác. Các web server dùng chung kho ảnh qua <b>EFS</b>. Phòng kế toán dùng máy Windows nên thư mục chia sẻ chứng từ nằm trên <b>FSx for Windows File Server</b>.</p>
<p>Ở kho tiệm vẫn còn một máy chủ quản lý tồn kho cũ chưa chuyển lên cloud. Minh lắp <b>Storage Gateway</b> để dữ liệu của nó được lưu lên S3, và dùng <b>Elastic Disaster Recovery</b> sao chép liên tục máy chủ đó lên AWS. Nếu kho lại mất điện như ngày xưa, Minh bật bản sao trên AWS trong vài phút.</p>
</div>

<h3>Bảng so sánh tổng hợp</h3>
<table>
<tr><th>Dịch vụ</th><th>Kiểu</th><th>Đặc điểm chính</th><th>Từ khóa đề thi</th></tr>
<tr><td>Amazon EBS</td><td>Block</td><td>Ổ đĩa bền cho EC2, nằm trong 1 AZ, có snapshot</td><td>block storage for EC2</td></tr>
<tr><td>Instance store</td><td>Block</td><td>Gắn trực tiếp máy vật lý, rất nhanh, dữ liệu tạm</td><td>temporary, physically attached</td></tr>
<tr><td>Amazon EFS</td><td>File</td><td>Dùng chung cho Linux, NFS, tự co giãn, nhiều AZ</td><td>shared file system, Linux</td></tr>
<tr><td>Amazon FSx</td><td>File</td><td>Windows File Server (SMB), ONTAP, OpenZFS; Lustre (HPC, ngoài phạm vi đề)</td><td>Windows, SMB, HPC</td></tr>
<tr><td>Amazon S3</td><td>Object</td><td>Dung lượng vô hạn, 11 số 9 độ bền</td><td>object storage</td></tr>
<tr><td>AWS Storage Gateway</td><td>Hybrid</td><td>Ứng dụng tại chỗ dùng lưu trữ AWS</td><td>hybrid, on-premises access to cloud storage</td></tr>
<tr><td>AWS Backup</td><td>Quản lý sao lưu</td><td>Sao lưu tập trung, theo kế hoạch, nhiều dịch vụ</td><td>centrally manage backups</td></tr>
<tr><td>AWS Elastic Disaster Recovery</td><td>Khôi phục thảm họa</td><td>Sao chép liên tục, khôi phục nhanh trên AWS</td><td>minimize downtime and data loss</td></tr>
</table>

<div class="box exam"><b>🎯 Đề thi hay hỏi</b>
<ul>
<li>"block-level storage volumes for EC2" → <b>Amazon EBS</b>; "point-in-time backup of EBS" → <b>EBS snapshot</b></li>
<li>"multiple Linux EC2 instances need shared, concurrent access" → <b>Amazon EFS</b></li>
<li>"shared file storage for Windows applications, SMB" → <b>Amazon FSx for Windows File Server</b></li>
<li>"on-premises applications access virtually unlimited cloud storage" → <b>AWS Storage Gateway</b></li>
<li>"NFS/SMB file shares on premises, store as objects in S3, local cache" → <b>S3 File Gateway</b>; "replace physical tapes, keep backup software" → <b>Tape Gateway</b></li>
<li>"replace NetApp, NFS + SMB, snapshots, deduplication" → <b>FSx for NetApp ONTAP</b></li>
<li>"copy an EBS volume to another AZ" → <b>snapshot rồi tạo volume mới ở AZ đó</b>; snapshot lưu ở đâu? → <b>trong S3, do AWS quản lý</b></li>
<li>"centrally manage and automate backups across AWS services", "multiple accounts, cross-Region copy, compliance reporting" → <b>AWS Backup</b></li>
<li>"continuously replicate servers to AWS to minimize downtime and data loss" → <b>AWS Elastic Disaster Recovery</b></li>
</ul>
</div>
`,
    summary: [
      "EBS = ổ đĩa block bền cho EC2, nằm trong một AZ; snapshot là bản sao lưu tăng dần, sao chép được sang Region khác.",
      "Instance store = ổ gắn trực tiếp máy vật lý, rất nhanh, dữ liệu mất khi stop/terminate.",
      "EFS = file dùng chung cho Linux (NFS), tự co giãn; FSx = Windows File Server (SMB), Lustre (HPC, ngoài phạm vi đề), NetApp ONTAP (NFS + SMB, snapshot, dedup), OpenZFS.",
      "Storage Gateway = lưu trữ hybrid: S3 File Gateway (NFS/SMB → S3, có cache), Volume Gateway (ổ khối), Tape Gateway (băng từ ảo).",
      "AWS Backup = sao lưu tập trung theo kế hoạch cho nhiều dịch vụ, nhiều tài khoản, sao chép sang Region khác, báo cáo tuân thủ.",
      "Elastic Disaster Recovery sao chép liên tục máy chủ sang AWS để khôi phục nhanh; RPO = lượng dữ liệu chấp nhận mất, RTO = thời gian khôi phục."
    ],
    terms: [
      ["Volume", "một ổ đĩa EBS"],
      ["Snapshot", "ảnh chụp nhanh, bản sao lưu tại một thời điểm"],
      ["Incremental", "tăng dần, chỉ lưu phần thay đổi"],
      ["Ephemeral", "tạm thời"],
      ["NFS (Network File System)", "giao thức chia sẻ file phổ biến trên Linux"],
      ["SMB (Server Message Block)", "giao thức chia sẻ file phổ biến trên Windows"],
      ["Shared file system", "hệ thống file dùng chung"],
      ["Hybrid cloud storage", "lưu trữ đám mây lai"],
      ["Tape Gateway", "thư viện băng từ ảo lưu dữ liệu sao lưu lên AWS"],
      ["Local cache", "bộ đệm cục bộ tại văn phòng"],
      ["Backup plan", "kế hoạch sao lưu"],
      ["Disaster recovery (DR)", "khôi phục sau thảm họa"],
      ["RPO (Recovery Point Objective)", "mục tiêu điểm khôi phục, lượng dữ liệu chấp nhận mất"],
      ["RTO (Recovery Time Objective)", "mục tiêu thời gian khôi phục"],
      ["Pilot light", "giữ sẵn phần cốt lõi tối thiểu"],
      ["Warm standby", "bản dự phòng thu nhỏ luôn chạy"]
    ],
    qids: ["d3-8", "d3-9", "d3-32", "d3-33", "d3-23", "d3-35", "d3-36"]
  }
);
