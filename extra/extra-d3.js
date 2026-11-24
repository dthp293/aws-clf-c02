(() => {
const Q = (id, d, en, vi, opts, ans, exp, why) => ({ id, d, lvl: 2, en, vi, opts, ans, exp, why });
window.CLF.questions.push(
  Q("d3-110", 3, "A company runs a batch video transcoding service and a scientific modeling application. Both workloads are limited by CPU performance, and they need little memory relative to processing power. Which Amazon EC2 instance family is the BEST fit?",
    "Công ty chạy dịch vụ chuyển mã video theo lô và một ứng dụng mô phỏng khoa học. Cả hai bị giới hạn bởi hiệu năng CPU và cần ít bộ nhớ so với năng lực xử lý. Họ instance EC2 nào PHÙ HỢP NHẤT?",
    [["Compute optimized (for example, C instances)", "Compute optimized (ví dụ dòng C)"],
     ["Memory optimized (for example, R instances)", "Memory optimized (ví dụ dòng R)"],
     ["Storage optimized (for example, I instances)", "Storage optimized (ví dụ dòng I)"],
     ["General purpose (for example, balanced M instances)", "General purpose (ví dụ dòng M cân bằng)"]], [0],
    "CPU là điểm nghẽn (batch processing, transcoding, HPC, game server, mô hình khoa học) → Compute optimized (dòng C): tỷ lệ vCPU trên bộ nhớ cao.",
    ["Đúng: compute optimized cho hiệu năng CPU cao với giá tốt, hợp với tải nặng về tính toán.",
     "Sai: memory optimized dành cho tải cần nhiều RAM như in-memory database, không phải tải bị giới hạn CPU.",
     "Sai: storage optimized tối ưu đọc ghi ổ cục bộ rất nhanh, không phải năng lực CPU.",
     "Sai: general purpose cân bằng CPU và bộ nhớ, không tối ưu bằng dòng C cho tải nặng CPU."]),

  Q("d3-111", 3, "A company runs a self-managed NoSQL database on Amazon EC2. The database needs very high, low-latency random read and write IOPS on locally attached disks, and it replicates data across nodes itself. Which Amazon EC2 instance family should the company choose?",
    "Công ty tự chạy một NoSQL database trên EC2. Database cần IOPS đọc ghi ngẫu nhiên rất cao, độ trễ thấp trên ổ gắn cục bộ, và tự sao chép dữ liệu giữa các node. Nên chọn họ instance EC2 nào?",
    [["Storage optimized", "Storage optimized"],
     ["Compute optimized", "Compute optimized"],
     ["Accelerated computing", "Accelerated computing"],
     ["Memory optimized", "Memory optimized"]], [0],
    "IOPS rất cao trên ổ cục bộ (NoSQL như Cassandra, data warehouse, Elasticsearch/OpenSearch tự quản lý) → Storage optimized (dòng I, D…), thường có ổ NVMe instance store. Ứng dụng tự sao chép giữa các node nên chấp nhận được việc instance store là ổ tạm.",
    ["Đúng: storage optimized có ổ cục bộ tốc độ cao, cho hàng trăm nghìn tới hàng triệu IOPS với độ trễ thấp.",
     "Sai: compute optimized tăng năng lực CPU, không phải tốc độ đọc ghi ổ cục bộ.",
     "Sai: accelerated computing dùng GPU hoặc chip chuyên dụng cho ML và đồ họa, không giải quyết nhu cầu IOPS.",
     "Sai: memory optimized tăng dung lượng RAM; database này cần IOPS ổ đĩa cục bộ là chính."]),

  Q("d3-112", 3, "A machine learning team needs to train deep learning models on large image datasets. Training on CPU-based instances takes weeks, and the team wants hardware that performs massively parallel calculations much faster. Which Amazon EC2 instance family should the team use?",
    "Đội machine learning cần huấn luyện mô hình deep learning trên tập ảnh lớn. Huấn luyện trên instance dùng CPU mất nhiều tuần, đội muốn phần cứng tính toán song song quy mô lớn nhanh hơn nhiều. Nên dùng họ instance EC2 nào?",
    [["Accelerated computing (for example, P instances)", "Accelerated computing (ví dụ dòng P)"],
     ["Compute optimized (for example, C instances)", "Compute optimized (ví dụ dòng C)"],
     ["Storage optimized (for example, I instances)", "Storage optimized (ví dụ dòng I)"],
     ["Memory optimized (for example, high-memory X instances)", "Memory optimized (ví dụ dòng X bộ nhớ lớn)"]], [0],
    "Huấn luyện ML, deep learning, đồ họa, tính toán song song lớn → Accelerated computing (GPU dòng P/G, hoặc chip AWS Trainium/Inferentia).",
    ["Đúng: accelerated computing dùng GPU hoặc chip chuyên dụng để tính toán song song, rút ngắn đáng kể thời gian huấn luyện.",
     "Sai: compute optimized có CPU mạnh nhưng vẫn là CPU, không có khả năng song song quy mô lớn như GPU.",
     "Sai: storage optimized tối ưu IOPS ổ cục bộ, không tăng tốc tính toán.",
     "Sai: memory optimized có nhiều RAM, nhưng điểm nghẽn ở đây là năng lực tính toán song song."]),
);
(window.CLF.course||[]).forEach(l=>{ if(l.id==="3-3") l.qids=[...new Set([...(l.qids||[]),"d3-110","d3-111","d3-112"])]; });
})();
