// erstelle die obj variablen
var canvas;
var ctx;

//Startet die function wenn die page geladen ist
window.onload = function() {
// gebe der canva eine context variable
canvas = document.getElementById("game-canvas");
ctx = canvas.getContext("2d");

//erstelle das canvas
ctx.fillStyle = "white";
ctx.fillRect(0,0,1280,720);
}