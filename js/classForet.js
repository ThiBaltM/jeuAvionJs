
class Foret {
    constructor (game) {
        this.game = game;
        this.canvas = game.canvas;
        this.rangeesArbres = new File(12);
        for(let k=12; k>=0; k--){
            let tmp = [];
            for(let i=0; i<20; i++){
                tmp[i] = new Arbre(game,i,30*k);
            }
            this.rangeesArbres.AjoutValeur(tmp);
        }
    }
  
    Update (ctx) {
        //ajouter une rangée d'arbre toutes les 3 itérantion de boucle principales
        if(this.game.compteur%3 == 0){
            let tmp = [];
            for(let i=0; i<20; i++){
                tmp[i] = new Arbre(game,i);
            }
            this.rangeesArbres.AjoutValeur(tmp);
        }
        //afficher image arbres
        this.rangeesArbres.toArray().forEach(element => {
            element.forEach(tree => {
                tree.Update(ctx);
            });
        });
    }

}