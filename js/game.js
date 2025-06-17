// erstelle die obj variablen
var canvas;
var ctx;

//Startet die function wenn die page geladen ist
window.onload = function() {
// gebe der canva eine context variable
canvas = document.getElementById("game-canvas");
ctx = canvas.getContext("2d");

//Setup 

//Erstelle den Spieler
player = new Player("100,400");

// game loop
gameloop = setInterval(step, 1000/30);


function step(){
    //move player
    player.step();

    //Zeichne alles
    draw();
}

function draw(){
    //erstelle das canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,1280,720);

    player.draw();
    
}
}