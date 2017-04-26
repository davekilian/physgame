
interface Scene {
    update(dt: number): void;
    render(dt: number, context: CanvasRenderingContext2D): void;
}
// TODO: change this to an abstract class with a protected API
// to get the kernel instance
