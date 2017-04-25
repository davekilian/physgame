
class Game implements SceneStack {
    lastUpdate: number;
    ctx: CanvasRenderingContext2D;
    scenes: Scene[];

    constructor() {
        this.lastUpdate = 0;
        this.ctx = (<HTMLCanvasElement>document.getElementById('physgame')).getContext('2d');
        this.scenes = [ ];
    }

    private mainLoop(time: number): void {
        const FPS = 60;

        if (time - this.lastUpdate > 1000 / FPS) {
            let delta = (time - this.lastUpdate) / 1000;

            this.update(delta);   
            this.render(delta);

            this.lastUpdate = time;
        }

        window.requestAnimationFrame((t) => this.mainLoop(t));
    }

    private update(dt: number): void {
        let scene = this.scenes[0];
        if (scene) {
            scene.update(dt, this);
        }
    }

    private render(dt: number): void {
        let c = this.ctx;
        c.clearRect(0, 0, c.canvas.width, c.canvas.height);

        let scene = this.scenes[0];
        if (scene) {
            scene.render(dt, this.ctx);
        }
    }

    pushScene(scene: Scene): void {
        this.scenes.push(scene);
    }

    popScene(): void {
        this.scenes.pop();
    }

    swapScene(scene: Scene): void {
        this.scenes.pop();
        this.scenes.push(scene);
    }

    start(): void {
        this.pushScene(new MainScene());
        window.requestAnimationFrame((t) => this.mainLoop(t));
    }
}
