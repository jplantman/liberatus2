var setupHeroClass = function(){

    class Hero extends Character {
        constructor(imgData, x, y, options){
            super (imgData, x, y, options );

            this.type = "hero";
        }



    }

    return Hero;
}