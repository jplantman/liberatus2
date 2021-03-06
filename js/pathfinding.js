
	// A* pathfinding algorithm
	// https://www.youtube.com/watch?v=-L-WgKMFuhE&t=329s

var findPath = function(start, end, grid, totalRows, totalCols, who){
    // console.log('finding Path with: ', start, end, grid, totalRows, totalCols);

    var open = [ // nodes to check
        { c: start[0], r: start[1], g: 0 } // start node is added right away
    ]; 
    var closed = []; // nodes already checked

    var solution = undefined;
    var closestToSolution = undefined; // save the closest solution. we walk here in case of failure
    var attempts = 0;
    while ( !solution ){
        attempts++;
        // current = the node with the lowest F value in OPEN
        var current = undefined, index;
        for (var i = open.length - 1; i >= 0; i--) {
            var node = open[i];
            // console.log('checking nodes in open for lowest f: ', node)
            if ( !current || node.f < current.f ){
                current = node;
                index = i;
            }
        };
        // remove current node from OPEN, add to CLOSED
        closed.push ( open.splice(index, 1) );
        // if current == target, or already tried hard enough, done!
        if ( current.c == end[0] && current.r == end[1] ){
            // console.log('==== DONE ====');
            solution = current;	
            // console.log(current);
            break;
        } else if ( attempts > 10000 ){
            // console.log('==== GIVE UP ====');
            // solution = undefined;
            // console.log(current);
            break;
        }
        

        // for each neighbor of the current node
        var neighbors = [
            [current.c-1, current.r-1, 14], [current.c, current.r-1, 10], [current.c+1, current.r-1, 14],
            [current.c-1, current.r, 10],                                 [current.c+1, current.r, 10],
            [current.c-1, current.r+1, 14], [current.c, current.r+1, 10], [current.c+1, current.r+1, 14]
        ];
        // console.log('===================');
        // console.log('running loop with: current - ', current)
        // skip neighbors that don't exist, are blocked, or are in CLOSED
        // also, skip neighbors that have either diagonals blocked, e.g.:
        //      SB    (cant walk diagonally if one of the diagonal squares is blocked... must go around)
        //      OE
        for (var i = neighbors.length - 1; i >= 0; i--) {
            var neig = neighbors[i];
            // console.log('checking neig', neig);
            // is neighbor out of bounds?
            // console.log('is out of bounds?')

                            var neigBlock;
            if ( grid[neig[1]] ){ // figure out if that block exists on the grid
                neigBlock = grid[neig[1]][neig[0]];
            }
            if ( !neigBlock ){ // if it doesn't, remove this as a neighbor
                neighbors.splice(i, 1);
                // console.log('yes. (remaining neighbors):', neighbors);
                continue;
            }


            // var neighborIsOutOfBounds = neig.c < 0 || neig.c >= totalCols || neig.r < 0 || neig.r >= totalRows;
            // if (neighborIsOutOfBounds){
            // 	neighbors.splice(i, 1);
            // 	// console.log('yes. (remaining neighbors):', neighbors);

            // 	continue;
            // }
            // console.log('no')
            // is neighbor blocked, or a water tile?
            // // console.log('is neig blocked, or a water tile?');
            // var neigBlock = grid[neig[1]][neig[0]];
            // console.log(neig, neigBlock)
            // console.log('here\'s the actual block: ', neigBlock);
            // var neighborIsBlockedOrWater =  neigBlock.blockable || neigBlock.type == 'water';
            if (!neigBlock.open){
                neighbors.splice(i, 1);
                // console.log('yes. (remaining neighbors):', neighbors);
                continue;
            }
            // console.log('no')
            // is neighbor already in closed?
            // console.log('is neig already in closed? (here\'s closed: ', closed.length);
            for (var n = closed.length - 1; n >= 0; n--) {
                var closedNode = closed[n];
                if (closedNode.c == neig[0] && closedNode.r == neig[1]){
                    neighbors.splice(i, 1);
                    // console.log('!!!!! node '+neig[0]+', '+neig[1]+' is already in closed')
                    break;
                }
            };
            // console.log('no')

            // is neighbor diagonally blocked? 
            // (we wont care for now. but later, make sure to remove these neighbors here)
        };
        // valid neighbors ascertained. in array format [c, r]
        // console.log('valid neighbors ascertained for ['+neig+'] -- ', neighbors.length);
        
        // if neighbor is not in OPEN, or if new path to neighbor is shorter...
        for (var i = neighbors.length - 1; i >= 0; i--) {
            // console.log('running neighbor processing')
            var neig = neighbors[i];
            // console.log('is neighbor already in open?');
            var neigAsInOpen = false;
            for (var n = open.length - 1; n >= 0; n--) {
                if (open[n].c == neig[0] && open[n].r == neig[1]){
                    neigAsInOpen = open[n];
                    break;
                }
            };
            // console.log('result, neigAsInOpen == '+neigAsInOpen);

            // if neighbor was in open, check if new path to neighbor is shorter (aka if the G cost is lower from here)
            var newPathIsShorter = false;
            // if ( neigAsInOpen ){
            // 	// to see if the new path is shorter, check if g is 
            // 	// console.log('CHECKING IF NEW PATH IS SHORTER')
            // 	var oldG = neigAsInOpen.g + current.g;
            // 	var newG = neig[2] + current.g;
            // 	if (newG < oldG){
            // 		newPathIsShorter = true;
            // 	}
            // }

            //XXXX HEY: this is going into helpers.js, so it can be used elsewhere, too.
            function calcH(c, r, ec, er){ // col, row, endcol, endrow
            	// console.log('CALC H', c, r, ec, er);
            	// find c and r distance
            	var cdist = Math.abs(c-ec);
            	var rdist = Math.abs(r-er);
            	// the smallest number == number of 14's
            	// the biggest - smallest == number of 10's
            	var smallest = cdist <= rdist ? cdist : rdist;
            	var biggest = cdist > rdist ? cdist : rdist;
            	// console.log( 'h = ',smallest*14 + ( biggest-smallest )*10 );
            	return smallest*14 + ( biggest-smallest )*10;
            }

            // done checking those 2 conditions...
            if ( !neigAsInOpen || newPathIsShorter ){
                // properly node-ify the neig from an array, unless it already was a node in OPEN
                var neighbor = neigAsInOpen ? neigAsInOpen : { c: neig[0], r: neig[1] };
                // calculate g, h, f
                neighbor.g = neig[2] + current.g;
                neighbor.mt = neig[2]; // save this val to calc the movement time later
                neighbor.h = calcH(neig[0], neig[1], end[0], end[1]);
                neighbor.f = neighbor.g + neighbor.h;
                
                // set parent of neig to current
                neighbor.p = current;

                // if this is our best answer yet, save it
                if ( !closestToSolution || closestToSolution.h > neighbor.h ){
                    closestToSolution = neighbor;
                }

                // if neig wasn't in open, add it.
                if ( !neigAsInOpen ){
                    open.push( neighbor );
                    // console.log('added to open', neighbor, open.length)
                }
            }
        };





        // // end for testing
        // console.log('ending now...')
        // solution = neighbors;

    } // end while loop

    if (solution || closestToSolution){
        // process solution	into an array of steps
        var steps = [];
        var doneProcessing = false;
        var currentStep = solution || closestToSolution;
        while ( !doneProcessing ){
            steps.unshift( {funcName: 'moveTo', time: currentStep.mt, param1: currentStep.c, param2: currentStep.r } ); // add from the left
            if ( !currentStep.p ){ // if current step has no parent, done
                doneProcessing = true;
            } else {
                currentStep = currentStep.p;
            }
        }
        // remove the first step, because it redundantly is the square that you're already on
        steps.shift();

        // have whoever (the player, for now) preform these walking steps
        who.walkPath( steps, solution ? undefined : closestToSolution.h ); // if there was no solution, send along the h value to the closest solution (so, he will walk right up to a rock, even though he cant walk on top of it)

    } else { // shouldnt happen anymore, since we added a closestToSolution
        // no solution, function has given up
        app.ui.text.log("Can't reach there", "red")
        console.log('closestToSolution:', closestToSolution);
    }


    
    // console.log(solution);
} // find path function ends here







