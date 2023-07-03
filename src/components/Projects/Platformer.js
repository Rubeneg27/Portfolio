import React, { useEffect, useRef } from 'react';


function Platformer() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = document.querySelector('canvas')
    const c = canvas.getContext('2d');
    //Canvas
    canvas.width = 1280; // Alteramos las propiedades de canvas con JS. Podríamos hacerlo con CSS
    canvas.height = 1024;
    let platformWidth = canvas.width / 9.7;
    let platformHeight = canvas.width / 48;
    let gravity = canvas.height/450;
    //Variables para el movimiento del personaje
    let steady = false;
    console.log(steady)
    let onPlatform = false;
    let jumped = false;
    let doubleJumped = false;
    let scrollOffSet = 0;
    let meleeAttack =  {
      active: false,
      width: null,
      height: null,
      x: null,
      y: null,   
      }
    let playerAttack = false
    let cooldown = false
    //Power Ups
    let fly = false;
    let doubleJump = false;
    let speed = canvas.width/130;
    let isNearBat = false;
    let isPaused = false;
    //Variables para plataformas
    var platforms = [];
    // Variables para el bucle del juego
    let lastFrameTime = performance.now();
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS; //los fps objetivo en milisegundos
    let looking = {
      right: true,
      left: false
    }
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

     meleeAttack() {
      setTimeout(function() {
        meleeAttack =  {
          active: false,
          width: null,
          height: null,
          x: null,
          y: null,   
          }     
      }, 600)
       if (playerAttack) {
        c.fillStyle = 'orange'
        if (looking.right) {
          meleeAttack =  {
            active: true,
            width: canvas.width / 30,
            height: canvas.width / 30,
            x: this.position.x + this.width - canvas.width / 30 + 60, //SOLUCIÓN TEMPORAL para acceder al width the meleeAttack. Para que funcione hay que definir la posición a parte.
            y: this.position.y - 30,   
            }
          c.fillRect(this.position.x + this.width - meleeAttack.width + 60, this.position.y - 30, canvas.width / 30, canvas.width / 30);
        } else if (looking.left) {
          meleeAttack =  {
            active: true,
            width: canvas.width / 30,
            height: canvas.width / 30,
            x: this.position.x - 60,
            y: this.position.y - 30,      
            }
          c.fillRect(this.position.x - 60, this.position.y - 30, canvas.width / 30, canvas.width / 30);
        }
       }
      }
    }
    
    class Enemy {
      constructor(x, y) {
        this.position = {
          x: x,
          y: y,
        };
        this.velocity = {
          x: 0,
          y: 0,
        };
        this.health = 50;
        this.width = canvas.width / 48;
        this.height = canvas.width / 48;
      }

      draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
      }

      update() {
        this.draw();
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

    class powerUp {
      constructor(x, y) {
        this.position = {
          x: x,
          y: y,
        };
        this.width = canvas.width/66;
        this.height = canvas.width/66;
      }

      draw(color) {
        c.fillStyle = color;
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
    
    function platformGenerator(x, y) {
      platforms.push(new Platform(x, y));
    }

    //Variables para generar el escenario en la primera ejecución
    let Player1 = new Player(); //Ojo a la sintaxis y a los paréntesis
      // const Platform1 = new Platform()
      FloorGenerator(20);
      platformGenerator(canvas.width / 6.4, 0.625*canvas.height); // const Platform1 = new Platform() Generaría una única plataforma
      platformGenerator(canvas.width / 2.5, 0.3125*canvas.height);
      let bat = [
        new Enemy(canvas.width/2.4, canvas.width/19.8),
        new Enemy(canvas.width/1.28, canvas.width/9.6),
      ];
      let doubleJumper = new powerUp(canvas.width/1.98, canvas.width/6.6);
      let flyer = new powerUp(canvas.width/1.067, canvas.width/6.6);
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
      platformGenerator(canvas.width / 6.4, canvas.height / 1.6);
      platformGenerator(canvas.width / 2.5, canvas.height / 3.2);
      bat = [
        new Enemy(canvas.width / 2.4, canvas.width / 19.8),
        new Enemy(canvas.width / 1.28, canvas.width / 9.6),
      ];
      gravity = canvas.height/450;
      isNearBat = false;
      doubleJumper = new powerUp(canvas.width/1.98, canvas.width/6.6);
      flyer = new powerUp(canvas.width/1.067, canvas.width/6.6);
      scrollOffSet = 0; //Para definir el límite máximo de píxeles que se desplazarán los elementos (y definir por ejemplo el final del escenario)
    }

    function animate() {
          console.log(meleeAttack.x)
          c.fillStyle = 'white';
          c.fillRect(0, 0, canvas.width, canvas.height);
          bat.forEach((bat) => {
            bat.update();
          });
          doubleJumper.draw('black');
          flyer.draw('blue');   
          //Dibujar player
          //Es importante que Player sea lo último que se dibuje para que siempre esté por delante de las platformas
          //Importante actualizar primero meleeAttack para que se dibuje correctamente y no con retardo
          
          //Controlar el tiempo para volver atacar
          if (playerAttack) {
            Player1.meleeAttack()
            setTimeout(function() {
              cooldown = true
              playerAttack = false
            }, 300)
            setTimeout(function() {
              cooldown = false     
            }, 600)
          }
          
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

            if (keys.right.pressed) {
              // Si estoy en los bordes y además pulso derecha...
              scrollOffSet += speed; //Se actualiza el valor de scrollOfSet igual al de la velocidad al a que avanza la plataforma. Es decir, si se avanza, el scrollOfSet aumenta.
              platforms.forEach((platform) => {
                platform.position.x -= speed;
              });
              bat.forEach((bat) => {
              bat.position.x -= speed;
              });
              doubleJumper.position.x -= speed;
              flyer.position.x -= speed;
            } else if (keys.left.pressed) {
              //si estoy en un borde y pulso izquierda...
              scrollOffSet -= speed; //Disminuye el scrollOfSet si las plataformas se mueven a la izquierda (es decir, se retrocede o lo que es lo mismo te alejas del final)
              platforms.forEach((platform) => {
                platform.position.x += speed;
              });
              bat.forEach((bat) => {
              bat.position.x += speed;
              });
              doubleJumper.position.x += speed;
              flyer.position.x += speed;
            }
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
          //Código para bats
          bat.forEach((enemy, index) => {
            if (
              Player1.position.x + Player1.width >= enemy.position.x &&
              Player1.position.x <= enemy.position.x + enemy.width &&
              Player1.position.y + Player1.height >= enemy.position.y &&
              Player1.position.y <= enemy.position.y + enemy.height
            ) {
              init();
              onPlatform = false;
              doubleJump = false;
              fly = false;
              isNearBat = false;
            }
            //Colisión con ataque
            if(
              meleeAttack.active &&
              meleeAttack.x + meleeAttack.width >= enemy.position.x &&
              meleeAttack.x <= enemy.position.x + enemy.width &&
              meleeAttack.y + meleeAttack.height >= enemy.position.y &&
              meleeAttack.y <= enemy.position.y + enemy.height
              ) {
                bat.splice(index,1)
              }

          });

          //Enemigos persiguen

          bat.forEach((bat) => {
            // Falta definir bien el área de detección de los murciélagos
            if (
              bat.position.x + bat.width - canvas.width/3.96 < Player1.position.x &&
              bat.position.y > Player1.position.y - canvas.width/2.83
            ) {
              isNearBat = true;
            }
            if (
              Player1.position.x < bat.position.x &&
              Player1.position.y > bat.position.y &&
              isNearBat === true
            ) {
              bat.position.x -= 1.4;
              bat.position.y += 1.4;
            } else if (
              Player1.position.x < bat.position.x &&
              Player1.position.y < bat.position.y &&
              isNearBat === true
            ) {
              bat.position.x -= 1.4;
              bat.position.y -= 1.4;
            } else if (
              Player1.position.x > bat.position.x &&
              Player1.position.y < bat.position.y &&
              isNearBat === true
            ) {
              bat.position.x += 1.4;
              bat.position.y -= 1.4;
            } else if (
              Player1.position.x > bat.position.x &&
              Player1.position.y > bat.position.y &&
              isNearBat === true
            ) {
              bat.position.x += 1.4;
              bat.position.y += 1.4;
            }
            //console.log(isNearBat)
          });

          //Coger objetos. Cuando lo cojo se van arriba (solución momentánea)
          if (
            Player1.position.x + Player1.width >= flyer.position.x &&
            Player1.position.x <= flyer.position.x + flyer.width &&
            Player1.position.y + Player1.height >= flyer.position.y &&
            Player1.position.y <= flyer.position.y + flyer.height
          ) {
            fly = true;
            doubleJump = false;
            gravity = canvas.height/768
            flyer.position.y = -100000;
            flyer.position.x = 0;
            //console.log('touched')
          }
          if (
            Player1.position.x + Player1.width >= doubleJumper.position.x &&
            Player1.position.x <=
            doubleJumper.position.x + doubleJumper.width &&
            Player1.position.y + Player1.height >= doubleJumper.position.y &&
            Player1.position.y <= doubleJumper.position.y + doubleJumper.height
          ) {
            doubleJumper.position.y = -100000;
            doubleJumper.position.x = -0;
            doubleJump = true;
            fly = false;
            //console.log('touched')
          }

          //WIN CONDITION
          if (scrollOffSet > 2000) {
            //console.log('You win!')
          }
          //LOSE CONDITION
          if (Player1.position.y > canvas.height) {
            onPlatform = false;
            doubleJump = false;
            fly = false;
            //console.log('You lose')
            init();
          }
          
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
      console.log(event.keyCode)
      if (keyCode === 37) {
        // console.log('left')
        event.preventDefault()
        keys.left.pressed = true;
        looking.left = true;
        looking.right = false;
        console.log(Player1.position.x)
      } else if (keyCode === 39) {
        // console.log('right')
        event.preventDefault()
        keys.right.pressed = true;
        looking.right = true;
        looking.left = false;
        console.log(Player1.position.x)
      } else if (keyCode === 38 && !jumped && !fly) { //Salto normal
        event.preventDefault()
        jumped = true;
        steady = false
        Player1.velocity.y = -canvas.height/26;
      } else if (keyCode === 38 && jumped && !doubleJump && !fly) { //Salto normal si esá en el aire
        event.preventDefault()
      } else if (keyCode === 38 && fly) { //Salto con vuelo
        event.preventDefault()
        Player1.velocity.y = -canvas.height/55;
      } else if (keyCode === 38 && jumped && doubleJump && !doubleJumped) { //Salto normal con doble salto
        event.preventDefault()
        keys.up.pressed = true
        Player1.velocity.y = -canvas.height/26;
        doubleJumped = true;
      } else if (keyCode === 40) {
        // console.log('down')
        event.preventDefault()
        keys.down.pressed = true
      } else if (keyCode === 27) {
        event.preventDefault()
        isPaused = !isPaused;
        // console.log('Paused = ' + isPaused);
        animate();
      } else if (keyCode === 17 && !cooldown) {
        keys.control.pressed = true
        cooldown = true
        playerAttack = true
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
  }, []);
  return <canvas ref={canvasRef} />;
}

export default Platformer;