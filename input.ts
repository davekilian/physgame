
abstract class Button implements Updatable {
    private wasDown: boolean;

    protected constructor() {
        this.wasDown = false;
    }

    abstract id(): string;

    abstract isDown(): boolean;

    isUp(): boolean {
        return !this.isDown();
    }

    pressed() {
        return this.isDown() && !this.wasDown;
    }

    release() {
        return !this.isDown() && this.wasDown;
    }

    update(dt) {
        this.wasDown = this.isDown();
    }
}

class AndButton extends Button {
    private left: Button;
    private right: Button;

    constructor(left: Button, right: Button) {
        super();
        this.left = left;
        this.right = right;
    }

    isDown(): boolean {
        return this.left.isDown() && this.right.isDown();
    }

    id(): string {
        return `(${this.left.id()})&(${this.right.id})`;
    }
}

class OrButton extends Button {
    private left: Button;
    private right: Button;

    constructor(left: Button, right: Button) {
        super();
        this.left = left;
        this.right = right;
    }

    isDown(): boolean {
        return this.left.isDown() || this.right.isDown();
    }

    id(): string {
        return `(${this.left.id()})|(${this.right.id})`;
    }
}

class NotButton extends Button {
    private inner: Button;

    constructor(inner: Button) {
        super();
        this.inner = inner;
    }

    isDown(): boolean {
        return !this.inner.isDown();
    }

    id(): string {
        return `!${this.id()}`;
    }
}

class Keyboard implements Updatable {
    private keys: Key[];
    states: Object;

    constructor(canvas: HTMLCanvasElement) {
        this.states = { };
        this.keys = [ ];

        canvas.onkeydown = (e) => this.states[e.key] = true;
        canvas.onkeyup = (e) => delete this.states[e.key];
    }

    key(key: string): Button {
        let result = new Key(this, key);
        this.keys.push(result);

        return result;
    }

    update(dt): void {
        this.keys.map((key) => key.update(dt));
    }
}

class Key extends Button {
    private keyboard: Keyboard;
    private key: string;
    private state: boolean;

    constructor(keyboard: Keyboard, key: string) {
        super();

        this.keyboard = keyboard;
        this.key = key;
        this.state = false;
    }

    isDown(): boolean {
        return this.state;
    }

    id(): string {
        return `Keyboard.${this.key}`;
    }

    update(dt): void {
        super.update(dt);
        this.state = (this.keyboard.states[this.key] === true);
    }
}
