// js/database.js
const AR_DATABASE = [
  // --- TARGET 0: ẢNH (Phòng truyền thống) ---
  {
    type: 'image',          // Loại hiển thị
    targetIndex: 0,         // Thứ tự trong file targets.mind
    title: "PHÒNG TRUYỀN THỐNG",
    desc: "NĂM 1990",
    color: "#00E5FF",
    audio_desc: "./assets/audio/thuyetminh1.mp3", // Thuyết minh sau 2s
    // Các file chung
    audio_text: "./assets/audio/text_ra.mp3"
  },

  // --- TARGET 1: MÔ HÌNH 3D (Tên lửa) ---
  {
    type: 'model',
    targetIndex: 1,
    title: "TÊN LỬA P-15 U",
    desc: "Được sử dụng trong kháng chiến chống Mỹ...",
    color: "#FFD700",
    modelSrc: "./assets/models/model.glb",
    audio_3d: "./assets/audio/3d_ra.mp3",
    audio_text: "./assets/audio/text_ra.mp3"
  },

  // --- TARGET 2: VIDEO (Tư liệu) ---
  {
    type: 'video',
    targetIndex: 2,
    title: "VIDEO TƯ LIỆU",
    desc: "Quay năm 2025",
    color: "#FFAB00",
    videoSrc: "./assets/videos/video1.mp4",
    videoId: "vid_2", // ID duy nhất cho mỗi video (để không bị trùng)
    audio_text: "./assets/audio/text_ra.mp3"
  },
  
  // Sau này có thêm Target 3, 4, 5 thì cứ copy block trên dán xuống dưới
];