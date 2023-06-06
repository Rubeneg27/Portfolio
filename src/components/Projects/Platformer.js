import React, { useEffect, useRef } from 'react';

function Platformer() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = document.querySelector('canvas')
    const c = canvas.getContext('2d');
    //Canvas
    canvas.width = 800; // Alteramos las propiedades de canvas con JS. Podríamos hacerlo con CSS
    canvas.height = 600;
    let platformWidth = canvas.width / 9.7;
    let platformHeight = canvas.width / 48;
    const gravity = 0.7;
    let gameSpeed = 200;
    
    //Variables para el movimiento del personaje
    let steady = false; //Trackea si el personaje está quieto o no
    let onPlatform = false;
    let jumped = false;
    let doubleJumped = false;
    let scrollOffSet = 0; //Para definir el límite máximo de píxeles que se desplazarán los elementos (y definir por ejemplo el final del escenario)
    //Power Ups
    let fly = false;
    let doubleJump = false;
    let speed = 6;
    let isNearBat = false; // Poniendo la variable fuera, con que un sólo murciélago vea al player, todos le perseguirán
    let isPaused = false;
    let lastFrameTime = performance.now();
    //Variables para plataformas
    var platforms = [];
    //REVISAR.Estas variables están porque no he conseguido acceder al ancho de cada plataforma en el array
    

    class Player {
      constructor() {
        this.position = {
          x: canvas.width / 19.2,
          y: canvas.width / 3.2,
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
        //Dibuja al player
        c.fillStyle = 'green';
        c.fillRect(this.position.x, this.position.y, this.width, this.height); //Método para dibujar al personaje
      }

      update() {//Función para actualizar las propiedades de Player en función del tiempo
        this.draw();
        this.position.y += this.velocity.y; // 100 + 0 = 100
        this.position.x += this.velocity.x; // 50 + 0 = 50 Mientras no se actualice velocity.x, position.x seguirá siendo la misma
        //console.log(`Is player on platform? ${onPlatform}`)
        if (
          this.position.y + this.height + this.velocity.y < canvas.height &&
          onPlatform == false
        ) {
          //Este loop para la caída tomando la altura del canvas. Si 100 + 40 + 0 <= 800
          this.velocity.y += gravity; // Si arriba = true -> 0 + 0.4 = 0.4 + 0.4 = 0.8 + 0.4 ... etc, va acelerando
          steady = false;
          //console.log(`Player velocity: ${this.velocity.y}`)
          //console.log(`Position: ${this.position.y}`)
          //console.log(`PLayer is still standing? ${steady}`)
        } else if (
          this.position.y + this.height + this.velocity.y < canvas.height &&
          onPlatform == true
        ) {
          this.velocity.y += gravity; // Si arriba = true -> 0 + 0.4 = 0.4 + 0.4 = 0.8 + 0.4 ... etc, va acelerando
          steady = true;
          //console.log(`Position: ${this.position.y}`)
          //console.log(`PLayer is still standing? ${steady}`)
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
      platformGenerator(canvas.width / 6.4, canvas.height / 1.6); // const Platform1 = new Platform() Generaría una única plataforma
      platformGenerator(canvas.width / 2.5, canvas.height / 3.2);
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
      doubleJumper = new powerUp(canvas.width/1.98, canvas.width/6.6);
      flyer = new powerUp(canvas.width/1.067, canvas.width/6.6);
      scrollOffSet = 0; //Para definir el límite máximo de píxeles que se desplazarán los elementos (y definir por ejemplo el final del escenario)
    }


    function animate() {
      const currentTime = performance.now();
      const deltaTime = (currentTime - lastFrameTime) / 1000;
      lastFrameTime = currentTime;
      const fps = 1 / deltaTime;
      c.fillStyle = 'white';
          c.fillRect(0, 0, canvas.width, canvas.height);
          bat.forEach((bat) => {
            bat.update();
          });
          doubleJumper.draw('black');
          flyer.draw('blue');   
          //Dibujar player
          //Es importante que Player sea lo último que se dibuje para que siempre esté por delante de las platformas
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
        
          /*
          //ACTUALIZARÁ LA POSICIÓN DE TODO EL ESCENARIO AL PULSAR IZQ/DER
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
          */
          //console.log(`Has avanzado ${scrollOffSet}`)

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

          bat.forEach((bat) => {
            if (
              Player1.position.x + Player1.width >= bat.position.x &&
              Player1.position.x <= bat.position.x + bat.width &&
              Player1.position.y + Player1.height >= bat.position.y &&
              Player1.position.y <= bat.position.y + bat.height
            ) {
              init();
              onPlatform = false;
              doubleJump = false;
              fly = false;
              isNearBat = false;
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
              isNearBat == true
            ) {
              bat.position.x -= 1.4;
              bat.position.y += 1.4;
            } else if (
              Player1.position.x < bat.position.x &&
              Player1.position.y < bat.position.y &&
              isNearBat == true
            ) {
              bat.position.x -= 1.4;
              bat.position.y -= 1.4;
            } else if (
              Player1.position.x > bat.position.x &&
              Player1.position.y < bat.position.y &&
              isNearBat == true
            ) {
              bat.position.x += 1.4;
              bat.position.y -= 1.4;
            } else if (
              Player1.position.x > bat.position.x &&
              Player1.position.y > bat.position.y &&
              isNearBat == true
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

          if (!isPaused) {
            requestAnimationFrame(animate)
          }
    }

    const handleKeyDown = (event) => {
      const {keyCode} = event
      if (keyCode === 37) {
        // console.log('left')
        event.preventDefault()
        keys.left.pressed = true;
      } else if (keyCode === 39) {
        // console.log('right')
        event.preventDefault()
        keys.right.pressed = true;
      } else if (keyCode === 38 && !jumped) {
        event.preventDefault()
        jumped = true;
        // console.log('up')
        Player1.velocity.y = -25;
      } else if (keyCode === 38 && jumped && !doubleJump && !fly) {
        event.preventDefault()
      } else if (keyCode === 38 && fly) {
        event.preventDefault()
        Player1.velocity.y = -15;
      } else if (keyCode === 38 && jumped && doubleJump && !doubleJumped) {
        event.preventDefault()
        keys.up.pressed = true
        Player1.velocity.y = -25;
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
      } else if (keyCode === 32) {
        c.fillStyle = 'black';
        c.fillRect(Player1.position.x + 50, Player1.position.y, 30, 30);
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
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
  
    // Limpia los event listeners cuando el componente se desmonta
    //---MOVIMIENTO DEL PERSONAJE---
    /*
    addEventListener('keydown', (event) => { //Cualquier método que venga del objeto window no necesita el "window."
     console.log(event) //Revisando la consola, podemos ver con esta línea qué "keycode" tiene asociado cada tecla que pulsamos
    }) 
    */
    /*
    addEventListener('keydown', ({ keyCode }) => {
      //De esta forma es más específico que las líneas 52-54
      //console.log( keyCode )
      if (keyCode == 37) {
        //console.log('left')
        keys.left.pressed = true;
      } else if (keyCode == 39) {
        //console.log('right')
        keys.right.pressed = true;
      } else if (keyCode == 38 && jumped == false) {
        jumped = true;
        //console.log('up')
        Player1.velocity.y = -20;
      } else if (keyCode == 38 && jumped == true && fly == true) {
        //console.log('up')
        Player1.velocity.y = -20;
      } else if (
        keyCode == 38 &&
        jumped == true &&
        doubleJump == true &&
        doubleJumped == false
      ) {
        //console.log('up')
        doubleJumped = true;
        Player1.velocity.y = -20;
      } else if (keyCode == 40) {
        //console.log('down')
      } else if (keyCode == 27) {
        isPaused = !isPaused;
        //console.log('Paused = ' + isPaused);
        animate();
      } else if (keyCode == 32) {
        c.fillStyle = 'black';
        c.fillRect(Player1.position.x + 50, Player1.position.y, 30, 30);
      } else {
        Player1.velocity.x -= 0;
        Player1.velocity.x += 0;
      }
    });

    addEventListener('keyup', ({ keyCode }) => {
      //De esta forma es más específico que las líneas 52-54
      //console.log( keyCode )
      if (keyCode == 37) {
        //console.log('left')
        keys.left.pressed = false;
      } else if (keyCode == 39) {
        //console.log('right')
        keys.right.pressed = false;
      } else if (keyCode == 38) {
        //console.log('up')
      } else if (keyCode == 40) {
        // console.log('down')
      }
    });
    */
   
    //Player1.update()
    
    animate();
  }, []);
  return <canvas ref={canvasRef} />;
}

export default Platformer;
