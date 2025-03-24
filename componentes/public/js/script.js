document.getElementById("message-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Captura os dados do formulário   
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const attachment = document.getElementById("attachment").files;

    // Cria um objeto de mensagem
    const message = {
        title: title,
        content: content,
        attachment: attachment ? Array.from(attachment).map(file => file.name) : []
    };

    // Adiciona a mensagem à lista de mensagens (apenas para visualização)
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message");
    messageContainer.innerHTML = `
        <h3>${message.title}</h3>
        <p>${message.content}</p>
        ${message.attachment.length > 0 ? "<strong>Anexos:</strong> " + message.attachment.join(", ") : ""}
    `;

    document.getElementById("messages-list").appendChild(messageContainer);

 
    document.getElementById("message-form").reset();
});
