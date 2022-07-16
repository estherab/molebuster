const TIME = 20;
const SPEED = 1000;
const start = async () => {
    let i = TIME;
    let num = 0;

    updateTime(TIME);
    setPoints(0);

    document.querySelector(".play").disabled = true;
    document.querySelector(".stop").disabled = false;

    hideAll();
    

    while (i > 0) {
        num = showMole();
        await sleep(SPEED);
        hideMole(num);
        await sleep(1000 - SPEED);
        i--;
        updateTime(i);  
    }

    document.querySelector(".play").disabled = false;
    document.querySelector(".stop").disabled = true;
    showAll();
    window.confirm(`Has conseguido ${document.querySelector(".points").textContent} puntos`);
	i = TIME;
    updateTime(TIME);
	setPoints(0);
}   

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const updateTime = (seconds) => {
    let count = document.querySelector(".time");

    if (seconds < 10) {
        count.innerHTML = `00:0${seconds}`;
        count.style.color = "red";
    }
    
    else {
        count.innerHTML = `00:${seconds}`;
		count.style.color = "black";
    }
}

const addPoints = () => {
    let images = document.querySelectorAll(".mole");
    let pointsElement; 
    let points;
    
    Array.from(images).forEach((element) => {
        element.addEventListener("click", () => {
            pointsElement = document.querySelector(".points");
            points = parseInt(pointsElement.innerText);
            console.log("Puntos", points);
            if (element.classList.contains("active")) {
                pointsElement.innerText = points + 10;
            }

            element.style.visibility = "hidden";
        });
    });
}

const hideAll = () => {
    let images = document.querySelectorAll(".mole");

    Array.from(images).forEach((element) => {
        element.style.visibility= "hidden";
    })
}

const showMole = () => {
    let num = Math.floor(Math.random() * 9);
    let image = document.querySelectorAll(".mole")[num];
    image.classList.add("active");
    image.style.visibility = "visible";    

    return num;
}

const showAll = () => {
    let images = document.querySelectorAll(".mole");

    for (const elem of images) {
        elem.style.visibility = "visible";  
    }
}

const hideMole = (num) => {
    let image = document.querySelectorAll(".mole")[num];
    image.classList.remove("active");
    image.style.visibility = "hidden";    
}

const setPoints = (points) => {
    let pointsElement = document.querySelector(".points");
    pointsElement.innerText = points;
}

const stop = () => {

    location.reload();
}

const init = () => {
    updateTime(TIME);
    addPoints();
}

window.onload = init;