class Game {
    constructor (canvas, largeur, hauteur) {
        this.canvas = canvas;
        this.largeur = largeur;
        this.hauteur = hauteur;
        this.decor = new Foret(this);
        this.background =  document.getElementById("background");
        this.imgCoeur = document.getElementById("coeur");
        this.imgCoeurLost = document.getElementById("coeurLost");
        this.startingScreen = document.getElementById("startingScreen")
        this.avion = new Avion(this);
        this.compteur =1;
        this.listEnnemi = new Liste();
        this.listItem = new Liste();
        this.keys = {};
        this.score = 0;
        this.lives = 3;
        this.gameOver = false;
        this.win = false;
        this.compteurInv=0;
        this.boss = new Boss(this);
        this.compteurGameOver = 66; // nombre d'images pour pouvoir relanbcer une partie après avoir finis une partie

        var image = new Image();
        image.src = document.getElementById("startingScreen").src;
        image.onload = function() {
            ctx.drawImage(image, 0, 0, largeur, hauteur);
        };


        this.debug = false; //affiche différents élements de programmation
        this.demo = false;  //augmente les dégats des tirs pour présenter plus rapidement
    }
  
    Update () {
        if(!this.gameOver){
            //ajouter des ennemis
            if(this.compteur%20 == 0){
                this.listEnnemi.Push(new Ennemi(this));
                this.score += 1;
            }
            //afficher background
            ctx = canvas.getContext('2d');
            ctx.drawImage(this.background,0,0);
            

            //mise à jour des élements
            this.decor.Update(ctx);
            this.boss.Update(ctx);
            this.listItem.Reverse().forEach(item => {
                item.Update(ctx);
            });
            this.listEnnemi.Reverse().forEach(ennemi => {
                ennemi.Update(ctx, false);
            });
            this.avion.Update(ctx);
            this.listEnnemi.Reverse().forEach(ennemi => {
                ennemi.Update(ctx, true);
            });

            //afficher vie du joueur
            for(let k=1; k<4;k++){
                if(this.lives >= k){
                    ctx.drawImage(this.imgCoeur,568+58*k,10,48,48);
                }else{
                    ctx.drawImage(this.imgCoeurLost,568+58*k,10,48,48);
                }
            }
            
            this.compteur++;
            this.compteurInv--;

            //mouvement avion
            if(this.keys["ArrowRight"]){
                this.avion.Right();
            }

            if(this.keys["ArrowLeft"]){
                this.avion.Left();
            }

            if(this.keys["Space"]){
                this.avion.Tir();
            }

            //debugZone
            if(this.debug){
                ctx.fillStyle = "#FF69B4";
                //dessiner ligne de fuites
                ctx.beginPath();
                ctx.moveTo(240, 220);
                ctx.lineTo(0, 600);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(560, 220);
                ctx.lineTo(800, 600);
                ctx.stroke();
                
            }
        }else{
            if(this.compteurGameOver ==0){
                if(this.keys["Space"]){
                    this.restart()
                }
            }else{
                this.compteurGameOver -= 1;
                if(this.compteurGameOver == 0){
                    ctx.drawImage(document.getElementById("reset"),100,430, 600,100);
                }
            }
        }
    }

    restart(){
        this.listEnnemi = new Liste();
        this.listItem = new Liste();
        this.boss = new Boss(this);
        this.compteur=1;
        this.score = 0;
        this.lives = 3;
        this.gameOver = false;
        this.win = false;
        this.compteurInv=0;
        this.compteurGameOver = 66; // nombre d'images pour pouvoir relanbcer une partie après avoir finis une partie

        ctx = canvas.getContext('2d');
        ctx.drawImage(document.getElementById("startingScreen"),0,0, this.largeur, this.hauteur);
    }

    LossHp(){
        if(this.compteurInv<0){
            if(!this.debug){
                this.lives -= 1;
            }
            if(this.lives == 0){
                this.win = false;
                //afficher gameover
                ctx.drawImage(document.getElementById("gameOver"),250,200,300,200);
                this.gameOver = true;
            }
            this.compteurInv = 90;
        }
    }
}