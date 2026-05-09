const API_URL = "https://69e6914e68208c1debe7b191.mockapi.io/reservations";

document.addEventListener("DOMContentLoaded", () => {
    const horaSelect = document.getElementById("hora-select");
    const form = document.querySelector(".reserva-form");
    const tbody = document.getElementById("reservas-tbody");

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

    async function carregarReservas() {
        try {
            const res = await fetch(API_URL);
            const reservas = await res.json();
            renderReservas(reservas);
        } catch (err) {
            Swal.fire("Erro", "Não foi possível carregar as reservas.", "error");
        }
    }

    function renderReservas(reservas) {
        tbody.innerHTML = "";
        reservas.forEach(reserva => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${reserva.nome}</td>
                <td>${reserva.data}</td>
                <td>${reserva.hora}</td>
                <td>${reserva.pessoas}</td>
                <td>
                    <button class="btn-editar" data-id="${reserva.id}">Editar</button>
                    <button class="btn-apagar" data-id="${reserva.id}">Apagar</button>
                </td>
            `;

            tbody.appendChild(tr);
        });
    }

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const dados = {
            nome: form.nome.value,
            email: form.email.value,
            telefone: form.telefone.value,
            data: form.data.value,
            hora: document.getElementById("hora-select").value,
            pessoas: form.pessoas.value,
            obs: form.obs.value
        };

        const editId = form.dataset.editId;

        if (!editId) {
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            });

            Swal.fire("Sucesso", "Reserva criada!", "success");
        } else {
            await fetch(`${API_URL}/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            });

            Swal.fire("Atualizada", "Reserva atualizada!", "success");
            delete form.dataset.editId;
        }

        form.reset();
        carregarReservas();
    });

    tbody.addEventListener("click", async (e) => {
        const btn = e.target;
        const id = btn.dataset.id;

        if (btn.classList.contains("btn-apagar")) {
            await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            Swal.fire("Apagada", "Reserva removida.", "success");
            carregarReservas();
        }

        if (btn.classList.contains("btn-editar")) {
            const res = await fetch(`${API_URL}/${id}`);
            const reserva = await res.json();

            form.nome.value = reserva.nome;
            form.email.value = reserva.email;
            form.telefone.value = reserva.telefone;
            form.data.value = reserva.data;
            document.getElementById("hora-select").value = reserva.hora;
            form.pessoas.value = reserva.pessoas;
            form.obs.value = reserva.obs;

            form.dataset.editId = id;

            Swal.fire("Modo edição", "Edite e volte a submeter.", "info");
        }
    });

    carregarReservas();
});
