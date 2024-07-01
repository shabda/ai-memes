const baseMemeConfig = {
    'iqBellCurve': {
        displayName: 'IQ Bell Curve',
        width: 675,
        height: 499,
        imageSrc: '/static/meme-images/iq-bell-curve.png',
        textPositions: [
            { key: 'iq_extreme', x: 100, y: 250, maxWidth: 150, lineHeight: 20, fontSize: 16, bgColor: 'rgba(255,255,255,0.7)' },
            { key: 'iq_mid', x: 470, y: 100, maxWidth: 200, lineHeight: 20, fontSize: 16, bgColor: 'rgba(255,255,255,0.7)' },
            { key: 'iq_extreme', x: 575, y: 220, maxWidth: 150, lineHeight: 20, fontSize: 16, bgColor: 'rgba(255,255,255,0.7)' }
        ]
    },
    'changeMyMind': {
        displayName: 'Change My Mind',
        width: 675,
        height: 505,
        imageSrc: '/static/meme-images/change-my-mind.png',
        textPositions: [
            { key: 'statement', x: 420, y: 330, maxWidth: 300, lineHeight: 25, fontSize: 20, bgColor: 'rgba(255,255,255,0.7)' }
        ]
    },
    'distractedBoyfriend': {
        displayName: 'Distracted Boyfriend',
        width: 675,
        height: 500,
        imageSrc: '/static/meme-images/distracted-boyfriend.png',
        textPositions: [
            { key: 'boyfriend', x: 350, y: 450, maxWidth: 200, lineHeight: 25, fontSize: 18, bgColor: 'rgba(255,255,255,0.7)' },
            { key: 'distraction', x: 150, y: 500, maxWidth: 200, lineHeight: 25, fontSize: 18, bgColor: 'rgba(255,255,255,0.7)' },
            { key: 'girlfriend', x: 550, y: 100, maxWidth: 200, lineHeight: 25, fontSize: 18, bgColor: 'rgba(255,255,255,0.7)' }
        ]
    },
    'areYaWinningSon': {
        displayName: 'Are Ya Winning Son?',
        width: 675,
        height: 500,
        imageSrc: '/static/meme-images/are-ya-winning-son.png',
        textPositions: [
            { key: 'father', x: 150, y: 50, maxWidth: 200, lineHeight: 25, fontSize: 18, bgColor: 'rgba(255,255,255,0.7)' },
            { key: 'son', x: 500, y: 200, maxWidth: 160, lineHeight: 25, fontSize: 18, bgColor: 'rgba(255,255,255,0.7)' }
        ]
    },
    'rollSafe': {
        displayName: 'Roll Safe (Guy Tapping Head)',
        width: 675,
        height: 500,
        imageSrc: '/static/meme-images/roll-safe.png',
        textPositions: [
            { key: 'topText', x: 337, y: 50, maxWidth: 600, lineHeight: 35, fontSize: 30, bgColor: 'rgba(255,255,255,0.7)', textColor: 'white' },
            { key: 'bottomText', x: 337, y: 450, maxWidth: 600, lineHeight: 35, fontSize: 30, bgColor: 'rgba(255,255,255,0.7)', textColor: 'white' }
        ]
    },
     'womanYellingAtCat': {
        displayName: 'Woman Yelling at Cat',
        width: 800,
        height: 450,
        imageSrc: '/static/meme-images/woman-yelling-at-cat.png',
        textPositions: [
            { key: 'womanText', x: 200, y: 50, maxWidth: 350, lineHeight: 30, fontSize: 24, bgColor: 'rgba(0,0,0,0.5)', textColor: 'white' },
            { key: 'catText', x: 600, y: 50, maxWidth: 350, lineHeight: 30, fontSize: 24, bgColor: 'rgba(0,0,0,0.5)', textColor: 'white' }
        ]
    }

};

const memeConfig = Object.entries(baseMemeConfig).reduce((acc, [key, config]) => {
    const imagePath = config.imageSrc.split('/');
    const imageName = imagePath[imagePath.length - 1];
    const thumbnailName = imageName.replace('.png', '-thumb.png');
    const thumbnailPath = [...imagePath.slice(0, -1), thumbnailName].join('/');

    acc[key] = {
        ...config,
        thumbnailSrc: thumbnailPath
    };

    return acc;
}, {});

export default memeConfig;
