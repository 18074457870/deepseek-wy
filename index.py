from flask import Flask, request, jsonify
import os
import requests

app = Flask(__name__)

# 从 Vercel 环境变量直接读取你的 KEY，不需要前端传递
DEEPSEEK_API_KEY = os.environ.get("DEEPSEEK_API_KEY")
DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions"

# 对话接口
@app.route("/v1/chat/completions", methods=["POST"])
def chat():
    try:
        # 获取前端传来的数据
        data = request.get_json()

        # 构造请求头（强制使用你自己的 KEY）
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {DEEPSEEK_API_KEY}"
        }

        # 转发请求到 DeepSeek 官方
        resp = requests.post(
            DEEPSEEK_API_URL,
            headers=headers,
            json=data
        )

        # 返回结果给 NextChat
        return jsonify(resp.json()), resp.status_code

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 主页（可选）
@app.route("/")
def home():
    return "DeepSeek 代理服务运行中！"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
