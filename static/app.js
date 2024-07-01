import memeConfig from "./memeconfig.js";

document.addEventListener('DOMContentLoaded', function() {
    const memeGenerator = new MemeGenerator();

    const memeTypeSelect = document.getElementById('memeType');
    for (const [key, config] of Object.entries(memeConfig)) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = config.displayName;
        memeTypeSelect.appendChild(option);
    }

    document.getElementById('memeForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const memeType = document.getElementById('memeType').value;
        const prompt = document.getElementById('prompt').value;

        const resultDiv = document.getElementById('result');
        const canvas = document.getElementById('memeCanvas');
        const loadingMessage = document.createElement('p');
        loadingMessage.textContent = 'Generating meme...';

        resultDiv.insertBefore(loadingMessage, canvas);

        try {
            const response = await fetch('/api/generate-meme', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ memeType, prompt })
            });

            if (!response.ok) throw new Error('API request failed');

            const data = await response.json();
            memeGenerator.generateMeme(memeType, data);
        } catch (error) {
            loadingMessage.textContent = `Error: ${error.message}`;
        } finally {
            loadingMessage.remove();
        }
    });
});

class MemeGenerator {
    constructor() {
        this.canvas = document.getElementById('memeCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.memeTypes = memeConfig
    }

    generateMeme(memeType, data) {
        if (!this.memeTypes[memeType]) {
            console.error('Invalid meme type');
            return;
        }

        const meme = this.memeTypes[memeType];
        this.canvas.width = meme.width;
        this.canvas.height = meme.height;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const img = new Image();
        img.onload = () => {
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.addText(meme.textPositions, data);
        };
        img.src = meme.imageSrc;
    }

    addText(textPositions, data) {
    textPositions.forEach(pos => {
        this.ctx.font = `${pos.fontSize}px Arial`;
        this.ctx.fillStyle = pos.textColor || 'black';
        this.ctx.textAlign = 'center';
        this.wrapText(data[pos.key], pos.x, pos.y, pos.maxWidth, pos.lineHeight, pos.bgColor);
    });
}

wrapText(text, x, y, maxWidth, lineHeight, bgColor, textColor) {
    const words = text.split(' ');
    let line = '';
    let lines = [];

    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = this.ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            lines.push(line.trim());
            line = words[n] + ' ';
        } else {
            line = testLine;
        }
    }
    lines.push(line.trim());

    // Draw background
    if (bgColor) {
        const padding = 5;
        const bgHeight = lines.length * lineHeight + padding * 2;
        const bgWidth = maxWidth + padding * 2;
        this.ctx.fillStyle = bgColor;
        this.ctx.fillRect(x - bgWidth / 2, y - lineHeight, bgWidth, bgHeight);
    }

    // Draw text
    this.ctx.fillStyle = textColor || 'black';  // Use the provided text color or default to black
    lines.forEach((line, index) => {
        this.ctx.fillText(line, x, y + index * lineHeight);
    });
    }
}