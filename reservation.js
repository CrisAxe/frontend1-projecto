const form = document.querySelector(".form-reserva");

form.addEventListener("submit", async function(e) {
    e.preventDefault(); 

    const dados = {
        nome: document.querySelector("input[name='nome']").value,
        email: document.querySelector("input[name='email']").value,
        telefone: document.querySelector("input[name='telefone']").value,
        data: document.querySelector("input[name='data']").value,
        hora: document.querySelector("input[name='hora']").value,
        pessoas: document.querySelector("input[name='pessoas']").value,
        obs: document.querySelector("textarea[name='obs']").value
    };

    try {
        const response = await fetch("https://69e6914e68208c1debe7b191.mockapi.io/reservations", {          
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        const result = await response.json();
        console.log("Reserva enviada:", result);

        alert("Reserva enviada com sucesso!");
        form.reset();
    } catch (error) {
        console.error("Erro ao enviar:", error);
        alert("Erro ao enviar reserva. Tente novamente.");
    }
});


