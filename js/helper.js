


function sortRand(a)
{
	var out = new Array();
	var l	= a.length;

	for(x in a)
	{
		do { var p = Math.floor(Math.random() * (l * 1000)) % l; } while(typeof out[p]!='undefined');

		out[p] = a[x];
	}

	return out;
}



function collides(cam, b){
    return cam.x + cam.w > b.x && cam.x < b.x + b.w && cam.y + cam.h > b.y && cam.y < b.y + b.h;
}


// function fogCheck(sprite, heroes){
//     // calculates fog status for a square (if its fogged or how much its fogged, based on distance from a hero)

//     for (let i = 0; i < heroes.length; i++) {
//         const hero = heroes[i];

//     }
// }



function distanceBetween(a, x, y){
    // how much distance (in 10s and 14s) between 2 things
	var dx = a.x/32 - x;
	var dy = a.y/32 - y;
	return Math.sqrt( dx*dx+dy*dy )*10;
}

function distanceBetweenSprites(a, b){
    // how much distance (in 10s and 14s) between 2 things
	var dx = a.x - b.x;
	var dy = a.y - b.y;
	return Math.sqrt( dx*dx+dy*dy )/32*10;
}