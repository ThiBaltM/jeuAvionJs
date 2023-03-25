
class Avion {
    constructor (game) {
        this.game = game;
        this.animate = 0;
        this.img =  {"0":[document.getElementById("plane0"), document.getElementById("plane1")],
        "1":[document.getElementById("plane10"), document.getElementById("plane11")],
        "2":[document.getElementById("plane20"), document.getElementById("plane21")],
        "3":[document.getElementById("plane30"), document.getElementById("plane31")],
        "4":[document.getElementById("plane40"), document.getElementById("plane41")],
        "5":[document.getElementById("plane50"), document.getElementById("plane51")],
        "6":[document.getElementById("plane60"), document.getElementById("plane61")],
        "-1":[document.getElementById("plane-10"), document.getElementById("plane-11")],
        "-2":[document.getElementById("plane-20"), document.getElementById("plane-21")],
        "-3":[document.getElementById("plane-30"), document.getElementById("plane-31")],
        "-4":[document.getElementById("plane-40"), document.getElementById("plane-41")],
        "-5":[document.getElementById("plane-50"), document.getElementById("plane-51")],
        "-6":[document.getElementById("plane-60"), document.getElementById("plane-61")]
        };
        this.imgActuelle = this.img[this.animate];
        this.velocity = 2;
        this.x = 305
        this.y = 400
        this.largeurImg = 220;
        this.hauteurImg = 220;
        this.angle=0;
        this.turning = false;
        this.compteurTir = 0;
        this.listProjectiles = new Liste();
        this.dispInv = true;
    }
  
    Update (ctx) {
        this.compteurTir -= 1;
        if(this.turning){
            this.turning = false;
        }else if(this.angle<2 && this.angle>-2){
            this.angle = 0;
        }else{
            if(this.angle < 0){
                this.angle += 2;
            }
            if(this.angle > 0){
                this.angle -= 2;
            }
        }
        //changer l'image de l'animation toutes les 4 frames;
        if(this.game.compteur%4==0){
            this.animate = 1-this.animate; // f(x) = 1-x  donc 0 donne 1 et 1 donne 0
        }
        //afficher image avion
        let numImage = 0;
        if(this.angle <0){
            numImage = Math.floor((this.angle*(-1))/7.5);
            numImage*=-1;
        }else{
            numImage = Math.floor(this.angle/7.5);
        }
        if(this.game.compteurInv > 0 && this.game.compteurInv%4 == 0){
            this.dispInv = !this.dispInv;
        }
        if(this.game.compteurInv <= 0 || (this.game.compteurInv > 0 && this.dispInv)){
            ctx.drawImage(this.img[numImage][this.animate],this.x-this.largeurImg/2,this.y, this.largeurImg, this.hauteurImg);
        }



        //mouvements
        if(this.x < 800 && this.angle>0){
            this.x += this.angle/5
        }
        if(this.x > 0 && this.angle<0){
            this.x += this.angle/5
        }

        //afficher les projectiles
        this.listProjectiles.ToArray().forEach(element =>{
            element.Update(ctx);
        });
    }

    Left(){
        //déplacement à droite
        this.turning = true;
        if(this.angle > -45){
            this.angle -= 7;
        }
    }

    Right(){
        //déplacement à gauche
        this.turning = true;
        if(this.angle < 45){
            this.angle += 7;
        }
    }

    Tir(){
        if(this.compteurTir < 1){
            this.compteurTir = 10;
            //créer une entitée projectile
            this.listProjectiles.Push(new Projectile(this.game));

        }
    }
}