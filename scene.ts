
interface Scene {
    update(dt: number): void;
    render(dt: number, context: CanvasRenderingContext2D): void;
}
