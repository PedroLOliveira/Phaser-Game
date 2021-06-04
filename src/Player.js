
export default class Player extends Phaser.Physics.Matter.Sprite {
    constructor(data) {
        let { scene, x, y, texture, frame } = data;
        super(scene.matter.world, x, y, texture, frame);
        this.scene.add.existing(this);

        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        var playerCollider = Bodies.circle(this.x, this.y, 12, { isSensor: false, label: 'playerCollider' });
        var playerSensor = Bodies.circle(this.x, this.y, 24, { isSensor: true, label: 'playerSensor' });
        this.setCollisionGroup(1);
        const compoundBody = Body.create({
            parts: [playerCollider, playerSensor],
            frictionAir: 0.35
        });
        this.setExistingBody(compoundBody);
    }
    

    create(file, hp, damage) {
        this.file = file;
        this.hp = hp;
        console.log(this.file);
        this.damage = damage;
    }

    get velocity() {
        return this.body.velocity;
    }

    get getHP() {
        return this.hp;
    }

    set setHP(hp) {
        this.hp = hp;
    }

    get direction() {
        return this.body.x > 0 ? 'l' : 'r';
    }

    get currentAnim() {
        return this.anims.getName;
    }

    static preload(scene, file) {
        scene.load.atlas(file, 'src/assets/images/' + file + '.png', 'src/assets/images/' + file + '_atlas.json');
        scene.load.animation(file + '_anim', 'src/assets/images/' + file + '_anim.json');
    }

    increaseDamage(howMuch) {
        this.damage += howMuch;
    }

    heal(howMuch) {
        this.hp += howMuch;
        console.log('player healed by: ', howMuch);
    }

    takeDamage(damage) {
        this.hp -= damage;
        if (this.hp <= 0) {
            console.log('voce morreu');
            this.anims.play('dead', true);
            this.scene.scene.restart();
        }
        console.log('player damaged by: ' + damage);
    }

    doDamage() {
        this.once(Phaser.Animations.Events.ANIMATION_STOP, () => {
            console.log('damage to enemy: ' + this.damage);
        }, this.scene);
    }

    update() {
        const speed = 2.5;
        let playerVelocity = new Phaser.Math.Vector2();
        if (this.inputKeys.left.isDown) {
            playerVelocity.x = -1;
            this.setScale(-1, 1);
        } else if (this.inputKeys.right.isDown) {
            playerVelocity.x = 1;
            this.setScale(1, 1);
        }
        if (this.inputKeys.up.isDown) {
            playerVelocity.y = -1;
        } else if (this.inputKeys.down.isDown) {
            playerVelocity.y = 1;
        }

        this.setFixedRotation();
        playerVelocity.normalize();
        playerVelocity.scale(speed);
        this.setVelocity(playerVelocity.x, playerVelocity.y);
        if ((Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1) && !this.inputKeys.attack.isDown && !this.anims.isPlaying) {
            this.anims.play('walk_' + this.direction, true); //verificar chain
        }
        if (this.inputKeys.attack.isDown) {
            this.anims.play('attack_' + this.direction, true);
            this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                this.doDamage();
            }, this.scene);
            this.once(Phaser.GameObjects.Events.DESTROY, () => {
                this.doDamage();
            }, this.scene);
        }
        if (this.inputKeys.defense.isDown) {
            this.setToSleep(false);
        }
        if (this.inputKeys.catch.isDown) {
            console.log('catch item');
            this.anims.play('collect_' + this.direction, true);
        }
        if (!this.anims.isPlaying) {
            this.anims.play('idle_' + this.direction, true);
        }
    }
}