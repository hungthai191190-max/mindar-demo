/* js/main.js - ĐÃ FIX */

document.addEventListener("DOMContentLoaded", () => {
  const scene = document.querySelector('a-scene');
  const assetsContainer = document.querySelector('a-assets');

  // Hàm tạo Overlay Text (Fix: Truyền string trực tiếp, không dùng url())
  function createOverlay(item, delay) {
    const el = document.createElement('a-entity');
    // CHÚ Ý: Đã bỏ chữ 'url(...)' đi
    el.setAttribute('html-overlay-controller', `delay: ${delay}; soundText: ${item.audio_text}`);
    el.setAttribute('data-title', item.title);
    el.setAttribute('data-desc', item.desc);
    el.setAttribute('data-color', item.color);
    return el;
  }

  AR_DATABASE.forEach(item => {
    const targetEl = document.createElement('a-entity');
    targetEl.setAttribute('mindar-image-target', `targetIndex: ${item.targetIndex}`);
    
    // Gắn hiệu ứng ánh sáng cho TẤT CẢ các target (hoặc chỉ model nếu muốn)
    targetEl.setAttribute('rotating-light', '');

    // === LOẠI 1: ẢNH ===
    if (item.type === 'image') {
      targetEl.appendChild(createOverlay(item, 500));
      if (item.audio_desc) {
        const audioEntity = document.createElement('a-entity');
        // CHÚ Ý: Đã bỏ chữ 'url(...)' đi
        audioEntity.setAttribute('delayed-audio', `sound: ${item.audio_desc}; delay: 2000`);
        targetEl.appendChild(audioEntity);
      }
    }

    // === LOẠI 2: MÔ HÌNH ===
    else if (item.type === 'model') {
      const modelContainer = document.createElement('a-entity');
      // CHÚ Ý: Đã bỏ chữ 'url(...)' ở sound3D
      modelContainer.setAttribute('reveal-model', `duration: 3000; sound3D: ${item.audio_3d}; startScale: 0.001 0.001 0.001; finalScale: 0.6 0.6 0.6; startPos: 0 0.08 0; finalPos: 0 0.32 0`);
      modelContainer.setAttribute('slow-spin', '');

      const model = document.createElement('a-entity');
      model.setAttribute('gltf-model', `url(${item.modelSrc})`); // GLTF model thì BẮT BUỘC giữ url()
      model.setAttribute('rotation', '90 0 0');
      model.setAttribute('transparent-model', 'opacity: 0.8');
      
      modelContainer.appendChild(model);
      targetEl.appendChild(modelContainer);
      targetEl.appendChild(createOverlay(item, 3000));
    }

    // === LOẠI 3: VIDEO ===
    else if (item.type === 'video') {
      const vidAsset = document.createElement('video');
      vidAsset.setAttribute('id', item.videoId);
      vidAsset.setAttribute('src', item.videoSrc);
      vidAsset.setAttribute('preload', 'auto');
      vidAsset.setAttribute('loop', 'true');
      vidAsset.setAttribute('muted', 'true');
      vidAsset.setAttribute('playsinline', '');
      vidAsset.setAttribute('webkit-playsinline', '');
      vidAsset.setAttribute('crossorigin', 'anonymous');
      assetsContainer.appendChild(vidAsset);

      targetEl.appendChild(createOverlay(item, 500));

      const vidControl = document.createElement('a-entity');
      vidControl.setAttribute('video-control', `video: #${item.videoId}; delay: 1500`);
      targetEl.appendChild(vidControl);

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
    scene.appendChild(targetEl);
  });
});
