function mouseOver(target, color) {
    if (target.style.backgroundColor != '') {
        colorValues = target.style.backgroundColor.match(/\d+/g);
        target.style.backgroundColor = 'rgb(' +
            Math.floor(colorValues[0] * .8) + ', ' +
            Math.floor(colorValues[1] * .8) + ', ' +
            Math.floor(colorValues[2] * .8) + ')';
    } else {
        target.style.backgroundColor = color;
    }
}

// Generates a random color and its opposing color
function randomColor() {
    const colorValues = [];

    for (let i = 0; i < 3; i++) {
        colorValues.push(Math.floor(Math.random() * 256));
    }
    
    let color = 'rgb(' +
        colorValues[0] + ', ' +
        colorValues[1] + ', ' +
        colorValues[2] + ')';

    let opposingColor = 'rgb(' +
        (255 - colorValues[0]) + ', ' +
        (255 - colorValues[1]) + ', ' +
        (255 - colorValues[2]) + ')';

    return [color, opposingColor];
}

// Prompts the user to enter a number between 1 and 100.
// Then creates a new grid of that size
function sizePrompt() {
    const alertBox = document.getElementById('alert');
    let size = prompt("Enter a size for your new grid (1-100)");

    if (size != null) {
        // If the input is not valid an alert message is displayed
        if (isNaN(size) || size < 1 || size > 100) {
            alertBox.style.visibility = 'visible';
        } else {
            createGrid(size);
        }
    }
}

function createGrid(size, fadeIn) {
    while (mainContainer.firstChild) {
        mainContainer.removeChild(mainContainer.lastChild);
    }

    // Selects a random rgb color and changes the page elements to match
    const colors = randomColor();

    for (let i = 0; i < size * size; i++) {
        let newDiv = document.createElement('div');
        newDiv.classList.add('square');
        newDiv.style.width = (800 / size) + 'px';
        newDiv.style.height = (800 / size) + 'px';
        newDiv.addEventListener('mouseover', function(e){
            mouseOver(e.target, colors[0]);
        });

        mainContainer.appendChild(newDiv);
    }
}

// Applies a shaking animation to the main grid and a falling animation to each square
// A new grid with the same dimensions is created after the animation completes
function shakeGrid() {
    const shakeButton = document.getElementById('shake-button');
    shakeButton.setAttribute('disabled', '');
    mainContainer.classList.add("shake");
    let children = mainContainer.children;
    const touchedSquares = [];

    for (let i = 0; i < children.length; i++) {
        if (children[i].style.backgroundColor != '') {
            touchedSquares.push(children[i]);
        }
    }
    
    for (let i = touchedSquares.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let k = touchedSquares[i];
        touchedSquares[i] = touchedSquares[j];
        touchedSquares[j] = k;
    }

    let delayIncrement = 2 / touchedSquares.length;
    let delay = delayIncrement;
    for (let i = 0; i < touchedSquares.length; i++) {
        if (Math.random() * 2 > 1) {
            touchedSquares[i].style.animation = "pop-left 1s";
            touchedSquares[i].style.animationFillMode = "forwards";
        } else {
            touchedSquares[i].style.animation = "pop-right 1s";
            touchedSquares[i].style.animationFillMode = "forwards";
        }

        touchedSquares[i].style.animationDelay = delay + 's';
        delay += delayIncrement;
    }

    setTimeout(function () {
        createGrid(Math.sqrt(children.length));
        mainContainer.classList.remove("shake");
        shakeButton.removeAttribute('disabled');
    }, 2500);
}

const mainContainer = document.getElementById('main-container');
createGrid(60);