# CLF-C02 Study: Ôn thi AWS Certified Cloud Practitioner

Website tự học cá nhân để ôn thi **AWS Certified Cloud Practitioner (CLF-C02)**, dành cho người **bắt đầu từ số 0**: học bằng tiếng Việt (giữ thuật ngữ tiếng Anh), luyện đề bằng tiếng Anh như thi thật.

👉 **Mở website:** https://dthp293.github.io/aws-clf-c02/

- 39 bài học (khoảng 57.000 từ): nền tảng IT → 4 domain của đề thi → 5 bài thực hành
- 323 câu luyện tập + 195 câu **kho đề thi thử riêng** (đủ cho 3 đề 65 câu hoàn toàn mới, không lẫn vào phần luyện tập)
- Ôn tập theo **lặp lại ngắt quãng (SRS)**, thi thử 65 câu / 90 phút, thống kê theo task statement
- Chạy **offline** trên điện thoại (PWA), không cần tài khoản, dữ liệu lưu ngay trên máy

> Nội dung tự biên soạn theo Exam Guide CLF-C02 công khai của AWS, không sao chép đề thi hay bộ Official Practice Question Set.

---

## 1. Lộ trình học gợi ý (khoảng 6 tuần, mỗi ngày 45–60 phút)

| Tuần | Học gì | Chế độ ngôn ngữ (Cài đặt) |
|---|---|---|
| 1 | **Nền tảng IT** (bài 0-1 → 0-4) + **Domain 1** (1-1 → 1-5) | Song ngữ |
| 2 | **Domain 2: Bảo mật** (2-1 → 2-7) | Song ngữ |
| 3 | **Domain 3** phần 1 (3-1 → 3-7) | Ưu tiên tiếng Anh |
| 4 | **Domain 3** phần 2 (3-8 → 3-14) + **Domain 4** (4-1 → 4-4) | Ưu tiên tiếng Anh |
| 5 | Ôn task yếu, luyện **Câu nâng cao**, **Câu chọn nhiều đáp án**, **Luyện đọc đề**; làm thử vài bài thực hành (tùy chọn) | Chỉ tiếng Anh |
| 6 | **Thi thử** 2–3 đề, ôn lại task yếu, làm Official Practice Question Set trên AWS Skill Builder | Chỉ tiếng Anh |

**Thói quen mỗi ngày:**
1. Mở **Ôn hôm nay** và ôn hết các thẻ đến hạn (khoảng 10–15 phút).
2. Học **1 bài mới** trong mục **Bài học**, rồi bấm **"✍️ Luyện N câu của bài này"** ở cuối bài.
3. Bấm **"✓ Đánh dấu đã học"** để app theo dõi tiến độ.

**Khi nào sẵn sàng đi thi?** Khi thẻ **"🎯 Sẵn sàng đi thi"** sáng lên, tức là đạt **≥ 80% ở 3 đề thi thử mới liên tiếp** (chỉ tính đề có ít nhất một nửa số câu là câu gặp lần đầu), và bạn cũng làm tốt bộ đề chính thức miễn phí của AWS trên Skill Builder. Ngưỡng đậu thật là 700/1000 (thang điểm scaled), nên nhắm 80% để có khoảng an toàn.

---

## 2. Hướng dẫn sử dụng

### 📚 Bài học
- **Khóa học:** học theo thứ tự. Mỗi bài có: mục tiêu → giải thích từ gốc, ví dụ đời thường, câu chuyện tiệm bánh *BánhNgon* xuyên suốt → khung **🎯 Đề thi hay hỏi** và **⚠️ Bẫy hay gặp** → tóm tắt và bảng thuật ngữ.
- **📋 Tóm tắt nhanh:** bảng tra cứu ngắn gọn để ôn lại sau khi đã học bài chi tiết.
- **🛠️ Thực hành (tùy chọn):** 5 bài thực hành trên tài khoản AWS thật. **Luôn làm theo phần dọn dẹp ở cuối mỗi bài** để tránh phát sinh chi phí. Đọc kỹ cảnh báo về Free Tier ở bài 5-1.

### 📅 Ôn hôm nay (SRS)
Trộn câu hỏi, từ vựng đề thi và thẻ dịch vụ AWS. Sau mỗi thẻ, tự chấm **Lại / Khó / Tốt / Dễ**:
- Trả lời sai thì thẻ quay lại sau **10 phút**.
- Trả lời đúng thì khoảng cách ôn giãn dần (1 → 4 → 10… ngày).
- Số thẻ mới mỗi ngày chỉnh được trong **Cài đặt** (mặc định 15). Chỉ thẻ mới học trong **Ôn hôm nay** mới tính vào hạn mức này; luyện tập tự do không làm giảm số thẻ mới.
- Ngày học được tính sang ngày mới lúc **4 giờ sáng** (giống Anki), nên ôn khuya sau 0 giờ vẫn tính cho hôm trước.

### ✍️ Luyện tập
- Luyện theo **domain**, **trộn tất cả**, **câu hay sai**, **🔥 câu nâng cao**, **☑️ câu chọn nhiều đáp án** (Choose TWO/THREE).
- **📖 Luyện đọc đề:** chỉ hiện đề tiếng Anh, bạn chạm vào các từ khóa quyết định đáp án (ví dụ *MOST cost-effective*, *cannot be interrupted*), có đồng hồ đếm giây. Sau đó app hiện từ khóa gợi ý, bản dịch rồi mới đến các lựa chọn. Khi thi, mục tiêu là khoảng **80 giây/câu**.
- **Bảng theo task statement (1.1 → 4.3):** gộp kết quả luyện tập và thi thử, xếp task yếu nhất lên đầu, có nút luyện riêng từng task.

### 📝 Thi thử
- 65 câu / 90 phút (bật **ESL +30 phút** nếu bạn đăng ký hỗ trợ này khi đặt lịch thi), chia đúng tỷ trọng **16 / 19 / 22 / 8** câu theo 4 domain.
- Câu hỏi lấy từ **kho đề riêng**: các câu này **không xuất hiện khi luyện tập**, nên điểm phản ánh năng lực thật chứ không phải trí nhớ. App ưu tiên câu bạn chưa gặp.
- Trang Thi thử cho biết kho còn đủ câu chưa gặp cho **bao nhiêu đề hoàn toàn mới**. Mỗi đề làm xong sẽ dùng hết các câu mới đó, nên hãy **để dành đề mới cho 1–2 tuần cuối** để đo mức sẵn sàng.
- Có thể đánh dấu câu, chuyển qua lại giữa các câu. Phím tắt: A–F chọn đáp án, ←/→ chuyển câu, **M** đánh dấu. Câu chọn nhiều đáp án mà chọn chưa đủ sẽ hiện viền nét đứt và được nhắc khi nộp bài.
- Kết quả gồm: **% đúng**, phân tích theo domain, **task cần ôn thêm**, số câu mới gặp lần đầu, và xem lại từng câu kèm giải thích (bật được tiếng Việt).

### 🔤 Hỗ trợ tiếng Anh
- **3 chế độ ngôn ngữ** (Cài đặt): *Song ngữ* → *Ưu tiên tiếng Anh* (bấm để xem bản dịch) → *Chỉ tiếng Anh*.
- **Từ khóa tô màu** trong đề: rê chuột hoặc chạm vào để xem nghĩa tiếng Việt và gợi ý dịch vụ.
- Trang **Từ vựng**: tra cứu từ khóa đề thi và hơn 100 dịch vụ AWS, mỗi dịch vụ ghi kèm "hay nhầm với".

### 📱 Cài lên điện thoại và dùng offline
- **iPhone/iPad:** mở link bằng **Safari** → nút **Chia sẻ** → **"Thêm vào MH chính"**.
- **Android:** mở bằng **Chrome** → menu **⋮** → **"Cài đặt ứng dụng"** (hoặc vào **Cài đặt** trong website → **📲 Cài ứng dụng**).
- Mở ứng dụng một lần khi có mạng để tải sẵn nội dung. Sau đó dùng được cả khi không có mạng. Khi có nội dung mới, app hiện thanh **"🔄 Có nội dung mới → Cập nhật"**.

### 💾 Sao lưu tiến độ (quan trọng)
Tiến độ học **chỉ lưu trong trình duyệt/thiết bị đang dùng**, không tự đồng bộ giữa các máy.
- **Cài đặt → Xuất dữ liệu (.json)** để sao lưu; **Nhập dữ liệu** trên máy khác để tiếp tục.
- Nên xuất dữ liệu định kỳ. Trên iPhone, nếu lâu ngày không mở ứng dụng, hệ điều hành có thể xóa dữ liệu của trang.

---

## 3. Mẹo làm bài thi CLF-C02

- Đề có **65 câu** (50 câu tính điểm + 15 câu thử nghiệm không tính điểm, bạn không biết câu nào). **Không bị trừ điểm khi đoán sai, nên đừng bỏ trống câu nào.**
- Đọc **câu hỏi cuối** trước (*Which service…? / Which is the MOST cost-effective…?*), rồi tìm **ràng buộc** trong đề (*without managing servers, cannot be interrupted, data must stay in the country…*).
- Câu **Choose TWO/THREE**: phải chọn đủ và đúng hết mới được điểm.
- Loại trừ trước các đáp án sai rõ ràng, sau đó so sánh 2 đáp án còn lại theo đúng từ khóa của đề.
- Các cặp hay nhầm: CloudTrail / CloudWatch / Config · Shield / WAF / Firewall Manager · GuardDuty / Inspector / Macie · Multi-AZ / read replica · SQS / SNS / EventBridge · Cost Explorer / Budgets / Pricing Calculator.

---

## 4. Dành cho người duy trì nội dung

### Chạy trên máy
Website là file tĩnh, không cần build:
```bash
python3 -m http.server 8766
```
Rồi mở http://localhost:8766. Service worker (offline) chỉ chạy trên `localhost` hoặc HTTPS.

### Cấu trúc thư mục
| Đường dẫn | Nội dung |
|---|---|
| `index.html`, `app.js`, `style.css` | Giao diện và logic (SRS, luyện tập, thi thử, thống kê, luyện đọc đề) |
| `course/course-a.js` … `course-f.js` | Bài học: nền tảng + D1, D2, D3 (2 file), D4, thực hành |
| `data.js` | Domain, câu hỏi gốc, từ vựng, thẻ dịch vụ, bảng tóm tắt nhanh |
| `questions-2.js`, `content-3.js`, `questions-4.js`, `extra/*.js` | Câu hỏi luyện tập (và từ vựng, thẻ dịch vụ bổ sung) |
| `exam/exam-d1.js` … `exam-d4.js`, `exam/exam-e.js` | **Kho đề thi thử riêng**: không gắn vào bài học hay luyện tập |
| `meta/tags-*.js` | Gắn mỗi câu hỏi với **task statement** (1.1 → 4.3) và bài học |
| `manifest.webmanifest`, `sw.js`, `icons/` | PWA và chế độ offline |

### Thêm câu hỏi
Mỗi câu là một object:
```js
{ id: "d3-200", d: 3, en: "English stem…", vi: "Bản dịch…",
  opts: [["Option EN", "Lựa chọn VI"], …], ans: [0],
  exp: "Giải thích chung", why: ["Lý do cho từng lựa chọn", …] }
```
- `ans` là chỉ số đáp án đúng (từ 0). Câu nhiều đáp án phải ghi "(Choose TWO.)" hoặc "(Choose THREE.)" trong `en`.
- `why` phải có số phần tử bằng `opts` và cùng thứ tự; mỗi dòng nêu lý do, không chỉ ghi "Sai.".
- Thêm nhãn trong `meta/tags-*.js`: `"d3-200": ["3.6", "3-6"]` (task statement, bài học). Với câu trong kho thi thử (id bắt đầu bằng `x`), bài học phải là `null`.
- Thêm **file mới** thì phải thêm thẻ `<script>` vào `index.html` (trước `app.js`), thêm tên file vào `FILES` trong `sw.js`, và tăng `VERSION`.

### Deploy
Repo dùng **GitHub Pages** (nhánh `main`, thư mục gốc). Chỉ cần `git push` là website tự cập nhật sau khoảng 1 phút.

---

## Lưu ý
- Đây là tài liệu tự học cá nhân, **không phải tài liệu chính thức của AWS**. AWS thường xuyên đổi tên dịch vụ, gói Support và chính sách Free Tier, nên hãy đối chiếu với [Exam Guide CLF-C02](https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02.html) và trang chính thức của AWS.
- Không tài liệu nào đảm bảo chắc chắn đỗ. Hãy kết hợp với **AWS Skill Builder** (Cloud Practitioner Essentials, Official Practice Question Set) và thực hành trên tài khoản AWS.
