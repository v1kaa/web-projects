// Function to send a message
function sendMessage() {
    var messageInput = document.getElementById("message-input");
    var message = messageInput.value.trim();
    if (message !== "") {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "send_message.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    console.log("Message sent:", message);
                    messageInput.value = ""; // Clear the input field
                    fetchMessages(); // Refresh messages
                } else {
                    console.error("Error sending message:", xhr.responseText);
                }
            }
        };
        xhr.send("message=" + encodeURIComponent(message));
    }
}

// Function to fetch and display messages
function fetchMessages() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "get_messages.php", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var chatMessages = document.getElementById("chat-messages");
                chatMessages.innerHTML = ''; // Clear the existing messages
                var messages = JSON.parse(xhr.responseText);
                messages.forEach(function(message) {
                    var messageElement = document.createElement("div");
                    messageElement.textContent = message.sender_id + ": " + message.message;
                    chatMessages.appendChild(messageElement);
                });
                chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the bottom
            } else {
                console.error("Error fetching messages:", xhr.responseText);
            }
        }
    };
    xhr.send();
}

// Fetch messages every 2 seconds
setInterval(fetchMessages, 2000);

// Initial fetch
fetchMessages();
