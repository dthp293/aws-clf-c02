(window.CLF.course = window.CLF.course || []).push(
  {
    id: "4-1",
    module: 4,
    title: "Các cách mua EC2: On-Demand, Reserved, Savings Plans, Spot, Dedicated",
    mins: 15,
    goals: [
      "Hiểu vì sao cùng một máy chủ EC2 lại có nhiều cách trả tiền khác nhau",
      "Phân biệt On-Demand, Reserved Instances, Savings Plans và Spot Instances",
      "Phân biệt Dedicated Instances, Dedicated Hosts và On-Demand Capacity Reservations",
      "Chọn đúng cách mua cho từng tình huống trong đề thi"
    ],
    html: `
<h3>Vì sao lại có nhiều cách mua?</h3>
<p>Nhắc lại: <b>Amazon EC2</b> (Elastic Compute Cloud, dịch vụ thuê máy chủ ảo) cho bạn thuê một "cái máy tính" đặt trong trung tâm dữ liệu của AWS. Mỗi máy như vậy gọi là một <b>instance</b> (máy chủ ảo).</p>
<p>Máy thì giống nhau, nhưng <b>cách trả tiền</b> thì khác nhau. AWS cho bạn chọn: trả giá cao mà tự do, hoặc cam kết dùng lâu dài để được giảm giá, hoặc chấp nhận bị "đòi máy lại" để được giá cực rẻ. Các cách này gọi là <b>purchasing options</b> (tùy chọn mua).</p>
<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>Hãy nghĩ tới chuyện đi lại:</p>
<ul>
<li><b>Gọi taxi</b>: lúc nào cần thì gọi, đi bao nhiêu trả bấy nhiêu. Tiện nhưng đắt nhất tính trên mỗi km. Đó là <b>On-Demand</b>.</li>
<li><b>Thuê xe theo tháng/năm</b>: ký hợp đồng dài, giá mỗi ngày rẻ hơn nhiều, nhưng không dùng vẫn phải trả. Đó là <b>Reserved Instances</b> và <b>Savings Plans</b>.</li>
<li><b>Vé máy bay chờ (standby)</b>: rẻ bất ngờ vì lấy ghế trống, nhưng hãng có thể không cho bạn lên máy bay. Đó là <b>Spot Instances</b>.</li>
</ul></div>

<h3>On-Demand: trả theo mức dùng, không cam kết</h3>
<p><b>On-Demand Instances</b> (instance theo nhu cầu) là cách mặc định. Bạn bật máy lúc nào thì bắt đầu tính tiền, tắt máy thì ngừng tính. Tiền được tính theo giây hoặc theo giờ tùy loại máy và hệ điều hành.</p>
<p>Không có hợp đồng, không trả trước, không bị đòi máy lại. Đổi lại, đây là mức giá cao nhất trong các lựa chọn phổ biến.</p>
<p>Phù hợp khi: việc ngắn hạn, không đoán trước được, đang thử nghiệm, hoặc ứng dụng mới chưa biết sẽ chạy bao lâu.</p>

<h3>Reserved Instances và Savings Plans: cam kết để được giảm giá</h3>
<h4>Reserved Instances (RI)</h4>
<p><b>Reserved Instances</b> (instance đặt trước) là bạn cam kết với AWS: "Tôi sẽ dùng loại máy này trong <b>1 năm hoặc 3 năm</b>". Đổi lại, bạn được giảm giá tới khoảng <b>72%</b> so với On-Demand. Cam kết càng dài, giảm càng nhiều.</p>
<p>Có hai loại chính:</p>
<ul>
<li><b>Standard RI</b> (RI tiêu chuẩn): giảm giá nhiều nhất, nhưng kém linh hoạt. Bạn không đổi được sang họ máy khác (instance family).</li>
<li><b>Convertible RI</b> (RI chuyển đổi được): giảm ít hơn, nhưng trong thời hạn hợp đồng bạn được đổi sang họ máy, hệ điều hành khác.</li>
</ul>
<p>Về cách trả tiền, có ba mức:</p>
<ul>
<li><b>All Upfront</b> (trả hết trước): trả toàn bộ ngay từ đầu, được giảm nhiều nhất.</li>
<li><b>Partial Upfront</b> (trả trước một phần): trả một phần, phần còn lại trả dần hàng tháng.</li>
<li><b>No Upfront</b> (không trả trước): không đưa tiền trước, trả dần hàng tháng, giảm ít nhất trong ba mức. Bạn vẫn phải trả hết theo cam kết.</li>
</ul>
<p>Khi mua RI, bạn chọn <b>phạm vi</b> (scope) là cả Region hay một AZ:</p>
<table>
<tr><th></th><th>Regional RI (RI theo Region)</th><th>Zonal RI (RI gắn một AZ)</th></tr>
<tr><td>Giảm giá áp cho</td><td>Máy khớp loại ở <b>bất kỳ AZ nào</b> trong Region</td><td>Chỉ máy khớp loại ở <b>đúng AZ</b> đã chọn</td></tr>
<tr><td>Linh hoạt kích cỡ (<b>size flexibility</b>)</td><td>Có (với nhiều trường hợp, ví dụ Linux): giảm giá tự áp cho các kích cỡ khác nhau trong cùng họ máy</td><td>Không</td></tr>
<tr><td>Giữ chỗ (<b>capacity reservation</b>)</td><td>Không</td><td><b>Có</b>, giữ chỗ máy ở AZ đó</td></tr>
</table>
<p>Thêm ba điểm hay được hỏi:</p>
<ul>
<li>Khi dùng <b>AWS Organizations</b> (quản lý nhiều tài khoản AWS chung, học kỹ ở bài sau), giảm giá RI và Savings Plans <b>mặc định được chia sẻ</b> cho các tài khoản khác trong tổ chức nếu họ chạy máy khớp loại. Ví dụ: tài khoản A mua Regional RI nhưng tắt máy, tài khoản B chạy máy cùng loại ở AZ khác cùng Region → B tự được giảm giá.</li>
<li>Muốn giảm giá chỉ dùng cho tài khoản đã mua (ví dụ để tính chi phí nội bộ cho đúng từng công ty con)? <b>Management account</b> (tài khoản quản lý của tổ chức) có thể <b>tắt chia sẻ RI/Savings Plans</b> (turn off discount sharing) cho từng tài khoản trong phần cài đặt Billing.</li>
<li><b>Reserved Instance Marketplace</b> (chợ bán lại RI): nếu không cần RI nữa, bạn có thể <b>bán phần thời hạn còn lại</b> cho khách hàng AWS khác. Chỉ <b>Standard RI</b> bán được ở đây; <b>Convertible RI không bán được</b> (bù lại nó đổi được sang cấu hình khác).</li>
</ul>

<h4>Savings Plans</h4>
<p><b>Savings Plans</b> (gói tiết kiệm) cũng là cam kết 1 hoặc 3 năm, nhưng bạn cam kết theo <b>số tiền mỗi giờ</b> (ví dụ "tôi sẽ dùng ít nhất 10 USD/giờ tiền máy chủ"), chứ không cam kết một loại máy cụ thể. Phần dùng trong mức cam kết được tính giá rẻ; phần vượt quá tính giá On-Demand.</p>
<table>
<tr><th></th><th>Compute Savings Plans</th><th>EC2 Instance Savings Plans</th></tr>
<tr><td>Áp cho dịch vụ</td><td><b>EC2, AWS Fargate, AWS Lambda</b></td><td>Chỉ <b>EC2</b></td></tr>
<tr><td>Cam kết gắn với</td><td>Không gắn họ máy hay Region nào</td><td><b>Một họ máy trong một Region</b> (ví dụ họ M ở Singapore)</td></tr>
<tr><td>Tự áp khi bạn đổi</td><td>Họ máy, kích cỡ, hệ điều hành, AZ, <b>Region</b>, chuyển sang Fargate/Lambda</td><td>Kích cỡ, hệ điều hành, tenancy, AZ (trong cùng họ máy và Region)</td></tr>
<tr><td>Mức giảm</td><td>Thấp hơn một chút (đổi lấy linh hoạt nhất)</td><td><b>Cao hơn</b>, tới khoảng 72%</td></tr>
</table>
<p>Thời hạn <b>1 hoặc 3 năm</b> áp dụng cho Compute Savings Plans và EC2 Instance Savings Plans. Ngoài hai loại trên còn có:</p>
<ul>
<li><b>Amazon SageMaker Savings Plans</b>: cam kết USD/giờ cho mức dùng SageMaker (1 hoặc 3 năm).</li>
<li><b>Database Savings Plans</b> (ra mắt 12/2025): cam kết USD/giờ cho nhiều dịch vụ database như Aurora, RDS, DynamoDB, ElastiCache; chỉ có kỳ hạn <b>1 năm</b>, giảm tới khoảng <b>35%</b> (mức cao nhất cho dạng serverless).</li>
</ul>
<p>Bạn không cần tự đoán mức cam kết: <b>AWS Cost Explorer</b> có <b>Savings Plans recommendations</b> (gợi ý Savings Plans) dựa trên mức dùng thực tế trước đây, cho biết nên cam kết bao nhiêu USD/giờ và tiết kiệm được khoảng bao nhiêu.</p>
<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>Website BánhNgon chạy 24/7 suốt cả năm, Minh biết chắc 3 năm tới vẫn cần ít nhất 2 máy chủ. Thay vì trả On-Demand, Minh mua <b>Compute Savings Plans</b> 3 năm. Năm sau Minh chuyển một phần sang Lambda để xử lý đơn hàng, giảm giá vẫn tự áp vì Compute Savings Plans bao cả Lambda. Nếu Minh mua Standard RI cho đúng một họ máy thì đổi kiến trúc sẽ khó tận dụng được giảm giá hơn.</p></div>

<h3>Spot Instances: rẻ nhất nhưng có thể bị lấy lại</h3>
<p>AWS luôn có những máy đang để không. <b>Spot Instances</b> (instance giá rẻ dùng công suất dư) cho bạn dùng các máy đó với mức giảm tới khoảng <b>90%</b> so với On-Demand.</p>
<p>Đổi lại: khi AWS cần lại công suất, máy của bạn có thể bị dừng. AWS chỉ báo trước <b>2 phút</b>.</p>
<p>Vì vậy Spot chỉ hợp với công việc <b>fault-tolerant</b> (chịu được lỗi/gián đoạn) và linh hoạt về thời gian: xử lý hàng loạt (batch), phân tích dữ liệu, render ảnh/video, chạy thử nghiệm. Không hợp với database chính hay việc bắt buộc chạy liên tục.</p>
<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>Mỗi đêm, BánhNgon cần xử lý hàng nghìn ảnh bánh để làm ảnh thu nhỏ cho website. Việc này bị ngắt thì chạy lại từ ảnh đang dở, sáng hôm sau xong là được. Minh dùng <b>Spot Instances</b> và tiết kiệm được rất nhiều. Nhưng máy chủ nhận đơn hàng thì Minh không bao giờ để chạy trên Spot.</p></div>

<h3>Dedicated Instances, Dedicated Hosts và Capacity Reservations</h3>
<p>Bình thường, máy chủ vật lý của AWS chạy máy ảo của nhiều khách hàng khác nhau (vẫn cách ly an toàn). Một số công ty vì quy định hoặc vì giấy phép phần mềm (<b>license</b>) cần phần cứng <b>chỉ dành riêng cho mình</b>.</p>
<ul>
<li><b>Dedicated Instances</b> (instance chuyên dụng): máy ảo của bạn chạy trên phần cứng không chia sẻ với khách hàng khác. Nhưng bạn <b>không thấy</b> chi tiết máy vật lý (bao nhiêu socket, bao nhiêu core).</li>
<li><b>Dedicated Hosts</b> (máy chủ vật lý chuyên dụng): bạn thuê nguyên một máy chủ vật lý và <b>thấy được</b> socket, core của nó. Nhờ vậy bạn dùng được license cũ tính theo socket/core, gọi là <b>BYOL</b> (Bring Your Own License, mang license của bạn). Đây thường là lựa chọn đắt nhất.</li>
</ul>
<p><b>On-Demand Capacity Reservations</b> (đặt trước công suất) là khác hẳn: nó không giảm giá, mà <b>giữ chỗ</b> máy cho bạn ở một AZ cụ thể, trong bao lâu tùy bạn, không cần cam kết 1 hay 3 năm. Bạn trả giá On-Demand cho phần giữ chỗ dù có chạy máy hay không. Có thể kết hợp với Savings Plans hoặc Regional RI để được giảm giá.</p>
<div class="box trap"><b>⚠️ Bẫy hay gặp</b><p>"Dedicated" không có nghĩa là rẻ, cũng không có nghĩa là "đặt trước". Từ khóa <b>socket, core, BYOL, server-bound license</b> → <b>Dedicated Hosts</b>. Từ khóa "phần cứng riêng nhưng <b>không cần</b> thấy socket/core" → <b>Dedicated Instances</b>. Từ khóa "giữ chỗ ở một AZ, bất kỳ thời hạn nào, không cam kết dài" → <b>On-Demand Capacity Reservations</b>, không phải RI.</p></div>

<h3>Bảng chọn nhanh: tình huống → cách mua</h3>
<table>
<tr><th>Tình huống</th><th>Chọn</th></tr>
<tr><td>Ngắn hạn, không đoán được, không được gián đoạn, không muốn cam kết</td><td>On-Demand</td></tr>
<tr><td>Chạy ổn định liên tục 1-3 năm, biết rõ loại máy</td><td>Standard RI hoặc EC2 Instance Savings Plans</td></tr>
<tr><td>Cam kết lâu dài nhưng có thể đổi họ máy</td><td>Convertible RI</td></tr>
<tr><td>Cam kết số tiền/giờ, dùng cả EC2, Fargate, Lambda</td><td>Compute Savings Plans</td></tr>
<tr><td>Việc linh hoạt thời gian, chịu được gián đoạn, muốn rẻ nhất</td><td>Spot Instances</td></tr>
<tr><td>License tính theo socket/core, cần thấy phần cứng</td><td>Dedicated Hosts</td></tr>
<tr><td>Cần phần cứng riêng, không cần thấy socket/core</td><td>Dedicated Instances</td></tr>
<tr><td>Cần chắc chắn có máy ở một AZ, thời hạn tùy ý</td><td>On-Demand Capacity Reservations</td></tr>
</table>
<div class="box exam"><b>🎯 Đề thi hay hỏi</b><ul>
<li>"steady-state", "run continuously for 3 years", "cannot be interrupted" → Reserved Instances / Savings Plans</li>
<li>"can be interrupted", "fault-tolerant", "batch", "most cost-effective" → Spot Instances</li>
<li>"commit to $/hour", "EC2, Fargate and Lambda" → Compute Savings Plans</li>
<li>"change instance families during the term" → Convertible Reserved Instances</li>
<li>"one instance family in one Region, resize often, change OS, largest Savings Plans discount" → EC2 Instance Savings Plans</li>
<li>"sell the remaining term to another customer" → Standard RI trên Reserved Instance Marketplace</li>
<li>"discount should apply only to the account that bought it" → management account tắt RI/Savings Plans discount sharing</li>
<li>"zonal RI" → giữ chỗ ở một AZ; "regional RI" → áp mọi AZ trong Region, có size flexibility</li>
<li>"per-socket / per-core licenses", "BYOL" → Dedicated Hosts</li>
<li>"reserve capacity in a specific AZ for any duration" → On-Demand Capacity Reservations</li>
<li>"short-term, unpredictable, no upfront commitment" → On-Demand</li>
</ul></div>
`,
    summary: [
      "On-Demand: trả theo mức dùng, không cam kết, giá cao nhất, hợp với việc ngắn hạn khó đoán.",
      "Reserved Instances: cam kết 1 hoặc 3 năm, giảm tới ~72%; Standard giảm nhiều nhất, Convertible cho đổi họ máy; trả All/Partial/No Upfront.",
      "Savings Plans: cam kết số tiền mỗi giờ trong 1 hoặc 3 năm; Compute Savings Plans áp cho EC2, Fargate, Lambda.",
      "Spot: giảm tới ~90%, có thể bị dừng với cảnh báo 2 phút, chỉ dùng cho việc chịu được gián đoạn.",
      "Dedicated Hosts thấy socket/core và hỗ trợ BYOL; Dedicated Instances chỉ đảm bảo phần cứng riêng.",
      "On-Demand Capacity Reservations giữ chỗ máy ở một AZ trong thời hạn tùy ý, không phải là giảm giá.",
      "Trong AWS Organizations, giảm giá RI và Savings Plans mặc định được chia sẻ giữa các tài khoản; management account có thể tắt chia sẻ cho từng tài khoản.",
      "EC2 Instance Savings Plans: một họ máy trong một Region, giảm sâu hơn; Compute Savings Plans linh hoạt hơn. Zonal RI giữ chỗ ở một AZ, Regional RI thì không. Chỉ Standard RI bán lại được trên RI Marketplace."
    ],
    terms: [
      ["Purchasing options", "các tùy chọn mua"],
      ["On-Demand Instances", "instance theo nhu cầu, trả theo mức dùng"],
      ["Reserved Instances (RI)", "instance đặt trước, cam kết 1-3 năm"],
      ["Standard / Convertible RI", "RI tiêu chuẩn / RI chuyển đổi được"],
      ["All / Partial / No Upfront", "trả hết trước / trả trước một phần / không trả trước"],
      ["Savings Plans", "gói tiết kiệm cam kết số tiền mỗi giờ"],
      ["Compute Savings Plans", "Savings Plans áp cho EC2, Fargate, Lambda"],
      ["Spot Instances", "instance dùng công suất dư, rất rẻ, có thể bị dừng"],
      ["Fault-tolerant", "chịu được lỗi/gián đoạn"],
      ["Dedicated Instances", "instance chạy trên phần cứng riêng"],
      ["Dedicated Hosts", "thuê nguyên máy chủ vật lý riêng"],
      ["BYOL (Bring Your Own License)", "mang license sẵn có của bạn"],
      ["On-Demand Capacity Reservations", "đặt giữ chỗ công suất ở một AZ"],
      ["Size flexibility", "linh hoạt kích cỡ máy"],
      ["Regional / Zonal RI", "RI áp cho cả Region / RI gắn một AZ (có giữ chỗ)"],
      ["EC2 Instance Savings Plans", "Savings Plans cho một họ máy EC2 trong một Region"],
      ["Reserved Instance Marketplace", "chợ bán lại phần thời hạn còn lại của Standard RI"]
    ],
    qids: ["d4-1", "d4-2", "d4-8", "d4-12", "d4-14", "d4-15", "d4-16", "d4-17"]
  },
  {
    id: "4-2",
    module: 4,
    title: "Giá lưu trữ và truyền dữ liệu (Storage & Data Transfer Pricing)",
    mins: 12,
    goals: [
      "Biết ba nhóm chi phí chính trên AWS: tính toán, lưu trữ, truyền dữ liệu ra ngoài",
      "Biết những yếu tố làm thay đổi tiền Amazon S3 và Amazon EBS",
      "Nhớ quy tắc loại truyền dữ liệu nào miễn phí, loại nào mất tiền",
      "Hiểu vì sao CloudFront có thể giúp giảm chi phí truyền dữ liệu"
    ],
    html: `
<h3>Tiền AWS đến từ đâu?</h3>
<p>Mô hình giá của AWS là <b>pay-as-you-go</b> (dùng bao nhiêu trả bấy nhiêu). Để đoán được hóa đơn, bạn cần biết tiền chủ yếu đến từ ba nhóm:</p>
<ul>
<li><b>Compute</b> (tính toán): tiền thuê "bộ não" xử lý. Ví dụ EC2 tính theo thời gian máy chạy, Lambda tính theo số lần gọi và thời gian chạy.</li>
<li><b>Storage</b> (lưu trữ): tiền giữ dữ liệu, thường tính theo dung lượng mỗi tháng (GB-tháng).</li>
<li><b>Data transfer out</b> (truyền dữ liệu ra ngoài): tiền khi dữ liệu đi từ AWS ra Internet hoặc sang nơi khác.</li>
</ul>
<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>Hãy tưởng tượng AWS là một nhà kho cho thuê. Bạn trả tiền thuê chỗ để hàng (lưu trữ), tiền thuê nhân công làm việc (tính toán), và tiền <b>xe chở hàng ra khỏi kho</b> (truyền dữ liệu ra). Còn mang hàng <b>vào</b> kho thì chủ kho không lấy tiền, vì họ muốn bạn gửi càng nhiều càng tốt.</p></div>

<h3>Giá Amazon S3</h3>
<p><b>Amazon S3</b> (Simple Storage Service, kho lưu trữ đối tượng) dùng để cất file: ảnh, video, bản sao lưu… Tiền S3 phụ thuộc vào:</p>
<ul>
<li><b>Lượng dữ liệu lưu</b>: lưu càng nhiều GB, càng tốn.</li>
<li><b>Storage class</b> (lớp lưu trữ): ví dụ S3 Standard cho dữ liệu hay dùng thì giá lưu cao hơn; các lớp cho dữ liệu ít dùng hoặc lưu trữ lâu dài (như S3 Glacier) thì giá lưu rẻ hơn nhưng có thể mất phí khi lấy dữ liệu ra (retrieval).</li>
<li><b>Requests</b> (số lượt yêu cầu): mỗi lần đọc, ghi, liệt kê file đều có giá nhỏ, cộng lại thành đáng kể nếu rất nhiều lượt.</li>
<li><b>Data transfer out</b>: dữ liệu tải từ S3 ra Internet bị tính tiền.</li>
</ul>
<p>Còn <b>dữ liệu tải vào S3 từ Internet thì miễn phí</b>. Số người dùng IAM hay số AZ trong Region không ảnh hưởng tới tiền S3.</p>
<p>Quy luật về giá giữa các storage class: <b>giá lưu mỗi GB càng rẻ thì càng tốn khi lấy ra</b> (phí retrieval, thời gian chờ, thời gian lưu tối thiểu). Bảng dưới chỉ để so sánh chiều hướng, không phải con số:</p>
<table>
<tr><th>Storage class</th><th>Giá lưu</th><th>Khi lấy dữ liệu ra</th><th>Hợp với</th></tr>
<tr><td>S3 Standard</td><td>Cao nhất</td><td>Tức thì, không phí retrieval</td><td>Dữ liệu dùng thường xuyên</td></tr>
<tr><td>S3 Intelligent-Tiering</td><td>Tự giảm khi ít dùng (+ phí giám sát nhỏ theo object)</td><td>Tức thì, <b>không phí retrieval</b></td><td>Không đoán được mức truy cập, không muốn tự viết lifecycle rule</td></tr>
<tr><td>S3 Standard-IA / One Zone-IA</td><td>Rẻ hơn (One Zone-IA rẻ hơn nữa nhưng chỉ lưu ở 1 AZ)</td><td>Tức thì (mili giây), có phí retrieval</td><td>Ít dùng (khoảng hàng tháng) nhưng cần nhanh</td></tr>
<tr><td>S3 Glacier Instant Retrieval</td><td>Rẻ hơn nữa</td><td>Vẫn mili giây, phí retrieval cao hơn</td><td>Lưu lâu, mở khoảng mỗi quý một lần nhưng phải mở ngay</td></tr>
<tr><td>S3 Glacier Flexible Retrieval</td><td>Rất rẻ</td><td>Chờ vài phút đến vài giờ</td><td>Lưu trữ, sao lưu ít khi cần</td></tr>
<tr><td>S3 Glacier Deep Archive</td><td><b>Rẻ nhất</b></td><td>Chờ tới khoảng 12-48 giờ</td><td>Lưu nhiều năm để tuân thủ quy định</td></tr>
</table>
<p>Mẹo tiết kiệm: dữ liệu càng ít được mở ra xem thì càng nên chuyển sang lớp lưu trữ rẻ hơn. S3 có <b>lifecycle rules</b> (quy tắc vòng đời) để tự động chuyển file cũ sang lớp rẻ hơn, hoặc tự xóa file sau một thời gian. Như vậy bạn không phải ngồi chuyển tay từng file, mà hóa đơn vẫn giảm dần theo thời gian.</p>

<h3>Giá Amazon EBS</h3>
<p><b>Amazon EBS</b> (Elastic Block Store) là "ổ cứng" gắn vào máy chủ EC2. Điểm quan trọng: EBS tính tiền theo <b>dung lượng bạn cấp phát</b> (provisioned), <b>không phải dung lượng thật sự dùng</b>.</p>
<p>Bạn tạo ổ 500 GB nhưng chỉ chứa 50 GB dữ liệu? Bạn vẫn trả cho 500 GB. Tiền EBS gồm:</p>
<ul>
<li><b>Dung lượng cấp phát</b>, tính theo GB-tháng.</li>
<li><b>Hiệu năng cấp phát</b> ở một số loại ổ. Ví dụ ổ <b>gp3</b> (loại SSD phổ biến) đã có sẵn một mức hiệu năng cơ bản (baseline) trong giá; nếu bạn đặt thêm <b>IOPS</b> (số thao tác đọc/ghi mỗi giây) hoặc <b>throughput</b> (lượng dữ liệu đọc/ghi mỗi giây) vượt baseline thì trả thêm.</li>
<li><b>Snapshot</b> (ảnh chụp sao lưu ổ đĩa): tính tiền theo lượng dữ liệu snapshot đang lưu.</li>
</ul>
<p>Những thứ <b>không</b> làm thay đổi tiền ổ EBS: máy EC2 đang chạy hay đã stop, lượng dữ liệu thật sự ghi trong ổ.</p>
<div class="box trap"><b>⚠️ Bẫy hay gặp</b><p>Tắt (stop) máy EC2 thì ngừng tính tiền giờ chạy máy, nhưng ổ EBS gắn kèm <b>vẫn tính tiền</b> vì nó vẫn đang giữ dữ liệu cho bạn. Muốn hết tốn tiền thì phải xóa ổ (sau khi đã sao lưu nếu cần).</p></div>

<h3>Quy tắc tính tiền truyền dữ liệu</h3>
<p>Đây là phần đề thi rất thích hỏi. Nhớ nguyên tắc chung: <b>vào thì miễn phí, ra thì mất tiền</b>, và càng đi xa (qua AZ, qua Region) thì càng có khả năng mất tiền.</p>
<table>
<tr><th>Hướng truyền dữ liệu</th><th>Có tính phí?</th></tr>
<tr><td>Từ Internet <b>vào</b> AWS (vào EC2, vào S3…)</td><td>Miễn phí</td></tr>
<tr><td>Từ AWS <b>ra</b> Internet</td><td>Có tính phí (nhưng <b>100 GB đầu tiên mỗi tháng miễn phí</b>, cộng gộp mọi dịch vụ và Region, trừ Region Trung Quốc và GovCloud)</td></tr>
<tr><td>Giữa hai <b>Region</b> khác nhau</td><td>Có tính phí</td></tr>
<tr><td>Giữa hai <b>AZ</b> khác nhau trong cùng Region</td><td>Có tính phí</td></tr>
<tr><td>Trong <b>cùng một AZ</b>, dùng địa chỉ IP nội bộ (private IP)</td><td>Miễn phí</td></tr>
<tr><td>Giữa EC2 và S3 trong <b>cùng một Region</b></td><td>Miễn phí</td></tr>
</table>
<p><b>Private IP</b> (địa chỉ IP nội bộ) là "số nhà" chỉ dùng bên trong mạng riêng của bạn trên AWS, khác với địa chỉ công khai ra Internet. Lưu ý thêm: từ <b>1/2/2024</b>, mọi <b>địa chỉ IPv4 công khai</b> (public IPv4, kể cả Elastic IP đang gắn vào máy) đều tính phí <b>0,005 USD/giờ</b> mỗi địa chỉ, nên một máy EC2 có public IP tốn thêm khoảng 3,6 USD/tháng.</p>
<p>Hệ quả: nếu hai tầng ứng dụng trao đổi rất nhiều dữ liệu với nhau qua hai AZ khác nhau, đặt chúng <b>vào cùng một AZ</b> sẽ giảm tiền truyền dữ liệu. Đổi lại bạn mất khả năng chịu lỗi khi AZ đó gặp sự cố, nên chỉ làm vậy với workload không quan trọng. Đây là sự đánh đổi giữa chi phí và độ sẵn sàng.</p>
<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>Khách ở Hà Nội tải ảnh đánh giá bánh lên website: phần dữ liệu đi <b>vào</b> S3 này miễn phí. Mỗi khi khách khác mở trang và xem ảnh, dữ liệu đi <b>ra</b> Internet và bị tính tiền. Khi BánhNgon mở rộng sang Nhật và Minh sao chép toàn bộ ảnh từ Region Singapore sang Region Tokyo, phần sao chép giữa hai Region cũng mất tiền. Minh ghi chú lại để tính vào ngân sách.</p></div>

<h3>CloudFront giúp giảm tiền truyền dữ liệu thế nào?</h3>
<p><b>Amazon CloudFront</b> là <b>CDN</b> (Content Delivery Network, mạng phân phối nội dung): nó lưu bản sao (cache) của nội dung ở các <b>edge location</b> (điểm biên) gần người dùng.</p>
<p>Lợi ích về chi phí:</p>
<ul>
<li>Nội dung đã được cache thì người dùng lấy từ edge location, máy chủ gốc (như S3 hay EC2) phải gửi dữ liệu ít hơn.</li>
<li>Truyền dữ liệu từ các nguồn gốc trên AWS (như S3, EC2) tới CloudFront không bị tính phí truyền ra; bạn trả phí theo bảng giá của CloudFront, thường có lợi hơn khi lượng xem lớn.</li>
<li>Kèm theo đó là trang tải nhanh hơn cho người dùng ở xa.</li>
</ul>
<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>Ảnh bánh được rất nhiều khách ở TP.HCM và Nhật xem đi xem lại. Minh đặt CloudFront phía trước S3. Từ đó phần lớn lượt xem lấy ảnh từ edge location gần khách, S3 ít phải gửi ảnh ra trực tiếp, trang nhanh hơn và chi phí truyền dữ liệu dễ kiểm soát hơn.</p></div>

<h3>AWS Free Tier</h3>
<p>AWS có chương trình <b>Free Tier</b> (bậc miễn phí) để người mới dùng thử một số dịch vụ ở mức giới hạn mà không mất tiền. Tuy nhiên, điều kiện của Free Tier đã từng thay đổi và có thể thay đổi tiếp. Hãy luôn kiểm tra trang AWS Free Tier chính thức trước khi dựa vào nó, và đặt cảnh báo chi phí (bài sau) để không bị bất ngờ.</p>
<p>Tóm tắt mô hình hiện tại (tài khoản tạo từ 15/7/2025): tài khoản mới nhận <b>100 USD credit</b>, kiếm thêm được <b>tối đa 100 USD</b>, và chọn <b>Free plan</b> (không bao giờ tính tiền, tối đa 6 tháng) hoặc <b>Paid plan</b> (trả tiền phần vượt credit). Ngoài ra có hơn 30 dịch vụ có mức miễn phí hằng tháng (<i>always free</i>). Chi tiết ở bài thực hành <b>5-1</b>.</p>
<div class="box exam"><b>🎯 Đề thi hay hỏi</b><ul>
<li>"factors that affect S3 cost" → amount of data stored, storage class, requests, data transfer out (không phải data transfer in)</li>
<li>"which data transfer incurs a charge" → between Regions, to the internet, between AZs</li>
<li>"which data transfer is free" → inbound from the internet; same AZ using private IP</li>
<li>"EBS charged for" → provisioned storage (dung lượng cấp phát), không phải dung lượng đã dùng; với gp3 thêm IOPS/throughput vượt baseline; snapshot tính riêng</li>
<li>"unpredictable access, automatic, no retrieval fees" → S3 Intelligent-Tiering; "rarely accessed but milliseconds" → S3 Glacier Instant Retrieval; "cheapest long-term archive" → S3 Glacier Deep Archive</li>
<li>"reduce cross-AZ data transfer charges" → đặt các tầng trao đổi nhiều dữ liệu vào cùng AZ (đánh đổi độ sẵn sàng)</li>
<li>"reduce data transfer cost and latency for global users" → Amazon CloudFront</li>
</ul></div>
`,
    summary: [
      "Ba nhóm chi phí chính trên AWS: compute, storage và data transfer out.",
      "Tiền S3 phụ thuộc lượng dữ liệu, storage class, số requests và dữ liệu truyền ra; dữ liệu vào S3 miễn phí.",
      "S3 storage class: giá lưu càng rẻ thì phí/thời gian lấy dữ liệu ra càng cao; Intelligent-Tiering tự chuyển tầng, không phí retrieval.",
      "EBS tính tiền theo dung lượng cấp phát (kể cả khi chưa dùng hết hay máy EC2 đang tắt), cộng IOPS/throughput vượt baseline (gp3) và snapshot.",
      "Vào từ Internet: miễn phí. Ra Internet, giữa Region, giữa AZ: tính phí. Cùng AZ qua private IP: miễn phí.",
      "CloudFront cache nội dung ở edge location, giảm tải cho máy gốc và giúp tối ưu chi phí truyền dữ liệu.",
      "Free Tier có tồn tại nhưng điều kiện có thể thay đổi, luôn kiểm tra trang chính thức."
    ],
    terms: [
      ["Pay-as-you-go", "dùng bao nhiêu trả bấy nhiêu"],
      ["Compute", "tài nguyên tính toán"],
      ["Storage", "lưu trữ"],
      ["Data transfer in / out", "truyền dữ liệu vào / ra"],
      ["Storage class", "lớp lưu trữ của S3"],
      ["Requests", "lượt yêu cầu đọc/ghi"],
      ["Retrieval fee", "phí lấy dữ liệu ra (lớp lưu trữ lâu dài)"],
      ["Provisioned storage", "dung lượng được cấp phát"],
      ["IOPS / Throughput", "số thao tác đọc/ghi mỗi giây / lượng dữ liệu đọc/ghi mỗi giây"],
      ["S3 Intelligent-Tiering", "lớp S3 tự chuyển tầng theo mức truy cập"],
      ["Snapshot", "bản sao lưu ổ đĩa"],
      ["Private IP address", "địa chỉ IP nội bộ"],
      ["CDN (Content Delivery Network)", "mạng phân phối nội dung"],
      ["Edge location", "điểm biên gần người dùng"],
      ["AWS Free Tier", "bậc dùng thử miễn phí của AWS"]
    ],
    qids: ["d4-6", "d4-18", "d3-5", "d3-21"]
  },
  {
    id: "4-3",
    module: 4,
    title: "Công cụ quản lý chi phí và AWS Organizations",
    mins: 14,
    goals: [
      "Biết dùng công cụ nào trước, trong và sau khi dùng AWS để quản lý tiền",
      "Phân biệt Pricing Calculator, Cost Explorer, AWS Budgets và Cost and Usage Report",
      "Hiểu cost allocation tags và vì sao phải kích hoạt chúng",
      "Hiểu AWS Organizations và consolidated billing giúp tiết kiệm thế nào"
    ],
    html: `
<h3>Ba thời điểm quản lý tiền</h3>
<p>Trên AWS, tiền phát sinh liên tục theo mức dùng. Nếu không theo dõi, cuối tháng bạn có thể nhận hóa đơn bất ngờ. AWS có nhiều công cụ, mỗi công cụ hợp với một thời điểm:</p>
<div class="flow"><span>Trước khi dùng: Pricing Calculator</span><span>Đang dùng: Budgets (cảnh báo)</span><span>Sau khi dùng: Cost Explorer, Cost and Usage Report</span></div>
<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>Giống quản lý tiền chợ trong gia đình. <b>Trước</b> khi đi chợ, bạn ngồi tính sẽ mua gì, hết khoảng bao nhiêu. <b>Trong</b> lúc tiêu, bạn đặt ngưỡng "tháng này quá 5 triệu thì phải báo". <b>Sau</b> khi tiêu, bạn mở sổ chi tiêu xem tiền đi đâu, và đoán tháng tới tiêu bao nhiêu.</p></div>

<h3>Trước khi dùng: AWS Pricing Calculator</h3>
<p><b>AWS Pricing Calculator</b> (máy tính giá AWS) là công cụ web miễn phí để <b>ước tính</b> chi phí trước khi xây dựng. Bạn chọn dịch vụ, nhập cấu hình (bao nhiêu máy, loại gì, lưu bao nhiêu GB, ở Region nào…), công cụ cho ra con số dự kiến theo tháng.</p>
<p>Bạn có thể lưu và chia sẻ bản ước tính cho sếp hoặc kế toán (qua đường link, hoặc xuất file). Rất hữu ích khi so sánh chi phí trước khi chuyển từ hệ thống tại chỗ (on-premises) lên AWS. Nhưng Pricing Calculator chỉ <b>ước tính</b>: nó <b>không</b> cho xem chi phí thực tế đã phát sinh, không gửi cảnh báo.</p>

<h3>Đang dùng và sau khi dùng: Budgets, Cost Explorer, CUR</h3>
<h4>AWS Budgets: đặt ngưỡng và nhận cảnh báo</h4>
<p><b>AWS Budgets</b> (ngân sách) cho bạn đặt một ngưỡng rồi <b>gửi cảnh báo</b> (qua email hoặc Amazon SNS) khi con số thực tế, hoặc con số <b>dự báo</b>, vượt ngưỡng. Có các loại budget:</p>
<ul>
<li><b>Cost budget</b>: theo dõi số tiền (ví dụ 200 USD/tháng).</li>
<li><b>Usage budget</b>: theo dõi mức dùng (ví dụ số GB, số giờ máy chạy).</li>
<li><b>Reservation budget</b> (RI/Savings Plans): báo khi <b>utilization</b> (tỷ lệ phần đã mua thực sự được dùng) hoặc <b>coverage</b> (tỷ lệ mức dùng được giảm giá che phủ) <b>tụt dưới</b> ngưỡng, nghĩa là bạn đang trả tiền cho phần đặt trước không dùng tới.</li>
</ul>
<p><b>Budgets actions</b> (hành động của Budgets): khi vượt ngưỡng, Budgets có thể <b>tự động</b> (hoặc chờ bạn duyệt) gắn một <b>IAM policy</b> hay <b>SCP</b> hạn chế (ví dụ chặn tạo tài nguyên mới), hoặc dừng máy EC2/RDS. Bạn không phải tự viết code.</p>
<h4>AWS Cost Anomaly Detection: phát hiện chi tiêu bất thường</h4>
<p>Đôi khi khó đặt một ngưỡng cố định vì chi phí lên xuống thất thường. <b>AWS Cost Anomaly Detection</b> (phát hiện chi phí bất thường) dùng <b>machine learning</b> (học máy) để học mức chi tiêu bình thường của bạn, rồi báo khi một dịch vụ hay tài khoản tiêu tiền bất thường, kèm <b>root cause analysis</b> (phân tích nguyên nhân gốc). Khác với Budgets: Budgets dựa trên ngưỡng <b>bạn đặt</b>, còn Anomaly Detection <b>tự học</b> thế nào là bất thường.</p>
<h4>AWS Cost Explorer: phân tích quá khứ và dự báo</h4>
<p><b>AWS Cost Explorer</b> hiển thị biểu đồ chi phí theo thời gian. Bạn lọc và nhóm theo dịch vụ, tài khoản thành viên (linked account), Region, tag… để xem tiền đi đâu. Nó còn <b>dự báo</b> chi phí trong tương lai dựa trên mức dùng trước đó. Cost Explorer cũng có báo cáo utilization/coverage của RI và Savings Plans (để xem), và <b>Savings Plans recommendations</b>: dựa vào lịch sử dùng thật của bạn để gợi ý nên cam kết bao nhiêu USD/giờ và tiết kiệm được bao nhiêu.</p>
<h4>AWS Cost and Usage Report (CUR)</h4>
<p><b>AWS Cost and Usage Report</b> (báo cáo chi phí và mức dùng) là nguồn dữ liệu <b>chi tiết nhất</b>: từng dòng mức dùng, từng tài nguyên, theo giờ hoặc theo ngày. Báo cáo được gửi vào một <b>S3 bucket</b> của bạn. Từ đó có thể phân tích bằng các công cụ như Amazon Athena hay Amazon Quick (trước đây là Amazon QuickSight). Hiện nay CUR được cấu hình qua tính năng Data Exports trong bảng điều khiển Billing.</p>
<h4>Billing dashboard</h4>
<p>Trang <b>Billing and Cost Management</b> (quản lý hóa đơn và chi phí) trong AWS Management Console là nơi xem tổng chi phí tháng này, hóa đơn các tháng trước, phương thức thanh toán, và vào các công cụ ở trên.</p>
<table>
<tr><th>Công cụ</th><th>Thời điểm</th><th>Dùng để</th></tr>
<tr><td>AWS Pricing Calculator</td><td>Trước khi dùng</td><td>Ước tính chi phí kiến trúc dự định</td></tr>
<tr><td>AWS Budgets</td><td>Đang dùng</td><td>Đặt ngưỡng (chi phí, mức dùng, RI/Savings Plans), cảnh báo khi vượt (thực tế hoặc dự báo), có thể tự hành động</td></tr>
<tr><td>AWS Cost Anomaly Detection</td><td>Đang dùng</td><td>ML tự phát hiện chi tiêu bất thường, kèm nguyên nhân gốc, không cần đặt ngưỡng</td></tr>
<tr><td>AWS Cost Explorer</td><td>Sau khi dùng</td><td>Biểu đồ, phân tích chi phí đã qua, dự báo tương lai</td></tr>
<tr><td>Cost and Usage Report</td><td>Sau khi dùng</td><td>Dữ liệu chi tiết nhất, gửi vào S3</td></tr>
</table>
<div class="box trap"><b>⚠️ Bẫy hay gặp</b><p>Budgets và Cost Explorer đều "có dự báo", dễ nhầm. Nhớ: muốn <b>nhận cảnh báo</b> khi vượt ngưỡng → <b>Budgets</b>. Muốn <b>xem biểu đồ, phân tích</b> chi phí → <b>Cost Explorer</b>. Còn ước tính khi <b>chưa có gì chạy</b> → <b>Pricing Calculator</b>, không phải Cost Explorer (Cost Explorer cần dữ liệu đã dùng).</p></div>

<h3>Cost allocation tags: biết tiền thuộc về ai</h3>
<p><b>Tag</b> (thẻ) là một nhãn dạng "khóa = giá trị" bạn gắn lên tài nguyên AWS, ví dụ <code>Project = Website</code> hoặc <code>Department = Marketing</code>. Khi dùng tag cho mục đích chia chi phí, ta gọi là <b>cost allocation tags</b> (thẻ phân bổ chi phí).</p>
<ul>
<li><b>AWS-generated tags</b>: AWS tự gắn, bạn không phải làm gì. Ví dụ tag <b>createdBy</b> ghi lại IAM user hoặc role nào đã tạo tài nguyên. Rất hữu ích khi kỹ sư hay quên tự gắn tag.</li>
<li><b>User-defined tags</b>: do bạn tự đặt tên và giá trị (ví dụ Project, Department). Phụ thuộc vào việc mọi người gắn tag đều đặn.</li>
</ul>
<p>Điểm quan trọng: <b>cả hai loại</b> đều phải được <b>kích hoạt (activate)</b> làm cost allocation tag trong trang Billing (do management account làm nếu dùng Organizations) thì mới xuất hiện trong Cost Explorer và báo cáo chi phí.</p>
<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>Trước khi lên AWS, Minh dùng <b>Pricing Calculator</b> ước tính chi phí và gửi cho chị Lan duyệt. Khi chạy thật, Minh đặt <b>AWS Budgets</b> 200 USD/tháng, vượt 80% thì gửi email cho cả hai chị em. Minh gắn tag <code>Project</code> cho tài nguyên của website, app đặt hàng và chatbot, rồi kích hoạt tag trong Billing. Cuối tháng, chị Lan mở <b>Cost Explorer</b> và thấy ngay chatbot tốn bao nhiêu so với website.</p></div>

<h3>AWS Organizations và consolidated billing</h3>
<p>Khi công ty lớn lên, người ta thường tách thành nhiều <b>AWS account</b> (tài khoản AWS): một cho môi trường thử nghiệm, một cho hệ thống thật, một cho từng phòng ban… để dễ phân quyền và tách chi phí.</p>
<p><b>AWS Organizations</b> giúp gom các tài khoản đó vào một tổ chức, quản lý tập trung từ một <b>management account</b> (tài khoản quản lý). Các tài khoản còn lại gọi là <b>member accounts</b> (tài khoản thành viên), có thể xếp vào các nhóm gọi là OU (Organizational Unit).</p>
<p>Tính năng <b>consolidated billing</b> (thanh toán hợp nhất) của Organizations mang lại:</p>
<ul>
<li><b>Một hóa đơn duy nhất</b> cho tất cả tài khoản, do <b>management account</b> thanh toán, nhưng vẫn xem được chi tiết từng tài khoản.</li>
<li><b>Giảm giá theo khối lượng</b> (volume discounts): mức dùng của các tài khoản được cộng dồn. Ví dụ S3 càng dùng nhiều thì đơn giá càng giảm, gộp lại sẽ đạt bậc giá rẻ hơn sớm hơn.</li>
<li>Giảm giá RI và Savings Plans được chia sẻ giữa các tài khoản (mặc định). Management account có thể tắt chia sẻ cho từng tài khoản.</li>
<li><b>Không tốn thêm phí</b> để dùng consolidated billing.</li>
</ul>
<p>Thêm một ý: Organizations có <b>SCPs</b> (Service Control Policies, chính sách kiểm soát dịch vụ) để đặt giới hạn tối đa những gì tài khoản thành viên được phép làm.</p>
<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>Khi mở chi nhánh Nhật, BánhNgon có ba tài khoản: Việt Nam, Nhật Bản và thử nghiệm. Minh gom cả ba vào AWS Organizations. Chị Lan chỉ nhận một hóa đơn mỗi tháng, mức dùng S3 cộng chung nên đơn giá tốt hơn, và Savings Plans mua ở tài khoản Việt Nam cũng giúp giảm tiền cho tài khoản Nhật.</p></div>
<div class="box exam"><b>🎯 Đề thi hay hỏi</b><ul>
<li>"estimate cost before migrating / before building" → AWS Pricing Calculator</li>
<li>"alert when costs exceed a threshold" / "forecasted cost exceeds budget" → AWS Budgets</li>
<li>"RI / Savings Plans utilization or coverage falls below X%" → AWS Budgets (reservation budget)</li>
<li>"automatically apply an IAM policy / SCP when budget is exceeded, no code" → AWS Budgets actions</li>
<li>"machine learning", "unusual spend", "root cause", không có ngưỡng cố định → AWS Cost Anomaly Detection</li>
<li>"recommend hourly commitment based on past usage" → Savings Plans recommendations trong Cost Explorer</li>
<li>"which IAM user/role created each resource" mà không phụ thuộc người gắn tag → kích hoạt AWS-generated tag createdBy</li>
<li>"visualize, analyze past costs, forecast" → AWS Cost Explorer</li>
<li>"most detailed / comprehensive cost and usage data, delivered to S3" → AWS Cost and Usage Report</li>
<li>"track costs by project or department" → cost allocation tags</li>
<li>"types of cost allocation tags" → AWS-generated và user-defined</li>
<li>"single bill, volume discounts for multiple accounts" → AWS Organizations consolidated billing</li>
</ul></div>
`,
    summary: [
      "Trước khi dùng: AWS Pricing Calculator để ước tính chi phí.",
      "Đang dùng: AWS Budgets đặt ngưỡng (cost, usage, RI/Savings Plans) và cảnh báo khi thực tế hoặc dự báo vượt ngưỡng; Budgets actions tự gắn IAM policy/SCP hạn chế.",
      "AWS Cost Anomaly Detection dùng ML tự phát hiện chi tiêu bất thường kèm nguyên nhân gốc, không cần ngưỡng cố định.",
      "Sau khi dùng: Cost Explorer để phân tích, dự báo và gợi ý Savings Plans; Cost and Usage Report là dữ liệu chi tiết nhất, gửi vào S3.",
      "Cost allocation tags gồm AWS-generated (ví dụ createdBy, AWS tự gắn) và user-defined; cả hai phải được kích hoạt trong Billing mới hiện trong báo cáo.",
      "AWS Organizations gom nhiều tài khoản; consolidated billing cho một hóa đơn, giảm giá theo khối lượng, miễn phí.",
      "SCPs trong Organizations giới hạn những gì tài khoản thành viên được làm."
    ],
    terms: [
      ["AWS Pricing Calculator", "máy tính ước tính giá AWS"],
      ["AWS Budgets", "đặt ngân sách và cảnh báo chi phí"],
      ["AWS Cost Explorer", "công cụ phân tích và dự báo chi phí"],
      ["Forecast", "dự báo"],
      ["Reservation budget (utilization / coverage)", "ngân sách theo dõi tỷ lệ dùng / độ che phủ của RI, Savings Plans"],
      ["Budgets actions", "hành động tự động khi vượt ngân sách"],
      ["AWS Cost Anomaly Detection", "phát hiện chi tiêu bất thường bằng ML"],
      ["AWS Cost and Usage Report (CUR)", "báo cáo chi phí và mức dùng chi tiết nhất"],
      ["Billing and Cost Management console", "trang quản lý hóa đơn và chi phí"],
      ["Tag", "thẻ gắn nhãn tài nguyên"],
      ["Cost allocation tags", "thẻ phân bổ chi phí"],
      ["AWS-generated / User-defined tags", "thẻ do AWS tạo / thẻ do người dùng tạo"],
      ["AWS Organizations", "dịch vụ quản lý nhiều tài khoản AWS"],
      ["Management account / Member account", "tài khoản quản lý / tài khoản thành viên"],
      ["Consolidated billing", "thanh toán hợp nhất"],
      ["Volume discounts", "giảm giá theo khối lượng"],
      ["Service Control Policies (SCPs)", "chính sách giới hạn quyền cho tài khoản thành viên"]
    ],
    qids: ["d4-3", "d4-4", "d4-5", "d4-7", "d4-9", "d4-19", "d4-20", "d4-17"]
  },
  {
    id: "4-4",
    module: 4,
    title: "AWS Support, tài nguyên kỹ thuật và đối tác",
    mins: 14,
    goals: [
      "Biết các gói AWS Support theo Exam Guide hiện tại và gói nào miễn phí",
      "Hiểu Trusted Advisor, AWS Health Dashboard dùng để làm gì",
      "Phân biệt các nguồn trợ giúp: re:Post, Knowledge Center, Prescriptive Guidance, tài liệu",
      "Biết khi nào tìm AWS Professional Services, AWS Partner Network, AWS Marketplace, Trust & Safety"
    ],
    html: `
<h3>Các gói AWS Support</h3>
<p>Khi dùng AWS, sẽ có lúc bạn gặp vấn đề: máy chủ lỗi, không hiểu hóa đơn, cần tư vấn kiến trúc. <b>AWS Support</b> (hỗ trợ của AWS) là các gói dịch vụ hỗ trợ khách hàng. Theo Exam Guide CLF-C02 hiện tại có các gói:</p>
<ul>
<li><b>Basic Support</b>: <b>miễn phí</b>, có sẵn cho <b>mọi khách hàng AWS</b>. Có <b>customer service 24/7</b> cho câu hỏi về tài khoản và hóa đơn, tài liệu, whitepaper, <b>AWS re:Post</b>, trang <b>AWS Health</b> cá nhân hóa và các <b>core checks</b> của <b>Trusted Advisor</b>. Điểm quan trọng nhất: gói Basic <b>không mở được technical support case</b> (case kỹ thuật); chỉ mở được case về tài khoản/hóa đơn (customer service) và <b>service limit increase</b> (tăng hạn mức).</li>
<li><b>AWS Business Support+</b>: gói trả phí thấp nhất, AWS khuyến nghị là <b>mức tối thiểu cho workload production</b>. Mở <b>technical support case</b> không giới hạn qua <b>phone, web và chat</b> 24/7 (có cả <b>AWS Support App in Slack</b> và <b>AWS Support API</b>). Có <b>full set</b> kiểm tra <b>Trusted Advisor</b>, <b>AWS Health API</b>, hỗ trợ bằng AI và <b>tư vấn kiến trúc</b> (architectural guidance) từ chuyên gia AWS. Hệ thống quan trọng bị sập: phản hồi <b>&lt; 30 phút</b>.</li>
<li><b>AWS Enterprise Support</b>: cho workload <b>business-critical</b> trên toàn tổ chức. Thêm <b>designated Technical Account Manager (TAM)</b> (người tư vấn kỹ thuật chuyên trách cho riêng bạn), <b>AWS Security Incident Response</b> không tính thêm phí, <b>Trusted Advisor Priority</b>, hỗ trợ sự kiện lớn/ra mắt sản phẩm (planned events) và dịch vụ chủ động. Hệ thống quan trọng bị sập: phản hồi <b>&lt; 15 phút</b>.</li>
<li><b>AWS Unified Operations</b>: gói cao nhất, cho workload <b>mission-critical</b> cần độ bền vững (resilience) cao. Ngoài TAM còn có <b>Domain Specialist Engineers</b> và <b>Incident Management Engineers</b>, <b>giám sát workload 24/7</b>. Sự cố nghiêm trọng: <b>Incident Management Engineer</b> phản hồi <b>&lt; 5 phút</b>.</li>
</ul>
<p>Theo trang <b>AWS Support Plans</b> (đối chiếu 11/2026), thời gian phản hồi ban đầu của 3 gói trả phí:</p>
<ul>
<li><b>Business/mission-critical system down</b>: Business Support+ &lt; 30 phút · Enterprise &lt; 15 phút · Unified Operations &lt; 5 phút.</li>
<li><b>Production system down</b>: &lt; 1 giờ (cả 3 gói).</li>
<li><b>Production system impaired</b>: &lt; 4 giờ (cả 3 gói).</li>
<li><b>System impaired</b>: &lt; 12 giờ (cả 3 gói).</li>
<li><b>General guidance</b>: &lt; 24 giờ (cả 3 gói).</li>
</ul>
<p> Đây là <b>mục tiêu phản hồi</b> AWS cố gắng đạt, không phải cam kết thời gian khắc phục. Giá từng gói xem trên trang <b>AWS Support Plans</b> và có thể thay đổi, đừng học thuộc con số giá cũ trên mạng.</p>
<table>
<tr><th>Tiêu chí</th><th>Basic Support</th><th>AWS Business Support+</th><th>AWS Enterprise Support</th><th>AWS Unified Operations</th></tr>
<tr><td>Chi phí</td><td>Miễn phí, mọi khách hàng</td><td>Trả phí</td><td>Trả phí</td><td>Trả phí</td></tr>
<tr><td>Khuyến nghị cho</td><td>Có sẵn cho mọi khách hàng</td><td>Workload production (mức tối thiểu)</td><td>Workload business-critical</td><td>Workload mission-critical</td></tr>
<tr><td>Technical support case</td><td>Không (chỉ account/billing và service limit increase)</td><td>Có, không giới hạn; phone, web, chat 24/7</td><td>Có, như Business Support+</td><td>Có, như Business Support+</td></tr>
<tr><td>Phản hồi sự cố hệ thống quan trọng (critical)</td><td>Không có</td><td>&lt; 30 phút</td><td>&lt; 15 phút</td><td>&lt; 5 phút (Incident Management Engineer)</td></tr>
<tr><td>Production system down</td><td>Không có</td><td>&lt; 1 giờ</td><td>&lt; 1 giờ</td><td>&lt; 1 giờ</td></tr>
<tr><td>Trusted Advisor</td><td>Core checks</td><td>Full set of checks</td><td>Full set + Trusted Advisor Priority</td><td>Full set + Trusted Advisor Priority</td></tr>
<tr><td>AWS Health</td><td>Health Dashboard cá nhân hóa, cảnh báo</td><td>Health Dashboard + <b>Health API</b></td><td>Health Dashboard + Health API</td><td>Health Dashboard + Health API + giám sát workload 24/7</td></tr>
<tr><td>Người chuyên trách</td><td>Không</td><td>Không (designated TAM bắt đầu từ Enterprise)</td><td><b>Designated TAM</b></td><td>Designated TAM + Domain Specialist Engineers + Incident Management Engineers</td></tr>
</table>
<div class="box exam"><b>🎯 Đề thi hay hỏi</b><ul>
<li>"included for all customers at no cost" → Basic Support</li>
<li>"cannot open technical support cases" / "only account and billing questions" → Basic Support</li>
<li>"minimum recommended plan for production workloads", "lowest-cost plan with 24/7 technical support", "full set of Trusted Advisor checks", "AWS Health API" (gói rẻ nhất có) → AWS Business Support+</li>
<li>"designated Technical Account Manager (TAM)", "Trusted Advisor Priority", "business-critical", "critical response &lt; 15 minutes" → AWS Enterprise Support</li>
<li>"mission-critical", "Incident Management Engineers", "domain specialist engineers", "response within 5 minutes", "24/7 workload monitoring" → AWS Unified Operations</li>
</ul></div>
<p>Nếu tài liệu ôn cũ nhắc tới các gói <b>Developer</b>, <b>Business</b> hay <b>Enterprise On-Ramp</b>: đó là các gói cũ đang bị khai tử. Từ <b>2/12/2025</b> AWS ngừng bán mới Developer và Business Support (thay bằng <b>Business Support+</b>); trong năm 2026, khách dùng Enterprise On-Ramp được tự động nâng lên <b>Enterprise Support</b>; và từ <b>1/1/2027</b> cả ba gói cũ chính thức ngừng hỗ trợ (riêng Region AWS GovCloud (US) vẫn giữ). Vì vậy đề luyện cũ có thể hỏi "Developer Support" hay "Enterprise On-Ramp TAM pool"; hãy biết tên đó nhưng học theo gói hiện tại. Khi đi thi, hãy dựa vào ý chính là gói Basic miễn phí, gói trả phí phản hồi nhanh hơn và có thêm chuyên gia hỗ trợ.</p>
<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>Giống bảo hành điện thoại. Ai mua máy cũng có bảo hành cơ bản miễn phí: tra cứu hướng dẫn, hỏi tổng đài về hóa đơn. Muốn có kỹ thuật viên ưu tiên, phản hồi nhanh, thậm chí một người chuyên lo cho riêng công ty mình thì mua gói bảo hành cao cấp hơn.</p></div>
<p>Nơi để <b>mở yêu cầu hỗ trợ</b> (support case) là <b>AWS Support Center</b> trong AWS Management Console. Với Basic Support, bạn vẫn mở được case về tài khoản và hóa đơn.</p>

<h3>AWS Trusted Advisor và AWS Health Dashboard</h3>
<h4>AWS Trusted Advisor</h4>
<p><b>AWS Trusted Advisor</b> (cố vấn tin cậy) tự động kiểm tra tài khoản của bạn và đưa ra khuyến nghị theo các nhóm:</p>
<ul>
<li><b>Cost optimization</b> (tối ưu chi phí): ví dụ máy chủ đang chạy không tải, ổ EBS không gắn vào đâu.</li>
<li><b>Performance</b> (hiệu năng).</li>
<li><b>Security</b> (bảo mật): ví dụ cổng mạng mở rộng rãi, tài khoản root chưa bật MFA.</li>
<li><b>Fault tolerance</b> (khả năng chịu lỗi): ví dụ thiếu bản sao lưu, chỉ chạy ở một AZ.</li>
<li><b>Service limits / quotas</b> (giới hạn dịch vụ): cảnh báo khi sắp chạm hạn mức.</li>
<li><b>Operational excellence</b> (vận hành xuất sắc): ví dụ thiếu cấu hình ghi log, giám sát theo khuyến nghị.</li>
</ul>
<p>Basic Support chỉ có một số kiểm tra cốt lõi; các gói cao hơn mở được nhiều kiểm tra hơn.</p>
<h4>AWS Health Dashboard</h4>
<p><b>AWS Health Dashboard</b> (bảng tình trạng sức khỏe AWS) cho biết tình trạng các dịch vụ AWS, đặc biệt là những sự cố hay lịch bảo trì <b>ảnh hưởng tới chính tài nguyên của bạn</b>, kèm hướng dẫn khắc phục. Khác với CloudTrail (ghi lại ai đã gọi API gì trong tài khoản của bạn). Còn <b>AWS Health API</b> cho phép phần mềm của bạn lấy những thông tin đó một cách tự động.</p>
<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>Một sáng website BánhNgon chậm bất thường. Minh mở <b>AWS Health Dashboard</b> và thấy AWS đang báo sự cố ở một AZ nơi máy chủ của mình chạy. Sau vụ đó, Minh xem <b>Trusted Advisor</b> và nhận được khuyến nghị: nên chạy ở nhiều AZ (fault tolerance) và xóa vài ổ EBS bỏ quên (cost optimization).</p></div>

<h3>Tài nguyên tự học và tự tra cứu</h3>
<ul>
<li><b>AWS re:Post</b>: cộng đồng hỏi đáp. Bạn đặt câu hỏi, người dùng khác và chuyên gia AWS trả lời.</li>
<li><b>AWS Knowledge Center</b>: các bài trả lời sẵn cho những câu hỏi, sự cố hay gặp, do AWS biên soạn (hiện nằm trên re:Post).</li>
<li><b>AWS Prescriptive Guidance</b>: các chiến lược, hướng dẫn, mẫu làm (pattern) đã được kiểm chứng để chuyển đổi, hiện đại hóa hệ thống lên cloud.</li>
<li><b>AWS Documentation</b> (tài liệu kỹ thuật), <b>whitepapers</b> (sách trắng, bài phân tích chuyên sâu) và <b>AWS blogs</b>: nguồn kiến thức chính thức, miễn phí.</li>
</ul>
<p>Tất cả nguồn trên đều <b>tự phục vụ (self-service) và miễn phí</b> cho mọi khách hàng, kể cả chỉ có Basic Support. Ngược lại, <b>AWS Professional Services</b>, đối tác APN hay các gói Support trả phí đều <b>tốn tiền</b>.</p>
<div class="box trap"><b>⚠️ Bẫy hay gặp</b><p>re:Post và Knowledge Center dễ lẫn. <b>re:Post</b> là <b>cộng đồng hỏi đáp</b> (community-driven Q&amp;A). <b>Knowledge Center</b> là <b>bài viết có sẵn</b> cho câu hỏi thường gặp. <b>Prescriptive Guidance</b> là <b>hướng dẫn chiến lược, pattern</b> cho migration. Còn <b>AWS Artifact</b> là nơi tải báo cáo tuân thủ, không phải nguồn hỏi đáp.</p></div>

<h3>Con người hỗ trợ: Professional Services, Partners, Trust &amp; Safety</h3>
<ul>
<li><b>AWS Professional Services</b>: đội chuyên gia của chính AWS, làm việc trực tiếp với khách hàng để đạt mục tiêu lớn như di chuyển (migration) quy mô lớn.</li>
<li><b>AWS Solutions Architects</b> (kiến trúc sư giải pháp, SA): nhân viên kỹ thuật của AWS (thường làm cùng đội account/bán hàng) giúp khách hàng <b>thiết kế kiến trúc</b> trên AWS: chọn dịch vụ phù hợp, áp dụng best practice của Well-Architected, rà soát bản thiết kế trước khi xây. Khác với Professional Services (đội tư vấn <b>trả phí</b> cùng làm dự án) và TAM (người theo sát vận hành, đi kèm gói Enterprise Support trở lên). Từ khóa đề: "guidance on designing / architecting a solution on AWS" → Solutions Architect.</li>
<li><b>AWS Partner Network (APN)</b> (mạng lưới đối tác AWS): các công ty bên ngoài hợp tác với AWS. Có hai kiểu chính: <b>system integrators</b>/công ty tư vấn, triển khai (thuê họ làm dự án) và <b>ISVs</b> (Independent Software Vendors, hãng phần mềm độc lập, bán phần mềm chạy trên AWS). Lợi ích khi tham gia APN (theo Exam Guide, task 4.3):
<ul>
<li><b>Partner training and certification</b>: đào tạo và chứng chỉ dành riêng cho nhân viên của đối tác.</li>
<li><b>Partner events</b>: sự kiện dành cho đối tác (hội nghị, workshop, buổi cập nhật sản phẩm).</li>
<li><b>Partner volume discounts</b>: giá ưu đãi theo khối lượng dành cho đối tác.</li>
<li>Được <b>công nhận chuyên môn</b> qua chương trình <b>AWS Competency</b> (ví dụ chuyên về migration, bảo mật).</li>
<li>Hỗ trợ <b>go-to-market</b>: tiếp thị, bán hàng chung, xuất hiện trong danh bạ đối tác (Partner Solutions Finder) để khách tìm thấy.</li>
<li><b>Funding</b>: quỹ hỗ trợ từ AWS, ví dụ cho dự án migration hay thử nghiệm (proof of concept) với khách hàng.</li>
</ul> Lưu ý: tham gia APN <b>không</b> có nghĩa là khách hàng của đối tác được tặng gói Support trả phí.</li>
<li><b>AWS Trust &amp; Safety team</b>: đội xử lý <b>lạm dụng</b> (abuse). Nếu thấy tài nguyên AWS bị dùng để gửi spam, tấn công, lừa đảo… bạn báo cho đội này.</li>
</ul>

<h3>AWS Marketplace</h3>
<p><b>AWS Marketplace</b> là "chợ phần mềm" trực tuyến: bạn tìm, mua và triển khai nhanh phần mềm của bên thứ ba (bảo mật, giám sát, database…) chạy trên AWS. Tiền mua được <b>tính chung vào hóa đơn AWS</b> của bạn, không cần làm hợp đồng thanh toán riêng với từng hãng. Vì nằm trong hóa đơn AWS, chi phí phần mềm xem và phân tích được bằng các công cụ như Cost Explorer.</p>
<ul>
<li>Phía <b>người bán</b>: hãng phần mềm (ISV) muốn bán sản phẩm, kể cả SaaS, cho khách AWS thì <b>đăng sản phẩm lên AWS Marketplace</b>.</li>
<li><b>Private Marketplace</b> (chợ riêng): công ty tạo một <b>danh mục sản phẩm đã duyệt</b>; nhân viên ở mọi tài khoản trong tổ chức chỉ thấy và chỉ đăng ký được những sản phẩm trong danh mục đó. Dùng để kiểm soát mua sắm (governance).</li>
<li><b>Entitlement</b> (quyền sử dụng đã mua): mỗi lần đăng ký sản phẩm trên Marketplace, bạn nhận quyền sử dụng theo hợp đồng (số license, số người dùng, thời hạn). Các quyền này được theo dõi tập trung (ví dụ trong <b>AWS License Manager</b>) và chia sẻ được cho các tài khoản khác trong tổ chức. Exam Guide (task 4.3) nhắc Marketplace với ba vai trò: <b>quản lý chi phí</b> (tính chung hóa đơn AWS), <b>quản trị</b> (Private Marketplace) và <b>entitlement</b>.</li>
</ul>
<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>Để mở rộng sang Nhật, chị Lan thuê một <b>đối tác APN</b> có kinh nghiệm migration giúp thiết kế hệ thống. Minh mua một phần mềm tường lửa trên <b>AWS Marketplace</b>, tiền nằm luôn trong hóa đơn AWS. Một hôm, Minh phát hiện có máy chủ trên AWS liên tục gửi spam tới hộp thư của tiệm, Minh báo cho <b>AWS Trust &amp; Safety</b>.</p></div>

<h3>Bảng nhanh: cần gì → tìm ở đâu</h3>
<table>
<tr><th>Nhu cầu</th><th>Tìm tới</th></tr>
<tr><td>Hỗ trợ miễn phí có sẵn cho mọi tài khoản</td><td>Basic Support</td></tr>
<tr><td>Mở yêu cầu hỗ trợ (support case)</td><td>AWS Support Center</td></tr>
<tr><td>Khuyến nghị tiết kiệm, bảo mật, chịu lỗi, giới hạn dịch vụ</td><td>AWS Trusted Advisor</td></tr>
<tr><td>Sự cố/bảo trì AWS ảnh hưởng tài nguyên của mình</td><td>AWS Health Dashboard / Health API</td></tr>
<tr><td>Hỏi cộng đồng và chuyên gia</td><td>AWS re:Post</td></tr>
<tr><td>Bài trả lời sẵn cho câu hỏi thường gặp</td><td>AWS Knowledge Center</td></tr>
<tr><td>Chiến lược, pattern cho migration</td><td>AWS Prescriptive Guidance</td></tr>
<tr><td>Đội chuyên gia AWS làm dự án lớn cùng mình</td><td>AWS Professional Services</td></tr>
<tr><td>Tư vấn thiết kế kiến trúc giải pháp trên AWS</td><td>AWS Solutions Architects</td></tr>
<tr><td>Thuê công ty bên ngoài tư vấn, triển khai</td><td>AWS Partner Network</td></tr>
<tr><td>Mua phần mềm bên thứ ba, trả qua hóa đơn AWS</td><td>AWS Marketplace</td></tr>
<tr><td>Báo cáo tài nguyên AWS bị dùng để lạm dụng</td><td>AWS Trust &amp; Safety</td></tr>
</table>
<div class="box exam"><b>🎯 Đề thi hay hỏi</b><ul>
<li>"support plan included at no additional cost" → Basic Support</li>
<li>"open a technical support case" → AWS Support Center</li>
<li>"recommendations to reduce cost, idle resources, security, service limits" → AWS Trusted Advisor</li>
<li>"events and scheduled maintenance affecting my resources" → AWS Health Dashboard</li>
<li>"community-driven Q&amp;A" → AWS re:Post</li>
<li>"proven strategies, guides, patterns for migration" → AWS Prescriptive Guidance</li>
<li>"global team of AWS experts for business outcomes" → AWS Professional Services</li>
<li>"hire a partner to help migrate" → AWS Partner Network</li>
<li>"buy third-party software, billed through AWS" → AWS Marketplace; "sell my software/SaaS to AWS customers" → đăng lên AWS Marketplace</li>
<li>"curated list of approved products", "control which products teams can subscribe to" → Private Marketplace</li>
<li>"manage and share licenses/entitlements for software bought on AWS Marketplace" → AWS Marketplace (theo dõi bằng AWS License Manager)</li>
<li>"training and certification, partner events, volume discounts, recognized expertise, go-to-market support, funding for a partner company" → tham gia APN (AWS Competency/specializations)</li>
<li>"help designing an architecture / guidance on how to build on AWS" → AWS Solutions Architects</li>
<li>"self-service, no additional cost" → re:Post, Knowledge Center, Prescriptive Guidance, documentation (không phải Professional Services)</li>
<li>"AWS resources used for spam / abuse" → AWS Trust &amp; Safety</li>
</ul></div>
`,
    summary: [
      "Gói Support theo Exam Guide: Basic Support (miễn phí, mọi tài khoản), AWS Business Support+, AWS Enterprise Support, AWS Unified Operations; xem chi tiết trên trang chính thức.",
      "Mở support case ở AWS Support Center.",
      "Trusted Advisor kiểm tra cost optimization, performance, security, fault tolerance, service limits và operational excellence.",
      "AWS Health Dashboard và Health API báo sự cố, bảo trì ảnh hưởng tới tài nguyên của bạn.",
      "re:Post là cộng đồng hỏi đáp; Knowledge Center là bài trả lời sẵn; Prescriptive Guidance là chiến lược và pattern.",
      "Professional Services là chuyên gia của AWS (trả phí); APN gồm đối tác tư vấn/triển khai và ISV, được đào tạo, công nhận chuyên môn, hỗ trợ go-to-market.",
      "AWS Marketplace bán phần mềm bên thứ ba tính vào hóa đơn AWS; Private Marketplace giới hạn danh mục sản phẩm đã duyệt.",
      "Báo cáo lạm dụng tài nguyên AWS cho AWS Trust & Safety."
    ],
    terms: [
      ["AWS Support plans", "các gói hỗ trợ của AWS"],
      ["Basic Support", "gói hỗ trợ cơ bản miễn phí"],
      ["Support case", "yêu cầu hỗ trợ"],
      ["AWS Support Center", "trung tâm mở và theo dõi yêu cầu hỗ trợ"],
      ["AWS Trusted Advisor", "công cụ kiểm tra và đưa khuyến nghị cho tài khoản"],
      ["Service limits / quotas", "giới hạn, hạn mức dịch vụ"],
      ["AWS Health Dashboard", "bảng tình trạng dịch vụ và tài nguyên"],
      ["AWS re:Post", "cộng đồng hỏi đáp về AWS"],
      ["AWS Knowledge Center", "kho bài trả lời câu hỏi thường gặp"],
      ["AWS Prescriptive Guidance", "hướng dẫn chiến lược và pattern đã kiểm chứng"],
      ["AWS Professional Services", "đội chuyên gia tư vấn của AWS"],
      ["AWS Partner Network (APN)", "mạng lưới đối tác AWS"],
      ["ISV (Independent Software Vendor)", "hãng phần mềm độc lập"],
      ["AWS Marketplace", "chợ phần mềm bên thứ ba trên AWS"],
      ["Private Marketplace", "danh mục sản phẩm Marketplace đã được công ty duyệt"],
      ["AWS Trust & Safety", "đội xử lý báo cáo lạm dụng"]
    ],
    qids: ["d4-10", "d4-11", "d4-13", "d4-21", "d4-22", "d4-23", "d4-24", "d4-25", "d4-26", "d3-77"]
  }
);
