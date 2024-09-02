const boardLen = 15, HUNDRED = 100, oneSecond = 1000;
let linePlane = boardLen - 1, colPlane = linePlane / 2;
let randomNoOfObjects = Math.floor(Math.random() * boardLen + 1);
let colObject = [], lineObj = 0;
let distroyedObjects = 0;
let lineShot = -1;

function addStrangeObjects() {
    let i = 0;
    while (i < randomNoOfObjects) {
        let duplicateFound = 0;
        let newRandomEl = Math.floor(Math.random() * boardLen);
        for (let j = 1; j <= i; ++j) {
            if (newRandomEl == colObject[j]) {
                duplicateFound = 1;
            }
        }
        if (duplicateFound == 0) {
            colObject[++i] = newRandomEl;
        }
        console.log("randomNoOfObjects: " + randomNoOfObjects + " " + colObject[i]);
    }
}

addStrangeObjects();

function generateButtons() {
    for (let i = 0; i < boardLen; ++i) {
        for (let j = 0; j < boardLen; ++j) {
            const button = document.createElement("button");
            button.type = "button";
            button.id = i * HUNDRED + j;
            button.innerText = '-';
            document.body.appendChild(button);    
            if (i == boardLen - 1 && j == i / 2) {
                button.style.backgroundColor = "green";
            }
            for (let k = 1; k <= randomNoOfObjects; ++k) {
                if (i == 0 && j == colObject[k]) {
                button.style.backgroundColor = "red";
                }
            }
            if (j == boardLen - 1 ) {
                document.body.appendChild(document.createElement("br"));
            }
        }  
    } 
}

generateButtons();

function startStopWatch() {
    document.getElementById('Score-text').innerHTML = '0';
    setInterval(moveAirplaneUp, oneSecond);
    setInterval(moveObjectDown, oneSecond);
}

function moveAirplaneUp() {
    for (let i = 1; i <= randomNoOfObjects; ++i) {
        if (linePlane == lineObj && colPlane == colObject[i]) {
            return;
        }
    }
    if (linePlane >= 0) {
        --linePlane;
        const airplane = document.getElementById(linePlane * HUNDRED + colPlane);
        airplane.style.backgroundColor = "green";
        const prevAirplane = document.getElementById((linePlane + 1) * HUNDRED + colPlane);
        prevAirplane.style.backgroundColor = "gray";
    }
}

function moveObjectDown() {
    for (let i = 1; i <= randomNoOfObjects; ++i) {
        if (colPlane == colObject[i] && linePlane == lineObj) {
            return;
        }
        const strangeObject = document.getElementById(lineObj * HUNDRED + colObject[i]);
        strangeObject.style.backgroundColor = "red";
        if (lineObj > 0) {
            const prevObject = document.getElementById((lineObj - 1) * HUNDRED + colObject[i]);
            prevObject.style.backgroundColor = "gray";
        }   
    }
    ++lineObj;
    document.getElementById('Score-text').innerHTML = distroyedObjects;  
}

function removeObject(x) {
    for (let i = 1; i <= randomNoOfObjects; ++i) {
        if (x == colObject[i]) {
            for (let j = i; j <= randomNoOfObjects; ++j) {
                colObject[j] = colObject[j + 1];
            } 
            --randomNoOfObjects;
            if (linePlane > lineObj) {
                ++distroyedObjects;
            }
        }
    }
}

function airplaneMovesLeftRightShots() {
    const input = document.querySelector("input");
    const log = document.getElementById("log");
    input.addEventListener("keydown", checkKey);

    function checkKey(e) {
        textContent = e.code;
        let arrowIndicator;
        lineShot = linePlane - 1;
        if (textContent == "ArrowRight") {
            arrowIndicator = -1;
            ++colPlane;
        } else if (textContent == "ArrowLeft") {
            arrowIndicator = 1;
            --colPlane;
        } else if (textContent == "ArrowUp") {
            for (lineShot = linePlane - 1; lineShot >= 0; --lineShot) {
                const shot = document.getElementById(lineShot * HUNDRED + colPlane);
                shot.style.backgroundColor = "yellow";
            }
            removeObject(colPlane);
            console.log("coloana proiectilului e: " + colPlane);
            console.log("distroyedObjects: " + distroyedObjects);
        }
        const airplane = document.getElementById(linePlane * HUNDRED + colPlane);
        airplane.style.backgroundColor = "green";
        const prevAirplane = document.getElementById(linePlane * HUNDRED + colPlane + arrowIndicator);
        prevAirplane.style.backgroundColor = "gray"; 

    }
}

airplaneMovesLeftRightShots();
