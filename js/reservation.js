const dataInput = document.getElementById("data");
dataInput.addEventListener("input", () => {
    const d = new Date(dataInput.value);
    if (d.getDay() === 0) {
        Swal.fire({
            icon: "error",
            title: "Domingo indisponível",
            text: "O restaurante está fechado ao domingo.",
        });
        dataInput.value = "";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const horaSelect = document.getElementById("hora-select");

    function gerarHoras() {
        let hora = 19;
        let minuto = 0;

        while (hora < 23 || (hora === 23 && minuto === 0)) {
            const h = hora.toString().padStart(2, "0");
            const m = minuto.toString().padStart(2, "0");

            const option = document.createElement("option");
            option.value = `${h}:${m}`;
            option.textContent = `${h}:${m}`;

            horaSelect.appendChild(option);

            minuto += 30;
            if (minuto === 60) {
                minuto = 0;
                hora++;
            }
        }
    }

    gerarHoras();
});

const form = document.querySelector(".reserva-form");

form.addEventListener("submit", async function(e) {
    e.preventDefault(); 

    const nome = form.querySelector("input[name='nome']").value;
    const email = form.querySelector("input[name='email']").value;
    const telefone = form.querySelector("input[name='telefone']").value;
    const data = form.querySelector("input[name='data']").value;
    const hora = form.querySelector("select[name='hora']").value;
    const pessoas = form.querySelector("input[name='pessoas']").value;
    const obs = form.querySelector("textarea[name='obs']").value;

    const dataSelecionada = new Date(data);
    if (dataSelecionada.getDay() === 0) {
        Swal.fire({
            icon: "error",
            title: "Domingo indisponível",
            text: "O restaurante está fechado ao domingo.",
        });
        return;
    }

    if (hora < "19:00" || hora > "23:00") {
        Swal.fire({
            icon: "error",
            title: "Horário inválido",
            text: "Escolha um horário entre as 19:00 e as 23:00.",
        });
        return;
    }

    const [h, m] = hora.split(":").map(Number);
    if (m !== 0 && m !== 30) {
        Swal.fire({
            icon: "error",
            title: "Intervalo inválido",
            text: "Só pode escolher horários às 00 ou 30 minutos.",
        });
        return;
    }

    const dados = { nome, email, telefone, data, hora, pessoas, obs };

    try {
        const response = await fetch("https://69e6914e68208c1debe7b191.mockapi.io/reservations", {          
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });

        if (!response.ok) throw new Error("Erro na API");

        
        emailjs.send("service_id", "template_id", {
            nome,
            email,
            telefone,
            data,
            hora,
            pessoas,
            obs
        });

        Swal.fire({
            icon: "success",
            title: "Reserva enviada!",
            text: "A sua reserva foi registada com sucesso.",
            confirmButtonColor: "#27ae60"
        });

        form.reset();

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Erro ao enviar",
            text: "Ocorreu um erro. Tente novamente.",
        });
    }
});
