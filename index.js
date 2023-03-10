const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth // Alteramos las propiedades de canvas con JS. Podríamos hacerlo con CSS
canvas.height = window.innerHeight

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

const Player1 = new Player()
Player1.update()

function animate() { //Actualiza cada segundo
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)//Cada segundo, limpiará el canvas 
  Player1.update() //update será llamado cada segundo, sumando la gravedad a la velocidad hasta que se cumpla la condicón del loop anterior
}

animate()

/*
addEventListener('keydown', (event) => { //Cualquier método que venga del objeto window no necesita el "window."
  console.log(event) //Revisando la consola, podemos ver con esta línea qué "keycode" tiene asociado cada tecla que pulsamos
}) 
*/

addEventListener('keydown', ({ keyCode }) => { //De esta forma es más específico que las líneas 52-54
console.log( keyCode )
if ( keyCode == 37) {
  console.log('left')
  Player1.velocity.x = -6
} else if ( keyCode == 39) {
  console.log('right')
  Player1.velocity.x = 6
} else if ( keyCode == 38  ) {
  console.log('up')
  Player1.velocity.y -= 10
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
    Player1.velocity.x = 0
  } else if ( keyCode == 39) {
    console.log('right')
    Player1.velocity.x = 0
  } else if ( keyCode == 38 ) {
    console.log('up')
  }
  else if ( keyCode == 40) {
    console.log('down')
  }
  }) 
