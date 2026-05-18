from flask import Flask, request, jsonify
import os
import requests

app = Flask(__name__)

DEEPSEEK_API_KEY = os.environ.get("DEEPSEEK_API_KEY")
DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions"

@app.route('/v1/chat/completions', methods=['POST'])
def chat_completions():
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {DEEPSEEK_API_KEY}"
    }
    data = request.json
    response = requests.post(DEEPSEEK_API_URL, headers=headers, json=data)
    return jsonify(response.json()), response.status_code

if __name__ == '__main__':
    app.run()
