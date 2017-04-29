
class TestScene implements Scene {
    time: number;
    color: number[];

    constructor() {
        this.time = 0;
        this.color = [0, 128, 255];

        let k = Kernel.current();
        k.input['ResetColor'] = k.keyboard().key('Enter');
    }

    update(dt: number): void {
        this.time += dt;

        let button = <Button>Kernel.current().input['ResetColor'];
        if (button.pressed()) {
            this.color = [0, 0, 0].map(
                (v) => Math.floor(255 * Math.random())
            );
        }
    }

    render(t: number, c: CanvasRenderingContext2D): void {
        let shade = .75 + .25 * Math.sin(this.time);

        let color = this.color.map(
                (v) => Math.floor(v * shade)
            );

        c.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        c.fillRect(0, 0, c.canvas.width, c.canvas.height);
    }
}