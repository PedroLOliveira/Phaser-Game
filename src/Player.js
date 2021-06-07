
export default class Player extends Phaser.Physics.Matter.Sprite {
    constructor(data) {
        let { scene, x, y, texture, frame, hp, damage } = data;
        super(scene.matter.world, x, y, texture, frame);
        this.scene.add.existing(this);

        this.file = texture;
        this.hp = hp;
        this.maxHP = 3;
        this.damage = damage;

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

    static preload(scene, file) {
        scene.load.atlas(file, 'src/assets/images/' + file + '.png', 'src/assets/images/' + file + '_atlas.json');
        scene.load.animation(file + '_anim', 'src/assets/images/' + file + '_anim.json');
    }

    get velocity() {
        return this.body.velocity;
    }

    get direction() {
        return this.body.x > 0 ? 'l' : 'r';
    }

    get currentAnim() {
        return this.anims.currentAnim.key;
    }

    get isAttacking() {
        return (this.currentAnim == 'attack_r' || this.currentAnim == 'attack_l') && this.anims.isPlaying
    }

    increaseDamage(howMuch) {
        this.damage += howMuch;
        this.scene.events.emit('increaseDamage');
    }

    heal(howMuch) {
        this.hp = this.hp == this.maxHP ? this.maxHP : this.hp + howMuch;
        console.log('player healed: ', howMuch);
        console.log('HP: ', this.hp);
        this.scene.sound.play('Effect');
        this.scene.events.emit('increaseHP');
    }

    takeDamage(damage, enemy) {
        this.hp = this.hp == 0 ? 0 : this.hp - damage;
        if (this.hp <= 0) {
            console.log('you died');
            this.scene.emitter.start();
            this.scene.emitter.startFollow(this);
            this.anims.play('dead', true);
            // removing sleep, includes a glitch to pass through the levels when death comes
            this.setToSleep();
            this.scene.cameras.main.fade(2000, 0, 0, 0);
        }
        console.log('damage suffered: ' + damage);
        console.log('HP: ', this.hp);
        this.scene.events.emit('decreaseHP');
    }

    doDamage() {
        let damage = this.damage;
        let scene = this.scene;
        this.scene.enemies.map(function(enemy, i) {
            if (enemy.isAttackable) {
                scene.sound.play('Hit');
                enemy.takeDamage(damage, 1);
            } else {
                scene.sound.play('Hit');
            }
        });
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
        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.attack)) {
            this.anims.play('attack_' + this.direction, true);
            this.doDamage();
        }
        if (this.scene.input.keyboard.checkDown(this.inputKeys.attack, 500))
        {
            // this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            //     this.doDamage();
            // }, this.scene);
            // this.once(Phaser.GameObjects.Events.DESTROY, () => {
            //     this.doDamage();
            // }, this.scene);
        }
        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.catch)) {
            console.log('catch item');
            this.anims.play('collect_' + this.direction, true);
        }
        if (!this.anims.isPlaying) {
            this.anims.play('idle_' + this.direction, true);
        }
    }
}