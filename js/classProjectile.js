function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  class Projectile {
    constructor (game) {
        this.game = game;
        this.img =  document.getElementById("projectile");
        this.x = this.game.avion.x;
        this.avancement = 220; // définis la distance a laquelle se trouve l'arbre(plusla valeur est élevée, plus il est proche)
        this.largeurImg = 12;
        this.hauteurImg = 12;
        this.zommEffect = 200; //350 pour un zoom en x2, 175 pour un zoom en x4
    }
  
    Update (ctx) {
        this.avancement -= 7;

        if(this.game.debug){
            ctx.fillStyle="green";
            ctx.fillRect(this.x-8,220 + this.avancement,16, 16);
        }
        //collisions gérés dans classOsbtacle.js
        
        let largeur = this.largeurImg*(1+this.avancement/this.zommEffect);
        let hauteur = this.hauteurImg*(1+this.avancement/this.zommEffect);

        let decalage = 240-this.avancement*(24/35);
        let x = decalage + (this.x/2.5+0.6*(this.x/350)*this.avancement);

        if(this.avancement < 0){
            this.game.avion.listProjectiles.Suppr(this);
            if(x < this.game.boss.x+100 && x > this.game.boss.x-100){
                this.game.boss.Touched();
            }
        }

        //ctx.fillRect(x-largeur/2,250 + this.avancement,100,100);
        ctx.drawImage(this.img,x-largeur/2,250 + this.avancement, largeur, hauteur);
    }

}