
function physgame_main() {
    var c = (<HTMLCanvasElement>document.getElementById('physgame')).getContext('2d');

    c.clearRect(0, 0, c.canvas.width, c.canvas.height);

    c.fillStyle = "black";
    c.fillRect(0, 0, c.canvas.width, c.canvas.height);
}
