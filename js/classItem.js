function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  class Item {
    constructor (game, x, avancement = 0) {
        this.game = game;
        this.img =  document.getElementById("soin");
        this.avancement = avancement; // définis la distance a laquelle se trouve l'arbre(plusla valeur est élevée, plus il est proche)
        this.largeurImg = 20;
        this.x = x;
        this.hauteurImg = 30;
        this.zommEffect = 200; //350 pour un zoom en x2, 175 pour un zoom en x4
    }
  
    Update (ctx) {
        this.avancement += 3;
        if(this.avancement > 500){
            this.game.listItem.Suppr(this);
        }

        //test de contact avec joueur
        if(this.avancement >200 && this.x <this.game.avion.x+this.game.avion.largeurImg/2 && this.x >this.game.avion.x-this.game.avion.largeurImg/2){
            if(this.game.lives <3){
                this.game.lives +=1;
            }
            this.game.listItem.Suppr(this);
        }
        //afficher image 
        let largeur = this.largeurImg*(1+this.avancement/this.zommEffect);
        let hauteur = this.hauteurImg*(1+this.avancement/this.zommEffect);
        let decalage = 240-this.avancement*(24/35);
        let x = decalage + (this.x/2.5+0.6*(this.x/350)*this.avancement);


        ctx.drawImage(this.img,x,220 + this.avancement, largeur, hauteur);

    }

}