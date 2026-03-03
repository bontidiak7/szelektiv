let score = 0;
let errors = 0;
let time = 60;

const trash = document.getElementById("trash");
const bins = document.querySelectorAll(".bin");
const scoreSpan = document.getElementById("score");
const errorSpan = document.getElementById("errors");
const timeSpan = document.getElementById("time");
const feedback = document.getElementById("feedback");

const types = ["paper", "plastic", "metal", "mixed"];
let currentType = "";

function newTrash(){
    const r = Math.floor(Math.random() * types.length);
    currentType = types[r];
    trash.dataset.type = currentType;

    if(currentType === "paper") trash.style.background = "blue";
    if(currentType === "plastic") trash.style.background = "yellow";
    if(currentType === "metal") trash.style.background = "gray";
    if(currentType === "mixed") trash.style.background = "green";
}

trash.addEventListener("dragstart", function(e){
    e.dataTransfer.setData("text", currentType);
});

bins.forEach(bin => {

    bin.addEventListener("dragover", function(e){
        e.preventDefault();
    });

    bin.addEventListener("drop", function(e){
        e.preventDefault();

        const trashType = e.dataTransfer.getData("text");
        const binType = bin.dataset.type;

        if(trashType === binType){
            score++;
            scoreSpan.textContent = score;

            const c = bin.querySelector(".count");
            c.textContent = Number(c.textContent) + 1;

            showFeedback("Helyes!", "green");
        }
        else{
            errors++;
            errorSpan.textContent = errors;

            showFeedback("Hibás!", "red");
        }

        newTrash();
    });

});

function showFeedback(text, color){
    feedback.textContent = text;
    feedback.style.color = color;

    setTimeout(() => {
        feedback.textContent = "";
    }, 800);
}

const timer = setInterval(() => {
    time--;
    timeSpan.textContent = time;

    if(time === 0){
        clearInterval(timer);
        trash.draggable = false;
        alert("Vége a játéknak!\nPontszám: " + score);
    }
}, 1000);

newTrash();