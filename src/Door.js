
export default class Door extends Phaser.Physics.Matter.Sprite {
    constructor(data) {
        let { scene, x, y, texture, frame, label } = data;
        super(scene.matter.world, x, y, texture, frame);
        this.scene.add.existing(this);

        this.label = label;
        this.file = texture;

        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        var itemCollider = Bodies.circle(this.x, this.y, 10, { isSensor: false, label: label + 'Collider' });
        this.setCollisionGroup(4);
        const compoundBody = Body.create({
            parts: [itemCollider],
            frictionAir: 0.35
        });
        this.setExistingBody(compoundBody);
        this.setStatic(true);
    }

    static preload(scene, file) {
        scene.load.atlas(file, 'src/assets/images/objects/' + file + '.png','src/assets/images/objects/' + file + '_atlas.json');
    }

    update() {
        this.setFixedRotation();
    }
}