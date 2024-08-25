let cardImages = [
    {photo: "1hearts.png", value: 1},
    {photo: "2hearts.png", value: 2},
    {photo: "3hearts.png", value: 3},
    {photo: "1clubs.png", value: 1},
    {photo: "2clubs.png", value: 2},
    {photo: "3clubs.png", value: 3}
];

let isBlocked = false;
let firstCardIndex = null;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = getRandomInt(i + 1);
        [array[i], array[j]] = [array[j], array[i]]; 
    }
}

function setupCards() {
    shuffleArray(cardImages);
    for (let i = 0; i < cardImages.length; i++) {
        let card = document.getElementById(`card${i}`);
        card.addEventListener("click", function() {
            if (!isBlocked && firstCardIndex === null) {
                firstCardIndex = i;
                flipCard(i);
            } else if (!isBlocked && firstCardIndex !== null && firstCardIndex !== i) {
                flipCard(i);
                isBlocked = true;
                setTimeout(function() {
                    let firstCard = document.getElementById(`card${firstCardIndex}`);
                    let secondCard = document.getElementById(`card${i}`);
                    if (cardImages[firstCardIndex].value === cardImages[i].value) {
                        firstCard.src = "clear.png";
                        secondCard.src = "clear.png";
                    } else {
                        firstCard.src = "back.png";
                        secondCard.src = "back.png";
                    }
                    firstCardIndex = null;
                    isBlocked = false;
                }, 1500);
            }
        });
    }
}

function flipCard(index) {
    if (isBlocked) {
        return;
    }

    let card = document.getElementById(`card${index}`);
    card.src = cardImages[index].photo;
}

function reset() {
    shuffleArray(cardImages);
    for (let i = 0; i < cardImages.length; i++) {
        let card = document.getElementById(`card${i}`);
        card.src = "back.png";
    }
    isBlocked = false;
    firstCardIndex = null;
}

let button = document.getElementById("reset");
button.addEventListener("click", reset);

setupCards();

