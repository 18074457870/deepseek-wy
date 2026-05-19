let userName = "";

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

// 获取元素
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat");
const sendBtn = document.getElementById("btn");

// 发送消息
async function sendMessage() {

    const userText = input.value.trim();

    if (!userText) return;

    // 记录用户消息
    messages.push({
        role: "user",
        content: userText
    });

    // 记忆名字
    if (userText.includes("我叫")) {
        userName = userText.replace("我叫", "").trim();
    }

    // 显示用户消息
    chatBox.innerHTML += `
        <div class="user-message">
            ${escapeHtml(userText)}
        </div>
    `;

    // 清空输入框
    input.value = "";

    // 自动滚动到底部
    chatBox.scrollTop = chatBox.scrollHeight;

    // 显示“思考中”
    const loadingDiv = document.createElement("div");

    loadingDiv.className = "bot-message";

    loadingDiv.innerHTML = `
        <pre>正在思考中...</pre>
    `;

    chatBox.appendChild(loadingDiv);

    try {

        const API_KEY = "你的APIKEY";

        const response = await fetch(
            "https://api.deepseek.com/v1/chat/completions",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`
                },

                body: JSON.stringify({
                    model: "deepseek-chat",

                    messages: [
                        {
                            role: "system",
                            content: `
你是一个具有记忆能力的AI助手。

如果用户说“我叫xxx”，
你必须记住用户名字。

之后如果用户问：
“我叫什么”
你必须正确回答用户名字。

当前用户名字：
${userName}
`
                        },

                        ...messages
                    ],

                    temperature: 0.7
                })
            }
        );

        const data = await response.json();

        console.log(data);

        const reply =
            data.choices?.[0]?.message?.content ||
            "AI没有返回内容";

        // 保存AI回复
        messages.push({
            role: "assistant",
            content: reply
        });

        // 删除“思考中”
        loadingDiv.remove();

        // 显示AI回复
        chatBox.innerHTML += `
            <div class="bot-message">
                <pre>${escapeHtml(reply)}</pre>
            </div>
        `;

        // 自动滚动
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {

        loadingDiv.remove();

        chatBox.innerHTML += `
            <div class="bot-message">
                <pre>出错了：${escapeHtml(error.message)}</pre>
            </div>
        `;

        console.error(error);
    }
}

// 回车发送
function handleKey(event) {

    if (event.key === "Enter") {

        event.preventDefault();

        sendMessage();
    }
}

// 点击按钮发送
sendBtn.addEventListener("click", sendMessage);

// 输入框回车监听
input.addEventListener("keydown", handleKey);

// 防止HTML注入
function escapeHtml(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}let userName = "";

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

// 获取元素
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat");
const sendBtn = document.getElementById("btn");

// 发送消息
async function sendMessage() {

    const userText = input.value.trim();

    if (!userText) return;

    // 记录用户消息
    messages.push({
        role: "user",
        content: userText
    });

    // 记忆名字
    if (userText.includes("我叫")) {
        userName = userText.replace("我叫", "").trim();
    }

    // 显示用户消息
    chatBox.innerHTML += `
        <div class="user-message">
            ${escapeHtml(userText)}
        </div>
    `;

    // 清空输入框
    input.value = "";

    // 自动滚动到底部
    chatBox.scrollTop = chatBox.scrollHeight;

    // 显示“思考中”
    const loadingDiv = document.createElement("div");

    loadingDiv.className = "bot-message";

    loadingDiv.innerHTML = `
        <pre>正在思考中...</pre>
    `;

    chatBox.appendChild(loadingDiv);

    try {

        const API_KEY = "你的APIKEY";

        const response = await fetch(
            "https://api.deepseek.com/v1/chat/completions",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`
                },

                body: JSON.stringify({
                    model: "deepseek-chat",

                    messages: [
                        {
                            role: "system",
                            content: `
你是一个具有记忆能力的AI助手。

如果用户说“我叫xxx”，
你必须记住用户名字。

之后如果用户问：
“我叫什么”
你必须正确回答用户名字。

当前用户名字：
${userName}
`
                        },

                        ...messages
                    ],

                    temperature: 0.7
                })
            }
        );

        const data = await response.json();

        console.log(data);

        const reply =
            data.choices?.[0]?.message?.content ||
            "AI没有返回内容";

        // 保存AI回复
        messages.push({
            role: "assistant",
            content: reply
        });

        // 删除“思考中”
        loadingDiv.remove();

        // 显示AI回复
        chatBox.innerHTML += `
            <div class="bot-message">
                <pre>${escapeHtml(reply)}</pre>
            </div>
        `;

        // 自动滚动
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {

        loadingDiv.remove();

        chatBox.innerHTML += `
            <div class="bot-message">
                <pre>出错了：${escapeHtml(error.message)}</pre>
            </div>
        `;

        console.error(error);
    }
}

// 回车发送
function handleKey(event) {

    if (event.key === "Enter") {

        event.preventDefault();

        sendMessage();
    }
}

// 点击按钮发送
sendBtn.addEventListener("click", sendMessage);

// 输入框回车监听
input.addEventListener("keydown", handleKey);

// 防止HTML注入
function escapeHtml(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}
