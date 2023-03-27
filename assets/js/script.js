const MAX_SQUARES_PER_SIDE = 100;
const CONTAINER_WIDTH = 600;
const BORDER_THICKNESS = 1;

// Container properties
const squareDivsContainer = document.querySelector('#square-divs-container');
squareDivsContainer.style.width = `${CONTAINER_WIDTH}px`;
squareDivsContainer.style.height = `${CONTAINER_WIDTH}px`;
squareDivsContainer.style.fontSize = 0;

// Grid settings
let blankSquareColor = 'rgb(210, 210, 210)';
let defaultSquareColor = 'rgb(60, 60, 60)';
let squaresPerSide = 10;

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
            newDiv.style.borderColor = blankSquareColor;
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
            newDiv.addEventListener('mouseover', (e) => newDiv.style.backgroundColor = `${defaultSquareColor}`);
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
        newGridSize = newGridSize * 1; // * 1 converts number string to number
        squaresPerSide = newGridSize;
    } else {
        gridSizeInput.style.backgroundColor = 'rgba(255, 99, 71, 0.5)'
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


// Grid size input
const gridSizeInput = document.querySelector('#grid-size-entry');
gridSizeInput.value = squaresPerSide;
gridSizeInput.addEventListener('focus', (e) => {
    gridSizeInput.select()
    gridSizeInput.style.backgroundColor = 'rgb(240, 240, 240)'
})
gridSizeInput.addEventListener('focusout', (e) => {
    if (gridSizeInput.value === '') {
        gridSizeInput.value = squaresPerSide;
    }
})

// Refresh button
const refreshBtn = document.querySelector('#refresh-btn');
refreshBtn.addEventListener('click', (e) => {
    updateSquaresPerSide();
    eraseGrid();
    drawGrid();
});

drawGrid();