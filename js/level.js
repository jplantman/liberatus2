

function initLevel(levelData, multiplier){

    const squareSize = 32;

    // this function handles the task of populating each square with the right stuff
    function createGridSquare(tileData, x, y, level){
        var tile = new Sprite("ss", x*squareSize, y*squareSize, level);
        objectsToUpdate.tiles.push(tile);
        var environment, character, items;

        // choose a random version of a tile from the spritesheet
        var version = randy(3);


        if (tileData.open){
            // make this a floor tile
            tile.frame = [version, 1]; 
        } else {
            // make this a blocked tile (wall, or could be trees or rocks or something)
            tile.frame = [version, 0];
        }

        if (tileData.environment == "exit"){
            environment = new Sprite("ss", x*squareSize, y*squareSize, level);
            environment.frame = [0, 3];
            objectsToUpdate.environment.push(environment);
        } 
        else if (tileData.character == "hero"){
            character = new Hero("ss", x*squareSize, y*squareSize, level);
            character.frame = [0, 2];
            objectsToUpdate.hero1 = character;
        }
        else if (tileData.environment == "chest"){
            environment = new Chest("ss", x*squareSize, y*squareSize, level);
            environment.frame = [0, 4];
            objectsToUpdate.environment.push(environment)
        } 
    
    
    
        return {
            open: tileData.open, 
            tile: tile,
            character: character,
            environment: environment,
            items: tileData.items || 0
        }
    }


    var multiplier = multiplier || 5; // how much to expand each square in the raw data

    var level = {
        w: levelData.w*squareSize*multiplier,
        h: levelData.h*squareSize*multiplier,
        startX: levelData.startX,
        startY: levelData.startY,
        data: levelData,
        multiplier: multiplier
    };

    // console.log("levelData", levelData)

    // takes in the result of a procedural generation algorithm and turns it into a playable level and loads it to play

    // the levelData comes in without the pathways or anything being expanded so we gotta do all that stuff here
    
    // first we must expand the hallways by expanding each square of levelData.map into a larger one
    // x and y represent the coords from the unexpanded raw map data. mx and my are the modified x and y, which span the range of our multiplier (such that x == 0 converts to mx = 0 thru 4, when our multiplier is 5 that is)
    level.map = [];
    for (let y = 0; y < levelData.map.length; y++) {
        const row = levelData.map[y];

        // each y needs to be multiplied into 5 (or multiplier)
        for (let my = 0; my < multiplier; my++) {
            level.map[y*multiplier + my] = [];
            
            for (let x = 0; x < row.length; x++) {
                var dataCell = row[x];
                for (let mx = 0; mx < multiplier; mx++) {

                    // true x and y for the square in the level
                    var tx = x*multiplier + mx;
                    var ty = y*multiplier + my;

                    // we assume cells are open. then we check wall status and close accordingly
                    level.map[ty][tx] = createGridSquare({open: true}, tx, ty, level);
                    // check for north wall closed
                    if (my == 0 && dataCell.n == 1){
                        level.map[ty][tx] = createGridSquare({open: false}, tx, ty, level);
                    }
                    // check for south wall closed
                    if (my == multiplier-1 && dataCell.s == 1){
                        level.map[ty][tx] = createGridSquare({open: false}, tx, ty, level);
                    }
                    // check for west wall closed
                    if (mx == 0 && dataCell.w == 1){
                        level.map[ty][tx] = createGridSquare({open: false}, tx, ty, level);
                    }
                    // check for east wall closed
                    if (mx == multiplier-1 && dataCell.e == 1){
                        level.map[ty][tx] = createGridSquare({open: false}, tx, ty, level);
                    }

                    // are we in the middle of the 5x5 grid area? (or multiplier x multiplier)
                    var centerSquareOfArea = mx == Math.floor(multiplier/2) && my == Math.floor(multiplier/2);

                    // handle the starting cell
                    if (x == levelData.startX && y == levelData.startY && centerSquareOfArea){
                        // console.log(level.map[ty][tx])
                        level.map[ty][tx] = createGridSquare({open: true, character: "hero"}, tx, ty, level);
                        // handle the ending cell
                    } else if (x == levelData.endX && y == levelData.endY && centerSquareOfArea){
                        level.map[ty][tx] = createGridSquare({open: true, environment: "exit"}, tx, ty, level);
                    } else if (dataCell.f == 'c' && centerSquareOfArea){
                        // if there's a chest here
                        level.map[ty][tx] = createGridSquare({open: true, environment: "chest"}, tx, ty, level);
                    } 
                    
                    
                    
                }
    
                
            }
        }

        
        
    }
    // console.log(level, levelData);
    // level.update = function(){},
    // level.draw = function(dt){
    //     // console.log('drawing level');
    //     // this function will draw everything that is on the level's map array.
    //     // as I plan it now, that would be everything contained within the grid: walls, floors, characters, environment, and items. 
    //     // that only leaves spells, attacks, effects, etc to be off-grid and rendered by other functions
    //     for (let y = 0; y < this.map.length; y++) {
    //         const row = this.map[y];
    //         for (let x = 0; x < row.length; x++) {
    //             const cell = row[x];
    //             var cellIsInCameraView = true;
    //             if (cellIsInCameraView){
    //                 // just draw darkness if the player is too far to see here

    //                 // draw floor or wall
    //                 cell.tile.draw();
    //                 /* if (cell.open){ // old code tomdraw map with fillRect instead of sprites
    //                 //     // draw floor

    //                 // } else { 
    //                 //     // draw wall
    //                 //     ctx.fillStyle = '#333';
    //                 //     ctx.fillRect(x*squareSize + this.camera.x, 
    //                 //         y*squareSize + this.camera.y, 
    //                 //         squareSize, squareSize);
    //                 / }*/
    //                 // draw gridlines over the floor/walls

    //                 // draw items

    //                 // draw environment objects (traps, chests, exit, etc)
    //                 if (cell.environment){
    //                     cell.environment.update(dt)
    //                     cell.environment.draw();
    //                 }

    //                 // draw characters
    //                 if (cell.character){
    //                     cell.character.update(dt);
    //                     cell.character.draw(dt);
    //                 }
    //             }
                
    //         }
            
    //     }
    // }
    // console.log(level);
    return level;
}

// var levelData = recursiveBacktracking(7, 10);
// initLevel(levelData);

