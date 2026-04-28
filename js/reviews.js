const slider=document.getElementById('reviews-slider');
let index = 0;

async function loadReviews() {
    const res = await fetch('https://69e6914e68208c1debe7b191.mockapi.io/reviews');
    const data = await res.json();

    data.forEach(review => {
        slider.innerHTML += `
        <div class="review-card">
            <img src="${review.image} " alt="${review.name}">
            <h3>${review.name}</h3>
            <p>${review.rating}</p>
            <p>${review.comment}</p>
        </div>
        `;
    });
}

function moveSlider(direction) {
    const cards = document.querySelectorAll('.review-card');
    index = (index + direction + cards.length) % cards.length;
    
    slider.style.transform = `translateX(-${index * 100}%)`;
}

document.getElementById('prev').onclick = () => moveSlider(-1);
document.getElementById('next').onclick = () => moveSlider(1);

loadReviews();