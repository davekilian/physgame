
class Game {
    lastUpdate: number;
    ctx: CanvasRenderingContext2D;
    debugTime: 0;

    constructor() {
        this.lastUpdate = 0;
        this.ctx = (<HTMLCanvasElement>document.getElementById('physgame')).getContext('2d');
        this.debugTime = 0;
    }

    private mainLoop(time: number) {
        const FPS = 60;

        if (time - this.lastUpdate > 1000 / FPS) {
            let delta = (time - this.lastUpdate) / 1000;

            this.update(delta);   
            this.render(delta);

            this.lastUpdate = time;
        }

        window.requestAnimationFrame((t) => this.mainLoop(t));
    }

    private update(t: number) {
        this.debugTime += t;
    }

    private render(t: number) {
        let c = this.ctx;
        c.clearRect(0, 0, c.canvas.width, c.canvas.height);

        let color = Math.floor(255 * (.5 + .5 * Math.sin(this.debugTime)));
        c.fillStyle = `rgb(${color}, 0, 0)`;
        c.fillRect(0, 0, c.canvas.width, c.canvas.height);
    }

    start() {
        window.requestAnimationFrame((t) => this.mainLoop(t));
    }
}
