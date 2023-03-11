const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth // Alteramos las propiedades de canvas con JS. Podríamos hacerlo con CSS
canvas.height = 800

const gravity = 0.4

class Player {
    constructor() {
        this.position = {
            x: 50,
            y: 0
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
      this.position.x += this.velocity.x
      
      if (this.position.y + this.height + this.velocity.y < canvas.height) { //Este loop para la caída tomando la altura del canvas. 100 + 40 + 0 <= altura de la pantalla? 
        this.velocity.y += gravity // Si arriba = true -> 0 + 1.5
      } else {
        this.velocity.y = 0 // Cuando lo de arriba = false -> velocity.y = 0. Es decir, al volver a llamar a update no cambiará this.position.y
      }
    } 
}

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

const Player1 = new Player()
const Platform1 = new Platform()

const keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  }

}


function animate() { //Actualiza cada segundo
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)//Cada segundo, limpiará el canvas 
  Player1.update() //update será llamado cada segundo, sumando la gravedad a la velocidad hasta que se cumpla la condicón del loop anterior
  Platform1.draw()

  if (keys.right.pressed) {
    Player1.velocity.x = 7
  } else if (keys.left.pressed) {
    Player1.velocity.x = -7
  } else Player1.velocity.x = 0
  //Platform colission
  if (Player1.position.y + Player1.height <= Platform1.position.y && 
    Player1.position.y + Player1.height + Player1.velocity.y >= Platform1.position.y &&
    Player1.position.x + Player1.width >= Platform1.position.x && 
    Player1.position.x <= Platform1.position.x + Platform1.width
    ) { 
    Player1.velocity.y = 0
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
} else if ( keyCode == 38  ) {
  console.log('up')
  Player1.velocity.y -= 14
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