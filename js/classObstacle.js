function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  class Ennemi {
    constructor (game) {
        this.game = game;
        this.img =  document.getElementById("ennemi1");
        this.imgBehind =  document.getElementById("ennemi1Behind");
        this.imgExplBehind = [];
        this.imgExpl = [];
        for(let k=0; k<7; k++){
            this.imgExpl[k] = document.getElementById("explosion"+k);
            this.imgExplBehind[k] = document.getElementById("explosion"+k+"Behind");
        }
        this.compteurExpl = 0;
        this.explosed = false;
        this.avancement = -1; 
        this.attente = 30;
        this.largeurImg = 80;
        this.hauteurImg = 40;
        this.x = getRandomInt(800);
        this.zommEffect = 200; //350 pour un zoom en x2, 175 pour un zoom en x4
        this.pvmax = 50;
        this.pv = this.pvmax
    }
  
    Update (ctx, back) {
        this.avancement += 2;

        
        
        //calculer la taille et placement
        let largeur = this.largeurImg*(1+this.avancement/this.zommEffect);
        let hauteur = this.hauteurImg*(1+this.avancement/this.zommEffect);
        
        //collisions projectiles
        if(this.game.debug){
            ctx.fillStyle="pink";
            ctx.fillRect(this.x-80,220 + this.avancement,160, 30);
        }
        //afficher les projectiles
        this.game.avion.listProjectiles.ToArray().forEach(element =>{
            if(element.avancement+4 >= this.avancement && element.avancement-4 <= this.avancement && !this.explosed){
                if(this.x+80>=element.x && this.x-80<=element.x){
                    if(this.game.demo){
                        this.pv -=30;
                    }else{
                        this.pv -=20;
                    }
                    this.game.avion.listProjectiles.Suppr(element);
                    if(this.pv < 1){
                        if(getRandomInt(3) == 0){
                            this.game.listItem.Push(new Item(this.game, this.x, this.avancement));
                        }
                        this.explosed = true;
                    }
                }
            }
        });


        let decalage = 240-this.avancement*(24/35);
        let x = decalage + (this.x/2.5+0.6*(this.x/350)*this.avancement);

        if(back){ //avion derriere le joueur
            if(this.avancement > 250){
                //animation explosion
                if(this.explosed){
                    this.compteurExpl+=1;
                    if(this.compteurExpl == 21){
                        this.game.listEnnemi.Suppr(this);
                        return;
                    }
                    this.imgBehind = this.imgExplBehind[Math.floor(this.compteurExpl/3)]
                }
                //suppression ennemi
                if(this.avancement>=580){
                    this.game.listEnnemi.Suppr(this);
                    return;
                }
                //afficher l'avion
                ctx.drawImage(this.imgBehind,x - largeur / 2, 220 + this.avancement, largeur, hauteur);
            }
        }else{
            //update principale pour les avions 

            if(this.avancement<=250){ // avion devant le joueur
                //collisions
                if(this.avancement > 226 && this.avancement < 238){
                    //test collision bord droit
                    if(!this.explosed && x+largeur/2 < this.game.avion.x+this.game.avion.largeurImg/2 -25 && x+largeur/2 > this.game.avion.x-(this.game.avion.largeurImg/2) +25 ){ //10 est la reduction des hitbox
                        this.explosed = true; // on supprime l'element de la liste
                        this.game.LossHp();
                    }

                    //test collision bord gauche
                    if(!this.explosed && x-largeur/2 < this.game.avion.x+this.game.avion.largeurImg/2 -25 && x-largeur/2 > this.game.avion.x-(this.game.avion.largeurImg/2) +25 ){ //10 est la reduction des hitbox
                        this.explosed = true;
                        this.game.LossHp();
                    }
                }

                //animation explosion
                if(this.explosed){
                    this.compteurExpl+=1;
                    if(this.compteurExpl == 21){
                        this.game.listEnnemi.Suppr(this);
                        return;
                    }
                    this.img = this.imgExpl[Math.floor(this.compteurExpl/3)]
                }
                //afficher vie
                if(this.pv < this.pvmax && !this.explosed){
                    ctx.fillStyle = "black";
                    ctx.fillRect(x-this.pvmax/2-1, 209 + this.avancement, this.pvmax+2,6)
                    ctx.fillStyle = "darkred";
                    ctx.fillRect(x-this.pvmax/2, 210 + this.avancement, this.pvmax,4)
                    ctx.fillStyle = "green";
                    if(this.pv>0){
                        ctx.fillRect(x-this.pvmax/2, 210 + this.avancement, this.pv,4)
                    }
                }
                //afficher image avion
                ctx.drawImage(this.img,x-largeur/2,220 + this.avancement, largeur, hauteur);
            }
        }
    }

}