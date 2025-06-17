function PLayer(x,y) {
    this.x = x;
    this.y = y;
    this.widht = 50;
    this.heigt = 100;

    this.step = function(){
        //move player
    }


    this.draw = function(){
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.widht, this.heigt)

    }
}