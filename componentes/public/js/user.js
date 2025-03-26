async function loadMessages() {
    const response = await fetch("/api/messages");
    const messages = await response.json();
    
    const messagesContainer = document.getElementById("messages-list");
    messagesContainer.innerHTML = "";

    messages.forEach(message => {
        const messageElement = document.createElement("div");
        messageElement.innerHTML = `
            <h3>${message.title}</h3>
            <p>${message.content}</p>
            ${message.attachment ? `<a href="${message.attachment}" download>Baixar Anexo</a>` : ""}
            <button onclick="deleteMessage(${message.id})">🗑 Apagar</button>
        `;
        messagesContainer.appendChild(messageElement);
    });
}

async function deleteMessage(id) {
    if (!confirm("Tem certeza que deseja apagar esta mensagem?")) return;

    const response = await fetch(`/api/messages/${id}`, {
        method: "DELETE"
    });

    const result = await response.json();
    alert(result.message);

    // Recarregar lista de mensagens
    loadMessages();
}

// Carregar mensagens ao abrir a página
window.onload = loadMessages;
