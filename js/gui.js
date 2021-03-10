// UI universal colors and styles
var backgroundColor1 = "#464646";
var backgroundTransparent = "rgba(0, 0, 0, 0.5)";
var foregroundColor = "#cecece";

// Game window. Canvas and all other elements go in here
var gameWindow = document.createElement('div');

gameWindow.style.display = "inline-block";
gameWindow.style.lineHeight = 0;
gameWindow.style.position = 'relative';

// create canvas
var canvas = document.createElement('canvas');
canvas.width = 64*10;
canvas.height = 64*6;
canvas.style.border = "3px solid "+backgroundColor1;
var ctx = canvas.getContext('2d');
canvas.style.display = "block";
canvas.style.width = 64*10+"px";// attempt at zooming in and out functionality
canvas.style.height = 64*6+"px";
canvas.style.marginBottom = "20px";
canvas.style.cursor = "pointer";
canvas.style.backgroundColor = 'black';

var paused = document.createElement('div');
paused.innerHTML = 'PAUSED';
paused.style.textAlign = 'center';
paused.style.position = 'absolute';
paused.style.top = canvas.height-20+'px';
paused.style.width = '100%';
paused.style.display = 'none';
paused.style.fontSize = "2em";
gameWindow.style.lineHeight = '2em';
paused.style.backgroundColor = backgroundTransparent;
paused.style.color = foregroundColor;


// sprite selected ui
var selectedUI = document.createElement('div');
selectedUI.style.display = 'none';
var selectedButton = document.createElement('div');
selectedButton.style.width = "100px";
selectedButton.style.height = "70px";
selectedButton.style.backgroundColor = foregroundColor;
selectedButton.style.border = "5px solid "+backgroundColor1;
selectedButton.style.display = "inline-block";
selectedButton.style.cursor = "pointer";
selectedButton.style.fontSize = "20px"
selectedButton.style.fontWeight = "bold";
selectedButton.style.textAlign = "center";
selectedButton.style.lineHeight = "70px";
selectedButton.style.verticalAlign = 'top';

var selectedBars = document.createElement('div');
selectedBars.style.display = 'inline-block';
// selectedBars.style.border = '1px solid green';
selectedBars.style.height = "70px";
selectedBars.style.width = '130px';
selectedBars.style.verticalAlign = 'top';
selectedBars.style.padding = "10px";
selectedBars.style.paddingBottom = 0;

selectedHealthBar = document.createElement('div');
selectedHealthBar.style.backgroundColor = 'red';
selectedHealthBar.style.width = '130px';
selectedHealthBar.style.height = '20px';
selectedHealthBar.style.borderRadius = "10px";

selectedManaBar = document.createElement('div');
selectedManaBar.style.backgroundColor = 'blue';
selectedManaBar.style.width = '130px';
selectedManaBar.style.height = '20px';
selectedManaBar.style.marginTop = "10px";
selectedManaBar.style.borderRadius = "10px";

selectedCancel = document.createElement('div');
selectedCancel.style.display = 'inline-block';
selectedCancel.style.width = "50px";
selectedCancel.style.height = "50px";
selectedCancel.style.border = "3px solid "+backgroundColor1;
selectedCancel.style.backgroundColor = foregroundColor;
selectedCancel.style.borderRadius = "50%";
selectedCancel.style.textAlign = "center";
selectedCancel.style.fontSize = "24px";
// selectedCancel.style.fontWeight = "800";
selectedCancel.style.lineHeight = "45px";
selectedCancel.style.cursor = "pointer";
selectedCancel.style.display = "none"
selectedCancel.innerHTML = "stop";
selectedCancel.character = undefined;
selectedCancel.addEventListener("click", function(){
    console.log(selectedCancel.character)
    selectedCancel.character.actionCue = [];
    selectedCancel.character.currentAction = undefined;
    selectedCancel.style.display = "none";
    selectedCancel.character = undefined;
});

// selectedActionCueDisplay
// selectedActionCue = document.createElement('div');
// selectedActionCue.style.display = 'inline-block';
// selectedActionCue.style.maxHeight = "50px";
// selectedActionCue.style.maxWidth = "240px";
// selectedActionCue.style.overflow = 'hidden';
// selectedActionCue.style.verticalAlign = 'top';



/// show all action elements as they currently are for passed character. make sure its the one currently selected, as that check is not handled here ///
// var actionURLs = {
//     "move": './images/misc/walk.png'
// }; 
// var showActionElements = function(character){
//     selectedActionCue.innerHTML = "";
//     for (let i = 0; i < character.actionCue.length; i++) {
//         (function(i){
//             const data = character.actionCue[i];
//             var elem = document.createElement('div');
//             elem.style.display = 'inline-block';
//             elem.style.width = "50px";
//             elem.style.height = "50px";
//             elem.style.marginRight = "5px";
//             elem.style.cursor = 'pointer';
//             elem.style.backgroundImage = "url('./images/misc/uiBox.png')";
//             elem.style.backgroundSize = "100% 100%";
//             var action = data[0];
//             var img = document.createElement('img');
//             img.setAttribute("src", actionURLs[action]); 
//             elem.appendChild(img);

//             img.addEventListener('click', function(i){
//                 // remove element and cancel this action
//                 character.actionCue.splice(i, 1);
//                 showActionElements(character);
//             })
//             selectedActionCue.appendChild(elem);
//         })(i);
//     }
// }




gameWindow.appendChild(canvas);
gameWindow.appendChild(paused);
selectedUI.appendChild(selectedButton);
selectedUI.appendChild(selectedBars);
selectedBars.appendChild(selectedHealthBar);
selectedBars.appendChild(selectedManaBar);
selectedUI.appendChild(selectedCancel);
// selectedUI.appendChild(selectedActionCue);
gameWindow.appendChild(selectedUI);
document.body.appendChild(gameWindow);