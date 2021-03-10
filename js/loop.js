var loopActive = true;
var objectsToUpdate = {
    tiles: [],
    characters: [],
    environment: [],
    items: [],
    camera: undefined,
    player: undefined,
    hero1: undefined,
    hero2: undefined,
    hero3: undefined

};
var lastTime;


       
function loop(){
    // console.log('looping');
    // erase everything
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // calculate dt
    var now = Date.now();
    var dt = now - lastTime;
    lastTime = now;
    // handle objects updates and draws
    updateAndDrawEverything(dt);
    // loop again
    if (loopActive){
        requestAnimationFrame(loop);
    }
}
// // start the loop! // we'll do it in create
// lastTime = Date.now();
// loop();


function updateAndDrawEverything(dt){

    // for (let i = 0; i < objectsToUpdate.game.length; i++) {
    //     objectsToUpdate.game[i].update(dt)
    //     objectsToUpdate.game[i].draw(dt);
    // }
    
    // for (let i = 0; i < objectsToUpdate.tiles.length; i++) {
    //     objectsToUpdate.tiles[i].draw();
    // }

    // for (let i = 0; i < objectsToUpdate.items.length; i++) {
    //     objectsToUpdate.items[i].draw();
    // }


    // for (let i = 0; i < objectsToUpdate.environment.length; i++) {
    //     objectsToUpdate.environment[i].update(dt)
    //     objectsToUpdate.environment[i].draw(dt);
    // }
    
    
    // for (let i = 0; i < objectsToUpdate.characters.length; i++) {
    //     console.log('collision test', collides(objectsToUpdate.characters[i], objectsToUpdate.camera) )
    //     objectsToUpdate.characters[i].update(dt)
    //     objectsToUpdate.characters[i].draw(dt);
    // }

    
    // for (let i = 0; i < objectsToUpdate.game.length; i++) {
    //     objectsToUpdate.game[i].update(dt)
    //     objectsToUpdate.game[i].draw(dt);
    // }

    objectsToUpdate.camera.update(dt);
    objectsToUpdate.camera.draw(dt);

    objectsToUpdate.player.update(dt);
    objectsToUpdate.player.draw(dt);

    

    // objectsToUpdate.camera.update(dt);
    // objectsToUpdate.camera.draw(dt);

    // objectsToUpdate.camera.update(dt);
    // objectsToUpdate.camera.draw(dt);
    
    for (let i = 0; i < objectsToUpdate.tiles.length; i++) {
        var tile = objectsToUpdate.tiles[i];
        if ( collides( objectsToUpdate.camera, tile ) ){
            var dist1 = distanceBetweenSprites(tile, objectsToUpdate.hero1);
            if (dist1 < objectsToUpdate.hero1.viewDistance){
                tile.draw();
            }
            
        }

    }

    for (let i = 0; i < objectsToUpdate.environment.length; i++) {
        var thing = objectsToUpdate.environment[i];
        if ( collides( objectsToUpdate.camera, thing ) ){
            var dist1 = distanceBetweenSprites(thing, objectsToUpdate.hero1);
            if (dist1 < objectsToUpdate.hero1.viewDistance){
                thing.update(dt)
                thing.draw(dt);
            }
            
        }
        
    }

    objectsToUpdate.hero1.update(dt);
    objectsToUpdate.hero1.draw(dt);
    
    
    // for (let i = 0; i < objectsToUpdate.characters.length; i++) {
    //     var character = objectsToUpdate.characters[i];
    //     if ( collides( objectsToUpdate.camera, character ) ){
    //         character.update(dt)
    //         character.draw(dt);
    //     }
    // }
    
}