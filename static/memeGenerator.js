
import memeConfig from './memeConfig.js';

export class MemeGenerator {
    constructor() {
        this.canvas = document.getElementById('memeCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.memeTypes = memeConfig;
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
            this.adjustCanvasDisplay();
            document.getElementById('downloadMeme').style.display = 'block';
            document.getElementById('shareMeme').style.display = 'block';
        };
        img.src = meme.imageSrc;
    }

    addText(textPositions, data) {
        textPositions.forEach(pos => {
            this.ctx.font = `${pos.fontSize}px Arial`;
            this.ctx.fillStyle = pos.textColor || 'black';  // Set default to black if not specified
            this.ctx.textAlign = 'center';
            this.wrapText(data[pos.key], pos.x, pos.y, pos.maxWidth, pos.lineHeight, pos.bgColor, pos.textColor || 'black');
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

        if (bgColor) {
            const padding = 5;
            const bgHeight = lines.length * lineHeight + padding * 2;
            const bgWidth = maxWidth + padding * 2;
            this.ctx.fillStyle = bgColor;
            this.ctx.fillRect(x - bgWidth / 2, y - lineHeight, bgWidth, bgHeight);
        }

        this.ctx.fillStyle = textColor;  // Use the passed text color
        lines.forEach((line, index) => {
            this.ctx.fillText(line, x, y + index * lineHeight);
        });
    }

    adjustCanvasDisplay() {
        const container = this.canvas.parentElement;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const canvasAspectRatio = this.canvas.width / this.canvas.height;

        let newWidth = containerWidth;
        let newHeight = newWidth / canvasAspectRatio;

        if (newHeight > containerHeight) {
            newHeight = containerHeight;
            newWidth = newHeight * canvasAspectRatio;
        }

        this.canvas.style.width = `${newWidth}px`;
        this.canvas.style.height = `${newHeight}px`;
    }
}