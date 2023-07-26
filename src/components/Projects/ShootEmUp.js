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
      
      draw() {
        c.fillStyle = 'green';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
      }

      attack () {
        if (keys.control.pressed) {
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
              y: -speed,
            },
          });

          console.log(this.bullets)
        }
      }

      destroyBullet() {
        this.bullets.forEach((bullet, index) => {
          
        })
      }

      update () {

        //Draw Player
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.draw();
        this.attack();
        
        // Update each bullet in bullets array
        this.bullets.forEach((bullet, index) => {
          bullet.x += bullet.velocity.x;
          bullet.y += bullet.velocity.y;

          ///Draw each bullet in bullets
          c.fillStyle = 'orange';
          c.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

          //Destroy each bullet in bullets
          if ( bullet.y < -200) {
            this.bullets.splice(index,1)
          }
        });
      }

    }

    class Enemy {
      constructor() {

        this.width = canvas.width / 25;
        this.height = canvas.width / 25;

        this.position = {
          x: (canvas.width/2) - (this.height/2),
          y: 0,
        };

       this.velocity = {
          x: 0,
          y: 3,
        };
        
      }

      draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
      }

      update () {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
      }

    }

    ///Variables declaration on first execution///
    let Player1 = new Player();

    let Enemy1 = new Enemy();

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
    
    ///Animation function to be called every ms///
    function animate () {

      c.fillStyle = '#281845'
      c.fillRect(0, 0, canvas.width, canvas.height);
      
      updatePlayerPosition();

      Player1.update();

      Enemy1.update();
    }

    
    //Loop manager for animation loop
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