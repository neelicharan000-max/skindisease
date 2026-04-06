// SkinAI Grad-CAM Visualization Engine (Canvas-based simulation)

/**
 * Generates a realistic Grad-CAM heatmap overlay on a canvas.
 * Uses multi-gaussian attention maps to simulate CNN feature activation.
 */
function generateGradCAM(sourceImage, canvasOriginal, canvasHeatmap, canvasOverlay) {
    const W = 256, H = 256;

    [canvasOriginal, canvasHeatmap, canvasOverlay].forEach(c => {
        c.width = W; c.height = H;
    });

    const ctxOrig = canvasOriginal.getContext('2d');
    const ctxHeat = canvasHeatmap.getContext('2d');
    const ctxOver = canvasOverlay.getContext('2d');

    // Draw original
    ctxOrig.drawImage(sourceImage, 0, 0, W, H);

    // Generate activation map (simulated Grad-CAM gaussian blobs)
    const heatData = generateActivationMap(W, H);

    // Draw heatmap using jet colormap
    const heatImgData = ctxHeat.createImageData(W, H);
    for (let i = 0; i < W * H; i++) {
        const val = heatData[i]; // 0..1
        const [r, g, b] = jetColormap(val);
        heatImgData.data[i * 4 + 0] = r;
        heatImgData.data[i * 4 + 1] = g;
        heatImgData.data[i * 4 + 2] = b;
        heatImgData.data[i * 4 + 3] = 255;
    }
    ctxHeat.putImageData(heatImgData, 0, 0);

    // Draw overlay: blend original + heatmap
    ctxOver.drawImage(sourceImage, 0, 0, W, H);
    const origData = ctxOver.getImageData(0, 0, W, H);

    const overlayImgData = ctxOver.createImageData(W, H);
    for (let i = 0; i < W * H; i++) {
        const val = heatData[i];
        const [hr, hg, hb] = jetColormap(val);
        const alpha = 0.55; // heatmap transparency
        overlayImgData.data[i * 4 + 0] = Math.min(255, origData.data[i * 4 + 0] * (1 - alpha) + hr * alpha);
        overlayImgData.data[i * 4 + 1] = Math.min(255, origData.data[i * 4 + 1] * (1 - alpha) + hg * alpha);
        overlayImgData.data[i * 4 + 2] = Math.min(255, origData.data[i * 4 + 2] * (1 - alpha) + hb * alpha);
        overlayImgData.data[i * 4 + 3] = 255;
    }
    ctxOver.putImageData(overlayImgData, 0, 0);
}

/**
 * Generates a realistic activation map using multiple gaussian blobs.
 * Simulates the CNN focusing on lesion areas.
 */
function generateActivationMap(W, H) {
    const data = new Float32Array(W * H);

    // Random number of attention blobs (2-5, simulating feature activations)
    const numBlobs = 2 + Math.floor(Math.random() * 4);
    const blobs = [];

    for (let b = 0; b < numBlobs; b++) {
        // Focus blobs more toward center (lesion area)
        const cx = 0.25 + Math.random() * 0.5;
        const cy = 0.25 + Math.random() * 0.5;
        const sigma = 0.08 + Math.random() * 0.15;
        const intensity = 0.5 + Math.random() * 0.5;
        blobs.push({ cx: cx * W, cy: cy * H, sigma: sigma * W, intensity });
    }

    // Compute gaussian activation for each pixel
    for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
            let val = 0;
            for (const blob of blobs) {
                const dx = x - blob.cx;
                const dy = y - blob.cy;
                const d2 = dx * dx + dy * dy;
                const sigma2 = blob.sigma * blob.sigma;
                val += blob.intensity * Math.exp(-d2 / (2 * sigma2));
            }
            data[y * W + x] = val;
        }
    }

    // Add subtle noise for realism
    for (let i = 0; i < data.length; i++) {
        data[i] += (Math.random() - 0.5) * 0.05;
    }

    // Normalize 0..1
    let mn = Infinity, mx = -Infinity;
    for (let i = 0; i < data.length; i++) {
        if (data[i] < mn) mn = data[i];
        if (data[i] > mx) mx = data[i];
    }
    const range = mx - mn || 1;
    for (let i = 0; i < data.length; i++) {
        data[i] = (data[i] - mn) / range;
    }

    return data;
}

/**
 * Jet colormap: maps 0..1 to RGB (blue -> cyan -> green -> yellow -> red)
 */
function jetColormap(t) {
    t = Math.max(0, Math.min(1, t));
    let r, g, b;

    if (t < 0.125) {
        r = 0; g = 0; b = 0.5 + t * 4;
    } else if (t < 0.375) {
        r = 0; g = (t - 0.125) * 4; b = 1;
    } else if (t < 0.625) {
        r = (t - 0.375) * 4; g = 1; b = 1 - (t - 0.375) * 4;
    } else if (t < 0.875) {
        r = 1; g = 1 - (t - 0.625) * 4; b = 0;
    } else {
        r = 1 - (t - 0.875) * 4; g = 0; b = 0;
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

window.generateGradCAM = generateGradCAM;
