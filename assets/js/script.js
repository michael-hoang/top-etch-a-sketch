// Grid dimension
let x = 16;
let y = 16;
let squareHeight = 25;
let squareWidth = 25;
let borderThickness = 1;


const squareDivsContainer = document.querySelector('#square-divs-container');
squareDivsContainer.style.height = `${(squareHeight + borderThickness) * y + borderThickness}px`;
squareDivsContainer.style.width = `${(squareWidth + borderThickness) * y + borderThickness}px`;
squareDivsContainer.style.fontSize = 0;

for (let i = 0; i < y; i++) {
    for (let j = 0; j < x; j++) {
        const newDiv = document.createElement('div');
        newDiv.style.border = `solid black`;
        // Set initial border thickness of squares
        newDiv.style.borderWidth = `${borderThickness}px 0 0 ${borderThickness}px`;
        newDiv.style.height = `${squareHeight}px`;
        newDiv.style.width = `${squareWidth}px`;
        newDiv.style.display = 'inline-block';
        squareDivsContainer.appendChild(newDiv);

        // Right edge squares (exclude bottom right corner)
        if (i !== y - 1 && j === x - 1) {
            newDiv.style.borderWidth = `${borderThickness}px ${borderThickness}px 0 ${borderThickness}px`;
        } // Bottom edge squares (exclude bottom right corner)
        else if (i === y - 1 && j !== x - 1) {
            newDiv.style.borderWidth = `${borderThickness}px 0 ${borderThickness}px ${borderThickness}px`;
        } // Bottom right corner square
        else if (i === y - 1 && j === x - 1) {
            newDiv.style.borderWidth = `${borderThickness}px`
        }
    }
}
