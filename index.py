from flask import Flask, request, jsonify
import os
import requests

# 初始化 Flask 应用（Vercel 必须识别到这个 app 对象）
app = Flask(__name__)

# 从环境变量读取 API Key（和你在 Vercel 里添加的变量名要完全一致）
DEEPSEEK_API_KEY = os.environ.get("DEEPSEEK_API_KEY")
DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions"

# 定义路由，和 OpenAI 接口格式兼容
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
