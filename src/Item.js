
export default class Item extends Phaser.Physics.Matter.Sprite {
    constructor(data) {
        let { scene, x, y, texture, frame, label } = data;
        super(scene.matter.world, x, y, texture, frame);
        this.scene.add.existing(this);

        this.label = label;
        this.file = texture;
        if (this.file != 'lever')
            this.anims.play('idle_' + this.file, true);

        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        var itemCollider = Bodies.circle(this.x, this.y, 10, { isSensor: true, label: label + 'Collider' });
        this.setCollisionGroup(3);
        const compoundBody = Body.create({
            parts: [itemCollider],
            frictionAir: 0.35
        });
        this.setExistingBody(compoundBody);
    }

    changeFrame(frame) {
        this.setFrame(frame);
    }

    static preload(scene, file) {
        scene.load.atlas(file, 'src/assets/images/objects/' + file + '.png','src/assets/images/objects/' + file + '_atlas.json');
        if (file != 'lever')
            scene.load.animation(file + '_anim', 'src/assets/images/objects/' + file + '_anim.json');
    }

    update() {
        if (this.file != 'lever')
            this.anims.play('idle_' + this.file, true);
    }
}