export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  // 处理跨域预检请求
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  // 只处理 POST 请求
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    // 从 Vercel 环境变量读取你的 DeepSeek Key
    const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
    const body = await req.text();

    // 转发请求到 DeepSeek
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: body,
    });

    // 原样返回 DeepSeek 的响应，并带上跨域头
    const data = await response.text();
    return new Response(data, {
      status: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
