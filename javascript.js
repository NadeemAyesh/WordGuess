// Setting Game name
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;

// Setting game options
let numberOfTry = 6;
let numberOfletters = 6;
let currentTry = 1;

//words
let wordToGuess = 0;
let words = ["Create", "Steals", "Update", "Delete", "Master"];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let messageArea = document.querySelector('.message')

function generateInput() {
    const inputsContainer = document.querySelector(".inputs");

    for (let i = 1; i <= numberOfTry; i++) {
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span>${i}</span>`;

        if( i!== 1 ) tryDiv.classList.add("disabled-input");

        for(let j = 1; j <= numberOfletters; j++) {
            const input = document.createElement("input");
            input.type = "text";
            input.id = `guess-${i}-letter-${j}`;

            input.setAttribute("maxlength", 1);
            tryDiv.appendChild(input);
        }

        inputsContainer.appendChild(tryDiv);
    }

    inputsContainer.children[0].children[1].focus();

    // Disable All input Except first
    const inputsInDisabledDiv = document.querySelectorAll(".disabled-input input");
    inputsInDisabledDiv.forEach((input) => {
        input.disabled = true;
    })

    const inputs = document.querySelectorAll("input");

    inputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            this.value = this.value.toUpperCase();
            const nextInput = inputs[index + 1];
            if(nextInput) nextInput.focus();
        })

        input.addEventListener('keydown', function(event) {
            const currentIndex = Array.from(inputs).indexOf(event.target); // بتجيب Array من ال inputs
            if(event.key === "ArrowRight") {
                const nextInput = currentIndex + 1;
                if(nextInput < inputs.length) inputs[nextInput].focus();
            }
            if(event.key === "ArrowLeft") {
                const prevInput = currentIndex - 1;
                if(prevInput >= 0) inputs[prevInput].focus();
            }

        })
    })
}

const guessBtn = document.querySelector('.check-word')

guessBtn.addEventListener('click', handleGuess);
console.log(wordToGuess);

function handleGuess() {
    let successGuess = true;
    for(let i = 1; i <= numberOfletters; i++) {
        const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`);
        const letter = inputField.value.toLowerCase();
        const acctualLetter = wordToGuess[i - 1];

        // base game logic
        if(letter === acctualLetter) {
            //Letter is in his place;
            inputField.classList.add('yes-in-place');
            // inputField.classList.remove('no not-inplace');
        } else if(wordToGuess.includes(letter) && letter !== "") {
            // letter is correct but not in his place;
            inputField.classList.add('not-inplace');
            successGuess = false;
        } else {
            inputField.classList.add('no');
            successGuess = false;
        }
    }

    // Check if user win or loose;
    if(successGuess) {
        console.log('Win');
        messageArea.innerHTML = `You Won After ${currentTry} Tries! Good Job. Word is: <span>${wordToGuess}</span>`;
        let allTries = document.querySelectorAll('.inputs > div');
        allTries.forEach((div) => div.classList.add('disabled-input'));

        guessBtn.cdisbled = true;
    } else {
        console.log('looooose');
        document.querySelector(`.try-${currentTry}`).classList.add("disabled-input");
        const currentTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
        currentTryInputs.forEach((input) => (input.disabled = true));
        currentTry++;
        
        const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
        nextTryInputs.forEach((input) => (input.disabled = false));

        let elem = document.querySelector(`.try-${currentTry}`);
        if(elem) {
            document.querySelector(`.try-${currentTry}`).classList.remove("disabled-input");
            elem.children[1].focus();
        } else {
            messageArea.innerHTML = `You Lose After ${currentTry} Tries! Try Agin. Word is: <span>${wordToGuess}</span>`;
            guessBtn.disabled = true;
        }
    }

}

window.onload = function() {
    generateInput();
}