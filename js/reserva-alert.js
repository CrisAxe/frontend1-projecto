class ReservaAlert extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        const mensagem = this.getAttribute("mensagem") || "Aviso importante";

        this.shadowRoot.innerHTML = `
            <style>
                .alert-box {
                    background: #27ae60;
                    color: white;
                    padding: 18px 22px;
                    border-radius: 12px;
                    font-size: 18px;
                    font-weight: 600;
                    text-align: center;
                    margin: 30px auto;
                    max-width: 700px;
                    box-shadow: 0 6px 20px rgba(0,0,0,0.15);
                    animation: fadeIn 0.6s ease forwards;
                    opacity: 0;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            </style>

            <div class="alert-box">${mensagem}</div>
        `;
    }
}

customElements.define("reserva-alert", ReservaAlert);
