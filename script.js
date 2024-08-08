const storyCards = document.querySelectorAll('.story-card');
let currentIndex = 0;

// Function to handle swiping between stories
function swipeStory(direction) {
    if (direction === 'left') {
        currentIndex = (currentIndex - 1 + storyCards.length) % storyCards.length;
    } else {
        currentIndex = (currentIndex + 1) % storyCards.length;
    }

    storyCards.forEach((card, index) => {
        card.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
    });
}

// Add event listeners for swiping
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;
let yDown = null;

function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
}

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            swipeStory('left');
        } else {
            swipeStory('right');
        }
    }

    xDown = null;
    yDown = null;
}
