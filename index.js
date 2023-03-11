/*
OJO. Obligatorio fijar el tipo del script a "module" (ver index.html)
El navegador tampoco deja importar archivos directamente desde nuestro PC. Es necesario tener los archivos en algún tipo de servidor
*/

// import PlatformGrass from "./Assets/PlatformGrass.png" //Por eso esta línea no funciona




const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth // Alteramos las propiedades de canvas con JS. Podríamos hacerlo con CSS
canvas.height = 800

const gravity = 0.8

class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0,
        }
        this.width = 40
        this.height = 40
    }

    draw() { //Dibuja al player
        c.fillStyle = 'green'
        c.fillRect(this.position.x, this.position.y, this.width, this.height) //Método para dibujar al personaje
    }

    update() { //Función para actualizar las propiedades de Player en función del tiempo
      this.draw()
      this.position.y += this.velocity.y // 100 + 0 = 100
      this.position.x += this.velocity.x // 50 + 0 = 50 Mientras no se actualice velocity.x, position.x seguirá siendo la misma
      
      if (this.position.y + this.height + this.velocity.y < canvas.height ) { //Este loop para la caída tomando la altura del canvas. Si 100 + 40 + 0 <= 800
        this.velocity.y += gravity // Si arriba = true -> 0 + 0.4 = 0.4 + 0.4 = 0.8 + 0.4 ... etc, va acelerando
        console.log(this.velocity.y)
        console.log(this.position.y)
      } else { 
        this.position.y = 760
        this.velocity.y = 0 // Cuando lo de arriba = false -> velocity.y = 0. Es decir, al volver a llamar a update no cambiará this.position.y
      }
    } 
}

/*
Constructor para UNA plataforma

class Platform {
  constructor() {
    this.position = {
      x: 500,
      y: 600 
    }
    this.width = 200
    this.height= 40
  }

  draw() {
    c.fillStyle = 'blue'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}
*/
//Constructor para múltiples plataformas. Toma valores variables en lugar de los fijos del ejemplo anterior
class Platform {
  constructor(x,y) {
    this.position = {
      x: x,
      y: y 
    }
    this.width = 200
    this.height= 40
  }

  draw() {
    c.fillStyle = 'blue'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

const Player1 = new Player() //Ojo a la sintaxis y a los paréntesis
// const Platform1 = new Platform()
const platforms = [ //En lugar de crear una sola plataforma, creamos un array de nuevas plataformas
  new Platform(500, 600), //Cada una tiene definidos un valor x e y
  new Platform(800, 400),
  new Platform(1200, 200),
  new Platform(3000, 300)
] 

const keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  }

}

let scrollOffSet = 0 //Para definir el límite máximo de píxeles que se desplazarán los elementos (y definir por ejemplo el final del escenario)

function animate() { //Actualiza cada segundo
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)//Cada segundo, limpiará el canvas 
  Player1.update() //update será llamado cada segundo, sumando la gravedad a la velocidad hasta que se cumpla la condicón del loop anterior
  platforms.forEach(platform => { //Para cada elemento dentro de platforms, se les asigna una constante platform y se dibuja
    platform.draw()
  })
  //Platform1.draw() Esto sirve para una única plataforma

  if (keys.right.pressed && Player1.position.x + Player1.width < window.innerWidth - 200) { //Si presino derecha y el player no ha llegado al borde derecho...
    Player1.velocity.x = 5
  } else if (keys.left.pressed && Player1.position.x > 100) { //Si presiono izquierda y el player no ha llegado al borde izquierdo...
    Player1.velocity.x = -5
  } else { // Si estoy en algún borde
    Player1.velocity.x = 0

    if (keys.right.pressed) { // Si estoy en los bordes y además pulso derecha...
      scrollOffSet += 5 //Se actualiza el valor de scrollOfSet igual al de la velocidad al a que avanza la plataforma. Es decir, si se avanza, el scrollOfSet aumenta.
      platforms.forEach(platform => {
      platform.position.x -= 5
      })
    } else if (keys.left.pressed) { //si estoy en un borde y pulso izquierda...
      scrollOffSet -= 5 //Disminuye el scrollOfSet si las plataformas se mueven a la izquierda (es decir, se retrocede o lo que es lo mismo te alejas del final)
      platforms.forEach(platform => {
        platform.position.x += 5
      })
    }
  }

  console.log(`Has avanzado ${scrollOffSet}`)

  //Platform colission
  platforms.forEach(platform => {
    if (Player1.position.y + Player1.height <= platform.position.y && 
      Player1.position.y + Player1.height + Player1.velocity.y >= platform.position.y &&
      Player1.position.x + Player1.width >= platform.position.x && 
      Player1.position.x <= platform.position.x + platform.width
      ) { 
      Player1.velocity.y = 0
    } 
  })
  if (scrollOffSet > 2000) {
    console.log('You win!')
  }
}

//---MOVIMIENTO DEL PERSONAJE---

/*
addEventListener('keydown', (event) => { //Cualquier método que venga del objeto window no necesita el "window."
  console.log(event) //Revisando la consola, podemos ver con esta línea qué "keycode" tiene asociado cada tecla que pulsamos
}) 
*/

addEventListener('keydown', ({ keyCode }) => { //De esta forma es más específico que las líneas 52-54
console.log( keyCode )
if ( keyCode == 37) {
  console.log('left')
  keys.left.pressed = true
} else if ( keyCode == 39) {
  console.log('right')
  keys.right.pressed = true
} else if ( keyCode == 38 && Player1.velocity.y == 0 ) {
  console.log('up')
  Player1.velocity.y = -25
}
else if ( keyCode == 40) {
  console.log('down')
} else {
  Player1.velocity.x -= 0
  Player1.velocity.x += 0
}
}) 

addEventListener('keyup', ({ keyCode }) => { //De esta forma es más específico que las líneas 52-54
  console.log( keyCode )
  if ( keyCode == 37) {
    console.log('left')
    keys.left.pressed = false
  } else if ( keyCode == 39) {
    console.log('right')
    keys.right.pressed = false
  } else if ( keyCode == 38 ) {
    console.log('up')
  }
  else if ( keyCode == 40) {
    console.log('down')
  }
  }) 

Player1.update()
animate()
