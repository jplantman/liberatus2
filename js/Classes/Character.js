var setupCharacterClass = function(){

    class Character extends Sprite {
        constructor(imgData, x, y, options, level){
            super (imgData, x, y, options, level );

            this.gx = this.x; // helps us know where we are even if we are walking
            this.gy = this.y;

            this.viewDistance = 50;
            this.speed = 300;

            this.name = "Guy";
            this.actionCue = []; // holds actions to do after the current one
            this.currentAction;
            this.legal = {}; // holds functions that check if an action function is legal
            this.direction = 'd';

            this.health = 100;
            this.healthMax = this.health;
            this.mana = 100;
            this.manaMax = this.mana;
            

            // timer bar
            this.timerBar = new Sprite("ss", this.x, this.y, level);
            this.timerBar.frame = [1, 3];
            this.timerBar.wideness = 0;
            this.timerBar.actionTotalTime = 0; // record how long current action takes in total. helps calc % complete
            this.timerBar.update = function(dt){
                if (!level.isPaused){
                    // get shorter
                }
            }
        }

        walkPath(data, shiftClick){
            // later will handle shift clicks too
            this.actionCue = data;
            // console.log('set walking path with '+ data.length +" steps.")
        }

    //     action(action){
    //         // get what action we're doing and add it to the action cue
    //         if (action == 'moveUp'){    
    //             this.actionCue.push( {funcName: 'move', time: 10, param1: 'up'} ); // ['actionFunction', timeCost, parameters]
    //             // console.log('actionCue', this.actionCue.length)
    //         }
    //         else if (action == 'moveDown'){
    //             this.actionCue.push( {funcName: 'move', time: 10, param1: 'down'} ); // ['actionFunction', timeCost, parameters]
    //             // console.log('actionCue', this.actionCue.length)
    //         }
    //         else if (action == 'moveLeft'){
    //             this.actionCue.push( {funcName: 'move', time: 10, param1: 'left'} ); // ['actionFunction', timeCost, parameters]
    //             // console.log('actionCue', this.actionCue.length)
    //         }
    //         else if (action == 'moveRight'){
    //             this.actionCue.push( {funcName: 'move', time: 10, param1: 'right'} ); // ['actionFunction', timeCost, parameters]
    //             // console.log('actionCue', this.actionCue.length)
    //         }
    //         // if this is selected, update the gui to show actions
    //         if (this.level.player.selected === this){
    //             // showActionElements(this);
    //         }
    //     }
        moveTo(x, y){
            // basically teleports the character to x and y
            this.level.map[this.gy/32][this.gx/32].character = 0;
            this.level.map[y][x].character = this;
            this.x = x*32;
            this.y = y*32;
            this.gx = this.x;
            this.gy = this.y;
            this.timerBar.x = this.x;
            this.timerBar.y = this.y;
        }

    //     move(dir){
    //         // what grid square are we in?
    //         var x = Math.floor(this.gx/32);
    //         var y = Math.floor(this.gy/32);
    //         // what grid square are we moving to?
    //         var options = {
    //             'up': {x: 0, y: -1},
    //             'down': {x: 0, y: 1},
    //             'left': {x: -1, y: 0},
    //             'right': {x: 1, y: 0},

    //             'upleft': {x: -1, y: -1},
    //             'downleft': {x: -1, y: 1},
    //             'downleft': {x: -1, y: 1},
    //             'upright': {x: 1, y: -1}
    //         }
    //         var nx = x + options[dir].x;
    //         var ny = y + options[dir].y;

    //         // make sure we're right
    //         if ( this.level.map[y][x].character === this ){
    //             // is new x and y open?
    //             if (this.level.map[ny][nx].open){
    //                 this.level.map[y][x].character = 0;
    //                 this.level.map[ny][nx].character = this;
    //                 this.x = nx*32;
    //                 this.y = ny*32;
    //                 this.gx = this.x;
    //                 this.gy = this.y;
    //                 this.timerBar.x = this.x;
    //                 this.timerBar.y = this.y;
    //             }
    //         }
    //     }
    //     moveToIsLegal = function(){
    //         return true;
    //     }
    //     moveIsLegal = function(dir){
    //         // what grid square are we in?
    //         var x = Math.floor(this.x/32);
    //         var y = Math.floor(this.y/32);
    //         // what grid square are we moving to?
    //         var options = {
    //             'up': {x: 0, y: -1},
    //             'down': {x: 0, y: 1},
    //             'left': {x: -1, y: 0},
    //             'right': {x: 1, y: 0},

    //             'upleft': {x: -1, y: -1},
    //             'downleft': {x: -1, y: 1},
    //             'downleft': {x: -1, y: 1},
    //             'upright': {x: 1, y: -1}
    //         }
    //         var nx = x + options[dir].x;
    //         var ny = y + options[dir].y;
   
    //         // make sure we're right
    //         if ( this.level.map[y][x].character === this ){
    //             // is new x and y open?
    //             if (this.level.map[ny][nx].open){
    //                 return true;
    //             }
    //         }
    //    }

        // draw(){
        //     this.update()
        //     super.draw()
        // }

        // update(dt){
        //     super.update(dt);
        //     // if (this.level.isPaused){ return }
        //     if (this.actionCue.length){
        //         //we are doing an action
        //         this.timerBar.draw(); console.log('drawing timer bar')

        //         var currentAction = this.actionCue[0];
        //         if ( currentAction[1] > 0 ){
        //             // there's still time cost left on the timer bar. count down
        //         } else {
        //             // the time cost has been paid, complete the action
        //         }
        //     }
        // }


        update(dt){
            // should we be doing an action right now?
            if (!this.level.isPaused && (this.actionCue.length || this.currentAction)){

                // no current action. load one up
                if ( !this.currentAction ){
                    this.currentAction = this.actionCue.shift();
                    this.timerBar.actionTotalTime = this.currentAction.time;
                    // var isLegal = this[this.currentAction.funcName+"IsLegal"]( this.currentAction.param1, this.currentAction.param2, this.currentAction.param3 );
                    // if (isLegal){
                        
                    //     this.timerBar.actionTotalTime = this.currentAction.time;
                    //     this.timerBar.wideness = 1;
                    // } else {
                    //     this.actionCue.shift();
                    //     // ERR! Illegal move
                    // }
                    selectedCancel.style.display = "inline-block";
                    selectedCancel.character = this;
                }
                // if there's still time cost left on the timer bar... count down
                if ( this.currentAction.time > 0 ){
                    var speedModifier = this.speed/100;
                    this.currentAction.time -= dt/100 * speedModifier;
                    this.timerBar.wideness = this.currentAction.time / this.timerBar.actionTotalTime;
                    // if action is to walk, move in the right direction
                    // if (this.currentAction.funcName == 'move'){
                    //     if (this.currentAction.param1 == 'up'){
                    //         this.y -= 32 * (dt/100) / this.timerBar.actionTotalTime;
                    //         this.timerBar.y = this.y;
                    //     } else if (this.currentAction.param1 == 'down'){
                    //         this.y += 32 * (dt/100) / this.timerBar.actionTotalTime;
                    //         this.timerBar.y = this.y;
                    //     } else if (this.currentAction.param1 == 'left'){
                    //         this.x -= 32 * (dt/100) / this.timerBar.actionTotalTime;
                    //         this.timerBar.y = this.y;
                    //     } else if (this.currentAction.param1 == 'right'){
                    //         this.x += 32 * (dt/100) / this.timerBar.actionTotalTime;
                    //         this.timerBar.x = this.x;
                    //     }
                    // } else if (this.currentAction.funcName == 'moveTo'){
                    //     var dx = this.gx - this.currentAction.param1*32;
                    //     var dy = this.gy - this.currentAction.param2*32;
                    //     this.x -= dx * (dt/100) / this.timerBar.actionTotalTime;
                    //     this.y -= dy * (dt/100) / this.timerBar.actionTotalTime;
                    //     this.timerBar.x = this.x;
                    //     this.timerBar.y = this.y;
                    // }
                } else {
                // else, the time cost has been paid, complete the action

                    this.timerBar.actionTotalTime = 0;
                    // run the function for that action
                    this[this.currentAction.funcName]( this.currentAction.param1, this.currentAction.param2, this.currentAction.param3 );
                    this.currentAction = undefined;
                    selectedCancel.style.display = "none";
                    selectedCancel.character = undefined;
                }
            }
        }

        draw(dt){
            super.draw(dt);
            // if doing an action, show the timer bar
            if (this.currentAction){
                this.timerBar.draw();
            }
            
        }
    }


    return Character;
}