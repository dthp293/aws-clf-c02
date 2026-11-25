/* Chuỗi giao diện tiếng Việt (ngôn ngữ gốc, luôn được tải). Bản en/ja nằm ở i18n/<lang>/ui.js với CÙNG bộ khóa.
 * Cú pháp: {tên} = tham số; {n?một:nhiều} = chọn dạng số ít/số nhiều theo tham số n (chủ yếu dùng cho tiếng Anh).
 * Một số chuỗi chứa HTML (<b>, <a>…): giữ nguyên thẻ khi dịch. */
(function(){var I=window.CLF_I18N=window.CLF_I18N||{};var L=I.vi=I.vi||{};['q','course','lessons','glossary','services','domains','ui'].forEach(function(k){L[k]=L[k]||{};});
Object.assign(L.ui,{
  // Điều hướng
  'nav.home': 'Trang chủ', 'nav.review': 'Ôn hôm nay', 'nav.practice': 'Luyện tập', 'nav.exam': 'Thi thử',
  'nav.learn': 'Bài học', 'nav.glossary': 'Từ vựng', 'nav.settings': 'Cài đặt',
  'boot.loading': 'Đang tải nội dung…',

  // Task statements (Exam Guide)
  'task.1.1': 'Lợi ích của AWS Cloud', 'task.1.2': 'Well-Architected Framework', 'task.1.3': 'Migration & AWS CAF', 'task.1.4': 'Kinh tế học cloud',
  'task.2.1': 'Shared responsibility', 'task.2.2': 'Bảo mật, quản trị, tuân thủ', 'task.2.3': 'Quản lý truy cập (IAM)', 'task.2.4': 'Dịch vụ & tài nguyên bảo mật',
  'task.3.1': 'Cách triển khai & vận hành', 'task.3.2': 'Hạ tầng toàn cầu', 'task.3.3': 'Compute', 'task.3.4': 'Database', 'task.3.5': 'Network',
  'task.3.6': 'Storage', 'task.3.7': 'AI/ML & Analytics', 'task.3.8': 'Nhóm dịch vụ khác',
  'task.4.1': 'Mô hình giá', 'task.4.2': 'Billing & quản lý chi phí', 'task.4.3': 'Support & tài nguyên',
  'task.colTopic': 'Chủ đề', 'task.colAcc': 'Đúng', 'task.attempts': '{n} lượt', 'task.practiceN': 'Luyện {n}',

  // Module khóa học
  'mod.0': 'Nền tảng IT cho người mới', 'mod.5': 'Thực hành trên AWS (tùy chọn)', 'mod.short0': 'Nền tảng', 'mod.short5': 'Thực hành',

  // SRS
  'ivl.10min': '10 phút', 'ivl.days': '{n} ngày', 'ivl.months': '{n} tháng',
  'grade.again': 'Lại', 'grade.hard': 'Khó', 'grade.good': 'Tốt', 'grade.easy': 'Dễ',

  // Phiên ôn / luyện
  'session.done': '🎉 Xong phiên “{title}”',
  'session.summary': 'Đã ôn <b>{n}</b> lượt.',
  'session.summaryQ': 'Đã ôn <b>{n}</b> lượt · Câu hỏi: <b>{right}</b> đúng / <b>{wrong}</b> sai.',
  'session.note': 'Thẻ trả lời sai sẽ quay lại sau 10 phút (khi đến hạn). Thẻ đúng sẽ giãn dần khoảng cách ôn.',
  'btn.home': 'Về trang chủ', 'btn.morePractice': 'Luyện tập thêm',

  // Câu hỏi
  'q.showVi': 'Xem tiếng Việt', 'q.hideVi': 'Ẩn tiếng Việt',
  'q.check': 'Kiểm tra', 'q.keys': 'Phím: A–{last} chọn · Enter kiểm tra',
  'q.correct': '✅ <b>Chính xác!</b>', 'q.howWasIt': 'Bạn thấy câu này thế nào? (Enter = Tốt)',
  'q.wrong': '❌ <b>Chưa đúng.</b>', 'q.again10': 'Câu này sẽ quay lại sau 10 phút.', 'q.continue': 'Tiếp tục (Enter)',
  'tag.hard': '🔥 Nâng cao', 'tag.new': 'Mới', 'tag.choose': 'Chọn {n}',

  // Thẻ từ vựng / dịch vụ
  'flash.example': 'Ví dụ trong đề:', 'flash.confuse': '⚠️ Hay nhầm với:',
  'flash.vocab': 'Từ vựng đề thi', 'flash.service': 'Dịch vụ AWS · Domain {d}',
  'flash.askVocab': 'Nghĩa là gì? Thường gợi ý dịch vụ nào?', 'flash.askService': 'Dịch vụ này làm gì?',
  'flash.keys': 'Phím 1–4 để chấm', 'flash.flip': 'Lật thẻ (Space)',

  // Trang chủ
  'home.title': 'Ôn thi AWS Certified Cloud Practitioner',
  'home.weight': '{w}% đề',
  'home.domProgress': 'Đã học {seen}/{total} câu · Tỷ lệ đúng: <b>{acc}</b>',
  'home.due': 'thẻ đến hạn ôn', 'home.new': 'thẻ mới hôm nay', 'home.learned': 'thẻ đã học', 'home.streak': 'ngày liên tiếp',
  'home.daysToExam': 'ngày đến kỳ thi',
  'home.lastExam': 'thi thử gần nhất · sẵn sàng ước tính {lo}–{hi}%',
  'home.paceOver': 'Ngay cả 100 thẻ/ngày (mức tối đa) cũng không kịp học hết: hãy ưu tiên câu hỏi và các task yếu.',
  'home.paceApply': 'Đặt {n} thẻ/ngày',
  'home.pace': 'Còn <b>{remain}</b> thẻ mới. Để học hết trước ngày thi và chừa 7 ngày cuối để ôn, cần khoảng <b>{n} thẻ mới/ngày</b> trong {days} ngày tới (hiện là {cur}).',
  'home.lastExamNoEst': 'thi thử gần nhất',
  'home.examInProgress': 'Đang thi dở · tiếp tục',
  'home.todayN': 'Hôm nay cần ôn <b>{n}</b> thẻ.', 'home.todayDone': 'Hôm nay bạn đã ôn xong 🎉',
  'home.startReview': 'Bắt đầu ôn', 'home.viewSchedule': 'Xem lịch ôn',
  'home.course': '📚 Khóa học: <b>{done}/{total}</b> bài', 'home.next': 'Tiếp theo: {id}. {title}',
  'home.weakTasks': '🎯 Task cần ôn nhiều nhất', 'home.practiceNow': 'Luyện ngay', 'home.fullStats': 'Xem thống kê đầy đủ →',
  'home.byDomain': 'Tiến độ theo domain', 'home.howto': 'Cách dùng',
  'home.howto1': '📅 <b>Ôn hôm nay</b> trộn câu hỏi, từ vựng đề thi và thẻ dịch vụ theo <b>lặp lại ngắt quãng (SRS)</b>. Thẻ trả lời sai quay lại sau 10 phút. Thẻ đúng giãn dần thành 1, 4, 10... ngày. Thẻ đã học chỉ xuất hiện lại khi đến hạn; muốn luyện thêm ngoài lịch thì dùng <a href="#/review/free">Luyện tập tự do</a> (lịch riêng).',
  'home.howto2': '🟨 Từ <span class="kw" tabindex="0" data-k="most cost-effective">được tô màu</span> trong đề là từ khóa quan trọng. Rê chuột hoặc chạm vào để xem nghĩa tiếng Việt và gợi ý.',
  'home.howto3': '🌐 Vào <a href="#/settings">Cài đặt</a> để chọn ngôn ngữ (Tiếng Việt / English / 日本語). Ở bản English và 日本語, câu hỏi và đáp án luôn hiển thị bằng tiếng Anh như đề thật.',
  'home.howto4': 'Tiến độ chỉ lưu trên trình duyệt này. Dùng Cài đặt → Xuất dữ liệu để sao lưu.',

  // Khóa học
  'learn.continue': 'Học tiếp', 'learn.start': 'Bắt đầu học', 'learn.review': 'Xem lại',
  'learn.tabCourse': '📚 Khóa học', 'learn.tabSummary': '📋 Tóm tắt nhanh',
  'learn.noCourse': 'Chưa có bài học chi tiết. Xem <a href="#/learn/sum/1">Tóm tắt nhanh</a>.',
  'learn.modCount': '{done}/{total} bài', 'learn.examWeight': '{w}% đề thi', 'learn.mins': '{n} phút',
  'learn.labNote': 'Không bắt buộc cho kỳ thi, nhưng giúp nhớ lâu hơn. Luôn làm theo phần dọn dẹp ở cuối mỗi lab để tránh phát sinh chi phí.',
  'learn.practiceDomain': 'Luyện câu hỏi Domain {d}',
  'learn.progress': 'Tiến độ khóa học: {done}/{total} bài',
  'learn.continueLesson': 'Học tiếp: bài {id} →', 'learn.startLesson': 'Bắt đầu học: bài {id} →',
  'learn.allDone': '🎉 Đã học hết!',
  'learn.tip': 'Gợi ý: học theo thứ tự từ phần Nền tảng. Mỗi bài có phần luyện câu hỏi liên quan ở cuối. Bài học xong sẽ có dấu ✓.',
  'sum.note': 'Bảng tóm tắt để ôn lại sau khi đã học bài chi tiết.',
  'lesson.notFound': 'Không tìm thấy bài học. <a href="#/learn">Về danh sách</a>',
  'lesson.n': 'Bài {id}', 'lesson.readMins': '⏱ {n} phút đọc', 'lesson.nQuestions': '✍️ {n} câu luyện tập', 'lesson.done': '✓ Đã học',
  'lesson.goals': '🎯 Sau bài này bạn sẽ', 'lesson.summary': '📌 Tóm tắt bài', 'lesson.terms': '📖 Thuật ngữ trong bài',
  'lesson.unmark': '↩︎ Bỏ đánh dấu đã học', 'lesson.mark': '✓ Đánh dấu đã học',
  'lesson.quiz': '✍️ Luyện {n} câu của bài này', 'lesson.quizTitle': 'Luyện bài {id}',

  // Cột bảng
  'col.term': 'English', 'col.meaning': 'Tiếng Việt', 'col.hint': 'Gợi ý',
  'col.service': 'Dịch vụ', 'col.function': 'Chức năng', 'col.confuse': 'Hay nhầm với',

  // Ôn hôm nay
  'review.done': '🎉 Hôm nay đã ôn xong!', 'review.nextDue': 'Thẻ tiếp theo đến hạn: <b>{when}</b>',
  'review.more10': 'Học thêm 10 thẻ mới', 'review.freePractice': 'Luyện tập tự do',
  'review.remaining': 'Còn {n} thẻ chưa học.', 'review.extraTitle': 'Thẻ mới thêm',

  // Luyện tập
  'practice.all': 'Tất cả domain', 'practice.hard': 'Câu nâng cao', 'practice.multi': 'Câu chọn nhiều đáp án',
  'practice.weak': 'Câu hay sai', 'practice.read': 'Luyện đọc đề', 'practice.mixAll': 'Trộn tất cả',
  'practice.empty': 'Chưa có câu nào ở mục này. <a href="#/practice">Quay lại</a>',
  'practice.intro': 'Luyện câu hỏi theo domain. Chỉ hiện câu <b>mới</b> hoặc <b>đã đến hạn ôn</b>; kết quả được ghi vào lịch SRS (không tính vào số thẻ mới mỗi ngày). Số trên mỗi ô là <b>số câu luyện được ngay / tổng số câu</b>. Muốn luyện thêm ngoài lịch: <a href="#/review/free">Luyện tập tự do</a>.',
  'practice.domLine': '{total} câu · đúng {acc}', 'practice.nQuestions': '{n} câu',
  'practice.weakLine': '{n} câu (sai ở lần gần nhất, hoặc đúng dưới 2 trong 3 lần gần nhất; luyện theo lịch Luyện tập tự do)', 'practice.hardLine': '{n} câu gần độ khó đề thật',
  'practice.multiLine': '{n} câu (Choose TWO/THREE)',
  'practice.readLine': 'Tìm từ khóa quyết định trước khi xem đáp án · tối đa 15 câu dài ({n} câu)',
  'practice.byTask': 'Theo task statement',
  'practice.byTaskNote': 'Gộp kết quả luyện tập và thi thử; tỷ lệ đúng tính theo 3 lần trả lời gần nhất của mỗi câu, nên tiến bộ gần đây được phản ánh. Task có tỷ lệ đúng thấp nhất được xếp lên đầu. Bấm để luyện riêng task đó (số câu luyện được ngay / tổng).',

  // Luyện đọc đề
  'read.step1': '📖 Bước 1/2: đọc đề và chạm vào từ khóa quyết định',
  'read.hint': 'Gợi ý: tìm yêu cầu chính (MOST cost-effective, LEAST operational overhead…), ràng buộc (cannot be interrupted, without managing servers…) và đối tượng (data, users, servers…).',
  'read.reveal': 'Xem từ khóa gợi ý & các lựa chọn →',
  'read.goal': 'Mục tiêu khi thi: khoảng 80 giây mỗi câu (90 phút / 65 câu)',
  'read.time': '<b>⏱ {secs}s</b> để đọc đề.',
  'read.timeSlow': '<b>⏱ {secs}s</b> để đọc đề (hơi lâu, hãy luyện đọc lướt tìm từ khóa).',
  'read.yours': 'Từ bạn chọn: <i>{words}</i>', 'read.none': 'chưa chọn từ nào',
  'read.keywords': '🔑 Từ khóa gợi ý:',

  // Từ vựng
  'gloss.search': 'Tìm (Anh hoặc Việt)...', 'gloss.keywords': 'Từ khóa trong đề ({n})', 'gloss.services': 'Dịch vụ AWS ({n})',

  // Cài đặt
  'set.uiLang': '🌐 Ngôn ngữ giao diện · Language · 言語',
  'set.uiNote': 'Đổi ngôn ngữ sẽ tải lại trang. Tiến độ học được giữ nguyên và dùng chung cho mọi ngôn ngữ. Ở bản English và 日本語, câu hỏi và đáp án chỉ hiển thị bằng tiếng Anh (như đề thật); phần giải thích, bài học và giao diện dùng ngôn ngữ đã chọn.',
  'set.langMode': 'Chế độ ngôn ngữ', 'set.display': 'Hiển thị câu hỏi',
  'set.mode.bi': 'Song ngữ', 'set.mode.bi.d': 'Luôn hiện tiếng Anh và tiếng Việt (tuần 1–2)',
  'set.mode.en-first': 'Ưu tiên tiếng Anh', 'set.mode.en-first.d': 'Hiện tiếng Anh, bấm để xem bản dịch (tuần 3–4)',
  'set.mode.en-only': 'Chỉ tiếng Anh', 'set.mode.en-only.d': 'Như thi thật, chỉ xem bản dịch sau khi trả lời (tuần 5–6)',
  'set.kw': 'Tô màu từ khóa trong đề',
  'set.schedule': 'Lịch học', 'set.newPerDay': 'Số thẻ mới mỗi ngày:', 'set.examDate': 'Ngày thi:',
  'set.data': 'Dữ liệu',
  'set.dataNote': 'Tiến độ chỉ lưu trên trình duyệt này. Hãy xuất file để sao lưu hoặc chuyển sang máy khác.',
  'set.export': 'Xuất dữ liệu (.json)', 'set.import': 'Nhập dữ liệu', 'set.reset': 'Xóa toàn bộ tiến độ',
  'set.saved': 'Đã lưu.', 'set.npdKeep': 'Giữ nguyên {n} thẻ/ngày (ô trống không hợp lệ).',
  'set.imported': '✅ Đã nhập dữ liệu.', 'set.badFile': '❌ File không hợp lệ.',
  'set.resetConfirm': 'Xóa toàn bộ tiến độ học (thẻ SRS, lịch Luyện tập tự do, thống kê, bài đã học, lịch sử thi thử, bài thi dở)? Cài đặt được giữ lại. Không thể hoàn tác.',
  'set.resetDone': 'Đã xóa tiến độ.',

  // Thi thử
  'exam.verdict.ok': '✅ Đạt ngưỡng an toàn (≥ 80%)',
  'exam.verdict.warn': '⚠️ Sát ngưỡng: đề thật có thể khó hơn, cần ôn thêm',
  'exam.verdict.no': '❌ Chưa đạt: hãy ôn lại các domain yếu',
  'exam.notCounted': '(nhiều câu đã gặp)',
  'exam.intro': 'Đề gồm <b>{n} câu</b>, làm trong {mins}.', 'exam.mins': '{n} phút',
  'exam.shortNote': '(Đề thật có 65 câu trong 90 phút. Ngân hàng hiện có {n} câu nên thời gian được tính theo tỷ lệ.)',
  'exam.rule1': 'Giống thi thật: <b>chỉ tiếng Anh</b>, không tô màu từ khóa, không xem đáp án giữa chừng.',
  'exam.rule2': 'Đề ưu tiên lấy từ <b>kho đề riêng {pool} câu</b>. Các câu này <b>không xuất hiện</b> khi luyện tập hay ôn SRS, nên kết quả phản ánh năng lực thật chứ không phải trí nhớ. Bạn đã gặp {seen}/{pool} câu trong các lần thi trước.',
  'exam.freshLeft': 'Kho còn đủ câu chưa gặp cho <b>{n} đề hoàn toàn mới</b>.',
  'exam.noFresh': '<b>Đã hết đề hoàn toàn mới</b>: các đề tiếp theo sẽ lặp lại câu bạn đã gặp, điểm có thể cao hơn năng lực thật.',
  'exam.saveFresh': 'Mỗi đề làm xong sẽ “tiêu” các câu mới đó, nên hãy <b>để dành đề mới cho giai đoạn cuối</b> (1–2 tuần trước ngày thi) để đo mức sẵn sàng; giai đoạn đầu nên dùng Luyện tập và Ôn hôm nay.',
  'exam.rule4': 'Có thể <b>đánh dấu</b> câu để xem lại và chuyển qua lại giữa các câu. Hết giờ thì bài tự nộp. Nếu bạn rời đi (đóng tab, máy ngủ) và hết giờ khi chưa trả lời đủ một nửa số câu, bài bị hủy.',
  'exam.rule5': 'Kết quả tính bằng <b>% câu đúng</b>. Đề thật dùng thang điểm scaled (đậu 700/1000) và có thể khó hơn, nên hãy nhắm <b>≥ 80%</b>.',
  'exam.esl': 'Áp dụng chế độ <b>ESL +30 phút</b> (nếu bạn đăng ký hỗ trợ này khi đặt lịch thi)',
  'exam.start': 'Bắt đầu thi', 'exam.history': 'Lịch sử thi thử',
  'exam.colTime': 'Thời gian', 'exam.colPct': '% đúng', 'exam.colCorrect': 'Đúng', 'exam.colFresh': 'Câu mới gặp', 'exam.colUsed': 'Thời gian làm',
  'exam.freshNote': '“Câu mới gặp”: số câu bạn gặp lần đầu trong bài thi đó. Nếu thấp, điểm có thể cao hơn năng lực thật vì bạn đã nhớ đáp án.',
  'exam.none': 'Chưa có bài thi nào.',
  'exam.invalid': 'Bài thi đang làm dở không còn câu hỏi hợp lệ (ngân hàng câu hỏi đã được cập nhật), nên đã được hủy. <a href="#/exam">Bắt đầu bài thi mới</a>',
  'exam.qOf': 'Câu {i}/{n}', 'exam.flag': '🏳️ Đánh dấu', 'exam.unflag': '🚩 Bỏ đánh dấu',
  'exam.prev': '← Câu trước', 'exam.next': 'Câu sau →',
  'exam.keys': 'Phím: A–{last} chọn · ←/→ chuyển câu · M đánh dấu',
  'exam.navSummary': 'Bảng câu hỏi · Đã trả lời đủ {answered}/{n} · Đánh dấu {flags}',
  'exam.navPartial': ' · Chọn chưa đủ {n} (viền nét đứt)',
  'exam.submit': 'Nộp bài', 'exam.quit': 'Hủy bài thi',
  'exam.cUnanswered': 'Còn {n} câu chưa trả lời. ', 'exam.cPartial': 'Có {n} câu chọn nhiều đáp án nhưng chưa chọn đủ số lượng. ',
  'exam.cFlagged': 'Có {n} câu đang đánh dấu. ', 'exam.cSubmit': 'Nộp bài?',
  'exam.cQuit': 'Hủy bài thi này? Điểm sẽ không được lưu. Các câu bạn đã xem vẫn được tính cho mức sẵn sàng (câu chưa trả lời đủ tính là sai) và không còn là câu mới gặp.',
  'exam.notFound': 'Không tìm thấy bài thi. <a href="#/exam">Quay lại</a>',
  'exam.expired': 'Bài thi đang làm dở đã hết giờ khi bạn trả lời chưa được một nửa số câu, nên đã được hủy và không tính điểm. {n} câu bạn đã xem vẫn được tính cho mức sẵn sàng (câu chưa trả lời đủ tính là sai). <a href="#/exam">Bắt đầu bài thi mới</a>',
  'ready.yes': '🎯 Sẵn sàng đi thi', 'ready.title': '🎯 Mức sẵn sàng',
  'ready.age': 'Dữ liệu mới nhất: {date}.',
  'ready.domN': '{n} câu',
  'ready.needDomain': 'Domain {d} cần thêm khoảng {n} câu gặp lần đầu để ước tính đủ chắc chắn.',
  'ready.lowDomain': 'Có domain có cận dưới dưới {lo}%: hãy ôn domain đó rồi thi thử tiếp.',
  'ready.lowTotal': 'Cận dưới của ước tính còn dưới {lo}%: hãy ôn các task bên trên rồi thi thử tiếp.',
  'ready.needMore': 'Cần thêm khoảng {n} câu gặp lần đầu (làm thêm thi thử) để ước tính đủ chắc chắn.',
  'ready.risky': 'Task cần ôn:',
  'ready.basis': 'Khoảng tin cậy 80%, dựa trên {n} câu gặp lần đầu.',
  'ready.range': '{lo}–{hi}%',
  'ready.est': 'Ước tính {lo}–{hi}%',
  'ready.noData': 'Chưa có dữ liệu. Làm một bài thi thử để có ước tính đầu tiên.',
  'ready.yesNote': 'Ước tính của bạn đủ an toàn ở mọi domain. Hãy thử thêm Official Practice Question Set trên AWS Skill Builder trước khi đăng ký thi.',
  'ready.rule': 'Ước tính dùng kết quả <b>lần đầu</b> bạn gặp mỗi câu của kho đề riêng (kết quả gần đây được tính nặng hơn), theo tỷ trọng domain của đề thật. Sẵn sàng khi đủ dữ liệu (khoảng 80 câu gần đây, mỗi domain ít nhất 8 câu), cận dưới tổng ≥ 75% và cận dưới mỗi domain ≥ 65%.',

  // Kết quả thi thử
  'res.qN': 'Câu {i}', 'res.right': '✅ Đúng', 'res.wrong': '❌ Sai', 'res.blank': '⚪ Bỏ trống', 'res.none': 'Không có câu nào.',
  'res.auto': ' · tự nộp khi hết giờ', 'res.pctCorrect': '% đúng',
  'res.line': 'Đúng <b>{c}/{n}</b> câu · Thời gian làm {used}', 'res.fresh': ' · Câu mới gặp lần đầu: <b>{f}/{n}</b>',
  'res.scoreNote': 'Đề thật chấm theo thang điểm scaled 100–1000 (đậu 700), không quy đổi trực tiếp được từ % câu đúng. Hãy nhắm ≥ 80% để có khoảng an toàn.',
  'res.seenWarn': '⚠️ Đề này có nhiều câu bạn đã gặp, nên kết quả có thể cao hơn năng lực thật. Mức sẵn sàng chỉ dùng kết quả lần đầu bạn gặp mỗi câu.',
  'res.retake': 'Thi lại', 'res.drill': 'Luyện {n} câu thuộc {t} task có câu sai', 'res.drillTitle': 'Luyện theo câu sai trong thi thử',
  'res.byDomain': 'Kết quả theo domain', 'res.domainNote': 'Domain nào dưới 70% thì nên học lại bài học của domain đó.',
  'res.weakTasks': 'Task cần ôn thêm', 'res.taskLine': '{c}/{n} câu đúng ({p}%)', 'res.practiceTask': 'Luyện task này',
  'res.review': 'Xem lại bài làm',
  'res.fAll': 'Tất cả ({n})', 'res.fWrong': 'Sai / bỏ trống ({n})', 'res.fFlag': 'Đã đánh dấu ({n})',
  'res.showVi': 'Hiện tiếng Việt',

  // PWA
  'pwa.newContent': '🔄 Có nội dung mới', 'pwa.update': 'Cập nhật',
  'pwa.installed': '✅ Bạn đang dùng bản đã cài. Ứng dụng chạy được offline.',
  'pwa.installPrompt': 'Cài website thành ứng dụng trên máy để mở nhanh từ màn hình chính và dùng offline.',
  'pwa.installBtn': '📲 Cài ứng dụng',
  'pwa.ios': 'Trên iPhone/iPad: mở trang này bằng <b>Safari</b> → bấm nút <b>Chia sẻ</b> (ô vuông có mũi tên lên) → chọn <b>“Thêm vào MH chính”</b>.',
  'pwa.android': 'Trên Android: mở bằng <b>Chrome</b> → menu <b>⋮</b> → <b>“Cài đặt ứng dụng”</b> hoặc <b>“Thêm vào màn hình chính”</b>. Trên máy tính: bấm biểu tượng cài đặt ở thanh địa chỉ.',
  'pwa.title': '📱 Ứng dụng & offline',
  'pwa.cached': '✓ Đã lưu sẵn nội dung để dùng offline.',
  'pwa.httpsOnly': 'Chế độ offline chỉ hoạt động khi mở qua HTTPS (ví dụ GitHub Pages).',
  'pwa.autoUpdate': 'Nội dung mới sẽ tự tải về khi có mạng.',
  'pwa.refresh': '🔄 Tải lại nội dung mới nhất',
  'pwa.offline': 'Bạn đang offline. Hãy kết nối mạng rồi thử lại.',

  // Màn hình khôi phục
  'rec.title': '⚠️ Ứng dụng gặp lỗi khi hiển thị',
  'rec.p1': 'Có thể dữ liệu tiến độ trên trình duyệt này bị hỏng (ví dụ do nhập file không đúng định dạng).',
  'rec.detail': 'Chi tiết:', 'rec.retry': 'Thử lại trang chủ', 'rec.export': 'Tải bản sao dữ liệu hiện tại',
  'rec.reset': 'Xóa dữ liệu và bắt đầu lại', 'rec.confirm': 'Xóa toàn bộ dữ liệu tiến độ trên trình duyệt này?',

  // Dùng chung · Common · 共通
  'common.domain': 'Domain {d}',
  'common.task': 'Task {t}',
  'common.back': 'Quay lại',
  'task.colTask': 'Task',
  'session.freeNote': 'Phiên này dùng lịch riêng của Luyện tập tự do, không ảnh hưởng lịch Ôn hôm nay.',
  'session.freeMore': 'Luyện tập tự do tiếp',
  'home.howtoMode': '🔤 Vào <a href="#/settings">Cài đặt</a> để chuyển chế độ ngôn ngữ: <i>Song ngữ</i> → <i>Ưu tiên tiếng Anh</i> → <i>Chỉ tiếng Anh</i>.',
  'review.title': 'Ôn hôm nay',
  'review.freeNote': 'Luyện tập tự do dùng lịch riêng, không ảnh hưởng lịch ôn này.',

  // Không có gì để luyện · Nothing to practice · 演習なし
  'empty.title': '✅ Chưa có câu nào cần luyện lúc này',
  'empty.body': '<b>{title}</b>: không còn câu mới, và các câu đã học đều chưa đến hạn ôn.',
  'empty.bodyFree': '<b>{title}</b>: không còn câu mới, và các câu đã học đều chưa đến hạn ôn theo lịch riêng của Luyện tập tự do.',
  'empty.nextDue': 'Câu tiếp theo trong mục này đến hạn: <b>{when}</b>',
  'empty.freeNote': 'Luyện tập tự do có lịch riêng nên luyện thêm ở đó không làm lệch lịch Ôn hôm nay.',

  // Luyện tập tự do · Free practice · 自由演習
  'free.title': 'Luyện tập tự do · {scope}',
  'free.otherScope': 'Chọn phạm vi khác',
  'free.avail': '<b>{av}/{total}</b> thẻ luyện được ngay',
  'free.kindQ': '{n} câu hỏi',
  'free.kindS': '{n} dịch vụ',
  'free.kindV': '{n} từ vựng',
  'free.nextDue': '⏳ Thẻ tiếp theo đến hạn: {when}',
  'free.intro': 'Luyện thêm bao nhiêu tùy thích theo <b>lịch riêng</b>: không làm thay đổi lịch Ôn hôm nay, không tính vào số thẻ mới mỗi ngày. Thẻ đã luyện ở đây cũng giãn dần theo SRS và chỉ quay lại khi đến hạn của lịch riêng này.',
  'free.allSub': 'Cả 4 domain + từ vựng đề thi',
  'free.nextDueAll': 'Thẻ tự do tiếp theo đến hạn: <b>{when}</b>.',
  'free.scopeNote': 'Domain gồm câu hỏi và thẻ dịch vụ của domain đó; từ vựng đề thi chỉ có trong “Trộn tất cả”.',

  // Quiz bài học · Lesson quiz · レッスンの演習
  'lesson.quizLeft': '{n} câu còn lại đã học và chưa đến hạn ôn.',
  'lesson.quizNone': 'Cả {n} câu của bài này đã học và chưa đến hạn ôn.',
  'lesson.quizNext': 'Câu tiếp theo đến hạn: <b>{when}</b>.',
  'lesson.quizFree': 'Muốn luyện thêm: <a href="#/review/free">Luyện tập tự do</a>.'
});})();
