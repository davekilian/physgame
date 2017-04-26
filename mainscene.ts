
class MainScene implements Scene {
    time: number;

    constructor() {
        this.time = 0;
    }

    update(dt: number): void {
        this.time += dt;
    }

    render(t: number, c: CanvasRenderingContext2D): void {
        let shade = .5 + .5 * Math.sin(this.time);
        let color = Math.floor(255 * shade);
        c.fillStyle = `rgb(${color}, 255, 0)`;
        c.fillRect(0, 0, c.canvas.width, c.canvas.height);
    }
}