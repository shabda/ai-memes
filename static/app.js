import memeConfig from "./memeconfig.js";

document.addEventListener('DOMContentLoaded', function() {
    const memeGenerator = new MemeGenerator();
    const memeThumbnails = document.getElementById('memeThumbnails');
    const memeForm = document.getElementById('memeForm');
    const selectedMemeType = document.getElementById('selectedMemeType');
    const downloadButton = document.getElementById('downloadMeme');

    // Populate thumbnails
    for (const [key, config] of Object.entries(memeConfig)) {
        const thumbnail = document.createElement('img');
        thumbnail.src = config.thumbnailSrc;
        thumbnail.alt = config.displayName;
        thumbnail.className = 'meme-thumbnail';
        thumbnail.dataset.memeType = key;
        thumbnail.addEventListener('click', () => selectMeme(key));
        memeThumbnails.appendChild(thumbnail);
    }

    function selectMeme(memeType) {
        document.querySelectorAll('.meme-thumbnail').forEach(thumb => {
            thumb.classList.remove('selected');
        });
        document.querySelector(`[data-meme-type="${memeType}"]`).classList.add('selected');
        selectedMemeType.value = memeType;
    }

    memeForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const memeType = selectedMemeType.value;
        const prompt = document.getElementById('prompt').value;

        if (!memeType) {
            alert('Please select a meme type');
            return;
        }

        const loadingMessage = document.createElement('p');
        loadingMessage.textContent = 'Generating meme...';
        memeForm.appendChild(loadingMessage);

        try {
            const response = await fetch('/api/generate-meme', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ memeType, prompt })
            });

            if (!response.ok) throw new Error('API request failed');

            const data = await response.json();
            memeGenerator.generateMeme(memeType, data);
            downloadButton.style.display = 'block';
        } catch (error) {
            alert(`Error: ${error.message}`);
        } finally {
            loadingMessage.remove();
        }
    });

    downloadButton.addEventListener('click', function() {
        const canvas = document.getElementById('memeCanvas');
        const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        const link = document.createElement('a');
        link.download = 'generated-meme.png';
        link.href = image;
        link.click();
    });
});
