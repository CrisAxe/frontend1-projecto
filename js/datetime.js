function updateDateTime() {
    const now = new Date();

    document.getElementById("current-year").textContent = now.getFullYear();

    const formatted = now.toLocaleString("pt-PT", {
        dateStyle: "full",
        timeStyle: "medium"
    });

    document.getElementById("current-time").textContent = formatted;
}

setInterval(updateDateTime, 1000);
updateDateTime();
