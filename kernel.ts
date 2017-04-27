
class KernelScheduler {
    private callback: (dt: number) => void;
    private targetFPS: number;
    private lastTick: number;
    private executing: boolean;

    constructor(callback: (number) => void, 
                targetFPS: number) {

        this.callback = callback;
        this.targetFPS = targetFPS;
        this.lastTick = 0;
        this.executing = false;
    }

    start() {
        if (!this.executing) {
            this.executing = true;
            this.scheduleTick();
        }
    }

    stop() {
        this.executing = false;
        this.lastTick = 0;
    }

    private scheduleTick() {
        window.requestAnimationFrame((t) => this.tick(t));
    }

    private tick(timeMS: number): void {
        if (this.executing) {
            let time = timeMS / 1000;

            if (time - this.lastTick > 1 / this.targetFPS) {
                this.callback(time - this.lastTick);
                this.lastTick = time;
            }

            this.scheduleTick();
        }
    }
}

class Kernel {
    private static currentInstance: Kernel;

    static current(): Kernel {
        return Kernel.currentInstance;
    }

    private canvas: HTMLCanvasElement;
    private scheduler: KernelScheduler;
    private scenes: Scene[];
    private pre: Updater;
    private post: Updater;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.scheduler = new KernelScheduler((dt) => this.tick(dt), 60);
        this.scenes = [ ];
        this.pre = new Updater();
        this.post = new Updater();
    }

    exec(scene: Scene) {
        this.scenes.push(scene);
        this.scheduler.start();

        Kernel.currentInstance = this;
    }

    private tick(dt: number): void {
        this.pre.update(dt);

        let scene = this.scene();
        if (scene != null) {
            scene.update(dt);
        }

        this.post.update(dt);

        let c = this.canvas.getContext('2d');
        c.clearRect(0, 0, c.canvas.width, c.canvas.height);

        if (scene != null) {
            scene.render(dt, c);
        }
    }

    scene(): Scene {
        if (this.scenes.length > 0) {
            return this.scenes[this.scenes.length - 1];
        }
        else {
            return null;
        }
    }

    push(scene: Scene) {
        this.scenes.push(scene);
    }

    pop() {
        this.scenes.pop();
    }

    swap(scene: Scene) {
        this.scenes.pop();
        this.scenes.push(scene);
    }

    preUpdate() {
        return this.pre;
    }

    postUpdate() {
        return this.pre;
    }
}