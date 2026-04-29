class PituxaCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });

        shadow.innerHTML = `
            <style>
                .card {
                    padding: 20px;
                    background: rgba(0, 0, 0, 0.7);
                    border-radius: 12px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: #f8f8f8;
                    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
                }
                .title {
                    font-weight: 600;
                    color: #27ae60;
                    margin-bottom: 8px;
                    font-size: 18px;
                }
                .content {
                    font-size: 14px;
                    line-height: 1.5;
                    opacity: 0.9;
                }
            </style>

            <div class="card">
                <div class="title">${this.getAttribute("title") || "Casa Pituxa"}</div>
                <div class="content">${this.getAttribute("text") || ""}</div>
            </div>
        `;
    }
}

customElements.define("pituxa-card", PituxaCard);
