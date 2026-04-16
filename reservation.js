const form = document.querySelector(".form-reserva");

form.addEventListener("submit", function(e) {
    e.preventDefault(); 
    const nome = document.querySelector("input[name='nome']").value
    const email = document.querySelector("input[name='email']").value;
    const telefone = document.querySelector("input[name='telefone']").value;
    const data = document.querySelector("input[name='data']").value;
    const hora = document.querySelector("input[name='hora']").value;
    const pessoas = document.querySelector("input[name='pessoas']").value;
    const obs = document.querySelector("textarea[name='obs']").value;

    const dados = {
        nome: nome,
        email: email,
        telefone: telefone,
        data: data,
        hora: hora,
        pessoas: pessoas,
        obs: obs
    };

    localStorage.setItem("reserva", JSON.stringify(dados));

    alert("Reserva guardada localmente!");
  });