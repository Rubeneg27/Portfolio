import React, { useEffect, useRef } from 'react';

function ShootEmUp () {
  const canvasRef = useRef(null);

  let isPausedRef = useRef (false)

  useEffect(() => {

    //Canvas parameters
    const canvas = document.querySelector('canvas');
    const c = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;

    //Loop parameters
    let lastFrameTime = performance.now();
    let framesThisSecond = 0;
    let lastFpsUpdate = 0;
    let fps = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS; // los fps objetivo en milisegundos

    //Gameplay parameters
    let speed = 8;
    let enemySpeed1 = 3;
    let playerBulletsSpeed1 = 10;
    let playerOnCooldown = false;
    let playerAttackCooldown = 100;

    //Keys
    let keys = {
      right: {
        pressed: false,
      },
      left: {
        pressed: false,
      },
      up: {
        pressed: false,
      },
      down: {
        pressed: false,
      },
      control: {
        pressed: false
      }
    };

    //Classes
    class Player {
      constructor() {

        this.width = canvas.width / 30;
        this.height = canvas.width / 30;

        this.position = {
          x: (canvas.width/2) - (this.height/2),
          y: canvas.height - 70,
        };

       this.velocity = {
          x: 0,
          y: 0,
        };

        this.bullets = [];
        
      }
      
      ///Will draw Player
      draw() {
        //Updates Player positions
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        c.fillStyle = 'green';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
      }

      ///Defines and draws the attack action when control key is pressed///
      attack () {
        if (keys.control.pressed && !playerOnCooldown) {
          playerOnCooldown = true

          setTimeout(function() {
            playerOnCooldown = false     
          }, playerAttackCooldown)

          let shootWidth = canvas.width /50;
          let shootHeight = shootWidth;
          let shootPosX = this.position.x + this.width/2 - shootWidth/2;
          let shootPosY = this.position.y - canvas.height/30;
          c.fillStyle = 'orange'
          c.fillRect(shootPosX, shootPosY, shootWidth, shootHeight)

          this.bullets.push({
            x: shootPosX,
            y: shootPosY,
            width: shootWidth,
            height: shootHeight,
            velocity: {
              x: 0,
              y: -playerBulletsSpeed1,
            },
          });
        }
      }

      ///Updates each bullet in bullets array///
      bulletManager() {
        this.bullets.forEach((bullet, index) => {
          bullet.x += bullet.velocity.x;
          bullet.y += bullet.velocity.y;

          ///Draws each bullet in bullets
          c.fillStyle = 'orange';
          c.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

          //Destroys each bullet in bullets
          if ( bullet.y < -200) {
            this.bullets.splice(index,1)
          }
        });
      }

      ///Will update everything rellated to Player///
      update () {
        this.draw();
        this.attack();
        this.bulletManager();
      }

    }
    
    ///Enemy class///
    ///Parameters: x///Defines position of enemy in x axis
    class Enemy {
      constructor(x) {
        this.width = canvas.width / 25;
        this.height = canvas.width / 25;

        this.position = {
          x: x,
          y: 0,
        };

        this.velocity = {
          x: 0,
          y: enemySpeed1,
        };
      }

      ///Will draw Enemy 
      draw() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
      }

      ///Will draw the updated Enemy
      update () {
        this.draw();
      }

    }

    ///Variables declaration on first execution///
    let Player1 = new Player();
    let enemies = [];
    enemies.push(new Enemy(10));

    ///Updates player position///
    function updatePlayerPosition() {
      if (keys.left.pressed) {
        Player1.velocity.x = -speed;
      } else if (keys.right.pressed) {
        Player1.velocity.x = speed;
      } else {
        Player1.velocity.x = 0;
      }
    }
    
    ///Will draw every enemy and detect if there is a colission with bullets///
    function enemiesUpdate() {
      enemies.forEach((enemy, index) => {
        enemy.update();
    
        // Verificar colisiones entre cada enemigo y cada bala del jugador
        for (let i = 0; i < Player1.bullets.length; i++) {
          const bullet = Player1.bullets[i];
    
          if (
            enemy.position.x < bullet.x + bullet.width &&
            enemy.position.x + enemy.width > bullet.x &&
            enemy.position.y + enemy.height > bullet.y
          ) {
            // Si hay colisión, elimina el enemigo y la bala
            enemies.splice(index, 1);
            Player1.bullets.splice(i, 1);
    
            // Decrementa el valor de 'i' para evitar saltarse una bala después de la eliminación
            i--;
          }
        }
      });
    }

    ///Animation function to be called later on loop///
    function animate () {
      c.fillStyle = '#281845'
      c.fillRect(0, 0, canvas.width, canvas.height);
      
      updatePlayerPosition();
      Player1.update();
      enemiesUpdate();
    }

    
    ///Loop manager for animation loop///
    function gameLoop () {
      requestAnimationFrame(gameLoop);

      const currentTime = performance.now();
      const deltaTime = currentTime - lastFrameTime;

      if (!isPausedRef.current) {
        if (deltaTime >= frameInterval) { // Si el tiempo que tardó el proceso es mayor o igual
          lastFrameTime = currentTime - (deltaTime % frameInterval);
          animate();
    
          // Cálculo de FPS
          framesThisSecond++;
          if (currentTime > lastFpsUpdate + 1000) {
            fps = framesThisSecond;
            framesThisSecond = 0;
            lastFpsUpdate = currentTime;
            console.log(`FPS: ${fps}`);
          }
        }
      }
    }

    gameLoop();
    
    //Controller's logic
    const handleKeyDown = (e) => {
      const {keyCode} = e
      if (keyCode === 37) {
        e.preventDefault()
        keys.left.pressed = true; 
      } else if (keyCode === 39) {
        e.preventDefault()
        keys.right.pressed = true;
      } else if (keyCode === 17) {
        e.preventDefault()
        keys.control.pressed = true
        // console.log('down')
      }
    }
    
    const handleKeyUp = (e) => {
      const {keyCode} = e
      if (keyCode === 37) {
        keys.left.pressed = false; 
      } else if (keyCode === 39) {
        keys.right.pressed = false;
      } else if (keyCode === 17) {
        e.preventDefault()
        keys.control.pressed = false
        // console.log('down')
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }

  })
  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}

export default ShootEmUp