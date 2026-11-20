(window.CLF.course = window.CLF.course || []).push(
  {
    id: "3-8",
    module: 3,
    title: "Cơ sở dữ liệu trên AWS (Databases)",
    mins: 16,
    goals: [
      "Hiểu database là gì và phân biệt các kiểu: relational, NoSQL, document, graph, in-memory, data warehouse",
      "Biết vì sao dùng database được quản lý (managed) như Amazon RDS thay vì tự cài trên EC2",
      "Chọn đúng dịch vụ: RDS, Aurora, DynamoDB, DocumentDB, Neptune, ElastiCache, Redshift",
      "Phân biệt OLTP và OLAP, biết DMS và SCT dùng để chuyển database lên AWS"
    ],
    html: `
<h3>1. Database là gì? Vì sao có nhiều loại?</h3>
<p><b>Database</b> (cơ sở dữ liệu) là nơi lưu dữ liệu một cách có tổ chức để phần mềm có thể tìm, thêm, sửa, xóa thật nhanh. Một file Excel cũng lưu dữ liệu, nhưng khi có hàng nghìn người cùng đặt hàng một lúc thì Excel không chịu nổi. Database được thiết kế cho việc đó.</p>
<p>Dữ liệu ngoài đời có nhiều "hình dạng" khác nhau, nên database cũng có nhiều loại. Không có loại nào tốt nhất cho mọi việc. Đề thi CLF-C02 chủ yếu kiểm tra bạn có <b>chọn đúng loại cho đúng việc</b> hay không.</p>

<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>Hãy nghĩ tới các cách cất đồ trong nhà: <b>tủ hồ sơ có ngăn và nhãn rõ ràng</b> (relational), <b>hộp đựng đồ có dán số</b> để lấy cực nhanh theo số (key-value), <b>bìa kẹp hồ sơ</b> mỗi bìa chứa cả một tờ đơn đầy đủ (document), <b>bảng ghim ảnh nối bằng dây đỏ</b> như phim trinh thám (graph), <b>tờ giấy nhớ dán ngay trên bàn</b> để khỏi phải mở tủ (in-memory cache), và <b>nhà kho lưu sổ sách nhiều năm</b> để tổng kết cuối năm (data warehouse).</p></div>

<h4>Các kiểu database chính</h4>
<ul>
<li><b>Relational database</b> (cơ sở dữ liệu quan hệ): dữ liệu nằm trong các <b>table</b> (bảng) có hàng và cột cố định, các bảng liên kết với nhau. Ví dụ bảng Khách hàng nối với bảng Đơn hàng. Dùng ngôn ngữ <b>SQL</b> để truy vấn. Hợp với dữ liệu có cấu trúc rõ ràng, cần chính xác tuyệt đối như đơn hàng, thanh toán.</li>
<li><b>NoSQL</b> ("không chỉ SQL"): không ép dữ liệu vào bảng cố định, cấu trúc linh hoạt, mở rộng rất lớn. Kiểu phổ biến nhất là <b>key-value</b> (khóa - giá trị): đưa một "chìa khóa" (ví dụ mã giỏ hàng) là lấy ngay được giá trị.</li>
<li><b>Document database</b> (cơ sở dữ liệu tài liệu): một loại NoSQL, lưu mỗi bản ghi thành một "tài liệu" dạng JSON, mỗi tài liệu có thể có trường khác nhau. Ví dụ mô tả sản phẩm: bánh kem có "kích thước", bánh quy có "trọng lượng hộp".</li>
<li><b>Graph database</b> (cơ sở dữ liệu đồ thị): lưu các "điểm" và "mối quan hệ" giữa chúng. Rất giỏi trả lời câu hỏi kiểu "bạn của bạn tôi thích món gì", phát hiện gian lận, gợi ý sản phẩm.</li>
<li><b>In-memory database / cache</b> (lưu trong bộ nhớ RAM): RAM nhanh hơn ổ đĩa rất nhiều. Dùng để lưu tạm dữ liệu hay được đọc, giúp ứng dụng phản hồi trong tích tắc.</li>
<li><b>Data warehouse</b> (kho dữ liệu): gom dữ liệu từ nhiều nguồn, lưu lâu dài, dùng để <b>phân tích</b> và làm báo cáo, không dùng cho việc bán hàng hằng ngày.</li>
</ul>

<h3>2. Tự cài database trên EC2 hay dùng dịch vụ managed?</h3>
<p>Có hai cách chạy database trên AWS. Cách thứ nhất: thuê một máy chủ ảo <b>EC2</b> rồi tự cài phần mềm database (MySQL chẳng hạn). Bạn có toàn quyền, nhưng cũng tự lo mọi thứ: cài bản vá hệ điều hành, nâng cấp database, sao lưu, nhân bản dự phòng, theo dõi ổ đĩa đầy.</p>
<p>Cách thứ hai: dùng dịch vụ <b>managed</b> (được quản lý), tiêu biểu là <b>Amazon RDS</b> (Relational Database Service). AWS lo phần cứng, cài đặt, vá lỗi phần mềm database và hệ điều hành bên dưới, sao lưu tự động. Bạn chỉ lo dữ liệu, cách thiết kế bảng, quyền truy cập và tối ưu câu truy vấn.</p>
<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>Tự cài trên EC2 giống <b>tự nuôi bò để có sữa</b>: toàn quyền, nhưng ngày nào cũng phải cho ăn, dọn chuồng. Dùng RDS giống <b>đặt sữa giao tận nhà</b>: bạn chỉ việc dùng sữa, chuyện chăm bò để người khác lo.</p></div>
<p>RDS hỗ trợ nhiều "engine" (loại phần mềm database) quen thuộc: MySQL, PostgreSQL, MariaDB, Oracle, Microsoft SQL Server, Db2 và Aurora. Tính năng hay gặp trong đề: <b>Multi-AZ</b> (có bản dự phòng ở Availability Zone khác, tự chuyển sang khi bản chính hỏng, phục vụ <b>high availability</b>) và <b>read replica</b> (bản sao chỉ đọc, giúp chia tải đọc, phục vụ <b>hiệu năng</b>).</p>

<h3>3. Các dịch vụ database của AWS</h3>
<h4>Amazon Aurora</h4>
<p>Database quan hệ do AWS tự xây cho đám mây, <b>tương thích MySQL và PostgreSQL</b> (ứng dụng viết cho MySQL/PostgreSQL chạy được trên Aurora mà ít phải sửa). Aurora cho hiệu năng cao hơn MySQL/PostgreSQL thông thường, tự lưu nhiều bản sao dữ liệu trên nhiều AZ. Aurora được quản lý qua RDS. Có cả bản <b>Aurora Serverless</b> tự co giãn theo tải.</p>
<h4>Amazon DynamoDB</h4>
<p>Database <b>NoSQL key-value và document</b>, <b>serverless</b> (không có máy chủ nào để bạn quản lý), tốc độ phản hồi cỡ <b>single-digit millisecond</b> (vài mili giây) ở mọi quy mô. Hợp với giỏ hàng, phiên đăng nhập, bảng xếp hạng game, dữ liệu IoT, những thứ có lượng truy cập cực lớn và cấu trúc đơn giản.</p>
<h4>Amazon DocumentDB</h4>
<p>Database dạng document, <b>tương thích MongoDB</b> (MongoDB là một database document mã nguồn mở rất phổ biến). Công ty đang dùng MongoDB muốn lên AWS dạng managed thì chọn DocumentDB.</p>
<h4>Amazon Neptune</h4>
<p>Database <b>graph</b>. Hợp với mạng xã hội, gợi ý sản phẩm ("người mua bánh này cũng mua..."), phát hiện gian lận, những dữ liệu mà <b>mối quan hệ</b> quan trọng hơn bản thân từng dòng dữ liệu.</p>
<h4>Amazon ElastiCache</h4>
<p>Dịch vụ <b>cache trong bộ nhớ</b> (in-memory), hỗ trợ các engine Valkey, Redis OSS và Memcached. Đặt ElastiCache phía trước database để giữ sẵn kết quả hay được hỏi, giảm tải cho database và tăng tốc ứng dụng nhiều đọc (read-heavy).</p>
<h4>Amazon Redshift</h4>
<p><b>Data warehouse</b> của AWS, dùng để chạy truy vấn phân tích phức tạp trên khối dữ liệu rất lớn (tới mức petabyte). Đây là công cụ của bộ phận phân tích, không phải database cho website bán hàng.</p>

<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>Minh thiết kế dữ liệu cho BánhNgon như sau. Đơn hàng, khách hàng, thanh toán cần chính xác và liên kết chặt chẽ, nên dùng <b>Aurora</b> (MySQL-compatible) vì code cũ viết cho MySQL. Giỏ hàng của hàng nghìn người cùng lúc trong dịp Trung thu được lưu ở <b>DynamoDB</b>. Danh mục bánh có thông tin mỗi loại một kiểu, lưu ở <b>DocumentDB</b> vì đội cũ quen MongoDB. Tính năng "khách hay mua kèm" dùng <b>Neptune</b>. Trang chủ hiển thị "top 10 bánh bán chạy" được giữ sẵn trong <b>ElastiCache</b> để không phải hỏi database liên tục. Cuối năm, chị Lan muốn xem doanh số 3 năm theo từng chi nhánh Hà Nội, TP.HCM, Nhật Bản: dữ liệu được đưa vào <b>Redshift</b> để phân tích.</p></div>

<h3>4. Bảng so sánh và OLTP với OLAP</h3>
<table>
<tr><th>Dịch vụ</th><th>Loại</th><th>Từ khóa trong đề</th></tr>
<tr><td>Amazon RDS</td><td>Relational, managed</td><td>MySQL, PostgreSQL, Oracle, SQL Server; giảm việc quản trị; Multi-AZ, read replica</td></tr>
<tr><td>Amazon Aurora</td><td>Relational, AWS tự xây</td><td>MySQL/PostgreSQL-compatible, hiệu năng cao, built for the cloud</td></tr>
<tr><td>Amazon DynamoDB</td><td>NoSQL key-value/document, serverless</td><td>single-digit millisecond, any scale, NoSQL</td></tr>
<tr><td>Amazon DocumentDB</td><td>Document</td><td>MongoDB-compatible</td></tr>
<tr><td>Amazon Neptune</td><td>Graph</td><td>highly connected data, social network, relationships</td></tr>
<tr><td>Amazon ElastiCache</td><td>In-memory cache</td><td>caching, read-heavy, in-memory, Redis/Memcached</td></tr>
<tr><td>Amazon Redshift</td><td>Data warehouse</td><td>analytics, petabyte, OLAP, business intelligence</td></tr>
</table>
<p>Hai từ viết tắt hay xuất hiện:</p>
<ul>
<li><b>OLTP</b> (Online Transaction Processing, xử lý giao dịch trực tuyến): rất nhiều thao tác nhỏ, nhanh, liên tục như "thêm 1 đơn hàng", "trừ 1 hộp bánh trong kho". Dùng RDS, Aurora, DynamoDB.</li>
<li><b>OLAP</b> (Online Analytical Processing, xử lý phân tích): ít truy vấn hơn nhưng mỗi truy vấn "to", quét hàng triệu dòng để trả lời câu hỏi kiểu "tháng nào bán chạy nhất 3 năm qua". Dùng Redshift.</li>
</ul>
<div class="box trap"><b>⚠️ Bẫy hay gặp</b><p>Thấy chữ "relational" chưa chắc là RDS: nếu đề nhấn mạnh <b>"analytics", "data warehouse", "petabyte"</b> thì là <b>Redshift</b>. Thấy "NoSQL" thì nghĩ ngay <b>DynamoDB</b>, nhưng nếu có chữ <b>"MongoDB"</b> thì là <b>DocumentDB</b>. ElastiCache là <b>cache</b> đứng trước database, không thay thế database chính. Và nhớ: dùng RDS thì AWS vá hệ điều hành và engine database, còn tự cài trên EC2 thì <b>bạn</b> vá.</p></div>

<h3>5. Chuyển database lên AWS: DMS và SCT</h3>
<p><b>AWS DMS</b> (Database Migration Service, dịch vụ di chuyển database) chép dữ liệu từ database cũ sang database trên AWS. Điểm mạnh: database nguồn <b>vẫn hoạt động bình thường</b> trong lúc chuyển, và DMS có thể <b>sao chép liên tục</b> các thay đổi mới, nên thời gian ngừng (downtime) rất ngắn.</p>
<p>Nếu chuyển giữa hai loại database <b>khác nhau</b> (ví dụ Oracle sang Aurora PostgreSQL), cấu trúc bảng, kiểu dữ liệu, code bên trong database cần được "dịch" lại. Việc đó do <b>AWS SCT</b> (Schema Conversion Tool, công cụ chuyển đổi lược đồ) đảm nhiệm. <b>Schema</b> (lược đồ) là "bản thiết kế" của database: có những bảng nào, cột nào, kiểu gì.</p>
<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>Chuyển nhà sang nước khác: <b>SCT</b> là người vẽ lại bản thiết kế tủ kệ cho hợp ổ điện và kích thước nhà mới; <b>DMS</b> là xe tải chở đồ, chở dần từng chuyến trong khi bạn vẫn sống ở nhà cũ.</p></div>
<div class="box exam"><b>🎯 Đề thi hay hỏi</b><ul>
<li>"fully managed NoSQL, single-digit millisecond" → <b>DynamoDB</b></li>
<li>"MySQL and PostgreSQL compatible, built for the cloud, higher performance" → <b>Aurora</b></li>
<li>"MongoDB compatible" → <b>DocumentDB</b></li>
<li>"highly connected relationships / social network" → <b>Neptune</b></li>
<li>"caching, read-heavy, in-memory" → <b>ElastiCache</b></li>
<li>"complex analytical queries, petabytes, data warehouse" → <b>Redshift</b></li>
<li>"benefit of RDS over database on EC2" → AWS lo patching, backup, high availability</li>
<li>"migrate database with minimal downtime" → <b>DMS</b>; "convert the schema" giữa hai engine khác nhau → <b>SCT</b></li>
</ul></div>
`,
    summary: [
      "Relational (bảng, SQL): RDS và Aurora. Aurora tương thích MySQL/PostgreSQL, hiệu năng cao hơn.",
      "NoSQL key-value serverless, vài mili giây ở mọi quy mô: DynamoDB. MongoDB-compatible: DocumentDB.",
      "Graph (quan hệ chằng chịt): Neptune. Cache trong RAM: ElastiCache. Data warehouse phân tích: Redshift.",
      "Dùng RDS thay vì tự cài trên EC2: AWS lo cài đặt, vá lỗi, sao lưu, Multi-AZ.",
      "OLTP = giao dịch nhỏ, liên tục (RDS, Aurora, DynamoDB). OLAP = phân tích lớn (Redshift).",
      "DMS chuyển dữ liệu với downtime tối thiểu; SCT chuyển đổi schema khi đổi loại database."
    ],
    terms: [
      ["Relational database", "cơ sở dữ liệu quan hệ"],
      ["NoSQL database", "cơ sở dữ liệu phi quan hệ"],
      ["Key-value", "khóa - giá trị"],
      ["Document database", "cơ sở dữ liệu tài liệu"],
      ["Graph database", "cơ sở dữ liệu đồ thị"],
      ["In-memory cache", "bộ nhớ đệm trong RAM"],
      ["Data warehouse", "kho dữ liệu"],
      ["Managed service", "dịch vụ được quản lý"],
      ["Read replica", "bản sao chỉ đọc"],
      ["Multi-AZ deployment", "triển khai trên nhiều Availability Zone"],
      ["OLTP", "xử lý giao dịch trực tuyến"],
      ["OLAP", "xử lý phân tích trực tuyến"],
      ["Schema", "lược đồ (bản thiết kế) database"],
      ["Database migration", "di chuyển cơ sở dữ liệu"]
    ],
    qids: ["d3-4", "d3-13", "d3-14", "d3-15", "d3-41", "d3-42", "d3-43", "d3-37", "d1-23", "d2-18"]
  },

  {
    id: "3-9",
    module: 3,
    title: "Mạng riêng ảo Amazon VPC",
    mins: 14,
    goals: [
      "Hiểu VPC là gì và vì sao mọi tài nguyên như EC2, RDS đều nằm trong một mạng riêng",
      "Phân biệt public subnet và private subnet, vai trò của route table, internet gateway, NAT gateway",
      "Nhớ lại khác biệt giữa security group và network ACL",
      "Biết VPC peering và VPC Flow Logs dùng để làm gì"
    ],
    html: `
<h3>1. Mạng máy tính và địa chỉ IP, nói thật đơn giản</h3>
<p><b>Network</b> (mạng máy tính) là các máy tính nối với nhau để trao đổi dữ liệu. Mỗi máy trong mạng có một <b>IP address</b> (địa chỉ IP), giống như số nhà, để dữ liệu biết đường mà tới. Ví dụ 10.0.1.25.</p>
<p>Có địa chỉ IP <b>public</b> (công khai, ai trên Internet cũng gửi tới được) và địa chỉ IP <b>private</b> (riêng, chỉ dùng bên trong mạng nội bộ). Ở nhà bạn, điện thoại và laptop dùng IP private, còn cái modem Wi-Fi mới là thứ nói chuyện với Internet.</p>

<h3>2. Amazon VPC: khu nhà riêng có cổng gác</h3>
<p><b>Amazon VPC</b> (Virtual Private Cloud, đám mây riêng ảo) là một mạng riêng, tách biệt về mặt logic, mà bạn tạo ra trong một AWS Region. Bạn tự quyết dải địa chỉ IP, chia mạng thành các phần nhỏ, quy định đường đi và ai được ra vào. Các máy EC2, database RDS... đều được đặt bên trong một VPC.</p>
<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>VPC giống một <b>khu đô thị có tường rào và cổng gác</b>. Bên trong chia thành các <b>khu nhà</b> (subnet). Có khu mặt tiền giáp đường lớn để đón khách (public subnet), có khu bên trong, người lạ không vào thẳng được (private subnet). <b>Biển chỉ đường</b> trong khu là route table, <b>cổng chính</b> ra đường lớn là internet gateway, còn mỗi căn nhà có <b>bảo vệ riêng</b> ở cửa (security group) và mỗi khu có <b>trạm kiểm soát</b> ở lối vào (network ACL).</p></div>
<p>Một VPC nằm trong <b>một Region</b> nhưng trải rộng qua nhiều Availability Zone. Mỗi tài khoản AWS có sẵn một <b>default VPC</b> ở mỗi Region để bạn dùng ngay, nhưng doanh nghiệp thường tự tạo VPC theo thiết kế của mình.</p>

<h3>3. Subnet, route table, internet gateway, NAT gateway</h3>
<h4>Subnet (mạng con)</h4>
<p><b>Subnet</b> là một phần nhỏ của VPC, mỗi subnet nằm gọn trong <b>một Availability Zone</b>. Muốn chịu lỗi tốt, bạn tạo subnet ở ít nhất hai AZ.</p>
<ul>
<li><b>Public subnet</b> (subnet công khai): có đường đi ra Internet qua internet gateway. Đặt những thứ cần đón khách từ Internet, như load balancer hoặc web server.</li>
<li><b>Private subnet</b> (subnet riêng): không có đường trực tiếp từ Internet vào. Đặt database, máy xử lý nội bộ, những thứ không nên lộ ra ngoài.</li>
</ul>
<h4>Route table (bảng định tuyến)</h4>
<p><b>Route table</b> là danh sách quy tắc "muốn đi tới địa chỉ X thì đi qua lối Y". Mỗi subnet gắn với một route table. Chính route table quyết định subnet là public hay private: subnet nào có tuyến đường tới <b>internet gateway</b> thì là public subnet.</p>
<h4>Internet gateway (cổng Internet)</h4>
<p><b>Internet gateway</b> gắn vào VPC, cho phép tài nguyên trong public subnet (có IP public) giao tiếp hai chiều với Internet. Không có nó, VPC hoàn toàn bị cô lập với Internet.</p>
<h4>NAT gateway</h4>
<p>Máy trong private subnet đôi khi cần <b>đi ra</b> Internet, ví dụ để tải bản cập nhật phần mềm, nhưng không muốn ai từ ngoài <b>đi vào</b>. <b>NAT gateway</b> (Network Address Translation, chuyển đổi địa chỉ mạng) giải quyết chuyện này. Nó được đặt trong public subnet; máy ở private subnet gửi yêu cầu ra ngoài qua NAT gateway, câu trả lời quay về được, nhưng kết nối do bên ngoài chủ động mở thì bị chặn.</p>
<div class="flow"><span>Máy trong private subnet</span><span>NAT gateway (public subnet)</span><span>Internet gateway</span><span>Internet</span></div>
<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>NAT gateway giống <b>người đi chợ hộ</b>: người trong khu nhà kín nhờ anh ta ra ngoài mua đồ và mang về, nhưng người bán hàng ngoài chợ không biết nhà ai và không tự gõ cửa vào được.</p></div>

<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>Minh tạo một VPC cho BánhNgon ở Region Singapore, chia thành 2 AZ. Mỗi AZ có một <b>public subnet</b> chứa load balancer đón khách đặt bánh, và một <b>private subnet</b> chứa các máy EC2 chạy ứng dụng cùng database Aurora. Route table của public subnet có đường tới <b>internet gateway</b>; route table của private subnet thì không, mà chỉ có đường ra <b>NAT gateway</b> để các máy EC2 tải bản vá hệ điều hành. Nhờ vậy, kẻ xấu trên Internet không thể gõ thẳng vào database chứa thông tin khách hàng.</p></div>

<h3>4. Security group và network ACL (nhắc lại từ Domain 2)</h3>
<p>Bạn đã gặp hai "lớp tường lửa" này trong phần bảo mật (Domain 2). <b>Firewall</b> (tường lửa) là bộ lọc quyết định lưu lượng mạng nào được đi qua. Nhắc lại ngắn gọn:</p>
<table>
<tr><th></th><th>Security group</th><th>Network ACL (NACL)</th></tr>
<tr><td>Bảo vệ ở mức</td><td>Từng tài nguyên (instance, ENI)</td><td>Cả subnet</td></tr>
<tr><td>Loại quy tắc</td><td>Chỉ có <b>allow</b> (cho phép)</td><td>Có cả <b>allow</b> và <b>deny</b> (chặn)</td></tr>
<tr><td>Nhớ trạng thái</td><td><b>Stateful</b>: cho vào thì tự cho phản hồi đi ra</td><td><b>Stateless</b>: chiều vào và chiều ra phải khai báo riêng</td></tr>
<tr><td>Ẩn dụ</td><td>Bảo vệ ở cửa từng căn nhà</td><td>Trạm kiểm soát ở lối vào cả khu</td></tr>
</table>
<div class="box trap"><b>⚠️ Bẫy hay gặp</b><p>Muốn <b>chặn một địa chỉ IP cụ thể</b> thì phải dùng <b>network ACL</b>, vì security group không có quy tắc deny. Và đừng nhầm: <b>subnet thuộc một AZ</b>, <b>VPC thuộc một Region</b>. Ngoài ra "public subnet" không phải do đặt tên, mà do route table có đường tới internet gateway.</p></div>

<h3>5. VPC peering và VPC Flow Logs</h3>
<h4>VPC peering</h4>
<p><b>VPC peering</b> (kết nối ngang hàng VPC) nối riêng <b>hai VPC</b> với nhau để chúng nói chuyện bằng IP private như thể chung một mạng, không cần đi qua Internet. Hai VPC có thể khác tài khoản, thậm chí khác Region. Lưu ý peering <b>không bắc cầu</b> (non-transitive): A nối B, B nối C, không có nghĩa A nói chuyện được với C. Khi có rất nhiều VPC, người ta dùng <b>AWS Transit Gateway</b> làm trung tâm (học ở bài sau).</p>
<h4>VPC Flow Logs</h4>
<p><b>VPC Flow Logs</b> ghi lại thông tin về lưu lượng IP đi vào và đi ra các giao diện mạng trong VPC: từ địa chỉ nào, tới địa chỉ nào, cổng nào, được cho phép hay bị từ chối. Dữ liệu này gửi tới CloudWatch Logs hoặc S3, giúp xử lý sự cố kết nối và phục vụ bảo mật. Amazon GuardDuty cũng phân tích Flow Logs để phát hiện mối đe dọa.</p>
<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>Khi mở chi nhánh Nhật Bản, BánhNgon có thêm một VPC ở Region Tokyo. Minh dùng <b>VPC peering</b> để hệ thống ở Tokyo đọc được dữ liệu sản phẩm từ VPC Singapore qua mạng riêng. Một hôm website chậm bất thường, Minh mở <b>VPC Flow Logs</b> và thấy rất nhiều kết nối bị từ chối từ một dải IP lạ, liền thêm quy tắc deny vào network ACL.</p></div>

<div class="box exam"><b>🎯 Đề thi hay hỏi</b><ul>
<li>"logically isolated section of the AWS Cloud" → <b>Amazon VPC</b></li>
<li>"subnet whose route table has a route to an internet gateway" → <b>public subnet</b></li>
<li>"instances in a private subnet need outbound internet access" → <b>NAT gateway</b></li>
<li>"allow a VPC to communicate with the internet" → <b>internet gateway</b></li>
<li>"stateful, instance level" → <b>security group</b>; "stateless, subnet level, allow and deny" → <b>network ACL</b></li>
<li>"connect two VPCs privately" → <b>VPC peering</b></li>
<li>"capture information about IP traffic in a VPC" → <b>VPC Flow Logs</b></li>
</ul></div>
`,
    summary: [
      "VPC là mạng riêng, tách biệt logic, nằm trong một Region; subnet nằm trong một AZ.",
      "Public subnet có route tới internet gateway; private subnet không có, dùng cho database và máy nội bộ.",
      "NAT gateway (đặt ở public subnet) cho máy trong private subnet đi ra Internet nhưng chặn kết nối từ ngoài vào.",
      "Security group: stateful, mức instance, chỉ allow. Network ACL: stateless, mức subnet, có allow và deny.",
      "VPC peering nối hai VPC qua mạng riêng, không bắc cầu.",
      "VPC Flow Logs ghi lại thông tin lưu lượng IP để xử lý sự cố và bảo mật."
    ],
    terms: [
      ["Virtual Private Cloud (VPC)", "đám mây riêng ảo"],
      ["IP address", "địa chỉ IP"],
      ["Subnet", "mạng con"],
      ["Public subnet", "subnet công khai"],
      ["Private subnet", "subnet riêng"],
      ["Route table", "bảng định tuyến"],
      ["Internet gateway", "cổng Internet"],
      ["NAT gateway", "cổng chuyển đổi địa chỉ mạng"],
      ["Security group", "nhóm bảo mật (tường lửa mức instance)"],
      ["Network ACL", "danh sách kiểm soát truy cập mạng (mức subnet)"],
      ["Stateful / Stateless", "có nhớ trạng thái / không nhớ trạng thái"],
      ["VPC peering", "kết nối ngang hàng giữa hai VPC"],
      ["VPC Flow Logs", "nhật ký luồng lưu lượng VPC"]
    ],
    qids: ["d3-72", "d2-14", "d2-15", "d2-6", "d3-69"]
  },

  {
    id: "3-10",
    module: 3,
    title: "Kết nối và phân phối nội dung: Route 53, CloudFront, Global Accelerator, VPN, Direct Connect",
    mins: 17,
    goals: [
      "Hiểu DNS là gì và Route 53 làm những việc gì",
      "Phân biệt CloudFront (CDN có cache) và Global Accelerator (IP tĩnh, mạng AWS, không cache)",
      "Phân biệt Site-to-Site VPN, Client VPN và Direct Connect",
      "Biết Transit Gateway, PrivateLink, API Gateway dùng khi nào"
    ],
    html: `
<h3>1. DNS và Amazon Route 53</h3>
<p>Máy tính tìm nhau bằng địa chỉ IP (dãy số), nhưng con người thì nhớ tên như banhngon.vn. <b>DNS</b> (Domain Name System, hệ thống tên miền) là dịch vụ "dịch" tên miền thành địa chỉ IP. Khi bạn gõ một tên miền, trình duyệt hỏi DNS "tên này ở địa chỉ nào?" rồi mới kết nối tới.</p>
<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>DNS là <b>danh bạ điện thoại của Internet</b>: bạn tìm theo tên, danh bạ trả về số để gọi.</p></div>
<p><b>Amazon Route 53</b> là dịch vụ DNS của AWS, có độ sẵn sàng cao và mở rộng tốt. Nó làm ba việc chính:</p>
<ul>
<li><b>Đăng ký tên miền</b> (domain registration).</li>
<li><b>Trả lời truy vấn DNS</b>: tên miền trỏ tới đâu (load balancer, CloudFront, S3...).</li>
<li><b>Health check</b> (kiểm tra sức khỏe) và <b>routing policy</b> (chính sách định tuyến): ví dụ đưa người dùng tới Region có độ trễ thấp nhất (latency), chia tỉ lệ lưu lượng (weighted), tự chuyển sang hệ thống dự phòng khi hệ thống chính hỏng (failover), hoặc theo vị trí địa lý của người dùng (geolocation).</li>
</ul>

<h3>2. Đưa nội dung tới người dùng nhanh hơn: CloudFront và Global Accelerator</h3>
<h4>Amazon CloudFront</h4>
<p>Người dùng ở xa máy chủ thì tải trang chậm, vì dữ liệu phải đi đường dài. <b>CDN</b> (Content Delivery Network, mạng phân phối nội dung) giải quyết bằng cách lưu bản sao (<b>cache</b>) của nội dung ở nhiều điểm gần người dùng. <b>Amazon CloudFront</b> là CDN của AWS; các điểm đó gọi là <b>edge location</b> (điểm biên), có ở rất nhiều thành phố trên thế giới, nhiều hơn số Region rất nhiều.</p>
<p>Lần đầu có người ở Tokyo xem ảnh bánh, CloudFront lấy ảnh từ máy chủ gốc (<b>origin</b>, ví dụ một S3 bucket) và giữ lại ở edge location Tokyo. Những người sau ở Tokyo nhận ảnh ngay từ đó, nhanh hơn nhiều. CloudFront còn kết hợp với AWS Shield và AWS WAF để chống tấn công.</p>
<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>CloudFront giống mở <b>tủ bánh ký gửi ở nhiều cửa hàng tiện lợi</b> khắp nơi: khách không phải chạy về tận xưởng mà mua ngay ở cửa hàng gần nhà.</p></div>
<h4>AWS Global Accelerator</h4>
<p><b>AWS Global Accelerator</b> cho ứng dụng của bạn <b>hai địa chỉ IP tĩnh</b> (không đổi) dùng toàn cầu. Người dùng kết nối vào edge location gần nhất, rồi lưu lượng đi trên <b>mạng toàn cầu riêng của AWS</b> (thay vì Internet công cộng đông đúc) tới ứng dụng ở Region phù hợp. Nếu một Region gặp sự cố, nó chuyển hướng sang Region khỏe mạnh rất nhanh.</p>
<div class="box trap"><b>⚠️ Bẫy hay gặp</b><p>Cả hai đều dùng edge location, nhưng <b>CloudFront có cache nội dung</b> (hợp với ảnh, video, trang web), còn <b>Global Accelerator không cache</b>, nó chỉ "chở" lưu lượng đi đường nhanh hơn và cho <b>IP tĩnh</b> (hợp với game, ứng dụng TCP/UDP, hệ thống cần IP cố định). Đề có chữ "static IP addresses" hoặc "AWS global network" mà không nói cache → Global Accelerator.</p></div>

<h3>3. Nối văn phòng hoặc data center với AWS: VPN và Direct Connect</h3>
<p>Nhiều công ty vẫn còn hệ thống ở văn phòng hoặc <b>data center</b> riêng (gọi là <b>on-premises</b>, tại chỗ), và cần nối chúng với VPC trên AWS. Có ba lựa chọn hay thi:</p>
<ul>
<li><b>AWS Site-to-Site VPN</b>: tạo "đường hầm" <b>mã hóa</b> giữa mạng văn phòng và VPC, đi qua <b>Internet công cộng</b>. Thiết lập nhanh, rẻ. Tốc độ phụ thuộc Internet nên có lúc không ổn định.</li>
<li><b>AWS Client VPN</b>: cho <b>từng nhân viên</b> kết nối an toàn từ laptop của mình (ở nhà, quán cà phê) vào VPC. Site-to-Site nối cả mạng; Client VPN nối từng người.</li>
<li><b>AWS Direct Connect</b>: một <b>đường truyền vật lý riêng</b> từ data center của bạn tới AWS, <b>không đi qua Internet công cộng</b>. Băng thông cao, độ trễ ổn định, nhưng cần thời gian lắp đặt (thường vài tuần trở lên) và chi phí cao hơn.</li>
</ul>
<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>Site-to-Site VPN như <b>xe bọc thép chạy trên đường quốc lộ chung</b>: an toàn nhờ lớp vỏ (mã hóa), nhưng vẫn có thể kẹt xe. Direct Connect như <b>con đường riêng chỉ nhà bạn được đi</b>: thông thoáng, ổn định, nhưng phải mất công làm đường. Client VPN như <b>thẻ ra vào cá nhân</b> cho từng nhân viên.</p></div>

<h3>4. Transit Gateway, PrivateLink và API Gateway</h3>
<p><b>AWS Transit Gateway</b> là một <b>trạm trung chuyển trung tâm</b> (hub). Thay vì nối từng cặp VPC bằng peering (10 VPC thì phải nối rất nhiều cặp), mọi VPC và mạng on-premises chỉ cần nối vào Transit Gateway. Giống <b>bến xe trung tâm</b>: mọi tuyến đều về bến, đổi xe ở đó.</p>
<p><b>AWS PrivateLink</b> cho phép truy cập <b>một dịch vụ cụ thể</b> nằm ở VPC khác (của bạn, của đối tác, hoặc dịch vụ AWS) một cách riêng tư, qua <b>VPC endpoint</b>, mà lưu lượng không đi ra Internet. Khác peering: peering nối cả hai mạng, PrivateLink chỉ mở đúng một "cửa dịch vụ".</p>
<p><b>Amazon API Gateway</b> giúp tạo, phát hành, bảo vệ và theo dõi <b>API</b>. <b>API</b> (Application Programming Interface, giao diện lập trình ứng dụng) là "cửa giao tiếp" để chương trình này gọi chương trình kia, ví dụ app điện thoại gọi tới hệ thống đặt hàng. API Gateway thường đứng trước Lambda làm "cửa trước" cho ứng dụng serverless.</p>

<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>Chị Lan mua tên miền banhngon.vn (qua nhà đăng ký tên miền Việt Nam, vì Route 53 không bán đuôi .vn) rồi dùng <b>Route 53</b> làm DNS, với chính sách latency để khách Nhật vào Region Tokyo, khách Việt vào Singapore. Ảnh và video làm bánh được phát qua <b>CloudFront</b>. Trò chơi "vòng quay may mắn" chạy thời gian thực dùng <b>Global Accelerator</b> cho mượt. Xưởng bánh ở Hà Nội có máy quản lý kho on-premises: lúc đầu nối với AWS bằng <b>Site-to-Site VPN</b>, khi dữ liệu nhiều lên thì chuyển sang <b>Direct Connect</b>. Nhân viên kế toán làm việc ở nhà dùng <b>Client VPN</b>. App đặt bánh gọi tới hệ thống qua <b>API Gateway</b> phía trước các hàm Lambda. Khi số VPC tăng lên hơn chục, Minh dùng <b>Transit Gateway</b> làm trung tâm. Đối tác giao hàng truy cập dịch vụ "tra cứu đơn" của BánhNgon qua <b>PrivateLink</b>, không lộ ra Internet.</p></div>

<h3>5. Bảng "cần gì → dùng gì"</h3>
<table>
<tr><th>Nhu cầu</th><th>Dịch vụ</th></tr>
<tr><td>Đăng ký tên miền, DNS, định tuyến theo độ trễ, failover</td><td>Amazon Route 53</td></tr>
<tr><td>Cache nội dung tĩnh/video gần người dùng toàn cầu (CDN)</td><td>Amazon CloudFront</td></tr>
<tr><td>IP tĩnh toàn cầu, đi qua mạng AWS, không cache</td><td>AWS Global Accelerator</td></tr>
<tr><td>Kết nối mã hóa nhanh, qua Internet, giữa văn phòng và VPC</td><td>AWS Site-to-Site VPN</td></tr>
<tr><td>Nhân viên từ xa kết nối từ laptop vào VPC</td><td>AWS Client VPN</td></tr>
<tr><td>Đường riêng, không qua Internet, băng thông cao, ổn định</td><td>AWS Direct Connect</td></tr>
<tr><td>Hub nối hàng trăm VPC và mạng on-premises</td><td>AWS Transit Gateway</td></tr>
<tr><td>Nối riêng hai VPC</td><td>VPC peering</td></tr>
<tr><td>Truy cập riêng tư một dịch vụ ở VPC khác, không ra Internet</td><td>AWS PrivateLink</td></tr>
<tr><td>Tạo và quản lý API, cửa trước cho Lambda</td><td>Amazon API Gateway</td></tr>
</table>
<div class="box exam"><b>🎯 Đề thi hay hỏi</b><ul>
<li>"highly available and scalable DNS" → <b>Route 53</b></li>
<li>"cache content at edge locations, reduce latency globally" → <b>CloudFront</b></li>
<li>"static IP, route traffic over AWS global network" → <b>Global Accelerator</b></li>
<li>"dedicated private connection, not over the public internet" → <b>Direct Connect</b></li>
<li>"quickly establish encrypted connection over the internet" → <b>Site-to-Site VPN</b></li>
<li>"individual remote employees from laptops" → <b>Client VPN</b></li>
<li>"central hub for many VPCs" → <b>Transit Gateway</b>; "privately access services in another VPC" → <b>PrivateLink</b></li>
<li>"create, publish, secure APIs" → <b>API Gateway</b></li>
</ul></div>
`,
    summary: [
      "Route 53 = DNS: đăng ký tên miền, trỏ tên miền, health check, routing policy (latency, failover, weighted...).",
      "CloudFront = CDN, cache nội dung ở edge location gần người dùng.",
      "Global Accelerator = 2 IP tĩnh, đi qua mạng toàn cầu của AWS, không cache.",
      "Site-to-Site VPN: mã hóa qua Internet, nhanh, rẻ. Client VPN: cho từng người dùng. Direct Connect: đường riêng, không qua Internet.",
      "Transit Gateway là hub trung tâm cho nhiều VPC; PrivateLink truy cập riêng tư một dịch vụ ở VPC khác.",
      "API Gateway tạo và bảo vệ API, thường đứng trước Lambda."
    ],
    terms: [
      ["Domain Name System (DNS)", "hệ thống tên miền"],
      ["Routing policy", "chính sách định tuyến"],
      ["Health check", "kiểm tra sức khỏe"],
      ["Content Delivery Network (CDN)", "mạng phân phối nội dung"],
      ["Edge location", "điểm biên (gần người dùng)"],
      ["Origin", "máy chủ gốc chứa nội dung"],
      ["Static IP address", "địa chỉ IP tĩnh"],
      ["On-premises", "hạ tầng tại chỗ của doanh nghiệp"],
      ["Virtual Private Network (VPN)", "mạng riêng ảo (đường hầm mã hóa)"],
      ["Dedicated connection", "đường kết nối riêng"],
      ["Hub", "trung tâm kết nối"],
      ["VPC endpoint", "điểm kết nối riêng tới dịch vụ"],
      ["API", "giao diện lập trình ứng dụng"]
    ],
    qids: ["d3-5", "d3-7", "d3-11", "d3-21", "d3-22", "d3-67", "d3-68", "d3-69", "d3-70", "d3-71"]
  },

  {
    id: "3-11",
    module: 3,
    title: "Tích hợp ứng dụng và các nhóm dịch vụ khác",
    mins: 16,
    goals: [
      "Hiểu decoupling (tách rời các thành phần) là gì và vì sao quan trọng",
      "Phân biệt SQS, SNS, EventBridge và Step Functions",
      "Biết các dịch vụ cho doanh nghiệp (Connect, SES), lập trình viên (CodeBuild, CodePipeline, X-Ray, CLI) và máy tính người dùng cuối (WorkSpaces, WorkSpaces Applications (trước đây là AppStream 2.0), WorkSpaces Secure Browser)",
      "Biết Amplify và IoT Core dùng khi nào"
    ],
    html: `
<h3>1. Decoupling: đừng để các phần dính chặt vào nhau</h3>
<p>Một ứng dụng thường gồm nhiều phần: phần nhận đơn hàng, phần thanh toán, phần gửi email, phần báo cho bếp. Nếu các phần gọi thẳng vào nhau và phải chờ nhau, gọi là <b>tightly coupled</b> (gắn chặt). Khi một phần chậm hoặc hỏng, cả dây chuyền đứng theo.</p>
<p><b>Decoupling</b> (tách rời) nghĩa là để các phần trao đổi gián tiếp qua một "trung gian", mỗi phần chạy theo nhịp của riêng mình. Phần này hỏng thì phần kia vẫn chạy, và mỗi phần có thể co giãn riêng. Đây là nguyên tắc thiết kế mà AWS rất hay nhắc.</p>
<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>Trong quán ăn, nhân viên thu ngân không chạy vào bếp đứng chờ đầu bếp làm xong từng món. Họ <b>ghim phiếu order lên thanh treo</b>, bếp làm lần lượt. Đông khách thì phiếu xếp hàng chờ, không ai bị mất order. Thanh treo phiếu đó chính là "hàng đợi".</p></div>

<h3>2. SQS, SNS, EventBridge, Step Functions</h3>
<h4>Amazon SQS (Simple Queue Service)</h4>
<p><b>SQS</b> là dịch vụ <b>message queue</b> (hàng đợi tin nhắn). Một bên đưa tin nhắn vào hàng đợi, bên kia <b>tự lấy ra</b> (pull) xử lý khi rảnh. Tin nhắn được giữ lại an toàn cho tới khi được xử lý. Mỗi tin nhắn thường chỉ được <b>một</b> bên xử lý.</p>
<h4>Amazon SNS (Simple Notification Service)</h4>
<p><b>SNS</b> theo mô hình <b>publish/subscribe</b> (xuất bản/đăng ký, gọi tắt pub/sub). Một bên "đăng" thông báo lên một <b>topic</b> (chủ đề), và SNS <b>đẩy</b> (push) ngay tới <b>tất cả</b> người đăng ký: email, SMS, thông báo trên điện thoại, hàm Lambda, hàng đợi SQS... Một tin, nhiều người nhận cùng lúc (gọi là <b>fan-out</b>).</p>
<div class="box idea"><b>🧠 Hiểu đơn giản</b><p><b>SQS</b> là thanh treo phiếu order: phiếu chờ ở đó, mỗi phiếu một đầu bếp nhận. <b>SNS</b> là cái loa phát thanh: nói một lần, ai đăng ký nghe đều nghe thấy ngay.</p></div>
<h4>Amazon EventBridge</h4>
<p><b>EventBridge</b> là <b>event bus</b> (xe buýt sự kiện) serverless. <b>Event</b> (sự kiện) là "một điều gì đó vừa xảy ra", ví dụ "có file mới trong S3", "đơn hàng vừa thanh toán xong", hoặc sự kiện từ ứng dụng SaaS bên ngoài. Bạn đặt <b>rule</b> (quy tắc) kiểu "nếu có sự kiện loại X thì gửi tới đích Y". EventBridge còn có <b>lịch chạy định kỳ</b> (scheduler), ví dụ "2 giờ sáng mỗi ngày chạy hàm dọn dữ liệu".</p>
<h4>AWS Step Functions</h4>
<p><b>Step Functions</b> điều phối nhiều bước thành một <b>workflow</b> (quy trình) trực quan, có sơ đồ: bước 1 xong làm bước 2, nếu lỗi thì thử lại, nếu thất bại thì rẽ nhánh khác. Hợp khi cần ghép nhiều hàm Lambda và dịch vụ thành một quy trình có thứ tự rõ ràng.</p>
<table>
<tr><th>Dịch vụ</th><th>Mô hình</th><th>Từ khóa trong đề</th></tr>
<tr><td>SQS</td><td>Hàng đợi, bên nhận tự kéo về</td><td>queue, decouple, buffer, messages stored until processed</td></tr>
<tr><td>SNS</td><td>Pub/sub, đẩy tới nhiều nơi</td><td>publish/subscribe, notifications, email, SMS, fan-out</td></tr>
<tr><td>EventBridge</td><td>Event bus, định tuyến theo rule, lịch</td><td>event bus, route events, SaaS, schedule</td></tr>
<tr><td>Step Functions</td><td>Workflow có trạng thái</td><td>orchestrate, visual workflow, retries, error handling</td></tr>
</table>
<div class="box trap"><b>⚠️ Bẫy hay gặp</b><p>SQS và SNS đều là "nhắn tin" nên dễ nhầm. Nhớ: <b>SQS = Queue (xếp hàng, chờ)</b>, <b>SNS = Notification (thông báo, đẩy ngay, nhiều người nhận)</b>. Nếu đề nói "workflow", "orchestrate", "coordinate multiple Lambda functions" thì đó là <b>Step Functions</b>, không phải SQS.</p></div>

<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>Khi khách đặt bánh, hệ thống đưa đơn vào <b>SQS</b>; xưởng bánh lấy đơn ra làm dần, dịp Trung thu đơn có dồn cũng không mất đơn nào. Khi đơn thanh toán xong, một thông báo đăng lên <b>SNS</b> topic: chị Lan nhận SMS, bộ phận giao hàng nhận email, cùng lúc. Mỗi sáng 6 giờ, <b>EventBridge</b> kích hoạt hàm tổng hợp đơn trong ngày. Quy trình "nhận đơn → kiểm tra kho → trừ tiền → xếp lịch giao" được dựng bằng <b>Step Functions</b>, tự thử lại nếu bước trừ tiền bị lỗi mạng.</p></div>

<h3>3. Ứng dụng doanh nghiệp và công cụ lập trình viên</h3>
<h4>Business applications (ứng dụng doanh nghiệp)</h4>
<ul>
<li><b>Amazon Connect</b>: dựng <b>contact center</b> (tổng đài chăm sóc khách hàng) trên đám mây, nhận cuộc gọi và chat, không cần mua tổng đài vật lý.</li>
<li><b>Amazon SES</b> (Simple Email Service): gửi email hàng loạt, cả email marketing lẫn email giao dịch như xác nhận đơn hàng.</li>
</ul>
<h4>Developer tools (công cụ cho lập trình viên)</h4>
<p>Trước hết, <b>CI/CD</b> (tích hợp liên tục / triển khai liên tục) là cách làm phần mềm mà mỗi khi lập trình viên sửa code, hệ thống tự động kiểm tra, đóng gói và đưa lên chạy thật, thay vì làm tay.</p>
<ul>
<li><b>AWS CodeBuild</b>: <b>biên dịch code, chạy test</b>, tạo ra gói phần mềm sẵn sàng triển khai.</li>
<li><b>AWS CodePipeline</b>: dựng cả <b>dây chuyền CI/CD</b>, tự động nối các bước lấy code → build → test → deploy.</li>
<li><b>AWS X-Ray</b>: <b>tracing</b> (lần theo dấu) một yêu cầu đi qua nhiều thành phần, để tìm xem chậm hoặc lỗi ở đâu.</li>
<li><b>AWS CLI</b> (Command Line Interface): điều khiển AWS bằng <b>lệnh gõ</b> trong cửa sổ dòng lệnh, tiện tự động hóa bằng script. (Còn viết code bằng Python, Java... để gọi AWS thì dùng <b>AWS SDK</b>.)</li>
</ul>

<h3>4. Máy tính cho người dùng cuối, Amplify và IoT Core</h3>
<h4>End-user computing (máy tính cho người dùng cuối)</h4>
<ul>
<li><b>Amazon WorkSpaces</b>: cung cấp <b>máy tính để bàn ảo</b> (virtual desktop) Windows hoặc Linux. Nhân viên đăng nhập từ bất kỳ thiết bị nào và thấy cả một "máy tính" đầy đủ.</li>
<li><b>Amazon WorkSpaces Applications</b> (trước đây là <b>Amazon AppStream 2.0</b>, đổi tên từ 11/2025; đề thi có thể vẫn dùng tên cũ): <b>stream một ứng dụng</b> cụ thể tới trình duyệt người dùng, không cấp cả máy tính.</li>
<li><b>Amazon WorkSpaces Secure Browser</b> (trước đây là WorkSpaces Web): cho nhân viên một <b>trình duyệt an toàn</b> để vào các trang web nội bộ, dữ liệu không nằm lại trên máy cá nhân.</li>
</ul>
<h4>AWS Amplify</h4>
<p><b>Amplify</b> giúp lập trình viên frontend (phần giao diện) và mobile nhanh chóng <b>xây dựng, triển khai và host</b> ứng dụng web/mobile full-stack, có sẵn đăng nhập, lưu trữ, API.</p>
<h4>AWS IoT Core</h4>
<p><b>IoT</b> (Internet of Things, Internet vạn vật) là các thiết bị như cảm biến, máy móc có kết nối mạng. <b>AWS IoT Core</b> kết nối an toàn hàng tỉ thiết bị như vậy với đám mây và chuyển dữ liệu của chúng tới các dịch vụ AWS khác.</p>
<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>BánhNgon mở tổng đài đặt bánh bằng <b>Amazon Connect</b>, gửi email xác nhận đơn bằng <b>SES</b>. Đội của Minh dùng <b>CodePipeline</b> + <b>CodeBuild</b> để mỗi lần sửa code là tự động test và đưa lên; dùng <b>X-Ray</b> để tìm ra bước thanh toán chậm. Nhân viên kế toán làm việc ở Nhật dùng <b>WorkSpaces</b>; thợ làm bánh chỉ cần phần mềm tính công thức nên dùng <b>WorkSpaces Applications</b> (AppStream 2.0). App đặt bánh được làm bằng <b>Amplify</b>. Các lò nướng gắn cảm biến nhiệt gửi dữ liệu về qua <b>IoT Core</b> để cảnh báo khi quá nóng.</p></div>
<div class="box exam"><b>🎯 Đề thi hay hỏi</b><ul>
<li>"decouple, messages stored in a queue" → <b>SQS</b>; "publish/subscribe, email, SMS" → <b>SNS</b></li>
<li>"serverless event bus, route events based on rules" → <b>EventBridge</b></li>
<li>"coordinate Lambda functions in a visual workflow" → <b>Step Functions</b></li>
<li>"cloud contact center" → <b>Connect</b>; "send marketing and transactional emails" → <b>SES</b></li>
<li>"compile code, run tests" → <b>CodeBuild</b>; "automate build, test, deploy (CI/CD)" → <b>CodePipeline</b>; "trace requests, find bottlenecks" → <b>X-Ray</b></li>
<li>"virtual desktops" → <b>WorkSpaces</b>; "stream a desktop application to browser" → <b>WorkSpaces Applications</b> (trước đây AppStream 2.0)</li>
<li>"frontend/mobile developers build and host full-stack apps" → <b>Amplify</b>; "connect IoT devices" → <b>IoT Core</b></li>
</ul></div>
`,
    summary: [
      "Decoupling: các thành phần giao tiếp qua trung gian, một phần hỏng không kéo cả hệ thống.",
      "SQS = hàng đợi (pull, giữ tin tới khi xử lý). SNS = pub/sub (push tới nhiều người nhận).",
      "EventBridge = event bus định tuyến sự kiện theo rule, có lịch chạy. Step Functions = workflow trực quan có retry.",
      "Connect = tổng đài đám mây; SES = gửi email hàng loạt.",
      "CodeBuild = build và test; CodePipeline = dây chuyền CI/CD; X-Ray = lần theo yêu cầu; CLI = điều khiển AWS bằng lệnh.",
      "WorkSpaces = máy tính ảo đầy đủ; WorkSpaces Applications (trước đây AppStream 2.0) = stream một ứng dụng; WorkSpaces Secure Browser = trình duyệt an toàn.",
      "Amplify = xây và host app web/mobile full-stack; IoT Core = kết nối thiết bị IoT."
    ],
    terms: [
      ["Decoupling", "tách rời các thành phần"],
      ["Message queue", "hàng đợi tin nhắn"],
      ["Publish/subscribe (pub/sub)", "xuất bản/đăng ký"],
      ["Topic", "chủ đề (trong SNS)"],
      ["Fan-out", "một tin gửi tới nhiều nơi"],
      ["Event bus", "kênh trung chuyển sự kiện"],
      ["Workflow", "quy trình nhiều bước"],
      ["Contact center", "tổng đài chăm sóc khách hàng"],
      ["CI/CD", "tích hợp liên tục / triển khai liên tục"],
      ["Tracing", "lần theo dấu yêu cầu"],
      ["Command Line Interface (CLI)", "giao diện dòng lệnh"],
      ["Virtual desktop", "máy tính để bàn ảo"],
      ["Application streaming", "truyền phát ứng dụng"],
      ["Internet of Things (IoT)", "Internet vạn vật"]
    ],
    qids: ["d3-16", "d3-17", "d3-57", "d3-58", "d3-59", "d3-60", "d3-61", "d3-62", "d3-63", "d3-64"]
  },

  {
    id: "3-12",
    module: 3,
    title: "AI và Machine Learning trên AWS",
    mins: 14,
    goals: [
      "Hiểu bằng lời đơn giản AI, machine learning và generative AI là gì",
      "Phân biệt SageMaker AI (tự xây mô hình) với các dịch vụ AI dựng sẵn",
      "Nhớ chức năng của Rekognition, Textract, Comprehend, Translate, Transcribe, Polly, Lex và Amazon Q",
      "Có mẹo nhớ để chọn đúng dịch vụ trong đề thi"
    ],
    html: `
<h3>1. AI, Machine Learning, Generative AI là gì?</h3>
<p><b>AI</b> (Artificial Intelligence, trí tuệ nhân tạo) là ý tưởng rộng: làm cho máy tính làm được những việc vốn cần trí thông minh của con người, như nhìn ảnh, nghe nói, hiểu câu chữ.</p>
<p><b>Machine Learning</b> (ML, học máy) là một cách để đạt được AI: thay vì lập trình từng quy tắc, ta cho máy xem <b>rất nhiều ví dụ</b> để nó tự rút ra quy luật. Kết quả của quá trình học là một <b>model</b> (mô hình). Quá trình cho máy học gọi là <b>training</b> (huấn luyện); dùng mô hình để dự đoán việc mới gọi là <b>inference</b> (suy luận).</p>
<p><b>Generative AI</b> (AI tạo sinh) là loại AI có thể <b>tạo ra nội dung mới</b>: viết văn bản, trả lời câu hỏi, viết code, tạo hình ảnh. Các chatbot trò chuyện hiện nay là ví dụ.</p>
<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>Dạy trẻ nhận ra con mèo: bạn không giải thích "mèo có 4 chân, tai nhọn...", mà chỉ cho bé xem thật nhiều ảnh mèo. Dần dần bé tự nhận ra. Đó là <b>machine learning</b>. Còn khi bé lớn lên, tự <b>vẽ</b> được một con mèo mới chưa từng thấy, đó giống <b>generative AI</b>.</p></div>

<h3>2. Hai con đường: tự xây mô hình hay dùng dịch vụ dựng sẵn</h3>
<p><b>Amazon SageMaker AI</b> là nền tảng để <b>data scientist</b> (nhà khoa học dữ liệu) và kỹ sư ML <b>tự xây dựng, huấn luyện và triển khai</b> mô hình của riêng mình ở quy mô lớn. Dùng khi bài toán đặc thù, ví dụ dự đoán số bánh cần nướng mỗi ngày dựa trên dữ liệu bán hàng của chính tiệm.</p>
<p>Nhưng phần lớn công ty không có chuyên gia ML. AWS có sẵn nhiều <b>AI service</b> (dịch vụ AI dựng sẵn) đã được huấn luyện: bạn chỉ cần gọi tới, gửi ảnh, gửi văn bản, gửi âm thanh, là nhận kết quả. Không cần biết gì về ML.</p>
<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>SageMaker AI giống <b>thuê bếp và nguyên liệu để tự nghĩ ra công thức bánh mới</b>. Các dịch vụ AI dựng sẵn giống <b>mua bánh làm sẵn</b>: không cần biết làm, mở hộp là ăn.</p></div>

<h3>3. Các dịch vụ AI dựng sẵn</h3>
<ul>
<li><b>Amazon Rekognition</b>: phân tích <b>ảnh và video</b>, nhận diện vật thể, khuôn mặt, chữ trong ảnh, hành động, nội dung không phù hợp.</li>
<li><b>Amazon Textract</b>: <b>trích xuất chữ</b>, chữ viết tay, <b>bảng</b> và <b>dữ liệu biểu mẫu</b> từ tài liệu scan, ảnh chụp giấy tờ. Hơn cả việc "đọc chữ" thông thường vì hiểu được cấu trúc bảng, ô biểu mẫu.</li>
<li><b>Amazon Comprehend</b>: <b>hiểu văn bản</b> (NLP, xử lý ngôn ngữ tự nhiên): xác định cảm xúc tích cực hay tiêu cực (sentiment), tìm chủ đề, từ khóa, tên người, địa điểm.</li>
<li><b>Amazon Translate</b>: <b>dịch</b> văn bản giữa các ngôn ngữ.</li>
<li><b>Amazon Transcribe</b>: chuyển <b>giọng nói thành chữ</b> (speech-to-text), ví dụ ghi lại cuộc gọi tổng đài thành văn bản.</li>
<li><b>Amazon Polly</b>: chuyển <b>chữ thành giọng nói</b> tự nhiên (text-to-speech).</li>
<li><b>Amazon Lex</b>: xây <b>chatbot</b> và giao diện trò chuyện bằng giọng nói lẫn văn bản. (Lex dùng cùng công nghệ với trợ lý Alexa.)</li>
<li><b>Amazon Q</b>: <b>trợ lý generative AI</b> có thể trả lời câu hỏi, tóm tắt, tạo nội dung dựa trên dữ liệu của doanh nghiệp, và giúp lập trình viên viết code, giải thích code, xử lý lỗi (Amazon Q Business, Amazon Q Developer).</li>
</ul>
<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>BánhNgon giờ đã lớn, chị Lan muốn "có AI". Minh lần lượt áp dụng: <b>Rekognition</b> kiểm tra ảnh khách đăng lên phần đánh giá, lọc ảnh không phù hợp. <b>Textract</b> đọc hóa đơn giấy của nhà cung cấp bột, bơ và tự nhập vào hệ thống. <b>Comprehend</b> phân tích hàng nghìn đánh giá xem khách khen hay chê. <b>Translate</b> dịch mô tả bánh sang tiếng Nhật cho chi nhánh Tokyo. <b>Transcribe</b> chuyển cuộc gọi đặt bánh thành văn bản để lưu. <b>Polly</b> đọc thông báo "đơn của bạn đã sẵn sàng" trên app. <b>Lex</b> làm chatbot đặt bánh trên website. Đội của Minh dùng <b>Amazon Q</b> để hỏi đáp về tài liệu nội bộ và hỗ trợ viết code. Còn mô hình dự đoán số bánh cần nướng mỗi ngày thì Minh tự huấn luyện trên <b>SageMaker AI</b>.</p></div>

<h3>4. Mẹo nhớ và bảng tổng hợp</h3>
<ul>
<li><b>Rekognition</b>: "recognize" = nhận ra → nhìn ảnh, video.</li>
<li><b>Textract</b>: "text + extract" = rút chữ ra khỏi tài liệu.</li>
<li><b>Comprehend</b>: "comprehend" = thấu hiểu → hiểu ý nghĩa, cảm xúc của văn bản.</li>
<li><b>Transcribe</b>: "chép lại" lời nói thành chữ. <b>Polly</b>: con vẹt (polly) biết nói → chữ thành tiếng.</li>
<li><b>Lex</b>: anh em với Alexa → trò chuyện, chatbot.</li>
</ul>
<table>
<tr><th>Đầu vào → đầu ra</th><th>Dịch vụ</th></tr>
<tr><td>Ảnh/video → vật thể, khuôn mặt, hành động</td><td>Rekognition</td></tr>
<tr><td>Tài liệu scan → chữ, bảng, biểu mẫu</td><td>Textract</td></tr>
<tr><td>Văn bản → cảm xúc, chủ đề, thực thể</td><td>Comprehend</td></tr>
<tr><td>Văn bản ngôn ngữ A → ngôn ngữ B</td><td>Translate</td></tr>
<tr><td>Giọng nói → chữ</td><td>Transcribe</td></tr>
<tr><td>Chữ → giọng nói</td><td>Polly</td></tr>
<tr><td>Hội thoại → chatbot</td><td>Lex</td></tr>
<tr><td>Hỏi đáp, tạo nội dung, hỗ trợ viết code bằng generative AI</td><td>Amazon Q</td></tr>
<tr><td>Tự xây, huấn luyện, triển khai mô hình ML</td><td>SageMaker AI</td></tr>
</table>
<div class="box trap"><b>⚠️ Bẫy hay gặp</b><p><b>Transcribe</b> và <b>Polly</b> ngược chiều nhau: Transcribe là nói → chữ, Polly là chữ → nói. <b>Textract</b> đọc chữ trong <b>tài liệu</b>; <b>Rekognition</b> cũng nhận ra được chữ trong ảnh nhưng thế mạnh là vật thể, khuôn mặt, nên đề nói "forms, tables, scanned documents" thì chọn Textract. <b>Comprehend</b> hiểu văn bản nhưng <b>không dịch</b>; dịch là Translate. Và nếu đề nói "build, train, deploy your own models" thì là <b>SageMaker AI</b>, không phải dịch vụ dựng sẵn.</p></div>
<div class="box exam"><b>🎯 Đề thi hay hỏi</b><ul>
<li>"build, train, and deploy ML models at scale" → <b>SageMaker AI</b></li>
<li>"identify objects, people, text, activities in images and videos" → <b>Rekognition</b></li>
<li>"extract text, handwriting, tables, forms from scanned documents" → <b>Textract</b></li>
<li>"sentiment of customer reviews" → <b>Comprehend</b></li>
<li>"convert call recordings to text" → <b>Transcribe</b>; "text into lifelike speech" → <b>Polly</b></li>
<li>"chatbot, conversational interface, voice and text" → <b>Lex</b></li>
<li>"generative AI-powered assistant, write code" → <b>Amazon Q</b></li>
</ul></div>
`,
    summary: [
      "AI là ý tưởng rộng; ML là cho máy học từ dữ liệu để tạo model; generative AI tạo ra nội dung mới.",
      "SageMaker AI: tự xây, huấn luyện, triển khai mô hình. Dịch vụ AI dựng sẵn: chỉ cần gọi, không cần chuyên gia ML.",
      "Rekognition = ảnh/video; Textract = tài liệu, bảng, biểu mẫu; Comprehend = cảm xúc, ý nghĩa văn bản.",
      "Translate = dịch; Transcribe = nói thành chữ; Polly = chữ thành nói; Lex = chatbot.",
      "Amazon Q = trợ lý generative AI cho doanh nghiệp và lập trình viên."
    ],
    terms: [
      ["Artificial Intelligence (AI)", "trí tuệ nhân tạo"],
      ["Machine Learning (ML)", "học máy"],
      ["Generative AI", "AI tạo sinh"],
      ["Model", "mô hình"],
      ["Training", "huấn luyện"],
      ["Inference", "suy luận (dùng mô hình để dự đoán)"],
      ["Data scientist", "nhà khoa học dữ liệu"],
      ["Natural Language Processing (NLP)", "xử lý ngôn ngữ tự nhiên"],
      ["Sentiment analysis", "phân tích cảm xúc"],
      ["Speech-to-text", "chuyển giọng nói thành chữ"],
      ["Text-to-speech", "chuyển chữ thành giọng nói"],
      ["Chatbot", "trợ lý trò chuyện tự động"],
      ["Computer vision", "thị giác máy tính"]
    ],
    qids: ["d3-44", "d3-45", "d3-46", "d3-47", "d3-48", "d3-49", "d3-50", "d3-51"]
  },

  {
    id: "3-13",
    module: 3,
    title: "Phân tích dữ liệu: Athena, Kinesis, Glue, EMR, Redshift, Quick",
    mins: 14,
    goals: [
      "Hiểu đường ống dữ liệu: thu thập → lưu trữ → biến đổi → phân tích → trực quan hóa",
      "Biết mỗi dịch vụ Kinesis, S3, Glue, Athena, EMR, Redshift, Quick nằm ở bước nào",
      "Biết OpenSearch Service dùng cho tìm kiếm và phân tích log",
      "Chọn đúng dịch vụ theo từ khóa trong đề"
    ],
    html: `
<h3>1. Đường ống dữ liệu (data pipeline) là gì?</h3>
<p>Doanh nghiệp tạo ra rất nhiều dữ liệu: đơn hàng, lượt bấm trên website, đánh giá của khách. Dữ liệu thô không tự nói lên điều gì. Muốn biến nó thành câu trả lời như "bánh nào bán chạy nhất ở Tokyo vào mùa hè", dữ liệu phải đi qua một chuỗi bước, gọi là <b>data pipeline</b> (đường ống dữ liệu).</p>
<div class="flow"><span>Thu thập (Kinesis)</span><span>Lưu trữ (S3)</span><span>Biến đổi (Glue / EMR)</span><span>Phân tích (Athena / Redshift)</span><span>Trực quan hóa (Quick)</span></div>
<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>Giống làm nước cam: <b>hái cam</b> từ vườn (thu thập), <b>chất vào kho</b> (lưu trữ), <b>rửa, gọt, ép</b> (biến đổi), <b>nếm và đo độ ngọt</b> (phân tích), rồi <b>rót ra ly đẹp</b> mời khách (trực quan hóa).</p></div>
<p>Một khái niệm hay gặp: <b>data lake</b> (hồ dữ liệu) là nơi chứa mọi loại dữ liệu thô ở dạng gốc, với chi phí rẻ. Trên AWS, data lake thường được xây trên <b>Amazon S3</b>.</p>
<p>Vì sao phải chia thành nhiều bước? Vì mỗi bước cần một kiểu công cụ khác nhau. Công cụ giỏi "hứng" dữ liệu chảy liên tục chưa chắc giỏi lưu trữ lâu dài; công cụ chạy phân tích nặng chưa chắc dễ dùng cho người làm kinh doanh. AWS có dịch vụ riêng cho từng bước, và đề thi thường cho một mô tả nhu cầu rồi hỏi bạn dịch vụ nào phù hợp. Mẹo: trước khi đọc đáp án, hãy tự hỏi "nhu cầu này nằm ở bước nào của đường ống?".</p>

<h3>2. Thu thập và biến đổi: Kinesis, Glue, EMR</h3>
<h4>Amazon Kinesis</h4>
<p>Có dữ liệu đến theo từng đợt (ví dụ file báo cáo cuối ngày), có dữ liệu chảy <b>liên tục từng giây</b> như lượt bấm chuột trên website (<b>clickstream</b>), dữ liệu cảm biến IoT, log ứng dụng. Loại sau gọi là <b>streaming data</b> (dữ liệu dòng chảy). <b>Amazon Kinesis</b> thu thập, xử lý và phân tích dữ liệu streaming <b>theo thời gian thực</b>. Trong họ Kinesis có Kinesis Data Streams (thu và giữ luồng dữ liệu để ứng dụng xử lý) và Amazon Data Firehose (trước đây là Kinesis Data Firehose, tự chuyển luồng dữ liệu vào nơi lưu trữ như S3 hay Redshift).</p>
<h4>AWS Glue</h4>
<p><b>ETL</b> là viết tắt của Extract - Transform - Load: <b>lấy</b> dữ liệu từ nguồn, <b>biến đổi</b> (làm sạch, đổi định dạng, gộp), rồi <b>nạp</b> vào nơi cần dùng. <b>AWS Glue</b> là dịch vụ ETL <b>serverless</b>. Glue còn có <b>Data Catalog</b> (danh mục dữ liệu): một "mục lục" ghi lại dữ liệu nào nằm ở đâu, có những cột gì, để các dịch vụ khác như Athena tìm được. Glue có <b>crawler</b> tự quét dữ liệu để lập mục lục.</p>
<h4>Amazon EMR</h4>
<p><b>Amazon EMR</b> chạy các khung xử lý <b>big data</b> (dữ liệu lớn) mã nguồn mở nổi tiếng như <b>Apache Spark</b>, <b>Apache Hadoop</b>, Hive, Presto. Hợp khi công ty đã quen các công cụ này và cần xử lý khối dữ liệu khổng lồ, AWS lo phần dựng và quản lý cụm máy.</p>

<h3>3. Phân tích và trực quan hóa: Athena, Redshift, Quick, OpenSearch</h3>
<h4>Amazon Athena</h4>
<p><b>Athena</b> cho phép chạy câu lệnh <b>SQL chuẩn trực tiếp trên dữ liệu trong S3</b>, không cần nạp vào database, không cần máy chủ. Trả tiền theo lượng dữ liệu mà câu truy vấn quét. Rất hợp để hỏi nhanh, thỉnh thoảng, trên file log hay file CSV trong data lake.</p>
<h4>Amazon Redshift</h4>
<p><b>Redshift</b> là <b>data warehouse</b> (đã gặp ở bài database): dữ liệu được nạp và sắp xếp sẵn để chạy truy vấn phân tích phức tạp, thường xuyên, trên khối dữ liệu rất lớn, phục vụ báo cáo kinh doanh.</p>
<h4>Amazon Quick</h4>
<p><b>Amazon Quick</b> (trước đây là Amazon QuickSight) là công cụ <b>BI</b> (Business Intelligence, phân tích kinh doanh) giúp người dùng không chuyên kỹ thuật tạo <b>dashboard</b> (bảng điều khiển) và biểu đồ tương tác từ dữ liệu.</p>
<h4>Amazon OpenSearch Service</h4>
<p><b>OpenSearch Service</b> dùng để <b>tìm kiếm</b> (ví dụ ô tìm kiếm sản phẩm trên website) và <b>phân tích log</b> gần như thời gian thực, có giao diện xem biểu đồ. Trước đây dịch vụ này tên là Amazon Elasticsearch Service.</p>
<div class="box trap"><b>⚠️ Bẫy hay gặp</b><p><b>Athena</b> và <b>Redshift</b> đều chạy SQL để phân tích. Phân biệt: Athena <b>truy vấn tại chỗ trên S3, serverless, không cần nạp dữ liệu</b>, hợp truy vấn lẻ tẻ; Redshift là <b>kho dữ liệu</b> cho phân tích lớn, thường xuyên. Còn <b>Glue</b> (ETL serverless, Data Catalog) và <b>EMR</b> (Spark/Hadoop) đều biến đổi dữ liệu; thấy tên Spark/Hadoop thì chọn EMR. Kinesis là <b>real-time streaming</b>, đừng nhầm với SQS (hàng đợi tin nhắn giữa các thành phần ứng dụng).</p></div>

<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>Chị Lan muốn biết "khách xem bánh nào nhiều nhưng không mua". Minh dựng đường ống: lượt bấm trên website và app được <b>Kinesis</b> thu theo thời gian thực, đổ vào <b>S3</b> làm data lake. <b>Glue</b> làm sạch dữ liệu và lập Data Catalog. Khi cần trả lời nhanh một câu hỏi lẻ, Minh dùng <b>Athena</b> chạy SQL thẳng trên S3. Báo cáo doanh số hằng tuần của 3 chi nhánh chạy trên <b>Redshift</b>. Kết quả hiện thành dashboard trên <b>Quick</b> để chị Lan xem trên điện thoại. Ô tìm kiếm "bánh không đường" trên website chạy bằng <b>OpenSearch Service</b>. Về sau, đội phân tích quen Spark nên một số tác vụ nặng chạy trên <b>EMR</b>.</p></div>

<h3>4. Bảng tổng hợp</h3>
<table>
<tr><th>Bước</th><th>Dịch vụ</th><th>Từ khóa trong đề</th></tr>
<tr><td>Thu thập</td><td>Amazon Kinesis</td><td>real-time streaming, clickstream, IoT telemetry</td></tr>
<tr><td>Lưu trữ</td><td>Amazon S3</td><td>data lake, lưu rẻ, không giới hạn</td></tr>
<tr><td>Biến đổi</td><td>AWS Glue</td><td>serverless ETL, data catalog, crawler</td></tr>
<tr><td>Biến đổi</td><td>Amazon EMR</td><td>Apache Spark, Hadoop, big data frameworks</td></tr>
<tr><td>Phân tích</td><td>Amazon Athena</td><td>SQL queries directly on S3, serverless</td></tr>
<tr><td>Phân tích</td><td>Amazon Redshift</td><td>data warehouse, petabyte, complex analytics</td></tr>
<tr><td>Trực quan hóa</td><td>Amazon Quick</td><td>dashboards, visualizations, BI</td></tr>
<tr><td>Tìm kiếm, log</td><td>Amazon OpenSearch Service</td><td>search, log analytics</td></tr>
</table>
<div class="box exam"><b>🎯 Đề thi hay hỏi</b><ul>
<li>"run SQL queries directly on data in S3 without loading or managing servers" → <b>Athena</b></li>
<li>"collect and process real-time streaming data, clickstreams" → <b>Kinesis</b></li>
<li>"serverless data integration, ETL, data catalog" → <b>Glue</b></li>
<li>"Apache Spark, Apache Hadoop" → <b>EMR</b></li>
<li>"complex analytical queries on petabytes" → <b>Redshift</b></li>
<li>"business users create interactive dashboards" → <b>Quick</b></li>
</ul></div>
`,
    summary: [
      "Data pipeline: thu thập → lưu trữ → biến đổi → phân tích → trực quan hóa.",
      "Kinesis thu dữ liệu streaming thời gian thực; S3 thường làm data lake.",
      "Glue = ETL serverless + Data Catalog; EMR = chạy Spark/Hadoop cho big data.",
      "Athena = SQL trực tiếp trên S3, serverless; Redshift = data warehouse cho phân tích lớn.",
      "Quick (trước đây QuickSight) = dashboard BI; OpenSearch Service = tìm kiếm và phân tích log."
    ],
    terms: [
      ["Data pipeline", "đường ống dữ liệu"],
      ["Data lake", "hồ dữ liệu"],
      ["Streaming data", "dữ liệu dòng chảy liên tục"],
      ["Real-time", "thời gian thực"],
      ["Clickstream", "chuỗi lượt bấm của người dùng"],
      ["ETL (Extract, Transform, Load)", "trích xuất, biến đổi, nạp dữ liệu"],
      ["Data catalog", "danh mục dữ liệu"],
      ["Big data", "dữ liệu lớn"],
      ["Data warehouse", "kho dữ liệu"],
      ["Business Intelligence (BI)", "phân tích kinh doanh"],
      ["Dashboard", "bảng điều khiển trực quan"],
      ["Log analytics", "phân tích nhật ký"]
    ],
    qids: ["d3-52", "d3-53", "d3-54", "d3-55", "d3-56", "d3-14"]
  },

  {
    id: "3-14",
    module: 3,
    title: "Quản lý và quản trị: Organizations, Control Tower, Systems Manager, Trusted Advisor…",
    mins: 17,
    goals: [
      "Hiểu vì sao doanh nghiệp dùng nhiều tài khoản AWS và cách quản lý chúng bằng Organizations, SCP, Control Tower",
      "Biết Service Catalog, Service Quotas, Systems Manager, CloudFormation dùng để làm gì",
      "Phân biệt các công cụ đưa khuyến nghị: Trusted Advisor, Compute Optimizer, Well-Architected Tool",
      "Biết AWS Health Dashboard, License Manager và AWS RAM"
    ],
    html: `
<h3>1. Nhiều tài khoản AWS: Organizations, SCP và Control Tower</h3>
<p>Một <b>AWS account</b> (tài khoản AWS) là một "khu vực riêng" chứa tài nguyên và hóa đơn. Doanh nghiệp lớn thường dùng <b>nhiều tài khoản</b>: một cho môi trường thử nghiệm, một cho môi trường thật (production), một cho từng phòng ban. Tách như vậy giúp lỗi ở chỗ này không lan sang chỗ khác và dễ theo dõi chi phí. Nhưng nhiều tài khoản thì cần cách quản lý tập trung.</p>
<h4>AWS Organizations</h4>
<p><b>AWS Organizations</b> gom nhiều tài khoản vào một tổ chức, sắp xếp thành nhóm gọi là <b>OU</b> (Organizational Unit, đơn vị tổ chức). Lợi ích chính:</p>
<ul>
<li><b>Consolidated billing</b> (thanh toán hợp nhất): một hóa đơn chung cho mọi tài khoản, và cộng dồn mức sử dụng để hưởng giảm giá theo khối lượng.</li>
<li><b>SCP</b> (Service Control Policy, chính sách kiểm soát dịch vụ): đặt <b>giới hạn tối đa</b> những gì các tài khoản được phép làm. Ví dụ "không ai trong OU Thử nghiệm được dùng Region ngoài châu Á".</li>
</ul>
<div class="box trap"><b>⚠️ Bẫy hay gặp</b><p>SCP <b>không cấp quyền</b> cho ai cả. Nó chỉ vẽ "hàng rào" giới hạn. Người dùng vẫn cần quyền từ IAM; quyền thực tế là phần <b>giao nhau</b> giữa những gì IAM cho phép và những gì SCP không chặn. SCP áp dụng lên cả tài khoản, kể cả root user của tài khoản thành viên.</p></div>
<h4>AWS Control Tower</h4>
<p><b>AWS Control Tower</b> giúp <b>dựng nhanh và quản trị</b> một môi trường nhiều tài khoản an toàn theo best practice, gọi là <b>landing zone</b> (vùng hạ cánh). Nó dùng Organizations bên dưới, tự tạo sẵn các tài khoản nền tảng (như tài khoản ghi log, tài khoản kiểm toán) và áp các <b>control</b> (còn gọi guardrail, quy tắc bảo vệ) có sẵn.</p>
<div class="box idea"><b>🧠 Hiểu đơn giản</b><p>Organizations giống <b>tập đoàn quản lý nhiều cửa hàng</b>: chung một sổ kế toán, và có <b>nội quy tập đoàn</b> (SCP) mà cửa hàng nào cũng phải theo. Control Tower giống <b>gói "mở chuỗi cửa hàng trọn gói"</b>: đến là có sẵn mặt bằng chuẩn, camera, quy định an toàn, bạn chỉ việc mở thêm cửa hàng mới theo khuôn.</p></div>

<h3>2. Cung cấp và vận hành tài nguyên</h3>
<ul>
<li><b>AWS Service Catalog</b>: bộ phận IT tạo <b>danh mục các sản phẩm đã được duyệt</b> (ví dụ "máy chủ web chuẩn công ty") để nhân viên tự triển khai, đúng cấu hình, đúng quy định. Như <b>thực đơn cố định</b> của căng tin: chỉ được chọn món có trong thực đơn.</li>
<li><b>Service Quotas</b>: mỗi dịch vụ AWS có <b>giới hạn</b> (quota, còn gọi service limit), ví dụ số lượng tài nguyên tối đa trong một Region. Service Quotas cho xem tất cả giới hạn ở <b>một chỗ</b> và gửi yêu cầu tăng.</li>
<li><b>AWS Systems Manager</b>: "hộp đồ nghề" để <b>quản lý và vận hành hàng loạt máy chủ</b> (EC2 và cả máy on-premises): tự động vá lỗi (Patch Manager), chạy lệnh trên nhiều máy cùng lúc (Run Command), đăng nhập vào máy an toàn mà không cần mở cổng SSH (Session Manager), lưu cấu hình và mật khẩu ứng dụng (Parameter Store).</li>
<li><b>AWS CloudFormation</b> (nhắc lại): mô tả hạ tầng bằng <b>file template</b> rồi để AWS tự tạo đúng y như vậy, lặp lại được nhiều lần. Đây là <b>Infrastructure as Code</b> (hạ tầng dưới dạng code).</li>
</ul>

<h3>3. Công cụ đưa khuyến nghị và theo dõi</h3>
<ul>
<li><b>AWS Trusted Advisor</b>: kiểm tra tài khoản của bạn và đưa <b>khuyến nghị theo best practice</b> ở các nhóm như tối ưu chi phí, hiệu năng, bảo mật, khả năng chịu lỗi, giới hạn dịch vụ. Ví dụ: chỉ ra máy EC2 đang để không, S3 bucket mở công khai, sắp chạm giới hạn dịch vụ. Số lượng kiểm tra được dùng phụ thuộc gói Support.</li>
<li><b>AWS Compute Optimizer</b>: dùng <b>machine learning</b> phân tích mức sử dụng thực tế để gợi ý <b>loại và kích thước</b> tài nguyên phù hợp (EC2, Auto Scaling group, EBS, Lambda...), tức là hỗ trợ <b>rightsizing</b>.</li>
<li><b>AWS Health Dashboard</b>: xem <b>sự cố của dịch vụ AWS</b> và <b>lịch bảo trì</b> có thể ảnh hưởng tới tài nguyên của bạn. Có phần tình trạng chung của các dịch vụ AWS và phần riêng cho tài khoản của bạn.</li>
<li><b>AWS Well-Architected Tool</b>: công cụ hỏi đáp giúp bạn <b>tự đánh giá workload</b> theo các trụ cột của <b>AWS Well-Architected Framework</b> và chỉ ra rủi ro cần cải thiện.</li>
</ul>
<div class="box trap"><b>⚠️ Bẫy hay gặp</b><p>Trusted Advisor, Compute Optimizer và Well-Architected Tool đều "khuyên". Phân biệt: <b>Trusted Advisor</b> tự quét tài khoản, khuyên <b>rộng</b> về nhiều mặt (chi phí, bảo mật, giới hạn...). <b>Compute Optimizer</b> chỉ chuyên <b>chọn đúng cỡ tài nguyên</b> bằng ML. <b>Well-Architected Tool</b> là <b>bạn tự trả lời bộ câu hỏi</b> để đánh giá kiến trúc một workload. Còn <b>Health Dashboard</b> nói về sự cố phía <b>AWS</b>, không phải lời khuyên tối ưu.</p></div>

<h3>4. License Manager và AWS RAM</h3>
<p><b>AWS License Manager</b> giúp <b>quản lý và theo dõi license phần mềm</b> (giấy phép sử dụng) từ các hãng như Microsoft, Oracle, SAP, để không dùng vượt số license đã mua và tránh rủi ro khi bị kiểm tra bản quyền.</p>
<p><b>AWS Resource Access Manager</b> (AWS RAM) cho phép <b>chia sẻ tài nguyên</b> giữa các tài khoản AWS (hoặc trong cả Organization), ví dụ chia sẻ subnet hay Transit Gateway, thay vì mỗi tài khoản phải tạo một bản riêng.</p>

<div class="box example"><b>🍰 Ví dụ: BánhNgon</b><p>BánhNgon giờ có các tài khoản riêng cho Hà Nội, TP.HCM, Nhật Bản, thử nghiệm và production. Minh dùng <b>Control Tower</b> để dựng landing zone, bên dưới là <b>Organizations</b> gộp một hóa đơn chung. Một <b>SCP</b> chặn tài khoản thử nghiệm dùng các loại máy đắt tiền. Nhân viên mới muốn có máy chủ thử nghiệm thì chọn từ <b>Service Catalog</b>. Mùa Trung thu, Minh vào <b>Service Quotas</b> xin tăng giới hạn số máy EC2. <b>Systems Manager</b> tự vá tất cả máy chủ mỗi tuần. <b>Trusted Advisor</b> báo có mấy ổ EBS không gắn vào đâu, xóa đi tiết kiệm tiền; <b>Compute Optimizer</b> gợi ý hạ cỡ máy chạy web. Một hôm website chậm, Minh mở <b>AWS Health Dashboard</b> thấy AWS đang báo sự cố ở một AZ. Phòng kế toán dùng <b>License Manager</b> theo dõi license Windows Server. Mạng dùng chung được chia sẻ cho các tài khoản qua <b>AWS RAM</b>.</p></div>

<h3>5. Bảng "cần gì → dùng gì"</h3>
<table>
<tr><th>Nhu cầu</th><th>Dịch vụ</th></tr>
<tr><td>Quản lý tập trung nhiều tài khoản, một hóa đơn chung</td><td>AWS Organizations (consolidated billing)</td></tr>
<tr><td>Giới hạn tối đa quyền cho tài khoản/OU</td><td>Service Control Policy (SCP)</td></tr>
<tr><td>Dựng nhanh landing zone nhiều tài khoản theo best practice</td><td>AWS Control Tower</td></tr>
<tr><td>Danh mục sản phẩm IT đã duyệt để người dùng tự triển khai</td><td>AWS Service Catalog</td></tr>
<tr><td>Xem giới hạn dịch vụ và xin tăng</td><td>Service Quotas</td></tr>
<tr><td>Vá lỗi, chạy lệnh, quản lý hàng loạt máy chủ</td><td>AWS Systems Manager</td></tr>
<tr><td>Tạo hạ tầng lặp lại được bằng template</td><td>AWS CloudFormation</td></tr>
<tr><td>Khuyến nghị best practice: chi phí, bảo mật, hiệu năng, giới hạn</td><td>AWS Trusted Advisor</td></tr>
<tr><td>Gợi ý loại/kích thước EC2 tối ưu bằng ML</td><td>AWS Compute Optimizer</td></tr>
<tr><td>Sự cố AWS và lịch bảo trì ảnh hưởng tài khoản</td><td>AWS Health Dashboard</td></tr>
<tr><td>Đánh giá workload theo Well-Architected Framework</td><td>AWS Well-Architected Tool</td></tr>
<tr><td>Theo dõi license phần mềm Microsoft, Oracle</td><td>AWS License Manager</td></tr>
<tr><td>Chia sẻ tài nguyên giữa các tài khoản</td><td>AWS Resource Access Manager (RAM)</td></tr>
</table>
<div class="box exam"><b>🎯 Đề thi hay hỏi</b><ul>
<li>"single bill, volume discounts across accounts" → <b>Organizations consolidated billing</b></li>
<li>"set up and govern a secure multi-account environment (landing zone)" → <b>Control Tower</b></li>
<li>"catalogs of approved IT services" → <b>Service Catalog</b>; "view limits and request increases" → <b>Service Quotas</b></li>
<li>"recommend optimal EC2 instance types using ML" → <b>Compute Optimizer</b></li>
<li>"identify idle resources, best practice checks" → <b>Trusted Advisor</b></li>
<li>"AWS service events, scheduled maintenance affecting your resources" → <b>AWS Health Dashboard</b></li>
<li>"review workloads against Well-Architected best practices" → <b>Well-Architected Tool</b></li>
<li>"manage software licenses (Microsoft, Oracle)" → <b>License Manager</b></li>
</ul></div>
`,
    summary: [
      "Organizations gom nhiều tài khoản: consolidated billing và SCP (giới hạn tối đa, không cấp quyền).",
      "Control Tower dựng landing zone nhiều tài khoản theo best practice, dùng Organizations bên dưới.",
      "Service Catalog = danh mục sản phẩm đã duyệt; Service Quotas = xem và xin tăng giới hạn.",
      "Systems Manager = vận hành hàng loạt máy chủ (vá, chạy lệnh, Session Manager); CloudFormation = hạ tầng bằng template.",
      "Trusted Advisor = khuyến nghị best practice rộng; Compute Optimizer = rightsizing bằng ML; Well-Architected Tool = tự đánh giá workload.",
      "Health Dashboard = sự cố và bảo trì của AWS; License Manager = quản lý license; RAM = chia sẻ tài nguyên giữa tài khoản."
    ],
    terms: [
      ["AWS account", "tài khoản AWS"],
      ["Organizational Unit (OU)", "đơn vị tổ chức (nhóm tài khoản)"],
      ["Consolidated billing", "thanh toán hợp nhất"],
      ["Service Control Policy (SCP)", "chính sách kiểm soát dịch vụ"],
      ["Landing zone", "môi trường nhiều tài khoản dựng sẵn theo chuẩn"],
      ["Guardrail / control", "quy tắc bảo vệ"],
      ["Service quota / service limit", "giới hạn dịch vụ"],
      ["Patch", "bản vá"],
      ["Infrastructure as Code (IaC)", "hạ tầng dưới dạng code"],
      ["Best practice", "cách làm tốt nhất được khuyến nghị"],
      ["Rightsizing", "chọn đúng kích thước tài nguyên"],
      ["Scheduled maintenance", "bảo trì theo lịch"],
      ["Software license", "giấy phép phần mềm"],
      ["Resource sharing", "chia sẻ tài nguyên"]
    ],
    qids: ["d3-73", "d3-74", "d3-75", "d3-76", "d3-77", "d3-78", "d3-79", "d4-5", "d4-10", "d3-18"]
  }
);
