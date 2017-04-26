
class KernelScheduler {
    callback: (dt: number) => void;
    targetFPS: number;
    lastTick: number;
    executing: boolean;

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
    canvas: HTMLCanvasElement;
    scheduler: KernelScheduler;
    scenes: Scene[];

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.scheduler = new KernelScheduler((dt) => this.tick(dt), 60);
        this.scenes = [ ];
    }

    exec(scene: Scene) {
        this.scenes.push(scene);
        this.scheduler.start();
    }

    private tick(dt: number): void {
        // TODO: preUpdate

        let scene = this.scene();
        if (scene != null) {
            scene.update(dt);
        }

        // TODO: postUpdate

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
}