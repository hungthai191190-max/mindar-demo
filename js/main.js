// js/main.js

document.addEventListener("DOMContentLoaded", () => {
  const scene = document.querySelector('a-scene');
  const assetsContainer = document.querySelector('a-assets');

  AR_DATABASE.forEach(item => {
    // 1. Tạo thẻ bao ngoài (Entity Target)
    const targetEl = document.createElement('a-entity');
    targetEl.setAttribute('mindar-image-target', `targetIndex: ${item.targetIndex}`);

    // --- XỬ LÝ THEO TỪNG LOẠI (TYPE) ---
    
    // === LOẠI 1: ẢNH (IMAGE) ===
    if (item.type === 'image') {
      // Overlay Controller
      const overlay = createOverlay(item, 500);
      targetEl.appendChild(overlay);

      // Delayed Audio (Thuyết minh)
      if (item.audio_desc) {
        const audioEntity = document.createElement('a-entity');
        audioEntity.setAttribute('delayed-audio', `sound: url(${item.audio_desc}); delay: 2000`);
        targetEl.appendChild(audioEntity);
      }
    }

    // === LOẠI 2: MÔ HÌNH (MODEL) ===
    else if (item.type === 'model') {
      // Model Entity
      const modelContainer = document.createElement('a-entity');
      modelContainer.setAttribute('reveal-model', `duration: 3000; sound3D: url(${item.audio_3d}); startScale: 0.001 0.001 0.001; finalScale: 0.6 0.6 0.6; startPos: 0 0.08 0; finalPos: 0 0.32 0`);
      modelContainer.setAttribute('slow-spin', '');

      const model = document.createElement('a-entity');
      model.setAttribute('gltf-model', `url(${item.modelSrc})`);
      model.setAttribute('rotation', '90 0 0');
      model.setAttribute('transparent-model', 'opacity: 0.6');
      
      modelContainer.appendChild(model);
      targetEl.appendChild(modelContainer);

      // Overlay (Delay 3000ms)
      const overlay = createOverlay(item, 3000);
      targetEl.appendChild(overlay);
    }

    // === LOẠI 3: VIDEO ===
    else if (item.type === 'video') {
      // Tạo thẻ <video> trong a-assets (quan trọng)
      const vidAsset = document.createElement('video');
      vidAsset.setAttribute('id', item.videoId);
      vidAsset.setAttribute('src', item.videoSrc);
      vidAsset.setAttribute('preload', 'auto');
      vidAsset.setAttribute('loop', 'true');
      vidAsset.setAttribute('muted', 'true'); // Mute để autoplay
      vidAsset.setAttribute('playsinline', '');
      vidAsset.setAttribute('webkit-playsinline', '');
      vidAsset.setAttribute('crossorigin', 'anonymous');
      assetsContainer.appendChild(vidAsset);

      // Overlay (Delay 500ms)
      const overlay = createOverlay(item, 500);
      targetEl.appendChild(overlay);

      // Video Controller
      const vidControl = document.createElement('a-entity');
      vidControl.setAttribute('video-control', `video: #${item.videoId}; delay: 1500`);
      targetEl.appendChild(vidControl);

      // Video Plane
      const vidPlane = document.createElement('a-video');
      vidPlane.setAttribute('src', `#${item.videoId}`);
      vidPlane.setAttribute('width', '1');
      vidPlane.setAttribute('height', '0.5625');
      vidPlane.setAttribute('position', '0 0 0.001');
      vidPlane.setAttribute('opacity', '0');
      vidPlane.setAttribute('video-fx', 'opacity: 0.9; softness: 0.3');
      vidPlane.setAttribute('animation', 'property: material.opacity; from: 0; to: 0.9; dur: 2000; easing: linear; startEvents: fade-in');
      
      targetEl.appendChild(vidPlane);
    }

    // Gắn Target vào Scene
    scene.appendChild(targetEl);
  });
});

// Hàm tạo Overlay Text (Dùng chung)
function createOverlay(item, delay) {
  const el = document.createElement('a-entity');
  // Lưu ý: url() cho soundText cần xử lý string
  el.setAttribute('html-overlay-controller', `delay: ${delay}; soundText: url(${item.audio_text})`);
  el.setAttribute('data-title', item.title);
  el.setAttribute('data-desc', item.desc);
  el.setAttribute('data-color', item.color);
  return el;
}