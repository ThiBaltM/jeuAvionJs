document.addEventListener("DOMContentLoaded", function() {
  //largeur du canvas
  let largeur = 800;
  // hauteur du canvas
  let hauteur = 600;
  let couleur="#FFFFFF";
  // J'initialise mon canvas avec la fonction initCanvas définie dans formes.js
  canvas = initCanvas(largeur, hauteur, couleur);
  game = new Game(canvas, largeur, hauteur);


  document.addEventListener('keydown', function (evt) {
    game.keys[evt.code] = true;
    if(!game.started){
      game.started =true;
      setInterval(jeu, 33) // environ 30 fps
    }
  });
  document.addEventListener('keyup', function (evt) {
    game.keys[evt.code] = false;
  });

  function jeu(){
      game.Update();
  }
}
)
