const ws = new WebSocket("ws://localhost:8080");
let username = "";

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === "message") {
    displayMessage(data.sender, data.message);
  }
};

document
  .getElementById("username")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter" && this.value.trim() !== "") {
      setUsername();
    }
  });

document.getElementById("message").addEventListener("input", function () {
  document.getElementById("sendButton").disabled = this.value.trim() === "";
});

document
  .getElementById("message")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter" && this.value.trim() !== "") {
      sendMessage();
    }
  });

function setUsername() {
  const input = document.getElementById("username");
  username = input.value.trim() || "Anonymous";
  input.style.display = "none";
  document.getElementById("setUsernameBtn").style.display = "none";
}

function sendMessage() {
  const messageInput = document.getElementById("message");
  const message = messageInput.value.trim();
  if (message === "") return; // Không gửi tin nhắn rỗng

  ws.send(JSON.stringify({ type: "message", sender: username, message }));
  messageInput.value = "";
  document.getElementById("sendButton").disabled = true;
}

function displayMessage(sender, msg) {
  const chat = document.getElementById("chat");
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("chat-message");
  msgDiv.innerHTML = `<strong>${sender}:</strong> ${msg}`;
  chat.appendChild(msgDiv);
}

// Hiển thị tất cả tin nhắn dưới dạng mã hóa
function showEncryptedMessages() {
  const chat = document.getElementById("chat");
  const encryptedContainer = document.getElementById("encryptedMessages");
  encryptedContainer.innerHTML = "";

  chat.querySelectorAll(".chat-message").forEach((msgDiv) => {
    const sender = msgDiv.querySelector("strong").textContent.replace(":", "");
    const messageText = msgDiv.textContent.replace(sender + ":", "").trim();
    const encryptedText = btoa(messageText); // Mã hóa Base64

    const encryptedDiv = document.createElement("div");
    encryptedDiv.classList.add("chat-message");
    encryptedDiv.innerHTML = `<strong>${sender}:</strong> ${encryptedText}`;
    encryptedContainer.appendChild(encryptedDiv);
  });
}

document
  .getElementById("showEncryptedButton")
  .addEventListener("click", showEncryptedMessages);

//   dark mode
document.getElementById("darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
