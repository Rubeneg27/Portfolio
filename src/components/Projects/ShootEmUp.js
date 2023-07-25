import React, { useState, useEffect, useRef } from 'react';

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
        
      }

      draw() {
        c.fillStyle = 'green';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
      }

      update () {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
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
          y: 9,
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

    //Variables declaration on first execution
    let Player1 = new Player();

    let Enemy1 = new Enemy();

    //Update player position 
    function updatePlayerPosition() {
      if (keys.left.pressed) {
        Player1.velocity.x = -speed;
      } else if (keys.right.pressed) {
        Player1.velocity.x = speed;
      } else {
        Player1.velocity.x = 0;
      }
    }
    
    //Animation function to be called every ms
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
        keys.left.pressed = true; 
      } else if (keyCode === 39) {
        keys.right.pressed = true;
      }
    }
    
    const handleKeyUp = (e) => {
      const {keyCode} = e
      if (keyCode === 37) {
        keys.left.pressed = false; 
      } else if (keyCode === 39) {
        keys.right.pressed = false;
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