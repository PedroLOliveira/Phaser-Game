
export default class Enemy extends Phaser.Physics.Matter.Sprite {
    constructor(data) {
        let { scene, x, y, texture, frame, label, hp, damage } = data;
        super(scene.matter.world, x, y, texture, frame);
        this.scene.add.existing(this);

        this.label = label;
        this.hp = hp;
        this.damage = damage;
        this.file = texture;
        this.innerSensor = 0;
        this.innerAttack = 0;
        this.anims.play('idle_' + this.file, true);

        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        var enemyCollider = Bodies.circle(this.x, this.y, 12, { isSensor: false, label: label + 'Collider' });
        var enemySensor = Bodies.circle(this.x, this.y, 48, { isSensor: true, label: label + 'Sensor' });
        this.setCollisionGroup(2);
        const compoundBody = Body.create({
            parts: [enemyCollider, enemySensor],
            frictionAir: 0.35
        });
        this.setExistingBody(compoundBody);
    }

    static preload(scene, file) {
        scene.load.atlas(file, 'src/assets/images/' + file + '.png', 'src/assets/images/' + file + '_atlas.json');
        scene.load.animation(file + '_anim', 'src/assets/images/' + file + '_anim.json');
    }

    get velocity() {
        return this.body.velocity;
    }

    get isAgro() {
        return this.innerSensor == 1;
    }

    get isAttackable() {
        return this.innerAttack == 1;
    }

    takeDamage() {
        this.hp -= this.scene.player.damage;
        console.log('damage to enemy: ' + this.scene.player.damage);
        if (this.hp <= 0) {
            console.log('enemy died');
            this.scene.emitter.start();
            this.scene.emitter.startFollow(this);
            this.anims.play('dead', true);
            this.scene.emitter.stopFollow(this);
            this.scene.emitter.stop();
            this.scene.enemies.splice(this.scene.enemies.indexOf(this), 1);
            this.destroy(false);
        }
    }

    attackable(value) {
        this.innerAttack = value;
    }

    agro(value) {
        this.innerSensor = value;
    }

    update() {
        const speed = 1.5;
        let enemyVelocity = new Phaser.Math.Vector2();
        
        if (this.isAgro) {
            let myPosition = this.getCenter();
            let playerPosition = this.scene.player.getCenter();
            if (myPosition.x < playerPosition.x) {
                enemyVelocity.x = 1;
                this.setScale(-1, 1);
            } else if (myPosition.x > playerPosition.x) {
                enemyVelocity.x = -1;
                this.setScale(1, 1);
            }
            if (myPosition.y < playerPosition.y) {
                enemyVelocity.y = 1;
            } else if (myPosition.y > playerPosition.y) {
                enemyVelocity.y = -1;
            }
        }
        else enemyVelocity.set(0,0);

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