function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  class Boss {
    constructor (game) {
        this.game = game;
        this.img = document.getElementById("boss");
        this.largeurImg = 200;
        this.hauteurImg = 60;
        this.x = 400;
        this.cible = 400;
        this.maxpv = 100;
        this.pv = this.maxpv;
    }
  
    Update (ctx) {
        //changer de destination
        if(this.cible == this.x && this.game.compteur%60==0){
            if(Math.random() < 0.5){
                this.cible = getRandomInt(320)+240;
            }
        }
        if(this.cible < this.x){
            this.x -= 1;
        }else if(this.cible > this.x){
            this.x+= 1;
        }
        ctx.fillStyle = "black";
        ctx.fillRect(400-this.maxpv*2-1, 100, this.maxpv*4+4,12)
        ctx.fillStyle = "darkred";
        ctx.fillRect(400-this.maxpv*2, 102, this.maxpv*4,8)
        ctx.fillStyle = "green";
        if(this.pv>0){
            ctx.fillRect(400-this.maxpv*2, 102, this.pv*4,8)
        }
        if(this.game.debug){
            ctx.fillStyle="red";
            ctx.fillRect(this.x-100, 220, 200, 60);
        }
        //afficher image
        ctx.drawImage(this.img,this.x-this.largeurImg/2,220, this.largeurImg, this.hauteurImg);
    }
    Touched(){
        if(this.game.demo){
            this.pv -=10;
        }else{
            this.pv -= 2;
        } 
        if(this.pv < 1){
            this.game.gameOver = true;
            this.game.win = true;
            ctx.drawImage(document.getElementById("victory"),200,200,400,200);
        }
    }

}