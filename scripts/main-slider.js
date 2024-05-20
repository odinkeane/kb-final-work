const mainSliderElements = document.querySelectorAll('.main-slider-element');

function mainSliderChange(positions) {
    for (let i = 0; i < 3; i++) {
        if (positions[i] != 0) {
            mainSliderElements[i].style.opacity = 0;
        } else {
            mainSliderElements[i].style.opacity = 1;
        }
    }
    mainSliderElements[0].style.left = positions[0] + '%';
    mainSliderElements[1].style.left = positions[1] + '%';
    mainSliderElements[2].style.left = positions[2] + '%';

}

function left(positions) {
    const newpositions = [positions[2], positions[0], positions[1]];
    return newpositions;
}

function changePosition(variant) {
    switch (variant) {
        case 0:
            positions = [0, 200, -200]
            break;
        case 1:
            positions = [-200, 0, 200]
            break;
        case 2:
            positions = [200, -200, 0]
            break;
        default:
            break;
    }
    clearInterval(interval);
    mainSliderChange(positions);
    interval = setInterval(() => {
        positions = left(positions)
        mainSliderChange(positions);
    }, 5000);
}


let positions = [0, 200, -200];
mainSliderChange(positions)
let interval = setInterval(() => {
    positions = left(positions)
    mainSliderChange(positions);
}, 5000)