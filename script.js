const API_URL = "https://ai-1p38.onrender.com";  // 👈 replace this with your Render backend URL

async function sendMessage() {
  const input = document.getElementById("userInput");
  const chatbox = document.getElementById("chatbox");
  const message = input.value.trim();
  if (!message) return;

  chatbox.innerHTML += `<p><b>You:</b> ${message}</p>`;
  input.value = "";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
    const data = await res.json();

    const reply = data.reply || "⚠️ No response from AI";
    chatbox.innerHTML += `<p><b>Bot:</b> ${reply}</p>`;
    chatbox.scrollTop = chatbox.scrollHeight;
  } catch (err) {
    console.error(err);
    chatbox.innerHTML += `<p>⚠️ Could not connect to AI</p>`;
  }
}