var setupSpriteClass = function(data, camera){

        class Sprite{
            constructor(imgName, x, y, level, options){
                this.imgName = imgName;
                this.imgData = data.images[imgName];
                this.imgObj = this.imgData[0];
                this.frameWidth = this.imgData[1];
                this.frameHeight = this.imgData[2];
                this.w = this.frameWidth;
                this.h = this.frameHeight;
                this.wideness = 1; // for making the speed bar less wide
                this.frame = [0, 0];
                this.x = x;
                this.y = y;
                this.level = level;
                this.options = options;
                this.name = "Thing"
            }
            getTile(){
                // get the tile this is on
                var x = Math.floor(this.x/32);
                var y = Math.floor(this.y/32);
                return level
            }

            update(dt){}
            draw(){
                // highlight if this is selected
                if (this.isSelected){
                    ctx.fillStyle = '#602ecc';
                    ctx.globalAlpha = 0.5;
                    ctx.beginPath();
                    ctx.arc(
                        this.x - camera.x + this.frameWidth/2,
                        this.y - camera.y + this.frameHeight/2,
                        this.frameHeight/2,
                        0, 2*3.142
                    )
                    ctx.fill();
                    ctx.globalAlpha = 1;

                }
                // if (this.wideness != 1){
                //     console.log(this.wideness, this.frameWidth)
                // }

                ctx.drawImage(
                    this.imgObj,
                    this.frame[0]*this.frameWidth,
                    this.frame[1]*this.frameHeight,
                    this.frameWidth, this.frameHeight,
                    this.x - camera.x,
                    this.y - camera.y,
                    this.modW * this.wideness || this.frameWidth * this.wideness, 
                    this.modH || this.frameHeight
                )
            }
        }


    return Sprite;
}

    