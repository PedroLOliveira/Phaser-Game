export default class Item extends Phaser.Physics.Matter.Sprite {
    constructor(data) {
        let { scene, x, y, texture } = data;
        super(scene.matter.world, x, y, texture);
        this.scene.add.existing(this);

        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        var itemSensor = Bodies.circle(this.x, this.y, 10, { isSensor: true, label: 'itemSensor' });
        const compoundBody = Body.create({
            parts: [itemSensor],
            frictionAir: 0.35
        });
        this.setExistingBody(compoundBody);
    }

    static preload(scene, file) {
        scene.load.atlas(file, 'assets/images/objects/' + file + '.png','assets/images/objects/' + file + '_atlas.json');
        scene.load.animation(file + '_anim', 'assets/images/objects/' + file + '_anim.json');
    }

    create(file) {
        this.file = file;
        this.anims.play('idle_' + this.file, true);
    }

    update() {
        this.anims.play('idle_' + this.file, true);
    }
}