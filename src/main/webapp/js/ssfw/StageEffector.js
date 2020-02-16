class StageEffector {
    constructor(stage) {
        this._stage = stage;
        this.op = null;
    }

    reset() {
        this.op = null;
        this.progress = 0;
    }

    start(op) {
        this.op = op;
        this.progress = 0;
    }

    move() {
        if (!this.op) {
            return;
        }
        if (this.progress < StageEffector.MaxProgress) {
            this.progress++;
        }
    }

    effect(ctx) {
        if (!this.op) {
            return;
        }
        if (this.op == 'Efi') {
            let a = this.progress / StageEffector.MaxProgress;

            ctx.filter = 'brightness(' + a + ')';
        } else if (this.op == 'Efo') {
            let a = (StageEffector.MaxProgress - this.progress) / StageEffector.MaxProgress;

            ctx.filter = 'brightness(' + a + ')';
        }

//        ctx.globalAlpha = a;
        // ctx.filter = 'brightness(' + a + ')';
    }

    draw(ctx) {
        let w = ctx.canvas.width;
        let h = ctx.canvas.height;
        let a = this.progress / StageEffector.MaxProgress;

        ctx.save();
        ctx.fillStyle = 'rgba(255, 0, 255, ' + a + ')';
        ctx.beginPath();
        let ship = this._stage.performersList.find(a => a instanceof Ship);
        console.log('x:' + this.x + '/ship.x:' + ship.x);
        ctx.arc(this.x, 100, this.progress, 0, Math.PI2);
        ctx.fill();
        ctx.restore();
        this.progress++;
        if (StageEffector.MaxProgress < this.progress) this.progress = 0;
    }
}
StageEffector.MaxProgress = 200;
