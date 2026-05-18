from flask import Flask, request, jsonify
from flask_cors import CORS  # 新增跨域依赖
import os
import requests

app = Flask(__name__)
CORS(app)  # 允许所有跨域请求
DEEPSEEK_API_KEY = os.environ.get("DEEPSEEK_API_KEY")
DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions"

@app.route("/v1/chat/completions", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {DEEPSEEK_API_KEY}"
        }
        resp = requests.post(
            DEEPSEEK_API_URL,
            headers=headers,
            json=data
        )
        return jsonify(resp.json()), resp.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/")
def home():
    return "DeepSeek 代理服务运行中！"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
