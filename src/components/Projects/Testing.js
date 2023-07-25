import React, { useState, useEffect, useRef } from 'react';


function Platformer() {
  
  const [gameStarted, setGameStarted] = useState (false);
  const [togglePauseMenu, setTogglePauseMenu] = useState(false);
  let isPausedRef = useRef(false);
  let isGameClosedRef = useState(true); 
  
  const startGame = () => {
    setGameStarted(!gameStarted)
    isGameClosedRef.current = true;
    console.log(`Game started: ${gameStarted}`);
  }

  const handlePauseMenu = (e) => {
      switch (e) {
      case "Resume":
        setTogglePauseMenu(false);
        console.log("Resume")
        isPausedRef.current = false
        break;
      case "Quit":
        setTogglePauseMenu(false);
        setGameStarted(false);
        isPausedRef.current = false
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
    let speed = canvas.width/130;

    //Variables para plataformas
    var platforms = [];

    // Variables para el bucle del juego
        let lastFrameTime = performance.now();
    let framesThisSecond = 0;
    let lastFpsUpdate = 0;
    let fps = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS; // los fps objetivo en milisegundos

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
  const deltaTime = currentTime - lastFrameTime; // El tiempo que tardó en darse el proceso desde que se llamó

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
  } else if (!gameStarted) {
    init()
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
        isPausedRef.current = !isPausedRef.current
        setTogglePauseMenu(true);
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
    /*
    const handleClick = () => {
      console.log(togglePauseMenu)
      console.log(`Pause ref: ${pauseRef.current}`)
      if (!pauseRef.current) {
        isPaused = false
        setTogglePauseMenu(false)
        pauseRef.current = !pauseRef.current;
      }
    };
    */
    /*
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY });
      console.log (clientX, clientY)
    };
    */

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    //document.addEventListener('click', handleClick);
    //document.addEventListener('mousemove', handleMouseMove);
      
  
    gameLoop();
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      //document.removeEventListener('click', handleClick);
      //document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  return (
    <div>
      <div className={togglePauseMenu ? "pause-menu-init" : "pause-menu-hidden"}>
        <h1>PAUSED</h1>
        <button onClick={()=>handlePauseMenu("Resume")}>Resume</button>
        <button onClick={()=>handlePauseMenu("Quit")}>Quit</button>
      </div>
      <div className={gameStarted ? "game-menu-hidden" : "game-menu-init"}>
        <div>TESTING PLACE</div>
        <button onClick={startGame}>Start</button>
      </div>
      <canvas className = {gameStarted? "canvas-init" : "canvas-hidden"}ref={canvasRef} />
      
    </div>
  )
}

export default Platformer;