const MAX_SQUARES_PER_SIDE = 100;
const MAX_CONTAINER_WIDTH = 500;

// Grid settings
let squaresPerSide = 25;
let borderThickness = 1;
let totalBorderSpacePerSide = borderThickness * (squaresPerSide + 1);
let totalSquareSpacePerSide = MAX_CONTAINER_WIDTH - totalBorderSpacePerSide;
let containerWidth = totalBorderSpacePerSide + totalSquareSpacePerSide;
let squareSize = totalSquareSpacePerSide / squaresPerSide;
let squareColor = 'black';
// Container properties
const squareDivsContainer = document.querySelector('#square-divs-container');
squareDivsContainer.style.width = `${containerWidth}px`;
squareDivsContainer.style.height = `${containerWidth}px`;
squareDivsContainer.style.fontSize = 0;

let x, y;
x = y = squaresPerSide;
// Draw grid
for (let i = 0; i < y; i++) {
    for (let j = 0; j < x; j++) {
        const newDiv = document.createElement('div');
        newDiv.style.border = `solid black`;
        newDiv.style.height = `${squareSize}px`;
        newDiv.style.width = `${squareSize}px`;
        newDiv.style.display = 'inline-block';
        squareDivsContainer.appendChild(newDiv);

        // Squares that are not located at right edge, bottom edge, or bottom right corner
        if (i !== y - 1 && j !== x - 1) {
            newDiv.style.borderWidth = `${borderThickness}px 0 0 ${borderThickness}px`;
        } // Right edge squares (exclude bottom right corner)
        else if (i !== y - 1 && j === x - 1) {
            newDiv.style.borderWidth = `${borderThickness}px ${borderThickness}px 0 ${borderThickness}px`;
        } // Bottom edge squares (exclude bottom right corner)
        else if (i === y - 1 && j !== x - 1) {
            newDiv.style.borderWidth = `${borderThickness}px 0 ${borderThickness}px ${borderThickness}px`;
        } // Bottom right corner square
        else {
            newDiv.style.borderWidth = `${borderThickness}px`;
        }

        // Add "hover" effect to square
        newDiv.addEventListener('mouseover', (e) => newDiv.style.backgroundColor = `${squareColor}`);
    }
}

// Change Canvas Resolution button
const resBtn = document.querySelector('#resolution-btn');
resBtn.addEventListener('click', (e) => {
    squaresPerSide = prompt('How many squares per side? (Max 100)');
});