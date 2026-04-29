function getReviews() {
    return JSON.parse(localStorage.getItem("reviews")) || [];
}

function saveReviews(reviews) {
    localStorage.setItem("reviews", JSON.stringify(reviews));
}

function addReview(name, text) {
    const reviews = getReviews();
    reviews.push({ id: Date.now(), name, text });
    saveReviews(reviews);
}

function deleteReview(id) {
    let reviews = getReviews();
    reviews = reviews.filter(r => r.id !== id);
    saveReviews(reviews);
}

function editReview(id, newName, newText) {
    let reviews = getReviews();
    const index = reviews.findIndex(r => r.id === id);
    if (index !== -1) {
        reviews[index].name = newName;
        reviews[index].text = newText;
    }
    saveReviews(reviews);
}


const slider = document.getElementById("reviews-slider");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let reviews = getReviews();
let index = 0;

function renderCurrentReview() {
    reviews = getReviews();

    if (reviews.length === 0) {
        slider.innerHTML = `<div class="review-card">Ainda não existem sugestões. Seja o primeiro!</div>`;
        return;
    }

    const r = reviews[index];

    slider.innerHTML = `
        <div class="review-card">
            <div class="review-name">${r.name}</div>
            <div class="review-text">${r.text}</div>

            <div class="review-actions">
                <button class="edit-btn" onclick="openEdit(${r.id})">Editar</button>
                <button class="delete-btn" onclick="removeReview(${r.id})">Apagar</button>
            </div>
        </div>
    `;
}


prevBtn.addEventListener("click", () => {
    reviews = getReviews();
    if (reviews.length === 0) return;

    index = (index - 1 + reviews.length) % reviews.length;
    renderCurrentReview();
});

nextBtn.addEventListener("click", () => {
    reviews = getReviews();
    if (reviews.length === 0) return;

    index = (index + 1) % reviews.length;
    renderCurrentReview();
});


document.getElementById("add-review-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("review-name").value;
    const text = document.getElementById("review-text").value;

    addReview(name, text);

    document.getElementById("add-review-form").reset();

    reviews = getReviews();
    index = reviews.length - 1; // mostra a última criada
    renderCurrentReview();

    Swal.fire({
        icon: "success",
        title: "Sugestão enviada!",
        timer: 1500,
        showConfirmButton: false
    });
});


window.openEdit = function(id) {
    const reviews = getReviews();
    const r = reviews.find(x => x.id === id);
    if (!r) return;

    Swal.fire({
        title: "Editar sugestão",
        html: `
            <input id="swal-name" class="swal2-input" placeholder="Nome" value="${r.name}">
            <textarea id="swal-text" class="swal2-textarea" placeholder="Sugestão">${r.text}</textarea>
        `,
        confirmButtonText: "Guardar",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        focusConfirm: false,
        preConfirm: () => {
            const newName = document.getElementById("swal-name").value;
            const newText = document.getElementById("swal-text").value;

            if (!newName || !newText) {
                Swal.showValidationMessage("Preencha todos os campos");
                return false;
            }

            return { newName, newText };
        }
    }).then(result => {
        if (result.isConfirmed) {
            editReview(id, result.value.newName, result.value.newText);
            renderCurrentReview();

            Swal.fire({
                icon: "success",
                title: "Sugestão atualizada",
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
};


window.removeReview = function(id) {
    Swal.fire({
        title: "Apagar sugestão?",
        text: "Esta ação não pode ser desfeita.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#c0392b",
        cancelButtonColor: "#27ae60",
        confirmButtonText: "Apagar",
        cancelButtonText: "Cancelar"
    }).then(result => {
        if (result.isConfirmed) {
            deleteReview(id);

            reviews = getReviews();

            if (reviews.length === 0) {
                index = 0;
            } else if (index >= reviews.length) {
                index = reviews.length - 1;
            }

            renderCurrentReview();

            Swal.fire({
                icon: "success",
                title: "Sugestão apagada",
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
};

renderCurrentReview();
