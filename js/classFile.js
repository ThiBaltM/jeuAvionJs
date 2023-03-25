class File{
    constructor(longueurMax){
        this.longueur =0;
        this.longueurMax = longueurMax;
        this.entete = new Noeud();
    }
    
    AjoutValeur(val){
        if(this.longueur == 0){
            this.entete.valeur = val;
            this.longueur++;
        }
        else if(this.longueur < this.longueurMax){
            this.longueur++;
            this.entete = new Noeud(val, this.entete);
        }else{
            let tmp = this.entete;
            for(let k=0; k<this.longueurMax-1;k++){
                tmp = tmp.suivant;
            }
            tmp.suivant = null;
            this.entete = new Noeud(val, this.entete);
        }
    }

    toArray(){
        if(this.longueur == 0){
            return [];
        }
        let tmp = this.entete;
        let res =[tmp.valeur];
        let index = 0
        while(tmp.suivant != null){
            tmp = tmp.suivant;
            index ++;
            res[index] = tmp.valeur;
        }
        return res;
    }
}