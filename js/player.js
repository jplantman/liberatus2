var setupPlayer = function(level){
    var player = {
        selected: 0,
        level: level,

        deselect: function(sprie){
            this.selected.isSelected = false;
            selectedUI.style.display = "none";
            this.selected = 0;

            selectedCancel.style.display = "none";
            selectedCancel.character = undefined;
            
        },
        select: function(sprite){
            // console.log('select', sprite.x, sprite.y, 'cam', this.level.camera.x, this.level.camera.y, this.level.camera.w)
            if (this.selected != sprite){
                this.deselect();
                this.selected = sprite;
                // console.log(sprite)
                selectedButton.innerHTML = sprite.name;
                selectedUI.style.display = "inline-block";
                sprite.isSelected = true;
                // does this have health and mana?
                if (sprite.health){
                    selectedBars.style.display = "inline-block";
                    selectedHealthBar.width = 130 * sprite.health/sprite.healthMax + "px";
                } else {
                    selectedBars.style.display = "none";
                }
                // does this have an action cue?
                // if (sprite.actionCue){
                //     selectedCancel.style.display = "inline-block";
                //     selectedCancel.character = sprite;
                // } else {
                //     selectedCancel.style.display = "none";
                //     selectedCancel.character = undefined;
                // }

                // selectedActionCue.innerHTML = "";
                // if (sprite.actionCue){
                //     showActionElements(sprite)
                // }
                
            } else {
                this.deselect();
            }
        },

        draw: function(){},
        update: function(dt){
            if (controls.keyboard[' '] == "justDown"){
                controls.keyboard[' '] = true;
                this.level.isPaused = !this.level.isPaused;
                paused.style.display = this.level.isPaused ? "block" : "none";
            }

            // // if selecting
            // if (this.selected){
            //     // console.log(controls.keyboard)
            //     // if selecting a hero
            //     if (this.selected.type == 'hero'){
            //         // if you press wasd or ArrowKeys
            //         ///// Movement /////
            //         // if (controls.keyboard['w'] == "justDown"){
            //         //     controls.keyboard['w'] = true;
            //         //     this.selected.action('moveUp');
            //         // }
            //         // if (controls.keyboard['ArrowUp'] == "justDown"){
            //         //     controls.keyboard['ArrowUp'] = true;
            //         //     this.selected.action('moveUp');
            //         // }
            //         // if (controls.keyboard['s'] == "justDown"){
            //         //     controls.keyboard['s'] = true;
            //         //     this.selected.action('moveDown');
            //         // }
            //         // if (controls.keyboard['ArrowDown'] == "justDown"){
            //         //     controls.keyboard['ArrowDown'] = true;
            //         //     this.selected.action('moveDown');
            //         // }

            //         // if (controls.keyboard['a'] == "justDown"){
            //         //     controls.keyboard['a'] = true;
            //         //     this.selected.action('moveLeft');
            //         // }
            //         // if (controls.keyboard['ArrowLeft'] == "justDown"){
            //         //     controls.keyboard['ArrowLeft'] = true;
            //         //     this.selected.action('moveLeft');
            //         // }
            //         // if (controls.keyboard['d'] == "justDown"){
            //         //     controls.keyboard['d'] = true;
            //         //     this.selected.action('moveRight');
            //         // }
            //         // if (controls.keyboard['ArrowRight'] == "justDown"){
            //         //     controls.keyboard['ArrowRight'] = true;
            //         //     this.selected.action('moveRight');
            //         // }

            //         // if (controls.mouseIsDown == 3 && controls.justClicked){
            //         //     controls.justClicked = false;
            //         //     // target x and y
            //         //     var tx = Math.floor((controls.mousePosition.x + level.camera.x)/32);
            //         //     var ty = Math.floor((controls.mousePosition.y + level.camera.y)/32);
            //         //     var squareClicked = level.map[ty][tx]
            //         //     // character x and y
            //         //     var cx = this.selected.gx/32;
            //         //     var cy = this.selected.gy/32
            //         //     // console.log('prep', level)
            //         //     // console.log('squareClicked', squareClicked, cx, cy, tx, ty);
            //         //     var totalRows = level.w/32;
            //         //     var totalCols = level.h/32;
            //         //     findPath([cx, cy], [tx, ty], level.map, totalRows, totalCols, this.selected)
            //         // }
            //     }
            // }
            
            
            /// Handle a click from the player /////
            if (level.controls.mouseIsDown && level.controls.justClicked){
                level.controls.justClicked = false;
                var squareSize = 32;
                var ax =  level.controls.mousePosition.x + level.camera.x; // adjusted for camera ax and ay
                var ay =  level.controls.mousePosition.y + level.camera.y; 
                var x = Math.floor(ax/squareSize); // grid x and y
                var y = Math.floor(ay/squareSize);
                
                // cant figure out how to handle zooming and click position calculation
                // console.log("mouse x is at ", controls.mousePosition.x, " camera at:", controls.camera.x);
                // console.log("difference is:", controls.mousePosition.x - controls.camera.x )
                // console.log("zoom level: ", controls.camera.zoomFactor)
                // console.log("mouse x times zoom lvl", controls.mousePosition.x * controls.camera.zoomFactor )
                // console.log('square x and y:', x, y);
    
                var squareClicked = level.map[y][x];
                // console.log(squareClicked);
                // if right clicked on a character
                if (squareClicked.character && level.controls.mouseIsDown == 1){
                    this.select(squareClicked.character);
                } else if (squareClicked.environment && level.controls.mouseIsDown == 1){
                    this.select(squareClicked.environment);
                } else if (squareClicked.environment && level.controls.mouseIsDown == 3){
                    // right clicked on environment
                    if (this.selected && this.selected.type == 'hero'){
                        // selected hero is interacting with this environment object
                        var dist = distanceBetweenSprites(this.selected, squareClicked.environment )
                        if (dist < 15){
                            if (squareClicked.environment.type == 'chest'){
                                squareClicked.environment.open();
                            }
                        }
                    }
                } else {
                    // clicked on an empty square
                    if (this.selected){
                        console.log('dist bt', distanceBetween( this.selected, x, y ) );
                        // if selecting something and right click on empty... walk there
                        if (this.selected.type == 'hero' && level.controls.mouseIsDown == 3){
                            // we are selecting a hero. move to clicked empty spot
                            // console.log("move to here", squareClicked)
                            var squareClicked = level.map[y][x]
                            // character x and y
                            var cx = this.selected.gx/32;
                            var cy = this.selected.gy/32
                            // console.log('prep', level)
                            // console.log('squareClicked', squareClicked, cx, cy, tx, ty);
                            var totalRows = level.w/32;
                            var totalCols = level.h/32;
                            findPath([cx, cy], [x, y], level.map, totalRows, totalCols, this.selected)
                        }
                    }
                } 
            }
            
        }
    }

    // selectedCancel.addEventListener("click", function(){
    //     console.log(player.selected)
    //     player.selected.actionCue = [];
    // });



    return player;

}