from flask import Flask, request, jsonify
import os
import requests

app = Flask(__name__)
DEEPSEEK_API_KEY = os.environ.get("DEEPSEEK_API_KEY")
DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions"

# 根路径测试
@app.route("/", methods=["GET"])
def home():
    return "OK"

# 聊天接口，同时处理 OPTIONS 和 POST
@app.route("/v1/chat/completions", methods=["OPTIONS", "POST"])
def chat():
    # 手动处理 OPTIONS 预检请求
    if request.method == "OPTIONS":
        # 直接返回允许跨域的头
        response = app.make_default_options_response()
        headers = response.headers
        headers["Access-Control-Allow-Origin"] = "*"
        headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        return response

    # 处理 POST 请求
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
        # 返回时也带上跨域头
        response = jsonify(resp.json())
        response.headers["Access-Control-Allow-Origin"] = "*"
        return response, resp.status_code
    except Exception as e:
        response = jsonify({"error": str(e)})
        response.headers["Access-Control-Allow-Origin"] = "*"
        return response, 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
