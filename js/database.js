// js/database.js
const AR_DATABASE = [
  // --- TARGET 0: ẢNH (Phòng truyền thống) ---
  {
    type: 'image',          // Loại hiển thị
    targetIndex: 0,         // Thứ tự trong file targets.mind
    title: "Đ/C NGUYỄN PHAN VINH",
    desc: "Sinh năm: 1933; Mất năm: 1968, Anh hùng Lực lượng vũ trang nhân dân; sĩ quan Hải quân Nhân dân Việt Nam; thuyền trưởng tàu không số 235, Đoàn 125 Hải quân; tham gia vận chuyển vũ khí trên tuyến Đường Hồ Chí Minh trên biển; hy sinh năm 1968 trong khi làm nhiệm vụ; tên ông được đặt cho đảo Phan Vinh (quần đảo Trường Sa) và nhiều công trình, đơn vị của Hải quân Nhân dân Việt Nam.",
    color: "#00E5FF",
    audio_desc: "./assets/audio/thuyetminh1.mp3", // Thuyết minh sau 2s
    // Các file chung
    audio_text: "./assets/audio/text_ra.mp3"
  },


  // --- TARGET 1: VIDEO (Tư liệu) ---
  {
    type: 'video',
    targetIndex: 1,
    title: "CHIẾN DỊCH QUANG TRUNG - THẦN TỐC",
    desc: "CB, CS Trung tâm BĐKT Vùng 3 giúp đỡ nhân dân trên địa bàn tỉnh Gia Lai xây dựng nhà ở bị thiệt hại sau lũ năm 2025",
    color: "#FFAB00",
    videoSrc: "./assets/videos/video1.mp4",
    videoId: "vid_2", // ID duy nhất cho mỗi video (để không bị trùng)
    audio_text: "./assets/audio/text_ra.mp3"
  },
    // --- TARGET 2: MÔ HÌNH 3D (Tên lửa) ---
    {
    type: 'model',
    targetIndex: 2,
    title: "TÊN LỬA P-15 U",
    desc: "Tên lửa P-15U là tên lửa chống hạm do Liên Xô sản xuất, được Hải quân Nhân dân Việt Nam trang bị và sử dụng trong giai đoạn bảo vệ chủ quyền biển, đảo. Tên lửa sử dụng đầu tự dẫn radar chủ động, tầm bắn trung bình, mang đầu đạn nổ mạnh, có khả năng tiêu diệt các mục tiêu tàu mặt nước cỡ vừa và lớn. P-15U được triển khai trên tàu tên lửa, góp phần nâng cao khả năng tác chiến trên biển, thể hiện bước phát triển quan trọng của lực lượng tàu tên lửa Hải quân Việt Nam trong thời kỳ hiện đại hóa ban đầu.",
    color: "#FFD700",
    modelSrc: "./assets/models/tenlua.glb",
    audio_3d: "./assets/audio/3d_ra.mp3",
    audio_text: "./assets/audio/text_ra.mp3"
  },
  {
    type: 'model',
    targetIndex: 3,
    title: "NGƯ LÔI ...",
    desc: "Ngư lôi 53VA là ngư lôi chống hạm cỡ 533 mm do Liên Xô sản xuất, được Hải quân Nhân dân Việt Nam trang bị và sử dụng trong huấn luyện, sẵn sàng chiến đấu bảo vệ chủ quyền biển, đảo. Ngư lôi được phóng từ tàu mặt nước và tàu ngầm, sử dụng động cơ đẩy dưới nước, mang đầu đạn nổ mạnh, có khả năng tấn công hiệu quả các mục tiêu tàu chiến của đối phương. Việc trang bị ngư lôi 53VA góp phần nâng cao năng lực tác chiến chống hạm và khả năng răn đe của Hải quân Nhân dân Việt Nam trong giai đoạn xây dựng và phát triển lực lượng. ",
    color: "#FFD700",
    modelSrc: "./assets/models/nguloi.glb",
    audio_3d: "./assets/audio/3d_ra.mp3",
    audio_text: "./assets/audio/text_ra.mp3"
  },
{
    type: 'model',
    targetIndex: 4,
    title: "THỦY LÔI ĐM-1",
    desc: "Thủy lôi ĐM-1 là thủy lôi phòng thủ ven biển do Liên Xô sản xuất, được Hải quân Nhân dân Việt Nam trang bị trong nhiệm vụ bảo vệ vùng biển, cửa sông và khu vực trọng yếu. Thủy lôi được thả cố định dưới nước, kích nổ khi mục tiêu tàu mặt nước xâm nhập vào khu vực tác chiến. Việc sử dụng thủy lôi ĐM-1 góp phần hình thành thế trận phòng thủ biển nhiều lớp, nâng cao khả năng ngăn chặn, răn đe và bảo vệ chủ quyền biển, đảo của Hải quân Nhân dân Việt Nam trong các giai đoạn lịch sử.",
    color: "#FFD700",
    modelSrc: "./assets/models/dm1.glb",
    audio_3d: "./assets/audio/3d_ra.mp3",
    audio_text: "./assets/audio/text_ra.mp3"
  },
{
    type: 'model',
    targetIndex: 5,
    title: "THỦY LÔI KPM",
    desc: "Thủy lôi KPM là thủy lôi tiếp xúc do Liên Xô sản xuất, được Hải quân Nhân dân Việt Nam trang bị và sử dụng trong nhiệm vụ phòng thủ biển, cửa sông và luồng lạch quan trọng. Thủy lôi được neo cố định dưới nước, phát nổ khi mục tiêu tàu mặt nước va chạm trực tiếp. Việc sử dụng thủy lôi KPM góp phần tăng cường khả năng phong tỏa, ngăn chặn và bảo vệ các khu vực trọng yếu, hình thành thế trận phòng thủ ven biển hiệu quả của Hải quân Nhân dân Việt Nam.",
    color: "#FFD700",
    modelSrc: "./assets/models/kpm.glb",
    audio_3d: "./assets/audio/3d_ra.mp3",
    audio_text: "./assets/audio/text_ra.mp3"
  },
  {
    type: 'model',
    targetIndex: 6,
    title: "XE TẢI ZIL-131",
    desc: "Xe ZIL-131 là xe tải quân sự 3 cầu chủ động (6×6) do Liên Xô sản xuất, được Hải quân Nhân dân Việt Nam sử dụng để vận chuyển, bảo đảm kỹ thuật và triển khai tên lửa chống hạm P-15U trong các đơn vị tên lửa bờ. Xe có khả năng cơ động tốt trên nhiều loại địa hình, tải trọng phù hợp để chở tên lửa và trang bị kèm theo, góp phần bảo đảm tính linh hoạt, bí mật và sẵn sàng chiến đấu của lực lượng tên lửa Hải quân trong giai đoạn lịch sử.",
    color: "#FFD700",
    modelSrc: "./assets/models/zil131.glb",
    audio_3d: "./assets/audio/3d_ra.mp3",
    audio_text: "./assets/audio/text_ra.mp3"
  },
  {
    type: 'model',
    targetIndex: 7,
    title: "XE CẦN CẨU K-162",
    desc: "Xe cần cẩu K-162 (khung gầm ZIL-131) là phương tiện bảo đảm kỹ thuật chuyên dụng do Liên Xô sản xuất, được Hải quân Nhân dân Việt Nam sử dụng để nâng, hạ, lắp đặt và bảo quản tên lửa chống hạm P-15U cùng các khí tài nặng khác. Xe được trang bị cần cẩu thủy lực, lắp trên xe tải quân sự 3 cầu chủ động ZIL-131, có khả năng cơ động tốt trên nhiều loại địa hình, đáp ứng yêu cầu triển khai nhanh, an toàn và chính xác trong công tác bảo đảm kỹ thuật tên lửa của Hải quân.",
    color: "#FFD700",
    modelSrc: "./assets/models/k162.glb",
    audio_3d: "./assets/audio/3d_ra.mp3",
    audio_text: "./assets/audio/text_ra.mp3"
  },
  
];
