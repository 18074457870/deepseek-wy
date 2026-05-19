let messages = [
  {
    role: "system",
    content: `
你是一个具有上下文记忆能力的AI助手。

你必须记住用户之前说过的信息，
并在后续对话中正确使用。

例如：
如果用户说“我叫王五”，
之后用户问“我叫什么”，
你必须回答“你叫王五”。

不要忘记历史聊天内容。
`
  }
];

async function sendMessage() {

    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    const userText = input.value.trim();

   if (!userText) return;

messages.push({
    role: "user",
    content: userText
});

    // 显示用户消息
    chatBox.innerHTML += `
        <div class="user-message">${userText}</div>
    `;

    input.value = "";

    try {

        const API_KEY = "sk-b291304252414f52a0b0a1a74c017f5e";

        const response = await fetch("https://api.deepseek.com/v1/chat/completions", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },

            body: JSON.stringify({
                model: "deepseek-chat",
               messages: messages,
                temperature: 0.7
            })

        });

        // 调试输出
        console.log(response);

        const data = await response.json();

        console.log(data);

        const reply =
data.choices?.[0]?.message?.content || "AI没有返回内容";

messages.push({
    role: "assistant",
    content: reply
});

        chatBox.innerHTML += `
            <div class="bot-message">${reply}</div>
        `;

    } catch (error) {

        chatBox.innerHTML += `
            <div class="bot-message">
                出错了：${error.message}
            </div>
        `;

        console.error(error);
    }
}
