
interface Scene {
    update(timeDelta: number, stack: SceneStack): void;
    render(timeDelta: number, context: CanvasRenderingContext2D): void;
}

interface SceneStack {
    pushScene(scene: Scene): void;
    popScene(): void;
    swapScene(scene: Scene): void;
}