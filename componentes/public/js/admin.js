document.getElementById("message-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", document.getElementById("title").value);
    formData.append("content", document.getElementById("content").value);
    const fileInput = document.getElementById("attachment");
    if (fileInput.files.length > 0) {
        formData.append("attachment", fileInput.files[0]);
    }

    const response = await fetch("/api/messages", {
        method: "POST",
        body: formData
    });

    const data = await response.json();
    alert(data.message);
});
