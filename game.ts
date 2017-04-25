
class Game implements SceneStack {
    lastUpdate: number;
    ctx: CanvasRenderingContext2D;
    scenes: Scene[];

    constructor() {
        this.lastUpdate = 0;
        this.ctx = (<HTMLCanvasElement>document.getElementById('physgame')).getContext('2d');
        this.scenes = [ ];
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

    private update(dt: number) {
        let scene = this.scenes[0];
        if (scene) {
            scene.update(dt, this);
        }
    }

    private render(dt: number) {
        let c = this.ctx;
        c.clearRect(0, 0, c.canvas.width, c.canvas.height);

        let scene = this.scenes[0];
        if (scene) {
            scene.render(dt, this.ctx);
        }
    }

    pushScene(scene: Scene) {
        this.scenes.push(scene);
    }

    popScene() {
        this.scenes.pop();
    }

    swapScene(scene: Scene) {
        this.scenes.pop();
        this.scenes.push(scene);
    }

    start() {
        this.pushScene(new MainScene());
        window.requestAnimationFrame((t) => this.mainLoop(t));
    }
}
