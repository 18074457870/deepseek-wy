let messages = [
    {
        role: "system",
        content: "你是一个有记忆的AI助手，请记住用户之前说的话，并结合上下文回答。"
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
