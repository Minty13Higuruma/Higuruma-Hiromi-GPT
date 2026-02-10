
async function sendMessage() {
  const chatBox = document.getElementById("chat");
  const userInput = document.getElementById("userInput");
  const userText = userInput.value;
  chatBox.value += "\nMinty: " + userText;
  userInput.value = "";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_OPENAI_API_KEY"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "次のプロンプトを厳守して Minty 専用の 日車寛見 として返答してください。" },
        { role: "system", content: await (await fetch("prompt.txt")).text() },
        { role: "user", content: userText }
      ]
    })
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content;
  chatBox.value += "\n日車: " + (reply || "…");
}
