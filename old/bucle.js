var bucleInfinito = {  //variable que encapsula código
    id:null, //atributo id
    fin:0, //Detecta cuándo se terminará un ciclo
    aps:0, //Actualizaciones por segundo
    fps:0, //Frames por segundo
    bucle:function(tiempo){
        bucleInfinito.id = window.requestAnimationFrame(bucleInfinito.bucle); //El .bucle llama la función y así sucesivamente a una velocidad de 60 veces por segundo (se crea el bucle)
        bucleInfinito.actualizar();
        bucleInfinito.refrescar();
        var diferencia=tiempo-bucleInfinito.fin; //El tiempo va incrementando en 1 ms

        if( diferencia > 999 ) { //en ms, 999 = casi 1 minuto
          console.log(`
          fin=${bucleInfinito.fin}\n
          tiempo=${tiempo}\n
          diferencia=${diferencia}\n
          aps=${bucleInfinito.aps}\n
          fps=${bucleInfinito.fps}\n
          id=${bucleInfinito.id}
          `);
          bucleInfinito.fin=tiempo;
          bucleInfinito.fps=0;
          bucleInfinito.aps=0;
        }
    },
    actualizar:function(){ //Llamándola en la función bucle, suma 1 cada vez que se actualiza. En 1 segundo sumará 60 (60aps)
      bucleInfinito.aps++;
    },
    refrescar:function(){ //Llamándola en la función bucle, suma 1 cada vez que se actualiza. En 1 segundo sumará 60 (60fps)
      bucleInfinito.fps++;
    }
}