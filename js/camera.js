var initCamera = function(){
    var camera = {
        w: canvas.width,
        h: canvas.height,
        x: 0,
        y: 0,
        draggingMode: true,
        following: undefined,
        // update: function(dt){
        //     if (this.following){
        //         this.x = this.following.x;
        //         this.y = this.following.y;
        //     }
        //     else if (this.draggingMode){
        //         // if the mouse was down last time and is down this time, we are dragging the camera
        //         if (level.controls.mouseWasDown && level.controls.mouseIsDown){
        //             var dx = level.controls.lastMousePosition.x - level.controls.mousePosition.x;
        //             var dy = level.controls.lastMousePosition.y - level.controls.mousePosition.y;

        //             var zoomFactor = canvas.width / ( 64*10 )

        //             this.x -= dx*zoomFactor;
        //             this.y -= dy*zoomFactor;
        //         }

        //         // save last mouse status so we can check for dragging
        //         if (level.controls.mouseIsDown){
        //             level.controls.mouseWasDown = true;
        //             level.controls.lastMousePosition = {x: level.controls.mousePosition.x, y: level.controls.mousePosition.y }
        //         } else {
        //             level.controls.mouseWasDown = false;
        //             level.controls.lastMousePosition = 0;
        //         }
        //     }
                
        //     // this.world.bound(camera);
        //     // console.log("camera: ", this.x, this.y)
            
        // },
        draw: function(){}    
    }


    // add update method AFTER level is initiated. the weird order thing


    // OLD Camera offsets: (or reverse the + / -)
    // + this.camera.x - this.camera.width/2
    // + this.camera.y - this.camera.height/2


    return camera;
}

var addUpdateToCamera = function(camera, level){
    camera.update = function(dt){
        camera.zoomFactor = canvas.width / ( 64*10 );
        
        if (this.following){
            this.x = this.following.x;
            this.y = this.following.y;
        }
        else if (this.draggingMode){
            // if the mouse was down last time and is down this time, we are dragging the camera
            if (level.controls.mouseWasDown && level.controls.mouseIsDown){
                var dx = level.controls.lastMousePosition.x - level.controls.mousePosition.x;
                var dy = level.controls.lastMousePosition.y - level.controls.mousePosition.y;

                

                this.x += dx//*camera.zoomFactor;
                this.y += dy//*camera.zoomFactor;
            }

            // save last mouse status so we can check for dragging
            if (level.controls.mouseIsDown){
                level.controls.mouseWasDown = true;
                level.controls.lastMousePosition = {x: level.controls.mousePosition.x, y: level.controls.mousePosition.y }
            } else {
                level.controls.mouseWasDown = false;
                level.controls.lastMousePosition = 0;
            }
        }
            

        // this.world.bound(camera);
        if (camera.x < 0){ 
            camera.x = 0;
        }
        if (camera.x + camera.w > level.w){ 
            camera.x = level.w - camera.w;
        }
        if (camera.y < 0){ 
            camera.y = 0;
        }
        if (camera.y + camera.h > level.h){
            camera.y = level.h - camera.h;
        }

        // console.log("camera: ", this.x, this.y)
        
    }
}
