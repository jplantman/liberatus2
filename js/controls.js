// click to move

// controls will record and store all data relating to what is being inputted (through the mouse and keyboard)
// the game can check controls and adjust accordingly

var initControls = function(){

    // this is the controls data the player gets to see
    controls = {
        mouseIsDown: false, // == false if not down, or if it is down, it == the number of which mouse button is down
        mousePosition: {x: undefined, y: undefined},
        justClicked: false,
        wheel: undefined
    }

    canvas.addEventListener('mousedown', function(e){
        controls.mouseIsDown = e.which;
        controls.justClicked = true;
        // controls.mousePosition = [e.offsetX , e.offsetY];
        controls.mousePosition.x = e.offsetX;
        controls.mousePosition.y = e.offsetY; // gotta correct for the camera position for these coords to represent the game world
        
    });

    canvas.addEventListener('contextmenu', function(e){
        e.preventDefault();
    });

    canvas.addEventListener('mouseup', function(){
        controls.mouseIsDown = false;
        controls.justClicked = false;
    });
    

    canvas.addEventListener('mousemove', function(e){
        // console.log('mousemove', e)
        // controls.mousePosition = [e.offsetX , e.offsetY];
        controls.mousePosition.x = e.offsetX;
        controls.mousePosition.y = e.offsetY;
        // console.log(controls.mousePosition)
    });

    // keyboard //
    controls.keyboard = {};
 
    document.addEventListener("keydown", function(e){
        console.log(e.key)
        controls.keyboard[e.key] = 'justDown';
    });
    
    document.addEventListener("keyup", function(e){
        controls.keyboard[e.key] = false;
    });

    // canvas.addEventListener('wheel', function(e){
    //     if (controls.camera){
    //         // console.log( e.deltaY );
    //         if (e.deltaY > 0 && canvas.width < 64*50){
    //             canvas.width += e.deltaY;
    //             canvas.height += e.deltaY;
    //             controls.camera.x += e.deltaY * 0.5;
    //             controls.camera.y += e.deltaY * 0.5;
    //         } else if (e.deltaY < 0 && canvas.width > 64*7){
    //             canvas.width += e.deltaY;
    //             canvas.height += e.deltaY;
    //             controls.camera.x += e.deltaY * 0.5;
    //             controls.camera.y += e.deltaY * 0.5;
    //         }
    //     }
    // });

    controls.update = function(dt){
        if (controls.mouseIsDown && controls.justClicked){
            controls.justClicked = false;
            var squareSize = 32;
            var x = Math.floor((controls.mousePosition.x + controls.camera.x)/squareSize);
            var y = Math.floor((controls.mousePosition.y + controls.camera.y)/squareSize);

            // cant figure out how to handle zooming and click position calculation
            // console.log("mouse x is at ", controls.mousePosition.x, " camera at:", controls.camera.x);
            // console.log("difference is:", controls.mousePosition.x - controls.camera.x )
            // console.log("zoom level: ", controls.camera.zoomFactor)
            // console.log("mouse x times zoom lvl", controls.mousePosition.x * controls.camera.zoomFactor )
            // console.log('square x and y:', x, y);

            var squareClicked = controls.level.map[y][x];
            // console.log(squareClicked);
            if (squareClicked.character && squareClicked.character.select){
                // if there's a character here that can be selected, select it!
                squareClicked.character.select();
            }

            
        }
        
        
    }


    return controls;
}















// keyboard controls




