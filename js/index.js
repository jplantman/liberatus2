// function is called when preloading of assets is complete. we get passed preloadData containing all the assets that were loaded
function create(preloadData){ 
    // show the start game menu. 

    // controls //
    var controls = initControls();

    // camera //
    var camera = initCamera();
    // objectsToUpdate.game.push(camera);
    objectsToUpdate.camera = camera; // just to check collisions w camera, to know what to draw
    controls.camera = camera;
    
    // level.camera.following = level.controls.mousePosition;

    // init Classes
    Sprite = setupSpriteClass(preloadData, camera);
    Character = setupCharacterClass();
    Hero = setupHeroClass()
    Chest = setupChestClass();


    // load the level
    var level = initLevel( recursiveBacktracking(8, 8), 5 );
    // objectsToUpdate.push(level);
    level.camera = camera;
    level.controls = controls;
    controls.level = level;

    // player (not the character) //
    level.player = setupPlayer(level);
    objectsToUpdate.player = level.player;

    addUpdateToCamera(camera, level);

    // center camera around level start
    camera.x = level.startX*32*level.multiplier - camera.w/2;
    camera.y = level.startY*32*level.multiplier - camera.h/2;

    

    // // camera //
    // level.camera = initCamera(level);
    // objectsToUpdate.push(level.camera);
    // level.controls.camera = level.camera
    // // level.camera.following = level.controls.mousePosition;

    
    




    // var player = new Sprite("player", 100, 100, {
    //     modW: 64, modH: 64
    // });
    // player.frame = [3, 0];
    // objectsToUpdate.push(player);

    // start the loop! //
    lastTime = Date.now();
    loop();
}