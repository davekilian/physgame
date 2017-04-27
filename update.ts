
interface Updatable {
    update(dt: number): void;
}

class Updater {
    private targets: Updatable[];

    constructor() {
        this.targets = [ ];
    }

    add(target: Updatable) {
        if (this.targets.indexOf(target) < 0) {
            this.targets.push(target);
        }
    }

    remove(target: Updatable) {
        let index = this.targets.indexOf(target);
        if (index >= 0) {
            this.targets.splice(index, 1);
        }
    }

    update(dt: number) {
        this.targets.map((t) => t.update(dt));
    }
}
