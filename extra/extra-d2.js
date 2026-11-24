/* Câu luyện tập bổ sung — Domain 2: AWS managed vs customer managed vs inline policy. d2-60..d2-62.
 * Tự viết theo Exam Guide CLF-C02, không sao chép đề chính thức.
 * Nạp SAU các file course/ (để gắn câu hỏi vào bài 2-2).
 */
(() => {
const Q = (id, d, en, vi, opts, ans, exp, why) => ({ id, d, lvl: 2, en, vi, opts, ans, exp, why });
window.CLF.questions.push(

  Q("d2-60", 2, "A company attached an AWS managed policy to the role that its deployment pipeline uses. After AWS updated that policy, the role gained permissions that the security team had not reviewed. The team wants full control over when the role's permissions change, while keeping one policy that several roles can share. What should the team do?",
    "Một công ty gắn AWS managed policy vào role mà pipeline triển khai sử dụng. Sau khi AWS cập nhật policy đó, role có thêm những quyền mà đội bảo mật chưa xem xét. Đội muốn toàn quyền kiểm soát khi nào quyền của role thay đổi, nhưng vẫn giữ một policy dùng chung cho nhiều role. Đội nên làm gì?",
    [["Move the permissions into a customer managed policy you control", "Chuyển quyền sang một customer managed policy do bạn kiểm soát"],
     ["Edit the AWS managed policy to remove the newly added permissions", "Sửa AWS managed policy để bỏ các quyền mới được thêm vào"],
     ["Embed the permissions as an inline policy in each of the roles", "Nhúng quyền dưới dạng inline policy vào từng role"],
     ["Turn off automatic updates for the AWS managed policy in IAM", "Tắt cập nhật tự động của AWS managed policy trong IAM"]], [0],
    "AWS managed policy do AWS tạo và cập nhật; khách hàng không sửa được và không chặn được các bản cập nhật. Muốn tự kiểm soát nội dung mà vẫn dùng lại cho nhiều identity → customer managed policy (có versioning, rollback).",
    ["Đúng: customer managed policy chỉ thay đổi khi bạn sửa, và gắn được cho nhiều role.",
     "Sai: khách hàng không thể chỉnh sửa AWS managed policy.",
     "Sai: inline policy chỉ thuộc về một identity, phải sửa lặp lại ở từng role, không phải một policy dùng chung.",
     "Sai: IAM không có tùy chọn tắt cập nhật cho AWS managed policy."]),

  Q("d2-61", 2, "A company grants a temporary IAM role one very specific permission for a short project. The security team requires that this permission can never be attached to any other identity by mistake and that it is removed automatically when the role is deleted. Which type of policy BEST meets these requirements?",
    "Công ty cấp cho một IAM role tạm thời một quyền rất cụ thể trong một dự án ngắn. Đội bảo mật yêu cầu quyền này không bao giờ bị gắn nhầm cho identity khác, và tự động bị xóa khi role bị xóa. Loại policy nào đáp ứng TỐT NHẤT?",
    [["An inline policy embedded in the role", "Inline policy nhúng trực tiếp vào role"],
     ["A customer managed policy attached to the role", "Customer managed policy gắn vào role"],
     ["An AWS managed policy attached to the role", "AWS managed policy gắn vào role"],
     ["A service control policy on the role's account", "Service control policy trên tài khoản của role"]], [0],
    "Inline policy có quan hệ 1-1 với đúng một user, group hoặc role, và bị xóa cùng identity đó. Managed policy (AWS hay customer) là đối tượng độc lập, gắn được cho nhiều identity và vẫn tồn tại khi role bị xóa.",
    ["Đúng: inline policy chỉ thuộc về role này và bị xóa cùng role.",
     "Sai: customer managed policy là đối tượng riêng, có thể bị gắn cho identity khác và không tự xóa theo role.",
     "Sai: AWS managed policy dùng chung cho mọi khách hàng, thường rộng và không thể tùy biến cho một quyền cụ thể.",
     "Sai: SCP chỉ giới hạn quyền tối đa của tài khoản, không cấp quyền cho role."]),

  Q("d2-62", 2, "A company is standardizing how it writes IAM permissions and asks which statements about customer managed policies are correct. (Choose TWO.)",
    "Công ty đang chuẩn hóa cách viết quyền IAM và hỏi những phát biểu nào về customer managed policy là đúng. (Chọn 2.)",
    [["One policy can be attached to multiple users, groups, and roles in the account", "Một policy có thể gắn cho nhiều user, group và role trong tài khoản"],
     ["IAM keeps previous versions so that the company can roll back a change", "IAM giữ các phiên bản cũ để công ty có thể quay lại thay đổi trước đó"],
     ["AWS updates them automatically when new services are released", "AWS tự động cập nhật chúng khi có dịch vụ mới ra mắt"],
     ["They are deleted automatically when the last attached role is deleted", "Chúng tự động bị xóa khi role cuối cùng được gắn bị xóa"],
     ["They are shared with every account in the organization automatically", "Chúng tự động được chia sẻ cho mọi tài khoản trong organization"]], [0, 1],
    "Customer managed policy: bạn viết và sở hữu, dùng lại được cho nhiều identity trong tài khoản, có versioning (giữ tối đa 5 phiên bản) để rollback. Nó không tự cập nhật (khác AWS managed), không tự xóa theo identity (khác inline), và chỉ tồn tại trong một tài khoản.",
    ["Đúng: managed policy là đối tượng độc lập, gắn được cho nhiều identity.",
     "Đúng: managed policy có versioning, có thể đặt lại phiên bản mặc định cũ.",
     "Sai: đó là đặc điểm của AWS managed policy; customer managed policy chỉ thay đổi khi bạn sửa.",
     "Sai: managed policy vẫn tồn tại khi không còn gắn với identity nào; chỉ inline policy bị xóa cùng identity.",
     "Sai: customer managed policy chỉ nằm trong tài khoản tạo ra nó; muốn dùng ở tài khoản khác phải tạo lại (ví dụ bằng CloudFormation StackSets)."]),
);
(window.CLF.course||[]).forEach(l=>{ if(l.id==="2-2") l.qids=[...new Set([...(l.qids||[]),"d2-60","d2-61","d2-62"])]; });
})();
