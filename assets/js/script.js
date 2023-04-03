const MAX_SQUARES_PER_SIDE = 100;
const CONTAINER_WIDTH = 600;
const BORDER_THICKNESS = 1;

//HTML Objects
const gridSizeInput = document.querySelector('#grid-size-entry');
const rgbBtn = document.querySelector('#rgb-btn');
const refreshBtn = document.querySelector('#refresh-btn');

// Container properties
const squareDivsContainer = document.querySelector('#square-divs-container');
squareDivsContainer.style.width = `${CONTAINER_WIDTH}px`;
squareDivsContainer.style.height = `${CONTAINER_WIDTH}px`;
squareDivsContainer.style.fontSize = 0;

// Grid settings
let borderColor = 'rgb(210, 210, 210)'; // light gray
let blankSquareColor = 'rgb(235, 235, 235)'; // off white
let defaultSquareColor = 'rgb(60, 60, 60)'; // off black
let squaresPerSide = 10;
let rgbModeOn = rgbBtn.classList.contains('rgb-mode-on')

// Functions
function calculateSquareSize() {
    let totalBorderSpacePerSide = BORDER_THICKNESS * (squaresPerSide + 1);
    let totalSquareSpacePerSide = CONTAINER_WIDTH - totalBorderSpacePerSide;
    return totalSquareSpacePerSide / squaresPerSide;
}

function drawGrid() {
    let squareSize = calculateSquareSize();
    let x, y;
    x = y = squaresPerSide;
    for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
            const newDiv = document.createElement('div');
            newDiv.style.border = `solid black`;
            newDiv.style.borderColor = borderColor;
            newDiv.style.backgroundColor = blankSquareColor;
            newDiv.style.height = `${squareSize}px`;
            newDiv.style.width = `${squareSize}px`;
            newDiv.style.display = 'inline-block';
            squareDivsContainer.appendChild(newDiv);

            // Squares that are not located at right edge, bottom edge, or bottom right corner
            if (i !== y - 1 && j !== x - 1) {
                newDiv.style.borderWidth = `${BORDER_THICKNESS}px 0 0 ${BORDER_THICKNESS}px`;
            } // Right edge squares (exclude bottom right corner)
            else if (i !== y - 1 && j === x - 1) {
                newDiv.style.borderWidth = `${BORDER_THICKNESS}px ${BORDER_THICKNESS}px 0 ${BORDER_THICKNESS}px`;
            } // Bottom edge squares (exclude bottom right corner)
            else if (i === y - 1 && j !== x - 1) {
                newDiv.style.borderWidth = `${BORDER_THICKNESS}px 0 ${BORDER_THICKNESS}px ${BORDER_THICKNESS}px`;
            } // Bottom right corner square
            else {
                newDiv.style.borderWidth = `${BORDER_THICKNESS}px`;
            }

            // Add "hover" effect to square
            newDiv.addEventListener('mouseover', (e) => {
                if (!rgbModeOn) {
                    newDiv.style.backgroundColor = `${defaultSquareColor}`;
                } else if (isDefaultOrBlankSquareColor(newDiv)) {
                    randomColor = generateRandomColor();
                    newDiv.style.backgroundColor = randomColor;
                    storeBlackLevelSteps(newDiv)
                } else {
                    darken(newDiv);
                }
            });
        }
    }
}

function eraseGrid() {
    while (squareDivsContainer.firstChild) {
        squareDivsContainer.removeChild(squareDivsContainer.firstChild);
    }
}

function updateSquaresPerSide() {
    let newGridSize = gridSizeInput.value
    if (!isNaN(newGridSize) && newGridSize > 0 && newGridSize <= 100 && newGridSize % 1 === 0) {
        newGridSize = newGridSize * 1; // * 1 converts "number" string to number
        squaresPerSide = newGridSize;
    } else {
        gridSizeInput.style.backgroundColor = 'rgba(255, 99, 71, 0.5)' // tomato color
    }
}

function generateRandomColor() {
    let hexadecimal = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        let randomIndex = Math.floor(Math.random() * 16);
        color += hexadecimal[randomIndex];
    }
    return color;
}

function isDefaultOrBlankSquareColor(squareDiv) {
    let currentSquareColor = squareDiv.style.backgroundColor;
    if (currentSquareColor === defaultSquareColor || currentSquareColor === blankSquareColor) return true;
    return false;
}

function getRgbArray(squareDiv) {
    currentSquareColor = squareDiv.style.backgroundColor;
    let r = /\d+/.exec(currentSquareColor)[0] * 1;
    let g = /, \d+/.exec(currentSquareColor)[0].slice(2) * 1;
    let b = /\d+\)/.exec(currentSquareColor)[0].slice(0, -1) * 1;
    return [r, g, b];
}

function storeBlackLevelSteps(squareDiv) {
    rgbArray = getRgbArray(squareDiv);
    rBl = rgbArray[0] / 10;
    gBl = rgbArray[1] / 10;
    bBl = rgbArray[2] / 10;
    squareDiv.setAttribute('red', rBl);
    squareDiv.setAttribute('green', gBl);
    squareDiv.setAttribute('blue', bBl);
}

function getBlackLevelStepsArray(squareDiv) {
    rBl = squareDiv.getAttribute('red') * 1;
    gBl = squareDiv.getAttribute('green') * 1;
    bBl = squareDiv.getAttribute('blue') * 1;
    return [rBl, gBl, bBl];
}

function darken(squareDiv) {
    blackLevelsArray = getBlackLevelStepsArray(squareDiv)
    currentRgbArray = getRgbArray(squareDiv)
    darkerRed = currentRgbArray[0] - blackLevelsArray[0];
    darkerGreen = currentRgbArray[1] - blackLevelsArray[1];
    darkerBlue = currentRgbArray[2] - blackLevelsArray[2];
    squareDiv.style.backgroundColor = `rgb(${darkerRed}, ${darkerGreen}, ${darkerBlue})`;
}

// Grid size input
gridSizeInput.value = squaresPerSide;
gridSizeInput.addEventListener('focus', (e) => {
    gridSizeInput.select()
    gridSizeInput.style.backgroundColor = 'rgb(240, 240, 240)'
});
gridSizeInput.addEventListener('focusout', (e) => {
    if (gridSizeInput.value === '') {
        gridSizeInput.value = squaresPerSide;
    }
});

// RGB Mode button
rgbBtn.addEventListener('click', (e) => {
    if (!rgbModeOn) {
        rgbBtn.classList.add('rgb-mode-on');
        rgbModeOn = true;
    } else {
        rgbBtn.classList.remove('rgb-mode-on');
        rgbModeOn = false;
    }
});

// Refresh button
refreshBtn.addEventListener('click', (e) => {
    updateSquaresPerSide();
    eraseGrid();
    drawGrid();
});

drawGrid();