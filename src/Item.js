
export default class Item extends Phaser.Physics.Matter.Sprite {
    constructor(data) {
        let { scene, x, y, texture, frame } = data;
        super(scene.matter.world, x, y, texture, frame);
        this.scene.add.existing(this);

        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        var itemSensor = Bodies.circle(this.x, this.y, 10, { isSensor: true, label: 'itemSensor' });
        this.setCollisionGroup(3);
        const compoundBody = Body.create({
            parts: [itemSensor],
            frictionAir: 0.35
        });
        this.setExistingBody(compoundBody);
    }

    static preload(scene, file) {
        scene.load.atlas(file, 'src/assets/images/objects/' + file + '.png','src/assets/images/objects/' + file + '_atlas.json');
        scene.load.animation(file + '_anim', 'src/assets/images/objects/' + file + '_anim.json');
    }

    create(file) {
        this.file = file;
        console.log(this.file);
        this.anims.play('idle_' + this.file, true);
    }

    update() {
        this.anims.play('idle_' + this.file, true);
    }
}