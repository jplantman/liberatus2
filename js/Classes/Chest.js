var setupChestClass = function(){

    class Chest extends Sprite{
        constructor(imgName, x, y, level, options){
            super (imgName, x, y, level, options);


            this.type = "chest";

        }

        open(){
            console.log('opening chest');
        }
    }



    return Chest
}