
abstract class Button implements Updatable {
    private wasDown: boolean;

    protected constructor() {
        this.wasDown = false;
    }

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

    update(unused) {
        this.wasDown = this.isDown();
    }
}

class KeyButton extends Button {
    constructor(key: string) {
        // TODO NYI
        super();
    }

    isDown(): boolean {
        return false; // TODO
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
}