import os
import json
from flask import Flask, request, jsonify, send_from_directory
import requests

from memes import MEME_TYPES

SYSTEM_PROMPT = """
You are an API that returns valid JSON responses that are consumed by systems that can only parse JSON.
You must return only Valid JSON.
"""

app = Flask(__name__)

# Claude API key will be automatically available as an environment variable
CLAUDE_API_KEY = os.environ.get('CLAUDE_API_KEY')

@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route('/api/generate-meme', methods=['POST'])
def generate_meme():
    data = request.json
    meme_type = data.get('memeType')
    prompt = data.get('prompt')

    if meme_type not in MEME_TYPES:
        return jsonify({'error': 'Invalid meme type'}), 400

    meme_generator = MEME_TYPES[meme_type]
    full_prompt = meme_generator.generate_prompt(prompt)

    claude_response = requests.post(
        'https://api.anthropic.com/v1/messages',
        headers={
            'Content-Type': 'application/json',
            'x-api-key': CLAUDE_API_KEY,
            'anthropic-version': '2023-06-01'
        },
        json={
            'model': 'claude-3-opus-20240229',
            'max_tokens': 1024,
            "system": SYSTEM_PROMPT,
            'messages': [{
                'role': 'user',
                'content': full_prompt
            }]
        }
    )
    claude_response.raise_for_status()

    if claude_response.status_code != 200:
        return jsonify({'error': 'Failed to generate meme'}), 500

    meme_response = json.loads(claude_response.json()['content'][0]['text'])
    return jsonify(meme_response)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)