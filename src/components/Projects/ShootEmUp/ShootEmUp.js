import React, { useState, useEffect, useRef } from 'react';
import {GameManager, Player, EnemyA} from './Clases';

const _GameManager = new GameManager();

function ShootEmUp ({handleCloseGame, isGameClosed, setProject, setPressed, handleCollapse}) {

  useEffect(() => {
    console.log(isGameClosed)
  }, [isGameClosed])
  
  let isPausedRef = useRef(false);
  let isGameClosedRef = useRef(true);
  let scoreRef = useRef(0);

  const canvasRef = useRef(null);
  const [gameStarted, setGameStarted] = useState (false);
  const [togglePauseMenu, setTogglePauseMenu] = useState(false);
  const [score, setScore] = useState(scoreRef.current);
  const [isLoading, setIsLoading] = useState(true);

  //Pantalla de carga
  setTimeout(() => {
    setIsLoading(false);
  }, 1000)
  
  const startGame = () => {
    handleCloseGame(false)
    setGameStarted(true)
    isGameClosedRef.current = false;
    isPausedRef.current = false
  }

  function handleQuitGame () {
    handleCloseGame(true)
    setProject("")
    setPressed(false)
    handleCollapse(false)
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
        setTimeout(() => {
          isPausedRef.current = false;
        }, 100)
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
    let enemyAWave = 0;

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

    ///Variables declaration on first execution///
    let Player1 = new Player(canvas,c,keys);
    let asteroids = [];
    let enemiesA = [];
    let enemyBullets = [];
    
    
    ///Initialize game
    function init() {
      Player1 = new Player(canvas,c,keys);
      asteroids = [];
      enemiesA = [];
      enemyBullets = []
      enemyAWave = 0
    }

    function spawner () {
      if (Player1.scrollY >= 10 && enemyAWave === 0) {
        enemiesA.push(
          new EnemyA(500,0, canvas, c, enemyBullets),
        );
        enemyAWave += 1
      } else if (Player1.scrollY >= 50 && enemyAWave === 1) {
        enemiesA.push(
          new EnemyA(300,0, canvas, c, enemyBullets),
          new EnemyA(600,0, canvas, c, enemyBullets),
        );
        enemyAWave += 1
      } else if (Player1.scrollY >= 150 && enemyAWave === 2) {
        enemiesA.push(
          new EnemyA(100,0, canvas, c, enemyBullets),
          new EnemyA(400,0, canvas, c, enemyBullets),
          new EnemyA(700,0, canvas, c, enemyBullets),
        );
        enemyAWave += 1
      } else if (Player1.scrollY >= 300 && enemyAWave === 3) {
        enemiesA.push(
          new EnemyA(100,0, canvas, c, enemyBullets),
          new EnemyA(300,0, canvas, c, enemyBullets),
          new EnemyA(500,0, canvas, c, enemyBullets),
          new EnemyA(700,0, canvas, c, enemyBullets),
        );
        enemyAWave += 1
      }
    }
    
    ///Will draw every enemy and detect if there is a colission with bullets///
    function collissionsUpdate() {
      //Variables to handle elimination of objects
      const enemiesToRemove = [];
      const bulletsToRemove = [];
      const enemiesAtoRemove = [];

      asteroids.forEach((asteroid, index) => {
        asteroid.update();
        if (asteroid.hp <=0){
          scoreRef.current = scoreRef.current + 1
          enemiesToRemove.push(index);
        }
        // Verificar colisiones entre cada enemigo y cada bala del jugador
        for (let i = 0; i < Player1.bullets.length; i++) {
          const bullet = Player1.bullets[i];

          if(_GameManager.checkCollision(asteroid, bullet) && asteroid.hp <= 0) {
            // Si hay colisión, marcar enemigo y bala para eliminación
            //enemiesToRemove.push(index);
            bulletsToRemove.push(i);
          } else if (_GameManager.checkCollision(asteroid, bullet)){
            bulletsToRemove.push(i);
            asteroid.hp -= 1
          }
          
        }

        if(_GameManager.checkCollision(asteroid, Player1)) {
          init();
        }
        
        //Eliminar enemigos que salgan del canvas
        if (asteroid.position.y > canvas.height) {
          enemiesToRemove.push(index);
        }
      });

      enemiesA.forEach((enemyA,index) => {
        enemyA.update();
        for (let i = 0; i < Player1.bullets.length; i++) {
          const bullet = Player1.bullets[i];

          if(_GameManager.checkCollision(enemyA, bullet)) {
            enemiesAtoRemove.push(index);
            bulletsToRemove.push(i);
            scoreRef.current = scoreRef.current + 5
          }
        }
      })

      enemyBullets.forEach((enemyBullet) => {
        if(_GameManager.checkCollision(enemyBullet, Player1)) {
          init()
        }
      })

      _GameManager.eliminator(enemiesToRemove, asteroids)
      _GameManager.eliminator(bulletsToRemove, Player1.bullets)
      _GameManager.eliminator(enemiesAtoRemove, enemiesA)
    }

    ///Animation function to be called later on loop///
    function animate () {
      c.fillStyle = '#281845'
      c.fillRect(0, 0, canvas.width, canvas.height);
      
      _GameManager.updatePlayerPosition(keys, Player1, speed);
      _GameManager.spawnEnemies(asteroids, 800, 500, canvas.width - canvas.width*0.05, canvas.width*0.05, canvas, c, 2);
      _GameManager.bulletUpdator(canvas, c, enemyBullets, Player1);

      spawner()
      collissionsUpdate();
      updateScore();
      //console.log(Player1.scrollY)

    }
    
    ///Loop manager for animation loop///
    function gameLoop () {
      requestAnimationFrame(gameLoop);

      const currentTime = performance.now();
      const deltaTime = currentTime - lastFrameTime;

      if (!isPausedRef.current && !isGameClosedRef.current) {
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
      } else if (isGameClosedRef.current&&isPausedRef.current) {
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
      } else if (keyCode === 27&&!isGameClosedRef.current) {
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
    <div className='shootEmUp'>
      <div className={gameStarted? 'gameScreen' : 'gameScreen-hidden'} >
      </div>
      <div className={gameStarted || isLoading? "game-menu-hidden" : "game-menu-init"}>
        <div className='gameTitle'>Shoot'em all!</div>
        <button onClick={startGame}> - Start Game - </button>
        <button onClick={handleQuitGame}> - Quit - </button>
      </div>
      <div className={togglePauseMenu ? "pause-menu-init" : "pause-menu-hidden"}>
        <h1>PAUSED</h1>
        <button onClick={()=>handlePauseMenu("Resume")}>Resume game</button>
        <button onClick={()=>handlePauseMenu("Options")}>Options</button>
        <button onClick={()=>handlePauseMenu("Quit")}>Back to menu</button>
      </div>
        <canvas className = {gameStarted? "canvas-init" : "canvas-hidden"}ref={canvasRef} />
        <div className='score'>Score: {score}</div>
        {isLoading ? <div className="loading-screen"><span className='loader'></span></div> : null}
    </div>
  )
}

export default ShootEmUp