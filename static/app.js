// app.js

import { MemeGenerator } from './memeGenerator.js';

document.addEventListener('DOMContentLoaded', function() {
    const memeGenerator = new MemeGenerator();

    // Check for URL parameters and generate meme if they exist
    const urlParams = new URLSearchParams(window.location.search);
    const memeType = urlParams.get('type');
    const memePrompt = urlParams.get('prompt');

    if (memeType && memePrompt) {
        document.getElementById('selectedMemeType').value = memeType;
        document.getElementById('prompt').value = memePrompt;
        generateMemeFromParams(memeType, memePrompt);
    }

    // Populate the meme type selection
    populateMemeSelection();

    document.getElementById('memeForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const memeType = document.getElementById('selectedMemeType').value;
        const prompt = document.getElementById('prompt').value;

        // Update URL with new parameters
        const newUrl = `${window.location.pathname}?type=${encodeURIComponent(memeType)}&prompt=${encodeURIComponent(prompt)}`;
        window.history.pushState({}, '', newUrl);

        await generateMemeFromParams(memeType, prompt);
    });

    document.getElementById('shareMeme').addEventListener('click', function() {
        const shareUrl = window.location.href;
        navigator.clipboard.writeText(shareUrl).then(function() {
            alert('Share link copied to clipboard!');
        }, function(err) {
            console.error('Could not copy text: ', err);
        });
    });

    async function generateMemeFromParams(memeType, prompt) {
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
            console.error('Error generating meme:', error);
        }
    }

    function populateMemeSelection() {
        const memeThumbnails = document.getElementById('memeThumbnails');
        for (const [key, config] of Object.entries(memeGenerator.memeTypes)) {
            const thumbnail = document.createElement('img');
            thumbnail.src = config.thumbnailSrc;
            thumbnail.alt = config.displayName;
            thumbnail.className = 'meme-thumbnail';
            thumbnail.dataset.memeType = key;
            thumbnail.addEventListener('click', () => selectMeme(key));
            memeThumbnails.appendChild(thumbnail);
        }
    }

    function selectMeme(memeType) {
        document.querySelectorAll('.meme-thumbnail').forEach(thumb => {
            thumb.classList.remove('selected');
        });
        document.querySelector(`[data-meme-type="${memeType}"]`).classList.add('selected');
        document.getElementById('selectedMemeType').value = memeType;
    }
});