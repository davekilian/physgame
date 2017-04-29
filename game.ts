
function physgame() {
    let canvas = document.getElementById('physgame') as HTMLCanvasElement;
    new Kernel(canvas).exec(new TestScene());
}
