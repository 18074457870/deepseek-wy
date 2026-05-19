async function sendMessage() {
    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    const userText = input.value.trim();

    if (!userText) return;

    // 显示用户消息
    chatBox.innerHTML += `
        <div class="user-message">${userText}</div>
    `;

    input.value = "";

    try {
        const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 你的API_KEY"
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [
                    {
                        role: "user",
                        content: userText
                    }
                ]
            })
        });

        const data = await response.json();

        const reply =
            data.choices?.[0]?.message?.content ||
            "没有返回内容";

        chatBox.innerHTML += `
            <div class="bot-message">${reply}</div>
        `;

    } catch (error) {
        chatBox.innerHTML += `
            <div class="bot-message">
                出错了：${error.message}
            </div>
        `;
    }
}
