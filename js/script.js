function launch(){
  let name = document.getElementById("inputName").value;
  console.log(name);
  if(name.length >0){
    let divName = document.getElementById("divName");
    divName.style.display = "none";
    let divJeu = document.getElementById("divJeu");
    divJeu.style.display="block";

    //largeur du canvas
    let largeur = 800;
    // hauteur du canvas
    let hauteur = 600;
    let couleur="#FFFFFF";
    // J'initialise mon canvas avec la fonction initCanvas définie dans formes.js
    canvas = initCanvas(largeur, hauteur, couleur);
    game = new Game(canvas, largeur, hauteur, name);


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
  }

  function jeu(){
      game.Update();
  }
}

async function afficherElements() {
  const response = await fetch('http://s4-8029.nuage-peda.fr/apiJeuAvion/public/api/scores', {
    method:'GET',
    headers: {
      'accept': 'application/ld+json',
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  console.log(data)
  let listeUl = document.getElementById("listScores");

  Array.from(data["hydra:member"]).forEach(element => {
    const listeLi = document.createElement('li');
    listeLi.textContent = element.name +" : "+element.time;
    listeUl.appendChild(listeLi);
  });
  
  document.body.appendChild(listeUl);
}

afficherElements();



