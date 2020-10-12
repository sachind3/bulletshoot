document.addEventListener('DOMContentLoaded', () => {
    const gameDisplay = document.querySelector('.game-container')
    const cannon = document.querySelector('.cannon')
    const selectColor = document.querySelectorAll('.selectColor .color')
    
    // set default app height and width
    let winWidth = window.innerWidth;
    let winHeight = window.innerHeight;
    gameDisplay.style.width = winWidth + 'px'
    gameDisplay.style.height = winHeight + 'px'    
    
    // set cannon postion
    let cannonLeft = (winWidth - 50) / 2
    let cannonBottom = 60
    
    // set multiple color array
    let colors = ['blue', 'pink', 'yellow', 'green']
    let randColor = colors[Math.floor(Math.random() * colors.length)];
    let bulletColor = randColor

    function startGame() {
        cannon.style.left = cannonLeft + 'px'
        cannon.style.bottom = cannonBottom + 'px'
    }
    let gameTimerID = setInterval(startGame, 20);

    // generate obstacles
    function generateObstacle() {
        let randomX = Math.floor(Math.random() * (winWidth - 50))
        let bgColor = colors[Math.floor(Math.random() * colors.length)];
        let obstacleLeft = randomX
        let obstacleBottom = winHeight
        const obstacle = document.createElement('div')
        obstacle.classList.add('obstacle')
        gameDisplay.appendChild(obstacle)
        obstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'
        obstacle.style.backgroundColor = bgColor
        obstacle.setAttribute('data-item', bgColor)

        function moveObstacle() {
            obstacleBottom -= 2
            obstacle.style.bottom = obstacleBottom + 'px'
            // console.log(obstacleBottom)

            if (obstacleBottom < 10) {
                clearInterval(obstacleTimerId)
                gameDisplay.removeChild(obstacle)
            }
        }

        // move obstacle top to bottom
        let obstacleTimerId = setInterval(moveObstacle, 20)

        // create every 3s obstacles
        setTimeout(generateObstacle, 3000);

    }
    generateObstacle()
  
    function generateBullets(){
        bulletColor = randColor;
        let bulletBottom = 70
        const bullet = document.createElement('div')
        bullet.classList.add('bullet')
        bullet.style.backgroundColor = bulletColor
        bullet.setAttribute('data-item', bulletColor)
        bullet.style.bottom = bulletBottom + 'px'
        cannon.appendChild(bullet)

        function shootBullet(){
            function moveBullet(){
                bulletBottom +=3
                bullet.style.bottom = bulletBottom + 'px '

                if (bulletBottom > winHeight + 30 ) {
                    clearInterval(bulletTimerId)
                    cannon.removeChild(bullet)
                }
            }
            let bulletTimerId = setInterval(moveBullet,5)
        }
        cannon.addEventListener('click',shootBullet)

         // select color from bottom container
        selectColor.forEach(function(elem){
            elem.addEventListener('click',function(){
                let newColor = this.getAttribute('data-color')
                bullet.style.backgroundColor = newColor
                bullet.setAttribute('data-item', newColor)
            })
        })
    }
    generateBullets()
    
})
