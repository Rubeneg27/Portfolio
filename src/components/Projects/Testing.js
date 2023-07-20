import React, { useState, useEffect, useRef } from 'react';


function Platformer() {
  
  const [gameStarted, setGameStarted] = useState (false);
  const [togglePauseMenu, setTogglePauseMenu] = useState(false);
  
  const startGame = () => {
    setGameStarted(!gameStarted)
    console.log(`Game started: ${gameStarted}`);
  }

  const handlePauseMenu = (e) => {
    switch (e) {
      case "Resume":
        setTogglePauseMenu(false)
        console.log("Resume")
        break;
      case "Options":
        break;
      case "Quit":
        setGameStarted(false);
        break;
      default:
        setGameStarted(true);
    }
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      const {keyCode} = event
      if (keyCode === 27 && gameStarted) {
        event.preventDefault();
        setTogglePauseMenu(!togglePauseMenu);
        console.log(`Pause menu: ${togglePauseMenu}`)
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };


  }, [togglePauseMenu, gameStarted])

  const canvasRef = useRef(null);

  useEffect(() => {
    if (gameStarted) {
      const canvas = document.querySelector('canvas')
    const c = canvas.getContext('2d');
    //Canvas
    canvas.width = 800; // Alteramos las propiedades de canvas con JS. Podríamos hacerlo con CSS
    canvas.height = 600;
    let platformWidth = canvas.width / 9.7;
    let platformHeight = canvas.width / 48;
    let gravity = canvas.height/450;
    //Variables para el movimiento del personaje
    let onPlatform = false;
    let jumped = false;
    let doubleJumped = false;
    let scrollOffSet = 0;
    let speed = canvas.width/130;
    let isPaused = false;
    //Variables para plataformas
    var platforms = [];
    // Variables para el bucle del juego
    let lastFrameTime = performance.now();
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS; //los fps objetivo en milisegundos

    class Player {
      constructor() {
        this.position = {
          x: canvas.width / 19.2,
          y: canvas.width / 1.5,
        };
        this.velocity = {
          x: 0,
          y: 0,
        };
        this.health = 1000;
        this.width = canvas.width / 48;
        this.height = canvas.width / 48;
      }

      draw() {
        c.fillStyle = 'green';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
      }

      update() {
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        if (
          this.position.y + this.height + this.velocity.y < canvas.height &&
          onPlatform === false
        ) {
          this.velocity.y += gravity;
        } else if (
          this.position.y + this.height + this.velocity.y < canvas.height &&
          onPlatform === true
        ) {
          this.velocity.y += gravity;
        }
      }
    }

    class Platform {
      constructor(x, y) {
        this.position = {
          x: x,
          y: y,
        };
        this.width = canvas.width / 9.6; //Puedo establecer el ancho como this.image.width
        this.height = canvas.width / 48;
        //this.image = image
      }

      draw() {
        c.fillStyle = 'purple';
        c.fillRect(this.position.x, this.position.y, this.width, this.height); //Método para dibujar al personaje
      }
    }

        
    function FloorGenerator(n) {
      platforms = [];
      var position = -platformWidth;
      for (let i = 0; i < n; i++) {
        platforms.push(new Platform(position=position+platformWidth, canvas.height - platformHeight));
      }
    }

    //Variables para generar el escenario en la primera ejecución
    let Player1 = new Player(); //Ojo a la sintaxis y a los paréntesis
      // const Platform1 = new Platform()
      FloorGenerator(20);

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

    function init() {//Esta función se llamará más adelante para reiniciar el nivel cuando se pierda
      Player1 = new Player(); //Ojo a la sintaxis y a los paréntesis 
      FloorGenerator(20);
      gravity = canvas.height/450;
      scrollOffSet = 0; //Para definir el límite máximo de píxeles que se desplazarán los elementos (y definir por ejemplo el final del escenario)
    }

    function animate() {
          c.fillStyle = 'white';
          c.fillRect(0, 0, canvas.width, canvas.height);
          
          //Dibujar player
          //Es importante que Player sea lo último que se dibuje para que siempre esté por delante de las platformas
          //Importante actualizar primero meleeAttack para que se dibuje correctamente y no con retardo

          Player1.update(); //update será llamado cada segundo, sumando la gravedad a la velocidad hasta que se cumpla la condicón del loop anterior
          platforms.forEach((platform) => {//Para cada elemento dentro de platforms, se les asigna una constante platform y se dibuja
            platform.draw();//Platform1.draw() Esto sirve para una única plataforma
          });
          //ACTUALIZARÁ LA POSICIÓN DE TODO EL ESCENARIO AL LLEGAR A UN BORDE

          if (
            keys.right.pressed &&
            Player1.position.x + Player1.width < canvas.width - canvas.width/4.95
          ) {
            //Si presino derecha y el player no ha llegado al borde derecho...
            Player1.velocity.x = speed;
          } else if (keys.left.pressed && Player1.position.x > canvas.width/4.95) {
            //Si presiono izquierda y el player no ha llegado al borde izquierdo...
            Player1.velocity.x = -speed;
          } else {
            // Si estoy en algún borde
            Player1.velocity.x = 0;

          }
          //Platform colission
          platforms.forEach((platform) => {
            if (
              Player1.position.y + Player1.height <= platform.position.y && //track de la posición en y
              Player1.position.y + Player1.height + Player1.velocity.y >=
              platform.position.y &&
              Player1.position.x + Player1.width >= platform.position.x && //track de la posición en y
              Player1.position.x <= platform.position.x + platform.width //track de la posición en y
            ) {
              jumped = false;
              doubleJumped = false;
              onPlatform = true;
              Player1.velocity.y = 0;
              Player1.position.y = platform.position.y - Player1.height;
            }
          });
              
    }
    //Función recursiva para el Loop del juego y control de los FPS
    function gameLoop() {
        requestAnimationFrame(gameLoop);
        const currentTime = performance.now();
        const deltaTime = currentTime - lastFrameTime; //El tiempo que tardó en darse el proceso desde que se llamó
        if (deltaTime >= frameInterval && !isPaused) { //Si el tiempo que tardó el proceso es mayor o igual
          lastFrameTime = currentTime - (deltaTime % frameInterval);
          let fps = 1/(deltaTime/1000)
          //console.log(`FPS Loop: ${fps}`)
          animate();
        }     
      }

    const handleKeyDown = (event) => {
      const {keyCode} = event
      if (keyCode === 37) {
        event.preventDefault()
        keys.left.pressed = true;
      } else if (keyCode === 39) {
        // console.log('right')
        event.preventDefault()
        keys.right.pressed = true;
      } else if (keyCode === 38 && !jumped) { //Salto normal
        event.preventDefault()
        jumped = true;
        Player1.velocity.y = -canvas.height/26;
      } else if (keyCode === 40) {
        event.preventDefault()
        keys.down.pressed = true
      } else if (keyCode === 27) {
        event.preventDefault()
        isPaused = !isPaused;
        animate();
      } else {
        Player1.velocity.x -= 0;
        Player1.velocity.x += 0;
      }
    };
    
    const handleKeyUp = (event) => {
      const {keyCode} = event
      if (keyCode === 37) {
        event.preventDefault()
        // console.log('left')
        keys.left.pressed = false;
      } else if (keyCode === 39) {
        event.preventDefault()
        // console.log('right')
        keys.right.pressed = false;
      } else if (keyCode === 38) {
        event.preventDefault()
        keys.up.pressed = false
        // console.log('up')
      } else if (keyCode === 40) {
        event.preventDefault()
        keys.down.pressed = false
        // console.log('down')
      }else if (keyCode === 17) {
        event.preventDefault()
        keys.control.pressed = false
        // console.log('down')
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    
    gameLoop();
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };

    }
    
  }, [gameStarted]);
  return (
    <div>
      <div className={togglePauseMenu ? "pause-menu-init" : "pause-menu-hidden"}>
        <h1>PAUSED</h1>
        <button onClick={()=>handlePauseMenu("Resume")}>Resume</button>
        <button onClick={()=>handlePauseMenu("Options")}>Options</button>
        <button onClick={()=>handlePauseMenu("Quit")}>Quit</button>
      </div>
      <div className={gameStarted ? "game-menu-hidden" : "game-menu-init"}>
        <div>Super Awesome Javascript action Platformer!!</div>
        <button onClick={startGame}>Start</button>
      </div>
      <canvas className = {gameStarted? "canvas-hidden" : "canvas-init"}ref={canvasRef} />
    </div>
  )
}

export default Platformer;