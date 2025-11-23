let gameHasBeenStarted = false;
let score = 0;
let timer = null;
let startTime = 0;
let elapsedTime = 0; 
const displayTime = document.getElementById("timer");
const firstNumber = document.getElementById("first-number");
const secondNumber = document.getElementById("second-number");
const thirdNumber = document.getElementById("third-number");
const pageHtml = document.getElementById("page");
const numberHtml = document.getElementById("number");
const scoreHtml = document.getElementById("score");
const numbersTable = document.getElementById("numbers-table");
const container = document.getElementById("container");
const result = document.getElementById("result");
numbersTable.addEventListener("contextmenu", (e) => e.preventDefault());

const numbersArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
const randomNumber = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];

let book = 
{
    page: 1,
};

const shuffleArray = (numbersArray) => {
    for(let i = numbersArray.length - 1; i > 0; i--){
        const random = Math.floor(Math.random() * (i+1));
        [numbersArray[i], numbersArray[random]] = [numbersArray[random], numbersArray[i]];
    };
};

const changePage = (e) => {

    let delta = e.deltaY || e.detail || e.wheelDelta;

    if (delta > 0) {
        if (book.page < 10) book.page = (book.page + 1);
    } else {
        if (book.page > 1) book.page = (book.page - 1);
    }

    let startIndex = (book.page - 1) * 3; 

    firstNumber.innerText = `${numbersArray[startIndex] < 10 ? `0${numbersArray[startIndex]}` : numbersArray[startIndex]}`;
    secondNumber.innerText = `${numbersArray[startIndex + 1] < 10 ? `0${numbersArray[startIndex + 1]}` : numbersArray[startIndex + 1]}`;
    thirdNumber.innerText = `${numbersArray[startIndex + 2] < 10 ? `0${numbersArray[startIndex + 2]}` : numbersArray[startIndex + 2]}`;

    updateGameStatsHtml();
};

const previousPage = () => {

    if(book.page > 1){
        book.page = (book.page - 1);
    };

    let startIndex = (book.page - 1) * 3; 

    firstNumber.innerText = `${numbersArray[startIndex] < 10 ? `0${numbersArray[startIndex]}` : numbersArray[startIndex]}`;
    secondNumber.innerText = `${numbersArray[startIndex + 1] < 10 ? `0${numbersArray[startIndex + 1]}` : numbersArray[startIndex + 1]}`;
    thirdNumber.innerText = `${numbersArray[startIndex + 2] < 10 ? `0${numbersArray[startIndex + 2]}` : numbersArray[startIndex + 2]}`;

    updateGameStatsHtml();
}

const nextPage = () => {

    if(book.page < 10){
        book.page = (book.page + 1);
    };

    let startIndex = (book.page - 1) * 3; 

    firstNumber.innerText = `${numbersArray[startIndex] < 10 ? `0${numbersArray[startIndex]}` : numbersArray[startIndex]}`;
    secondNumber.innerText = `${numbersArray[startIndex + 1] < 10 ? `0${numbersArray[startIndex + 1]}` : numbersArray[startIndex + 1]}`;
    thirdNumber.innerText = `${numbersArray[startIndex + 2] < 10 ? `0${numbersArray[startIndex + 2]}` : numbersArray[startIndex + 2]}`;

    updateGameStatsHtml();
};

const startTimer = () =>{
    if(!gameHasBeenStarted){
        startTime = Date.now();
        timer = setInterval(updateTimer, 10);
    }
};

const stopTimer = () =>{
    if(gameHasBeenStarted){
        clearInterval(timer)
        elapsedTime = Date.now() - startTime;
    };
};

const resetTimer = () =>{
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    displayTime.innerText = "";
};

const updateTimer = () =>{
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    let milliseconds = Math.floor(elapsedTime % 1000 / 10);

    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    if(minutes >= 60) {
        displayTime.innerText = "60:00:00";
    }else{
        displayTime.innerText = `${minutes}:${seconds}:${milliseconds}`;
    };
    
};

const updateNumbers = () => {
    firstNumber.innerText = `${numbersArray[0] < 10 ? `0${numbersArray[0]}` : numbersArray[0]}`;
    secondNumber.innerText = `${numbersArray[1] < 10 ? `0${numbersArray[1]}` : numbersArray[1]}`;
    thirdNumber.innerText = `${numbersArray[2] < 10 ? `0${numbersArray[2]}` : numbersArray[2]}`;
};

const updateGameStatsHtml = () => {
    pageHtml.innerText = `${book.page}/10`;
    numberHtml.innerText = `${randomNumber[0]}`;
    scoreHtml.innerText = score;
};

const startGame = () => {
    startTimer()
    gameHasBeenStarted = true;
    document.getElementById("game-info").style.display = "none";
    numbersTable.style.display = "block";
    shuffleArray(numbersArray);
    shuffleArray(randomNumber);
    updateGameStatsHtml();
    updateNumbers();
};

const endGame = () => {
    stopTimer();
    console.log(`Time it took in milliseconds: ${elapsedTime}`);
    gameHasBeenStarted = false;
    numbersTable.style.display = "none";
    container.style.backgroundColor = "rgba(0,0,0,0.3)";
    container.style.display = "flex";
    container.style.justifyContent = "center";
    container.style.alignItems = "center";
    document.getElementById("result-container").style.display = "block";

    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    let milliseconds = Math.floor(elapsedTime % 1000 / 10);

    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    result.innerText = `${minutes}:${seconds}:${milliseconds}`;
};

const restartGame = () => {
    resetTimer();

    container.style.backgroundColor = "#fff"
    container.style.justifyContent = "normal";
    container.style.alignItems = "normal";
    container.style.display = "block";

    document.getElementById("result-container").style.display = "none";
    document.getElementById("game-info").style.display = "block";

    score = 0;
};

numbersTable.addEventListener("wheel", changePage);

    window.addEventListener("keydown", (e) => {
        
        if (!gameHasBeenStarted) return;

        if(e.key === "ArrowLeft"){
            previousPage();
        }else if(e.key === "ArrowRight"){
            nextPage();
        };
    });

numbersTable.addEventListener("click", (e) => {
    if(e.target.classList.contains("numbers")) {
        if(randomNumber[0] == e.target.innerText){
            e.target.style.backgroundColor = "#03fc45";
            setTimeout(() =>{
                e.target.style.backgroundColor = "";
            }, 100);
            score ++;
            if(score === 10) endGame();
            shuffleArray(numbersArray);
            shuffleArray(randomNumber);
            updateNumbers();
            book.page = 1;
            updateGameStatsHtml();
        }else{
            if(score>0) score --;
            updateGameStatsHtml();
            e.target.style.backgroundColor = "#fc0303";
            setTimeout(() =>{
                e.target.style.backgroundColor = "";
            }, 100);
        };
    };
});

