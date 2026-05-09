class PituxaFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        const ano = new Date().getFullYear();

        this.shadowRoot.innerHTML = `
            <style>
                footer {
                    width: 100%;
                    background: #ffffff;
                    padding: 30px 0;
                    text-align: center;
                    border-top: 1px solid #ddd;
                    box-shadow: 0 -5px 20px rgba(0,0,0,0.08);
                    font-family: Arial, sans-serif;
                    animation: fadeUp 0.8s ease forwards;
                    opacity: 0;
                }

                .footer-container {
                    max-width: 900px;
                    margin: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    color: #333;
                }

                .footer-title {
                    font-size: 22px;
                    font-weight: 700;
                    color: #27ae60;
                }

                .footer-links {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    margin-top: 10px;
                }

                .footer-links a {
                    color: #27ae60;
                    font-weight: 600;
                    text-decoration: none;
                    transition: 0.3s;
                }

                .footer-links a:hover {
                    color: #1e8449;
                }

                .copy {
                    margin-top: 10px;
                    font-size: 14px;
                    color: #555;
                }

                @keyframes fadeUp {
                    from {
                        transform: translateY(40px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
            </style>

            <footer>
                <div class="footer-container">
                    <div class="footer-title">Casa Pituxa</div>



                    <div class="copy">© ${ano} Casa Pituxa — Todos os direitos reservados.</div>
                </div>
            </footer>
        `;
    }
}

customElements.define("pituxa-footer", PituxaFooter);
