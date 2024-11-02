
const fruits = [
    { name: 'kiwi', img: 'img/kiwi no bg.png'},
    { name: 'pear', img: 'img/file (3).png'},
    { name: 'banana', img: 'img/banana.png' },
    { name: 'watermelon', img: 'img/file (1).png' },
    { name: 'strawberry', img: 'img/file (2).png' }
];

const cutFruits = [
    { name: 'kiwi', img: 'img/kiwi no background.png' },
    { name: 'pear', img: 'img/pear no bg.png' },
    { name: 'banana', img: 'img/banana no bg.png' },
    { name: 'watermelon', img: 'img/watermelon (1).png' },
    { name: 'strawberry', img: 'img/tomato no bg.png' }
];

const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
let score = 0;
let fallenFruitsCount = 0; 
let gameActive = true;

let fruitInterval;

function startGame() {
    fruitInterval = setInterval(spawnFruit, 1000); 
}

function spawnFruit() {
    const fruitIndex = Math.floor(Math.random() * fruits.length);
    const fruit = document.createElement('img');
    fruit.className = 'fruit';
    fruit.src = fruits[fruitIndex].img;
    fruit.dataset.name = fruits[fruitIndex].name; 
    fruit.style.left = Math.random() * (gameArea.clientWidth - 50) + 'px';
    fruit.style.top = '0px'; 

    
    gameArea.appendChild(fruit);

    
    let fallInterval = setInterval(() => {
        let currentTop = parseInt(fruit.style.top);
        if (currentTop < gameArea.clientHeight - 100) {
            fruit.style.top = (currentTop + 10) + 'px'; 
        } else {
            clearInterval(fallInterval);
            gameArea.removeChild(fruit); 
            fallenFruitsCount++; 

            if (fallenFruitsCount = 1) {
                endGame(); 
            }
        }
    }, 20); 

    
    fruit.addEventListener('click', () => {
        score++;
        scoreDisplay.innerText = `High Score: 223 and Live Score: ${score}`;
        
        const cutFruit = document.createElement('img');
        cutFruit.className = 'fruit cut';
        cutFruit.src = cutFruits[fruitIndex].img; 
        cutFruit.style.left = fruit.style.left;
        cutFruit.style.top = fruit.style.top;

        gameArea.appendChild(cutFruit);
        clearInterval(fallInterval); 
        gameArea.removeChild(fruit); 

        
        setTimeout(() => {
            gameArea.removeChild(cutFruit);
        }, 1000); 
    });
}
document.addEventListener('mousemove', (event) => {
    const cursorX = event.clientX;
    const cursorY = event.clientY;

    const fruitsList = document.querySelectorAll('.fruit');
    fruitsList.forEach(fruit => {
        const fruitRect = fruit.getBoundingClientRect();
        if (
            cursorX > fruitRect.left &&
            cursorX < fruitRect.right &&
            cursorY > fruitRect.top &&
            cursorY < fruitRect.bottom
        ) {
            fruit.click(); 
        }
    });
});
function endGame() {
    gameActive = false; 
    clearInterval(fruitInterval); 
    alert("Game Over! Fruit fell without being cut!"); 
}

startGame();

