/* * COMPONENTS.JS
 * Chứa toàn bộ các bộ điều khiển logic cho WebAR
 */

// --- HÀM TIỆN ÍCH DÙNG CHUNG ---
// Giúp phát âm thanh an toàn, tránh lỗi trình duyệt chặn
function playSound(audioEl) {
  if (!audioEl) return;
  try {
    audioEl.currentTime = 0;
    audioEl.play().catch((e) => {
      console.warn("Trình duyệt chặn phát tiếng tự động:", e);
    });
  } catch (e) {
    console.warn("Lỗi Audio:", e);
  }
}

/* =========================================================
   1. HTML OVERLAY CONTROLLER
   - Hiển thị bảng thông tin (Tiêu đề + Mô tả)
   - Hiệu ứng gõ chữ
   - Phát âm thanh "text_ra.mp3" khi bảng hiện
   ========================================================= */
AFRAME.registerComponent("html-overlay-controller", {
  schema: {
    delay: { type: "number", default: 1000 },
    soundText: { type: "selector" } // File âm thanh khi chữ hiện
  },
  init() {
    // Lấy tham chiếu đến các phần tử UI trong index.html
    this.uiPanel = document.getElementById("info-panel");
    this.uiTitle = document.getElementById("ui-title");
    this.uiDesc = document.getElementById("ui-desc");

    // Lấy dữ liệu từ attribute data- (được tạo bởi main.js)
    this.fullTitle = this.el.getAttribute("data-title") || "";
    this.fullDesc = this.el.getAttribute("data-desc") || "";
    this.color = this.el.getAttribute("data-color") || "#FFD700";

    this.target = this.el.closest("[mindar-image-target]");
    this.startTimer = null;
    this.typingTimer = null;

    // Sự kiện khi tìm thấy ảnh
    this.target.addEventListener("targetFound", () => this.onFound());
    // Sự kiện khi mất ảnh
    this.target.addEventListener("targetLost", () => this.onLost());
  },

  onFound() {
    // Xóa nội dung cũ, set màu sắc
    this.uiTitle.textContent = "";
    this.uiDesc.textContent = "";
    this.uiPanel.style.borderLeftColor = this.color;
    this.uiTitle.style.color = this.color;

    // Chờ delay rồi mới hiện
    this.startTimer = setTimeout(() => {
      this.showPanel();
    }, this.data.delay);
  },

  onLost() {
    if (this.startTimer) clearTimeout(this.startTimer);
    if (this.typingTimer) clearTimeout(this.typingTimer);
    this.uiPanel.classList.remove("visible");
  },

  showPanel() {
    // 1. Phát tiếng "text_ra"
    playSound(this.data.soundText);

    // 2. Hiện bảng
    this.uiPanel.classList.add("visible");

    // 3. Hiệu ứng gõ chữ (Typing effect)
    let i = 0;
    const typeLoop = () => {
      // Gõ tiêu đề trước
      if (i < this.fullTitle.length) {
        this.uiTitle.textContent += this.fullTitle.charAt(i);
        i++;
        this.typingTimer = setTimeout(typeLoop, 30); // Tốc độ gõ tiêu đề
      } 
      // Gõ mô tả sau
      else {
        const descIndex = i - this.fullTitle.length;
        if (descIndex < this.fullDesc.length) {
          this.uiDesc.textContent += this.fullDesc.charAt(descIndex);
          i++;
          this.typingTimer = setTimeout(typeLoop, 20); // Tốc độ gõ mô tả
        }
      }
    };
    typeLoop();
  }
});

/* =========================================================
   2. DELAYED AUDIO
   - Dùng cho Thuyết minh ảnh (Target 0)
   - Đợi một khoảng thời gian rồi mới phát tiếng
   ========================================================= */
AFRAME.registerComponent('delayed-audio', {
  schema: {
    sound: { type: 'selector' },
    delay: { type: 'number', default: 2000 }
  },
  init: function() {
    this.target = this.el.closest("[mindar-image-target]");
    this.timer = null;

    this.target.addEventListener("targetFound", () => {
      this.timer = setTimeout(() => {
        playSound(this.data.sound);
      }, this.data.delay);
    });

    this.target.addEventListener("targetLost", () => {
      if (this.timer) clearTimeout(this.timer);
      // Dừng âm thanh ngay lập tức nếu mất hình
      if (this.data.sound) {
        this.data.sound.pause();
        this.data.sound.currentTime = 0;
      }
    });
  }
});

/* =========================================================
   3. REVEAL MODEL (Cho 3D)
   - Hiệu ứng model xuất hiện (Scale từ 0 lên to)
   - Phát âm thanh "3d_ra.mp3" ngay lập tức
   ========================================================= */
AFRAME.registerComponent("reveal-model", {
  schema: {
    duration: { type: "number", default: 3000 },
    sound3D: { type: "selector" }, // File âm thanh 3D ra
    startScale: { type: "vec3" },
    finalScale: { type: "vec3" },
    startPos: { type: "vec3" },
    finalPos: { type: "vec3" }
  },
  init() {
    this.target = this.el.closest("[mindar-image-target]");
    this.running = false;
    this._hardReset();
    
    this.target.addEventListener("targetLost", () => this._hardReset());
    this.target.addEventListener("targetFound", () => this.start());
  },
  _hardReset() {
    this.running = false;
    // Xóa animation cũ để tránh xung đột
    this.el.removeAttribute("animation__scale");
    this.el.removeAttribute("animation__pos");
    
    // Reset về vị trí ban đầu
    const ss = this.data.startScale, sp = this.data.startPos;
    this.el.setAttribute("scale", `${ss.x} ${ss.y} ${ss.z}`);
    this.el.setAttribute("position", `${sp.x} ${sp.y} ${sp.z}`);
    
    // Reset object3D của ThreeJS để chắc chắn
    if (this.el.object3D) {
      this.el.object3D.scale.set(ss.x, ss.y, ss.z);
      this.el.object3D.position.set(sp.x, sp.y, sp.z);
    }
  },
  start() {
    if (this.running) return;
    this.running = true;
    this._hardReset();

    // 1. Phát âm thanh 3D ngay lập tức
    playSound(this.data.sound3D);

    // 2. Chạy Animation
    const fs = this.data.finalScale, fp = this.data.finalPos;
    // Dùng requestAnimationFrame để đảm bảo animation mượt
    requestAnimationFrame(() => requestAnimationFrame(() => {
      this.el.setAttribute("animation__scale", {
        property: "scale",
        to: `${fs.x} ${fs.y} ${fs.z}`,
        dur: this.data.duration,
        easing: "easeOutCubic"
      });
      this.el.setAttribute("animation__pos", {
        property: "position",
        to: `${fp.x} ${fp.y} ${fp.z}`,
        dur: this.data.duration,
        easing: "easeOutCubic"
      });
    }));
  }
});

/* =========================================================
   4. VIDEO CONTROL
   - Logic chờ (delay) rồi mới Play video
   - Kích hoạt sự kiện 'fade-in' để video hiện dần lên
   ========================================================= */
AFRAME.registerComponent('video-control', {
  schema: {
    video: { type: 'selector' },
    delay: { type: 'number', default: 1500 }
  },
  init: function() {
    this.target = this.el.closest("[mindar-image-target]");
    this.videoEl = this.data.video;
    this.videoPlane = this.target.querySelector('a-video');
    this.timer = null;

    this._reset();

    this.target.addEventListener("targetFound", () => {
      // Đợi delay xong thì Play
      this.timer = setTimeout(() => {
        this._playAndFade();
      }, this.data.delay);
    });

    this.target.addEventListener("targetLost", () => {
      this._reset();
    });
  },
  _reset: function() {
    if (this.timer) clearTimeout(this.timer);
    
    // Dừng video
    if (this.videoEl) {
      try {
        this.videoEl.pause();
        this.videoEl.currentTime = 0;
      } catch (e) {}
    }
    
    // Ẩn màn hình video đi (Opacity = 0)
    if (this.videoPlane) {
      const mesh = this.videoPlane.getObject3D('mesh');
      if (mesh && mesh.material) {
        mesh.material.opacity = 0;
      }
      this.videoPlane.setAttribute('opacity', '0');
      // Dừng animation fade cũ nếu đang chạy
      try { this.videoPlane.removeAttribute('animation__fade'); } catch (e) {}
    }
  },
  _playAndFade: function() {
    // Play Video
    if (this.videoEl) {
      this.videoEl.muted = true; // Bắt buộc mute để autoplay trên mobile
      this.videoEl.setAttribute("playsinline", "");
      try { this.videoEl.play(); } catch (e) {}
    }
    // Bắn sự kiện để CSS Animation bắt đầu Fade In
    if (this.videoPlane) {
      this.videoPlane.emit('fade-in');
    }
  }
});

/* =========================================================
   5. VIDEO FX
   - Tạo hiệu ứng mờ viền (Vignette) cho video
   - Khởi tạo opacity = 0 để phục vụ hiệu ứng Fade-in
   ========================================================= */
AFRAME.registerComponent('video-fx', {
  schema: {
    opacity: { type: 'number', default: 0.9 },
    softness: { type: 'number', default: 0.2 }
  },
  init: function() {
    // 1. Tạo Canvas Gradient làm mặt nạ alpha
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, canvas.width / 2
    );
    const start = Math.max(0, 1.0 - this.data.softness * 2);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(start, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const maskTexture = new THREE.CanvasTexture(canvas);

    // 2. Gán vào Material khi load xong
    this.el.addEventListener('materialtextureloaded', () => {
      const mesh = this.el.getObject3D('mesh');
      if (mesh && mesh.material) {
        mesh.material.alphaMap = maskTexture;
        mesh.material.transparent = true;
        // QUAN TRỌNG: Mặc định là 0 để chờ fade-in
        mesh.material.opacity = 0; 
        mesh.material.blending = THREE.AdditiveBlending;
        mesh.material.needsUpdate = true;
      }
    });
  }
});

/* =========================================================
   6. CÁC COMPONENT PHỤ TRỢ KHÁC
   ========================================================= */

// Xoay chậm (Dùng cho Model)
AFRAME.registerComponent("slow-spin", {
  init() {
    this.el.setAttribute("animation__spin", {
      property: "rotation",
      to: "0 0 360",
      loop: true,
      dur: 14000,
      easing: "linear"
    });
  }
});

// Fix lỗi hiển thị trong suốt cho Model 3D
AFRAME.registerComponent("transparent-model", {
  schema: { opacity: { type: "number", default: 0.6 } },
  init() {
    this.el.addEventListener("model-loaded", () => {
      const op = this.data.opacity;
      this.el.object3D.traverse((n) => {
        if (n.material) {
          const mats = Array.isArray(n.material) ? n.material : [n.material];
          mats.forEach((m) => {
            m.transparent = true;
            m.opacity = op;
            m.depthWrite = true;
            m.side = THREE.FrontSide;
            m.needsUpdate = true;
          });
        }
      });
    });
  }
});