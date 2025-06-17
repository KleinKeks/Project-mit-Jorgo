// erstelle die obj variablen
var canvas;
var ctx;

//Startet die function wenn die page geladen ist
window.onload = function() {
// gebe der canva eine context variable
canvas = document.getElementById("game-canvas");
ctx = canvas.getContext("2d");

ctx.fillStyle = "red";
ctx.fillRect(10,10,50,50);
}