//Spawn parameters
let spawnCooldown = false
let spawnTime
let spawnPosX

//Gameplay parameters
//let speed = 8;
let enemySpeed1 = 3;
let playerBulletsSpeed1 = 10;
let enemyBulletSpeed1 = 2 * enemySpeed1;
let playerOnCooldown = false;
let playerAttackCooldown = 100;

let enemyAttackOnCoolDown = 900;

class Player {
  constructor(canvas, c, keys) {

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
    
    this.scrollYSpeed = 5;
    this.scrollY = 0;

    this.c = c
    this.canvas = canvas
    this.keys = keys
    this.bullets = [];
    
  }
  
  ///Will draw Player
  draw() {
    //Updates Player positions
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.scrollY += this.scrollYSpeed/60

    this.c.fillStyle = 'green';
    this.c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  ///Defines and draws the attack action when control key is pressed///
  attack () {
    if (this.keys.control.pressed && !playerOnCooldown) {
      playerOnCooldown = true

      setTimeout(function() {
        playerOnCooldown = false     
      }, playerAttackCooldown)

      let shootWidth = this.canvas.width /50;
      let shootHeight = shootWidth;
      let shootPosX = this.position.x + this.width/2 - shootWidth/2;
      let shootPosY = this.position.y - this.canvas.height/30;

      this.bullets.push({
        position: {
          x: shootPosX,
          y: shootPosY,
        },
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
      bullet.position.x += bullet.velocity.x;
      bullet.position.y += bullet.velocity.y;

      ///Draws each bullet in bullets
      this.c.fillStyle = 'orange';
      this.c.fillRect(bullet.position.x, bullet.position.y, bullet.width, bullet.height);

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

///Parameters: x///Defines position of enemy in x axis
class Asteroid {
  constructor(x,y,canvas, c, hp) {
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

    this.c = c;

    this.hp = hp;
  }

  ///Will draw Asteroid 
  draw() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.c.fillStyle = 'red';
    this.c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  ///Will draw the updated Asteroid
  update () {
    this.draw();
  }
}

class EnemyA {
  
  constructor(x,y,canvas,c, bullets) {
    this.width = canvas.width / 25;
    this.height = canvas.width / 25;

    this.position = {
      x: x,
      y: y,
    };

    this.velocity = {
      x: 0,
      y: 0,//enemySpeed1/2,
    };

    this.enemyBullets = bullets
    this.enemyOnCoolDown = false;
    this.canvas = canvas;
    this.c = c;
    this.bullets = [];


  }

  shoot () {
    if (!this.enemyOnCoolDown) {
      this.enemyOnCoolDown = true
      
      let shootWidth = this.canvas.width /50;
      let shootHeight = shootWidth;
      let shootPosX = this.position.x + this.width/2 - shootWidth/2;
      let shootPosY = this.position.y + this.canvas.height/10;

      shooter(this.enemyBullets, shootPosX, shootPosY, shootWidth, shootHeight, enemyBulletSpeed1)

      setTimeout(() => {
        this.enemyOnCoolDown = false     
      }, enemyAttackOnCoolDown)

    }  
  }

  draw() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.c.fillStyle = 'purple';
    this.c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.shoot();
  }
  
}

function shooter (bullets, shootPosX, shootPosY, shootWidth, shootHeight, velocityY) {
  bullets.push({
    position: {
      x: shootPosX,
      y: shootPosY,
    },
    width: shootWidth,
    height: shootHeight,
    velocity: {
      x: 0,
      y: velocityY,
    },
  });
}

class GameManager {

  ///Updates player position///
  updatePlayerPosition(keys, Player, speed) {
    Player.update()
    if (keys.left.pressed) {
      Player.velocity.x = -speed;
    } else if (keys.right.pressed) {
      Player.velocity.x = speed;
    } else {
      Player.velocity.x = 0;
    }
  }

  ///Spawn enemies at random time in random position when the cooldown is false///
  ///PARAMETERES///
  ///spawnCooldown: When true, enemies doesn't appear///
  ///spawnTime: Random number for spawning time///
  ///spawnPosX: Random number for position in x axis///
  spawnEnemies (enemyToSpawn, spawnTimeMax, spawnTimeMin, spawnPosXMax, spawnPosXMin, canvas, c, hp) {
    if (!spawnCooldown) {
      spawnTime = Math.floor(Math.random() * (spawnTimeMax - spawnTimeMin + 1)) + spawnTimeMin;
      spawnPosX = Math.floor(Math.random() * (spawnPosXMax - spawnPosXMin + 1)) + spawnPosXMin;
      spawnCooldown = true
      setTimeout(function () {
      enemyToSpawn.push(new Asteroid(spawnPosX, 0, canvas, c, hp))
      spawnCooldown = false
    }, spawnTime)
    }   
  }

  ///Se encarga de dibujar cada bala que se dispare, de actualizarla y eliminarla///
  ///param<bulets, positionX, positionY, velocityY///
  

    ///Give to every object a new index and remove it from the original array///
    ///PARAMETERES///
    ///removerArray: The array wich saves the objects to eliminate///
    ///objectsToRemove: Objects to remove from original array///
    eliminator (removerArray, objectsToRemove) {
      for (let i = removerArray.length - 1; i >= 0; i--) {
        const newIndex = removerArray[i];
        objectsToRemove.splice(newIndex, 1);
      }
    }

    ///Check colission between two objects///
    checkCollision(objectA, objectB) {
      return (
        objectA.position.x < objectB.position.x + objectB.width &&
        objectA.position.x + objectA.width > objectB.position.x &&
        objectA.position.y < objectB.position.y + objectB.height &&
        objectA.position.y + objectA.height > objectB.position.y
      );
    }

    bulletUpdator (canvas, c, enemyBullets, _player) {
      let bulletsToRemove = [];
      enemyBullets.forEach((bullet, index) => {
        bullet.position.x += bullet.velocity.x;
        bullet.position.y += bullet.velocity.y;

        ///Draws each bullet in bullets
        c.fillStyle = 'purple';
        c.fillRect(bullet.position.x, bullet.position.y, bullet.width, bullet.height);

        //Destroys each bullet in bullets
        if ( bullet.position.y > canvas.height) {
          bulletsToRemove.push(index)
        }
        /*
        if (this.checkCollision(bullet, _player)) {
          console.log("Ei")
        }
        */
        
      });

      for (let i = bulletsToRemove.length - 1; i >= 0; i--) {
        const bulletIndex = bulletsToRemove[i];
        enemyBullets.splice(bulletIndex, 1);
      }
    }
 
}



export {GameManager, Player, EnemyA} 