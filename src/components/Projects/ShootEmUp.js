import React, { useState, useEffect, useRef } from 'react';

function ShootEmUp () {
  let isPausedRef = useRef(false);
  let isGameClosedRef = useRef(true); 
  let scoreRef = useRef(0)

  const canvasRef = useRef(null);
  const [gameStarted, setGameStarted] = useState (false);
  const [togglePauseMenu, setTogglePauseMenu] = useState(false);
  const [score, setScore] = useState(scoreRef.current)

  const startGame = () => {
    setGameStarted(true)
    isGameClosedRef.current = false;
    isPausedRef.current = false
    console.log(`Game started: ${gameStarted}`);
  }

  const handlePauseMenu = (e) => {
    switch (e) {
      case "Resume":
        setTogglePauseMenu(false);
        isPausedRef.current = false
        break;
      case "Options":
        break;
      case "Quit":
        setTogglePauseMenu(false);
        setGameStarted(false);
        isGameClosedRef.current = true;
        break;
      default:
        console.log("Nada seleccionado")
    }
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      const {keyCode} = event
      if (keyCode === 27 && gameStarted) {
        event.preventDefault();
        setTogglePauseMenu(!togglePauseMenu);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };


  }, )

  function updateScore() {
    setScore(scoreRef.current)
  }

  useEffect(() => {

    //Canvas parameters
    const canvas = document.querySelector('canvas');
    const c = canvas.getContext('2d');
    canvas.width = 1024;
    canvas.height = 768;

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
    let enemyBulletSpeed1 = 2 * enemySpeed1;
    let playerOnCooldown = false;
    let playerAttackCooldown = 100;
    let enemyOnCoolDown = false;
    let enemyAttackOnCoolDown = 900;
    //Spawn parameters
    let spawnCooldown = false
    let spawnTimeMin = 500
    let spawnTimeMax = 800
    let spawnPosXMin = canvas.width*0.05
    let spawnPosXMax = canvas.width - canvas.width*0.05
    let spawnTime
    let spawnPosX

    //Keys
    let keys = {
      right: {
        pressed: false
      },
      left: {
        pressed: false
      },
      up: {
        pressed: false
      },
      down: {
        pressed: false
      },
      control: {
        pressed: false
      },
      esc: {
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
    class Asteroid {
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

    class EnemyA {
      constructor(x,y) {
        this.width = canvas.width / 25;
        this.height = canvas.width / 25;

        this.position = {
          x: x,
          y: y,
        };

        this.velocity = {
          x: 0,
          y: enemySpeed1/2,
        };

        this.bullets = [];
      }

      shoot () {
        if (!enemyOnCoolDown) {
          enemyOnCoolDown = true

          setTimeout(function() {
            enemyOnCoolDown = false     
          }, enemyAttackOnCoolDown)

          let shootWidth = canvas.width /50;
          let shootHeight = shootWidth;
          let shootPosX = this.position.x + this.width/2 - shootWidth/2;
          let shootPosY = this.position.y + canvas.height/10;
          c.fillStyle = 'white'
          c.fillRect(shootPosX, shootPosY, shootWidth, shootHeight)

          this.bullets.push({
            x: shootPosX,
            y: shootPosY,
            width: shootWidth,
            height: shootHeight,
            velocity: {
              x: 0,
              y: enemyBulletSpeed1,
            },
          });
        }  
      }

      bulletManager() {
        let bulletsToRemove = [];

        this.bullets.forEach((bullet, index) => {
          bullet.x += bullet.velocity.x;
          bullet.y += bullet.velocity.y;
          ///Draws each bullet in bullets
          c.fillStyle = 'orange';
          c.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

          //Destroys each bullet in bullets
          if ( bullet.y > canvas.height) {
            bulletsToRemove.push(index)
          }
          for (let i = bulletsToRemove.length - 1; i >= 0; i--) {
            const bulletIndex = bulletsToRemove[i];
            this.bullets.splice(bulletIndex, 1);
          }
        });
      }

      draw() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        c.fillStyle = 'purple';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
      }

      update() {
        this.draw();
        this.shoot();
        this.bulletManager();
      }
      
    }
    
    ///Variables declaration on first execution///
    let Player1 = new Player();
    let asteroids = [];
    let enemyShootA = new EnemyA(300,0);

    ///Spawn enemies at random time in random position when the cooldown is false///
    ///Variables///
    ///spawnCooldown: When true, enemies doesn't appear///
    ///spawnTime: Random number for spawning time///
    ///spawnPosX: Random number for position in x axis///
    function spawnEnemies () {
      if (!spawnCooldown) {
        spawnTime = Math.floor(Math.random() * (spawnTimeMax - spawnTimeMin + 1)) + spawnTimeMin;
        spawnPosX = Math.floor(Math.random() * (spawnPosXMax - spawnPosXMin + 1)) + spawnPosXMin;
        spawnCooldown = true

        setTimeout(function () {
        asteroids.push(new Asteroid(spawnPosX))  
        spawnCooldown = false
      }, spawnTime)
      }
      
    }
    
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
      const enemiesToRemove = [];
      const bulletsToRemove = [];
    
      asteroids.forEach((enemy, index) => {
        enemy.update();
    
        // Verificar colisiones entre cada enemigo y cada bala del jugador
        for (let i = 0; i < Player1.bullets.length; i++) {
          const bullet = Player1.bullets[i];
    
          if (
            enemy.position.x < bullet.x + bullet.width &&
            enemy.position.x + enemy.width > bullet.x &&
            enemy.position.y + enemy.height > bullet.y
          ) {
            // Si hay colisión, marcar enemigo y bala para eliminación
            enemiesToRemove.push(index);
            bulletsToRemove.push(i);
            scoreRef.current = scoreRef.current + 1
            console.log(scoreRef.current)
          }
        }
    
        if (enemy.position.y > canvas.height) {
          enemiesToRemove.push(index);
        }
      });
    
      // Eliminar enemigos y balas marcados para eliminación
      for (let i = enemiesToRemove.length - 1; i >= 0; i--) {
        const enemyIndex = enemiesToRemove[i];
        asteroids.splice(enemyIndex, 1);
      }
    
      for (let i = bulletsToRemove.length - 1; i >= 0; i--) {
        const bulletIndex = bulletsToRemove[i];
        Player1.bullets.splice(bulletIndex, 1);
      }
    }

    ///Will initialize parameters when neccesary
    function init() {
      Player1 = new Player();
      asteroids = [];
    }

    ///Animation function to be called later on loop///
    function animate () {
      c.fillStyle = '#281845'
      c.fillRect(0, 0, canvas.width, canvas.height);
      
      updatePlayerPosition();
      Player1.update();
      spawnEnemies();
      enemiesUpdate();
      enemyShootA.update();
      updateScore();
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
      }  else if (isGameClosedRef.current) {
        init()
        console.log("Init")
      }
    }

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
      } else if (keyCode === 27) {
        e.preventDefault()
        keys.esc.pressed = true;
        isPausedRef.current = !isPausedRef.current
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
      } else if (keyCode === 27) {
        e.preventDefault()
        keys.esc.pressed = false;
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp);

    gameLoop();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }

  }, [])
  return (
      <div className={gameStarted? 'gameScreen' : 'gameScreen-hidden'} >
      <div className={gameStarted ? "game-menu-hidden" : "game-menu-init"}>
        <div>Super Awesome Javascript action Platformer!!</div>
        <button onClick={startGame}>Start</button>
      </div>
      <div className={togglePauseMenu ? "pause-menu-init" : "pause-menu-hidden"}>
        <h1>PAUSED</h1>
        <button onClick={()=>handlePauseMenu("Resume")}>Resume</button>
        <button onClick={()=>handlePauseMenu("Options")}>Options</button>
        <button onClick={()=>handlePauseMenu("Quit")}>Quit</button>
      </div>
        <div className='score'>Score: {score}</div>
        <canvas className = {gameStarted? "canvas-init" : "canvas-hidden"}ref={canvasRef} />
      </div>
  )
}

export default ShootEmUp