
interface Scene {
    update(timeDelta: number, stack: SceneStack);
    render(timeDelta: number, context: CanvasRenderingContext2D);
}

interface SceneStack {
    pushScene(scene: Scene);
    popScene();
    swapScene(scene: Scene);
}