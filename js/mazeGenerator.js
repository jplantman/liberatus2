// this file has the algorithm(s) to create level data, which is sent level.js to handle and load the level for the player to play through

// lets start by implemnenting recursive backtracking maze gereration. The only difference is we will make the pathways wider than just 1 cell, more like 3 or 4


function recursiveBacktracking (w, h){
    var maze = {};
    maze.w = w || 20;
    maze.h = h || 20;
    maze.map = [];

    // create starting grid. every cell has 4 walls that start out as blocked
    for (let y = 0; y < h; y++) {
        maze.map[y] = [];
        for (let x = 0; x < w; x++) {
            // each cell will have north south east and west walls. 0 is open, 1 is closed. all start closed
            // v is for visited - 0 is not visited, 1 is yes visited
            // f is a feature - 'e' for enemies, 'c' for chest, 't' for trap
            maze.map[y][x] = {n: 1, s: 1, e: 1, w: 1, v: 0, f: 0};
        }
    }
    maze.directions = ['n', 's', 'e', 'w'];
    maze.dirGuide = {
		'n' : { y : -1, x : 0, o : 's' },
		's' : { y : 1, x : 0, o : 'n' },
		'e' : { y : 0, x : 1, o : 'w' },
		'w' : { y : 0, x : -1, o : 'e' }
	};

    maze.startX = randy(w);
    maze.startY = randy(h);
    maze.endX; maze.endY;

    maze.step = function(x, y){
        // mix up the directions, ['n', 's', 'e', 'w'];
        maze.dirs = sortRand(maze.directions);
        for (let i = 0; i < maze.dirs.length; i++) {
            // we are visiting this cell
            maze.map[y][x].v = 1;

            // attempt to add a random maze (f)eature, such as (t)rap, (e)nemy, (c)hest, etc
            var rand = Math.random();
            if (rand < 0.03){
                maze.map[y][x].f = 't';
            } else if (rand < 0.06){
                maze.map[y][x].f = 'e';
            } else if (rand < 0.09){
                maze.map[y][x].f = 'c';
            }

            const dir = maze.dirs[i]; // for each direction
            // get the cell in that directions
            var nx = x + maze.dirGuide[dir].x;
            var ny = y + maze.dirGuide[dir].y;
            // console.log('map gen. current cell: ', x, y, " checking direction: ", dir, " cell in that direction is ", nx, ny);
            // if direction is in map bounds, and is not visited
            if ( nx >= 0 && nx < maze.w && ny >= 0 && ny < maze.h && maze.map[ny][nx].v == 0 ){
                // open up the path between these 2 cells
                maze.map[y][x][dir] = 0;
                var oppositeDir = maze.dirGuide[dir].o;
                maze.map[ny][nx][oppositeDir] = 0;
                // mark new cell as visited
                maze.map[ny][nx].v = 1;
                // record this spot as the end. if it isnt really the end, it will get over-ridden
                maze.endX = nx;
                maze.endY = ny;
                // run the next step for the next cell
                maze.step(nx, ny);
            }
        }
    }

    maze.step( maze.startX, maze.startY );
    return maze;

}



// function recursiveBacktracking(width, height){
//     //http://weblog.jamisbuck.org/2010/12/27/maze-generation-recursive-backtracking

//     // create a grid to start out.
//     // remember each cell starts with all 4 walls being closed
//     var grid = [];
//     for (let y = 0; y < height; y++) {
//         grid.push([]);
//         for (let x = 0; x < width; x++) {
//             // each cell will have north south east and west walls. 1 is closed. 0 is open
//             // v is for visited - 0 is not visited, 1 is yes visited
//             grid[y].push( {n: 1, s: 1, e: 1, w: 1, v: 0} );
//         }
        
//     }

//     var findRandomUnvisitedNeigbour = function(cell, x, y){
//         var possibilities = ['n', 's', 'e', 'w'];
//         while (possibilities.length){
//             var randomDirection = randy(possibilities.length);
//             var directionBeingChecked = possibilities.splice(randomDirection, 1)[0];
//             // var directionIsWithinBounds = 
//         }
//     }



//     // now for the algorithm, we'll need a stack. current cell is 0 in the stack. (beginning is top)
//     var stack = [];
//     // start by picking a random cell and add it to the stack
//     var startX = randy(width);
//     var startY = randy(height);
//     var startingCell = grid[startY][startX];
//     stack.push(startingCell)

    
//     // while theres still cells in the stack...
//     while (stack.length){
//         // mark the current cell as visited
//         stack[0].v = 1;
//         // find a random, unvisited neigbour

//     }
//     startingCell.v = 1;
//     // find an unvisited neigbour and carve a passage
    



//     console.log(grid, startX, startY);
// }

// // recursiveBacktracking(6, 12);