
export default class Player extends Phaser.Physics.Matter.Sprite {
    constructor(data) {
        let { scene, x, y, texture, frame, hp } = data;
        super(scene.matter.world, x, y, texture, frame);
        this.scene.add.existing(this);

        this.hp = hp;
        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        var enemyCollider = Bodies.circle(this.x, this.y, 12, { isSensor: false, label: 'enemyCollider' });
        var enemySensor = Bodies.circle(this.x, this.y, 48, { isSensor: true, label: 'enemySensor' });
        this.setCollisionGroup(2);
        const compoundBody = Body.create({
            parts: [enemyCollider, enemySensor],
            frictionAir: 0.35
        });
        this.setExistingBody(compoundBody);
    }

    get velocity() {
        return this.body.velocity;
    }

    static preload(scene, file) {
        this.file = file;
        scene.load.atlas(file, 'src/assets/images/' + file + '.png', 'src/assets/images/' + file + '_atlas.json');
        scene.load.animation(file + '_anim', 'src/assets/images/' + file + '_anim.json');
    }

    create(file) {
        this.file = file;
        this.anims.play('idle_' + this.file, true);
    }

    takeDamage(damage) {
        this.hp -= damage;
        if (this.hp <= 0) {
            console.log('inimigo morreu');
            this.destroy();
        }
        console.log('damage to enemy: ' + damage);
    }

    doDamage() {
        console.log('damage to player: ' + 1);
    }

    followAnother(other) {
        //this.setVelocityX
    }

    update() {
        const speed = 1.5;
        let enemyVelocity = new Phaser.Math.Vector2();

        this.setFixedRotation();
        enemyVelocity.normalize();
        enemyVelocity.scale(speed);
        this.setVelocity(enemyVelocity.x, enemyVelocity.y);

        if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1) {
            this.anims.play('walk_' + this.file, true);
        } else {
            this.anims.play('idle_' + this.file, true);
        }
    }
}