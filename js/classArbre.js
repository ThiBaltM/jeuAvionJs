function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  class Arbre {
    constructor (game, place, avancement = 0) {
        this.game = game;
        this.canvas = this.game.canvas;
        this.img =  [document.getElementById("tree0"), document.getElementById("tree1"),document.getElementById("tree2"), document.getElementById("tree3"), document.getElementById("tree4")][getRandomInt(5)];
        this.place = place;
        this.avancement = avancement; // définis la distance a laquelle se trouve l'arbre(plusla valeur est élevée, plus il est proche)
        if(avancement == 0){
            this.attente = 3;
        }else{
            this.attente = 0;
        }
        this.largeurImg = 40;
        this.hauteurImg = 90;
        this.zommEffect = 200; //350 pour un zoom en x2, 175 pour un zoom en x4
    }
  
    Update (ctx) {
        //afficher image arbre
        if(this.attente <= 0){
            this.avancement += 10;
        }else{
            this.attente -=1;
        }
        let largeur = this.largeurImg*(1+this.avancement/this.zommEffect);
        let hauteur = this.hauteurImg*(1+this.avancement/this.zommEffect);
        let x=0;
        if(this.place < 10){
            x = 400-((10-this.place)*largeur);
        }else{
            x=400+((this.place-10)*largeur);
        }
        ctx.drawImage(this.img,x,250 + this.avancement, largeur, hauteur);
    }

}